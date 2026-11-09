// Freeze a resumable inventory for the approved-style migration. No course words or IDs change.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.join(__dirname, '..');
const dir = path.join(root, 'docs/art-direction');
const inventory = JSON.parse(fs.readFileSync(path.join(dir, 'lt-inventory.json'), 'utf8'));
const shared = {'kava':'coffee','šokoladas':'chocolate','žirafa':'giraffe','viešbutis':'hotel','telefonas':'telephone'};
const identity = {
  learner:'Tomas, friendly young adult learner with light warm skin, short light brown hair, amber jumper, navy trousers, cream shoes, no facial hair or glasses',
  ruta:'Rūta, young adult Lithuanian woman with light warm skin, long straight dark brown hair with short blunt fringe, pine green blouse with a few simple dark leaf motifs, coral trousers, cream shoes',
  jonas:'Jonas, young adult Lithuanian man with light warm skin, short wavy dark brown hair, neat dark moustache, sky blue overshirt over navy T-shirt and backpack straps',
  danute:'Danutė, older Lithuanian woman with light warm skin, short white bob, small round dark glasses, coral hoodie, navy trousers',
  egle:'Eglė, young adult Lithuanian woman with light warm skin, dark high ponytail, short fringe, white scrunchie, pale cream scarf and turquoise top',
  darius:'Darius, adult Lithuanian man with light warm skin, curly dark hair, short neat dark goatee, navy open overshirt over turquoise T-shirt',
};
// The phrase scene must convey the action without spelling the answer. Each scene is one separate production asset.
const scenes = {
  'Labas':['ruta','Rūta facing the viewer, smiling warmly and waving one large rounded hand.'],
  'Sveiki':['jonas','Jonas politely greeting Danutė with a respectful small open-handed gesture. Both fully visible.'],
  'Labas rytas':['ruta','Rūta greeting the viewer, with one small rising sun peeking from a simple window behind her.'],
  'Laba diena':['jonas','Jonas greeting the viewer with one small bright sun high beside him.'],
  'Labas vakaras':['danute','Danutė waving hello beside a small simple window showing a dark evening sky and crescent moon.'],
  'Labanakt':['learner','Tomas peacefully sleeping under a turquoise blanket, small crescent moon above.'],
  'Viso gero':['danute','Danutė walking away with a shopping bag, looking back and waving goodbye.'],
  'Iki':['ruta','Rūta walking away casually while waving behind her with a happy smile.'],
  'Ačiū':['learner','Tomas warmly thanking Danutė, hand on chest, smiling, a small coral heart between them.'],
  'Prašau':['learner','Tomas politely holding out both open hands asking Danutė for a coffee cup she is holding.'],
  'Taip':['learner','Tomas happily nodding yes with a large clear thumbs-up gesture.'],
  'Ne':['learner','Tomas gently shaking his head no and holding one open palm out, friendly firm expression.'],
  'Atsiprašau':['learner','Tomas apologetically holding his hand on his chest beside a small spilled cup, embarrassed gentle expression.'],
  'Gerai':['ruta','Rūta smiling calmly and making an OK gesture with a chunky rounded hand.'],
  'Kaip sekasi?':['ruta','Rūta looking attentively toward the learner with an open questioning hand, a small coral question mark near her head.'],
  'Puikiai':['learner','Tomas beaming with delight, both arms lifted, two small amber celebratory sparks.'],
  'Nieko tokio':['danute','Danutė reassuring a worried Tomas with an easy relaxed smile and open palm beside a tiny spilled cup.'],
  'Malonu susipažinti':['ruta','Rūta and Tomas meeting for the first time, smiling with a simple clearly formed handshake.'],
  'Iki pasimatymo':['jonas','Jonas waving goodbye to Tomas while gesturing ahead to a small blank calendar with a heart, implying meeting again.'],
  'Sėkmės':['egle','Eglė encouraging Tomas before a challenge with an upbeat thumbs-up and small four-leaf clover.'],
  'Aš':['learner','Tomas pointing gently to his own chest with one rounded hand.'],
  'Tu':['learner','Tomas looking toward the viewer and pointing gently toward them with an outstretched hand.'],
  'Jis':['ruta','Rūta pointing to Jonas standing beside her; emphasize the man as the subject.'],
  'Ji':['jonas','Jonas pointing to Rūta standing beside him; emphasize the woman as the subject.'],
  'Mes':['learner','Tomas and Rūta standing together, Tomas making an inclusive gesture toward both of them.'],
  'Aš esu Tomas':['learner','Tomas smiling and indicating his own chest, a small blank name badge on his jumper.'],
  'Tu esi Jonas?':['learner','Tomas asking Jonas about his identity, gesturing toward Jonas with a question mark between them.'],
  'Jis yra Jonas':['ruta','Rūta introducing Jonas with an open hand toward him; Jonas wears a blank name badge.'],
  'Ji yra Rūta':['jonas','Jonas introducing Rūta with an open hand toward her; Rūta wears a blank name badge.'],
  'Mes esame čia':['learner','Tomas and Rūta standing together at a large turquoise location pin on a small simple patch of ground.'],
  'Jūs':['learner','Tomas politely addressing two adults across from him, his open hand indicating the listeners together.'],
  'Jie':['jonas','Jonas and Darius together as the subjects, a small pointing hand from outside the composition indicating both men.'],
  'Jos':['ruta','Rūta and Eglė together as the subjects, a small pointing hand from outside the composition indicating both women.'],
  'Mano vardas Tomas':['learner','Tomas introducing himself, pointing to a blank coral-and-cream name badge on his own chest.'],
  'Koks tavo vardas?':['egle','Eglė asking Tomas his name, indicating a blank name badge with a small coral question mark.'],
  'Aš esu iš Amerikos':['learner','Tomas introducing himself beside a small clearly recognizable United States flag. No words.'],
  'Iš kur?':['ruta','Rūta inquisitively gesturing toward a simple globe, small coral question mark above it.'],
  'Kavos?':['danute','Danutė offering a steaming turquoise cup of dark coffee toward the viewer, questioning smile.'],
  'Arbatos?':['danute','Danutė offering a turquoise tea cup with tea bag tag and pale amber tea, questioning smile.'],
  'Gerai, ačiū':['learner','Tomas smiling calmly with hand on chest in gratitude and one small coral heart.'],
  'O tau?':['learner','Tomas responding to Rūta and returning an open questioning gesture toward her; small curved arrow and question mark between them.'],
  'Neblogai':['learner','Tomas with a mildly pleased expression, a small reserved smile and one relaxed thumbs-up.'],
  'Taip sau':['learner','Tomas with neutral mouth and a flat hand gently tilted side to side, clearly expressing so-so.'],
  'Man irgi gerai':['learner','Tomas and Rūta both smiling calmly and giving each other a small thumbs-up.'],
  'Aš irgi':['learner','Tomas gesturing toward his own chest while Rūta shows the same happy reaction; matching tiny hearts above both.'],
  'Ką veiki?':['jonas','Jonas making a curious open-palmed gesture to Tomas, with tiny simple book and football thought icons beside the question mark.'],
  'Nieko ypatingo':['jonas','Jonas shrugging casually with a neutral relaxed smile and both palms open.'],
  'Labai malonu':['learner','Tomas and Eglė warmly greeting each other with a handshake and delighted expressions, small heart above.'],
  'Ir tau':['egle','Eglė returning a friendly good-wishes gesture toward Tomas, two small curved arrows connecting their encouraging smiles.'],
  'Aš truputį kalbu lietuviškai':['learner','Tomas speaking with a small speech bubble containing ONLY a Lithuanian yellow-green-red horizontal tricolour; his fingers show a small amount.'],
  'Kaip tai pasakyti lietuviškai?':['learner','Tomas pointing to a red apple and looking questioningly at Rūta; speech bubble contains a Lithuanian yellow-green-red tricolour and question mark only.'],
  'Ką reiškia šis žodis?':['learner','Tomas pointing to one highlighted blank line in an open book with a curious question mark. No actual words or letters.'],
  'Aš nelabai suprantu':['learner','Tomas confused, asymmetrical eyebrows, open shrugging hands, large coral question mark beside his head.'],
  'Ar gali pakartoti?':['learner','Tomas cupping one hand by his ear and gesturing for repetition, small circular repeat arrow beside him.'],
  'Palauk':['jonas','Jonas holding up one large open palm to ask someone to wait, calm patient expression.'],
  'Teisingai':['egle','Eglė confidently pointing toward a large green check mark, pleased expression.'],
  'Aš mokausi':['learner','Tomas seated reading an open book with a pencil beside him, focused happy expression.'],
  'Dar kartą':['learner','Tomas encouraging a repeat attempt, gesturing toward a large turquoise circular repeat arrow.'],
  'Supratau':['egle','Eglė with an aha expression and one raised finger, small amber light bulb beside her head.'],
  'Aš noriu kavos':['learner','Tomas eagerly looking toward a thought bubble containing a steaming coffee cup.'],
  'Aš valgau duoną':['learner','Tomas taking a bite from a clearly recognizable slice of bread, simple crumbs, no other food.'],
  'Aš geriu vandenį':['learner','Tomas sipping clear water from a transparent turquoise-tinted drinking glass.'],
  'Skanu!':['learner','Tomas savoring a bite of food with closed happy eyes and a clear approving OK hand gesture.'],
  'Aš esu alkanas':['learner','Tomas holding his hungry stomach beside a completely empty plate, yearning expression.'],
  'Sąskaitą, prašau':['learner','Tomas asking a server for a restaurant bill, holding a small receipt with blank lines, card and a few coins beside it.'],
  'Skanaus!':['danute','Danutė warmly presenting a prepared meal on a plate to Tomas, welcoming open hand, happy expressions.'],
  'Į sveikatą!':['jonas','Jonas and Tomas smiling and gently clinking two glasses together in a toast; two small amber sparks.'],
  'Ar nori kavos?':['danute','Danutė holding a coffee cup toward Tomas, asking with a friendly question mark.'],
  'Aš noriu arbatos':['learner','Tomas eagerly looking toward a thought bubble containing a pale amber tea cup with tea bag tag.'],
  'Aš valgau mėsą':['learner','Tomas eating a small piece of cooked steak with a fork, plate of meat clearly visible.'],
  'Aš valgau žuvį':['learner','Tomas eating a small bite from a clearly recognizable cooked fish on his plate.'],
  'Dar sriubos?':['danute','Danutė offering an additional ladle of soup over Tomas’s partly empty bowl, friendly questioning look.'],
  'Taip, dar truputį':['learner','Tomas agreeing with a thumbs-up and pinching fingers to show a small amount while Danutė holds a ladle above his soup bowl.'],
  'Aš sotus':['learner','Tomas leaning back contentedly with hand resting on his full stomach, empty plate in front of him.'],
  'Paduok druską, prašau':['learner','Tomas politely reaching toward a clearly recognizable small salt shaker that Rūta is passing to him across a table.'],
  'Viskas labai skanu':['learner','Tomas looking delighted at a small spread of soup, bread and cake, giving a clear approving OK gesture.'],
  'Ačiū už viską':['learner','Tomas warmly thanking Danutė across a cleared dinner table, hand on chest, happy smiles and a small coral heart between them.'],
  'kiaušinis':['learner','One plain WHITE chicken egg and one neatly cut half egg with a large clearly visible round golden-yellow yolk. The white shell has NO spots or brown markings. Make it instantly recognizable as an egg and visually distinct from a potato. No plate, people, faces, text or decorations.'],
  'arbatpinigiai':['learner','A small restaurant receipt with blank lines and a few amber coins deliberately left beside it as a gratuity for the server. This means a restaurant TIP, not advice. No people, light bulbs, letters, words or numerals.'],
  'Niekas':['learner','An empty small waiting room with an open doorway and two visibly vacant chairs. There is NOBODY present: absolutely no actual people, faces or animals. Add a small simple person-count badge showing the numeral 0 to reinforce the absence of people. Do not show a shrugging person. No written words or letters.'],
  'tik':['learner','A single bright red apple is selected in the centre; a banana and pear off to the side are muted and crossed out with small coral crosses. Convey ONLY this one selected item, rather than a generic picture of coffee. No people, faces, letters or written words.'],
  'nes':['learner','One simple cause-and-effect illustration: Tomas’s elbow visibly knocks a drinking glass on the left, and water spills into a puddle on the right, with one clear curved arrow connecting the cause to its result. Emphasize the elbow knocking the glass as the reason BECAUSE. No thought bubbles about food, no text or letters.'],
};
const slug = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
['vienas','du','trys','keturi','penki','šeši','septyni','aštuoni','devyni','dešimt'].forEach((word,index)=>{
  const count=index+1;
  scenes[word]=['learner','Exactly '+count+' separate identical chunky amber pebbles, clearly countable, evenly spaced in at most two neat rows. This is a counting illustration: the exact count is essential. No additional dots, stars, decorations, numerals, letters, people or faces.'];
});
const colourWords={'raudonas':['red','#EF4444'],'mėlynas':['blue','#3182F6'],'žalias':['green','#22B65F'],'geltonas':['yellow','#FFD02F'],'juodas':['black','#15202B'],'baltas':['white','#FFFFFF'],'rudas':['brown','#8B542F'],'pilkas':['grey','#8A929B'],'rožinis':['pink','#F58ABF'],'oranžinis':['orange','#FF922F']};
Object.entries(colourWords).forEach(([word,[colour,hex]])=>{
  scenes[word]=['learner','One large simple rounded paint droplet, entirely '+colour+' ('+hex+'). The exact colour is the vocabulary meaning: do not substitute any other hue from the usual palette. '+(colour==='white'?'Use a small flat navy shape behind the WHITE droplet to keep its silhouette visible on light backgrounds. ':'')+'No other objects, people, faces, text, labels or decorative colours.'];
});
[['Septintą valandą',7],['Aštuntą valandą',8],['Dvyliktą valandą',12]].forEach(([word,hour])=>{
  scenes[word]=['learner','One clean analog clock showing exactly '+hour+' o’clock: long minute hand points straight up at twelve; short hour hand points exactly at '+hour+'. Use simple hour ticks without numerals or letters. Make the two hands easy to distinguish. No people, faces, text, extra clocks or decorations.'];
});
const seen = new Set(), jobs = [], mapping = {};
const overrideFile=path.join(dir,'art-job-overrides.json');
const overrides=fs.existsSync(overrideFile)?JSON.parse(fs.readFileSync(overrideFile,'utf8')):{};
for (const row of inventory.pictures) {
  if (row.picture.startsWith('#')) continue;
  if (shared[row.word]) { mapping[row.word] = 'art-v2/' + shared[row.word]; continue; }
  const revisions={'kiaušinis':'egg-v2','Niekas':'nobody-v2','tik':'only-v2','nes':'because-v2'};
  let id = overrides[row.word]?.id || revisions[row.word] || slug(row.en);
  if (seen.has(id)) id += '-' + crypto.createHash('sha1').update(row.word).digest('hex').slice(0,6);
  seen.add(id);
  mapping[row.word] = 'art-v2/' + id;
  const scene = scenes[row.word];
  const actor = scene ? scene[0] : 'learner';
  const useLearner = !!scene || /^(I\b|I'm\b|My\b|We\b|Our\b|to\s)/i.test(row.en);
  const subject = scene ? scene[1] : 'Convey this Lithuanian vocabulary meaning accurately: "'+row.en+'" (Lithuanian: "'+row.word+'"). For a concrete thing or animal, show just that thing or animal with no people. If the noun names a person, family member or profession, depict the correct gender, age and role from the meaning; a mother or female doctor must be a woman, a child must be a child. For an adjective, show an unmistakable visual example. For a first-person action or phrase, show Tomas performing that exact action. For a relationship or grammar word, use a simple readable interaction rather than random symbols. Never write the answer or any translation. Lithuanian food cepelinai means potato dumplings, never aircraft. Colours, counts and clock times must match the meaning exactly, even when they need colours outside the usual palette. ';
  const actorBrief = useLearner ? identity[actor] : 'No fixed character identity is prescribed. Any character-sheet reference is a STYLE and proportion reference only here. Follow the vocabulary\'s actual role, age and gender; do not turn every person into the male learner. Concrete objects need no person.';
  const otherBrief = scene ? ' Other recurring identities if present: '+Object.entries(identity).filter(([k])=>k!==actor).map(([,v])=>v).join('; ')+'.' : '';
  const context = inventory.units.find(u=>u.id===row.unit)?.title || '';
  const prompt = 'Use case: stylized-concept. Asset type: ONE production vocabulary illustration for Gintaras, matching the approved attached style board. Vocabulary context: the beginner Lithuanian unit "'+context+'". Reference 1 is the authoritative illustration STYLE. Reference 2, if attached, is a CHARACTER identity reference only when the subject explicitly names that character; otherwise use it only for illustration style and proportions. Rounded geometric flat 2D cartoon, huge expressive white oval eyes, chunky rounded hands, bright solid turquoise/amber/coral/navy/cream, little detail, almost no outlines. No sketch strokes, realism, gradients, textures, ground plane or cast shadows. Subject: '+subject+' Primary character identity when a person is needed: '+actorBrief+'.'+otherBrief+' Composition: only the necessary people and objects, one centered complete scene, readable at 56px, square canvas, generous transparent margins, no cropped heads, hands or objects. TRUE transparent background. No text, letters, labels, logos, watermark, beige discs or busy scenery. Small punctuation, arrows and accurate national flags only when needed to show the meaning. Do NOT draw a grid, sheet, labelled card or multiple alternative illustrations.';
  jobs.push({id,word:row.word,en:row.en,unit:row.unit,actor,prompt:overrides[row.word]?.prompt || prompt});
}
fs.writeFileSync(path.join(dir,'lithuanian-art-jobs.json'),JSON.stringify({mapping,jobs},null,2)+'\n');
console.log(JSON.stringify({pictures:Object.keys(mapping).length,jobs:jobs.length,reused:Object.keys(shared).length,units:[...new Set(jobs.map(j=>j.unit))]}));
