// New conversations only use forms introduced before their position on the path.
const convs=[];
const p=(es,en)=>['p',es,en];
const m=(es,en,hint)=>['m',es,en,hint];
const choice=(a,b)=>['c',[a,b].map(([es,en,hint,reply,translation])=>[es,en,hint,[p(reply,translation)]])];
function chat(id,title,scene,lines){convs.push({id,title,scene,cast:[{name:id==='cv3'||id==='cv5'||id==='cv8'?'Diego':'Mariana',voice:id==='cv3'||id==='cv5'||id==='cv8'?'leonas':'ona'}],lines});}
chat('cv2','¿Dónde vives?','Mariana meets you at the café again. This time you can say more about yourself.',[
 p('Hola. ¿Cómo estás?','Hello. How are you?'),m('Muy bien. ¿Y tú?','Very well. And you?','Answer, then ask her back'),
 p('Muy bien. ¿De dónde eres?','Very well. Where are you from?'),m('Soy de Estados Unidos.','I am from the United States.','Say where you are from'),
 p('¿Dónde vives?','Where do you live?'),m('Vivo en México.','I live in Mexico.','Say you live in Mexico'),
 p('¿Eres estudiante?','Are you a student?'),choice(['Sí. Soy estudiante.','Yes. I am a student.','Say you are a student','¿Hablas inglés?','Do you speak English?'],['No. Soy maestro.','No. I am a teacher.','Say you are a teacher','¿Hablas inglés?','Do you speak English?']),
 m('Hablo un poco de español.','I speak a little Spanish.','Say you speak a little Spanish'),p('¿Por qué aprendes español?','Why do you learn Spanish?'),
 m('Trabajo en México.','I work in Mexico.','Say you work in Mexico'),p('¿Tienes un teléfono?','Do you have a telephone?'),
 m('Sí. Tengo un teléfono.','Yes. I have a telephone.','Say that you do'),p('Nos vemos.','See you.'),m('Hasta luego.','See you later.','Say goodbye'),
]);
chat('cv3','Mi mañana','Diego asks about your daily routine over an afternoon coffee.',[
 p('Buenos días. ¿Cómo estás?','Good morning. How are you?'),m('Bien, gracias. ¿Y tú?','Fine, thanks. And you?','Answer and ask back'),
 p('Muy bien. ¿Qué hora es?','Very well. What time is it?'),m('Son las dos.','It is two o’clock.','Say it is two'),
 p('¿Cuándo trabajas?','When do you work?'),m('Trabajo por la mañana.','I work in the morning.','Say when you work'),
 p('¿Te levantas temprano?','Do you get up early?'),m('Me levanto temprano.','I get up early.','Say that you get up early'),
 p('¿A qué hora?','At what time?'),m('A las ocho.','At eight o’clock.','Say at eight'),
 p('Desayuno a las ocho.','I eat breakfast at eight.'),m('Yo también.','Me too.','Say you do too'),
 p('Después descanso.','Afterwards I rest.'),m('Voy al trabajo.','I go to work.','Say you go to work'),
 p('Está bien. Nos vemos.','OK. See you.'),m('Nos vemos.','See you.','Say see you'),
]);
// The unfamiliar question form above is explicitly taught in the routine extension.
chat('cv4','Una mesa para dos','Mariana is helping out at a small restaurant. Practise ordering and paying.',[
 p('Buenas tardes.','Good afternoon.'),m('Una mesa para dos, por favor.','A table for two, please.','Ask for a table for two'),
 p('Aquí, por favor.','Here, please.'),m('El menú, por favor.','The menu, please.','Ask for the menu'),
 p('Aquí está el menú.','Here is the menu.'),m('¿Qué recomienda?','What do you recommend?','Ask for a recommendation'),
 p('El pollo está rico.','The chicken tastes good.'),choice(['Quiero pollo, por favor.','I want chicken, please.','Order chicken','Está bien.','OK.'],['No como carne. Quiero sopa.','I do not eat meat. I want soup.','Choose soup without meat','Está bien.','OK.']),
 m('Agua sin gas, por favor.','Still water, please.','Ask for still water'),p('Sí. ¿Un café?','Yes. A coffee?'),
 m('Un café con leche, por favor.','A coffee with milk, please.','Ask for coffee with milk'),p('Está bien.','OK.'),
 m('La cuenta, por favor.','The bill, please.','Ask for the bill'),p('Sí.','Yes.'),
 m('¿Puedo pagar con tarjeta?','Can I pay by card?','Ask to pay by card'),p('Sí. Gracias.','Yes. Thank you.'),m('Gracias. Hasta luego.','Thank you. See you later.','Thank the server and leave'),
]);
chat('cv5','Al museo','You ask Diego how to get to the museum, then check which way to go.',[
 p('Buenos días.','Good morning.'),m('Perdón. ¿Me puede ayudar?','Excuse me. Can you help me?','Ask politely for help'),
 p('Sí.','Yes.'),m('¿Dónde está el museo?','Where is the museum?','Ask where the museum is'),
 p('Está cerca. Siga derecho.','It is nearby. Go straight ahead.'),m('¿Cuántas cuadras?','How many blocks?','Ask how many blocks'),
 p('Dos cuadras. Gire a la derecha.','Two blocks. Turn right.'),m('¿A la derecha?','To the right?','Check the direction'),
 p('Sí, en la esquina.','Yes, on the corner.'),m('Ya veo. Gracias.','I see now. Thank you.','Say you understand and thank him'),
 p('¿Vas al parque?','Are you going to the park?'),choice(['Voy al parque.','I am going to the park.','Say you are going to the park','Está cerca.','It is nearby.'],['No. Voy al museo.','No. I am going to the museum.','Say you are going to the museum','Está bien.','OK.']),
 m('Hasta luego.','See you later.','Say goodbye'),p('Nos vemos.','See you.'),
]);
chat('cv6','Un boleto','Mariana helps you work out the journey to the airport.',[
 p('Hola. ¿Dónde estás?','Hello. Where are you?'),m('Estoy en la estación.','I am at the station.','Say you are at the station'),
 p('¿Quieres ir al aeropuerto?','Do you want to go to the airport?'),m('Sí. Quiero ir al aeropuerto.','Yes. I want to go to the airport.','Say yes and name your destination'),
 p('¿Vas en taxi?','Are you going by taxi?'),m('No. Voy en camión.','No. I am going by bus.','Say you are going by bus'),
 p('Está bien.','OK.'),m('Un boleto, por favor.','One ticket, please.','Ask for one ticket'),
 p('Cuesta treinta pesos.','It costs thirty pesos.'),m('¿Acepta tarjeta?','Do you accept cards?','Ask if cards are accepted'),
 p('Sí.','Yes.'),m('¿A qué hora sale?','What time does it leave?','Ask the departure time'),
 p('A las ocho.','At eight o’clock.'),m('Gracias.','Thank you.','Say thank you'),
 p('Buena suerte.','Good luck.'),m('Hasta luego.','See you later.','Say goodbye'),
]);
chat('cv7','Una chamarra azul','You are choosing a jacket in a shop. Ask about size and price.',[
 p('Buenas tardes.','Good afternoon.'),m('Quiero una chamarra azul.','I want a blue jacket.','Ask for a blue jacket'),
 p('¿Esta?','This one?'),m('Sí. ¿Cuánto cuesta?','Yes. How much does it cost?','Ask the price'),
 p('Cien pesos.','One hundred pesos.'),m('¿Me la puedo probar?','Can I try it on?','Ask to try on the jacket'),
 p('Sí.','Yes.'),m('Es muy grande.','It is very big.','Say it is very big'),
 p('¿Quieres una talla más pequeña?','Do you want a smaller size?'),m('Sí, por favor.','Yes, please.','Ask for the smaller size'),
 p('¿Te queda bien?','Does it fit you well?'),m('Me queda bien.','It fits me well.','Say it fits well'),
 p('¿Quieres una bolsa?','Do you want a bag?'),choice(['Sí, por favor.','Yes, please.','Ask for a bag','Aquí está.','Here it is.'],['No necesito bolsa.','I do not need a bag.','Decline the bag','Está bien.','OK.']),
 m('¿Puedo pagar con tarjeta?','Can I pay by card?','Ask to pay by card'),p('Sí. Gracias.','Yes. Thank you.'),
]);
chat('cv8','Mi familia','Diego tells you about his family and asks about yours.',[
 p('Hola. ¿Cómo estás?','Hello. How are you?'),m('Estoy contento.','I am happy.','Say you are happy'),
 p('¿Tienes hijos?','Do you have children?'),choice(['Tengo dos hijos.','I have two children.','Say you have two children','Mi familia vive aquí.','My family lives here.'],['No tengo hijos.','I do not have children.','Say you have no children','Mi familia vive aquí.','My family lives here.']),
 m('¿Tienes hermanos?','Do you have siblings?','Ask about siblings'),p('Tengo una hermana.','I have a sister.'),
 m('Yo también.','Me too.','Say you do too'),p('Mi hermana es alta.','My sister is tall.'),
 m('¿Dónde vive?','Where does she live?','Ask where she lives'),p('Vive en México.','She lives in Mexico.'),
 m('¿En qué trabajas?','What do you do for work?','Ask about his work'),p('Trabajo en una oficina.','I work in an office.'),
 m('¿Cuándo terminas?','When do you finish?','Ask when he finishes'),p('Termino a las cinco.','I finish at five.'),
 m('Está bien. Nos vemos.','OK. See you.','Close the conversation'),
]);
chat('cv9','Planes para mañana','Mariana invites you out tomorrow. Agree on an activity and a time.',[
 p('¿Qué vas a hacer mañana?','What are you going to do tomorrow?'),m('Voy a estudiar.','I am going to study.','Say you are going to study'),
 p('¿Quieres comer conmigo?','Do you want to eat with me?'),choice(['Sí, puedo.','Yes, I can.','Accept the invitation','¿A qué hora?','At what time?'],['No puedo, tengo que trabajar.','I cannot; I have to work.','Decline because of work','¿El sábado?','On Saturday?']),
 m('A las seis.','At six o’clock.','Suggest six o’clock'),p('Está bien. ¿Vamos al cine?','OK. Shall we go to the cinema?'),
 m('Prefiero caminar.','I prefer walking.','Say you prefer walking'),p('¿Te gusta viajar?','Do you like travelling?'),
 m('Sí, me gusta.','Yes, I like it.','Say you like it'),p('Voy a viajar la próxima semana.','I am going to travel next week.'),
 m('¿Con quién?','With whom?','Ask who with'),p('Con mi familia.','With my family.'),
 m('Buena suerte.','Good luck.','Wish her good luck'),p('Gracias. Nos vemos mañana.','Thank you. See you tomorrow.'),m('Nos vemos mañana.','See you tomorrow.','Confirm the plan'),
]);
chat('cv10','¿Qué hiciste ayer?','After the weekend, Mariana asks you what happened. Practise a short story.',[
 p('Hola. ¿Cómo te fue?','Hello. How did it go?'),m('Me fue bien.','It went well for me.','Say it went well'),
 p('¿Qué hiciste ayer?','What did you do yesterday?'),m('Ayer fui al mercado.','Yesterday I went to the market.','Say you went to the market'),
 p('¿Qué compraste?','What did you buy?'),m('Compré una camisa.','I bought a shirt.','Say you bought a shirt'),
 p('¿Y después?','And afterwards?'),m('Comí pollo.','I ate chicken.','Say what you ate'),
 p('¿Y luego?','And then?'),m('Al final regresé a casa.','In the end I returned home.','Say you returned home in the end'),
 p('¿Dónde vivías cuando eras niño?','Where did you live when you were a child?'),m('Vivía en México.','I used to live in Mexico.','Say where you used to live'),
 p('¿Tenías un perro?','Did you have a dog?'),m('Tenía un perro.','I used to have a dog.','Say that you did'),
 p('Fue muy bonito.','It was very nice.'),m('Sí. Nos vemos.','Yes. See you.','Close the chat'),
]);
chat('cv11','En la recepción','You arrive at a hotel and check the room details.',[
 p('Buenas tardes.','Good afternoon.'),m('Tengo una reservación.','I have a reservation.','Say you have a reservation'),
 p('¿Una habitación para dos?','A room for two?'),m('Sí, por dos noches.','Yes, for two nights.','Confirm two nights'),
 p('Aquí está la llave.','Here is the key.'),m('¿Dónde está mi habitación?','Where is my room?','Ask where the room is'),
 p('Está en el segundo piso.','It is on the second floor.'),m('¿Incluye desayuno?','Does it include breakfast?','Ask about breakfast'),
 p('Sí. A las ocho.','Yes. At eight.'),m('¿Tiene internet?','Does it have internet?','Ask about internet'),
 p('Sí.','Yes.'),m('¿A qué hora es la salida?','What time is checkout?','Ask about checkout'),
 p('A las doce.','At twelve.'),m('¿Puedo dejar mi maleta?','Can I leave my suitcase?','Ask to leave your suitcase'),
 p('Sí. Aquí.','Yes. Here.'),m('Gracias por todo.','Thank you for everything.','Thank the receptionist'),
]);
chat('cv12','Necesito ayuda','You feel ill and ask Mariana to help you find a doctor.',[
 p('¿Cómo te sientes?','How do you feel?'),m('Estoy enfermo.','I am ill.','Say you are ill'),
 p('¿Te duele la cabeza?','Does your head hurt?'),m('Me duele la cabeza.','My head hurts.','Say your head hurts'),
 p('¿Tienes fiebre?','Do you have a fever?'),m('Tengo fiebre.','I have a fever.','Say you have a fever'),
 p('¿Necesitas ayuda?','Do you need help?'),m('Sí. Necesito un doctor.','Yes. I need a doctor.','Ask for a doctor'),
 p('El hospital está cerca.','The hospital is nearby.'),m('¿Me puede ayudar?','Can you help me?','Ask politely for help'),
 p('Sí. Vamos en taxi.','Yes. We are going by taxi.'),m('Necesito hablar con un doctor.','I need to speak with a doctor.','Say you need to speak with a doctor'),
 p('¿Tienes una alergia?','Do you have an allergy?'),m('Soy alérgico a esta medicina.','I am allergic to this medicine.','Explain a medicine allergy'),
 p('Está bien.','OK.'),m('Gracias por todo.','Thank you for everything.','Thank her for helping'),
]);
chat('cv13','Una buena plática','At dinner with Mariana, share preferences, react and make another plan.',[
 p('¿Qué prefieres? ¿Café o té?','What do you prefer? Coffee or tea?'),choice(['Prefiero el té.','I prefer tea.','Choose tea','A mí también.','I do too.'],['Quiero un café.','I want a coffee.','Choose coffee','Está bien.','OK.']),
 m('Me encanta la comida mexicana.','I love Mexican food.','Say you love Mexican food'),p('Estoy de acuerdo.','I agree.'),
 m('¿La salsa está picante?','Is the salsa spicy?','Ask whether the salsa is spicy'),p('Sí, está muy picante.','Yes, it is very spicy.'),
 m('La comida está muy rica.','The food tastes very good.','Compliment the food'),p('¿Qué vas a hacer mañana?','What are you going to do tomorrow?'),
 m('Voy a viajar con mi familia.','I am going to travel with my family.','Say you are travelling with family'),p('¡Qué padre! ¿Dónde?','How cool! Where?'),
 m('Quiero conocer México.','I want to get to know Mexico.','Say you want to get to know Mexico'),p('Cuéntame.','Tell me.'),
 m('Me gusta aprender español.','I like learning Spanish.','Say you like learning Spanish'),p('Me dio mucho gusto verte.','It was lovely to see you.'),
 m('Seguimos en contacto.','Let’s keep in touch.','Suggest keeping in touch'),p('Cuídate.','Take care.'),m('¡Nos vemos pronto!','See you again soon!','Say see you soon'),
]);
chat('cv14','Nos escribimos','Exchange contact details and get help with a small problem.',[
 p('¿Cuál es tu número?','What is your number?'),m('¿Me lo puede escribir?','Can you write it for me?','Ask to have it written down'),
 p('Sí. Aquí está.','Yes. Here it is.'),m('Te mando un mensaje.','I will send you a message.','Say you will send a message'),
 p('¿Tienes internet?','Do you have internet?'),m('No tengo internet.','I do not have internet.','Say you have no internet'),
 p('¿Quieres la contraseña?','Do you want the password?'),m('Sí, por favor.','Yes, please.','Ask for it'),
 p('Aquí está.','Here it is.'),m('No funciona.','It does not work.','Say it is not working'),
 p('¿Necesitas ayuda?','Do you need help?'),m('¿Podría ayudarme?','Could you help me?','Ask politely for help'),
 p('Sí. Un momento.','Yes. One moment.'),m('Necesito cargar mi celular.','I need to charge my phone.','Say you need to charge your phone'),
 p('Está bien.','OK.'),m('Gracias. Seguimos en contacto.','Thank you. Let’s keep in touch.','Thank her and close the conversation'),
]);
// Exact form practice; each answer and at least one distractor is taught before the drill appears.
const drills=[
 ['u22','We are here.','___ aquí.','Estamos',['Somos','Estoy'],'Use the location form for where we are.'],
 ['u23','We speak Spanish.','___ español.','Hablamos',['Hablas','Como'],'The ending -mos shows “we”.'],
 ['u24','Where is the book?','¿___ está el libro?','Dónde',['Quién','Cuándo'],'Ask about a location with the word for where.'],
 ['u25','I have a telephone.','___ un teléfono.','Tengo',['Quiero','Soy'],'Use the verb for having, rather than identity.'],
 ['u2','I am twenty years old.','Tengo ___ años.','veinte',['treinta','cinco'],'Age uses the verb for having, followed by a number and years.'],
 ['u5','It is two o’clock.','___ las dos.','Son',['Es','Soy'],'The time uses a plural form except at one o’clock.'],
 ['u26','I get up early.','Me levanto ___.','temprano',['tarde','después'],'Choose the time word meaning early.'],
 ['u3','I do not eat meat.','No ___ carne.','como',['bebo','comes'],'Use the I form of the verb for eating.'],
 ['u15','A coffee with milk.','Un café ___ leche.','con',['sin','para'],'Choose the word for with.'],
 ['u4','We go to the shop.','Vamos ___ la tienda.','a',['en','de'],'A destination after this movement verb uses a.'],
 ['u14','Turn right (polite).','Gire a la ___.','derecha',['izquierda','esquina'],'Choose the direction requested.'],
 ['u7','I am going by taxi.','Voy ___ taxi.','en',['a','de'],'Use en with this means of transport.'],
 ['u16','It costs thirty pesos.','Cuesta ___ pesos.','treinta',['veinte','cien'],'Match the number in the price.'],
 ['u28','A red shirt.','Una camisa ___.','roja',['rojo','azul'],'The describing word matches the feminine clothing noun.'],
 ['u6','My children.','___ hijos.','Mis',['Mi','Tu'],'Use a plural possessive for a plural noun.'],
 ['u30','There are two chairs.','___ dos sillas.','Hay',['Son','Está'],'Use the existence word for both one and more than one.'],
 ['u29','My sister is tall.','Mi hermana es ___.','alta',['alto','joven'],'The describing word matches the person described.'],
 ['u9','I feel cold.','___ frío.','Tengo',['Hace','Estoy'],'Personal sensations use tener; weather uses hacer.'],
 ['u31','I finish at five.','Termino a las ___.','cinco',['seis','ocho'],'Choose the correct hour.'],
 ['u8','I like books.','Me ___ los libros.','gustan',['gusta','gusto'],'The verb agrees with the plural thing liked.'],
 ['u32','I have to work.','Tengo ___ trabajar.','que',['a','de'],'The obligation construction needs que.'],
 ['u33','I am going to study.','Voy ___ estudiar.','a',['que','en'],'Keep a between the movement verb and the activity for a plan.'],
 ['u18','My birthday is in May.','Mi cumpleaños es en ___.','mayo',['junio','marzo'],'Choose the right month.'],
 ['u41','I am not going because I am tired.','No voy ___ estoy cansado.','porque',['pero','o'],'Use the connector that gives a reason.'],
 ['u34','Yesterday I went to the market.','Ayer ___ al mercado.','fui',['voy','iba'],'Use the completed past form for this finished trip.'],
 ['u35','I used to live in Mexico.','___ en México.','Vivía',['Vivo','Viví'],'Use the background past form for a former ongoing situation.'],
 ['u13','I have a reservation.','Tengo una ___.','reservación',['habitación','noche'],'Choose the booking rather than the room or duration.'],
 ['u10','Here is my passport.','Aquí está mi ___.','pasaporte',['maleta','boleto'],'Choose the document requested.'],
 ['u36','My feet hurt.','Me ___ los pies.','duelen',['duele','duele la'],'The pain verb agrees with the plural body part.'],
 ['u37','I agree.','Estoy de ___.','acuerdo',['verdad','razón'],'Use the fixed expression for agreement.'],
 ['u38','With whom?','¿Con ___?','quién',['dónde','cuándo'],'Ask for a person rather than a place or time.'],
 ['u39','What is the password?','¿Cuál es la ___?','contraseña',['mensaje','correo'],'Choose the access word, rather than a message or email.'],
 ['u11','My cat sleeps.','Mi gato ___.','duerme',['canta','como'],'Choose the action in the prompt.'],
 ['u12','The food tastes very good.','La comida está muy ___.','rica',['rico','picante'],'The taste word agrees with the feminine noun.'],
].map(([u,en,frame,ans,opts,why])=>({u,en,frame,ans,opts,why}));
const path=[
 {part:'First words',sub:'Sounds, greetings and help when you get stuck'},'u0','u1','cv1','u21','cv16',
 {part:'Build your own sentences',sub:'Who you are, where you are, actions and questions'},'u22','u23','u24','u25','cv2',
 {part:'Numbers, time and my day',sub:'Count, tell the time and describe a routine'},'u2','u5','u26','cv3',
 {part:'Food and drink',sub:'Say what you eat and order a meal'},'u3','u15','cv4',
 {part:'Getting around',sub:'Find places, travel, shop and choose clothes'},'u4','u14','cv5','u7','u16','cv6','u28','cv7',
 {part:'People and things',sub:'Family, home, descriptions, feelings and work'},'u6','u30','u29','u9','u31','cv8',
 {part:'Plans and the future',sub:'Interests, what you can do, invitations and dates'},'u8','u32','u33','u18','cv9',
 {part:'Tell your story',sub:'Connect ideas, talk about yesterday and give background'},'u41','u34','u35','cv10',
 {part:'Travel and getting help',sub:'Hotels, journeys and explaining a problem'},'u13','cv11','u10','u36','cv12',
 {part:'Real conversations',sub:'Share opinions, keep talking and stay in touch'},'u37','u38','u39','cv14',
 {part:'More of Mexico',sub:'Animals, food, culture and one final conversation'},'u11','u12','cv13',
];
module.exports={convs,drills,path};
