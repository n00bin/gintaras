// Guard old live lesson identities while allowing explicitly added teaching.
const fs=require('fs'),cp=require('child_process');
const prefix='function norm(s){return s.toLowerCase().trim()}function esc(s){return s;}';
function read(text){const out={};new Function('out',prefix+text+';Object.assign(out,{COURSE,ITEMS,PATH,SMAP,pronFor,picFor});')(out);return out;}
const old=read(cp.execFileSync('git',['show','d27b417882fee2a8fe7645a4fb072d5b5e4da8a7:lang/lt.js'],{encoding:'utf8',maxBuffer:16000000}));
const now=read(fs.readFileSync('lang/lt.js','utf8'));
for(const i of old.ITEMS){const n=now.ITEMS.find(n=>n.id===i.id);if(!n||n.lt!==i.lt||n.en!==i.en||n.lesson.id!==i.lesson.id||n.unit.id!==i.unit.id)throw Error('Changed original card '+i.id);}
if(JSON.stringify(old.PATH)!==JSON.stringify(now.PATH))throw Error('Original PATH changed');
const months=['sausis','vasaris','kovas','balandis','gegužė','birželis','liepa','rugpjūtis','rugsėjis','spalis','lapkritis','gruodis'];
for(const text of months){const i=now.ITEMS.find(i=>i.lt===text);if(!i||!now.picFor(text)||!now.pronFor(text))throw Error('Missing month support: '+text);for(const voice of ['ona','leonas']){const group=i.id.match(/^([a-z]+\d+)/)[1];if(!now.SMAP[voice]?.[group]?.[i.id])throw Error('Missing audio for '+text+' '+voice);}}
console.log('Preserved all '+old.ITEMS.length+' original cards, lesson IDs and PATH. All 12 months have teaching, picture support, pronunciation guides and both recordings.');
