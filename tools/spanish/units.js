// Authoring source. Each section is one five-card lesson; existing starter IDs never change.
const units=[];
function unit(id,title,en,sections){units.push({id,title,en,tip:sections[0][1],lessons:sections.map(([title,tip,rows],i)=>({id:id+String.fromCharCode(97+i),title,tip,items:rows.trim().split('\n').map(line=>{const [es,en,note]=line.split('|');return [es,en,note||''];})}))});}
unit('u22','Ser y estar','Being and location',[
 ['Identity','Use <b>soy</b> for your identity and <b>eres</b> when asking a friend about theirs. A job normally needs no word for “a”.',`
soy|I am (identity)
eres|you are (identity)
es|he / she / it is (identity)
somos|we are (identity)
son|they / you all are (identity)`],
 ['Where you are','Use <b>estoy</b> for your location or state. The choice of verb depends on meaning, rather than simply how long something lasts.',`
estoy|I am (state or location)
estás|you are (state or location)
está|he / she / it is (state or location)
estamos|we are (state or location)
están|they / you all are (state or location)`],
 ['Here and there','Put the location after the verb. In Mexican Spanish <b>aquí</b> and <b>acá</b> both refer to “here”.',`
aquí|here
allá|over there
Soy estudiante|I am a student
Estamos aquí|We are here
¿Dónde estás?|Where are you?`],
 ['Who and where','A question can keep the same word order as a statement. Your voice and the question marks show the difference.',`
¿Eres estudiante?|Are you a student?
Ella es mexicana|She is Mexican
Somos amigos|We are friends
Estoy en México|I am in Mexico
¿Están aquí?|Are they here?`],
]);
unit('u23','Lo que hacemos','Everyday verbs',[
 ['Speak and work','For these regular verbs, the “I” form ends in <b>-o</b> and the informal “you” form ends in <b>-as</b>.',`
hablar|to speak
hablas|you speak
trabajar|to work
trabajas|you work
Trabajo aquí|I work here`],
 ['Eat and drink','Compare the endings: <b>como</b> becomes <b>comes</b> for “you”. The subject can usually be left out when the verb identifies it.',`
comer|to eat
como|I eat
comes|you eat
beber|to drink
bebo|I drink`],
 ['Live and learn','A verb can stand on its own as a sentence. Say <b>no</b> before the verb to make it negative.',`
vivir|to live
vives|you live
aprender|to learn
aprendo|I learn
No trabajo aquí|I do not work here`],
 ['We do it too','The ending <b>-mos</b> signals “we”. Keep the negative word before the verb.',`
hablamos|we speak
comemos|we eat
vivimos|we live
Aprendemos español|We learn Spanish
No hablo inglés|I do not speak English`],
]);
unit('u24','Preguntas','Asking questions',[
 ['Question starters','Question words carry written accents. Choose the one that asks for the kind of information you need.',`
qué|what
quién|who
dónde|where
cuándo|when
por qué|why`],
 ['How and how much','A question begins with <b>¿</b> and ends with <b>?</b>. The opening mark helps you read the sentence with question intonation.',`
cómo|how
cuánto|how much
cuál|which one
¿Qué es?|What is it?
¿Quién es?|Who is it?`],
 ['Asking a friend','The word order in a Spanish question is often the same as in a statement. Keep the accent in the question word.',`
¿Dónde vives?|Where do you live?
¿Hablas inglés?|Do you speak English?
¿Cuándo trabajas?|When do you work?
¿Por qué aprendes español?|Why do you learn Spanish?
¿Cómo se llama?|What is his / her name?`],
 ['Things around you','Articles go before a noun: <b>el</b> and <b>la</b> both mean “the”. Learn the article together with the noun.',`
el libro|the book
la mesa|the table
la silla|the chair
¿Dónde está el libro?|Where is the book?
¿Qué significa?|What does it mean?`],
]);
unit('u25','Sobre mí','Talking about yourself',[
 ['Where you are from','Use <b>de</b> for origin. Keep the name of your country after it.',`
México|Mexico
Estados Unidos|the United States
Soy de México|I am from Mexico
¿De dónde eres?|Where are you from?
Vivo en México|I live in Mexico`],
 ['Have and want','These common verbs have irregular “I” forms. Learn them as useful whole words.',`
tengo|I have
tienes|you have
quiero|I want
quieres|you want
necesito|I need`],
 ['Say a little more','Age uses the verb for “have”. After learning numbers, put a number before the word for years.',`
años|years
¿Cuántos años tienes?|How old are you?
Soy maestro|I am a teacher|A woman can say “Soy maestra”.
Soy de aquí|I am from here
Trabajo en México|I work in Mexico`],
 ['Things you need','A short useful sentence can be just a verb and the thing you need. The article is part of the noun phrase.',`
el agua|the water|Water is feminine, but takes “el” directly before its stressed opening a.
el pan|the bread
Quiero agua|I want water
Necesito un libro|I need a book
Tengo un teléfono|I have a telephone`],
]);
unit('u2','Números','Numbers',[
 ['One to five','Say the numbers in order, then mix them up. Practise hearing each number on its own.',`
uno|one
dos|two
tres|three
cuatro|four
cinco|five`],
 ['Six to ten','Keep the vowels short. Practise saying a number without counting up from one first.',`
seis|six
siete|seven
ocho|eight
nueve|nine
diez|ten`],
 ['Eleven to fifteen','These five numbers each have their own form. Learn them as whole words.',`
once|eleven
doce|twelve
trece|thirteen
catorce|fourteen
quince|fifteen`],
 ['Useful larger numbers','Use <b>un</b> before a masculine noun, while <b>uno</b> is the counting form. Prices in this course use Mexican pesos.',`
veinte|twenty
treinta|thirty
cien|one hundred
pesos|pesos
Tengo veinte años|I am twenty years old`],
]);
unit('u5','El tiempo','Days and time',[
 ['Days of the week','Days of the week are normally written with lowercase letters in Spanish.',`
lunes|Monday
martes|Tuesday
miércoles|Wednesday
jueves|Thursday
viernes|Friday`],
 ['The weekend','Use the singular article for a particular day, and the plural for a regular weekly activity.',`
sábado|Saturday
domingo|Sunday
hoy|today
mañana|tomorrow|The same word can mean “morning” in a different phrase.
el fin de semana|the weekend`],
 ['Telling the time','Use <b>son las</b> for most hours. One o’clock has its own singular form.',`
¿Qué hora es?|What time is it?
Es la una|It is one o'clock
Son las dos|It is two o'clock
Son las tres y media|It is half past three
a las ocho|at eight o'clock`],
 ['Parts of the day','Use these phrases to say when something happens. Watch the article in each phrase.',`
por la mañana|in the morning
por la tarde|in the afternoon
por la noche|at night
temprano|early
tarde|late`],
]);
unit('u26','Mi día','My day',[
 ['Starting the day','In these actions, <b>me</b> shows that you do something involving yourself. Keep it before the conjugated verb.',`
Me despierto|I wake up
Me levanto|I get up
Me baño|I take a bath / shower
Me visto|I get dressed
desayuno|I eat breakfast`],
 ['Through the day','Use a time phrase to place an action in your day. The verb itself still shows who does it.',`
salgo|I go out
Voy al trabajo|I go to work
regreso|I return
descanso|I rest
duermo|I sleep`],
 ['Every day','These expressions tell someone how often you do something. They can go before or after the main action.',`
siempre|always
a veces|sometimes
nunca|never
todos los días|every day
después|afterwards`],
 ['Your routine','Build a whole sentence from an action and a time phrase. Say it aloud as one smooth group.',`
Me levanto temprano|I get up early
Desayuno a las ocho|I eat breakfast at eight
Trabajo por la mañana|I work in the morning
Después descanso|Afterwards I rest
Me acuesto tarde|I go to bed late`],
]);
unit('u3','Comida y bebida','Food and drink',[
 ['At the table','Learn the article with each food. The noun keeps its form when it is the thing you eat.',`
la leche|the milk
el queso|the cheese
la carne|the meat
el pollo|the chicken
el pescado|the fish (food)`],
 ['More food','These are everyday foods you can recognise on a menu or ask for at a shop.',`
el arroz|the rice
el huevo|the egg
la sopa|the soup
la manzana|the apple
la papa|the potato|In Mexico, the everyday word is “papa”.`],
 ['Drinks and flavours','Use these nouns to name a drink or something you want to add to it.',`
el té|the tea
el jugo|the juice
la cerveza|the beer
el azúcar|the sugar
la sal|the salt`],
 ['Say what you eat','Use the same noun after the verb. A negative goes before the action word.',`
Como arroz|I eat rice
Bebo agua|I drink water
No como carne|I do not eat meat
Tengo hambre|I am hungry
Tengo sed|I am thirsty`],
]);
unit('u15','En el restaurante','At the restaurant',[
 ['Getting seated','Polite requests can be short. Add <b>por favor</b> after what you need.',`
el restaurante|the restaurant
el menú|the menu
Una mesa para dos|A table for two
El menú, por favor|The menu, please
¿Qué recomienda?|What do you recommend?`],
 ['Ordering','Use a clear request and name your food or drink. The polite “you” form is useful with a server.',`
Quiero un taco|I want a taco
Un café, por favor|A coffee, please
sin azúcar|without sugar
con leche|with milk
agua sin gas|still water`],
 ['Diet and taste','Explain an allergy clearly. Say the whole phrase and name the ingredient.',`
Está rico|It tastes good
Está picante|It is spicy
Soy alérgico a los cacahuates|I am allergic to peanuts|A woman says “alérgica”.
sin carne|without meat
¿Tiene leche?|Does it contain milk?`],
 ['Paying','Use a question to check the payment method. Thank the server before leaving.',`
La cuenta, por favor|The bill, please
¿Puedo pagar con tarjeta?|Can I pay by card?
en efectivo|in cash
la propina|the tip
¡Buen provecho!|Enjoy your meal!`],
]);
unit('u4','La ciudad','Around town',[
 ['Places','Use <b>el</b> or <b>la</b> with each place. These nouns will help you ask where things are.',`
la ciudad|the city
la calle|the street
el parque|the park
el museo|the museum
la plaza|the square`],
 ['Useful stops','Ask for a place using the location verb. Keep each noun’s article with it.',`
la tienda|the shop
el banco|the bank
la farmacia|the pharmacy
el hospital|the hospital
el mercado|the market`],
 ['Near and far','Use a location word after the verb. Some places can also be described by what they are next to.',`
cerca|nearby
lejos|far away
al lado de|next to
frente a|opposite
¿Dónde está la farmacia?|Where is the pharmacy?`],
 ['Go somewhere','The words <b>a</b> and <b>el</b> combine into <b>al</b>. They stay separate before a feminine article.',`
voy|I go
vas|you go
vamos|we go
Voy al parque|I go to the park
Vamos a la tienda|We go to the shop`],
]);
unit('u14','Direcciones','Directions',[
 ['Which way','Use these short phrases to follow directions. Practise pointing as you say them.',`
a la derecha|to the right
a la izquierda|to the left
derecho|straight ahead|In directions in Mexico, this commonly means “straight ahead”.
la esquina|the corner
la cuadra|the city block`],
 ['Following instructions','These are useful polite instruction forms. Learn the complete phrases before trying to change their endings.',`
Siga derecho|Go straight ahead (polite)
Gire a la derecha|Turn right (polite)
Cruce la calle|Cross the street (polite)
en la esquina|on the corner
dos cuadras|two blocks`],
 ['Finding a place','The location verb tells someone where a place is. The place can come first or last.',`
¿Dónde está el museo?|Where is the museum?
El banco está cerca|The bank is nearby
La tienda está lejos|The shop is far away
Está al lado del banco|It is next to the bank
Estoy perdido|I am lost|A woman says “perdida”.`],
 ['Ask for help','Make the request polite when asking a stranger. A short follow-up question can check what you heard.',`
¿Me puede ayudar?|Can you help me? (polite)
¿Está cerca?|Is it nearby?
¿A la derecha?|To the right? (checking)
¿Cuántas cuadras?|How many blocks?
Ya veo|I see now`],
]);
unit('u7','Transporte','Transport',[
 ['Ways to travel','These are common transport words in Mexico. Learn the noun and its article together.',`
el camión|the bus (Mexico)
el metro|the subway
el taxi|the taxi
el coche|the car
la bicicleta|the bicycle`],
 ['At the station','Use these words when planning a journey or looking for your departure point.',`
la estación|the station
la parada|the stop
el boleto|the ticket
el aeropuerto|the airport
el tren|the train`],
 ['Making the trip','Use <b>en</b> for most means of transport. Going on foot has a different fixed phrase.',`
en camión|by bus
en metro|by subway
a pie|on foot
Voy en taxi|I am going by taxi
Un boleto, por favor|One ticket, please`],
 ['Travel questions','Ask about the destination, time or fare. Say the key place name clearly.',`
¿Va al centro?|Does it go downtown?
¿A qué hora sale?|What time does it leave?
¿Cuánto cuesta el boleto?|How much is the ticket?
Quiero ir al aeropuerto|I want to go to the airport
Aquí, por favor|Here, please`],
]);
unit('u16','De compras','Shopping',[
 ['What you need','These words help you identify an item and ask its price.',`
el precio|the price
el dinero|the money
la tarjeta|the card
la bolsa|the bag
¿Cuánto cuesta?|How much does it cost?`],
 ['Choosing','Point to the item and use the matching form. Ask for another item if this one is unsuitable.',`
este|this one (masculine)
esta|this one (feminine)
ese|that one (masculine)
esa|that one (feminine)
otro|another (masculine)`],
 ['Prices','Use a description after the verb to comment on the price. A quantity can go straight before the noun.',`
caro|expensive
barato|cheap
Cuesta treinta pesos|It costs thirty pesos
Quiero dos manzanas|I want two apples
Es muy caro|It is very expensive`],
 ['At the checkout','These are everyday phrases for finishing a purchase. Ask politely when checking availability.',`
¿Tiene cambio?|Do you have change?
¿Acepta tarjeta?|Do you accept cards?
No necesito bolsa|I do not need a bag
Me llevo este|I will take this one
¿Tiene otro?|Do you have another one?`],
]);
unit('u28','Ropa','Clothes and colours',[
 ['Clothes','Clothing words have a grammatical gender even when anyone can wear the item.',`
la camisa|the shirt
la playera|the T-shirt (Mexico)
el pantalón|the trousers
la chamarra|the jacket (Mexico)
los zapatos|the shoes`],
 ['Colours','Many colour words change their ending to match a noun. Learn these basic dictionary forms first.',`
rojo|red
azul|blue
verde|green
negro|black
blanco|white`],
 ['Size and fit','Use a size word after the noun or after the verb. Some describing words do not change for grammatical gender.',`
grande|big
pequeño|small
la talla|the clothing size
Me queda bien|It fits me well
Es muy grande|It is very big`],
 ['Trying something on','A colour usually follows the clothing noun. Ask before trying on an item.',`
una camisa roja|a red shirt
una chamarra azul|a blue jacket
zapatos negros|black shoes
¿Me la puedo probar?|Can I try it on? (the jacket)
Quiero una talla más grande|I want a larger size`],
]);
unit('u6','Familia','Family',[
 ['Close family','The article is part of the noun phrase. Keep the masculine and feminine family terms distinct.',`
la madre|the mother
el padre|the father
el hijo|the son
la hija|the daughter
la familia|the family`],
 ['More relatives','Use these words to describe who someone is in your family.',`
el hermano|the brother
la hermana|the sister
la abuela|the grandmother
el abuelo|the grandfather
los padres|the parents`],
 ['My and your','A possessive goes before the noun. Its plural ending matches how many things or people are owned.',`
mi familia|my family
tu hermano|your brother
mis hijos|my children
Tengo una hermana|I have a sister
No tengo hermanos|I have no siblings`],
 ['Introducing family','Use the identity verb to say who a person is. You can identify someone without repeating their name.',`
Ella es mi madre|She is my mother
Él es mi padre|He is my father
¿Tienes hijos?|Do you have children?
Tengo dos hijos|I have two children
Mi familia vive aquí|My family lives here`],
]);
unit('u30','La casa','At home',[
 ['Your home','Learn each noun with its article, then picture where it is in your home.',`
la casa|the house
el departamento|the apartment (Mexico)
la cocina|the kitchen
el baño|the bathroom
la recámara|the bedroom (Mexico)`],
 ['Inside','Use these nouns to describe furniture and things inside a room.',`
la cama|the bed
la puerta|the door
la ventana|the window
el sofá|the sofa
la llave|the key`],
 ['What there is','Use <b>hay</b> for both “there is” and “there are”. It does not change for more than one thing.',`
hay|there is / there are
Hay una mesa|There is a table
Hay dos sillas|There are two chairs
No hay agua|There is no water
¿Hay un baño?|Is there a bathroom?`],
 ['Where things are','Use the location verb for a specific thing you have already identified. Use <b>hay</b> to introduce its existence.',`
La llave está aquí|The key is here
La puerta está abierta|The door is open
La ventana está cerrada|The window is closed
Vivo en un departamento|I live in an apartment
Mi casa es pequeña|My house is small`],
]);
unit('u29','Describir','Describing people and things',[
 ['Describing people','Many describing words end in <b>-o</b> for a masculine noun and <b>-a</b> for a feminine noun.',`
alto|tall
bajo|short (height)
joven|young
mayor|older
amable|kind`],
 ['Describing things','These words often go after a noun. Some change for grammatical gender; others keep the same ending.',`
nuevo|new
viejo|old
bonito|pretty
bueno|good
malo|bad`],
 ['Matching endings','The describing word agrees with the person or thing it describes, including its plural ending.',`
Mi hermano es alto|My brother is tall
Mi hermana es alta|My sister is tall
Los libros son nuevos|The books are new
La casa es bonita|The house is pretty
Son muy amables|They are very kind`],
 ['Comparisons','Put <b>más</b> before a describing word and <b>que</b> before the person or thing you compare with.',`
más grande que|bigger than
menos caro|less expensive
mejor|better
peor|worse
Este es más barato|This one is cheaper`],
]);
unit('u9','Cómo me siento','Feelings and weather',[
 ['How you feel','Use the state verb for how you feel now. Some of these words have a different form for women.',`
Estoy contento|I am happy|A woman says “contenta”.
Estoy cansado|I am tired|A woman says “cansada”.
Estoy enfermo|I am ill|A woman says “enferma”.
Estoy triste|I am sad
Estoy nervioso|I am nervous|A woman says “nerviosa”.`],
 ['Hot and cold','Physical sensations often use the verb for “have”. Weather uses a different construction.',`
Tengo frío|I feel cold
Tengo calor|I feel hot
Hace frío|The weather is cold
Hace calor|The weather is hot
Hace buen tiempo|The weather is nice`],
 ['Outside','Learn these weather expressions as complete phrases. They do not need a subject word.',`
llueve|it is raining
Hace sol|It is sunny
Hace viento|It is windy
Está nublado|It is cloudy
la lluvia|the rain`],
 ['Checking in','Ask about someone’s state, or describe your own. The context makes clear whether you mean a person or the weather.',`
¿Cómo te sientes?|How do you feel?
Me siento bien|I feel well
Estoy mejor|I am feeling better
Necesito descansar|I need to rest
Hoy hace calor|It is hot today`],
]);
unit('u31','Trabajo','Work and jobs',[
 ['Jobs','A profession normally follows the identity verb without an article. Some job words change for women.',`
el maestro|the male teacher
la maestra|the female teacher
el doctor|the male doctor
la doctora|the female doctor
estudiante|student`],
 ['More jobs','These are useful job names for introductions. Notice that some forms are shared by men and women.',`
ingeniero|engineer (masculine)
enfermera|nurse (feminine)
chofer|driver
cocinero|cook (masculine)
vendedor|salesperson (masculine)`],
 ['The workplace','Use a place phrase after the verb to say where someone works.',`
la oficina|the office
la escuela|the school
el trabajo|the work / job
Trabajo en una oficina|I work in an office
¿En qué trabajas?|What do you do for work?`],
 ['A working day','These verbs help you talk about work or study. A time word can tell someone when it happens.',`
estudiar|to study
estudio|I study
empiezo|I start
termino|I finish
Termino a las cinco|I finish at five`],
]);
unit('u8','Tiempo libre','Free time',[
 ['Things to do','Dictionary forms end in <b>-ar</b>, <b>-er</b> or <b>-ir</b>. Learn the whole form for an activity.',`
leer|to read
cocinar|to cook
caminar|to walk
bailar|to dance
nadar|to swim`],
 ['Entertainment','These activities can follow a verb such as “want”. Keep both words together in the longer activities.',`
escuchar música|to listen to music
ver películas|to watch films
jugar futbol|to play soccer
viajar|to travel
cantar|to sing`],
 ['I like it','The thing or activity you like is the subject of this construction. Use the singular verb before an activity.',`
Me gusta leer|I like reading
Me gusta cocinar|I like cooking
Me gusta la música|I like music
Me gustan los libros|I like books
No me gusta bailar|I do not like dancing`],
 ['Share an interest','Use the question form to ask about a friend’s interests. A short answer can connect your interests.',`
¿Te gusta viajar?|Do you like travelling?
Sí, me gusta|Yes, I like it
A mí también|I do too
A mí no|I do not (in contrast)
Prefiero caminar|I prefer walking`],
]);
unit('u32','Poder y necesitar','Can, must and need',[
 ['Being able to','Keep the second verb in its dictionary form after the word for “can”.',`
puedo|I can
puedes|you can
podemos|we can
Puedo hablar español|I can speak Spanish
No puedo ir|I cannot go`],
 ['Things you must do','The “have to” construction needs its linking word before the dictionary form of the action.',`
tengo que|I have to
tienes que|you have to
Tengo que trabajar|I have to work
Tengo que estudiar|I have to study
Tenemos que salir|We have to leave`],
 ['Needs and requests','A polite question is useful when asking a stranger for help. Keep the second action in its dictionary form.',`
Necesito ayuda|I need help
Necesito dormir|I need to sleep
Necesito comprar agua|I need to buy water
¿Puede repetir?|Can you repeat? (polite)
¿Puedo entrar?|May I come in?`],
 ['Wanting to do something','Put the activity straight after the verb for “want”. Keep the dictionary form of that activity.',`
Quiero aprender|I want to learn
Quiero comer|I want to eat
¿Quieres venir?|Do you want to come?
No quiero salir|I do not want to go out
Podemos caminar|We can walk`],
]);
unit('u33','Planes','Making plans',[
 ['Going to','For a plan, put <b>a</b> between the form of “go” and the dictionary form of the activity.',`
Voy a viajar|I am going to travel
Voy a estudiar|I am going to study
Vas a trabajar|You are going to work
Vamos a comer|We are going to eat
Van a venir|They are going to come`],
 ['When','A time expression places your plan in the future. Say the expression as one group.',`
esta noche|tonight
la próxima semana|next week
el próximo año|next year
el lunes|on Monday
el sábado|on Saturday`],
 ['Inviting','A question can turn a plan into an invitation. Suggest a place or an activity that you both know.',`
¿Qué vas a hacer mañana?|What are you going to do tomorrow?
¿Vamos al cine?|Shall we go to the cinema?
¿Quieres comer conmigo?|Do you want to eat with me?
Vamos al museo|Let's go to the museum
Nos vemos mañana|See you tomorrow`],
 ['Agreeing a time','Accept, decline or suggest a time. A short explanation helps make the reply natural.',`
¿A qué hora?|At what time?
A las seis|At six o'clock
Sí, puedo|Yes, I can
No puedo, tengo que trabajar|I cannot; I have to work
Está bien, nos vemos a las seis|OK, see you at six`],
]);
unit('u18','El año','Seasons and dates',[
 ['Seasons','Use these season names to talk about weather or travel plans.',`
la primavera|the spring
el verano|the summer
el otoño|the autumn
el invierno|the winter
el año|the year`],
 ['Months','Month names normally begin with lowercase letters. Use them after a date or a time preposition.',`
enero|January
febrero|February
marzo|March
abril|April
mayo|May`],
 ['More months','Practise recognising each month independently, without saying the whole list first.',`
junio|June
julio|July
agosto|August
septiembre|September
octubre|October`],
 ['Dates','A date uses the number followed by the month. Birthdays are a useful reason to practise saying a date.',`
noviembre|November
diciembre|December
la fecha|the date
Mi cumpleaños es en mayo|My birthday is in May
Hoy es cinco de mayo|Today is May fifth`],
]);
unit('u41','Unir ideas','Joining ideas',[
 ['Connecting','These short words connect two ideas. Keep the relationship between those ideas clear.',`
y|and
pero|but
porque|because
o|or
entonces|then / so`],
 ['Timing and quantity','A small word can change when something happens or how much is involved.',`
ya|already / now
todavía|still / yet
solo|only
cuando|when (not a question)
también|also / too`],
 ['Longer sentences','Join two short sentences that you can already say. Keep the verb and its subject consistent in each part.',`
Quiero ir pero no puedo|I want to go but I cannot
No voy porque estoy cansado|I am not going because I am tired
Quiero café o té|I want coffee or tea
Trabajo y estudio|I work and study
Todavía estoy aquí|I am still here`],
 ['People and things','These words can stand for an unspecified person or thing. A negative answer can put the negative word after the verb.',`
todos|everyone / all
nadie|nobody
algo|something
No hay nadie|There is nobody here
¿Quieres algo?|Do you want anything?`],
]);
unit('u34','Ayer','Yesterday',[
 ['A finished day','These time expressions often go with completed past actions. Learn the irregular past forms as whole words.',`
ayer|yesterday
anoche|last night
la semana pasada|last week
fui|I went / I was
estuve|I was (state or location, completed period)`],
 ['Completed actions','For many regular “I” past forms, a written accent marks the last syllable. Keep it when you type.',`
hablé|I spoke
comí|I ate
viví|I lived
trabajé|I worked
compré|I bought`],
 ['Irregular past forms','These common past forms do not follow the regular pattern. Learn the whole word with its meaning.',`
hice|I did / made
tuve|I had
vi|I saw
salí|I went out / left
llegué|I arrived`],
 ['Tell someone','Put the time phrase before or after the action. A place can follow the movement verb.',`
Ayer fui al mercado|Yesterday I went to the market
Comí pollo|I ate chicken
Compré una camisa|I bought a shirt
Estuve en casa|I was at home
¿Qué hiciste ayer?|What did you do yesterday?`],
]);
unit('u35','Contar historias','Telling a story',[
 ['A story in order','Use these expressions to organise the order of events. They can introduce a short past-tense sentence.',`
primero|first
luego|then / afterwards
al final|in the end
antes|before
de repente|suddenly`],
 ['Background and habits','These past forms often describe background or repeated actions. Context decides how English translates them.',`
era|I / he / she used to be (identity)
estaba|I / he / she was (state or location)
tenía|I / he / she had / used to have
vivía|I / he / she used to live
iba|I / he / she used to go / was going`],
 ['Setting the scene','Use a background form to describe a situation, then a completed action to move the story forward.',`
Cuando era niño|When I was a child|A woman says “niña”.
Vivía en México|I used to live in Mexico
Estaba en casa|I was at home (background)
Tenía un perro|I used to have a dog
Iba al parque todos los días|I used to go to the park every day`],
 ['What happened','A past question can ask for an event, a place or an opinion. Listen for the time and person in the verb.',`
¿Cómo te fue?|How did it go for you?
Me fue bien|It went well for me
Fue muy bonito|It was very nice
Primero comí, luego salí|First I ate, then I went out
Al final regresé a casa|In the end I returned home`],
]);
unit('u13','En el hotel','At the hotel',[
 ['Checking in','Use a polite request at reception. Say the noun clearly, then add the details.',`
la reservación|the reservation (Mexico)
la habitación|the hotel room
la noche|the night
Tengo una reservación|I have a reservation
Una habitación para dos|A room for two`],
 ['Room details','Ask which services are included. Learn the complete question as a useful phrase.',`
¿Incluye desayuno?|Does it include breakfast?
¿Tiene internet?|Does it have internet?
por dos noches|for two nights
la recepción|the reception desk
el elevador|the lift / elevator (Mexico)`],
 ['During your stay','Report the specific problem. A short statement plus a polite request usually does the job.',`
La llave no funciona|The key does not work
No hay agua caliente|There is no hot water
Necesito otra toalla|I need another towel
¿Dónde está mi habitación?|Where is my room?
Está en el segundo piso|It is on the second floor`],
 ['Checking out','Ask about a time or a service before making your plan. These questions use the polite form.',`
¿A qué hora es la salida?|What time is checkout?
¿Puedo dejar mi maleta?|Can I leave my suitcase?
Necesito un taxi|I need a taxi
Aquí está la llave|Here is the key
Gracias por todo|Thank you for everything`],
]);
unit('u10','De viaje','Travel',[
 ['Your documents','Keep the article with each travel noun. These are useful words at an airport or hotel.',`
el pasaporte|the passport
la maleta|the suitcase
el equipaje|the luggage
el vuelo|the flight
el viaje|the trip`],
 ['Departures','These words identify key places and stages of a journey.',`
la entrada|the entrance
la salida|the exit / departure
la llegada|the arrival
la puerta de embarque|the boarding gate
el asiento|the seat`],
 ['Finding your way','A specific location uses the location verb. Ask the question slowly if the place name is unfamiliar.',`
¿Dónde está la salida?|Where is the exit?
¿A qué hora llega?|What time does it arrive?
Mi vuelo está retrasado|My flight is delayed
Perdí mi maleta|I lost my suitcase
Aquí está mi pasaporte|Here is my passport`],
 ['Booking a journey','Name the destination and date, then check the details. Use the travel noun to make the question precise.',`
Quiero un boleto a México|I want a ticket to Mexico
de ida y vuelta|round trip
solo de ida|one way
¿Cuánto dura el viaje?|How long does the trip take?
¿Puedo cambiar mi boleto?|Can I change my ticket?`],
]);
unit('u36','Salud y ayuda','Health and getting help',[
 ['The body','Learn body nouns with their articles. They help you describe a problem clearly.',`
la cabeza|the head
la mano|the hand
el pie|the foot
el estómago|the stomach
la espalda|the back`],
 ['What hurts','Use the singular form for one painful body part, and the plural for more than one.',`
Me duele la cabeza|My head hurts
Me duele el estómago|My stomach hurts
Me duelen los pies|My feet hurt
Tengo fiebre|I have a fever
Tengo tos|I have a cough`],
 ['Ask for help','In an urgent situation, state the need directly. Learn these as complete phrases.',`
¡Ayuda!|Help!
Necesito un doctor|I need a doctor
Es una emergencia|It is an emergency
Llame a una ambulancia|Call an ambulance (polite)
¿Dónde está el hospital?|Where is the hospital?`],
 ['At the pharmacy','Explain the symptom and ask for help. Do not guess medicine names or doses from a language exercise.',`
la medicina|the medicine
la alergia|the allergy
¿Tiene algo para la tos?|Do you have something for a cough?
Soy alérgico a esta medicina|I am allergic to this medicine
Necesito hablar con un doctor|I need to speak with a doctor`],
]);
unit('u37','Opiniones','Opinions',[
 ['What you think','Use these short openings to express a view. You can add a complete sentence after them.',`
creo que|I think that
pienso que|I think / believe that
para mí|for me / in my opinion
Es interesante|It is interesting
Es importante|It is important`],
 ['Agreeing','These responses help you join a conversation without changing the subject.',`
Estoy de acuerdo|I agree
No estoy de acuerdo|I disagree
Tienes razón|You are right
Es verdad|It is true
No sé|I do not know`],
 ['Likes and preferences','Say what you prefer, then give a reason using a sentence you already know how to build.',`
Prefiero el té|I prefer tea
Me encanta la comida mexicana|I love Mexican food
No me gustan los hoteles grandes|I do not like big hotels
Creo que es muy caro|I think it is very expensive
Es mejor caminar|It is better to walk`],
 ['Ask their opinion','Ask a clear question, then listen to the reason. A follow-up question keeps the exchange going.',`
¿Qué piensas?|What do you think?
¿Qué prefieres?|What do you prefer?
¿Te parece bien?|Does that sound good to you?
Me parece bien|That sounds good to me
¿Por qué no?|Why not?`],
]);
unit('u38','Seguir la plática','Keep the conversation going',[
 ['Reacting','A short reaction shows that you are following the conversation. Match your tone to the meaning.',`
¡Qué padre!|How cool! (Mexico)
¿En serio?|Really?
¡Qué bueno!|That is great!
¡Qué lástima!|What a shame!
¡No puede ser!|No way!`],
 ['Finding out more','These short questions invite the other person to add detail.',`
¿Y luego?|And then?
¿Y después?|And afterwards?
¿Con quién hablas?|Who are you speaking with?
¿Dónde fue?|Where was it?
Cuéntame|Tell me`],
 ['Keeping your turn','These expressions give you time to think or help you explain what you mean.',`
un momento|one moment
déjame pensar|let me think
por ejemplo|for example
quiero decir|I mean
la verdad|the truth / honestly`],
 ['Ending warmly','Close a conversation politely and leave a natural opening to speak again.',`
Me dio mucho gusto verte|It was lovely to see you
Que tengas buen día|Have a good day (to a friend)
Cuídate|Take care (to a friend)
Seguimos en contacto|Let's keep in touch
Hasta pronto|See you soon`],
]);
unit('u39','Mensajes','Messages and practical requests',[
 ['Contact details','Use these nouns when exchanging contact details or asking for internet access.',`
el mensaje|the message
el correo|the email
el número|the number
la contraseña|the password
el celular|the mobile phone (Mexico)`],
 ['Staying in touch','These phrases make a request clear. Ask politely if you need someone to repeat or write information.',`
¿Cuál es tu número?|What is your number?
Te mando un mensaje|I will send you a message
¿Me lo puede escribir?|Can you write it for me? (polite)
No tengo internet|I do not have internet
¿Cuál es la contraseña?|What is the password?`],
 ['A polite request','These fixed phrases introduce a softer request. You can learn the whole phrase before studying its verb pattern.',`
Me gustaría un café|I would like a coffee
¿Podría ayudarme?|Could you help me?
¿Me trae agua, por favor?|Could you bring me water, please?
¿Me puede llamar un taxi?|Can you call me a taxi?
¿Puede hablar más despacio?|Can you speak more slowly? (polite)`],
 ['Small problems','Explain what has happened, then say what you need. Keep the phrases short and clear.',`
No funciona|It does not work
No encuentro mi teléfono|I cannot find my telephone
Perdí mi llave|I lost my key
Necesito cargar mi celular|I need to charge my phone
¿Dónde puedo comprar un boleto?|Where can I buy a ticket?`],
]);
unit('u11','Animales','Animals',[
 ['Pets','Learn each animal with its article. Some animal nouns have different male and female forms.',`
el perro|the dog
el gato|the cat
el pájaro|the bird
el pez|the fish (animal)
el conejo|the rabbit`],
 ['On the farm','These nouns name common animals. Their grammatical gender belongs to the noun form shown.',`
el caballo|the horse
la vaca|the cow
el cerdo|the pig
la gallina|the hen
la oveja|the sheep`],
 ['Wild animals','Picture each animal as you say its name. Keep the written accents on the stressed syllables.',`
el león|the lion
el elefante|the elephant
el mono|the monkey
la tortuga|the turtle
la mariposa|the butterfly`],
 ['Talk about animals','Combine an animal noun with a verb or describing word that you already know.',`
Tengo un perro|I have a dog
Mi gato duerme|My cat sleeps
El perro es pequeño|The dog is small
Me gustan los animales|I like animals
El pájaro canta|The bird sings`],
]);
unit('u12','México','Culture and everyday Mexico',[
 ['Food to recognise','These food names are useful in Mexico. Some do not have a single-word English equivalent.',`
el tamal|the tamal (filled corn dough)
el pozole|the pozole (hominy soup)
la salsa|the sauce / salsa
el chile|the chile pepper
el aguacate|the avocado`],
 ['Places and traditions','These words identify cultural places or events. Learn the meaning without assuming everyone celebrates in the same way.',`
el mariachi|the mariachi musician / ensemble
el Día de Muertos|the Day of the Dead
el zócalo|the main square (Mexico)
la artesanía|the handicraft
la fiesta|the party / celebration`],
 ['Useful local words','These are common informal words in Mexico. Listen to the situation before using a casual expression.',`
ahorita|right now / in a little while (context matters)
sale|OK / agreed (Mexico)
chido|cool (casual, Mexico)
la plática|the chat (Mexico)
¿Qué tal?|How is it going?`],
 ['Bring it together','Use the language you have learned to talk about food, places and your reasons for learning.',`
Me gusta aprender español|I like learning Spanish
Quiero conocer México|I want to get to know Mexico
La comida está muy rica|The food tastes very good
¿La salsa está picante?|Is the salsa spicy?
¡Nos vemos pronto!|See you again soon!`],
]);
function extra(id,title,tip,rows){const u=units.find(u=>u.id===id);u.lessons.push({id:id+String.fromCharCode(97+u.lessons.length),title,tip,items:rows.trim().split('\n').map(r=>{const [es,en,note]=r.split('|');return [es,en,note||''];})});}
extra('u22','Names for the two verbs','The dictionary forms name the two verbs. Choose their meaning first, then their subject ending.',`
ser|to be (identity)
estar|to be (state or location)
Estoy aquí|I am here
¿Somos amigos?|Are we friends?
¿Es de México?|Is he / she from Mexico?`);
extra('u23','Talking about someone else','These forms can describe he, she or polite you. Use a name or subject word when it would otherwise be unclear.',`
habla|he / she speaks
trabaja|he / she works
come|he / she eats
vive|he / she lives
Vivo aquí|I live here`);
extra('u23','You and a group','For they or you all, regular present forms often end in n. Contrast these with the informal singular you form.',`
hablan|they / you all speak
trabajan|they / you all work
bebes|you drink
bebe|he / she drinks
beben|they / you all drink`);
extra('u2','Sixteen to twenty-one','The teens combine parts into one written word. Keep written accents where shown.',`
dieciséis|sixteen
diecisiete|seventeen
dieciocho|eighteen
diecinueve|nineteen
veintiuno|twenty-one`);
extra('u2','Tens and zero','Learn the tens as whole words. A zero is useful in phone numbers and prices.',`
cero|zero
cuarenta|forty
cincuenta|fifty
sesenta|sixty
setenta|seventy`);
extra('u2','Putting numbers together','For a number after thirty, connect the ten and the one with the joining word shown. Twenty-two is written as one word.',`
ochenta|eighty
noventa|ninety
veintidós|twenty-two
treinta y uno|thirty-one
ciento uno|one hundred and one`);
extra('u26','Ask about a routine','Switch to the informal you form when asking a friend about their routine.',`
¿Te levantas temprano?|Do you get up early?
¿Desayunas a las ocho?|Do you eat breakfast at eight?
¿Duermes bien?|Do you sleep well?
¿A qué hora te acuestas?|What time do you go to bed?
Me lavo las manos|I wash my hands`);
extra('u28','Checking the fit','In these phrases, the object word refers to a feminine clothing item. Ask the other person whether it fits.',`
¿Te queda bien?|Does it fit you well?
¿Quieres una talla más pequeña?|Do you want a smaller size?
¿La quiere en azul?|Would you like it in blue? (polite)
Me queda pequeña|It is too small on me (feminine item)
Me llevo la chamarra|I will take the jacket`);
extra('u31','Ask about work','Use the informal you ending when asking a friend about their work or studies.',`
¿Cuándo terminas?|When do you finish?
¿Dónde estudias?|Where do you study?
¿A qué hora empiezas?|What time do you start?
Trabajo desde casa|I work from home
No trabajo los domingos|I do not work on Sundays`);
extra('u33','Plan with someone','Ask who is taking part and where to meet. Keep the question word’s written accent.',`
¿Con quién vas?|Who are you going with?
¿Con quién?|With whom? (asking about a plan)
Con mi familia|With my family
¿Dónde nos vemos?|Where shall we meet?
Nos vemos en el parque|See you in the park`);
extra('u35','Asking about the past','Past questions have their own you forms. Compare the completed event with a background or earlier habit.',`
¿Qué compraste?|What did you buy?
¿Dónde vivías cuando eras niño?|Where did you live when you were a child?
¿Tenías un perro?|Did you have a dog?
¿Fuiste al mercado?|Did you go to the market?
¿Qué comiste?|What did you eat?`);
extra('u34','More completed actions','Keep the accent on these regular past endings. Learn the irregular sleep form as a whole word.',`
bebí|I drank
estudié|I studied
caminé|I walked
descansé|I rested
dormí|I slept`);
extra('u36','Questions at the clinic','Listen for the you form of a symptom question. Answer with a complete phrase about yourself.',`
¿Te duele la cabeza?|Does your head hurt?
¿Tienes fiebre?|Do you have a fever?
¿Necesitas ayuda?|Do you need help?
¿Tienes una alergia?|Do you have an allergy?
Me duele la espalda|My back hurts`);
module.exports=units;
