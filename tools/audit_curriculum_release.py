"""Audit teaching structure and report release evidence without inventing proficiency scores.

Editorial approvals are read from curriculum-reviews.json and bound to exact source
hashes. Missing/stale approvals stay pending. No learner data or credentials are read.
"""
import hashlib
import json
import re
import subprocess
import unicodedata
from pathlib import Path
from audit_transfer_content import main as audit_transfer
from check_a1_feedback_content import main as audit_feedback
from audit_writing_preparation import main as audit_writing
from audit_interaction_practice import main as audit_interaction
from audit_written_interaction import main as audit_written_interaction
from audit_form_practice import main as audit_forms
from audit_document_reading import main as audit_documents
from audit_extended_reading import main as audit_extended

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'cefr'
PROGRAM = """global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};
require('./tools/course_content_loader.js');
console.log(JSON.stringify({units:WordamiSkillsContent.units,vocabulary:WordamiVocabularyContent.units,
plans:WordamiLearningDesign.units,support:WordamiSourceSupport.units,transfer:WordamiTransferContent.units,listeningTransfer:WordamiListeningTransferContent.units,grammar:WordamiGrammarContent.lessons,writingPreparation:WordamiWritingPreparation.lessons,writtenInteraction:WordamiWrittenInteractionContent.units,forms:WordamiFormContent.units,documents:WordamiDocumentContent.units,extendedReading:WordamiExtendedReadingContent.units,
contexts:Object.fromEntries(WordamiSkillsContent.units.map(u=>[u.id,WordamiVocabularyContent.units[u.id].map(w=>WordamiLearningDesign.contextFor(u,w.text))]))}));"""
SKILLS = ['reading', 'listening', 'production', 'interaction', 'mediation', 'writing']


def tokens(text):
    return set(re.findall(r"[^\W\d_]+(?:['’-][^\W\d_]+)*", unicodedata.normalize('NFC', text).lower()))


def approved(record, fingerprint):
    return bool(record and record.get('status') == 'approved'
                and record.get('contentHash') == fingerprint
                and str(record.get('reviewer', '')).strip()
                and re.fullmatch(r'\d{4}-\d{2}-\d{2}', record.get('date', ''))
                and str(record.get('notes', '')).strip())


def main():
    reviews_path = OUT / 'curriculum-reviews.json'
    reviews = json.loads(reviews_path.read_text(encoding='utf8')) if reviews_path.exists() else {}
    assets = json.loads((ROOT / 'audio/skills/manifest.json').read_text(encoding='utf8'))
    listening_assets = json.loads((ROOT / 'audio/listening-transfer/manifest.json').read_text(encoding='utf8'))
    report = {'schema': 1, 'scope': 'Local content and teaching structure; no learner proficiency assessment',
              'cefrSource': 'https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4',
              'structureErrors': [], 'languages': {}, 'fullCefrReleaseReady': False}
    errors = report['structureErrors']
    report['controlledTransfer'] = audit_transfer()
    report['guidedA1Feedback'] = audit_feedback()
    report['guidedWritingPreparation'] = audit_writing()
    report['guidedA1Interaction'] = audit_interaction()
    report['requiredWrittenInteraction'] = audit_written_interaction()
    report['requiredPracticalForms'] = audit_forms()
    report['requiredPracticalTables'] = audit_documents()
    report['requiredReadingPortfolios'] = audit_extended()
    for lang in ['lt', 'es']:
        data = json.loads(subprocess.check_output(['node', '-e', PROGRAM, lang], cwd=ROOT).decode('utf8'))
        units = data['units']; rows = []; taught = set()
        if len(units) != 30 or len({u['id'] for u in units}) != 30:
            errors.append(lang + ': expected 30 unique units')
        for index, unit in enumerate(units):
            uid = unit['id']; label = lang + '.' + uid; plan = data['plans'].get(uid)
            def require(ok, message):
                if not ok:
                    errors.append(label + ': ' + message)
            require(bool(plan), 'missing learning plan')
            if not plan:
                continue
            require(plan['prerequisite'] == (units[index-1]['id'] if index else None), 'broken prerequisite sequence')
            require(set(plan['outcomes']) == set(SKILLS), 'missing skill goal')
            require(all(o['goal'] and o['scale'] and o['source'] for o in plan['outcomes'].values()), 'unmapped skill goal')
            require(all(o['practiceIds'] and o['referencePages'] for o in plan['outcomes'].values()), 'missing task or descriptor reference')
            require(len(plan['steps']) == 7 and bool(plan['support']), 'incomplete learning sequence')
            require(bool(plan['pattern']['explanation']) and len(plan['pattern']['examples']) == 3, 'missing pattern teaching')
            require(all(example in unit['writing']['phrases'] for example in plan['pattern']['examples']), 'pattern example not taught')
            vocab = data['vocabulary'][uid]
            require(len(vocab) == 8 and len(unit['writing']['phrases']) == 8, 'incomplete language preparation')
            require(all(data['contexts'][uid]), 'vocabulary without a matching source sentence')
            require(unit['reading'] != unit['listen'], 'reading and listening are identical')
            require(unit['readingGuide'] and unit['translation'], 'missing source meaning support')
            for kind in ['readingQuestions', 'questions']:
                require(len(unit[kind]) == 3, 'expected three comprehension questions')
                for question, options, answer in unit[kind]:
                    require(bool(question) and len(set(options)) == len(options) and 0 <= answer < len(options), 'invalid comprehension key')
            require(len(unit['production'][1]) == 3 and len(unit['turns']) == 3 and bool(unit['mediation']), 'incomplete spoken practice')
            require(all(t[0] and t[1] and t[2] for t in unit['turns']), 'missing partner language preparation')
            if unit.get('project'):
                p = unit['project']
                require(bool(p['audience']) and bool(p['brief']) and len(p['goals']) == 3 and 0 < p['range'][0] <= p['range'][1], 'invalid writing task')
            else:
                require(len(unit['writing']['projects']) == 3 and len(unit['writing']['rubric']) == 4, 'missing original writing assignments/rubric')
            for part in ['listen', 'turn-0', 'turn-1', 'turn-2'] + [f'word-{i}' for i in range(8)]:
                asset = assets.get(label + '.' + part)
                require(bool(asset) and (ROOT / asset['url']).is_file(), 'missing audio: ' + part)
            for variant in data['listeningTransfer'].get(uid, {}).get('variants', []):
                asset = listening_assets.get(label + '.' + variant['id'])
                expected = hashlib.sha256(json.dumps([lang, variant['text'], variant.get('voice','Achernar')], ensure_ascii=False).encode()).hexdigest()[:12]
                require(bool(asset) and asset['hash'] == expected and (ROOT / asset['url']).is_file(), 'missing or stale listening-transfer recording: ' + variant['id'])
            # Exact-form triage, not a dictionary/lemma count or an automatic language judgement.
            # Sources have English guides but their individual forms are not all taught explicitly.
            taught.update(tokens(' '.join([w['text'] for w in vocab] + [p[0] for p in unit['writing']['phrases']])))
            support = data['support'].get(uid, [])
            require(all(w['context'] and w['meaning'] for w in support), 'source support without context or meaning')
            taught.update(tokens(' '.join(w['text'] for w in support)))
            source_forms = tokens(unit['reading'] + ' ' + unit['listen'] + ' ' + ' '.join(t[0] for t in unit['turns'] + unit.get('strategies',[])) + ' ' + ' '.join(s[1] for s in unit['writing'].get('sources',[])))
            source_only = sorted(source_forms - taught)
            if plan['band'] in ['A1','A2','B1','B2','C1','C2']:
                require(not source_only, 'Source forms lack explicit preparation: ' + ', '.join(source_only))
            grammar = next(g for g in data['grammar'] if g['id'] == plan['band'])
            feedback_paths=['writing-preparation.js','skills-studio.js','writing-studio.js','form-practice.js']
            if uid in data['documents']:feedback_paths.append('document-reading.js')
            if uid in data['extendedReading']:feedback_paths.append('extended-reading.js')
            if plan['band']=='A1':feedback_paths+=['source-support.js','a1-feedback.js','interaction-practice-content.js','interaction-practice.js']
            else:feedback_paths += [plan['band'].lower()+'-source-support.js',plan['band'].lower()+'-writing-preparation.js']
            feedback_hash = hashlib.sha256(b''.join((ROOT / path).read_bytes() for path in feedback_paths)).hexdigest() if feedback_paths else None
            writing_models={key:value for key,value in data['writingPreparation'].items() if key.startswith(uid+'.')}
            fingerprint = hashlib.sha256(json.dumps([unit, vocab, plan, grammar, support, writing_models, data['writtenInteraction'].get(uid), data['forms'].get(uid), data['documents'].get(uid), data['extendedReading'].get(uid), data['transfer'].get(uid), data['listeningTransfer'].get(uid), feedback_hash], ensure_ascii=False, sort_keys=True).encode()).hexdigest()
            review = reviews.get(label, {})
            rows.append({'id': uid, 'band': plan['band'], 'theme': unit['theme'], 'contentHash': fingerprint,
                         'prerequisite': plan['prerequisite'], 'outcomes': plan['outcomes'],
                         'languageReview': 'approved' if approved(review.get('language'), fingerprint) else 'pending_or_stale',
                         'descriptorReview': 'approved' if approved(review.get('descriptors'), fingerprint) else 'pending_or_stale',
                         'sourceFormsBeyondExplicitPreparation': source_only, 'additionalSourceGlosses': support,
                         'sourceFormNote': 'Triage list: includes inflections and names; source guides provide support. A reviewer must decide which forms need more explicit teaching.',
                         'readingWords': len(re.findall(r'\w+', unit['reading'])),
                         'listeningSeconds': assets[label + '.listen']['duration'],
                         'independentAssessment': False, 'evidence': plan['evidence']})
        report['languages'][lang] = rows
    report['structurePassed'] = not errors
    report['releaseBlockers'] = [
        'Language and teaching-prerequisite review is not approved for every exact unit version.',
        'Selected CEFR scale goals are design targets; descriptor coverage and level demands need review.',
        'Main comprehension checks reuse prepared sources. Controlled A1–C2 transfer adds 96 reading documents and 96 separate recorded messages; broader genres, discourse and higher-level assessments remain unfinished.',
        'A1 speaking replay notes and writing now have local prepared-pattern coaching. Speaking, interaction, mediation and writing still lack calibrated independent assessment.',
        'Four workshops and a prepared-source capstone per target band do not establish a complete syllabus; breadth, variety and repeated transfer remain to be demonstrated.',
        'The new course remains preview-only. The packaged build and an update from the current live build pass; full-course activation, manual accessibility review and deployment verification remain pending.'
    ]
    html = (ROOT / 'index.html').read_text(encoding='utf8')
    report['localBuild'] = int(re.search(r'const APP_VERSION=(\d+)', html).group(1))
    try:
        reference = subprocess.check_output(['git', 'show', 'origin/main:index.html'], cwd=ROOT,
                                            stderr=subprocess.DEVNULL).decode('utf8')
        report['savedRemoteReferenceBuild'] = int(re.search(r'const APP_VERSION=(\d+)', reference).group(1))
        if report['localBuild'] <= report['savedRemoteReferenceBuild']:
            report['releaseBlockers'].append('Local build numbering must advance beyond the saved remote reference before publishing; reconcile newer live changes first.')
    except (subprocess.CalledProcessError, FileNotFoundError):
        report['savedRemoteReferenceBuild'] = None
    (OUT / 'curriculum-audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    lines = ['# Curriculum structure and release audit', '',
             'Scope: all 60 connected units in the local Lithuanian and Mexican Spanish build. This is a source and workflow audit, not external validation or a learner proficiency result.', '',
             '**Teaching structure: ' + ('passed automated checks.**' if report['structurePassed'] else 'errors found.**'),
             '**Complete CEFR-course release: not ready.**', '',
             'The selected learning goals are authored interpretations linked to named scales in the [Council of Europe Companion volume](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4). They are not official quotations or proof of full coverage.', '',
             '## Required learning sequence', '',
             'Vocabulary in source sentences → sentence patterns and explanations → supported source study → grammar and prepared-source comprehension → recorded speaking/interaction/mediation → writing, revision and scheduled recall.', '',
             'Every unit has a preceding-unit reference, six skill goals, a support plan and three explained language examples. Writing tasks require the connected comprehension stages. These stages preserve practice history; they do not award a CEFR level.', '',
             '## Release blockers', ''] + ['- ' + b for b in report['releaseBlockers']]
    lines += ['', '## Unit inventory', '', '| Language | Unit | Builds on | Language review | Descriptor review |', '| --- | --- | --- | --- | --- |']
    for lang, rows in report['languages'].items():
        for row in rows:
            lines.append(f"| {lang} | {row['id']} | {row['prerequisite'] or 'Start'} | {row['languageReview']} | {row['descriptorReview']} |")
    lines += ['', '## Review evidence', '',
              'The [machine-readable audit](curriculum-audit.json) records hashes, skill targets, media coverage and exact-form teaching triage for every unit. Forms in the triage list are not automatically errors: they include inflections and names. They identify what needs an editorial decision rather than silently assuming all source language was previously taught.', '',
              'Optional `curriculum-reviews.json` records are keyed by `lt.A1`, `es.A1`, etc., with `language` and `descriptors` objects. An approval needs `status: "approved"`, the current `contentHash`, a named `reviewer`, an ISO `date` and substantive `notes`. No approval is generated by this audit. Content changes invalidate previous approvals.', '',
              'Rebuild with `G:/Python/python.exe tools/audit_curriculum_release.py`. Use `--gate` in release checks: an incomplete CEFR release returns a nonzero status. A normal audit returns nonzero only for broken structural invariants. No production files or learner records are written.']
    if errors:
        lines += ['', '## Structure errors', ''] + ['- ' + e for e in errors]
    (OUT / 'CURRICULUM-AUDIT.md').write_text('\n'.join(lines) + '\n', encoding='utf8')
    print(f"Structure {'PASS' if not errors else 'FAIL'}: 60 units, 360 skill targets, 480 vocabulary contexts; complete CEFR release NOT READY.")
    for error in errors:
        print(error)
    import sys
    if errors or '--gate' in sys.argv and not report['fullCefrReleaseReady']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
