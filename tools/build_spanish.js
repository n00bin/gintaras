// Compile authoring modules into the self-contained language pack used by the app.
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),file=path.join(root,'lang/es.js');
const units=require('./spanish/units'),practice=require('./spanish/practice');
const structures=require('./spanish/structures');
const glossary=require('./spanish/glossary.json');
// Explicit subject forms are also valid; do not add yo to an indirect-object construction such as me gusta.
for(const u of units)for(const l of u.lessons)for(const row of l.items){const [es,en]=row;
 if(/^I (?:am |have |want |need |do |work|eat|drink|live|learn|go |get |wake |take |return|rest|sleep|start|finish|like |prefer|can |cannot |speak|think|used |went|was |spoke|ate|lived|worked|bought|did|had|saw|arrived|will |feel|love|drank|studied|walked|rested|slept)/i.test(en)&&!/^(?:No )?me (?:gusta|gustan|encanta|duele|duelen|queda)/i.test(es)&&!/^I do (?:too|not \(in contrast\))/i.test(en))row[3]=['Yo '+es.charAt(0).toLowerCase()+es.slice(1)];
 if(/^We (?:are |speak|eat|live|learn|go |can )/i.test(en))row[3]=['Nosotros '+es.charAt(0).toLowerCase()+es.slice(1),'Nosotras '+es.charAt(0).toLowerCase()+es.slice(1)];}
for(const u of units)for(const l of u.lessons)for(const [es,en] of l.items){const match=/^(?:el|la|los|las) (\S+)$/.exec(es);if(match&&!glossary[match[1]])glossary[match[1]]=en.replace(/^the /,'');}
let text=fs.readFileSync(file,'utf8');
// In the Sounds unit this picture and word mean the drink, rather than an English café venue.
text=text.replace("['café','café',", "['café','coffee',");
function block(name,before,content){const start='// BEGIN SPANISH '+name,end='// END SPANISH '+name;
 const a=text.indexOf(start),b=text.indexOf(end);
 if(a>=0){if(b<a)throw Error('Broken marker '+name);text=text.slice(0,a)+start+'\n'+content+'\n'+text.slice(b);}
 else{const at=text.indexOf(before);if(at<0)throw Error('Missing insertion point '+before);text=text.slice(0,at)+start+'\n'+content+'\n'+end+'\n'+text.slice(at);}}
const json=x=>JSON.stringify(x,null,2);
block('UNITS','/* The learning path:',`COURSE.push(...${json(units.map(u=>({...u,lessons:u.lessons.map(({tip,...l})=>l)})))});`);
block('RULES','const LEVELS=',`LANG.freeOrder=false;\nLANG.bareLeft=['y','qué','quién','dónde','cuándo','por','cómo','cuánto','cuál','de','a','con','en','pero','o','no','sí','aquí','allá'];\n// Spanish personal names keep their spelling in every sentence position.\nconst ltName=n=>String(n||'');`);
text=text.replace(/const PATH=\[[\s\S]*?\n\];/,`const PATH=${json(practice.path)};`);
block('GLOSSARY','/* Pictures for concrete words.',`Object.assign(GLUE,${json(glossary)});`);
const meanings={
 'el agua':'water','el pan':'bread','la leche':'milk','el queso':'cheese','la carne':'meat','el pollo':'chicken','el pescado':'fish',
 'el huevo':'egg-v2','la sopa':'soup','la manzana':'apple','la papa':'potato','el té':'tea','la cerveza':'beer','el azúcar':'sugar','la sal':'salt',
 'el restaurante':'restaurant','el menú':'menu','la propina':'tip',
 'Tengo hambre':'i-am-hungry',
 'Hola':'hello','Buenos días':'good-morning','Buenas tardes':'good-day','Buenas noches':'good-evening',
 'Adiós':'goodbye','Hasta luego':'goodbye-until-we-meet','Nos vemos':'bye','Gracias':'thank-you','Por favor':'please',
 'Sí':'yes','No':'no','Perdón':'sorry','Está bien':'ok','¿Cómo estás?':'how-are-you','Muy bien':'great',
 'No pasa nada':'no-problem','Mucho gusto':'nice-to-meet-you','Buena suerte':'good-luck',
 'Yo':'i-as-in-i-am','Tú':'you-to-a-friend','Él':'he','Ella':'she','Nosotros':'we',
 'Ustedes':'you-formal-or-plural','Ellos':'they-men-or-mixed','Ellas':'they-women',
 'Me llamo Tomás':'my-name-is-tomas','¿Cómo te llamas?':'what-is-your-name','Soy de Estados Unidos':'i-am-from-america',
 'Bien, gracias':'fine-thanks','¿Y tú?':'and-you-after-how-are-you','Más o menos':'so-so','Yo también':'me-too',
 '¿Qué haces?':'what-are-you-up-to','Nada especial':'nothing-special','Encantado':'very-nice-to-meet-you',
 'Igualmente':'you-too','No entiendo':'i-don-t-understand','¿Puedes repetir?':'can-you-repeat-that-to-a-friend',
 'Estoy aprendiendo':'i-m-learning','Otra vez':'one-more-time','Ya entendí':'got-it',
 'Estamos aquí':'we-are-here','No como carne':'i-don-t-eat-meat',
 '¿Qué recomienda?':'what-do-you-recommend','agua sin gas':'still-water','con leche':'with-milk',
 'Está rico':'tasty','La cuenta, por favor':'the-bill-please','¿Puedo pagar con tarjeta?':'can-i-pay-by-card',
 'en efectivo':'in-cash','¡Buen provecho!':'enjoy-your-meal','regreso':'i-m-coming-back',
 'y':'and','pero':'but','o':'or','entonces':'then','ya':'already','todavía':'still-yet','cuando':'when-not-a-question',
 'todos':'everyone','Gracias por todo':'thanks-for-everything','¡Qué bueno!':'that-s-great',
};
// Explicitly reviewed cross-language reuse; never infer assets from English at build time.
const sharedArt=JSON.parse(fs.readFileSync(path.join(root,'docs/spanish/shared-art-approved.json'),'utf8'));
const generatedArtFile=path.join(root,'docs/spanish/generated-art-approved.json');
const generatedArt=fs.existsSync(generatedArtFile)?JSON.parse(fs.readFileSync(generatedArtFile,'utf8')).mappings:[];
for(const row of [...sharedArt.mappings,...generatedArt])meanings[row.word]=row.asset.replace(/^art-v2\//,'');
const reviewed=new Set(JSON.parse(fs.readFileSync(path.join(root,'docs/art-direction/visual-review.json'),'utf8')).approved_ids);
const assets={};for(const [word,id] of Object.entries(meanings)){if(!fs.existsSync(path.join(root,'pics/art-v2',id+'.webp')))throw Error('Missing shared asset '+id);if(!reviewed.has(id))throw Error('Unreviewed shared asset '+id);assets[word]='art-v2/'+id;}
const tiles={};for(const u of units)if(['u2','u5','u18'].includes(u.id))for(const l of u.lessons)for(const [w,en] of l.items)if(!w.includes(' '))tiles[w]='#'+en;
block('PICTURES','function picFor(',`Object.assign(PICTURE_ASSETS,${json(assets)});\nObject.assign(EMOJI,${json(tiles)});\n// Abstract words and phrases wait for a reviewed illustration rather than a misleading symbol.\nconst NO_PIC=new Set(${json(units.flatMap(u=>u.lessons.flatMap(l=>l.items.map(i=>i[0]))).filter(w=>!tiles[w]))});`);
const tips={};units.forEach(u=>u.lessons.forEach(l=>tips[l.id+'-1']=l.tip));
const speak={};units.forEach(u=>speak[u.id]='Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.');
block('PRACTICE','const ROLE_CLASS=',`Object.assign(LESSON_TIPS,${json(tips)});\nObject.assign(SPEAK_TIPS,${json(speak)});\nObject.assign(PATTERNS,${json(structures.patterns)});\nDRILLS.push(...${json(practice.drills)});\nconst GRAMMAR=${json(structures.grammar)};\nfunction grammarFor(d){return GRAMMAR.find(g=>g.u===d.u&&((g.ans||[]).includes(norm(d.ans))||(g.frame||[]).some(w=>norm(d.frame).split(' ').includes(w))));}\nconst MAKE=${json(structures.make)};`);
// Every typed reply gets plausible, already-taught distractors for the help ladder.
const convs=JSON.parse(JSON.stringify(practice.convs));
function options(lines){for(const l of lines){if(l[0]==='m'){l[4]=[['Hola','Hello'],['Gracias','Thank you'],['No entiendo',"I do not understand"]].filter(x=>x[0].toLowerCase()!==l[1].replace(/[.!?¿¡]/g,'').toLowerCase()).slice(0,2);}if(l[0]==='c')for(const o of l[1])options(o[3]);}}
convs.forEach(c=>options(c.lines));
block('CONVERSATIONS','const CONV_BY=',`CONVS.push(...${json(convs)});`);
const skills=units.map(u=>['es-'+u.id,'💬',u.en.toLowerCase(),u.lessons.map(l=>l.id),practice.path.slice(practice.path.indexOf(u.id)+1).find(x=>typeof x==='string'&&x.startsWith('cv'))]);
block('SKILLS','/* ===================== ANSWER FEEDBACK',`CANDO.push(...${json(skills)});`);
fs.writeFileSync(file,text);
console.log(`Spanish expanded: ${units.length} new units, ${units.reduce((n,u)=>n+u.lessons.reduce((n,l)=>n+l.items.length,0),0)} new cards, ${convs.length} new conversations.`);
