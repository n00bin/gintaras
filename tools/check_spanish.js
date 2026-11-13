// Semantic release checks beyond the shared structural course checker.
const fs=require('fs'),cp=require('child_process'),assert=require('assert');
const source=fs.readFileSync('lang/es.js','utf8');
const pre=`function norm(s){return s.toLowerCase().replace(/[.,!?;:"'¿¡]/g,'').replace(/\\s+/g,' ').trim()}function esc(s){return s}`;
function load(s){const out={};new Function('out',pre+s+';Object.assign(out,{ITEMS,CONVS,PATH,COURSE,LESSON_TIPS,SPEAK_TIPS,PATTERNS,GRAMMAR,MAKE,SMAP,PICTURE_ASSETS,pronFor,persText,persClips,ME_BANK});')(out);return out;}
const c=load(source);
const raw=cp.execFileSync('git',['show','cf2b092:lang/es.js'],{encoding:'utf8'});
const old={};new Function('out',pre+raw+';out.items=ITEMS.map(i=>[i.id,i.lt,i.en,i.alt]);out.convs=CONVS.map(c=>[c.id,c.all.filter(l=>l.lt).map(l=>[l.id,l.lt,l.en])]);')(old);
const corrections={'u0b-1:0':'coffee'}; // Clarify the pictured drink; its Spanish text, ID and audio stay the same.
assert.deepStrictEqual(c.ITEMS.filter(i=>old.items.some(x=>x[0]===i.id)).map(i=>[i.id,i.lt,i.en]),old.items.map(x=>[x[0],x[1],corrections[x[0]]||x[2]]),'Starter item IDs or meanings changed');
for(const [id,,,alts] of old.items)assert(alts.every(a=>c.ITEMS.find(i=>i.id===id).alt.includes(a)),'Starter accepted alternative removed: '+id);
for(const [id,lines] of old.convs)assert.deepStrictEqual(c.CONVS.find(c=>c.id===id).all.filter(l=>l.lt).map(l=>[l.id,l.lt,l.en]),lines,'Starter conversation IDs or text changed');
const tok=s=>(s||'').toLowerCase().replace(/<[^>]+>/g,'').match(/[\p{L}]+/gu)||[];
const known=new Set(['tomás','mariana','diego']);let utterances=0;
const newIds=new Set(require('./spanish/practice').convs.map(c=>c.id));
for(const part of c.PATH){if(typeof part!=='string')continue;const conv=c.CONVS.find(v=>v.id===part);if(conv){
 if(newIds.has(part))for(const line of conv.all){if(!line.lt)continue;for(const word of tok(line.lt))assert(known.has(word),`${part}: untaught ${word} in ${line.lt}`);for(const wrong of line.no||[])for(const word of tok(wrong[0]))assert(known.has(word),`${part}: untaught distractor ${word}`);utterances++;}
 }else{const unit=c.COURSE.find(u=>u.id===part);assert(unit,part);for(const lesson of unit.lessons.filter(l=>!l.speak)){for(const i of lesson.items)tok(i.lt).concat((i.alt||[]).flatMap(tok)).forEach(w=>known.add(w));assert(c.LESSON_TIPS[lesson.id],`${lesson.id}: no tip`);
 if(lesson===unit.lessons[0]&&c.PATTERNS[part])for(const row of c.PATTERNS[part].rows)for(const slot of row)for(const word of tok(slot[0]))assert(known.has(word),`${part}: pattern introduces ${word} too early`);}}
}
const ids=c.ITEMS.map(i=>i.id);assert.equal(new Set(ids).size,ids.length,'Duplicate card IDs');
assert.equal(new Set(c.PATH.filter(x=>typeof x==='string')).size,c.PATH.filter(x=>typeof x==='string').length,'Duplicate path entries');
for(const line of c.ITEMS.concat(c.ME_BANK,c.CONVS.flatMap(v=>v.all.filter(l=>l.lt)))){const pron=c.pronFor(line.lt);assert(pron&&!/undefined|NaN|[áéíóúñü]/i.test(pron),`Invalid respelling ${line.lt}: ${pron}`);}
assert(c.persText('Estoy enfermo.','me',{g:'f'})==='Estoy enferma.');
assert(c.persText('Soy alérgico a esta medicina.','me',{g:'f'})==='Soy alérgica a esta medicina.');
let missing=0;for(const voice of ['ona','leonas'])for(const it of c.ITEMS)if(!(c.SMAP[voice]&&c.SMAP[voice][it.unit.id]&&c.SMAP[voice][it.unit.id][it.id]))missing++;
const audio=JSON.parse(cp.execFileSync('node',['tools/audio_list.js','lang/es.js'],{encoding:'utf8'}));
let castMissing=0;
for(const [group,entries] of Object.entries(audio.groups))for(const entry of entries){const base=group==='me2'?entry.id.slice(4).split('~')[0]:entry.id,who=audio.speakers[base];
 const voices=who==='me'?Object.values(audio.meGv):audio.castGv[who]?[audio.castGv[who]]:[];
 for(const voice of voices)if(!audio.smap[voice]?.[group]?.[entry.id])castMissing++;
}
if(process.argv.includes('--require-audio')){assert.equal(missing,0,'Missing lesson recordings');assert.equal(castMissing,0,'Missing conversation character recordings');
 for(const [voice,groups] of Object.entries(c.SMAP))for(const [group,clips] of Object.entries(groups)){
  assert(fs.existsSync(`audio/es/${voice}_${group}.mp3`),`Missing audio file ${voice}_${group}`);
  for(const [id,[start,duration]] of Object.entries(clips))assert(Number.isFinite(start)&&start>=0&&Number.isFinite(duration)&&duration>0,`Invalid audio segment ${id}`);
 }}
console.log(JSON.stringify({units:c.COURSE.length,cards:c.ITEMS.length,conversations:c.CONVS.length,new_conversation_utterances_checked:utterances,starter_ids:'unchanged',missing_lesson_recordings:missing,missing_character_recordings:castMissing,checks:'passed'}));
