// Apply only explicit reviewed image mappings without rebuilding any curriculum sections.
const fs=require('fs'),assert=require('assert/strict');
const file='lang/es.js',before=fs.readFileSync(file,'utf8');
function pack(s){const c={};new Function('c','function esc(s){return s};function norm(s){return s.toLowerCase().trim()};'+s+';Object.assign(c,{ITEMS,PICTURE_ASSETS,PATH,SMAP,CONVS});')(c);return c;}
const old=pack(before),approved=new Set(JSON.parse(fs.readFileSync('docs/art-direction/visual-review.json','utf8')).approved_ids);
const rows=JSON.parse(fs.readFileSync('docs/spanish/shared-art-approved.json','utf8')).mappings;
if(fs.existsSync('docs/spanish/generated-art-approved.json'))rows.push(...JSON.parse(fs.readFileSync('docs/spanish/generated-art-approved.json','utf8')).mappings);
const pattern=/(\/\/ BEGIN SPANISH PICTURES\s*Object.assign\(PICTURE_ASSETS,)(\{[\s\S]*?\})(\);)/;
const match=before.match(pattern);assert(match);
const map=JSON.parse(match[2]);
for(const row of rows){assert(old.ITEMS.some(i=>i.lt===row.word&&i.en===row.en));assert(approved.has(row.asset.split('/')[1]));assert(fs.existsSync('pics/'+row.asset+'.webp'));assert(!old.PICTURE_ASSETS[row.word]||old.PICTURE_ASSETS[row.word]===row.asset);map[row.word]=row.asset;}
const after=before.replace(pattern,(_,a,b,c)=>a+JSON.stringify(map,null,2)+c),now=pack(after);
const words=c=>c.ITEMS.map(i=>[i.id,i.lt,i.en,i.alt,i.unit.id,i.lesson.id,i.au]);
assert.deepEqual(words(now),words(old));
for(const key of ['PATH','SMAP'])assert.deepEqual(now[key],old[key],key);
assert.deepEqual(now.CONVS.map(c=>[c.id,c.all.map(l=>[l.id,l.lt,l.en])]),old.CONVS.map(c=>[c.id,c.all.map(l=>[l.id,l.lt,l.en])]));
assert.equal(before.replace(pattern,''),after.replace(pattern,''));
fs.writeFileSync(file,after);
const backlogFile='docs/spanish/artwork-pending.json',backlog=JSON.parse(fs.readFileSync(backlogFile,'utf8'));
backlog.jobs=backlog.jobs.filter(j=>!now.PICTURE_ASSETS[j.word]);
backlog.priority='Lithuanian artwork completed and live in 3.119. Continue Spanish in the approved shared style; preserve intentional text tiles and all course content.';
fs.writeFileSync(backlogFile,JSON.stringify(backlog,null,2)+'\n');
console.log(JSON.stringify({applied:rows.length,remainingAuthoringBacklog:backlog.jobs.length,contentProgressAndAudioUnchanged:true}));
