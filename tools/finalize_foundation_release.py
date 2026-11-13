from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'.release-lithuanian-art'
ui=DEST/'foundation-ui.js'
text=ui.read_text(encoding='utf8').replace("function speaking(spec={}){const activity=spec.activityId||'a1.cafe-speaking',text=spec.text||words.order,taskId=spec.taskId||'say-order',back=spec.back||hub;", "function speaking(spec={}){if(!spec.activityId||!spec.text||!spec.taskId)return;const activity=spec.activityId,text=spec.text,taskId=spec.taskId,back=spec.back||hub;")
assert 'words.order' not in text
ui.write_text(text,encoding='utf8')
log=DEST/'CHANGELOG.md';text=log.read_text(encoding='utf8')
entry='- **3.114** (2026-11-08) Practical activities for the first three Lithuanian path units: Basics, Small talk and Food. Each has two reading tasks, two listening tasks, two writing tasks and a recording/comparison speaking task. Activities use exact previously taught course cards, unlock at their source lessons, offer optional hints, save locally and resume offline. All 99 illustrated cards in these units have the approved artwork. Existing lesson IDs, course order, audio, FSRS records and account sync are preserved. Later course development and Spanish remain outside this release. Deployment now packages only public site assets.\n\n'
if '**3.114**' not in text:text=text.replace('# Gintaras version history\n\n','# Gintaras version history\n\n'+entry)
log.write_text(text,encoding='utf8')
workflow=DEST/'.github/workflows/deploy.yml';text=workflow.read_text(encoding='utf8')
text=text.replace('run: node tools/audit_first_three_release.js', 'run: |\n          node tools/check_course.js\n          node tools/audit_first_three_release.js')
workflow.write_text(text,encoding='utf8')
doc=DEST/'docs/releases/3.114.md';doc.parent.mkdir(parents=True,exist_ok=True)
doc.write_text('''# First three Lithuanian units — 3.114 / build 186

Release scope follows the learning path: Basics (`u1`), Small talk (`u21`), Food (`u3`). Numbers (`u2`) is later in the path.

The production course and assets remain byte-for-byte unchanged from build 185. All 99 card illustrations already use the approved art; no new images are required for this scope. Existing conversations, grammar help, pronunciation, recordings, unit checks, review scheduling and speaking lessons remain available.

Three additional practical activities cover reading, listening, writing and self-recorded speaking. Every source is an exact course card from the relevant unit or an earlier one, including personalised name forms. Prerequisites use the existing taught-card state. Payment requests and origins taught later are excluded. Practice evidence lives separately on this device, awards no CEFR level and does not alter course progress or FSRS scheduling. Speaking uses recording and self-comparison, with no automated proficiency claim.

Validation: structural course checks; all 99 images decoded and rendered through actual card markup; all phrase audio segments checked against decoded file durations for both lesson voices; six complete browser flows (both variants of all three activities), incorrect replies, locks, actual audio playback, microphone/replay/comparison, local resume and offline reload; 1,172 lesson cards played across the first three units with teaching-order checks, placement and conversation gloss checks.

Deployment packages only public files, excluding tools, documentation, worktrees and authoring output. The shell cache changes from 185 to 186; audio/picture cache names and all existing state keys stay stable. Full A1–C2 expansion and Spanish expansion are not part of this release.
''',encoding='utf8')
print('Finalized scoped release notes and workflow.')
