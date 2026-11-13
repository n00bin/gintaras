"""Compile manually authored parallel meanings into immutable source-study entries.

This does not translate or assign proficiency. Sentence counts and exact source
text are pinned when compiling; a source change requires reviewing the pairs.
"""
import json,re,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]


def sentences(text):
    return [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+',text) if s.strip()]


def compile_band(band,meanings):
    rows={}
    for lang in ['lt','es']:
        program="global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};require('./writing-content.js');require('./skills-content.js');require('./curriculum-content.js');console.log(JSON.stringify(WordamiSkillsContent));"
        data=json.loads(subprocess.check_output(['node','-e',program,lang],cwd=ROOT).decode('utf8'))
        rows[lang]={}
        for unit in data['units']:
            if (unit.get('band') or unit['id'])!=band:continue
            uid=unit['id'];pairs=[]
            for kind in ['reading','listen']:
                texts=sentences(unit[kind]);translation=meanings[lang][uid][kind]
                assert len(texts)==len(translation),(lang,uid,kind,len(texts),len(translation))
                pairs.extend({'text':text,'meaning':meaning,'context':text,'source':kind} for text,meaning in zip(texts,translation))
            pairs.extend({'text':t[0],'meaning':t[1],'context':t[0],'source':'partner'} for t in unit['turns'])
            pairs.extend({'text':t[0],'meaning':t[1],'context':t[0],'source':'strategy'} for t in unit.get('strategies',[]))
            for index,(_,source) in enumerate(unit['writing'].get('sources',[])):
                kind='source-'+str(index);texts=sentences(source);translation=meanings[lang][uid][kind]
                assert len(texts)==len(translation),(lang,uid,kind,len(texts),len(translation))
                pairs.extend({'text':text,'meaning':meaning,'context':text,'source':kind} for text,meaning in zip(texts,translation))
            assert all(p['text'] and p['meaning'] for p in pairs)
            rows[lang][uid]=pairs
    encoded=json.dumps(rows,ensure_ascii=False,indent=1)
    source="""/* Explicit source-expression teaching. Full expressions are not word/lemma counts. */
(()=>{'use strict';
const base=window.WordamiSourceSupport,course=window.WordamiSkillsContent,vocab=window.WordamiVocabularyContent;
if(!base||!course||!vocab)return;
const authored=ROWS;
const tokens=text=>String(text).normalize('NFC').toLocaleLowerCase(LANG.code).match(/\\p{L}+/gu)||[];
const taught=new Set(),units={...base.units};
for(const unit of course.units){
 for(const phrase of unit.writing.phrases)for(const word of tokens(phrase[0]))taught.add(word);
 for(const entry of vocab.units[unit.id]||[])for(const word of tokens(entry.text))taught.add(word);
 if(authored[LANG.code]?.[unit.id]){
  const entries=authored[LANG.code][unit.id];
  const sources=[unit.reading,unit.listen,...unit.turns.map(t=>t[0]),...(unit.strategies||[]).map(t=>t[0]),...(unit.writing.sources||[]).map(s=>s[1])];
  if(entries.every(e=>sources.some(source=>source.includes(e.text)))){
   units[unit.id]=[];
   for(const entry of entries){if(tokens(entry.text).some(word=>!taught.has(word))){units[unit.id].push(entry);for(const word of tokens(entry.text))taught.add(word);}}
  }
 }
 for(const entry of units[unit.id]||[])for(const word of tokens(entry.text))taught.add(word);
}
window.WordamiSourceSupport=Object.freeze({...base,units});
})();
""".replace('ROWS',encoded)
    target=ROOT/(band.lower()+'-source-support.js');target.write_text(source,encoding='utf8')
    print('Authored '+target.name+': '+str(sum(len(p) for lang in rows.values() for p in lang.values()))+' source-expression pairs before cumulative filtering.')
