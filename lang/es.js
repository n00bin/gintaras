/* Gintaras language file: Spanish (Mexico). Same shape as lang/lt.js: the course, conversations, sounds-like guide,
   audio map, About-me phrases, tips, level titles, and the helpers that know Spanish grammar.
   Mexican Spanish: ustedes (never vosotros), Mexican everyday words, Latin American voices (Google es-US). */
const LANG={code:'es',en:'Spanish',own:'Español',speech:'es-MX',tts:'es-US',letters:'áéíóúñü',audio:'audio/es/',
  hello:'¡Hola!',praise:['¡Muy bien!','¡Eso!','¡Bien!'],top:'¡Qué padre!',decoys:'aeiolnrstudmcpbáéó',
  dropWho:'Both are right: Spanish usually leaves out <b>yo</b>, <b>tú</b> and <b>nosotros</b>, because the ending of the doing word already says who.'};
const LEVELS=[[0,'Turista','Tourist'],[150,'Viajero','Traveler'],[400,'Conocido','Acquaintance'],[800,'Amigo','Friend'],[1500,'Chilango','Mexico City local'],[3000,'Mexicano de corazón','Mexican at heart']];
/* ===================== COURSE CONTENT ===================== */
/* item: [es, en, note?, altEs?] */
const COURSE = [
{id:'u0',title:'Sonidos',en:'Sounds',tip:'Spanish is written the way it sounds, and the five vowels never change: <b>a</b> "ah", <b>e</b> "eh", <b>i</b> "ee", <b>o</b> "oh", <b>u</b> "oo". A few letters trick English speakers: <b>j</b> is a breathy "h", <b>ll</b> is "y", <b>ñ</b> is "ny", and <b>h</b> is silent. Good news: you already know every word in this unit.',lessons:[
 {id:'u0a',title:'Letters that trick you',items:[
  ['jirafa','giraffe','j sounds like a breathy English "h".'],
  ['tortilla','tortilla','ll sounds like the English "y".'],
  ['piña','pineapple','ñ sounds like the "ny" in "canyon".'],
  ['hotel','hotel','h is always silent: oh-TEHL.'],
  ['chocolate','chocolate','Every vowel is said, even the e at the end.'],
 ]},
 {id:'u0b',title:'Vowels, accents and the r',items:[
  ['café','café','A written accent marks the syllable you stress.'],
  ['teléfono','telephone','The accent pulls the stress: teh-LEH-foh-noh.'],
  ['guitarra','guitar','rr is a rolled r. A single r between vowels is one quick tap.'],
  ['taco','taco','Spanish vowels are short and pure: TAH-koh, with no "oo" glide at the end.'],
  ['cereal','cereal','c before e or i sounds like "s" in Mexico.'],
 ]},
]},
{id:'u1',title:'Lo básico',en:'Basics',tip:'Spanish has two ways to say "you": <b>tú</b> for friends, family and children, <b>usted</b> for strangers and older people. In Mexico, <b>ustedes</b> is "you all", for friends and strangers alike.',lessons:[
 {id:'u1a',title:'Greetings',items:[
  ['Hola','Hello','Works with anyone, at any time of day.'],
  ['Buenos días','Good morning','Until about noon.'],
  ['Buenas tardes','Good afternoon','From noon until it gets dark.'],
  ['Buenas noches','Good evening','After dark. Also "good night".'],
  ['Adiós','Goodbye'],
  ['Hasta luego','See you later','The everyday goodbye, even if you won\'t see them later.'],
  ['Nos vemos','See you','Casual. Literally "we see each other".'],
  ['Gracias','Thank you'],
  ['Por favor','Please'],
  ['De nada','You\'re welcome','Literally "of nothing".'],
 ]},
 {id:'u1b',title:'Yes, no, sorry',items:[
  ['Sí','Yes','With the accent it means "yes". Without it, si means "if".'],
  ['No','No'],
  ['Perdón','Sorry','Also "excuse me" when you need someone\'s attention.'],
  ['Con permiso','Excuse me','Said as you squeeze past someone or leave the table. Very Mexican, very polite.'],
  ['Está bien','OK','Also "it\'s fine". Among friends you will hear "Sale" too.'],
  ['¿Cómo estás?','How are you?','To a friend. To a stranger: "¿Cómo está?"'],
  ['Muy bien','Very well'],
  ['No pasa nada','No problem','Literally "nothing happens". The Mexican way to say it\'s fine.'],
  ['Mucho gusto','Nice to meet you','Literally "much pleasure".'],
  ['Buena suerte','Good luck'],
 ]},
 {id:'u1c',title:'Who I am',items:[
  ['Yo','I'],
  ['Tú','You','Informal, one person.'],
  ['Él','He','With the accent it means "he". Without it, el means "the".'],
  ['Ella','She'],
  ['Nosotros','We','A group of only women says "nosotras".'],
  ['Usted','You (polite)','For a stranger or someone older.'],
  ['Ustedes','You (all)','In Mexico, for any group: friends or strangers.'],
  ['Ellos','They (men or mixed)'],
  ['Ellas','They (women)'],
  ['Me llamo Tomás','My name is Tomás','Literally "I call myself Tomás".',['Mi nombre es Tomás']],
  ['¿Cómo te llamas?','What is your name?','Literally "how do you call yourself?"'],
  ['Soy de Estados Unidos','I am from the United States','Mexicans say Estados Unidos: "América" is the whole continent.'],
 ]},
]},
{id:'u21',title:'Plática',en:'Small talk',tip:'Most chats start the same way. Someone asks <b>¿Cómo estás?</b>, you answer, and you bounce it back with <b>¿Y tú?</b> In Mexico you will also hear <b>¿Qué onda?</b>, a friendly "what\'s up?"',lessons:[
 {id:'u21a',title:'How are you',items:[
  ['Bien, gracias','Fine, thanks'],
  ['¿Y tú?','And you?','Bounces the question back.'],
  ['Más o menos','So-so','Literally "more or less".'],
  ['Todo bien','All good'],
  ['Yo también','Me too'],
  ['¿Qué haces?','What are you up to?','Literally "what are you doing?"'],
  ['Nada especial','Nothing special'],
  ['¿Qué onda?','What\'s up?','Very Mexican and very casual. Answer "Todo bien" or "Nada especial".'],
  ['Encantado','Delighted to meet you','A woman says "Encantada".',['Encantada']],
  ['Igualmente','Likewise','The reply to "Mucho gusto" or to any good wish.'],
 ]},
 {id:'u21b',title:'When you get stuck',items:[
  ['Hablo un poco de español','I speak a little Spanish'],
  ['¿Cómo se dice en español?','How do you say it in Spanish?','Point at anything and ask.'],
  ['¿Qué significa esta palabra?','What does this word mean?'],
  ['No entiendo','I don\'t understand'],
  ['¿Puedes repetir?','Can you repeat that?','To a friend. To a stranger: "¿Puede repetir?"'],
  ['¿Mande?','Sorry, what?','The polite Mexican way to ask someone to say it again.'],
  ['Más despacio, por favor','Slower, please'],
  ['Estoy aprendiendo','I\'m learning','Say it and people slow down for you.'],
  ['Otra vez','One more time'],
  ['Ya entendí','Got it','Literally "now I understood".'],
 ]},
]},
];

/* The learning path: parts, units in teaching order, and a conversation every couple of units. */
const PATH=[
 {part:'First words',sub:'How Spanish sounds, hello, and set phrases to get by'},
 'u0','u1','cv1','u21','cv16',
];
const RESHAPE={};
(()=>{const U={};COURSE.forEach(u=>{U[u.id]=u;});COURSE.length=0;PATH.forEach(p=>{if(typeof p==='string'&&U[p])COURSE.push(U[p]);});})();
/* Small glossary of glue words so phrase cards can show what they are built from. */
const GLUE={'buenos':'good','buenas':'good','días':'days','tardes':'afternoons','noches':'nights','hasta':'until','luego':'later','nos':'each other','vemos':'we see',
 'por':'for','favor':'a favour','de':'of / from','nada':'nothing','con':'with','permiso':'permission','está':'it is','bien':'well','cómo':'how','estás':'you are',
 'muy':'very','pasa':'happens','mucho':'much','gusto':'pleasure','buena':'good','suerte':'luck','me':'myself','llamo':'I call','tomás':'Tomás (a name)','mi':'my','nombre':'name',
 'es':'is','te':'yourself','llamas':'you call','soy':'I am','estados':'States','unidos':'United','gracias':'thanks','y':'and','más':'more','o':'or','menos':'less',
 'todo':'all','también':'too','qué':'what','haces':'you do','especial':'special','onda':'vibe','hablo':'I speak','un':'a','poco':'little','español':'Spanish',
 'se':'one (does)','dice':'says','en':'in','significa':'means','esta':'this','palabra':'word','entiendo':'I understand','puedes':'can you','repetir':'repeat',
 'despacio':'slowly','estoy':'I am','aprendiendo':'learning','otra':'another','vez':'time','ya':'now','entendí':'I understood','encantada':'delighted (a woman)'};
/* Pictures for concrete words. "#..." is a text tile. */
const EMOJI={'jirafa':'🦒','tortilla':'🫓','piña':'🍍','hotel':'🏨','chocolate':'🍫','café':'☕','teléfono':'📱','guitarra':'🎸','taco':'🌮','cereal':'🥣',
 'Hola':'👋','Buenos días':'🌅','Buenas tardes':'☀️','Buenas noches':'🌙','Adiós':'👋','Hasta luego':'🔜','Nos vemos':'👀','Gracias':'🙏','Por favor':'🤲','De nada':'😊',
 'Sí':'👍','No':'👎','Perdón':'🙇','Con permiso':'🚶','Está bien':'👌','¿Cómo estás?':'🙂','Muy bien':'🤩','No pasa nada':'🤷','Mucho gusto':'🤝','Buena suerte':'🍀',
 'Yo':'🙋','Tú':'👉','Él':'👨','Ella':'👩','Nosotros':'🧑‍🤝‍🧑','Usted':'🧑‍💼','Ustedes':'👥','Ellos':'👬','Ellas':'👭','Me llamo Tomás':'🏷️','¿Cómo te llamas?':'📛','Soy de Estados Unidos':'🇺🇸',
 'Bien, gracias':'😊','¿Y tú?':'🔁','Más o menos':'😐','Todo bien':'✅','Yo también':'🙌','¿Qué haces?':'🤔','Nada especial':'🫥','¿Qué onda?':'🤙','Encantado':'😍','Igualmente':'🔄',
 'Hablo un poco de español':'🤏','¿Cómo se dice en español?':'💬','¿Qué significa esta palabra?':'📖','No entiendo':'😕','¿Puedes repetir?':'🔁','¿Mande?':'👂','Más despacio, por favor':'🐢',
 'Estoy aprendiendo':'📚','Otra vez':'🔂','Ya entendí':'💡'};
function picFile(e){let cps=[...e].map(ch=>ch.codePointAt(0).toString(16));if(!cps.includes('200d'))cps=cps.filter(c=>c!=='fe0f');return 'pics/'+cps.join('-')+'.svg';}
function picHtml(lt,cls){const v=EMOJI[lt];if(!v)return '';cls=cls||'';
  if(v[0]==='#')return '<span class="pic tile '+cls+'" aria-hidden="true">'+esc(v.slice(1))+'</span>';
  return '<img class="pic '+cls+'" src="'+picFile(v)+'" alt="" aria-hidden="true" data-e="'+esc(v)+'" onerror="this.replaceWith(this.dataset.e)">';}
/* Memory hooks: only where the hook is genuinely true or useful. */
const HOOK={'Gracias':'Same root as "grace" and "gratitude".','Por favor':'"For a favour": you are asking someone a favour.','De nada':'"Of nothing": it was nothing.',
 'Hola':'The h is silent: OH-lah. Like "hello" without the h and the l in the middle.','Adiós':'A + Dios, "to God". An old way of saying "God be with you".',
 'Mucho gusto':'Gusto, as in "gusto" in English: with much pleasure.','Encantado':'Like "enchanted". Enchanted to meet you.','Nosotros':'Nos + otros, literally "we others".',
 'Perdón':'Pardon. Same word, said the Spanish way.','Usted':'Once "vuestra merced", "your mercy". Polite since the start.','Igualmente':'Igual means "equal". Equally to you.',
 'jirafa':'The j is a breathy "h": hee-RAH-fah.','¿Mande?':'Short for "¿Mande usted?", "what do you command?" Old-fashioned politeness that Mexico kept.'};

/* Split every lesson into bite-size parts of 5 words, then flatten items with ids and back-references */
const BITE=5;
COURSE.forEach(u=>{const out=[];u.lessons.forEach(l=>{const parts=Math.ceil(l.items.length/BITE);
  for(let p=0;p<parts;p++){out.push({id:l.id+'-'+(p+1),title:l.title+(parts>1?' · part '+(p+1):''),items:l.items.slice(p*BITE,(p+1)*BITE)});}});u.lessons=out;});
const ITEMS=[]; const BYID={};
COURSE.forEach(u=>u.lessons.forEach(l=>{l.unit=u;l.items=l.items.map((raw,i)=>{
  const it={id:l.id+':'+i,lt:raw[0],en:raw[1],note:raw[2]||'',alt:raw[3]||[],lesson:l,unit:u};
  ITEMS.push(it);BYID[it.id]=it;return it;});}));
/* One speaking lesson per unit: the unit's phrases (multi-word first), shadowed out loud. */
COURSE.forEach(u=>{const all=u.lessons.flatMap(l=>l.items);const phrases=all.filter(i=>i.lt.split(' ').length>1);const words=all.filter(i=>i.lt.split(' ').length===1);
  const pick=phrases.slice(0,6).concat(words.slice(0,Math.max(0,6-phrases.length)));
  u.lessons.push({id:u.id+'-speak',title:'Speak it',items:pick,unit:u,speak:true});});

/* One tip per lesson, written for that lesson's words. <b> marks Spanish. */
const LESSON_TIPS={
'u0a-1':'Spanish never surprises you: every letter always makes the same sound. Learn the tricky ones here (<b>j</b>, <b>ll</b>, <b>ñ</b> and the silent <b>h</b>) and you can sound out nearly any word.',
'u0b-1':'A written accent (<b>é</b>, <b>ó</b>) only shows which syllable to stress. Without one, stress the second-to-last syllable when a word ends in a vowel, n or s (<b>TA</b>-co), and the last one otherwise (ho-<b>TEL</b>).',
'u1a-1':'<b>Hola</b> works with everyone. <b>Buenos días</b> is for the morning, <b>buenas tardes</b> from lunch until dark, <b>buenas noches</b> after that. Notice buen<b>os</b> días but buen<b>as</b> tardes: "good" matches the word after it.',
'u1a-2':'<b>Gracias</b> is "thank you" and <b>de nada</b> is the answer. <b>Hasta luego</b> is the everyday goodbye; <b>adiós</b> can sound more final.',
'u1b-1':'<b>Sí</b> (yes) needs its accent: <b>si</b> without one means "if". Say <b>con permiso</b> as you squeeze past someone, and <b>perdón</b> when you bump into them.',
'u1b-2':'<b>No pasa nada</b> is what Mexicans say when you apologise: no harm done. <b>Mucho gusto</b> is the handshake phrase when you meet someone.',
'u1c-1':'<b>Yo</b>, <b>tú</b>, <b>él</b>, <b>ella</b>: I, you, he, she. The accents on tú and él tell them apart from tu (your) and el (the).',
'u1c-2':'<b>Usted</b> is the polite "you" for a stranger; <b>ustedes</b> is "you all", for anyone, because Mexico doesn\'t use vosotros. <b>Ellos</b> is a group of men or a mixed group; <b>ellas</b> is only women.',
'u1c-3':'<b>Me llamo</b> literally means "I call myself". Mexicans say <b>Soy de Estados Unidos</b>, because "América" is the whole continent.',
'u21a-1':'This is the whole small-talk script: <b>¿Cómo estás?</b> → <b>Bien, gracias. ¿Y tú?</b> Questions in Spanish start with an upside-down mark <b>¿</b> so you know a question is coming.',
'u21a-2':'<b>¿Qué onda?</b> is pure Mexico: "what\'s up?" A man says <b>encantado</b>, a woman <b>encantada</b>: describing words about yourself change for women.',
'u21b-1':'These are your rescue phrases. <b>No entiendo</b> (I don\'t understand) and <b>¿Puedes repetir?</b> buy you time. Put <b>no</b> in front of any doing word to say "not".',
'u21b-2':'<b>¿Mande?</b> is how Mexicans say "sorry, what?", politely. <b>Más despacio, por favor</b> asks people to slow down, and <b>estoy aprendiendo</b> tells them why.',
};
const SPEAK_TIPS={
'u0':'Say every vowel clearly and keep it short. Spanish vowels never slide: "oh", not "oh-oo".',
'u1':'Greetings are all about rhythm. Hit the bold syllable and keep the rest quick and light.',
'u21':'Real small talk is quick. Say each phrase three times, a little faster each time.',
};

/* Sentence patterns: shown on a unit's first lesson as colour-coded slots. Each row is [word, its job]. */
const PATTERNS={
 u1:{name:'Saying hello',rows:[[['Buenos','good'],['días','time of day']],[['Buenas','good'],['tardes','time of day']],[['Buenas','good'],['noches','time of day']]],note:'"Good" changes to match the word after it: buenos días, but buenas tardes.'},
 u21:{name:'Answer, then ask back',rows:[[['Bien, gracias','answer'],['¿Y tú?','ask back']],[['Más o menos','answer'],['¿Y tú?','ask back']]],note:'Answer, then bounce it back with ¿Y tú? That is the whole secret of small talk.'},
};
/* Fill-the-gap drills: test endings and word order once a unit has taught them. */
const DRILLS=[
 {u:'u1',en:'Good afternoon!',frame:'¡___ tardes!',ans:'Buenas',opts:['Buenos','Bueno'],why:'Tardes is a "her" word, so buenos becomes buenas.'},
 {u:'u1',en:'Good morning!',frame:'¡___ días!',ans:'Buenos',opts:['Buenas','Buena'],why:'Días is a "him" word, so it stays buenos.'},
 {u:'u21',en:'Fine, thanks. And you?',frame:'Bien, gracias. ¿Y ___?',ans:'tú',opts:['yo','él'],why:'Bounce the question back with ¿Y tú?'},
];
const ROLE_CLASS=r=>/^(who)/.test(r)?'r1':/(does|am|is|live|want|like|have|goes|would|please|answer)/.test(r)?'r2':/(what|thing|some of|doing|dictionary|feeling|ask)/.test(r)?'r3':/(where|to me)/.test(r)?'r4':/(when|time|maybe)/.test(r)?'r5':'r6';
function patternHtml(p){return '<div class="intro tipcard pattern"><h3>🧩 '+esc(p.name)+'</h3>'+p.rows.map((row,i)=>'<div class="prow">'+row.map(([w,r])=>'<span class="slot '+ROLE_CLASS(r)+'"><b>'+esc(w)+'</b>'+(i===0?'<small>'+esc(r)+'</small>':'')+'</span>').join('')+'</div>').join('')+(p.note?'<p class="note">'+esc(p.note)+'</p>':'')+'</div>';}

/* ===================== CONVERSATIONS ===================== */
/* Lines: ['p', spanish, english, castIndex?] the other person; ['m', spanish, english, hint, [[wrong, its english], ...]] your reply;
   ['t', label] a time-skip; ['c', [[es, english, hint, [lines that follow], wrongs?], ...]] your choice (every option is right). */
/* Everyone has their own Google voice (es-US Chirp 3 HD), recorded by tools/make_voices.py es into audio/es/<voice>_<conversation>.mp3. */
const CAST_GV={'Mariana':'kore','Diego':'charon'};
const ME_GV={m:'orus',f:'despina'};
const VOICE_BASE={kore:'ona',despina:'ona',charon:'leonas',orus:'leonas'};
const CAST_LOOK={'Mariana':'37.0.0.15.6.2.18.4.3','Diego':'33.3.0.6.9.3.8.9.5'};
const CONVS=[
{id:'cv1',title:'¡Hola, Mariana!',cast:[{name:'Mariana',voice:'ona'},{name:'Diego',voice:'leonas'}],scene:'You are Tomás, on your first morning in Mexico City. The café in Coyoacán is busy, and the only free seat is next to a woman with a coffee.',lines:[
 ['p','¡Buenos días!','Good morning!'],
 ['m','¡Buenos días!','Good morning!','Say good morning back',[['¡Buenas noches!','Good evening!'],['¡Adiós!','Goodbye!']]],
 ['p','Siéntate, por favor.','Please, have a seat.'],
 ['m','¡Gracias!','Thank you!','Thank her',[['¡Perdón!','Sorry!'],['¡Buena suerte!','Good luck!']]],
 ['p','Soy Mariana. ¿Cómo te llamas?','I\'m Mariana. What\'s your name?'],
 ['m','Me llamo Tomás.','My name is Tomás.','Tell her your name',[['Soy de Estados Unidos.','I am from the United States.'],['Sí.','Yes.']]],
 ['p','¡Mucho gusto, Tomás!','Nice to meet you, Tomás!'],
 ['m','¡Mucho gusto!','Nice to meet you!','Say it\'s nice to meet her too',[['¡Hasta luego!','See you later!'],['¡No pasa nada!','No problem!']]],
 ['p','¿Cómo estás?','How are you?'],
 ['c',[
   ['¡Muy bien!','Very well!','Say you are very well',[['p','¡Qué bueno!','Great!']],[['No.','No.'],['¡Buenas tardes!','Good afternoon!']]],
   ['Muy bien, gracias. ¿Cómo estás?','Very well, thanks. How are you?','Say very well, thanks, and ask her back',[['p','¡Muy bien también!','Very well too!']],[['No.','No.'],['¡Hola!','Hi!']]],
 ]],
 ['p','¿De dónde eres?','Where are you from?'],
 ['m','Soy de Estados Unidos.','I am from the United States.','Say where you are from',[['Me llamo Tomás.','My name is Tomás.'],['Está bien.','OK.']]],
 ['t','The waiter comes over'],
 ['p','¡Buenos días! ¿Un café?','Good morning! A coffee?',1],
 ['m','¡Buenos días! No, gracias.','Good morning! No, thanks.','Say good morning, and no thanks',[['¡Buenas noches! Sí.','Good evening! Yes.'],['¡Buena suerte! Por favor.','Good luck! Please.']]],
 ['p','¿Un chocolate caliente?','A hot chocolate, then?',1],
 ['m','Sí, por favor.','Yes, please.','Say yes, please',[['Perdón.','Sorry.'],['¡Adiós!','Goodbye!']]],
 ['t','Mariana\'s phone rings'],
 ['p','¡Perdón! Mi teléfono...','Sorry! My phone...'],
 ['m','¡No pasa nada!','No problem!','Tell her it\'s no problem',[['¡Buenos días!','Good morning!'],['¡Mucho gusto!','Nice to meet you!']]],
 ['p','Ay, me tengo que ir. Voy al museo.','Oh, I have to go. I\'m going to the museum.'],
 ['m','Está bien. ¡Hasta luego!','OK. See you later!','Say OK, and see you later',[['¡Buenas noches! Sí.','Good evening! Yes.'],['¡Por favor! ¡Perdón!','Please! Sorry!']]],
 ['p','¡Gracias! ¡Adiós, Tomás!','Thanks! Goodbye, Tomás!'],
 ['m','¡Adiós!','Goodbye!','Say goodbye',[['¡Buenos días!','Good morning!'],['Por favor.','Please.']]],
]},
{id:'cv16',title:'Otra vez, por favor',cast:[{name:'Mariana',voice:'ona'}],scene:'The next day you meet Mariana again, on a bench in Parque México. She talks fast. That\'s fine: you know how to slow her down.',lines:[
 ['p','¡Hola, Tomás! ¿Qué onda?','Hi, Tomás! What\'s up?'],
 ['c',[
   ['Todo bien. ¿Y tú?','All good. And you?','Say all good and ask her back',[['p','¡Todo bien también!','All good here too!']],[['¡Adiós!','Goodbye!'],['Ya entendí.','Got it.']]],
   ['Bien, gracias. ¿Y tú?','Fine, thanks. And you?','Say you\'re fine and ask her back',[['p','¡Muy bien!','Very well!']],[['¡Adiós!','Goodbye!'],['Otra vez.','One more time.']]],
   ['Más o menos. ¿Y tú?','So-so. And you?','Say so-so and ask her back',[['p','Bien. ¡Mañana va a estar mejor!','Fine. Tomorrow will be better!']],[['¡Adiós!','Goodbye!'],['Igualmente.','Likewise.']]],
 ]],
 ['p','¿Qué haces?','What are you up to?'],
 ['m','Nada especial. Estoy aprendiendo.','Nothing special. I\'m learning.','Say nothing special, you\'re learning',[['Mucho gusto. Igualmente.','Nice to meet you. Likewise.'],['Otra vez. ¿Mande?','One more time. Sorry, what?']]],
 ['p','¡Qué padre! ¿Hablas español?','How cool! Do you speak Spanish?'],
 ['m','Hablo un poco de español.','I speak a little Spanish.','Say you speak a little Spanish',[['¿Qué significa esta palabra?','What does this word mean?'],['Nada especial.','Nothing special.']]],
 ['p','¡Hoy hace un día padrísimo! ¿Vamos a caminar por el parque y luego nos tomamos un café?','It\'s a gorgeous day today! Shall we walk through the park and then have a coffee?'],
 ['m','¿Mande? No entiendo.','Sorry, what? I don\'t understand.','Stop her: say sorry, what? You don\'t understand',[['Yo también. Gracias.','Me too. Thanks.'],['¡Ya entendí! ¡Todo bien!','Got it! All good!']]],
 ['p','¡No pasa nada!','No problem!'],
 ['m','Más despacio, por favor.','Slower, please.','Ask her to speak slower',[['¿Cómo estás?','How are you?'],['Igualmente.','Likewise.']]],
 ['p','¿Vamos... a caminar?','Shall we... go for a walk?'],
 ['m','¿Qué significa esta palabra?','What does this word mean?','Ask what this word means',[['Yo también.','Me too.'],['Mucho gusto.','Nice to meet you.']]],
 ['p','Caminar... ¡así!','To walk... like this! (She walks two fingers along the bench.)'],
 ['m','¡Ya entendí! Sí, está bien.','Got it! Yes, OK.','Say you got it, and yes',[['¿Otra vez?','One more time?'],['¡Buenas noches!','Good evening!']]],
 ['t','Walking through the park'],
 ['m','¿Cómo se dice en español?','How do you say it in Spanish?','Point at a tree and ask how to say it in Spanish',[['¿Qué haces?','What are you up to?'],['Estoy aprendiendo.','I\'m learning.']]],
 ['p','Árbol.','Tree.'],
 ['m','Otra vez, por favor.','One more time, please.','Ask her to say it one more time',[['Nada especial.','Nothing special.'],['Buenos días.','Good morning.']]],
 ['p','Ár-bol. Árbol.','Tree. Tree.'],
 ['m','¡Gracias! Ya entendí.','Thanks! Got it.','Thank her and say you got it',[['Más o menos.','So-so.'],['¿Mande?','Sorry, what?']]],
 ['p','¡Muy bien! Aprendes rápido.','Very good! You learn fast.'],
 ['m','¡Gracias! Estoy aprendiendo.','Thanks! I\'m learning.','Thank her and say you\'re learning',[['¿Puedes repetir?','Can you repeat that?'],['Más o menos.','So-so.']]],
 ['p','Hoy estoy muy contenta.','I\'m very happy today.'],
 ['m','¡Yo también!','Me too!','Say you are too',[['¡Igualmente!','Likewise!'],['¿Mande?','Sorry, what?']]],
 ['p','Bueno, ya me voy. ¡Que tengas un buen día!','Well, I\'m off now. Have a good day!'],
 ['m','¡Igualmente! ¡Nos vemos!','Likewise! See you!','Say likewise, and see you',[['¡Yo también! ¡Hola!','Me too! Hi!'],['¡Ya entendí! ¡Gracias!','Got it! Thanks!']]],
]},
];
const CONV_BY={};
/* A choice's options get ids like cv3:4o1 (line 4, option 1); the lines after it cv3:4o1-0, cv3:4o1-1 ...
   c.all lists every line, options and branches included, for the audio and course checks. */
function parseConvLine(c,l,id){if(l[0]==='t')return {kind:'t',text:l[1]};
  if(l[0]==='c'){const ln={kind:'c',id,conv:c};
    ln.opts=l[1].map((o,k)=>{const oid=id+'o'+k;const m={kind:'m',id:oid,lt:o[0],en:o[1],hint:o[2],no:o[4]||[],conv:c};BYID[oid]=m;
      return {line:m,then:(o[3]||[]).map((b,j)=>parseConvLine(c,b,oid+'-'+j))};});
    ln.opts.forEach(o=>o.line.others=ln.opts.filter(x=>x!==o).map(x=>[x.line.lt,x.line.en]));return ln;}
  const ln={kind:l[0],id,lt:l[1],en:l[2],conv:c};
  if(l[0]==='p')ln.who=l[3]||0;else{ln.hint=l[3];ln.no=l[4]||[];}
  BYID[id]=ln;return ln;}
CONVS.forEach(c=>{CONV_BY[c.id]=c;c.lines=c.lines.map((l,i)=>parseConvLine(c,l,c.id+':'+i));
  c.all=[];const walk=ls=>ls.forEach(l=>{c.all.push(l);if(l.kind==='c')l.opts.forEach(o=>{c.all.push(o.line);walk(o.then);});});walk(c.lines);
  c.choices=c.all.filter(l=>l.kind==='c').reduce((n,l)=>n+l.opts.length,0);});

/* ===================== PERSONAL LINES ===================== */
/* With About me filled in, the course talks about you: your name where it says Tomás, your country where it says
   Estados Unidos, and a woman's words for a woman (encantada). Spanish names never change their ending. */
const PERS_ME=[['Encantado','Encantada'],['encantado','encantada'],['contento','contenta'],['cansado','cansada']];
const PERS_THEM=[['Bienvenido','Bienvenida']];
const wordRe=w=>new RegExp('(?<!\\p{L})'+w+'(?!\\p{L})','gu');
function nameForms(n){return {nom:n,voc:n,ins:n};}
const HAS_NAME=/(?<!\p{L})Tomás(?!\p{L})/u;
/* What the app needs to put you into the course (see personalise() in index.html). */
const PERS={nameLine:n=>'Me llamo '+n,fromRe:/de Estados Unidos/,femDefault:'',baseNames:['tomás','tomas'],studentLine:'Soy estudiante.',
  jobLine:(j,g)=>(/^sin /.test(j[2])?'Estoy ':'Soy ')+(g==='f'?j[3]:j[2])+'.'};
/* o: {name, g:'m'|'f', from:country code, au:true for the recording (which leaves the name out)} */
function persText(t,role,o){
  if(o.name&&o.au)t=t.replace(/,\s*Tomás(?=[.!?])/g,'').replace(/^(¡?)Tomás,\s*(.)/,(_,a,c)=>a+c.toUpperCase()).replace(/\s+Tomás(?=[.!?]|$)/g,'');
  else if(o.name)t=t.replace(/Tomás/g,o.name);
  if(o.g==='f')(role==='me'?PERS_ME:PERS_THEM).forEach(([a,b])=>{t=t.replace(wordRe(a),b);});
  if(o.from&&role==='me'){const c=ME_COUNTRIES.find(x=>x[0]===o.from);if(c)t=t.replace(/de Estados Unidos/g,'de '+c[2]);}
  return t;}
function persEn(t,role,o){if(o.name)t=t.replace(/Tomás/g,o.name);
  if(o.from&&role==='me'){const c=ME_COUNTRIES.find(x=>x[0]===o.from);if(c)t=t.replace(/from the United States\b/g,'from '+c[1]);}return t;}
/* Every course line that can change, with whose words they are: 'me' (yours) or 'them' (someone talking to you). */
function persLines(){const out=[];const test={name:'X',g:'f',from:'gb'};
  ITEMS.forEach(i=>{const lt=i.lt0||i.lt;if(persText(lt,'me',test)!==lt)out.push([i,'me']);});
  CONVS.forEach(c=>c.all.forEach(l=>{if(!l.lt||l.kind==='t')return;const role=l.kind==='p'?'them':'me';const lt=l.lt0||l.lt;
    if(persText(lt,role,test)!==lt||(role==='me'&&lt===PERS.studentLine))out.push([l,role]);}));
  return out;}
let ME_TEXT=null;const meText=t=>{if(!ME_TEXT){ME_TEXT={};ME_BANK.forEach(i=>ME_TEXT[norm(i.lt)]=i.id);}return ME_TEXT[norm(t)];};
function persAudio(x,role,o){const lt=x.lt0||x.lt;const text=persText(lt,role,Object.assign({},o,{au:true}));
  if(text===lt)return {id:x.id,text};if(meText(text))return {id:meText(text),text};
  const fem=o.g==='f'&&persText(lt,role,{g:'f'})!==lt,from=role==='me'&&o.from&&PERS.fromRe.test(lt)&&o.from!=='us';
  return {id:'me2:'+x.id+'~'+(o.name&&HAS_NAME.test(lt)?'n':'')+(fem?'f':'')+(from?o.from:''),text};}
function persClips(){const out={};const froms=ME_COUNTRIES.map(c=>c[0]);
  persLines().forEach(([x,role])=>['m','f'].forEach(g=>(g==='f'?['X']:['','X']).forEach(name=>(role==='me'&&PERS.fromRe.test(x.lt0||x.lt)?froms:['']).forEach(from=>{
    const a=persAudio(x,role,{name,g,from});if(a.id.startsWith('me2:'))out[a.id]=a.text;}))));
  return Object.entries(out).map(([id,text])=>({id,text}));}

/* "Built from": for a phrase, gloss each word from single-word items or the glue list. */
const WORDS={};ITEMS.forEach(i=>{if(i.lt.split(' ').length===1)WORDS[norm(i.lt)]=WORDS[norm(i.lt)]||i.en.split(' / ')[0].split(' (')[0];});
function builtFrom(item){const ws=item.lt.split(' ');if(ws.length<2)return '';
  const parts=ws.map(w=>{const k=norm(w);const g=WORDS[k]||GLUE[k];return '<span class="bf"><b>'+esc(w)+'</b>'+(g?' <i>'+esc(g)+'</i>':'')+'</span>';});
  return '<div class="built"><span class="eyebrow">Built from</span><div>'+parts.join('')+'</div></div>';}
/* "Sounds like" shown to the learner: lowercase syllables separated by spaces, stressed syllable bolder. */
function pronHtml(lt){const raw=pronFor(lt);
  return raw.split(' ').map(w=>'<span class="pw">'+w.split('-').map(s=>/[A-Z]/.test(s)?'<b>'+esc(s.toLowerCase())+'</b>':esc(s.toLowerCase())).join(' ')+'</span>').join(' ');}
function pronText(lt){return pronFor(lt).toLowerCase().replace(/-/g,' ');}
/* Spanish spelling is regular, so "sounds like" is worked out from the spelling (autoPron), with PRON for the odd exception. */
function pronFor(lt){return PRON[lt]||lt.split(/\s+/).map(w=>PRON[w.replace(/[¿¡.,!?;:"()]/g,'')]||w.split('-').map(autoPron).filter(Boolean).join('-')).filter(Boolean).join(' ');}
/* One word → syllables in plain English spelling, the stressed one in capitals. Stress: the written accent, else the
   second-to-last syllable when the word ends in a vowel, n or s, else the last. */
function autoPron(word){let w=word.toLowerCase().replace(/[¿¡.,!?;:"()…]/g,'');if(!w)return '';
  if(/^m[eé]xic/.test(w))w=w.replace('x','j');
  const VOW='aeiouáéíóúü',STRONG='aeoáéóíú',ACC='áéíóú';
  const isV=(i)=>VOW.includes(w[i])||(w[i]==='y'&&(i===w.length-1||!VOW.includes(w[i+1]))&&i>0&&VOW.includes(w[i-1]))||(w==='y');
  const toks=[];for(let i=0;i<w.length;i++){const c=w[i],n=w[i+1]||'';
    if(isV(i)){toks.push({v:1,s:c});continue;}
    if((c==='c'&&n==='h')||(c==='l'&&n==='l')||(c==='r'&&n==='r')){toks.push({v:0,s:c+n});i++;continue;}
    if((c==='q'&&n==='u')||(c==='g'&&n==='u'&&'eéií'.includes(w[i+2]||''))){toks.push({v:0,s:c+'u',soft:c==='g'});i++;continue;}
    toks.push({v:0,s:c});}
  /* vowel runs become one nucleus, split between two strong vowels (le-ón, dí-a) */
  const units=[];toks.forEach(t=>{const last=units[units.length-1];
    if(t.v&&last&&last.v&&!(STRONG.includes(last.s.slice(-1))&&STRONG.includes(t.s)))last.s+=t.s;else units.push({v:t.v,s:t.s,soft:t.soft});});
  const nuc=units.map((u,i)=>u.v?i:-1).filter(i=>i>=0);if(!nuc.length)return w.toUpperCase();
  const tight=(a,b)=>'pbfcgtdk'.includes(a)&&'lr'.includes(b)&&a.length===1&&b.length===1&&!(a==='d'&&b==='l');
  const syl=nuc.map(()=>[]);let start=0;
  nuc.forEach((ni,k)=>{if(k===0){for(let i=0;i<=ni;i++)syl[0].push(units[i]);start=ni+1;return;}
    const cl=units.slice(start,ni);let left=0;
    if(cl.length===2)left=tight(cl[0].s,cl[1].s)?0:1;else if(cl.length===3)left=tight(cl[1].s,cl[2].s)?1:2;else if(cl.length>=4)left=2;
    cl.slice(0,left).forEach(u=>syl[k-1].push(u));cl.slice(left).forEach(u=>syl[k].push(u));syl[k].push(units[ni]);start=ni+1;});
  units.slice(start).forEach(u=>syl[syl.length-1].push(u));
  let stress=syl.findIndex(s=>s.some(u=>u.v&&[...u.s].some(ch=>ACC.includes(ch))));
  if(stress<0)stress=syl.length===1?0:/[aeiouns]$/.test(w)?syl.length-2:syl.length-1;
  const plain=ch=>({'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u'}[ch]||ch);
  const vowel=s=>{let pre='';s=[...s];while(s.length>1&&'iuüy'.includes(s[0])&&!'íú'.includes(s[0])){pre+='iy'.includes(s[0])?'y':'w';s.shift();}
    let post='';if(s.length>1&&'iuy'.includes(s[s.length-1]))post=s.pop();const b=plain(s[0]);
    const one={a:'ah',e:'eh',i:'ee',o:'oh',u:'oo',y:'ee'}[b]||b;
    const two=post?({a:{i:'ai',y:'ai',u:'ow'},e:{i:'ay',y:'ay',u:'eh-oo'},o:{i:'oy',y:'oy',u:'ow'}}[b]||{})[post]:'';
    return pre+(two||one);};
  const cons=(u,next)=>{const s=u.s,nx=next?plain(next.s[0]):'';
    if(s==='ch')return 'ch';if(s==='ll')return 'y';if(s==='rr')return 'rr';if(s==='qu')return 'k';if(s==='gu')return 'g';
    if(s==='ñ')return 'ny';if(s==='j')return next||u!==units[units.length-1]?'h':'';if(s==='h')return '';if(s==='z')return 's';if(s==='v')return 'b';if(s==='x')return 'ks';if(s==='y')return 'y';
    if(s==='c')return nx&&'ei'.includes(nx)?'s':'k';if(s==='g')return nx&&'ei'.includes(nx)?'h':'g';return s;};
  return syl.map((s,k)=>{const out=s.map((u,i)=>u.v?vowel(u.s):cons(u,s[i+1]&&s[i+1].v?s[i+1]:null)).join('');return k===stress?out.toUpperCase():out;}).join('-');}

/* For short words a respelling alone is hard to trust, so they also get a real English word that sounds close. */
const PRON_LIKE={'Yo':'like "yo" in yo-yo','Tú':'like "two"','Él':'like the letter "L"','Sí':'like "see"','No':'like "no", short and clipped'};
const likeHtml=lt=>PRON_LIKE[lt]?'<span class="like">'+esc(PRON_LIKE[lt])+'</span>':'';
/* Hand-written exceptions to autoPron. Hyphens split syllables; CAPS = the stressed syllable. */
const PRON={"y":"ee","Y":"ee"};

/* Audio sprite map: voice -> unit -> item id -> [start, duration] seconds (written by tools/make_audio.py es) */
const SMAP={"ona":{"u0":{"u0a-1:0":[0,1.368],"u0a-1:1":[1.718,1.728],"u0a-1:2":[3.796,1.056],"u0a-1:3":[5.202,1.104],"u0a-1:4":[6.656,1.704],"u0b-1:0":[8.71,1.008],"u0b-1:1":[10.068,1.176],"u0b-1:2":[11.594,1.008],"u0b-1:3":[12.952,0.696],"u0b-1:4":[13.998,1.008]},"u1":{"u1a-1:0":[0,0.864],"u1a-1:1":[1.214,1.368],"u1a-1:2":[2.932,1.536],"u1a-1:3":[4.818,1.704],"u1a-1:4":[6.872,1.224],"u1a-2:0":[8.446,1.176],"u1a-2:1":[9.972,1.464],"u1a-2:2":[11.786,1.008],"u1a-2:3":[13.144,1.008],"u1a-2:4":[14.502,1.128],"u1b-1:0":[15.98,0.408],"u1b-1:1":[16.738,0.816],"u1b-1:2":[17.904,0.888],"u1b-1:3":[19.142,1.224],"u1b-1:4":[20.716,1.368],"u1b-2:0":[22.434,1.248],"u1b-2:1":[24.032,1.104],"u1b-2:2":[25.486,1.584],"u1b-2:3":[27.42,1.584],"u1b-2:4":[29.354,1.584],"u1c-1:0":[31.288,0.888],"u1c-1:1":[32.526,0.696],"u1c-1:2":[33.572,0.768],"u1c-1:3":[34.69,0.936],"u1c-1:4":[35.976,1.464],"u1c-2:0":[37.79,1.008],"u1c-2:1":[39.148,1.248],"u1c-2:2":[40.746,1.224],"u1c-2:3":[42.32,1.128],"u1c-2:4":[43.798,1.824],"u1c-3:0":[45.972,1.536],"u1c-3:1":[47.858,1.704]},"u21":{"u21a-1:0":[0,1.776],"u21a-1:1":[2.126,1.296],"u21a-1:2":[3.772,1.296],"u21a-1:3":[5.418,1.344],"u21a-1:4":[7.112,1.416],"u21a-2:0":[8.878,1.296],"u21a-2:1":[10.524,1.296],"u21a-2:2":[12.17,1.128],"u21a-2:3":[13.648,1.368],"u21a-2:4":[15.366,1.296],"u21b-1:0":[17.012,2.304],"u21b-1:1":[19.666,1.656],"u21b-1:2":[21.672,2.376],"u21b-1:3":[24.398,1.536],"u21b-1:4":[26.284,1.488],"u21b-2:0":[28.122,1.056],"u21b-2:1":[29.528,2.184],"u21b-2:2":[32.062,1.656],"u21b-2:3":[34.068,1.608],"u21b-2:4":[36.026,1.176]},"cv1":{"cv1:0":[0,1.824],"cv1:1":[2.174,1.344],"cv1:2":[3.868,1.704],"cv1:3":[5.922,1.248],"cv1:4":[7.52,2.688],"cv1:5":[10.558,1.848],"cv1:6":[12.756,1.704],"cv1:7":[14.81,1.176],"cv1:8":[16.336,1.248],"cv1:9o0":[17.934,1.344],"cv1:9o0-0":[19.628,1.056],"cv1:9o1":[21.034,2.448],"cv1:9o1-0":[23.832,1.416],"cv1:10":[25.598,1.824],"cv1:11":[27.772,1.728],"cv1:13":[29.85,2.304],"cv1:14":[32.504,2.544],"cv1:15":[35.398,1.584],"cv1:16":[37.332,0.984],"cv1:18":[38.666,2.064],"cv1:19":[41.08,1.968],"cv1:20":[43.398,2.808],"cv1:21":[46.556,2.304],"cv1:22":[49.21,2.544],"cv1:23":[52.104,1.224]},"cv16":{"cv16:0":[0,2.568],"cv16:1o0":[2.918,2.088],"cv16:1o0-0":[5.356,1.536],"cv16:1o1":[7.242,2.136],"cv16:1o1-0":[9.728,1.656],"cv16:1o2":[11.734,2.424],"cv16:1o2-0":[14.508,3.144],"cv16:2":[18.002,1.104],"cv16:3":[19.456,3.048],"cv16:4":[22.854,2.544],"cv16:5":[25.748,2.064],"cv16:6":[28.162,5.136],"cv16:7":[33.648,1.536],"cv16:8":[35.534,1.536],"cv16:9":[37.42,1.704],"cv16:10":[39.474,2.016],"cv16:11":[41.84,2.376],"cv16:12":[44.566,2.016],"cv16:13":[46.932,3.624],"cv16:15":[50.906,2.184],"cv16:16":[53.44,1.056],"cv16:17":[54.846,1.704],"cv16:18":[56.9,2.688],"cv16:19":[59.938,2.304],"cv16:20":[62.592,3.144],"cv16:21":[66.086,2.016],"cv16:22":[68.452,1.824],"cv16:23":[70.626,1.224],"cv16:24":[72.2,3.984],"cv16:25":[76.534,2.496]},"me1":{"me1:name":[0,1.128],"me1:learn":[1.478,2.184],"me1:nice":[4.012,1.416],"me1:from-mx":[5.778,1.728],"me1:live-mx":[7.856,1.656],"me1:from-us":[9.862,1.536],"me1:live-us":[11.748,2.016],"me1:from-ca":[14.114,1.536],"me1:live-ca":[16,1.368],"me1:from-gb":[17.718,1.488],"me1:live-gb":[19.556,1.536],"me1:from-sc":[21.442,1.416],"me1:live-sc":[23.208,1.704],"me1:from-ie":[25.262,1.656],"me1:live-ie":[27.268,1.728],"me1:from-au":[29.346,1.824],"me1:live-au":[31.52,1.704],"me1:from-gt":[33.574,1.416],"me1:live-gt":[35.34,1.944],"me1:from-sv":[37.634,1.536],"me1:live-sv":[39.52,1.824],"me1:from-co":[41.694,1.416],"me1:live-co":[43.46,1.536],"me1:from-pr":[45.346,1.536],"me1:live-pr":[47.232,1.824],"me1:from-cu":[49.406,1.488],"me1:live-cu":[51.244,1.704],"me1:from-es":[53.298,1.416],"me1:live-es":[55.064,1.536],"me1:from-de":[56.95,1.656],"me1:live-de":[58.956,1.656],"me1:from-fr":[60.962,1.704],"me1:live-fr":[63.016,1.536],"me1:from-it":[64.902,1.704],"me1:live-it":[66.956,1.536],"me1:from-pl":[68.842,1.416],"me1:live-pl":[70.608,1.944],"me1:from-lt":[72.902,1.416],"me1:live-lt":[74.668,1.824],"me1:from-ua":[76.842,1.536],"me1:live-ua":[78.728,1.824],"me1:from-br":[80.902,1.248],"me1:live-br":[82.5,1.848],"me1:from-in":[84.698,1.488],"me1:live-in":[86.536,1.848],"me1:from-ph":[88.734,1.656],"me1:live-ph":[90.74,1.656],"me1:from-jp":[92.746,1.368],"me1:live-jp":[94.464,1.608],"me1:live-cdmx":[96.422,2.088],"me1:live-gdl":[98.86,1.584],"me1:live-mty":[100.794,1.416],"me1:live-pue":[102.56,1.704],"me1:live-tij":[104.614,1.656],"me1:live-cun":[106.62,1.536],"me1:live-la":[108.506,1.704],"me1:live-hou":[110.56,2.328],"me1:live-chi":[113.238,1.728],"me1:live-sa":[115.316,1.968],"me1:live-phx":[117.634,1.584],"me1:live-ny":[119.568,1.536],"me1:live-ldn":[121.454,1.704],"me1:job-teacher-m":[123.508,1.728],"me1:job-teacher-f":[125.586,1.488],"me1:job-student-m":[127.424,1.704],"me1:job-student-f":[129.478,1.488],"me1:job-doctor-m":[131.316,1.128],"me1:job-doctor-f":[132.794,1.656],"me1:job-nurse-m":[134.8,1.176],"me1:job-nurse-f":[136.326,1.416],"me1:job-engineer-m":[138.092,1.704],"me1:job-engineer-f":[140.146,1.824],"me1:job-programmer-m":[142.32,1.536],"me1:job-programmer-f":[144.206,1.584],"me1:job-driver-m":[146.14,1.416],"me1:job-driver-f":[147.906,1.416],"me1:job-cook-m":[149.672,1.464],"me1:job-cook-f":[151.486,1.488],"me1:job-builder-m":[153.324,1.848],"me1:job-builder-f":[155.522,1.488],"me1:job-seller-m":[157.36,1.536],"me1:job-seller-f":[159.246,1.656],"me1:job-accountant-m":[161.252,1.248],"me1:job-accountant-f":[162.85,1.656],"me1:job-manager-m":[164.856,1.464],"me1:job-manager-f":[166.67,1.536],"me1:job-mechanic-m":[168.556,1.416],"me1:job-mechanic-f":[170.322,1.488],"me1:job-farmer-m":[172.16,1.416],"me1:job-farmer-f":[173.926,1.488],"me1:job-artist-m":[175.764,1.296],"me1:job-artist-f":[177.41,1.608],"me1:job-home-m":[179.368,1.704],"me1:job-home-f":[181.422,1.416],"me1:job-retired-m":[183.188,1.536],"me1:job-retired-f":[185.074,1.344],"me1:job-unemployed-m":[186.768,2.208],"me1:job-unemployed-f":[189.326,1.848],"me1:work-office":[191.524,1.896],"me1:work-home":[193.77,1.728],"me1:work-hospital":[195.848,1.728],"me1:work-shop":[197.926,1.896],"me1:work-school":[200.172,1.536],"me1:work-factory":[202.058,1.824],"me1:work-warehouse":[204.232,2.184],"me1:work-restaurant":[206.766,2.016],"me1:work-bank":[209.132,1.944],"me1:work-farm":[211.426,1.728],"me1:work-university":[213.504,2.016],"me1:partner-married-m":[215.87,1.464],"me1:partner-married-f":[217.684,1.704],"me1:partner-single-m":[219.738,1.704],"me1:partner-single-f":[221.792,1.536],"me1:partner-wife":[223.678,1.296],"me1:partner-husband":[225.324,1.296],"me1:partner-gf":[226.97,1.608],"me1:partner-bf":[228.928,1.488],"me1:kids-none":[230.766,1.536],"me1:kids-son":[232.652,1.848],"me1:kids-daughter":[234.85,1.728],"me1:kids-sd":[236.928,1.848],"me1:kids-two":[239.126,1.608],"me1:kids-three":[241.084,1.464],"me1:kids-four":[242.898,1.536],"me1:sib-none":[244.784,1.896],"me1:sib-brother":[247.03,1.608],"me1:sib-sister":[248.988,1.536],"me1:sib-both":[250.874,2.904],"me1:sib-brothers":[254.128,1.704],"me1:sib-sisters":[256.182,1.584],"me1:pet-dog":[258.116,1.248],"me1:pet-cat":[259.714,1.656],"me1:pet-both":[261.72,1.968],"me1:why-family":[264.038,2.328],"me1:why-kids":[266.716,2.064],"me1:why-trip":[269.13,1.824],"me1:why-wife":[271.304,2.064],"me1:why-husband":[273.718,2.448],"me1:why-gf":[276.516,2.184],"me1:why-bf":[279.05,1.584],"me1:why-friends":[280.984,2.448],"me1:why-love":[283.782,1.728],"me1:why-languages":[285.86,2.328],"me1:like-read":[288.538,1.488],"me1:like-travel":[290.376,1.824],"me1:like-cook":[292.55,1.728],"me1:like-sport":[294.628,2.424],"me1:like-basketball":[297.402,2.088],"me1:like-football":[299.84,1.968],"me1:like-films":[302.158,2.304],"me1:like-music":[304.812,2.136],"me1:like-fish":[307.298,1.416],"me1:like-walk":[309.064,1.656],"me1:like-dance":[311.07,1.464],"me1:like-sing":[312.884,1.488],"me1:like-draw":[314.722,1.536],"me1:like-games":[316.608,2.328],"me1:like-garden":[319.286,2.376],"me1:like-swim":[322.012,1.464]},"me2":{"me2:u21a-2:3~f":[0,1.296],"me2:cv1:22~n":[1.646,1.704],"me2:cv16:0~n":[3.7,2.136]}},"leonas":{"u0":{"u0a-1:0":[0,1.176],"u0a-1:1":[1.526,1.416],"u0a-1:2":[3.292,1.008],"u0a-1:3":[4.65,1.368],"u0a-1:4":[6.368,1.584],"u0b-1:0":[8.302,1.296],"u0b-1:1":[9.948,0.768],"u0b-1:2":[11.066,1.368],"u0b-1:3":[12.784,0.696],"u0b-1:4":[13.83,1.464]},"u1":{"u1a-1:0":[0,1.248],"u1a-1:1":[1.598,1.896],"u1a-1:2":[3.844,0.888],"u1a-1:3":[5.082,1.944],"u1a-1:4":[7.376,1.416],"u1a-2:0":[9.142,1.416],"u1a-2:1":[10.908,0.864],"u1a-2:2":[12.122,0.816],"u1a-2:3":[13.288,1.056],"u1a-2:4":[14.694,1.248],"u1b-1:0":[16.292,0.408],"u1b-1:1":[17.05,0.336],"u1b-1:2":[17.736,1.368],"u1b-1:3":[19.454,1.848],"u1b-1:4":[21.652,1.536],"u1b-2:0":[23.538,1.704],"u1b-2:1":[25.592,1.608],"u1b-2:2":[27.55,1.008],"u1b-2:3":[28.908,1.416],"u1b-2:4":[30.674,1.848],"u1c-1:0":[32.872,1.104],"u1c-1:1":[34.326,1.296],"u1c-1:2":[35.972,0.408],"u1c-1:3":[36.73,1.224],"u1c-1:4":[38.304,1.536],"u1c-2:0":[40.19,0.576],"u1c-2:1":[41.116,1.368],"u1c-2:2":[42.834,0.816],"u1c-2:3":[44,1.464],"u1c-2:4":[45.814,1.488],"u1c-3:0":[47.652,1.008],"u1c-3:1":[49.01,2.304]},"u21":{"u21a-1:0":[0,1.728],"u21a-1:1":[2.078,1.296],"u21a-1:2":[3.724,0.744],"u21a-1:3":[4.818,0.624],"u21a-1:4":[5.792,1.344],"u21a-2:0":[7.486,1.296],"u21a-2:1":[9.132,1.776],"u21a-2:2":[11.258,1.584],"u21a-2:3":[13.192,1.128],"u21a-2:4":[14.67,0.864],"u21b-1:0":[15.884,1.728],"u21b-1:1":[17.962,1.488],"u21b-1:2":[19.8,1.584],"u21b-1:3":[21.734,1.416],"u21b-1:4":[23.5,1.008],"u21b-2:0":[24.858,1.176],"u21b-2:1":[26.384,2.256],"u21b-2:2":[28.99,1.704],"u21b-2:3":[31.044,1.536],"u21b-2:4":[32.93,1.536]},"cv1":{"cv1:0":[0,1.896],"cv1:1":[2.246,0.816],"cv1:2":[3.412,1.296],"cv1:3":[5.058,1.344],"cv1:4":[6.752,3.456],"cv1:5":[10.558,2.016],"cv1:6":[12.924,1.968],"cv1:7":[15.242,1.536],"cv1:8":[17.128,1.656],"cv1:9o0":[19.134,1.296],"cv1:9o0-0":[20.78,1.536],"cv1:9o1":[22.666,1.728],"cv1:9o1-0":[24.744,1.656],"cv1:10":[26.75,1.056],"cv1:11":[28.156,2.424],"cv1:13":[30.93,2.016],"cv1:14":[33.296,1.896],"cv1:15":[35.542,1.944],"cv1:16":[37.836,1.656],"cv1:18":[39.842,1.944],"cv1:19":[42.136,1.848],"cv1:20":[44.334,3.504],"cv1:21":[48.188,2.808],"cv1:22":[51.346,2.088],"cv1:23":[53.784,1.416]},"cv16":{"cv16:0":[0,1.416],"cv16:1o0":[1.766,2.376],"cv16:1o0-0":[4.492,1.944],"cv16:1o1":[6.786,1.416],"cv16:1o1-0":[8.552,0.696],"cv16:1o2":[9.598,1.536],"cv16:1o2-0":[11.484,3.264],"cv16:2":[15.098,1.536],"cv16:3":[16.984,3.048],"cv16:4":[20.382,2.616],"cv16:5":[23.348,1.416],"cv16:6":[25.114,5.088],"cv16:7":[30.552,1.536],"cv16:8":[32.438,1.584],"cv16:9":[34.372,1.896],"cv16:10":[36.618,1.656],"cv16:11":[38.624,1.536],"cv16:12":[40.51,2.616],"cv16:13":[43.476,3.576],"cv16:15":[47.402,1.704],"cv16:16":[49.456,1.464],"cv16:17":[51.27,2.376],"cv16:18":[53.996,2.664],"cv16:19":[57.01,1.824],"cv16:20":[59.184,2.904],"cv16:21":[62.438,2.688],"cv16:22":[65.476,2.424],"cv16:23":[68.25,1.848],"cv16:24":[70.448,4.968],"cv16:25":[75.766,1.944]},"me1":{"me1:name":[0,1.416],"me1:learn":[1.766,2.208],"me1:nice":[4.324,1.344],"me1:from-mx":[6.018,2.016],"me1:live-mx":[8.384,1.008],"me1:from-us":[9.742,2.304],"me1:live-us":[12.396,1.848],"me1:from-ca":[14.594,1.896],"me1:live-ca":[16.84,1.896],"me1:from-gb":[19.086,1.848],"me1:live-gb":[21.284,2.376],"me1:from-sc":[24.01,2.856],"me1:live-sc":[27.216,1.176],"me1:from-ie":[28.742,1.848],"me1:live-ie":[30.94,1.296],"me1:from-au":[32.586,1.848],"me1:live-au":[34.784,1.704],"me1:from-gt":[36.838,1.944],"me1:live-gt":[39.132,1.824],"me1:from-sv":[41.306,1.968],"me1:live-sv":[43.624,1.776],"me1:from-co":[45.75,1.848],"me1:live-co":[47.948,1.416],"me1:from-pr":[49.714,2.016],"me1:live-pr":[52.08,1.296],"me1:from-cu":[53.726,1.848],"me1:live-cu":[55.924,1.128],"me1:from-es":[57.402,1.464],"me1:live-es":[59.216,1.128],"me1:from-de":[60.694,2.256],"me1:live-de":[63.3,1.176],"me1:from-fr":[64.826,1.776],"me1:live-fr":[66.952,1.296],"me1:from-it":[68.598,1.776],"me1:live-it":[70.724,1.704],"me1:from-pl":[72.778,1.728],"me1:live-pl":[74.856,1.056],"me1:from-lt":[76.262,2.256],"me1:live-lt":[78.868,1.536],"me1:from-ua":[80.754,1.896],"me1:live-ua":[83,1.008],"me1:from-br":[84.358,2.304],"me1:live-br":[87.012,0.936],"me1:from-in":[88.298,1.896],"me1:live-in":[90.544,1.008],"me1:from-ph":[91.902,2.136],"me1:live-ph":[94.388,1.368],"me1:from-jp":[96.106,1.728],"me1:live-jp":[98.184,0.984],"me1:live-cdmx":[99.518,2.208],"me1:live-gdl":[102.076,1.488],"me1:live-mty":[103.914,1.776],"me1:live-pue":[106.04,1.536],"me1:live-tij":[107.926,1.608],"me1:live-cun":[109.884,1.104],"me1:live-la":[111.338,1.536],"me1:live-hou":[113.224,1.536],"me1:live-chi":[115.11,1.104],"me1:live-sa":[116.564,1.704],"me1:live-phx":[118.618,1.248],"me1:live-ny":[120.216,1.176],"me1:live-ldn":[121.742,1.176],"me1:job-teacher-m":[123.268,1.656],"me1:job-teacher-f":[125.274,1.656],"me1:job-student-m":[127.28,2.184],"me1:job-student-f":[129.814,1.848],"me1:job-doctor-m":[132.012,1.536],"me1:job-doctor-f":[133.898,1.608],"me1:job-nurse-m":[135.856,1.248],"me1:job-nurse-f":[137.454,1.896],"me1:job-engineer-m":[139.7,1.728],"me1:job-engineer-f":[141.778,1.416],"me1:job-programmer-m":[143.544,1.824],"me1:job-programmer-f":[145.718,1.968],"me1:job-driver-m":[148.036,1.416],"me1:job-driver-f":[149.802,1.536],"me1:job-cook-m":[151.688,1.536],"me1:job-cook-f":[153.574,1.488],"me1:job-builder-m":[155.412,1.488],"me1:job-builder-f":[157.25,1.896],"me1:job-seller-m":[159.496,1.704],"me1:job-seller-f":[161.55,1.248],"me1:job-accountant-m":[163.148,1.704],"me1:job-accountant-f":[165.202,1.008],"me1:job-manager-m":[166.56,1.776],"me1:job-manager-f":[168.686,1.848],"me1:job-mechanic-m":[170.884,1.848],"me1:job-mechanic-f":[173.082,1.704],"me1:job-farmer-m":[175.136,2.088],"me1:job-farmer-f":[177.574,1.824],"me1:job-artist-m":[179.748,1.344],"me1:job-artist-f":[181.442,1.896],"me1:job-home-m":[183.688,2.256],"me1:job-home-f":[186.294,1.824],"me1:job-retired-m":[188.468,1.776],"me1:job-retired-f":[190.594,1.584],"me1:job-unemployed-m":[192.528,1.944],"me1:job-unemployed-f":[194.822,1.848],"me1:work-office":[197.02,2.064],"me1:work-home":[199.434,1.656],"me1:work-hospital":[201.44,2.016],"me1:work-shop":[203.806,1.944],"me1:work-school":[206.1,2.184],"me1:work-factory":[208.634,2.184],"me1:work-warehouse":[211.168,2.016],"me1:work-restaurant":[213.534,2.016],"me1:work-bank":[215.9,1.848],"me1:work-farm":[218.098,2.304],"me1:work-university":[220.752,2.424],"me1:partner-married-m":[223.526,1.728],"me1:partner-married-f":[225.604,1.656],"me1:partner-single-m":[227.61,1.848],"me1:partner-single-f":[229.808,1.944],"me1:partner-wife":[232.102,1.896],"me1:partner-husband":[234.348,1.824],"me1:partner-gf":[236.522,1.704],"me1:partner-bf":[238.576,1.608],"me1:kids-none":[240.534,1.776],"me1:kids-son":[242.66,2.064],"me1:kids-daughter":[245.074,1.008],"me1:kids-sd":[246.432,1.584],"me1:kids-two":[248.366,1.776],"me1:kids-three":[250.492,2.016],"me1:kids-four":[252.858,1.344],"me1:sib-none":[254.552,1.824],"me1:sib-brother":[256.726,1.008],"me1:sib-sister":[258.084,1.776],"me1:sib-both":[260.21,2.256],"me1:sib-brothers":[262.816,2.016],"me1:sib-sisters":[265.182,1.536],"me1:pet-dog":[267.068,1.728],"me1:pet-cat":[269.146,1.584],"me1:pet-both":[271.08,1.704],"me1:why-family":[273.134,2.496],"me1:why-kids":[275.98,2.424],"me1:why-trip":[278.754,1.968],"me1:why-wife":[281.072,1.944],"me1:why-husband":[283.366,1.776],"me1:why-gf":[285.492,2.448],"me1:why-bf":[288.29,1.728],"me1:why-friends":[290.368,1.848],"me1:why-love":[292.566,1.704],"me1:why-languages":[294.62,2.208],"me1:like-read":[297.178,1.704],"me1:like-travel":[299.232,1.488],"me1:like-cook":[301.07,1.536],"me1:like-sport":[302.956,2.064],"me1:like-basketball":[305.37,2.016],"me1:like-football":[307.736,1.728],"me1:like-films":[309.814,1.848],"me1:like-music":[312.012,1.896],"me1:like-fish":[314.258,1.536],"me1:like-walk":[316.144,1.728],"me1:like-dance":[318.222,1.776],"me1:like-sing":[320.348,1.536],"me1:like-draw":[322.234,2.376],"me1:like-games":[324.96,2.304],"me1:like-garden":[327.614,2.448],"me1:like-swim":[330.412,1.416]},"me2":{"me2:u21a-2:3~f":[0,0.936],"me2:cv1:22~n":[1.286,1.536],"me2:cv16:0~n":[3.172,2.496]}},"kore":{"cv1":{"cv1:0":[0.0,1.704],"cv1:2":[2.054,1.416],"cv1:4":[3.82,3.216],"cv1:6":[7.386,1.968],"cv1:8":[9.704,1.344],"cv1:9o0-0":[11.398,1.656],"cv1:9o1-0":[13.404,1.536],"cv1:10":[15.29,1.968],"cv1:18":[17.608,1.968],"cv1:20":[19.926,3.264],"cv1:22":[23.54,2.424]},"cv16":{"cv16:0":[0.0,1.536],"cv16:1o0-0":[1.886,2.328],"cv16:1o1-0":[4.564,1.656],"cv16:1o2-0":[6.57,3.264],"cv16:2":[10.184,1.536],"cv16:4":[12.07,3.216],"cv16:6":[15.636,5.784],"cv16:8":[21.77,1.848],"cv16:10":[23.968,1.848],"cv16:12":[26.166,2.256],"cv16:16":[28.772,1.464],"cv16:18":[30.586,2.976],"cv16:20":[33.912,2.688],"cv16:22":[36.95,2.328],"cv16:24":[39.628,3.504]},"me2":{"me2:cv1:22~n":[0.0,1.416],"me2:cv16:0~n":[1.766,1.824]}},"orus":{"cv1":{"cv1:1":[0.0,1.536],"cv1:3":[1.886,1.344],"cv1:5":[3.58,1.656],"cv1:7":[5.586,1.248],"cv1:9o0":[7.184,1.128],"cv1:9o1":[8.662,2.856],"cv1:11":[11.868,2.136],"cv1:14":[14.354,2.016],"cv1:16":[16.72,1.728],"cv1:19":[18.798,1.656],"cv1:21":[20.804,2.256],"cv1:23":[23.41,1.224]},"cv16":{"cv16:1o0":[0.0,1.896],"cv16:1o1":[2.246,2.544],"cv16:1o2":[5.14,2.616],"cv16:3":[8.106,3.024],"cv16:5":[11.48,2.424],"cv16:7":[14.254,1.776],"cv16:9":[16.38,2.304],"cv16:11":[19.034,1.968],"cv16:13":[21.352,2.544],"cv16:15":[24.246,1.704],"cv16:17":[26.3,1.896],"cv16:19":[28.546,2.208],"cv16:21":[31.104,2.664],"cv16:23":[34.118,1.488],"cv16:25":[35.956,2.568]}},"despina":{"cv1":{"cv1:1":[0.0,0.888],"cv1:3":[1.238,1.728],"cv1:5":[3.316,1.656],"cv1:7":[5.322,1.008],"cv1:9o0":[6.68,1.776],"cv1:9o1":[8.806,2.136],"cv1:11":[11.292,1.944],"cv1:14":[13.586,1.728],"cv1:16":[15.664,0.936],"cv1:19":[16.95,1.608],"cv1:21":[18.908,2.616],"cv1:23":[21.874,1.584]},"cv16":{"cv16:1o0":[0.0,2.424],"cv16:1o1":[2.774,2.376],"cv16:1o2":[5.5,2.928],"cv16:3":[8.778,2.424],"cv16:5":[11.552,2.304],"cv16:7":[14.206,1.728],"cv16:9":[16.284,2.016],"cv16:11":[18.65,1.704],"cv16:13":[20.704,2.664],"cv16:15":[23.718,1.944],"cv16:17":[26.012,1.704],"cv16:19":[28.066,1.608],"cv16:21":[30.024,1.656],"cv16:23":[32.03,1.824],"cv16:25":[34.204,2.136]}},"charon":{"cv1":{"cv1:13":[0.0,2.496],"cv1:15":[2.846,2.136]}}};

/* ===================== ABOUT ME: SENTENCE BANK ===================== */
/* Every sentence is fixed here (only the name is typed in), so each one is checked Spanish with its own recording
   (audio group me1). Where men and women say it differently, the forms are given as [man, woman]. */
const ME_COUNTRIES=[['mx','Mexico','México','México'],['us','the United States','Estados Unidos','Estados Unidos'],['ca','Canada','Canadá','Canadá'],['gb','England','Inglaterra','Inglaterra'],
  ['sc','Scotland','Escocia','Escocia'],['ie','Ireland','Irlanda','Irlanda'],['au','Australia','Australia','Australia'],['gt','Guatemala','Guatemala','Guatemala'],
  ['sv','El Salvador','El Salvador','El Salvador'],['co','Colombia','Colombia','Colombia'],['pr','Puerto Rico','Puerto Rico','Puerto Rico'],['cu','Cuba','Cuba','Cuba'],
  ['es','Spain','España','España'],['de','Germany','Alemania','Alemania'],['fr','France','Francia','Francia'],['it','Italy','Italia','Italia'],
  ['pl','Poland','Polonia','Polonia'],['lt','Lithuania','Lituania','Lituania'],['ua','Ukraine','Ucrania','Ucrania'],['br','Brazil','Brasil','Brasil'],
  ['in','India','la India','la India'],['ph','the Philippines','Filipinas','Filipinas'],['jp','Japan','Japón','Japón']];
const ME_CITIES=[['cdmx','Mexico City','la Ciudad de México'],['gdl','Guadalajara','Guadalajara'],['mty','Monterrey','Monterrey'],['pue','Puebla','Puebla'],
  ['tij','Tijuana','Tijuana'],['cun','Cancún','Cancún'],['la','Los Angeles','Los Ángeles'],['hou','Houston','Houston'],['chi','Chicago','Chicago'],
  ['sa','San Antonio','San Antonio'],['phx','Phoenix','Phoenix'],['ny','New York','Nueva York'],['ldn','London','Londres']];
const ME_JOBS=[['teacher','a teacher','maestro','maestra'],['student','a student','estudiante','estudiante'],['doctor','a doctor','doctor','doctora'],['nurse','a nurse','enfermero','enfermera'],
  ['engineer','an engineer','ingeniero','ingeniera'],['programmer','a programmer','programador','programadora'],['driver','a driver','chofer','chofer'],['cook','a cook','cocinero','cocinera'],
  ['builder','a builder','albañil','albañil'],['seller','a salesperson','vendedor','vendedora'],['accountant','an accountant','contador','contadora'],['manager','a manager','gerente','gerente'],
  ['mechanic','a mechanic','mecánico','mecánica'],['farmer','a farmer','agricultor','agricultora'],['artist','an artist','artista','artista'],['home','a homemaker','amo de casa','ama de casa'],
  ['retired','retired','jubilado','jubilada'],['unemployed','out of work','sin trabajo','sin trabajo']];
const ME_WORK=[['office','in an office','en una oficina'],['home','from home','desde casa'],['hospital','in a hospital','en un hospital'],['shop','in a shop','en una tienda'],['school','at a school','en una escuela'],
  ['factory','in a factory','en una fábrica'],['warehouse','in a warehouse','en una bodega'],['restaurant','in a restaurant','en un restaurante'],['bank','in a bank','en un banco'],['farm','on a farm','en un rancho'],['university','at a university','en una universidad']];
const ME_PARTNER=[['married',"I'm married",['Estoy casado','Estoy casada']],['single',"I'm single",['Estoy soltero','Estoy soltera']],['wife','I have a wife','Tengo esposa'],
  ['husband','I have a husband','Tengo esposo'],['gf','I have a girlfriend','Tengo novia'],['bf','I have a boyfriend','Tengo novio']];
const ME_KIDS=[['none',"I don't have children",'No tengo hijos'],['son','I have a son','Tengo un hijo'],['daughter','I have a daughter','Tengo una hija'],['sd','I have a son and a daughter','Tengo un hijo y una hija'],
  ['two','I have two children','Tengo dos hijos'],['three','I have three children','Tengo tres hijos'],['four','I have four children','Tengo cuatro hijos']];
const ME_SIBS=[['none',"I don't have brothers or sisters",'No tengo hermanos'],['brother','I have a brother','Tengo un hermano'],['sister','I have a sister','Tengo una hermana'],
  ['both','I have a brother and a sister','Tengo un hermano y una hermana'],['brothers','I have two brothers','Tengo dos hermanos'],['sisters','I have two sisters','Tengo dos hermanas']];
const ME_PETS=[['dog','I have a dog','Tengo un perro'],['cat','I have a cat','Tengo un gato'],['both','I have a dog and a cat','Tengo un perro y un gato']];
const ME_LIKES=[['read','to read','leer'],['travel','to travel','viajar'],['cook','to cook','cocinar'],['sport','to work out','hacer ejercicio'],['basketball','to play basketball','jugar básquetbol'],
  ['football','to play soccer','jugar futbol'],['films','to watch movies','ver películas'],['music','to listen to music','escuchar música'],['fish','to fish','pescar'],['walk','to go for walks','caminar'],
  ['dance','to dance','bailar'],['sing','to sing','cantar'],['draw','to draw','dibujar'],['games','to play video games','jugar videojuegos'],['garden','to garden','trabajar en el jardín'],['swim','to swim','nadar']];
const ME_WHY=[['family','My family is from Mexico','Mi familia es de México'],['kids','My children speak Spanish','Mis hijos hablan español'],['trip',"I'm going to Mexico",'Voy a ir a México'],
  ['wife','My wife is Mexican','Mi esposa es mexicana'],['husband','My husband is Mexican','Mi esposo es mexicano'],['gf','My girlfriend is Mexican','Mi novia es mexicana'],['bf','My boyfriend is Mexican','Mi novio es mexicano'],
  ['friends','My friends are Mexican','Mis amigos son mexicanos'],['love','I like Mexico','Me gusta México'],['languages','I like learning languages','Me gusta aprender idiomas']];
function meBank(){const b=[['name','My name is…','Me llamo'],['learn',"I'm learning Spanish",'Estoy aprendiendo español'],['nice','Nice to meet you!','¡Mucho gusto!']];
  const gloss=(lt,en)=>{const k=norm(lt);if(!k.includes(' ')&&!GLUE[k])GLUE[k]=en;};
  ME_COUNTRIES.forEach(c=>{b.push(['from-'+c[0],"I'm from "+c[1],'Soy de '+c[2]]);b.push(['live-'+c[0],'I live in '+c[1],'Vivo en '+c[3]]);gloss(c[2],c[1]);});
  ME_CITIES.forEach(c=>{b.push(['live-'+c[0],'I live in '+c[1],'Vivo en '+c[2]]);gloss(c[2],c[1]);});
  ME_JOBS.forEach(j=>{b.push(['job-'+j[0]+'-m',"I'm "+j[1],PERS.jobLine(j,'m').slice(0,-1)]);b.push(['job-'+j[0]+'-f',"I'm "+j[1],PERS.jobLine(j,'f').slice(0,-1)]);gloss(j[2],j[1].replace(/^an? /,''));gloss(j[3],j[1].replace(/^an? /,''));});
  ME_WORK.forEach(w=>{b.push(['work-'+w[0],'I work '+w[1],'Trabajo '+w[2]]);});
  [['partner',ME_PARTNER],['kids',ME_KIDS],['sib',ME_SIBS],['pet',ME_PETS],['why',ME_WHY]].forEach(([k,list])=>list.forEach(o=>{
    if(Array.isArray(o[2])){b.push([k+'-'+o[0]+'-m',o[1],o[2][0]]);b.push([k+'-'+o[0]+'-f',o[1],o[2][1]]);}else b.push([k+'-'+o[0],o[1],o[2]]);}));
  ME_LIKES.forEach(l=>{b.push(['like-'+l[0],'I like '+l[1],'Me gusta '+l[2]]);gloss(l[2],l[1]);});
  Object.assign(GLUE,{'vivo':'I live','trabajo':'I work','tengo':'I have','hijos':'children','hijo':'son','hija':'daughter','hermanos':'brothers and sisters','hermano':'brother','hermana':'sister',
    'hermanas':'sisters','perro':'dog','gato':'cat','gusta':'pleases','mis':'my','hablan':'speak','voy':'I go','a':'to','ir':'to go','familia':'family','esposa':'wife','esposo':'husband',
    'novia':'girlfriend','novio':'boyfriend','amigos':'friends','son':'are','idiomas':'languages','aprender':'to learn','casado':'married','casada':'married','soltero':'single','soltera':'single',
    'una':'a','dos':'two','tres':'three','cuatro':'four','mexicana':'Mexican','mexicano':'Mexican','mexicanos':'Mexican','sin':'without','desde':'from','casa':'home','la':'the','el':'the'});
  return b.map(([k,en,lt])=>({id:'me1:'+k,lt,en,alt:[],me:true}));}
const ME_BANK=meBank();const ME_BY={};ME_BANK.forEach(i=>ME_BY[i.id]=i);
/* Before the About me lessons: what's special about talking about yourself in Spanish. */
const ME_TIP='Every sentence here is about <b>you</b>. You can start with <b>Yo</b> (I) or leave it out: <b>Yo soy de Inglaterra</b> and <b>Soy de Inglaterra</b> are both right, and people usually leave it out.<br><br>'+
  'Some words change for women: a man says <b>Estoy casado</b>, a woman <b>Estoy casada</b>.';

/* Things I can do in real life (each line finishes "I can ..."): lesson ids before the bite-size split, and the conversation that rehearses it. */
const CANDO=[
 ['greet','👋','greet people and say goodbye',['u1a','u1b'],'cv1'],
 ['intro','🙋','introduce myself and say where I\'m from',['u1c']],
 ['howru','💬','ask how someone is, and answer',['u21a'],'cv16'],
 ['stuck','🆘','say I don\'t understand and ask for help',['u21b']],
];

/* ===================== ANSWER FEEDBACK ===================== */
/* Replies that mean the same thing all count (keys are norm()'d). Not across times of day. */
const ALSO={'hola':[],'buenos días':['Hola'],'buenas tardes':['Hola'],'buenas noches':['Hola'],'adiós':['Hasta luego','Nos vemos'],'hasta luego':['Adiós','Nos vemos'],
  'nos vemos':['Adiós','Hasta luego'],'gracias':['Muchas gracias'],'perdón':['Disculpa'],'está bien':['Sale','Va']};
/* Why a typed word was wrong: Spanish mistakes are mostly accents, ñ, and endings for who / man or woman. */
const MARK_SOUND={'ñ':'"ny" as in canyon','ü':'a "w" (pingüino: peen-GWEE-noh)'};
const WHO_WORDS=['yo','tú','nosotros','nosotras'];
function marksNote(g,t){const a=[...g],b=[...t];for(let i=0;i<b.length;i++)if(a[i]!==b[i]){const c=b[i];
    if('áéíóú'.includes(c))return 'In <b>'+esc(t)+'</b> the accent on <b>'+c+'</b> marks the syllable you stress.'+(['sí','tú','él','mí','qué','cómo','dónde'].includes(t)?' Without it the word means something else.':'');
    if(MARK_SOUND[c])return '<b>'+c+'</b> sounds like '+MARK_SOUND[c]+', so it is a different letter from plain <b>'+esc(strip(c))+'</b>.';
    if('áéíóú'.includes(a[i]))return 'No accent here: <b>'+esc(c)+'</b>, not <b>'+a[i]+'</b>.';
    return '';}return '';}
function endingWhy(g,t,prev){const sg=strip(g),st=strip(t);const end=t.slice(Math.min(sameStart(sg,st),t.length-1));
  const head='<b>'+esc(g)+'</b> → <b>'+esc(t)+'</b>. ';
  const mf=(m,f)=>(m.endsWith('o')&&f===m.slice(0,-1)+'a')||(/[nlrs]$/.test(m)&&f===m+'a')||(m.endsWith('os')&&f===m.slice(0,-2)+'as');
  if(mf(sg,st))return head+'<b>'+esc(g)+'</b> is the "him" form; here it\'s the "her" form, <b>'+esc(t)+'</b>.';
  if(mf(st,sg))return head+'<b>'+esc(g)+'</b> is the "her" form; here it\'s the "him" form, <b>'+esc(t)+'</b>.';
  const mg=glossOf(g),mt=glossOf(t);
  if(mg&&mt&&mg!==mt)return head+'<b>'+esc(g)+'</b> means "'+esc(mg)+'", but here you need "'+esc(mt)+'".';
  const p=norm(prev||'');
  const who={'yo':['I','o'],'tú':['you','s'],'nosotros':['we','mos'],'nosotras':['we','mos']}[p];
  if(who&&st.endsWith(who[1]))return head+'After <b>'+p+'</b> ('+who[0]+') the doing word ends in <b>-'+who[1]+'</b>.';
  if(st.endsWith('s')&&!sg.endsWith('s'))return head+'This one ends in <b>-s</b>: more than one, or "you" doing it.';
  return head+'Same word, different ending. In Spanish the ending shows who does it (hablo, I speak; hablas, you speak) and matches "him" and "her" words; here it ends in <b>-'+esc(end)+'</b>.';}

/* ===================== PRONUNCIATION GUIDE ===================== */
const GUIDE_HTML=`<div class="card">
      <h2>Reading "sounds like"</h2>
      <p class="note">Plain English spelling, split into syllables. The bolder syllable is the one you stress. Each spelling below always means the same sound.</p>
      <div class="sounds">
        <div><b>ah</b><span>as in f<i>a</i>ther</span></div>
        <div><b>eh</b><span>as in b<i>e</i>t</span></div>
        <div><b>ee</b><span>as in s<i>ee</i></span></div>
        <div><b>oh</b><span>as in g<i>o</i>, but short, with no "oo" at the end</span></div>
        <div><b>oo</b><span>as in m<i>oo</i>n</span></div>
        <div><b>ai</b><span>as in <i>ai</i>sle, the "eye" sound: <i>bai-LAHR</i></span></div>
        <div><b>ay</b><span>as in d<i>ay</i>: <i>SAYS</i> (seis)</span></div>
        <div><b>ow</b><span>as in c<i>ow</i></span></div>
        <div><b>y, w</b><span>as in <i>y</i>es and <i>w</i>et: <i>BWEH-nohs</i>, <i>GRAH-syahs</i></span></div>
        <div><b>h</b><span>a breathy "h", for the Spanish j and for g before e or i: <i>hee-RAH-fah</i></span></div>
        <div><b>r, rr</b><span>r is one quick tap of the tongue, like the "tt" in American "butter"; rr is rolled</span></div>
      </div>
    </div>
    <div class="card">
      <h2>Spanish letters</h2>
      <p class="note">Spanish is written the way it sounds. Learn the letters below and you can read almost anything.</p>
      <div class="sounds">
        <div><b>á é í ó ú</b><span>the same vowels, stressed. The accent shows where the stress goes: <i>café, teléfono</i></span></div>
        <div><b>ñ</b><span>"ny" as in canyon: <i>piña, español</i></span></div>
        <div><b>j</b><span>a breathy "h": <i>jirafa</i>. So is the x in México</span></div>
        <div><b>h</b><span>always silent: <i>hola, hotel</i></span></div>
        <div><b>ll, y</b><span>both like English "y": <i>tortilla, yo</i></span></div>
        <div><b>c, z</b><span>"s" before e or i, and z is always "s" in Mexico: <i>gracias, cereal</i>. Elsewhere c is "k": <i>café</i></span></div>
        <div><b>v</b><span>sounds like a soft "b": <i>nos vemos</i> is nohs BEH-mohs</span></div>
        <div><b>qu, gu</b><span>"k" and "g" before e or i; the u is silent: <i>¿qué?, guitarra</i></span></div>
        <div><b>¿ ¡</b><span>questions and exclamations also start with an upside-down mark</span></div>
      </div>
    </div>`;
