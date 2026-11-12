// Pattern cards introduce only forms already present by the unit's first lesson.
const patterns={};
function pattern(u,name,rows,note){patterns[u]={name,rows,note};}
pattern('u22','Identity and location',[[['Yo','who'],['soy','identity']],[['Yo','who'],['estoy','state or location']]],'Compare the two meanings of “to be”. Neither simply means permanent versus temporary.');
// The second location form is introduced later in this unit, so its pattern is shown with the completed unit's reference table instead.
patterns.u22.rows.pop();
pattern('u23','Who does it',[[['Yo','who'],['trabajo','does'],['aquí','where']],[['Tú','who'],['trabajas','does'],['aquí','where']]],'The verb ending changes with the subject.');
pattern('u24','A question word first',[[['¿Quién','ask'],['es?','is']],[['¿Dónde','ask'],['estás?','are']]],'Choose the question word for the information you need.');
pattern('u25','Where you are from',[[['Soy','am'],['de','from'],['México','where']]],'Use the origin word before the country name.');
pattern('u26','An action involving yourself',[[['Me','myself'],['levanto','does']],[['Me','myself'],['visto','does']]],'Keep the little word for yourself before the conjugated verb.');
pattern('u15','A table for two',[[['Una mesa','what'],['para','for'],['dos','how many']]],'Name the thing, then add who or what it is for.');
pattern('u14','Which direction',[[['a la','to the'],['derecha','where']],[['a la','to the'],['izquierda','where']]],'Learn each direction as a short group.');
pattern('u16','Ask the price',[[['¿Cuánto','ask'],['cuesta?','does']]],'Ask the price of the thing you are pointing to.');
pattern('u9','How you feel now',[[['Estoy','am'],['contento','feeling']],[['Estoy','am'],['triste','feeling']]],'Many descriptions of your current state use estar.');
pattern('u32','Can plus an activity',[[['Puedo','can'],['hablar','doing'],['español','what']],[['No puedo','cannot'],['ir','doing']]],'The second verb stays in its dictionary form.');
pattern('u33','A plan',[[['Voy','go'],['a','link'],['estudiar','doing']],[['Vamos','go'],['a','link'],['comer','doing']]],'Keep the linking a in a plan.');
pattern('u41','Join two ideas',[[['Trabajo','does'],['y','join'],['estudio','does']],[['Quiero ir','want'],['pero','join'],['no puedo','cannot']]],'Use a connector to show how the two ideas fit together.');
pattern('u34','A completed past event',[[['Ayer','when'],['fui','went'],['al parque','where']]],'A past time and a completed action make a short story.');
pattern('u35','Put events in order',[[['Primero','when'],['comí','did']],[['Luego','when'],['salí','did']]],'Time words organise the order of events.');
pattern('u13','Check in',[[['Tengo','have'],['una reservación','what']]],'Say what you have, then ask for the details you need.');
pattern('u37','Give your view',[[['Creo que','think'],['es importante','view']]],'Add a complete statement after the opening phrase.');
const grammar=[
 {id:'es-be',u:'u22',name:'Two ways to be',ans:['soy','eres','es','somos','son','estoy','estás','está','estamos','están'],rows:[['soy / estoy','I am: identity / state or location'],['eres / estás','you are: identity / state or location'],['es / está','he, she, it or polite you is'],['somos / estamos','we are'],['son / están','they or you all are']],note:'Choose the verb by meaning, then choose its form for the subject. Events use ser for their location; do not treat every location as an estar rule.'},
 {id:'es-present',u:'u23',name:'Regular present endings',ans:['hablamos','hablas','comemos','comes'],rows:[['hablar → hablo, hablas, hablamos','speak: I, you, we'],['comer → como, comes, comemos','eat: I, you, we'],['vivir → vivo, vives, vivimos','live: I, you, we']],note:'The subject word can often be omitted because the ending identifies it.'},
 {id:'es-time',u:'u5',name:'The time',ans:['son','es'],rows:[['Es la una','It is one o’clock'],['Son las dos','It is two o’clock'],['a las ocho','at eight o’clock']],note:'Use singular at one o’clock and plural for the other hours.'},
 {id:'es-agreement',u:'u29',name:'Descriptions agree',ans:['alto','alta','roja'],rows:[['Mi hermano es alto','My brother is tall'],['Mi hermana es alta','My sister is tall'],['Los libros son nuevos','The books are new']],note:'Match grammatical gender and number. Not every describing word has a different feminine ending.'},
 {id:'es-hay',u:'u30',name:'Existence and location',ans:['hay'],rows:[['Hay una mesa','There is a table'],['Hay dos sillas','There are two chairs'],['La llave está aquí','The key is here']],note:'Hay introduces existence; estar locates a particular thing.'},
 {id:'es-like',u:'u8',name:'Saying what you like',ans:['gusta','gustan'],rows:[['Me gusta leer','I like reading'],['Me gusta la música','I like music'],['Me gustan los libros','I like books']],note:'The verb agrees with the thing liked: singular for an activity or one thing, plural for more than one.'},
 {id:'es-need',u:'u32',name:'Two verbs together',ans:['que'],rows:[['Puedo hablar español','I can speak Spanish'],['Tengo que trabajar','I have to work'],['Quiero aprender','I want to learn']],note:'The second verb stays in the dictionary form. The obligation expression needs its linking word.'},
 {id:'es-plans',u:'u33',name:'Going to do something',frame:['voy','vamos'],rows:[['Voy a estudiar','I am going to study'],['Vamos a comer','We are going to eat'],['Van a venir','They are going to come']],note:'Use a form of ir, then a, then the dictionary form of the activity.'},
 {id:'es-past',u:'u34',name:'Completed past actions',ans:['fui','comí','compré'],rows:[['hablé / comí / viví','I spoke / ate / lived'],['fui / hice / tuve','I went or was / did / had'],['Ayer fui al mercado','Yesterday I went to the market']],note:'Learn irregular forms as whole words. A written accent on regular past endings affects the stress.'},
 {id:'es-background',u:'u35',name:'Past events and background',ans:['vivía','iba'],rows:[['Vivía en México','I used to live in Mexico'],['Estaba en casa','I was at home: background'],['Primero comí, luego salí','First I ate, then I went out']],note:'The imperfect describes background or habits; the preterite presents completed events. Context determines the choice.'},
 {id:'es-pain',u:'u36',name:'What hurts',ans:['duele','duelen'],rows:[['Me duele la cabeza','My head hurts'],['Me duelen los pies','My feet hurt']],note:'The pain verb agrees with the painful body part, rather than with the person experiencing it.'},
];
const make=[
 ['Soy estudiante y trabajo aquí.','I am a student and I work here.'],['¿Vives aquí?','Do you live here?'],['No comemos aquí.','We do not eat here.'],['¿Dónde está mi libro?','Where is my book?'],
 ['Tengo treinta años.','I am thirty years old.'],['Son las cinco y media.','It is half past five.'],['Me levanto a las seis.','I get up at six.'],['Desayuno temprano todos los días.','I eat breakfast early every day.'],
 ['Quiero sopa y pan, por favor.','I want soup and bread, please.'],['Un té sin azúcar, por favor.','A tea without sugar, please.'],['No quiero leche.','I do not want milk.'],['¿La sopa está picante?','Is the soup spicy?'],
 ['La farmacia está al lado del banco.','The pharmacy is next to the bank.'],['Voy al museo a pie.','I am going to the museum on foot.'],['¿Cuánto cuesta una camisa?','How much does a shirt cost?'],['Quiero una playera verde.','I want a green T-shirt.'],
 ['Mi hermana trabaja aquí.','My sister works here.'],['Mi casa está cerca del parque.','My house is near the park.'],['Hay una silla en la cocina.','There is a chair in the kitchen.'],['Mi padre es muy amable.','My father is very kind.'],
 ['Me gustan las películas.','I like films.'],['No puedo salir esta noche.','I cannot go out tonight.'],['Tengo que trabajar el sábado.','I have to work on Saturday.'],['Vamos a viajar en verano.','We are going to travel in summer.'],
 ['Quiero ir al cine pero tengo que estudiar.','I want to go to the cinema but I have to study.'],['Ayer comí arroz y pollo.','Yesterday I ate rice and chicken.'],['Primero trabajé, luego descansé.','First I worked, then I rested.'],['Cuando era niño, vivía aquí.','When I was a child, I used to live here.'],
 ['Necesito una habitación por tres noches.','I need a room for three nights.'],['¿Dónde está la puerta de embarque?','Where is the boarding gate?'],['Me duele la mano.','My hand hurts.'],['Creo que la comida está muy rica.','I think the food tastes very good.'],
 ['¿Me puede escribir la contraseña?','Can you write the password for me?'],['No encuentro mi boleto.','I cannot find my ticket.'],['Mi perro es muy grande.','My dog is very big.'],['Quiero conocer el mercado.','I want to get to know the market.'],
];
module.exports={patterns,grammar,make};
