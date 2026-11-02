/* Gintaras language file: Lithuanian. Everything that belongs to this one language lives here: the course,
   conversations, sounds-like guide, audio map, About-me phrases, tips, level titles, and the helpers that know
   Lithuanian grammar. index.html loads exactly one language file before the app code (see LANGUAGES there). */
const LANG={code:'lt',en:'Lithuanian',own:'Lietuvių',speech:'lt-LT',tts:'lt-LT',letters:'ąčęėįšųūž',
  /* type a letter twice for its marked version; once more goes back to the plain pair */
  dbl:{ss:'š',zz:'ž',cc:'č',ee:'ė','ėe':'ę','ęe':'ee',uu:'ū','ūu':'ų','ųu':'uu',aa:'ą','ąa':'aa',ii:'į','įi':'ii','šs':'ss','žz':'zz','čc':'cc'},
  dblTip:'or type the letter twice (ss → š, ee → ė)',
  caronNote:'Tip: type a letter twice for its marked version, ss → š.',
  /* i and y: y is a long "ee" (the same sound as į), so mixing them up is a spelling slip, like a missing mark */
  fold:s=>s.replace(/y/g,'i'),
  /* words that never change their ending (adverbs and the like): a wrong letter at their end is spelling */
  /* endings a naming word (a noun or a name) can take, written without marks: Kanada / iš Kanados / Kanadoje */
  nounEnds:['as','a','os','o','ui','ai','e','es','is','ys','i','us','u','oje','eje','yje','uje','uose','ose','iai','iu','ius','ams','oms','ems','ais','omis','ims','iams','iui','io','ia','ios','iais','ioje','ies','imi','ei'],
  fixed:['gerai','puikiai','neblogai','blogai','labai','nelabai','lietuviškai','angliškai','teisingai','dažnai','retai','tiesiai','vėlai','pernai','galiausiai','tikrai','rimtai','visai'],
  /* the rule behind pairs learners mix up, added to "Different word" */
  pairRule:(g,t)=>({'ji|jis':' <b>Jis</b> (he) ends in <b>-s</b>, like most "he" words; <b>ji</b> is "she".','jie|jos':' <b>Jie</b> is "they" for men or a mixed group; <b>jos</b> is "they" for women only.',
    'mano|tavo':' <b>Mano</b> is "my", <b>tavo</b> is "your".','aš|tu':' <b>Aš</b> is "I", <b>tu</b> is "you".','jis|jie':' <b>Jis</b> is one man, <b>jie</b> is several.','ji|jos':' <b>Ji</b> is one woman, <b>jos</b> is several.'})[[norm(g),norm(t)].sort().join('|')]||'',
  foldNote:'<b>y</b> is a long "ee", the same sound as <b>į</b>, so it is written differently from a short <b>i</b>.',
  politeNote:'That\'s the polite "you", for strangers, older people or more than one person. The friendly one is for a friend.',
  /* the polite version of a "your / to you" phrase, or null (only when no verb has to change with it) */
  polite:lt=>{const m={tavo:'jūsų',tau:'jums',tave:'jus'},w=lt.split(' ');if(!w.some(x=>m[norm(x)])||w.some(x=>norm(x)==='tu'))return null;
    return w.map(x=>{const k=norm(x),to=m[k];if(!to)return x;return (x[0]!==x[0].toLowerCase()?to[0].toUpperCase()+to.slice(1):to)+x.slice(k.length);}).join(' ');},
  /* word endings, written without marks, so a slip at the end of a word can be told from a spelling slip */
  endings:['a','ai','ais','am','ame','ams','as','asi','ate','au','e','ei','eis','em','eme','ems','es','ese','esi','ete','i','ia','iai','iais','iam','iame','iams','ias','iasi','iate','iau','ie','iem','iems','ies','iesi','ime','imi','is','isi','ite','iu','ius','iuose','iuosi','iui','ims','o','oje','ojo','om','ome','oms','os','ose','osi','ote','siu','sime','site','ti','tis','u','ui','uje','um','ums','uose','uosi','us','y','yje','ys','yse'],audio:'audio/',
  hello:'Labas!',praise:['Puiku!','Gerai!','Šaunu!'],top:'Labai šaunu.',decoys:'aeiklmnorstuvėšžč',
  /* (Round 8) words whose place in a sentence is fixed (named stay, not fixed: the same key twice hid the list of words that never change their ending) */
  stay:['irgi','ne','iš','į','su','prie','be','po','už','ar','o','ir','bet','labai','dar','nuo','iki','per','apie','pas'],
  /* (Round 8) the polite extra: adding it is never wrong, leaving it out where the English says "please" is Nearly */
  please:'prašau',
  dropWho:'Both are right: Lithuanian can leave out the word for "I", "you" or "we", because the ending of the doing word already says who.',
  be:['esu','esi','esame','esate'],
  /* the forms of "to be" and who they go with, so "Mes esu" is explained as the wrong person, not a missing word */
  beWho:{esu:'aš',esi:'tu',yra:'jis',esame:'mes',esate:'jūs'},
  personNote:(g,t)=>{const w={esu:'aš (I)',esi:'tu (you)',yra:'jis or ji (he, she)',esame:'mes (we)',esate:'jūs (you, polite)'};return '<b>'+g+'</b> goes with '+w[g].replace(/^(\S+)/,'<b>$1</b>')+'. Here it\'s '+w[t].replace(/^(\S+)/,'<b>$1</b>').replace(/\s*\(.*$/,'')+', so <b>'+t+'</b>.';},
  /* Real words that are a different form of the one the card wants: "mus" (us) for mes (we), "puikus" (a great thing) for
     puikiai (doing great). The Why note says what the form is for, instead of calling it a spelling slip or "not needed". */
  forms:{aš:['aš','n','I'],man:['aš','d','to me'],mane:['aš','a','me'],manęs:['aš','g','of me'],mano:['aš','p','my'],
    tu:['tu','n','you'],tau:['tu','d','to you'],tave:['tu','a','you'],tavęs:['tu','g','of you'],tavo:['tu','p','your'],
    mes:['mes','n','we'],mums:['mes','d','to us'],mus:['mes','a','us'],mūsų:['mes','p','our'],
    jūs:['jūs','n','you (polite)'],jums:['jūs','d','to you (polite)'],jus:['jūs','a','you (polite)'],jūsų:['jūs','p','your (polite)'],
    jis:['jis','n','he'],jam:['jis','d','to him'],jį:['jis','a','him'],jo:['jis','p','his'],
    ji:['ji','n','she'],jai:['ji','d','to her'],ją:['ji','a','her'],jos:['ji','p','her'],
    jie:['jie','n','they'],jiems:['jie','d','to them'],juos:['jie','a','them'],jų:['jie','p','their']},
  formRole:{n:'the one doing it',d:'"to / for" someone (and the one something feels a certain way to: <b>man gerai</b>, I\'m fine)',a:'the one something is done to (they see <b>us</b>)',g:'"of"',p:'whose it is'},
  formNote:(g,t)=>{const F=LANG.forms,a=F[g],b=F[t];
    if(a&&b&&a[1]==='p'&&b[1]==='p'&&a[0]!==b[0])return '<b>'+g+'</b> is "'+a[2]+'"; here you need <b>'+t+'</b> ("'+b[2]+'").';
    if(a&&b&&a[0]===b[0]&&g!==t)return '<b>'+g+'</b> is a real word, "'+a[2]+'": it is '+LANG.formRole[a[1]]+'. Here you need <b>'+t+'</b> ("'+b[2]+'"), '+LANG.formRole[b[1]]+'.';
    /* puikus / puikiai: describing a thing, or saying how */
    const adv=w=>/[^aeiouy]i?ai$/.test(w)&&(LANG.fixed||[]).includes(w),stem=w=>w.replace(/i?ai$/,''),adj=(w,s)=>w.length>s.length&&w.startsWith(s)&&(/iai$/.test(t)?/^(us|ūs|i|ios|ią|ius|ių|ų)$/:/^(as|a|i|os|ą|us|ų|ė|is)$/).test(w.slice(s.length));
    const en=w=>({puikiai:'great',gerai:'good',blogai:'bad',neblogai:'not bad'})[w]||((typeof fullGloss==='function'?fullGloss(w,1):'')||'good');if(['labas','laba','labą'].includes(g))return '';
    /* only the real describing word: "geria" is "drinks", not a form of geras */
    const A={gerai:'geras',puikiai:'puikus',blogai:'blogas',neblogai:'neblogas'}[t]||g,gl=w=>typeof glossOf==='function'?glossOf(w):'';
    if(adv(t)&&adj(g,stem(t))&&!(gl(g)&&gl(A)&&gl(g)!==gl(A))&&!(gl(g)&&!gl(A)&&g!==A))return '<b>'+g+'</b> describes a thing (a '+en(t)+' evening); <b>'+t+'</b> describes how things are (<b>Man '+t+'</b>, I\'m '+en(t)+'). Here it\'s how, so <b>'+t+'</b>.';
    if(adv(g)&&adj(t,stem(g)))return '<b>'+g+'</b> describes how things are (<b>Man '+g+'</b>); <b>'+t+'</b> describes a thing. Here it describes a thing, so <b>'+t+'</b>.';
    return '';},
  qWord:'ar',qNote:'Right too: <b>ar</b> at the front only marks a question, and in speech it is often left out.',dropBe:'Right too: in everyday speech Lithuanians often leave out <b>esu</b> (am), <b>esi</b> (are) and the like. Written in full, it is the version above.'};
const LEVELS=[[0,'Turistas','Tourist'],[150,'Keliautojas','Traveler'],[400,'Pažįstamas','Acquaintance'],[800,'Draugas','Friend'],[1500,'Vilnietis','Vilnius local'],[3000,'Lietuvis','Honorary Lithuanian']];
/* ===================== COURSE CONTENT ===================== */
/* item: [lt, en, note?, altLt?] */
const COURSE = [
{id:'u1',title:'Pradžia',en:'Basics',tip:'Lithuanian has no words for "a" or "the". <b>Labas</b> on its own is for friends; <b>Sveiki</b> is for strangers, groups and anyone older. <b>Labas rytas</b>, <b>Laba diena</b> and <b>Labas vakaras</b> (good morning, day, evening) are fine with anyone.',lessons:[
 {id:'u1a',title:'Greetings',items:[
  ['Labas','Hello','Informal. Also used for "Hi".',['Labas!']],
  ['Sveiki','Hello (formal)','To a stranger, a group, or someone older.'],
  ['Labas rytas','Good morning','Also Labą rytą, the same greeting.',['Labą rytą']],
  ['Laba diena','Good day','Used from late morning until evening. You will also hear Labą dieną, the same greeting.',['Labą dieną']],
  ['Labas vakaras','Good evening','Also Labą vakarą, the same greeting.',['Labą vakarą']],
  ['Labanakt','Good night'],
  ['Viso gero','Goodbye'],
  ['Iki','Bye','Word for word it means "until": short for "until we see each other".'],
  ['Ačiū','Thank you','Pronounced AH-choo.'],
  ['Prašau','Please','Also means "you\'re welcome" and "here you go".'],
 ]},
 {id:'u1b',title:'Yes, no, sorry',items:[
  ['Taip','Yes'],
  ['Ne','No'],
  ['Atsiprašau','Sorry','Also "excuse me".'],
  ['Gerai','OK','Also "good" or "fine".'],
  ['Kaip sekasi?','How are you?'],
  ['Puikiai','Great'],
  ['Nieko tokio','No problem','Literally "nothing of the kind".'],
  ['Malonu susipažinti','Nice to meet you'],
  ['Iki pasimatymo','See you later'],
  ['Sėkmės','Good luck'],
 ]},
 {id:'u1c',title:'Who I am',items:[
  ['Aš','I (as in "I am")'],
  ['Tu','You (to a friend)','Informal, one person.'],
  ['Jis','He'],
  ['Ji','She'],
  ['Mes','We'],
  ['Jūs','You (formal or plural)'],
  ['Jie','They (men or mixed)'],
  ['Jos','They (women)'],
  ['Mano vardas Tomas','My name is Tomas','"yra" (is) is usually dropped here.',['Mano vardas yra Tomas']],
  ['Koks tavo vardas?','What is your name?'],
  ['Aš esu iš Amerikos','I am from America'],
 ]},
 {id:'u1d',title:'I am, you are',items:[
  ['Aš esu Tomas','I am Tomas','Esu means "am". The verb already says who, so you can leave out aš: Esu Tomas.'],
  ['Tu esi Jonas?','Are you Jonas?','Esi means "are", to one friend. Said as a question, it asks.'],
  ['Jis yra Jonas','He is Jonas','Yra means "is". It is the same for he and she.'],
  ['Ji yra Rūta','She is Rūta'],
  ['Mes esame čia','We are here','Esame means "are", for we.'],
 ]},
]},
{id:'u2',title:'Skaičiai',en:'Numbers',tip:'Numbers 1 to 9 change their ending to match a "him" or a "her" word. The forms here are the masculine ones you count with.',lessons:[
 {id:'u2a',title:'One to ten',items:[
  ['vienas','one'],['du','two'],['trys','three'],['keturi','four'],['penki','five'],
  ['šeši','six'],['septyni','seven'],['aštuoni','eight'],['devyni','nine'],['dešimt','ten'],
 ]},
 {id:'u2b',title:'Bigger numbers',items:[
  ['nulis','zero'],['vienuolika','eleven'],['dvylika','twelve'],['trylika','thirteen'],['keturiolika','fourteen'],
  ['penkiolika','fifteen'],['dvidešimt','twenty'],['trisdešimt','thirty'],['šimtas','one hundred'],['tūkstantis','one thousand'],
 ]},
 {id:'u2c',title:'Counting things',items:[
  ['Kiek?','How many?','Also "how much?"'],
  ['Kiek tau metų?','How old are you?'],
  ['Man dvidešimt metų','I am twenty years old','Literally "to me twenty years".'],
  ['Kiek kainuoja?','How much does it cost?'],
  ['vienas euras','one euro'],
  ['du eurai','two euros','Plural ending after 2 to 9.'],
  ['dešimt eurų','ten euros','After 10 the noun takes -ų.'],
  ['pirmas','first'],['antras','second'],['trečias','third'],
 ]},
]},
{id:'u3',title:'Maistas',en:'Food',tip:'After <b>noriu</b> (I want) the thing you want changes ending: kava becomes <b>kavos</b>, arbata becomes <b>arbatos</b>. You will see this "some of" ending everywhere.',lessons:[
 {id:'u3a',title:'At the table',items:[
  ['duona','bread'],['pienas','milk'],['vanduo','water'],['kava','coffee'],['arbata','tea'],
  ['sūris','cheese'],['mėsa','meat'],['sriuba','soup'],['kiaušinis','egg'],['sviestas','butter'],
 ]},
 {id:'u3b',title:'More food',items:[
  ['obuolys','apple'],['bulvė','potato'],['žuvis','fish'],['vištiena','chicken','The meat. The bird has its own word.'],['cukrus','sugar'],
  ['druska','salt'],['alus','beer'],['vynas','wine'],['pyragas','cake','Also "pie".'],['ledai','ice cream','Always plural.'],
 ]},
 {id:'u3c',title:'Eating out',items:[
  ['Aš noriu kavos','I want coffee'],
  ['Aš valgau duoną','I am eating bread'],
  ['Aš geriu vandenį','I am drinking water'],
  ['Skanu!','Tasty!'],
  ['Aš esu alkanas','I am hungry','A woman says "alkana".',['Aš esu alkana']],
  ['Sąskaitą, prašau','The bill, please'],
  ['Skanaus!','Enjoy your meal!','Said before eating, like "bon appétit".'],
  ['Į sveikatą!','Cheers!','Literally "to health".'],
  ['meniu','menu'],['restoranas','restaurant'],
 ]},
 {id:'u3d',title:'At the table',items:[
  ['Ar nori kavos?','Do you want coffee?'],
  ['Aš noriu arbatos','I want tea','After noriu, arbata becomes arbatos.'],
  ['Aš valgau mėsą','I eat meat'],
  ['Aš valgau žuvį','I eat fish'],
  ['Dar sriubos?','More soup?','Literally "more of soup?"'],
  ['Taip, dar truputį','Yes, a little more'],
  ['Aš sotus','I\'m full','A woman says "Aš soti".',['Aš soti']],
  ['Paduok druską, prašau','Pass the salt, please','To a friend. To a stranger: "Paduokite".'],
  ['Viskas labai skanu','Everything is very tasty'],
  ['Ačiū už viską','Thanks for everything'],
 ]},
]},
{id:'u4',title:'Šeima',en:'Family',tip:'Masculine nouns usually end in <b>-as</b>, <b>-is</b> or <b>-us</b>; feminine ones in <b>-a</b> or <b>-ė</b>. Draugas is a male friend, draugė a female friend.',lessons:[
 {id:'u4a',title:'Close family',items:[
  ['mama','mom'],['tėtis','dad'],['sesuo','sister'],['brolis','brother'],['sūnus','son'],
  ['dukra','daughter'],['senelis','grandfather'],['senelė','grandmother'],['šeima','family'],['vaikas','child'],
 ]},
 {id:'u4b',title:'People',items:[
  ['vyras','man','Also "husband".'],['moteris','woman'],['žmona','wife'],['draugas','friend (male)'],['draugė','friend (female)'],
  ['berniukas','boy'],['mergaitė','girl'],['žmogus','person'],
  ['Tai mano brolis','This is my brother'],
  ['Aš turiu seserį','I have a sister','sesuo changes to seserį after "turiu".'],
 ]},
]},
{id:'u5',title:'Spalvos',en:'Colors',tip:'Adjectives agree with the noun: <b>žalias obuolys</b> (a green apple, a "him" word) but <b>balta duona</b> (white bread, a "her" word). Swap -as for -a.',lessons:[
 {id:'u5a',title:'Colors',items:[
  ['raudonas','red'],['mėlynas','blue'],['žalias','green'],['geltonas','yellow'],['juodas','black'],
  ['baltas','white'],['rudas','brown'],['pilkas','grey'],['rožinis','pink'],['oranžinis','orange'],
 ]},
 {id:'u5b',title:'Describing things',items:[
  ['didelis','big'],['mažas','small'],['naujas','new'],['senas','old'],['gražus','beautiful'],
  ['geras','good'],['blogas','bad'],
  ['žalias obuolys','a green apple'],
  ['balta duona','white bread','duona is feminine, so baltas becomes balta.'],
  ['didelis namas','a big house'],
 ]},
]},
{id:'u6',title:'Gyvūnai',en:'Animals',tip:'The stork (<b>gandras</b>) is Lithuania\'s national bird. Seeing the first one in spring is said to bring a good year.',lessons:[
 {id:'u6a',title:'On the farm',items:[
  ['šuo','dog'],['katė','cat'],['arklys','horse'],['karvė','cow'],['paukštis','bird'],
  ['kiaulė','pig'],['višta','hen'],['avis','sheep'],['pelė','mouse'],['triušis','rabbit'],
 ]},
 {id:'u6b',title:'In the forest',items:[
  ['vilkas','wolf'],['lokys','bear'],['lapė','fox'],['gandras','stork'],['briedis','moose'],
  ['varlė','frog'],['bitė','bee'],['drugelis','butterfly'],
  ['Aš turiu šunį','I have a dog','šuo becomes šunį after "turiu".'],
  ['Katė miega','The cat is sleeping'],
 ]},
]},
{id:'u7',title:'Laikas',en:'Time',tip:'Days are numbered: pirmadienis is "first day" (Monday), antradienis "second day", and so on up to sekmadienis, Sunday. Months are named after nature: July is named after the linden tree.',lessons:[
 {id:'u7a',title:'Days of the week',items:[
  ['pirmadienis','Monday'],['antradienis','Tuesday'],['trečiadienis','Wednesday'],['ketvirtadienis','Thursday'],['penktadienis','Friday'],
  ['šeštadienis','Saturday'],['sekmadienis','Sunday'],['šiandien','today'],['rytoj','tomorrow'],['vakar','yesterday'],
 ]},
 {id:'u7b',title:'Parts of the day',items:[
  ['dabar','now'],['rytas','morning'],['diena','day'],['vakaras','evening'],['naktis','night'],
  ['savaitė','week'],['mėnuo','month'],['metai','year','Always plural.'],['valanda','hour'],
  ['Kiek valandų?','What time is it?','Literally "how many hours?"'],
 ]},
 {id:'u7c',title:'Seasons and months',items:[
  ['pavasaris','spring'],['vasara','summer'],['ruduo','autumn'],['žiema','winter'],
  ['sausis','January','From "sausas", dry.'],['vasaris','February'],['kovas','March','Named after the rook, a bird.'],
  ['birželis','June','Birch month.'],['liepa','July','Linden month.'],['gruodis','December','Month of frozen clods.'],
 ]},
]},
{id:'u8',title:'Veiksmažodžiai',en:'Verbs',tip:'Dictionary forms end in <b>-ti</b>. For "I", the ending becomes -u (einu, noriu); for "you", -i (eini, nori). Pronouns are often dropped because the ending already tells who.',lessons:[
 {id:'u8a',title:'Dictionary forms',items:[
  ['būti','to be'],['eiti','to go'],['valgyti','to eat'],['gerti','to drink'],['kalbėti','to speak'],
  ['skaityti','to read'],['rašyti','to write'],['norėti','to want'],['turėti','to have'],['žinoti','to know'],
 ]},
 {id:'u8b',title:'I, you, he',items:[
  ['Aš esu','I am'],['Tu esi','You are (to a friend)'],['Jis yra','He is'],['Aš einu','I go'],['Aš kalbu','I speak'],
  ['Aš skaitau','I read'],['Aš noriu','I want'],['Aš turiu','I have'],['Aš žinau','I know'],['Aš nežinau','I don\'t know','"ne-" glued to the front makes a verb negative.'],
 ]},
 {id:'u8c',title:'Sentences',items:[
  ['Aš kalbu lietuviškai','I speak Lithuanian'],
  ['Ar tu kalbi angliškai?','Do you speak English? (to a friend)','"Ar" turns a sentence into a yes/no question.'],
  ['Aš nesuprantu','I don\'t understand'],
  ['Aš suprantu','I understand'],
  ['Aš gyvenu Lietuvoje','I live in Lithuania'],
  ['Aš mokausi lietuvių kalbos','I am learning Lithuanian'],
  ['Aš dirbu','I work'],
  ['Aš miegu','I sleep'],
  ['Mes einame namo','We are going home'],
  ['Jie valgo','They are eating'],
 ]},
]},
{id:'u9',title:'Mieste',en:'In the city',tip:'<b>Kur yra ...?</b> works for any place. Answers come as directions: kairėn, dešinėn, tiesiai. "Čia" is here and "ten" is there.',lessons:[
 {id:'u9a',title:'Places',items:[
  ['miestas','city'],['kaimas','village'],['namas','house'],['mokykla','school'],['parduotuvė','shop'],
  ['gatvė','street'],['stotis','station'],['bažnyčia','church'],['ligoninė','hospital'],['bankas','bank'],
 ]},
 {id:'u9b',title:'Finding your way',items:[
  ['Kur yra stotis?','Where is the station?'],
  ['kairėn','to the left'],['dešinėn','to the right'],['tiesiai','straight ahead'],
  ['čia','here'],['ten','there'],['toli','far'],['arti','near'],
  ['vaistinė','pharmacy'],['paštas','post office'],
 ]},
]},
{id:'u10',title:'Kelionė',en:'Travel',tip:'Lithuania\'s three big cities are Vilnius (capital), Kaunas and Klaipėda on the coast. The Curonian Spit, a long sand dune in the Baltic, is the country\'s most famous landscape.',lessons:[
 {id:'u10a',title:'Getting around',items:[
  ['bilietas','ticket'],['lėktuvas','airplane'],['traukinys','train'],['autobusas','bus'],['oro uostas','airport'],
  ['viešbutis','hotel'],['pasas','passport'],['pinigai','money','Always plural.'],['lagaminas','suitcase'],['žemėlapis','map'],
 ]},
 {id:'u10b',title:'Lithuania',items:[
  ['Lietuva','Lithuania'],['Vilnius','Vilnius','The capital.'],['Kaunas','Kaunas','Second city, on two rivers.'],['Klaipėda','Klaipėda','The port city.'],
  ['jūra','sea'],['Baltijos jūra','the Baltic Sea'],['miškas','forest'],['ežeras','lake'],['upė','river'],
  ['lietuvis','a Lithuanian (man)','A woman uses another ending.'],
 ]},
]},
{id:'u11',title:'Oras ir jausmai',en:'Weather and feelings',tip:'Feelings often use "man" (to me): <b>Man šalta</b> is "I\'m cold", literally "to me it is cold". <b>Man patinka</b> is "I like it", literally "to me it pleases".',lessons:[
 {id:'u11a',title:'Weather',items:[
  ['oras','weather','Also "air".'],['lietus','rain'],['sniegas','snow'],['saulė','sun'],['vėjas','wind'],
  ['debesis','cloud'],['Šilta','It\'s warm'],['Šalta','It\'s cold'],['Lyja','It\'s raining'],['Sninga','It\'s snowing'],
 ]},
 {id:'u11b',title:'Feelings',items:[
  ['laimingas','happy','A woman uses another ending.'],['liūdnas','sad'],['pavargęs','tired','A woman uses another ending.'],['ištroškęs','thirsty'],
  ['Man karšta','I\'m hot'],['Man šalta','I\'m cold'],['Aš sergu','I am sick'],
  ['Man patinka','I like it'],['Aš myliu tave','I love you'],
  ['Koks šiandien oras?','What\'s the weather like today?'],
 ]},
]},
{id:'u12',title:'Kultūra',en:'Culture',tip:'Lithuanian is one of the oldest living Indo-European languages and the closest to Sanskrit still spoken. Some of these words have no English equivalent at all.',lessons:[
 {id:'u12a',title:'Only in Lithuania',items:[
  ['gintaras','amber','Baltic gold, washed up on the coast for millennia. Also a man\'s name.'],
  ['cepelinai','zeppelins','Potato dumplings stuffed with meat, shaped like airships.'],
  ['šaltibarščiai','cold beet soup','Bright pink, eaten in summer with hot potatoes.'],
  ['rūta','rue','The national plant, worn by brides.'],
  ['Joninės','Midsummer night','June 24, bonfires and flower wreaths.'],
  ['krepšinis','basketball','The unofficial religion.'],
  ['gira','kvass','A fizzy drink made from bread.'],
  ['Užgavėnės','Shrovetide','A carnival to chase winter away, with masks and pancakes.'],
  ['Gedimino pilis','Gediminas\' Castle','The castle and its tower above Vilnius.'],
  ['Vasario 16-oji','February 16','Independence Day, 1918.',['Vasario šešioliktoji']],
 ]},
 {id:'u12b',title:'Useful phrases',items:[
  ['Su gimtadieniu!','Happy birthday!'],
  ['Linksmų Kalėdų!','Merry Christmas!'],
  ['Laimingų Naujųjų metų!','Happy New Year!'],
  ['Sveiki atvykę!','Welcome!'],
  ['Labai ačiū','Thank you very much'],
  ['Ar galite pakartoti?','Can you repeat that? (polite)'],
  ['Lėčiau, prašau','Slower, please'],
  ['Padėkite!','Please help!'],
  ['Kur tualetas?','Where is the toilet?'],
  ['Aš nekalbu lietuviškai','I don\'t speak Lithuanian'],
 ]},
]},
{id:'u13',title:'Klausimai',en:'Questions and help',tip:'Question words go first, just like English. Add <b>Ar</b> at the start of any sentence to make it a yes/no question. Use the <b>-ite</b> forms (galite, atleiskite) with strangers; they are the polite ones.',lessons:[
 {id:'u13a',title:'Asking',items:[
  ['kas','who / what'],['kur','where'],['kada','when (a question)'],['kodėl','why'],['kaip','how'],['kuris','which'],
  ['Ar galite man padėti?','Can you help me? (polite)','Polite form, for strangers.'],
  ['Ar kalbate angliškai?','Do you speak English? (polite)','Polite form. To a friend: "Ar kalbi angliškai?"'],
  ['Ką tai reiškia?','What does that mean?'],
  ['Kur aš esu?','Where am I?'],
 ]},
 {id:'u13b',title:'Getting by',items:[
  ['Atleiskite','Excuse me','To get someone\'s attention. "Atsiprašau" is more "sorry".'],
  ['Kaip nueiti į centrą?','How do I get to the centre?','Swap "centrą" for any place.'],
  ['Ar toli?','Is it far?'],
  ['Ar galima?','May I? / Is it allowed?','Point at the thing and say it.'],
  ['Viskas gerai','Everything is fine'],
  ['Minutėlę','Just a moment'],
  ['Nesvarbu','Never mind'],
  ['Žinoma','Of course'],
  ['Parodykite žemėlapyje','Show me on the map'],
  ['Nieko','Nothing','Also the reply to "thank you": "Nieko" means "it was nothing".'],
 ]},
]},
{id:'u14',title:'Transportas',en:'Transport',tip:'Lithuanian buses and trains are cheap and on time. The place you are going to takes <b>į</b> plus a changed ending: Kaunas becomes <b>į Kauną</b>, centras (the centre) becomes <b>į centrą</b>.',lessons:[
 {id:'u14a',title:'Buses and trains',items:[
  ['Bilietą į Kauną, prašau','A ticket to Kaunas, please'],
  ['Kada išvyksta?','When does it leave?'],
  ['Kada atvyksta?','When does it arrive?'],
  ['Kur yra platforma?','Where is the platform?'],
  ['Ar šis autobusas važiuoja į centrą?','Does this bus go to the centre?'],
  ['autobusų stotis','bus station'],['geležinkelio stotis','railway station'],['stotelė','bus stop'],['centras','centre'],['tvarkaraštis','timetable'],
 ]},
 {id:'u14b',title:'Taxis and signs',items:[
  ['taksi','taxi'],
  ['Sustokite čia, prašau','Stop here, please'],
  ['Nuvežkite mane į viešbutį','Take me to the hotel'],
  ['Kiek kainuoja iki oro uosto?','How much to the airport?'],
  ['pirmyn','ahead'],['atgal','back (direction)'],['išėjimas','exit'],['įėjimas','entrance'],['nuoma','rental'],['dviratis','bicycle'],
 ]},
]},
{id:'u15',title:'Restorane',en:'At the restaurant',tip:'<b>Aš norėčiau</b> (I would like) is the polite way to order; <b>Aš noriu</b> (I want) is blunter. Tap water is safe but you have to ask for it; waiters will bring bottled by default.',lessons:[
 {id:'u15a',title:'Ordering',items:[
  ['Staliuką dviem, prašau','A table for two, please'],
  ['Meniu, prašau','The menu, please'],
  ['Aš norėčiau','I would like','Follow it with the dish.'],
  ['vandens be dujų','still water','Literally "water without gas".'],
  ['vandens su dujomis','sparkling water'],
  ['Aš nevalgau mėsos','I don\'t eat meat'],
  ['Ką rekomenduojate?','What do you recommend?'],
  ['pusryčiai','breakfast'],['pietūs','lunch'],['vakarienė','dinner'],
 ]},
 {id:'u15b',title:'Paying and details',items:[
  ['Ar galima mokėti kortele?','Can I pay by card?'],
  ['grynaisiais','in cash'],
  ['arbatpinigiai','tip','Literally "tea money". Around 10% is normal.'],
  ['Labai skanu','Very tasty'],
  ['Aš alergiškas riešutams','I\'m allergic to nuts','A woman: "alergiška".',['Aš alergiška riešutams']],
  ['be cukraus','without sugar'],['su pienu','with milk'],['šaukštas','spoon'],['šakutė','fork'],['peilis','knife'],
 ]},
]},
{id:'u16',title:'Parduotuvėje',en:'Shopping',tip:'Prices are in euros. <b>Kiek kainuoja?</b> works for anything you can point at. Most shops take cards, but markets (turgus) are cash.',lessons:[
 {id:'u16a',title:'Buying',items:[
  ['Ar turite?','Do you have?','Then name the thing.'],
  ['Aš imu šitą','I\'ll take this one'],
  ['brangu','expensive'],['pigu','cheap'],['per didelis','too big'],['per mažas','too small'],
  ['Ar galiu pasimatuoti?','Can I try it on?'],
  ['kvitas','receipt'],['atidaryta','open'],['uždaryta','closed'],
 ]},
 {id:'u16b',title:'Around the shops',items:[
  ['turgus','market'],['prekybos centras','shopping mall'],['kepykla','bakery'],['suvenyras','souvenir'],['dovana','gift'],
  ['maišelis','bag','They will ask if you want one.'],['nuolaida','discount'],
  ['Tik žiūriu','Just looking'],
  ['grąža','change (money)'],
  ['Kiek tai kainuoja?','How much is this?'],
 ]},
]},
{id:'u17',title:'Viešbutyje',en:'At the hotel',tip:'Hotel staff almost always speak English, but opening in Lithuanian gets a warmer welcome. <b>Vienai nakčiai</b> (for one night) and <b>dviem naktims</b> (for two nights) cover most stays.',lessons:[
 {id:'u17a',title:'Checking in',items:[
  ['Aš turiu rezervaciją','I have a reservation'],
  ['kambarys','room'],['raktas','key'],['vienai nakčiai','for one night'],['dviem naktims','for two nights'],
  ['Koks Wi-Fi slaptažodis?','What is the Wi-Fi password?'],
  ['Ar pusryčiai įskaičiuoti?','Is breakfast included?'],
  ['Kada reikia išsiregistruoti?','When is check-out?'],
  ['rankšluostis','towel'],['liftas','lift / elevator'],
 ]},
 {id:'u17b',title:'In the room',items:[
  ['dušas','shower'],['lova','bed'],['oro kondicionierius','air conditioning'],['karštas vanduo','hot water'],
  ['Neveikia','It doesn\'t work','Point at the thing.'],
  ['Ar galite pakeisti kambarį?','Can you change the room?'],
  ['registratūra','reception'],['aukštas','floor (storey)'],['triukšminga','noisy'],
  ['Aš išvykstu rytoj','I\'m leaving tomorrow'],
 ]},
]},
{id:'u18',title:'Pagalba',en:'Emergencies and health',tip:'The emergency number is <b>112</b> and operators speak English. Pharmacies (vaistinė) are everywhere and pharmacists can advise on minor things without a doctor.',lessons:[
 {id:'u18a',title:'Getting help',items:[
  ['Gelbėkite!','Help! (emergency)','For real emergencies. "Padėkite" is a calmer "please help".'],
  ['policija','police'],['gydytojas','doctor (man)'],
  ['Man reikia gydytojo','I need a doctor'],
  ['Iškvieskite greitąją','Call an ambulance'],
  ['Man skauda čia','It hurts here'],
  ['galva','head'],['pilvas','stomach'],['vaistai','medicine'],
  ['Aš pasiklydau','I\'m lost'],
 ]},
 {id:'u18b',title:'Problems',items:[
  ['Aš pamečiau pasą','I lost my passport'],
  ['ambasada','embassy'],
  ['Mane apvogė','I was robbed'],
  ['Palikite mane ramybėje','Leave me alone'],
  ['pavojinga','dangerous'],['saugu','safe'],
  ['šimtas dvylika','one hundred twelve (112)','The emergency number.'],
  ['draudimas','insurance'],
  ['Ar čia yra vaistinė?','Is there a pharmacy here?'],
  ['Aš gerai','I\'m fine'],
 ]},
]},
];
/* Units added for conversation. Lesson ids are permanent: item ids and audio clips hang off them. */
COURSE.push(
{id:'u0',title:'Garsai',en:'Sounds',tip:'Lithuanian spelling is very regular: each letter keeps its sound, and every letter is said. What isn\'t written is which part of a word is strong, and its pitch, so listen for those. Most letters sound like English. These are the ones that trick people: <b>c</b> = "ts", <b>j</b> = "y", <b>š</b> = "sh", <b>ž</b> = the "s" in "measure", <b>č</b> = "ch". The words here are ones English has too (pizza, giraffe), so you can hear the letters in words you can guess.',lessons:[
 {id:'u0a',title:'Letters that trick you',items:[
  ['pica','pizza','c always sounds like "ts".'],
  ['jogurtas','yogurt','j sounds like the English "y".'],
  ['šokoladas','chocolate','š sounds like "sh".'],
  ['žirafa','giraffe','ž sounds like the "s" in "measure".'],
  ['čempionas','champion','č sounds like "ch".'],
 ]},
 {id:'u0b',title:'Long vowels, ie and the rolled r',items:[
  ['šampūnas','shampoo','A line on top makes a vowel long: ū is a long "oo".'],
  ['kavinė','café','ė sounds like the "ay" in "day".'],
  ['muziejus','museum','ie after a consonant sounds like "yeh".'],
  ['radijas','radio','r is a quick tap of the tongue, like the Spanish r in "pero".'],
  ['telefonas','telephone','Every letter is said, even the "s" at the end.'],
 ]},
]},
{id:'u21',title:'Pokalbis',en:'Small talk',tip:'Most conversations start the same way. Someone asks <b>Kaip sekasi?</b> (How are you?), you answer, and you bounce it back with <b>O tau?</b> (And you?). Nobody expects more than that from a beginner.',lessons:[
 {id:'u21a',title:'How are you',items:[
  ['Gerai, ačiū','Fine, thanks'],
  ['O tau?','And you? (after "How are you?")','Bounces "Kaip sekasi?" back. Literally "and to you?"'],
  ['Neblogai','Not bad'],
  ['Taip sau','So-so'],
  ['Man irgi gerai','I\'m fine too'],
  ['Aš irgi','Me too'],
  ['Ką veiki?','What are you up to?','Literally "what are you doing?"'],
  ['Nieko ypatingo','Nothing special'],
  ['Labai malonu','Very nice to meet you','Also a warm "nice to meet you".'],
  ['Ir tau','You too','The reply to "Sėkmės!" (good luck) or any good wish.'],
 ]},
 {id:'u21b',title:'When you get stuck',items:[
  ['Aš truputį kalbu lietuviškai','I speak a little Lithuanian'],
  ['Kaip tai pasakyti lietuviškai?','How do you say that in Lithuanian?','Point at anything and ask.'],
  ['Ką reiškia šis žodis?','What does this word mean?'],
  ['Aš nelabai suprantu','I don\'t quite understand'],
  ['Ar gali pakartoti?','Can you repeat that? (to a friend)'],
  ['Palauk','Wait','To a friend. To a stranger: "Palaukite".'],
  ['Teisingai','That\'s right'],
  ['Aš mokausi','I\'m learning','Say it and people slow down for you.'],
  ['Dar kartą','One more time'],
  ['Supratau','Got it','Literally "I understood".'],
 ]},
]},
{id:'u20',title:'Apie mane',en:'About me',tip:'<b>Iš</b> means "from", and the place after it changes its ending: <b>iš Lietuvos</b> (from Lithuania), <b>iš Amerikos</b> (from America). Jobs change for women too: mokytojas is a male teacher, mokytoja a female one.',lessons:[
 {id:'u20a',title:'Where I\'m from',items:[
  ['Iš kur tu esi?','Where are you from?'],
  ['Aš esu iš Lietuvos','I am from Lithuania'],
  ['Aš esu iš Anglijos','I am from England'],
  ['Aš esu iš Kanados','I am from Canada'],
  ['Kur tu gyveni?','Where do you live?'],
  ['Aš gyvenu Vilniuje','I live in Vilnius','"In" a city is an ending, not a word: Vilnius becomes Vilniuje.'],
  ['O tu?','What about you?','Bounce any question back.'],
  ['Aš gyvenu Londone','I live in London'],
  ['Ar tu lietuvis?','Are you Lithuanian?','To a man. To a woman the ending changes.'],
  ['Ne, aš amerikietis','No, I\'m American','A woman says "amerikietė".',['Ne, aš amerikietė']],
 ]},
 {id:'u20b',title:'Work and study',items:[
  ['Kuo tu dirbi?','What do you do for work?','Literally "as what do you work?"'],
  ['Aš esu mokytojas','I am a teacher','A woman says "mokytoja".',['Aš esu mokytoja']],
  ['Aš esu studentas','I am a student','A woman says "studentė".',['Aš esu studentė']],
  ['Aš dirbu biure','I work in an office'],
  ['Aš dirbu iš namų','I work from home'],
  ['Aš esu pensininkas','I am retired','A woman says "pensininkė".',['Aš esu pensininkė']],
  ['Ar tau patinka tavo darbas?','Do you like your job?'],
  ['Mano darbas įdomus','My job is interesting'],
  ['Aš studijuoju','I study','At college or university.'],
  ['darbas','work / job'],
 ]},
]},
{id:'u22',title:'Laisvalaikis',en:'Free time',tip:'<b>Man patinka</b> (I like it) is built backwards: literally "to me it pleases". To say what you like <i>doing</i>, use <b>Aš mėgstu</b> plus a verb ending in -ti: Aš mėgstu skaityti, I like to read.',lessons:[
 {id:'u22a',title:'What I like',items:[
  ['Man nepatinka','I don\'t like it'],
  ['Man labai patinka','I really like it'],
  ['Ar tau patinka?','Do you like it?'],
  ['Man patinka muzika','I like music'],
  ['Man patinka Lietuva','I like Lithuania'],
  ['muzika','music'],['futbolas','football (soccer)'],['filmai','films / movies'],['knygos','books'],['kelionės','trips / travel'],
 ]},
 {id:'u22b',title:'What I do',items:[
  ['Ką tu mėgsti veikti?','What do you like to do?'],
  ['Aš mėgstu skaityti','I like to read'],
  ['Aš mėgstu keliauti','I like to travel'],
  ['Aš mėgstu gaminti','I like to cook'],
  ['Aš mėgstu sportuoti','I like to work out'],
  ['Aš žaidžiu krepšinį','I play basketball'],
  ['Aš klausausi muzikos','I listen to music'],
  ['savaitgalis','weekend'],
  ['laisvalaikis','free time'],
  ['Ką veiki savaitgalį?','What are you doing at the weekend?'],
 ]},
]},
{id:'u23',title:'Planai',en:'Making plans',tip:'For times, use the "at" form of the number: <b>septintą valandą</b> means "at seven o\'clock". <b>Gal</b> (maybe) is the friendliest way to suggest anything: Gal rytoj? Maybe tomorrow?',lessons:[
 {id:'u23a',title:'Let\'s meet',items:[
  ['Ar nori eiti kartu?','Do you want to go together?'],
  ['Taip, noriu','Yes, I\'d like to'],
  ['Gal rytoj?','Maybe tomorrow?'],
  ['Šiandien negaliu','I can\'t today'],
  ['Neturiu laiko','I don\'t have time'],
  ['Kur susitiksime?','Where shall we meet?'],
  ['Prie kavinės','By the café'],
  ['Puiki idėja!','Great idea!'],
  ['Sutarta!','Deal!','Literally "agreed".'],
  ['Iki rytojaus!','See you tomorrow!'],
 ]},
 {id:'u23b',title:'What time?',items:[
  ['Kelintą valandą?','At what time?'],
  ['Septintą valandą','At seven o\'clock'],
  ['Aštuntą valandą','At eight o\'clock'],
  ['Dvyliktą valandą','At twelve o\'clock'],
  ['ryte','in the morning'],['vakare','in the evening'],
  ['po pietų','in the afternoon','Literally "after lunch".'],
  ['vėlai','late'],['anksti','early'],
  ['Aš vėluoju','I\'m running late'],
 ]},
]},
{id:'u25',title:'Apie šeimą',en:'Talking about family',tip:'After <b>neturiu</b> (I don\'t have) the noun takes its "of" ending: neturiu brolio. In questions with <b>Ar turi...?</b> one thing takes the same ending as after noriu (ar turi brolį?), and things you count take the "of" form (ar turi brolių?). Don\'t try to master it. Say it slightly wrong and people still understand you.',lessons:[
 {id:'u25a',title:'Your family',items:[
  ['Ar turi brolių ar seserų?','Do you have brothers or sisters?'],
  ['Aš turiu brolį','I have a brother'],
  ['Ne, neturiu','No, I don\'t'],
  ['Ar turi vaikų?','Do you have children?'],
  ['Aš turiu du vaikus','I have two children'],
  ['Aš turiu dukrą','I have a daughter'],
  ['Koks jo vardas?','What is his name?'],
  ['Koks jos vardas?','What is her name?'],
  ['Mano mama gyvena Kaune','My mom lives in Kaunas'],
  ['Jie labai mieli','They are very sweet'],
 ]},
]});

/* Short lessons that teach the exact forms the conversations ask you to write. Appended to existing units. */
[['u15',{id:'u15c',title:'Ordering dishes',items:[
  ['Sriubą, prašau','The soup, please','Name the dish with an -ą ending and add prašau.'],
  ['Arbatą, prašau','Tea, please'],
  ['Aš norėčiau sriubos','I would like some soup'],
  ['Puiku!','That’s great!'],
  ['Ne, ačiū','No, thanks'],
 ]}],
 ['u16',{id:'u16c',title:'At the market',items:[
  ['Ar turite obuolių?','Do you have apples?','After "Ar turite?" the thing takes the "some of" ending.'],
  ['Ar turite sūrio?','Do you have cheese?'],
  ['Kiek kainuoja obuoliai?','How much are the apples?'],
  ['Gerai, aš imu','OK, I\'ll take it'],
  ['Tik grynaisiais?','Cash only?'],
 ]}],
 ['u14',{id:'u14c',title:'Going places',items:[
  ['Aš važiuoju į Kauną','I\'m going to Kaunas','Važiuoju is going by car, bus or train.'],
  ['Aš einu į parduotuvę','I\'m going to the shop','Eiti is to go on foot.'],
  ['Kur tu važiuoji?','Where are you going? (by car or bus)'],
  ['Aš einu namo','I\'m going home'],
  ['Važiuojam!','Let\'s go!','Short for "we are going". Said when you set off.'],
 ]}],
 ['u18',{id:'u18c',title:'Telling the doctor',items:[
  ['Man skauda galvą','My head hurts','Man skauda + the body part with an -ą/-į ending.'],
  ['Man skauda pilvą','My stomach hurts'],
  ['Man skauda gerklę','My throat hurts'],
  ['Turiu temperatūros','I have a fever'],
  ['Man bloga','I feel sick'],
 ]}],
].forEach(([uid,l])=>COURSE.find(u=>u.id===uid).lessons.push(l));

/* New units for the beginner-to-conversation expansion (see docs/expansion-plan.md). */
COURSE.push(
{id:'u27',title:'Veiksmai',en:'Everyday verbs',tip:'Every verb works like kalbu / kalbi / kalba: <b>-u</b> for I, <b>-i</b> for you, and the plain stem for he, she and they. For "we" add <b>-me</b>, for polite or plural "you" add <b>-te</b>: kalbame, kalbate.',lessons:[
 {id:'u27a',title:'Coming and going',items:[
  ['Aš ateinu','I\'m coming'],['Ar tu ateini?','Are you coming?'],['Jis išeina','He is leaving'],['Aš grįžtu','I\'m coming back'],['Aš laukiu','I\'m waiting'],
  ['Palauk manęs','Wait for me'],['Aš skubu','I\'m in a hurry'],['Aš sėdžiu','I\'m sitting'],['Aš stoviu','I\'m standing'],['Aš ilsiuosi','I\'m resting'],
 ]},
 {id:'u27b',title:'Seeing and doing',items:[
  ['Aš matau','I see'],['Ar tu matai?','Do you see?'],['Aš girdžiu','I hear'],['Aš darau','I\'m doing'],['Ką tu darai?','What are you doing? (to a friend)'],
  ['Aš žiūriu televizorių','I\'m watching TV'],['Aš rašau','I\'m writing'],['Aš galvoju','I\'m thinking'],['Aš klausau','I\'m listening'],['Aš juokiuosi','I\'m laughing'],
 ]},
 {id:'u27c',title:'Buying and finding',items:[
  ['Aš perku','I buy'],['Aš perku duoną','I\'m buying bread'],['Aš moku','I pay','Also means "I know how to".'],['Aš duodu','I give'],['Duok man','Give me','To a friend. Politely: "Duokite man".'],
  ['Aš parduodu','I sell'],['Aš ieškau','I\'m looking for'],['Aš ieškau stoties','I\'m looking for the station','After ieškau the thing takes the "some of" ending.'],['Aš randu','I find'],['Aš pamirštu','I forget'],
 ]},
 {id:'u27d',title:'We and they',items:[
  ['Mes esame','We are'],['Jūs esate','You are (polite or plural)'],['Jie yra','They are'],['Mes kalbame','We speak'],['Jūs kalbate','You speak (polite)'],
  ['Jie kalba','They speak'],['Mes gyvename Vilniuje','We live in Vilnius'],['Jie dirba kartu','They work together'],['Ką jūs darote?','What are you doing? (polite)'],['Mes laukiame','We are waiting'],
 ]},
]},
{id:'u28',title:'Mano diena',en:'My day',tip:'Daily routines are full of verbs ending in <b>-uosi</b> or <b>-iuosi</b> (keliuosi, prausiuosi). That ending means you do it to yourself: I get <i>myself</i> up, I wash <i>myself</i>.',lessons:[
 {id:'u28a',title:'Morning',items:[
  ['Aš keliuosi','I get up'],['Aš keliuosi septintą valandą','I get up at seven'],['Aš prausiuosi','I wash'],['Aš apsirengiu','I get dressed'],['Aš pusryčiauju','I have breakfast'],
  ['Aš geriu kavą','I drink coffee'],['Aš skaitau naujienas','I read the news'],['Aš išeinu iš namų','I leave home'],['Aš einu į darbą','I go to work'],['Aš važiuoju autobusu','I go by bus'],
 ]},
 {id:'u28b',title:'Afternoon and evening',items:[
  ['Aš dirbu iki penkių','I work until five'],['Aš pietauju','I have lunch'],['Aš grįžtu namo','I come back home'],['Aš gaminu vakarienę','I cook dinner'],['Aš vakarieniauju','I have dinner'],
  ['Aš žiūriu filmą','I watch a film'],['Aš skambinu mamai','I call my mom'],['Aš tvarkausi','I tidy up'],['Aš einu miegoti','I go to bed'],['Aš miegu aštuonias valandas','I sleep eight hours'],
 ]},
 {id:'u28c',title:'How often',items:[
  ['visada','always'],['dažnai','often'],['kartais','sometimes'],['retai','rarely'],['niekada','never','Needs ne- on the verb too: niekada nevėluoju.'],
  ['kasdien','every day'],['Aš visada geriu kavą','I always drink coffee'],['Aš niekada nevėluoju','I\'m never late'],['Kartais aš dirbu iš namų','Sometimes I work from home'],['Kasdien aš einu pasivaikščioti','Every day I go for a walk'],
 ]},
]},
{id:'u29',title:'Drabužiai',en:'Clothes',tip:'Lots of clothes are always plural in Lithuanian, even when there is only one: <b>marškiniai</b> (a shirt), <b>kelnės</b> (trousers), <b>džinsai</b> (jeans). Describing words then go plural too.',lessons:[
 {id:'u29a',title:'What to wear',items:[
  ['marškiniai','shirt','Always plural.'],['kelnės','trousers','Always plural.'],['suknelė','dress'],['sijonas','skirt'],['batai','shoes'],
  ['striukė','jacket'],['paltas','coat'],['megztinis','sweater'],['kepurė','hat'],['džinsai','jeans'],
 ]},
 {id:'u29b',title:'Trying it on',items:[
  ['Kokio dydžio?','What size?'],['Mano dydis vidutinis','My size is medium'],['Ar yra didesnis?','Is there a bigger one?'],['Ar yra mažesnis?','Is there a smaller one?'],['Kur yra matavimosi kabina?','Where is the fitting room?'],
  ['Tinka','It fits'],['Netinka','It doesn\'t fit'],['Man patinka ši striukė','I like this jacket'],['Ar turite kitos spalvos?','Do you have another colour?'],['Aš pagalvosiu','I\'ll think about it'],
 ]},
 {id:'u29c',title:'Extras',items:[
  ['šalikas','scarf'],['pirštinės','gloves'],['kojinės','socks'],['skėtis','umbrella'],['rankinė','handbag'],
  ['kuprinė','backpack'],['akiniai','glasses','Always plural.'],['nauji batai','new shoes'],['Jis dėvi kepurę','He is wearing a hat'],['Apsivilk striukę','Put on a jacket'],
 ]},
]},
{id:'u30',title:'Aprašymai',en:'Describing',tip:'Describing words follow the "him / her" rule: <b>-as</b>, <b>-is</b> or <b>-us</b> for a "him" word, <b>-a</b>, <b>-i</b> for a "her" word. Mano brolis aukštas, mano sesuo aukšta. "Is" is usually left out.',lessons:[
 {id:'u30a',title:'People',items:[
  ['aukštas vyras','a tall man','Aukštas also means a floor of a building.'],['žemas','short (height)'],['jaunas','young'],['vyresnis','older'],['linksmas','cheerful'],
  ['protingas','clever'],['malonus','kind'],['juokingas','funny'],['rimtas','serious'],['tylus','quiet'],
 ]},
 {id:'u30b',title:'Things',items:[
  ['ilgas','long'],['trumpas','short (length)'],['sunkus','heavy / difficult'],['lengvas','light / easy'],['karštas','hot'],
  ['šaltas','cold'],['švarus','clean'],['nešvarus','dirty'],['patogus','comfortable'],['įdomus','interesting'],
 ]},
 {id:'u30c',title:'Describing sentences',items:[
  ['Mano brolis aukštas','My brother is tall'],['Mano sesuo aukšta','My sister is tall'],['Ji labai protinga','She is very clever'],['Koks jis?','What is he like?'],['Jis linksmas','He is cheerful'],
  ['Šis lagaminas sunkus','This suitcase is heavy'],['Ši knyga įdomi','This book is interesting'],['Lietuvių kalba nėra lengva','Lithuanian isn\'t easy'],['Kambarys švarus','The room is clean'],['Kava per karšta','The coffee is too hot'],
 ]},
]},
{id:'u31',title:'Darbai',en:'Jobs',tip:'Jobs have a "him" and a "her" form, like <b>mokytojas / mokytoja</b> (teacher). "In" a workplace is just an ending: ligoninė → <b>ligoninėje</b>, mokykla → <b>mokykloje</b>.',lessons:[
 {id:'u31a',title:'Who does what',items:[
  ['gydytoja','doctor (woman)'],['vairuotojas','driver'],['inžinierius','engineer'],['programuotojas','programmer'],['pardavėjas','shop assistant'],
  ['virėjas','cook / chef'],['slaugytoja','nurse'],['ūkininkas','farmer'],['policininkas','police officer'],['vadovas','manager / boss'],
 ]},
 {id:'u31b',title:'At work',items:[
  ['Kur tu dirbi?','Where do you work?'],['Aš dirbu ligoninėje','I work in a hospital'],['Aš dirbu parduotuvėje','I work in a shop'],['Aš dirbu mokykloje','I work at a school'],['Aš esu bedarbis','I\'m unemployed','A woman says "bedarbė".',['Aš esu bedarbė']],
  ['Aš ieškau darbo','I\'m looking for work'],['Mano darbas sunkus','My job is hard'],['Aš dirbu visą dieną','I work all day'],['Kada baigi darbą?','When do you finish work?'],['Aš baigiu penktą','I finish at five'],
 ]},
]},
{id:'u32',title:'Namai',en:'Home',tip:'<b>Namai</b> (home) and <b>durys</b> (door) are always plural. "In" a room is an ending: kambarys → <b>kambaryje</b>. Commands to a friend end in <b>-k</b>: atidaryk, uždaryk.',lessons:[
 {id:'u32a',title:'Rooms',items:[
  ['namai','home','Always plural when it means home.'],['butas','flat / apartment'],['virtuvė','kitchen'],['vonia','bathroom'],['miegamasis','bedroom'],
  ['svetainė','living room'],['langas','window'],['durys','door','Always plural.'],['stalas','table'],['kėdė','chair'],
 ]},
 {id:'u32b',title:'Around the flat',items:[
  ['šaldytuvas','fridge'],['sofa','sofa'],['spinta','wardrobe'],['lempa','lamp'],['kilimas','rug'],
  ['balkonas','balcony'],['laiptai','stairs'],['kaimynas','neighbour'],['Aš gyvenu bute','I live in a flat'],['Mano butas mažas','My flat is small'],
 ]},
 {id:'u32c',title:'Come in!',items:[
  ['Kur yra virtuvė?','Where is the kitchen?'],['Jauskis kaip namie','Make yourself at home'],['Sėskis','Sit down'],['Ar nori arbatos?','Do you want some tea?'],['Kambaryje šalta','It\'s cold in the room'],
  ['Atidaryk langą','Open the window'],['Uždaryk duris','Close the door'],['Įjunk šviesą','Turn on the light'],['Išjunk šviesą','Turn off the light'],['Ačiū už vaišes','Thanks for the food','Said to a host after a meal.'],
 ]},
]},
{id:'u33',title:'Galiu, turiu, reikia',en:'Can, must, need',tip:'<b>Galiu</b> (I can), <b>turiu</b> (I have to) and <b>noriu</b> (I want) are all followed by a verb ending in <b>-ti</b>: galiu padėti. "I need" is said "to me it is needed": <b>man reikia</b>.',lessons:[
 {id:'u33a',title:'I can',items:[
  ['Aš galiu','I can'],['Ar tu gali?','Can you?'],['Aš negaliu','I can\'t'],['Aš galiu padėti','I can help'],['Ar gali man padėti?','Can you help me? (to a friend)'],
  ['Aš moku plaukti','I know how to swim'],['Ar moki vairuoti?','Can you drive?'],['Aš nemoku šokti','I can\'t dance'],['Čia negalima rūkyti','No smoking here'],['Ar galima čia sėdėti?','Can I sit here?'],
 ]},
 {id:'u33b',title:'I need, I have to',items:[
  ['Man reikia','I need'],['Man reikia eiti','I need to go'],['Man reikia pinigų','I need money'],['Ar tau reikia pagalbos?','Do you need help?'],['Nereikia','There\'s no need'],
  ['Aš turiu dirbti','I have to work'],['Aš turiu eiti','I have to go'],['Tu turi pabandyti','You have to try'],['Aš noriu miegoti','I want to sleep'],['Ar nori valgyti?','Do you want to eat?'],
 ]},
]},
{id:'u34',title:'Ateitis',en:'Tomorrow',tip:'The future is easy: add <b>-siu</b> for "I will": dirbti → <b>dirbsiu</b>, valgyti → <b>valgysiu</b>. For "you will" it is <b>-si</b>. "It will be" is simply <b>bus</b>.',lessons:[
 {id:'u34a',title:'I will',items:[
  ['Aš būsiu','I will be'],['Aš eisiu','I will go'],['Aš važiuosiu','I will travel'],['Aš dirbsiu','I will work'],['Aš valgysiu','I will eat'],
  ['Aš skambinsiu','I will call'],['Aš pamatysiu','I will see'],['Aš grįšiu','I will come back'],['Aš liksiu namie','I will stay at home'],['Aš pabandysiu','I will try'],
 ]},
 {id:'u34b',title:'Plans',items:[
  ['Ką veiksi rytoj?','What will you do tomorrow?'],['Rytoj aš dirbsiu','Tomorrow I will work'],['kitą savaitę','next week'],['kitais metais','next year'],['po darbo','after work'],
  ['Vakare aš būsiu namie','In the evening I will be at home'],['Ar ateisi?','Will you come?'],['Taip, ateisiu','Yes, I\'ll come'],['Gal vėliau','Maybe later'],['Pamatysime','We\'ll see'],
 ]},
 {id:'u34c',title:'Holidays',items:[
  ['atostogos','holiday','Always plural.'],['Kur važiuosi atostogų?','Where will you go on holiday?'],['Vasarą aš važiuosiu prie jūros','In summer I\'ll go to the seaside'],['Aš skrisiu į Vilnių','I will fly to Vilnius'],['Aš būsiu Lietuvoje savaitę','I will be in Lithuania for a week'],
  ['Mes gyvensime viešbutyje','We will stay in a hotel'],['Aš aplankysiu draugus','I will visit friends'],['Bus smagu!','It will be fun!'],['Bus šalta','It will be cold'],['Sėkmingos kelionės!','Have a good trip!'],
 ]},
]},
{id:'u35',title:'Jungtukai',en:'Joining words',tip:'Joining words turn short phrases into real sentences. A comma goes before <b>bet</b> (but), <b>nes</b> (because), <b>todėl</b> (so) and <b>kad</b> (that). In questions, "or" is <b>ar</b>: arbatos ar kavos?',lessons:[
 {id:'u35a',title:'And, but, because',items:[
  ['ir','and'],['bet','but'],['arba','or'],['nes','because'],['todėl','so / that\'s why'],
  ['tada','then'],['jau','already'],['dar','still / yet'],['tik','only'],['taip pat','also'],
 ]},
 {id:'u35b',title:'Joining sentences',items:[
  ['Aš noriu kavos ir pyrago','I want coffee and cake'],['Aš pavargęs, bet laimingas','I\'m tired but happy','A woman says "pavargusi, bet laiminga".',['Aš pavargusi, bet laiminga']],['Arbatos ar kavos?','Tea or coffee?'],['Aš neinu, nes lyja','I\'m not going because it\'s raining'],['Lyja, todėl aš lieku namie','It\'s raining, so I\'m staying home'],
  ['Pirmiausia pusryčiai, tada darbas','First breakfast, then work'],['Aš jau valgiau','I\'ve already eaten'],['Aš dar nevalgiau','I haven\'t eaten yet'],['Aš kalbu tik angliškai','I only speak English'],['Aš taip pat kalbu lietuviškai','I also speak Lithuanian'],
 ]},
 {id:'u35c',title:'When, if, that',items:[
  ['kai','when (not a question)'],['jeigu','if'],['kad','that'],['nors','although'],['vis tiek','anyway'],
  ['Kai lyja, aš skaitau','When it rains, I read'],['Jeigu nori, ateik','If you want, come'],['Aš manau, kad tai gerai','I think that\'s good'],['Nors šalta, aš einu','Although it\'s cold, I\'m going'],['Aš vis tiek eisiu','I\'ll go anyway'],
 ]},
]},
{id:'u36',title:'Vakar',en:'Yesterday',tip:'For "I did", most verbs end in <b>-au</b> or <b>-iau</b>: dirbau (I worked), valgiau (I ate), mačiau (I saw). "I was" is <b>buvau</b>, and "it was" is <b>buvo</b>.',lessons:[
 {id:'u36a',title:'I did',items:[
  ['Aš buvau','I was'],['Aš buvau namie','I was at home'],['Aš ėjau','I went (on foot)'],['Aš važiavau','I went (by car or bus)'],['Aš valgiau','I ate'],
  ['Aš gėriau','I drank'],['Aš mačiau','I saw'],['Aš dirbau','I worked'],['Aš miegojau','I slept'],['Aš žiūrėjau filmą','I watched a film'],
 ]},
 {id:'u36b',title:'When it happened',items:[
  ['užvakar','the day before yesterday'],['praėjusią savaitę','last week'],['pernai','last year'],['prieš valandą','an hour ago'],['Vakar aš buvau mieste','Yesterday I was in town'],
  ['Aš susitikau su draugu','I met a friend'],['Aš nupirkau dovaną','I bought a present'],['Aš kalbėjau su mama','I talked to my mom'],['Aš skaičiau knygą','I read a book'],['Aš grįžau vėlai','I came back late'],
 ]},
 {id:'u36c',title:'How it was',items:[
  ['Aš nebuvau','I wasn\'t'],['Aš nemačiau','I didn\'t see'],['Aš nežinojau','I didn\'t know'],['Aš pamiršau','I forgot'],['Aš pavėlavau','I was late'],
  ['Buvo smagu','It was fun'],['Buvo šalta','It was cold'],['Buvo labai skanu','It was very tasty'],['Buvo nuobodu','It was boring'],['Nieko neatsitiko','Nothing happened'],
 ]},
]},
{id:'u37',title:'Ką veikei?',en:'What did you do?',tip:'Asking about the past, "you" ends in <b>-ai</b> or <b>-ei</b>: kur buv<b>ai</b>? ką veik<b>ei</b>? For he, she and they it ends in <b>-o</b>: jis buv<b>o</b>. "We" is <b>-ome</b> / <b>-ėme</b>: buvome, valgėme.',lessons:[
 {id:'u37a',title:'Asking about it',items:[
  ['Ką veikei vakar?','What did you do yesterday?'],['Kur buvai?','Where were you?'],['Ar buvai Vilniuje?','Have you been to Vilnius?'],['Ką valgei?','What did you eat?'],['Ar matei?','Did you see?'],
  ['Kaip praėjo savaitgalis?','How was the weekend?'],['Ar tau patiko?','Did you like it?'],['Man labai patiko','I liked it a lot'],['Man nepatiko','I didn\'t like it'],['Kada grįžai?','When did you come back?'],
 ]},
 {id:'u37b',title:'He, she, we, they',items:[
  ['Jis buvo','He was'],['Ji buvo','She was'],['Mes buvome','We were'],['Jie buvo','They were'],['Jis išvažiavo','He left'],
  ['Ji paskambino','She called'],['Mes valgėme restorane','We ate at a restaurant'],['Jie atvažiavo vakar','They arrived yesterday'],['Kas atsitiko?','What happened?'],['Ką jis pasakė?','What did he say?'],
 ]},
 {id:'u37c',title:'Telling a story',items:[
  ['Pirmiausia','First of all'],['Paskui','After that'],['Galiausiai','Finally'],['Staiga','Suddenly'],['Vakar buvo puiki diena','Yesterday was a great day'],
  ['Ryte aš ėjau į parką','In the morning I went to the park'],['Paskui mes valgėme picą','After that we ate pizza'],['Galiausiai grįžome namo','Finally we came back home'],['Tai buvo nuostabu','It was amazing'],['Ir kas tada?','And then what?'],
 ]},
]},
{id:'u40',title:'Kūnas ir sveikata',en:'Body and health',tip:'To say what hurts, use <b>man skauda</b> plus the body part with an -ą, -į or -ę ending: koja → <b>koją</b>, dantis → <b>dantį</b>. A cold is <b>sloga</b>, said "to me": man sloga.',lessons:[
 {id:'u40a',title:'The body',items:[
  ['ranka','hand / arm'],['koja','leg / foot'],['akis','eye'],['ausis','ear'],['nosis','nose'],
  ['burna','mouth'],['dantis','tooth'],['nugara','back (of the body)'],['širdis','heart'],['plaukai','hair','Always plural.'],
 ]},
 {id:'u40b',title:'Feeling unwell',items:[
  ['Man skauda koją','My leg hurts'],['Man skauda dantį','I have a toothache'],['Man skauda nugarą','My back hurts'],['Aš peršalau','I caught a cold'],['Aš kosėju','I\'m coughing'],
  ['Man sloga','I have a runny nose'],['Man svaigsta galva','I feel dizzy'],['Man reikia vaistų','I need medicine'],['Ar turite vaistų nuo galvos skausmo?','Do you have something for a headache?'],['Aš jaučiuosi geriau','I feel better'],
 ]},
]},
{id:'u38',title:'Nuomonė',en:'Opinions',tip:'Opinions start with <b>Aš manau, kad...</b> (I think that...) or <b>Man atrodo, kad...</b> (it seems to me that...). To compare, use <b>geresnė už</b> (better than) and <b>man labiau patinka</b> (I prefer).',lessons:[
 {id:'u38a',title:'I think',items:[
  ['Aš manau','I think'],['Man atrodo','It seems to me'],['Aš sutinku','I agree'],['Aš nesutinku','I disagree'],['Tu teisus','You\'re right','To a woman: "Tu teisi".',['Tu teisi']],
  ['Tikrai?','Really?'],['Be abejo','Without a doubt'],['Mano nuomone','In my opinion'],['Kaip tu manai?','What do you think?'],['Priklauso','It depends'],
 ]},
 {id:'u38b',title:'How it is',items:[
  ['Tai gera idėja','That\'s a good idea'],['Tai bloga idėja','That\'s a bad idea'],['Įdomu','It\'s interesting'],['Nuobodu','It\'s boring'],['Gražu','It\'s beautiful'],
  ['Baisu','It\'s scary'],['Juokinga','It\'s funny'],['Keista','It\'s strange'],['Svarbu','It\'s important'],['Man tas pats','I don\'t mind','Literally "to me the same".'],
 ]},
 {id:'u38c',title:'Giving reasons',items:[
  ['Aš manau, kad Vilnius gražus','I think Vilnius is beautiful'],['Man atrodo, kad bus lietaus','I think it will rain'],['Aš sutinku su tavimi','I agree with you'],['Aš nesutinku su tavimi','I don\'t agree with you'],['Kodėl tu taip manai?','Why do you think so?'],
  ['Nes tai brangu','Because it\'s expensive'],['Man labiau patinka kava','I prefer coffee'],['Kas geriau?','What\'s better?'],['Arbata geresnė už kavą','Tea is better than coffee'],['Taip ir yra','That\'s just how it is'],
 ]},
]},
{id:'u39',title:'Pokalbio įgūdžiai',en:'Keep it going',tip:'Little words keep a conversation alive: <b>beje</b> (by the way), <b>na</b> (well...), <b>rimtai?</b> (seriously?). When you run out of words, ask a question back: <b>o tu?</b>, <b>papasakok daugiau</b>.',lessons:[
 {id:'u39a',title:'Reactions',items:[
  ['Beje','By the way'],['Pavyzdžiui','For example'],['Na','Well...'],['Žinai ką?','You know what?'],['Iš tikrųjų','Actually'],
  ['Aišku','Sure'],['Negali būti!','No way!'],['Rimtai?','Seriously?'],['Kaip gaila','What a pity'],['Kaip smagu!','How nice!'],
 ]},
 {id:'u39b',title:'Keeping in touch',items:[
  ['Papasakok daugiau','Tell me more'],['O kaip tavo darbas?','And how is your work?'],['Kiek laiko tu čia?','How long have you been here?'],['Ar tau čia patinka?','Do you like it here?'],['Ar dažnai čia būni?','Are you here often?'],
  ['Buvo malonu pasikalbėti','It was nice talking'],['Iki kito karto!','Until next time!'],['Parašyk man','Text me'],['Koks tavo numeris?','What\'s your number?'],['Susitikime dar kartą','Let\'s meet again'],
 ]},
]});

/* Edition 2, step 2: the most common words in spoken Lithuanian that the course didn't teach (measured against film and TV
   subtitles), in three mixed lessons of short phrases. New lesson ids, so nobody's progress moves. */
COURSE.push({id:'u42',title:'Dažni žodžiai',en:'Everyday words',tip:'These are among the words Lithuanians say most. <b>Jį</b> and <b>ją</b> are "him" and "her" as the thing you see or love; <b>jam</b>, <b>jai</b>, <b>mums</b> and <b>jums</b> are "to him", "to her", "to us" and "to you". Learn them inside the phrases and they come naturally.',lessons:[
 {id:'u42a',title:'About, if, our',items:[
  ['Apie ką?','About what?'],
  ['Jei nori','If you want','"Jei" is the short form of "jeigu".'],
  ['Mūsų namai','Our home'],
  ['Jūsų pasas','Your passport (polite)'],
  ['Dėl to','Because of that'],
  ['Štai!','Here it is!','Also "here you go" when you hand something over.'],
  ['Daug','A lot','Also "many".'],
  ['Visi','Everyone','Literally "all".'],
  ['Niekas','Nobody'],
  ['Vėl','Again'],
 ]},
 {id:'u42b',title:'Him, her, us',items:[
  ['Aš jį matau','I see him'],
  ['Aš ją myliu','I love her'],
  ['Duok jam','Give it to him'],
  ['Paskambink jai','Call her'],
  ['Ačiū jums','Thank you (polite)','To a stranger or to several people.'],
  ['Padėk mums','Help us'],
  ['Laukiu tavęs','I\'m waiting for you'],
  ['Ar tu mane girdi?','Can you hear me?'],
  ['Tiesiog','Simply','Also "just": tiesiog ateik, just come.'],
  ['Galbūt','Perhaps'],
 ]},
 {id:'u42c',title:'Things people say',items:[
  ['Tiesa?','Right?','At the end of a sentence: isn\'t it?'],
  ['Tuoj','In a moment'],
  ['Klausyk','Listen','To a friend, to get their attention.'],
  ['Pažiūrėk!','Look!'],
  ['Turbūt','Probably'],
  ['Bent','At least'],
  ['Beveik','Almost'],
  ['Visai gerai','Quite good'],
  ['Aš nenoriu','I don\'t want to'],
  ['Aš maniau','I thought'],
 ]},
]});
/* The learning path: parts, units in teaching order, and a conversation every couple of units.
   Units are rebuilt from existing lessons so ids (and saved progress) stay the same. */
const PATH=[
 {part:'First words',sub:'Hello, thank you, small talk, and set phrases to get by'},
 'u1','cv1','u21','cv16',
 {part:'Food and drink',sub:'Coffee, tea and bread, and ordering at a café or a restaurant'},
 'u3','cv22','u15','cv3',
 {part:'Simple sentences',sub:'Who does what: I am, I speak, questions and "not"'},
 'u8','cv17','u27','cv18','u41','u42','u13','cv19','u20','cv2',
 {part:'Numbers and time',sub:'Counting, prices, days, times and your daily routine'},
 'u2','cv20','u7','cv21','u28','cv11','u33','cv28',
 {part:'Getting around',sub:'To, in and from: places change their endings'},
 'u9','u19','cv4','u14','cv23','u16','cv5','u29','cv12',
 {part:'People and things',sub:'Describing words, my and your, and "to me it pleases"'},
 'u5','u30','cv24','u4','u25','cv25','u31','cv26','u11','u32','cv27',
 {part:'Plans and the future',sub:'Can, must and want + a verb, and "I will"'},
 'u26','u22','cv7','u23','cv6','u24','u34','cv13',
 {part:'Telling stories',sub:'"I was", "I went", and joining sentences with and, but, because'},
 'u35','cv29','u36','cv30','u37','cv14',
 {part:'Travelling and health',sub:'Hotels, trains, the body, and when something goes wrong'},
 'u10','cv31','u17','cv8','u40','cv32','u18','cv9','cv33','cv10',
 {part:'Real conversations',sub:'Opinions, reactions, and keeping a chat going'},
 'u38','cv15','u39','cv34',
 {part:'Extras',sub:'Animals, Lithuanian culture, and the sounds of the letters'},
 'u6','u12','u0',
];
const RESHAPE={
 /* Glue words early (edition 2, step 1): the little words that join sentences, moved up from Part 8. Lesson ids are unchanged, so nobody's progress moves. */
 u41:{title:'Maži žodžiai',en:'Little words',tip:'Little words do the most work. <b>Ir</b> (and), <b>bet</b> (but), <b>nes</b> (because) and <b>todėl</b> (so) join two ideas; <b>jau</b> (already), <b>dar</b> (still, yet) and <b>tik</b> (only) change what a sentence means. <b>Kai</b> (when), <b>jeigu</b> (if), <b>kad</b> (that) and <b>nors</b> (though) start a second idea. From here on, the conversations use them.',lessons:['u35a','u35c']},
 u35:{lessons:['u35b']},
 u13:{en:'Question words',tip:'Question words go first, just like English. Learn these six and you can ask about anything by pointing. Add <b>Ar</b> to the front of a sentence to turn it into a yes/no question.',lessons:['u13a']},
 u8:{title:'Kalbėti',en:'Talking',tip:'Verbs change their ending to show who is doing it: <b>aš kalbu</b> (I speak), <b>tu kalbi</b> (you speak). Because the ending already says who, people often drop aš and tu. Put <b>ne</b> on the front to say "not": nesuprantu, I don\'t understand.',lessons:['u8b','u8c']},
 u19:{title:'Susikalbėti',en:'Getting by',tip:'Short phrases that smooth every interaction. The <b>-ite</b> endings (atleiskite, parodykite) are the polite forms you use with strangers.',lessons:['u12b','u13b']},
 u26:{title:'Veiksmažodžiai',en:'Verb dictionary',tip:'Dictionary forms end in <b>-ti</b>. For "I", the ending becomes -u (kalbu, noriu); for "you", -i (kalbi, nori). You have been using these all along.',lessons:['u8a']},
 u12:{lessons:['u12a']},
 u7:{lessons:['u7a','u7b']},
 u24:{title:'Metų laikai',en:'Seasons and months',tip:'Seasons and months are named after nature: <b>liepa</b> (July) is the linden tree, <b>birželis</b> (June) the birch. Learn them with the weather they bring.',lessons:['u7c']},
};
(()=>{const L={},U={};COURSE.forEach(u=>{U[u.id]=u;u.lessons.forEach(l=>L[l.id]=l);});
  Object.keys(RESHAPE).forEach(id=>{const r=RESHAPE[id];U[id]=Object.assign({},U[id]||{},r,{id,lessons:r.lessons.map(x=>L[x])});});
  COURSE.length=0;PATH.forEach(p=>{if(typeof p==='string'&&U[p])COURSE.push(U[p]);});})();
/* Small glossary of glue words so phrase cards can show what they are built from. */
const GLUE={'yra':'is','ar':'(makes a question)','į':'to','iš':'from','su':'with','be':'without','man':'to me','mane':'me','aš':'I','tu':'you','mano':'my','tavo':'your','tai':'this / that','ką':'what','prašau':'please','čia':'here','ne':'no','ir':'and','per':'too','labai':'very','esu':'am','galite':'can you','galiu':'can I','galima':'is it allowed','turiu':'I have','turite':'do you have','noriu':'I want','norėčiau':'I would like','reikia':'need','kainuoja':'costs','iki':'until / to','šis':'this','šitą':'this one','metų':'years','eurai':'euros','euras':'euro','eurų':'euros','vandens':'water','kavos':'coffee','mėsos':'meat','dujų':'gas','dujomis':'gas','kortele':'by card','nakčiai':'night','naktims':'nights','vienai':'one','dviem':'two','koks':'what kind of','šiandien':'today','rytoj':'tomorrow','namo':'home','stotis':'station','centrą':'the centre','kambarį':'room','gydytojo':'a doctor','pasą':'passport','skauda':'hurts','sekasi':'goes','vardas':'name','kalbi':'you speak','kalbate':'you speak (polite)','kalbu':'I speak','angliškai':'English','lietuviškai':'Lithuanian','valandų':'hours','oras':'weather','tualetas':'toilet','platforma':'platform','slaptažodis':'password','pusryčiai':'breakfast','įskaičiuoti':'included',
 'tau':'to you','o':'and / what about','irgi':'too','nieko':'nothing','ypatingo':'special','truputį':'a little','pasakyti':'to say','reiškia':'means','žodis':'word','nelabai':'not really','gali':'can you','pakartoti':'repeat','dar':'more','kartą':'time','kur':'where','kuo':'as what','dirbi':'you work','dirbu':'I work','biure':'in an office','namų':'home','esi':'you are','gyveni':'you live','gyvenu':'I live','vilniuje':'in Vilnius','londone':'in London','lietuvos':'Lithuania','anglijos':'England','kanados':'Canada','amerikos':'America','amerikietis':'American','patinka':'pleases','nepatinka':'doesn\'t please','darbas':'work','įdomus':'interesting','mėgsti':'you like','mėgstu':'I like','veikti':'to do','veiki':'you do','skaityti':'to read','keliauti':'to travel','gaminti':'to cook','sportuoti':'to work out','žaidžiu':'I play','krepšinį':'basketball','klausausi':'I listen','muzikos':'music','savaitgalį':'at the weekend','nori':'you want','eiti':'to go','kartu':'together','gal':'maybe','negaliu':'I can\'t','neturiu':'I don\'t have','laiko':'time','susitiksime':'we will meet','prie':'by','kavinės':'the café','puiki':'great','idėja':'idea','rytojaus':'tomorrow','kelintą':'which (hour)','valandą':'at ... o\'clock','septintą':'seventh','aštuntą':'eighth','dvyliktą':'twelfth','po':'after','pietų':'lunch','turi':'you have','brolių':'brothers','seserų':'sisters','brolį':'brother','seserį':'sister','vaikų':'children','vaikus':'children','dukrą':'daughter','jo':'his','jos':'her','gyvena':'lives','kaune':'in Kaunas','mieli':'sweet','malonu':'nice','mokytojas':'teacher','studentas':'student','pensininkas':'retired person','mokausi':'I am learning','imu':'I take','obuolių':'apples','sriubą':'soup','dovana':'gift','skanu':'tasty','gražus':'beautiful','važiuoju':'I go (by vehicle)','kauną':'Kaunas','galvą':'head','neveikia':'doesn\'t work','dušas':'shower','vėluoju':'I\'m late','supratau':'I got it','puiku':'great','vilnius':'Vilnius','sveikatą':'health','cukraus':'sugar','pienu':'milk',
 /* Meanings for the "Built from" line in the expansion phrases. */
 "laba":"good","viso":"all (the)","gero":"good","tokio":"of the kind","susipažinti":"to get to know","pasimatymo":"seeing again","tomas":"Tomas (a name)","sau":"to oneself","suprantu":"I understand","einu":"I go","skaitau":"I read","žinau":"I know","nežinau":"I don't know","nesuprantu":"I don't understand","lietuvoje":"in Lithuania","lietuvių":"Lithuanian","kalbos":"language","miegu":"I sleep","einame":"we go","valgo":"they eat","ateinu":"I'm coming","ateini":"you're coming","išeina":"leaves","grįžtu":"I come back","laukiu":"I wait","manęs":"for me","skubu":"I hurry","sėdžiu":"I sit","stoviu":"I stand","ilsiuosi":"I rest","matau":"I see","matai":"you see","girdžiu":"I hear","darau":"I do","darai":"you do","žiūriu":"I watch","televizorių":"TV","rašau":"I write","galvoju":"I think","klausau":"I listen","juokiuosi":"I laugh","perku":"I buy","duoną":"bread","moku":"I pay / know how","duodu":"I give","duok":"give","parduodu":"I sell","ieškau":"I look for","stoties":"the station","randu":"I find","pamirštu":"I forget","esame":"we are","esate":"you are (polite)","kalbame":"we speak","kalba":"speak / language","gyvename":"we live","dirba":"work","darote":"you do (polite)","laukiame":"we wait","padėti":"to help","studijuoju":"I study","keliuosi":"I get up","prausiuosi":"I wash","apsirengiu":"I get dressed","pusryčiauju":"I have breakfast","geriu":"I drink","kavą":"coffee","naujienas":"the news","išeinu":"I leave","darbą":"work","autobusu":"by bus","penkių":"five","pietauju":"I have lunch","gaminu":"I cook","vakarienę":"dinner","vakarieniauju":"I have dinner","filmą":"a film","skambinu":"I call","mamai":"to mom","tvarkausi":"I tidy up","miegoti":"to sleep","aštuonias":"eight","valandas":"hours","nevėluoju":"I'm not late","pasivaikščioti":"for a walk","valgau":"I eat","vandenį":"water","alkanas":"hungry","sąskaitą":"the bill","staliuką":"a table","nevalgau":"I don't eat","rekomenduojate":"you recommend","mokėti":"to pay","alergiškas":"allergic","riešutams":"to nuts","arbatą":"tea","sriubos":"some soup","gimtadieniu":"birthday","linksmų":"merry","kalėdų":"Christmas","laimingų":"happy","naujųjų":"New","atvykę":"arrived","lėčiau":"slower","nekalbu":"I don't speak","nueiti":"to get to (on foot)","viskas":"everything","parodykite":"show (polite)","žemėlapyje":"on the map","bilietą":"a ticket","išvyksta":"leaves","atvyksta":"arrives","važiuoja":"goes (by vehicle)","autobusų":"bus","geležinkelio":"railway","sustokite":"stop (polite)","nuvežkite":"take (me) (polite)","viešbutį":"the hotel","oro":"air","uosto":"port","parduotuvę":"the shop","važiuoji":"you go (by vehicle)","pasimatuoti":"to try on","prekybos":"shopping","sūrio":"some cheese","obuoliai":"apples","kokio":"what","dydžio":"size","dydis":"size","vidutinis":"medium","didesnis":"bigger","mažesnis":"smaller","matavimosi":"fitting","kabina":"room / booth","ši":"this","kitos":"another","spalvos":"colour","pagalvosiu":"I'll think","nauji":"new","dėvi":"wears","kepurę":"a hat","apsivilk":"put on","striukę":"a jacket","balta":"white","aukšta":"tall","protinga":"clever","knyga":"book","įdomi":"interesting","nėra":"is not","lengva":"easy","karšta":"hot","ligoninėje":"in a hospital","parduotuvėje":"in a shop","mokykloje":"at a school","bedarbis":"unemployed","darbo":"work","visą":"all","dieną":"day","baigi":"you finish","baigiu":"I finish","penktą":"at five","sergu":"I'm sick","myliu":"I love","tave":"you","bute":"in a flat","jauskis":"feel","namie":"at home","arbatos":"some tea","kambaryje":"in the room","atidaryk":"open","langą":"the window","uždaryk":"close","duris":"the door","įjunk":"turn on","šviesą":"the light","išjunk":"turn off","už":"for","vaišes":"the food (treat)","plaukti":"to swim","moki":"you know how","vairuoti":"to drive","nemoku":"I can't","šokti":"to dance","negalima":"not allowed","rūkyti":"to smoke","sėdėti":"to sit","pinigų":"money","pagalbos":"help","dirbti":"to work","pabandyti":"to try","būsiu":"I will be","eisiu":"I will go","važiuosiu":"I will travel","dirbsiu":"I will work","valgysiu":"I will eat","skambinsiu":"I will call","pamatysiu":"I will see","grįšiu":"I will come back","liksiu":"I will stay","pabandysiu":"I will try","veiksi":"you will do","kitą":"next","savaitę":"week","kitais":"next","metais":"year","ateisi":"you will come","ateisiu":"I will come","vėliau":"later","važiuosi":"you will go","atostogų":"on holiday","vasarą":"in summer","jūros":"the sea","skrisiu":"I will fly","vilnių":"Vilnius","gyvensime":"we will stay","viešbutyje":"in a hotel","aplankysiu":"I will visit","draugus":"friends","bus":"it will be","smagu":"fun","sėkmingos":"successful","pat":"(also)","pyrago":"cake","neinu":"I'm not going","lieku":"I stay","valgiau":"I ate","nevalgiau":"I haven't eaten","vis":"still","tiek":"anyway","ateik":"come","manau":"I think","buvau":"I was","ėjau":"I went (on foot)","važiavau":"I went (by car)","gėriau":"I drank","mačiau":"I saw","dirbau":"I worked","miegojau":"I slept","žiūrėjau":"I watched","praėjusią":"last","prieš":"ago","mieste":"in town","susitikau":"I met","draugu":"a friend","nupirkau":"I bought","dovaną":"a present","kalbėjau":"I talked","skaičiau":"I read","knygą":"a book","grįžau":"I came back","nebuvau":"I wasn't","nemačiau":"I didn't see","nežinojau":"I didn't know","pamiršau":"I forgot","pavėlavau":"I was late","buvo":"it was","neatsitiko":"didn't happen","veikei":"you did","buvai":"you were","valgei":"you ate","matei":"you saw","praėjo":"went","patiko":"liked","nepatiko":"didn't like","grįžai":"you came back","buvome":"we were","išvažiavo":"left","paskambino":"called","valgėme":"we ate","restorane":"at a restaurant","restorano":"the restaurant","pyragų":"cakes","pyragai":"cakes","atvažiavo":"arrived","atsitiko":"happened","pasakė":"said","parką":"the park","picą":"pizza","grįžome":"we came back","nuostabu":"amazing","uostas":"port","baltijos":"Baltic","rezervaciją":"a reservation","wi-fi":"Wi-Fi","išsiregistruoti":"to check out","kondicionierius":"conditioner","pakeisti":"to change","išvykstu":"I'm leaving","koją":"leg","dantį":"tooth","nugarą":"back","peršalau":"I caught a cold","kosėju":"I'm coughing","sloga":"runny nose","svaigsta":"is spinning","vaistų":"medicine","nuo":"for / from","galvos":"head","skausmo":"pain","jaučiuosi":"I feel","geriau":"better","iškvieskite":"call (polite)","greitąją":"an ambulance","pasiklydau":"I got lost","pamečiau":"I lost","apvogė":"robbed","palikite":"leave (polite)","ramybėje":"in peace","pilvą":"stomach","gerklę":"throat","temperatūros":"a fever","bloga":"bad / sick","atrodo":"it seems","sutinku":"I agree","nesutinku":"I disagree","teisus":"right","abejo":"doubt","nuomone":"opinion","manai":"you think","gera":"good","tas":"the","pats":"same","lietaus":"rain","tavimi":"you","labiau":"more","geresnė":"better","žinai":"you know","tikrųjų":"truth","negali":"can't","gaila":"a pity","papasakok":"tell","daugiau":"more","būni":"you are","pasikalbėti":"to chat","kito":"next","karto":"time","parašyk":"write / text","numeris":"number","susitikime":"let's meet","šunį":"a dog","miega":"sleeps","gedimino":"Gediminas'","pilis":"castle","vasario":"February","16-oji":"16th","apie":"about","jei":"if","mūsų":"our","jūsų":"your (polite)","dėl":"because of","to":"that","jį":"him","ją":"her","jam":"to him","jai":"to her","jums":"to you (polite)","mums":"to us","tavęs":"you","girdi":"you hear","paskambink":"call","padėk":"help","visai":"quite","nenoriu":"I don't want","maniau":"I thought","mėsą":"meat","žuvį":"fish","sotus":"full","soti":"full","paduok":"pass","druską":"the salt","viską":"everything"};
/* the time-of-day words inside the greetings, so "Built from" on a first card says what diena and vakaras mean */
[['rytas','morning'],['rytą','morning'],['diena','day'],['dieną','day'],['vakaras','evening'],['vakarą','evening'],['naktis','night'],['naktį','night'],['jonas','(a name)']].forEach(([k,v])=>{if(!GLUE[k])GLUE[k]=v;});
/* (Round 7) meanings for the words the other person uses in a conversation before a lesson teaches them: each is
   underlined in their message, a tap away, and listed before the conversation starts */
[['sėskitės','sit down (polite)'],
 ['oi','oh!'],
 ['muziejų','the museum'],
 ['toks','such, so'],
 ['upės','the river'],
 ['išgersime','we\'ll drink'],
 ['u-pė','river (said slowly)'],
 ['greitai','fast'],
 ['mokaisi','you\'re learning'],
 ['laikas','time'],
 ['geros','good'],
 ['dienos','day'],
 ['užeik','come in'],
 ['alaus','some beer'],
 ['lietuviškas','Lithuanian'],
 ['valgai','you eat'],
 ['bulvės','potatoes'],
 ['vėlu','late'],
 ['atvažiavai','you arrived'],
 ['ko','what'],
 ['norėtumėte','would you like'],
 ['skanūs','tasty'],
 ['varške','curd cheese'],
 ['alergijų','allergies'],
 ['riešutų','nuts'],
 ['džiaugiuosi','I\'m glad'],
 ['paliekame','we leave'],
 ['arbatpinigių','a tip'],
 ['anglų','English'],
 ['mokytis','to learn'],
 ['skani','tasty'],
 ['skaitai','you read'],
 ['šaunu','great!'],
 ['stotyje','at the station'],
 ['bažnyčią','the church'],
 ['bažnyčios','the church'],
 ['stovime','we\'re standing'],
 ['durų','the door'],
 ['eik','go!'],
 ['pagaliau','at last'],
 ['perka','buys'],
 ['bilietus','tickets'],
 ['greičiau','faster'],
 ['reksas','Reksas (a dog\'s name)'],
 ['draugiškas','friendly'],
 ['senamiestyje','in the old town'],
 ['pilies','castle'],
 ['gatvėje','on the street'],
 ['senamiestis','the old town'],
 ['sena','old'],
 ['miesto','the town'],
 ['dalis','part'],
 ['rusiškai','in Russian'],
 ['einate','you\'re going (polite)'],
 ['eikite','go (polite)'],
 ['minučių','minutes'],
 ['nepasiklyskite','don\'t get lost'],
 ['kauno','Kaunas'],
 ['studijuoji','you study'],
 ['patogu','handy'],
 ['grąžos','change (money)'],
 ['anūkas','grandson'],
 ['lukas','Lukas (a name)'],
 ['rodo','shows'],
 ['penkis','five'],
 ['pirštus','fingers'],
 ['penkeri','five (years old)'],
 ['klausia','asks'],
 ['sako','says'],
 ['perkate','you buy (polite)'],
 ['ateikite','come (polite)'],
 ['eini','you go'],
 ['šią','this'],
 ['šeštadienį','on Saturday'],
 ['sekmadienį','on Sunday'],
 ['kokiu','at what'],
 ['laiku','time'],
 ['katedros','the cathedral'],
 ['vėluoji','you\'re late'],
 ['pusė','half'],
 ['pirmos','one (pusė pirmos: half past twelve)'],
 ['keliesi','you get up'],
 ['grįžti','you come back'],
 ['žiūri','you watch'],
 ['filmus','films'],
 ['miegi','you sleep'],
 ['šešias','six'],
 ['naują','new'],
 ['butą','flat, apartment'],
 ['mašiną','car'],
 ['super','super'],
 ['vairuosi','you\'ll drive'],
 ['vairuosiu','I\'ll drive'],
 ['sunki','heavy, hard'],
 ['uf','phew'],
 ['užsakysiu','I\'ll order'],
 ['pagalbą','help'],
 ['penkios','five'],
 ['minutės','minutes'],
 ['važiuojate','you\'re going (polite)'],
 ['ketvirtos','four (platform four)'],
 ['platformos','platform'],
 ['pusantros','one and a half'],
 ['valandos','hours, o\'clock'],
 ['a','ah'],
 ['netoli','not far'],
 ['pirmą','first'],
 ['kampo','the corner'],
 ['raudoni','red'],
 ['žali','green'],
 ['kilogramų','kilos'],
 ['šios','these'],
 ['striukės','jackets'],
 ['populiarios','popular'],
 ['šešiasdešimt','sixty'],
 ['procentų','percent'],
 ['gražios','nice'],
 ['pažiūrėsime','we\'ll have a look'],
 ['šitas','this one'],
 ['žiūrėk','look!'],
 ['mantas','Mantas (a name)'],
 ['gintarė','Gintarė (a name)'],
 ['vyru','(my) husband'],
 ['kokia','what a'],
 ['vaikai','children'],
 ['laimė','happiness, luck'],
 ['laisva','free'],
 ['pavargusi','tired'],
 ['žmonių','people'],
 ['baigiau','I finished'],
 ['dvylikos','twelve'],
 ['tamsu','dark'],
 ['jautiesi','you feel'],
 ['atrodai','you look'],
 ['padės','will help'],
 ['draugais','friends'],
 ['antra','second'],
 ['religija','religion'],
 ['gražių','beautiful'],
 ['vietų','places'],
 ['gamini','you cook'],
 ['parke','in the park'],
 ['koncertas','concert'],
 ['savaitgalio','the weekend'],
 ['kiną','the cinema'],
 ['šeštadienio','Saturday'],
 ['būsi','you will be'],
 ['traukiniu','by train'],
 ['važiuoti','to go (by car, bus, train)'],
 ['pagalvok','think about it'],
 ['važiuojame','we\'re going'],
 ['ežero','the lake'],
 ['sumuštinių','sandwiches'],
 ['paimsiu','I\'ll take'],
 ['termosą','a thermos'],
 ['ežere','in the lake'],
 ['važiuos','will come along'],
 ['antrą','two (at two o\'clock)'],
 ['pamiršai','you forgot'],
 ['parašiau','I wrote'],
 ['adresą','the address'],
 ['aha','aha'],
 ['pavėlavai','you were late'],
 ['užsisakome','let\'s order'],
 ['pusryčius','breakfast'],
 ['nevėluok','don\'t be late'],
 ['valgėte','you ate (polite)'],
 ['važiuokite','go (polite, by bus or car)'],
 ['turistas','tourist'],
 ['klaipėdą','Klaipėda'],
 ['matėte','you saw (polite)'],
 ['jūrą','the sea'],
 ['graži','beautiful'],
 ['kuršių','Curonian'],
 ['nerija','spit (the Curonian Spit)'],
 ['kopos','dunes'],
 ['ežerai','lakes'],
 ['stovi','stands'],
 ['trečiame','third'],
 ['aukšte','floor'],
 ['septintos','seven (o\'clock)'],
 ['dešimtos','ten (o\'clock)'],
 ['ant','on'],
 ['rakto','key'],
 ['kortelės','card'],
 ['atsiųsiu','I\'ll send'],
 ['meistrą','a repairman'],
 ['duoti','to give'],
 ['negerai','not good'],
 ['kosėjate','you\'re coughing (polite)'],
 ['kosulio','cough'],
 ['gerklė','throat'],
 ['raudona','red'],
 ['temperatūra','temperature'],
 ['receptas','prescription'],
 ['gerkite','take, drink (polite)'],
 ['ilsėkitės','rest (polite)'],
 ['tris','three'],
 ['dienas','days'],
 ['viena','one'],
 ['tabletė','tablet'],
 ['kartus','times'],
 ['pasveikite','get well'],
 ['paėmė','took'],
 ['paso','passport'],
 ['kreipkitės','go to, contact (polite)'],
 ['savo','your own'],
 ['ambasadą','the embassy'],
 ['adresas','address'],
 ['pažyma','a certificate'],
 ['draudimui','for the insurance'],
 ['saugokite','look after'],
 ['daiktus','things'],
 ['sveikas','hi (to a man)'],
 ['cepelinų','cepelinai (potato dumplings)'],
 ['atėjai','you came'],
 ['gražesnis','more beautiful'],
 ['pas','at (someone\'s place)'],
 ['mus','us'],
 ['vakarienės','dinner'],
 ['penkerius','five'],
 ['metus','years'],
 ['muziejuje','in the museum'],
 ['ekskursija','a tour'],
 ['nemokama','free (no charge)'],
 ['muziejaus','the museum'],
 ['katedra','the Cathedral (in Vilnius)'],
 ['žaidžia','plays (they play)'],
 ['rašiau','I wrote']].forEach(([k,v])=>{if(!GLUE[k])GLUE[k]=v;});
/* Pictures for concrete words: they make a word stick far better than a translation alone. */
const EMOJI={'pica':'🍕','šokoladas':'🍫','žirafa':'🦒','čempionas':'🏆','šampūnas':'🧴','kavinė':'☕','muziejus':'🏛️','radijas':'📻','telefonas':'📱',
 'Labas':'👋','Sveiki':'👋','Labas rytas':'🌅','Laba diena':'☀️','Labas vakaras':'🌆','Labanakt':'🌙','Viso gero':'👋','Iki':'👋','Ačiū':'🙏','Prašau':'🤲','Taip':'👍','Ne':'👎','Atsiprašau':'🙇','Gerai':'👌','Sėkmės':'🍀','Jis':'👨','Ji':'👩',
 'vienas':'1️⃣','du':'2️⃣','trys':'3️⃣','keturi':'4️⃣','penki':'5️⃣','šeši':'6️⃣','septyni':'7️⃣','aštuoni':'8️⃣','devyni':'9️⃣','dešimt':'🔟','nulis':'0️⃣','šimtas':'💯','vienas euras':'💶','du eurai':'💶','dešimt eurų':'💶',
 'duona':'🍞','pienas':'🥛','vanduo':'💧','kava':'☕','arbata':'🍵','sūris':'🧀','mėsa':'🥩','sriuba':'🍲','kiaušinis':'🥚','sviestas':'🧈','obuolys':'🍎','bulvė':'🥔','žuvis':'🐟','vištiena':'🍗','druska':'🧂','alus':'🍺','vynas':'🍷','pyragas':'🍰','ledai':'🍦','restoranas':'🍽️','meniu':'📋','Skanu!':'😋','Į sveikatą!':'🥂','Sąskaitą, prašau':'🧾',
 'mama':'👩','tėtis':'👨','sesuo':'👧','brolis':'👦','sūnus':'👦','dukra':'👧','senelis':'👴','senelė':'👵','šeima':'👪','vaikas':'🧒','vyras':'👨','moteris':'👩','berniukas':'👦','mergaitė':'👧','žmogus':'🧑',
 'raudonas':'🔴','mėlynas':'🔵','žalias':'🟢','geltonas':'🟡','juodas':'⚫','baltas':'⚪','rudas':'🟤','oranžinis':'🟠','didelis':'🐘','mažas':'🐭','žalias obuolys':'🍏','balta duona':'🍞','didelis namas':'🏠',
 'šuo':'🐕','katė':'🐈','arklys':'🐎','karvė':'🐄','paukštis':'🐦','kiaulė':'🐖','višta':'🐔','avis':'🐑','pelė':'🐁','triušis':'🐇','vilkas':'🐺','lokys':'🐻','lapė':'🦊','varlė':'🐸','bitė':'🐝','drugelis':'🦋','Katė miega':'😴',
 'rytas':'🌅','diena':'☀️','vakaras':'🌆','naktis':'🌙','valanda':'⏰','Kiek valandų?':'⏰','pavasaris':'🌷','vasara':'🏖️','ruduo':'🍂','žiema':'❄️','savaitė':'📅','mėnuo':'📅','šiandien':'📅',
 'miestas':'🏙️','kaimas':'🏡','namas':'🏠','mokykla':'🏫','parduotuvė':'🏪','gatvė':'🛣️','stotis':'🚉','bažnyčia':'⛪','ligoninė':'🏥','bankas':'🏦','kairėn':'⬅️','dešinėn':'➡️','tiesiai':'⬆️','vaistinė':'💊','paštas':'📮',
 'bilietas':'🎫','lėktuvas':'✈️','traukinys':'🚆','autobusas':'🚌','oro uostas':'🛫','viešbutis':'🏨','pasas':'🛂','pinigai':'💶','lagaminas':'🧳','žemėlapis':'🗺️','Lietuva':'🇱🇹','jūra':'🌊','miškas':'🌲','ežeras':'🏞️','upė':'🏞️',
 'lietus':'🌧️','sniegas':'❄️','saulė':'☀️','vėjas':'💨','debesis':'☁️','Šilta':'🌤️','Šalta':'🥶','Lyja':'🌧️','Sninga':'🌨️','laimingas':'😊','liūdnas':'😢','pavargęs':'😴','ištroškęs':'🥤','Man karšta':'🥵','Man šalta':'🥶','Aš sergu':'🤒','Aš myliu tave':'❤️',
 'cepelinai':'🥟','krepšinis':'🏀','Su gimtadieniu!':'🎂','Linksmų Kalėdų!':'🎄','Laimingų Naujųjų metų!':'🎆','Kur tualetas?':'🚻','Padėkite!':'🆘','Gelbėkite!':'🆘',
 'taksi':'🚕','dviratis':'🚲','stotelė':'🚏','pusryčiai':'🍳','vakarienė':'🍽️','šaukštas':'🥄','šakutė':'🍴','peilis':'🔪','grynaisiais':'💵','Ar galima mokėti kortele?':'💳',
 'turgus':'🧺','prekybos centras':'🏬','kepykla':'🥐','dovana':'🎁','maišelis':'🛍️','kvitas':'🧾','raktas':'🔑','lova':'🛏️','kambarys':'🛏️','dušas':'🚿','policija':'👮','gydytojas':'🧑‍⚕️','vaistai':'💊',
 'muzika':'🎵','futbolas':'⚽','filmai':'🎬','knygos':'📚','kelionės':'✈️','Aš mėgstu skaityti':'📖','Aš mėgstu keliauti':'🧳','Aš mėgstu gaminti':'🍳','Aš mėgstu sportuoti':'🏋️','Aš žaidžiu krepšinį':'🏀','Aš klausausi muzikos':'🎧','savaitgalis':'🎉',
 'ryte':'🌅','vakare':'🌆','Septintą valandą':'🕖','Aštuntą valandą':'🕗','Dvyliktą valandą':'🕛','Aš vėluoju':'🏃','Aš esu studentas':'🎓','Aš esu mokytojas':'🧑‍🏫','Aš dirbu biure':'🏢','Aš dirbu iš namų':'🏠','Aš turiu du vaikus':'🧒','striukė':'🧥','paltas':'🧥','marškiniai':'👔','kelnės':'👖','suknelė':'👗','sijonas':'👗','batai':'👞','megztinis':'🧶','kepurė':'🧢','džinsai':'👖','šalikas':'🧣','pirštinės':'🧤','kojinės':'🧦','skėtis':'☂️','rankinė':'👜','kuprinė':'🎒','akiniai':'👓',
'linksmas':'😄','protingas':'🧠','juokingas':'😂','rimtas':'😐','tylus':'🤫','sunkus':'🏋️','karštas':'🔥','šaltas':'🧊','švarus':'✨','patogus':'🛋️',
'vairuotojas':'🚗','inžinierius':'👷','programuotojas':'💻','pardavėjas':'🛒','virėjas':'🧑‍🍳','slaugytoja':'🧑‍⚕️','gydytoja':'🧑‍⚕️','ūkininkas':'🧑‍🌾','policininkas':'👮','vadovas':'💼',
'namai':'🏠','butas':'🏢','virtuvė':'🍳','vonia':'🛁','miegamasis':'🛏️','svetainė':'🛋️','langas':'🪟','durys':'🚪','stalas':'🪑','kėdė':'🪑','šaldytuvas':'🧊','sofa':'🛋️','lempa':'💡','balkonas':'🌇','laiptai':'🪜',
'Aš keliuosi':'⏰','Aš prausiuosi':'🚿','Aš pusryčiauju':'🍳','Aš geriu kavą':'☕','Aš skaitau naujienas':'📰','Aš einu į darbą':'💼','Aš važiuoju autobusu':'🚌','Aš gaminu vakarienę':'🍲','Aš žiūriu filmą':'🎬','Aš einu miegoti':'🌙','Aš žiūriu televizorių':'📺','Aš rašau':'✍️','Aš juokiuosi':'😂','Aš perku duoną':'🍞',
'ranka':'✋','koja':'🦵','akis':'👁️','ausis':'👂','nosis':'👃','burna':'👄','dantis':'🦷','širdis':'❤️','plaukai':'💇','Aš kosėju':'😷','Man skauda dantį':'🦷','Aš peršalau':'🤧',
'atostogos':'🏖️','Bus smagu!':'🎉','Aš skrisiu į Vilnių':'✈️','Aš galiu padėti':'🤝','Aš moku plaukti':'🏊','Aš nemoku šokti':'💃','Čia negalima rūkyti':'🚭','Aš noriu miegoti':'😴','Ar nori valgyti?':'🍽️',
'Negali būti!':'😮','Kaip gaila':'😞','Kaip smagu!':'🥳','Tai gera idėja':'👍','Tai bloga idėja':'👎','Baisu':'😱','Juokinga':'😂','Parašyk man':'📱','Koks tavo numeris?':'📞','Sriubą, prašau':'🍲','Arbatą, prašau':'🍵','Ar turite obuolių?':'🍎','Ar turite sūrio?':'🧀','Aš važiuoju į Kauną':'🚌','Aš einu į parduotuvę':'🚶','Aš einu namo':'🏠','Man skauda galvą':'🤕','Man skauda pilvą':'🤢','Turiu temperatūros':'🌡️',
/* Pictures for the rest: every word and phrase has one. "#..." is a text tile (numbers, days, months). */
"jogurtas":"🥣","Kaip sekasi?":"🙂","Puikiai":"🤩","Nieko tokio":"👌","Malonu susipažinti":"🤝","Iki pasimatymo":"👋","Aš":"🙋","Tu":"👉","Mes":"🧑‍🤝‍🧑","Jūs":"👥","Jie":"👬","Jos":"👭","Mano vardas Tomas":"🏷️","Koks tavo vardas?":"📛","Aš esu iš Amerikos":"🇺🇸","Gerai, ačiū":"😊","O tau?":"🔁","Neblogai":"🙂","Taip sau":"😐","Man irgi gerai":"😊","Aš irgi":"🙌","Ką veiki?":"🤔","Nieko ypatingo":"🤷","Labai malonu":"😍","Ir tau":"🍀","Aš truputį kalbu lietuviškai":"🤏","Kaip tai pasakyti lietuviškai?":"💬","Ką reiškia šis žodis?":"📖","Aš nelabai suprantu":"😕","Ar gali pakartoti?":"🔁","Palauk":"✋","Teisingai":"✅","Aš mokausi":"📚","Dar kartą":"🔂","Supratau":"💡","Aš esu":"🙋","Aš esu Tomas":"🙋","Tu esi Jonas?":"👉","Jis yra Jonas":"👨","Ji yra Rūta":"👩","Mes esame čia":"📍","Tu esi":"👉","Jis yra":"👨","Aš einu":"🚶","Aš kalbu":"🗣️","Aš skaitau":"📖","Aš noriu":"🤲","Aš turiu":"🎒","Aš žinau":"💡","Aš nežinau":"🤷","Aš kalbu lietuviškai":"🇱🇹","Ar tu kalbi angliškai?":"🇬🇧","Aš nesuprantu":"😕","Aš suprantu":"👍","Aš gyvenu Lietuvoje":"🏡","Aš mokausi lietuvių kalbos":"📚","Aš dirbu":"💼","Aš miegu":"😴","Mes einame namo":"🏠","Jie valgo":"🍽️","Aš ateinu":"🏃","Ar tu ateini?":"🚪","Jis išeina":"🚶‍♂️","Aš grįžtu":"🔙","Aš laukiu":"⏳","Palauk manęs":"✋","Aš skubu":"🏃‍♀️","Aš sėdžiu":"🪑","Aš stoviu":"🧍","Aš ilsiuosi":"🛋️","Aš matau":"👀","Ar tu matai?":"👁️","Aš girdžiu":"👂","Aš darau":"🛠️","Ką tu darai?":"🤔","Aš galvoju":"💭","Aš klausau":"🎧","Aš perku":"🛒","Aš moku":"💳","Aš duodu":"🎁","Duok man":"🤲","Aš parduodu":"🏷️","Aš ieškau":"🔍","Aš ieškau stoties":"🔎","Aš randu":"🎯","Aš pamirštu":"❓","Mes esame":"🧑‍🤝‍🧑","Jūs esate":"👥","Jie yra":"👬","Mes kalbame":"💬","Jūs kalbate":"🗣️","Jie kalba":"💬","Mes gyvename Vilniuje":"🏙️","Jie dirba kartu":"🤝","Ką jūs darote?":"🤔","Mes laukiame":"⏳","kas":"❓","kur":"📍","kada":"⏰","kodėl":"🤔","kaip":"🧭","kuris":"☝️","Ar galite man padėti?":"🙏","Ar kalbate angliškai?":"🇬🇧","Ką tai reiškia?":"📖","Kur aš esu?":"🗺️","Iš kur tu esi?":"🌍","Aš esu iš Lietuvos":"🇱🇹","Aš esu iš Anglijos":"🇬🇧","Aš esu iš Kanados":"🇨🇦","Kur tu gyveni?":"🏘️","Aš gyvenu Vilniuje":"🏙️","O tu?":"🔁","Aš gyvenu Londone":"💂","Ar tu lietuvis?":"🇱🇹","Ne, aš amerikietis":"🇺🇸","Kuo tu dirbi?":"💼","Aš esu pensininkas":"👴","Ar tau patinka tavo darbas?":"💼","Mano darbas įdomus":"✨","Aš studijuoju":"🎓","darbas":"💼","vienuolika":"#11","dvylika":"#12","trylika":"#13","keturiolika":"#14","penkiolika":"#15","dvidešimt":"#20","trisdešimt":"#30","tūkstantis":"#1000","Kiek?":"🔢","Kiek tau metų?":"🎂","Man dvidešimt metų":"#20","Kiek kainuoja?":"💶","pirmas":"🥇","antras":"🥈","trečias":"🥉","pirmadienis":"#MON","antradienis":"#TUE","trečiadienis":"#WED","ketvirtadienis":"#THU","penktadienis":"#FRI","šeštadienis":"#SAT","sekmadienis":"#SUN","rytoj":"⏭️","vakar":"⏮️","dabar":"⏱️","metai":"📆","Aš keliuosi septintą valandą":"⏰","Aš apsirengiu":"👕","Aš išeinu iš namų":"🚪","Aš dirbu iki penkių":"🕔","Aš pietauju":"🥗","Aš grįžtu namo":"🏠","Aš vakarieniauju":"🍽️","Aš skambinu mamai":"📞","Aš tvarkausi":"🧹","Aš miegu aštuonias valandas":"🛌","visada":"♾️","dažnai":"🔁","kartais":"🌗","retai":"🐢","niekada":"🚫","kasdien":"📅","Aš visada geriu kavą":"☕","Aš niekada nevėluoju":"⌚","Kartais aš dirbu iš namų":"💻","Kasdien aš einu pasivaikščioti":"🚶","cukrus":"🍬","Aš noriu kavos":"☕","Aš valgau duoną":"🍞","Aš geriu vandenį":"💧","Aš esu alkanas":"🤤","Skanaus!":"🍽️","Staliuką dviem, prašau":"🪑","Meniu, prašau":"📋","Aš norėčiau":"🙏","vandens be dujų":"🚰","vandens su dujomis":"💦","Aš nevalgau mėsos":"🥦","Ką rekomenduojate?":"👨‍🍳","pietūs":"🥗","arbatpinigiai":"💰","Labai skanu":"😋","Aš alergiškas riešutams":"🥜","be cukraus":"🚫","su pienu":"🥛","Aš norėčiau sriubos":"🍲","Puiku!":"🎉","Ne, ačiū":"🙅","Kur yra stotis?":"🚉","čia":"📍","ten":"👉","toli":"🏔️","arti":"🏠","Sveiki atvykę!":"🤗","Labai ačiū":"🙏","Ar galite pakartoti?":"🔁","Lėčiau, prašau":"🐢","Aš nekalbu lietuviškai":"🤐","Atleiskite":"🙋","Kaip nueiti į centrą?":"🧭","Ar toli?":"📏","Ar galima?":"🙋","Viskas gerai":"👌","Minutėlę":"⏱️","Nesvarbu":"🤷","Žinoma":"👍","Parodykite žemėlapyje":"🗺️","Nieko":"🤷","Bilietą į Kauną, prašau":"🎫","Kada išvyksta?":"🛫","Kada atvyksta?":"🛬","Kur yra platforma?":"🚉","Ar šis autobusas važiuoja į centrą?":"🚌","autobusų stotis":"🚏","geležinkelio stotis":"🚉","centras":"🏛️","tvarkaraštis":"🗓️","Sustokite čia, prašau":"🛑","Nuvežkite mane į viešbutį":"🚕","Kiek kainuoja iki oro uosto?":"🛫","pirmyn":"⏩","atgal":"⏪","išėjimas":"🚪","įėjimas":"🚪","nuoma":"🔑","Kur tu važiuoji?":"🚗","Važiuojam!":"🚀","Ar turite?":"🛍️","Aš imu šitą":"☝️","brangu":"💸","pigu":"🪙","per didelis":"🐘","per mažas":"🐜","Ar galiu pasimatuoti?":"👗","atidaryta":"🔓","uždaryta":"🔒","suvenyras":"🗿","nuolaida":"🏷️","Tik žiūriu":"👀","grąža":"🪙","Kiek tai kainuoja?":"💶","Kiek kainuoja obuoliai?":"🍎","Gerai, aš imu":"👍","Tik grynaisiais?":"💵","Kokio dydžio?":"📏","Mano dydis vidutinis":"👕","Ar yra didesnis?":"⬆️","Ar yra mažesnis?":"⬇️","Kur yra matavimosi kabina?":"🪞","Tinka":"✅","Netinka":"❌","Man patinka ši striukė":"🧥","Ar turite kitos spalvos?":"🎨","Aš pagalvosiu":"🤔","nauji batai":"👟","Jis dėvi kepurę":"🧢","Apsivilk striukę":"🧥","pilkas":"🐘","rožinis":"🌸","naujas":"✨","senas":"🏚️","gražus":"🌹","geras":"👍","blogas":"👎","aukštas vyras":"🧍‍♂️","žemas":"🐕","jaunas":"👶","vyresnis":"🧓","malonus":"🤗","ilgas":"🐍","trumpas":"✂️","lengvas":"🪶","nešvarus":"💩","įdomus":"🤩","Mano brolis aukštas":"🦒","Mano sesuo aukšta":"🧍‍♀️","Ji labai protinga":"🧠","Koks jis?":"🤔","Jis linksmas":"😄","Šis lagaminas sunkus":"🧳","Ši knyga įdomi":"📕","Lietuvių kalba nėra lengva":"🧗","Kambarys švarus":"🧼","Kava per karšta":"♨️","žmona":"👰","draugas":"🧑‍🤝‍🧑","draugė":"👭","Tai mano brolis":"👦","Aš turiu seserį":"👧","Ar turi brolių ar seserų?":"👨‍👩‍👧‍👦","Aš turiu brolį":"👦","Ne, neturiu":"🙅","Ar turi vaikų?":"👶","Aš turiu dukrą":"👧","Koks jo vardas?":"👦","Koks jos vardas?":"👧","Mano mama gyvena Kaune":"🏡","Jie labai mieli":"🥰","Kur tu dirbi?":"🏢","Aš dirbu ligoninėje":"🏥","Aš dirbu parduotuvėje":"🏪","Aš dirbu mokykloje":"🏫","Aš esu bedarbis":"📋","Aš ieškau darbo":"🔍","Mano darbas sunkus":"😓","Aš dirbu visą dieną":"🕘","Kada baigi darbą?":"🕔","Aš baigiu penktą":"🕔","oras":"🌦️","Man patinka":"👍","Koks šiandien oras?":"🌤️","spinta":"🚪","kilimas":"🟥","kaimynas":"🏘️","Aš gyvenu bute":"🏢","Mano butas mažas":"🏠","Kur yra virtuvė?":"🍳","Jauskis kaip namie":"🏡","Sėskis":"🪑","Ar nori arbatos?":"🍵","Kambaryje šalta":"🥶","Atidaryk langą":"🪟","Uždaryk duris":"🚪","Įjunk šviesą":"💡","Išjunk šviesą":"🌑","Ačiū už vaišes":"🍽️","būti":"🙋","eiti":"🚶","valgyti":"🍴","gerti":"🥤","kalbėti":"🗣️","skaityti":"📖","rašyti":"✍️","norėti":"🤲","turėti":"🎒","žinoti":"💡","Aš galiu":"💪","Ar tu gali?":"🙋","Aš negaliu":"🙅","Ar gali man padėti?":"🙏","Ar moki vairuoti?":"🚗","Ar galima čia sėdėti?":"🪑","Man reikia":"🙏","Man reikia eiti":"🏃","Man reikia pinigų":"💶","Ar tau reikia pagalbos?":"🆘","Nereikia":"👌","Aš turiu dirbti":"💼","Aš turiu eiti":"🚶","Tu turi pabandyti":"🎯","Man nepatinka":"👎","Man labai patinka":"😍","Ar tau patinka?":"🤔","Man patinka muzika":"🎶","Man patinka Lietuva":"🇱🇹","Ką tu mėgsti veikti?":"🎨","laisvalaikis":"🏖️","Ką veiki savaitgalį?":"🎉","Ar nori eiti kartu?":"🚶","Taip, noriu":"👍","Gal rytoj?":"⏭️","Šiandien negaliu":"🙅","Neturiu laiko":"⌛","Kur susitiksime?":"📍","Prie kavinės":"☕","Puiki idėja!":"💡","Sutarta!":"🤝","Iki rytojaus!":"👋","Kelintą valandą?":"🕰️","po pietų":"🌇","vėlai":"🌙","anksti":"🌄","sausis":"#JAN","vasaris":"#FEB","kovas":"#MAR","birželis":"#JUN","liepa":"#JUL","gruodis":"#DEC","Aš būsiu":"🔮","Aš eisiu":"🚶","Aš važiuosiu":"🚗","Aš dirbsiu":"💼","Aš valgysiu":"🍽️","Aš skambinsiu":"📞","Aš pamatysiu":"👀","Aš grįšiu":"🔙","Aš liksiu namie":"🏠","Aš pabandysiu":"🎯","Ką veiksi rytoj?":"🔮","Rytoj aš dirbsiu":"💼","kitą savaitę":"📅","kitais metais":"🎆","po darbo":"🍻","Vakare aš būsiu namie":"🏠","Ar ateisi?":"🚪","Taip, ateisiu":"👍","Gal vėliau":"⏳","Pamatysime":"🤞","Kur važiuosi atostogų?":"🧳","Vasarą aš važiuosiu prie jūros":"🏖️","Aš būsiu Lietuvoje savaitę":"🇱🇹","Mes gyvensime viešbutyje":"🏨","Aš aplankysiu draugus":"🧑‍🤝‍🧑","Bus šalta":"❄️","Sėkmingos kelionės!":"🧳","ir":"➕","bet":"↔️","arba":"🔀","nes":"🔗","todėl":"➡️","tada":"⏭️","jau":"✅","dar":"⏳","tik":"☝️","taip pat":"➕","Aš noriu kavos ir pyrago":"🍰","Aš pavargęs, bet laimingas":"😅","Arbatos ar kavos?":"🍵","Aš neinu, nes lyja":"🌧️","Lyja, todėl aš lieku namie":"☔","Pirmiausia pusryčiai, tada darbas":"🍳","Aš jau valgiau":"😌","Aš dar nevalgiau":"🍽️","Aš kalbu tik angliškai":"🇬🇧","Aš taip pat kalbu lietuviškai":"🇱🇹","kai":"🕰️","jeigu":"🤔","kad":"💬","nors":"🤷","vis tiek":"💪","Kai lyja, aš skaitau":"📖","Jeigu nori, ateik":"🚪","Aš manau, kad tai gerai":"👍","Nors šalta, aš einu":"🧣","Aš vis tiek eisiu":"🚶","Aš buvau":"⏮️","Aš buvau namie":"🏠","Aš ėjau":"🚶","Aš važiavau":"🚗","Aš valgiau":"🍽️","Aš gėriau":"🥤","Aš mačiau":"👀","Aš dirbau":"💼","Aš miegojau":"😴","Aš žiūrėjau filmą":"🎬","užvakar":"⏪","praėjusią savaitę":"📅","pernai":"📆","prieš valandą":"🕐","Vakar aš buvau mieste":"🏙️","Aš susitikau su draugu":"🤝","Aš nupirkau dovaną":"🎁","Aš kalbėjau su mama":"📞","Aš skaičiau knygą":"📚","Aš grįžau vėlai":"🌙","Aš nebuvau":"🚫","Aš nemačiau":"🙈","Aš nežinojau":"🤷","Aš pamiršau":"🤦","Aš pavėlavau":"⏰","Buvo smagu":"🥳","Buvo šalta":"🥶","Buvo labai skanu":"😋","Buvo nuobodu":"🥱","Nieko neatsitiko":"😶","Ką veikei vakar?":"⏮️","Kur buvai?":"📍","Ar buvai Vilniuje?":"🏙️","Ką valgei?":"🍽️","Ar matei?":"👀","Kaip praėjo savaitgalis?":"🎉","Ar tau patiko?":"🤔","Man labai patiko":"😍","Man nepatiko":"👎","Kada grįžai?":"🔙","Jis buvo":"👨","Ji buvo":"👩","Mes buvome":"🧑‍🤝‍🧑","Jie buvo":"👬","Jis išvažiavo":"🚗","Ji paskambino":"📞","Mes valgėme restorane":"🍽️","Jie atvažiavo vakar":"🧳","Kas atsitiko?":"😮","Ką jis pasakė?":"💬","Pirmiausia":"1️⃣","Paskui":"2️⃣","Galiausiai":"🏁","Staiga":"⚡","Vakar buvo puiki diena":"☀️","Ryte aš ėjau į parką":"🌳","Paskui mes valgėme picą":"🍕","Galiausiai grįžome namo":"🏠","Tai buvo nuostabu":"🤩","Ir kas tada?":"👂","Vilnius":"🏰","Kaunas":"🏙️","Klaipėda":"⚓","Baltijos jūra":"🌊","lietuvis":"🇱🇹","Aš turiu rezervaciją":"📝","vienai nakčiai":"🌙","dviem naktims":"🌙","Koks Wi-Fi slaptažodis?":"📶","Ar pusryčiai įskaičiuoti?":"🍳","Kada reikia išsiregistruoti?":"🧳","rankšluostis":"🧻","liftas":"🛗","oro kondicionierius":"❄️","karštas vanduo":"♨️","Neveikia":"🔧","Ar galite pakeisti kambarį?":"🔄","registratūra":"🛎️","triukšminga":"🔊","Aš išvykstu rytoj":"🧳","nugara":"🧍","Man skauda koją":"🦵","Man skauda nugarą":"🤕","Man sloga":"🤧","Man svaigsta galva":"😵‍💫","Man reikia vaistų":"💊","Ar turite vaistų nuo galvos skausmo?":"💊","Aš jaučiuosi geriau":"😌","Man reikia gydytojo":"🧑‍⚕️","Iškvieskite greitąją":"🚑","Man skauda čia":"👇","galva":"🗣️","pilvas":"🤰","Aš pasiklydau":"🧭","Aš pamečiau pasą":"🛂","ambasada":"🏛️","Mane apvogė":"🦹","Palikite mane ramybėje":"✋","pavojinga":"⚠️","saugu":"🛡️","šimtas dvylika":"🚨","draudimas":"📄","Ar čia yra vaistinė?":"💊","Aš gerai":"👍","Man skauda gerklę":"🗣️","Man bloga":"🤢","Aš manau":"💭","Man atrodo":"🤔","Aš sutinku":"👍","Aš nesutinku":"👎","Tu teisus":"✅","Tikrai?":"🤨","Be abejo":"💯","Mano nuomone":"🗨️","Kaip tu manai?":"🤔","Priklauso":"⚖️","Įdomu":"🤩","Nuobodu":"🥱","Gražu":"🌅","Keista":"🤪","Svarbu":"❗","Man tas pats":"🤷","Aš manau, kad Vilnius gražus":"🏰","Man atrodo, kad bus lietaus":"🌧️","Aš sutinku su tavimi":"🤝","Aš nesutinku su tavimi":"🙅","Kodėl tu taip manai?":"❓","Nes tai brangu":"💸","Man labiau patinka kava":"☕","Kas geriau?":"⚖️","Arbata geresnė už kavą":"🍵","Taip ir yra":"💯","Beje":"💡","Pavyzdžiui":"👉","Na":"🤔","Žinai ką?":"🤫","Iš tikrųjų":"☝️","Aišku":"👌","Rimtai?":"😳","Papasakok daugiau":"👂","O kaip tavo darbas?":"💼","Kiek laiko tu čia?":"⏳","Ar tau čia patinka?":"😊","Ar dažnai čia būni?":"🔁","Buvo malonu pasikalbėti":"💬","Iki kito karto!":"👋","Susitikime dar kartą":"🤝","gandras":"🐦","briedis":"🦌","Aš turiu šunį":"🐕","gintaras":"🟠","šaltibarščiai":"🥣","rūta":"🌿","Joninės":"🔥","gira":"🍺","Užgavėnės":"🎭","Gedimino pilis":"🏰","Vasario 16-oji":"🇱🇹","Ar nori kavos?":"☕","Aš noriu arbatos":"🍵","Aš valgau mėsą":"🥩","Aš valgau žuvį":"🐟","Dar sriubos?":"🍲","Taip, dar truputį":"🤏","Aš sotus":"😌","Paduok druską, prašau":"🧂","Viskas labai skanu":"😋","Ačiū už viską":"🙏","Apie ką?":"💭","Jei nori":"🤷","Mūsų namai":"🏡","Jūsų pasas":"🛂","Dėl to":"➡️","Štai!":"👉","Daug":"🔢","Visi":"🧑‍🤝‍🧑","Niekas":"🙅","Vėl":"🔁","Aš jį matau":"👀","Aš ją myliu":"❤️","Duok jam":"🤲","Paskambink jai":"📞","Ačiū jums":"🙏","Padėk mums":"🆘","Laukiu tavęs":"⏳","Ar tu mane girdi?":"👂","Tiesiog":"👌","Galbūt":"🤔","Tiesa?":"❓","Tuoj":"⏱️","Klausyk":"👂","Pažiūrėk!":"👀","Turbūt":"🤷","Bent":"☝️","Beveik":"🤏","Visai gerai":"🙂","Aš nenoriu":"🙅","Aš maniau":"💭"};
/* Pictures are for things you can see. Words like these (greetings, I / you / we, a name) get none: one waving hand for
   four greetings, or the same two people for "we" and "you", teach nothing and get mixed up. Each picture also belongs to
   one word only: the first single word in the course that uses it (kava keeps ☕; "Aš geriu kavą" gets none). */
const NO_PIC=new Set(['Prašau','Labas','Sveiki','Iki','Viso gero','Iki pasimatymo','Aš','Tu','Jis','Ji','Mes','Jūs','Jie','Jos','Mano vardas Tomas','Koks tavo vardas?','aukštas','Atsiprašau','Nieko tokio','Malonu susipažinti','Gerai']);
/* Every word's picture is a Twemoji illustration stored in pics/ (same on every phone, works offline),
   or a text tile when the EMOJI value starts with "#" (numbers past ten, days, months). */
function picFile(e){let cps=[...e].map(ch=>ch.codePointAt(0).toString(16));if(!cps.includes('200d'))cps=cps.filter(c=>c!=='fe0f');return 'pics/'+cps.join('-')+'.svg';}
let PIC_COUNT=null;
function picFor(lt){const v=EMOJI[lt];if(!v||NO_PIC.has(lt))return '';if(v[0]==='#')return v;
  if(!PIC_COUNT){PIC_COUNT={};const w=i=>(i.lt.includes(' ')?2:0)+(i.unit.retire?1:0),one=ITEMS.slice().sort((a,b)=>w(a)-w(b));
    one.forEach(i=>{const e=EMOJI[i.lt];if(e&&!NO_PIC.has(i.lt)&&!(e in PIC_COUNT))PIC_COUNT[e]=i.lt;});}return PIC_COUNT[v]===lt?v:'';}
function picHtml(lt,cls){const v=picFor(lt);if(!v)return '';cls=cls||'';
  if(v[0]==='#')return '<span class="pic tile '+cls+'" aria-hidden="true">'+esc(v.slice(1))+'</span>';
  /* (Round 8) the emoji shows straight away and the drawing covers it once loaded, so a slow or missing file is never a blank */
  return '<span class="pic picbox '+cls+'" aria-hidden="true"><span class="pic-e">'+esc(v)+'</span><img src="'+picFile(v)+'" alt="" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"></span>';}
/* Memory hooks: a silly picture or a link to English. Only for words where the hook is genuinely true or useful. */
const HOOK={'Ačiū':'Sounds like a sneeze: AH-choo. Someone says thank you, you hear a sneeze.','Taip':'Sounds like "type". Yes, type it in.','Ne':'Short, like the start of "never". Never = no.',
 'Sveiki':'It literally means "be healthy". You wish strangers good health.','Viso gero':'Literally "all the good". You wish them all the best.','Labanakt':'Laba + nakt. "Nakt" is the same root as "night" (German "Nacht").',
 'Prašau':'The end rhymes with "now", the "ow" of "cow".','Atsiprašau':'Hidden inside is prašau (please). Sorry is a kind of "please forgive".',
 'duona':'Sounds like "dough-nah". Bread is made from dough.','alus':'Sounds like "ale". Beer is ale.','vynas':'Vynas, vine, wine. Same root.','kava':'Like "java", slang for coffee.',
 'du':'Like "duo". Two.','trys':'Trys, three. Same old root.','penki':'Like "penta" in pentagon. Five.','dešimt':'Like "decimal". Ten.',
 'šuo':'SHWOH. "Shoo!" to the dog.','sūnus':'soo-NUS. Son-us: your son.','dukra':'Dukra and "daughter" come from the same ancient word.','naktis':'Naktis, Nacht, night. One family.',
 'ledai':'From ledas, "ice". Ice cream is "the ices".','Skanu!':'skah-NU. So good you scan the plate for more.','vilkas':'Vilkas and "wolf" share an ancient root.',
 'Gerai':'geh-RAI. "Good, right?"','mama':'Easy one: mom.','Labas':'Like "lab": walk into the lab and say hi.'};

/* Split every lesson into bite-size parts of 5 words, then flatten items with ids and back-references */
const BITE=5;
COURSE.forEach(u=>{const out=[];u.lessons.forEach(l=>{const parts=Math.ceil(l.items.length/BITE);
  for(let p=0;p<parts;p++){out.push({id:l.id+'-'+(p+1),title:l.title+(parts>1?' · part '+(p+1):''),items:l.items.slice(p*BITE,(p+1)*BITE)});}});u.lessons=out;});
/* Edition 2, step 3: look-alike sets are spread out. A bite-size part can move to another unit, keeping its id (and everyone's
   progress): five of the colours go to Clothes, and the first family words to About me, where you introduce your family. */
const MOVE_BITES={'u5a-2':['u29','More colours'],'u4a-1':['u20','My family']};
/* A part can also be taught earlier than where it sits in the unit, keeping its id: "I am, you are" comes right after
   the first pronouns, so aš, tu, jis and ji are used in sentences straight away. */
const AFTER_BITES={'u1d-1':'u1c-1'};
const RENAME_BITES={'u5a-1':'Colours','u4a-2':'More family','u1a-2':'Goodbyes','u1b-1':'Yes, no, sorry','u1b-2':'Great, see you, good luck'};
(()=>{const moved={};COURSE.forEach(u=>{u.lessons=u.lessons.filter(l=>{const m=MOVE_BITES[l.id];if(!m||!COURSE.some(x=>x.id===m[0]))return true;
  l.title=m[1];(moved[m[0]]=moved[m[0]]||[]).push(l);return false;});});COURSE.forEach(u=>{Object.entries(AFTER_BITES).forEach(([id,after])=>{const k=u.lessons.findIndex(l=>l.id===id),a=u.lessons.findIndex(l=>l.id===after);
    if(k>=0&&a>=0){const l=u.lessons.splice(k,1)[0];u.lessons.splice(u.lessons.findIndex(x=>x.id===after)+1,0,l);}});});
  COURSE.forEach(u=>{if(moved[u.id])u.lessons=u.lessons.concat(moved[u.id]);u.lessons.forEach(l=>{if(RENAME_BITES[l.id])l.title=RENAME_BITES[l.id];});});})();
const ITEMS=[]; const BYID={};
COURSE.forEach(u=>u.lessons.forEach(l=>{l.unit=u;l.items=l.items.map((raw,i)=>{
  const it={id:l.id+':'+i,lt:raw[0],en:raw[1],note:raw[2]||'',alt:raw[3]||[],lesson:l,unit:u};
  ITEMS.push(it);BYID[it.id]=it;return it;});}));
/* Other right ways to say a card, as people really say them. Typed, they count as right, the same as the card's own answer,
   and they never count as a slip. (Round 3 of the judges: "Kaip tau sekasi?", "Kuo tu vardu?", "Labos nakties", "Prašom",
   "Man irgi" and "O tu?" were all marked wrong.) A native speaker checks the whole list: tools/export_answers.js. */
const ACCEPT={'Kaip sekasi?':['Kaip tau sekasi?','Kaip jums sekasi?','Kaip tu?','Kaip laikaisi?'],
  'Koks tavo vardas?':['Kuo tu vardu?','Kaip tavo vardas?','Kaip tu vadiniesi?','Kaip tave vadina?'],
  'Labanakt':['Labos nakties','Labanaktis','Labą naktį'],'Prašau':['Prašom'],
  'Aš irgi':['Aš taip pat'],'Man irgi gerai':['Man taip pat gerai','Man irgi'],'Ar gali pakartoti?':['Dar kartą, prašau','Gal gali pakartoti?'],'Ar galite pakartoti?':['Dar kartą, prašau','Gal galite pakartoti?'],
  'O tau?':['O tau kaip?','O kaip tau?'],'Dar kartą, prašau':['Ar gali pakartoti?','Ar galite pakartoti?','Gal gali pakartoti?','Gal galite pakartoti?'],'Gerai, ačiū':['Ačiū, gerai'],'Ačiū':['Dėkui','Dėkoju'],
  'Labas rytas':['Labą rytą'],'Laba diena':['Labą dieną'],'Labas vakaras':['Labą vakarą'],
  'Iki pasimatymo':['Iki susitikimo'],'Nieko tokio':['Niekis','Nieko baisaus'],'Malonu susipažinti':['Malonu','Labai malonu susipažinti','Labai malonu','Man malonu'],
  'Taip sau':['Šiaip sau'],'Puikiai':['Puiku'],'Palauk':['Palaukite'],'Neblogai':['Visai neblogai'],'Labai malonu':['Man labai malonu'],'Kuo tu dirbi?':['Ką tu dirbi?'],
  'Ką tu darai?':['Ką tu veiki?','Ką darai?','Ką veiki?'],'Ką jūs darote?':['Ką jūs veikiate?','Ką veikiate?'],'Ką veiki?':['Ką tu veiki?','Ką darai?','Ką tu darai?']};
ITEMS.forEach(it=>{const a=ACCEPT[it.lt];if(a)it.alt=[...new Set((it.alt||[]).concat(a))].filter(x=>x!==it.lt);});
/* (Round 5) Right, with a word about it: "Malonu" alone is what people say, but it's short for the card's phrase. */
const ALT_NOTE={'malonu':'<b>Malonu</b> on its own ("pleased") is fine when you speak. The full phrase is <b>Malonu susipažinti</b>.'};
/* (Round 6) Near misses the course can name. ok:true counts it as Nearly, ok:false explains the miss. */
const NEAR_NOTE={
  /* (Round 8) checked inside a longer reply too: "Gerai, ačiū. O tu?" is the same slip as "O tu?" */
  'o tau':{'o tu':{ok:true,note:'After <b>Kaip sekasi?</b> it is <b>O tau?</b> ("and to you?"): sekasi is a "to me" word (man sekasi, tau sekasi). <b>O tu?</b> is heard too, but <b>O tau?</b> is the right form.'},
    'o tu kaip':{ok:true,note:'After <b>Kaip sekasi?</b> it is <b>O tau?</b> ("and to you?"): sekasi is a "to me" word (man sekasi, tau sekasi).'},
    'o kaip tu':{ok:true,note:'After <b>Kaip sekasi?</b> it is <b>O kaip tau?</b> ("and to you?"): sekasi is a "to me" word (man sekasi, tau sekasi).'}},
  'man irgi':{'aš irgi':{ok:true,note:'"Me too" depends on the first sentence. After a "to me" sentence (Man gerai) it is <b>Man irgi</b>. <b>Aš irgi</b> answers an aš sentence: Aš esu iš Amerikos. Aš irgi.'},
    'aš taip pat':{ok:true,note:'"Me too" depends on the first sentence. After a "to me" sentence (Man gerai) it is <b>Man irgi</b>.'}},
  'man irgi gerai':{'aš irgi gerai':{ok:true,note:'"I am fine too" is a "to me" sentence: <b>Man</b> gerai (to me it is good), so <b>Man irgi gerai</b>. <b>Aš irgi</b> answers an aš sentence: Aš esu iš Amerikos. Aš irgi.'}},
  'aš irgi':{'man irgi':{ok:true,note:'"Me too" depends on the first sentence. After an <b>aš</b> sentence (Aš esu iš Amerikos) it is <b>Aš irgi</b>. <b>Man irgi</b> answers a "to me" sentence: Man gerai, Malonu.'},
    'man taip pat':{ok:true,note:'"Me too" depends on the first sentence. After an <b>aš</b> sentence it is <b>Aš irgi</b>. <b>Man</b> answers a "to me" sentence: Man gerai, Malonu.'}},
  'kaip sekasi':{'o kaip tau':{ok:false,note:'<b>O kaip tau?</b> means "and you?": you say it back after someone asks you. To ask first: <b>Kaip sekasi?</b>'},
    'o tau':{ok:false,note:'<b>O tau?</b> means "and you?": you say it back after someone asks you. To ask first: <b>Kaip sekasi?</b>'}}};
/* In a conversation: answering someone who has just said it to you. "Malonu susipažinti!" → "Man irgi malonu" (me too). */
/* (Round 6) what your own words mean, when you answered in other words than the line's (no course card has them) */
const REPLY_EN={'man irgi':'Me too','man irgi malonu':'Nice to meet you too','ir man malonu':'Nice to meet you too','man taip pat malonu':'Nice to meet you too',
  'labai malonu':'Very nice to meet you','ne ačiū':'No, thanks','taip ačiū':'Yes, thanks','taip prašau':'Yes, please','ačiū ne':'No, thanks','o kaip tau':'And you?','o tau':'And you?'};
const ECHO_OK={'malonu susipažinti':['Man irgi malonu','Man irgi','Ir man malonu','Man taip pat malonu','Labai malonu']};
/* An offer ("Gal arbatos?", "Ar nori kavos?") can be taken or turned down: in Quick chat, both fit. */
const OFFER_OK={re:/^(gal|ar nori|ar norite)\b|^[a-ząčęėįšųūž]+(os|ės|ų|io|ens)$/,say:['Taip, prašau','Taip, ačiū','Ne, ačiū','Ačiū, ne']};
/* A question you can answer "Taip, ..." to: not one that asks how, what, where, who... */
const WH_Q=/^(kaip|kas|ką|kur|iš kur|koks|kokia|kokie|kokį|kokią|kiek|kada|kodėl|kuo|kieno|kam)(\s|$)/;
/* Edition 2, step 4: the very first lesson is what you need on day one: hello, thank you, please, and a whole little
   exchange (Labas! Kaip sekasi? Gerai, ačiū.). The words keep their ids, so their recordings and everyone's progress stay. */
(()=>{const u=COURSE.find(x=>x.id==='u1');const its=['u1a-1:0','u1a-2:3','u1a-2:4','u1b-1:4','u1b-1:3'].map(id=>BYID[id]);if(!u||its.some(i=>!i))return;
  const l={id:'u1a-0',title:'First words',items:its,unit:u,moved:true};its.forEach(i=>{i.lesson.items=i.lesson.items.filter(x=>x!==i);i.lesson=l;});u.lessons.unshift(l);})();
/* Edition 2, step 5: bigger lessons. Five words (under 3 minutes) was too little for a 10-minute plan, so each unit's words are
   grouped into lessons of 6 to 8 (4 to 5 minutes), in the same order. Every word keeps its id, so recordings and progress stay.
   A new lesson is made of parts (the old 5-word lessons it holds) and counts as done for anyone who had finished all of them
   (migrateLessons in index.html). Lessons that were moved in from elsewhere stay as they are. Basics is grouped by hand. */
const LESSON_MAX=8;
const REGROUP={u1:[['u1a-1','u1a-2','Hello and goodbye'],['u1b-1','u1b-2','Yes, no and polite words'],['u1c-1','I, you, he, she'],['u1d-1'],['u1c-2','u1c-3','Names and where you\'re from']]};
COURSE.forEach(u=>u.lessons.forEach(l=>l.items.forEach(i=>{i.sec=l.id.replace(/-\d+$/,'');})));
COURSE.forEach(u=>{if(u.retire)return;const keep=l=>l.moved||MOVE_BITES[l.id];const base=t=>t.replace(/ · part \d+$/,'');
  const make=(items,id,title,parts)=>{const l={id,title,items,unit:u,parts};items.forEach(i=>{i.lesson=l;});return l;};
  if(REGROUP[u.id]){const by={};u.lessons.forEach(l=>by[l.id]=l);const first={};
    REGROUP[u.id].forEach(g=>{const ids=g.filter(x=>by[x]);if(!ids.length)return;const ls=ids.map(x=>by[x]);
      const name=g.length>ids.length?g[g.length-1]:null,l=ls.length===1?ls[0]:make(ls.flatMap(x=>x.items),u.id+'.'+ids.join('+'),name,ids);if(name)l.title=name;ids.forEach((x,k)=>{first[x]=k?null:l;});});
    u.lessons=u.lessons.map(l=>l.id in first?first[l.id]:l).filter(Boolean);return;}
  const out=[];let run=[];
  const flush=()=>{const items=run.flatMap(l=>l.items),n=items.length;if(!n){run=[];return;}const k=Math.ceil(n/LESSON_MAX);
    const groups=[];for(let g=0,at=0;g<k;g++){const size=Math.floor(n/k)+(g<n%k?1:0);groups.push(items.slice(at,at+size));at+=size;}
    /* named after the section most of its words come from (the first one on a tie), numbered when that name repeats */
    const titles=groups.map(gr=>{const c={};gr.forEach(i=>{const b=base(run.find(l=>l.items.includes(i)).title);c[b]=(c[b]||0)+1;});
      return Object.keys(c).reduce((a,b)=>c[b]>c[a]?b:a);});
    groups.forEach((gr,g)=>{const parts=[...new Set(gr.map(i=>run.find(l=>l.items.includes(i)).id))],one=parts.length===1&&run.find(l=>l.id===parts[0]);
      if(one&&one.items.length===gr.length)return out.push(one);
      const same=titles.filter(t=>t===titles[g]).length>1?' · part '+(titles.slice(0,g+1).filter(t=>t===titles[g]).length):'';
      out.push(make(gr,u.id+'.L'+(out.length+1),titles[g]+same,parts));});run=[];};
  u.lessons.forEach(l=>{if(keep(l)){flush();out.push(l);}else run.push(l);});flush();u.lessons=out;});
/* The Sounds unit (loanwords like pica and žirafa) teaches the letters, then retires: its words don't come back in warm-ups,
   reviews or games, and it has no unit check. */
(COURSE.find(u=>u.id==='u0')||{}).retire=true;
/* One speaking lesson per unit: the unit's phrases (multi-word first), shadowed out loud. */
COURSE.forEach(u=>{const all=u.lessons.flatMap(l=>l.items);const phrases=all.filter(i=>i.lt.split(' ').length>1);const words=all.filter(i=>i.lt.split(' ').length===1);
  const pick=phrases.slice(0,6).concat(words.slice(0,Math.max(0,6-phrases.length)));
  u.lessons.push({id:u.id+'-speak',title:'Speak it',items:pick,unit:u,speak:true});});

/* One tip per lesson, written for that lesson's words. <b> marks Lithuanian. */
const LESSON_TIPS={
'u0a-1':'Lithuanian spelling is very regular: most letters keep their sound. Learn the five tricky ones here (<b>c</b>, <b>j</b>, <b>š</b>, <b>ž</b>, <b>č</b>) and you can sound out nearly any word.',
'u0b-1':'A vowel with a line or a hook (<b>ū</b>, <b>ą</b>, <b>ę</b>, <b>į</b>, <b>ų</b>) is held longer, and <b>ė</b> is the "ay" in "day". <b>ie</b> is one sound, "yeh" (muz<b>ie</b>jus). Roll the <b>r</b> by tapping your tongue once behind your top teeth, like a quick "d".',
'u1d-1':'"To be" changes with who: <b>aš esu</b> (I am), <b>tu esi</b> (you are), <b>jis yra</b> and <b>ji yra</b> (he is, she is), <b>mes esame</b> (we are). The verb already says who, so <b>aš</b> and <b>tu</b> are often left out: <b>Esu Tomas.</b>',
'u1a-0':'Your first conversation is already here. <b>Labas! Kaip sekasi?</b> means "Hi! How are you?" and the answer is <b>Gerai, ačiū</b>: "Good, thanks." <b>Prašau</b> is please, and also "you\'re welcome".<br><br><b>Two new letters:</b> <b>č</b> is "ch" (a<b>čiū</b>, "AH-choo") and <b>š</b> is "sh" (pra<b>š</b>au). The line on <b>ū</b> makes it a long "oo".',
'u1a-1':'<b>Labas</b> is for friends and people your age; <b>Sveiki</b> is the safe choice with strangers, older people and groups. Notice <b>laba diena</b>, not labas: diena (day) is a feminine word, so "good" changes to match.',
'u1a-2':'<b>Labanakt</b> is good night, said when someone goes to bed. <b>Viso gero</b> is the full goodbye; <b>iki</b> is the quick "bye" (word for word it means "until").',
'u1b-1':'<b>Taip</b> rhymes with "type", and <b>ne</b> is no. The <b>r</b> in <b>gerai</b> is a quick tap of the tongue. <b>Atsiprašau</b> is sorry and excuse me in one: use it to squeeze past someone or to call a waiter.',
'u1b-2':'Long phrases are easier in chunks: <b>nieko · tokio</b>, <b>iki · pasimatymo</b>. Say <b>sėkmės</b> to someone before an exam, a trip or a game. Which part of a word is strong isn\'t written, so listen to the voice for it.',
'u1c-1':'<b>J</b> is always the "y" in "yes", so <b>ji</b> (she) sounds like "yee" and <b>jis</b> (he) like "yis". Unlike English "I", <b>aš</b> is written small in the middle of a sentence; the words here have a capital only because each one stands alone.',
'u1c-2':'<b>Jūs</b> is both "you all" and the polite "you" for a stranger. <b>Jie</b> is a group of men or a mixed group; <b>jos</b> is only women. <b>Mano vardas</b> means "my name". A man\'s name that ends in a consonant gets <b>-as</b> in '+LANG.en+': Bob becomes <b>Bobas</b>, Mark becomes <b>Markas</b>. So you say <b>Mano vardas Tomas</b>.',
'u1c-3':'<b>Iš</b> means "from", and the country changes its ending after it: Amerika becomes <b>iš Amerikos</b>. You will see this -os ending on lots of places.',
'u21a-1':'<b>Tau</b> means "to you": <b>Kaip sekasi?</b> is really "how is it going?", and <b>O tau?</b> is "and to you?". That\'s why "me too" is <b>Man irgi gerai</b>, "to me also good", with <b>man</b> (to me), not aš.',
'u21a-2':'<b>Aš irgi</b> (me too) is the easiest way to keep a chat going. <b>Ką veiki?</b> is a casual "what are you up to?", and <b>nieko ypatingo</b> is the classic reply.',
'u21b-1':'These are your rescue phrases. Locals often switch to English, so <b>aš truputį kalbu lietuviškai</b> (I speak a little Lithuanian) usually earns you patience instead.',
'u21b-2':'Short and handy: <b>palauk</b> (wait), <b>dar kartą</b> (once more), <b>supratau</b> (got it). Supratau literally means "I understood", which is exactly how people use it.',
'u2a-1':'<b>Du</b>, <b>trys</b> and <b>penki</b> look like "duo", "three" and "penta". Put the stress where the bold is: ke-tu-<b>RI</b>, pen-<b>KI</b>.',
'u2a-2':'<b>Šeši</b> (six) has two "sh" sounds: sheh-SHI. <b>Septyni</b>, <b>aštuoni</b> and <b>devyni</b> all end in -i, so focus on how each one starts.',
'u2b-1':'Eleven to nineteen all end in <b>-lika</b>: vienuo-lika, dvy-lika, try-lika. Learn the start and add -lika. <b>Nulis</b> (zero) is like "null".',
'u2b-2':'Tens end in <b>-dešimt</b> (ten): dvi-dešimt is "two tens", tris-dešimt "three tens". <b>Šimtas</b> (hundred) shares an ancient root with "cent".',
'u2c-1':'<b>Kiek?</b> means both "how many" and "how much". Ages use "to me": <b>man dvidešimt metų</b> is literally "to me twenty years".',
'u2c-2':'The noun after a number changes: <b>vienas euras</b>, <b>du eurai</b>, <b>dešimt eurų</b>. Get it slightly wrong and people still understand. <b>Pirmas</b>, <b>antras</b>, <b>trečias</b> are first, second, third.',
'u13a-1':'Five words unlock every question: <b>kas</b>, <b>kur</b>, <b>kada</b>, <b>kodėl</b>, <b>kaip</b>. Point at something and say <b>Kas tai?</b> (what is that?) and you have asked your first question.',
'u13a-2':'<b>Ar</b> at the start turns a sentence into a yes/no question, like "do" or "is" in English. The <b>-ite</b> ending (galite, kalbate) is the polite form for strangers.',
'u20a-1':'<b>Iš kur tu esi?</b> is literally "from where are you?" Answer with <b>Aš esu iš</b> and a country ending in -os: Lietuvos, Anglijos, Kanados.',
'u20a-2':'Living "in" a city is just an ending, no extra word: Vilnius becomes <b>Vilniuje</b>, London becomes <b>Londone</b>. <b>O tu?</b> bounces any question back.',
'u20b-1':'<b>Kuo tu dirbi?</b> literally asks "as what do you work?" Answer with <b>Aš esu</b> plus your job, or <b>Aš dirbu</b> plus where you work.',
'u20b-2':'Jobs change for women: mokytojas → <b>mokytoja</b>, studentas → <b>studentė</b>, pensininkas → <b>pensininkė</b>. The app accepts both.',
'u8b-1':'<b>Esu</b>, <b>esi</b>, <b>yra</b> are "am", "are", "is". Verbs end in <b>-u</b> for "I" (einu, kalbu), so you can often drop aš and still be understood.',
'u8b-2':'Put <b>ne-</b> on the front of a verb to make it negative: žinau (I know) → <b>nežinau</b> (I don\'t know). It is glued on, with no space.',
'u8c-1':'<b>Lietuviškai</b> and <b>angliškai</b> mean "in Lithuanian" and "in English". Add ne- to suprantu and you have the most useful sentence of all: <b>Aš nesuprantu</b>.',
'u8c-2':'<b>Mes einame</b> (we go) and <b>jie valgo</b> (they eat) show two more endings: -ame for "we", the plain stem for "they". <b>Namo</b> means "homeward", so no "to" is needed.',
'u3a-1':'Words ending in <b>-a</b> (duona, kava, arbata) are usually feminine; words ending in -as, -is or -us are masculine. <b>Vanduo</b> (water) is masculine too, though its ending does not show it: a few words end in <b>-uo</b>. Lithuanian has only these two kinds.',
'u3a-2':'Hold the long vowels: <b>mėsa</b> (meat), <b>sūris</b> (cheese). <b>Kiaušinis</b> (egg) is long, so split it: kyow-SHI-nis.',
'u3b-1':'<b>Obuolys</b> (apple) and <b>bulvė</b> (potato) are everyday staples. <b>Vištiena</b> is chicken meat.',
'u3b-2':'<b>Alus</b> is like "ale" and <b>vynas</b> like "wine": same old roots. <b>Ledai</b> (ice cream) is always plural, literally "ices".',
'u3c-1':'After <b>noriu</b> (I want) the thing changes ending: kava → <b>kavos</b>. After valgau and geriu it ends in -ą or -į: <b>duoną</b>, <b>vandenį</b>. For now, learn each phrase as one chunk.',
'u3c-2':'<b>Skanaus!</b> is said before eating, like "bon appétit". <b>Į sveikatą!</b> ("to health") is for clinking glasses. <b>Sąskaitą, prašau</b> gets you the bill anywhere.',
'u3d-1':'After <b>noriu</b> the thing takes the "some of" ending: <b>arbatos</b>, <b>kavos</b>. After <b>valgau</b> it takes -ą or -į: <b>mėsą</b>, <b>žuvį</b>.',
'u3d-2':'<b>Dar sriubos?</b> offers more; <b>dar truputį</b> says "a little more". A man is <b>sotus</b>, a woman <b>soti</b>. <b>Ačiū už viską</b> thanks your host for everything.',
'u42a-1':'<b>Apie</b> means "about" and <b>jei</b> "if". <b>Mūsų</b> (our) and <b>jūsų</b> (your, polite) never change their ending, like mano and tavo.',
'u42a-2':'<b>Štai!</b> is what you say as you hand something over or point it out. <b>Visi</b> (everyone) and <b>niekas</b> (nobody) are opposites; <b>vėl</b> means again.',
'u42b-1':'<b>Jį</b> (him) and <b>ją</b> (her) are the person you see or love. <b>Jam</b> and <b>jai</b> are "to him" and "to her": duok jam, paskambink jai.',
'u42b-2':'<b>Ačiū jums</b> thanks a stranger or a group. <b>Tavęs</b> is "you" after laukiu (I wait for). <b>Tiesiog</b> (just) and <b>galbūt</b> (perhaps) soften anything you say.',
'u42c-1':'<b>Tiesa?</b> at the end turns a sentence into "right?". <b>Tuoj</b> (in a moment) is the answer when someone calls you. <b>Klausyk</b> and <b>pažiūrėk</b> grab a friend\'s attention.',
'u42c-2':'<b>Turbūt</b> (probably), <b>bent</b> (at least) and <b>beveik</b> (almost) make you sound natural fast. <b>Aš maniau</b> (I thought) is how you admit a mix-up.',
'u15a-1':'<b>Aš norėčiau</b> (I would like) is the polite way to order. Water comes <b>be dujų</b> (still, "without gas") or <b>su dujomis</b> (sparkling, "with gas").',
'u15a-2':'<b>Pusryčiai</b>, <b>pietūs</b> and <b>vakarienė</b> are breakfast, lunch and dinner. <b>Aš nevalgau mėsos</b> is how vegetarians say "I don\'t eat meat".',
'u15b-1':'Most places take a card (<b>kortele</b>), but markets want <b>grynaisiais</b> (cash). <b>Arbatpinigiai</b> means "tea money": around 10% is a normal tip.',
'u15b-2':'<b>Be</b> means without and <b>su</b> means with: be cukraus, su pienu. <b>Šaukštas</b>, <b>šakutė</b> and <b>peilis</b> are spoon, fork and knife.',
'u9a-1':'<b>Miestas</b> (city) and <b>kaimas</b> (village) are the two ends of the map. <b>Parduotuvė</b> (shop) is long, so take it slowly: par-dwoh-tu-VAY.',
'u9a-2':'<b>Stotis</b> is any kind of station. Notice the <b>-inė</b> ending in <b>ligoninė</b> (hospital) and vaistinė (pharmacy): it often marks a place for something.',
'u9b-1':'<b>Kur yra...?</b> (where is...?) works with any place. <b>Kairėn</b> and <b>dešinėn</b> are "to the left / right"; <b>tiesiai</b> is straight on.',
'u9b-2':'Learn opposites in pairs: <b>čia</b>/<b>ten</b> (here/there), <b>arti</b>/<b>toli</b> (near/far). A <b>vaistinė</b> (pharmacy) has a green cross sign.',
'u12b-1':'Holiday wishes all use a "wishing" ending: <b>Linksmų Kalėdų</b>, <b>Laimingų Naujųjų metų</b>. <b>Labai ačiū</b> is just labai (very) + ačiū.',
'u12b-2':'<b>Lėčiau, prašau</b> (slower, please) and <b>Ar galite pakartoti?</b> (can you repeat that?) are the two phrases that keep a conversation going.',
'u13b-1':'<b>Atleiskite</b> gets a stranger\'s attention; <b>atsiprašau</b> is more "sorry". <b>Ar galima?</b> (may I?) plus pointing works for almost anything.',
'u13b-2':'<b>Minutėlę</b> (just a moment) and <b>žinoma</b> (of course) are everyday fillers. <b>Nieko</b> means "nothing", and it is also a casual reply to "thank you".',
'u16a-1':'<b>Ar turite?</b> (do you have?) plus pointing is all you need in a shop. <b>Brangu</b> and <b>pigu</b> (expensive, cheap) are one-word reactions.',
'u16a-2':'<b>Per</b> means "too": per didelis, per mažas. Check the door sign: <b>atidaryta</b> is open, <b>uždaryta</b> is closed.',
'u16b-1':'A <b>turgus</b> is a market; Vilnius\'s Halės turgus is worth a visit. <b>Dovana</b> (gift) and <b>suvenyras</b> (souvenir) are what you will be hunting for.',
'u16b-2':'<b>Tik žiūriu</b> (just looking) politely keeps shop staff at bay. <b>Grąža</b> is your change, and a <b>maišelis</b> is the bag they will offer you.',
'u7a-1':'Weekdays are numbered: <b>pirma-dienis</b> is "first day", <b>antra-dienis</b> "second day", and so on. Learn the numbers and the days come free.',
'u7a-2':'<b>Šeštadienis</b> is "sixth day" (Saturday); <b>sekmadienis</b> (Sunday) is the odd one out. <b>Vakar</b>, <b>šiandien</b>, <b>rytoj</b> are yesterday, today, tomorrow.',
'u7b-1':'You already know two of these: <b>rytas</b> from labas rytas, and <b>vakaras</b> from labas vakaras. <b>Dabar</b> means now.',
'u7b-2':'<b>Metai</b> (year) is always plural. <b>Kiek valandų?</b> literally asks "how many hours?" to mean "what time is it?"',
'u7c-1':'The seasons: <b>pavasaris</b>, <b>vasara</b>, <b>ruduo</b>, <b>žiema</b>. Spring is literally "before summer": pa-vasaris.',
'u7c-2':'Months are named after nature: <b>birželis</b> is birch month, <b>liepa</b> the linden tree, <b>gruodis</b> the month of frozen ground. <b>Kovas</b> is named after a bird, the rook.',
'u23a-1':'<b>Gal</b> (maybe) softens any suggestion: <b>Gal rytoj?</b> To say no politely, use <b>šiandien negaliu</b> or <b>neturiu laiko</b>.',
'u23a-2':'<b>Sutarta!</b> (deal!) closes a plan. <b>Prie</b> means "by" or "at": prie kavinės, by the café.',
'u23b-1':'For "at" a time, use the -tą form plus <b>valandą</b>: <b>septintą valandą</b>, at seven o\'clock. <b>Ryte</b> means in the morning.',
'u23b-2':'<b>Vakare</b> (in the evening) and <b>po pietų</b> (after lunch) narrow down the time. <b>Vėlai</b> and <b>anksti</b> are late and early.',
'u4a-1':'<b>Mama</b> and <b>tėtis</b> are what everyone says, even adults. <b>Sūnus</b> (son) sounds a bit like "son"; <b>brolis</b> is brother.',
'u4a-2':'<b>Dukra</b> and "daughter" come from the same ancient word. <b>Senelis</b> and <b>senelė</b> are grandpa and grandma: -is for him, -ė for her.',
'u4b-1':'<b>Vyras</b> means both "man" and "husband"; <b>žmona</b> is wife. Friends change their ending too: <b>draugas</b> for a man, <b>draugė</b> for a woman.',
'u4b-2':'<b>Tai mano...</b> (this is my...) introduces anyone. After <b>turiu</b> (I have) the noun changes: sesuo → <b>seserį</b>.',
'u25a-1':'Questions with <b>Ar turi...?</b> use the "of" ending: brolių, seserų, vaikų. Answer <b>Ne, neturiu</b> (no, I don\'t) or <b>Aš turiu</b> plus who you have.',
'u25a-2':'<b>Jo</b> is "his" and <b>jos</b> is "her": Koks jo vardas? Koks jos vardas? Living "in" Kaunas is <b>Kaune</b>.',
'u11a-1':'<b>Oras</b> means both "weather" and "air". <b>Saulė</b> (sun) shares its root with "solar".',
'u11a-2':'<b>Lyja</b> (it\'s raining) and <b>sninga</b> (it\'s snowing) need no "it": the verb says it all. <b>Šilta</b> and <b>šalta</b> (warm, cold) differ by one letter, so listen closely.',
'u11b-1':'Feeling words change for a woman; you will meet those forms later. <b>Man karšta</b> (I\'m hot) is literally "to me it\'s hot".',
'u11b-2':'<b>Aš myliu tave</b> (I love you) is for people. For things you like, say <b>man patinka</b> ("to me it pleases").',
'u22a-1':'<b>Man patinka</b> is built backwards: "to me it pleases". Put ne- in front for the opposite: <b>man nepatinka</b>.',
'u22a-2':'Several of these are borrowed: <b>muzika</b>, <b>futbolas</b>, <b>filmai</b>. <b>Knygos</b> (books) and <b>kelionės</b> (trips) are plural, the way people talk about hobbies.',
'u22b-1':'<b>Aš mėgstu</b> (I like doing) plus a verb ending in -ti: skaityti, keliauti, gaminti. That pattern works with any verb you learn.',
'u22b-2':'<b>Aš klausausi muzikos</b> (I listen to music): after "listen" the thing takes the "of" ending. <b>Savaitgalis</b> is "week-end", built just like the English word.',
'u10a-1':'<b>Oro uostas</b> is literally "air port". <b>Bilietas</b> (ticket) and <b>autobusas</b> (bus) look like their English cousins.',
'u10a-2':'<b>Pinigai</b> (money) is always plural. <b>Pasas</b> (passport) and <b>žemėlapis</b> (map) are worth keeping close.',
'u10b-1':'City names change in sentences: <b>į Kauną</b> (to Kaunas), <b>Vilniuje</b> (in Vilnius). <b>Jūra</b> is the sea; the coast is around Klaipėda.',
'u10b-2':'Lithuania has thousands of lakes, so you will hear <b>ežeras</b> a lot. <b>Upė</b> is a river and <b>miškas</b> a forest.',
'u14a-1':'<b>Į</b> plus a place means "to": į Kauną, į centrą. <b>Išvyksta</b> (leaves) and <b>atvyksta</b> (arrives) are "drives out" and "drives in".',
'u14a-2':'<b>Stotelė</b> (bus stop) is a "little station", from stotis. <b>Tvarkaraštis</b> (timetable) is long, so break it up: TVAHR-kah-rahsh-tis.',
'u14b-1':'Taxi phrases use the polite -kite form: <b>sustokite</b> (stop), <b>nuvežkite</b> (take me). Always ask <b>kiek kainuoja</b> before you set off.',
'u14b-2':'Two signs to spot: <b>išėjimas</b> (exit) and <b>įėjimas</b> (entrance). <b>Dviratis</b> is literally a "two-wheeler", a bike.',
'u17a-1':'<b>Vienai nakčiai</b> / <b>dviem naktims</b> = for one night / two nights. <b>Raktas</b> is the key and <b>kambarys</b> the room.',
'u17a-2':'<b>Ar pusryčiai įskaičiuoti?</b> (is breakfast included?) is the most important hotel question. <b>Liftas</b> is the lift.',
'u17b-1':'<b>Neveikia</b> (it doesn\'t work) plus pointing fixes most hotel problems. <b>Karštas vanduo</b> is hot water.',
'u17b-2':'<b>Aukštas</b> means a floor of a building, and also "tall". <b>Triukšminga</b> (noisy) is a good reason to ask <b>Ar galite pakeisti kambarį?</b>',
'u18a-1':'In an emergency, call <b>112</b>; operators speak English. <b>Gelbėkite!</b> is a real "help!", and <b>man reikia gydytojo</b> means "I need a doctor".',
'u18a-2':'<b>Man skauda</b> plus a body part tells a doctor what hurts. If you don\'t know the word, point and say <b>man skauda čia</b>.',
'u18b-1':'<b>Aš pamečiau pasą</b> (I lost my passport) and <b>mane apvogė</b> (I was robbed) are for the police. Your <b>ambasada</b> (embassy) helps after that.',
'u18b-2':'<b>Saugu</b> (safe) and <b>pavojinga</b> (dangerous) are opposites. <b>Šimtas dvylika</b> is 112, the emergency number, said as words.',
'u5a-1':'Colours change for a "her" word: <b>balta duona</b>, white bread. <b>Mėlynas</b> (blue) has a long ė, so hold it.',
'u5a-2':'<b>Rožinis</b> (pink) comes from the word for a rose; <b>oranžinis</b> from orange. <b>Baltas</b> (white) may be where the name "Baltic" comes from.',
'u5b-1':'Opposites stick better in pairs: <b>didelis</b>/<b>mažas</b> (big/small), <b>naujas</b>/<b>senas</b> (new/old). <b>Gražus</b> means beautiful.',
'u5b-2':'Describing words go before the noun and match it: <b>žalias obuolys</b>, <b>balta duona</b>. Swap -as for -a with feminine nouns.',
'u6a-1':'<b>Šuo</b> (dog) sounds like "shoo!". <b>Katė</b> is a cat and <b>karvė</b> a cow.',
'u6a-2':'<b>Višta</b> is a hen, and it is hiding inside vištiena (chicken meat). <b>Pelė</b> (mouse) and <b>triušis</b> (rabbit) are small but common.',
'u6b-1':'<b>Vilkas</b> (wolf) and <b>lokys</b> (bear) live in Lithuania\'s forests. <b>Gandras</b>, the stork, is the national bird.',
'u6b-2':'After turiu, šuo becomes <b>šunį</b>: Aš turiu šunį. <b>Katė miega</b> (the cat is sleeping) is a full sentence: who + what they do.',
'u8a-1':'Dictionary forms end in <b>-ti</b>. For "I", swap it for -u (kalbėti → <b>kalbu</b>); for "you", -i (<b>kalbi</b>). You have been using these all along.',
'u8a-2':'<b>Turėti</b>, <b>norėti</b>, <b>žinoti</b> are the verbs behind turiu, noriu, žinau. Spot the pattern and every new verb gets easier.',
'u12a-1':'<b>Gintaras</b> (amber), this app\'s name, washes up on the Baltic coast. <b>Cepelinai</b> are potato dumplings named after zeppelin airships.',
'u15c-1':'To order, name the dish with an <b>-ą</b> ending and add prašau: <b>sriubą, prašau</b>, <b>arbatą, prašau</b>. With norėčiau it takes the "some of" ending instead: <b>norėčiau sriubos</b>.',
'u16c-1':'<b>Ar turite...?</b> (do you have...?) uses the "some of" ending: obuoliai → <b>obuolių</b>, sūris → <b>sūrio</b>. At a market, <b>tik grynaisiais?</b> checks if they only take cash.',
'u14c-1':'Lithuanian has two verbs for "go": <b>einu</b> on foot, <b>važiuoju</b> by car, bus or train. Both take <b>į</b> + the place: į Kauną, į parduotuvę.',
'u18c-1':'<b>Man skauda</b> plus the body part with an -ą or -ę ending: <b>galvą</b>, <b>pilvą</b>, <b>gerklę</b>. A fever is "having temperature": <b>turiu temperatūros</b>.',
'u27a-1':'<b>Ateinu</b> (I\'m coming) and <b>išeina</b> (he\'s leaving) are built from the verb "to go": at- means towards, iš- means out of. One verb, many directions.',
'u27a-2':'<b>Palauk manęs</b> (wait for me) is what you shout across the street. <b>Sėdžiu</b> and <b>stoviu</b> (sitting, standing) are easy to practise: say them as you do them.',
'u27b-1':'<b>Matau</b> (I see) and <b>matai</b> (you see) show the pattern again: -au for I, -ai for you. <b>Ką tu darai?</b> is the everyday "what are you doing?"',
'u27b-2':'<b>Žiūriu</b> is watching on purpose, <b>matau</b> is just seeing. <b>Juokiuosi</b> (I\'m laughing) ends in -si: you do it to yourself.',
'u27c-1':'<b>Perku</b> (I buy) and <b>moku</b> (I pay) are shop essentials. <b>Duok man</b> is a casual "give me"; add prašau to be polite.',
'u27c-2':'After <b>ieškau</b> (I\'m looking for) the thing takes the "some of" ending: <b>ieškau stoties</b>, I\'m looking for the station. <b>Parduodu</b> (I sell) is "give away for money": par- + duodu.',
'u27d-1':'"We" ends in <b>-me</b> and polite "you" in <b>-te</b>: esa<b>me</b>, esa<b>te</b>, kalba<b>me</b>, kalba<b>te</b>. "They" is the plain stem: jie <b>kalba</b>.',
'u27d-2':'Notice "they" and "he" share a form: jis <b>dirba</b>, jie <b>dirba</b>. The pronoun tells you who. <b>Kartu</b> means together.',
'u28a-1':'<b>Keliuosi</b> and <b>prausiuosi</b> end in -uosi: you do it to yourself (get yourself up, wash yourself). Time goes after the verb: keliuosi <b>septintą valandą</b>.',
'u28a-2':'<b>Kavą</b>, <b>naujienas</b>, <b>darbą</b> all end in -ą/-as because they are the "what" or "where to". <b>Autobusu</b> means "by bus": the -u ending means "using".',
'u28b-1':'<b>Iki penkių</b> means "until five". Meals are verbs: <b>pietauju</b> (I have lunch), <b>vakarieniauju</b> (I have dinner). No "have" needed.',
'u28b-2':'<b>Skambinu mamai</b>: you call "to" someone, so mama → <b>mamai</b>. <b>Einu miegoti</b> is literally "I go to sleep".',
'u28c-1':'Put the how-often word first or right before the verb: <b>visada</b>, <b>dažnai</b>, <b>kartais</b>, <b>retai</b>. With <b>niekada</b> the verb needs ne- too.',
'u28c-2':'<b>Aš niekada nevėluoju</b> has two "not"s, and that is correct in Lithuanian. <b>Kasdien</b> (every day) is one word.',
'u29a-1':'<b>Marškiniai</b> (shirt) and <b>kelnės</b> (trousers) are always plural, even for one. <b>Suknelė</b> and <b>sijonas</b> are dress and skirt.',
'u29a-2':'<b>Striukė</b> is a jacket, <b>paltas</b> a long coat. <b>Džinsai</b> is borrowed from "jeans": dž sounds like the English j.',
'u29b-1':'<b>Ar yra...?</b> means "is there...?": ar yra didesnis? <b>Didesnis</b> and <b>mažesnis</b> are bigger and smaller: -esnis means "more".',
'u29b-2':'<b>Tinka</b> means it fits, and it also means "that works" in general. <b>Aš pagalvosiu</b> (I\'ll think about it) is the polite way out of a shop.',
'u29c-1':'<b>Pirštinės</b> (gloves) and <b>kojinės</b> (socks) come from the words for finger and leg: words built from body parts.',
'u29c-2':'After <b>dėvi</b> (wears) and <b>apsivilk</b> (put on) the clothes take the -ą/-ę ending: kepurė → <b>kepurę</b>, striukė → <b>striukę</b>.',
'u30a-1':'Learn describing words in pairs: <b>aukštas</b>/<b>žemas</b> (tall/short), <b>jaunas</b>/<b>vyresnis</b> (young/older). For a woman, -as becomes -a: aukšta.',
'u30a-2':'Words ending in <b>-us</b> (malonus) become <b>-i</b> for a woman: maloni. <b>Juokingas</b> comes from juoktis, to laugh.',
'u30b-1':'<b>Sunkus</b> means both heavy and difficult; <b>lengvas</b> means both light and easy. One word, two jobs.',
'u30b-2':'Put <b>ne-</b> on a describing word for the opposite: švarus → <b>nešvarus</b> (clean → dirty). <b>Patogus</b> is comfortable.',
'u30c-1':'"Is" is usually left out: <b>Mano brolis aukštas</b> = my brother is tall. Change the ending for a woman: mano sesuo <b>aukšta</b>.',
'u30c-2':'<b>Ši knyga įdomi</b>: knyga is a "her" word, so įdomus becomes <b>įdomi</b>. <b>Nėra</b> is "is not": nėra lengva.',
'u31a-1':'Most jobs end in <b>-ojas</b> or <b>-ėjas</b> for a man and <b>-oja</b> / <b>-ėja</b> for a woman, like <b>mokytojas</b> and <b>mokytoja</b> (teacher).',
'u31a-2':'<b>Policininkas</b> and <b>ūkininkas</b> end in -ininkas, "a person who works with": polic-ija, ūk-is (farm). <b>Vadovas</b> is the boss.',
'u31b-1':'"At" a workplace is an ending: ligoninė → <b>ligoninėje</b>, mokykla → <b>mokykloje</b>. Answer <b>Kur tu dirbi?</b> with Aš dirbu + that ending.',
'u31b-2':'<b>Ieškau darbo</b>: after ieškau the thing takes the "some of" ending. <b>Baigiu penktą</b> means "I finish at five".',
'u32a-1':'<b>Namai</b> is home and is always plural. Rooms end in -ė or -as: <b>virtuvė</b>, <b>vonia</b>, <b>miegamasis</b> (literally "the sleeping one").',
'u32a-2':'<b>Durys</b> (door) is always plural. <b>Langas</b>, <b>stalas</b> and <b>kėdė</b> (window, table, chair) are worth labelling around your own home.',
'u32b-1':'<b>Šaldytuvas</b> (fridge) comes from the word for "to chill". <b>Spinta</b> is any wardrobe or cupboard.',
'u32b-2':'"In" a flat is <b>bute</b>: butas → bute. <b>Kaimynas</b> (neighbour) has kaimas (village) inside it.',
'u32c-1':'Commands to a friend end in <b>-k</b> or <b>-is</b>: <b>sėskis</b> (sit down), <b>jauskis kaip namie</b> (make yourself at home). These are what a host says.',
'u32c-2':'<b>Atidaryk</b> / <b>uždaryk</b> (open / close) and <b>įjunk</b> / <b>išjunk</b> (switch on / off) come in pairs: į- is in, iš- is out.',
'u33a-1':'<b>Galiu</b> + a -ti verb: <b>galiu padėti</b> (I can help). Make it negative with ne-: <b>negaliu</b>.',
'u33a-2':'<b>Moku</b> + verb means "I know how to": moku plaukti (I can swim). <b>Negalima</b> means "not allowed", the word on every no-smoking sign.',
'u33b-1':'"I need" is said "to me it is needed": <b>man reikia</b>. After it, a verb (man reikia eiti) or the "some of" ending (man reikia pinigų).',
'u33b-2':'<b>Turiu</b> + verb means "I have to": turiu dirbti. <b>Noriu</b> + verb is "I want to": noriu miegoti. Same pattern every time.',
'u34a-1':'Future = add <b>-siu</b> for I: būti → <b>būsiu</b>, eiti → <b>eisiu</b>, dirbti → <b>dirbsiu</b>. That is all there is to it.',
'u34a-2':'<b>Grįšiu</b> means "I\'ll come back". <b>Liksiu namie</b> means "I\'ll stay home".',
'u34b-1':'For "you will", use <b>-si</b>: Ką veik<b>si</b> rytoj? <b>Kitą savaitę</b> (next week) and <b>po darbo</b> (after work) say when.',
'u34b-2':'<b>Ar ateisi?</b> (will you come?) → <b>Taip, ateisiu</b>. <b>Pamatysime</b> (we\'ll see) is the friendly non-answer.',
'u34c-1':'<b>Atostogos</b> (holiday) is always plural. <b>Važiuosiu prie jūros</b> means "I\'ll go to the seaside": prie = by, near.',
'u34c-2':'"It will be" is just <b>bus</b>: bus smagu, bus šalta. <b>Sėkmingos kelionės!</b> wishes someone a good trip.',
'u35a-1':'<b>Ir</b> (and), <b>bet</b> (but), <b>arba</b> (or), <b>nes</b> (because), <b>todėl</b> (so). Put a comma before bet, nes and todėl.',
'u35a-2':'<b>Jau</b> (already) and <b>dar</b> (still, yet) are opposites. <b>Tik</b> is "only" and <b>taip pat</b> is "also".',
'u35b-1':'<b>Aš neinu, nes lyja</b>: nes (because) gives the reason. <b>Lyja, todėl...</b> flips it: reason first, then todėl (so).',
'u35b-2':'<b>Aš jau valgiau</b> (I\'ve already eaten) vs <b>aš dar nevalgiau</b> (I haven\'t eaten yet). Jau and dar change the whole meaning.',
'u35c-1':'<b>Kai</b> is "when" in a statement, never in a question. <b>Jeigu</b> (if), <b>kad</b> (that) and <b>nors</b> (although) join two ideas.',
'u35c-2':'<b>Aš manau, kad...</b> is the key opinion phrase: kad means "that". <b>Vis tiek</b> means "anyway".',
'u36a-1':'"I did" ends in <b>-au</b> or <b>-iau</b>: buv<b>au</b>, ėj<b>au</b>, valg<b>iau</b>. <b>Ėjau</b> is on foot, <b>važiavau</b> by car or bus.',
'u36a-2':'<b>Mačiau</b> (I saw) comes from matyti; the t turns into č. <b>Žiūrėjau filmą</b>: the thing you watched still takes -ą.',
'u36b-1':'<b>Užvakar</b> is "the day before yesterday", one word. <b>Praėjusią savaitę</b> is "last week" and <b>prieš valandą</b> "an hour ago".',
'u36b-2':'"With" someone uses <b>su</b> and an ending: su draugu, su mama. <b>Nupirkau</b> (I bought) has nu-, meaning it is done and finished.',
'u36c-1':'Make the past negative with <b>ne-</b>, same as always: nebuvau, nemačiau, nežinojau. <b>Pamiršau</b> (I forgot) is one you will use a lot.',
'u36c-2':'"It was" is <b>buvo</b>: buvo smagu, buvo šalta, buvo nuobodu. Learn buvo and you can describe any day.',
'u37a-1':'Asking about the past, "you" ends in <b>-ai</b> or <b>-ei</b>: kur buv<b>ai</b>? ką veik<b>ei</b>? ką valg<b>ei</b>?',
'u37a-2':'<b>Ar tau patiko?</b> (did you like it?) is the past of man patinka. Answer <b>man labai patiko</b> or <b>man nepatiko</b>.',
'u37b-1':'He, she and they all end in <b>-o</b> in the past: jis buv<b>o</b>, ji buv<b>o</b>, jie buv<b>o</b>. "We" is <b>-ome</b>: buvome.',
'u37b-2':'<b>Kas atsitiko?</b> (what happened?) is the question to ask when something is wrong. <b>Ką jis pasakė?</b> asks what he said.',
'u37c-1':'Story words keep things in order: <b>pirmiausia</b> (first), <b>paskui</b> (after that), <b>galiausiai</b> (finally), <b>staiga</b> (suddenly).',
'u37c-2':'"We" in the past ends in <b>-ome</b> or <b>-ėme</b>: grįž<b>ome</b>, valg<b>ėme</b>. <b>Ir kas tada?</b> keeps a story going.',
'u40a-1':'<b>Ranka</b> is both hand and arm; <b>koja</b> is both leg and foot. Lithuanian doesn\'t split them.',
'u40a-2':'<b>Dantis</b>, <b>nugara</b>, <b>širdis</b> (tooth, back, heart). <b>Plaukai</b> (hair) is always plural.',
'u40b-1':'<b>Man skauda</b> + the body part with an -ą/-į ending: koją, dantį, nugarą. <b>Aš peršalau</b> means "I caught a cold".',
'u40b-2':'<b>Man sloga</b> (runny nose) and <b>man svaigsta galva</b> (I feel dizzy) both start with "to me". <b>Jaučiuosi geriau</b> is "I feel better".',
'u38a-1':'<b>Aš manau</b> (I think) and <b>man atrodo</b> (it seems to me) open any opinion. <b>Sutinku</b> / <b>nesutinku</b> = I agree / disagree.',
'u38a-2':'<b>Tu teisus</b> (you\'re right) changes for a woman: <b>tu teisi</b>. <b>Priklauso</b> (it depends) is the safe answer to anything.',
'u38b-1':'One-word reactions end in <b>-u</b> or <b>-a</b>: įdomu, nuobodu, gražu. They work alone, like "interesting!"',
'u38b-2':'<b>Man tas pats</b> is literally "to me the same": I don\'t mind. <b>Svarbu</b> means important.',
'u38c-1':'<b>Aš manau, kad...</b> then the whole sentence: Aš manau, kad Vilnius gražus. <b>Su tavimi</b> means "with you".',
'u38c-2':'To compare, use <b>geresnė už</b> (better than) or <b>man labiau patinka</b> (I prefer). Taip ir yra closes the argument.',
'u39a-1':'<b>Beje</b> (by the way), <b>pavyzdžiui</b> (for example) and <b>na</b> (well...) buy you time to think. Locals use them constantly.',
'u39a-2':'React to news with <b>negali būti!</b> (no way!), <b>rimtai?</b> (seriously?), <b>kaip gaila</b> (what a pity) or <b>kaip smagu!</b> (how nice!).',
'u39b-1':'Questions keep a chat alive: <b>papasakok daugiau</b> (tell me more), <b>o kaip tavo darbas?</b> When stuck, ask back.',
'u39b-2':'Ending nicely: <b>buvo malonu pasikalbėti</b>, then <b>iki kito karto!</b> Swap numbers with <b>koks tavo numeris?</b>',
'u12a-2':'<b>Krepšinis</b> (basketball) is Lithuania\'s unofficial religion. <b>Vasario 16-oji</b>, 16 February 1918, is Independence Day.',
};
/* Speaking advice for each unit's "Speak it" lesson. */
const SPEAK_TIPS={
'u0':'Say every letter, slowly. Lithuanian rewards care: if you pronounce each letter, you will be understood.',
'u1':'Greetings are all about rhythm. Hit the bold syllable and keep the rest quick and light.',
'u42':'Say each phrase with feeling, the way you would really say it: Pažiūrėk! Tiesa? Aš maniau...',
'u41':'Say each little word inside a phrase you know: Labas, ir ačiū. Gerai, bet truputį.',
'u21':'Real small talk is quick. Say each phrase three times, a little faster each time.',
'u2':'Count out loud on your fingers. Numbers are the easiest words to practise anywhere.',
'u13':'Questions rise at the end, just like in English. Lift your voice on the last word.',
'u20':'Make it true: swap in your own country, city or job as you say each line.',
'u8':'The ending carries the meaning (kalb<b>u</b>, kalb<b>i</b>), so say the last syllable clearly.',
'u3':'Food words are short. Hold the long vowels (ū, ė) a beat longer than feels natural.',
'u15':'Imagine you are at a table: greet the waiter, order, then thank them.',
'u9':'Point as you say the directions: left, right, straight on. Movement helps memory.',
'u19':'Give the polite <b>-kite</b> endings their full weight: aht-LAYS-ki-teh.',
'u16':'Say shop phrases with a smile. It really does change how they sound.',
'u7':'Days are long words. Clap the syllables as you say them.',
'u23':'Say each line as if you are leaving a voice message for a friend.',
'u4':'Listen for the -is / -ė endings: senel<b>is</b>, senel<b>ė</b>. That small sound changes the person.',
'u25':'Answer each question out loud about your own family.',
'u11':'<b>Šilta</b> and <b>šalta</b> differ by one sound, so exaggerate the i and the a.',
'u22':'Talk about what you really like. True sentences stick far better.',
'u10':'Place names change in sentences: listen to how Kaunas becomes Kauną.',
'u14':'Say the ticket phrase with a destination you would really like to visit.',
'u17':'Hotel phrases are long, so practise them in chunks, then join them up.',
'u18':'Practise these calmly now, so they come out easily if you ever need them.',
'u5':'Name the colour of something you can see right now.',
'u6':'Animal words are fun to say loudly. Go for it.',
'u26':'Say the dictionary form, then the "I" form: kalbėti → kalbu.',
'u24':'Say each month with the weather you picture: <b>liepa</b>, šilta; <b>gruodis</b>, šalta.',
'u27':'Say each verb, then act it out: sitting, standing, waiting. Moving while you speak helps it stick.',
'u28':'Talk through your real morning out loud, step by step, in Lithuanian.',
'u29':'Point at what you are wearing and name it.',
'u30':'Describe someone you know in two words: aukštas ir linksmas.',
'u31':'Say your own job, and the job of someone close to you.',
'u32':'Walk around your home and name each room as you enter it.',
'u33':'Say three things you can do and one you can\'t: galiu, negaliu.',
'u34':'Say what you will really do tomorrow. The -siu ending should feel natural by the end.',
'u35':'Join two short sentences with nes or bet. Pause slightly at the comma.',
'u36':'Tell yourself what you did yesterday, in order, out loud.',
'u37':'Ask the questions as if you really want to know: lift your voice at the end.',
'u40':'Touch each body part as you say it. It is silly, and it works.',
'u38':'Give a real opinion about something today: Aš manau, kad...',
'u39':'React out loud with feeling: Negali būti! Rimtai? Expression matters here.',
'u12':'These are proper names, so copy the stress exactly and you will sound local.',
};

/* Sentence patterns: shown on a unit's first lesson as colour-coded slots. Each row is [word, its job]. */
const PATTERNS={
 u1:{name:'Saying hello',rows:[[['Labas','good'],['rytas','time of day']],[['Laba','good'],['diena','time of day']],[['Labas','good'],['vakaras','time of day']]],note:'On its own, <b>labas</b> is "hello"; in front of a time of day it means "good", and changes to match: laba diena, but labas rytas. You will also hear labą dieną, labą vakarą: the same greetings.'},
 u8:{name:'Who + does',rows:[[['Aš','who'],['kalbu','does']],[['Tu','who'],['kalbi','does']]],note:'The ending tells you who: -u for I, -i for you. That is why aš and tu are often left out.'},
 u13:{name:'Asking',rows:[[['Ar','yes/no?'],['tu','who'],['kalbi','does'],['angliškai','how']],[['Kur','question word'],['aš','who'],['esu','am']]],note:'Ar at the start makes a yes/no question. Question words (kur, kas, kada) also go first.'},
 u20:{name:'From where, living where',rows:[[['Aš','who'],['esu','am'],['iš Lietuvos','from where']],[['Aš','who'],['gyvenu','live'],['Vilniuje','where']]],note:'"From" is iš plus a changed ending. "In" is only an ending: Vilnius → Vilniuje.'},
 u3:{name:'Who + does + what',rows:[[['Aš','who'],['valgau','does'],['duoną','what']],[['Aš','who'],['geriu','does'],['vandenį','what']],[['Aš','who'],['noriu','want'],['kavos','some of']]],note:'The "what" changes its ending: duona → duoną. After noriu it means "some of": kava → kavos.'},
 u15:{name:'Ordering politely',rows:[[['Aš','who'],['norėčiau','would like'],['vandens','some of']],[['Kavos','some of'],['su pienu','with what']]],note:'Su (with) and be (without) change the next word too: su pienu, be cukraus.'},
 u9:{name:'Where is…?',rows:[[['Kur','where'],['yra','is'],['stotis','what']],[['Stotis','what'],['yra','is'],['ten','where']]],note:'Word order is flexible. Kur yra stotis? and Stotis yra ten both use the same three pieces.'},
 u14:{name:'Going to a place',rows:[[['Bilietą','what'],['į Kauną','to where'],['prašau','please']],[['Autobusas','what'],['važiuoja','goes'],['į centrą','to where']]],note:'Į (to) changes the place: Kaunas → į Kauną, centras → į centrą.'},
 u5:{name:'Describing words match',rows:[[['žalias','describes'],['obuolys','thing (him)']],[['balta','describes'],['duona','thing (her)']]],note:'Describe a "him" word with -as and a "her" word with -a. The describing word goes first.'},
 u4:{name:'Whose is it?',rows:[[['Tai','this is'],['mano','whose'],['brolis','who']],[['Aš','who'],['turiu','have'],['seserį','what']]],note:'Mano and tavo (my, your) never change. The noun after turiu does.'},
 u11:{name:'"To me it is…"',rows:[[['Man','to me'],['šalta','feeling']],[['Man','to me'],['patinka','it pleases']]],note:'Feelings and likes are said "to me": man šalta (I am cold), man patinka (I like it).'},
 u22:{name:'I like doing',rows:[[['Aš','who'],['mėgstu','like'],['skaityti','doing (-ti)']],[['Aš','who'],['mėgstu','like'],['keliauti','doing (-ti)']]],note:'After mėgstu (I like), noriu (I want) and galiu (I can), use the -ti form of the verb.'},
 u23:{name:'When and what time',rows:[[['Rytoj','when'],['septintą valandą','what time']],[['Gal','maybe'],['rytoj','when']]],note:'Time words usually go first or last. At seven = septintą valandą.'},
 u27:{name:'Who + does (everyone)',rows:[[['Aš','who'],['laukiu','does']],[['Mes','who'],['laukiame','does']],[['Jie','who'],['kalba','does']]],note:'I -u, you -i, we -me, polite you -te, he/she/they the plain stem.'},
 u28:{name:'When + who + does',rows:[[['Kasdien','when'],['aš','who'],['keliuosi','does'],['septintą valandą','what time']],[['Kartais','when'],['aš','who'],['dirbu','does'],['iš namų','from where']]],note:'Time and how-often words usually go first. With niekada the verb takes ne- as well.'},
 u29:{name:'Is there...? / I like this',rows:[[['Ar','yes/no?'],['yra','is there'],['didesnis','what']],[['Man','to me'],['patinka','it pleases'],['ši striukė','what']]],note:'Ši (this) matches a "her" word, šis a "him" word: ši striukė, šis paltas.'},
 u30:{name:'Thing + describing word',rows:[[['Mano brolis','who'],['aukštas','describes']],[['Mano sesuo','who'],['aukšta','describes']],[['Ši knyga','what'],['įdomi','describes']]],note:'"Is" is usually left out. The describing word matches: -as / -a, -us / -i.'},
 u31:{name:'Where I work',rows:[[['Aš','who'],['dirbu','does'],['ligoninėje','where']],[['Aš','who'],['esu','am'],['vairuotojas','what job']]],note:'"At" a place is only an ending: -oje, -ėje, -e.'},
 u32:{name:'Telling someone to do it',rows:[[['Atidaryk','do it!'],['langą','what']],[['Įjunk','do it!'],['šviesą','what']]],note:'Commands to a friend end in -k. The thing after it takes -ą / -į / -ę.'},
 u33:{name:'Can / must / want + verb',rows:[[['Aš','who'],['galiu','can'],['padėti','doing (-ti)']],[['Aš','who'],['turiu','have to'],['dirbti','doing (-ti)']],[['Man','to me'],['reikia','it is needed'],['eiti','doing (-ti)']]],note:'After galiu, turiu, noriu and reikia, the next verb always ends in -ti.'},
 u34:{name:'I will',rows:[[['Rytoj','when'],['aš','who'],['dirbsiu','will do']],[['Vasarą','when'],['aš','who'],['važiuosiu','will do'],['prie jūros','where']]],note:'Future: -siu for I, -si for you, bus for "it will be".'},
 u35:{name:'Joining two ideas',rows:[[['Aš neinu','idea 1'],['nes','because'],['lyja','idea 2']],[['Aš pavargęs','idea 1'],['bet','but'],['laimingas','idea 2']]],note:'A comma goes before bet, nes, todėl and kad.'},
 u36:{name:'I did',rows:[[['Vakar','when'],['aš','who'],['buvau','did'],['mieste','where']],[['Aš','who'],['valgiau','did'],['duoną','what']]],note:'Past for I: -au / -iau. "It was" = buvo.'},
 u37:{name:'Did you...?',rows:[[['Kur','question word'],['buvai','did (you)'],['vakar','when']],[['Mes','who'],['valgėme','did (we)'],['restorane','where']]],note:'You -ai / -ei, he/she/they -o, we -ome / -ėme.'},
 u40:{name:'What hurts',rows:[[['Man','to me'],['skauda','it hurts'],['koją','what']],[['Man','to me'],['svaigsta','it spins'],['galva','what']]],note:'With skauda the body part takes -ą / -į / -ę.'},
 u38:{name:'Giving an opinion',rows:[[['Aš manau','I think'],['kad','that'],['Vilnius gražus','the idea']],[['Arbata','what'],['geresnė už','better than'],['kavą','what']]],note:'After kad comes a whole sentence. Už (than) changes the next word: kava → kavą.'},
 u39:{name:'React, then ask',rows:[[['Rimtai?','react'],['Papasakok daugiau','ask']],[['Kaip smagu!','react'],['O kaip tu?','ask']]],note:'React, then ask a question back. That is the whole secret of small talk.'},
 u26:{name:'One verb, many endings',rows:[[['kalbėti','dictionary (-ti)']],[['aš','who'],['kalbu','-u']],[['tu','who'],['kalbi','-i']]],note:'Every verb you learn works this way: drop the -ti part and add the ending for who.'},
};
/* Small grammar tables. Each one is shown once, above the first gap-fill that uses it (a drill whose answer, or for
   "frame" words its sentence, holds one of its words), and every unit lists the ones so far under "Grammar so far". */
/* (Round 8) A tip doesn't teach a word: every Lithuanian word a tip shows has its own New word card, in that lesson or
   before it on the path. So each old lesson's tip goes with the first lesson (from its own on) whose cards cover the words
   it shows, and the unit tip with its pattern table goes with the first lesson that covers theirs (u.tipAt). A grouped
   lesson's tip is the tips placed in it; a lesson can have none. tools/check_course.js lists a tip no lesson covers. */
const TIP_SHOWS=(()=>{const W=new Set(),tw=s=>(s||'').toLowerCase().replace(/[.,!?;:"'()¿¡·→=+\/…]/g,' ').split(/\s+/).filter(Boolean);
  ITEMS.forEach(i=>tw(i.lt).concat((i.alt||[]).flatMap(tw)).forEach(w=>W.add(w)));
  /* the words a tip shows that a card teaches (a<b>čiū</b> is one word); a word that is also English counts only in bold */
  const EN=new Set('a i o be man is it to me no as at on in so ten bus try re vilnius kaunas klaipėda'.split(' '));
  return h=>{const b=new Set([...(h||'').matchAll(/<b>(.*?)<\/b>/g)].flatMap(m=>tw(m[1].replace(/<[^>]+>/g,''))));
    return [...new Set(tw((h||'').replace(/<\/?b>/g,'').replace(/<[^>]+>/g,' ')).filter(w=>W.has(w)&&!/^(vilnius|kaunas|klaipėda)$/.test(w)&&(b.has(w)||!EN.has(w))))];};})();
const unitTipText=u=>{const p=PATTERNS[u.id];return (u.tip||'')+(p?' '+p.rows.flat().map(x=>'<b>'+x[0]+'</b>').join(' ')+' '+(p.note||''):'');};
(()=>{const OWN=Object.assign({},LESSON_TIPS),known=new Set(),tw=s=>(s||'').toLowerCase().replace(/[.,!?;:"'()¿¡·→=+\/…]/g,' ').split(/\s+/).filter(Boolean);
  const order=PATH.filter(id=>typeof id==='string').map(id=>COURSE.find(x=>x.id===id)).filter(Boolean);
  COURSE.forEach(u=>{if(!order.includes(u))order.push(u);});
  order.forEach(u=>{const at=u.lessons.map(l=>{l.items.forEach(i=>tw(i.lt).concat((i.alt||[]).flatMap(tw)).forEach(w=>known.add(w)));return new Set(known);});
    const place=(h,from)=>{const ws=TIP_SHOWS(h),k=u.lessons.findIndex((l,j)=>j>=from&&!l.speak&&ws.every(w=>at[j].has(w)));return k<0?from:k;};
    const got=u.lessons.map(()=>[]),done=new Set();
    u.lessons.forEach((l,j)=>{if(l.speak)return;(l.parts||[l.id]).forEach(p=>{const t=OWN[p];if(!t||done.has(t))return;done.add(t);got[place(t,j)].push(t);});});
    u.lessons.forEach((l,j)=>{if(l.speak)return;if(got[j].length)LESSON_TIPS[l.id]=got[j].join('<br><br>');else delete LESSON_TIPS[l.id];});
    const first=u.lessons.findIndex(l=>!l.speak);if(first>=0)u.tipAt=u.lessons[place(unitTipText(u),first)].id;});})();

const GRAMMAR=[
 {id:'be',u:'u1',name:'"To be": am, are, is',frame:['esu','esi','yra'],rows:[['aš esu','I am'],['tu esi','you are (to a friend)'],['jis, ji yra','he, she is']],note:'Each "who" has its own form. Yra also means "there is".'},
 {id:'mine',u:'u1',name:'My and your',ans:['mano','tavo'],rows:[['mano','my'],['tavo','your (to a friend)']],note:'These never change: mano vardas, tavo vardas.'},
 {id:'money',u:'u2',name:'How many euros',ans:['eurai','eurų'],rows:[['vienas euras','1 euro'],['du … devyni eurai','2 to 9 euros'],['dešimt eurų','10 to 20 euros']],note:'The number decides the ending of the word after it.'},
 {id:'what',u:'u3',name:'The thing you eat or drink',ans:['duoną','vandenį','žuvį'],rows:[['duona','bread'],['aš valgau duoną','I eat bread'],['aš geriu vandenį','I drink water']],note:'The "what" of a sentence ends in -ą, -į or -ę.'},
 {id:'some',u:'u3',name:'Some of it',ans:['kavos','arbatos','cukraus'],rows:[['kava','coffee'],['noriu kavos','I want (some) coffee'],['noriu arbatos','I want (some) tea']],note:'After noriu the thing takes the "some of" ending: kava → kavos, arbata → arbatos.'},
 {id:'adj',u:'u5',name:'Describing words match',ans:['žalias','balta','aukšta','įdomi','laiminga'],rows:[['žalias obuolys','a green apple (a "him" word)'],['balta duona','white bread (a "her" word)']],note:'-as for a "him" word, -a for a "her" word.'},
 {id:'verb',u:'u8',name:'Who does it: the ending',ans:['kalbu','kalbi','kalba','nesuprantu'],rows:[['aš kalbu','I speak'],['tu kalbi','you speak']],note:'-u for I, -i for you. Ne- in front means "not".'},
 {id:'ask',u:'u13',name:'Asking a question',ans:['ar','kur'],rows:[['Ar tu kalbi angliškai?','Do you speak English? (yes or no)'],['Kur aš esu?','Where am I?'],['Kas tai?','What is this?']],note:'Ar at the start makes a yes/no question. Question words go first too.'},
 {id:'place',u:'u20',name:'From, and in',ans:['lietuvos','vilniuje','kaune'],rows:[['iš Lietuvos','from Lithuania'],['Lietuvoje, Vilniuje','in Lithuania, in Vilnius']],note:'"From" is iš plus a new ending. "In" is only an ending.'},
 {id:'future',u:'u34',name:'I will',ans:['dirbsiu','bus'],rows:[['aš dirbsiu','I will work'],['bus','it will be']],note:'Add -s- before the ending: dirbu → dirbsiu.'},
 {id:'past',u:'u36',name:'I did',ans:['buvau','buvai','valgėme'],rows:[['aš buvau','I was'],['jis, ji buvo','he, she was']],note:'-au for I, -o for he and she.'},
];
function grammarFor(d){const a=norm(d.ans),f=norm(d.frame.replace('___',' ')).split(' ');
  return GRAMMAR.find(g=>(g.ans||[]).includes(a))||GRAMMAR.find(g=>(g.frame||[]).some(w=>f.includes(w))&&f.length<=6);}
/* Fill-the-gap drills: test endings and word order once a unit has taught them. */
/* off: kept for later, not shown, because its answer or choices use words no lesson teaches yet (Round 6) */
const DRILLS=[
 {u:'u1',en:'Good day!',frame:'___ diena!',ans:'Laba',opts:['Labas'],why:'Diena is a "her" word, so labas becomes laba.'},
 {u:'u1',en:'Good evening!',frame:'___ vakaras!',ans:'Labas',opts:['Laba'],why:'Vakaras ends in -as, a "him" word, so labas stays.'},
 /* "I", "you" and "he" in real sentences, for the Who I am lessons */
 {u:'u1',en:'I am from America.',l:['u1c-1','u1c-3','u1d-1'],frame:'___ esu iš Amerikos.',ans:'Aš',opts:['Tu','Jis'],why:'Esu goes with aš: aš esu, I am.'},
 {u:'u1',en:'He is from America.',l:['u1c-1','u1c-3','u1d-1'],frame:'___ yra iš Amerikos.',ans:'Jis',opts:['Aš','Tu'],why:'Yra (is) goes with jis and ji. With aš it would be esu.'},
 {u:'u1',en:'Are you from America?',l:['u1c-1','u1c-3','u1d-1'],frame:'___ esi iš Amerikos?',ans:'Tu',opts:['Aš','Jis'],why:'Esi goes with tu: tu esi, you are. Said as a question, it asks.'},
 {u:'u1',en:'She is Rūta.',l:['u1d-1'],frame:'Ji ___ Rūta.',ans:'yra',opts:['esu','esi'],why:'Yra goes with ji and jis: ji yra, she is.'},
 {u:'u1',en:'Are you Jonas?',l:['u1d-1'],frame:'Tu ___ Jonas?',ans:'esi',opts:['esu','yra'],why:'Esi goes with tu: tu esi, you are.'},
 {u:'u1',en:'We are here.',l:['u1d-1'],frame:'Mes ___ čia.',ans:'esame',opts:['esu','yra'],why:'Esame goes with mes: mes esame, we are.'},
 /* (Round 8) more fill-the-gap on the verb forms on their own (the judges found the esu / esi / yra gap the most useful) */
 {u:'u1',en:'I am Tomas.',l:['u1d-1'],frame:'Aš ___ Tomas.',ans:'esu',opts:['esi','yra'],why:'Esu goes with aš: aš esu, I am.'},
 {u:'u1',en:'He is Jonas.',l:['u1d-1'],frame:'Jis ___ Jonas.',ans:'yra',opts:['esu','esi'],why:'Yra goes with jis and ji: jis yra, he is.'},
 {u:'u1',en:'My name is Tomas.',l:['u1c-2'],frame:'___ vardas Tomas.',ans:'Mano',opts:['Tavo','Aš'],why:'Mano means "my"; aš is "I".'},
 {u:'u1',en:'What is your name?',l:['u1c-2'],frame:'Koks ___ vardas?',ans:'tavo',opts:['mano','tu'],why:'Tavo means "your" (to a friend); tu is "you".'},
 {u:'u21',en:'Fine, thanks. And you?',frame:'Gerai, ačiū. O ___?',ans:'tau',opts:['mano','jis'],why:'After "how are you", bounce it back with O tau?'},
 {u:'u8',en:'You are Tomas.',l:['u8b-1','u8b-2'],frame:'Tu ___ Tomas.',ans:'esi',opts:['esu','yra'],why:'Esi goes with tu: tu esi, you are.'},
 {u:'u8',en:'He is here.',l:['u8b-1','u8b-2'],frame:'Jis ___ čia.',ans:'yra',opts:['esu','esi'],why:'Yra goes with jis and ji: jis yra, he is.'},
 {u:'u8',en:'I speak English.',frame:'Aš ___ angliškai.',ans:'kalbu',opts:['kalbi','kalba'],why:'-u is the ending for "I".'},
 {u:'u8',en:'Do you speak English?',frame:'Ar tu ___ angliškai?',ans:'kalbi',opts:['kalbu','kalba'],why:'-i is the ending for "you".'},
 {u:'u8',en:"I don't understand.",frame:'Aš ___.',ans:'nesuprantu',opts:['suprantu','nesupranti'],why:'Ne- in front means "not", and -u means "I".'},
 {u:'u9',en:'Where is the station?',frame:'___ yra stotis?',ans:'Kur',opts:['Kada','Kas'],why:'Kur means where.'},
 {u:'u13',en:'Do you speak English? (polite)',frame:'___ kalbate angliškai?',ans:'Ar',opts:['Kas','Kur'],why:'Ar turns a sentence into a yes/no question.'},
 {u:'u20',en:'I am from Lithuania.',frame:'Aš esu iš ___.',ans:'Lietuvos',opts:['Lietuva','Lietuvoje'],why:'After iš (from), Lietuva becomes Lietuvos.'},
 {off:'choices not taught yet',u:'u20',en:'I live in Vilnius.',frame:'Aš gyvenu ___.',ans:'Vilniuje',opts:['Vilnius','Vilniaus'],why:'"In" a city is an ending: Vilnius → Vilniuje.'},
 {off:'words not taught yet',u:'u20',en:'I am a teacher. (a woman speaking)',frame:'Aš esu ___.',ans:'mokytoja',opts:['mokytojas','mokytoją'],why:'Women use the -a form of many jobs.'},
 {u:'u2',en:'two euros',frame:'du ___',ans:'eurai',opts:['euras','eurų'],why:'After 2 to 9 the noun takes -ai.'},
 {u:'u2',en:'ten euros',frame:'dešimt ___',ans:'eurų',opts:['eurai','euras'],why:'After 10 and up the noun takes -ų.'},
 {off:'words not taught yet',u:'u7',en:'Monday (literally "first day")',frame:'___dienis',ans:'pirma',opts:['antra','trečia'],why:'Pirmas means first, so pirmadienis is the first day.'},
 {u:'u3',en:'I am eating bread.',frame:'Aš valgau ___.',ans:'duoną',opts:['duona','duonos'],why:'The thing you eat or drink takes the -ą / -į ending.'},
 {u:'u3',en:'I want coffee.',frame:'Aš noriu ___.',ans:'kavos',opts:['kava','kavą'],why:'After noriu the thing takes the "some of" ending: kava → kavos.'},
 {u:'u3',en:'I am drinking water.',frame:'Aš geriu ___.',ans:'vandenį',opts:['vanduo','vandens'],why:'Vanduo becomes vandenį when it is the thing you drink.'},
 {u:'u15',en:'with milk',frame:'su ___',ans:'pienu',opts:['pienas','pieno'],why:'After su (with), pienas becomes pienu.'},
 {u:'u15',en:'without sugar',frame:'be ___',ans:'cukraus',opts:['cukrus','cukrumi'],why:'After be (without), cukrus becomes cukraus.'},
 {off:'choices not taught yet',u:'u9',en:'Where is the bank?',frame:'Kur yra ___?',ans:'bankas',opts:['banke','banko'],why:'After Kur yra, the place keeps its normal form.'},
 {u:'u9',en:'The station is there.',frame:'Stotis yra ___.',ans:'ten',opts:['čia','toli'],why:'Ten means there.'},
 {off:'words not taught yet',u:'u19',en:'Slower, please.',frame:'___, prašau.',ans:'Lėčiau',opts:['Atgal','Tiesiai'],why:'Lėčiau means slower.'},
 {off:'choices not taught yet',u:'u14',en:'A ticket to Kaunas, please.',frame:'Bilietą į ___, prašau.',ans:'Kauną',opts:['Kaunas','Kaune'],why:'Į (to) + place: Kaunas becomes Kauną.'},
 {u:'u14',en:'to the centre',frame:'į ___',ans:'centrą',opts:['centras','centre'],why:'Į changes centras to centrą.'},
 {u:'u16',en:'too big',frame:'___ didelis',ans:'per',opts:['labai','be'],why:'Per means "too".'},
 {u:'u5',en:'white bread',frame:'___ duona',ans:'balta',opts:['baltas','baltą'],why:'Duona is a "her" word, so baltas becomes balta.'},
 {off:'choices not taught yet',u:'u5',en:'a green apple',frame:'___ obuolys',ans:'žalias',opts:['žalia','žalią'],why:'Obuolys is a "him" word, so the colour keeps -as.'},
 {u:'u4',en:'I have a sister.',frame:'Aš turiu ___.',ans:'seserį',opts:['sesuo','sesers'],why:'After turiu, sesuo becomes seserį.'},
 {u:'u4',en:'This is my brother.',frame:'Tai ___ brolis.',ans:'mano',opts:['tavo'],why:'Mano means my.'},
 {u:'u25',en:'What is her name?',frame:'Koks ___ vardas?',ans:'jos',opts:['jo','mano'],why:'Jos is her; jo is his.'},
 {u:'u25',en:'My mom lives in Kaunas.',frame:'Mano mama gyvena ___.',ans:'Kaune',opts:['Kaunas','Kauną'],why:'"In" Kaunas is Kaune.'},
 {u:'u11',en:"I'm cold.",frame:'___ šalta.',ans:'Man',opts:['Aš','Mano'],why:'Feeling cold is said "to me": man šalta.'},
 {off:'words not taught yet',u:'u11',en:'She is happy.',frame:'Ji yra ___.',ans:'laiminga',opts:['laimingas','laimingą'],why:'For a woman, laimingas becomes laiminga.'},
 {u:'u26',en:'to speak → I speak',frame:'kalbėti → aš ___',ans:'kalbu',opts:['kalbi','kalbėti'],why:'Drop the -ėti and add -u for "I".'},
 {u:'u22',en:'I like music.',frame:'Man ___ muzika.',ans:'patinka',opts:['mėgstu','noriu'],why:'Man patinka means "to me it pleases".'},
 {u:'u22',en:'I like to read.',frame:'Aš mėgstu ___.',ans:'skaityti',opts:['skaitau','skaito'],why:'After mėgstu, use the -ti form.'},
 {u:'u23',en:"at seven o'clock",frame:'___ valandą',ans:'Septintą',opts:['Septyni','Septintas'],why:'For "at" a time, use the -tą form.'},
 {off:'words not taught yet',u:'u10',en:'I am going to Klaipėda.',frame:'Važiuoju į ___.',ans:'Klaipėdą',opts:['Klaipėda','Klaipėdoje'],why:'Į + place: Klaipėda becomes Klaipėdą.'},
 {u:'u17',en:'for two nights',frame:'___ naktims',ans:'dviem',opts:['du','dvi'],why:'"For two nights" is a fixed phrase: dviem naktims.'},
 {u:'u18',en:'I need a doctor.',frame:'Man reikia ___.',ans:'gydytojo',opts:['gydytojas','gydytoją'],why:'After reikia, gydytojas becomes gydytojo.'},
 {u:'u27',en:'Are you coming?',l:['u27a-1','u27a-2'],frame:'Ar tu ___?',ans:'ateini',opts:['ateinu'],why:'-i is the ending for "you": tu ateini. Aš ateinu is "I\'m coming".'},
 {u:'u27',en:'I\'m coming!',l:['u27a-1','u27a-2'],frame:'Aš ___!',ans:'ateinu',opts:['ateini'],why:'-u is the ending for "I": aš ateinu.'},
 {u:'u27',en:'What are you doing?',l:['u27b-1','u27b-2'],frame:'Ką tu ___?',ans:'darai',opts:['darau'],why:'Tu darai, you do; aš darau, I do.'},
 {u:'u27',en:'We speak Lithuanian.',l:['u27d-1','u27d-2'],frame:'Mes ___ lietuviškai.',ans:'kalbame',opts:['kalba','kalbate'],why:'"We" ends in -me: mes kalbame.'},
 {u:'u27',en:'You speak Lithuanian (polite).',l:['u27d-1','u27d-2'],frame:'Jūs ___ lietuviškai.',ans:'kalbate',opts:['kalbame','kalba'],why:'Jūs ends in -te: jūs kalbate.'},
 {u:'u27',en:'We are waiting.',frame:'Mes ___.',ans:'laukiame',opts:['laukiu','laukia'],why:'"We" ends in -me.'},
 {u:'u27',en:'They speak.',frame:'Jie ___.',ans:'kalba',opts:['kalbu','kalbame'],why:'"They" uses the plain stem: kalba.'},
 {off:'choices not taught yet',u:'u27',en:'I\'m looking for the station.',frame:'Aš ieškau ___.',ans:'stoties',opts:['stotis','stotį'],why:'After ieškau, stotis becomes stoties.'},
 {off:'words not taught yet',u:'u28',en:'I\'m never late.',frame:'Aš niekada ___.',ans:'nevėluoju',opts:['vėluoju','vėluoji'],why:'With niekada the verb takes ne- too.'},
 {off:'choices not taught yet',u:'u28',en:'I go by bus.',frame:'Aš važiuoju ___.',ans:'autobusu',opts:['autobusas','autobusą'],why:'"By" a vehicle is the -u ending: autobusu.'},
 {u:'u28',en:'I call my mom.',frame:'Aš skambinu ___.',ans:'mamai',opts:['mama','mamą'],why:'You call "to" someone: mama → mamai.'},
 {off:'words not taught yet',u:'u29',en:'I like this jacket.',frame:'Man patinka ___ striukė.',ans:'ši',opts:['šis','šią'],why:'Striukė is a "her" word, so this = ši.'},
 {u:'u29',en:'He is wearing a hat.',frame:'Jis dėvi ___.',ans:'kepurę',opts:['kepurė','kepurės'],why:'The thing you wear takes the -ę ending.'},
 {u:'u30',en:'My sister is tall.',frame:'Mano sesuo ___.',ans:'aukšta',opts:['aukštas','aukštą'],why:'Sesuo is a "her" word, so aukštas becomes aukšta.'},
 {u:'u30',en:'This book is interesting.',frame:'Ši knyga ___.',ans:'įdomi',opts:['įdomus','įdomu'],why:'For a "her" word, -us becomes -i.'},
 {u:'u31',en:'I work in a hospital.',frame:'Aš dirbu ___.',ans:'ligoninėje',opts:['ligoninė','ligoninę'],why:'"In" a place is an ending: ligoninė → ligoninėje.'},
 {u:'u31',en:'I\'m looking for work.',frame:'Aš ieškau ___.',ans:'darbo',opts:['darbas','darbą'],why:'After ieškau, darbas becomes darbo.'},
 {u:'u32',en:'Open the window.',frame:'Atidaryk ___.',ans:'langą',opts:['langas','lango'],why:'The thing you open takes -ą.'},
 {u:'u32',en:'I live in a flat.',frame:'Aš gyvenu ___.',ans:'bute',opts:['butas','butą'],why:'"In" a flat is bute.'},
 {u:'u33',en:'I can help.',frame:'Aš galiu ___.',ans:'padėti',opts:['padėk'],why:'After galiu, use the -ti form.'},
 {off:'choices not taught yet',u:'u33',en:'I need money.',frame:'Man reikia ___.',ans:'pinigų',opts:['pinigai','pinigus'],why:'After reikia, pinigai becomes pinigų.'},
 {u:'u34',en:'Tomorrow I will work.',frame:'Rytoj aš ___.',ans:'dirbsiu',opts:['dirbu','dirbau'],why:'"I will" adds -siu.'},
 {u:'u34',en:'It will be fun!',frame:'___ smagu!',ans:'Bus',opts:['Yra'],why:'Bus = it will be. Buvo = it was.'},
 {u:'u35',en:'I\'m not going because it\'s raining.',frame:'Aš neinu, ___ lyja.',ans:'nes',opts:['bet','ir'],why:'Nes means because.'},
 {u:'u35',en:'I\'m tired but happy.',frame:'Aš pavargęs, ___ laimingas.',ans:'bet',opts:['nes','arba'],why:'Bet means but.'},
 {u:'u35',en:'I think that\'s good.',frame:'Aš manau, ___ tai gerai.',ans:'kad',opts:['kai','nes'],why:'Kad means "that".'},
 {u:'u36',en:'Yesterday I was in town.',frame:'Vakar aš ___ mieste.',ans:'buvau',opts:['esu','būsiu'],why:'"I was" is buvau.'},
 {u:'u36',en:'I met a friend.',frame:'Aš susitikau su ___.',ans:'draugu',opts:['draugas','draugą'],why:'After su (with), draugas becomes draugu.'},
 {u:'u37',en:'Where were you?',frame:'Kur ___?',ans:'buvai',opts:['buvau','buvo'],why:'"You were" ends in -ai.'},
 {u:'u37',en:'We ate at a restaurant.',frame:'Mes ___ restorane.',ans:'valgėme',opts:['valgiau','valgė'],why:'"We" in the past ends in -ėme.'},
 {u:'u40',en:'My leg hurts.',frame:'Man skauda ___.',ans:'koją',opts:['koja','kojos'],why:'With skauda, koja becomes koją.'},
 {u:'u38',en:'Tea is better than coffee.',frame:'Arbata geresnė už ___.',ans:'kavą',opts:['kava','kavos'],why:'After už (than), kava becomes kavą.'},
 {u:'u38',en:'I agree with you.',frame:'Aš sutinku su ___.',ans:'tavimi',opts:['tu','tave'],why:'"With you" is su tavimi.'},
 {u:'u3',en:'I want tea.',frame:'Aš noriu ___.',ans:'arbatos',opts:['arbata','arbatą'],why:'After noriu, the thing takes its "some of" ending: arbata → arbatos.'},
 {u:'u3',en:'I eat fish.',frame:'Aš valgau ___.',ans:'žuvį',opts:['žuvis','žuvies'],why:'The thing you eat takes the -ą / -į ending: žuvis → žuvį.'},
 {u:'u39',en:'Tell me more.',frame:'Papasakok ___.',ans:'daugiau',opts:['dar','labai'],why:'Daugiau means more.'},
 {u:'u6',en:'I have a dog.',frame:'Aš turiu ___.',ans:'šunį',opts:['šuo','šuns'],why:'After turiu, šuo becomes šunį.'},
];
const ROLE_CLASS=r=>/^(who)/.test(r)?'r1':/(does|am|is|live|want|like|have|goes|would|please|-u|-i)/.test(r)?'r2':/(what|thing|some of|doing|dictionary|feeling)/.test(r)?'r3':/(where|to me)/.test(r)?'r4':/(when|time|maybe)/.test(r)?'r5':'r6';
function patternHtml(p){return '<div class="intro tipcard pattern"><h3>🧩 '+esc(p.name)+'</h3>'+p.rows.map((row,i)=>'<div class="prow">'+row.map(([w,r])=>'<span class="slot '+ROLE_CLASS(r)+'"><b>'+esc(w)+'</b>'+(i===0?'<small>'+esc(r)+'</small>':'')+'</span>').join('')+'</div>').join('')+(p.note?'<p class="note">'+p.note+'</p>':'')+'</div>';}

/* ===================== CONVERSATIONS ===================== */
/* Each one uses only what came before it on the path. Lines:
   ['p', lithuanian, english, castIndex?]   the other person
   ['m', lithuanian, english, hint, [[wrong lt, its english], ...]]   your reply
   ['t', label]   a time-skip divider
   ['c', [[lt, english, hint, [lines that follow this choice], wrongs?], ...]]   your choice: every option is a right
      answer, and the conversation goes a different way after each one before joining up again */
/* Conversation voices: everyone in the conversations is their own person, with one of Google's Lithuanian voices
   (recorded by tools/make_voices.py into audio/<voice>_<conversation>.mp3). VOICE_BASE is the everyday voice to fall
   back on for anything not recorded in that voice (like a line with your own name in it). */
const CAST_GV={'Rūta':'kore','Eglė':'aoede','Aldona':'gacrux','Jurgita':'sulafat','Inga':'leda','Darius':'charon','Jonas':'puck','Petras':'algenib','Laura':'laomedeia','Antanas':'schedar','Birutė':'vindemiatrix','Vytautas':'alnilam','Irena':'erinome','Mindaugas':'fenrir','Rasa':'autonoe','Agnė':'callirrhoe','Danutė':'pulcherrima','Daiva':'zephyr','Andrius':'sadachbia','Paulius':'achird'};
const ME_GV={m:'orus',f:'despina'};
const VOICE_BASE={kore:'ona',aoede:'ona',gacrux:'ona',sulafat:'ona',leda:'ona',despina:'ona',charon:'leonas',puck:'leonas',algenib:'leonas',orus:'leonas',laomedeia:'ona',schedar:'leonas',vindemiatrix:'ona',alnilam:'leonas',erinome:'ona',fenrir:'leonas',autonoe:'ona',callirrhoe:'ona',pulcherrima:'ona',zephyr:'ona',sadachbia:'leonas',achird:'leonas'};
const CAST_LOOK={'Rūta':'41.0.0.15.1.2.10.5.2','Jonas':'1.3.0.4.3.3.6.8.3','Eglė':'45.0.0.12.5.1.14.2.4','Petras':'42.8.0.16.7.4.2.11.5',
  'Aldona':'61.0.11.24.4.5.20.6.6','Darius':'33.1.0.6.9.2.8.9.7','Jurgita':'23.0.3.20.6.1.18.4.8','Inga':'37.0.0.22.2.3.12.7.1',
  'Vytautas':'50.5.3.10.4.3.6.12.6','Irena':'23.0.2.18.5.2.16.3.4','Mindaugas':'1.6.0.7.8.4.9.14.3','Rasa':'45.0.4.19.3.2.12.6.7','Agnė':'41.0.0.21.2.5.18.2.3','Danutė':'61.0.6.23.4.4.20.5.2','Daiva':'45.0.3.24.2.2.10.3.4','Andrius':'1.0.0.25.7.3.4.9.6','Paulius':'33.2.0.8.5.1.6.11.8'};
const CONVS=[
{id:'cv1',title:'Labas, Rūta!',cast:[{name:'Rūta',voice:'ona'},{name:'Darius',voice:'leonas'}],scene:'You are Tomas, on your first day in Vilnius. It\'s late morning, the café is busy, and the only free seat is next to a woman with a coffee.',lines:[
 ['p','Labas rytas!','Good morning!'],
 ['m','Labas rytas!','Good morning!','Say good morning back',[['Labanakt!','Good night!'],['Viso gero!','Goodbye!']]],
 ['p','Prašau.','Please. (She points at the free seat.)'],
 ['m','Ačiū!','Thank you!','Thank her',[['Atsiprašau!','Sorry!'],['Sėkmės!','Good luck!']]],
 ['p','Aš esu Rūta. Koks tavo vardas?','I\'m Rūta. What\'s your name?'],
 ['m','Mano vardas Tomas.','My name is Tomas.','Tell her your name',[['Aš esu iš Amerikos.','I am from America.'],['Taip.','Yes.']]],
 ['p','Malonu susipažinti, Tomai!','Nice to meet you, Tomas!'],
 ['m','Malonu susipažinti!','Nice to meet you!','Say it\'s nice to meet her too',[['Iki pasimatymo!','See you later!'],['Nieko tokio!','No problem!']]],
 ['p','Kaip sekasi?','How are you?'],
 ['c',[
   ['Puikiai!','Great!','Say you are doing great',[['p','Aš irgi!','Me too!']],[['Ne.','No.'],['Labas vakaras!','Good evening!']]],
   ['Gerai, ačiū.','Fine, thanks.','Say you are fine, thanks',[['p','Aš irgi, ačiū!','Me too, thanks!']],[['Ne.','No.'],['Labas!','Hi!']]],
 ]],
 ['p','Iš kur tu esi?','Where are you from?'],
 ['m','Aš esu iš Amerikos.','I am from America.','Say where you are from',[['Mano vardas Tomas.','My name is Tomas.'],['Gerai.','OK.']]],
 ['t','Rūta smiles: "Oh, how nice!" Then the waiter comes over'],
 ['p','Laba diena! Kavos?','Good day! Coffee?',1],
 ['m','Laba diena! Ne, ačiū.','Good day! No, thanks.','Say good day, and no thanks',[['Labanakt! Taip.','Good night! Yes.'],['Sėkmės! Prašau.','Good luck! Please.']]],
 ['p','Arbatos?','Tea?',1],
 ['m','Taip, prašau.','Yes, please.','Say yes, please',[['Atsiprašau.','Sorry.'],['Iki!','Bye!']]],
 ['t','Rūta\'s phone rings'],
 ['p','Atsiprašau!','Sorry!'],
 ['m','Nieko tokio!','No problem!','Tell her it\'s no problem',[['Labas rytas!','Good morning!'],['Malonu susipažinti!','Nice to meet you!']]],
 ['t','It was her new job: her interview starts in ten minutes, and she has to run'],
 ['m','Sėkmės! Iki pasimatymo!','Good luck! See you later!','Wish her luck and say see you later',[['Labanakt! Taip.','Good night! Yes.'],['Prašau! Atsiprašau!','Please! Sorry!']]],
 ['p','Ačiū! Viso gero, Tomai!','Thanks! Goodbye, Tomas!'],
 ['m','Viso gero!','Goodbye!','Say goodbye',[['Labas rytas!','Good morning!'],['Prašau.','Please.']]],
]},
{id:'cv16',title:'Dar kartą, prašau',cast:[{name:'Rūta',voice:'ona'}],scene:'The next day you meet Rūta again, on a bench by the river. She talks fast. That\'s fine: you know how to slow her down.',lines:[
 ['p','Labas, Tomai! Kaip sekasi?','Hi, Tomas! How are you?'],
 ['c',[
   ['Gerai, ačiū. O tau?','Fine, thanks. And you?','Say you\'re fine and ask her back',[['p','Man irgi gerai!','I\'m fine too!']],[['Iki!','Bye!'],['Supratau.','Got it.']]],
   ['Neblogai. O tau?','Not bad. And you?','Say not bad and ask her back',[['p','Man irgi neblogai.','Not bad either.']],[['Iki!','Bye!'],['Palauk.','Wait.']]],
   ['Taip sau. O tau?','So-so. And you?','Say so-so and ask her back',[['p','Man gerai, ačiū.','I\'m fine, thanks.']],[['Iki!','Bye!'],['Teisingai.','That\'s right.']]],
 ]],
 ['p','Ką veiki?','What are you up to?'],
 ['m','Nieko ypatingo. Aš mokausi.','Nothing special. I\'m learning.','Say nothing special, you\'re learning',[['Labai malonu. Ir tau.','Very nice. You too.'],['Dar kartą. Palauk.','One more time. Wait.']]],
 ['p','Gerai! Lietuviškai?','Good! Lithuanian?'],
 ['m','Aš truputį kalbu lietuviškai.','I speak a little Lithuanian.','Say you speak a little Lithuanian',[['Ką reiškia šis žodis?','What does this word mean?'],['Nieko ypatingo.','Nothing special.']]],
 ['p','Einame pasivaikščioti?','Shall we go for a walk? (She says it very fast.)'],
 ['m','Palauk! Aš nelabai suprantu.','Wait! I don\'t quite understand.','Stop her: say wait, you don\'t quite understand',[['Aš irgi. Ačiū.','Me too. Thanks.'],['Supratau! Teisingai!','Got it! That\'s right!']]],
 ['p','Nieko tokio!','No problem!'],
 ['m','Ar gali pakartoti?','Can you repeat that?','Ask her to repeat it',[['Kaip sekasi?','How are you?'],['Ir tau.','You too.']]],
 ['p','Einame... pasivaikščioti?','Shall we... go for a walk?'],
 ['m','Ką reiškia šis žodis?','What does this word mean?','Ask what this word means',[['Aš irgi.','Me too.'],['Labai malonu.','Very nice.']]],
 ['p','Pasivaikščioti... štai taip!','To go for a walk... like this! (She walks two fingers along the bench.)'],
 ['m','Supratau! Taip, gerai.','Got it! Yes, OK.','Say you got it, and yes, OK',[['Dar kartą?','One more time?'],['Labanakt!','Good night!']]],
 ['t','Walking by the river'],
 ['m','Kaip tai pasakyti lietuviškai?','How do you say that in Lithuanian?','Point at the river and ask how to say it in Lithuanian',[['Ką veiki?','What are you up to?'],['Aš mokausi.','I\'m learning.']]],
 ['p','Upė.','River.'],
 ['m','Dar kartą, prašau.','One more time, please.','Ask her to say it one more time',[['Nieko ypatingo.','Nothing special.'],['Labas rytas.','Good morning.']]],
 ['p','Upė... upė.','River... river. (Slowly.)'],
 ['m','Ačiū! Supratau.','Thanks! Got it.','Thank her and say you got it',[['Taip sau.','So-so.'],['Palauk.','Wait.']]],
 ['p','Teisingai! Puikiai!','That\'s right! Great!'],
 ['m','Ačiū! Labai malonu.','Thanks! Very nice.','Thank her, and say that\'s very nice',[['Ar gali pakartoti?','Can you repeat that?'],['Neblogai.','Not bad.']]],
 ['p','Man čia labai gerai.','I really like it here.'],
 ['m','Man irgi!','Me too!','Say you do too',[['Ir tau!','You too!'],['Palauk!','Wait!']]],
 ['p','Iki, Tomai! Sėkmės!','Bye, Tomas! Good luck!'],
 ['m','Ir tau! Iki!','You too! Bye!','Say you too, and bye',[['Aš irgi! Labas!','Me too! Hi!'],['Supratau! Ačiū!','Got it! Thanks!']]],
]},
{id:'cv17',title:'Kalbų vakaras',cast:[{name:'Laura',voice:'ona'}],scene:'Rūta takes you to a language evening at a café, where people swap languages over tea. A woman called Laura sits down next to you.',lines:[
 ['p','Labas! Aš esu Laura. Tu esi Tomas?','Hi! I\'m Laura. Are you Tomas?'],
 ['m','Taip, aš esu Tomas.','Yes, I am Tomas.','Say yes, you are Tomas',[['Ne, ačiū.','No, thanks.'],['Aš miegu.','I\'m sleeping.']]],
 ['p','Malonu! Ar tu kalbi lietuviškai?','Nice to meet you! Do you speak Lithuanian?'],
 ['m','Aš kalbu truputį lietuviškai.','I speak a little Lithuanian.','Say you speak a little Lithuanian',[['Aš nežinau.','I don\'t know.'],['Jie valgo.','They are eating.']]],
 ['p','Labai gerai! O aš mokausi anglų kalbos.','Very good! And I\'m learning English.'],
 ['m','Ar tu kalbi angliškai?','Do you speak English?','Ask if she speaks English',[['Aš dirbu.','I work.'],['Aš esu Tomas.','I am Tomas.']]],
 ['p','Truputį. Čia lietuviškai, prašau!','A little. Lithuanian here, please!'],
 ['m','Gerai! Aš mokausi lietuvių kalbos.','OK! I\'m learning Lithuanian.','Say OK, you are learning Lithuanian',[['Aš miegu.','I\'m sleeping.'],['Labanakt!','Good night!']]],
 ['p','Ar tu gyveni Lietuvoje?','Do you live in Lithuania?'],
 ['m','Taip, aš gyvenu Lietuvoje.','Yes, I live in Lithuania.','Say yes, you live in Lithuania',[['Ne, aš nesuprantu.','No, I don\'t understand.'],['Taip, aš skaitau.','Yes, I read.']]],
 ['p','O tu dirbi?','And do you work?'],
 ['c',[
   ['Taip, aš dirbu.','Yes, I work.','Say yes, you work',[['p','Aš irgi dirbu!','I work too!']],[['Aš nežinau.','I don\'t know.'],['Jie valgo.','They are eating.']]],
   ['Ne, aš mokausi.','No, I\'m learning.','Say no, you are learning',[['p','Puiku! Aš irgi mokausi.','Great! I\'m learning too.']],[['Aš miegu.','I\'m sleeping.'],['Labanakt!','Good night!']]],
 ]],
 ['p','Ar nori arbatos, ar kavos, ar vandens, ar...','Would you like tea, or coffee, or water, or... (She says it all very fast.)'],
 ['m','Atsiprašau, aš nesuprantu.','Sorry, I don\'t understand.','Say sorry, you don\'t understand',[['Aš suprantu.','I understand.'],['Aš esu Tomas.','I am Tomas.']]],
 ['p','Arbatos? Kavos?','Tea? Coffee?'],
 ['m','Taip, aš noriu. Ačiū!','Yes, I\'d like one. Thanks!','Say yes, you\'d like one, and thank her',[['Ne, aš miegu.','No, I\'m sleeping.'],['Aš nežinau. Labanakt!','I don\'t know. Good night!']]],
 ['t','Laura comes back with two cups'],
 ['p','Prašau. O ką tu skaitai?','Here you go. And what are you reading?'],
 ['m','Aš skaitau lietuviškai!','I\'m reading in Lithuanian!','Say you are reading in Lithuanian',[['Aš kalbu angliškai.','I speak English.'],['Aš dirbu.','I work.']]],
 ['p','Puiku! O Rūta? Ar ji čia?','Great! And Rūta? Is she here?'],
 ['m','Ne, aš nežinau.','No, I don\'t know.','Say no, you don\'t know',[['Taip, aš miegu.','Yes, I\'m sleeping.'],['Aš esu Tomas.','I am Tomas.']]],
 ['p','Atsiprašau, mes einame namo.','Sorry, we\'re going home now.'],
 ['m','Gerai. Iki pasimatymo!','OK. See you later!','Say OK, see you later',[['Labas rytas!','Good morning!'],['Aš nesuprantu.','I don\'t understand.']]],
 ['p','Iki! Tu gerai kalbi lietuviškai!','Bye! You speak Lithuanian well!'],
 ['m','Ačiū! Labanakt!','Thanks! Good night!','Thank her and say good night',[['Labas rytas!','Good morning!'],['Aš valgau.','I\'m eating.']]],
]},
{id:'cv18',title:'Kur tu?',cast:[{name:'Rūta',voice:'ona'},{name:'Jonas',voice:'leonas'}],scene:'You are meeting Rūta and Jonas at the station for a day trip, but you are running late. Rūta texts you.',lines:[
 ['p','Labas! Ką tu darai?','Hi! What are you doing?'],
 ['m','Labas! Aš perku duoną.','Hi! I\'m buying bread.','Say hi, you are buying bread',[['Aš juokiuosi.','I\'m laughing.'],['Aš ilsiuosi.','I\'m resting.']]],
 ['p','Mes laukiame stotyje. Ar tu ateini?','We\'re waiting at the station. Are you coming?'],
 ['m','Taip, aš ateinu! Aš skubu.','Yes, I\'m coming! I\'m in a hurry.','Say yes, you\'re coming, and you\'re in a hurry',[['Ne, aš sėdžiu.','No, I\'m sitting.'],['Aš žiūriu televizorių.','I\'m watching TV.']]],
 ['p','Kur tu?','Where are you?'],
 ['m','Aš ieškau stoties.','I\'m looking for the station.','Say you are looking for the station',[['Aš perku duoną.','I\'m buying bread.'],['Aš rašau.','I\'m writing.']]],
 ['p','Ar tu matai? Mes čia, stotyje!','Can you see it? We\'re here, at the station!'],
 ['c',[
   ['Taip, aš matau!','Yes, I see it!','Say yes, you see it',[['p','Puiku! Mes laukiame.','Great! We\'re waiting.']],[['Aš girdžiu.','I hear.'],['Aš pamirštu.','I forget.']]],
   ['Palauk, aš galvoju...','Wait, I\'m thinking...','Say wait, you\'re thinking',[['p','Gerai. Mes laukiame!','OK. We\'re waiting!']],[['Aš juokiuosi.','I\'m laughing.'],['Aš duodu.','I give.']]],
 ]],
 ['t','A few minutes later, at the station'],
 ['p','Labas, Tomai!','Hi, Tomas!',1],
 ['m','Labas! Ką jūs darote?','Hi! What are you doing?','Say hi and ask what they are doing',[['Aš parduodu duoną.','I\'m selling bread.'],['Mes miegame.','We\'re sleeping.']]],
 ['p','Labas! Aš perku bilietus.','Hi! I\'m buying the tickets.'],
 ['m','Ačiū! Aš moku.','Thanks! I\'ll pay.','Thank them and say you\'ll pay',[['Aš pamirštu.','I forget.'],['Duok man.','Give me.']]],
 ['p','Ne, ne! Aš moku.','No, no! I\'m paying.'],
 ['m','Ačiū, Rūta!','Thanks, Rūta!','Thank Rūta',[['Atsiprašau, Rūta!','Sorry, Rūta!'],['Labanakt, Rūta!','Good night, Rūta!']]],
 ['p','Ar tu girdi?','Do you hear that? (The train is coming in!)',1],
 ['m','Taip, aš girdžiu! Palauk manęs!','Yes, I hear it! Wait for me!','Say yes, you hear it, and ask him to wait for you',[['Aš ilsiuosi.','I\'m resting.'],['Aš stoviu.','I\'m standing.']]],
 ['p','Einame, einame!','Come on, let\'s go!'],
 ['m','Taip, einame!','Yes, let\'s go!','Say yes, let\'s go',[['Ne, aš sėdžiu.','No, I\'m sitting.'],['Aš grįžtu namo.','I\'m going back home.']]],
]},
{id:'cv19',title:'Atsiprašau!',cast:[{name:'Antanas',voice:'leonas'}],scene:'You are meeting Rūta at a café in the old town, but you have lost your way. A man called Antanas is walking his dog nearby.',lines:[
 ['t','In the old town'],
 ['m','Atsiprašau!','Excuse me!','Get the man\'s attention',[['Labanakt!','Good night!'],['Nieko tokio.','No problem.']]],
 ['p','Taip? Kas yra?','Yes? What is it?'],
 ['m','Ar galite man padėti?','Can you help me?','Ask if he can help you',[['Ar galite man pakartoti?','Can you repeat to me?'],['Kodėl?','Why?']]],
 ['p','Taip, taip!','Yes, of course!'],
 ['t','His dog jumps up at you'],
 ['m','Kas tai?','What\'s that?','Ask what that is',[['Kada?','When?'],['Kuris?','Which one?']]],
 ['p','Tai Reksas!','That\'s Reksas! (Her dog wags his tail.)'],
 ['m','Kur aš esu?','Where am I?','Ask where you are',[['Kas aš esu?','Who am I?'],['Kada aš esu?','When am I?']]],
 ['p','Jūs esate čia: senamiestis.','You are here: the senamiestis.'],
 ['m','Atsiprašau, ką tai reiškia?','Sorry, what does that mean?','Say sorry, and ask what that means',[['Kaip sekasi?','How are you?'],['Kodėl?','Why?']]],
 ['p','Senamiestis... štai! Ar kalbate angliškai?','The senamiestis... here, look! (She points at the old houses: the old town.) Do you speak English?'],
 ['c',[
   ['Taip. Aš mokausi lietuvių kalbos.','Yes. I\'m learning Lithuanian.','Say yes, and that you\'re learning Lithuanian',[['p','Puiku! Tada kalbame lietuviškai.','Great! Then we\'ll speak Lithuanian.']],[['Ne. Aš miegu.','No. I\'m sleeping.'],['Nieko.','Nothing.']]],
   ['Truputį. Ar jūs kalbate angliškai?','A little. Do you speak English?','Say a little, and ask if he speaks English',[['p','Ne, tik lietuviškai!','No, only Lithuanian!']],[['Taip sau.','So-so.'],['Kada?','When?']]],
 ]],
 ['p','Gerai. Kur?','OK. Where to?'],
 ['m','Kur yra restoranas?','Where is the restaurant?','Ask where the restaurant is',[['Kur yra Rūta?','Where is Rūta?'],['Kada yra restoranas?','When is the restaurant?']]],
 ['p','Restoranas? Tiesiai, tiesiai, paskui dešinėn, ir...','The restaurant? Straight, straight, then right, and... (She says it very fast.)'],
 ['m','Palauk! Dar kartą, prašau.','Wait! One more time, please.','Ask him to wait and say it one more time',[['Supratau! Ačiū.','Got it! Thanks.'],['Kodėl? Kaip?','Why? How?']]],
 ['p','Tiesiai. Paskui dešinėn.','Straight. Then right.'],
 ['m','Supratau! Labai ačiū!','Got it! Thank you very much!','Say you got it, and thank him a lot',[['Kas tai?','What\'s that?'],['Ką tai reiškia?','What does that mean?']]],
 ['p','Nieko! O kodėl jūs čia, Vilniuje?','Not at all! And why are you here, in Vilnius?'],
 ['m','Aš gyvenu Lietuvoje ir mokausi.','I live in Lithuania and I\'m learning.','Say you live in Lithuania and you\'re learning',[['Aš nežinau, kur aš esu.','I don\'t know where I am.'],['Kada aš gyvenu?','When do I live?']]],
 ['p','Puiku! Sėkmės!','Great! Good luck!'],
 ['m','Ačiū! Viso gero!','Thanks! Goodbye!','Thank him and say goodbye',[['Labas rytas!','Good morning!'],['Kur aš esu?','Where am I?']]],
]},
{id:'cv2',title:'Meet Jonas',cast:[{name:'Jonas',voice:'leonas'}],scene:'Rūta brings you to a party and introduces her friend Jonas.',lines:[
 ['p','Labas! Aš esu Jonas.','Hi! I am Jonas.'],
 ['m','Labas! Mano vardas Tomas.','Hi! My name is Tomas.','Say hi and tell him your name',[['Labanakt! Aš nežinau.','Good night! I don\'t know.'],['Ačiū! Aš esu studentas.','Thanks! I am a student.']]],
 ['p','Malonu. Iš kur tu esi?','Nice to meet you. Where are you from?'],
 ['m','Aš esu iš Amerikos. O tu?','I am from America. What about you?','Say where you are from and ask him',[['Aš gyvenu Vilniuje.','I live in Vilnius.'],['Kuo tu dirbi?','What do you do for work?']]],
 ['p','Aš esu iš Kauno. Kur tu gyveni?','I\'m from Kaunas. Where do you live?'],
 ['m','Aš gyvenu Vilniuje. O tu?','I live in Vilnius. What about you?','Say you live in Vilnius and ask him back',[['Aš esu iš Lietuvos.','I am from Lithuania.'],['Aš dirbu biure.','I work in an office.']]],
 ['p','Aš irgi gyvenu Vilniuje, senamiestyje.','I live in Vilnius too, in the old town.'],
 ['m','Kuo tu dirbi?','What do you do for work?','Ask what he does for work',[['Kur tu gyveni?','Where do you live?'],['Kaip sekasi?','How are you?']]],
 ['p','Aš esu mokytojas.','I am a teacher.'],
 ['m','Ar tau patinka tavo darbas?','Do you like your job?','Ask if he likes his job',[['Ar tu lietuvis?','Are you Lithuanian?'],['Iš kur tu esi?','Where are you from?']]],
 ['p','Taip, mano darbas įdomus! O kuo tu dirbi?','Yes, my job is interesting! And what do you do?'],
 ['c',[
   ['Aš esu studentas.','I am a student.','Say you are a student',[
     ['p','Puiku! Ką tu studijuoji?','Great! What do you study?'],
     ['m','Aš mokausi lietuvių kalbos.','I\'m learning Lithuanian.','Say you are learning Lithuanian',[['Aš dirbu iš namų.','I work from home.'],['Aš esu iš Kanados.','I am from Canada.']]]],
     [['Aš esu mokytojas.','I am a teacher.'],['Aš gyvenu Londone.','I live in London.']]],
   ['Aš dirbu iš namų.','I work from home.','Say you work from home',[
     ['p','Patogu! Ar tau patinka?','Handy! Do you like it?'],
     ['m','Taip, mano darbas įdomus.','Yes, my job is interesting.','Say yes, your job is interesting',[['Ne, aš esu pensininkas.','No, I am retired.'],['Aš studijuoju.','I study.']]]],
     [['Aš esu iš Anglijos.','I am from England.'],['Aš dirbu biure.','I work in an office.']]],
 ]],
 ['p','Tu labai gerai kalbi lietuviškai!','You speak Lithuanian very well!'],
 ['m','Ačiū! Aš mokausi.','Thanks! I\'m learning.','Thank him and say you are learning',[['Atsiprašau! Aš nesuprantu.','Sorry! I don\'t understand.'],['Ne, ačiū.','No, thanks.']]],
 ['p','Sėkmės! Iki!','Good luck! Bye!'],
 ['m','Ačiū! Iki!','Thanks! Bye!','Thank him and say bye',[['Laba diena!','Good day!'],['Taip sau.','So-so.']]],
]},
{id:'cv22',title:'Sekmadienio pietūs',cast:[{name:'Rūta',voice:'ona'},{name:'Vytautas',voice:'leonas'}],scene:'Rūta takes you to her parents\' house in the countryside for Sunday lunch. Her dad, Vytautas, is cooking.',lines:[
 ['p','Laba diena, Tomai! Prašau, prašau!','Hello, Tomas! Come in, please!'],
 ['m','Laba diena! Ačiū.','Good day! Thank you.','Say good day and thank her',[['Labanakt! Iki!','Good night! Bye!'],['Skanaus! Atsiprašau.','Enjoy your meal! Sorry.']]],
 ['p','Čia mano tėtis, Vytautas.','This is my dad, Vytautas.'],
 ['m','Laba diena! Malonu susipažinti.','Good day! Nice to meet you.','Greet him and say it\'s nice to meet him',[['Iki pasimatymo! Ačiū.','See you later! Thanks.'],['Į sveikatą! Taip.','Cheers! Yes.']]],
 ['p','Malonu! Ar esi alkanas?','Nice to meet you! Are you hungry?',1],
 ['m','Taip, aš esu alkanas!','Yes, I am hungry!','Say yes, you are hungry',[['Taip, aš geriu vandenį.','Yes, I am drinking water.'],['Ne, ačiū. Skanu!','No, thanks. Tasty!']]],
 ['p','Puikiai! Ar nori kavos?','Great! Do you want coffee?'],
 ['c',[
   ['Ne, ačiū. Aš noriu arbatos.','No, thanks. I want tea.','Say no thanks, you want tea',[['p','Gerai, štai arbata.','OK, here is some tea.']],[['Taip, aš valgau žuvį.','Yes, I eat fish.'],['Labanakt!','Good night!']]],
   ['Taip, prašau. Aš noriu kavos.','Yes, please. I want coffee.','Say yes please, you want coffee',[['p','Prašau, štai kava.','Here you go, here is the coffee.']],[['Ačiū už viską.','Thanks for everything.'],['Labas rytas.','Good morning.']]],
 ]],
 ['p','O alus? Labai skanu!','And a beer? It\'s very good!',1],
 ['c',[
   ['Taip, prašau!','Yes, please!','Say yes, please',[['p','Prašau. Į sveikatą!','Here you go. Cheers!',1],['m','Į sveikatą!','Cheers!','Say cheers back',[['Skanaus!','Enjoy your meal!'],['Labanakt!','Good night!']]]],[['Iki!','Bye!'],['Atsiprašau!','Sorry!']]],
   ['Ne, ačiū.','No, thanks.','Say no, thanks',[['p','Nieko tokio. Į sveikatą!','No problem. Cheers!',1],['m','Į sveikatą!','Cheers!','Say cheers back',[['Skanaus!','Enjoy your meal!'],['Labanakt!','Good night!']]]],[['Iki!','Bye!'],['Atsiprašau!','Sorry!']]],
 ]],
 ['t','Lunch is on the table'],
 ['p','Štai sriuba, duona ir sūris. Skanaus!','Here is soup, bread and cheese. Enjoy your meal!'],
 ['m','Ačiū! Skanaus!','Thank you! Enjoy your meal!','Thank her and wish everyone a good meal',[['Į sveikatą! Iki!','Cheers! Bye!'],['Sąskaitą, prašau!','The bill, please!']]],
 ['p','Tomai, ar tu valgai mėsą?','Tomas, do you eat meat?',1],
 ['c',[
   ['Taip, aš valgau mėsą.','Yes, I eat meat.','Say yes, you eat meat',[['p','Gerai! Štai vištiena.','Good! Here is some chicken.',1]],[['Taip, dar truputį.','Yes, a little more.'],['Ne, ačiū.','No, thanks.']]],
   ['Ne. Aš valgau žuvį.','No. I eat fish.','Say no, you eat fish',[['p','Gerai! Štai žuvis.','OK! Here is some fish.',1]],[['Taip, aš noriu kavos.','Yes, I want coffee.'],['Į sveikatą!','Cheers!']]],
 ]],
 ['p','Ar viskas gerai?','Is everything OK?'],
 ['m','Taip! Paduok druską, prašau.','Yes! Pass the salt, please.','Say yes, and ask her to pass the salt',[['Taip! Sąskaitą, prašau.','Yes! The bill, please.'],['Taip! Dar kartą, prašau.','Yes! One more time, please.']]],
 ['p','Prašau, štai druska.','Here you go, here is the salt.'],
 ['t','A little later'],
 ['p','Ar skanu?','Is it tasty?',1],
 ['m','Viskas labai skanu!','Everything is very tasty!','Say everything is very tasty',[['Aš esu alkanas.','I am hungry.'],['Kiek kainuoja?','How much does it cost?']]],
 ['p','Ačiū! Dar sriubos?','Thank you! More soup?',1],
 ['c',[
   ['Taip, dar truputį.','Yes, a little more.','Say yes, a little more',[['p','Prašau!','Here you go!',1]],[['Ne. Aš valgau žuvį.','No. I eat fish.'],['Labas rytas!','Good morning!']]],
   ['Ne, ačiū. Aš sotus.','No, thanks. I\'m full.','Say no thanks, you are full',[['p','Gerai, gerai!','OK, OK!',1]],[['Taip, aš geriu vandenį.','Yes, I am drinking water.'],['Iki!','Bye!']]],
 ]],
 ['t','Late in the afternoon'],
 ['p','Ačiū, Tomai! Labai malonu.','Thank you, Tomas! It was very nice.'],
 ['m','Ačiū už viską!','Thanks for everything!','Thank them for everything',[['Skanaus!','Enjoy your meal!'],['Sąskaitą, prašau.','The bill, please.']]],
 ['p','Iki pasimatymo, Tomai! Sėkmės!','See you, Tomas! Good luck!',1],
 ['m','Ačiū! Viso gero!','Thanks! Goodbye!','Thank him and say goodbye',[['Labas rytas! Taip.','Good morning! Yes.'],['Į sveikatą! Ne.','Cheers! No.']]],
]},
{id:'cv3',title:'Restorane',cast:[{name:'Eglė',voice:'ona'},{name:'Jonas',voice:'leonas'}],scene:'Jonas takes you to lunch at a restaurant in the old town. The waitress, Eglė, meets you at the door.',lines:[
 ['p','Laba diena! Sveiki!','Good afternoon! Welcome!'],
 ['m','Laba diena! Staliuką dviem, prašau.','Good afternoon! A table for two, please.','Greet her and ask for a table for two',[['Labanakt! Sąskaitą, prašau.','Good night! The bill, please.'],['Laba diena! Kiek kainuoja?','Good afternoon! How much is it?']]],
 ['p','Prašau, čia. Štai meniu. Vandens?','This way, please. Here is the menu. Some water?'],
 ['c',[
   ['Aš norėčiau vandens be dujų.','I would like still water.','Ask for still water',[['p','Gerai, vandens be dujų.','OK, still water.']],[['Aš nevalgau mėsos.','I don\'t eat meat.'],['Sąskaitą, prašau.','The bill, please.']]],
   ['Aš norėčiau vandens su dujomis.','I would like sparkling water.','Ask for sparkling water',[['p','Gerai, vandens su dujomis.','OK, sparkling water.']],[['Aš nevalgau mėsos.','I don\'t eat meat.'],['Sąskaitą, prašau.','The bill, please.']]],
 ]],
 ['p','O aš norėčiau kavos su pienu.','And I would like coffee with milk.',1],
 ['p','Gerai. O valgyti?','OK. And to eat?'],
 ['m','Ką rekomenduojate?','What do you recommend?','Ask what she recommends',[['Kur tualetas?','Where is the toilet?'],['Kiek tau metų?','How old are you?']]],
 ['p','Cepelinai su mėsa. Labai skanu!','Cepelinai (big potato dumplings) with meat. Very tasty!'],
 ['c',[
   ['Aš norėčiau sriubos.','I would like some soup.','Order the soup instead',[['p','Gerai, sriuba.','OK, the soup.']],[['Aš esu iš Anglijos.','I am from England.'],['Su pienu.','With milk.']]],
   ['Aš nevalgau mėsos.','I don\'t eat meat.','Tell her you don\'t eat meat',[['p','Gerai. Cepelinai be mėsos!','OK. Cepelinai without meat, then!']],[['Aš esu alkanas.','I am hungry.'],['Be cukraus.','Without sugar.']]],
 ]],
 ['p','Ar jūs alergiškas?','Are you allergic to anything?'],
 ['c',[
   ['Taip. Aš alergiškas riešutams.','Yes. I\'m allergic to nuts.','Say yes, you are allergic to nuts',[['p','Gerai!','OK, noted!']],[['Taip. Aš nevalgau mėsos.','Yes. I don\'t eat meat.'],['Taip. Labai skanu.','Yes. Very tasty.']]],
   ['Ne, viskas gerai.','No, everything is fine.','Say no, everything is fine',[['p','Puiku.','Great.']],[['Ne, ačiū. Sąskaitą.','No, thanks. The bill.'],['Ne. Su pienu.','No. With milk.']]],
 ]],
 ['t','After lunch'],
 ['p','Ar viskas gerai?','Is everything OK?'],
 ['m','Labai skanu, ačiū!','Very tasty, thank you!','Say it was very tasty, and thank her',[['Aš nesuprantu, ačiū!','I don\'t understand, thank you!'],['Taip sau, ačiū!','So-so, thank you!']]],
 ['p','Puiku! Dar kavos?','Great! More coffee?'],
 ['m','Ne, ačiū. Sąskaitą, prašau.','No, thanks. The bill, please.','Say no thanks, and ask for the bill',[['Ne, ačiū. Meniu, prašau.','No, thanks. The menu, please.'],['Ne, ačiū. Staliuką dviem.','No, thanks. A table for two.']]],
 ['p','Prašau.','Here you go. (She brings the bill.)'],
 ['m','Ar galima mokėti kortele?','Can I pay by card?','Ask if you can pay by card',[['Ar galima sriubą?','Can I have soup?'],['Ar toli?','Is it far?']]],
 ['p','Taip, galima!','Yes, of course!'],
 ['p','Arbatpinigiai?','A tip?',1],
 ['m','Taip, gerai!','Yes, OK!','Say yes, OK',[['Taip, gerai. Su pienu.','Yes, OK. With milk.'],['Ne. Aš sotus.','No. I\'m full.']]],
 ['p','Labai ačiū! Iki!','Thank you very much! Bye!'],
 ['m','Ačiū! Viso gero!','Thanks! Goodbye!','Thank her and say goodbye',[['Labas rytas!','Good morning!'],['Skanaus!','Enjoy your meal!']]],
]},
{id:'cv4',title:'Asking the way',cast:[{name:'Petras',voice:'leonas'}],scene:'You need the train station. You stop a man on the street.',lines:[
 ['m','Atleiskite!','Excuse me!','Get his attention politely',[['Į sveikatą!','Cheers!'],['Labanakt!','Good night!']]],
 ['p','Taip? Kuo galiu padėti?','Yes? How can I help?'],
 ['m','Kur yra stotis?','Where is the station?','Ask where the station is',[['Kur tualetas?','Where is the toilet?'],['Kiek kainuoja?','How much does it cost?']]],
 ['p','Eikite tiesiai, paskui kairėn.','Go straight, then left.'],
 ['c',[
   ['Lėčiau, prašau.','Slower, please.','Ask him to say it slower',[['p','Tiesiai... ir paskui kairėn.','Straight... and then left.']],[['Labai skanu.','Very tasty.'],['Aš esu studentas.','I am a student.']]],
   ['Supratau!','Got it!','Say you got it',[['p','Puiku!','Great!']],[['Labai skanu.','Very tasty.'],['Labanakt!','Good night!']]],
 ]],
 ['m','Ar toli?','Is it far?','Ask if it is far',[['Ar galima?','May I?'],['Kiek tau metų?','How old are you?']]],
 ['p','Ne, arti.','No, it\'s near.'],
 ['m','Parodykite žemėlapyje.','Show me on the map.','Ask him to show you on the map',[['Nieko tokio.','No problem.'],['Iki pasimatymo!','See you later!']]],
 ['p','Žinoma. Mes esame čia, o stotis yra ten.','Of course. We are here, and the station is there.'],
 ['m','Supratau! Labai ačiū!','Got it! Thank you very much!','Say you got it and thank him',[['Sąskaitą, prašau.','The bill, please.'],['Aš esu alkanas.','I am hungry.']]],
 ['p','Nėra už ką!','You\'re welcome!'],
 ['m','Viso gero!','Goodbye!','Say goodbye',[['Labas!','Hi!'],['Skanaus!','Enjoy your meal!']]],
]},
{id:'cv23',title:'Į Kauną',cast:[{name:'Irena',voice:'ona'},{name:'Mindaugas',voice:'leonas'}],scene:'You are going to Kaunas for the day. First the ticket window at the Vilnius bus station, then a taxi in Kaunas.',lines:[
 ['p','Laba diena! Kur važiuojate?','Good afternoon! Where are you going?'],
 ['m','Laba diena! Bilietą į Kauną, prašau.','Good afternoon! A ticket to Kaunas, please.','Greet her and ask for a ticket to Kaunas',[['Laba diena! Sąskaitą, prašau.','Good afternoon! The bill, please.'],['Labanakt! Staliuką dviem.','Good night! A table for two.']]],
 ['p','Prašau. Septyni eurai.','Here you go. Seven euros.'],
 ['m','Ar galima mokėti kortele?','Can I pay by card?','Ask if you can pay by card',[['Ar galima sriubą?','Can I have soup?'],['Ar toli?','Is it far?']]],
 ['p','Žinoma.','Of course.'],
 ['m','Kada išvyksta?','When does it leave?','Ask when the bus leaves',[['Kada atvyksta?','When does it arrive?'],['Kiek tau metų?','How old are you?']]],
 ['p','Dešimt minučių.','In ten minutes.'],
 ['m','Kur yra platforma?','Where is the platform?','Ask where the platform is',[['Kur tualetas?','Where is the toilet?'],['Kur tu gyveni?','Where do you live?']]],
 ['p','Ten, kairėn.','Over there, to the left.'],
 ['m','Ačiū! O kada atvyksta?','Thanks! And when does it arrive?','Thank her, and ask when it arrives',[['Ačiū! O kada išvyksta?','Thanks! And when does it leave?'],['Ačiū! Kiek kainuoja?','Thanks! How much is it?']]],
 ['p','Valanda.','In an hour.'],
 ['m','Labai ačiū!','Thank you very much!','Thank her very much',[['Labai skanu!','Very tasty!'],['Labanakt!','Good night!']]],
 ['t','An hour and a half later, in Kaunas'],
 ['p','Laba diena! Taksi?','Good afternoon! Taxi?',1],
 ['m','Taip. Nuvežkite mane į viešbutį.','Yes. Take me to the hotel.','Say yes, and ask him to take you to the hotel',[['Taip. Bilietą į Kauną.','Yes. A ticket to Kaunas.'],['Taip. Sustokite čia.','Yes. Stop here.']]],
 ['p','Gerai. Kuris?','OK. Which one?',1],
 ['m','Minutėlę... Čia.','Just a moment... Here.','Say just a moment, then show him the address: here',[['Nesvarbu... Ten.','Never mind... There.'],['Nieko... Kairėn.','Nothing... Left.']]],
 ['p','Gerai, žinau.','OK, I know it.',1],
 ['m','Kiek kainuoja?','How much does it cost?','Ask how much it costs',[['Kiek tau metų?','How old are you?'],['Kada atvyksta?','When does it arrive?']]],
 ['p','Apie dešimt eurų.','About ten euros.',1],
 ['m','Gerai. Važiuojam!','OK. Let\'s go!','Agree, and say let\'s go',[['Gerai. Aš einu namo!','OK. I\'m going home!'],['Gerai. Skanaus!','OK. Enjoy your meal!']]],
 ['t','In the taxi'],
 ['p','Pirmą kartą čia?','First time here?',1],
 ['c',[
   ['Taip. Aš esu iš Amerikos.','Yes. I am from America.','Say yes, and where you are from',[['p','Sveiki atvykę į Kauną!','Welcome to Kaunas!',1]],[['Taip. Aš esu alkanas.','Yes. I am hungry.'],['Taip. Aš imu šitą.','Yes. I\'ll take this one.']]],
   ['Ne. Aš gyvenu Vilniuje.','No. I live in Vilnius.','Say no, you live in Vilnius',[['p','O, Vilniuje! Puiku!','Oh, in Vilnius! Great!',1]],[['Ne. Aš einu namo.','No. I\'m going home.'],['Ne. Aš sotus.','No. I\'m full.']]],
 ]],
 ['p','Viešbutis ten.','The hotel is there.',1],
 ['m','Sustokite čia, prašau.','Stop here, please.','Ask him to stop here',[['Nuvežkite mane į viešbutį.','Take me to the hotel.'],['Lėčiau, prašau.','Slower, please.']]],
 ['p','Gerai. Dešimt eurų.','OK. Ten euros.',1],
 ['m','Kortele, prašau.','By card, please.','Say you will pay by card',[['Su pienu, prašau.','With milk, please.'],['Bilietą, prašau.','A ticket, please.']]],
 ['p','Ačiū! Viso gero!','Thank you! Goodbye!',1],
 ['m','Ačiū! Viso gero!','Thanks! Goodbye!','Thank him and say goodbye',[['Labas rytas!','Good morning!'],['Į sveikatą!','Cheers!']]],
]},
{id:'cv24',title:'Pamestas lagaminas',cast:[{name:'Rasa',voice:'ona'}],scene:'You flew home from a trip, but your suitcase didn\'t. You go to the lost luggage desk at Vilnius airport.',lines:[
 ['p','Laba diena! Kuo galiu padėti?','Good afternoon! How can I help?'],
 ['m','Laba diena! Kur mano lagaminas?','Good afternoon! Where is my suitcase?','Greet her and ask where your suitcase is',[['Laba diena! Kur tualetas?','Good afternoon! Where is the toilet?'],['Labanakt! Kava per karšta.','Good night! The coffee is too hot.']]],
 ['p','Gerai, pažiūrėsime. Koks jūsų lagaminas?','OK, let\'s have a look. What is your suitcase like?'],
 ['m','Didelis ir juodas.','Big and black.','Say it is big and black',[['Mažas ir geltonas.','Small and yellow.'],['Mano brolis aukštas.','My brother is tall.']]],
 ['p','Naujas ar senas?','New or old?'],
 ['c',[
   ['Naujas.','New.','Say it is new',[['p','Gerai. Ar šitas?','OK. Is it this one?']],[['Raudonas.','Red.'],['Šalta.','It\'s cold.']]],
   ['Senas.','Old.','Say it is old',[['p','Gerai. Ar šitas?','OK. Is it this one?']],[['Rožinis.','Pink.'],['Šilta.','It\'s warm.']]],
 ]],
 ['m','Ne, šis lagaminas mažas.','No, this suitcase is small.','Say no, this suitcase is small',[['Taip, šis lagaminas gražus.','Yes, this suitcase is beautiful.'],['Ne, ši knyga įdomi.','No, this book is interesting.']]],
 ['p','O šitas? Didelis.','And this one? It\'s big.'],
 ['m','Ne, jis mėlynas. Mano lagaminas juodas.','No, it\'s blue. My suitcase is black.','Say no, it\'s blue, and yours is black',[['Taip, jis žalias. Mano lagaminas baltas.','Yes, it\'s green. My suitcase is white.'],['Ne, jis linksmas.','No, he is cheerful.']]],
 ['p','Atsiprašau! O šitas? Didelis, juodas ir labai sunkus!','Sorry! And this one? Big, black and very heavy!'],
 ['m','Taip! Tai mano lagaminas!','Yes! That\'s my suitcase!','Say yes, that\'s your suitcase',[['Ne! Tai mano brolis!','No! That\'s my brother!'],['Taip! Kambarys švarus!','Yes! The room is clean!']]],
 ['p','Puiku! Koks jūsų vardas?','Great! What is your name?'],
 ['m','Mano vardas Tomas.','My name is Tomas.','Tell her your name',[['Mano lagaminas juodas.','My suitcase is black.'],['Aš turiu seserį.','I have a sister.']]],
 ['p','Viskas gerai. Prašau, jūsų lagaminas.','All good. Here you are, your suitcase.'],
 ['m','Labai ačiū! Viso gero!','Thank you very much! Goodbye!','Thank her very much and say goodbye',[['Labai skanu! Iki!','Very tasty! Bye!'],['Sąskaitą, prašau!','The bill, please!']]],
]},
{id:'cv25',title:'Šeimos nuotraukos',cast:[{name:'Jonas',voice:'leonas'}],scene:'Over coffee, Jonas shows you photos of his family on his phone.',lines:[
 ['p','Pažiūrėk, čia mano šeima.','Look, this is my family.'],
 ['m','Kas tai?','Who is this?','Point at the tall man and ask who this is',[['Kur tai?','Where is this?'],['Kiek tai kainuoja?','How much is this?']]],
 ['p','Tai mano brolis, Mantas.','This is my brother, Mantas.'],
 ['m','Koks jis?','What is he like?','Ask what he is like',[['Koks jo vardas?','What is his name?'],['Kas tai?','Who is this?']]],
 ['p','Jis labai linksmas ir protingas. Ir aukštas!','He is very cheerful and clever. And tall!'],
 ['m','O kas tai?','And who is this?','Point at the woman and ask who this is',[['O kur tai?','And where is this?'],['O kada?','And when?']]],
 ['p','Tai mano sesuo.','This is my sister.'],
 ['m','Koks jos vardas?','What is her name?','Ask what her name is',[['Koks jo vardas?','What is his name?'],['Koks jis?','What is he like?']]],
 ['p','Gintarė. Ji gyvena Kaune.','Gintarė. She lives in Kaunas.'],
 ['p','O tu? Ar turi brolių ar seserų?','And you? Do you have brothers or sisters?'],
 ['c',[
   ['Taip, aš turiu brolį.','Yes, I have a brother.','Say you have a brother',[['p','Koks jis?','What is he like?'],['m','Jis linksmas.','He is cheerful.','Say he is cheerful',[['Ji linksma.','She is cheerful.'],['Jis mėlynas.','He is blue.']]]],[['Taip, aš turiu dukrą.','Yes, I have a daughter.'],['Ne, aš esu iš Amerikos.','No, I am from America.']]],
   ['Taip, aš turiu seserį.','Yes, I have a sister.','Say you have a sister',[['p','Kokia ji?','What is she like?'],['m','Ji labai protinga.','She is very clever.','Say she is very clever',[['Jis labai protingas.','He is very clever.'],['Ji labai sunki.','She is very heavy.']]]],[['Taip, aš turiu brolį.','Yes, I have a brother.'],['Taip, aš turiu šunį.','Yes, I have a dog.']]],
   ['Ne, neturiu.','No, I don\'t.','Say no, you don\'t',[['p','Gerai.','OK.']],[['Ne, aš nežinau.','No, I don\'t know.'],['Taip, aš turiu.','Yes, I have.']]],
 ]],
 ['p','Ar turi vaikų?','Do you have children?'],
 ['c',[
   ['Taip, aš turiu du vaikus.','Yes, I have two children.','Say you have two children',[['p','Puiku!','Great!']],[['Taip, aš turiu du brolius.','Yes, I have two brothers.'],['Ne, aš turiu du.','No, I have two.']]],
   ['Taip, aš turiu dukrą.','Yes, I have a daughter.','Say you have a daughter',[['p','Puiku! Dukra!','Great! A daughter!']],[['Taip, aš turiu seserį.','Yes, I have a sister.'],['Taip, aš turiu brolį.','Yes, I have a brother.']]],
   ['Ne, neturiu.','No, I don\'t.','Say no, you don\'t',[['p','Nieko tokio!','That\'s fine!']],[['Ne, aš nežinau.','No, I don\'t know.'],['Ne, ačiū.','No, thanks.']]],
 ]],
 ['p','O čia mano mama ir tėtis.','And here are my mom and dad.'],
 ['m','Jie labai mieli.','They are very sweet.','Say they are very sweet',[['Jie labai sunkūs.','They are very heavy.'],['Jis labai rimtas.','He is very serious.']]],
 ['p','Ačiū! Dar kavos?','Thanks! More coffee?'],
 ['m','Taip, prašau.','Yes, please.','Say yes, please',[['Ne, neturiu.','No, I don\'t have.'],['Labanakt.','Good night.']]],
]},
{id:'cv26',title:'Traukinyje',cast:[{name:'Agnė',voice:'ona'}],scene:'On the train home from Kaunas, a woman sits down next to you. She looks very tired.',lines:[
 ['p','Atsiprašau, ar čia laisva?','Excuse me, is this seat free?'],
 ['m','Taip, prašau.','Yes, please.','Say yes, please',[['Ne, neturiu.','No, I don\'t have.'],['Skanaus!','Enjoy your meal!']]],
 ['p','Ačiū. Aš labai pavargusi.','Thanks. I\'m so tired.'],
 ['m','Kodėl?','Why?','Ask why',[['Kada?','When?'],['Kur?','Where?']]],
 ['p','Aš dirbu visą dieną.','I work all day.'],
 ['m','Kur tu dirbi?','Where do you work?','Ask where she works',[['Kur tu gyveni?','Where do you live?'],['Kada baigi darbą?','When do you finish work?']]],
 ['p','Aš dirbu ligoninėje. Aš esu slaugytoja.','I work in a hospital. I am a nurse.'],
 ['m','Ar tau patinka tavo darbas?','Do you like your job?','Ask if she likes her job',[['Ar tau patinka Lietuva?','Do you like Lithuania?'],['Ar tu kalbi angliškai?','Do you speak English?']]],
 ['p','Taip, bet mano darbas sunkus.','Yes, but my job is hard.'],
 ['p','O tu? Kuo tu dirbi?','And you? What do you do for work?'],
 ['c',[
   ['Aš esu studentas.','I am a student.','Say what you do',[['p','Puiku! Ar tau patinka?','Great! Do you like it?'],['m','Taip, mano darbas įdomus.','Yes, my job is interesting.','Say yes, your job is interesting',[['Taip, mano butas mažas.','Yes, my flat is small.'],['Ne, mano brolis aukštas.','No, my brother is tall.']]]],[['Aš esu iš Amerikos.','I am from America.'],['Aš dirbu ligoninėje.','I work in a hospital.']]],
   ['Aš ieškau darbo.','I\'m looking for work.','Say you are looking for work',[['p','Sėkmės!','Good luck!']],[['Aš ieškau stoties.','I\'m looking for the station.'],['Aš dirbu visą dieną.','I work all day.']]],
 ]],
 ['m','Kada baigi darbą?','When do you finish work?','Ask when she finishes work',[['Kada atvyksta?','When does it arrive?'],['Kur tu dirbi?','Where do you work?']]],
 ['p','Aš dirbu dvylika valandų!','I work twelve hours a day!'],
 ['t','Twenty minutes later'],
 ['p','Mano stotis! Labai malonu!','My stop! It was very nice!'],
 ['m','Man irgi! Sėkmės!','Me too! Good luck!','Say you enjoyed it too, and wish her luck',[['Aš irgi! Skanaus!','Me too! Enjoy your meal!'],['Man irgi! Labanakt!','Me too! Good night!']]],
]},
{id:'cv27',title:'Jauskis kaip namie',cast:[{name:'Laura',voice:'ona'}],scene:'It\'s a cold, rainy evening. Laura, from the language evening, has invited you to see her new flat.',lines:[
 ['p','Labas! Užeik, užeik! Koks šiandien oras?','Hi! Come in, come in! What\'s the weather like today?'],
 ['m','Lyja. Ir šalta!','It\'s raining. And it\'s cold!','Say it\'s raining, and cold',[['Sninga. Ir karšta!','It\'s snowing. And it\'s hot!'],['Saulė. Ir skanu!','Sun. And tasty!']]],
 ['p','Jauskis kaip namie. Sėskis!','Make yourself at home. Sit down!'],
 ['m','Ačiū! Tavo butas labai gražus.','Thanks! Your flat is very beautiful.','Thank her, and say her flat is very beautiful',[['Ačiū! Mano butas mažas.','Thanks! My flat is small.'],['Ačiū! Kava per karšta.','Thanks! The coffee is too hot.']]],
 ['p','Ačiū! Bet jis mažas. Čia svetainė, ten virtuvė, o ten miegamasis.','Thanks! But it\'s small. Here is the living room, there the kitchen, and there the bedroom.'],
 ['m','Kur yra vonia?','Where is the bathroom?','Ask where the bathroom is',[['Kur yra stotis?','Where is the station?'],['Kur yra platforma?','Where is the platform?']]],
 ['p','Ten.','Over there, by the door.'],
 ['p','Ar nori arbatos?','Do you want some tea?'],
 ['c',[
   ['Taip, prašau. Man šalta.','Yes, please. I\'m cold.','Say yes please, you are cold',[['p','Štai arbata. Karšta!','Here is the tea. It\'s hot!']],[['Taip, prašau. Man karšta.','Yes, please. I\'m hot.'],['Ne, ačiū. Aš sergu.','No, thanks. I am sick.']]],
   ['Ne, ačiū. Aš noriu kavos.','No, thanks. I want coffee.','Say no thanks, you want coffee',[['p','Gerai, štai kava.','OK, here is coffee.']],[['Ne, ačiū. Aš noriu namo.','No, thanks. I want home.'],['Taip. Aš valgau duoną.','Yes. I am eating bread.']]],
 ]],
 ['p','Kambaryje šalta, ar ne?','It\'s cold in the room, isn\'t it?'],
 ['m','Taip. Uždaryk langą, prašau.','Yes. Close the window, please.','Agree, and ask her to close the window',[['Taip. Atidaryk langą, prašau.','Yes. Open the window, please.'],['Taip. Išjunk šviesą, prašau.','Yes. Turn off the light, please.']]],
 ['p','O, atsiprašau! Ir tamsu.','Oh, sorry! And it\'s dark.'],
 ['m','Įjunk šviesą!','Turn on the light!','Tell her to turn on the light',[['Išjunk šviesą!','Turn off the light!'],['Uždaryk duris!','Close the door!']]],
 ['p','Gerai. Tu pavargęs?','OK. Are you tired?'],
 ['c',[
   ['Taip, aš pavargęs.','Yes, I am tired.','Say yes, you are tired',[['p','Tada arbatos!','Then some tea!']],[['Taip, aš alkanas.','Yes, I am hungry.'],['Taip, aš liūdnas.','Yes, I am sad.']]],
   ['Ne, aš laimingas!','No, I am happy!','Say no, you are happy',[['p','Puiku! Aš irgi.','Great! Me too.']],[['Ne, aš sergu!','No, I am sick!'],['Ne, aš ištroškęs!','No, I am thirsty!']]],
 ]],
 ['t','Later that evening'],
 ['m','Ačiū už vaišes!','Thanks for the food!','Thank her for the food',[['Ačiū už viską! Skanaus!','Thanks for everything! Enjoy your meal!'],['Labai ačiū! Sąskaitą!','Thanks a lot! The bill!']]],
 ['p','Nėra už ką! Ateik dar!','You\'re welcome! Come again!'],
 ['m','Ačiū! Iki!','Thanks! Bye!','Thank her and say bye',[['Labas! Iki!','Hi! Bye!'],['Ačiū! Labas rytas!','Thanks! Good morning!']]],
]},
{id:'cv29',title:'Prie ežero?',cast:[{name:'Jonas',voice:'leonas'}],scene:'Saturday morning. It\'s raining, and Jonas texts you about going to the lake.',lines:[
 ['p','Labas! Šiandien einame prie ežero?','Hi! Are we going to the lake today?'],
 ['m','Aš neinu, nes lyja.','I\'m not going, because it\'s raining.','Say you\'re not going, because it\'s raining',[['Aš einu, nes lyja.','I\'m going, because it\'s raining.'],['Lyja, todėl aš einu.','It\'s raining, so I\'m going.']]],
 ['p','Lyja tik ryte. Po pietų bus saulė!','It\'s only raining in the morning. In the afternoon there\'ll be sun!'],
 ['m','Gerai, bet aš dar nevalgiau.','OK, but I haven\'t eaten yet.','Say OK, but you haven\'t eaten yet',[['Gerai, ir aš jau valgiau.','OK, and I\'ve already eaten.'],['Gerai, nes aš dar nevalgiau.','OK, because I haven\'t eaten yet.']]],
 ['p','Nieko tokio! Arbatos ar kavos?','No problem! Tea or coffee?'],
 ['c',[
   ['Kavos, prašau.','Coffee, please.','Ask for coffee',[['p','Gerai!','OK!']],[['Kava, prašau.','Coffee, please.'],['Kavą, prašau.','The coffee, please.']]],
   ['Arbatos ir pyrago!','Tea and cake!','Ask for tea and cake',[['p','Pyrago? Gerai, gerai!','Cake? OK, OK!']],[['Arbata ir pyragas!','Tea and cake!'],['Arbatą ir pyragą!','Tea and cake!']]],
 ]],
 ['p','Bet vanduo šaltas...','But the water is cold...'],
 ['m','Nors šalta, aš einu!','Though it\'s cold, I\'m going!','Say that though it\'s cold, you\'re going',[['Kai šalta, aš skaitau!','When it\'s cold, I read!'],['Nors šalta, aš neinu!','Though it\'s cold, I\'m not going!']]],
 ['p','Puiku! Mano sesuo irgi nori. Gerai?','Great! My sister wants to come too. OK?'],
 ['m','Aš manau, kad tai gerai!','I think that\'s good!','Say you think that\'s good',[['Aš manau, kad tai blogai!','I think that\'s bad!'],['Aš kalbu tik angliškai!','I only speak English!']]],
 ['p','Puiku! Antrą valandą prie stoties.','Great! Two o\'clock by the station.'],
 ['m','Sutarta! Iki!','Deal! Bye!','Agree, and say bye',[['Sutarta! Labanakt!','Deal! Good night!'],['Nereikia! Iki!','No need! Bye!']]],
]},
{id:'cv30',title:'Aš pavėlavau',cast:[{name:'Rūta',voice:'ona'}],scene:'You were meant to meet Rūta at a restaurant at ten. It\'s eleven.',lines:[
 ['p','Labas! Aš laukiu jau valandą!','Hi! I\'ve been waiting an hour already!'],
 ['m','Atsiprašau, aš pavėlavau!','Sorry, I\'m late!','Say sorry, you\'re late',[['Atsiprašau, aš pamiršau!','Sorry, I forgot!'],['Labas, aš miegojau!','Hi, I was sleeping!']]],
 ['p','Kodėl?','Why?'],
 ['c',[
   ['Aš pamiršau.','I forgot.','Say you forgot',[
     ['p','Pamiršai? Mane?!','You forgot? Me?!'],
     ['m','Ne, ne! Aš nežinojau, kur yra restoranas.','No, no! I didn\'t know where the restaurant was.','Say no, no, you didn\'t know where the restaurant was',[['Ne, ne! Aš nemačiau restorano.','No, no! I didn\'t see the restaurant.'],['Taip, taip! Aš pamiršau.','Yes, yes! I forgot.']]]],
     [['Aš pavėlavau.','I was late.'],['Aš miegu.','I\'m sleeping.']]],
   ['Aš nežinojau, kur yra restoranas.','I didn\'t know where the restaurant was.','Say you didn\'t know where the restaurant was',[
     ['p','Bet aš tau rašiau!','But I wrote to you!'],
     ['m','Aš nemačiau.','I didn\'t see it.','Say you didn\'t see it',[['Aš nežinau.','I don\'t know.'],['Aš mačiau.','I saw it.']]]],
     [['Aš nežinau, kur yra restoranas.','I don\'t know where the restaurant is.'],['Aš buvau restorane.','I was at the restaurant.']]],
 ]],
 ['p','Gerai, nieko tokio. O ryte?','OK, never mind. And this morning?'],
 ['m','Aš miegojau!','I was sleeping!','Admit you were sleeping',[['Aš miegu!','I\'m sleeping!'],['Aš dirbsiu!','I will work!']]],
 ['p','Aha! Todėl ir pavėlavai!','Aha! That\'s why you were late!'],
 ['p','Ar valgei?','Have you eaten?'],
 ['c',[
   ['Taip, aš jau valgiau.','Yes, I\'ve already eaten.','Say yes, you\'ve already eaten',[['p','Gerai. Tada tik kavos.','OK. Just coffee, then.']],[['Taip, aš dar nevalgiau.','Yes, I haven\'t eaten yet.'],['Taip, aš valgysiu.','Yes, I will eat.']]],
   ['Ne, aš dar nevalgiau.','No, I haven\'t eaten yet.','Say no, you haven\'t eaten yet',[['p','Aš irgi! Pusryčiai!','Me neither! Breakfast time!']],[['Ne, aš jau valgiau.','No, I\'ve already eaten.'],['Ne, aš nevalgau.','No, I don\'t eat.']]],
 ]],
 ['p','Ir kitą kartą – ne taip vėlai!','And next time, not so late!'],
 ['m','Gerai! Atsiprašau!','OK! Sorry!','Promise, and say sorry again',[['Gerai! Į sveikatą!','OK! Cheers!'],['Ne! Aš pavėlavau!','No! I was late!']]],
]},
{id:'cv31',title:'Klaipėdoje',cast:[{name:'Danutė',voice:'ona'}],scene:'You get off the train in Klaipėda, on the coast. You want to see the sea, so you ask a woman at the station.',lines:[
 ['m','Atsiprašau! Kur yra jūra?','Excuse me! Where is the sea?','Ask her where the sea is',[['Atsiprašau! Kur yra lova?','Excuse me! Where is the bed?'],['Labas! Kur yra pasas?','Hi! Where is the passport?']]],
 ['p','Jūra? Toli. Važiuokite autobusu.','The sea? It\'s far. Take a bus.'],
 ['m','Kiek laiko?','How long?','Ask how long it takes',[['Kiek kainuoja?','How much is it?'],['Kiek tau metų?','How old are you?']]],
 ['p','Dvidešimt minučių.','Twenty minutes.'],
 ['m','Ačiū! O kur yra autobusų stotis?','Thanks! And where is the bus station?','Thank her, and ask where the bus station is',[['Ačiū! O kur yra geležinkelio stotis?','Thanks! And where is the railway station?'],['Ačiū! O kur yra ežeras?','Thanks! And where is the lake?']]],
 ['p','Ten, tiesiai, paskui dešinėn. Jūs turistas?','Over there, straight on, then right. Are you a tourist?'],
 ['m','Taip. Aš esu iš Amerikos.','Yes. I am from America.','Say yes, and where you are from',[['Taip. Aš esu lietuvis.','Yes. I am Lithuanian.'],['Ne. Aš gyvenu čia.','No. I live here.']]],
 ['p','Sveiki atvykę! Ar jau matėte jūrą?','Welcome to Klaipėda! Have you seen the sea yet?'],
 ['m','Ne, dar ne.','No, not yet.','Say no, not yet',[['Taip, dar ne.','Yes, not yet.'],['Ne, jau taip.','No, already yes.']]],
 ['p','O! Jūra, miškas...','Oh! The sea, the forest...'],
 ['m','Man patinka miškas ir jūra!','I like the forest and the sea!','Say you like the forest and the sea',[['Man nepatinka miškas ir jūra!','I don\'t like the forest and the sea!'],['Man patinka miestas ir bankas!','I like the city and the bank!']]],
 ['p','Bet jūsų lagaminas didelis. Gal taksi?','But your suitcase is big. Maybe a taxi?'],
 ['c',[
   ['Ne, šis lagaminas lengvas.','No, this suitcase is light.','Say no, this suitcase is light',[['p','Gerai, tada autobusu! Sėkmės!','OK, the bus then! Good luck!']],[['Ne, šis lagaminas sunkus.','No, this suitcase is heavy.'],['Ne, ši knyga įdomi.','No, this book is interesting.']]],
   ['Taip, šis lagaminas sunkus.','Yes, this suitcase is heavy.','Say yes, this suitcase is heavy',[['p','Taksi ten, prie stoties.','The taxis are over there, by the station.']],[['Taip, šis lagaminas lengvas.','Yes, this suitcase is light.'],['Taip, kava per karšta.','Yes, the coffee is too hot.']]],
 ]],
 ['m','Labai ačiū! Viso gero!','Thank you very much! Goodbye!','Thank her very much and say goodbye',[['Labai skanu! Viso gero!','Very tasty! Goodbye!'],['Labanakt! Labas!','Good night! Hi!']]],
]},
{id:'cv32',title:'Pas gydytoją',cast:[{name:'Daiva',voice:'ona'}],scene:'Too long on a windy beach: you have caught a cold. The hotel sends you to a doctor, Daiva.',lines:[
 ['p','Laba diena. Kas yra?','Good afternoon. What\'s wrong?'],
 ['m','Laba diena. Aš peršalau.','Good afternoon. I caught a cold.','Greet her and say you caught a cold',[['Laba diena. Aš pasiklydau.','Good afternoon. I\'m lost.'],['Laba diena. Aš jaučiuosi geriau.','Good afternoon. I feel better.']]],
 ['p','Ar kosėjate?','Are you coughing?'],
 ['m','Taip, aš kosėju. Ir man sloga.','Yes, I\'m coughing. And I have a runny nose.','Say yes, you\'re coughing, and you have a runny nose',[['Ne, aš kosėju. Ir man šalta.','No, I\'m coughing. And I\'m cold.'],['Taip, aš sergu. Ir man karšta.','Yes, I\'m sick. And I\'m hot.']]],
 ['p','Ar skauda galvą?','Does your head hurt?'],
 ['c',[
   ['Taip, man svaigsta galva.','Yes, my head is spinning.','Say yes, your head is spinning',[['p','Gerai.','I see.']],[['Taip, man skauda dantį.','Yes, my tooth hurts.'],['Ne, man svaigsta galva.','No, my head is spinning.']]],
   ['Ne, bet man skauda nugarą.','No, but my back hurts.','Say no, but your back hurts',[['p','Gerai.','I see. That\'s from the coughing.']],[['Ne, bet man skauda koją.','No, but my leg hurts.'],['Taip, bet man skauda nugarą.','Yes, but my back hurts.']]],
 ]],
 ['p','Temperatūra trisdešimt aštuoni.','Your temperature is thirty-eight.'],
 ['m','Man reikia vaistų?','Do I need medicine?','Ask if you need medicine',[['Man reikia pinigų?','Do I need money?'],['Man reikia eiti?','Do I need to go?']]],
 ['p','Taip. Štai receptas.','Yes. Here is a prescription.'],
 ['m','Ar galima eiti prie jūros?','Can I go to the sea?','Ask if you can go to the sea',[['Ar galima čia rūkyti?','Can I smoke here?'],['Ar galima mokėti kortele?','Can I pay by card?']]],
 ['p','Ne! Lova ir arbata.','No! Bed and tea, for three days.'],
 ['m','Gerai. Labai ačiū!','OK. Thank you very much!','Agree, and thank her very much',[['Gerai. Į sveikatą!','OK. Cheers!'],['Ne. Labai skanu!','No. Very tasty!']]],
 ['t','Three days later, back for a check-up'],
 ['p','Kaip jūs?','So, how are you?'],
 ['m','Aš jaučiuosi geriau. Ačiū!','I feel better. Thank you!','Say you feel better, and thank her',[['Aš peršalau. Ačiū!','I caught a cold. Thank you!'],['Man bloga. Ačiū!','I feel sick. Thank you!']]],
]},
{id:'cv33',title:'Policijoje',cast:[{name:'Andrius',voice:'leonas'}],scene:'Back in Vilnius, your bag is stolen in the old town. You go to the police station.',lines:[
 ['p','Laba diena. Kas atsitiko?','Good afternoon. What happened?'],
 ['m','Mane apvogė!','I\'ve been robbed!','Say you\'ve been robbed',[['Aš pasiklydau!','I\'m lost!'],['Aš peršalau!','I caught a cold!']]],
 ['p','Kur? Kada?','Where? When?'],
 ['m','Vakar, mieste.','Yesterday, in town.','Say yesterday, in town',[['Rytoj, mieste.','Tomorrow, in town.'],['Vakar, namie.','Yesterday, at home.']]],
 ['p','Ką paėmė?','What did they take?'],
 ['m','Mano pasas ir pinigai.','My passport and money.','Say your passport and money',[['Mano brolis ir sesuo.','My brother and sister.'],['Mano kava ir pyragas.','My coffee and cake.']]],
 ['p','Ar jums viskas gerai? Ar reikia gydytojo?','Are you all right? Do you need a doctor?'],
 ['m','Ne, aš gerai.','No, I\'m fine.','Say no, you\'re fine',[['Taip, aš gerai.','Yes, I\'m fine.'],['Ne, aš sergu.','No, I\'m sick.']]],
 ['p','Gerai. Dėl paso – į ambasadą.','OK. For the passport, go to the embassy.'],
 ['m','Kur yra ambasada?','Where is the embassy?','Ask where the embassy is',[['Kur yra policija?','Where are the police?'],['Kur yra vaistinė?','Where is the pharmacy?']]],
 ['p','Štai adresas.','Here is the address.'],
 ['m','Labai ačiū!','Thank you very much!','Thank him very much',[['Labai skanu!','Very tasty!'],['Labai gražu!','Very beautiful!']]],
 ['p','Sėkmės!','Good luck!'],
 ['m','Ačiū. Viso gero!','Thanks. Goodbye!','Thank him and say goodbye',[['Ačiū. Labas rytas!','Thanks. Good morning!'],['Ačiū. Į sveikatą!','Thanks. Cheers!']]],
]},
{id:'cv34',title:'Vėl kalbų vakare',cast:[{name:'Paulius',voice:'leonas'}],scene:'Months later, you go back to the language evening. This time you speak only Lithuanian. A man called Paulius sits down next to you.',lines:[
 ['p','Labas! Aš Paulius. Tu irgi mokaisi lietuvių kalbos?','Hi! I\'m Paulius. Are you learning Lithuanian too?'],
 ['m','Taip! Aš mokausi lietuvių kalbos.','Yes! I\'m learning Lithuanian.','Say yes, you\'re learning Lithuanian',[['Taip! Aš kalbu tik angliškai.','Yes! I only speak English.'],['Ne! Aš nekalbu lietuviškai.','No! I don\'t speak Lithuanian.']]],
 ['p','Puiku! Tu labai gerai kalbi!','Great! You speak very well!'],
 ['m','Rimtai? Ačiū!','Seriously? Thanks!','React: seriously? and thank him',[['Kaip gaila! Ačiū!','What a pity! Thanks!'],['Nuobodu! Ačiū!','Boring! Thanks!']]],
 ['p','Rimtai! Iš kur tu esi?','Seriously! Where are you from?'],
 ['m','Aš esu iš Amerikos. O tu?','I am from America. And you?','Say where you are from, and ask him back',[['Aš gyvenu Vilniuje. Iki!','I live in Vilnius. Bye!'],['Aš esu studentas. Taip?','I am a student. Yes?']]],
 ['p','Aš esu iš Kauno, bet gyvenu Vilniuje.','I\'m from Kaunas, but I live in Vilnius.'],
 ['m','Kiek laiko tu čia?','How long have you been here?','Ask how long he has been here',[['Kiek tau metų?','How old are you?'],['Kiek tai kainuoja?','How much is this?']]],
 ['p','Penki metai.','Five years.'],
 ['m','Ar tau čia patinka?','Do you like it here?','Ask if he likes it here',[['Ar tau patinka kava?','Do you like coffee?'],['Ar dažnai čia būni?','Are you here often?']]],
 ['p','Labai! Aš dirbu muziejuje. Rytoj ten ekskursija lietuviškai!','Very much! I work at a museum. Tomorrow there\'s a tour there in Lithuanian!'],
 ['m','Negali būti! Papasakok daugiau.','No way! Tell me more.','React with surprise, and ask him to tell you more',[['Kaip gaila! Iki kito karto.','What a pity! Until next time.'],['Man tas pats. Nuobodu.','I don\'t mind. Boring.']]],
 ['p','Penktą valandą. Ateisi?','At five o\'clock. Will you come?'],
 ['m','Puiki idėja! Aš ateisiu.','Great idea! I\'ll come.','Say great idea, you\'ll come',[['Bloga idėja! Aš ateisiu.','Bad idea! I\'ll come.'],['Puiki idėja! Aš liksiu namie.','Great idea! I\'ll stay at home.']]],
 ['m','Koks tavo numeris?','What is your number?','Ask for his number',[['Koks tavo vardas?','What is your name?'],['Kokio dydžio?','What size?']]],
 ['p','Aštuoni, šeši, penki... Štai. Parašyk man!','Eight, six, five... There. Text me!'],
 ['m','Buvo malonu pasikalbėti. Iki rytojaus!','It was nice to talk. See you tomorrow!','Say it was nice to talk, and see you tomorrow',[['Buvo nuobodu. Iki rytojaus!','It was boring. See you tomorrow!'],['Buvo malonu pasikalbėti. Labanakt rytoj!','It was nice to talk. Good night tomorrow!']]],
 ['p','Man irgi! Iki rytojaus!','Me too! See you tomorrow!'],
]},
{id:'cv5',title:'At the market',cast:[{name:'Aldona',voice:'ona'}],scene:'Saturday at the market (turgus). You want some apples.',lines:[
 ['p','Laba diena! Prašau?','Good day! What would you like?'],
 ['m','Laba diena! Ar turite obuolių?','Good day! Do you have apples?','Greet her and ask if she has apples',[['Laba diena! Aš esu studentas.','Good day! I am a student.'],['Labanakt! Kur tualetas?','Good night! Where is the toilet?']]],
 ['p','Taip, žinoma! Raudoni ar žali?','Yes, of course! Red or green?'],
 ['m','Aš imu šitą.','I\'ll take this one.','Point and say you\'ll take this one',[['Tik žiūriu.','Just looking.'],['Per mažas.','Too small.']]],
 ['p','Gerai. Kiek kilogramų?','OK. How many kilos?'],
 ['m','Du, prašau.','Two, please.','Say two, please',[['Dešimt eurų.','Ten euros.'],['Trečias.','Third.']]],
 ['p','Prašau. Viskas?','Here you go. Is that all?'],
 ['m','Kiek tai kainuoja?','How much is this?','Point at the cheese and ask how much it is',[['Kur tualetas?','Where is the toilet?'],['Kiek tau metų?','How old are you?']]],
 ['p','Sūris? Penki eurai.','The cheese? Five euros.'],
 ['c',[
   ['Brangu!','That\'s expensive!','Say it is expensive',[
     ['p','Gerai, gerai. Keturi eurai.','OK, OK. Four euros.'],
     ['m','Gerai, aš imu.','OK, I\'ll take it.','Agree and take it',[['Tik žiūriu.','Just looking.'],['Ne, ačiū.','No, thanks.']]],
     ['p','Iš viso šeši eurai.','Six euros altogether.']],
     [['Pigu!','Cheap!'],['Skanu!','Tasty!']]],
   ['Gerai, aš imu.','OK, I\'ll take it.','Agree and take it',[['p','Iš viso septyni eurai.','Seven euros altogether.']],[['Tik žiūriu.','Just looking.'],['Skanu!','Tasty!']]],
 ]],
 ['m','Ar galima mokėti kortele?','Can I pay by card?','Ask if you can pay by card',[['Ar galiu pasimatuoti?','Can I try it on?'],['Ar turite?','Do you have?']]],
 ['p','Ne, tik grynaisiais.','No, cash only.'],
 ['m','Gerai. Prašau.','OK. Here you go.','Say OK and hand her the money',[['Maišelis.','Bag.'],['Labanakt.','Good night.']]],
 ['p','Ačiū! Štai jūsų grąža.','Thank you! Here is your change.'],
 ['m','Ačiū! Viso gero!','Thanks! Goodbye!','Thank her and say goodbye',[['Su gimtadieniu!','Happy birthday!'],['Į sveikatą!','Cheers!']]],
]},
{id:'cv6',title:'Making plans',cast:[{name:'Rūta',voice:'ona'}],scene:'Friday afternoon. Your friend Rūta sends you a message.',lines:[
 ['p','Labas! Ką veiki savaitgalį?','Hi! What are you doing at the weekend?'],
 ['m','Nieko ypatingo. O tu?','Nothing special. What about you?','Say nothing special and ask her',[['Aš esu mokytojas.','I am a teacher.'],['Septintą valandą.','At seven o\'clock.']]],
 ['p','Šeštadienį einu į kiną. Ar nori eiti kartu?','On Saturday I\'m going to the cinema. Do you want to go together?'],
 ['m','Taip, noriu!','Yes, I\'d like to!','Say yes',[['Aš vėluoju!','I\'m running late!'],['Dar kartą.','One more time.']]],
 ['p','Puiku! Kelintą valandą?','Great! What time?'],
 ['c',[
   ['Gal septintą valandą?','Maybe at seven o\'clock?','Suggest seven o\'clock',[['p','Septintą tinka! Kur susitiksime?','Seven works! Where shall we meet?']],[['Kiek valandų?','What time is it?'],['Kelintą valandą?','At what time?']]],
   ['Gal aštuntą valandą?','Maybe at eight o\'clock?','Suggest eight o\'clock',[
     ['p','Aštuntą per vėlu. Gal septintą?','Eight is too late. Maybe seven?'],
     ['m','Gerai, septintą.','OK, seven.','Agree to seven',[['Kiek valandų?','What time is it?'],['Rytoj.','Tomorrow.']]],
     ['p','Puiku! Kur susitiksime?','Great! Where shall we meet?']],
     [['Kiek valandų?','What time is it?'],['Kelintą valandą?','At what time?']]],
 ]],
 ['m','Prie kavinės.','By the café.','Suggest meeting by the café',[['Po pietų.','In the afternoon.'],['Rytoj.','Tomorrow.']]],
 ['p','Puiki idėja! Iki šeštadienio!','Great idea! See you Saturday!'],
 ['m','Sutarta! Iki!','Deal! Bye!','Agree and say bye',[['Aš nesuprantu.','I don\'t understand.'],['Labas rytas!','Good morning!']]],
 ['t','Saturday, 6:55 pm'],
 ['p','Aš jau čia. Kur tu?','I\'m already here. Where are you?'],
 ['m','Atsiprašau, aš vėluoju!','Sorry, I\'m running late!','Say sorry, you are running late',[['Aš esu studentas.','I am a student.'],['Puiki idėja!','Great idea!']]],
 ['p','Nieko tokio! Laukiu.','No problem! I\'ll wait.'],
]},
{id:'cv28',title:'Ar gali padėti?',cast:[{name:'Jonas',voice:'leonas'}],scene:'Jonas is moving to a new flat this weekend. He calls you.',lines:[
 ['p','Labas! Ar gali man padėti šeštadienį?','Hi! Can you help me on Saturday?'],
 ['c',[
   ['Taip, aš galiu padėti.','Yes, I can help.','Say yes, you can help',[['p','Ačiū! Aš keliuosi.','Thanks! I\'m moving house.']],[['Taip, aš moku plaukti.','Yes, I know how to swim.'],['Taip, aš noriu miegoti.','Yes, I want to sleep.']]],
   ['Aš negaliu. Aš turiu dirbti.','I can\'t. I have to work.','Say you can\'t, you have to work',[
     ['p','O sekmadienį?','And on Sunday?'],
     ['m','Taip, aš galiu padėti.','Yes, I can help.','Say yes, you can help',[['Taip, aš nemoku šokti.','Yes, I can\'t dance.'],['Ne, nereikia.','No, there\'s no need.']]],
     ['p','Puiku! Tada sekmadienį.','Great! Sunday, then.']],
     [['Aš negaliu. Aš turiu miegoti.','I can\'t. I have to sleep.'],['Aš galiu. Aš turiu eiti.','I can. I have to go.']]],
 ]],
 ['p','Ar moki vairuoti? Aš turiu mašiną, bet esu pavargęs.','Can you drive? I have a car, but I\'m tired.'],
 ['c',[
   ['Taip, aš moku vairuoti.','Yes, I can drive.','Say yes, you can drive',[['p','Puiku! Ačiū!','Great! Thanks!']],[['Taip, aš moku plaukti.','Yes, I can swim.'],['Ne, aš nemoku šokti.','No, I can\'t dance.']]],
   ['Ne, aš nemoku vairuoti.','No, I can\'t drive.','Say no, you can\'t drive',[['p','Nieko tokio. Aš moku.','No problem. I can drive.']],[['Ne, aš nemoku šokti.','No, I can\'t dance.'],['Ne, man reikia pinigų.','No, I need money.']]],
 ]],
 ['p','Padėk man, prašau!','Help me, please! (The sofa is very heavy.)'],
 ['m','Nieko tokio. Aš galiu padėti.','No problem. I can help.','Say no problem, you can help',[['Nieko tokio. Aš noriu miegoti.','No problem. I want to sleep.'],['Gerai. Čia negalima rūkyti.','OK. No smoking here.']]],
 ['t','At the new flat'],
 ['p','Ačiū! Ar nori valgyti?','Thanks! Do you want to eat?'],
 ['c',[
   ['Taip, aš noriu valgyti!','Yes, I want to eat!','Say yes, you want to eat',[['p','Aš irgi!','Me too!']],[['Taip, aš noriu miegoti!','Yes, I want to sleep!'],['Taip, aš turiu dirbti!','Yes, I have to work!']]],
   ['Ne, ačiū. Aš noriu miegoti.','No, thanks. I want to sleep.','Say no thanks, you want to sleep',[['p','Suprantu! Aš irgi.','I understand! Me too.']],[['Ne, ačiū. Aš noriu valgyti.','No, thanks. I want to eat.'],['Ne, ačiū. Aš moku plaukti.','No, thanks. I can swim.']]],
 ]],
 ['p','Ačiū už viską! Ar tau reikia pinigų?','Thanks for everything! Do you need money for a taxi?'],
 ['m','Nereikia, ačiū.','There\'s no need, thanks.','Say there\'s no need, thanks',[['Taip, man reikia eiti.','Yes, I need to go.'],['Ne, aš negaliu.','No, I can\'t.']]],
 ['p','Labai ačiū, Tomai!','Thank you so much, Tomas!'],
 ['m','Man reikia eiti. Iki!','I need to go. Bye!','Say you need to go, and bye',[['Man reikia pinigų. Iki!','I need money. Bye!'],['Aš noriu valgyti. Labas!','I want to eat. Hi!']]],
]},
{id:'cv7',title:'Ką veiki savaitgalį?',cast:[{name:'Rūta',voice:'ona'}],scene:'Friday after work. You and Rūta have a coffee and talk about the weekend.',lines:[
 ['p','Jau penktadienis! Ką veiki?','Friday already! What are you up to?'],
 ['m','Nieko ypatingo. O tu?','Nothing special. And you?','Say nothing special, and ask her back',[['Aš esu iš Amerikos. O tu?','I am from America. And you?'],['Labai malonu. O tu?','Very nice. And you?']]],
 ['p','Aš? Savaitgalį žaidžiu krepšinį. Ar tau patinka krepšinis?','Me? At the weekend I play basketball. Do you like basketball?'],
 ['c',[
   ['Taip, man labai patinka!','Yes, I really like it!','Say yes, you really like it',[['p','Puiku! Lietuvoje visi žaidžia krepšinį!','Great! In Lithuania everyone plays basketball!']],[['Taip, aš moku plaukti!','Yes, I can swim!'],['Ne, aš žaidžiu krepšinį!','No, I play basketball!']]],
   ['Ne, man nepatinka.','No, I don\'t like it.','Say no, you don\'t like it',[['p','Ką?! Lietuvoje visi žaidžia krepšinį!','What?! In Lithuania everyone plays basketball!']],[['Ne, aš nemoku šokti.','No, I can\'t dance.'],['Taip, man nepatinka.','Yes, I don\'t like it.']]],
 ]],
 ['p','O ką tu mėgsti veikti?','And what do you like to do?'],
 ['c',[
   ['Aš mėgstu skaityti.','I like to read.','Say you like to read',[['p','Aš irgi! Man patinka knygos.','Me too! I like books.']],[['Aš moku skaityti.','I know how to read.'],['Aš turiu skaityti.','I have to read.']]],
   ['Aš mėgstu keliauti.','I like to travel.','Say you like to travel',[['p','Puiku! Aš irgi!','Great! Me too!']],[['Aš turiu keliauti.','I have to travel.'],['Aš negaliu keliauti.','I can\'t travel.']]],
   ['Aš mėgstu gaminti.','I like to cook.','Say you like to cook',[['p','Puiku! Aš irgi mėgstu gaminti.','Great! I like to cook too.']],[['Aš noriu valgyti.','I want to eat.'],['Aš esu alkanas.','I am hungry.']]],
 ]],
 ['p','O muzika? Ar tau patinka muzika?','And music? Do you like music?'],
 ['m','Taip, aš klausausi muzikos.','Yes, I listen to music.','Say yes, you listen to music',[['Taip, aš žaidžiu krepšinį.','Yes, I play basketball.'],['Ne, aš sergu.','No, I am sick.']]],
 ['p','Šeštadienį koncertas!','There\'s a concert on Saturday!'],
 ['m','Man patinka muzika!','I like music!','Say you like music',[['Man patinka Lietuva!','I like Lithuania!'],['Man nepatinka muzika!','I don\'t like music!']]],
 ['p','Gerai, man reikia eiti. Iki!','OK, I need to go. Bye!'],
 ['m','Ačiū! Iki!','Thanks! Bye!','Thank her and say bye',[['Labas! Iki!','Hi! Bye!'],['Skanaus! Iki!','Enjoy your meal! Bye!']]],
]},
{id:'cv8',title:'Checking in',cast:[{name:'Darius',voice:'leonas'}],scene:'You arrive at your hotel in Klaipėda. Darius is at reception.',lines:[
 ['p','Laba diena! Sveiki atvykę.','Good afternoon! Welcome.'],
 ['m','Laba diena! Aš turiu rezervaciją.','Good afternoon! I have a reservation.','Greet him and say you have a reservation',[['Bilietą į Kauną, prašau.','A ticket to Kaunas, please.'],['Aš išvykstu rytoj.','I\'m leaving tomorrow.']]],
 ['p','Koks jūsų vardas?','What is your name?'],
 ['m','Mano vardas Tomas.','My name is Tomas.','Tell him your name',[['Aš esu iš Amerikos.','I am from America.'],['Dviem naktims.','For two nights.']]],
 ['p','Taip, Tomai. Dviem naktims?','Yes, Tomas. For two nights?'],
 ['c',[
   ['Taip, dviem naktims.','Yes, for two nights.','Say yes, two nights',[],[['Staliuką dviem, prašau.','A table for two, please.'],['Aš išvykstu rytoj.','I\'m leaving tomorrow.']]],
   ['Ne, vienai nakčiai.','No, for one night.','Say no, for one night',[['p','Atsiprašau! Taip, vienai nakčiai.','Sorry! Yes, for one night.']],[['Staliuką dviem, prašau.','A table for two, please.'],['Dviem naktims.','For two nights.']]],
 ]],
 ['p','Jūsų pasas, prašau.','Your passport, please.'],
 ['m','Prašau.','Here you go.','Hand it over',[['Atsiprašau.','Sorry.'],['Neveikia.','It doesn\'t work.']]],
 ['p','Ačiū. Štai raktas.','Thank you. Here is the key.'],
 ['m','Ar pusryčiai įskaičiuoti?','Is breakfast included?','Ask if breakfast is included',[['Kada išvyksta?','When does it leave?'],['Kur yra platforma?','Where is the platform?']]],
 ['p','Taip!','Yes, it is!'],
 ['m','Koks Wi-Fi slaptažodis?','What is the Wi-Fi password?','Ask for the Wi-Fi password',[['Kiek kainuoja iki oro uosto?','How much to the airport?'],['Kada atvyksta?','When does it arrive?']]],
 ['p','Jis čia.','It\'s here, on the key card.'],
 ['m','Puiku, labai ačiū!','Great, thank you very much!','Say great and thank him',[['Triukšminga.','Noisy.'],['Lėčiau, prašau.','Slower, please.']]],
 ['t','Later that evening'],
 ['p','Labas vakaras! Kuo galiu padėti?','Good evening! How can I help?'],
 ['c',[
   ['Dušas neveikia.','The shower doesn\'t work.','Say the shower doesn\'t work',[['p','Atsiprašau! Tuoj!','Sorry! Someone will come right away.']],[['Lova.','Bed.'],['Aš išvykstu rytoj.','I\'m leaving tomorrow.']]],
   ['Triukšminga.','It\'s noisy.','Say it\'s noisy',[['p','Atsiprašau! Kitą kambarį?','Sorry! Another room?']],[['Lova.','Bed.'],['Aš išvykstu rytoj.','I\'m leaving tomorrow.']]],
 ]],
 ['m','Ačiū!','Thank you!','Thank him',[['Gelbėkite!','Help! (emergency)'],['Sveiki!','Hello!']]],
]},
{id:'cv9',title:'At the pharmacy',cast:[{name:'Jurgita',voice:'ona'}],scene:'You wake up with a headache and walk into a pharmacy (vaistinė).',lines:[
 ['p','Laba diena. Kuo galiu padėti?','Good afternoon. How can I help?'],
 ['m','Laba diena. Aš sergu.','Good afternoon. I am sick.','Greet her and say you are sick',[['Laba diena. Aš pasiklydau.','Good afternoon. I\'m lost.'],['Laba diena. Mane apvogė.','Good afternoon. I was robbed.']]],
 ['p','Kas jums skauda?','What hurts?'],
 ['m','Man skauda galvą.','My head hurts.','Say your head hurts',[['Man šalta.','I\'m cold.'],['Aš pamečiau pasą.','I lost my passport.']]],
 ['p','Ar turite temperatūros?','Do you have a fever?'],
 ['c',[
   ['Aš nežinau.','I don\'t know.','Say you don\'t know',[['p','Nieko tokio.','No problem.']],[['Aš gerai.','I\'m fine.'],['Žinoma.','Of course.']]],
   ['Taip, turiu temperatūros.','Yes, I have a fever.','Say yes, you have a fever',[['p','Tada daug vandens!','Then lots of water!']],[['Aš gerai.','I\'m fine.'],['Žinoma.','Of course.']]],
 ]],
 ['p','Štai vaistai. Viena tabletė, tris kartus per dieną.','Here is the medicine. One tablet, three times a day.'],
 ['m','Ar galite pakartoti?','Can you repeat that?','Ask her to repeat that',[['Aš suprantu.','I understand.'],['Kur tualetas?','Where is the toilet?']]],
 ['p','Viena tabletė. Tris kartus per dieną.','One tablet. Three times a day.'],
 ['m','Supratau. Kiek kainuoja?','Got it. How much is it?','Say you got it and ask the price',[['Supratau. Ar toli?','Got it. Is it far?'],['Supratau. Ar galima?','Got it. May I?']]],
 ['p','Aštuoni eurai.','Eight euros.'],
 ['m','Ar galima mokėti kortele?','Can I pay by card?','Ask if you can pay by card',[['Ar turite?','Do you have?'],['Ar galite man padėti?','Can you help me?']]],
 ['p','Taip, prašau!','Yes, of course!'],
 ['m','Labai ačiū! Viso gero!','Thank you very much! Goodbye!','Thank her and say goodbye',[['Padėkite!','Please help!'],['Į sveikatą!','Cheers!']]],
]},
{id:'cv10',title:'Dinner with friends',cast:[{name:'Rūta',voice:'ona'},{name:'Jonas',voice:'leonas'}],scene:'Rūta invites you to dinner at her flat. Jonas is there too. Use everything you know.',lines:[
 ['p','Labas vakaras! Užeik!','Good evening! Come in!'],
 ['m','Labas vakaras! Čia tau dovana.','Good evening! This is a gift for you.','Greet her and give her a gift',[['Labanakt! Sąskaitą, prašau.','Good night! The bill, please.'],['Labas rytas! Aš pasiklydau.','Good morning! I\'m lost.']]],
 ['p','Ačiū! Labai gražu!','Thank you! It\'s beautiful!'],
 ['p','Sveikas, Tomai! Kaip sekasi?','Hi, Tomas! How are you?',1],
 ['m','Puikiai, ačiū. O tau?','Great, thanks. And you?','Say you are great and ask him back',[['Aš esu iš Amerikos.','I am from America.'],['Aš alergiškas riešutams.','I\'m allergic to nuts.']]],
 ['p','Gerai, bet šiandien esu labai pavargęs.','Good, but I\'m very tired today.',1],
 ['m','Aš irgi!','Me too!','Say me too',[['Su gimtadieniu!','Happy birthday!'],['Neblogai.','Not bad.']]],
 ['p','Ar esi alkanas? Turiu cepelinų!','Are you hungry? I have cepelinai!'],
 ['c',[
   ['Taip, aš esu alkanas!','Yes, I am hungry!','Say yes, you are hungry',[['p','Skanaus!','Enjoy your meal!']],[['Man karšta!','I\'m hot!'],['Aš vėluoju!','I\'m running late!']]],
   ['Atsiprašau, aš nevalgau mėsos.','Sorry, I don\'t eat meat.','Say sorry, you don\'t eat meat',[
     ['p','Nieko tokio! Turiu ir sriubos. Skanaus!','No problem! I have soup too. Enjoy!']],
     [['Man karšta!','I\'m hot!'],['Aš vėluoju!','I\'m running late!']]],
 ]],
 ['m','Ačiū! Labai skanu!','Thanks! Very tasty!','Thank her and say it is very tasty',[['Ačiū! Labai brangu!','Thanks! Very expensive!'],['Ačiū! Aš sergu!','Thanks! I\'m sick!']]],
 ['p','Tomai, ar tau patinka Vilnius?','Tomas, do you like Vilnius?',1],
 ['m','Taip, labai! Vilnius labai gražus.','Yes, a lot! Vilnius is very beautiful.','Say yes, Vilnius is very beautiful',[['Ne, neturiu.','No, I don\'t.'],['Taip, dviem naktims.','Yes, for two nights.']]],
 ['p','O ką veiki rytoj?','And what are you doing tomorrow?',1],
 ['m','Rytoj aš važiuoju į Kauną.','Tomorrow I\'m going to Kaunas.','Say tomorrow you are going to Kaunas',[['Šiandien negaliu.','I can\'t today.'],['Aš gyvenu Vilniuje.','I live in Vilnius.']]],
 ['p','Puiku! Mano mama gyvena Kaune.','Great! My mom lives in Kaunas.',1],
 ['p','Į sveikatą!','Cheers!'],
 ['m','Į sveikatą!','Cheers!','Raise your glass',[['Sveiki atvykę!','Welcome!'],['Gelbėkite!','Help! (emergency)']]],
 ['t','Later'],
 ['m','Labai ačiū! Iki pasimatymo!','Thank you very much! See you later!','Thank them and say see you later',[['Labas! Iki pasimatymo!','Hi! See you later!'],['Atsiprašau! Aš nesuprantu!','Sorry! I don\'t understand!']]],
 ['p','Ačiū! Labanakt!','Thank you! Good night!'],
]},
{id:'cv20',title:'Kiek kainuoja?',cast:[{name:'Birutė',voice:'ona'}],scene:'There is a little kiosk near your home. Birutė, a friendly older woman, runs it, and her grandson often helps.',lines:[
 ['p','Laba diena! Prašau?','Good afternoon! What can I get you?'],
 ['m','Laba diena! Kiek kainuoja kava?','Good afternoon! How much is the coffee?','Say good afternoon and ask how much the coffee is',[['Labanakt! Kas tai?','Good night! What\'s that?'],['Laba diena! Kur yra kava?','Good afternoon! Where is the coffee?']]],
 ['p','Kava? Du eurai.','The coffee? Two euros.'],
 ['m','O pyragas?','And the cake?','Ask about the cake',[['O kada?','And when?'],['Kodėl pyragas?','Why cake?']]],
 ['p','Pyragas – vienas euras. Kiek?','Cake is one euro. How many?'],
 ['m','Trys, prašau.','Three, please.','Say three, please',[['Trisdešimt, prašau.','Thirty, please.'],['Trečias, prašau.','The third, please.']]],
 ['p','Trys pyragai ir kava. Penki eurai.','Three cakes and the coffee. Five euros.'],
 ['m','Atsiprašau, kiek?','Sorry, how much?','Say sorry, and ask how much',[['Atsiprašau, kur?','Sorry, where?'],['Atsiprašau, kas?','Sorry, who?']]],
 ['p','Penki. Penki eurai.','Five. Five euros.'],
 ['m','Prašau, dešimt eurų.','Here you go, ten euros.','Hand her ten euros',[['Prašau, du eurai.','Here you go, two euros.'],['Prašau, šimtas eurų.','Here you go, a hundred euros.']]],
 ['p','Ačiū. Štai penki eurai.','Thanks. Here are five euros back.'],
 ['t','A small boy peeks out from behind the counter'],
 ['p','Čia mano anūkas, Lukas.','This is my grandson, Lukas.'],
 ['m','Labas! Kiek tau metų?','Hi! How old are you?','Say hi to him and ask how old he is',[['Labas! Kiek kainuoja?','Hi! How much is it?'],['Labas! Kur tu gyveni?','Hi! Where do you live?']]],
 ['p','Penkeri!','Five! (He holds up five fingers.)'],
 ['p','O tau? Kiek tau metų?','And you? How old are you? (Lukas wants to know.)'],
 ['c',[
   ['Man dvidešimt metų.','I\'m twenty.','Say you are twenty',[['p','Dvidešimt! Daug!','Twenty! That\'s a lot!']],[['Man dvylika metų.','I\'m twelve.'],['Man šimtas metų.','I\'m a hundred.']]],
   ['Man trisdešimt metų.','I\'m thirty.','Say you are thirty',[['p','Trisdešimt! Labai daug!','Thirty! That\'s a lot!']],[['Man trylika metų.','I\'m thirteen.'],['Man tūkstantis metų.','I\'m a thousand.']]],
 ]],
 ['p','Labai ačiū! Iki pasimatymo!','Thank you very much! See you again!'],
 ['m','Ačiū! Viso gero!','Thanks! Goodbye!','Thank her and say goodbye',[['Labas rytas!','Good morning!'],['Kiek kainuoja?','How much is it?']]],
]},
{id:'cv21',title:'Kada susitinkame?',cast:[{name:'Jonas',voice:'leonas'}],scene:'Jonas wants to go to the museum with you this week. He texts you while you are at work.',lines:[
 ['p','Labas! Ar tu dabar dirbi?','Hi! Are you working right now?'],
 ['m','Taip, dabar aš dirbu.','Yes, I\'m working now.','Say yes, you are working now',[['Taip, vakar aš dirbu.','Yes, yesterday I work.'],['Ne, aš miegu.','No, I\'m sleeping.']]],
 ['p','Ar tu rytoj dirbi?','Are you working tomorrow? (She wants to go to the museum with you.)'],
 ['m','Rytoj aš irgi dirbu.','Tomorrow I\'m working too.','Say you are working tomorrow too',[['Vakar aš irgi dirbu.','Yesterday I\'m working too.'],['Rytoj aš skubu.','Tomorrow I\'m in a hurry.']]],
 ['p','O šiandien?','And today?'],
 ['m','Šiandien aš mokausi lietuvių kalbos.','Today I\'m studying Lithuanian.','Say today you are studying Lithuanian',[['Šiandien aš miegu.','Today I\'m sleeping.'],['Vakar aš mokausi.','Yesterday I\'m studying.']]],
 ['p','Gerai! Tai kada?','OK! So when?'],
 ['c',[
   ['Šeštadienis?','Saturday?','Suggest Saturday',[['p','Šeštadienis? Puiku!','Saturday? Great!']],[['Pirmadienis?','Monday?'],['Vakar?','Yesterday?']]],
   ['Sekmadienis?','Sunday?','Suggest Sunday',[['p','Sekmadienis? Puiku!','Sunday? Great!']],[['Antradienis?','Tuesday?'],['Vakar?','Yesterday?']]],
 ]],
 ['p','Kada? Dvyliktą?','What time? At twelve?'],
 ['m','Taip, gerai. Kur?','Yes, fine. Where?','Say yes, fine, and ask where',[['Ne, ačiū. Kada?','No, thanks. When?'],['Taip, gerai. Kodėl?','Yes, fine. Why?']]],
 ['p','Katedra.','At the Cathedral. (There is a café there.)'],
 ['m','Gerai! Iki pasimatymo!','OK! See you then!','Say OK, see you then',[['Labanakt! Iki!','Good night! Bye!'],['Gerai! Labas rytas!','OK! Good morning!']]],
 ['t','The day comes. You run up to the café'],
 ['p','Labas! Tu vėluoji!','Hi! You\'re late!'],
 ['m','Atsiprašau! Kiek valandų?','Sorry! What time is it?','Say sorry and ask what time it is',[['Atsiprašau! Kiek kainuoja?','Sorry! How much is it?'],['Atsiprašau! Kiek tau metų?','Sorry! How old are you?']]],
 ['p','Jau dvylika trisdešimt!','It\'s already twelve thirty!'],
 ['m','Atsiprašau! Šiandien aš moku.','Sorry! Today I\'m paying.','Say sorry, and that you are paying today',[['Atsiprašau! Vakar aš moku.','Sorry! Yesterday I\'m paying.'],['Atsiprašau! Aš miegu.','Sorry! I\'m sleeping.']]],
 ['p','Gerai! Einame į muziejų?','OK! Shall we go to the museum?'],
 ['m','Taip, einame!','Yes, let\'s go!','Say yes, let\'s go',[['Ne, aš sėdžiu.','No, I\'m sitting.'],['Taip, aš miegu.','Yes, I\'m sleeping.']]],
]},
{id:'cv11',title:'My day',cast:[{name:'Rūta',voice:'ona'}],scene:'Rūta is curious how your days go in Vilnius, from morning to night.',lines:[
 ['p','Labas! Kada tu keliesi?','Hi! When do you get up?'],
 ['m','Aš keliuosi septintą valandą.','I get up at seven.','Say you get up at seven',[['Aš einu miegoti.','I go to bed.'],['Aš esu studentas.','I am a student.']]],
 ['p','Gerai! O tada?','Nice! And then?'],
 ['m','Aš prausiuosi ir geriu kavą.','I wash and drink coffee.','Say you wash and drink coffee',[['Aš gaminu vakarienę.','I cook dinner.'],['Aš einu miegoti.','I go to bed.']]],
 ['p','Aš irgi! Ar tu dirbi iš namų?','Me too! Do you work from home?'],
 ['c',[
   ['Ne, aš einu į darbą.','No, I go to work.','Say no, you go to work',[
     ['p','Kaip tu važiuoji?','How do you get there?'],
     ['m','Aš važiuoju autobusu.','I go by bus.','Say you go by bus',[['Aš skambinu mamai.','I call my mom.'],['Aš einu miegoti.','I go to bed.']]],
     ['p','Ar tu daug dirbi?','Do you work a lot?'],
     ['m','Aš dirbu iki penkių.','I work until five.','Say you work until five',[['Aš keliuosi septintą valandą.','I get up at seven.'],['Aš miegu aštuonias valandas.','I sleep eight hours.']]]],
     [['Aš skubu.','I\'m in a hurry.'],['Aš miegu.','I sleep.']]],
   ['Taip, aš dirbu iš namų.','Yes, I work from home.','Say yes, you work from home',[
     ['p','Gerai! Ar visada?','Good! Always?'],
     ['m','Ne. Kartais aš dirbu iš namų.','No. Sometimes I work from home.','Say no, only sometimes you work from home',[['Taip, aš niekada nevėluoju.','Yes, I\'m never late.'],['Aš visada geriu kavą.','I always drink coffee.']]]],
     [['Aš skubu.','I\'m in a hurry.'],['Aš miegu.','I sleep.']]],
 ]],
 ['p','Ir tada?','And then?'],
 ['m','Aš grįžtu namo ir gaminu vakarienę.','I come home and cook dinner.','Say you come home and cook dinner',[['Aš išeinu iš namų.','I leave home.'],['Aš pusryčiauju.','I have breakfast.']]],
 ['p','Puiku. Aš kasdien žiūriu filmą! O tu?','Great. I watch a film every day! And you?'],
 ['m','Kartais.','Sometimes.','Say sometimes',[['Niekada.','Never.'],['Kasdien.','Every day.']]],
 ['p','O kiek tu miegi?','And how much do you sleep?'],
 ['m','Aš miegu aštuonias valandas.','I sleep eight hours.','Say you sleep eight hours',[['Aš dirbu iki penkių.','I work until five.'],['Aš keliuosi septintą valandą.','I get up at seven.']]],
 ['p','Aštuonias! Gerai. Ar tu kartais vėluoji?','Eight! Good. Are you ever late?'],
 ['m','Ne, aš niekada nevėluoju!','No, I\'m never late!','Say no, you are never late',[['Taip, aš visada miegu.','Yes, I always sleep.'],['Aš retai geriu kavą.','I rarely drink coffee.']]],
 ['p','Puiku! Iki!','Great! Bye!'],
 ['m','Iki!','Bye!','Say bye',[['Labas rytas!','Good morning!'],['Ačiū!','Thank you!']]],
]},
{id:'cv12',title:'Buying a jacket',cast:[{name:'Inga',voice:'ona'}],scene:'It\'s getting cold, so you go into a clothes shop. Inga works there.',lines:[
 ['p','Laba diena! Ar galiu padėti?','Good afternoon! Can I help?'],
 ['m','Tik žiūriu, ačiū.','Just looking, thanks.','Say you\'re just looking, thanks',[['Aš ieškau stoties.','I\'m looking for the station.'],['Sąskaitą, prašau.','The bill, please.']]],
 ['t','A few minutes later'],
 ['p','Ši striukė labai graži!','This jacket is very nice!'],
 ['m','Man patinka ši striukė.','I like this jacket.','Say you like this jacket',[['Man nepatinka.','I don\'t like it.'],['Per mažas.','Too small.']]],
 ['p','Kokio dydžio?','What size?'],
 ['m','Mano dydis vidutinis.','My size is medium.','Say your size is medium',[['Kiek kainuoja?','How much does it cost?'],['Ar yra mažesnis?','Is there a smaller one?']]],
 ['p','Prašau. Matavimosi kabina ten.','Here you go. The fitting room is there.'],
 ['t','A minute later'],
 ['p','Ir kaip?','So, how is it?'],
 ['m','Netinka. Ar yra didesnis?','It doesn\'t fit. Is there a bigger one?','Say it doesn\'t fit and ask for a bigger one',[['Tinka. Aš imu šitą.','It fits. I\'ll take this one.'],['Ar yra mažesnis?','Is there a smaller one?']]],
 ['p','Taip, štai.','Yes, here you are.'],
 ['m','Tinka! Kiek kainuoja?','It fits! How much is it?','Say it fits and ask the price',[['Netinka.','It doesn\'t fit.'],['Kur tualetas?','Where is the toilet?']]],
 ['p','Šimtas eurų.','A hundred euros.'],
 ['m','Brangu! Ar yra nuolaida?','That\'s expensive! Is there a discount?','Say it\'s expensive and ask about a discount',[['Pigu!','Cheap!'],['Aš pagalvosiu.','I\'ll think about it.']]],
 ['p','Šiandien yra dešimt procentų nuolaida.','Today there\'s a ten percent discount.'],
 ['c',[
   ['Gerai, aš imu.','OK, I\'ll take it.','Agree and take it',[],[['Tik žiūriu.','Just looking.'],['Netinka.','It doesn\'t fit.']]],
   ['Aš pagalvosiu.','I\'ll think about it.','Say you\'ll think about it',[
     ['p','Gerai. Bet nuolaida tik šiandien!','OK. But the discount is only today!'],
     ['m','Gerai, gerai. Aš imu.','OK, OK. I\'ll take it.','Give in and take it',[['Tik žiūriu.','Just looking.'],['Netinka.','It doesn\'t fit.']]]],
     [['Tik žiūriu.','Just looking.'],['Netinka.','It doesn\'t fit.']]],
 ]],
 ['p','Puiku! Kortele ar grynaisiais?','Great! Card or cash?'],
 ['m','Kortele, prašau.','By card, please.','Say by card',[['Su pienu.','With milk.'],['Mano dydis vidutinis.','My size is medium.']]],
 ['p','Ačiū! Viso gero!','Thank you! Goodbye!'],
 ['m','Ačiū! Viso gero!','Thanks! Goodbye!','Thank her and say goodbye',[['Labanakt!','Good night!'],['Skanaus!','Enjoy your meal!']]],
]},
{id:'cv13',title:'Holiday plans',cast:[{name:'Jonas',voice:'leonas'}],scene:'Summer is coming. Jonas asks about your holiday plans.',lines:[
 ['p','Labas! Kur važiuosi atostogų?','Hi! Where will you go on holiday?'],
 ['m','Vasarą aš važiuosiu prie jūros.','In summer I\'ll go to the seaside.','Say you\'ll go to the seaside in summer',[['Aš liksiu namie.','I will stay at home.'],['Aš dirbsiu.','I will work.']]],
 ['p','Puiku! Su kuo?','Great! With whom?'],
 ['m','Aš aplankysiu draugus.','I will visit friends.','Say you will visit friends',[['Aš skambinsiu.','I will call.'],['Aš pabandysiu.','I will try.']]],
 ['p','Kiek laiko būsi ten?','How long will you be there?'],
 ['m','Aš būsiu ten savaitę.','I will be there for a week.','Say you\'ll be there for a week',[['Aš būsiu namie.','I will be at home.'],['Kitais metais.','Next year.']]],
 ['p','Ar važiuosi traukiniu?','Will you go by train?'],
 ['m','Ne, aš važiuosiu autobusu.','No, I will go by bus.','Say no, you\'ll go by bus',[['Taip, aš skrisiu.','Yes, I will fly.'],['Aš važiuoju autobusu.','I go by bus.']]],
 ['p','Ar galiu važiuoti kartu?','Can I come along?'],
 ['c',[
   ['Taip, bus smagu!','Yes, it will be fun!','Say yes, it will be fun',[['p','Sutarta!','Deal!']],[['Ne, bus šalta.','No, it will be cold.'],['Kitais metais.','Next year.']]],
   ['Aš pagalvosiu.','I\'ll think about it.','Say you\'ll think about it',[['p','Gerai, pagalvok.','OK, think about it.']],[['Ne, bus šalta.','No, it will be cold.'],['Kitais metais.','Next year.']]],
 ]],
 ['p','O ką veiksi rytoj?','And what will you do tomorrow?'],
 ['m','Rytoj aš dirbsiu.','Tomorrow I will work.','Say tomorrow you will work',[['Vakar aš dirbau.','Yesterday I worked.'],['Aš liksiu namie.','I will stay at home.']]],
 ['p','Gerai. Iki!','OK. Bye!'],
 ['m','Sėkmės! Iki!','Good luck! Bye!','Wish him luck and say bye',[['Labas rytas!','Good morning!'],['Skanaus!','Enjoy your meal!']]],
]},
{id:'cv14',title:'The weekend',cast:[{name:'Rūta',voice:'ona'}],scene:'It\'s Monday. Rūta wants to hear about your weekend.',lines:[
 ['p','Labas! Kaip praėjo savaitgalis?','Hi! How was the weekend?'],
 ['m','Labai gerai! Buvo smagu.','Very good! It was fun.','Say very good, it was fun',[['Buvo nuobodu.','It was boring.'],['Bus smagu!','It will be fun!']]],
 ['p','Ką veikei?','What did you do?'],
 ['m','Aš buvau mieste.','I was in town.','Say you were in town',[['Aš buvau namie.','I was at home.'],['Aš būsiu mieste.','I will be in town.']]],
 ['p','O ką ten veikei?','And what did you do there?'],
 ['m','Aš susitikau su draugu.','I met a friend.','Say you met a friend',[['Aš nupirkau dovaną.','I bought a present.'],['Aš kalbėjau su mama.','I talked to my mom.']]],
 ['p','Ar valgėte kur nors?','Did you eat somewhere?'],
 ['m','Taip, mes valgėme restorane.','Yes, we ate at a restaurant.','Say yes, you ate at a restaurant',[['Ne, aš nevalgiau.','No, I didn\'t eat.'],['Mes valgysime restorane.','We will eat at a restaurant.']]],
 ['p','Ar tau patiko?','Did you like it?'],
 ['c',[
   ['Labai patiko, bet buvo brangu.','I liked it a lot, but it was expensive.','Say you liked it a lot but it was expensive',[],[['Buvo pigu.','It was cheap.'],['Bus smagu!','It will be fun!']]],
   ['Man nepatiko.','I didn\'t like it.','Say you didn\'t like it',[
     ['p','Kodėl?','Why?'],
     ['m','Nes buvo brangu.','Because it was expensive.','Say because it was expensive',[['Buvo pigu.','It was cheap.'],['Bus smagu!','It will be fun!']]]],
     [['Buvo pigu.','It was cheap.'],['Bus smagu!','It will be fun!']]],
 ]],
 ['p','O sekmadienį?','And on Sunday?'],
 ['m','Aš buvau namie, nes buvo šalta.','I was at home, because it was cold.','Say you stayed home because it was cold',[['Aš buvau mieste.','I was in town.'],['Bus šalta.','It will be cold.']]],
 ['p','Ką veikei namie?','What did you do at home?'],
 ['m','Aš žiūrėjau filmą.','I watched a film.','Say you watched a film',[['Aš žiūriu filmą.','I watch a film.'],['Aš skaičiau knygą.','I read a book.']]],
 ['p','Smagu! Kitą savaitgalį einame kartu?','Nice! Shall we go together next weekend?'],
 ['m','Taip, bus smagu!','Yes, it will be fun!','Say yes, it will be fun',[['Buvo smagu!','It was fun!'],['Aš pagalvosiu.','I\'ll think about it.']]],
]},
{id:'cv15',title:'Dinner debate',cast:[{name:'Rūta',voice:'ona'},{name:'Jonas',voice:'leonas'}],scene:'Dinner with Rūta and Jonas again. This time they want your opinions. Use everything you know.',lines:[
 ['p','Aš manau, kad Kaunas gražesnis už Vilnių.','I think Kaunas is more beautiful than Vilnius.',1],
 ['p','Tikrai? Kaip tu manai, Tomai?','Really? What do you think, Tomas?'],
 ['c',[
   ['Aš nesutinku. Vilnius labai gražus.','I disagree. Vilnius is very beautiful.','Disagree and say Vilnius is very beautiful',[
     ['p','Kodėl tu taip manai?','Why do you think so?',1],
     ['m','Nes man patinka senas miestas.','Because I like the old town.','Say because you like the old town',[['Nes tai brangu.','Because it\'s expensive.'],['Priklauso.','It depends.']]],
     ['p','Aš sutinku su Tomu!','I agree with Tomas!']],
     [['Man tas pats.','I don\'t mind.'],['Priklauso.','It depends.']]],
   ['Aš sutinku su tavimi.','I agree with you.','Agree with Jonas',[
     ['p','Ačiū, Tomai!','Thanks, Tomas!',1],
     ['p','O aš nesutinku! Vilnius gražesnis.','Well, I disagree! Vilnius is more beautiful.']],
     [['Man tas pats.','I don\'t mind.'],['Priklauso.','It depends.']]],
 ]],
 ['p','Gerai, gerai. O kas geriau, kava ar arbata?','OK, OK. And what\'s better, coffee or tea?',1],
 ['m','Man labiau patinka kava.','I prefer coffee.','Say you prefer coffee',[['Arbata geresnė už kavą.','Tea is better than coffee.'],['Aš noriu miegoti.','I want to sleep.']]],
 ['p','Aš manau, kad arbata geresnė už kavą.','I think tea is better than coffee.'],
 ['m','Man tas pats.','I don\'t mind.','Say you don\'t mind',[['Aš sutinku.','I agree.'],['Negali būti!','No way!']]],
 ['p','O ką veiksi rytoj?','And what will you do tomorrow?',1],
 ['m','Rytoj aš dirbsiu, bet vakare aš būsiu namie.','Tomorrow I\'ll work, but in the evening I\'ll be at home.','Say you\'ll work tomorrow, but be home in the evening',[['Vakar aš dirbau.','Yesterday I worked.'],['Aš liksiu namie.','I will stay at home.']]],
 ['p','Tai ateik vakarienės!','Then come for dinner!'],
 ['m','Kaip smagu! Ačiū!','How nice! Thank you!','Say how nice and thank her',[['Kaip gaila!','What a pity!'],['Rimtai?','Seriously?']]],
 ['p','Buvo labai malonu.','It was very nice.',1],
 ['m','Man irgi. Iki pasimatymo!','Me too. See you!','Say me too, see you',[['Labas rytas!','Good morning!'],['Man tas pats.','No preference.']]],
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
/* With About me filled in, the course talks about you: your name where it says Tomas, your country where it says America,
   your work in the party chat, and a woman's words for a woman. Without answers the course stays as written.
   Recordings can't hold every name, so a line with your name in it plays a recording without the name. */
const PERS_ME=[['studentas','studentė'],['mokytojas','mokytoja'],['pensininkas','pensininkė'],['alkanas','alkana'],['alergiškas','alergiška'],
  ['bedarbis','bedarbė'],['sotus','soti'],['pavargęs','pavargusi'],['laimingas','laiminga'],['amerikietis','amerikietė']];
const PERS_THEM=[['Sveikas','Sveika'],['esi alkanas','esi alkana'],['atrodai pavargęs','atrodai pavargusi'],['geras draugas','gera draugė']];
const wordRe=w=>new RegExp('(?<!\\p{L})'+w+'(?!\\p{L})','gu');
/* Lithuanian changes a name's ending when you talk to someone (Tomas → Tomai) and after "su" (su Tomu). Other names stay as they are. */
function nameForms(n,g){const f=(stem,v,i)=>({nom:n,voc:stem+v,ins:stem+i});
  if(n.length>3&&/[^aeiouyąęėįųū]as$/i.test(n))return f(n.slice(0,-2),'ai','u');
  if(/ius$/i.test(n))return f(n.slice(0,-2),'au','umi');
  if(/[^aeiou]is$/i.test(n))return f(n.slice(0,-2),'i','iu');
  if(/ė$/.test(n))return f(n.slice(0,-1),'e','e');
  /* a man's name from another language that ends in a consonant: Mark → Markai, su Marku (not after s, x or z: James stays) */
  if(g==='m'&&n.length>1&&/[bcdfghjklmnprtvw]$/i.test(n))return Object.assign(f(n,'ai','u'),{lt:n+'as'}); /* lt: the Lithuanian form, Tom → Tomas */
  return {nom:n,voc:n,ins:n};}
/* The first time someone calls you by the changed name, a line explains it. */
const VOC_TIP=(nom,voc)=>'💡 <b>'+voc+'</b>, not '+nom+': '+LANG.en+' changes the end of a name when you talk to someone.';
const HAS_NAME=/\bTom(as|ai|u)\b/;
/* What the app needs to put you into the course (see personalise() in index.html). */
/* your name as Lithuanian says it: Tom → Tomas (names that already fit stay as they are) */
const ltName=(n,g)=>nameForms(n,g).lt||n;
const PERS={nameLine:(n,g)=>'Mano vardas '+ltName(n,g),nameAlts:(n,g)=>[...new Set(['Mano vardas '+ltName(n,g),'Aš esu '+ltName(n,g),'Mano vardas '+n,'Aš esu '+n])],fromRe:/iš Amerikos/,femDefault:'Toma',baseNames:['tomas','tomai','tomu','toma'],studentLine:'Aš esu studentas.',
  jobLine:(j,g)=>'Aš esu '+(g==='f'?j[3]:j[2])+'.'};
/* o: {name, g:'m'|'f', from:country code, au:true for the recording (which leaves the name out)} */
function persText(t,role,o){
  if(o.name&&o.au)t=t.replace(/,\s*Tomai(?=[.!?])/g,'').replace(/^Tomai,\s*(.)/,(_,c)=>c.toUpperCase()).replace(/\s+su Tomu(?=[.!?])/g,'').replace(/\s+Tomas(?=[.!?]|$)/g,'');
  else if(o.name){const n=nameForms(o.name,o.g);t=t.replace(/\bTomas\b/g,n.lt||n.nom).replace(/\bTomai\b/g,n.voc).replace(/\bTomu\b/g,n.ins);}
  if(o.g==='f'&&(role!=='me'||/(?<!\p{L})(aš|esu)(?!\p{L})/iu.test(t)))(role==='me'?PERS_ME:PERS_THEM).forEach(([a,b])=>{t=t.replace(wordRe(a),b);});
  if(o.from&&role==='me'){const c=ME_COUNTRIES.find(x=>x[0]===o.from);if(c)t=t.replace(/iš Amerikos/g,'iš '+c[2]);}
  return t;}
function persEn(t,role,o){if(o.name)t=t.replace(/\bTomas\b/g,o.name);
  if(o.from&&role==='me'){const c=ME_COUNTRIES.find(x=>x[0]===o.from);if(c)t=t.replace(/from America\b/g,'from '+c[1]);}return t;}
/* Every course line that can change, with whose words they are: 'me' (yours) or 'them' (someone talking to you). */
function persLines(){const out=[];const test={name:'X',g:'f',from:'gb'};
  ITEMS.forEach(i=>{const lt=i.lt0||i.lt;if(persText(lt,'me',test)!==lt)out.push([i,'me']);});
  CONVS.forEach(c=>c.all.forEach(l=>{if(!l.lt||l.kind==='t')return;const role=l.kind==='p'?'them':'me';const lt=l.lt0||l.lt;
    if(persText(lt,role,test)!==lt||(role==='me'&&lt==='Aš esu studentas.'))out.push([l,role]);}));
  return out;}
/* The About me recordings, by their words, so "Aš esu iš Anglijos." can borrow the one already made. */
let ME_TEXT=null;const meText=t=>{if(!ME_TEXT){ME_TEXT={};ME_BANK.forEach(i=>ME_TEXT[norm(i.lt)]=i.id);}return ME_TEXT[norm(t)];};
/* Which recording a personal line plays: the original, an About me one with the same words, or one made just for it (group me2). */
function persAudio(x,role,o){const lt=x.lt0||x.lt;const text=persText(lt,role,Object.assign({},o,{au:true}));
  if(text===lt)return {id:x.id,text};if(meText(text))return {id:meText(text),text};
  const fem=o.g==='f'&&persText(lt,role,{g:'f'})!==lt,from=role==='me'&&o.from&&/iš Amerikos/.test(lt)&&o.from!=='us';
  return {id:'me2:'+x.id+'~'+(o.name&&HAS_NAME.test(lt)?'n':'')+(fem?'f':'')+(from?o.from:''),text};}
/* Everything the recording tool needs to make for group me2. */
function persClips(){const out={};const froms=ME_COUNTRIES.map(c=>c[0]);
  persLines().forEach(([x,role])=>['m','f'].forEach(g=>(g==='f'?['X']:['','X']).forEach(name=>(role==='me'&&/iš Amerikos/.test(x.lt0||x.lt)?froms:['']).forEach(from=>{
    const a=persAudio(x,role,{name,g,from});if(a.id.startsWith('me2:'))out[a.id]=a.text;}))));
  return Object.entries(out).map(([id,text])=>({id,text}));}

/* "Built from": for a phrase, gloss each word from single-word items or the glue list. */
const WORDS={};ITEMS.forEach(i=>{if(i.lt.split(' ').length===1)WORDS[norm(i.lt)]=WORDS[norm(i.lt)]||i.en.split(' / ')[0].split(' (')[0];});
/* Inside a phrase some words mean something else than on their own: labas rytas is "good morning", iki pasimatymo "until we meet". */
const BF_SAY={'labas':'good (on its own: hi)','laba':'good','labą':'good','iki':'until','taip':'so (on its own: yes)'};
/* People's names inside a phrase are names, not the word they also are (Rūta is also "rue", the herb) */
const BF_NAME={'rūta':'(a name)','jonas':'(a name)','tomas':'(a name)'};
function builtFrom(item){const ws=item.lt.split(' ');if(ws.length<2)return '';
  /* (Round 7) your own name in a phrase ("Markas") says so */
  const me=typeof S!=='undefined'&&S.me&&S.me.name?[norm(S.me.name),norm(nameForms(S.me.name,S.me.g).lt||S.me.name)]:[];
  const parts=ws.map((w,i)=>{const k=norm(w).replace(/[?!.,]/g,'');const g=i>0&&me.includes(k)?'(your name)':i>0&&/^\p{Lu}/u.test(w)&&BF_NAME[k]?BF_NAME[k]:BF_SAY[k]&&!(i===ws.length-1||/[,.!?]$/.test(w))?BF_SAY[k]:WORDS[k]||GLUE[k];return '<span class="bf"><b>'+esc(w.replace(/[?!.,]+$/,''))+'</b>'+(g?' <i>'+esc(String(g).replace(/[?!]+$/,''))+'</i>':'')+'</span>';});
  return '<div class="built"><span class="eyebrow">Built from</span><div>'+parts.join('')+'</div></div>';}
/* "Sounds like" shown to the learner: lowercase syllables separated by spaces, stressed syllable bolder. */
function pronHtml(lt){const raw=pronFor(lt);
  return raw.split(' ').map(w=>'<span class="pw">'+w.split('-').map(s=>/[A-Z]/.test(s)?'<b>'+esc(s.toLowerCase())+'</b>':esc(s.toLowerCase())).join(' ')+'</span>').join(' ');}
function pronText(lt){return pronFor(lt).toLowerCase().replace(/-/g,' ');}
/* Whole phrase first, then sentence by sentence, then comma pieces, then word by word, so conversation lines reuse the hand-written respellings. */
const PRON_CI={};
function pronFor(lt){if(PRON[lt])return PRON[lt];
  if(!PRON_CI._){PRON_CI._=1;Object.keys(PRON).forEach(k=>{PRON_CI[k.toLowerCase().replace(/[.,!?]+$/,'')]=PRON[k];});
    /* Each phrase also teaches its single words: "Kur yra stotis?" gives kur, yra and stotis. */
    Object.keys(PRON).forEach(k=>{const ws=k.toLowerCase().replace(/[.,!?]/g,'').split(/\s+/),ps=PRON[k].split(' ');if(ws.length>1&&ws.length===ps.length)ws.forEach((w,i)=>{if(!PRON_CI[w])PRON_CI[w]=ps[i];});});}
  const look=s=>PRON_CI[s.toLowerCase().replace(/[.,!?]+$/,'').trim()];
  const whole=look(lt);if(whole)return whole;
  const sentences=lt.split(/(?<=[.!?])\s+/);
  return sentences.map(sen=>look(sen)||sen.split(/,\s*/).map(part=>look(part)||part.split(' ').map(w=>look(w)||autoPron(w.replace(/[.,!?]/g,''))).join(' ')).join(' ')).join(' ');}
function autoPron(lt){const map=[['ch','k'],['iū','oo'],['ių','oo'],['ą','ah'],['ę','eh'],['į','ee'],['ų','oo'],['ū','oo'],['ė','ay'],['č','ch'],['š','sh'],['ž','zh'],['c','ts'],['j','y'],['y','ee'],['a','ah'],['e','e'],['i','i'],['o','o'],['u','u']];
  return lt.toLowerCase().split(' ').map(w=>{let s='';for(let i=0;i<w.length;i++){const two=w.slice(i,i+2);const hit=map.find(m=>m[0]===two)||map.find(m=>m[0]===w[i]);
    if(hit){s+=hit[1];i+=hit[0].length-1;}else s+=w[i];}return s;}).join(' ');}

/* For short words a respelling alone is hard to trust, so they also get a real English word that sounds close. */
const PRON_LIKE={'Aš':'"ahsh": the "a" of father, then "sh"','Tu':'like "two", but short and clipped','Jis':'rhymes with "this"','Ji':'like "yee", said quickly','Prašau':'SHAU is one quick sound, "sh" plus the "ow" of "cow": prah-SHAU, never "show"','Gerai':'the RAI rhymes with "rye"','Taip':'sounds like the English word "type"','Kaip sekasi?':'kaip rhymes with "type"','Kaip?':'rhymes with "type"','Puikiai':'"PWEE", said strongest, then a quick "kyay": the -iai at the end sounds like "ay" in day',
 'Mes':'like "mess"','Jūs':'like the word "use"','Jie':'"yee" sliding into "eh", in one quick beat','Jos':'rhymes with "dose"'};
const likeHtml=lt=>PRON_LIKE[lt]?'<span class="like">'+esc(PRON_LIKE[lt])+'</span>':'';
/* Hand-written "sounds like" respellings. Hyphens split syllables; CAPS = the stressed syllable.
   Vowel key: ah = father, e/eh = bet, ay = day, ee = see (also the quick Lithuanian i at a syllable end), i = bit (only before a consonant: MIN, ish), oh = go, u = put, oo = moon, ow = cow, ai = eye.
   "y" is always the consonant in "yes" (yah, yeh, yoh, yu); never use "ye" for the eye sound.
   An unstressed -ti verb ending is written -tih: a short, light "ti". */
const PRON={"restorano":"res-toh-RAH-noh","pyragų":"pee-RAH-goo","pyragai":"pee-RAH-gai","Pyragas – vienas euras. Kiek pyragų?":"pee-RAH-gahs VYEH-nahs EH-oo-rahs KYEHK pee-RAH-goo","Trys pyragai ir kava. Penki eurai.":"TREES pee-RAH-gai IR kah-VAH pen-KEE EH-oo-rai","Jogurtas – vienas euras. Kiek jogurtų?":"YOH-gur-tahs VYEH-nahs EH-oo-rahs KYEHK YOH-gur-too","Trys jogurtai ir šokoladas. Penki eurai.":"TREES YOH-gur-tai IR shoh-koh-LAH-dahs pen-KEE EH-oo-rai","Ačiū. Štai penki eurai grąžos.":"AH-choo SHTAI pen-KEE EH-oo-rai GRAH-zhohs","Čia mano anūkas, Lukas.":"CHAH mah-NOH ah-NOO-kahs LU-kahs","Jis rodo penkis pirštus. Penkeri!":"YIS ROH-doh pen-KEES PIRSH-tus PEN-keh-ree","O dabar Lukas klausia: kiek tau metų?":"OH dah-BAHR LU-kahs KLOW-syah KYEHK TOW meh-TOO","Dvidešimt! Lukas sako: daug!":"DVEE-deh-shimt LU-kahs SAH-koh DOWG","Trisdešimt! Lukas sako: labai daug!":"TRIS-deh-shimt LU-kahs SAH-koh lah-BAI DOWG","Ačiū, kad perkate čia! Ateikite dar!":"AH-choo KAHD PER-kah-teh CHAH ah-TAY-kee-teh DAHR","Aš greitai. Ar eini rytoj į muziejų?":"AHSH GRAY-tai AHR ay-NEE ree-TOY ee mu-ZYEH-yoo","Šaunu! Tai kada tu gali? Šią savaitę?":"show-NU TAI kah-DAH TU gah-LEE SHYAH sah-VAI-teh","Kokiu laiku? Dvyliktą?":"koh-KYU lai-KU DVEE-lik-tah","Prie Katedros. Ten yra kavinė.":"PRYEH kah-TEH-drohs TEN ee-RAH kah-VEE-nay","Labas! Tu vėluoji!":"LAH-bahs TU vay-LWOH-yee","Jau pusė pirmos!":"YOW PU-say pir-MOHS","O kada tu grįžti?":"OH kah-DAH TU GREEZH-tee","Aš kasdien! O kiek tu miegi?":"AHSH kahs-DYEN OH KYEHK TU myeh-GEE","Aštuonias! O aš tik šešias. Ar tu kartais vėluoji?":"ahsh-TWOH-nyahs OH AHSH TIK SHEH-shyahs AHR TU KAHR-tais vay-LWOH-yee","Labas! Aš esu Laura. Tu esi Tomas?":"LAH-bahs AHSH eh-SU LOW-rah TU eh-SEE TOH-mahs","Malonu! Ar tu kalbi lietuviškai?":"mah-loh-NU AHR TU kahl-BEE lyeh-TU-vish-kai","Labai gerai! O aš mokausi anglų kalbos.":"lah-BAI geh-RAI OH AHSH MOH-kow-see ahn-GLOO kahl-BOHS","Truputį. Bet šiandien kalbame lietuviškai!":"TRU-pu-tee BET SHYAHN-dyen KAHL-bah-meh lyeh-TU-vish-kai","Ar tu gyveni Lietuvoje?":"AHR TU gee-veh-NEE lyeh-tu-voh-YEH","O ką tu darai? Tu dirbi?":"OH KAH TU dah-RAI TU DIR-bee","Aš irgi dirbu. Ir daug miegu!":"AHSH IR-gee dir-BU IR DOWG myeh-GU","Puiku! Mokytis yra gerai.":"pwee-KU MOH-kee-tis ee-RAH geh-RAI","Ar nori arbatos ar kavos? Čia labai skani kava, bet arbata irgi gera...":"AHR NOH-ree ahr-BAH-tohs AHR kah-VOHS CHAH lah-BAI skah-NEE kah-VAH BET ahr-bah-TAH IR-gee geh-RAH","Ar nori gerti? Kava, arbata?":"AHR NOH-ree GER-tih kah-VAH ahr-bah-TAH","Prašau. O ką tu skaitai?":"prah-SHAU OH KAH TU skai-TAI","Šaunu! Ar tu žinai, kiek valandų?":"show-NU AHR TU zhee-NAI KYEHK vah-lahn-DOO","Oi, jau vėlu! Mes su Rūta einame namo.":"OY YOW vay-LU MES SU ROO-tah AY-nah-meh nah-MOH","Iki! Tu gerai kalbi lietuviškai!":"ee-KEE TU geh-RAI kahl-BEE lyeh-TU-vish-kai","Labas! Ką tu darai?":"LAH-bahs KAH TU dah-RAI","Mes laukiame stotyje. Ar tu ateini?":"MES LOW-kyah-meh stoh-tee-YEH AHR TU ah-tay-NEE","Kur tu dabar?":"KUR TU dah-BAHR","Ar tu matai bažnyčią? Stotis yra prie bažnyčios.":"AHR TU mah-TAI bahzh-NEE-chah stoh-TIS ee-RAH PRYEH bahzh-NEE-chohs","Puiku! Mes stovime prie durų.":"pwee-KU MES STOH-vee-meh PRYEH du-ROO","Eik tiesiai, paskui kairėn.":"AYK tyeh-SYAY pahs-KUI kai-RAYN","Labas, Tomai! Pagaliau!":"LAH-bahs TOH-mai pah-gah-LYOW","Mes laukiame tavęs! O Rūta perka bilietus.":"MES LOW-kyah-meh tah-VAYS OH ROO-tah PER-kah BEE-lyeh-tus","Ne, ne! Šiandien aš moku.":"NEH NEH SHYAHN-dyen AHSH moh-KU","Ar tu girdi? Traukinys jau čia!":"AHR TU gir-DEE trow-kee-NEES YOW CHAH","Greičiau! Einame!":"gray-CHYOW AY-nah-meh","Taip? Kas yra?":"TYPE KAHS ee-RAH","Žinoma! Kuo galiu padėti?":"ZHEE-noh-mah KWOH gah-LYU pah-DAY-tih","Tai Reksas. Jis labai draugiškas!":"TAI REK-sahs YIS lah-BAI DROW-gish-kahs","Jūs esate senamiestyje, Pilies gatvėje.":"YOOS EH-sah-teh seh-nah-myehs-tee-YEH pee-LYEHS GAHT-vay-yeh","Senamiestis: sena miesto dalis. Ar kalbate angliškai?":"seh-NAH-myehs-tis seh-NAH MYEHS-toh dah-LIS AHR KAHL-bah-teh AHN-glish-kai","Puiku! Tada kalbame lietuviškai.":"pwee-KU tah-DAH KAHL-bah-meh lyeh-TU-vish-kai","Ne, tik lietuviškai ir rusiškai!":"NEH TIK lyeh-TU-vish-kai IR RU-sish-kai","Gerai. Kur jūs einate?":"geh-RAI KUR YOOS AY-nah-teh","Kavinė? Eikite tiesiai, paskui dešinėn, prie bažnyčios kairėn, ir...":"kah-VEE-nay AY-kee-teh tyeh-SYAY pahs-KUI deh-shee-NAYN PRYEH bahzh-NEE-chohs kai-RAYN IR","Tiesiai. Paskui dešinėn. Dešimt minučių.":"tyeh-SYAY pahs-KUI deh-shee-NAYN DEH-shimt mee-NU-chyoo","Nieko! O kodėl jūs čia, Vilniuje?":"NYEH-koh OH koh-DAYL YOOS CHAH VIL-nyu-yeh","Šaunu! Sėkmės, ir daugiau nepasiklyskite!":"show-NU sayk-MAYS IR dow-GYOW neh-pah-see-KLEES-kee-teh","Labas! Aš esu Jonas.":"LAH-bahs AHSH eh-SU YOH-nahs","Malonu. Iš kur tu esi?":"mah-loh-NU ish KUR TU eh-SEE","Aš esu iš Kauno. Kur tu gyveni?":"AHSH eh-SU ish KOW-noh KUR TU gee-veh-NEE","Aš irgi gyvenu Vilniuje, senamiestyje.":"AHSH IR-gee gee-veh-NU VIL-nyu-yeh seh-nah-myehs-tee-YEH","Aš esu mokytojas.":"AHSH eh-SU MOH-kee-toh-yahs","Taip, mano darbas įdomus! O kuo tu dirbi?":"TYPE mah-NOH DAHR-bahs ee-doh-MUS OH KWOH TU DIR-bee","Šaunu! Ką tu studijuoji?":"show-NU KAH TU stu-dee-YOO-oh-yee","Patogu! Ar tau patinka?":"pah-toh-GU AHR TOW pah-TIN-kah","Tu labai gerai kalbi lietuviškai!":"TU lah-BAI geh-RAI kahl-BEE lyeh-TU-vish-kai","Sėkmės! Iki!":"sayk-MAYS ee-KEE",
"Prašau, sėskitės.":"prah-SHAU SAYS-kee-tays","Oi, man reikia eiti. Aš einu į muziejų.":"OY MAHN RAY-kyah AY-tee AHSH ay-NU ee mu-ZYEH-yoo",
"Šiandien toks gražus oras! Gal einame pasivaikščioti prie upės, o paskui išgersime kavos?":"SHYAHN-dyen TOHKS grah-ZHUS OH-rahs GAHL AY-nah-meh pah-see-VAIKSH-choh-tee PRYEH OO-pays OH pahs-KUI ish-GER-see-meh kah-VOHS",
"U-pė. Upė.":"OO-pay OO-pay","Teisingai! Tu greitai mokaisi.":"tay-SIN-gai TU GRAY-tai moh-KAI-see","Na, man jau laikas. Geros dienos!":"NAH MAHN YOW LAI-kahs GEH-rohs DYEH-nohs",
"Labas":"LAH-bahs","Sveiki":"svay-KEE","Labas rytas":"LAH-bahs REE-tahs","Laba diena":"lah-BAH dyeh-NAH","Labas vakaras":"LAH-bahs VAH-kah-rahs","Labanakt":"lah-bah-NAHKT","Viso gero":"VEE-soh GEH-roh","Iki":"ee-KEE","Ačiū":"AH-choo","Prašau":"prah-SHAU",
"Taip":"TYPE","Ne":"NEH","Atsiprašau":"aht-see-prah-SHAU","Gerai":"geh-RAI","Kaip sekasi?":"KYPE SEH-kah-see","Puikiai":"PWEE-kyay","Nieko tokio":"NYEH-koh TOH-kyoh","Malonu susipažinti":"mah-loh-NU su-see-pah-ZHIN-tih","Iki pasimatymo":"ee-KEE pah-see-MAH-tee-moh","Sėkmės":"sayk-MAYS",
"Aš":"AHSH","Tu":"TU","Jis":"YIS","Ji":"YEE","Mes":"MES","Jūs":"YOOS","Jie":"YEH","Jos":"YOHS","Mano vardas Tomas":"mah-NOH VAHR-dahs TOH-mahs","Aš esu Tomas":"AHSH eh-SU TOH-mahs","Tu esi Jonas?":"TU eh-SEE YOH-nahs","Jis yra Jonas":"YIS ee-RAH YOH-nahs","Ji yra Rūta":"YEE ee-RAH ROO-tah","Mes esame čia":"MES EH-sah-meh CHAH","Koks tavo vardas?":"KOHKS tah-VOH VAHR-dahs","Aš esu iš Amerikos":"AHSH eh-SU ish ah-MEH-ree-kohs",
"vienas":"VYEH-nahs","du":"DU","trys":"TREES","keturi":"keh-tu-REE","penki":"pen-KEE","šeši":"sheh-SHEE","septyni":"sep-tee-NEE","aštuoni":"ahsh-twoh-NEE","devyni":"deh-vee-NEE","dešimt":"DEH-shimt",
"nulis":"NU-lis","vienuolika":"vyeh-NWOH-lee-kah","dvylika":"DVEE-lee-kah","trylika":"TREE-lee-kah","keturiolika":"keh-tu-RYOH-lee-kah","penkiolika":"pen-KYOH-lee-kah","dvidešimt":"DVEE-deh-shimt","trisdešimt":"TRIS-deh-shimt","šimtas":"SHIM-tahs","tūkstantis":"TOOKS-tahn-tis",
"Kiek?":"KYEHK","Kiek tau metų?":"KYEHK TOW MEH-too","Man dvidešimt metų":"MAHN DVEE-deh-shimt MEH-too","Kiek kainuoja?":"KYEHK kai-NWOH-yah","vienas euras":"VYEH-nahs EH-oo-rahs","du eurai":"DU EH-oo-rai","dešimt eurų":"DEH-shimt EH-oo-roo","pirmas":"PIR-mahs","antras":"AHN-trahs","trečias":"TREH-chahs",
"duona":"DWOH-nah","pienas":"PYEH-nahs","vanduo":"vahn-DWOH","kava":"kah-VAH","arbata":"ahr-bah-TAH","sūris":"SOO-ris","mėsa":"may-SAH","sriuba":"sryu-BAH","kiaušinis":"kyow-SHEE-nis","sviestas":"SVYEHS-tahs",
"obuolys":"oh-bwoh-LEES","bulvė":"BUL-vay","žuvis":"zhu-VIS","vištiena":"vish-TYEH-nah","cukrus":"TSUK-rus","druska":"drus-KAH","alus":"ah-LUS","vynas":"VEE-nahs","pyragas":"pee-RAH-gahs","ledai":"leh-DAI",
"Aš noriu kavos":"AHSH NOH-ryu kah-VOHS","Aš valgau duoną":"AHSH VAHL-gow DWOH-nah","Aš geriu vandenį":"AHSH geh-RYU VAHN-deh-nee","Skanu!":"skah-NU","Aš esu alkanas":"AHSH eh-SU AHL-kah-nahs","Sąskaitą, prašau":"SAHS-kai-tah prah-SHAU","Skanaus!":"skah-NOWS","Į sveikatą!":"ee svay-KAH-tah","meniu":"meh-NYU","restoranas":"res-toh-RAH-nahs",
"mama":"mah-MAH","tėtis":"TAY-tis","sesuo":"seh-SWOH","brolis":"BROH-lis","sūnus":"soo-NUS","dukra":"duk-RAH","senelis":"seh-NEH-lis","senelė":"seh-NEH-lay","šeima":"shay-MAH","vaikas":"VAI-kahs",
"vyras":"VEE-rahs","moteris":"MOH-teh-ris","žmona":"zhmoh-NAH","draugas":"DROW-gahs","draugė":"DROW-gay","berniukas":"ber-NYU-kahs","mergaitė":"mer-GAI-tay","žmogus":"zhmoh-GUS","Tai mano brolis":"TAI mah-NOH BROH-lis","Aš turiu seserį":"AHSH tu-RYU SEH-seh-ree",
"raudonas":"row-DOH-nahs","mėlynas":"MAY-lee-nahs","žalias":"ZHAH-lyahs","geltonas":"gel-TOH-nahs","juodas":"YWOH-dahs","baltas":"BAHL-tahs","rudas":"RU-dahs","pilkas":"PIL-kahs","rožinis":"ROH-zhee-nis","oranžinis":"oh-RAHN-zhee-nis",
"didelis":"DEE-deh-lis","mažas":"MAH-zhahs","naujas":"NOW-yahs","senas":"SEH-nahs","gražus":"grah-ZHUS","geras":"GEH-rahs","blogas":"BLOH-gahs","žalias obuolys":"ZHAH-lyahs oh-bwoh-LEES","balta duona":"bahl-TAH DWOH-nah","didelis namas":"DEE-deh-lis NAH-mahs",
"šuo":"SHWOH","katė":"kah-TAY","arklys":"ahrk-LEES","karvė":"KAHR-vay","paukštis":"POWK-shtis","kiaulė":"KYOW-lay","višta":"vish-TAH","avis":"ah-VIS","pelė":"peh-LAY","triušis":"TRYU-shis",
"vilkas":"VIL-kahs","lokys":"loh-KEES","lapė":"LAH-pay","gandras":"GAHN-drahs","briedis":"BRYEH-dis","varlė":"vahr-LAY","bitė":"BEE-tay","drugelis":"dru-GEH-lis","Aš turiu šunį":"AHSH tu-RYU SHU-nee","Katė miega":"kah-TAY MYEH-gah",
"pirmadienis":"pir-MAH-dyeh-nis","antradienis":"ahn-TRAH-dyeh-nis","trečiadienis":"treh-CHAH-dyeh-nis","ketvirtadienis":"ket-vir-TAH-dyeh-nis","penktadienis":"penk-TAH-dyeh-nis","šeštadienis":"shesh-TAH-dyeh-nis","sekmadienis":"sek-MAH-dyeh-nis","šiandien":"SHAN-dyehn","rytoj":"ree-TOY","vakar":"VAH-kahr",
"dabar":"dah-BAHR","rytas":"REE-tahs","diena":"dyeh-NAH","vakaras":"VAH-kah-rahs","naktis":"nahk-TIS","savaitė":"sah-VAI-tay","mėnuo":"MAY-nwoh","metai":"MEH-tai","valanda":"vah-lahn-DAH","Kiek valandų?":"KYEHK vah-lahn-DOO",
"pavasaris":"pah-VAH-sah-ris","vasara":"VAH-sah-rah","ruduo":"ru-DWOH","žiema":"zhyeh-MAH","sausis":"SOW-sis","vasaris":"vah-SAH-ris","kovas":"KOH-vahs","birželis":"bir-ZHEH-lis","liepa":"LYEH-pah","gruodis":"GRWOH-dis",
"būti":"BOO-tih","eiti":"AY-tih","valgyti":"VAHL-gee-tih","gerti":"GER-tih","kalbėti":"kahl-BAY-tih","skaityti":"skai-TEE-tih","rašyti":"rah-SHEE-tih","norėti":"noh-RAY-tih","turėti":"tu-RAY-tih","žinoti":"zhee-NOH-tih",
"Aš esu":"AHSH eh-SU","Tu esi":"TU eh-SEE","Jis yra":"YIS ee-RAH","Aš einu":"AHSH ay-NU","Aš kalbu":"AHSH kahl-BU","Aš skaitau":"AHSH skai-TOW","Aš noriu":"AHSH NOH-ryu","Aš turiu":"AHSH tu-RYU","Aš žinau":"AHSH zhee-NOW","Aš nežinau":"AHSH neh-zhee-NOW",
"Aš kalbu lietuviškai":"AHSH kahl-BU lyeh-TU-vish-kai","Ar tu kalbi angliškai?":"AHR TU kahl-BEE AHN-glish-kai","Aš nesuprantu":"AHSH neh-su-prahn-TU","Aš suprantu":"AHSH su-prahn-TU","Aš gyvenu Lietuvoje":"AHSH gee-veh-NU lyeh-tu-voh-YEH","Aš mokausi lietuvių kalbos":"AHSH MOH-kow-see lyeh-TU-vyoo kahl-BOHS","Aš dirbu":"AHSH dir-BU","Aš miegu":"AHSH myeh-GU","Mes einame namo":"MES AY-nah-meh nah-MOH","Jie valgo":"yee-EH VAHL-goh",
"miestas":"MYEHS-tahs","kaimas":"KAI-mahs","namas":"NAH-mahs","mokykla":"moh-keek-LAH","parduotuvė":"pahr-dwoh-TU-vay","gatvė":"GAHT-vay","stotis":"stoh-TIS","bažnyčia":"bahzh-NEE-chah","ligoninė":"lee-GOH-nee-nay","bankas":"BAHN-kahs",
"Kur yra stotis?":"KUR ee-RAH stoh-TIS","kairėn":"kai-RAYN","dešinėn":"deh-shee-NAYN","tiesiai":"tyeh-SYAY","čia":"CHAH","ten":"TEN","toli":"toh-LEE","arti":"ahr-TEE","vaistinė":"VAIS-tee-nay","paštas":"PAHSH-tahs",
"bilietas":"BEE-lyeh-tahs","lėktuvas":"layk-TU-vahs","traukinys":"trow-kee-NEES","autobusas":"ow-toh-BU-sahs","oro uostas":"OH-roh WOHS-tahs","viešbutis":"VYEHSH-bu-tis","pasas":"PAH-sahs","pinigai":"pee-nee-GAI","lagaminas":"lah-gah-MEE-nahs","žemėlapis":"zheh-MAY-lah-pis",
"Lietuva":"lyeh-tu-VAH","Vilnius":"VIL-nyus","Kaunas":"KOW-nahs","Klaipėda":"KLAI-pay-dah","jūra":"YOO-rah","Baltijos jūra":"BAHL-tee-yohs YOO-rah","miškas":"MISH-kahs","ežeras":"EH-zheh-rahs","upė":"U-pay","lietuvis":"lyeh-TU-vis",
"oras":"OH-rahs","lietus":"lyeh-TUS","sniegas":"SNYEH-gahs","saulė":"SOW-lay","vėjas":"VAY-yahs","debesis":"deh-beh-SIS","Šilta":"SHIL-tah","Šalta":"SHAHL-tah","Lyja":"LEE-yah","Sninga":"SNIN-gah",
"laimingas":"lai-MIN-gahs","liūdnas":"LYOOD-nahs","pavargęs":"pah-VAHR-ges","ištroškęs":"ish-TROHSH-kes","Man karšta":"MAHN KAHRSH-tah","Man šalta":"MAHN SHAHL-tah","Aš sergu":"AHSH ser-GU","Man patinka":"MAHN pah-TIN-kah","Aš myliu tave":"AHSH MEE-lyu tah-VEH","Koks šiandien oras?":"KOHKS SHAN-dyehn OH-rahs",
"gintaras":"GIN-tah-rahs","cepelinai":"tseh-peh-LEE-nai","šaltibarščiai":"shahl-tee-BAHRSH-chai","rūta":"ROO-tah","Joninės":"YOH-nee-nays","krepšinis":"krep-SHEE-nis","gira":"GEE-rah","Užgavėnės":"uzh-gah-VAY-nays","Gedimino pilis":"geh-dee-MEE-noh pee-LIS","Vasario 16-oji":"vah-SAH-ryoh sheh-SHYOH-lik-toh-yee",
"Su gimtadieniu!":"SU gim-TAH-dyeh-nyu","Linksmų Kalėdų!":"links-MOO kah-LAY-doo","Laimingų Naujųjų metų!":"lai-MIN-goo now-YOO-yoo MEH-too","Sveiki atvykę!":"svay-KEE aht-VEE-keh","Labai ačiū":"lah-BAI AH-choo","Ar galite pakartoti?":"AHR GAH-lee-teh pah-kahr-TOH-tih","Lėčiau, prašau":"lay-CHOW prah-SHAU","Padėkite!":"pah-DAY-kee-teh","Kur tualetas?":"KUR tu-ah-LEH-tahs","Aš nekalbu lietuviškai":"AHSH neh-kahl-BU lyeh-TU-vish-kai",
"kas":"KAHS","kur":"KUR","kada":"kah-DAH","kodėl":"koh-DAYL","kaip":"KYPE","kuris":"ku-RIS","Ar galite man padėti?":"AHR GAH-lee-teh MAHN pah-DAY-tih","Ar kalbate angliškai?":"AHR KAHL-bah-teh AHN-glish-kai","Ką tai reiškia?":"KAH TAI RAYSH-kyah","Kur aš esu?":"KUR AHSH eh-SU",
"Atleiskite":"aht-LAYS-kee-teh","Kaip nueiti į centrą?":"KYPE nu-AY-tih ee TSEN-trah","Ar toli?":"AHR toh-LEE","Ar galima?":"AHR GAH-lee-mah","Viskas gerai":"VIS-kahs geh-RAI","Minutėlę":"mee-nu-TAY-leh","Nesvarbu":"nes-vahr-BU","Žinoma":"ZHEE-noh-mah","Parodykite žemėlapyje":"pah-ROH-dee-kee-teh zheh-MAY-lah-pee-yeh","Nieko":"NYEH-koh",
"Bilietą į Kauną, prašau":"BEE-lyeh-tah ee KOW-nah prah-SHAU","Kada išvyksta?":"kah-DAH ish-VEEKS-tah","Kada atvyksta?":"kah-DAH aht-VEEKS-tah","Kur yra platforma?":"KUR ee-RAH plaht-FOHR-mah","Ar šis autobusas važiuoja į centrą?":"AHR SHIS ow-toh-BU-sahs vah-ZHWOH-yah ee TSEN-trah","autobusų stotis":"ow-toh-BU-soo stoh-TIS","geležinkelio stotis":"geh-leh-ZHIN-keh-lyoh stoh-TIS","stotelė":"stoh-TEH-lay","centras":"TSEN-trahs","tvarkaraštis":"tvahr-KAH-rahsh-tis",
"taksi":"TAHK-see","Sustokite čia, prašau":"sus-TOH-kee-teh CHAH prah-SHAU","Nuvežkite mane į viešbutį":"nu-VEZH-kee-teh mah-NEH ee VYEHSH-bu-tee","Kiek kainuoja iki oro uosto?":"KYEHK kai-NWOH-yah ee-KEE OH-roh WOHS-toh","pirmyn":"pir-MEEN","atgal":"aht-GAHL","išėjimas":"ish-ay-YEE-mahs","įėjimas":"ee-ay-YEE-mahs","nuoma":"NWOH-mah","dviratis":"DVEE-rah-tis",
"Staliuką dviem, prašau":"stah-LYU-kah DVYEHM prah-SHAU","Meniu, prašau":"meh-NYU prah-SHAU","Aš norėčiau":"AHSH noh-RAY-chow","vandens be dujų":"vahn-DENS BEH DU-yoo","vandens su dujomis":"vahn-DENS SU DU-yoh-mis","Aš nevalgau mėsos":"AHSH neh-VAHL-gow may-SOHS","Ką rekomenduojate?":"KAH reh-koh-men-DWOH-yah-teh","pusryčiai":"PUS-ree-chai","pietūs":"PYEH-toos","vakarienė":"vah-kah-RYEH-nay",
"Ar galima mokėti kortele?":"AHR GAH-lee-mah moh-KAY-tih kohr-teh-LEH","grynaisiais":"gree-nai-SYAIS","arbatpinigiai":"ahr-BAHT-pee-nee-gyay","Labai skanu":"lah-BAI skah-NU","Aš alergiškas riešutams":"AHSH ah-LER-gish-kahs ryeh-shu-TAHMS","be cukraus":"BEH TSUK-rows","su pienu":"SU PYEH-nu","šaukštas":"SHAUKSH-tahs","šakutė":"shah-KU-tay","peilis":"PAY-lis",
"Ar turite?":"AHR TU-ree-teh","Aš imu šitą":"AHSH ee-MU SHEE-tah","brangu":"brahn-GU","pigu":"pee-GU","per didelis":"PER DEE-deh-lis","per mažas":"PER MAH-zhahs","Ar galiu pasimatuoti?":"AHR gah-LYU pah-see-mah-TWOH-tih","kvitas":"KVEE-tahs","atidaryta":"ah-tee-dah-REE-tah","uždaryta":"uzh-dah-REE-tah",
"turgus":"TUR-gus","prekybos centras":"preh-KEE-bohs TSEN-trahs","kepykla":"keh-peek-LAH","suvenyras":"su-veh-NEE-rahs","dovana":"doh-vah-NAH","maišelis":"mai-SHEH-lis","nuolaida":"NWOH-lai-dah","Tik žiūriu":"TIK zhyoo-RYU","grąža":"grah-ZHAH","Kiek tai kainuoja?":"KYEHK TAI kai-NWOH-yah",
"Aš turiu rezervaciją":"AHSH tu-RYU reh-zer-VAH-tsee-yah","kambarys":"kahm-bah-REES","raktas":"RAHK-tahs","vienai nakčiai":"VYEH-nai NAHK-chai","dviem naktims":"DVYEHM nahk-TIMS","Koks Wi-Fi slaptažodis?":"KOHKS VAI-fai slahp-TAH-zhoh-dis","Ar pusryčiai įskaičiuoti?":"AHR PUS-ree-chai ees-kai-CHWOH-tih","Kada reikia išsiregistruoti?":"kah-DAH RAY-kyah ish-see-reh-gis-TRWOH-tih","rankšluostis":"RAHNK-shlwohs-tis","liftas":"LIF-tahs",
"dušas":"DU-shahs","lova":"LOH-vah","oro kondicionierius":"OH-roh kon-dee-tsyoh-NYEH-ryus","karštas vanduo":"KAHRSH-tahs vahn-DWOH","Neveikia":"neh-VAY-kyah","Ar galite pakeisti kambarį?":"AHR GAH-lee-teh pah-KAYS-tih KAHM-bah-ree","registratūra":"reh-gis-trah-TOO-rah","aukštas":"OWKSH-tahs","triukšminga":"tryuksh-MIN-gah","Aš išvykstu rytoj":"AHSH ish-VEEKS-tu ree-TOY",
"Gelbėkite!":"GEL-bay-kee-teh","policija":"poh-LEE-tsee-yah","gydytojas":"GEE-dee-toh-yahs","Man reikia gydytojo":"MAHN RAY-kyah GEE-dee-toh-yoh","Iškvieskite greitąją":"ish-KVYEHS-kee-teh GRAY-tah-yah","Man skauda čia":"MAHN SKOW-dah CHAH","galva":"gahl-VAH","pilvas":"PIL-vahs","vaistai":"vais-TAI","Aš pasiklydau":"AHSH pah-see-KLEE-dow",
"Aš pamečiau pasą":"AHSH pah-meh-CHOW PAH-sah","ambasada":"ahm-bah-sah-DAH","Mane apvogė":"mah-NEH ahp-VOH-gay","Palikite mane ramybėje":"pah-LEE-kee-teh mah-NEH rah-MEE-bay-yeh","pavojinga":"pah-voh-YIN-gah","saugu":"sow-GU","šimtas dvylika":"SHIM-tahs DVEE-lee-kah","draudimas":"drow-DEE-mahs","Ar čia yra vaistinė?":"AHR CHAH ee-RAH VAIS-tee-nay","Aš gerai":"AHSH geh-RAI",
"pica":"PEE-tsah","jogurtas":"yoh-GUR-tahs","šokoladas":"shoh-koh-LAH-dahs","žirafa":"zhee-RAH-fah","čempionas":"chem-PYOH-nahs","šampūnas":"shahm-POO-nahs","kavinė":"kah-VEE-nay","muziejus":"mu-ZYEH-yus","radijas":"RAH-dee-yahs","telefonas":"teh-leh-FOH-nahs",
"Gerai, ačiū":"geh-RAI AH-choo","O tau?":"OH TOW","Neblogai":"neh-bloh-GAI","Taip sau":"TYPE SOW","Man irgi gerai":"MAHN IR-gee geh-RAI","Aš irgi":"AHSH IR-gee","Ką veiki?":"KAH vay-KEE","Nieko ypatingo":"NYEH-koh ee-pah-TIN-goh","Labai malonu":"lah-BAI mah-loh-NU","Ir tau":"IR TOW",
"Aš truputį kalbu lietuviškai":"AHSH TRU-pu-tee kahl-BU lyeh-TU-vish-kai","Kaip tai pasakyti lietuviškai?":"KYPE TAI pah-sah-KEE-tih lyeh-TU-vish-kai","Ką reiškia šis žodis?":"KAH RAYSH-kyah SHIS ZHOH-dis","Aš nelabai suprantu":"AHSH neh-lah-BAI su-prahn-TU","Ar gali pakartoti?":"AHR gah-LEE pah-kahr-TOH-tih","Palauk":"pah-LOWK","Teisingai":"tay-SIN-gai","Aš mokausi":"AHSH MOH-kow-see","Dar kartą":"DAHR KAHR-tah","Supratau":"su-prah-TOW",
"Iš kur tu esi?":"ISH KUR TU eh-SEE","Aš esu iš Lietuvos":"AHSH eh-SU ish lyeh-tu-VOHS","Aš esu iš Anglijos":"AHSH eh-SU ish AHN-glee-yohs","Aš esu iš Kanados":"AHSH eh-SU ish kah-NAH-dohs","Kur tu gyveni?":"KUR TU gee-veh-NEE","Aš gyvenu Vilniuje":"AHSH gee-veh-NU VIL-nyu-yeh","O tu?":"OH TU","Aš gyvenu Londone":"AHSH gee-veh-NU LON-doh-neh","Ar tu lietuvis?":"AHR TU lyeh-TU-vis","Ne, aš amerikietis":"NEH AHSH ah-meh-ree-KYEH-tis",
"Kuo tu dirbi?":"KWOH TU DIR-bee","Aš esu mokytojas":"AHSH eh-SU MOH-kee-toh-yahs","Aš esu studentas":"AHSH eh-SU stu-DEN-tahs","Aš dirbu biure":"AHSH dir-BU byu-REH","Aš dirbu iš namų":"AHSH dir-BU ish nah-MOO","Aš esu pensininkas":"AHSH eh-SU PEN-see-nin-kahs","Ar tau patinka tavo darbas?":"AHR TOW pah-TIN-kah tah-VOH DAHR-bahs","Mano darbas įdomus":"mah-NOH DAHR-bahs ee-doh-MUS","Aš studijuoju":"AHSH stu-dee-YWOH-yu","darbas":"DAHR-bahs",
"Man nepatinka":"MAHN neh-pah-TIN-kah","Man labai patinka":"MAHN lah-BAI pah-TIN-kah","Ar tau patinka?":"AHR TOW pah-TIN-kah","Man patinka muzika":"MAHN pah-TIN-kah MU-zee-kah","Man patinka Lietuva":"MAHN pah-TIN-kah lyeh-tu-VAH","muzika":"MU-zee-kah","futbolas":"FUT-boh-lahs","filmai":"FIL-mai","knygos":"KNEE-gohs","kelionės":"keh-LYOH-nays",
"Ką tu mėgsti veikti?":"KAH TU MAYGS-tih VAYK-tih","Aš mėgstu skaityti":"AHSH MAYGS-tu skai-TEE-tih","Aš mėgstu keliauti":"AHSH MAYGS-tu keh-LYOW-tih","Aš mėgstu gaminti":"AHSH MAYGS-tu gah-MIN-tih","Aš mėgstu sportuoti":"AHSH MAYGS-tu spor-TWOH-tih","Aš žaidžiu krepšinį":"AHSH zhai-JYU krep-SHEE-nee","Aš klausausi muzikos":"AHSH klow-SOW-see MU-zee-kohs","savaitgalis":"sah-VAIT-gah-lis","laisvalaikis":"lais-VAH-lai-kis","Ką veiki savaitgalį?":"KAH vay-KEE sah-VAIT-gah-lee",
"Ar nori eiti kartu?":"AHR NOH-ree AY-tih kahr-TU","Taip, noriu":"TYPE NOH-ryu","Gal rytoj?":"GAHL ree-TOY","Šiandien negaliu":"SHAN-dyehn neh-gah-LYU","Neturiu laiko":"neh-tu-RYU LAI-koh","Kur susitiksime?":"KUR su-see-TIK-see-meh","Prie kavinės":"PRYEH kah-VEE-nays","Puiki idėja!":"pwee-KEE ee-DAY-yah","Sutarta!":"SU-tahr-tah","Iki rytojaus!":"ee-KEE ree-TOH-yows",
"Kelintą valandą?":"keh-LIN-tah VAH-lahn-dah","Septintą valandą":"sep-TIN-tah VAH-lahn-dah","Aštuntą valandą":"ahsh-TUN-tah VAH-lahn-dah","Dvyliktą valandą":"DVEE-lik-tah VAH-lahn-dah","ryte":"ree-TEH","vakare":"vah-kah-REH","po pietų":"POH pyeh-TOO","vėlai":"vay-LAI","anksti":"ahnks-TEE","Aš vėluoju":"AHSH vay-LWOH-yu",
"Ar turi brolių ar seserų?":"AHR tu-REE BROH-lyoo AHR SEH-seh-roo","Aš turiu brolį":"AHSH tu-RYU BROH-lee","Ne, neturiu":"NEH neh-tu-RYU","Ar turi vaikų?":"AHR tu-REE vai-KOO","Aš turiu du vaikus":"AHSH tu-RYU DU vai-KUS","Aš turiu dukrą":"AHSH tu-RYU DUK-rah","Koks jo vardas?":"KOHKS YOH VAHR-dahs","Koks jos vardas?":"KOHKS YOHS VAHR-dahs","Mano mama gyvena Kaune":"mah-NOH mah-MAH gee-VEH-nah kow-NEH","Jie labai mieli":"yee-EH lah-BAI myeh-LEE",
"sriubą":"SRYU-bah","kortele":"kohr-teh-LEH","Ar turite obuolių?":"AHR TU-ree-teh oh-bwoh-LYOO","Aš imu":"AHSH ee-MU","Gal septintą valandą?":"GAHL sep-TIN-tah VAH-lahn-dah","Aš mėgstu keliauti ir skaityti":"AHSH MAYGS-tu keh-LYOW-tih IR skai-TEE-tih","Dušas neveikia":"DU-shahs neh-VAY-kyah","Man skauda galvą":"MAHN SKOW-dah GAHL-vah","Čia tau dovana":"CHAH TOW doh-vah-NAH","labai":"lah-BAI","Vilnius labai gražus":"VIL-nyus lah-BAI grah-ZHUS","Rytoj aš važiuoju į Kauną":"ree-TOY AHSH vah-ZHWOH-yu ee KOW-nah",
"Sriubą, prašau":"SRYU-bah prah-SHAU","Arbatą, prašau":"ahr-BAH-tah prah-SHAU","Aš norėčiau sriubos":"AHSH noh-RAY-chow sryu-BOHS","Puiku!":"pwee-KU","Ne, ačiū":"NEH AH-choo",
"Ar turite sūrio?":"AHR TU-ree-teh SOO-ryoh","Kiek kainuoja obuoliai?":"KYEHK kai-NWOH-yah OH-bwoh-lyay","Gerai, aš imu":"geh-RAI AHSH ee-MU","Tik grynaisiais?":"TIK gree-nai-SYAIS",
"Aš važiuoju į Kauną":"AHSH vah-ZHWOH-yu ee KOW-nah","Aš einu į parduotuvę":"AHSH ay-NU ee pahr-dwoh-TU-veh","Kur tu važiuoji?":"KUR TU vah-ZHWOH-yee","Aš einu namo":"AHSH ay-NU nah-MOH","Važiuojam!":"vah-ZHWOH-yahm",
"Man skauda pilvą":"MAHN SKOW-dah PIL-vah","Man skauda gerklę":"MAHN SKOW-dah GERK-leh","Turiu temperatūros":"tu-RYU tem-peh-rah-TOO-rohs","Man bloga":"MAHN BLOH-gah",
/* Part 4: at the table, Sunday lunch, the restaurant (added 30 Oct 2026). */
"Aš valgau mėsą":"AHSH VAHL-gow MAY-sah","Aš valgau žuvį":"AHSH VAHL-gow ZHU-vee","Aš sotus":"AHSH soh-TUS","Aš soti":"AHSH soh-TEE","Paduok druską, prašau":"pah-DWOHK DRUS-kah prah-SHAU","Ačiū už viską":"AH-choo UZH VIS-kah",
"Čia mano tėtis, Vytautas.":"CHAH mah-NOH TAY-tis VEE-tow-tahs","O gal alaus? Lietuviškas alus labai geras!":"OH GAHL ah-LOWS lyeh-TU-vish-kahs ah-LUS lah-BAI GEH-rahs","Tomai, ar tu valgai mėsą?":"TOH-mai AHR TU VAHL-gai MAY-sah",
"Puiku! Štai vištiena ir bulvės.":"pwee-KU SHTAI vish-TYEH-nah IR BUL-vays","Gerai! Štai žuvis ir bulvės.":"geh-RAI SHTAI zhu-VIS IR BUL-vays","Jau vėlu! Ačiū, kad atvažiavai.":"YOW vay-LU AH-choo KAHD aht-vah-ZHYAH-vai",
"Šiandien cepelinai su mėsa. Labai skanūs!":"SHAN-dyehn tseh-peh-LEE-nai SU may-SAH lah-BAI skah-NOOS","Tada cepelinai su varške. Jie be mėsos.":"tah-DAH tseh-peh-LEE-nai SU vahrsh-KEH yee-EH BEH may-SOHS",
"Ar turite alergijų?":"AHR TU-ree-teh ah-LER-gee-yoo","Gerai, be riešutų.":"geh-RAI BEH ryeh-shu-TOO","Paliekame arbatpinigių?":"pah-LYEH-kah-meh ahr-BAHT-pee-nee-gyoo",
/* Part 5: Į Kauną. */
"Laba diena! Kur važiuojate?":"lah-BAH dyeh-NAH KUR vah-ZHWOH-yah-teh","Po dešimt minučių. Iš ketvirtos platformos.":"POH DEH-shimt mee-NU-choo ISH ket-vir-TOHS plaht-FOHR-mohs","Po pusantros valandos.":"POH pu-SAHN-trohs vah-lahn-DOHS",
"A, žinau. Netoli.":"AH zhee-NOW neh-toh-LEE","Apie dešimt eurų.":"AH-pyeh DEH-shimt EH-oo-roo","Pirmą kartą Kaune?":"PIR-mah KAHR-tah kow-NEH","Viešbutis ten, už kampo.":"VYEHSH-bu-tis TEN UZH KAHM-poh",
/* Part 7: helping Jonas move, the weekend with Rūta. */
"Ačiū! Aš keliuosi į naują butą.":"AH-choo AHSH KEH-lyoh-see ee NOW-yah BU-tah","Ar moki vairuoti? Aš turiu mašiną, bet esu pavargęs.":"AHR moh-KEE vai-RWOH-tih AHSH tu-RYU mah-SHEE-nah BET eh-SU pah-VAHR-ges",
"Super! Tada tu vairuosi.":"SU-per tah-DAH TU vai-RWOH-see","Nieko tokio. Aš vairuosiu.":"NYEH-koh TOH-kyoh AHSH vai-RWOH-syu","Mano sofa labai sunki...":"mah-NOH SOH-fah lah-BAI sun-KEE",
"Uf! Pagaliau. Ar nori valgyti?":"UF pah-gah-LYOW AHR NOH-ree VAHL-gee-tih","Aš irgi! Užsakysiu picą.":"AHSH IR-gee uzh-sah-KEE-syu PEE-tsah","Ačiū už pagalbą! Ar tau reikia pinigų taksi?":"AH-choo UZH pah-GAHL-bah AHR TOW RAY-kyah pee-nee-GOO TAHK-see",
"Aš? Savaitgalį žaidžiu krepšinį su draugais. Ar tau patinka krepšinis?":"AHSH sah-VAIT-gah-lee zhai-JYU krep-SHEE-nee SU drow-GAIS AHR TOW pah-TIN-kah krep-SHEE-nis","Pagaliau penktadienis! Ką veiki?":"pah-gah-LYOW penk-TAH-dyeh-nis KAH vay-KEE",
/* Round 8: conversation lines reworded so they use words you have been taught. */
"Jūs esate čia: senamiestis.":"YOOS EH-sah-teh CHAH seh-NAH-myehs-tis","Senamiestis... štai! Ar kalbate angliškai?":"seh-NAH-myehs-tis SHTAI AHR KAHL-bah-teh AHN-glish-kai","Bet aš tau rašiau!":"BET AHSH TOW rah-SHAU","Ir kitą kartą – ne taip vėlai!":"IR KEE-tah KAHR-tah NEH TYPE vay-LAI","Gerai. Dėl paso – į ambasadą.":"geh-RAI DAYL PAH-soh ee ahm-bah-SAH-dah","Puiku! Lietuvoje visi žaidžia krepšinį!":"pwee-KU lyeh-tu-voh-YEH vee-SEE ZHAI-jyah krep-SHEE-nee","Ką?! Lietuvoje visi žaidžia krepšinį!":"KAH lyeh-tu-voh-YEH vee-SEE ZHAI-jyah krep-SHEE-nee","Pyragas – vienas euras. Kiek?":"pee-RAH-gahs VYEH-nahs EH-oo-rahs KYEHK","Katedra.":"kah-TEH-drah",
/* Everyday words (u42). */
"Apie ką?":"AH-pyeh KAH","Jei nori":"YAY NOH-ree","Mūsų namai":"MOO-soo nah-MAI","Jūsų pasas":"YOO-soo PAH-sahs","Dėl to":"DAYL TOH","Štai!":"SHTAI","Daug":"DOWG","Visi":"vee-SEE","Niekas":"NYEH-kahs","Vėl":"VAYL",
"Aš jį matau":"AHSH YEE mah-TOW","Aš ją myliu":"AHSH YAH MEE-lyu","Duok jam":"DWOHK YAHM","Paskambink jai":"pahs-KAHM-bink YAI","Ačiū jums":"AH-choo YUMS","Padėk mums":"pah-DAYK MUMS","Laukiu tavęs":"LOW-kyu tah-VES","Ar tu mane girdi?":"AHR TU mah-NEH gir-DEE","Tiesiog":"tyeh-SYOHG","Galbūt":"GAHL-boot",
"Tiesa?":"tyeh-SAH","Tuoj":"TWOY","Klausyk":"KLOW-seek","Pažiūrėk!":"pah-zhyoo-RAYK","Turbūt":"TUR-boot","Bent":"BENT","Beveik":"beh-VAYK","Visai gerai":"vee-SAI geh-RAI","Aš nenoriu":"AHSH neh-NOH-ryu","Aš maniau":"AHSH mah-NYOW",
/* Part 8: the lake, late for Rūta. */
"Labas! Šiandien važiuojame prie ežero?":"LAH-bahs SHAN-dyehn vah-ZHWOH-yah-meh PRYEH EH-zheh-roh","Nieko tokio! Aš turiu sumuštinių. Arbatos ar kavos?":"NYEH-koh TOH-kyoh AHSH tu-RYU su-mush-TEE-nyoo ahr-bah-TOHS AHR kah-VOHS",
"Gerai, aš paimsiu termosą.":"geh-RAI AHSH pah-IM-syu ter-MOH-sah","Bet ežere vanduo šaltas...":"BET eh-zheh-REH vahn-DWOH SHAHL-tahs","Šaunu! Mano sesuo taip pat važiuos. Gerai?":"show-NU mah-NOH seh-SWOH TYPE PAHT vah-ZHWOHS geh-RAI",
"Puiku! Antrą valandą prie stoties.":"pwee-KU AHN-trah VAH-lahn-dah PRYEH stoh-TYEHS","Pamiršai? Mane?!":"pah-mir-SHAI mah-NEH","Bet aš parašiau adresą!":"BET AHSH pah-rah-SHAU AH-dreh-sah",
"Aha! Todėl ir pavėlavai!":"ah-HAH toh-DAYL IR pah-vay-LAH-vai","Aš irgi! Užsisakome pusryčius.":"AHSH IR-gee uzh-see-SAH-koh-meh PUS-ree-chus","Ir kitą kartą – nevėluok!":"IR KEE-tah KAHR-tah neh-vay-LWOHK",
/* Parts 9 and 10: Klaipėda, the doctor, the police, back at the language evening. */
"Jūra? Toli. Važiuokite autobusu.":"YOO-rah toh-LEE vah-ZHWOH-kee-teh ow-toh-BU-su","Ten, tiesiai, paskui dešinėn. Jūs turistas?":"TEN tyeh-SYAY pahs-KUI deh-shee-NAYN YOOS tu-RIS-tahs",
"Sveiki atvykę į Klaipėdą! Ar jau matėte Baltijos jūrą?":"svay-KEE aht-VEE-keh ee KLAI-pay-dah AHR YOW mah-TAY-teh BAHL-tee-yohs YOO-rah","O, ji labai graži! Ir Kuršių nerija: kopos, miškas, ežerai...":"OH YEE lah-BAI grah-ZHEE IR KUR-shoo NEH-ree-yah KOH-pohs MISH-kahs eh-zheh-RAI",
"Taksi stovi ten, prie stoties.":"TAHK-see STOH-vee TEN PRYEH stoh-TYEHS","Laba diena. Kas jums negerai?":"lah-BAH dyeh-NAH KAHS YUMS neh-geh-RAI","Ar kosėjate?":"AHR KOH-say-yah-teh","Tai nuo kosulio.":"TAI NWOH KOH-su-lyoh",
"Gerklė raudona. Temperatūra trisdešimt aštuoni.":"GERK-lay row-doh-NAH tem-peh-rah-TOO-rah TRIS-deh-shimt ahsh-twoh-NEE","Taip. Štai receptas. Gerkite arbatą ir ilsėkitės.":"TYPE SHTAI reh-TSEP-tahs GER-kee-teh ahr-BAH-tah IR il-SAY-kee-tays",
"Ne! Tris dienas: lova ir arbata.":"NEH TRIS dyeh-NAHS LOH-vah IR ahr-bah-TAH","Ką paėmė?":"KAH pah-AY-may","Gerai. Dėl paso kreipkitės į savo ambasadą.":"geh-RAI DAYL PAH-soh KRAYP-kee-tays ee sah-VOH ahm-bah-SAH-dah",
"Štai adresas. Ir štai pažyma draudimui.":"SHTAI AH-dreh-sahs IR SHTAI pah-ZHEE-mah drow-DEE-mui","Saugokite savo daiktus! Sėkmės.":"SOW-goh-kee-teh sah-VOH daik-TUS sayk-MAYS",
"Labas! Aš Paulius. Tu irgi mokaisi lietuvių kalbos?":"LAH-bahs AHSH POW-lyus TU IR-gee moh-KAI-see lyeh-TU-vyoo kahl-BOHS","Penkerius metus.":"PEN-keh-ryus MEH-tus",
"Labai! Beje, aš dirbu muziejuje. Žinai ką? Rytoj ten ekskursija lietuviškai. Nemokama!":"lah-BAI beh-YEH AHSH dir-BU mu-ZYEH-yu-yeh zhee-NAI KAH ree-TOY TEN eks-KUR-see-yah lyeh-TU-vish-kai neh-MOH-kah-mah",
"Penktą valandą, prie muziejaus. Ateisi?":"PENK-tah VAH-lahn-dah PRYEH mu-ZYEH-yows ah-TAY-see","Puiku! Lietuvoje krepšinis yra antra religija.":"pwee-KU lyeh-tu-voh-YEH krep-SHEE-nis ee-RAH ahn-TRAH reh-LEE-gee-yah",
"Kaip gaila! Lietuvoje krepšinis yra antra religija.":"KYPE GAI-lah lyeh-tu-voh-YEH krep-SHEE-nis ee-RAH ahn-TRAH reh-LEE-gee-yah","Puiku! Lietuvoje daug gražių vietų.":"pwee-KU lyeh-tu-voh-YEH DOWG grah-ZHYOO vyeh-TOO",
"Tada tu gamini vakarienę!":"tah-DAH TU gah-mee-NEE vah-kah-RYEH-neh","Šeštadienį parke koncertas. Bus smagu!":"shesh-TAH-dyeh-nee pahr-KEH kon-TSER-tahs BUS smah-GU","Gerai, man reikia eiti. Gero savaitgalio!":"geh-RAI MAHN RAY-kyah AY-tee GEH-roh sah-VAIT-gah-lyoh",
/* Part 6: lost suitcase, family photos, on the train, Laura's flat. */
"Gerai, pažiūrėsime. Koks jūsų lagaminas?":"geh-RAI pah-zhyoo-RAY-see-meh KOHKS YOO-soo lah-gah-MEE-nahs","Gerai. Ar šitas?":"geh-RAI AHR SHEE-tahs","O šitas? Didelis.":"OH SHEE-tahs DEE-deh-lis",
"Atsiprašau! O šitas? Didelis, juodas ir labai sunkus!":"aht-see-prah-SHAU OH SHEE-tahs DEE-deh-lis YWOH-dahs IR lah-BAI sun-KUS","Gintarė. Ji gyvena Kaune su vyru ir dukra.":"GIN-tah-ray YEE gee-VEH-nah kow-NEH SU VEE-ru IR duk-RAH",
"Kokia ji?":"koh-KYAH YEE","Puiku! Vaikai yra laimė.":"pwee-KU vai-KAI ee-RAH LAI-may","Puiku! Dukra yra laimė.":"pwee-KU duk-RAH ee-RAH LAI-may",
"Atsiprašau, ar čia laisva?":"aht-see-prah-SHAU AHR CHAH lais-VAH","Ačiū. Oi, aš labai pavargusi.":"AH-choo OY AHSH lah-BAI pah-VAHR-gu-see","Aš dirbu visą dieną... ir visą naktį.":"AHSH dir-BU VEE-sah DYEH-nah IR VEE-sah NAHK-tee",
"Sėkmės! Ligoninėje visada reikia žmonių.":"sayk-MAYS lee-GOH-nee-nay-yeh vee-sah-DAH RAY-kyah zhmoh-NYOO","Šiandien baigiau po dvylikos valandų!":"SHAN-dyehn bai-GYOW POH DVEE-lee-kohs vah-lahn-DOO",
"O, atsiprašau! Ir tamsu.":"OH aht-see-prah-SHAU IR tahm-SU","Gerai. Kaip tu jautiesi? Tu atrodai pavargęs.":"geh-RAI KYPE TU YOW-tyeh-see TU aht-ROH-dai pah-VAHR-ges","Tada arbata padės!":"tah-DAH ahr-bah-TAH pah-DAYS",
/* Single words for the expansion units; phrases are pieced together from these. */
"ateinu":"ah-tay-NU","ateini":"ah-tay-NEE","išeina":"ish-AY-nah","grįžtu":"GREEZH-tu","laukiu":"LOW-kyu","manęs":"mah-NES","skubu":"sku-BU","sėdžiu":"SAY-jyu","stoviu":"STOH-vyu","ilsiuosi":"IL-syoh-see","matau":"mah-TOW","matai":"mah-TAI","girdžiu":"gir-JYU","darau":"dah-ROW","darai":"dah-RAI","televizorių":"teh-leh-VEE-zoh-ryoo","rašau":"rah-SHAU","galvoju":"gahl-VOH-yu","klausau":"klow-SOW","juokiuosi":"YWOH-kyoh-see","perku":"per-KU","moku":"moh-KU","duodu":"DWOH-du","duok":"DWOHK","parduodu":"pahr-DWOH-du","ieškau":"yehsh-KOW","stoties":"stoh-TYEHS","randu":"rahn-DU","pamirštu":"pah-mirsh-TU","esame":"EH-sah-meh","esate":"EH-sah-teh","kalbame":"KAHL-bah-meh","kalba":"KAHL-bah","gyvename":"gee-VEH-nah-meh","dirba":"DIR-bah","darote":"DAH-roh-teh","laukiame":"LOW-kyah-meh","keliuosi":"KEH-lyoh-see","prausiuosi":"PROW-syoh-see","apsirengiu":"ahp-see-REN-gyu","pusryčiauju":"PUS-ree-chow-yu","kavą":"KAH-vah","naujienas":"now-YEH-nahs","išeinu":"ish-ay-NU","darbą":"DAHR-bah","autobusu":"ow-toh-BU-su","penkių":"pen-KYOO","pietauju":"pyeh-TOW-yu","gaminu":"gah-mee-NU","vakarienę":"vah-kah-RYEH-neh","vakarieniauju":"vah-kah-RYEH-nyow-yu","filmą":"FIL-mah","skambinu":"SKAHM-bee-nu","mamai":"MAH-mai","tvarkausi":"tvahr-KOW-see","miegoti":"myeh-GOH-tih","aštuonias":"ahsh-twoh-NYAHS","valandas":"VAH-lahn-dahs","visada":"vee-sah-DAH","dažnai":"dahzh-NAI","kartais":"KAHR-tais","retai":"reh-TAI","niekada":"nyeh-kah-DAH","kasdien":"kahs-DYEHN","nevėluoju":"neh-vay-LWOH-yu","pasivaikščioti":"pah-see-VAIKSH-choh-tih","marškiniai":"mahrsh-kee-NYAY","kelnės":"KEL-nays","suknelė":"suk-NEH-lay","sijonas":"see-YOH-nahs","batai":"BAH-tai","striukė":"STRYU-kay","paltas":"PAHL-tahs","megztinis":"megz-TEE-nis","kepurė":"keh-PU-ray","džinsai":"JIN-sai","kokio":"KOH-kyoh","dydžio":"DEE-jyoh","dydis":"DEE-dis","vidutinis":"vee-du-TEE-nis","didesnis":"dee-DES-nis","mažesnis":"mah-ZHES-nis","matavimosi":"mah-TAH-vee-moh-see","kabina":"kah-bee-NAH","tinka":"TIN-kah","netinka":"neh-TIN-kah","ši":"SHEE","kitos":"kee-TOHS","spalvos":"spahl-VOHS","pagalvosiu":"pah-gahl-VOH-syu","šalikas":"SHAH-lee-kahs","pirštinės":"PIRSH-tee-nays","kojinės":"KOH-yee-nays","skėtis":"SKAY-tis","rankinė":"rahn-KEE-nay","kuprinė":"ku-PREE-nay","akiniai":"ah-kee-NYAY","nauji":"now-YEE","dėvi":"DAY-vee","kepurę":"keh-PU-reh","apsivilk":"ahp-see-VILK","striukę":"STRYU-keh","žemas":"ZHEH-mahs","jaunas":"YOW-nahs","vyresnis":"vee-RES-nis","linksmas":"LINKS-mahs","protingas":"proh-TIN-gahs","malonus":"mah-loh-NUS","juokingas":"ywoh-KIN-gahs","rimtas":"RIM-tahs","tylus":"tee-LUS","ilgas":"IL-gahs","trumpas":"TRUM-pahs","sunkus":"sun-KUS","lengvas":"LENG-vahs","šaltas":"SHAHL-tahs","švarus":"shvah-RUS","nešvarus":"nesh-vah-RUS","patogus":"pah-toh-GUS","aukšta":"owksh-TAH","protinga":"proh-TIN-gah","knyga":"knee-GAH","įdomi":"ee-doh-MEE","nėra":"NAY-rah","lengva":"leng-VAH","gydytoja":"GEE-dee-toh-yah","vairuotojas":"vai-RWOH-toh-yahs","inžinierius":"in-zhee-NYEH-ryus","programuotojas":"proh-grah-MWOH-toh-yahs","pardavėjas":"pahr-dah-VAY-yahs","virėjas":"vee-RAY-yahs","slaugytoja":"slow-GEE-toh-yah","ūkininkas":"OO-kee-nin-kahs","policininkas":"poh-LEE-tsee-nin-kahs","vadovas":"vah-DOH-vahs","ligoninėje":"lee-GOH-nee-nay-yeh","parduotuvėje":"pahr-dwoh-TU-vay-yeh","mokykloje":"moh-keek-loh-YEH","bedarbis":"beh-DAHR-bis","darbo":"DAHR-boh","visą":"VEE-sah","dieną":"DYEH-nah","baigi":"bai-GEE","baigiu":"bai-GYU","penktą":"PENK-tah","namai":"nah-MAI","butas":"BU-tahs","virtuvė":"vir-TU-vay","vonia":"voh-NYAH","miegamasis":"myeh-gah-MAH-sis","svetainė":"sveh-TAI-nay","langas":"LAHN-gahs","durys":"DU-rees","stalas":"STAH-lahs","kėdė":"kay-DAY","šaldytuvas":"shahl-dee-TU-vahs","sofa":"soh-FAH","spinta":"SPIN-tah","lempa":"LEM-pah","kilimas":"KEE-lee-mahs","balkonas":"bahl-KOH-nahs","laiptai":"LAIP-tai","kaimynas":"kai-MEE-nahs","bute":"bu-TEH","jauskis":"YOWS-kis","namie":"nah-MYEH","sėskis":"SAYS-kis","arbatos":"ahr-BAH-tohs","kambaryje":"kahm-bah-REE-yeh","atidaryk":"ah-tee-dah-REEK","langą":"LAHN-gah","uždaryk":"uzh-dah-REEK","duris":"DU-ris","įjunk":"ee-YUNK","šviesą":"SHVYEH-sah","išjunk":"ish-YUNK","už":"UZH","vaišes":"VAI-shes","plaukti":"PLOWK-tih","moki":"moh-KEE","vairuoti":"vai-RWOH-tih","nemoku":"neh-MOH-ku","šokti":"SHOHK-tih","negalima":"neh-GAH-lee-mah","rūkyti":"roo-KEE-tih","sėdėti":"say-DAY-tih","pinigų":"pee-nee-GOO","pagalbos":"pah-GAHL-bohs","nereikia":"neh-RAY-kyah","dirbti":"DIRB-tih","pabandyti":"pah-bahn-DEE-tih","būsiu":"BOO-syu","eisiu":"AY-syu","važiuosiu":"vah-ZHWOH-syu","dirbsiu":"DIRB-syu","valgysiu":"vahl-GEE-syu","skambinsiu":"SKAHM-bin-syu","pamatysiu":"pah-mah-TEE-syu","grįšiu":"GREE-shyu","liksiu":"LIK-syu","pabandysiu":"pah-bahn-DEE-syu","veiksi":"VAYK-see","kitą":"KEE-tah","savaitę":"sah-VAI-teh","kitais":"kee-TAIS","metais":"MEH-tais","ateisi":"ah-TAY-see","ateisiu":"ah-TAY-syu","vėliau":"vay-LYOW","pamatysime":"pah-mah-TEE-see-meh","atostogos":"ah-TOHS-toh-gohs","važiuosi":"vah-ZHWOH-see","atostogų":"ah-TOHS-toh-goo","vasarą":"VAH-sah-rah","jūros":"YOO-rohs","skrisiu":"SKREE-syu","vilnių":"VIL-nyoo","gyvensime":"gee-VEN-see-meh","viešbutyje":"VYEHSH-bu-tee-yeh","aplankysiu":"ah-plahn-KEE-syu","draugus":"drow-GUS","bus":"BUS","smagu":"smah-GU","sėkmingos":"sayk-MIN-gohs","bet":"BET","arba":"ahr-BAH","nes":"NES","todėl":"toh-DAYL","tada":"tah-DAH","jau":"YOW","pat":"PAHT","pyrago":"pee-RAH-goh","neinu":"nay-NU","lieku":"lyeh-KU","pirmiausia":"pir-MYOW-syah","valgiau":"VAHL-gyow","nevalgiau":"neh-VAHL-gyow","kai":"KAI","jeigu":"yay-GU","kad":"KAHD","nors":"NOHRS","vis":"VIS","tiek":"TYEHK","ateik":"ah-TAYK","manau":"mah-NOW","buvau":"bu-VOW","ėjau":"ay-YOW","važiavau":"vah-zhyah-VOW","gėriau":"GAY-ryow","mačiau":"mah-CHOW","dirbau":"DIR-bow","miegojau":"myeh-GOH-yow","žiūrėjau":"zhyoo-RAY-yow","užvakar":"UZH-vah-kahr","praėjusią":"prah-AY-yu-syah","pernai":"PER-nai","prieš":"PRYEHSH","mieste":"myehs-TEH","susitikau":"su-see-tee-KOW","draugu":"drow-GU","nupirkau":"nu-PIR-kow","dovaną":"DOH-vah-nah","kalbėjau":"kahl-BAY-yow","skaičiau":"skai-CHOW","knygą":"KNEE-gah","grįžau":"gree-ZHOW","nebuvau":"neh-bu-VOW","nemačiau":"neh-mah-CHOW","nežinojau":"neh-zhee-NOH-yow","pamiršau":"pah-mir-SHAU","pavėlavau":"pah-vay-lah-VOW","buvo":"BU-voh","nuobodu":"nwoh-boh-DU","neatsitiko":"neh-aht-see-TEE-koh","veikei":"vay-KAY","buvai":"bu-VAI","valgei":"VAHL-gay","matei":"mah-TAY","praėjo":"prah-AY-yoh","patiko":"pah-TEE-koh","nepatiko":"neh-pah-TEE-koh","grįžai":"gree-ZHAI","buvome":"BU-voh-meh","išvažiavo":"ish-vah-ZHYAH-voh","paskambino":"pahs-KAHM-bee-noh","valgėme":"VAHL-gay-meh","restorane":"res-toh-rah-NEH","atvažiavo":"aht-vah-ZHYAH-voh","atsitiko":"aht-see-TEE-koh","pasakė":"pah-SAH-kay","paskui":"pahs-KWEE","galiausiai":"gah-LYOW-syay","staiga":"stai-GAH","parką":"PAHR-kah","picą":"PEE-tsah","grįžome":"GREE-zhoh-meh","nuostabu":"nwohs-tah-BU","ranka":"rahn-KAH","koja":"KOH-yah","akis":"ah-KIS","ausis":"ow-SIS","nosis":"NOH-sis","burna":"bur-NAH","dantis":"dahn-TIS","nugara":"NU-gah-rah","širdis":"shir-DIS","plaukai":"plow-KAI","koją":"KOH-yah","dantį":"DAHN-tee","nugarą":"NU-gah-rah","peršalau":"per-shah-LOW","kosėju":"KOH-say-yu","sloga":"sloh-GAH","svaigsta":"SVAIGS-tah","vaistų":"VAIS-too","nuo":"NWOH","galvos":"gahl-VOHS","skausmo":"SKOWS-moh","jaučiuosi":"yow-CHWOH-see","geriau":"geh-RYOW","atrodo":"aht-ROH-doh","sutinku":"su-TIN-ku","nesutinku":"neh-su-TIN-ku","teisus":"tay-SUS","tikrai":"tik-RAI","abejo":"ah-beh-YOH","nuomone":"NWOH-moh-neh","manai":"mah-NAI","priklauso":"prik-LOW-soh","gera":"geh-RAH","įdomu":"ee-doh-MU","gražu":"grah-ZHU","baisu":"bai-SU","juokinga":"ywoh-KIN-gah","keista":"KAYS-tah","svarbu":"svahr-BU","tas":"TAHS","pats":"PAHTS","lietaus":"lyeh-TOWS","tavimi":"tah-vee-MEE","labiau":"lah-BYOW","geresnė":"geh-RES-nay","beje":"beh-YEH","pavyzdžiui":"PAH-veez-jwee","na":"NAH","žinai":"zhee-NAI","tikrųjų":"tik-ROO-yoo","aišku":"AISH-ku","negali":"neh-gah-LEE","rimtai":"rim-TAI","gaila":"GAI-lah","papasakok":"pah-pah-sah-KOHK","daugiau":"dow-GYOW","būni":"BOO-nee","pasikalbėti":"pah-see-kahl-BAY-tih","kito":"KEE-toh","karto":"KAHR-toh","parašyk":"pah-rah-SHEEK","numeris":"NU-meh-ris","susitikime":"su-see-tee-KEE-meh","Aš norėčiau kavos":"AHSH noh-RAY-chow kah-VOHS",
/* About-you and conversation words (added 28 Oct 2026). */
"Amerikoje":"ah-MEH-ree-koh-yeh","Anglijoje":"AHN-glee-yoh-yeh","Škotijos":"SHKOH-tee-yohs","Škotijoje":"SHKOH-tee-yoh-yeh","Airijos":"AI-ree-yohs","Airijoje":"AI-ree-yoh-yeh","Kanadoje":"kah-NAH-doh-yeh","Australijos":"ows-TRAH-lee-yohs","Australijoje":"ows-TRAH-lee-yoh-yeh","Vokietijos":"voh-kyeh-TEE-yohs","Vokietijoje":"voh-kyeh-TEE-yoh-yeh","Lenkijos":"LEN-kee-yohs","Lenkijoje":"LEN-kee-yoh-yeh","Latvijos":"LAHT-vee-yohs","Latvijoje":"LAHT-vee-yoh-yeh","Ukrainos":"u-krai-NOHS","Ukrainoje":"u-krai-noh-YEH","Norvegijos":"nor-VEH-gee-yohs","Norvegijoje":"nor-VEH-gee-yoh-yeh","Švedijos":"SHVEH-dee-yohs","Švedijoje":"SHVEH-dee-yoh-yeh","Ispanijos":"is-PAH-nee-yohs","Ispanijoje":"is-PAH-nee-yoh-yeh","Prancūzijos":"prahn-TSOO-zee-yohs","Prancūzijoje":"prahn-TSOO-zee-yoh-yeh","Italijos":"ee-TAH-lee-yohs","Italijoje":"ee-TAH-lee-yoh-yeh","Brazilijos":"brah-ZEE-lee-yohs","Brazilijoje":"brah-ZEE-lee-yoh-yeh","Meksikos":"MEK-see-kohs","Meksikoje":"MEK-see-koh-yeh","Indijos":"IN-dee-yohs","Indijoje":"IN-dee-yoh-yeh","Japonijos":"yah-POH-nee-yohs","Japonijoje":"yah-POH-nee-yoh-yeh","Klaipėdoje":"KLAI-pay-doh-yeh","Dubline":"DUB-lee-neh","Berlyne":"ber-LEE-neh","Paryžiuje":"pah-REE-zhyu-yeh","Niujorke":"nyu-YOR-keh","Čikagoje":"chee-KAH-goh-yeh","Osle":"OHS-leh","mokytoja":"MOH-kee-toh-yah","studentė":"stu-DEN-tay","slaugytojas":"SLOW-gee-toh-yahs","inžinierė":"in-zhee-NYEH-ray","programuotoja":"proh-grah-MWOH-toh-yah","vairuotoja":"vai-RWOH-toh-yah","virėja":"vee-RAY-yah","statybininkas":"stah-TEE-bee-nin-kahs","statybininkė":"stah-TEE-bee-nin-kay","pardavėja":"pahr-dah-VAY-yah","buhalteris":"bu-HAHL-teh-ris","buhalterė":"bu-HAHL-teh-ray","vadybininkas":"vah-DEE-bee-nin-kahs","vadybininkė":"vah-DEE-bee-nin-kay","mechanikas":"meh-HAH-nee-kahs","mechanikė":"meh-HAH-nee-kay","ūkininkė":"OO-kee-nin-kay","menininkas":"MEH-nee-nin-kahs","menininkė":"MEH-nee-nin-kay","šeimininkas":"SHAY-mee-nin-kahs","šeimininkė":"SHAY-mee-nin-kay","pensininkė":"PEN-see-nin-kay","bedarbė":"beh-DAHR-bay","gamykloje":"gah-meek-loh-YEH","sandėlyje":"SAHN-day-lee-yeh","banke":"bahn-KEH","ūkyje":"oo-kee-YEH","universitete":"u-nee-ver-see-teh-TEH","vedęs":"VEH-dehs","ištekėjusi":"ish-teh-KAY-yu-see","nevedęs":"NEH-veh-dehs","netekėjusi":"neh-teh-KAY-yu-see","žmoną":"ZHMOH-nah","vyrą":"VEE-rah","draugę":"DROW-geh","draugą":"DROW-gah","sūnų":"SOO-noo","tris":"TRIS","keturis":"KEH-tu-ris","brolius":"BROH-lyus","dvi":"DVEE","seseris":"SEH-seh-ris","katę":"KAH-teh","Lietuvą":"LYEH-tu-vah","lietuvė":"lyeh-TU-vay","draugai":"drow-GAI","lietuviai":"lyeh-TU-vyay","mokytis":"MOH-kee-tis","kalbų":"kahl-BOO","žaisti":"ZHAIS-tih","futbolą":"FUT-boh-lah","žiūrėti":"zhyoo-RAY-tih","filmus":"FIL-mus","klausytis":"klow-SEE-tis","žvejoti":"zhveh-YOH-tih","vaikščioti":"VAIKSH-choh-tih","dainuoti":"dai-NWOH-tih","piešti":"PYEHSH-tih","kompiuterinius":"kom-pyu-TEH-ree-nyus","žaidimus":"zhai-DEE-mus","sode":"soh-DEH","valgysime":"VAHL-gee-see-meh",
"Jonas":"YOH-nahs","Kauno":"KOW-noh","mokaisi":"moh-KAI-see","jums":"YUMS","atnešti":"aht-NESH-tih","ko":"KOH","norėtumėte":"noh-RAY-tu-may-teh","cukrumi":"TSUK-ru-mee","mūsų":"MOO-soo","skani":"skah-NEE","džiaugiuosi":"JOW-gyoh-see","geros":"GEH-rohs","dienos":"dyeh-NOHS","eikite":"AY-kee-teh","penkios":"PEN-kyohs","minutės":"mee-NU-tays","raudoni":"row-doh-NEE","žali":"zhah-LEE","kilogramų":"kee-loh-GRAH-moo","štai":"SHTAI","jūsų":"YOO-soo","šeštadienį":"shesh-TAH-dyeh-nee","kiną":"KEE-nah","vėlu":"vay-LU","šeštadienio":"shesh-TAH-dyeh-nyoh","žiūrėk":"zhyoo-RAYK","Mantas":"MAHN-tahs","muziejų":"mu-ZYEH-yoo","šaunu":"show-NU","gaminame":"gah-MEE-nah-meh","Tomai":"TOH-mai","trečiame":"TREH-chyah-meh","aukšte":"owksh-TEH","septintos":"sep-TIN-tohs","dešimtos":"deh-SHIM-tohs","valandos":"vah-lahn-DOHS","ant":"AHNT","rakto":"RAHK-toh","kortelės":"kor-TEH-lays","tuoj":"TWOY","atsiųsiu":"aht-SYOO-syu","meistrą":"MAYS-trah","duoti":"DWOH-tih","gerkite":"GER-kee-teh","daug":"DOWG","viena":"VYEH-nah","tabletė":"tahb-LEH-tay","kartus":"KAHR-tus","pasveikite":"pahs-VAY-kee-teh","užeik":"u-ZHAYK","sveikas":"SVAY-kahs","cepelinų":"tseh-peh-LEE-noo","atėjai":"ah-TAY-yai","keliesi":"keh-LYEH-see","žiūri":"ZHYOO-ree","šios":"SHYOHS","striukės":"STRYU-kays","populiarios":"poh-pu-LYAH-ryohs","šešiasdešimt":"SHEH-shyahs-deh-shimt","procentų":"proh-TSEN-too","gražios":"GRAH-zhyohs","būsi":"BOO-see","traukiniu":"TROW-kee-nyu","važiuoti":"vah-ZHWOH-tih","pagalvok":"pah-gahl-VOHK","valgėte":"VAHL-gay-teh","sekmadienį":"sek-MAH-dyeh-nee","gražesnis":"grah-ZHES-nis","Tomu":"TOH-mu","pas":"PAHS","mus":"MUS","vakarienės":"vah-kah-RYEH-nays"
};

/* Audio sprite map: voice -> unit -> item id -> [start, duration] seconds */
const SMAP={"ona":{"u1":{"u1a-1:0":[0,0.648],"u1a-1:1":[0.998,0.816],"u1a-1:2":[2.164,1.296],"u1a-1:3":[3.81,1.008],"u1a-1:4":[5.168,1.128],"u1a-2:0":[6.646,0.888],"u1a-2:1":[7.884,1.344],"u1a-2:2":[9.578,0.696],"u1a-2:3":[10.624,1.416],"u1a-2:4":[12.39,0.336],"u1b-1:0":[13.076,0.336],"u1b-1:1":[13.762,0.624],"u1b-1:2":[14.736,1.104],"u1b-1:3":[16.19,0.696],"u1b-1:4":[17.236,1.728],"u1b-2:0":[19.314,0.696],"u1b-2:1":[20.36,1.128],"u1b-2:2":[21.838,1.704],"u1b-2:3":[23.892,1.416],"u1b-2:4":[25.658,0.936],"u1c-1:0":[26.944,1.056],"u1c-1:1":[28.35,0.336],"u1c-1:2":[29.036,0.648],"u1c-1:3":[30.034,0.696],"u1c-1:4":[31.08,1.464],"u1d-1:0":[32.894,1.008],"u1d-1:1":[34.252,1.128],"u1d-1:2":[35.73,1.224],"u1d-1:3":[37.304,1.416],"u1d-1:4":[39.07,1.536],"u1c-2:0":[40.956,0.744],"u1c-2:1":[42.05,0.456],"u1c-2:2":[42.856,0.696],"u1c-2:3":[43.902,1.536],"u1c-2:4":[45.788,1.176],"u1c-3:0":[47.314,1.728]},"u2":{"u2a-1:0":[0,0.816],"u2a-1:1":[1.166,0.648],"u2a-1:2":[2.164,0.288],"u2a-1:3":[2.802,0.864],"u2a-1:4":[4.016,0.696],"u2a-2:0":[5.062,0.816],"u2a-2:1":[6.228,0.936],"u2a-2:2":[7.514,1.056],"u2a-2:3":[8.92,0.864],"u2a-2:4":[10.134,0.816],"u2b-1:0":[11.3,0.696],"u2b-1:1":[12.346,1.056],"u2b-1:2":[13.752,1.008],"u2b-1:3":[15.11,1.104],"u2b-1:4":[16.564,1.296],"u2b-2:0":[18.21,1.008],"u2b-2:1":[19.568,1.056],"u2b-2:2":[20.974,1.056],"u2b-2:3":[22.38,1.008],"u2b-2:4":[23.738,1.368],"u2c-1:0":[25.456,0.504],"u2c-1:1":[26.31,1.176],"u2c-1:2":[27.836,1.488],"u2c-1:3":[29.674,1.104],"u2c-1:4":[31.128,1.296],"u2c-2:0":[32.774,0.936],"u2c-2:1":[34.06,1.176],"u2c-2:2":[35.586,1.104],"u2c-2:3":[37.04,0.696],"u2c-2:4":[38.086,0.864]},"u3":{"u3a-1:0":[0,0.816],"u3a-1:1":[1.166,0.696],"u3a-1:2":[2.212,1.104],"u3a-1:3":[3.666,0.696],"u3a-1:4":[4.712,0.768],"u3a-2:0":[5.83,0.888],"u3a-2:1":[7.068,1.176],"u3a-2:2":[8.594,0.744],"u3a-2:3":[9.688,1.368],"u3a-2:4":[11.406,1.704],"u3b-1:0":[13.46,0.816],"u3b-1:1":[14.626,0.696],"u3b-1:2":[15.672,0.768],"u3b-1:3":[16.79,1.056],"u3b-1:4":[18.196,0.696],"u3b-2:0":[19.242,0.864],"u3b-2:1":[20.456,1.104],"u3b-2:2":[21.91,0.768],"u3b-2:3":[23.028,1.104],"u3b-2:4":[24.482,0.696],"u3c-1:0":[25.528,2.088],"u3c-1:1":[27.966,2.064],"u3c-1:2":[30.38,1.536],"u3c-1:3":[32.266,1.296],"u3c-1:4":[33.912,1.488],"u3c-2:0":[35.75,2.784],"u3c-2:1":[38.884,0.888],"u3c-2:2":[40.122,1.008],"u3c-2:3":[41.48,0.816],"u3c-2:4":[42.646,0.888],"u3d-1:0":[43.884,2.088],"u3d-1:1":[46.322,1.368],"u3d-1:2":[48.04,1.296],"u3d-1:3":[49.686,1.704],"u3d-1:4":[51.74,1.056],"u3d-2:0":[53.146,2.424],"u3d-2:1":[55.92,1.704],"u3d-2:2":[57.974,1.944],"u3d-2:3":[60.268,1.848],"u3d-2:4":[62.466,2.136]},"u4":{"u4a-1:0":[0,0.768],"u4a-1:1":[1.118,0.696],"u4a-1:2":[2.164,0.768],"u4a-1:3":[3.282,0.864],"u4a-1:4":[4.496,0.768],"u4a-2:0":[5.614,0.696],"u4a-2:1":[6.66,1.608],"u4a-2:2":[8.618,1.008],"u4a-2:3":[9.976,0.816],"u4a-2:4":[11.142,0.768],"u4b-1:0":[12.26,0.864],"u4b-1:1":[13.474,0.864],"u4b-1:2":[14.688,0.816],"u4b-1:3":[15.854,1.296],"u4b-1:4":[17.5,0.816],"u4b-2:0":[18.666,0.936],"u4b-2:1":[19.952,1.416],"u4b-2:2":[21.718,0.888],"u4b-2:3":[22.956,1.296],"u4b-2:4":[24.602,1.536]},"u5":{"u5a-1:0":[0,1.008],"u5a-1:1":[1.358,0.816],"u5a-1:2":[2.524,0.696],"u5a-1:3":[3.57,1.104],"u5a-1:4":[5.024,0.696],"u5a-2:0":[6.07,0.744],"u5a-2:1":[7.164,1.656],"u5a-2:2":[9.17,1.104],"u5a-2:3":[10.624,1.656],"u5a-2:4":[12.63,1.008],"u5b-1:0":[13.988,0.864],"u5b-1:1":[15.202,0.768],"u5b-1:2":[16.32,0.816],"u5b-1:3":[17.486,1.344],"u5b-1:4":[19.18,0.888],"u5b-2:0":[20.418,0.816],"u5b-2:1":[21.584,0.816],"u5b-2:2":[22.75,1.776],"u5b-2:3":[24.876,1.056],"u5b-2:4":[26.282,1.464]},"u6":{"u6a-1:0":[0,0.744],"u6a-1:1":[1.094,0.696],"u6a-1:2":[2.14,0.696],"u6a-1:3":[3.186,1.368],"u6a-1:4":[4.904,1.656],"u6a-2:0":[6.91,1.464],"u6a-2:1":[8.724,1.104],"u6a-2:2":[10.178,0.696],"u6a-2:3":[11.224,0.696],"u6a-2:4":[12.27,1.464],"u6b-1:0":[14.084,0.744],"u6b-1:1":[15.178,1.296],"u6b-1:2":[16.824,0.864],"u6b-1:3":[18.038,0.816],"u6b-1:4":[19.204,0.888],"u6b-2:0":[20.442,0.864],"u6b-2:1":[21.656,0.696],"u6b-2:2":[22.702,1.368],"u6b-2:3":[24.42,1.488],"u6b-2:4":[26.258,1.104]},"u7":{"u7a-1:0":[0,1.368],"u7a-1:1":[1.718,1.224],"u7a-1:2":[3.292,1.344],"u7a-1:3":[4.986,1.056],"u7a-1:4":[6.392,1.368],"u7a-2:0":[8.11,1.128],"u7a-2:1":[9.588,1.296],"u7a-2:2":[11.234,0.816],"u7a-2:3":[12.4,1.536],"u7a-2:4":[14.286,0.768],"u7b-1:0":[15.404,1.176],"u7b-1:1":[16.93,1.608],"u7b-1:2":[18.888,0.744],"u7b-1:3":[19.982,1.008],"u7b-1:4":[21.34,0.888],"u7b-2:0":[22.578,1.128],"u7b-2:1":[24.056,1.248],"u7b-2:2":[25.654,0.768],"u7b-2:3":[26.772,0.768],"u7b-2:4":[27.89,2.016],"u7c-1:0":[30.256,0.984],"u7c-1:1":[31.59,0.864],"u7c-1:2":[32.804,1.344],"u7c-1:3":[34.498,1.536],"u7c-1:4":[36.384,1.608],"u7c-2:0":[38.342,1.008],"u7c-2:1":[39.7,0.696],"u7c-2:2":[40.746,1.008],"u7c-2:3":[42.104,1.536],"u7c-2:4":[43.99,0.888]},"u8":{"u8b-1:0":[0,0.768],"u8b-1:1":[1.118,1.464],"u8b-1:2":[2.932,1.104],"u8b-1:3":[4.386,0.888],"u8b-1:4":[5.624,1.008],"u8b-2:0":[6.982,1.008],"u8b-2:1":[8.34,0.816],"u8b-2:2":[9.506,1.008],"u8b-2:3":[10.864,0.984],"u8b-2:4":[12.198,1.056],"u8c-1:0":[13.604,1.536],"u8c-1:1":[15.49,1.656],"u8c-1:2":[17.496,1.536],"u8c-1:3":[19.382,1.056],"u8c-1:4":[20.788,1.896],"u8c-2:0":[23.034,1.968],"u8c-2:1":[25.352,1.296],"u8c-2:2":[26.998,1.056],"u8c-2:3":[28.404,1.896],"u8c-2:4":[30.65,1.104],"u8a-1:0":[32.104,0.768],"u8a-1:1":[33.222,1.104],"u8a-1:2":[34.676,1.008],"u8a-1:3":[36.034,0.816],"u8a-1:4":[37.2,1.608],"u8a-2:0":[39.158,1.008],"u8a-2:1":[40.516,1.728],"u8a-2:2":[42.594,1.368],"u8a-2:3":[44.312,0.768],"u8a-2:4":[45.43,1.584]},"u9":{"u9a-1:0":[0,0.888],"u9a-1:1":[1.238,0.696],"u9a-1:2":[2.284,0.768],"u9a-1:3":[3.402,0.768],"u9a-1:4":[4.52,1.104],"u9a-2:0":[5.974,0.816],"u9a-2:1":[7.14,0.888],"u9a-2:2":[8.378,0.768],"u9a-2:3":[9.496,1.008],"u9a-2:4":[10.854,0.816],"u9b-1:0":[12.02,1.176],"u9b-1:1":[13.546,0.936],"u9b-1:2":[14.832,1.296],"u9b-1:3":[16.478,0.864],"u9b-1:4":[17.692,1.176],"u9b-2:0":[19.218,0.336],"u9b-2:1":[19.904,1.368],"u9b-2:2":[21.622,0.696],"u9b-2:3":[22.668,1.224],"u9b-2:4":[24.242,1.104]},"u10":{"u10a-1:0":[0,0.984],"u10a-1:1":[1.334,1.008],"u10a-1:2":[2.692,1.176],"u10a-1:3":[4.218,1.056],"u10a-1:4":[5.624,1.824],"u10a-2:0":[7.798,0.888],"u10a-2:1":[9.036,0.816],"u10a-2:2":[10.202,0.768],"u10a-2:3":[11.32,1.056],"u10a-2:4":[12.726,1.776],"u10b-1:0":[14.852,0.888],"u10b-1:1":[16.09,0.816],"u10b-1:2":[17.256,0.744],"u10b-1:3":[18.35,1.056],"u10b-1:4":[19.756,1.368],"u10b-2:0":[21.474,1.488],"u10b-2:1":[23.312,0.768],"u10b-2:2":[24.43,1.296],"u10b-2:3":[26.076,1.464],"u10b-2:4":[27.89,0.864]},"u11":{"u11a-1:0":[0,1.488],"u11a-1:1":[1.838,1.464],"u11a-1:2":[3.652,1.008],"u11a-1:3":[5.01,1.464],"u11a-1:4":[6.824,0.696],"u11a-2:0":[7.87,0.864],"u11a-2:1":[9.084,0.984],"u11a-2:2":[10.418,0.768],"u11a-2:3":[11.536,0.816],"u11a-2:4":[12.702,0.816],"u11b-1:0":[13.868,0.888],"u11b-1:1":[15.106,0.768],"u11b-1:2":[16.224,0.936],"u11b-1:3":[17.51,1.464],"u11b-1:4":[19.324,1.008],"u11b-2:0":[20.682,1.296],"u11b-2:1":[22.328,1.728],"u11b-2:2":[24.406,1.248],"u11b-2:3":[26.004,1.848],"u11b-2:4":[28.202,1.248]},"u12":{"u12b-1:0":[0,1.248],"u12b-1:1":[1.598,1.416],"u12b-1:2":[3.364,2.016],"u12b-1:3":[5.73,1.176],"u12b-1:4":[7.256,1.056],"u12b-2:0":[8.662,1.608],"u12b-2:1":[10.62,1.248],"u12b-2:2":[12.218,1.224],"u12b-2:3":[13.792,1.176],"u12b-2:4":[15.318,1.704],"u12a-1:0":[17.372,0.984],"u12a-1:1":[18.706,0.888],"u12a-1:2":[19.944,1.248],"u12a-1:3":[21.542,1.488],"u12a-1:4":[23.38,0.816],"u12a-2:0":[24.546,0.936],"u12a-2:1":[25.832,1.104],"u12a-2:2":[27.286,1.008],"u12a-2:3":[28.644,1.368],"u12a-2:4":[30.362,2.136]},"u13":{"u13a-1:0":[0,0.504],"u13a-1:1":[0.854,0.576],"u13a-1:2":[1.78,0.696],"u13a-1:3":[2.826,1.104],"u13a-1:4":[4.28,0.816],"u13a-2:0":[5.446,0.648],"u13a-2:1":[6.444,1.584],"u13a-2:2":[8.378,1.704],"u13a-2:3":[10.432,1.488],"u13a-2:4":[12.27,1.104],"u13b-1:0":[13.724,1.776],"u13b-1:1":[15.85,1.608],"u13b-1:2":[17.808,1.104],"u13b-1:3":[19.262,1.056],"u13b-1:4":[20.668,1.056],"u13b-2:0":[22.074,0.864],"u13b-2:1":[23.288,1.008],"u13b-2:2":[24.646,0.816],"u13b-2:3":[25.812,1.656],"u13b-2:4":[27.818,0.816]},"u14":{"u14a-1:0":[0,2.496],"u14a-1:1":[2.846,1.176],"u14a-1:2":[4.372,1.176],"u14a-1:3":[5.898,1.416],"u14a-1:4":[7.664,2.328],"u14a-2:0":[10.342,1.824],"u14a-2:1":[12.516,1.656],"u14a-2:2":[14.522,1.008],"u14a-2:3":[15.88,1.464],"u14a-2:4":[17.694,1.128],"u14b-1:0":[19.172,0.864],"u14b-1:1":[20.386,2.064],"u14b-1:2":[22.8,2.304],"u14b-1:3":[25.454,2.568],"u14b-1:4":[28.372,1.104],"u14b-2:0":[29.826,0.768],"u14b-2:1":[30.944,1.008],"u14b-2:2":[32.302,1.368],"u14b-2:3":[34.02,1.584],"u14b-2:4":[35.954,1.104],"u14c-1:0":[37.408,1.536],"u14c-1:1":[39.294,1.656],"u14c-1:2":[41.3,1.848],"u14c-1:3":[43.498,1.536],"u14c-1:4":[45.384,0.936]},"u15":{"u15a-1:0":[0,2.616],"u15a-1:1":[2.966,1.224],"u15a-1:2":[4.54,1.848],"u15a-1:3":[6.738,1.416],"u15a-1:4":[8.504,2.976],"u15a-2:0":[11.83,1.584],"u15a-2:1":[13.764,1.488],"u15a-2:2":[15.602,0.888],"u15a-2:3":[16.84,0.744],"u15a-2:4":[17.934,1.776],"u15b-1:0":[20.06,1.896],"u15b-1:1":[22.306,1.008],"u15b-1:2":[23.664,1.224],"u15b-1:3":[25.238,1.368],"u15b-1:4":[26.956,1.824],"u15b-2:0":[29.13,1.056],"u15b-2:1":[30.536,1.128],"u15b-2:2":[32.014,0.888],"u15b-2:3":[33.252,0.864],"u15b-2:4":[34.466,0.816],"u15c-1:0":[35.632,1.848],"u15c-1:1":[37.83,2.784],"u15c-1:2":[40.964,2.184],"u15c-1:3":[43.498,0.816],"u15c-1:4":[44.664,1.224]},"u16":{"u16a-1:0":[0,0.936],"u16a-1:1":[1.286,1.536],"u16a-1:2":[3.172,0.888],"u16a-1:3":[4.41,0.336],"u16a-1:4":[5.096,1.656],"u16a-2:0":[7.102,0.816],"u16a-2:1":[8.268,1.608],"u16a-2:2":[10.226,1.464],"u16a-2:3":[12.04,1.416],"u16a-2:4":[13.806,1.416],"u16b-1:0":[15.572,0.696],"u16b-1:1":[16.618,2.136],"u16b-1:2":[19.104,0.744],"u16b-1:3":[20.198,1.056],"u16b-1:4":[21.604,1.008],"u16b-2:0":[22.962,0.888],"u16b-2:1":[24.2,0.888],"u16b-2:2":[25.438,0.888],"u16b-2:3":[26.676,1.176],"u16b-2:4":[28.202,1.368],"u16c-1:0":[29.92,1.536],"u16c-1:1":[31.806,1.368],"u16c-1:2":[33.524,1.704],"u16c-1:3":[35.578,1.128],"u16c-1:4":[37.056,1.248]},"u17":{"u17a-1:0":[0,1.944],"u17a-1:1":[2.294,0.936],"u17a-1:2":[3.58,1.464],"u17a-1:3":[5.394,1.296],"u17a-1:4":[7.04,1.128],"u17a-2:0":[8.518,1.824],"u17a-2:1":[10.692,1.896],"u17a-2:2":[12.938,2.064],"u17a-2:3":[15.352,1.176],"u17a-2:4":[16.878,0.888],"u17b-1:0":[18.116,0.864],"u17b-1:1":[19.33,1.104],"u17b-1:2":[20.784,1.464],"u17b-1:3":[22.598,1.536],"u17b-1:4":[24.484,1.008],"u17b-2:0":[25.842,1.824],"u17b-2:1":[28.016,1.944],"u17b-2:2":[30.31,1.224],"u17b-2:3":[31.884,1.104],"u17b-2:4":[33.338,1.368]},"u18":{"u18a-1:0":[0,1.128],"u18a-1:1":[1.478,1.464],"u18a-1:2":[3.292,1.176],"u18a-1:3":[4.818,1.704],"u18a-1:4":[6.872,1.536],"u18a-2:0":[8.758,1.416],"u18a-2:1":[10.524,0.864],"u18a-2:2":[11.738,0.768],"u18a-2:3":[12.856,0.816],"u18a-2:4":[14.022,1.176],"u18b-1:0":[15.548,1.848],"u18b-1:1":[17.746,0.864],"u18b-1:2":[18.96,1.416],"u18b-1:3":[20.726,1.728],"u18b-1:4":[22.804,1.296],"u18b-2:0":[24.45,0.888],"u18b-2:1":[25.688,1.464],"u18b-2:2":[27.502,1.368],"u18b-2:3":[29.22,1.416],"u18b-2:4":[30.986,1.728],"u18c-1:0":[33.064,1.488],"u18c-1:1":[34.902,1.704],"u18c-1:2":[36.956,1.584],"u18c-1:3":[38.89,1.416],"u18c-1:4":[40.656,1.104]},"u0":{"u0a-1:0":[0,0.456],"u0a-1:1":[0.806,1.704],"u0a-1:2":[2.86,1.128],"u0a-1:3":[4.338,0.888],"u0a-1:4":[5.576,1.728],"u0b-1:0":[7.654,0.888],"u0b-1:1":[8.892,0.888],"u0b-1:2":[10.13,1.776],"u0b-1:3":[12.256,0.888],"u0b-1:4":[13.494,1.056]},"u21":{"u21a-1:0":[0,1.968],"u21a-1:1":[2.318,0.816],"u21a-1:2":[3.484,1.056],"u21a-1:3":[4.89,0.864],"u21a-1:4":[6.104,1.344],"u21a-2:0":[7.798,1.656],"u21a-2:1":[9.804,0.888],"u21a-2:2":[11.042,1.416],"u21a-2:3":[12.808,1.296],"u21a-2:4":[14.454,0.768],"u21b-1:0":[15.572,2.064],"u21b-1:1":[17.986,2.064],"u21b-1:2":[20.4,1.416],"u21b-1:3":[22.166,1.536],"u21b-1:4":[24.052,2.088],"u21b-2:0":[26.49,0.768],"u21b-2:1":[27.608,0.984],"u21b-2:2":[28.942,1.104],"u21b-2:3":[30.396,1.056],"u21b-2:4":[31.802,0.984]},"u20":{"u20a-1:0":[0,2.016],"u20a-1:1":[2.366,1.488],"u20a-1:2":[4.204,1.536],"u20a-1:3":[6.09,1.488],"u20a-1:4":[7.928,1.296],"u20a-2:0":[9.574,1.488],"u20a-2:1":[11.412,0.696],"u20a-2:2":[12.458,2.184],"u20a-2:3":[14.992,1.248],"u20a-2:4":[16.59,1.656],"u20b-1:0":[18.596,1.056],"u20b-1:1":[20.002,1.368],"u20b-1:2":[21.72,1.344],"u20b-1:3":[23.414,1.656],"u20b-1:4":[25.42,1.896],"u20b-2:0":[27.666,1.464],"u20b-2:1":[29.48,1.968],"u20b-2:2":[31.798,1.776],"u20b-2:3":[33.924,1.224],"u20b-2:4":[35.498,0.816]},"u23":{"u23a-1:0":[0,2.136],"u23a-1:1":[2.486,1.248],"u23a-1:2":[4.084,1.008],"u23a-1:3":[5.442,1.176],"u23a-1:4":[6.968,1.176],"u23a-2:0":[8.494,1.296],"u23a-2:1":[10.14,1.704],"u23a-2:2":[12.194,1.416],"u23a-2:3":[13.96,1.296],"u23a-2:4":[15.606,1.416],"u23b-1:0":[17.372,1.464],"u23b-1:1":[19.186,2.184],"u23b-1:2":[21.72,1.536],"u23b-1:3":[23.606,1.488],"u23b-1:4":[25.444,0.768],"u23b-2:0":[26.562,0.888],"u23b-2:1":[27.8,0.936],"u23b-2:2":[29.086,0.768],"u23b-2:3":[30.204,0.816],"u23b-2:4":[31.37,1.056]},"u25":{"u25a-1:0":[0,1.896],"u25a-1:1":[2.246,1.488],"u25a-1:2":[4.084,1.224],"u25a-1:3":[5.658,1.008],"u25a-1:4":[7.016,1.368],"u25a-2:0":[8.734,1.296],"u25a-2:1":[10.38,1.056],"u25a-2:2":[11.786,1.296],"u25a-2:3":[13.432,1.896],"u25a-2:4":[15.678,1.416]},"u22":{"u22a-1:0":[0,1.416],"u22a-1:1":[1.766,2.064],"u22a-1:2":[4.18,1.488],"u22a-1:3":[6.018,1.416],"u22a-1:4":[7.784,1.896],"u22a-2:0":[10.03,0.936],"u22a-2:1":[11.316,0.816],"u22a-2:2":[12.482,0.864],"u22a-2:3":[13.696,0.768],"u22a-2:4":[14.814,1.368],"u22b-1:0":[16.532,2.256],"u22b-1:1":[19.138,1.536],"u22b-1:2":[21.024,2.136],"u22b-1:3":[23.51,1.536],"u22b-1:4":[25.396,1.656],"u22b-2:0":[27.402,1.368],"u22b-2:1":[29.12,1.776],"u22b-2:2":[31.246,1.008],"u22b-2:3":[32.604,1.128],"u22b-2:4":[34.082,1.704]},"cv1":{"cv1:0":[0.0,1.296],"cv1:1":[1.646,1.248],"cv1:2":[3.244,0.336],"cv1:3":[3.93,1.056],"cv1:4":[5.336,2.688],"cv1:5":[8.374,1.464],"cv1:6":[10.188,2.568],"cv1:7":[13.106,1.536],"cv1:8":[14.992,1.128],"cv1:9o0":[16.47,0.864],"cv1:9o0-0":[17.684,1.296],"cv1:9o1":[19.33,1.128],"cv1:9o1-0":[20.808,1.704],"cv1:10":[22.862,1.368],"cv1:11":[24.58,1.536],"cv1:13":[26.466,2.016],"cv1:14":[28.832,2.808],"cv1:15":[31.99,0.936],"cv1:16":[33.276,1.536],"cv1:18":[35.162,1.128],"cv1:19":[36.64,1.704],"cv1:21":[38.694,2.376],"cv1:22":[41.42,3.384],"cv1:23":[45.154,1.056]},"cv2":{"cv2:0":[0.0,2.544],"cv2:1":[2.894,2.544],"cv2:2":[5.788,3.048],"cv2:3":[9.186,2.736],"cv2:4":[12.272,2.976],"cv2:5":[15.598,2.688],"cv2:6":[18.636,3.096],"cv2:7":[22.082,1.056],"cv2:8":[23.488,1.416],"cv2:9":[25.254,2.016],"cv2:10":[27.62,3.696],"cv2:11o0":[31.666,1.368],"cv2:11o0-0":[33.384,2.856],"cv2:11o0-1":[36.59,1.968],"cv2:11o1":[38.908,1.416],"cv2:11o1-0":[40.674,2.496],"cv2:11o1-1":[43.52,2.064],"cv2:12":[45.934,2.088],"cv2:13":[48.372,2.544],"cv2:14":[51.266,1.416],"cv2:15":[53.032,1.968]},"cv3":{"cv3:0":[0.0,1.848],"cv3:1":[2.198,2.856],"cv3:2":[5.404,3.024],"cv3:3o0":[8.778,1.896],"cv3:3o0-0":[11.024,1.536],"cv3:3o1":[12.91,1.896],"cv3:3o1-0":[15.156,1.656],"cv3:4":[17.162,1.776],"cv3:5":[19.288,2.016],"cv3:6":[21.654,1.608],"cv3:7":[23.612,3.168],"cv3:8o0":[27.13,1.536],"cv3:8o0-0":[29.016,1.128],"cv3:8o1":[30.494,1.536],"cv3:8o1-0":[32.38,2.424],"cv3:9":[35.154,1.296],"cv3:10o0":[36.8,3.048],"cv3:10o0-0":[40.198,1.176],"cv3:10o1":[41.724,1.368],"cv3:10o1-0":[43.442,0.936],"cv3:12":[44.728,1.248],"cv3:13":[46.326,2.016],"cv3:14":[48.692,1.728],"cv3:15":[50.77,2.808],"cv3:16":[53.928,0.768],"cv3:17":[55.046,1.968],"cv3:18":[57.364,1.248],"cv3:19":[58.962,1.224],"cv3:20":[60.536,1.176],"cv3:21":[62.062,2.064],"cv3:22":[64.476,2.016]},"cv4":{"cv4:0":[0.0,1.176],"cv4:1":[1.526,2.376],"cv4:2":[4.252,1.296],"cv4:3":[5.898,2.304],"cv4:4o0":[8.552,2.016],"cv4:4o0-0":[10.918,1.944],"cv4:4o1":[13.212,1.008],"cv4:4o1-0":[14.57,0.816],"cv4:5":[15.736,0.888],"cv4:6":[16.974,1.104],"cv4:7":[18.428,1.776],"cv4:8":[20.554,4.656],"cv4:9":[25.56,1.896],"cv4:10":[27.806,1.176],"cv4:11":[29.332,1.056]},"cv5":{"cv5:0":[0.0,1.848],"cv5:1":[2.198,2.448],"cv5:2":[4.996,2.856],"cv5:3":[8.202,1.104],"cv5:4":[9.656,2.544],"cv5:5":[12.55,1.416],"cv5:6":[14.316,2.496],"cv5:7":[17.162,1.368],"cv5:8":[18.88,1.896],"cv5:9o0":[21.126,0.768],"cv5:9o0-0":[22.244,2.496],"cv5:9o0-1":[25.09,1.416],"cv5:9o0-2":[26.856,1.584],"cv5:9o1":[28.79,1.776],"cv5:9o1-0":[30.916,1.704],"cv5:10":[32.97,1.896],"cv5:11":[35.216,1.536],"cv5:12":[37.102,2.424],"cv5:13":[39.876,2.328],"cv5:14":[42.554,2.424]},"cv6":{"cv6:0":[0,2.904],"cv6:1":[3.254,2.688],"cv6:2":[6.292,3.384],"cv6:3":[10.026,0.888],"cv6:4":[11.264,2.856],"cv6:5o0":[14.47,1.704],"cv6:5o0-0":[16.524,2.784],"cv6:5o1":[19.658,1.728],"cv6:5o1-0":[21.736,3.288],"cv6:5o1-1":[25.374,1.056],"cv6:5o1-2":[26.78,2.688],"cv6:6":[29.818,1.008],"cv6:7":[31.176,2.736],"cv6:8":[34.262,2.664],"cv6:10":[37.276,2.064],"cv6:11":[39.69,1.896],"cv6:12":[41.936,2.568]},"cv7":{"cv7:0":[0.0,2.976],"cv7:1":[3.326,2.688],"cv7:2":[6.364,6.408],"cv7:3o0":[13.122,2.088],"cv7:3o0-0":[15.56,3.144],"cv7:3o1":[19.054,1.176],"cv7:3o1-0":[20.58,3.264],"cv7:4":[24.194,1.968],"cv7:5o0":[26.512,1.968],"cv7:5o0-0":[28.83,3.168],"cv7:5o1":[32.348,1.536],"cv7:5o1-0":[34.234,2.208],"cv7:5o2":[36.792,1.536],"cv7:5o2-0":[38.678,3.024],"cv7:6":[42.052,2.808],"cv7:7":[45.21,2.736],"cv7:8":[48.296,1.536],"cv7:9":[50.182,1.536],"cv7:10":[52.068,3.384],"cv7:11":[55.802,1.656]},"cv8":{"cv8:0":[0.0,2.256],"cv8:1":[2.606,2.856],"cv8:2":[5.812,1.296],"cv8:3":[7.458,1.464],"cv8:4":[9.272,2.376],"cv8:5o0":[11.998,1.416],"cv8:5o1":[13.764,1.464],"cv8:5o1-0":[15.578,2.976],"cv8:6":[18.904,1.848],"cv8:7":[21.102,1.176],"cv8:8":[22.628,2.256],"cv8:9":[25.234,1.824],"cv8:10":[27.408,0.576],"cv8:11":[28.334,1.776],"cv8:12":[30.46,1.224],"cv8:13":[32.034,1.824],"cv8:15":[34.208,2.736],"cv8:16o0":[37.294,1.296],"cv8:16o0-0":[38.94,1.776],"cv8:16o1":[41.066,1.104],"cv8:16o1-0":[42.52,2.376],"cv8:17":[45.246,0.864]},"cv9":{"cv9:0":[0.0,2.496],"cv9:1":[2.846,2.088],"cv9:2":[5.284,1.728],"cv9:3":[7.362,1.536],"cv9:4":[9.248,1.536],"cv9:5o0":[11.134,1.728],"cv9:5o0-0":[13.212,1.176],"cv9:5o1":[14.738,1.536],"cv9:5o1-0":[16.624,1.488],"cv9:6":[18.462,3.384],"cv9:7":[22.196,2.376],"cv9:8":[24.922,2.856],"cv9:9":[28.128,2.448],"cv9:10":[30.926,2.064],"cv9:11":[33.34,2.016],"cv9:12":[35.706,1.296],"cv9:13":[37.352,2.016]},"cv10":{"cv10:0":[0.0,2.136],"cv10:1":[2.486,2.976],"cv10:2":[5.812,2.256],"cv10:3":[8.418,2.496],"cv10:4":[11.264,2.904],"cv10:5":[14.518,2.568],"cv10:6":[17.436,1.008],"cv10:7":[18.794,3.384],"cv10:8o0":[22.528,1.704],"cv10:8o0-0":[24.582,1.008],"cv10:8o1":[25.94,2.736],"cv10:8o1-0":[29.026,4.368],"cv10:9":[33.744,2.136],"cv10:10":[36.23,2.448],"cv10:11":[39.028,2.616],"cv10:12":[41.994,1.416],"cv10:13":[43.76,2.496],"cv10:14":[46.606,2.976],"cv10:15":[49.932,1.008],"cv10:16":[51.29,1.056],"cv10:18":[52.696,2.976],"cv10:19":[56.022,2.544]},"u27":{"u27a-1:0":[0,1.104],"u27a-1:1":[1.454,1.224],"u27a-1:2":[3.028,1.368],"u27a-1:3":[4.746,1.056],"u27a-1:4":[6.152,1.128],"u27a-2:0":[7.63,1.536],"u27a-2:1":[9.516,1.008],"u27a-2:2":[10.874,1.104],"u27a-2:3":[12.328,1.248],"u27a-2:4":[13.926,1.464],"u27b-1:0":[15.74,1.728],"u27b-1:1":[17.818,1.056],"u27b-1:2":[19.224,1.008],"u27b-1:3":[20.582,1.104],"u27b-1:4":[22.036,1.056],"u27b-2:0":[23.442,2.088],"u27b-2:1":[25.88,1.368],"u27b-2:2":[27.598,1.656],"u27b-2:3":[29.604,1.824],"u27b-2:4":[31.778,2.256],"u27c-1:0":[34.384,0.936],"u27c-1:1":[35.67,1.104],"u27c-1:2":[37.124,1.728],"u27c-1:3":[39.202,1.008],"u27c-1:4":[40.56,0.888],"u27c-2:0":[41.798,1.128],"u27c-2:1":[43.276,1.776],"u27c-2:2":[45.402,1.176],"u27c-2:3":[46.928,1.008],"u27c-2:4":[48.286,1.176],"u27d-1:0":[49.812,1.176],"u27d-1:1":[51.338,1.176],"u27d-1:2":[52.864,1.104],"u27d-1:3":[54.318,1.248],"u27d-1:4":[55.916,1.104],"u27d-2:0":[57.37,1.656],"u27d-2:1":[59.376,1.776],"u27d-2:2":[61.502,1.224],"u27d-2:3":[63.076,1.176],"u27d-2:4":[64.602,1.296]},"u28":{"u28a-1:0":[0,1.128],"u28a-1:1":[1.478,2.784],"u28a-1:2":[4.612,1.296],"u28a-1:3":[6.258,1.296],"u28a-1:4":[7.904,2.088],"u28a-2:0":[10.342,1.776],"u28a-2:1":[12.468,1.464],"u28a-2:2":[14.282,1.536],"u28a-2:3":[16.168,1.248],"u28a-2:4":[17.766,1.536],"u28b-1:0":[19.652,2.136],"u28b-1:1":[22.138,1.056],"u28b-1:2":[23.544,1.416],"u28b-1:3":[25.31,1.656],"u28b-1:4":[27.316,1.416],"u28b-2:0":[29.082,1.536],"u28b-2:1":[30.968,1.536],"u28b-2:2":[32.854,1.248],"u28b-2:3":[34.452,1.536],"u28b-2:4":[36.338,2.088],"u28c-1:0":[38.776,0.816],"u28c-1:1":[39.942,0.816],"u28c-1:2":[41.108,0.888],"u28c-1:3":[42.346,1.176],"u28c-1:4":[43.872,0.816],"u28c-2:0":[45.038,1.056],"u28c-2:1":[46.444,1.776],"u28c-2:2":[48.57,1.656],"u28c-2:3":[50.576,1.776],"u28c-2:4":[52.702,2.088]},"u29":{"u29a-1:0":[0,1.104],"u29a-1:1":[1.454,0.816],"u29a-1:2":[2.62,0.888],"u29a-1:3":[3.858,1.128],"u29a-1:4":[5.336,0.864],"u29a-2:0":[6.55,0.816],"u29a-2:1":[7.716,0.888],"u29a-2:2":[8.954,0.864],"u29a-2:3":[10.168,0.864],"u29a-2:4":[11.382,1.224],"u29b-1:0":[12.956,1.296],"u29b-1:1":[14.602,1.656],"u29b-1:2":[16.608,1.824],"u29b-1:3":[18.782,1.296],"u29b-1:4":[20.428,2.136],"u29b-2:0":[22.914,0.864],"u29b-2:1":[24.128,1.008],"u29b-2:2":[25.486,1.776],"u29b-2:3":[27.612,1.848],"u29b-2:4":[29.81,1.656],"u29c-1:0":[31.816,1.008],"u29c-1:1":[33.174,0.936],"u29c-1:2":[34.46,1.104],"u29c-1:3":[35.914,0.864],"u29c-1:4":[37.128,1.008],"u29c-2:0":[38.486,1.176],"u29c-2:1":[40.012,1.296],"u29c-2:2":[41.658,1.008],"u29c-2:3":[43.016,2.064],"u29c-2:4":[45.43,1.416]},"u30":{"u30a-1:0":[0,1.368],"u30a-1:1":[1.718,1.416],"u30a-1:2":[3.484,0.888],"u30a-1:3":[4.722,1.008],"u30a-1:4":[6.08,0.816],"u30a-2:0":[7.246,1.056],"u30a-2:1":[8.652,0.936],"u30a-2:2":[9.938,1.104],"u30a-2:3":[11.392,0.744],"u30a-2:4":[12.486,0.696],"u30b-1:0":[13.532,0.696],"u30b-1:1":[14.578,0.768],"u30b-1:2":[15.696,0.696],"u30b-1:3":[16.742,0.936],"u30b-1:4":[18.028,1.464],"u30b-2:0":[19.842,1.464],"u30b-2:1":[21.656,0.768],"u30b-2:2":[22.774,1.128],"u30b-2:3":[24.252,0.888],"u30b-2:4":[25.49,0.816],"u30c-1:0":[26.656,1.608],"u30c-1:1":[28.614,1.464],"u30c-1:2":[30.428,1.488],"u30c-1:3":[32.266,0.816],"u30c-1:4":[33.432,1.224],"u30c-2:0":[35.006,1.584],"u30c-2:1":[36.94,1.488],"u30c-2:2":[38.778,2.016],"u30c-2:3":[41.144,1.248],"u30c-2:4":[42.742,1.488]},"u31":{"u31a-1:0":[0,1.176],"u31a-1:1":[1.526,1.008],"u31a-1:2":[2.884,1.128],"u31a-1:3":[4.362,1.296],"u31a-1:4":[6.008,1.128],"u31a-2:0":[7.486,0.936],"u31a-2:1":[8.772,1.176],"u31a-2:2":[10.298,1.008],"u31a-2:3":[11.656,1.104],"u31a-2:4":[13.11,0.888],"u31b-1:0":[14.348,1.056],"u31b-1:1":[15.754,1.704],"u31b-1:2":[17.808,1.656],"u31b-1:3":[19.814,1.584],"u31b-1:4":[21.748,1.536],"u31b-2:0":[23.634,1.416],"u31b-2:1":[25.4,1.656],"u31b-2:2":[27.406,1.728],"u31b-2:3":[29.484,1.296],"u31b-2:4":[31.13,1.656]},"u32":{"u32a-1:0":[0,0.744],"u32a-1:1":[1.094,1.464],"u32a-1:2":[2.908,1.008],"u32a-1:3":[4.266,0.768],"u32a-1:4":[5.384,1.704],"u32a-2:0":[7.438,1.704],"u32a-2:1":[9.492,0.888],"u32a-2:2":[10.73,0.696],"u32a-2:3":[11.776,0.864],"u32a-2:4":[12.99,1.104],"u32b-1:0":[14.444,1.056],"u32b-1:1":[15.85,1.416],"u32b-1:2":[17.616,0.888],"u32b-1:3":[18.854,1.416],"u32b-1:4":[20.62,1.224],"u32b-2:0":[22.194,0.888],"u32b-2:1":[23.432,0.864],"u32b-2:2":[24.646,1.464],"u32b-2:3":[26.46,1.128],"u32b-2:4":[27.938,1.656],"u32c-1:0":[29.944,1.968],"u32c-1:1":[32.262,1.536],"u32c-1:2":[34.148,0.816],"u32c-1:3":[35.314,2.088],"u32c-1:4":[37.752,1.416],"u32c-2:0":[39.518,1.248],"u32c-2:1":[41.116,1.464],"u32c-2:2":[42.93,1.536],"u32c-2:3":[44.816,1.968],"u32c-2:4":[47.134,1.584]},"u33":{"u33a-1:0":[0,1.728],"u33a-1:1":[2.078,1.056],"u33a-1:2":[3.484,1.776],"u33a-1:3":[5.61,1.368],"u33a-1:4":[7.328,2.088],"u33a-2:0":[9.766,1.416],"u33a-2:1":[11.532,1.248],"u33a-2:2":[13.13,1.968],"u33a-2:3":[15.448,1.536],"u33a-2:4":[17.334,1.656],"u33b-1:0":[19.34,1.104],"u33b-1:1":[20.794,1.416],"u33b-1:2":[22.56,1.584],"u33b-1:3":[24.494,1.416],"u33b-1:4":[26.26,0.816],"u33b-2:0":[27.426,1.416],"u33b-2:1":[29.192,1.368],"u33b-2:2":[30.91,1.128],"u33b-2:3":[32.388,1.536],"u33b-2:4":[34.274,1.296]},"u34":{"u34a-1:0":[0,1.104],"u34a-1:1":[1.454,1.176],"u34a-1:2":[2.98,1.176],"u34a-1:3":[4.506,1.056],"u34a-1:4":[5.912,1.128],"u34a-2:0":[7.39,1.296],"u34a-2:1":[9.036,1.128],"u34a-2:2":[10.514,1.248],"u34a-2:3":[12.112,1.248],"u34a-2:4":[13.71,1.344],"u34b-1:0":[15.404,1.464],"u34b-1:1":[17.218,1.728],"u34b-1:2":[19.296,1.488],"u34b-1:3":[21.134,1.536],"u34b-1:4":[23.02,0.984],"u34b-2:0":[24.354,1.848],"u34b-2:1":[26.552,1.704],"u34b-2:2":[28.606,1.128],"u34b-2:3":[30.084,1.128],"u34b-2:4":[31.562,1.176],"u34c-1:0":[33.088,1.368],"u34c-1:1":[34.806,1.824],"u34c-1:2":[36.98,2.328],"u34c-1:3":[39.658,1.656],"u34c-1:4":[41.664,2.208],"u34c-2:0":[44.222,1.896],"u34c-2:1":[46.468,1.536],"u34c-2:2":[48.354,0.864],"u34c-2:3":[49.568,0.936],"u34c-2:4":[50.854,1.488]},"u35":{"u35a-1:0":[0,0.504],"u35a-1:1":[0.854,0.648],"u35a-1:2":[1.852,0.576],"u35a-1:3":[2.778,0.576],"u35a-1:4":[3.704,0.768],"u35a-2:0":[4.822,0.696],"u35a-2:1":[5.868,0.528],"u35a-2:2":[6.746,0.744],"u35a-2:3":[7.84,0.744],"u35a-2:4":[8.934,0.768],"u35b-1:0":[10.052,2.208],"u35b-1:1":[12.61,2.544],"u35b-1:2":[15.504,1.656],"u35b-1:3":[17.51,2.328],"u35b-1:4":[20.188,2.448],"u35b-2:0":[22.986,2.736],"u35b-2:1":[26.072,1.176],"u35b-2:2":[27.598,1.896],"u35b-2:3":[29.844,1.848],"u35b-2:4":[32.042,2.184],"u35c-1:0":[34.576,0.816],"u35c-1:1":[35.742,1.536],"u35c-1:2":[37.628,0.744],"u35c-1:3":[38.722,1.224],"u35c-1:4":[40.296,1.104],"u35c-2:0":[41.75,2.856],"u35c-2:1":[44.956,2.256],"u35c-2:2":[47.562,1.344],"u35c-2:3":[49.256,1.776],"u35c-2:4":[51.382,1.536]},"u36":{"u36a-1:0":[0,0.816],"u36a-1:1":[1.166,1.416],"u36a-1:2":[2.932,1.704],"u36a-1:3":[4.986,1.824],"u36a-1:4":[7.16,1.368],"u36a-2:0":[8.878,1.008],"u36a-2:1":[10.236,1.296],"u36a-2:2":[11.882,1.128],"u36a-2:3":[13.36,1.416],"u36a-2:4":[15.126,1.416],"u36b-1:0":[16.892,0.744],"u36b-1:1":[17.986,1.536],"u36b-1:2":[19.872,0.768],"u36b-1:3":[20.99,1.176],"u36b-1:4":[22.516,1.656],"u36b-2:0":[24.522,1.704],"u36b-2:1":[26.576,1.416],"u36b-2:2":[28.342,1.656],"u36b-2:3":[30.348,1.584],"u36b-2:4":[32.282,2.136],"u36c-1:0":[34.768,1.464],"u36c-1:1":[36.582,1.776],"u36c-1:2":[38.708,1.248],"u36c-1:3":[40.306,1.368],"u36c-1:4":[42.024,1.176],"u36c-2:0":[43.55,1.056],"u36c-2:1":[44.956,1.776],"u36c-2:2":[47.082,1.464],"u36c-2:3":[48.896,1.128],"u36c-2:4":[50.374,1.416]},"u37":{"u37a-1:0":[0,1.296],"u37a-1:1":[1.646,0.768],"u37a-1:2":[2.764,1.416],"u37a-1:3":[4.53,1.656],"u37a-1:4":[6.536,1.464],"u37a-2:0":[8.35,1.824],"u37a-2:1":[10.524,1.176],"u37a-2:2":[12.05,1.416],"u37a-2:3":[13.816,1.128],"u37a-2:4":[15.294,1.056],"u37b-1:0":[16.7,1.056],"u37b-1:1":[18.106,0.888],"u37b-1:2":[19.344,1.176],"u37b-1:3":[20.87,0.888],"u37b-1:4":[22.108,1.128],"u37b-2:0":[23.586,1.848],"u37b-2:1":[25.784,2.544],"u37b-2:2":[28.678,1.584],"u37b-2:3":[30.612,1.824],"u37b-2:4":[32.786,1.224],"u37c-1:0":[34.36,1.296],"u37c-1:1":[36.006,1.368],"u37c-1:2":[37.724,0.864],"u37c-1:3":[38.938,0.888],"u37c-1:4":[40.176,1.824],"u37c-2:0":[42.35,1.776],"u37c-2:1":[44.476,1.848],"u37c-2:2":[46.674,1.944],"u37c-2:3":[48.968,2.136],"u37c-2:4":[51.454,1.008]},"u40":{"u40a-1:0":[0,0.816],"u40a-1:1":[1.166,0.816],"u40a-1:2":[2.332,1.104],"u40a-1:3":[3.786,0.936],"u40a-1:4":[5.072,0.816],"u40a-2:0":[6.238,0.864],"u40a-2:1":[7.452,0.816],"u40a-2:2":[8.618,0.864],"u40a-2:3":[9.832,0.816],"u40a-2:4":[10.998,1.104],"u40b-1:0":[12.452,1.416],"u40b-1:1":[14.218,1.656],"u40b-1:2":[16.224,1.488],"u40b-1:3":[18.062,1.248],"u40b-1:4":[19.66,1.248],"u40b-2:0":[21.258,1.248],"u40b-2:1":[22.856,1.536],"u40b-2:2":[24.742,1.536],"u40b-2:3":[26.628,2.448],"u40b-2:4":[29.426,1.536]},"u38":{"u38a-1:0":[0,1.728],"u38a-1:1":[2.078,1.008],"u38a-1:2":[3.436,1.104],"u38a-1:3":[4.89,2.136],"u38a-1:4":[7.376,0.768],"u38a-2:0":[8.494,0.696],"u38a-2:1":[9.54,1.008],"u38a-2:2":[10.898,1.368],"u38a-2:3":[12.616,1.776],"u38a-2:4":[14.742,0.888],"u38b-1:0":[15.98,1.296],"u38b-1:1":[17.626,1.416],"u38b-1:2":[19.392,1.008],"u38b-1:3":[20.75,0.864],"u38b-1:4":[21.964,1.416],"u38b-2:0":[23.73,0.816],"u38b-2:1":[24.896,1.056],"u38b-2:2":[26.302,0.744],"u38b-2:3":[27.396,1.008],"u38b-2:4":[28.754,1.008],"u38c-1:0":[30.112,2.088],"u38c-1:1":[32.55,2.568],"u38c-1:2":[35.468,1.536],"u38c-1:3":[37.354,2.136],"u38c-1:4":[39.84,1.488],"u38c-2:0":[41.678,1.176],"u38c-2:1":[43.204,1.704],"u38c-2:2":[45.258,1.008],"u38c-2:3":[46.616,2.424],"u38c-2:4":[49.39,0.984]},"u39":{"u39a-1:0":[0,0.816],"u39a-1:1":[1.166,0.744],"u39a-1:2":[2.26,0.984],"u39a-1:3":[3.594,1.584],"u39a-1:4":[5.528,1.104],"u39a-2:0":[6.982,0.768],"u39a-2:1":[8.1,1.296],"u39a-2:2":[9.746,1.536],"u39a-2:3":[11.632,1.056],"u39a-2:4":[13.038,1.008],"u39b-1:0":[14.396,2.016],"u39b-1:1":[16.762,2.136],"u39b-1:2":[19.248,1.584],"u39b-1:3":[21.182,1.536],"u39b-1:4":[23.068,1.368],"u39b-2:0":[24.786,1.896],"u39b-2:1":[27.032,1.368],"u39b-2:2":[28.75,1.008],"u39b-2:3":[30.108,1.416],"u39b-2:4":[31.874,1.704]},"cv11":{"cv11:0":[0.0,2.544],"cv11:1":[2.894,2.736],"cv11:2":[5.98,2.016],"cv11:3":[8.346,2.208],"cv11:4":[10.904,2.928],"cv11:5o0":[14.182,1.536],"cv11:5o0-0":[16.068,1.176],"cv11:5o0-1":[17.594,1.536],"cv11:5o0-2":[19.48,1.464],"cv11:5o0-3":[21.294,1.656],"cv11:5o1":[23.3,1.896],"cv11:5o1-0":[25.546,2.016],"cv11:5o1-1":[27.912,2.904],"cv11:6":[31.166,1.008],"cv11:7":[32.524,3.384],"cv11:8":[36.258,3.624],"cv11:9":[40.232,0.816],"cv11:10":[41.398,2.016],"cv11:11":[43.764,1.848],"cv11:12":[45.962,3.696],"cv11:13":[50.008,2.304],"cv11:14":[52.662,1.896],"cv11:15":[54.908,1.296]},"cv12":{"cv12:0":[0.0,2.568],"cv12:1":[2.918,1.536],"cv12:3":[4.804,1.704],"cv12:4":[6.858,1.896],"cv12:5":[9.104,1.056],"cv12:6":[10.51,1.536],"cv12:7":[12.396,3.456],"cv12:9":[16.202,0.888],"cv12:10":[17.44,2.568],"cv12:11":[20.358,0.888],"cv12:12":[21.596,2.424],"cv12:13":[24.37,1.296],"cv12:14":[26.016,2.304],"cv12:15":[28.67,2.664],"cv12:16o0":[31.684,1.176],"cv12:16o1":[33.21,1.104],"cv12:16o1-0":[34.664,2.544],"cv12:16o1-1":[37.558,2.256],"cv12:17":[40.164,2.856],"cv12:18":[43.37,1.704],"cv12:19":[45.424,1.848],"cv12:20":[47.622,1.848]},"cv13":{"cv13:0":[0,2.784],"cv13:1":[3.134,1.968],"cv13:2":[5.452,1.656],"cv13:3":[7.458,2.136],"cv13:4":[9.944,2.424],"cv13:5":[12.718,2.136],"cv13:6":[15.204,1.536],"cv13:7":[17.09,1.968],"cv13:8":[19.408,1.656],"cv13:9o0":[21.414,1.488],"cv13:9o0-0":[23.252,1.296],"cv13:9o1":[24.898,1.608],"cv13:9o1-0":[26.856,1.464],"cv13:10":[28.67,1.416],"cv13:11":[30.436,1.584],"cv13:12":[32.37,1.656],"cv13:13":[34.376,2.136]},"cv14":{"cv14:0":[0,2.736],"cv14:1":[3.086,2.256],"cv14:2":[5.692,1.536],"cv14:3":[7.578,1.416],"cv14:4":[9.344,1.824],"cv14:5":[11.518,1.656],"cv14:6":[13.524,1.848],"cv14:7":[15.722,2.064],"cv14:8":[18.136,1.176],"cv14:9o0":[19.662,2.856],"cv14:9o1":[22.868,1.104],"cv14:9o1-0":[24.322,0.816],"cv14:9o1-1":[25.488,1.176],"cv14:10":[27.014,1.248],"cv14:11":[28.612,2.856],"cv14:12":[31.818,1.416],"cv14:13":[33.584,1.536],"cv14:14":[35.47,2.736],"cv14:15":[38.556,1.584]},"cv15":{"cv15:0":[0.0,3.024],"cv15:1":[3.374,2.496],"cv15:2o0":[6.22,4.056],"cv15:2o0-0":[10.626,1.416],"cv15:2o0-1":[12.392,2.328],"cv15:2o0-2":[15.07,1.656],"cv15:2o1":[17.076,1.704],"cv15:2o1-0":[19.13,1.008],"cv15:2o1-1":[20.488,3.528],"cv15:3":[24.366,3.384],"cv15:4":[28.1,1.584],"cv15:5":[30.034,2.904],"cv15:6":[33.288,1.056],"cv15:7":[34.694,1.776],"cv15:8":[36.82,4.344],"cv15:9":[41.514,1.608],"cv15:10":[43.472,1.848],"cv15:11":[45.67,1.608],"cv15:12":[47.628,2.736]},"me1":{"me1:name":[0,1.176],"me1:learn":[1.526,2.064],"me1:nice":[3.94,1.536],"me1:from-lt":[5.826,1.536],"me1:live-lt":[7.712,1.536],"me1:from-us":[9.598,2.496],"me1:live-us":[12.444,2.256],"me1:from-gb":[15.05,1.368],"me1:live-gb":[16.768,2.208],"me1:from-sc":[19.326,1.728],"me1:live-sc":[21.404,1.656],"me1:from-ie":[23.41,1.656],"me1:live-ie":[25.416,1.656],"me1:from-ca":[27.422,1.536],"me1:live-ca":[29.308,2.136],"me1:from-au":[31.794,1.896],"me1:live-au":[34.04,2.016],"me1:from-de":[36.406,1.536],"me1:live-de":[38.292,1.536],"me1:from-pl":[40.178,1.416],"me1:live-pl":[41.944,1.656],"me1:from-lv":[43.95,1.536],"me1:live-lv":[45.836,1.728],"me1:from-ua":[47.914,1.704],"me1:live-ua":[49.968,1.848],"me1:from-no":[52.166,2.088],"me1:live-no":[54.604,2.304],"me1:from-se":[57.258,1.368],"me1:live-se":[58.976,1.656],"me1:from-es":[60.982,1.536],"me1:live-es":[62.868,1.728],"me1:from-fr":[64.946,2.208],"me1:live-fr":[67.504,1.608],"me1:from-it":[69.462,1.584],"me1:live-it":[71.396,1.536],"me1:from-br":[73.282,1.536],"me1:live-br":[75.168,1.536],"me1:from-mx":[77.054,1.488],"me1:live-mx":[78.892,1.608],"me1:from-in":[80.85,1.296],"me1:live-in":[82.496,1.584],"me1:from-jp":[84.43,2.088],"me1:live-jp":[86.868,1.728],"me1:live-vilnius":[88.946,1.536],"me1:live-kaunas":[90.832,1.368],"me1:live-klaipeda":[92.55,1.464],"me1:live-london":[94.364,1.464],"me1:live-dublin":[96.178,1.704],"me1:live-berlin":[98.232,1.848],"me1:live-paris":[100.43,1.536],"me1:live-newyork":[102.316,1.848],"me1:live-chicago":[104.514,2.208],"me1:live-oslo":[107.072,1.464],"me1:job-teacher-m":[108.886,1.536],"me1:job-teacher-f":[110.772,1.416],"me1:job-student-m":[112.538,1.416],"me1:job-student-f":[114.304,1.464],"me1:job-doctor-m":[116.118,1.296],"me1:job-doctor-f":[117.764,2.136],"me1:job-nurse-m":[120.25,2.256],"me1:job-nurse-f":[122.856,1.416],"me1:job-engineer-m":[124.622,2.256],"me1:job-engineer-f":[127.228,1.776],"me1:job-programmer-m":[129.354,1.824],"me1:job-programmer-f":[131.528,2.256],"me1:job-driver-m":[134.134,1.536],"me1:job-driver-f":[136.02,1.536],"me1:job-cook-m":[137.906,1.104],"me1:job-cook-f":[139.36,2.064],"me1:job-builder-m":[141.774,1.584],"me1:job-builder-f":[143.708,1.704],"me1:job-seller-m":[145.762,1.416],"me1:job-seller-f":[147.528,2.256],"me1:job-accountant-m":[150.134,1.416],"me1:job-accountant-f":[151.9,1.344],"me1:job-manager-m":[153.594,1.536],"me1:job-manager-f":[155.48,1.608],"me1:job-mechanic-m":[157.438,1.536],"me1:job-mechanic-f":[159.324,1.416],"me1:job-farmer-m":[161.09,2.256],"me1:job-farmer-f":[163.696,1.536],"me1:job-artist-m":[165.582,1.536],"me1:job-artist-f":[167.468,1.776],"me1:job-home-m":[169.594,1.704],"me1:job-home-f":[171.648,2.424],"me1:job-retired-m":[174.422,1.536],"me1:job-retired-f":[176.308,1.416],"me1:job-unemployed-m":[178.074,2.184],"me1:job-unemployed-f":[180.608,1.488],"me1:work-office":[182.446,1.296],"me1:work-home":[184.092,1.536],"me1:work-hospital":[185.978,1.704],"me1:work-shop":[188.032,1.656],"me1:work-school":[190.038,1.536],"me1:work-factory":[191.924,1.536],"me1:work-warehouse":[193.81,1.536],"me1:work-restaurant":[195.696,1.584],"me1:work-bank":[197.63,1.344],"me1:work-farm":[199.324,2.184],"me1:work-university":[201.858,1.704],"me1:partner-married-m":[203.912,1.056],"me1:partner-married-f":[205.318,1.848],"me1:partner-single-m":[207.516,1.704],"me1:partner-single-f":[209.57,1.776],"me1:partner-wife":[211.696,1.536],"me1:partner-husband":[213.582,1.248],"me1:partner-gf":[215.18,1.416],"me1:partner-bf":[216.946,1.296],"me1:kids-none":[218.592,1.248],"me1:kids-son":[220.19,1.896],"me1:kids-daughter":[222.436,1.824],"me1:kids-sd":[224.61,2.136],"me1:kids-two":[227.096,2.256],"me1:kids-three":[229.702,1.536],"me1:kids-four":[231.588,2.064],"me1:sib-none":[234.002,2.064],"me1:sib-brother":[236.416,1.248],"me1:sib-sister":[238.014,1.704],"me1:sib-both":[240.068,2.376],"me1:sib-brothers":[242.794,2.256],"me1:sib-sisters":[245.4,1.968],"me1:pet-dog":[247.718,2.688],"me1:pet-cat":[250.756,1.128],"me1:pet-both":[252.234,1.896],"me1:why-family":[254.48,2.304],"me1:why-trip":[257.134,1.656],"me1:why-wife":[259.14,1.584],"me1:why-husband":[261.074,1.896],"me1:why-gf":[263.32,1.656],"me1:why-bf":[265.326,2.016],"me1:why-friends":[267.692,1.704],"me1:why-love":[269.746,1.728],"me1:why-languages":[271.824,1.848],"me1:like-read":[274.022,1.416],"me1:like-travel":[275.788,2.136],"me1:like-cook":[278.274,1.536],"me1:like-sport":[280.16,1.656],"me1:like-basketball":[282.166,2.736],"me1:like-football":[285.252,2.016],"me1:like-films":[287.618,1.824],"me1:like-music":[289.792,2.208],"me1:like-fish":[292.35,1.584],"me1:like-walk":[294.284,2.256],"me1:like-dance":[296.89,2.016],"me1:like-sing":[299.256,1.536],"me1:like-draw":[301.142,2.136],"me1:like-games":[303.628,2.544],"me1:like-garden":[306.522,1.776],"me1:like-swim":[308.648,1.584]},"me2":{"me2:u1d-1:0~n":[0.0,0.936],"me2:u3c-1:4~f":[1.286,1.416],"me2:u3d-2:1~f":[3.052,0.888],"me2:u15b-1:4~f":[4.29,2.256],"me2:u20a-2:4~f":[6.896,1.776],"me2:u35b-1:1~f":[9.022,2.256],"me2:cv1:22~n":[11.628,2.544],"me2:cv16:0~n":[14.522,2.376],"me2:cv16:24~n":[17.248,1.896],"me2:cv17:0~n":[19.494,3.048],"me2:cv17:1~n":[22.892,1.416],"me2:cv18:9~n":[24.658,0.744],"me2:cv2:1~n":[25.752,2.016],"me2:cv2:3~lt":[28.118,2.616],"me2:cv2:3~gb":[31.084,2.304],"me2:cv2:3~sc":[33.738,2.544],"me2:cv2:3~ie":[36.632,2.736],"me2:cv2:3~ca":[39.718,3.144],"me2:cv2:3~au":[43.212,2.328],"me2:cv2:3~de":[45.89,3.048],"me2:cv2:3~pl":[49.288,2.544],"me2:cv2:3~lv":[52.182,2.208],"me2:cv2:3~ua":[54.74,3.144],"me2:cv2:3~no":[58.234,2.544],"me2:cv2:3~se":[61.128,2.448],"me2:cv2:3~es":[63.926,2.424],"me2:cv2:3~fr":[66.7,2.928],"me2:cv2:3~it":[69.978,2.424],"me2:cv2:3~br":[72.752,2.496],"me2:cv2:3~mx":[75.598,3.096],"me2:cv2:3~in":[79.044,2.688],"me2:cv2:3~jp":[82.082,3.936],"me2:cv22:0~n":[86.368,2.904],"me2:cv22:4~f":[89.622,2.256],"me2:cv22:5~f":[92.228,1.776],"me2:cv22:13~n":[94.354,2.136],"me2:cv22:22o1~f":[96.84,2.304],"me2:cv22:24~n":[99.494,2.376],"me2:cv22:26~n":[102.22,2.856],"me2:cv3:10o0~f":[105.426,2.616],"me2:cv23:23o0~lt":[108.392,2.568],"me2:cv23:23o0~gb":[111.31,2.016],"me2:cv23:23o0~sc":[113.676,2.616],"me2:cv23:23o0~ie":[116.642,2.256],"me2:cv23:23o0~ca":[119.248,2.784],"me2:cv23:23o0~au":[122.382,3.024],"me2:cv23:23o0~de":[125.756,2.256],"me2:cv23:23o0~pl":[128.362,2.616],"me2:cv23:23o0~lv":[131.328,2.256],"me2:cv23:23o0~ua":[133.934,2.376],"me2:cv23:23o0~no":[136.66,2.808],"me2:cv23:23o0~se":[139.818,2.304],"me2:cv23:23o0~es":[142.472,2.544],"me2:cv23:23o0~fr":[145.366,2.376],"me2:cv23:23o0~it":[148.092,2.544],"me2:cv23:23o0~br":[150.986,2.568],"me2:cv23:23o0~mx":[153.904,2.088],"me2:cv23:23o0~in":[156.342,2.496],"me2:cv23:23o0~jp":[159.188,2.544],"me2:cv27:14o0~f":[162.082,1.656],"me2:cv27:14o1~f":[164.088,1.536],"me2:cv31:6~lt":[165.974,2.424],"me2:cv31:6~gb":[168.748,2.424],"me2:cv31:6~sc":[171.522,2.568],"me2:cv31:6~ie":[174.44,2.544],"me2:cv31:6~ca":[177.334,2.376],"me2:cv31:6~au":[180.06,3.024],"me2:cv31:6~de":[183.434,2.688],"me2:cv31:6~pl":[186.472,2.256],"me2:cv31:6~lv":[189.078,2.256],"me2:cv31:6~ua":[191.684,2.544],"me2:cv31:6~no":[194.578,2.808],"me2:cv31:6~se":[197.736,2.496],"me2:cv31:6~es":[200.582,2.544],"me2:cv31:6~fr":[203.476,2.736],"me2:cv31:6~it":[206.562,3.624],"me2:cv31:6~br":[210.536,2.496],"me2:cv31:6~mx":[213.382,2.616],"me2:cv31:6~in":[216.348,2.136],"me2:cv31:6~jp":[218.834,2.736],"me2:cv34:5~lt":[221.92,2.616],"me2:cv34:5~gb":[224.886,2.304],"me2:cv34:5~sc":[227.54,2.616],"me2:cv34:5~ie":[230.506,4.008],"me2:cv34:5~ca":[234.864,2.328],"me2:cv34:5~au":[237.542,2.856],"me2:cv34:5~de":[240.748,2.976],"me2:cv34:5~pl":[244.074,2.616],"me2:cv34:5~lv":[247.04,2.544],"me2:cv34:5~ua":[249.934,3.936],"me2:cv34:5~no":[254.22,3.408],"me2:cv34:5~se":[257.978,2.616],"me2:cv34:5~es":[260.944,2.544],"me2:cv34:5~fr":[263.838,3.144],"me2:cv34:5~it":[267.332,3.288],"me2:cv34:5~br":[270.97,2.688],"me2:cv34:5~mx":[274.008,3.096],"me2:cv34:5~in":[277.454,2.616],"me2:cv34:5~jp":[280.42,3.936],"me2:cv28:11~n":[284.706,0.936],"me2:cv8:4~n":[285.992,1.968],"me2:cv10:3~n":[288.31,2.376],"me2:cv10:3~nf":[291.036,1.896],"me2:cv10:7~f":[293.282,2.784],"me2:cv10:8o0~f":[296.416,1.776],"me2:cv10:10~n":[298.542,2.328],"me2:cv15:1~n":[301.22,1.656],"me2:cv15:2o0-2~n":[303.226,1.224],"me2:cv15:2o1-0~n":[304.8,0.648]},"cv16":{"cv16:0":[0.0,2.904],"cv16:1o0":[3.254,2.736],"cv16:1o0-0":[6.34,1.416],"cv16:1o1":[8.106,2.016],"cv16:1o1-0":[10.472,1.728],"cv16:1o2":[12.55,1.896],"cv16:1o2-0":[14.796,1.488],"cv16:2":[16.634,1.008],"cv16:3":[17.992,2.664],"cv16:4":[21.006,2.136],"cv16:5":[23.492,1.944],"cv16:6":[25.786,1.656],"cv16:7":[27.792,2.376],"cv16:8":[30.518,1.296],"cv16:9":[32.164,1.536],"cv16:10":[34.05,1.584],"cv16:11":[35.984,1.704],"cv16:12":[38.038,2.256],"cv16:13":[40.644,2.304],"cv16:15":[43.298,2.808],"cv16:16":[46.456,1.416],"cv16:17":[48.222,1.536],"cv16:18":[50.108,0.888],"cv16:19":[51.346,2.184],"cv16:20":[53.88,2.424],"cv16:21":[56.654,2.256],"cv16:22":[59.26,2.208],"cv16:23":[61.818,1.008],"cv16:24":[63.176,2.256],"cv16:25":[65.782,1.728]},"cv17":{"cv17:0":[0.0,3.576],"cv17:1":[3.926,1.848],"cv17:2":[6.124,3.024],"cv17:3":[9.498,2.568],"cv17:4":[12.416,3.144],"cv17:5":[15.91,1.656],"cv17:6":[17.916,2.976],"cv17:7":[21.242,2.976],"cv17:8":[24.568,1.776],"cv17:9":[26.694,1.944],"cv17:10":[28.988,1.296],"cv17:11o0":[30.634,1.416],"cv17:11o0-0":[32.4,1.176],"cv17:11o1":[33.926,1.416],"cv17:11o1-0":[35.692,2.568],"cv17:12":[38.61,4.248],"cv17:13":[43.208,1.656],"cv17:14":[45.214,1.968],"cv17:15":[47.532,2.784],"cv17:17":[50.666,2.544],"cv17:18":[53.56,1.536],"cv17:19":[55.446,2.568],"cv17:20":[58.364,1.128],"cv17:21":[59.842,2.136],"cv17:22":[62.328,2.664],"cv17:23":[65.342,2.544],"cv17:24":[68.236,2.544]},"cv18":{"cv18:0":[0.0,2.136],"cv18:1":[2.486,2.568],"cv18:2":[5.404,3.504],"cv18:3":[9.258,2.616],"cv18:4":[12.224,1.344],"cv18:5":[13.918,1.536],"cv18:6":[15.804,2.568],"cv18:7o0":[18.722,1.704],"cv18:7o0-0":[20.776,2.016],"cv18:7o1":[23.142,1.656],"cv18:7o1-0":[25.148,2.304],"cv18:9":[27.802,1.296],"cv18:10":[29.448,1.968],"cv18:11":[31.766,2.136],"cv18:12":[34.252,2.184],"cv18:13":[36.786,2.208],"cv18:14":[39.344,1.128],"cv18:15":[40.822,1.128],"cv18:16":[42.3,2.784],"cv18:17":[45.434,1.536],"cv18:18":[47.32,1.224]},"cv19":{"cv19:1":[0.0,1.368],"cv19:2":[1.718,1.656],"cv19:3":[3.724,1.656],"cv19:4":[5.73,1.296],"cv19:6":[7.376,1.008],"cv19:7":[8.734,1.104],"cv19:8":[10.188,1.008],"cv19:9":[11.546,2.856],"cv19:10":[14.752,2.064],"cv19:11":[17.166,3.144],"cv19:12o0":[20.66,2.928],"cv19:12o0-0":[23.938,2.976],"cv19:12o1":[27.264,3.144],"cv19:12o1-0":[30.758,1.536],"cv19:13":[32.644,1.248],"cv19:14":[34.242,1.416],"cv19:15":[36.008,4.608],"cv19:16":[40.966,2.856],"cv19:17":[44.172,2.304],"cv19:18":[46.826,1.896],"cv19:19":[49.072,3.096],"cv19:20":[52.518,2.424],"cv19:21":[55.292,1.704],"cv19:22":[57.346,2.016]},"cv20":{"cv20:0":[0.0,2.376],"cv20:1":[2.726,2.688],"cv20:2":[5.764,2.376],"cv20:3":[8.49,1.704],"cv20:4":[10.544,2.976],"cv20:5":[13.87,1.056],"cv20:6":[15.276,3.624],"cv20:7":[19.25,1.848],"cv20:8":[21.448,2.328],"cv20:9":[24.126,2.064],"cv20:10":[26.54,2.616],"cv20:12":[29.506,2.976],"cv20:13":[32.832,2.016],"cv20:14":[35.198,1.224],"cv20:15":[36.772,2.568],"cv20:16o0":[39.69,1.536],"cv20:16o0-0":[41.576,2.016],"cv20:16o1":[43.942,1.536],"cv20:16o1-0":[45.828,2.208],"cv20:17":[48.386,2.544],"cv20:18":[51.28,2.376]},"cv21":{"cv21:0":[0.0,2.544],"cv21:1":[2.894,1.704],"cv21:2":[4.948,1.536],"cv21:3":[6.834,1.896],"cv21:4":[9.08,0.984],"cv21:5":[10.414,2.448],"cv21:6":[13.212,2.136],"cv21:7o0":[15.698,1.056],"cv21:7o0-0":[17.104,2.256],"cv21:7o1":[19.71,1.296],"cv21:7o1-0":[21.356,2.496],"cv21:8":[24.202,2.424],"cv21:9":[26.976,2.496],"cv21:10":[29.822,1.464],"cv21:11":[31.636,2.688],"cv21:13":[34.674,1.704],"cv21:14":[36.728,2.256],"cv21:15":[39.334,1.848],"cv21:16":[41.532,2.568],"cv21:17":[44.45,2.424],"cv21:18":[47.224,1.368]},"cv22":{"cv22:0":[0.0,3.144],"cv22:1":[3.494,1.848],"cv22:2":[5.692,2.328],"cv22:3":[8.37,2.904],"cv22:4":[11.624,2.616],"cv22:5":[14.59,1.776],"cv22:6":[16.716,2.184],"cv22:7o0":[19.25,2.856],"cv22:7o0-0":[22.456,1.824],"cv22:7o1":[24.63,2.616],"cv22:7o1-0":[27.596,1.368],"cv22:8":[29.314,2.304],"cv22:9o0":[31.968,1.296],"cv22:9o0-0":[33.614,1.896],"cv22:9o0-1":[35.86,1.008],"cv22:9o1":[37.218,1.008],"cv22:9o1-0":[38.576,2.856],"cv22:9o1-1":[41.782,1.056],"cv22:11":[43.188,4.704],"cv22:12":[48.242,1.944],"cv22:13":[50.536,1.656],"cv22:14o0":[52.542,1.728],"cv22:14o0-0":[54.62,2.424],"cv22:14o1":[57.394,2.448],"cv22:14o1-0":[60.192,2.016],"cv22:15":[62.558,1.176],"cv22:16":[64.084,2.568],"cv22:17":[67.002,1.416],"cv22:19":[68.768,1.296],"cv22:20":[70.414,1.488],"cv22:21":[72.252,2.304],"cv22:22o0":[74.906,1.248],"cv22:22o0-0":[76.504,0.768],"cv22:22o1":[77.622,2.328],"cv22:22o1-0":[80.3,1.464],"cv22:24":[82.114,3.048],"cv22:25":[85.512,1.296],"cv22:26":[87.158,2.904],"cv22:27":[90.412,2.016]},"cv23":{"cv23:0":[0.0,2.616],"cv23:1":[2.966,3.144],"cv23:2":[6.46,2.736],"cv23:3":[9.546,1.968],"cv23:4":[11.864,1.536],"cv23:5":[13.75,1.896],"cv23:6":[15.996,1.176],"cv23:7":[17.522,1.704],"cv23:8":[19.576,1.224],"cv23:9":[21.15,2.496],"cv23:10":[23.996,0.936],"cv23:11":[25.282,1.008],"cv23:13":[26.64,2.088],"cv23:14":[29.078,3.096],"cv23:15":[32.524,1.728],"cv23:16":[34.602,1.104],"cv23:17":[36.056,0.984],"cv23:18":[37.39,1.104],"cv23:19":[38.844,1.488],"cv23:20":[40.682,1.896],"cv23:22":[42.928,1.248],"cv23:23o0":[44.526,2.928],"cv23:23o0-0":[47.804,1.704],"cv23:23o1":[49.858,2.496],"cv23:23o1-0":[52.704,3.048],"cv23:24":[56.102,1.224],"cv23:25":[57.676,2.544],"cv23:26":[60.57,2.256],"cv23:27":[63.176,1.176],"cv23:28":[64.702,2.544],"cv23:29":[67.596,1.848]},"cv24":{"cv24:0":[0,2.424],"cv24:1":[2.774,2.376],"cv24:2":[5.5,3.024],"cv24:3":[8.874,1.536],"cv24:4":[10.76,1.536],"cv24:5o0":[12.646,0.768],"cv24:5o0-0":[13.764,2.016],"cv24:5o1":[16.13,0.816],"cv24:5o1-0":[17.296,2.136],"cv24:6":[19.782,2.304],"cv24:7":[22.436,2.808],"cv24:8":[25.594,4.176],"cv24:9":[30.12,5.664],"cv24:10":[36.134,2.376],"cv24:11":[38.86,2.664],"cv24:12":[41.874,1.464],"cv24:13":[43.688,3.576],"cv24:14":[47.614,2.424]},"cv25":{"cv25:0":[0.0,1.728],"cv25:1":[2.078,0.696],"cv25:2":[3.124,1.776],"cv25:3":[5.25,1.464],"cv25:4":[7.064,4.344],"cv25:5":[11.758,0.864],"cv25:6":[12.972,1.296],"cv25:7":[14.618,1.176],"cv25:8":[16.144,2.928],"cv25:9":[19.422,2.904],"cv25:10o0":[22.676,2.208],"cv25:10o0-0":[25.234,0.744],"cv25:10o0-1":[26.328,0.936],"cv25:10o1":[27.614,1.536],"cv25:10o1-0":[29.5,0.864],"cv25:10o1-1":[30.714,1.368],"cv25:10o2":[32.432,1.008],"cv25:10o2-0":[33.79,0.696],"cv25:11":[34.836,1.248],"cv25:12o0":[36.434,1.824],"cv25:12o0-0":[38.608,0.816],"cv25:12o1":[39.774,1.656],"cv25:12o1-0":[41.78,1.656],"cv25:12o2":[43.786,1.056],"cv25:12o2-0":[45.192,1.296],"cv25:13":[46.838,2.208],"cv25:14":[49.396,1.176],"cv25:15":[50.922,2.016],"cv25:16":[53.288,1.128]},"cv26":{"cv26:0":[0.0,2.304],"cv26:1":[2.654,1.368],"cv26:2":[4.372,2.784],"cv26:3":[7.506,1.464],"cv26:4":[9.32,1.416],"cv26:5":[11.086,1.776],"cv26:6":[13.212,3.384],"cv26:7":[16.946,1.968],"cv26:8":[19.264,2.184],"cv26:9":[21.798,2.256],"cv26:10o0":[24.404,1.368],"cv26:10o0-0":[26.122,2.496],"cv26:10o0-1":[28.968,2.184],"cv26:10o1":[31.502,1.536],"cv26:10o1-0":[33.388,0.888],"cv26:11":[34.626,1.416],"cv26:12":[36.392,1.896],"cv26:14":[38.638,3.216],"cv26:15":[42.204,2.544]},"cv27":{"cv27:0":[0.0,3.624],"cv27:1":[3.974,2.304],"cv27:2":[6.628,2.688],"cv27:3":[9.666,2.976],"cv27:4":[12.992,5.496],"cv27:5":[18.838,1.368],"cv27:6":[20.556,0.288],"cv27:7":[21.194,1.368],"cv27:8o0":[22.912,2.976],"cv27:8o0-0":[26.238,2.688],"cv27:8o1":[29.276,2.568],"cv27:8o1-0":[32.194,1.416],"cv27:9":[33.96,2.424],"cv27:10":[36.734,2.688],"cv27:11":[39.772,2.544],"cv27:12":[42.666,1.248],"cv27:13":[44.264,2.496],"cv27:14o0":[47.11,1.488],"cv27:14o0-0":[48.948,1.128],"cv27:14o1":[50.426,1.536],"cv27:14o1-0":[52.312,1.704],"cv27:16":[54.366,1.704],"cv27:17":[56.42,1.896],"cv27:18":[58.666,1.968]},"cv28":{"cv28:0":[0.0,3.336],"cv28:1o0":[3.686,1.536],"cv28:1o0-0":[5.572,2.424],"cv28:1o1":[8.346,3.144],"cv28:1o1-0":[11.84,1.008],"cv28:1o1-1":[13.198,1.536],"cv28:1o1-2":[15.084,2.664],"cv28:2":[18.098,4.416],"cv28:3o0":[22.864,2.064],"cv28:3o0-0":[25.278,1.656],"cv28:3o1":[27.284,1.944],"cv28:3o1-0":[29.578,2.856],"cv28:4":[32.784,1.704],"cv28:5":[34.838,2.856],"cv28:7":[38.044,2.256],"cv28:8o0":[40.65,1.704],"cv28:8o0-0":[42.704,0.936],"cv28:8o1":[43.99,2.784],"cv28:8o1-0":[47.124,2.328],"cv28:9":[49.802,2.976],"cv28:10":[53.128,1.824],"cv28:11":[55.302,1.536],"cv28:12":[57.188,2.256]},"cv29":{"cv29:0":[0.0,2.904],"cv29:1":[3.254,1.416],"cv29:2":[5.02,3.096],"cv29:3":[8.466,2.304],"cv29:4":[11.12,2.784],"cv29:5o0":[14.254,1.008],"cv29:5o0-0":[15.612,0.696],"cv29:5o1":[16.658,1.848],"cv29:5o1-0":[18.856,2.424],"cv29:6":[21.63,1.344],"cv29:7":[23.324,1.896],"cv29:8":[25.57,4.296],"cv29:9":[30.216,1.656],"cv29:10":[32.222,3.288],"cv29:11":[35.86,2.424]},"cv30":{"cv30:0":[0.0,2.856],"cv30:1":[3.206,2.256],"cv30:2":[5.812,1.104],"cv30:3o0":[7.266,1.296],"cv30:3o0-0":[8.912,1.704],"cv30:3o0-1":[10.966,3.624],"cv30:3o1":[14.94,2.088],"cv30:3o1-0":[17.378,1.536],"cv30:3o1-1":[19.264,0.984],"cv30:4":[20.598,2.784],"cv30:5":[23.732,1.248],"cv30:6":[25.33,2.784],"cv30:7":[28.464,0.936],"cv30:8o0":[29.75,1.296],"cv30:8o0-0":[31.396,2.376],"cv30:8o1":[34.122,1.536],"cv30:8o1-0":[36.008,2.136],"cv30:9":[38.494,2.256],"cv30:10":[41.1,2.136]},"cv31":{"cv31:0":[0.0,3.216],"cv31:1":[3.566,4.008],"cv31:2":[7.924,1.368],"cv31:3":[9.642,1.464],"cv31:4":[11.456,3.216],"cv31:5":[15.022,4.176],"cv31:6":[19.548,2.928],"cv31:7":[22.826,2.928],"cv31:8":[26.104,1.128],"cv31:9":[27.582,2.424],"cv31:10":[30.356,2.424],"cv31:11":[33.13,3.576],"cv31:12o0":[37.056,1.656],"cv31:12o0-0":[39.062,2.808],"cv31:12o1":[42.22,1.896],"cv31:12o1-0":[44.466,1.824],"cv31:13":[46.64,2.016]},"cv32":{"cv32:0":[0.0,2.376],"cv32:1":[2.726,2.616],"cv32:2":[5.692,1.296],"cv32:3":[7.338,3.528],"cv32:4":[11.216,1.296],"cv32:5o0":[12.862,2.136],"cv32:5o0-0":[15.348,1.344],"cv32:5o1":[17.042,1.704],"cv32:5o1-0":[19.096,0.528],"cv32:6":[19.974,2.664],"cv32:7":[22.988,1.488],"cv32:8":[24.826,2.136],"cv32:9":[27.312,1.728],"cv32:10":[29.39,2.304],"cv32:11":[32.044,2.184],"cv32:13":[34.578,0.888],"cv32:14":[35.816,2.736]},"cv33":{"cv33:0":[0.0,2.544],"cv33:1":[2.894,1.296],"cv33:2":[4.54,1.896],"cv33:3":[6.786,1.296],"cv33:4":[8.432,1.248],"cv33:5":[10.03,1.968],"cv33:6":[12.348,3.264],"cv33:7":[15.962,1.008],"cv33:8":[17.32,2.496],"cv33:9":[20.166,1.536],"cv33:10":[22.052,1.176],"cv33:11":[23.578,1.056],"cv33:12":[24.984,1.008],"cv33:13":[26.342,2.544]},"cv34":{"cv34:0":[0.0,4.368],"cv34:1":[4.718,3.048],"cv34:2":[8.116,2.904],"cv34:3":[11.37,1.968],"cv34:4":[13.688,3.216],"cv34:5":[17.254,3.336],"cv34:6":[20.94,2.976],"cv34:7":[24.266,1.296],"cv34:8":[25.912,1.176],"cv34:9":[27.438,1.368],"cv34:10":[29.156,5.616],"cv34:11":[35.122,3.408],"cv34:12":[38.88,2.808],"cv34:13":[42.038,2.928],"cv34:14":[45.316,1.416],"cv34:15":[47.082,5.664],"cv34:16":[53.096,3.216],"cv34:17":[56.662,2.736]},"u42":{"u42a-1:0":[0,0.888],"u42a-1:1":[1.238,1.104],"u42a-1:2":[2.692,1.008],"u42a-1:3":[4.05,1.224],"u42a-1:4":[5.624,0.864],"u42a-2:0":[6.838,1.104],"u42a-2:1":[8.292,0.576],"u42a-2:2":[9.218,0.864],"u42a-2:3":[10.432,1.296],"u42a-2:4":[12.078,0.984],"u42b-1:0":[13.412,1.296],"u42b-1:1":[15.058,1.056],"u42b-1:2":[16.464,1.368],"u42b-1:3":[18.182,1.344],"u42b-1:4":[19.876,1.008],"u42b-2:0":[21.234,0.936],"u42b-2:1":[22.52,1.128],"u42b-2:2":[23.998,1.248],"u42b-2:3":[25.596,1.128],"u42b-2:4":[27.074,0.816],"u42c-1:0":[28.24,0.768],"u42c-1:1":[29.358,1.056],"u42c-1:2":[30.764,0.888],"u42c-1:3":[32.002,0.888],"u42c-1:4":[33.24,1.368],"u42c-2:0":[34.958,0.696],"u42c-2:1":[36.004,0.816],"u42c-2:2":[37.17,1.008],"u42c-2:3":[38.528,1.128],"u42c-2:4":[40.006,1.704]}},"leonas":{"u1":{"u1a-1:0":[0,1.464],"u1a-1:1":[1.814,0.744],"u1a-1:2":[2.908,1.128],"u1a-1:3":[4.386,1.224],"u1a-1:4":[5.96,1.488],"u1a-2:0":[7.798,1.176],"u1a-2:1":[9.324,1.296],"u1a-2:2":[10.97,1.056],"u1a-2:3":[12.376,1.176],"u1a-2:4":[13.902,1.296],"u1b-1:0":[15.548,0.888],"u1b-1:1":[16.786,0.336],"u1b-1:2":[17.472,1.296],"u1b-1:3":[19.118,1.248],"u1b-1:4":[20.716,1.704],"u1b-2:0":[22.77,1.416],"u1b-2:1":[24.536,1.296],"u1b-2:2":[26.182,2.448],"u1b-2:3":[28.98,1.944],"u1b-2:4":[31.274,1.224],"u1c-1:0":[32.848,1.104],"u1c-1:1":[34.302,0.888],"u1c-1:2":[35.54,0.864],"u1c-1:3":[36.754,1.008],"u1c-1:4":[38.112,0.936],"u1d-1:0":[39.398,1.704],"u1d-1:1":[41.452,2.016],"u1d-1:2":[43.818,1.656],"u1d-1:3":[45.824,1.608],"u1d-1:4":[47.782,1.704],"u1c-2:0":[49.836,1.104],"u1c-2:1":[51.29,1.056],"u1c-2:2":[52.696,1.344],"u1c-2:3":[54.39,1.656],"u1c-2:4":[56.396,2.064],"u1c-3:0":[58.81,2.088]},"u2":{"u2a-1:0":[0,1.344],"u2a-1:1":[1.694,0.768],"u2a-1:2":[2.812,1.488],"u2a-1:3":[4.65,1.056],"u2a-1:4":[6.056,0.936],"u2a-2:0":[7.342,1.008],"u2a-2:1":[8.7,1.656],"u2a-2:2":[10.706,1.176],"u2a-2:3":[12.232,1.536],"u2a-2:4":[14.118,1.224],"u2b-1:0":[15.692,1.248],"u2b-1:1":[17.29,1.296],"u2b-1:2":[18.936,1.248],"u2b-1:3":[20.534,1.536],"u2b-1:4":[22.42,1.824],"u2b-2:0":[24.594,1.344],"u2b-2:1":[26.288,1.416],"u2b-2:2":[28.054,1.608],"u2b-2:3":[30.012,1.416],"u2b-2:4":[31.778,1.704],"u2c-1:0":[33.832,1.224],"u2c-1:1":[35.406,1.488],"u2c-1:2":[37.244,1.536],"u2c-1:3":[39.13,1.488],"u2c-1:4":[40.968,1.896],"u2c-2:0":[43.214,1.656],"u2c-2:1":[45.22,1.704],"u2c-2:2":[47.274,1.248],"u2c-2:3":[48.872,1.536],"u2c-2:4":[50.758,1.728]},"u3":{"u3a-1:0":[0,1.536],"u3a-1:1":[1.886,1.464],"u3a-1:2":[3.7,1.344],"u3a-1:3":[5.394,1.008],"u3a-1:4":[6.752,1.416],"u3a-2:0":[8.518,1.128],"u3a-2:1":[9.996,1.344],"u3a-2:2":[11.69,1.416],"u3a-2:3":[13.456,1.344],"u3a-2:4":[15.15,1.608],"u3b-1:0":[17.108,1.584],"u3b-1:1":[19.042,1.056],"u3b-1:2":[20.448,1.416],"u3b-1:3":[22.214,2.088],"u3b-1:4":[24.652,1.104],"u3b-2:0":[26.106,1.128],"u3b-2:1":[27.584,1.008],"u3b-2:2":[28.942,1.224],"u3b-2:3":[30.516,1.248],"u3b-2:4":[32.114,1.176],"u3c-1:0":[33.64,2.064],"u3c-1:1":[36.054,1.536],"u3c-1:2":[37.94,2.016],"u3c-1:3":[40.306,0.768],"u3c-1:4":[41.424,1.584],"u3c-2:0":[43.358,2.616],"u3c-2:1":[46.324,1.536],"u3c-2:2":[48.21,1.368],"u3c-2:3":[49.928,1.248],"u3c-2:4":[51.526,1.464],"u3d-1:0":[53.34,1.536],"u3d-1:1":[55.226,1.704],"u3d-1:2":[57.28,1.848],"u3d-1:3":[59.478,2.016],"u3d-1:4":[61.844,1.608],"u3d-2:0":[63.802,2.256],"u3d-2:1":[66.408,1.464],"u3d-2:2":[68.222,2.088],"u3d-2:3":[70.66,1.704],"u3d-2:4":[72.714,1.536]},"u4":{"u4a-1:0":[0,1.008],"u4a-1:1":[1.358,1.128],"u4a-1:2":[2.836,1.416],"u4a-1:3":[4.602,1.248],"u4a-1:4":[6.2,1.656],"u4a-2:0":[8.206,0.984],"u4a-2:1":[9.54,1.584],"u4a-2:2":[11.474,1.488],"u4a-2:3":[13.312,1.608],"u4a-2:4":[15.27,1.536],"u4b-1:0":[17.156,1.536],"u4b-1:1":[19.042,1.296],"u4b-1:2":[20.688,1.056],"u4b-1:3":[22.094,1.296],"u4b-1:4":[23.74,1.464],"u4b-2:0":[25.554,1.704],"u4b-2:1":[27.608,1.416],"u4b-2:2":[29.374,1.176],"u4b-2:3":[30.9,1.464],"u4b-2:4":[32.714,2.088]},"u5":{"u5a-1:0":[0,1.536],"u5a-1:1":[1.886,1.176],"u5a-1:2":[3.412,1.296],"u5a-1:3":[5.058,1.608],"u5a-1:4":[7.016,1.464],"u5a-2:0":[8.83,1.344],"u5a-2:1":[10.524,1.248],"u5a-2:2":[12.122,1.296],"u5a-2:3":[13.768,1.224],"u5a-2:4":[15.342,2.016],"u5b-1:0":[17.708,1.224],"u5b-1:1":[19.282,1.344],"u5b-1:2":[20.976,1.008],"u5b-1:3":[22.334,1.536],"u5b-1:4":[24.22,1.224],"u5b-2:0":[25.794,1.536],"u5b-2:1":[27.68,1.224],"u5b-2:2":[29.254,2.088],"u5b-2:3":[31.692,1.704],"u5b-2:4":[33.746,1.728]},"u6":{"u6a-1:0":[0,1.176],"u6a-1:1":[1.526,1.104],"u6a-1:2":[2.98,1.128],"u6a-1:3":[4.458,1.344],"u6a-1:4":[6.152,1.128],"u6a-2:0":[7.63,1.056],"u6a-2:1":[9.036,1.584],"u6a-2:2":[10.97,1.056],"u6a-2:3":[12.376,1.296],"u6a-2:4":[14.022,1.248],"u6b-1:0":[15.62,1.296],"u6b-1:1":[17.266,1.296],"u6b-1:2":[18.912,1.584],"u6b-1:3":[20.846,1.368],"u6b-1:4":[22.564,1.248],"u6b-2:0":[24.162,1.488],"u6b-2:1":[26,1.368],"u6b-2:2":[27.718,1.344],"u6b-2:3":[29.412,2.256],"u6b-2:4":[32.018,1.656]},"u7":{"u7a-1:0":[0,1.584],"u7a-1:1":[1.934,1.488],"u7a-1:2":[3.772,1.704],"u7a-1:3":[5.826,1.536],"u7a-1:4":[7.712,1.344],"u7a-2:0":[9.406,1.728],"u7a-2:1":[11.484,1.824],"u7a-2:2":[13.658,1.368],"u7a-2:3":[15.376,1.464],"u7a-2:4":[17.19,1.104],"u7b-1:0":[18.644,1.008],"u7b-1:1":[20.002,1.056],"u7b-1:2":[21.408,1.344],"u7b-1:3":[23.102,1.224],"u7b-1:4":[24.676,1.128],"u7b-2:0":[26.154,1.704],"u7b-2:1":[28.208,1.056],"u7b-2:2":[29.614,1.056],"u7b-2:3":[31.02,1.464],"u7b-2:4":[32.834,1.368],"u7c-1:0":[34.552,1.536],"u7c-1:1":[36.438,1.368],"u7c-1:2":[38.156,1.056],"u7c-1:3":[39.562,1.416],"u7c-1:4":[41.328,1.536],"u7c-2:0":[43.214,1.296],"u7c-2:1":[44.86,1.056],"u7c-2:2":[46.266,1.104],"u7c-2:3":[47.72,1.104],"u7c-2:4":[49.174,1.296]},"u8":{"u8b-1:0":[0,1.224],"u8b-1:1":[1.574,1.224],"u8b-1:2":[3.148,1.416],"u8b-1:3":[4.914,1.776],"u8b-1:4":[7.04,1.248],"u8b-2:0":[8.638,1.416],"u8b-2:1":[10.404,1.104],"u8b-2:2":[11.858,1.296],"u8b-2:3":[13.504,1.296],"u8b-2:4":[15.15,1.296],"u8c-1:0":[16.796,1.848],"u8c-1:1":[18.994,1.896],"u8c-1:2":[21.24,1.488],"u8c-1:3":[23.078,1.296],"u8c-1:4":[24.724,1.944],"u8c-2:0":[27.018,2.568],"u8c-2:1":[29.936,1.296],"u8c-2:2":[31.582,1.656],"u8c-2:3":[33.588,2.184],"u8c-2:4":[36.122,1.536],"u8a-1:0":[38.008,1.056],"u8a-1:1":[39.414,1.056],"u8a-1:2":[40.82,1.728],"u8a-1:3":[42.898,1.128],"u8a-1:4":[44.376,1.344],"u8a-2:0":[46.07,1.224],"u8a-2:1":[47.644,1.944],"u8a-2:2":[49.938,1.536],"u8a-2:3":[51.824,1.656],"u8a-2:4":[53.83,1.488]},"u9":{"u9a-1:0":[0,1.176],"u9a-1:1":[1.526,1.128],"u9a-1:2":[3.004,1.128],"u9a-1:3":[4.482,1.224],"u9a-1:4":[6.056,1.224],"u9a-2:0":[7.63,1.296],"u9a-2:1":[9.276,1.464],"u9a-2:2":[11.09,1.464],"u9a-2:3":[12.904,1.416],"u9a-2:4":[14.67,1.128],"u9b-1:0":[16.148,1.584],"u9b-1:1":[18.082,1.056],"u9b-1:2":[19.488,1.536],"u9b-1:3":[21.374,1.584],"u9b-1:4":[23.308,0.288],"u9b-2:0":[23.946,1.104],"u9b-2:1":[25.4,1.296],"u9b-2:2":[27.046,1.056],"u9b-2:3":[28.452,1.464],"u9b-2:4":[30.266,1.584]},"u10":{"u10a-1:0":[0,1.464],"u10a-1:1":[1.814,1.248],"u10a-1:2":[3.412,1.704],"u10a-1:3":[5.466,1.536],"u10a-1:4":[7.352,1.464],"u10a-2:0":[9.166,1.824],"u10a-2:1":[11.34,1.464],"u10a-2:2":[13.154,1.056],"u10a-2:3":[14.56,1.464],"u10a-2:4":[16.374,1.488],"u10b-1:0":[18.212,1.344],"u10b-1:1":[19.906,1.248],"u10b-1:2":[21.504,1.416],"u10b-1:3":[23.27,1.488],"u10b-1:4":[25.108,1.344],"u10b-2:0":[26.802,1.488],"u10b-2:1":[28.64,1.104],"u10b-2:2":[30.094,1.104],"u10b-2:3":[31.548,1.008],"u10b-2:4":[32.906,1.368]},"u11":{"u11a-1:0":[0,1.464],"u11a-1:1":[1.814,1.464],"u11a-1:2":[3.628,1.344],"u11a-1:3":[5.322,1.344],"u11a-1:4":[7.016,1.416],"u11a-2:0":[8.782,1.176],"u11a-2:1":[10.308,1.224],"u11a-2:2":[11.882,1.416],"u11a-2:3":[13.648,1.008],"u11a-2:4":[15.006,1.536],"u11b-1:0":[16.892,1.296],"u11b-1:1":[18.538,1.464],"u11b-1:2":[20.352,1.176],"u11b-1:3":[21.878,1.848],"u11b-1:4":[24.076,1.416],"u11b-2:0":[25.842,1.488],"u11b-2:1":[27.68,1.248],"u11b-2:2":[29.278,1.536],"u11b-2:3":[31.164,1.488],"u11b-2:4":[33.002,1.656]},"u12":{"u12b-1:0":[0,1.248],"u12b-1:1":[1.598,2.016],"u12b-1:2":[3.964,2.376],"u12b-1:3":[6.69,1.344],"u12b-1:4":[8.384,1.704],"u12b-2:0":[10.438,2.016],"u12b-2:1":[12.804,1.536],"u12b-2:2":[14.69,1.488],"u12b-2:3":[16.528,1.728],"u12b-2:4":[18.606,2.256],"u12a-1:0":[21.212,1.224],"u12a-1:1":[22.786,1.536],"u12a-1:2":[24.672,2.088],"u12a-1:3":[27.11,1.056],"u12a-1:4":[28.516,1.224],"u12a-2:0":[30.09,1.536],"u12a-2:1":[31.976,1.008],"u12a-2:2":[33.334,1.704],"u12a-2:3":[35.388,2.016],"u12a-2:4":[37.754,2.304]},"u13":{"u13a-1:0":[0,1.224],"u13a-1:1":[1.574,1.008],"u13a-1:2":[2.932,1.224],"u13a-1:3":[4.506,1.104],"u13a-1:4":[5.96,1.416],"u13a-2:0":[7.726,1.536],"u13a-2:1":[9.612,1.824],"u13a-2:2":[11.786,1.704],"u13a-2:3":[13.84,1.728],"u13a-2:4":[15.918,1.176],"u13b-1:0":[17.444,1.584],"u13b-1:1":[19.378,2.184],"u13b-1:2":[21.912,1.224],"u13b-1:3":[23.486,1.008],"u13b-1:4":[24.844,1.296],"u13b-2:0":[26.49,1.344],"u13b-2:1":[28.184,1.224],"u13b-2:2":[29.758,1.416],"u13b-2:3":[31.524,1.944],"u13b-2:4":[33.818,1.176]},"u14":{"u14a-1:0":[0,2.544],"u14a-1:1":[2.894,1.416],"u14a-1:2":[4.66,2.016],"u14a-1:3":[7.026,2.208],"u14a-1:4":[9.584,2.424],"u14a-2:0":[12.358,1.704],"u14a-2:1":[14.412,1.704],"u14a-2:2":[16.466,1.608],"u14a-2:3":[18.424,1.536],"u14a-2:4":[20.31,1.584],"u14b-1:0":[22.244,1.104],"u14b-1:1":[23.698,2.256],"u14b-1:2":[26.304,2.304],"u14b-1:3":[28.958,2.568],"u14b-1:4":[31.876,1.224],"u14b-2:0":[33.45,1.296],"u14b-2:1":[35.096,1.824],"u14b-2:2":[37.27,1.296],"u14b-2:3":[38.916,1.008],"u14b-2:4":[40.274,1.656],"u14c-1:0":[42.28,2.088],"u14c-1:1":[44.718,1.704],"u14c-1:2":[46.772,1.488],"u14c-1:3":[48.61,1.488],"u14c-1:4":[50.448,1.104]},"u15":{"u15a-1:0":[0,2.568],"u15a-1:1":[2.918,2.064],"u15a-1:2":[5.332,1.536],"u15a-1:3":[7.218,2.256],"u15a-1:4":[9.824,2.568],"u15a-2:0":[12.742,1.896],"u15a-2:1":[14.988,1.656],"u15a-2:2":[16.994,1.536],"u15a-2:3":[18.88,1.128],"u15a-2:4":[20.358,1.296],"u15b-1:0":[22.004,2.496],"u15b-1:1":[24.85,1.488],"u15b-1:2":[26.688,1.824],"u15b-1:3":[28.862,1.416],"u15b-1:4":[30.628,2.376],"u15b-2:0":[33.354,1.488],"u15b-2:1":[35.192,1.536],"u15b-2:2":[37.078,2.184],"u15b-2:3":[39.612,1.536],"u15b-2:4":[41.498,1.464],"u15c-1:0":[43.312,1.464],"u15c-1:1":[45.126,1.584],"u15c-1:2":[47.06,2.256],"u15c-1:3":[49.666,1.296],"u15c-1:4":[51.312,1.248]},"u16":{"u16a-1:0":[0,1.248],"u16a-1:1":[1.598,2.088],"u16a-1:2":[4.036,1.104],"u16a-1:3":[5.49,1.536],"u16a-1:4":[7.376,1.368],"u16a-2:0":[9.094,1.248],"u16a-2:1":[10.692,1.704],"u16a-2:2":[12.746,1.344],"u16a-2:3":[14.44,1.656],"u16a-2:4":[16.446,1.416],"u16b-1:0":[18.212,1.344],"u16b-1:1":[19.906,1.896],"u16b-1:2":[22.152,1.344],"u16b-1:3":[23.846,1.536],"u16b-1:4":[25.732,1.344],"u16b-2:0":[27.426,1.344],"u16b-2:1":[29.12,1.056],"u16b-2:2":[30.526,1.416],"u16b-2:3":[32.292,1.464],"u16b-2:4":[34.106,1.608],"u16c-1:0":[36.064,1.416],"u16c-1:1":[37.83,1.728],"u16c-1:2":[39.908,1.968],"u16c-1:3":[42.226,1.704],"u16c-1:4":[44.28,2.016]},"u17":{"u17a-1:0":[0,2.256],"u17a-1:1":[2.606,1.344],"u17a-1:2":[4.3,1.608],"u17a-1:3":[6.258,1.656],"u17a-1:4":[8.264,1.728],"u17a-2:0":[10.342,2.256],"u17a-2:1":[12.948,2.016],"u17a-2:2":[15.314,2.616],"u17a-2:3":[18.28,1.656],"u17a-2:4":[20.286,1.128],"u17b-1:0":[21.764,1.104],"u17b-1:1":[23.218,0.984],"u17b-1:2":[24.552,2.448],"u17b-1:3":[27.35,1.536],"u17b-1:4":[29.236,1.296],"u17b-2:0":[30.882,2.256],"u17b-2:1":[33.488,1.536],"u17b-2:2":[35.374,1.608],"u17b-2:3":[37.332,1.536],"u17b-2:4":[39.218,1.728]},"u18":{"u18a-1:0":[0,1.488],"u18a-1:1":[1.838,1.416],"u18a-1:2":[3.604,1.728],"u18a-1:3":[5.682,1.848],"u18a-1:4":[7.88,2.088],"u18a-2:0":[10.318,2.136],"u18a-2:1":[12.804,1.176],"u18a-2:2":[14.33,1.536],"u18a-2:3":[16.216,1.248],"u18a-2:4":[17.814,1.728],"u18b-1:0":[19.892,1.656],"u18b-1:1":[21.898,1.416],"u18b-1:2":[23.664,1.728],"u18b-1:3":[25.742,2.376],"u18b-1:4":[28.468,1.656],"u18b-2:0":[30.474,1.296],"u18b-2:1":[32.12,2.184],"u18b-2:2":[34.654,2.304],"u18b-2:3":[37.308,1.824],"u18b-2:4":[39.482,1.128],"u18c-1:0":[40.96,2.568],"u18c-1:1":[43.878,2.088],"u18c-1:2":[46.316,2.424],"u18c-1:3":[49.09,2.016],"u18c-1:4":[51.456,1.296]},"u0":{"u0a-1:0":[0,1.488],"u0a-1:1":[1.838,1.728],"u0a-1:2":[3.916,1.176],"u0a-1:3":[5.442,1.416],"u0a-1:4":[7.208,1.704],"u0b-1:0":[9.262,1.464],"u0b-1:1":[11.076,1.416],"u0b-1:2":[12.842,1.416],"u0b-1:3":[14.608,1.248],"u0b-1:4":[16.206,1.656]},"u21":{"u21a-1:0":[0,2.496],"u21a-1:1":[2.846,1.104],"u21a-1:2":[4.3,1.296],"u21a-1:3":[5.946,1.224],"u21a-1:4":[7.52,2.208],"u21a-2:0":[10.078,1.248],"u21a-2:1":[11.676,1.416],"u21a-2:2":[13.442,1.704],"u21a-2:3":[15.496,1.488],"u21a-2:4":[17.334,1.464],"u21b-1:0":[19.148,3.168],"u21b-1:1":[22.666,2.136],"u21b-1:2":[25.152,2.208],"u21b-1:3":[27.71,1.968],"u21b-1:4":[30.028,1.848],"u21b-2:0":[32.226,1.464],"u21b-2:1":[34.04,1.464],"u21b-2:2":[35.854,1.248],"u21b-2:3":[37.452,1.656],"u21b-2:4":[39.458,1.368]},"u20":{"u20a-1:0":[0,2.256],"u20a-1:1":[2.606,1.704],"u20a-1:2":[4.66,1.704],"u20a-1:3":[6.714,1.656],"u20a-1:4":[8.72,1.848],"u20a-2:0":[10.918,2.136],"u20a-2:1":[13.404,1.296],"u20a-2:2":[15.05,2.304],"u20a-2:3":[17.704,1.536],"u20a-2:4":[19.59,1.944],"u20b-1:0":[21.884,1.536],"u20b-1:1":[23.77,1.584],"u20b-1:2":[25.704,1.584],"u20b-1:3":[27.638,2.136],"u20b-1:4":[30.124,1.896],"u20b-2:0":[32.37,1.704],"u20b-2:1":[34.424,2.256],"u20b-2:2":[37.03,1.704],"u20b-2:3":[39.084,1.728],"u20b-2:4":[41.162,1.368]},"u23":{"u23a-1:0":[0,1.896],"u23a-1:1":[2.246,1.488],"u23a-1:2":[4.084,1.416],"u23a-1:3":[5.85,1.824],"u23a-1:4":[8.024,1.584],"u23a-2:0":[9.958,2.016],"u23a-2:1":[12.324,1.704],"u23a-2:2":[14.378,1.536],"u23a-2:3":[16.264,1.224],"u23a-2:4":[17.838,2.088],"u23b-1:0":[20.276,1.584],"u23b-1:1":[22.21,2.376],"u23b-1:2":[24.936,1.704],"u23b-1:3":[26.99,1.776],"u23b-1:4":[29.116,1.224],"u23b-2:0":[30.69,1.176],"u23b-2:1":[32.216,1.248],"u23b-2:2":[33.814,1.464],"u23b-2:3":[35.628,1.128],"u23b-2:4":[37.106,1.176]},"u25":{"u25a-1:0":[0,1.968],"u25a-1:1":[2.318,1.416],"u25a-1:2":[4.084,1.224],"u25a-1:3":[5.658,1.416],"u25a-1:4":[7.424,2.016],"u25a-2:0":[9.79,1.464],"u25a-2:1":[11.604,1.368],"u25a-2:2":[13.322,1.728],"u25a-2:3":[15.4,2.376],"u25a-2:4":[18.126,1.848]},"u22":{"u22a-1:0":[0,1.776],"u22a-1:1":[2.126,1.728],"u22a-1:2":[4.204,2.136],"u22a-1:3":[6.69,1.944],"u22a-1:4":[8.984,2.736],"u22a-2:0":[12.07,1.296],"u22a-2:1":[13.716,1.536],"u22a-2:2":[15.602,1.104],"u22a-2:3":[17.056,1.536],"u22a-2:4":[18.942,1.368],"u22b-1:0":[20.66,2.088],"u22b-1:1":[23.098,1.896],"u22b-1:2":[25.344,2.136],"u22b-1:3":[27.83,2.136],"u22b-1:4":[30.316,1.848],"u22b-2:0":[32.514,1.704],"u22b-2:1":[34.568,2.088],"u22b-2:2":[37.006,1.728],"u22b-2:3":[39.084,1.464],"u22b-2:4":[40.898,2.208]},"cv1":{"cv1:0":[0.0,1.296],"cv1:1":[1.646,1.536],"cv1:2":[3.532,1.704],"cv1:3":[5.586,1.344],"cv1:4":[7.28,2.784],"cv1:5":[10.414,1.824],"cv1:6":[12.588,2.568],"cv1:7":[15.506,1.848],"cv1:8":[17.704,1.776],"cv1:9o0":[19.83,1.296],"cv1:9o0-0":[21.476,1.656],"cv1:9o1":[23.482,1.704],"cv1:9o1-0":[25.536,1.944],"cv1:10":[27.83,1.704],"cv1:11":[29.884,1.704],"cv1:13":[31.938,2.256],"cv1:14":[34.544,3.216],"cv1:15":[38.11,1.296],"cv1:16":[39.756,1.776],"cv1:18":[41.882,1.344],"cv1:19":[43.576,1.296],"cv1:21":[45.222,3.024],"cv1:22":[48.596,2.784],"cv1:23":[51.73,1.344]},"cv2":{"cv2:0":[0.0,2.688],"cv2:1":[3.038,2.928],"cv2:2":[6.316,3.528],"cv2:3":[10.194,2.616],"cv2:4":[13.16,2.928],"cv2:5":[16.438,3.168],"cv2:6":[19.956,3.864],"cv2:7":[24.17,1.824],"cv2:8":[26.344,2.184],"cv2:9":[28.878,2.256],"cv2:10":[31.484,3.864],"cv2:11o0":[35.698,1.704],"cv2:11o0-0":[37.752,3.168],"cv2:11o0-1":[41.27,1.944],"cv2:11o1":[43.564,1.848],"cv2:11o1-0":[45.762,2.664],"cv2:11o1-1":[48.776,2.208],"cv2:12":[51.334,2.664],"cv2:13":[54.348,2.304],"cv2:14":[57.002,1.704],"cv2:15":[59.056,2.616]},"cv3":{"cv3:0":[0.0,2.448],"cv3:1":[2.798,3.408],"cv3:2":[6.556,5.448],"cv3:3o0":[12.354,2.304],"cv3:3o0-0":[15.008,1.824],"cv3:3o1":[17.182,2.376],"cv3:3o1-0":[19.908,2.088],"cv3:4":[22.346,2.304],"cv3:5":[25.0,2.544],"cv3:6":[27.894,1.776],"cv3:7":[30.02,3.456],"cv3:8o0":[33.826,1.776],"cv3:8o0-0":[35.952,1.824],"cv3:8o1":[38.126,1.824],"cv3:8o1-0":[40.3,2.784],"cv3:9":[43.434,1.656],"cv3:10o0":[45.44,3.144],"cv3:10o0-0":[48.934,1.056],"cv3:10o1":[50.34,1.704],"cv3:10o1-0":[52.394,1.224],"cv3:12":[53.968,1.536],"cv3:13":[55.854,2.088],"cv3:14":[58.292,2.304],"cv3:15":[60.946,3.144],"cv3:16":[64.44,1.536],"cv3:17":[66.326,2.136],"cv3:18":[68.812,1.704],"cv3:19":[70.866,1.584],"cv3:20":[72.8,1.296],"cv3:21":[74.446,2.256],"cv3:22":[77.052,3.024]},"cv4":{"cv4:0":[0.0,1.416],"cv4:1":[1.766,2.496],"cv4:2":[4.612,1.584],"cv4:3":[6.546,2.976],"cv4:4o0":[9.872,1.704],"cv4:4o0-0":[11.926,2.256],"cv4:4o1":[14.532,1.008],"cv4:4o1-0":[15.89,0.768],"cv4:5":[17.008,1.344],"cv4:6":[18.702,1.584],"cv4:7":[20.636,2.184],"cv4:8":[23.17,5.088],"cv4:9":[28.608,2.328],"cv4:10":[31.286,1.416],"cv4:11":[33.052,1.536]},"cv5":{"cv5:0":[0.0,2.136],"cv5:1":[2.486,2.568],"cv5:2":[5.404,3.264],"cv5:3":[9.018,1.344],"cv5:4":[10.712,2.688],"cv5:5":[13.75,1.944],"cv5:6":[16.044,2.304],"cv5:7":[18.698,2.424],"cv5:8":[21.472,2.976],"cv5:9o0":[24.798,1.008],"cv5:9o0-0":[26.156,3.024],"cv5:9o0-1":[29.53,1.416],"cv5:9o0-2":[31.296,2.136],"cv5:9o1":[33.782,1.416],"cv5:9o1-0":[35.548,1.968],"cv5:10":[37.866,2.208],"cv5:11":[40.424,2.088],"cv5:12":[42.862,2.136],"cv5:13":[45.348,3.048],"cv5:14":[48.746,3.024]},"cv6":{"cv6:0":[0,2.376],"cv6:1":[2.726,2.544],"cv6:2":[5.62,4.776],"cv6:3":[10.746,1.128],"cv6:4":[12.224,2.256],"cv6:5o0":[14.83,2.328],"cv6:5o0-0":[17.508,3.936],"cv6:5o1":[21.794,2.016],"cv6:5o1-0":[24.16,3.288],"cv6:5o1-1":[27.798,2.064],"cv6:5o1-2":[30.212,2.736],"cv6:6":[33.298,1.224],"cv6:7":[34.872,2.976],"cv6:8":[38.198,2.088],"cv6:10":[40.636,2.664],"cv6:11":[43.65,2.496],"cv6:12":[46.496,2.808]},"cv7":{"cv7:0":[0.0,3.888],"cv7:1":[4.238,3.144],"cv7:2":[7.732,7.176],"cv7:3o0":[15.258,2.064],"cv7:3o0-0":[17.672,3.528],"cv7:3o1":[21.55,2.208],"cv7:3o1-0":[24.108,3.264],"cv7:4":[27.722,1.968],"cv7:5o0":[30.04,2.208],"cv7:5o0-0":[32.598,3.696],"cv7:5o1":[36.644,2.208],"cv7:5o1-0":[39.202,2.256],"cv7:5o2":[41.808,2.088],"cv7:5o2-0":[44.246,3.048],"cv7:6":[47.644,3.288],"cv7:7":[51.282,2.736],"cv7:8":[54.368,1.728],"cv7:9":[56.446,1.776],"cv7:10":[58.572,2.736],"cv7:11":[61.658,2.616]},"cv8":{"cv8:0":[0.0,2.568],"cv8:1":[2.918,3.096],"cv8:2":[6.364,1.896],"cv8:3":[8.61,1.656],"cv8:4":[10.616,3.144],"cv8:5o0":[14.11,1.968],"cv8:5o1":[16.428,2.136],"cv8:5o1-0":[18.914,3.648],"cv8:6":[22.912,2.304],"cv8:7":[25.566,1.488],"cv8:8":[27.404,2.568],"cv8:9":[30.322,2.064],"cv8:10":[32.736,0.984],"cv8:11":[34.07,2.256],"cv8:12":[36.676,1.416],"cv8:13":[38.442,2.304],"cv8:15":[41.096,3.816],"cv8:16o0":[45.262,1.704],"cv8:16o0-0":[47.316,2.328],"cv8:16o1":[49.994,1.344],"cv8:16o1-0":[51.688,3.336],"cv8:17":[55.374,1.008]},"cv9":{"cv9:0":[0.0,2.664],"cv9:1":[3.014,2.448],"cv9:2":[5.812,1.656],"cv9:3":[7.818,2.088],"cv9:4":[10.256,2.064],"cv9:5o0":[12.67,1.464],"cv9:5o0-0":[14.484,1.128],"cv9:5o1":[15.962,2.376],"cv9:5o1-0":[18.688,1.728],"cv9:6":[20.766,4.944],"cv9:7":[26.06,2.016],"cv9:8":[28.426,3.768],"cv9:9":[32.544,2.808],"cv9:10":[35.702,1.728],"cv9:11":[37.78,2.496],"cv9:12":[40.626,1.584],"cv9:13":[42.56,2.736]},"cv10":{"cv10:0":[0.0,2.736],"cv10:1":[3.086,2.424],"cv10:2":[5.86,2.448],"cv10:3":[8.658,2.616],"cv10:4":[11.624,2.688],"cv10:5":[14.662,2.784],"cv10:6":[17.796,1.344],"cv10:7":[19.49,2.904],"cv10:8o0":[22.744,2.256],"cv10:8o0-0":[25.35,1.464],"cv10:8o1":[27.164,2.088],"cv10:8o1-0":[29.602,6.456],"cv10:9":[36.408,3.168],"cv10:10":[39.926,2.976],"cv10:11":[43.252,3.216],"cv10:12":[46.818,1.776],"cv10:13":[48.944,2.328],"cv10:14":[51.622,3.288],"cv10:15":[55.26,1.008],"cv10:16":[56.618,1.776],"cv10:18":[58.744,2.544],"cv10:19":[61.638,2.496]},"u27":{"u27a-1:0":[0,1.704],"u27a-1:1":[2.054,1.416],"u27a-1:2":[3.82,1.488],"u27a-1:3":[5.658,1.296],"u27a-1:4":[7.304,1.608],"u27a-2:0":[9.262,1.824],"u27a-2:1":[11.436,1.416],"u27a-2:2":[13.202,1.704],"u27a-2:3":[15.256,1.488],"u27a-2:4":[17.094,1.536],"u27b-1:0":[18.98,1.416],"u27b-1:1":[20.746,1.296],"u27b-1:2":[22.392,1.224],"u27b-1:3":[23.966,1.128],"u27b-1:4":[25.444,1.776],"u27b-2:0":[27.57,1.728],"u27b-2:1":[29.648,1.248],"u27b-2:2":[31.246,1.344],"u27b-2:3":[32.94,1.224],"u27b-2:4":[34.514,1.416],"u27c-1:0":[36.28,1.776],"u27c-1:1":[38.406,1.704],"u27c-1:2":[40.46,1.176],"u27c-1:3":[41.986,1.176],"u27c-1:4":[43.512,1.704],"u27c-2:0":[45.566,1.248],"u27c-2:1":[47.164,1.584],"u27c-2:2":[49.098,1.848],"u27c-2:3":[51.296,1.416],"u27c-2:4":[53.062,1.368],"u27d-1:0":[54.78,1.584],"u27d-1:1":[56.714,1.488],"u27d-1:2":[58.552,1.344],"u27d-1:3":[60.246,1.848],"u27d-1:4":[62.444,1.416],"u27d-2:0":[64.21,1.656],"u27d-2:1":[66.216,1.704],"u27d-2:2":[68.27,1.656],"u27d-2:3":[70.276,1.704],"u27d-2:4":[72.33,1.344]},"u28":{"u28a-1:0":[0,1.224],"u28a-1:1":[1.574,2.208],"u28a-1:2":[4.132,1.368],"u28a-1:3":[5.85,1.728],"u28a-1:4":[7.928,1.728],"u28a-2:0":[10.006,1.848],"u28a-2:1":[12.204,1.896],"u28a-2:2":[14.45,1.656],"u28a-2:3":[16.456,1.704],"u28a-2:4":[18.51,1.824],"u28b-1:0":[20.684,2.664],"u28b-1:1":[23.698,1.656],"u28b-1:2":[25.704,1.584],"u28b-1:3":[27.638,1.896],"u28b-1:4":[29.884,1.848],"u28b-2:0":[32.082,1.704],"u28b-2:1":[34.136,1.704],"u28b-2:2":[36.19,1.536],"u28b-2:3":[38.076,1.536],"u28b-2:4":[39.962,2.256],"u28c-1:0":[42.568,1.656],"u28c-1:1":[44.574,1.416],"u28c-1:2":[46.34,1.488],"u28c-1:3":[48.178,1.344],"u28c-1:4":[49.872,1.344],"u28c-2:0":[51.566,1.128],"u28c-2:1":[53.044,2.136],"u28c-2:2":[55.53,1.968],"u28c-2:3":[57.848,2.208],"u28c-2:4":[60.406,2.208]},"u29":{"u29a-1:0":[0,1.344],"u29a-1:1":[1.694,1.344],"u29a-1:2":[3.388,1.488],"u29a-1:3":[5.226,1.416],"u29a-1:4":[6.992,1.344],"u29a-2:0":[8.686,1.608],"u29a-2:1":[10.644,1.368],"u29a-2:2":[12.362,1.416],"u29a-2:3":[14.128,1.416],"u29a-2:4":[15.894,1.656],"u29b-1:0":[17.9,1.608],"u29b-1:1":[19.858,1.968],"u29b-1:2":[22.176,1.704],"u29b-1:3":[24.23,1.488],"u29b-1:4":[26.068,1.896],"u29b-2:0":[28.314,0.936],"u29b-2:1":[29.6,1.536],"u29b-2:2":[31.486,1.776],"u29b-2:3":[33.612,2.064],"u29b-2:4":[36.026,1.536],"u29c-1:0":[37.912,1.224],"u29c-1:1":[39.486,1.776],"u29c-1:2":[41.612,1.344],"u29c-1:3":[43.306,1.416],"u29c-1:4":[45.072,1.488],"u29c-2:0":[46.91,1.608],"u29c-2:1":[48.868,1.224],"u29c-2:2":[50.442,1.608],"u29c-2:3":[52.4,1.728],"u29c-2:4":[54.478,1.704]},"u30":{"u30a-1:0":[0,1.608],"u30a-1:1":[1.958,1.416],"u30a-1:2":[3.724,1.464],"u30a-1:3":[5.538,1.416],"u30a-1:4":[7.304,1.296],"u30a-2:0":[8.95,1.368],"u30a-2:1":[10.668,1.176],"u30a-2:2":[12.194,1.416],"u30a-2:3":[13.96,1.128],"u30a-2:4":[15.438,1.368],"u30b-1:0":[17.156,1.224],"u30b-1:1":[18.73,1.104],"u30b-1:2":[20.184,1.416],"u30b-1:3":[21.95,1.536],"u30b-1:4":[23.836,1.224],"u30b-2:0":[25.41,1.224],"u30b-2:1":[26.984,1.128],"u30b-2:2":[28.462,1.656],"u30b-2:3":[30.468,1.536],"u30b-2:4":[32.354,1.176],"u30c-1:0":[33.88,2.136],"u30c-1:1":[36.366,1.896],"u30c-1:2":[38.612,1.848],"u30c-1:3":[40.81,1.416],"u30c-1:4":[42.576,1.536],"u30c-2:0":[44.462,2.304],"u30c-2:1":[47.116,2.304],"u30c-2:2":[49.77,2.616],"u30c-2:3":[52.736,1.584],"u30c-2:4":[54.67,1.704]},"u31":{"u31a-1:0":[0,1.344],"u31a-1:1":[1.694,1.848],"u31a-1:2":[3.892,1.488],"u31a-1:3":[5.73,1.944],"u31a-1:4":[8.024,1.776],"u31a-2:0":[10.15,1.248],"u31a-2:1":[11.748,1.416],"u31a-2:2":[13.514,1.224],"u31a-2:3":[15.088,1.464],"u31a-2:4":[16.902,1.536],"u31b-1:0":[18.788,1.704],"u31b-1:1":[20.842,2.088],"u31b-1:2":[23.28,2.256],"u31b-1:3":[25.886,2.208],"u31b-1:4":[28.444,1.728],"u31b-2:0":[30.522,1.776],"u31b-2:1":[32.648,1.944],"u31b-2:2":[34.942,2.376],"u31b-2:3":[37.668,1.536],"u31b-2:4":[39.554,2.256]},"u32":{"u32a-1:0":[0,1.464],"u32a-1:1":[1.814,1.296],"u32a-1:2":[3.46,1.416],"u32a-1:3":[5.226,1.536],"u32a-1:4":[7.112,1.776],"u32a-2:0":[9.238,1.344],"u32a-2:1":[10.932,1.224],"u32a-2:2":[12.506,1.536],"u32a-2:3":[14.392,1.248],"u32a-2:4":[15.99,1.656],"u32b-1:0":[17.996,1.704],"u32b-1:1":[20.05,1.056],"u32b-1:2":[21.456,1.224],"u32b-1:3":[23.03,1.056],"u32b-1:4":[24.436,1.224],"u32b-2:0":[26.01,0.888],"u32b-2:1":[27.248,1.176],"u32b-2:2":[28.774,1.416],"u32b-2:3":[30.54,1.704],"u32b-2:4":[32.594,1.656],"u32c-1:0":[34.6,1.728],"u32c-1:1":[36.678,1.848],"u32c-1:2":[38.876,1.464],"u32c-1:3":[40.69,1.584],"u32c-1:4":[42.624,2.136],"u32c-2:0":[45.11,1.848],"u32c-2:1":[47.308,1.584],"u32c-2:2":[49.242,1.416],"u32c-2:3":[51.008,1.704],"u32c-2:4":[53.062,1.728]},"u33":{"u33a-1:0":[0,1.296],"u33a-1:1":[1.646,1.176],"u33a-1:2":[3.172,1.584],"u33a-1:3":[5.106,2.064],"u33a-1:4":[7.52,2.256],"u33a-2:0":[10.126,1.776],"u33a-2:1":[12.252,1.704],"u33a-2:2":[14.306,1.776],"u33a-2:3":[16.432,2.064],"u33a-2:4":[18.846,2.256],"u33b-1:0":[21.452,1.704],"u33b-1:1":[23.506,1.728],"u33b-1:2":[25.584,1.824],"u33b-1:3":[27.758,1.968],"u33b-1:4":[30.076,1.128],"u33b-2:0":[31.554,3.816],"u33b-2:1":[35.72,1.464],"u33b-2:2":[37.534,1.656],"u33b-2:3":[39.54,2.064],"u33b-2:4":[41.954,1.848]},"u34":{"u34a-1:0":[0,1.248],"u34a-1:1":[1.598,1.296],"u34a-1:2":[3.244,1.704],"u34a-1:3":[5.298,1.704],"u34a-1:4":[7.352,1.824],"u34a-2:0":[9.526,1.848],"u34a-2:1":[11.724,1.704],"u34a-2:2":[13.778,1.296],"u34a-2:3":[15.424,1.488],"u34a-2:4":[17.262,1.416],"u34b-1:0":[19.028,1.656],"u34b-1:1":[21.034,1.824],"u34b-1:2":[23.208,2.016],"u34b-1:3":[25.574,1.944],"u34b-1:4":[27.868,1.176],"u34b-2:0":[29.394,2.136],"u34b-2:1":[31.88,1.704],"u34b-2:2":[33.934,2.184],"u34b-2:3":[36.468,1.584],"u34b-2:4":[38.402,1.488],"u34c-1:0":[40.24,1.176],"u34c-1:1":[41.766,1.848],"u34c-1:2":[43.964,3.504],"u34c-1:3":[47.818,2.064],"u34c-1:4":[50.232,2.736],"u34c-2:0":[53.318,2.208],"u34c-2:1":[55.876,2.088],"u34c-2:2":[58.314,1.224],"u34c-2:3":[59.888,1.536],"u34c-2:4":[61.774,2.256]},"u35":{"u35a-1:0":[0,0.864],"u35a-1:1":[1.214,1.008],"u35a-1:2":[2.572,1.008],"u35a-1:3":[3.93,1.128],"u35a-1:4":[5.408,1.416],"u35a-2:0":[7.174,1.176],"u35a-2:1":[8.7,0.936],"u35a-2:2":[9.986,0.816],"u35a-2:3":[11.152,0.768],"u35a-2:4":[12.27,1.368],"u35b-1:0":[13.988,2.304],"u35b-1:1":[16.642,2.136],"u35b-1:2":[19.128,1.968],"u35b-1:3":[21.446,2.016],"u35b-1:4":[23.812,2.664],"u35b-2:0":[26.826,3.048],"u35b-2:1":[30.224,1.344],"u35b-2:2":[31.918,1.464],"u35b-2:3":[33.732,2.304],"u35b-2:4":[36.386,2.088],"u35c-1:0":[38.824,0.288],"u35c-1:1":[39.462,1.056],"u35c-1:2":[40.868,0.864],"u35c-1:3":[42.082,1.536],"u35c-1:4":[43.968,1.248],"u35c-2:0":[45.566,2.568],"u35c-2:1":[48.484,2.208],"u35c-2:2":[51.042,1.704],"u35c-2:3":[53.096,2.544],"u35c-2:4":[55.99,2.064]},"u36":{"u36a-1:0":[0,1.224],"u36a-1:1":[1.574,1.776],"u36a-1:2":[3.7,1.968],"u36a-1:3":[6.018,1.728],"u36a-1:4":[8.096,1.248],"u36a-2:0":[9.694,1.368],"u36a-2:1":[11.412,1.104],"u36a-2:2":[12.866,1.224],"u36a-2:3":[14.44,1.416],"u36a-2:4":[16.206,2.184],"u36b-1:0":[18.74,1.224],"u36b-1:1":[20.314,1.728],"u36b-1:2":[22.392,1.416],"u36b-1:3":[24.158,1.704],"u36b-1:4":[26.212,1.848],"u36b-2:0":[28.41,1.968],"u36b-2:1":[30.728,2.064],"u36b-2:2":[33.142,1.704],"u36b-2:3":[35.196,1.848],"u36b-2:4":[37.394,1.656],"u36c-1:0":[39.4,1.224],"u36c-1:1":[40.974,1.296],"u36c-1:2":[42.62,1.776],"u36c-1:3":[44.746,1.536],"u36c-1:4":[46.632,1.608],"u36c-2:0":[48.59,1.464],"u36c-2:1":[50.404,1.416],"u36c-2:2":[52.17,1.776],"u36c-2:3":[54.296,1.656],"u36c-2:4":[56.302,1.656]},"u37":{"u37a-1:0":[0,2.016],"u37a-1:1":[2.366,1.536],"u37a-1:2":[4.252,1.344],"u37a-1:3":[5.946,1.248],"u37a-1:4":[7.544,1.296],"u37a-2:0":[9.19,1.896],"u37a-2:1":[11.436,1.488],"u37a-2:2":[13.274,1.848],"u37a-2:3":[15.472,1.464],"u37a-2:4":[17.286,1.704],"u37b-1:0":[19.34,1.248],"u37b-1:1":[20.938,1.488],"u37b-1:2":[22.776,1.464],"u37b-1:3":[24.59,1.224],"u37b-1:4":[26.164,1.704],"u37b-2:0":[28.218,1.704],"u37b-2:1":[30.272,2.448],"u37b-2:2":[33.07,1.968],"u37b-2:3":[35.388,1.416],"u37b-2:4":[37.154,1.848],"u37c-1:0":[39.352,1.464],"u37c-1:1":[41.166,1.224],"u37c-1:2":[42.74,1.224],"u37c-1:3":[44.314,1.296],"u37c-1:4":[45.96,2.904],"u37c-2:0":[49.214,2.568],"u37c-2:1":[52.132,2.856],"u37c-2:2":[55.338,2.544],"u37c-2:3":[58.232,1.656],"u37c-2:4":[60.238,1.464]},"u40":{"u40a-1:0":[0,1.104],"u40a-1:1":[1.454,1.104],"u40a-1:2":[2.908,1.104],"u40a-1:3":[4.362,1.224],"u40a-1:4":[5.936,1.296],"u40a-2:0":[7.582,1.536],"u40a-2:1":[9.468,1.296],"u40a-2:2":[11.114,1.656],"u40a-2:3":[13.12,1.704],"u40a-2:4":[15.174,1.416],"u40b-1:0":[16.94,1.728],"u40b-1:1":[19.018,1.776],"u40b-1:2":[21.144,1.896],"u40b-1:3":[23.39,1.296],"u40b-1:4":[25.036,1.344],"u40b-2:0":[26.73,1.464],"u40b-2:1":[28.544,2.184],"u40b-2:2":[31.078,1.536],"u40b-2:3":[32.964,2.904],"u40b-2:4":[36.218,1.656]},"u38":{"u38a-1:0":[0,1.224],"u38a-1:1":[1.574,1.488],"u38a-1:2":[3.412,1.728],"u38a-1:3":[5.49,1.944],"u38a-1:4":[7.784,1.368],"u38a-2:0":[9.502,1.104],"u38a-2:1":[10.956,1.848],"u38a-2:2":[13.154,1.536],"u38a-2:3":[15.04,1.608],"u38a-2:4":[16.998,1.728],"u38b-1:0":[19.076,1.704],"u38b-1:1":[21.13,1.656],"u38b-1:2":[23.136,1.368],"u38b-1:3":[24.854,1.656],"u38b-1:4":[26.86,1.416],"u38b-2:0":[28.626,1.344],"u38b-2:1":[30.32,1.344],"u38b-2:2":[32.014,1.224],"u38b-2:3":[33.588,1.056],"u38b-2:4":[34.994,1.464],"u38c-1:0":[36.808,2.424],"u38c-1:1":[39.582,2.136],"u38c-1:2":[42.068,1.848],"u38c-1:3":[44.266,2.256],"u38c-1:4":[46.872,1.896],"u38c-2:0":[49.118,1.488],"u38c-2:1":[50.956,2.016],"u38c-2:2":[53.322,1.224],"u38c-2:3":[54.896,2.376],"u38c-2:4":[57.622,1.488]},"u39":{"u39a-1:0":[0,1.104],"u39a-1:1":[1.454,1.536],"u39a-1:2":[3.34,1.056],"u39a-1:3":[4.746,1.536],"u39a-1:4":[6.632,1.656],"u39a-2:0":[8.638,1.104],"u39a-2:1":[10.092,1.488],"u39a-2:2":[11.93,1.536],"u39a-2:3":[13.816,1.416],"u39a-2:4":[15.582,1.656],"u39b-1:0":[17.588,1.584],"u39b-1:1":[19.522,1.704],"u39b-1:2":[21.576,1.608],"u39b-1:3":[23.534,3.744],"u39b-1:4":[27.628,1.536],"u39b-2:0":[29.514,2.544],"u39b-2:1":[32.408,1.536],"u39b-2:2":[34.294,1.968],"u39b-2:3":[36.612,1.776],"u39b-2:4":[38.738,1.728]},"cv11":{"cv11:0":[0.0,2.568],"cv11:1":[2.918,2.256],"cv11:2":[5.524,2.856],"cv11:3":[8.73,2.184],"cv11:4":[11.264,3.168],"cv11:5o0":[14.782,2.064],"cv11:5o0-0":[17.196,1.848],"cv11:5o0-1":[19.394,1.896],"cv11:5o0-2":[21.64,1.896],"cv11:5o0-3":[23.886,2.208],"cv11:5o1":[26.444,2.664],"cv11:5o1-0":[29.458,2.424],"cv11:5o1-1":[32.232,3.456],"cv11:6":[36.038,1.104],"cv11:7":[37.492,3.288],"cv11:8":[41.13,4.296],"cv11:9":[45.776,1.536],"cv11:10":[47.662,1.584],"cv11:11":[49.596,2.568],"cv11:12":[52.514,3.888],"cv11:13":[56.752,2.208],"cv11:14":[59.31,2.448],"cv11:15":[62.108,1.056]},"cv12":{"cv12:0":[0.0,3.264],"cv12:1":[3.614,2.016],"cv12:3":[5.98,1.776],"cv12:4":[8.106,2.064],"cv12:5":[10.52,1.248],"cv12:6":[12.118,2.424],"cv12:7":[14.892,3.384],"cv12:9":[18.626,1.056],"cv12:10":[20.032,2.976],"cv12:11":[23.358,1.656],"cv12:12":[25.364,2.544],"cv12:13":[28.258,1.656],"cv12:14":[30.264,2.664],"cv12:15":[33.278,3.096],"cv12:16o0":[36.724,1.608],"cv12:16o1":[38.682,1.944],"cv12:16o1-0":[40.976,3.048],"cv12:16o1-1":[44.374,2.904],"cv12:17":[47.628,3.024],"cv12:18":[51.002,2.016],"cv12:19":[53.368,2.496],"cv12:20":[56.214,3.216]},"cv13":{"cv13:0":[0,3.528],"cv13:1":[3.878,2.376],"cv13:2":[6.604,2.184],"cv13:3":[9.138,1.848],"cv13:4":[11.336,2.136],"cv13:5":[13.822,2.016],"cv13:6":[16.188,1.896],"cv13:7":[18.434,2.304],"cv13:8":[21.088,2.016],"cv13:9o0":[23.454,1.776],"cv13:9o0-0":[25.58,1.056],"cv13:9o1":[26.986,1.608],"cv13:9o1-0":[28.944,1.944],"cv13:10":[31.238,1.656],"cv13:11":[33.244,1.968],"cv13:12":[35.562,1.944],"cv13:13":[37.856,2.448]},"cv14":{"cv14:0":[0,3.504],"cv14:1":[3.854,3.096],"cv14:2":[7.3,1.608],"cv14:3":[9.258,1.536],"cv14:4":[11.144,1.896],"cv14:5":[13.39,1.944],"cv14:6":[15.684,1.704],"cv14:7":[17.738,2.544],"cv14:8":[20.632,1.488],"cv14:9o0":[22.47,2.496],"cv14:9o1":[25.316,1.536],"cv14:9o1-0":[27.202,1.176],"cv14:9o1-1":[28.728,1.584],"cv14:10":[30.662,1.536],"cv14:11":[32.548,3.864],"cv14:12":[36.762,1.848],"cv14:13":[38.96,1.608],"cv14:14":[40.918,3.744],"cv14:15":[45.012,2.064]},"cv15":{"cv15:0":[0.0,2.928],"cv15:1":[3.278,2.976],"cv15:2o0":[6.604,4.584],"cv15:2o0-0":[11.538,1.704],"cv15:2o0-1":[13.592,2.376],"cv15:2o0-2":[16.318,1.584],"cv15:2o1":[18.252,1.656],"cv15:2o1-0":[20.258,1.248],"cv15:2o1-1":[21.856,3.504],"cv15:3":[25.71,4.296],"cv15:4":[30.356,2.088],"cv15:5":[32.794,2.256],"cv15:6":[35.4,1.488],"cv15:7":[37.238,1.824],"cv15:8":[39.412,3.936],"cv15:9":[43.698,1.896],"cv15:10":[45.944,3.096],"cv15:11":[49.39,1.704],"cv15:12":[51.444,2.976]},"me1":{"me1:name":[0,1.536],"me1:learn":[1.886,2.568],"me1:nice":[4.804,1.704],"me1:from-lt":[6.858,1.704],"me1:live-lt":[8.912,1.728],"me1:from-us":[10.99,2.088],"me1:live-us":[13.428,2.136],"me1:from-gb":[15.914,2.088],"me1:live-gb":[18.352,2.136],"me1:from-sc":[20.838,2.016],"me1:live-sc":[23.204,2.016],"me1:from-ie":[25.57,1.848],"me1:live-ie":[27.768,1.968],"me1:from-ca":[30.086,2.136],"me1:live-ca":[32.572,2.136],"me1:from-au":[35.058,1.944],"me1:live-au":[37.352,1.896],"me1:from-de":[39.598,2.256],"me1:live-de":[42.204,2.256],"me1:from-pl":[44.81,1.896],"me1:live-pl":[47.056,1.944],"me1:from-lv":[49.35,1.824],"me1:live-lv":[51.524,1.944],"me1:from-ua":[53.818,2.256],"me1:live-ua":[56.424,2.208],"me1:from-no":[58.982,2.208],"me1:live-no":[61.54,2.088],"me1:from-se":[63.978,2.208],"me1:live-se":[66.536,2.064],"me1:from-es":[68.95,1.824],"me1:live-es":[71.124,2.016],"me1:from-fr":[73.49,2.016],"me1:live-fr":[75.856,2.136],"me1:from-it":[78.342,2.304],"me1:live-it":[80.996,2.256],"me1:from-br":[83.602,2.208],"me1:live-br":[86.16,1.848],"me1:from-mx":[88.358,2.064],"me1:live-mx":[90.772,1.848],"me1:from-in":[92.97,1.728],"me1:live-in":[95.048,1.896],"me1:from-jp":[97.294,2.088],"me1:live-jp":[99.732,2.184],"me1:live-vilnius":[102.266,2.304],"me1:live-kaunas":[104.92,1.656],"me1:live-klaipeda":[106.926,1.944],"me1:live-london":[109.22,2.304],"me1:live-dublin":[111.874,1.776],"me1:live-berlin":[114,1.656],"me1:live-paris":[116.006,2.208],"me1:live-newyork":[118.564,1.776],"me1:live-chicago":[120.69,1.968],"me1:live-oslo":[123.008,1.656],"me1:job-teacher-m":[125.014,1.584],"me1:job-teacher-f":[126.948,1.704],"me1:job-student-m":[129.002,1.704],"me1:job-student-f":[131.056,2.568],"me1:job-doctor-m":[133.974,1.704],"me1:job-doctor-f":[136.028,2.016],"me1:job-nurse-m":[138.394,2.064],"me1:job-nurse-f":[140.808,1.728],"me1:job-engineer-m":[142.886,1.704],"me1:job-engineer-f":[144.94,1.944],"me1:job-programmer-m":[147.234,2.064],"me1:job-programmer-f":[149.648,1.968],"me1:job-driver-m":[151.966,1.704],"me1:job-driver-f":[154.02,1.704],"me1:job-cook-m":[156.074,1.704],"me1:job-cook-f":[158.128,1.656],"me1:job-builder-m":[160.134,2.136],"me1:job-builder-f":[162.62,1.944],"me1:job-seller-m":[164.914,2.088],"me1:job-seller-f":[167.352,1.848],"me1:job-accountant-m":[169.55,2.016],"me1:job-accountant-f":[171.916,2.304],"me1:job-manager-m":[174.57,1.776],"me1:job-manager-f":[176.696,1.704],"me1:job-mechanic-m":[178.75,1.896],"me1:job-mechanic-f":[180.996,1.728],"me1:job-farmer-m":[183.074,2.064],"me1:job-farmer-f":[185.488,1.728],"me1:job-artist-m":[187.566,1.704],"me1:job-artist-f":[189.62,1.776],"me1:job-home-m":[191.746,1.944],"me1:job-home-f":[194.04,1.968],"me1:job-retired-m":[196.358,2.088],"me1:job-retired-f":[198.796,2.256],"me1:job-unemployed-m":[201.402,1.656],"me1:job-unemployed-f":[203.408,1.728],"me1:work-office":[205.486,2.136],"me1:work-home":[207.972,1.728],"me1:work-hospital":[210.05,2.088],"me1:work-shop":[212.488,1.944],"me1:work-school":[214.782,1.896],"me1:work-factory":[217.028,1.776],"me1:work-warehouse":[219.154,1.824],"me1:work-restaurant":[221.328,2.304],"me1:work-bank":[223.982,1.488],"me1:work-farm":[225.82,2.016],"me1:work-university":[228.186,2.424],"me1:partner-married-m":[230.96,1.416],"me1:partner-married-f":[232.726,2.064],"me1:partner-single-m":[235.14,1.656],"me1:partner-single-f":[237.146,2.016],"me1:partner-wife":[239.512,1.536],"me1:partner-husband":[241.398,1.824],"me1:partner-gf":[243.572,1.584],"me1:partner-bf":[245.506,1.704],"me1:kids-none":[247.56,1.656],"me1:kids-son":[249.566,1.536],"me1:kids-daughter":[251.452,1.968],"me1:kids-sd":[253.77,2.424],"me1:kids-two":[256.544,2.016],"me1:kids-three":[258.91,2.016],"me1:kids-four":[261.276,1.968],"me1:sib-none":[263.594,2.304],"me1:sib-brother":[266.248,1.824],"me1:sib-sister":[268.422,1.704],"me1:sib-both":[270.476,2.448],"me1:sib-brothers":[273.274,2.088],"me1:sib-sisters":[275.712,2.064],"me1:pet-dog":[278.126,2.256],"me1:pet-cat":[280.732,1.704],"me1:pet-both":[282.786,2.064],"me1:why-family":[285.2,2.328],"me1:why-trip":[287.878,2.016],"me1:why-wife":[290.244,2.256],"me1:why-husband":[292.85,1.968],"me1:why-gf":[295.168,2.808],"me1:why-bf":[298.326,2.928],"me1:why-friends":[301.604,2.136],"me1:why-love":[304.09,2.016],"me1:why-languages":[306.456,2.088],"me1:like-read":[308.894,1.656],"me1:like-travel":[310.9,1.776],"me1:like-cook":[313.026,1.824],"me1:like-sport":[315.2,1.656],"me1:like-basketball":[317.206,4.104],"me1:like-football":[321.66,2.064],"me1:like-films":[324.074,2.136],"me1:like-music":[326.56,2.376],"me1:like-fish":[329.286,2.208],"me1:like-walk":[331.844,1.728],"me1:like-dance":[333.922,1.704],"me1:like-sing":[335.976,1.728],"me1:like-draw":[338.054,1.896],"me1:like-games":[340.3,2.856],"me1:like-garden":[343.506,1.848],"me1:like-swim":[345.704,1.728]},"me2":{"me2:u1d-1:0~n":[0.0,1.536],"me2:u3c-1:4~f":[1.886,1.584],"me2:u3d-2:1~f":[3.82,1.536],"me2:u15b-1:4~f":[5.706,2.136],"me2:u20a-2:4~f":[8.192,1.728],"me2:u35b-1:1~f":[10.27,3.744],"me2:cv1:22~n":[14.364,3.216],"me2:cv16:0~n":[17.93,2.856],"me2:cv16:24~n":[21.136,2.904],"me2:cv17:0~n":[24.39,3.984],"me2:cv17:1~n":[28.724,2.016],"me2:cv18:9~n":[31.09,0.936],"me2:cv2:1~n":[32.376,2.016],"me2:cv2:3~lt":[34.742,4.176],"me2:cv2:3~gb":[39.268,2.904],"me2:cv2:3~sc":[42.522,2.664],"me2:cv2:3~ie":[45.536,2.568],"me2:cv2:3~ca":[48.454,3.696],"me2:cv2:3~au":[52.5,3.528],"me2:cv2:3~de":[56.378,2.496],"me2:cv2:3~pl":[59.224,2.976],"me2:cv2:3~lv":[62.55,2.664],"me2:cv2:3~ua":[65.564,2.736],"me2:cv2:3~no":[68.65,4.368],"me2:cv2:3~se":[73.368,2.976],"me2:cv2:3~es":[76.694,3.816],"me2:cv2:3~fr":[80.86,2.976],"me2:cv2:3~it":[84.186,2.664],"me2:cv2:3~br":[87.2,2.616],"me2:cv2:3~mx":[90.166,2.616],"me2:cv2:3~in":[93.132,3.696],"me2:cv2:3~jp":[97.178,2.616],"me2:cv22:0~n":[100.144,3.144],"me2:cv22:4~f":[103.638,2.568],"me2:cv22:5~f":[106.556,2.088],"me2:cv22:13~n":[108.994,1.968],"me2:cv22:22o1~f":[111.312,2.616],"me2:cv22:24~n":[114.278,2.496],"me2:cv22:26~n":[117.124,4.248],"me2:cv3:10o0~f":[121.722,3.288],"me2:cv23:23o0~lt":[125.36,3.528],"me2:cv23:23o0~gb":[129.238,2.568],"me2:cv23:23o0~sc":[132.156,2.928],"me2:cv23:23o0~ie":[135.434,2.928],"me2:cv23:23o0~ca":[138.712,3.024],"me2:cv23:23o0~au":[142.086,2.688],"me2:cv23:23o0~de":[145.124,3.768],"me2:cv23:23o0~pl":[149.242,3.936],"me2:cv23:23o0~lv":[153.528,3.576],"me2:cv23:23o0~ua":[157.454,2.928],"me2:cv23:23o0~no":[160.732,3.096],"me2:cv23:23o0~se":[164.178,3.648],"me2:cv23:23o0~es":[168.176,2.856],"me2:cv23:23o0~fr":[171.382,3.336],"me2:cv23:23o0~it":[175.068,2.568],"me2:cv23:23o0~br":[177.986,2.976],"me2:cv23:23o0~mx":[181.312,3.648],"me2:cv23:23o0~in":[185.31,3.048],"me2:cv23:23o0~jp":[188.708,2.928],"me2:cv27:14o0~f":[191.986,2.448],"me2:cv27:14o1~f":[194.784,2.136],"me2:cv31:6~lt":[197.27,3.024],"me2:cv31:6~gb":[200.644,2.928],"me2:cv31:6~sc":[203.922,3.336],"me2:cv31:6~ie":[207.608,2.976],"me2:cv31:6~ca":[210.934,3.408],"me2:cv31:6~au":[214.692,2.736],"me2:cv31:6~de":[217.778,3.816],"me2:cv31:6~pl":[221.944,2.856],"me2:cv31:6~lv":[225.15,3.528],"me2:cv31:6~ua":[229.028,2.784],"me2:cv31:6~no":[232.162,3.336],"me2:cv31:6~se":[235.848,2.976],"me2:cv31:6~es":[239.174,2.856],"me2:cv31:6~fr":[242.38,3.624],"me2:cv31:6~it":[246.354,3.936],"me2:cv31:6~br":[250.64,3.936],"me2:cv31:6~mx":[254.926,2.928],"me2:cv31:6~in":[258.204,3.048],"me2:cv31:6~jp":[261.602,2.928],"me2:cv34:5~lt":[264.88,2.784],"me2:cv34:5~gb":[268.014,2.616],"me2:cv34:5~sc":[270.98,4.008],"me2:cv34:5~ie":[275.338,2.568],"me2:cv34:5~ca":[278.256,2.616],"me2:cv34:5~au":[281.222,3.744],"me2:cv34:5~de":[285.316,4.128],"me2:cv34:5~pl":[289.794,2.784],"me2:cv34:5~lv":[292.928,2.664],"me2:cv34:5~ua":[295.942,2.544],"me2:cv34:5~no":[298.836,2.736],"me2:cv34:5~se":[301.922,3.456],"me2:cv34:5~es":[305.728,3.936],"me2:cv34:5~fr":[310.014,4.176],"me2:cv34:5~it":[314.54,3.144],"me2:cv34:5~br":[318.034,2.664],"me2:cv34:5~mx":[321.048,2.688],"me2:cv34:5~in":[324.086,2.736],"me2:cv34:5~jp":[327.172,3.768],"me2:cv28:11~n":[331.29,1.656],"me2:cv8:4~n":[333.296,2.496],"me2:cv10:3~n":[336.142,2.904],"me2:cv10:3~nf":[339.396,2.976],"me2:cv10:7~f":[342.722,4.056],"me2:cv10:8o0~f":[347.128,1.776],"me2:cv10:10~n":[349.254,2.544],"me2:cv15:1~n":[352.148,2.616],"me2:cv15:2o0-2~n":[355.114,1.344],"me2:cv15:2o1-0~n":[356.808,0.984]},"cv16":{"cv16:0":[0.0,2.904],"cv16:1o0":[3.254,2.424],"cv16:1o0-0":[6.028,1.848],"cv16:1o1":[8.226,3.576],"cv16:1o1-0":[12.152,2.136],"cv16:1o2":[14.638,2.088],"cv16:1o2-0":[17.076,2.496],"cv16:2":[19.922,1.416],"cv16:3":[21.688,4.584],"cv16:4":[26.622,2.088],"cv16:5":[29.06,2.328],"cv16:6":[31.738,2.088],"cv16:7":[34.176,2.928],"cv16:8":[37.454,1.584],"cv16:9":[39.388,2.088],"cv16:10":[41.826,1.728],"cv16:11":[43.904,1.824],"cv16:12":[46.078,2.016],"cv16:13":[48.444,2.568],"cv16:15":[51.362,2.424],"cv16:16":[54.136,1.224],"cv16:17":[55.71,2.664],"cv16:18":[58.724,3.744],"cv16:19":[62.818,2.616],"cv16:20":[65.784,2.976],"cv16:21":[69.11,2.664],"cv16:22":[72.124,1.848],"cv16:23":[74.322,2.136],"cv16:24":[76.808,2.688],"cv16:25":[79.846,2.256]},"cv17":{"cv17:0":[0.0,3.888],"cv17:1":[4.238,2.424],"cv17:2":[7.012,3.864],"cv17:3":[11.226,2.064],"cv17:4":[13.64,3.696],"cv17:5":[17.686,2.016],"cv17:6":[20.052,3.504],"cv17:7":[23.906,4.728],"cv17:8":[28.984,1.944],"cv17:9":[31.278,2.304],"cv17:10":[33.932,1.848],"cv17:11o0":[36.13,1.896],"cv17:11o0-0":[38.376,1.608],"cv17:11o1":[40.334,1.824],"cv17:11o1-0":[42.508,2.856],"cv17:12":[45.714,4.416],"cv17:13":[50.48,1.968],"cv17:14":[52.798,2.736],"cv17:15":[55.884,2.664],"cv17:17":[58.898,2.736],"cv17:18":[61.984,1.704],"cv17:19":[64.038,3.936],"cv17:20":[68.324,2.184],"cv17:21":[70.858,2.736],"cv17:22":[73.944,2.664],"cv17:23":[76.958,2.736],"cv17:24":[80.044,2.304]},"cv18":{"cv18:0":[0.0,2.304],"cv18:1":[2.654,2.136],"cv18:2":[5.14,3.744],"cv18:3":[9.234,2.904],"cv18:4":[12.488,1.464],"cv18:5":[14.302,1.896],"cv18:6":[16.548,4.824],"cv18:7o0":[21.722,1.728],"cv18:7o0-0":[23.8,4.128],"cv18:7o1":[28.278,1.704],"cv18:7o1-0":[30.332,2.976],"cv18:9":[33.658,1.296],"cv18:10":[35.304,2.376],"cv18:11":[38.03,3.336],"cv18:12":[41.716,2.088],"cv18:13":[44.154,2.064],"cv18:14":[46.568,1.368],"cv18:15":[48.286,1.968],"cv18:16":[50.604,4.224],"cv18:17":[55.178,1.728],"cv18:18":[57.256,1.464]},"cv19":{"cv19:1":[0.0,1.344],"cv19:2":[1.694,2.376],"cv19:3":[4.42,2.256],"cv19:4":[7.026,1.224],"cv19:6":[8.6,1.176],"cv19:7":[10.126,1.656],"cv19:8":[12.132,1.248],"cv19:9":[13.73,3.048],"cv19:10":[17.128,1.728],"cv19:11":[19.206,3.384],"cv19:12o0":[22.94,3.144],"cv19:12o0-0":[26.434,2.664],"cv19:12o1":[29.448,3.384],"cv19:12o1-0":[33.182,1.704],"cv19:13":[35.236,1.776],"cv19:14":[37.362,2.088],"cv19:15":[39.8,4.848],"cv19:16":[44.998,2.568],"cv19:17":[47.916,3.264],"cv19:18":[51.53,3.024],"cv19:19":[54.904,3.048],"cv19:20":[58.302,2.496],"cv19:21":[61.148,3.168],"cv19:22":[64.666,3.024]},"cv20":{"cv20:0":[0.0,2.424],"cv20:1":[2.774,2.616],"cv20:2":[5.74,2.136],"cv20:3":[8.226,1.536],"cv20:4":[10.112,3.288],"cv20:5":[13.75,1.896],"cv20:6":[15.996,3.744],"cv20:7":[20.09,1.488],"cv20:8":[21.928,2.904],"cv20:9":[25.182,2.208],"cv20:10":[27.74,2.928],"cv20:12":[31.018,2.544],"cv20:13":[33.912,2.976],"cv20:14":[37.238,1.488],"cv20:15":[39.076,2.544],"cv20:16o0":[41.97,1.776],"cv20:16o0-0":[44.096,2.448],"cv20:16o1":[46.894,2.136],"cv20:16o1-0":[49.38,2.616],"cv20:17":[52.346,2.904],"cv20:18":[55.6,2.496]},"cv21":{"cv21:0":[0.0,2.448],"cv21:1":[2.798,2.256],"cv21:2":[5.404,1.704],"cv21:3":[7.458,2.064],"cv21:4":[9.872,1.344],"cv21:5":[11.566,2.256],"cv21:6":[14.172,2.424],"cv21:7o0":[16.946,1.416],"cv21:7o0-0":[18.712,2.184],"cv21:7o1":[21.246,1.728],"cv21:7o1-0":[23.324,2.616],"cv21:8":[26.29,2.304],"cv21:9":[28.944,1.896],"cv21:10":[31.19,1.464],"cv21:11":[33.004,2.664],"cv21:13":[36.018,2.664],"cv21:14":[39.032,2.616],"cv21:15":[41.998,1.896],"cv21:16":[44.244,2.976],"cv21:17":[47.57,2.736],"cv21:18":[50.656,1.488]},"cv22":{"cv22:0":[0.0,3.888],"cv22:1":[4.238,2.448],"cv22:2":[7.036,2.928],"cv22:3":[10.314,3.288],"cv22:4":[13.952,3.384],"cv22:5":[17.686,2.424],"cv22:6":[20.46,2.856],"cv22:7o0":[23.666,2.808],"cv22:7o0-0":[26.824,1.536],"cv22:7o1":[28.71,2.784],"cv22:7o1-0":[31.844,1.704],"cv22:8":[33.898,2.568],"cv22:9o0":[36.816,2.136],"cv22:9o0-0":[39.302,2.544],"cv22:9o0-1":[42.196,1.776],"cv22:9o1":[44.322,1.968],"cv22:9o1-0":[46.64,2.808],"cv22:9o1-1":[49.798,1.368],"cv22:11":[51.516,4.848],"cv22:12":[56.714,2.496],"cv22:13":[59.56,2.424],"cv22:14o0":[62.334,1.728],"cv22:14o0-0":[64.412,2.496],"cv22:14o1":[67.258,2.664],"cv22:14o1-0":[70.272,2.736],"cv22:15":[73.358,1.536],"cv22:16":[75.244,2.664],"cv22:17":[78.258,1.824],"cv22:19":[80.432,1.704],"cv22:20":[82.486,1.704],"cv22:21":[84.54,2.616],"cv22:22o0":[87.506,2.256],"cv22:22o0-0":[90.112,0.984],"cv22:22o1":[91.446,2.784],"cv22:22o1-0":[94.58,1.416],"cv22:24":[96.346,3.144],"cv22:25":[99.84,1.416],"cv22:26":[101.606,2.736],"cv22:27":[104.692,2.448]},"cv23":{"cv23:0":[0.0,2.808],"cv23:1":[3.158,3.336],"cv23:2":[6.844,3.288],"cv23:3":[10.482,2.136],"cv23:4":[12.968,1.296],"cv23:5":[14.614,1.728],"cv23:6":[16.692,1.608],"cv23:7":[18.65,1.728],"cv23:8":[20.728,1.416],"cv23:9":[22.494,2.736],"cv23:10":[25.58,1.248],"cv23:11":[27.178,1.536],"cv23:13":[29.064,2.184],"cv23:14":[31.598,3.384],"cv23:15":[35.332,2.016],"cv23:16":[37.698,2.184],"cv23:17":[40.232,1.728],"cv23:18":[42.31,1.704],"cv23:19":[44.364,1.488],"cv23:20":[46.202,3.768],"cv23:22":[50.32,1.848],"cv23:23o0":[52.518,2.544],"cv23:23o0-0":[55.412,2.088],"cv23:23o1":[57.85,3.336],"cv23:23o1-0":[61.536,2.736],"cv23:24":[64.622,2.016],"cv23:25":[66.988,2.376],"cv23:26":[69.714,2.736],"cv23:27":[72.8,2.016],"cv23:28":[75.166,3.216],"cv23:29":[78.732,2.448]},"cv24":{"cv24:0":[0,2.376],"cv24:1":[2.726,3.744],"cv24:2":[6.82,2.928],"cv24:3":[10.098,1.656],"cv24:4":[12.104,1.848],"cv24:5o0":[14.302,1.176],"cv24:5o0-0":[15.828,2.616],"cv24:5o1":[18.794,1.536],"cv24:5o1-0":[20.68,2.496],"cv24:6":[23.526,2.256],"cv24:7":[26.132,2.736],"cv24:8":[29.218,3.936],"cv24:9":[33.504,6.336],"cv24:10":[40.19,2.568],"cv24:11":[43.108,2.136],"cv24:12":[45.594,1.728],"cv24:13":[47.672,3.888],"cv24:14":[51.91,2.736]},"cv25":{"cv25:0":[0.0,2.208],"cv25:1":[2.558,1.176],"cv25:2":[4.084,2.256],"cv25:3":[6.69,1.584],"cv25:4":[8.624,4.464],"cv25:5":[13.438,1.344],"cv25:6":[15.132,1.848],"cv25:7":[17.33,1.656],"cv25:8":[19.336,2.784],"cv25:9":[22.47,4.776],"cv25:10o0":[27.596,2.424],"cv25:10o0-0":[30.37,1.584],"cv25:10o0-1":[32.304,1.896],"cv25:10o1":[34.55,2.496],"cv25:10o1-0":[37.396,1.488],"cv25:10o1-1":[39.234,1.704],"cv25:10o2":[41.288,1.656],"cv25:10o2-0":[43.294,1.416],"cv25:11":[45.06,1.824],"cv25:12o0":[47.234,2.304],"cv25:12o0-0":[49.888,0.768],"cv25:12o1":[51.006,1.944],"cv25:12o1-0":[53.3,2.208],"cv25:12o2":[55.858,1.704],"cv25:12o2-0":[57.912,1.536],"cv25:13":[59.798,2.568],"cv25:14":[62.716,1.704],"cv25:15":[64.77,2.616],"cv25:16":[67.736,1.416]},"cv26":{"cv26:0":[0.0,2.256],"cv26:1":[2.606,1.776],"cv26:2":[4.732,3.144],"cv26:3":[8.226,1.368],"cv26:4":[9.944,1.704],"cv26:5":[11.998,1.704],"cv26:6":[14.052,5.088],"cv26:7":[19.49,2.568],"cv26:8":[22.408,2.424],"cv26:9":[25.182,2.256],"cv26:10o0":[27.788,1.824],"cv26:10o0-0":[29.962,2.496],"cv26:10o0-1":[32.808,2.256],"cv26:10o1":[35.414,1.488],"cv26:10o1-0":[37.252,1.416],"cv26:11":[39.018,1.536],"cv26:12":[40.904,1.968],"cv26:14":[43.222,3.144],"cv26:15":[46.716,2.736]},"cv27":{"cv27:0":[0.0,3.888],"cv27:1":[4.238,2.256],"cv27:2":[6.844,2.904],"cv27:3":[10.098,3.168],"cv27:4":[13.616,7.248],"cv27:5":[21.214,1.704],"cv27:6":[23.268,0.288],"cv27:7":[23.906,1.776],"cv27:8o0":[26.032,2.904],"cv27:8o0-0":[29.286,2.616],"cv27:8o1":[32.252,4.128],"cv27:8o1-0":[36.73,1.944],"cv27:9":[39.024,1.968],"cv27:10":[41.342,2.856],"cv27:11":[44.548,3.288],"cv27:12":[48.186,1.488],"cv27:13":[50.024,2.424],"cv27:14o0":[52.798,2.136],"cv27:14o0-0":[55.284,1.704],"cv27:14o1":[57.338,2.136],"cv27:14o1-0":[59.824,2.448],"cv27:16":[62.622,1.536],"cv27:17":[64.508,3.024],"cv27:18":[67.882,2.064]},"cv28":{"cv28:0":[0.0,3.144],"cv28:1o0":[3.494,2.256],"cv28:1o0-0":[6.1,2.448],"cv28:1o1":[8.898,2.928],"cv28:1o1-0":[12.176,1.536],"cv28:1o1-1":[14.062,2.256],"cv28:1o1-2":[16.668,3.264],"cv28:2":[20.282,3.984],"cv28:3o0":[24.616,2.496],"cv28:3o0-0":[27.462,2.304],"cv28:3o1":[30.116,2.304],"cv28:3o1-0":[32.77,2.976],"cv28:4":[36.096,1.536],"cv28:5":[37.982,3.336],"cv28:7":[41.668,2.568],"cv28:8o0":[44.586,2.136],"cv28:8o0-0":[47.072,1.656],"cv28:8o1":[49.078,3.384],"cv28:8o1-0":[52.812,2.616],"cv28:9":[55.778,3.288],"cv28:10":[59.416,1.968],"cv28:11":[61.734,1.704],"cv28:12":[63.788,2.376]},"cv29":{"cv29:0":[0.0,2.928],"cv29:1":[3.278,1.704],"cv29:2":[5.332,3.576],"cv29:3":[9.258,2.256],"cv29:4":[11.864,3.024],"cv29:5o0":[15.238,1.896],"cv29:5o0-0":[17.484,1.368],"cv29:5o1":[19.202,1.896],"cv29:5o1-0":[21.448,2.736],"cv29:6":[24.534,1.704],"cv29:7":[26.588,2.136],"cv29:8":[29.074,4.224],"cv29:9":[33.648,1.488],"cv29:10":[35.486,3.528],"cv29:11":[39.364,2.376]},"cv30":{"cv30:0":[0.0,3.264],"cv30:1":[3.614,2.424],"cv30:2":[6.388,1.128],"cv30:3o0":[7.866,1.464],"cv30:3o0-0":[9.68,2.256],"cv30:3o0-1":[12.286,5.736],"cv30:3o1":[18.372,2.568],"cv30:3o1-0":[21.29,1.464],"cv30:3o1-1":[23.104,1.248],"cv30:4":[24.702,3.216],"cv30:5":[28.268,1.368],"cv30:6":[29.986,2.736],"cv30:7":[33.072,1.704],"cv30:8o0":[35.126,2.256],"cv30:8o0-0":[37.732,4.008],"cv30:8o1":[42.09,1.656],"cv30:8o1-0":[44.096,2.544],"cv30:9":[46.99,2.016],"cv30:10":[49.356,2.208]},"cv31":{"cv31:0":[0.0,3.144],"cv31:1":[3.494,4.104],"cv31:2":[7.948,1.416],"cv31:3":[9.714,1.536],"cv31:4":[11.6,3.576],"cv31:5":[15.526,4.608],"cv31:6":[20.484,3.096],"cv31:7":[23.93,3.048],"cv31:8":[27.328,1.656],"cv31:9":[29.334,2.496],"cv31:10":[32.18,2.568],"cv31:11":[35.098,4.104],"cv31:12o0":[39.552,2.136],"cv31:12o0-0":[42.038,3.168],"cv31:12o1":[45.556,2.496],"cv31:12o1-0":[48.402,2.304],"cv31:13":[51.056,3.528]},"cv32":{"cv32:0":[0.0,2.256],"cv32:1":[2.606,2.304],"cv32:2":[5.26,1.704],"cv32:3":[7.314,4.608],"cv32:4":[12.272,1.656],"cv32:5o0":[14.278,2.616],"cv32:5o0-0":[17.244,1.416],"cv32:5o1":[19.01,1.776],"cv32:5o1-0":[21.136,1.296],"cv32:6":[22.782,3.024],"cv32:7":[26.156,1.776],"cv32:8":[28.282,2.664],"cv32:9":[31.296,2.304],"cv32:10":[33.95,2.376],"cv32:11":[36.676,3.216],"cv32:13":[40.242,1.536],"cv32:14":[42.128,3.024]},"cv33":{"cv33:0":[0.0,2.496],"cv33:1":[2.846,1.848],"cv33:2":[5.044,1.536],"cv33:3":[6.93,2.208],"cv33:4":[9.488,1.656],"cv33:5":[11.494,2.208],"cv33:6":[14.052,3.384],"cv33:7":[17.786,1.608],"cv33:8":[19.744,3.144],"cv33:9":[23.238,1.584],"cv33:10":[25.172,1.848],"cv33:11":[27.37,1.656],"cv33:12":[29.376,1.536],"cv33:13":[31.262,2.664]},"cv34":{"cv34:0":[0.0,5.424],"cv34:1":[5.774,3.264],"cv34:2":[9.388,2.448],"cv34:3":[12.186,2.184],"cv34:4":[14.72,2.856],"cv34:5":[17.926,2.784],"cv34:6":[21.06,3.288],"cv34:7":[24.698,1.896],"cv34:8":[26.944,1.488],"cv34:9":[28.782,1.704],"cv34:10":[30.836,6.408],"cv34:11":[37.594,3.336],"cv34:12":[41.28,4.296],"cv34:13":[45.926,3.048],"cv34:14":[49.324,1.704],"cv34:15":[51.378,6.408],"cv34:16":[58.136,3.696],"cv34:17":[62.182,3.096]},"u42":{"u42a-1:0":[0,1.488],"u42a-1:1":[1.838,1.224],"u42a-1:2":[3.412,1.608],"u42a-1:3":[5.37,1.464],"u42a-1:4":[7.184,1.416],"u42a-2:0":[8.95,1.176],"u42a-2:1":[10.476,1.248],"u42a-2:2":[12.074,1.104],"u42a-2:3":[13.528,1.464],"u42a-2:4":[15.342,1.344],"u42b-1:0":[17.036,1.296],"u42b-1:1":[18.682,1.296],"u42b-1:2":[20.328,1.416],"u42b-1:3":[22.094,1.704],"u42b-1:4":[24.148,1.584],"u42b-2:0":[26.082,1.416],"u42b-2:1":[27.848,1.968],"u42b-2:2":[30.166,2.208],"u42b-2:3":[32.724,1.416],"u42b-2:4":[34.49,1.224],"u42c-1:0":[36.064,1.104],"u42c-1:1":[37.518,1.056],"u42c-1:2":[38.924,1.248],"u42c-1:3":[40.522,1.464],"u42c-1:4":[42.336,1.536],"u42c-2:0":[44.222,1.344],"u42c-2:1":[45.916,1.176],"u42c-2:2":[47.442,1.416],"u42c-2:3":[49.208,1.344],"u42c-2:4":[50.902,1.296]}},"kore":{"cv1":{"cv1:0":[0,1.464],"cv1:2":[1.814,1.008],"cv1:4":[3.172,3.216],"cv1:6":[6.738,2.568],"cv1:8":[9.656,1.848],"cv1:9o0-0":[11.854,1.416],"cv1:9o1-0":[13.62,1.824],"cv1:10":[15.794,2.136],"cv1:18":[18.28,1.704],"cv1:22":[20.334,3.528]},"cv16":{"cv16:0":[0,2.976],"cv16:1o0-0":[3.326,1.488],"cv16:1o1-0":[5.164,1.536],"cv16:1o2-0":[7.05,2.184],"cv16:2":[9.584,1.656],"cv16:4":[11.59,2.424],"cv16:6":[14.364,1.728],"cv16:8":[16.442,1.416],"cv16:10":[18.208,1.896],"cv16:12":[20.454,2.376],"cv16:16":[23.18,1.416],"cv16:18":[24.946,1.776],"cv16:20":[27.072,2.616],"cv16:22":[30.038,2.016],"cv16:24":[32.404,2.544]},"cv6":{"cv6:0":[0,2.496],"cv6:2":[2.846,4.128],"cv6:4":[7.324,2.544],"cv6:5o0-0":[10.218,2.856],"cv6:5o1-0":[13.424,3.648],"cv6:5o1-2":[17.422,3.048],"cv6:7":[20.82,2.568],"cv6:10":[23.738,2.376],"cv6:12":[26.464,2.688]},"cv7":{"cv7:0":[0,2.784],"cv7:2":[3.134,5.016],"cv7:3o0-0":[8.5,3.696],"cv7:3o1-0":[12.546,3.504],"cv7:4":[16.4,1.728],"cv7:5o0-0":[18.478,3.024],"cv7:5o1-0":[21.852,2.448],"cv7:5o2-0":[24.65,3.288],"cv7:6":[28.288,3.408],"cv7:8":[32.046,2.256],"cv7:10":[34.652,3.504]},"cv10":{"cv10:0":[0,2.256],"cv10:2":[2.606,2.424],"cv10:7":[5.38,3.096],"cv10:8o0-0":[8.826,1.248],"cv10:8o1-0":[10.424,4.416],"cv10:15":[15.19,1.488],"cv10:19":[17.028,2.328]},"cv11":{"cv11:0":[0,2.496],"cv11:2":[2.846,1.416],"cv11:4":[4.612,2.736],"cv11:5o0-0":[7.698,1.656],"cv11:5o0-2":[9.704,1.464],"cv11:5o1-0":[11.518,2.904],"cv11:6":[14.772,1.464],"cv11:8":[16.586,3.768],"cv11:10":[20.704,1.704],"cv11:12":[22.758,5.136],"cv11:14":[28.244,2.256]},"cv14":{"cv14:0":[0,3.144],"cv14:2":[3.494,1.536],"cv14:4":[5.38,2.136],"cv14:6":[7.866,2.088],"cv14:8":[10.304,1.584],"cv14:9o1-0":[12.238,1.296],"cv14:10":[13.884,1.776],"cv14:12":[16.01,1.416],"cv14:14":[17.776,3.936]},"cv15":{"cv15:1":[0,3.024],"cv15:2o0-2":[3.374,1.704],"cv15:2o1-1":[5.428,4.104],"cv15:5":[9.882,2.784],"cv15:9":[13.016,1.704]},"me2":{"me2:cv1:22~n":[0,2.568],"me2:cv16:0~n":[2.918,2.208],"me2:cv16:24~n":[5.476,2.424],"me2:cv22:0~n":[8.25,2.304],"me2:cv22:24~n":[10.904,2.184],"me2:cv10:7~f":[13.438,2.856],"me2:cv15:1~n":[16.644,2.976],"me2:cv15:2o0-2~n":[19.97,1.488]},"cv18":{"cv18:0":[0,1.944],"cv18:2":[2.294,3.816],"cv18:4":[6.46,1.416],"cv18:6":[8.226,2.808],"cv18:7o0-0":[11.384,2.448],"cv18:7o1-0":[14.182,2.568],"cv18:11":[17.1,2.808],"cv18:13":[20.258,3.216],"cv18:17":[23.824,1.824]},"cv22":{"cv22:0":[0,3.264],"cv22:2":[3.614,1.896],"cv22:6":[5.86,2.448],"cv22:7o0-0":[8.658,1.776],"cv22:7o1-0":[10.784,1.704],"cv22:11":[12.838,4.416],"cv22:15":[17.604,1.488],"cv22:17":[19.442,1.848],"cv22:24":[21.64,2.976]},"cv30":{"cv30:0":[0,2.976],"cv30:2":[3.326,1.104],"cv30:3o0-0":[4.78,2.544],"cv30:3o1-0":[7.674,1.656],"cv30:4":[9.68,3.264],"cv30:6":[13.294,2.808],"cv30:7":[16.452,1.248],"cv30:8o0-0":[18.05,3.264],"cv30:8o1-0":[21.664,3.264],"cv30:9":[25.278,2.616]}},"orus":{"cv1":{"cv1:1":[0,1.416],"cv1:3":[1.766,1.296],"cv1:5":[3.412,1.896],"cv1:7":[5.658,1.848],"cv1:9o0":[7.856,1.344],"cv1:9o1":[9.55,1.704],"cv1:11":[11.604,2.016],"cv1:14":[13.97,2.904],"cv1:16":[17.224,1.416],"cv1:19":[18.99,1.416],"cv1:21":[20.756,2.688],"cv1:23":[23.794,1.296]},"cv16":{"cv16:1o0":[0,3.264],"cv16:1o1":[3.614,2.064],"cv16:1o2":[6.028,2.088],"cv16:3":[8.466,3.216],"cv16:5":[12.032,2.208],"cv16:7":[14.59,3.216],"cv16:9":[18.156,1.488],"cv16:11":[19.994,1.848],"cv16:13":[22.192,3.168],"cv16:15":[25.71,2.664],"cv16:17":[28.724,2.088],"cv16:19":[31.162,2.256],"cv16:21":[33.768,2.568],"cv16:23":[36.686,1.104],"cv16:25":[38.14,2.616]},"cv2":{"cv2:1":[0,3.216],"cv2:3":[3.566,2.688],"cv2:5":[6.604,2.976],"cv2:7":[9.93,1.488],"cv2:9":[11.768,2.568],"cv2:11o0":[14.686,2.208],"cv2:11o0-1":[17.244,2.184],"cv2:11o1":[19.778,2.136],"cv2:11o1-1":[22.264,2.544],"cv2:13":[25.158,2.496],"cv2:15":[28.004,2.376]},"cv3":{"cv3:1":[0,3.168],"cv3:3o0":[3.518,2.496],"cv3:3o1":[6.364,2.208],"cv3:6":[8.922,1.704],"cv3:8o0":[10.976,2.016],"cv3:8o1":[13.342,2.088],"cv3:10o0":[15.78,3.456],"cv3:10o1":[19.586,1.656],"cv3:13":[21.592,2.376],"cv3:15":[24.318,3.336],"cv3:17":[28.004,2.256],"cv3:20":[30.61,1.296],"cv3:22":[32.256,2.496]},"cv4":{"cv4:0":[0,1.296],"cv4:2":[1.646,1.848],"cv4:4o0":[3.844,1.656],"cv4:4o1":[5.85,1.536],"cv4:5":[7.736,1.416],"cv4:7":[9.502,2.016],"cv4:9":[11.868,2.376],"cv4:11":[14.594,1.344]},"cv5":{"cv5:1":[0,3.024],"cv5:3":[3.374,1.296],"cv5:5":[5.02,1.464],"cv5:7":[6.834,1.488],"cv5:9o0":[8.672,1.248],"cv5:9o0-1":[10.27,1.416],"cv5:9o1":[12.036,1.464],"cv5:10":[13.85,2.208],"cv5:12":[16.408,2.256],"cv5:14":[19.014,2.544]},"cv6":{"cv6:1":[0,2.544],"cv6:3":[2.894,1.248],"cv6:5o0":[4.492,1.728],"cv6:5o1":[6.57,2.016],"cv6:5o1-1":[8.936,1.584],"cv6:6":[10.87,1.464],"cv6:8":[12.684,2.088],"cv6:11":[15.122,2.088]},"cv7":{"cv7:1":[0,2.328],"cv7:3o0":[2.678,2.088],"cv7:3o1":[5.116,1.944],"cv7:5o0":[7.41,1.704],"cv7:5o1":[9.464,1.656],"cv7:5o2":[11.47,1.824],"cv7:7":[13.644,2.568],"cv7:9":[16.562,1.704],"cv7:11":[18.616,2.568]},"cv8":{"cv8:1":[0,2.928],"cv8:3":[3.278,1.944],"cv8:5o0":[5.572,1.896],"cv8:5o1":[7.818,1.968],"cv8:7":[10.136,1.248],"cv8:9":[11.734,2.304],"cv8:11":[14.388,2.184],"cv8:13":[16.922,1.824],"cv8:16o0":[19.096,1.656],"cv8:16o1":[21.102,1.824],"cv8:17":[23.276,1.008]},"cv9":{"cv9:1":[0,2.184],"cv9:3":[2.534,1.824],"cv9:5o0":[4.708,1.848],"cv9:5o1":[6.906,2.544],"cv9:7":[9.8,2.016],"cv9:9":[12.166,2.376],"cv9:11":[14.892,2.856],"cv9:13":[18.098,3.528]},"cv10":{"cv10:1":[0,2.568],"cv10:4":[2.918,2.424],"cv10:6":[5.692,0.984],"cv10:8o0":[7.026,2.088],"cv10:8o1":[9.464,2.256],"cv10:9":[12.07,2.544],"cv10:11":[14.964,2.928],"cv10:13":[18.242,2.184],"cv10:16":[20.776,1.584],"cv10:18":[22.71,2.736]},"cv11":{"cv11:1":[0,2.088],"cv11:3":[2.438,2.736],"cv11:5o0":[5.524,1.824],"cv11:5o0-1":[7.698,2.304],"cv11:5o0-3":[10.352,1.584],"cv11:5o1":[12.286,2.208],"cv11:5o1-1":[14.844,3.264],"cv11:7":[18.458,2.928],"cv11:9":[21.736,1.296],"cv11:11":[23.382,2.496],"cv11:13":[26.228,2.616],"cv11:15":[29.194,1.008]},"cv12":{"cv12:1":[0,2.136],"cv12:4":[2.486,1.848],"cv12:6":[4.684,1.848],"cv12:10":[6.882,3.168],"cv12:12":[10.4,2.064],"cv12:14":[12.814,2.496],"cv12:16o0":[15.66,1.584],"cv12:16o1":[17.594,1.704],"cv12:16o1-1":[19.648,2.544],"cv12:18":[22.542,1.776],"cv12:20":[24.668,2.304]},"cv13":{"cv13:1":[0,2.904],"cv13:3":[3.254,2.016],"cv13:5":[5.62,2.088],"cv13:7":[8.058,2.376],"cv13:9o0":[10.784,1.728],"cv13:9o1":[12.862,2.088],"cv13:11":[15.3,2.064],"cv13:13":[17.714,1.944]},"cv14":{"cv14:1":[0,2.688],"cv14:3":[3.038,1.704],"cv14:5":[5.092,1.728],"cv14:7":[7.17,2.736],"cv14:9o0":[10.256,2.808],"cv14:9o1":[13.414,1.824],"cv14:9o1-1":[15.588,1.944],"cv14:11":[17.882,3.216],"cv14:13":[21.448,1.656],"cv14:15":[23.454,1.536]},"cv15":{"cv15:2o0":[0,3.864],"cv15:2o0-1":[4.214,2.256],"cv15:2o1":[6.82,1.728],"cv15:4":[8.898,2.256],"cv15:6":[11.504,2.016],"cv15:8":[13.87,3.864],"cv15:10":[18.084,2.376],"cv15:12":[20.81,3.168]},"me2":{"me2:cv17:1~n":[0,2.088],"me2:cv2:1~n":[2.438,2.688],"me2:cv2:3~lt":[5.476,3.648],"me2:cv2:3~gb":[9.474,2.664],"me2:cv2:3~sc":[12.488,3.624],"me2:cv2:3~ie":[16.462,2.664],"me2:cv2:3~ca":[19.476,2.928],"me2:cv2:3~au":[22.754,4.224],"me2:cv2:3~de":[27.328,3.168],"me2:cv2:3~pl":[30.846,2.688],"me2:cv2:3~lv":[33.884,2.976],"me2:cv2:3~ua":[37.21,3.144],"me2:cv2:3~no":[40.704,4.128],"me2:cv2:3~se":[45.182,2.664],"me2:cv2:3~es":[48.196,3.624],"me2:cv2:3~fr":[52.17,4.224],"me2:cv2:3~it":[56.744,4.008],"me2:cv2:3~br":[61.102,2.976],"me2:cv2:3~mx":[64.428,2.976],"me2:cv2:3~in":[67.754,3.456],"me2:cv2:3~jp":[71.56,2.976],"me2:cv22:5~f":[74.886,1.728],"me2:cv22:22o1~f":[76.964,2.976],"me2:cv3:10o0~f":[80.29,3.024],"me2:cv23:23o0~lt":[83.664,3.144],"me2:cv23:23o0~gb":[87.158,2.256],"me2:cv23:23o0~sc":[89.764,2.856],"me2:cv23:23o0~ie":[92.97,2.736],"me2:cv23:23o0~ca":[96.056,2.544],"me2:cv23:23o0~au":[98.95,4.248],"me2:cv23:23o0~de":[103.548,2.928],"me2:cv23:23o0~pl":[106.826,2.976],"me2:cv23:23o0~lv":[110.152,2.808],"me2:cv23:23o0~ua":[113.31,3.408],"me2:cv23:23o0~no":[117.068,3.264],"me2:cv23:23o0~se":[120.682,3.048],"me2:cv23:23o0~es":[124.08,3.456],"me2:cv23:23o0~fr":[127.886,3.216],"me2:cv23:23o0~it":[131.452,2.904],"me2:cv23:23o0~br":[134.706,3.576],"me2:cv23:23o0~mx":[138.632,2.256],"me2:cv23:23o0~in":[141.238,2.256],"me2:cv23:23o0~jp":[143.844,2.328],"me2:cv27:14o0~f":[146.522,1.944],"me2:cv27:14o1~f":[148.816,2.064],"me2:cv31:6~lt":[151.23,2.424],"me2:cv31:6~gb":[154.004,2.856],"me2:cv31:6~sc":[157.21,3.264],"me2:cv31:6~ie":[160.824,2.736],"me2:cv31:6~ca":[163.91,2.784],"me2:cv31:6~au":[167.044,2.976],"me2:cv31:6~de":[170.37,3.408],"me2:cv31:6~pl":[174.128,2.976],"me2:cv31:6~lv":[177.454,2.184],"me2:cv31:6~ua":[179.988,2.856],"me2:cv31:6~no":[183.194,3.384],"me2:cv31:6~se":[186.928,2.568],"me2:cv31:6~es":[189.846,3.456],"me2:cv31:6~fr":[193.652,3.384],"me2:cv31:6~it":[197.386,2.616],"me2:cv31:6~br":[200.352,3.384],"me2:cv31:6~mx":[204.086,2.256],"me2:cv31:6~in":[206.692,3.264],"me2:cv31:6~jp":[210.306,3.384],"me2:cv34:5~lt":[214.04,3.384],"me2:cv34:5~gb":[217.774,2.664],"me2:cv34:5~sc":[220.788,4.344],"me2:cv34:5~ie":[225.482,3.216],"me2:cv34:5~ca":[229.048,4.224],"me2:cv34:5~au":[233.622,2.976],"me2:cv34:5~de":[236.948,2.856],"me2:cv34:5~pl":[240.154,2.688],"me2:cv34:5~lv":[243.192,3.744],"me2:cv34:5~ua":[247.286,3.024],"me2:cv34:5~no":[250.66,2.664],"me2:cv34:5~se":[253.674,3.768],"me2:cv34:5~es":[257.792,2.976],"me2:cv34:5~fr":[261.118,3.144],"me2:cv34:5~it":[264.612,4.104],"me2:cv34:5~br":[269.066,3.576],"me2:cv34:5~mx":[272.992,2.976],"me2:cv34:5~in":[276.318,2.736],"me2:cv34:5~jp":[279.404,3.144],"me2:cv10:8o0~f":[282.898,2.088]},"cv17":{"cv17:1":[0,1.704],"cv17:3":[2.054,2.304],"cv17:5":[4.708,1.776],"cv17:7":[6.834,3.264],"cv17:9":[10.448,2.016],"cv17:11o0":[12.814,1.536],"cv17:11o1":[14.7,2.064],"cv17:13":[17.114,2.496],"cv17:15":[19.96,2.928],"cv17:18":[23.238,1.728],"cv17:20":[25.316,2.064],"cv17:22":[27.73,2.736],"cv17:24":[30.816,2.304]},"cv18":{"cv18:1":[0,2.568],"cv18:3":[2.918,3.696],"cv18:5":[6.964,1.848],"cv18:7o0":[9.162,1.416],"cv18:7o1":[10.928,2.136],"cv18:10":[13.414,3.048],"cv18:12":[16.812,2.568],"cv18:14":[19.73,1.848],"cv18:16":[21.928,3.744],"cv18:18":[26.022,1.464]},"cv19":{"cv19:1":[0,1.344],"cv19:3":[1.694,1.968],"cv19:6":[4.012,0.984],"cv19:8":[5.346,1.536],"cv19:10":[7.232,2.376],"cv19:12o0":[9.958,3.936],"cv19:12o1":[14.244,3.408],"cv19:14":[18.002,2.136],"cv19:16":[20.488,2.664],"cv19:18":[23.502,2.376],"cv19:20":[26.228,3.144],"cv19:22":[29.722,2.544]},"cv20":{"cv20:1":[0,2.568],"cv20:3":[2.918,1.488],"cv20:5":[4.756,1.968],"cv20:7":[7.074,1.728],"cv20:9":[9.152,2.016],"cv20:13":[11.518,3.048],"cv20:16o0":[14.916,1.824],"cv20:16o1":[17.09,1.896],"cv20:18":[19.336,2.496]},"cv21":{"cv21:1":[0,1.608],"cv21:3":[1.958,2.088],"cv21:5":[4.396,2.304],"cv21:7o0":[7.05,1.224],"cv21:7o1":[8.624,1.248],"cv21:9":[10.222,2.424],"cv21:11":[12.996,2.616],"cv21:14":[15.962,3.816],"cv21:16":[20.128,3.264],"cv21:18":[23.742,1.224]},"cv22":{"cv22:1":[0,2.304],"cv22:3":[2.654,3.264],"cv22:5":[6.268,2.088],"cv22:7o0":[8.706,3.624],"cv22:7o1":[12.68,4.008],"cv22:9o0":[17.038,1.536],"cv22:9o0-1":[18.924,1.704],"cv22:9o1":[20.978,1.368],"cv22:9o1-1":[22.696,1.704],"cv22:12":[24.75,2.064],"cv22:14o0":[27.164,1.968],"cv22:14o1":[29.482,2.496],"cv22:16":[32.328,2.496],"cv22:20":[35.174,1.776],"cv22:22o0":[37.3,2.088],"cv22:22o1":[39.738,4.584],"cv22:25":[44.672,1.536],"cv22:27":[46.558,2.544]},"cv23":{"cv23:1":[0,2.976],"cv23:3":[3.326,2.256],"cv23:5":[5.932,1.584],"cv23:7":[7.866,2.016],"cv23:9":[10.232,3.288],"cv23:11":[13.87,1.176],"cv23:14":[15.396,3.144],"cv23:16":[18.89,2.016],"cv23:18":[21.256,1.824],"cv23:20":[23.43,1.896],"cv23:23o0":[25.676,3.264],"cv23:23o1":[29.29,3.096],"cv23:25":[32.736,2.448],"cv23:27":[35.534,1.704],"cv23:29":[37.588,2.544]},"cv24":{"cv24:1":[0,3.408],"cv24:3":[3.758,2.304],"cv24:5o0":[6.412,1.416],"cv24:5o1":[8.178,1.176],"cv24:6":[9.704,2.208],"cv24:8":[12.262,3.744],"cv24:10":[16.356,2.376],"cv24:12":[19.082,2.208],"cv24:14":[21.64,3.528]},"cv25":{"cv25:1":[0,1.536],"cv25:3":[1.886,1.248],"cv25:5":[3.484,1.536],"cv25:7":[5.37,1.536],"cv25:10o0":[7.256,2.136],"cv25:10o0-1":[9.742,1.584],"cv25:10o1":[11.676,2.136],"cv25:10o1-1":[14.162,1.488],"cv25:10o2":[16,1.728],"cv25:12o0":[18.078,2.448],"cv25:12o1":[20.876,2.256],"cv25:12o2":[23.482,1.584],"cv25:14":[25.416,1.416],"cv25:16":[27.182,1.608]},"cv26":{"cv26:1":[0,1.944],"cv26:3":[2.294,1.128],"cv26:5":[3.772,1.344],"cv26:7":[5.466,2.208],"cv26:10o0":[8.024,1.416],"cv26:10o0-1":[9.79,2.064],"cv26:10o1":[12.204,1.656],"cv26:11":[14.21,1.584],"cv26:15":[16.144,2.784]},"cv27":{"cv27:1":[0,2.544],"cv27:3":[2.894,3.144],"cv27:5":[6.388,1.776],"cv27:8o0":[8.514,3.888],"cv27:8o1":[12.752,5.304],"cv27:10":[18.406,3.408],"cv27:12":[22.164,1.296],"cv27:14o0":[23.81,1.848],"cv27:14o1":[26.008,1.824],"cv27:16":[28.182,1.368],"cv27:18":[29.9,1.728]},"cv28":{"cv28:1o0":[0,1.776],"cv28:1o1":[2.126,2.784],"cv28:1o1-1":[5.26,1.704],"cv28:3o0":[7.314,1.944],"cv28:3o1":[9.608,1.848],"cv28:5":[11.806,2.736],"cv28:8o0":[14.892,2.376],"cv28:8o1":[17.618,4.128],"cv28:10":[22.096,1.776],"cv28:12":[24.222,3.384]},"cv29":{"cv29:1":[0,1.488],"cv29:3":[1.838,2.496],"cv29:5o0":[4.684,1.848],"cv29:5o1":[6.882,2.016],"cv29:7":[9.248,2.496],"cv29:9":[12.094,1.416],"cv29:11":[13.86,2.376]},"cv30":{"cv30:1":[0,2.328],"cv30:3o0":[2.678,1.248],"cv30:3o0-1":[4.276,5.904],"cv30:3o1":[10.53,2.808],"cv30:3o1-1":[13.688,1.848],"cv30:5":[15.886,1.608],"cv30:8o0":[17.844,2.448],"cv30:8o1":[20.642,2.088],"cv30:10":[23.08,2.976]},"cv31":{"cv31:0":[0,3.048],"cv31:2":[3.398,1.104],"cv31:4":[4.852,3.816],"cv31:6":[9.018,3.264],"cv31:8":[12.632,1.368],"cv31:10":[14.35,2.544],"cv31:12o0":[17.244,2.184],"cv31:12o1":[19.778,2.448],"cv31:13":[22.576,2.784]},"cv32":{"cv32:1":[0,2.424],"cv32:3":[2.774,4.296],"cv32:5o0":[7.42,2.328],"cv32:5o1":[10.098,1.896],"cv32:7":[12.344,1.416],"cv32:9":[14.11,2.208],"cv32:11":[16.668,2.304],"cv32:14":[19.322,3.864]},"cv33":{"cv33:1":[0,1.776],"cv33:3":[2.126,1.896],"cv33:5":[4.372,2.256],"cv33:7":[6.978,1.224],"cv33:9":[8.552,1.584],"cv33:11":[10.486,1.176],"cv33:13":[12.012,2.328]},"cv34":{"cv34:1":[0,3.096],"cv34:3":[3.446,2.664],"cv34:5":[6.46,2.904],"cv34:7":[9.714,2.088],"cv34:9":[12.152,1.656],"cv34:11":[14.158,2.736],"cv34:13":[17.244,3.048],"cv34:14":[20.642,1.296],"cv34:16":[22.288,4.464]}},"despina":{"cv1":{"cv1:1":[0,1.416],"cv1:3":[1.766,0.864],"cv1:5":[2.98,1.656],"cv1:7":[4.986,1.608],"cv1:9o0":[6.944,0.864],"cv1:9o1":[8.158,1.176],"cv1:11":[9.684,1.896],"cv1:14":[11.93,2.568],"cv1:16":[14.848,1.008],"cv1:19":[16.206,1.128],"cv1:21":[17.684,2.688],"cv1:23":[20.722,1.008]},"cv16":{"cv16:1o0":[0,2.064],"cv16:1o1":[2.414,2.304],"cv16:1o2":[5.068,2.184],"cv16:3":[7.602,2.808],"cv16:5":[10.76,2.184],"cv16:7":[13.294,2.544],"cv16:9":[16.188,1.416],"cv16:11":[17.954,1.584],"cv16:13":[19.888,2.544],"cv16:15":[22.782,2.016],"cv16:17":[25.148,1.296],"cv16:19":[26.794,1.848],"cv16:21":[28.992,2.376],"cv16:23":[31.718,1.176],"cv16:25":[33.244,2.136]},"cv2":{"cv2:1":[0,2.424],"cv2:3":[2.774,3.048],"cv2:5":[6.172,2.304],"cv2:7":[8.826,1.104],"cv2:9":[10.28,2.064],"cv2:11o0":[12.694,1.536],"cv2:11o0-1":[14.58,2.016],"cv2:11o1":[16.946,1.464],"cv2:11o1-1":[18.76,1.824],"cv2:13":[20.934,2.064],"cv2:15":[23.348,1.584]},"cv3":{"cv3:1":[0,2.688],"cv3:3o0":[3.038,1.968],"cv3:3o1":[5.356,2.136],"cv3:6":[7.842,1.536],"cv3:8o0":[9.728,1.656],"cv3:8o1":[11.734,1.536],"cv3:10o0":[13.62,3.144],"cv3:10o1":[17.114,1.704],"cv3:13":[19.168,1.584],"cv3:15":[21.102,3.096],"cv3:17":[24.548,2.016],"cv3:20":[26.914,1.104],"cv3:22":[28.368,2.424]},"cv4":{"cv4:0":[0,1.008],"cv4:2":[1.358,1.128],"cv4:4o0":[2.836,1.344],"cv4:4o1":[4.53,1.008],"cv4:5":[5.888,0.888],"cv4:7":[7.126,1.536],"cv4:9":[9.012,2.568],"cv4:11":[11.93,1.368]},"cv5":{"cv5:1":[0,2.856],"cv5:3":[3.206,1.296],"cv5:5":[4.852,0.936],"cv5:7":[6.138,1.296],"cv5:9o0":[7.784,0.768],"cv5:9o0-1":[8.902,1.416],"cv5:9o1":[10.668,1.224],"cv5:10":[12.242,2.016],"cv5:12":[14.608,2.088],"cv5:14":[17.046,2.376]},"cv6":{"cv6:1":[0,2.568],"cv6:3":[2.918,1.008],"cv6:5o0":[4.276,1.728],"cv6:5o1":[6.354,1.704],"cv6:5o1-1":[8.408,1.536],"cv6:6":[10.294,1.296],"cv6:8":[11.94,1.896],"cv6:11":[14.186,1.848]},"cv7":{"cv7:1":[0,2.568],"cv7:3o0":[2.918,2.136],"cv7:3o1":[5.404,1.704],"cv7:5o0":[7.458,1.536],"cv7:5o1":[9.344,1.416],"cv7:5o2":[11.11,1.416],"cv7:7":[12.876,1.704],"cv7:9":[14.93,1.656],"cv7:11":[16.936,1.584]},"cv8":{"cv8:1":[0,2.616],"cv8:3":[2.966,1.536],"cv8:5o0":[4.852,1.416],"cv8:5o1":[6.618,1.704],"cv8:7":[8.672,0.744],"cv8:9":[9.766,1.824],"cv8:11":[11.94,1.896],"cv8:13":[14.186,1.728],"cv8:16o0":[16.264,1.488],"cv8:16o1":[18.102,1.128],"cv8:17":[19.58,0.768]},"cv9":{"cv9:1":[0,2.208],"cv9:3":[2.558,1.368],"cv9:5o0":[4.276,1.128],"cv9:5o1":[5.754,2.088],"cv9:7":[8.192,1.728],"cv9:9":[10.27,2.376],"cv9:11":[12.996,2.136],"cv9:13":[15.482,2.568]},"cv10":{"cv10:1":[0,2.544],"cv10:4":[2.894,2.256],"cv10:6":[5.5,1.008],"cv10:8o0":[6.858,1.968],"cv10:8o1":[9.176,2.184],"cv10:9":[11.71,2.136],"cv10:11":[14.196,2.736],"cv10:13":[17.282,2.328],"cv10:16":[19.96,1.176],"cv10:18":[21.486,2.496]},"cv11":{"cv11:1":[0,1.968],"cv11:3":[2.318,2.016],"cv11:5o0":[4.684,1.464],"cv11:5o0-1":[6.498,1.704],"cv11:5o0-3":[8.552,2.088],"cv11:5o1":[10.99,1.896],"cv11:5o1-1":[13.236,2.904],"cv11:7":[16.49,3.144],"cv11:9":[19.984,0.864],"cv11:11":[21.198,1.896],"cv11:13":[23.444,2.544],"cv11:15":[26.338,0.768]},"cv12":{"cv12:1":[0,1.536],"cv12:4":[1.886,1.896],"cv12:6":[4.132,1.704],"cv12:10":[6.186,2.736],"cv12:12":[9.272,1.944],"cv12:14":[11.566,2.208],"cv12:16o0":[14.124,1.104],"cv12:16o1":[15.578,1.416],"cv12:16o1-1":[17.344,2.064],"cv12:18":[19.758,1.536],"cv12:20":[21.644,2.304]},"cv13":{"cv13:1":[0,1.896],"cv13:3":[2.246,1.824],"cv13:5":[4.42,1.608],"cv13:7":[6.378,1.704],"cv13:9o0":[8.432,1.464],"cv13:9o1":[10.246,1.344],"cv13:11":[11.94,1.728],"cv13:13":[14.018,1.416]},"cv14":{"cv14:1":[0,2.928],"cv14:3":[3.278,1.296],"cv14:5":[4.924,1.776],"cv14:7":[7.05,1.968],"cv14:9o0":[9.368,2.856],"cv14:9o1":[12.574,1.368],"cv14:9o1-1":[14.292,1.464],"cv14:11":[16.106,2.208],"cv14:13":[18.664,1.416],"cv14:15":[20.43,1.464]},"cv15":{"cv15:2o0":[0,3.048],"cv15:2o0-1":[3.398,2.256],"cv15:2o1":[6.004,1.896],"cv15:4":[8.25,1.728],"cv15:6":[10.328,1.176],"cv15:8":[11.854,3.504],"cv15:10":[15.708,2.088],"cv15:12":[18.146,2.928]},"me2":{"me2:cv17:1~n":[0,1.296],"me2:cv2:1~n":[1.646,2.616],"me2:cv2:3~lt":[4.612,2.664],"me2:cv2:3~gb":[7.626,2.664],"me2:cv2:3~sc":[10.64,2.256],"me2:cv2:3~ie":[13.246,2.304],"me2:cv2:3~ca":[15.9,2.544],"me2:cv2:3~au":[18.794,3.408],"me2:cv2:3~de":[22.552,2.688],"me2:cv2:3~pl":[25.59,2.688],"me2:cv2:3~lv":[28.628,2.304],"me2:cv2:3~ua":[31.282,2.688],"me2:cv2:3~no":[34.32,3.168],"me2:cv2:3~se":[37.838,2.136],"me2:cv2:3~es":[40.324,2.544],"me2:cv2:3~fr":[43.218,2.664],"me2:cv2:3~it":[46.232,2.688],"me2:cv2:3~br":[49.27,3.096],"me2:cv2:3~mx":[52.716,2.448],"me2:cv2:3~in":[55.514,2.616],"me2:cv2:3~jp":[58.48,2.616],"me2:cv22:5~f":[61.446,2.064],"me2:cv22:22o1~f":[63.86,2.424],"me2:cv3:10o0~f":[66.634,3.816],"me2:cv23:23o0~lt":[70.8,2.376],"me2:cv23:23o0~gb":[73.526,2.616],"me2:cv23:23o0~sc":[76.492,2.328],"me2:cv23:23o0~ie":[79.17,2.376],"me2:cv23:23o0~ca":[81.896,2.424],"me2:cv23:23o0~au":[84.67,2.664],"me2:cv23:23o0~de":[87.684,2.496],"me2:cv23:23o0~pl":[90.53,2.736],"me2:cv23:23o0~lv":[93.616,2.328],"me2:cv23:23o0~ua":[96.294,2.808],"me2:cv23:23o0~no":[99.452,2.688],"me2:cv23:23o0~se":[102.49,2.688],"me2:cv23:23o0~es":[105.528,2.784],"me2:cv23:23o0~fr":[108.662,3.096],"me2:cv23:23o0~it":[112.108,2.448],"me2:cv23:23o0~br":[114.906,2.664],"me2:cv23:23o0~mx":[117.92,2.328],"me2:cv23:23o0~in":[120.598,2.688],"me2:cv23:23o0~jp":[123.636,3.216],"me2:cv27:14o0~f":[127.202,1.584],"me2:cv27:14o1~f":[129.136,1.656],"me2:cv31:6~lt":[131.142,2.976],"me2:cv31:6~gb":[134.468,2.616],"me2:cv31:6~sc":[137.434,2.856],"me2:cv31:6~ie":[140.64,2.376],"me2:cv31:6~ca":[143.366,2.856],"me2:cv31:6~au":[146.572,2.664],"me2:cv31:6~de":[149.586,2.328],"me2:cv31:6~pl":[152.264,2.616],"me2:cv31:6~lv":[155.23,2.376],"me2:cv31:6~ua":[157.956,2.976],"me2:cv31:6~no":[161.282,2.568],"me2:cv31:6~se":[164.2,2.424],"me2:cv31:6~es":[166.974,2.616],"me2:cv31:6~fr":[169.94,2.784],"me2:cv31:6~it":[173.074,2.448],"me2:cv31:6~br":[175.872,2.736],"me2:cv31:6~mx":[178.958,2.688],"me2:cv31:6~in":[181.996,2.688],"me2:cv31:6~jp":[185.034,2.928],"me2:cv34:5~lt":[188.312,2.448],"me2:cv34:5~gb":[191.11,2.688],"me2:cv34:5~sc":[194.148,2.448],"me2:cv34:5~ie":[196.946,2.736],"me2:cv34:5~ca":[200.032,2.856],"me2:cv34:5~au":[203.238,3.144],"me2:cv34:5~de":[206.732,2.328],"me2:cv34:5~pl":[209.41,2.616],"me2:cv34:5~lv":[212.376,2.424],"me2:cv34:5~ua":[215.15,3.144],"me2:cv34:5~no":[218.644,2.856],"me2:cv34:5~se":[221.85,2.544],"me2:cv34:5~es":[224.744,2.544],"me2:cv34:5~fr":[227.638,2.304],"me2:cv34:5~it":[230.292,3.144],"me2:cv34:5~br":[233.786,2.928],"me2:cv34:5~mx":[237.064,2.448],"me2:cv34:5~in":[239.862,2.688],"me2:cv34:5~jp":[242.9,2.784],"me2:cv10:8o0~f":[246.034,1.896]},"cv17":{"cv17:1":[0,1.416],"cv17:3":[1.766,2.208],"cv17:5":[4.324,1.848],"cv17:7":[6.522,3.744],"cv17:9":[10.616,1.848],"cv17:11o0":[12.814,1.296],"cv17:11o1":[14.46,1.968],"cv17:13":[16.778,1.848],"cv17:15":[18.976,2.376],"cv17:18":[21.702,1.656],"cv17:20":[23.708,1.776],"cv17:22":[25.834,2.448],"cv17:24":[28.632,2.136]},"cv18":{"cv18:1":[0,2.184],"cv18:3":[2.534,2.568],"cv18:5":[5.452,1.608],"cv18:7o0":[7.41,1.104],"cv18:7o1":[8.864,1.944],"cv18:10":[11.158,2.328],"cv18:12":[13.836,2.088],"cv18:14":[16.274,1.056],"cv18:16":[17.68,3.264],"cv18:18":[21.294,1.296]},"cv19":{"cv19:1":[0,1.176],"cv19:3":[1.526,1.656],"cv19:6":[3.532,0.744],"cv19:8":[4.626,1.056],"cv19:10":[6.032,1.704],"cv19:12o0":[8.086,3.504],"cv19:12o1":[11.94,3.048],"cv19:14":[15.338,1.464],"cv19:16":[17.152,2.376],"cv19:18":[19.878,2.376],"cv19:20":[22.604,2.328],"cv19:22":[25.282,2.376]},"cv20":{"cv20:1":[0,2.736],"cv20:3":[3.086,1.104],"cv20:5":[4.54,1.056],"cv20:7":[5.946,1.296],"cv20:9":[7.592,1.656],"cv20:13":[9.598,2.256],"cv20:16o0":[12.204,1.608],"cv20:16o1":[14.162,1.848],"cv20:18":[16.36,2.016]},"cv21":{"cv21:1":[0,1.896],"cv21:3":[2.246,1.944],"cv21:5":[4.54,2.496],"cv21:7o0":[7.386,1.128],"cv21:7o1":[8.864,1.224],"cv21:9":[10.438,1.776],"cv21:11":[12.564,2.616],"cv21:14":[15.53,2.136],"cv21:16":[18.016,2.496],"cv21:18":[20.862,1.296]},"cv22":{"cv22:1":[0,2.064],"cv22:3":[2.414,3.096],"cv22:5":[5.86,1.968],"cv22:7o0":[8.178,2.496],"cv22:7o1":[11.024,2.544],"cv22:9o0":[13.918,1.248],"cv22:9o0-1":[15.516,1.008],"cv22:9o1":[16.874,1.536],"cv22:9o1-1":[18.76,0.936],"cv22:12":[20.046,1.728],"cv22:14o0":[22.124,1.584],"cv22:14o1":[24.058,2.784],"cv22:16":[27.192,2.688],"cv22:20":[30.23,1.416],"cv22:22o0":[31.996,1.464],"cv22:22o1":[33.81,2.568],"cv22:25":[36.728,1.464],"cv22:27":[38.542,2.016]},"cv23":{"cv23:1":[0,2.808],"cv23:3":[3.158,1.968],"cv23:5":[5.476,1.104],"cv23:7":[6.93,1.224],"cv23:9":[8.504,3.024],"cv23:11":[11.878,1.056],"cv23:14":[13.284,3.336],"cv23:16":[16.97,1.896],"cv23:18":[19.216,1.128],"cv23:20":[20.694,1.368],"cv23:23o0":[22.412,2.784],"cv23:23o1":[25.546,2.664],"cv23:25":[28.56,1.608],"cv23:27":[30.518,1.224],"cv23:29":[32.092,2.616]},"cv24":{"cv24:1":[0,2.328],"cv24:3":[2.678,1.416],"cv24:5o0":[4.444,0.984],"cv24:5o1":[5.778,0.816],"cv24:6":[6.944,1.968],"cv24:8":[9.262,4.224],"cv24:10":[13.836,2.376],"cv24:12":[16.562,1.536],"cv24:14":[18.448,2.424]},"cv25":{"cv25:1":[0,1.104],"cv25:3":[1.454,1.008],"cv25:5":[2.812,1.416],"cv25:7":[4.578,1.296],"cv25:10o0":[6.224,1.704],"cv25:10o0-1":[8.278,1.224],"cv25:10o1":[9.852,1.536],"cv25:10o1-1":[11.738,1.464],"cv25:10o2":[13.552,1.176],"cv25:12o0":[15.078,1.848],"cv25:12o1":[17.276,1.488],"cv25:12o2":[19.114,1.176],"cv25:14":[20.64,1.224],"cv25:16":[22.214,1.008]},"cv26":{"cv26:1":[0,1.008],"cv26:3":[1.358,0.816],"cv26:5":[2.524,1.176],"cv26:7":[4.05,2.016],"cv26:10o0":[6.416,1.464],"cv26:10o0-1":[8.23,1.824],"cv26:10o1":[10.404,1.536],"cv26:11":[12.29,1.296],"cv26:15":[13.936,2.808]},"cv27":{"cv27:1":[0,2.448],"cv27:3":[2.798,2.976],"cv27:5":[6.124,1.056],"cv27:8o0":[7.53,2.184],"cv27:8o1":[10.064,2.568],"cv27:10":[12.982,3.048],"cv27:12":[16.38,1.128],"cv27:14o0":[17.858,1.464],"cv27:14o1":[19.672,1.656],"cv27:16":[21.678,1.296],"cv27:18":[23.324,1.584]},"cv28":{"cv28:1o0":[0,1.704],"cv28:1o1":[2.054,2.496],"cv28:1o1-1":[4.9,1.536],"cv28:3o0":[6.786,1.536],"cv28:3o1":[8.672,1.656],"cv28:5":[10.678,2.496],"cv28:8o0":[13.524,1.728],"cv28:8o1":[15.602,2.616],"cv28:10":[18.568,1.368],"cv28:12":[20.286,2.688]},"cv29":{"cv29:1":[0,1.896],"cv29:3":[2.246,1.728],"cv29:5o0":[4.324,1.248],"cv29:5o1":[5.922,1.824],"cv29:7":[8.096,2.376],"cv29:9":[10.822,1.488],"cv29:11":[12.66,1.968]},"cv30":{"cv30:1":[0,2.448],"cv30:3o0":[2.798,1.248],"cv30:3o0-1":[4.396,3.936],"cv30:3o1":[8.682,2.736],"cv30:3o1-1":[11.768,1.176],"cv30:5":[13.294,1.176],"cv30:8o0":[14.82,1.176],"cv30:8o1":[16.346,1.464],"cv30:10":[18.16,2.208]},"cv31":{"cv31:0":[0,2.856],"cv31:2":[3.206,1.104],"cv31:4":[4.66,3.096],"cv31:6":[8.106,2.328],"cv31:8":[10.784,1.176],"cv31:10":[12.31,2.496],"cv31:12o0":[15.156,2.184],"cv31:12o1":[17.69,1.848],"cv31:13":[19.888,2.544]},"cv32":{"cv32:1":[0,2.424],"cv32:3":[2.774,2.616],"cv32:5o0":[5.74,1.896],"cv32:5o1":[7.986,2.016],"cv32:7":[10.352,1.536],"cv32:9":[12.238,1.968],"cv32:11":[14.556,2.088],"cv32:14":[16.994,2.904]},"cv33":{"cv33:1":[0,1.416],"cv33:3":[1.766,1.176],"cv33:5":[3.292,1.896],"cv33:7":[5.538,1.416],"cv33:9":[7.304,1.464],"cv33:11":[9.118,1.248],"cv33:13":[10.716,2.304]},"cv34":{"cv34:1":[0,3.528],"cv34:3":[3.878,2.016],"cv34:5":[6.244,2.424],"cv34:7":[9.018,1.368],"cv34:9":[10.736,1.416],"cv34:11":[12.502,3.168],"cv34:13":[16.02,3.096],"cv34:14":[19.466,1.416],"cv34:16":[21.232,3.744]}},"charon":{"cv1":{"cv1:13":[0,1.968],"cv1:15":[2.318,1.008]},"cv8":{"cv8:0":[0,2.208],"cv8:2":[2.558,1.656],"cv8:4":[4.564,2.856],"cv8:5o1-0":[7.77,3.216],"cv8:6":[11.336,1.848],"cv8:8":[13.534,2.448],"cv8:10":[16.332,0.816],"cv8:12":[17.498,1.248],"cv8:15":[19.096,2.736],"cv8:16o0-0":[22.182,2.136],"cv8:16o1-0":[24.668,2.328]},"me2":{"me2:cv8:4~n":[0,2.304]}},"puck":{"cv2":{"cv2:0":[0,2.328],"cv2:2":[2.678,2.736],"cv2:4":[5.764,2.544],"cv2:6":[8.658,3.456],"cv2:8":[12.464,1.488],"cv2:10":[14.302,4.464],"cv2:11o0-0":[19.116,2.184],"cv2:11o1-0":[21.65,3.216],"cv2:12":[25.216,2.136],"cv2:14":[27.702,1.776]},"cv10":{"cv10:3":[0,2.736],"cv10:5":[3.086,2.208],"cv10:10":[5.644,2.544],"cv10:12":[8.538,1.536],"cv10:14":[10.424,2.784]},"cv13":{"cv13:0":[0,2.664],"cv13:2":[3.014,1.848],"cv13:4":[5.212,2.016],"cv13:6":[7.578,1.608],"cv13:8":[9.536,1.536],"cv13:9o0-0":[11.422,1.224],"cv13:9o1-0":[12.996,1.176],"cv13:10":[14.522,1.896],"cv13:12":[16.768,1.224]},"cv15":{"cv15:0":[0,3.048],"cv15:2o0-0":[3.398,1.344],"cv15:2o1-0":[5.092,1.104],"cv15:3":[6.546,4.296],"cv15:7":[11.192,1.536],"cv15:11":[13.078,1.464]},"me2":{"me2:cv18:9~n":[0,0.768],"me2:cv28:11~n":[1.118,0.984],"me2:cv10:3~n":[2.452,2.064],"me2:cv10:3~nf":[4.866,2.256],"me2:cv10:10~n":[7.472,1.584],"me2:cv15:2o1-0~n":[9.406,0.696]},"cv18":{"cv18:9":[0,1.344],"cv18:15":[1.694,1.128]},"cv21":{"cv21:0":[0,2.544],"cv21:2":[2.894,1.704],"cv21:4":[4.948,1.368],"cv21:6":[6.666,2.088],"cv21:7o0-0":[9.104,2.208],"cv21:7o1-0":[11.662,1.896],"cv21:8":[13.908,2.496],"cv21:10":[16.754,0.768],"cv21:13":[17.872,1.656],"cv21:15":[19.878,1.704],"cv21:17":[21.932,2.976]},"cv3":{"cv3:4":[0,2.376],"cv3:19":[2.726,1.128]},"cv25":{"cv25:0":[0,1.416],"cv25:2":[1.766,2.736],"cv25:4":[4.852,4.488],"cv25:6":[9.69,1.296],"cv25:8":[11.336,2.928],"cv25:9":[14.614,2.616],"cv25:10o0-0":[17.58,0.696],"cv25:10o1-0":[18.626,0.696],"cv25:10o2-0":[19.672,0.648],"cv25:11":[20.67,1.224],"cv25:12o0-0":[22.244,0.816],"cv25:12o1-0":[23.41,2.136],"cv25:12o2-0":[25.896,1.416],"cv25:13":[27.662,2.016],"cv25:15":[30.028,1.656]},"cv28":{"cv28:0":[0,3.336],"cv28:1o0-0":[3.686,3.096],"cv28:1o1-0":[7.132,1.848],"cv28:1o1-2":[9.33,2.856],"cv28:2":[12.536,4.776],"cv28:3o0-0":[17.662,1.848],"cv28:3o1-0":[19.86,2.016],"cv28:4":[22.226,1.776],"cv28:7":[24.352,2.448],"cv28:8o0-0":[27.15,1.008],"cv28:8o1-0":[28.508,1.776],"cv28:9":[30.634,3.528],"cv28:11":[34.512,1.536]},"cv29":{"cv29:0":[0,2.736],"cv29:2":[3.086,3.936],"cv29:4":[7.372,3.168],"cv29:5o0-0":[10.89,0.888],"cv29:5o1-0":[12.128,2.328],"cv29:6":[14.806,1.464],"cv29:8":[16.62,4.464],"cv29:10":[21.434,3.576]}},"aoede":{"cv3":{"cv3:0":[0,2.136],"cv3:2":[2.486,4.608],"cv3:3o0-0":[7.444,2.016],"cv3:3o1-0":[9.81,1.968],"cv3:5":[12.128,2.496],"cv3:7":[14.974,3.024],"cv3:8o0-0":[18.348,1.344],"cv3:8o1-0":[20.042,2.784],"cv3:9":[23.176,1.608],"cv3:10o0-0":[25.134,0.984],"cv3:10o1-0":[26.468,0.768],"cv3:12":[27.586,1.224],"cv3:14":[29.16,2.136],"cv3:16":[31.646,1.248],"cv3:18":[33.244,1.368],"cv3:21":[34.962,2.424]}},"algenib":{"cv4":{"cv4:1":[0,2.136],"cv4:3":[2.486,2.304],"cv4:4o0-0":[5.14,1.656],"cv4:4o1-0":[7.146,0.768],"cv4:6":[8.264,1.488],"cv4:8":[10.102,4.824],"cv4:10":[15.276,1.248]}},"gacrux":{"cv5":{"cv5:0":[0,2.448],"cv5:2":[2.798,3.264],"cv5:4":[6.412,2.544],"cv5:6":[9.306,2.016],"cv5:8":[11.672,2.136],"cv5:9o0-0":[14.158,3.288],"cv5:9o0-2":[17.796,2.256],"cv5:9o1-0":[20.402,2.616],"cv5:11":[23.368,1.296],"cv5:13":[25.014,2.208]}},"sulafat":{"cv9":{"cv9:0":[0,2.544],"cv9:2":[2.894,2.136],"cv9:4":[5.38,1.896],"cv9:5o0-0":[7.626,1.536],"cv9:5o1-0":[9.512,1.584],"cv9:6":[11.446,4.248],"cv9:8":[16.044,3.936],"cv9:10":[20.33,1.296],"cv9:12":[21.976,1.296]}},"leda":{"cv12":{"cv12:0":[0,2.568],"cv12:3":[2.918,1.656],"cv12:5":[4.924,0.888],"cv12:7":[6.162,2.904],"cv12:9":[9.416,0.768],"cv12:11":[10.534,1.368],"cv12:13":[12.252,1.224],"cv12:15":[13.826,2.256],"cv12:16o1-0":[16.432,2.616],"cv12:17":[19.398,2.568],"cv12:19":[22.316,2.256]}},"laomedeia":{"cv17":{"cv17:0":[0,3.576],"cv17:2":[3.926,3.216],"cv17:4":[7.492,3.216],"cv17:6":[11.058,2.976],"cv17:8":[14.384,1.968],"cv17:10":[16.702,1.224],"cv17:11o0-0":[18.276,1.296],"cv17:11o1-0":[19.922,2.568],"cv17:12":[22.84,4.056],"cv17:14":[27.246,2.016],"cv17:17":[29.612,2.736],"cv17:19":[32.698,3.288],"cv17:21":[36.336,2.016],"cv17:23":[38.702,2.496]},"me2":{"me2:cv17:0~n":[0,3.144]},"cv27":{"cv27:0":[0,3.864],"cv27:2":[4.214,2.808],"cv27:4":[7.372,6.768],"cv27:6":[14.49,0.816],"cv27:7":[15.656,1.416],"cv27:8o0-0":[17.422,2.928],"cv27:8o1-0":[20.7,1.536],"cv27:9":[22.586,2.544],"cv27:11":[25.48,2.424],"cv27:13":[28.254,2.376],"cv27:14o0-0":[30.98,1.224],"cv27:14o1-0":[32.554,1.848],"cv27:17":[34.752,2.376]}},"schedar":{"cv19":{"cv19:2":[0,1.944],"cv19:4":[2.294,0.864],"cv19:7":[3.508,0.936],"cv19:9":[4.794,2.496],"cv19:11":[7.64,3.096],"cv19:12o0-0":[11.086,2.784],"cv19:12o1-0":[14.22,1.584],"cv19:13":[16.154,1.248],"cv19:15":[17.752,5.376],"cv19:17":[23.478,2.616],"cv19:19":[26.444,3.744],"cv19:21":[30.538,2.544]}},"vindemiatrix":{"cv20":{"cv20:0":[0,2.544],"cv20:2":[2.894,2.208],"cv20:4":[5.452,2.856],"cv20:6":[8.658,4.488],"cv20:8":[13.496,3.264],"cv20:10":[17.11,3.096],"cv20:12":[20.556,2.424],"cv20:14":[23.33,1.248],"cv20:15":[24.928,2.736],"cv20:16o0-0":[28.014,2.568],"cv20:16o1-0":[30.932,2.496],"cv20:17":[33.778,2.736]}},"alnilam":{"cv22":{"cv22:4":[0,2.784],"cv22:8":[3.134,2.424],"cv22:9o0-0":[5.908,2.544],"cv22:9o1-0":[8.802,3.048],"cv22:13":[12.2,2.016],"cv22:14o0-0":[14.566,3.264],"cv22:14o1-0":[18.18,2.544],"cv22:19":[21.074,1.824],"cv22:21":[23.248,2.376],"cv22:22o0-0":[25.974,1.224],"cv22:22o1-0":[27.548,2.256],"cv22:26":[30.154,3.936]},"me2":{"me2:cv22:4~f":[0,2.568],"me2:cv22:13~n":[2.918,1.824],"me2:cv22:26~n":[5.092,4.248]}},"erinome":{"cv23":{"cv23:0":[0,2.496],"cv23:2":[2.846,2.664],"cv23:4":[5.86,0.864],"cv23:6":[7.074,1.368],"cv23:8":[8.792,1.248],"cv23:10":[10.39,1.008]}},"fenrir":{"cv23":{"cv23:13":[0,2.136],"cv23:15":[2.486,2.496],"cv23:17":[5.332,1.344],"cv23:19":[7.026,1.704],"cv23:22":[9.08,1.704],"cv23:23o0-0":[11.134,2.208],"cv23:23o1-0":[13.692,3.096],"cv23:24":[17.138,1.848],"cv23:26":[19.336,3.024],"cv23:28":[22.71,2.664]}},"autonoe":{"cv24":{"cv24:0":[0,2.328],"cv24:2":[2.678,3.744],"cv24:4":[6.772,1.704],"cv24:5o0-0":[8.826,2.136],"cv24:5o1-0":[11.312,2.328],"cv24:7":[13.99,2.616],"cv24:9":[16.956,5.424],"cv24:11":[22.73,2.328],"cv24:13":[25.408,2.904]}},"callirrhoe":{"cv26":{"cv26:0":[0,1.848],"cv26:2":[2.198,2.784],"cv26:4":[5.332,1.536],"cv26:6":[7.218,4.296],"cv26:8":[11.864,1.848],"cv26:9":[14.062,2.496],"cv26:10o0-0":[16.908,2.016],"cv26:10o1-0":[19.274,0.816],"cv26:12":[20.44,1.848],"cv26:14":[22.638,2.376]}},"pulcherrima":{"cv31":{"cv31:1":[0,3.264],"cv31:3":[3.614,1.968],"cv31:5":[5.932,3.576],"cv31:7":[9.858,2.904],"cv31:9":[13.112,3.024],"cv31:11":[16.486,4.536],"cv31:12o0-0":[21.372,3.336],"cv31:12o1-0":[25.058,2.376]}},"zephyr":{"cv32":{"cv32:0":[0,2.496],"cv32:2":[2.846,1.248],"cv32:4":[4.444,1.608],"cv32:5o0-0":[6.402,0.768],"cv32:5o1-0":[7.52,1.176],"cv32:6":[9.046,2.736],"cv32:8":[12.132,2.424],"cv32:10":[14.906,2.136],"cv32:13":[17.392,1.008]}},"sadachbia":{"cv33":{"cv33:0":[0,2.616],"cv33:2":[2.966,1.848],"cv33:4":[5.164,1.728],"cv33:6":[7.242,3.768],"cv33:8":[11.36,2.976],"cv33:10":[14.686,1.488],"cv33:12":[16.524,1.656]}},"achird":{"cv34":{"cv34:0":[0,5.016],"cv34:2":[5.366,2.736],"cv34:4":[8.452,2.976],"cv34:6":[11.778,3.144],"cv34:8":[15.272,1.248],"cv34:10":[16.87,5.928],"cv34:12":[23.148,2.544],"cv34:15":[26.042,6.336],"cv34:17":[32.728,2.904]}}};

/* ===================== ABOUT ME: SENTENCE BANK ===================== */
/* "About me" lessons: the learner picks answers about their own life and the app builds their introduction.
   Every sentence is fixed here (only the name is typed in), so each one is checked Lithuanian with its own
   recording (audio group me1). Where men and women say it differently, the forms are given as [man, woman]. */
const ME_COUNTRIES=[['lt','Lithuania','Lietuvos','Lietuvoje'],['us','America','Amerikos','Amerikoje'],['gb','England','Anglijos','Anglijoje'],['sc','Scotland','Škotijos','Škotijoje'],
  ['ie','Ireland','Airijos','Airijoje'],['ca','Canada','Kanados','Kanadoje'],['au','Australia','Australijos','Australijoje'],['de','Germany','Vokietijos','Vokietijoje'],
  ['pl','Poland','Lenkijos','Lenkijoje'],['lv','Latvia','Latvijos','Latvijoje'],['ua','Ukraine','Ukrainos','Ukrainoje'],['no','Norway','Norvegijos','Norvegijoje'],
  ['se','Sweden','Švedijos','Švedijoje'],['es','Spain','Ispanijos','Ispanijoje'],['fr','France','Prancūzijos','Prancūzijoje'],['it','Italy','Italijos','Italijoje'],
  ['br','Brazil','Brazilijos','Brazilijoje'],['mx','Mexico','Meksikos','Meksikoje'],['in','India','Indijos','Indijoje'],['jp','Japan','Japonijos','Japonijoje']];
const ME_CITIES=[['vilnius','Vilnius','Vilniuje'],['kaunas','Kaunas','Kaune'],['klaipeda','Klaipėda','Klaipėdoje'],['london','London','Londone'],['dublin','Dublin','Dubline'],
  ['berlin','Berlin','Berlyne'],['paris','Paris','Paryžiuje'],['newyork','New York','Niujorke'],['chicago','Chicago','Čikagoje'],['oslo','Oslo','Osle']];
const ME_JOBS=[['teacher','a teacher','mokytojas','mokytoja'],['student','a student','studentas','studentė'],['doctor','a doctor','gydytojas','gydytoja'],['nurse','a nurse','slaugytojas','slaugytoja'],
  ['engineer','an engineer','inžinierius','inžinierė'],['programmer','a programmer','programuotojas','programuotoja'],['driver','a driver','vairuotojas','vairuotoja'],['cook','a cook','virėjas','virėja'],
  ['builder','a builder','statybininkas','statybininkė'],['seller','a shop assistant','pardavėjas','pardavėja'],['accountant','an accountant','buhalteris','buhalterė'],['manager','a manager','vadybininkas','vadybininkė'],
  ['mechanic','a mechanic','mechanikas','mechanikė'],['farmer','a farmer','ūkininkas','ūkininkė'],['artist','an artist','menininkas','menininkė'],['home','a homemaker','namų šeimininkas','namų šeimininkė'],
  ['retired','retired','pensininkas','pensininkė'],['unemployed','out of work','bedarbis','bedarbė']];
const ME_WORK=[['office','in an office','biure'],['home','from home','iš namų'],['hospital','in a hospital','ligoninėje'],['shop','in a shop','parduotuvėje'],['school','at a school','mokykloje'],
  ['factory','in a factory','gamykloje'],['warehouse','in a warehouse','sandėlyje'],['restaurant','in a restaurant','restorane'],['bank','in a bank','banke'],['farm','on a farm','ūkyje'],['university','at a university','universitete']];
const ME_PARTNER=[['married',"I'm married",['Aš esu vedęs','Aš esu ištekėjusi']],['single',"I'm single",['Aš esu nevedęs','Aš esu netekėjusi']],['wife','I have a wife','Aš turiu žmoną'],
  ['husband','I have a husband','Aš turiu vyrą'],['gf','I have a girlfriend','Aš turiu draugę'],['bf','I have a boyfriend','Aš turiu draugą']];
const ME_KIDS=[['none',"I don't have children",'Aš neturiu vaikų'],['son','I have a son','Aš turiu sūnų'],['daughter','I have a daughter','Aš turiu dukrą'],['sd','I have a son and a daughter','Aš turiu sūnų ir dukrą'],
  ['two','I have two children','Aš turiu du vaikus'],['three','I have three children','Aš turiu tris vaikus'],['four','I have four children','Aš turiu keturis vaikus']];
const ME_SIBS=[['none',"I don't have brothers or sisters",'Aš neturiu brolių ar seserų'],['brother','I have a brother','Aš turiu brolį'],['sister','I have a sister','Aš turiu seserį'],
  ['both','I have a brother and a sister','Aš turiu brolį ir seserį'],['brothers','I have two brothers','Aš turiu du brolius'],['sisters','I have two sisters','Aš turiu dvi seseris']];
const ME_PETS=[['dog','I have a dog','Aš turiu šunį'],['cat','I have a cat','Aš turiu katę'],['both','I have a dog and a cat','Aš turiu šunį ir katę']];
const ME_LIKES=[['read','to read','skaityti'],['travel','to travel','keliauti'],['cook','to cook','gaminti'],['sport','to work out','sportuoti'],['basketball','to play basketball','žaisti krepšinį'],
  ['football','to play football','žaisti futbolą'],['films','to watch films','žiūrėti filmus'],['music','to listen to music','klausytis muzikos'],['fish','to fish','žvejoti'],['walk','to go for walks','vaikščioti'],
  ['dance','to dance','šokti'],['sing','to sing','dainuoti'],['draw','to draw','piešti'],['games','to play video games','žaisti kompiuterinius žaidimus'],['garden','to work in the garden','dirbti sode'],['swim','to swim','plaukti']];
const ME_WHY=[['family','My family is from Lithuania','Mano šeima yra iš Lietuvos'],['trip',"I'm going to Lithuania",'Aš važiuosiu į Lietuvą'],['wife','My wife is Lithuanian','Mano žmona yra lietuvė'],
  ['husband','My husband is Lithuanian','Mano vyras yra lietuvis'],['gf','My girlfriend is Lithuanian','Mano draugė yra lietuvė'],['bf','My boyfriend is Lithuanian','Mano draugas yra lietuvis'],
  ['friends','My friends are Lithuanian','Mano draugai yra lietuviai'],['love','I like Lithuania','Man patinka Lietuva'],['languages','I like learning languages','Man patinka mokytis kalbų']];
/* Every sentence the About me lessons can use. The changing word also gets a "Built from" meaning. */
function meBank(){const b=[['name','My name is…','Mano vardas'],['learn',"I'm learning Lithuanian",'Aš mokausi lietuvių kalbos'],['nice','Nice to meet you!','Malonu susipažinti!']];
  const gloss=(lt,en)=>{const k=norm(lt);if(!k.includes(' ')&&!GLUE[k])GLUE[k]=en;};
  ME_COUNTRIES.forEach(c=>{b.push(['from-'+c[0],"I'm from "+c[1],'Aš esu iš '+c[2]]);b.push(['live-'+c[0],'I live in '+c[1],'Aš gyvenu '+c[3]]);gloss(c[2],c[1]);gloss(c[3],'in '+c[1]);});
  ME_CITIES.forEach(c=>{b.push(['live-'+c[0],'I live in '+c[1],'Aš gyvenu '+c[2]]);gloss(c[2],'in '+c[1]);});
  ME_JOBS.forEach(j=>{b.push(['job-'+j[0]+'-m',"I'm "+j[1],'Aš esu '+j[2]]);b.push(['job-'+j[0]+'-f',"I'm "+j[1],'Aš esu '+j[3]]);gloss(j[2],j[1].replace(/^an? /,''));gloss(j[3],j[1].replace(/^an? /,''));});
  ME_WORK.forEach(w=>{b.push(['work-'+w[0],'I work '+w[1],'Aš dirbu '+w[2]]);gloss(w[2],w[1]);});
  [['partner',ME_PARTNER],['kids',ME_KIDS],['sib',ME_SIBS],['pet',ME_PETS],['why',ME_WHY]].forEach(([k,list])=>list.forEach(o=>{
    if(Array.isArray(o[2])){b.push([k+'-'+o[0]+'-m',o[1],o[2][0]]);b.push([k+'-'+o[0]+'-f',o[1],o[2][1]]);}else b.push([k+'-'+o[0],o[1],o[2]]);}));
  ME_LIKES.forEach(l=>{b.push(['like-'+l[0],'I like '+l[1],'Aš mėgstu '+l[2]]);gloss(l[2],l[1]);});
  return b.map(([k,en,lt])=>({id:'me1:'+k,lt,en,alt:[],me:true}));}
const ME_BANK=meBank();const ME_BY={};ME_BANK.forEach(i=>ME_BY[i.id]=i);
/* Before the About me lessons: what's special about talking about yourself in Lithuanian. */
const ME_TIP='Every sentence here is about <b>you</b>. '+
      'You can start with <b>Aš</b> (I) or leave it out: <b>Aš esu iš Anglijos</b> and <b>Esu iš Anglijos</b> are both right, because the ending of the doing word already says who.<br><br>'+
      'Watch how a place changes its ending: <b>Lietuva</b> becomes <b>iš Lietuvos</b> (from Lithuania) and <b>Lietuvoje</b> (in Lithuania).';

/* Things I can do in real life (each line finishes "I can ..."). Each skill lists the lessons whose words it needs (lesson ids before the
   bite-size split), and the conversation that rehearses it. It is earned once every one of those words is mastered. */
const CANDO=[
 ['greet','👋','greet people and say goodbye',['u1a','u1b'],'cv1'],
 ['stuck','🆘','say I don\'t understand and ask for help',['u21b','u8c','u13a']],
 ['intro','🙋','introduce myself and say where I\'m from',['u1c','u20a'],'cv2'],
 ['howru','💬','ask how someone is, and answer',['u21a'],'cv7'],
 ['nums','🔢','count, and understand prices',['u2a','u2b','u2c']],
 ['time','🗓️','talk about days and times',['u7a','u7b','u23b']],
 ['day','☀️','describe my day',['u28a','u28b','u28c'],'cv11'],
 ['cafe','☕','order at a café',['u3a','u3c'],'cv3'],
 ['table','🍲','eat at someone\'s home',['u3b','u3d'],'cv22'],
 ['eat','🍽️','eat out at a restaurant',['u15a','u15b','u15c'],'cv10'],
 ['way','🧭','ask the way and follow directions',['u9a','u9b','u13b'],'cv4'],
 ['ride','🚌','take a bus, train or taxi',['u14a','u14b','u14c'],'cv23'],
 ['shop','🛒','shop at a market',['u16a','u16b','u16c'],'cv5'],
 ['clothes','🧥','buy clothes that fit',['u29a','u29b'],'cv12'],
 ['people','🧑','describe someone I know',['u30a','u30c'],'cv25'],
 ['family','👨‍👩‍👧','talk about my family',['u4a','u25a']],
 ['work','💼','talk about my work',['u20b','u31b'],'cv26'],
 ['home','🏠','visit someone\'s home',['u32a','u32c'],'cv27'],
 ['lost','🧳','describe something I lost',['u5a','u5b','u30c'],'cv24'],
 ['likes','🎵','say what I like doing',['u22a','u22b'],'cv7'],
 ['favour','🤝','offer help, or say I can\'t',['u33a','u33b'],'cv28'],
 ['plans','🤝','make plans with a friend',['u23a','u33a'],'cv6'],
 ['future','🏖️','talk about my holiday plans',['u34a','u34b','u34c'],'cv13'],
 ['past','📖','say what I did yesterday',['u36a','u36b','u37a'],'cv14'],
 ['excuse','⏰','explain why I\'m late',['u36a','u36c'],'cv30'],
 ['because','🔗','give reasons with because, but and though',['u35a','u35b','u35c'],'cv29'],
 ['hotel','🏨','check in to a hotel',['u17a','u17b'],'cv8'],
 ['ill','💊','explain that I feel unwell',['u40b','u18c'],'cv9'],
 ['help','🚨','get help in an emergency',['u18a','u18b'],'cv33'],
 ['opinion','🗣️','give my opinion',['u38a','u38b','u38c'],'cv15'],
 ['chat','🔁','keep a conversation going',['u39a','u39b'],'cv34'],
 ['doctor','🩺','tell a doctor what\'s wrong',['u40a','u40b'],'cv32'],
 ['trip','🌊','find my way in a new town',['u10a','u10b'],'cv31'],
];

/* ===================== ANSWER FEEDBACK ===================== */
/* Replies that mean the same thing all count: answer "Labas rytas!" with "Labas!" and Rūta is just as happy.
   Swaps work piece by piece, so "Laba diena! Ne, ačiū." also accepts "Labas! Ne, ačiū." (Not across times of day.) */
const ALSO={'labas':['Sveiki'],'sveiki':['Labas'],'labas rytas':['Labas','Sveiki'],'laba diena':['Labas','Sveiki'],'labas vakaras':['Labas','Sveiki'],
  'viso gero':['Iki','Iki pasimatymo'],'iki':['Viso gero','Iki pasimatymo'],'iki pasimatymo':['Viso gero','Iki'],'ačiū':['Labai ačiū'],'labai ačiū':['Ačiū']};
/* Why a typed word was wrong. Most beginner mistakes in Lithuanian are word endings, so endings get the most help. */
const MARK_SOUND={'č':'"ch" as in church','š':'"sh" as in shop','ž':'the "s" in measure','ė':'a long "ay"','ū':'a long "oo"','ą':'a long "ah"','ę':'a long "eh"','į':'a long "ee"','ų':'a long "oo"'};
const WHO_WORDS=['aš','tu','mes','jūs'];
/* (Round 8) examples in a Why note: only those whose words you've had a New word card for (the app says which, through
   exTaught), so a note never shows a word you haven't met. lead goes in front of the first one. */
function EXS(pairs,lead){const ok=pairs.filter(p=>typeof exTaught!=='function'||exTaught(p[0]));return ok.length?(lead===undefined?', like ':lead)+ok.map(p=>'<b>'+p[0]+'</b>'+(p[1]?' ('+p[1]+')':'')).join(', '):'';}
/* how long or how many times: dar kartą, visą dieną (not a thing acted on) */
const TIME_ACC=['kartą','savaitę','valandą','minutę','akimirką','sekundę','visą'];
function marksNote(g,t){const a=[...g],b=[...t];for(let i=0;i<b.length;i++)if(a[i]!==b[i]){const c=b[i],end=i===b.length-1;
    if(end&&['labą','rytą','dieną','vakarą','naktį'].includes(t.toLowerCase()))return 'Said as a wish ("I wish you a good morning"), a greeting ends in <b>-ą</b> on both words: <b>labą rytą</b>, <b>labą dieną</b>.';
    if(end&&TIME_ACC.includes(t.toLowerCase()))return 'The <b>'+c+'</b> at the end matters: times take this ending'+EXS([['dar kartą','one more time'],['visą dieną','all day']])+'.';
    if(end&&'ąęį'.includes(c))return 'The <b>'+c+'</b> at the end matters: it marks the thing being acted on (what you drink, want, see or buy).';
    if(end&&c==='ų')return 'The <b>ų</b> at the end matters: it is the "of" form, used after numbers and "no".';
    if(MARK_SOUND[c])return '<b>'+c+'</b> sounds like '+MARK_SOUND[c]+', so it is a different letter from plain <b>'+esc(strip(c))+'</b>.';
    if(MARK_SOUND[a[i]])return 'Here it is a plain <b>'+esc(c)+'</b>, not <b>'+a[i]+'</b> ('+MARK_SOUND[a[i]]+').';
    return '';}return '';}
function endingWhy(g,t,prev,next){const sg=strip(g),st=strip(t);const end=t.slice(Math.min(sameStart(sg,st),t.length-1));
  const head='<b>'+esc(g)+'</b> → <b>'+esc(t)+'</b>. ';
  if(st.startsWith('ne')&&!sg.startsWith('ne'))return head+'<b>ne</b> glued to the front makes it "not".';
  if(sg.startsWith('ne')&&!st.startsWith('ne'))return head+'This one isn\'t "not", so it has no <b>ne</b> in front.';
  const mf=(m,f)=>(m.endsWith('as')&&(f===m.slice(0,-1)||f===m.slice(0,-2)+'e'))||((m.endsWith('is')||m.endsWith('ys'))&&f===m.slice(0,-2)+'e')||(m.endsWith('ius')&&f===m.slice(0,-3)+'e');
  const nx=next?strip(next):'',ng=nx.length>2&&glossOf(next)?(/(as|is|ys|us)$/.test(nx)?'he':/(a|e)$/.test(nx)?'her':''):'';
  const real=knownWord(g);
  if(real&&mf(sg,st)&&ng==='her')return head+'<b>'+esc(next)+'</b> is a "her" word, so <b>'+esc(g)+'</b> becomes <b>'+esc(t)+'</b>.';
  if(real&&mf(st,sg)&&ng==='he')return head+'<b>'+esc(next)+'</b> is a "he" word, so it stays <b>'+esc(t)+'</b>.';
  if(real&&mf(sg,st))return head+'<b>'+esc(g)+'</b> is the form a man uses; here it’s the woman’s form, <b>'+esc(t)+'</b>.';
  if(real&&mf(st,sg))return head+'<b>'+esc(g)+'</b> is the form a woman uses; here it’s the man’s form, <b>'+esc(t)+'</b>.';
  const mg=glossOf(g),mt=glossOf(t);
  if(mg&&mt&&mg!==mt)return head+'<b>'+esc(g)+'</b> means "'+esc(mg)+'", but here you need "'+esc(mt)+'".';
  const p=norm(prev||'');
  const who={'aš':['I','u'],'tu':['you','i'],'mes':['we','me'],'jūs':['you (polite)','te']}[p];
  if(who&&st.endsWith(who[1]))return head+'After <b>'+p+'</b> ('+who[0]+') the doing word ends in <b>-'+who[1]+'</b>.';
  if(['noriu','norėčiau','nori','norite','prašau'].includes(p)&&/(os|o|ių|ų|ės|ies)$/.test(t))return head+'After <b>'+p+'</b>, food and drink take the "some" ending'+EXS([['noriu kavos','I want some coffee']])+'.';
  if(p==='su')return head+'After <b>su</b> (with), the word takes its "with" ending.';
  if(p==='į')return head+'After <b>į</b> (to, into), the word takes its "to" ending: -ą, -ę, -į or -ų.';
  if(p==='iš'&&typeof properNoun==='function'&&properNoun(t))return head+'After <b>iš</b> (from), the place takes its "from" ending'+EXS([['iš Amerikos','from America'],['iš Lietuvos','from Lithuania']])+'.';
  if(['iš','be','nuo','iki','prie'].includes(p))return head+'After <b>'+p+'</b>, the word takes its "of / from" ending'+EXS([['iš Amerikos','from America'],['iš Lietuvos','from Lithuania']])+'.';
  if(p==='nėra'||(p.startsWith('ne')&&p.length>3&&/(os|o|ių|ų|ės|ies)$/.test(t)))return head+'After a "not" word, the thing takes its "of" ending'+EXS([['Aš nevalgau mėsos','I don\'t eat meat'],['Neturiu kavos','I have no coffee']])+'.';
  if(/(oje|yje|uje|ėje)$/.test(t))return head+'This ending means "in / at" a place'+EXS([['Lietuvoje','in Lithuania'],['Vilniuje','in Vilnius']])+'.';
  if(TIME_ACC.includes(t.toLowerCase()))return head+'Times take the ending <b>-'+t.slice(-1)+'</b>'+EXS([['dar kartą','one more time'],['visą dieną','all day']])+'.';
  if(/[ąęį]$/.test(t))return head+'The ending <b>-'+t.slice(-1)+'</b> marks the thing being acted on: what you drink, want, see or buy.';
  return head+'Same word, different ending. Lithuanian changes the end of a word to show its job in the sentence; here it ends in <b>-'+esc(end)+'</b>.';}

/* ===================== PRONUNCIATION GUIDE ===================== */
const GUIDE_HTML=`<div class="card">
      <h2>Reading "sounds like"</h2>
      <p class="note">Plain English spelling, split into syllables. The bolder syllable is the one you stress. Each spelling below always means the same sound.</p>
      <div class="sounds">
        <div><b>ah</b><span>as in f<i>a</i>ther</span></div>
        <div><b>e, eh</b><span>as in b<i>e</i>t</span></div>
        <div><b>ay</b><span>as in d<i>ay</i></span></div>
        <div><b>i</b><span>as in b<i>i</i>t, only before a consonant: <i>min, ish</i></span></div>
        <div><b>ee</b><span>as in s<i>ee</i>. A Lithuanian i at the end of a syllable is a quick "ee": <i>su see pah</i></span></div>
        <div><b>oh</b><span>as in g<i>o</i></span></div>
        <div><b>u</b><span>as in p<i>u</i>t</span></div>
        <div><b>oo</b><span>as in m<i>oo</i>n</span></div>
        <div><b>ih</b><span>a short, light "i", as in b<i>i</i>t. The verb ending -ti: <i>zhin tih</i></span></div>
        <div><b>ow</b><span>always as in c<i>ow</i>, never as in "show": <i>prah-SHAU</i> rhymes with "now"</span></div>
        <div><b>ai</b><span>as in <i>ai</i>sle, the "eye" sound. Taip and kaip are written TYPE and KYPE: they rhyme with "type"</span></div>
        <div><b>y</b><span>always as in <i>y</i>es: yah, yeh, yoh, yu. (The Lithuanian letter y is a different thing: a long "ee".)</span></div>
        <div><b>yeh</b><span>how we write the Lithuanian <i>ie</i> after a consonant: <i>pienas</i> is PYEH-nahs. After j it is just yeh: <i>Jie</i> is YEH</span></div>
        <div><b>zh</b><span>as in mea<i>s</i>ure</span></div>
        <div><b>ts</b><span>as in ca<i>ts</i></span></div>
      </div>
    </div>
    <div class="card">
      <h2>Lithuanian letters</h2>
      <p class="note">Lithuanian is written the way it sounds. Learn the letters below and you can read almost anything.</p>
      <div class="sounds">
        <div><b>ą ę į ų</b><span>long vowels (the hook used to mean a nasal sound; today it only marks length): <i>žąsis, pinigų</i></span></div>
        <div><b>ė</b><span>a closed "e", like the vowel in "they" without the glide: <i>tėtis, mėsa</i></span></div>
        <div><b>ū, y</b><span>long "oo" and long "ee": <i>sūris, vynas</i></span></div>
        <div><b>č š ž</b><span>"ch", "sh", and the "s" in "measure": <i>čia, šuo, žalias</i></span></div>
        <div><b>c</b><span>always "ts": <i>cukrus</i></span></div>
        <div><b>j</b><span>like English "y": <i>jūra, ji</i></span></div>
        <div><b>r</b><span>rolled, as in Spanish: <i>rytas</i></span></div>
      </div>
    </div>
    <div class="card">
      <h2>Two letters, one sound</h2>
      <p class="note">These pairs glide from one sound into the next in a single beat.</p>
      <div class="sounds">
        <div><b>ai</b><span>"eye": <i>taip</i> (TYPE), <i>labai</i> (lah-BAI)</span></div>
        <div><b>ei</b><span>"ay" as in day: <i>reikia</i> (RAY-kyah)</span></div>
        <div><b>au</b><span>"ow" as in cow: <i>prašau</i> (prah-SHAU)</span></div>
        <div><b>ie</b><span>"yeh" after a consonant, one beat: <i>pienas</i> (PYEH-nahs), <i>Lietuva</i></span></div>
        <div><b>uo</b><span>"oo" sliding into "oh", one beat, like "wo" in "won't": <i>šuo, duona</i></span></div>
        <div><b>ui</b><span>"oo" sliding into "ee", like a quick "gooey": <i>puikiai</i></span></div>
        <div><b>ia, iu, io</b><span>the i isn't a sound of its own: it softens the letter before it. <i>čia</i> is CHAH, <i>ačiū</i> is AH-choo, <i>kiek</i> is KYEHK. After a consonant, <i>-iai</i> at the end is "ay": <i>puikiai</i></span></div>
      </div>
    </div>
    <div class="card">
      <h2>Soft letters and moving stress</h2>
      <div class="sounds">
        <div><b>soft</b><span>a consonant before i, e, ė, ę, y or į is said with the tongue raised, as if a tiny "y" followed: <i>kiek, gėlė</i>. You don't need to force it: say the y lightly</span></div>
        <div><b>stress</b><span>it can move when a word changes: <i>Labas</i> is LAH-bahs, but in <i>Laba diena</i> it is lah-BAH. There is no rule to learn: follow the bold syllable in each "sounds like"</span></div>
      </div>
    </div>`;
