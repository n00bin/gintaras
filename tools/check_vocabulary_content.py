"""Validate contextual vocabulary coverage and preservation of existing phrase-review identities."""
import json,re,subprocess,unicodedata
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PROGRAM="global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};for(const f of ['./writing-content.js','./skills-content.js','./curriculum-content.js','./vocabulary-content.js'])require(f);console.log(JSON.stringify({units:WordamiSkillsContent.units,vocabulary:WordamiVocabularyContent.units,deck:WordamiVocabularyContent.deck()}));"
NEW={'A1-travel','A2-meals','B1-housing','B2-mobility','C1-professional','C2-register'}
def main():
    reports=[];punct=''.join(chr(n) for n in [46,44,33,63,191,161,58,59,8220,8221,34,39])
    fold=lambda t:re.sub(r'\s+',' ',unicodedata.normalize('NFC',t).lower().translate(str.maketrans('','',punct))).strip()
    for lang in ['lt','es']:
        c=json.loads(subprocess.check_output(['node','-e',PROGRAM,lang],cwd=ROOT).decode('utf8'))
        assert len(c['units'])==24 and len(c['vocabulary'])==24
        for band in ['A1','A2','B1','B2','C1','C2']:assert sum(u.get('band',u['id'])==band for u in c['units'])==4
        for u in c['units']:
            entries=c['vocabulary'][u['id']];assert len(entries)==8
            assert len({e['meaning'] for e in entries})==8
            source=' '.join([u['reading'],u['listen']]+[p[0] for p in u['writing']['phrases']]+[t[0] for t in u['turns']]).lower()
            for e in entries:
                assert e['text'] and e['meaning']
                assert re.search(r'(?<!\w)'+re.escape(e['text'].lower())+r'(?!\w)',source),(lang,u['id'],e['text'])
        deck={d['id']:d for d in c['deck']};assert len(deck)==len(c['deck'])
        previous={}
        for u in c['units']:
            if u['id'] in NEW:continue
            for text,meaning in u['writing']['phrases']:previous.setdefault(lang+':'+fold(text),(text,meaning))
        for id,(text,meaning) in previous.items():
            assert id in deck and deck[id]['text']==text and deck[id]['meaning']==meaning,(lang,id)
        assert len(previous)==143
        if lang=='es':assert len({d['id'] for d in deck.values() if d['text']=='llave'})==2
        reports.append({'language':lang,'units':24,'vocabularyEntries':192,'allFormsOccurInSources':True,'oldPhraseIdentitiesPreserved':143,'senseAwareReviewCards':len(deck)})
    out=ROOT/'output/vocabulary-study';out.mkdir(parents=True,exist_ok=True)
    (out/'source-verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2),encoding='utf8')
    print('All 384 vocabulary entries match unit sources; old review identities and distinct word senses are preserved.')
if __name__=='__main__':main()
