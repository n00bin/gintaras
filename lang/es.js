/* Gintaras language file: Spanish (Mexico). Same shape as lang/lt.js: the course, conversations, sounds-like guide,
   audio map, About-me phrases, tips, level titles, and the helpers that know Spanish grammar.
   Mexican Spanish: ustedes (never vosotros), Mexican everyday words, Latin American voices (Google es-US). */
const LANG={code:'es',en:'Spanish',own:'Español',speech:'es-MX',tts:'es-US',letters:'áéíóúñü',audio:'audio/es/',
  hello:'¡Hola!',praise:['¡Muy bien!','¡Eso!','¡Bien!'],top:'¡Qué padre!',decoys:'aeiolnrstudmcpbáéó',
  dropWho:'Both are right: Spanish usually leaves out <b>yo</b>, <b>tú</b> and <b>nosotros</b>, because the ending of the doing word already says who.'};
// BEGIN SPANISH RULES
LANG.freeOrder=false;
LANG.bareLeft=['y','qué','quién','dónde','cuándo','por','cómo','cuánto','cuál','de','a','con','en','pero','o','no','sí','aquí','allá'];
// Spanish personal names keep their spelling in every sentence position.
const ltName=n=>String(n||'');
// END SPANISH RULES
const LEVELS=[[0,'Turista','Tourist'],[150,'Viajero','Traveler'],[400,'Conocido','Acquaintance'],[800,'Amigo','Friend'],[1500,'Chilango','Mexico City local'],[3000,'Mexicano de corazón','Mexican at heart']];
/* ===================== COURSE CONTENT ===================== */
/* item: [es, en, note?, altEs?] */
const COURSE = [
{id:'u0',title:'Sonidos',en:'Sounds',tip:'Spanish spelling gives you reliable clues to pronunciation. Its five vowels sound like ah, eh, ee, oh and oo: keep them short and clear. A few letters trick English speakers: <b>j</b> is a breathy "h", <b>ll</b> sounds like the start of "yes" in Mexican Spanish, <b>ñ</b> sounds like the middle of "canyon", and <b>h</b> is silent. These words have familiar English relatives to help you get started.',lessons:[
 {id:'u0a',title:'Letters that trick you',items:[
  ['jirafa','giraffe','j sounds like a breathy English "h".'],
  ['tortilla','tortilla','ll sounds like the start of the English word "yes".'],
  ['piña','pineapple','ñ sounds like the "ny" in "canyon".'],
  ['hotel','hotel','h is always silent: oh-TEHL.'],
  ['chocolate','chocolate','Every vowel is said, even the e at the end.'],
 ]},
 {id:'u0b',title:'Vowels, accents and the r',items:[
  ['café','coffee','A written accent marks the syllable you stress.'],
  ['teléfono','telephone','The accent pulls the stress: teh-LEH-foh-noh.'],
  ['guitarra','guitar','rr is a rolled r. A single r between vowels is one quick tap.'],
  ['taco','taco','Spanish vowels are short and pure: TAH-koh, with no "oo" glide at the end.'],
  ['cereal','cereal','c before e or i sounds like "s" in Mexico.'],
 ]},
]},
{id:'u1',title:'Lo básico',en:'Basics',tip:'Start with <b>Hola</b>: it works with anyone, at any time of day. You can also choose a greeting for the time of day: <b>Buenos días</b> in the morning, <b>Buenas tardes</b> in the afternoon, and <b>Buenas noches</b> after dark.',lessons:[
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
  ['Está bien','OK','Also "it\'s fine". Useful in both polite and casual conversations.'],
  ['¿Cómo estás?','How are you?','To a friend. To a stranger: "¿Cómo está?"'],
  ['Muy bien','Very well'],
  ['No pasa nada','No problem','Literally "nothing happens". The Mexican way to say it\'s fine.'],
  ['Mucho gusto','Nice to meet you','Literally "much pleasure".'],
  ['Buena suerte','Good luck'],
 ]},
 {id:'u1c',title:'Who I am',items:[
  ['Yo','I'],
  ['Tú','You','Informal, one person.'],
  ['Él','He','Keep the accent: it distinguishes "he" from the word for "the".'],
  ['Ella','She'],
  ['Nosotros','We','A group of only women says "nosotras".',['Nosotras']],
  ['Usted','You (polite)','For a stranger or someone older.'],
  ['Ustedes','You (all)','In Mexico, for any group: friends or strangers.'],
  ['Ellos','They (men or mixed)'],
  ['Ellas','They (women)'],
  ['Me llamo Tomás','My name is Tomás','Literally "I call myself Tomás".',['Mi nombre es Tomás']],
  ['¿Cómo te llamas?','What is your name?','Literally "how do you call yourself?"'],
  ['Soy de Estados Unidos','I am from the United States','Mexicans say Estados Unidos: "América" is the whole continent.'],
 ]},
]},
{id:'u21',title:'Plática',en:'Small talk',tip:'Most chats start the same way. Someone asks <b>¿Cómo estás?</b>, you answer with <b>Bien, gracias</b> or <b>Más o menos</b>, and you bounce it back with <b>¿Y tú?</b>',lessons:[
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
  ['¿Puedes repetir?','Can you repeat that?','To a friend. With a stranger, use the polite form.'],
  ['¿Mande?','Sorry, what?','The polite Mexican way to ask someone to say it again.'],
  ['Más despacio, por favor','Slower, please'],
  ['Estoy aprendiendo','I\'m learning','Say it and people slow down for you.'],
  ['Otra vez','One more time'],
  ['Ya entendí','Got it','Literally "now I understood".'],
 ]},
]},
];

// BEGIN SPANISH UNITS
COURSE.push(...[
  {
    "id": "u22",
    "title": "Ser y estar",
    "en": "Being and location",
    "tip": "Use <b>soy</b> for your identity and <b>eres</b> when asking a friend about theirs. A job normally needs no word for “a”.",
    "lessons": [
      {
        "id": "u22a",
        "title": "Identity",
        "items": [
          [
            "soy",
            "I am (identity)",
            "",
            [
              "Yo soy"
            ]
          ],
          [
            "eres",
            "you are (identity)",
            ""
          ],
          [
            "es",
            "he / she / it is (identity)",
            ""
          ],
          [
            "somos",
            "we are (identity)",
            "",
            [
              "Nosotros somos",
              "Nosotras somos"
            ]
          ],
          [
            "son",
            "they / you all are (identity)",
            ""
          ]
        ]
      },
      {
        "id": "u22b",
        "title": "Where you are",
        "items": [
          [
            "estoy",
            "I am (state or location)",
            "",
            [
              "Yo estoy"
            ]
          ],
          [
            "estás",
            "you are (state or location)",
            ""
          ],
          [
            "está",
            "he / she / it is (state or location)",
            ""
          ],
          [
            "estamos",
            "we are (state or location)",
            "",
            [
              "Nosotros estamos",
              "Nosotras estamos"
            ]
          ],
          [
            "están",
            "they / you all are (state or location)",
            ""
          ]
        ]
      },
      {
        "id": "u22c",
        "title": "Here and there",
        "items": [
          [
            "aquí",
            "here",
            ""
          ],
          [
            "allá",
            "over there",
            ""
          ],
          [
            "Soy estudiante",
            "I am a student",
            "",
            [
              "Yo soy estudiante"
            ]
          ],
          [
            "Estamos aquí",
            "We are here",
            "",
            [
              "Nosotros estamos aquí",
              "Nosotras estamos aquí"
            ]
          ],
          [
            "¿Dónde estás?",
            "Where are you?",
            ""
          ]
        ]
      },
      {
        "id": "u22d",
        "title": "Who and where",
        "items": [
          [
            "¿Eres estudiante?",
            "Are you a student?",
            ""
          ],
          [
            "Ella es mexicana",
            "She is Mexican",
            ""
          ],
          [
            "Somos amigos",
            "We are friends",
            "",
            [
              "Nosotros somos amigos",
              "Nosotras somos amigos"
            ]
          ],
          [
            "Estoy en México",
            "I am in Mexico",
            "",
            [
              "Yo estoy en México"
            ]
          ],
          [
            "¿Están aquí?",
            "Are they here?",
            ""
          ]
        ]
      },
      {
        "id": "u22e",
        "title": "Names for the two verbs",
        "items": [
          [
            "ser",
            "to be (identity)",
            ""
          ],
          [
            "estar",
            "to be (state or location)",
            ""
          ],
          [
            "Estoy aquí",
            "I am here",
            "",
            [
              "Yo estoy aquí"
            ]
          ],
          [
            "¿Somos amigos?",
            "Are we friends?",
            ""
          ],
          [
            "¿Es de México?",
            "Is he / she from Mexico?",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u23",
    "title": "Lo que hacemos",
    "en": "Everyday verbs",
    "tip": "For these regular verbs, the “I” form ends in <b>-o</b> and the informal “you” form ends in <b>-as</b>.",
    "lessons": [
      {
        "id": "u23a",
        "title": "Speak and work",
        "items": [
          [
            "hablar",
            "to speak",
            ""
          ],
          [
            "hablas",
            "you speak",
            ""
          ],
          [
            "trabajar",
            "to work",
            ""
          ],
          [
            "trabajas",
            "you work",
            ""
          ],
          [
            "Trabajo aquí",
            "I work here",
            "",
            [
              "Yo trabajo aquí"
            ]
          ]
        ]
      },
      {
        "id": "u23b",
        "title": "Eat and drink",
        "items": [
          [
            "comer",
            "to eat",
            ""
          ],
          [
            "como",
            "I eat",
            "",
            [
              "Yo como"
            ]
          ],
          [
            "comes",
            "you eat",
            ""
          ],
          [
            "beber",
            "to drink",
            ""
          ],
          [
            "bebo",
            "I drink",
            "",
            [
              "Yo bebo"
            ]
          ]
        ]
      },
      {
        "id": "u23c",
        "title": "Live and learn",
        "items": [
          [
            "vivir",
            "to live",
            ""
          ],
          [
            "vives",
            "you live",
            ""
          ],
          [
            "aprender",
            "to learn",
            ""
          ],
          [
            "aprendo",
            "I learn",
            "",
            [
              "Yo aprendo"
            ]
          ],
          [
            "No trabajo aquí",
            "I do not work here",
            "",
            [
              "Yo no trabajo aquí"
            ]
          ]
        ]
      },
      {
        "id": "u23d",
        "title": "We do it too",
        "items": [
          [
            "hablamos",
            "we speak",
            "",
            [
              "Nosotros hablamos",
              "Nosotras hablamos"
            ]
          ],
          [
            "comemos",
            "we eat",
            "",
            [
              "Nosotros comemos",
              "Nosotras comemos"
            ]
          ],
          [
            "vivimos",
            "we live",
            "",
            [
              "Nosotros vivimos",
              "Nosotras vivimos"
            ]
          ],
          [
            "Aprendemos español",
            "We learn Spanish",
            "",
            [
              "Nosotros aprendemos español",
              "Nosotras aprendemos español"
            ]
          ],
          [
            "No hablo inglés",
            "I do not speak English",
            "",
            [
              "Yo no hablo inglés"
            ]
          ]
        ]
      },
      {
        "id": "u23e",
        "title": "Talking about someone else",
        "items": [
          [
            "habla",
            "he / she speaks",
            ""
          ],
          [
            "trabaja",
            "he / she works",
            ""
          ],
          [
            "come",
            "he / she eats",
            ""
          ],
          [
            "vive",
            "he / she lives",
            ""
          ],
          [
            "Vivo aquí",
            "I live here",
            "",
            [
              "Yo vivo aquí"
            ]
          ]
        ]
      },
      {
        "id": "u23f",
        "title": "You and a group",
        "items": [
          [
            "hablan",
            "they / you all speak",
            ""
          ],
          [
            "trabajan",
            "they / you all work",
            ""
          ],
          [
            "bebes",
            "you drink",
            ""
          ],
          [
            "bebe",
            "he / she drinks",
            ""
          ],
          [
            "beben",
            "they / you all drink",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u24",
    "title": "Preguntas",
    "en": "Asking questions",
    "tip": "Question words carry written accents. Choose the one that asks for the kind of information you need.",
    "lessons": [
      {
        "id": "u24a",
        "title": "Question starters",
        "items": [
          [
            "qué",
            "what",
            ""
          ],
          [
            "quién",
            "who",
            ""
          ],
          [
            "dónde",
            "where",
            ""
          ],
          [
            "cuándo",
            "when",
            ""
          ],
          [
            "por qué",
            "why",
            ""
          ]
        ]
      },
      {
        "id": "u24b",
        "title": "How and how much",
        "items": [
          [
            "cómo",
            "how",
            ""
          ],
          [
            "cuánto",
            "how much",
            ""
          ],
          [
            "cuál",
            "which one",
            ""
          ],
          [
            "¿Qué es?",
            "What is it?",
            ""
          ],
          [
            "¿Quién es?",
            "Who is it?",
            ""
          ]
        ]
      },
      {
        "id": "u24c",
        "title": "Asking a friend",
        "items": [
          [
            "¿Dónde vives?",
            "Where do you live?",
            ""
          ],
          [
            "¿Hablas inglés?",
            "Do you speak English?",
            ""
          ],
          [
            "¿Cuándo trabajas?",
            "When do you work?",
            ""
          ],
          [
            "¿Por qué aprendes español?",
            "Why do you learn Spanish?",
            ""
          ],
          [
            "¿Cómo se llama?",
            "What is his / her name?",
            ""
          ]
        ]
      },
      {
        "id": "u24d",
        "title": "Things around you",
        "items": [
          [
            "el libro",
            "the book",
            ""
          ],
          [
            "la mesa",
            "the table",
            ""
          ],
          [
            "la silla",
            "the chair",
            ""
          ],
          [
            "¿Dónde está el libro?",
            "Where is the book?",
            ""
          ],
          [
            "¿Qué significa?",
            "What does it mean?",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u25",
    "title": "Sobre mí",
    "en": "Talking about yourself",
    "tip": "Use <b>de</b> for origin. Keep the name of your country after it.",
    "lessons": [
      {
        "id": "u25a",
        "title": "Where you are from",
        "items": [
          [
            "México",
            "Mexico",
            ""
          ],
          [
            "Estados Unidos",
            "the United States",
            ""
          ],
          [
            "Soy de México",
            "I am from Mexico",
            "",
            [
              "Yo soy de México"
            ]
          ],
          [
            "¿De dónde eres?",
            "Where are you from?",
            ""
          ],
          [
            "Vivo en México",
            "I live in Mexico",
            "",
            [
              "Yo vivo en México"
            ]
          ]
        ]
      },
      {
        "id": "u25b",
        "title": "Have and want",
        "items": [
          [
            "tengo",
            "I have",
            ""
          ],
          [
            "tienes",
            "you have",
            ""
          ],
          [
            "quiero",
            "I want",
            ""
          ],
          [
            "quieres",
            "you want",
            ""
          ],
          [
            "necesito",
            "I need",
            ""
          ]
        ]
      },
      {
        "id": "u25c",
        "title": "Say a little more",
        "items": [
          [
            "años",
            "years",
            ""
          ],
          [
            "¿Cuántos años tienes?",
            "How old are you?",
            ""
          ],
          [
            "Soy maestro",
            "I am a teacher",
            "A woman can say “Soy maestra”.",
            [
              "Yo soy maestro"
            ]
          ],
          [
            "Soy de aquí",
            "I am from here",
            "",
            [
              "Yo soy de aquí"
            ]
          ],
          [
            "Trabajo en México",
            "I work in Mexico",
            "",
            [
              "Yo trabajo en México"
            ]
          ]
        ]
      },
      {
        "id": "u25d",
        "title": "Things you need",
        "items": [
          [
            "el agua",
            "the water",
            "Water is feminine, but takes “el” directly before its stressed opening a."
          ],
          [
            "el pan",
            "the bread",
            ""
          ],
          [
            "Quiero agua",
            "I want water",
            "",
            [
              "Yo quiero agua"
            ]
          ],
          [
            "Necesito un libro",
            "I need a book",
            "",
            [
              "Yo necesito un libro"
            ]
          ],
          [
            "Tengo un teléfono",
            "I have a telephone",
            "",
            [
              "Yo tengo un teléfono"
            ]
          ]
        ]
      }
    ]
  },
  {
    "id": "u2",
    "title": "Números",
    "en": "Numbers",
    "tip": "Say the numbers in order, then mix them up. Practise hearing each number on its own.",
    "lessons": [
      {
        "id": "u2a",
        "title": "One to five",
        "items": [
          [
            "uno",
            "one",
            ""
          ],
          [
            "dos",
            "two",
            ""
          ],
          [
            "tres",
            "three",
            ""
          ],
          [
            "cuatro",
            "four",
            ""
          ],
          [
            "cinco",
            "five",
            ""
          ]
        ]
      },
      {
        "id": "u2b",
        "title": "Six to ten",
        "items": [
          [
            "seis",
            "six",
            ""
          ],
          [
            "siete",
            "seven",
            ""
          ],
          [
            "ocho",
            "eight",
            ""
          ],
          [
            "nueve",
            "nine",
            ""
          ],
          [
            "diez",
            "ten",
            ""
          ]
        ]
      },
      {
        "id": "u2c",
        "title": "Eleven to fifteen",
        "items": [
          [
            "once",
            "eleven",
            ""
          ],
          [
            "doce",
            "twelve",
            ""
          ],
          [
            "trece",
            "thirteen",
            ""
          ],
          [
            "catorce",
            "fourteen",
            ""
          ],
          [
            "quince",
            "fifteen",
            ""
          ]
        ]
      },
      {
        "id": "u2d",
        "title": "Useful larger numbers",
        "items": [
          [
            "veinte",
            "twenty",
            ""
          ],
          [
            "treinta",
            "thirty",
            ""
          ],
          [
            "cien",
            "one hundred",
            ""
          ],
          [
            "pesos",
            "pesos",
            ""
          ],
          [
            "Tengo veinte años",
            "I am twenty years old",
            "",
            [
              "Yo tengo veinte años"
            ]
          ]
        ]
      },
      {
        "id": "u2e",
        "title": "Sixteen to twenty-one",
        "items": [
          [
            "dieciséis",
            "sixteen",
            ""
          ],
          [
            "diecisiete",
            "seventeen",
            ""
          ],
          [
            "dieciocho",
            "eighteen",
            ""
          ],
          [
            "diecinueve",
            "nineteen",
            ""
          ],
          [
            "veintiuno",
            "twenty-one",
            ""
          ]
        ]
      },
      {
        "id": "u2f",
        "title": "Tens and zero",
        "items": [
          [
            "cero",
            "zero",
            ""
          ],
          [
            "cuarenta",
            "forty",
            ""
          ],
          [
            "cincuenta",
            "fifty",
            ""
          ],
          [
            "sesenta",
            "sixty",
            ""
          ],
          [
            "setenta",
            "seventy",
            ""
          ]
        ]
      },
      {
        "id": "u2g",
        "title": "Putting numbers together",
        "items": [
          [
            "ochenta",
            "eighty",
            ""
          ],
          [
            "noventa",
            "ninety",
            ""
          ],
          [
            "veintidós",
            "twenty-two",
            ""
          ],
          [
            "treinta y uno",
            "thirty-one",
            ""
          ],
          [
            "ciento uno",
            "one hundred and one",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u5",
    "title": "El tiempo",
    "en": "Days and time",
    "tip": "Days of the week are normally written with lowercase letters in Spanish.",
    "lessons": [
      {
        "id": "u5a",
        "title": "Days of the week",
        "items": [
          [
            "lunes",
            "Monday",
            ""
          ],
          [
            "martes",
            "Tuesday",
            ""
          ],
          [
            "miércoles",
            "Wednesday",
            ""
          ],
          [
            "jueves",
            "Thursday",
            ""
          ],
          [
            "viernes",
            "Friday",
            ""
          ]
        ]
      },
      {
        "id": "u5b",
        "title": "The weekend",
        "items": [
          [
            "sábado",
            "Saturday",
            ""
          ],
          [
            "domingo",
            "Sunday",
            ""
          ],
          [
            "hoy",
            "today",
            ""
          ],
          [
            "mañana",
            "tomorrow",
            "The same word can mean “morning” in a different phrase."
          ],
          [
            "el fin de semana",
            "the weekend",
            ""
          ]
        ]
      },
      {
        "id": "u5c",
        "title": "Telling the time",
        "items": [
          [
            "¿Qué hora es?",
            "What time is it?",
            ""
          ],
          [
            "Es la una",
            "It is one o'clock",
            ""
          ],
          [
            "Son las dos",
            "It is two o'clock",
            ""
          ],
          [
            "Son las tres y media",
            "It is half past three",
            ""
          ],
          [
            "a las ocho",
            "at eight o'clock",
            ""
          ]
        ]
      },
      {
        "id": "u5d",
        "title": "Parts of the day",
        "items": [
          [
            "por la mañana",
            "in the morning",
            ""
          ],
          [
            "por la tarde",
            "in the afternoon",
            ""
          ],
          [
            "por la noche",
            "at night",
            ""
          ],
          [
            "temprano",
            "early",
            ""
          ],
          [
            "tarde",
            "late",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u26",
    "title": "Mi día",
    "en": "My day",
    "tip": "In these actions, <b>me</b> shows that you do something involving yourself. Keep it before the conjugated verb.",
    "lessons": [
      {
        "id": "u26a",
        "title": "Starting the day",
        "items": [
          [
            "Me despierto",
            "I wake up",
            "",
            [
              "Yo me despierto"
            ]
          ],
          [
            "Me levanto",
            "I get up",
            "",
            [
              "Yo me levanto"
            ]
          ],
          [
            "Me baño",
            "I take a bath / shower",
            "",
            [
              "Yo me baño"
            ]
          ],
          [
            "Me visto",
            "I get dressed",
            "",
            [
              "Yo me visto"
            ]
          ],
          [
            "desayuno",
            "I eat breakfast",
            "",
            [
              "Yo desayuno"
            ]
          ]
        ]
      },
      {
        "id": "u26b",
        "title": "Through the day",
        "items": [
          [
            "salgo",
            "I go out",
            "",
            [
              "Yo salgo"
            ]
          ],
          [
            "Voy al trabajo",
            "I go to work",
            "",
            [
              "Yo voy al trabajo"
            ]
          ],
          [
            "regreso",
            "I return",
            "",
            [
              "Yo regreso"
            ]
          ],
          [
            "descanso",
            "I rest",
            "",
            [
              "Yo descanso"
            ]
          ],
          [
            "duermo",
            "I sleep",
            "",
            [
              "Yo duermo"
            ]
          ]
        ]
      },
      {
        "id": "u26c",
        "title": "Every day",
        "items": [
          [
            "siempre",
            "always",
            ""
          ],
          [
            "a veces",
            "sometimes",
            ""
          ],
          [
            "nunca",
            "never",
            ""
          ],
          [
            "todos los días",
            "every day",
            ""
          ],
          [
            "después",
            "afterwards",
            ""
          ]
        ]
      },
      {
        "id": "u26d",
        "title": "Your routine",
        "items": [
          [
            "Me levanto temprano",
            "I get up early",
            "",
            [
              "Yo me levanto temprano"
            ]
          ],
          [
            "Desayuno a las ocho",
            "I eat breakfast at eight",
            "",
            [
              "Yo desayuno a las ocho"
            ]
          ],
          [
            "Trabajo por la mañana",
            "I work in the morning",
            "",
            [
              "Yo trabajo por la mañana"
            ]
          ],
          [
            "Después descanso",
            "Afterwards I rest",
            ""
          ],
          [
            "Me acuesto tarde",
            "I go to bed late",
            "",
            [
              "Yo me acuesto tarde"
            ]
          ]
        ]
      },
      {
        "id": "u26e",
        "title": "Ask about a routine",
        "items": [
          [
            "¿Te levantas temprano?",
            "Do you get up early?",
            ""
          ],
          [
            "¿Desayunas a las ocho?",
            "Do you eat breakfast at eight?",
            ""
          ],
          [
            "¿Duermes bien?",
            "Do you sleep well?",
            ""
          ],
          [
            "¿A qué hora te acuestas?",
            "What time do you go to bed?",
            ""
          ],
          [
            "Me lavo las manos",
            "I wash my hands",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u3",
    "title": "Comida y bebida",
    "en": "Food and drink",
    "tip": "Learn the article with each food. The noun keeps its form when it is the thing you eat.",
    "lessons": [
      {
        "id": "u3a",
        "title": "At the table",
        "items": [
          [
            "la leche",
            "the milk",
            ""
          ],
          [
            "el queso",
            "the cheese",
            ""
          ],
          [
            "la carne",
            "the meat",
            ""
          ],
          [
            "el pollo",
            "the chicken",
            ""
          ],
          [
            "el pescado",
            "the fish (food)",
            ""
          ]
        ]
      },
      {
        "id": "u3b",
        "title": "More food",
        "items": [
          [
            "el arroz",
            "the rice",
            ""
          ],
          [
            "el huevo",
            "the egg",
            ""
          ],
          [
            "la sopa",
            "the soup",
            ""
          ],
          [
            "la manzana",
            "the apple",
            ""
          ],
          [
            "la papa",
            "the potato",
            "In Mexico, the everyday word is “papa”."
          ]
        ]
      },
      {
        "id": "u3c",
        "title": "Drinks and flavours",
        "items": [
          [
            "el té",
            "the tea",
            ""
          ],
          [
            "el jugo",
            "the juice",
            ""
          ],
          [
            "la cerveza",
            "the beer",
            ""
          ],
          [
            "el azúcar",
            "the sugar",
            ""
          ],
          [
            "la sal",
            "the salt",
            ""
          ]
        ]
      },
      {
        "id": "u3d",
        "title": "Say what you eat",
        "items": [
          [
            "Como arroz",
            "I eat rice",
            "",
            [
              "Yo como arroz"
            ]
          ],
          [
            "Bebo agua",
            "I drink water",
            "",
            [
              "Yo bebo agua"
            ]
          ],
          [
            "No como carne",
            "I do not eat meat",
            "",
            [
              "Yo no como carne"
            ]
          ],
          [
            "Tengo hambre",
            "I am hungry",
            "",
            [
              "Yo tengo hambre"
            ]
          ],
          [
            "Tengo sed",
            "I am thirsty",
            "",
            [
              "Yo tengo sed"
            ]
          ]
        ]
      }
    ]
  },
  {
    "id": "u15",
    "title": "En el restaurante",
    "en": "At the restaurant",
    "tip": "Polite requests can be short. Add <b>por favor</b> after what you need.",
    "lessons": [
      {
        "id": "u15a",
        "title": "Getting seated",
        "items": [
          [
            "el restaurante",
            "the restaurant",
            ""
          ],
          [
            "el menú",
            "the menu",
            ""
          ],
          [
            "Una mesa para dos",
            "A table for two",
            ""
          ],
          [
            "El menú, por favor",
            "The menu, please",
            ""
          ],
          [
            "¿Qué recomienda?",
            "What do you recommend?",
            ""
          ]
        ]
      },
      {
        "id": "u15b",
        "title": "Ordering",
        "items": [
          [
            "Quiero un taco",
            "I want a taco",
            "",
            [
              "Yo quiero un taco"
            ]
          ],
          [
            "Un café, por favor",
            "A coffee, please",
            ""
          ],
          [
            "sin azúcar",
            "without sugar",
            ""
          ],
          [
            "con leche",
            "with milk",
            ""
          ],
          [
            "agua sin gas",
            "still water",
            ""
          ]
        ]
      },
      {
        "id": "u15c",
        "title": "Diet and taste",
        "items": [
          [
            "Está rico",
            "It tastes good",
            ""
          ],
          [
            "Está picante",
            "It is spicy",
            ""
          ],
          [
            "Soy alérgico a los cacahuates",
            "I am allergic to peanuts",
            "A woman says “alérgica”.",
            [
              "Yo soy alérgico a los cacahuates"
            ]
          ],
          [
            "sin carne",
            "without meat",
            ""
          ],
          [
            "¿Tiene leche?",
            "Does it contain milk?",
            ""
          ]
        ]
      },
      {
        "id": "u15d",
        "title": "Paying",
        "items": [
          [
            "La cuenta, por favor",
            "The bill, please",
            ""
          ],
          [
            "¿Puedo pagar con tarjeta?",
            "Can I pay by card?",
            ""
          ],
          [
            "en efectivo",
            "in cash",
            ""
          ],
          [
            "la propina",
            "the tip",
            ""
          ],
          [
            "¡Buen provecho!",
            "Enjoy your meal!",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u4",
    "title": "La ciudad",
    "en": "Around town",
    "tip": "Use <b>el</b> or <b>la</b> with each place. These nouns will help you ask where things are.",
    "lessons": [
      {
        "id": "u4a",
        "title": "Places",
        "items": [
          [
            "la ciudad",
            "the city",
            ""
          ],
          [
            "la calle",
            "the street",
            ""
          ],
          [
            "el parque",
            "the park",
            ""
          ],
          [
            "el museo",
            "the museum",
            ""
          ],
          [
            "la plaza",
            "the square",
            ""
          ]
        ]
      },
      {
        "id": "u4b",
        "title": "Useful stops",
        "items": [
          [
            "la tienda",
            "the shop",
            ""
          ],
          [
            "el banco",
            "the bank",
            ""
          ],
          [
            "la farmacia",
            "the pharmacy",
            ""
          ],
          [
            "el hospital",
            "the hospital",
            ""
          ],
          [
            "el mercado",
            "the market",
            ""
          ]
        ]
      },
      {
        "id": "u4c",
        "title": "Near and far",
        "items": [
          [
            "cerca",
            "nearby",
            ""
          ],
          [
            "lejos",
            "far away",
            ""
          ],
          [
            "al lado de",
            "next to",
            ""
          ],
          [
            "frente a",
            "opposite",
            ""
          ],
          [
            "¿Dónde está la farmacia?",
            "Where is the pharmacy?",
            ""
          ]
        ]
      },
      {
        "id": "u4d",
        "title": "Go somewhere",
        "items": [
          [
            "voy",
            "I go",
            ""
          ],
          [
            "vas",
            "you go",
            ""
          ],
          [
            "vamos",
            "we go",
            ""
          ],
          [
            "Voy al parque",
            "I go to the park",
            "",
            [
              "Yo voy al parque"
            ]
          ],
          [
            "Vamos a la tienda",
            "We go to the shop",
            "",
            [
              "Nosotros vamos a la tienda",
              "Nosotras vamos a la tienda"
            ]
          ]
        ]
      }
    ]
  },
  {
    "id": "u14",
    "title": "Direcciones",
    "en": "Directions",
    "tip": "Use these short phrases to follow directions. Practise pointing as you say them.",
    "lessons": [
      {
        "id": "u14a",
        "title": "Which way",
        "items": [
          [
            "a la derecha",
            "to the right",
            ""
          ],
          [
            "a la izquierda",
            "to the left",
            ""
          ],
          [
            "derecho",
            "straight ahead",
            "In directions in Mexico, this commonly means “straight ahead”."
          ],
          [
            "la esquina",
            "the corner",
            ""
          ],
          [
            "la cuadra",
            "the city block",
            ""
          ]
        ]
      },
      {
        "id": "u14b",
        "title": "Following instructions",
        "items": [
          [
            "Siga derecho",
            "Go straight ahead (polite)",
            ""
          ],
          [
            "Gire a la derecha",
            "Turn right (polite)",
            ""
          ],
          [
            "Cruce la calle",
            "Cross the street (polite)",
            ""
          ],
          [
            "en la esquina",
            "on the corner",
            ""
          ],
          [
            "dos cuadras",
            "two blocks",
            ""
          ]
        ]
      },
      {
        "id": "u14c",
        "title": "Finding a place",
        "items": [
          [
            "¿Dónde está el museo?",
            "Where is the museum?",
            ""
          ],
          [
            "El banco está cerca",
            "The bank is nearby",
            ""
          ],
          [
            "La tienda está lejos",
            "The shop is far away",
            ""
          ],
          [
            "Está al lado del banco",
            "It is next to the bank",
            ""
          ],
          [
            "Estoy perdido",
            "I am lost",
            "A woman says “perdida”.",
            [
              "Yo estoy perdido"
            ]
          ]
        ]
      },
      {
        "id": "u14d",
        "title": "Ask for help",
        "items": [
          [
            "¿Me puede ayudar?",
            "Can you help me? (polite)",
            ""
          ],
          [
            "¿Está cerca?",
            "Is it nearby?",
            ""
          ],
          [
            "¿A la derecha?",
            "To the right? (checking)",
            ""
          ],
          [
            "¿Cuántas cuadras?",
            "How many blocks?",
            ""
          ],
          [
            "Ya veo",
            "I see now",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u7",
    "title": "Transporte",
    "en": "Transport",
    "tip": "These are common transport words in Mexico. Learn the noun and its article together.",
    "lessons": [
      {
        "id": "u7a",
        "title": "Ways to travel",
        "items": [
          [
            "el camión",
            "the bus (Mexico)",
            ""
          ],
          [
            "el metro",
            "the subway",
            ""
          ],
          [
            "el taxi",
            "the taxi",
            ""
          ],
          [
            "el coche",
            "the car",
            ""
          ],
          [
            "la bicicleta",
            "the bicycle",
            ""
          ]
        ]
      },
      {
        "id": "u7b",
        "title": "At the station",
        "items": [
          [
            "la estación",
            "the station",
            ""
          ],
          [
            "la parada",
            "the stop",
            ""
          ],
          [
            "el boleto",
            "the ticket",
            ""
          ],
          [
            "el aeropuerto",
            "the airport",
            ""
          ],
          [
            "el tren",
            "the train",
            ""
          ]
        ]
      },
      {
        "id": "u7c",
        "title": "Making the trip",
        "items": [
          [
            "en camión",
            "by bus",
            ""
          ],
          [
            "en metro",
            "by subway",
            ""
          ],
          [
            "a pie",
            "on foot",
            ""
          ],
          [
            "Voy en taxi",
            "I am going by taxi",
            "",
            [
              "Yo voy en taxi"
            ]
          ],
          [
            "Un boleto, por favor",
            "One ticket, please",
            ""
          ]
        ]
      },
      {
        "id": "u7d",
        "title": "Travel questions",
        "items": [
          [
            "¿Va al centro?",
            "Does it go downtown?",
            ""
          ],
          [
            "¿A qué hora sale?",
            "What time does it leave?",
            ""
          ],
          [
            "¿Cuánto cuesta el boleto?",
            "How much is the ticket?",
            ""
          ],
          [
            "Quiero ir al aeropuerto",
            "I want to go to the airport",
            "",
            [
              "Yo quiero ir al aeropuerto"
            ]
          ],
          [
            "Aquí, por favor",
            "Here, please",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u16",
    "title": "De compras",
    "en": "Shopping",
    "tip": "These words help you identify an item and ask its price.",
    "lessons": [
      {
        "id": "u16a",
        "title": "What you need",
        "items": [
          [
            "el precio",
            "the price",
            ""
          ],
          [
            "el dinero",
            "the money",
            ""
          ],
          [
            "la tarjeta",
            "the card",
            ""
          ],
          [
            "la bolsa",
            "the bag",
            ""
          ],
          [
            "¿Cuánto cuesta?",
            "How much does it cost?",
            ""
          ]
        ]
      },
      {
        "id": "u16b",
        "title": "Choosing",
        "items": [
          [
            "este",
            "this one (masculine)",
            ""
          ],
          [
            "esta",
            "this one (feminine)",
            ""
          ],
          [
            "ese",
            "that one (masculine)",
            ""
          ],
          [
            "esa",
            "that one (feminine)",
            ""
          ],
          [
            "otro",
            "another (masculine)",
            ""
          ]
        ]
      },
      {
        "id": "u16c",
        "title": "Prices",
        "items": [
          [
            "caro",
            "expensive",
            ""
          ],
          [
            "barato",
            "cheap",
            ""
          ],
          [
            "Cuesta treinta pesos",
            "It costs thirty pesos",
            ""
          ],
          [
            "Quiero dos manzanas",
            "I want two apples",
            "",
            [
              "Yo quiero dos manzanas"
            ]
          ],
          [
            "Es muy caro",
            "It is very expensive",
            ""
          ]
        ]
      },
      {
        "id": "u16d",
        "title": "At the checkout",
        "items": [
          [
            "¿Tiene cambio?",
            "Do you have change?",
            ""
          ],
          [
            "¿Acepta tarjeta?",
            "Do you accept cards?",
            ""
          ],
          [
            "No necesito bolsa",
            "I do not need a bag",
            "",
            [
              "Yo no necesito bolsa"
            ]
          ],
          [
            "Me llevo este",
            "I will take this one",
            "",
            [
              "Yo me llevo este"
            ]
          ],
          [
            "¿Tiene otro?",
            "Do you have another one?",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u28",
    "title": "Ropa",
    "en": "Clothes and colours",
    "tip": "Clothing words have a grammatical gender even when anyone can wear the item.",
    "lessons": [
      {
        "id": "u28a",
        "title": "Clothes",
        "items": [
          [
            "la camisa",
            "the shirt",
            ""
          ],
          [
            "la playera",
            "the T-shirt (Mexico)",
            ""
          ],
          [
            "el pantalón",
            "the trousers",
            ""
          ],
          [
            "la chamarra",
            "the jacket (Mexico)",
            ""
          ],
          [
            "los zapatos",
            "the shoes",
            ""
          ]
        ]
      },
      {
        "id": "u28b",
        "title": "Colours",
        "items": [
          [
            "rojo",
            "red",
            ""
          ],
          [
            "azul",
            "blue",
            ""
          ],
          [
            "verde",
            "green",
            ""
          ],
          [
            "negro",
            "black",
            ""
          ],
          [
            "blanco",
            "white",
            ""
          ]
        ]
      },
      {
        "id": "u28c",
        "title": "Size and fit",
        "items": [
          [
            "grande",
            "big",
            ""
          ],
          [
            "pequeño",
            "small",
            ""
          ],
          [
            "la talla",
            "the clothing size",
            ""
          ],
          [
            "Me queda bien",
            "It fits me well",
            ""
          ],
          [
            "Es muy grande",
            "It is very big",
            ""
          ]
        ]
      },
      {
        "id": "u28d",
        "title": "Trying something on",
        "items": [
          [
            "una camisa roja",
            "a red shirt",
            ""
          ],
          [
            "una chamarra azul",
            "a blue jacket",
            ""
          ],
          [
            "zapatos negros",
            "black shoes",
            ""
          ],
          [
            "¿Me la puedo probar?",
            "Can I try it on? (the jacket)",
            ""
          ],
          [
            "Quiero una talla más grande",
            "I want a larger size",
            "",
            [
              "Yo quiero una talla más grande"
            ]
          ]
        ]
      },
      {
        "id": "u28e",
        "title": "Checking the fit",
        "items": [
          [
            "¿Te queda bien?",
            "Does it fit you well?",
            ""
          ],
          [
            "¿Quieres una talla más pequeña?",
            "Do you want a smaller size?",
            ""
          ],
          [
            "¿La quiere en azul?",
            "Would you like it in blue? (polite)",
            ""
          ],
          [
            "Me queda pequeña",
            "It is too small on me (feminine item)",
            ""
          ],
          [
            "Me llevo la chamarra",
            "I will take the jacket",
            "",
            [
              "Yo me llevo la chamarra"
            ]
          ]
        ]
      }
    ]
  },
  {
    "id": "u6",
    "title": "Familia",
    "en": "Family",
    "tip": "The article is part of the noun phrase. Keep the masculine and feminine family terms distinct.",
    "lessons": [
      {
        "id": "u6a",
        "title": "Close family",
        "items": [
          [
            "la madre",
            "the mother",
            ""
          ],
          [
            "el padre",
            "the father",
            ""
          ],
          [
            "el hijo",
            "the son",
            ""
          ],
          [
            "la hija",
            "the daughter",
            ""
          ],
          [
            "la familia",
            "the family",
            ""
          ]
        ]
      },
      {
        "id": "u6b",
        "title": "More relatives",
        "items": [
          [
            "el hermano",
            "the brother",
            ""
          ],
          [
            "la hermana",
            "the sister",
            ""
          ],
          [
            "la abuela",
            "the grandmother",
            ""
          ],
          [
            "el abuelo",
            "the grandfather",
            ""
          ],
          [
            "los padres",
            "the parents",
            ""
          ]
        ]
      },
      {
        "id": "u6c",
        "title": "My and your",
        "items": [
          [
            "mi familia",
            "my family",
            ""
          ],
          [
            "tu hermano",
            "your brother",
            ""
          ],
          [
            "mis hijos",
            "my children",
            ""
          ],
          [
            "Tengo una hermana",
            "I have a sister",
            "",
            [
              "Yo tengo una hermana"
            ]
          ],
          [
            "No tengo hermanos",
            "I have no siblings",
            "",
            [
              "Yo no tengo hermanos"
            ]
          ]
        ]
      },
      {
        "id": "u6d",
        "title": "Introducing family",
        "items": [
          [
            "Ella es mi madre",
            "She is my mother",
            ""
          ],
          [
            "Él es mi padre",
            "He is my father",
            ""
          ],
          [
            "¿Tienes hijos?",
            "Do you have children?",
            ""
          ],
          [
            "Tengo dos hijos",
            "I have two children",
            "",
            [
              "Yo tengo dos hijos"
            ]
          ],
          [
            "Mi familia vive aquí",
            "My family lives here",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u30",
    "title": "La casa",
    "en": "At home",
    "tip": "Learn each noun with its article, then picture where it is in your home.",
    "lessons": [
      {
        "id": "u30a",
        "title": "Your home",
        "items": [
          [
            "la casa",
            "the house",
            ""
          ],
          [
            "el departamento",
            "the apartment (Mexico)",
            ""
          ],
          [
            "la cocina",
            "the kitchen",
            ""
          ],
          [
            "el baño",
            "the bathroom",
            ""
          ],
          [
            "la recámara",
            "the bedroom (Mexico)",
            ""
          ]
        ]
      },
      {
        "id": "u30b",
        "title": "Inside",
        "items": [
          [
            "la cama",
            "the bed",
            ""
          ],
          [
            "la puerta",
            "the door",
            ""
          ],
          [
            "la ventana",
            "the window",
            ""
          ],
          [
            "el sofá",
            "the sofa",
            ""
          ],
          [
            "la llave",
            "the key",
            ""
          ]
        ]
      },
      {
        "id": "u30c",
        "title": "What there is",
        "items": [
          [
            "hay",
            "there is / there are",
            ""
          ],
          [
            "Hay una mesa",
            "There is a table",
            ""
          ],
          [
            "Hay dos sillas",
            "There are two chairs",
            ""
          ],
          [
            "No hay agua",
            "There is no water",
            ""
          ],
          [
            "¿Hay un baño?",
            "Is there a bathroom?",
            ""
          ]
        ]
      },
      {
        "id": "u30d",
        "title": "Where things are",
        "items": [
          [
            "La llave está aquí",
            "The key is here",
            ""
          ],
          [
            "La puerta está abierta",
            "The door is open",
            ""
          ],
          [
            "La ventana está cerrada",
            "The window is closed",
            ""
          ],
          [
            "Vivo en un departamento",
            "I live in an apartment",
            "",
            [
              "Yo vivo en un departamento"
            ]
          ],
          [
            "Mi casa es pequeña",
            "My house is small",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u29",
    "title": "Describir",
    "en": "Describing people and things",
    "tip": "Many describing words end in <b>-o</b> for a masculine noun and <b>-a</b> for a feminine noun.",
    "lessons": [
      {
        "id": "u29a",
        "title": "Describing people",
        "items": [
          [
            "alto",
            "tall",
            ""
          ],
          [
            "bajo",
            "short (height)",
            ""
          ],
          [
            "joven",
            "young",
            ""
          ],
          [
            "mayor",
            "older",
            ""
          ],
          [
            "amable",
            "kind",
            ""
          ]
        ]
      },
      {
        "id": "u29b",
        "title": "Describing things",
        "items": [
          [
            "nuevo",
            "new",
            ""
          ],
          [
            "viejo",
            "old",
            ""
          ],
          [
            "bonito",
            "pretty",
            ""
          ],
          [
            "bueno",
            "good",
            ""
          ],
          [
            "malo",
            "bad",
            ""
          ]
        ]
      },
      {
        "id": "u29c",
        "title": "Matching endings",
        "items": [
          [
            "Mi hermano es alto",
            "My brother is tall",
            ""
          ],
          [
            "Mi hermana es alta",
            "My sister is tall",
            ""
          ],
          [
            "Los libros son nuevos",
            "The books are new",
            ""
          ],
          [
            "La casa es bonita",
            "The house is pretty",
            ""
          ],
          [
            "Son muy amables",
            "They are very kind",
            ""
          ]
        ]
      },
      {
        "id": "u29d",
        "title": "Comparisons",
        "items": [
          [
            "más grande que",
            "bigger than",
            ""
          ],
          [
            "menos caro",
            "less expensive",
            ""
          ],
          [
            "mejor",
            "better",
            ""
          ],
          [
            "peor",
            "worse",
            ""
          ],
          [
            "Este es más barato",
            "This one is cheaper",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u9",
    "title": "Cómo me siento",
    "en": "Feelings and weather",
    "tip": "Use the state verb for how you feel now. Some of these words have a different form for women.",
    "lessons": [
      {
        "id": "u9a",
        "title": "How you feel",
        "items": [
          [
            "Estoy contento",
            "I am happy",
            "A woman says “contenta”.",
            [
              "Yo estoy contento"
            ]
          ],
          [
            "Estoy cansado",
            "I am tired",
            "A woman says “cansada”.",
            [
              "Yo estoy cansado"
            ]
          ],
          [
            "Estoy enfermo",
            "I am ill",
            "A woman says “enferma”.",
            [
              "Yo estoy enfermo"
            ]
          ],
          [
            "Estoy triste",
            "I am sad",
            "",
            [
              "Yo estoy triste"
            ]
          ],
          [
            "Estoy nervioso",
            "I am nervous",
            "A woman says “nerviosa”.",
            [
              "Yo estoy nervioso"
            ]
          ]
        ]
      },
      {
        "id": "u9b",
        "title": "Hot and cold",
        "items": [
          [
            "Tengo frío",
            "I feel cold",
            "",
            [
              "Yo tengo frío"
            ]
          ],
          [
            "Tengo calor",
            "I feel hot",
            "",
            [
              "Yo tengo calor"
            ]
          ],
          [
            "Hace frío",
            "The weather is cold",
            ""
          ],
          [
            "Hace calor",
            "The weather is hot",
            ""
          ],
          [
            "Hace buen tiempo",
            "The weather is nice",
            ""
          ]
        ]
      },
      {
        "id": "u9c",
        "title": "Outside",
        "items": [
          [
            "llueve",
            "it is raining",
            ""
          ],
          [
            "Hace sol",
            "It is sunny",
            ""
          ],
          [
            "Hace viento",
            "It is windy",
            ""
          ],
          [
            "Está nublado",
            "It is cloudy",
            ""
          ],
          [
            "la lluvia",
            "the rain",
            ""
          ]
        ]
      },
      {
        "id": "u9d",
        "title": "Checking in",
        "items": [
          [
            "¿Cómo te sientes?",
            "How do you feel?",
            ""
          ],
          [
            "Me siento bien",
            "I feel well",
            "",
            [
              "Yo me siento bien"
            ]
          ],
          [
            "Estoy mejor",
            "I am feeling better",
            "",
            [
              "Yo estoy mejor"
            ]
          ],
          [
            "Necesito descansar",
            "I need to rest",
            "",
            [
              "Yo necesito descansar"
            ]
          ],
          [
            "Hoy hace calor",
            "It is hot today",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u31",
    "title": "Trabajo",
    "en": "Work and jobs",
    "tip": "A profession normally follows the identity verb without an article. Some job words change for women.",
    "lessons": [
      {
        "id": "u31a",
        "title": "Jobs",
        "items": [
          [
            "el maestro",
            "the male teacher",
            ""
          ],
          [
            "la maestra",
            "the female teacher",
            ""
          ],
          [
            "el doctor",
            "the male doctor",
            ""
          ],
          [
            "la doctora",
            "the female doctor",
            ""
          ],
          [
            "estudiante",
            "student",
            ""
          ]
        ]
      },
      {
        "id": "u31b",
        "title": "More jobs",
        "items": [
          [
            "ingeniero",
            "engineer (masculine)",
            ""
          ],
          [
            "enfermera",
            "nurse (feminine)",
            ""
          ],
          [
            "chofer",
            "driver",
            ""
          ],
          [
            "cocinero",
            "cook (masculine)",
            ""
          ],
          [
            "vendedor",
            "salesperson (masculine)",
            ""
          ]
        ]
      },
      {
        "id": "u31c",
        "title": "The workplace",
        "items": [
          [
            "la oficina",
            "the office",
            ""
          ],
          [
            "la escuela",
            "the school",
            ""
          ],
          [
            "el trabajo",
            "the work / job",
            ""
          ],
          [
            "Trabajo en una oficina",
            "I work in an office",
            "",
            [
              "Yo trabajo en una oficina"
            ]
          ],
          [
            "¿En qué trabajas?",
            "What do you do for work?",
            ""
          ]
        ]
      },
      {
        "id": "u31d",
        "title": "A working day",
        "items": [
          [
            "estudiar",
            "to study",
            ""
          ],
          [
            "estudio",
            "I study",
            ""
          ],
          [
            "empiezo",
            "I start",
            "",
            [
              "Yo empiezo"
            ]
          ],
          [
            "termino",
            "I finish",
            "",
            [
              "Yo termino"
            ]
          ],
          [
            "Termino a las cinco",
            "I finish at five",
            "",
            [
              "Yo termino a las cinco"
            ]
          ]
        ]
      },
      {
        "id": "u31e",
        "title": "Ask about work",
        "items": [
          [
            "¿Cuándo terminas?",
            "When do you finish?",
            ""
          ],
          [
            "¿Dónde estudias?",
            "Where do you study?",
            ""
          ],
          [
            "¿A qué hora empiezas?",
            "What time do you start?",
            ""
          ],
          [
            "Trabajo desde casa",
            "I work from home",
            "",
            [
              "Yo trabajo desde casa"
            ]
          ],
          [
            "No trabajo los domingos",
            "I do not work on Sundays",
            "",
            [
              "Yo no trabajo los domingos"
            ]
          ]
        ]
      }
    ]
  },
  {
    "id": "u8",
    "title": "Tiempo libre",
    "en": "Free time",
    "tip": "Dictionary forms end in <b>-ar</b>, <b>-er</b> or <b>-ir</b>. Learn the whole form for an activity.",
    "lessons": [
      {
        "id": "u8a",
        "title": "Things to do",
        "items": [
          [
            "leer",
            "to read",
            ""
          ],
          [
            "cocinar",
            "to cook",
            ""
          ],
          [
            "caminar",
            "to walk",
            ""
          ],
          [
            "bailar",
            "to dance",
            ""
          ],
          [
            "nadar",
            "to swim",
            ""
          ]
        ]
      },
      {
        "id": "u8b",
        "title": "Entertainment",
        "items": [
          [
            "escuchar música",
            "to listen to music",
            ""
          ],
          [
            "ver películas",
            "to watch films",
            ""
          ],
          [
            "jugar futbol",
            "to play soccer",
            ""
          ],
          [
            "viajar",
            "to travel",
            ""
          ],
          [
            "cantar",
            "to sing",
            ""
          ]
        ]
      },
      {
        "id": "u8c",
        "title": "I like it",
        "items": [
          [
            "Me gusta leer",
            "I like reading",
            ""
          ],
          [
            "Me gusta cocinar",
            "I like cooking",
            ""
          ],
          [
            "Me gusta la música",
            "I like music",
            ""
          ],
          [
            "Me gustan los libros",
            "I like books",
            ""
          ],
          [
            "No me gusta bailar",
            "I do not like dancing",
            ""
          ]
        ]
      },
      {
        "id": "u8d",
        "title": "Share an interest",
        "items": [
          [
            "¿Te gusta viajar?",
            "Do you like travelling?",
            ""
          ],
          [
            "Sí, me gusta",
            "Yes, I like it",
            ""
          ],
          [
            "A mí también",
            "I do too",
            ""
          ],
          [
            "A mí no",
            "I do not (in contrast)",
            ""
          ],
          [
            "Prefiero caminar",
            "I prefer walking",
            "",
            [
              "Yo prefiero caminar"
            ]
          ]
        ]
      }
    ]
  },
  {
    "id": "u32",
    "title": "Poder y necesitar",
    "en": "Can, must and need",
    "tip": "Keep the second verb in its dictionary form after the word for “can”.",
    "lessons": [
      {
        "id": "u32a",
        "title": "Being able to",
        "items": [
          [
            "puedo",
            "I can",
            ""
          ],
          [
            "puedes",
            "you can",
            ""
          ],
          [
            "podemos",
            "we can",
            ""
          ],
          [
            "Puedo hablar español",
            "I can speak Spanish",
            "",
            [
              "Yo puedo hablar español"
            ]
          ],
          [
            "No puedo ir",
            "I cannot go",
            "",
            [
              "Yo no puedo ir"
            ]
          ]
        ]
      },
      {
        "id": "u32b",
        "title": "Things you must do",
        "items": [
          [
            "tengo que",
            "I have to",
            "",
            [
              "Yo tengo que"
            ]
          ],
          [
            "tienes que",
            "you have to",
            ""
          ],
          [
            "Tengo que trabajar",
            "I have to work",
            "",
            [
              "Yo tengo que trabajar"
            ]
          ],
          [
            "Tengo que estudiar",
            "I have to study",
            "",
            [
              "Yo tengo que estudiar"
            ]
          ],
          [
            "Tenemos que salir",
            "We have to leave",
            ""
          ]
        ]
      },
      {
        "id": "u32c",
        "title": "Needs and requests",
        "items": [
          [
            "Necesito ayuda",
            "I need help",
            "",
            [
              "Yo necesito ayuda"
            ]
          ],
          [
            "Necesito dormir",
            "I need to sleep",
            "",
            [
              "Yo necesito dormir"
            ]
          ],
          [
            "Necesito comprar agua",
            "I need to buy water",
            "",
            [
              "Yo necesito comprar agua"
            ]
          ],
          [
            "¿Puede repetir?",
            "Can you repeat? (polite)",
            ""
          ],
          [
            "¿Puedo entrar?",
            "May I come in?",
            ""
          ]
        ]
      },
      {
        "id": "u32d",
        "title": "Wanting to do something",
        "items": [
          [
            "Quiero aprender",
            "I want to learn",
            "",
            [
              "Yo quiero aprender"
            ]
          ],
          [
            "Quiero comer",
            "I want to eat",
            "",
            [
              "Yo quiero comer"
            ]
          ],
          [
            "¿Quieres venir?",
            "Do you want to come?",
            ""
          ],
          [
            "No quiero salir",
            "I do not want to go out",
            "",
            [
              "Yo no quiero salir"
            ]
          ],
          [
            "Podemos caminar",
            "We can walk",
            "",
            [
              "Nosotros podemos caminar",
              "Nosotras podemos caminar"
            ]
          ]
        ]
      }
    ]
  },
  {
    "id": "u33",
    "title": "Planes",
    "en": "Making plans",
    "tip": "For a plan, put <b>a</b> between the form of “go” and the dictionary form of the activity.",
    "lessons": [
      {
        "id": "u33a",
        "title": "Going to",
        "items": [
          [
            "Voy a viajar",
            "I am going to travel",
            "",
            [
              "Yo voy a viajar"
            ]
          ],
          [
            "Voy a estudiar",
            "I am going to study",
            "",
            [
              "Yo voy a estudiar"
            ]
          ],
          [
            "Vas a trabajar",
            "You are going to work",
            ""
          ],
          [
            "Vamos a comer",
            "We are going to eat",
            "",
            [
              "Nosotros vamos a comer",
              "Nosotras vamos a comer"
            ]
          ],
          [
            "Van a venir",
            "They are going to come",
            ""
          ]
        ]
      },
      {
        "id": "u33b",
        "title": "When",
        "items": [
          [
            "esta noche",
            "tonight",
            ""
          ],
          [
            "la próxima semana",
            "next week",
            ""
          ],
          [
            "el próximo año",
            "next year",
            ""
          ],
          [
            "el lunes",
            "on Monday",
            ""
          ],
          [
            "el sábado",
            "on Saturday",
            ""
          ]
        ]
      },
      {
        "id": "u33c",
        "title": "Inviting",
        "items": [
          [
            "¿Qué vas a hacer mañana?",
            "What are you going to do tomorrow?",
            ""
          ],
          [
            "¿Vamos al cine?",
            "Shall we go to the cinema?",
            ""
          ],
          [
            "¿Quieres comer conmigo?",
            "Do you want to eat with me?",
            ""
          ],
          [
            "Vamos al museo",
            "Let's go to the museum",
            ""
          ],
          [
            "Nos vemos mañana",
            "See you tomorrow",
            ""
          ]
        ]
      },
      {
        "id": "u33d",
        "title": "Agreeing a time",
        "items": [
          [
            "¿A qué hora?",
            "At what time?",
            ""
          ],
          [
            "A las seis",
            "At six o'clock",
            ""
          ],
          [
            "Sí, puedo",
            "Yes, I can",
            ""
          ],
          [
            "No puedo, tengo que trabajar",
            "I cannot; I have to work",
            ""
          ],
          [
            "Está bien, nos vemos a las seis",
            "OK, see you at six",
            ""
          ]
        ]
      },
      {
        "id": "u33e",
        "title": "Plan with someone",
        "items": [
          [
            "¿Con quién vas?",
            "Who are you going with?",
            ""
          ],
          [
            "¿Con quién?",
            "With whom? (asking about a plan)",
            ""
          ],
          [
            "Con mi familia",
            "With my family",
            ""
          ],
          [
            "¿Dónde nos vemos?",
            "Where shall we meet?",
            ""
          ],
          [
            "Nos vemos en el parque",
            "See you in the park",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u18",
    "title": "El año",
    "en": "Seasons and dates",
    "tip": "Use these season names to talk about weather or travel plans.",
    "lessons": [
      {
        "id": "u18a",
        "title": "Seasons",
        "items": [
          [
            "la primavera",
            "the spring",
            ""
          ],
          [
            "el verano",
            "the summer",
            ""
          ],
          [
            "el otoño",
            "the autumn",
            ""
          ],
          [
            "el invierno",
            "the winter",
            ""
          ],
          [
            "el año",
            "the year",
            ""
          ]
        ]
      },
      {
        "id": "u18b",
        "title": "Months",
        "items": [
          [
            "enero",
            "January",
            ""
          ],
          [
            "febrero",
            "February",
            ""
          ],
          [
            "marzo",
            "March",
            ""
          ],
          [
            "abril",
            "April",
            ""
          ],
          [
            "mayo",
            "May",
            ""
          ]
        ]
      },
      {
        "id": "u18c",
        "title": "More months",
        "items": [
          [
            "junio",
            "June",
            ""
          ],
          [
            "julio",
            "July",
            ""
          ],
          [
            "agosto",
            "August",
            ""
          ],
          [
            "septiembre",
            "September",
            ""
          ],
          [
            "octubre",
            "October",
            ""
          ]
        ]
      },
      {
        "id": "u18d",
        "title": "Dates",
        "items": [
          [
            "noviembre",
            "November",
            ""
          ],
          [
            "diciembre",
            "December",
            ""
          ],
          [
            "la fecha",
            "the date",
            ""
          ],
          [
            "Mi cumpleaños es en mayo",
            "My birthday is in May",
            ""
          ],
          [
            "Hoy es cinco de mayo",
            "Today is May fifth",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u41",
    "title": "Unir ideas",
    "en": "Joining ideas",
    "tip": "These short words connect two ideas. Keep the relationship between those ideas clear.",
    "lessons": [
      {
        "id": "u41a",
        "title": "Connecting",
        "items": [
          [
            "y",
            "and",
            ""
          ],
          [
            "pero",
            "but",
            ""
          ],
          [
            "porque",
            "because",
            ""
          ],
          [
            "o",
            "or",
            ""
          ],
          [
            "entonces",
            "then / so",
            ""
          ]
        ]
      },
      {
        "id": "u41b",
        "title": "Timing and quantity",
        "items": [
          [
            "ya",
            "already / now",
            ""
          ],
          [
            "todavía",
            "still / yet",
            ""
          ],
          [
            "solo",
            "only",
            ""
          ],
          [
            "cuando",
            "when (not a question)",
            ""
          ],
          [
            "también",
            "also / too",
            ""
          ]
        ]
      },
      {
        "id": "u41c",
        "title": "Longer sentences",
        "items": [
          [
            "Quiero ir pero no puedo",
            "I want to go but I cannot",
            "",
            [
              "Yo quiero ir pero no puedo"
            ]
          ],
          [
            "No voy porque estoy cansado",
            "I am not going because I am tired",
            "",
            [
              "Yo no voy porque estoy cansado"
            ]
          ],
          [
            "Quiero café o té",
            "I want coffee or tea",
            "",
            [
              "Yo quiero café o té"
            ]
          ],
          [
            "Trabajo y estudio",
            "I work and study",
            "",
            [
              "Yo trabajo y estudio"
            ]
          ],
          [
            "Todavía estoy aquí",
            "I am still here",
            "",
            [
              "Yo todavía estoy aquí"
            ]
          ]
        ]
      },
      {
        "id": "u41d",
        "title": "People and things",
        "items": [
          [
            "todos",
            "everyone / all",
            ""
          ],
          [
            "nadie",
            "nobody",
            ""
          ],
          [
            "algo",
            "something",
            ""
          ],
          [
            "No hay nadie",
            "There is nobody here",
            ""
          ],
          [
            "¿Quieres algo?",
            "Do you want anything?",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u34",
    "title": "Ayer",
    "en": "Yesterday",
    "tip": "These time expressions often go with completed past actions. Learn the irregular past forms as whole words.",
    "lessons": [
      {
        "id": "u34a",
        "title": "A finished day",
        "items": [
          [
            "ayer",
            "yesterday",
            ""
          ],
          [
            "anoche",
            "last night",
            ""
          ],
          [
            "la semana pasada",
            "last week",
            ""
          ],
          [
            "fui",
            "I went / I was",
            "",
            [
              "Yo fui"
            ]
          ],
          [
            "estuve",
            "I was (state or location, completed period)",
            "",
            [
              "Yo estuve"
            ]
          ]
        ]
      },
      {
        "id": "u34b",
        "title": "Completed actions",
        "items": [
          [
            "hablé",
            "I spoke",
            "",
            [
              "Yo hablé"
            ]
          ],
          [
            "comí",
            "I ate",
            "",
            [
              "Yo comí"
            ]
          ],
          [
            "viví",
            "I lived",
            "",
            [
              "Yo viví"
            ]
          ],
          [
            "trabajé",
            "I worked",
            "",
            [
              "Yo trabajé"
            ]
          ],
          [
            "compré",
            "I bought",
            "",
            [
              "Yo compré"
            ]
          ]
        ]
      },
      {
        "id": "u34c",
        "title": "Irregular past forms",
        "items": [
          [
            "hice",
            "I did / made",
            "",
            [
              "Yo hice"
            ]
          ],
          [
            "tuve",
            "I had",
            "",
            [
              "Yo tuve"
            ]
          ],
          [
            "vi",
            "I saw",
            "",
            [
              "Yo vi"
            ]
          ],
          [
            "salí",
            "I went out / left",
            "",
            [
              "Yo salí"
            ]
          ],
          [
            "llegué",
            "I arrived",
            "",
            [
              "Yo llegué"
            ]
          ]
        ]
      },
      {
        "id": "u34d",
        "title": "Tell someone",
        "items": [
          [
            "Ayer fui al mercado",
            "Yesterday I went to the market",
            ""
          ],
          [
            "Comí pollo",
            "I ate chicken",
            "",
            [
              "Yo comí pollo"
            ]
          ],
          [
            "Compré una camisa",
            "I bought a shirt",
            "",
            [
              "Yo compré una camisa"
            ]
          ],
          [
            "Estuve en casa",
            "I was at home",
            "",
            [
              "Yo estuve en casa"
            ]
          ],
          [
            "¿Qué hiciste ayer?",
            "What did you do yesterday?",
            ""
          ]
        ]
      },
      {
        "id": "u34e",
        "title": "More completed actions",
        "items": [
          [
            "bebí",
            "I drank",
            "",
            [
              "Yo bebí"
            ]
          ],
          [
            "estudié",
            "I studied",
            "",
            [
              "Yo estudié"
            ]
          ],
          [
            "caminé",
            "I walked",
            "",
            [
              "Yo caminé"
            ]
          ],
          [
            "descansé",
            "I rested",
            "",
            [
              "Yo descansé"
            ]
          ],
          [
            "dormí",
            "I slept",
            "",
            [
              "Yo dormí"
            ]
          ]
        ]
      }
    ]
  },
  {
    "id": "u35",
    "title": "Contar historias",
    "en": "Telling a story",
    "tip": "Use these expressions to organise the order of events. They can introduce a short past-tense sentence.",
    "lessons": [
      {
        "id": "u35a",
        "title": "A story in order",
        "items": [
          [
            "primero",
            "first",
            ""
          ],
          [
            "luego",
            "then / afterwards",
            ""
          ],
          [
            "al final",
            "in the end",
            ""
          ],
          [
            "antes",
            "before",
            ""
          ],
          [
            "de repente",
            "suddenly",
            ""
          ]
        ]
      },
      {
        "id": "u35b",
        "title": "Background and habits",
        "items": [
          [
            "era",
            "I / he / she used to be (identity)",
            ""
          ],
          [
            "estaba",
            "I / he / she was (state or location)",
            ""
          ],
          [
            "tenía",
            "I / he / she had / used to have",
            ""
          ],
          [
            "vivía",
            "I / he / she used to live",
            ""
          ],
          [
            "iba",
            "I / he / she used to go / was going",
            ""
          ]
        ]
      },
      {
        "id": "u35c",
        "title": "Setting the scene",
        "items": [
          [
            "Cuando era niño",
            "When I was a child",
            "A woman says “niña”."
          ],
          [
            "Vivía en México",
            "I used to live in Mexico",
            "",
            [
              "Yo vivía en México"
            ]
          ],
          [
            "Estaba en casa",
            "I was at home (background)",
            "",
            [
              "Yo estaba en casa"
            ]
          ],
          [
            "Tenía un perro",
            "I used to have a dog",
            "",
            [
              "Yo tenía un perro"
            ]
          ],
          [
            "Iba al parque todos los días",
            "I used to go to the park every day",
            "",
            [
              "Yo iba al parque todos los días"
            ]
          ]
        ]
      },
      {
        "id": "u35d",
        "title": "What happened",
        "items": [
          [
            "¿Cómo te fue?",
            "How did it go for you?",
            ""
          ],
          [
            "Me fue bien",
            "It went well for me",
            ""
          ],
          [
            "Fue muy bonito",
            "It was very nice",
            ""
          ],
          [
            "Primero comí, luego salí",
            "First I ate, then I went out",
            ""
          ],
          [
            "Al final regresé a casa",
            "In the end I returned home",
            ""
          ]
        ]
      },
      {
        "id": "u35e",
        "title": "Asking about the past",
        "items": [
          [
            "¿Qué compraste?",
            "What did you buy?",
            ""
          ],
          [
            "¿Dónde vivías cuando eras niño?",
            "Where did you live when you were a child?",
            ""
          ],
          [
            "¿Tenías un perro?",
            "Did you have a dog?",
            ""
          ],
          [
            "¿Fuiste al mercado?",
            "Did you go to the market?",
            ""
          ],
          [
            "¿Qué comiste?",
            "What did you eat?",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u13",
    "title": "En el hotel",
    "en": "At the hotel",
    "tip": "Use a polite request at reception. Say the noun clearly, then add the details.",
    "lessons": [
      {
        "id": "u13a",
        "title": "Checking in",
        "items": [
          [
            "la reservación",
            "the reservation (Mexico)",
            ""
          ],
          [
            "la habitación",
            "the hotel room",
            ""
          ],
          [
            "la noche",
            "the night",
            ""
          ],
          [
            "Tengo una reservación",
            "I have a reservation",
            "",
            [
              "Yo tengo una reservación"
            ]
          ],
          [
            "Una habitación para dos",
            "A room for two",
            ""
          ]
        ]
      },
      {
        "id": "u13b",
        "title": "Room details",
        "items": [
          [
            "¿Incluye desayuno?",
            "Does it include breakfast?",
            ""
          ],
          [
            "¿Tiene internet?",
            "Does it have internet?",
            ""
          ],
          [
            "por dos noches",
            "for two nights",
            ""
          ],
          [
            "la recepción",
            "the reception desk",
            ""
          ],
          [
            "el elevador",
            "the lift / elevator (Mexico)",
            ""
          ]
        ]
      },
      {
        "id": "u13c",
        "title": "During your stay",
        "items": [
          [
            "La llave no funciona",
            "The key does not work",
            ""
          ],
          [
            "No hay agua caliente",
            "There is no hot water",
            ""
          ],
          [
            "Necesito otra toalla",
            "I need another towel",
            "",
            [
              "Yo necesito otra toalla"
            ]
          ],
          [
            "¿Dónde está mi habitación?",
            "Where is my room?",
            ""
          ],
          [
            "Está en el segundo piso",
            "It is on the second floor",
            ""
          ]
        ]
      },
      {
        "id": "u13d",
        "title": "Checking out",
        "items": [
          [
            "¿A qué hora es la salida?",
            "What time is checkout?",
            ""
          ],
          [
            "¿Puedo dejar mi maleta?",
            "Can I leave my suitcase?",
            ""
          ],
          [
            "Necesito un taxi",
            "I need a taxi",
            "",
            [
              "Yo necesito un taxi"
            ]
          ],
          [
            "Aquí está la llave",
            "Here is the key",
            ""
          ],
          [
            "Gracias por todo",
            "Thank you for everything",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u10",
    "title": "De viaje",
    "en": "Travel",
    "tip": "Keep the article with each travel noun. These are useful words at an airport or hotel.",
    "lessons": [
      {
        "id": "u10a",
        "title": "Your documents",
        "items": [
          [
            "el pasaporte",
            "the passport",
            ""
          ],
          [
            "la maleta",
            "the suitcase",
            ""
          ],
          [
            "el equipaje",
            "the luggage",
            ""
          ],
          [
            "el vuelo",
            "the flight",
            ""
          ],
          [
            "el viaje",
            "the trip",
            ""
          ]
        ]
      },
      {
        "id": "u10b",
        "title": "Departures",
        "items": [
          [
            "la entrada",
            "the entrance",
            ""
          ],
          [
            "la salida",
            "the exit / departure",
            ""
          ],
          [
            "la llegada",
            "the arrival",
            ""
          ],
          [
            "la puerta de embarque",
            "the boarding gate",
            ""
          ],
          [
            "el asiento",
            "the seat",
            ""
          ]
        ]
      },
      {
        "id": "u10c",
        "title": "Finding your way",
        "items": [
          [
            "¿Dónde está la salida?",
            "Where is the exit?",
            ""
          ],
          [
            "¿A qué hora llega?",
            "What time does it arrive?",
            ""
          ],
          [
            "Mi vuelo está retrasado",
            "My flight is delayed",
            ""
          ],
          [
            "Perdí mi maleta",
            "I lost my suitcase",
            ""
          ],
          [
            "Aquí está mi pasaporte",
            "Here is my passport",
            ""
          ]
        ]
      },
      {
        "id": "u10d",
        "title": "Booking a journey",
        "items": [
          [
            "Quiero un boleto a México",
            "I want a ticket to Mexico",
            "",
            [
              "Yo quiero un boleto a México"
            ]
          ],
          [
            "de ida y vuelta",
            "round trip",
            ""
          ],
          [
            "solo de ida",
            "one way",
            ""
          ],
          [
            "¿Cuánto dura el viaje?",
            "How long does the trip take?",
            ""
          ],
          [
            "¿Puedo cambiar mi boleto?",
            "Can I change my ticket?",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u36",
    "title": "Salud y ayuda",
    "en": "Health and getting help",
    "tip": "Learn body nouns with their articles. They help you describe a problem clearly.",
    "lessons": [
      {
        "id": "u36a",
        "title": "The body",
        "items": [
          [
            "la cabeza",
            "the head",
            ""
          ],
          [
            "la mano",
            "the hand",
            ""
          ],
          [
            "el pie",
            "the foot",
            ""
          ],
          [
            "el estómago",
            "the stomach",
            ""
          ],
          [
            "la espalda",
            "the back",
            ""
          ]
        ]
      },
      {
        "id": "u36b",
        "title": "What hurts",
        "items": [
          [
            "Me duele la cabeza",
            "My head hurts",
            ""
          ],
          [
            "Me duele el estómago",
            "My stomach hurts",
            ""
          ],
          [
            "Me duelen los pies",
            "My feet hurt",
            ""
          ],
          [
            "Tengo fiebre",
            "I have a fever",
            "",
            [
              "Yo tengo fiebre"
            ]
          ],
          [
            "Tengo tos",
            "I have a cough",
            "",
            [
              "Yo tengo tos"
            ]
          ]
        ]
      },
      {
        "id": "u36c",
        "title": "Ask for help",
        "items": [
          [
            "¡Ayuda!",
            "Help!",
            ""
          ],
          [
            "Necesito un doctor",
            "I need a doctor",
            "",
            [
              "Yo necesito un doctor"
            ]
          ],
          [
            "Es una emergencia",
            "It is an emergency",
            ""
          ],
          [
            "Llame a una ambulancia",
            "Call an ambulance (polite)",
            ""
          ],
          [
            "¿Dónde está el hospital?",
            "Where is the hospital?",
            ""
          ]
        ]
      },
      {
        "id": "u36d",
        "title": "At the pharmacy",
        "items": [
          [
            "la medicina",
            "the medicine",
            ""
          ],
          [
            "la alergia",
            "the allergy",
            ""
          ],
          [
            "¿Tiene algo para la tos?",
            "Do you have something for a cough?",
            ""
          ],
          [
            "Soy alérgico a esta medicina",
            "I am allergic to this medicine",
            "",
            [
              "Yo soy alérgico a esta medicina"
            ]
          ],
          [
            "Necesito hablar con un doctor",
            "I need to speak with a doctor",
            "",
            [
              "Yo necesito hablar con un doctor"
            ]
          ]
        ]
      },
      {
        "id": "u36e",
        "title": "Questions at the clinic",
        "items": [
          [
            "¿Te duele la cabeza?",
            "Does your head hurt?",
            ""
          ],
          [
            "¿Tienes fiebre?",
            "Do you have a fever?",
            ""
          ],
          [
            "¿Necesitas ayuda?",
            "Do you need help?",
            ""
          ],
          [
            "¿Tienes una alergia?",
            "Do you have an allergy?",
            ""
          ],
          [
            "Me duele la espalda",
            "My back hurts",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u37",
    "title": "Opiniones",
    "en": "Opinions",
    "tip": "Use these short openings to express a view. You can add a complete sentence after them.",
    "lessons": [
      {
        "id": "u37a",
        "title": "What you think",
        "items": [
          [
            "creo que",
            "I think that",
            "",
            [
              "Yo creo que"
            ]
          ],
          [
            "pienso que",
            "I think / believe that",
            "",
            [
              "Yo pienso que"
            ]
          ],
          [
            "para mí",
            "for me / in my opinion",
            ""
          ],
          [
            "Es interesante",
            "It is interesting",
            ""
          ],
          [
            "Es importante",
            "It is important",
            ""
          ]
        ]
      },
      {
        "id": "u37b",
        "title": "Agreeing",
        "items": [
          [
            "Estoy de acuerdo",
            "I agree",
            ""
          ],
          [
            "No estoy de acuerdo",
            "I disagree",
            ""
          ],
          [
            "Tienes razón",
            "You are right",
            ""
          ],
          [
            "Es verdad",
            "It is true",
            ""
          ],
          [
            "No sé",
            "I do not know",
            "",
            [
              "Yo no sé"
            ]
          ]
        ]
      },
      {
        "id": "u37c",
        "title": "Likes and preferences",
        "items": [
          [
            "Prefiero el té",
            "I prefer tea",
            "",
            [
              "Yo prefiero el té"
            ]
          ],
          [
            "Me encanta la comida mexicana",
            "I love Mexican food",
            ""
          ],
          [
            "No me gustan los hoteles grandes",
            "I do not like big hotels",
            ""
          ],
          [
            "Creo que es muy caro",
            "I think it is very expensive",
            "",
            [
              "Yo creo que es muy caro"
            ]
          ],
          [
            "Es mejor caminar",
            "It is better to walk",
            ""
          ]
        ]
      },
      {
        "id": "u37d",
        "title": "Ask their opinion",
        "items": [
          [
            "¿Qué piensas?",
            "What do you think?",
            ""
          ],
          [
            "¿Qué prefieres?",
            "What do you prefer?",
            ""
          ],
          [
            "¿Te parece bien?",
            "Does that sound good to you?",
            ""
          ],
          [
            "Me parece bien",
            "That sounds good to me",
            ""
          ],
          [
            "¿Por qué no?",
            "Why not?",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u38",
    "title": "Seguir la plática",
    "en": "Keep the conversation going",
    "tip": "A short reaction shows that you are following the conversation. Match your tone to the meaning.",
    "lessons": [
      {
        "id": "u38a",
        "title": "Reacting",
        "items": [
          [
            "¡Qué padre!",
            "How cool! (Mexico)",
            ""
          ],
          [
            "¿En serio?",
            "Really?",
            ""
          ],
          [
            "¡Qué bueno!",
            "That is great!",
            ""
          ],
          [
            "¡Qué lástima!",
            "What a shame!",
            ""
          ],
          [
            "¡No puede ser!",
            "No way!",
            ""
          ]
        ]
      },
      {
        "id": "u38b",
        "title": "Finding out more",
        "items": [
          [
            "¿Y luego?",
            "And then?",
            ""
          ],
          [
            "¿Y después?",
            "And afterwards?",
            ""
          ],
          [
            "¿Con quién hablas?",
            "Who are you speaking with?",
            ""
          ],
          [
            "¿Dónde fue?",
            "Where was it?",
            ""
          ],
          [
            "Cuéntame",
            "Tell me",
            ""
          ]
        ]
      },
      {
        "id": "u38c",
        "title": "Keeping your turn",
        "items": [
          [
            "un momento",
            "one moment",
            ""
          ],
          [
            "déjame pensar",
            "let me think",
            ""
          ],
          [
            "por ejemplo",
            "for example",
            ""
          ],
          [
            "quiero decir",
            "I mean",
            ""
          ],
          [
            "la verdad",
            "the truth / honestly",
            ""
          ]
        ]
      },
      {
        "id": "u38d",
        "title": "Ending warmly",
        "items": [
          [
            "Me dio mucho gusto verte",
            "It was lovely to see you",
            ""
          ],
          [
            "Que tengas buen día",
            "Have a good day (to a friend)",
            ""
          ],
          [
            "Cuídate",
            "Take care (to a friend)",
            ""
          ],
          [
            "Seguimos en contacto",
            "Let's keep in touch",
            ""
          ],
          [
            "Hasta pronto",
            "See you soon",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u39",
    "title": "Mensajes",
    "en": "Messages and practical requests",
    "tip": "Use these nouns when exchanging contact details or asking for internet access.",
    "lessons": [
      {
        "id": "u39a",
        "title": "Contact details",
        "items": [
          [
            "el mensaje",
            "the message",
            ""
          ],
          [
            "el correo",
            "the email",
            ""
          ],
          [
            "el número",
            "the number",
            ""
          ],
          [
            "la contraseña",
            "the password",
            ""
          ],
          [
            "el celular",
            "the mobile phone (Mexico)",
            ""
          ]
        ]
      },
      {
        "id": "u39b",
        "title": "Staying in touch",
        "items": [
          [
            "¿Cuál es tu número?",
            "What is your number?",
            ""
          ],
          [
            "Te mando un mensaje",
            "I will send you a message",
            "",
            [
              "Yo te mando un mensaje"
            ]
          ],
          [
            "¿Me lo puede escribir?",
            "Can you write it for me? (polite)",
            ""
          ],
          [
            "No tengo internet",
            "I do not have internet",
            "",
            [
              "Yo no tengo internet"
            ]
          ],
          [
            "¿Cuál es la contraseña?",
            "What is the password?",
            ""
          ]
        ]
      },
      {
        "id": "u39c",
        "title": "A polite request",
        "items": [
          [
            "Me gustaría un café",
            "I would like a coffee",
            ""
          ],
          [
            "¿Podría ayudarme?",
            "Could you help me?",
            ""
          ],
          [
            "¿Me trae agua, por favor?",
            "Could you bring me water, please?",
            ""
          ],
          [
            "¿Me puede llamar un taxi?",
            "Can you call me a taxi?",
            ""
          ],
          [
            "¿Puede hablar más despacio?",
            "Can you speak more slowly? (polite)",
            ""
          ]
        ]
      },
      {
        "id": "u39d",
        "title": "Small problems",
        "items": [
          [
            "No funciona",
            "It does not work",
            ""
          ],
          [
            "No encuentro mi teléfono",
            "I cannot find my telephone",
            "",
            [
              "Yo no encuentro mi teléfono"
            ]
          ],
          [
            "Perdí mi llave",
            "I lost my key",
            ""
          ],
          [
            "Necesito cargar mi celular",
            "I need to charge my phone",
            "",
            [
              "Yo necesito cargar mi celular"
            ]
          ],
          [
            "¿Dónde puedo comprar un boleto?",
            "Where can I buy a ticket?",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u11",
    "title": "Animales",
    "en": "Animals",
    "tip": "Learn each animal with its article. Some animal nouns have different male and female forms.",
    "lessons": [
      {
        "id": "u11a",
        "title": "Pets",
        "items": [
          [
            "el perro",
            "the dog",
            ""
          ],
          [
            "el gato",
            "the cat",
            ""
          ],
          [
            "el pájaro",
            "the bird",
            ""
          ],
          [
            "el pez",
            "the fish (animal)",
            ""
          ],
          [
            "el conejo",
            "the rabbit",
            ""
          ]
        ]
      },
      {
        "id": "u11b",
        "title": "On the farm",
        "items": [
          [
            "el caballo",
            "the horse",
            ""
          ],
          [
            "la vaca",
            "the cow",
            ""
          ],
          [
            "el cerdo",
            "the pig",
            ""
          ],
          [
            "la gallina",
            "the hen",
            ""
          ],
          [
            "la oveja",
            "the sheep",
            ""
          ]
        ]
      },
      {
        "id": "u11c",
        "title": "Wild animals",
        "items": [
          [
            "el león",
            "the lion",
            ""
          ],
          [
            "el elefante",
            "the elephant",
            ""
          ],
          [
            "el mono",
            "the monkey",
            ""
          ],
          [
            "la tortuga",
            "the turtle",
            ""
          ],
          [
            "la mariposa",
            "the butterfly",
            ""
          ]
        ]
      },
      {
        "id": "u11d",
        "title": "Talk about animals",
        "items": [
          [
            "Tengo un perro",
            "I have a dog",
            "",
            [
              "Yo tengo un perro"
            ]
          ],
          [
            "Mi gato duerme",
            "My cat sleeps",
            ""
          ],
          [
            "El perro es pequeño",
            "The dog is small",
            ""
          ],
          [
            "Me gustan los animales",
            "I like animals",
            ""
          ],
          [
            "El pájaro canta",
            "The bird sings",
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "u12",
    "title": "México",
    "en": "Culture and everyday Mexico",
    "tip": "These food names are useful in Mexico. Some do not have a single-word English equivalent.",
    "lessons": [
      {
        "id": "u12a",
        "title": "Food to recognise",
        "items": [
          [
            "el tamal",
            "the tamal (filled corn dough)",
            ""
          ],
          [
            "el pozole",
            "the pozole (hominy soup)",
            ""
          ],
          [
            "la salsa",
            "the sauce / salsa",
            ""
          ],
          [
            "el chile",
            "the chile pepper",
            ""
          ],
          [
            "el aguacate",
            "the avocado",
            ""
          ]
        ]
      },
      {
        "id": "u12b",
        "title": "Places and traditions",
        "items": [
          [
            "el mariachi",
            "the mariachi musician / ensemble",
            ""
          ],
          [
            "el Día de Muertos",
            "the Day of the Dead",
            ""
          ],
          [
            "el zócalo",
            "the main square (Mexico)",
            ""
          ],
          [
            "la artesanía",
            "the handicraft",
            ""
          ],
          [
            "la fiesta",
            "the party / celebration",
            ""
          ]
        ]
      },
      {
        "id": "u12c",
        "title": "Useful local words",
        "items": [
          [
            "ahorita",
            "right now / in a little while (context matters)",
            ""
          ],
          [
            "sale",
            "OK / agreed (Mexico)",
            ""
          ],
          [
            "chido",
            "cool (casual, Mexico)",
            ""
          ],
          [
            "la plática",
            "the chat (Mexico)",
            ""
          ],
          [
            "¿Qué tal?",
            "How is it going?",
            ""
          ]
        ]
      },
      {
        "id": "u12d",
        "title": "Bring it together",
        "items": [
          [
            "Me gusta aprender español",
            "I like learning Spanish",
            ""
          ],
          [
            "Quiero conocer México",
            "I want to get to know Mexico",
            "",
            [
              "Yo quiero conocer México"
            ]
          ],
          [
            "La comida está muy rica",
            "The food tastes very good",
            ""
          ],
          [
            "¿La salsa está picante?",
            "Is the salsa spicy?",
            ""
          ],
          [
            "¡Nos vemos pronto!",
            "See you again soon!",
            ""
          ]
        ]
      }
    ]
  }
]);
// END SPANISH UNITS
/* The learning path: parts, units in teaching order, and a conversation every couple of units. */
const PATH=[
  {
    "part": "First words",
    "sub": "Sounds, greetings and help when you get stuck"
  },
  "u0",
  "u1",
  "cv1",
  "u21",
  "cv16",
  {
    "part": "Build your own sentences",
    "sub": "Who you are, where you are, actions and questions"
  },
  "u22",
  "u23",
  "u24",
  "u25",
  "cv2",
  {
    "part": "Numbers, time and my day",
    "sub": "Count, tell the time and describe a routine"
  },
  "u2",
  "u5",
  "u26",
  "cv3",
  {
    "part": "Food and drink",
    "sub": "Say what you eat and order a meal"
  },
  "u3",
  "u15",
  "cv4",
  {
    "part": "Getting around",
    "sub": "Find places, travel, shop and choose clothes"
  },
  "u4",
  "u14",
  "cv5",
  "u7",
  "u16",
  "cv6",
  "u28",
  "cv7",
  {
    "part": "People and things",
    "sub": "Family, home, descriptions, feelings and work"
  },
  "u6",
  "u30",
  "u29",
  "u9",
  "u31",
  "cv8",
  {
    "part": "Plans and the future",
    "sub": "Interests, what you can do, invitations and dates"
  },
  "u8",
  "u32",
  "u33",
  "u18",
  "cv9",
  {
    "part": "Tell your story",
    "sub": "Connect ideas, talk about yesterday and give background"
  },
  "u41",
  "u34",
  "u35",
  "cv10",
  {
    "part": "Travel and getting help",
    "sub": "Hotels, journeys and explaining a problem"
  },
  "u13",
  "cv11",
  "u10",
  "u36",
  "cv12",
  {
    "part": "Real conversations",
    "sub": "Share opinions, keep talking and stay in touch"
  },
  "u37",
  "u38",
  "u39",
  "cv14",
  {
    "part": "More of Mexico",
    "sub": "Animals, food, culture and one final conversation"
  },
  "u11",
  "u12",
  "cv13"
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
// BEGIN SPANISH GLOSSARY
Object.assign(GLUE,{
  "aprendemos": "we learn",
  "inglés": "English",
  "aprendes": "you learn",
  "llama": "is called",
  "cuántos": "how many",
  "fin": "end",
  "semana": "week",
  "hora": "hour / time",
  "las": "the (feminine plural)",
  "media": "half",
  "noche": "night",
  "despierto": "I wake up",
  "levanto": "I get up",
  "baño": "I bathe",
  "visto": "I get dressed",
  "al": "to the",
  "veces": "times",
  "los": "the (masculine plural)",
  "acuesto": "I go to bed",
  "hambre": "hunger",
  "sed": "thirst",
  "para": "for",
  "recomienda": "you recommend (polite)",
  "gas": "gas / bubbles",
  "rico": "tasty (masculine)",
  "picante": "spicy",
  "alérgico": "allergic (masculine)",
  "alérgica": "allergic (feminine)",
  "cacahuates": "peanuts",
  "tiene": "has / contains",
  "cuenta": "bill",
  "pagar": "to pay",
  "efectivo": "cash",
  "buen": "good",
  "provecho": "enjoyment / benefit",
  "lado": "side",
  "frente": "front",
  "derecha": "right",
  "izquierda": "left",
  "siga": "go / continue (polite)",
  "gire": "turn (polite)",
  "cruce": "cross (polite)",
  "cuadras": "city blocks",
  "del": "of / from the",
  "perdido": "lost (masculine)",
  "puede": "can (polite / he / she)",
  "ayudar": "to help",
  "cuántas": "how many (feminine)",
  "veo": "I see",
  "pie": "foot",
  "va": "goes / is going",
  "centro": "centre / downtown",
  "cuesta": "costs",
  "manzanas": "apples",
  "cambio": "change",
  "acepta": "you accept (polite)",
  "llevo": "I take / carry",
  "queda": "fits / remains",
  "roja": "red (feminine)",
  "negros": "black (masculine plural)",
  "lo": "it (masculine object)",
  "probar": "to try",
  "tu": "your (singular)",
  "vive": "lives",
  "sillas": "chairs",
  "abierta": "open (feminine)",
  "cerrada": "closed (feminine)",
  "pequeña": "small (feminine)",
  "alta": "tall (feminine)",
  "libros": "books",
  "nuevos": "new (masculine plural)",
  "bonita": "pretty (feminine)",
  "amables": "kind (plural)",
  "que": "that / than / linking word",
  "contento": "happy (masculine)",
  "contenta": "happy (feminine)",
  "cansado": "tired (masculine)",
  "cansada": "tired (feminine)",
  "enfermo": "ill (masculine)",
  "enferma": "ill (feminine)",
  "triste": "sad",
  "nervioso": "nervous (masculine)",
  "nerviosa": "nervous (feminine)",
  "frío": "cold",
  "calor": "heat",
  "hace": "makes / does",
  "tiempo": "time / weather",
  "sol": "sun",
  "viento": "wind",
  "nublado": "cloudy",
  "sientes": "you feel",
  "siento": "I feel",
  "descansar": "to rest",
  "escuchar": "to listen",
  "música": "music",
  "ver": "to see / watch",
  "películas": "films",
  "jugar": "to play",
  "futbol": "soccer",
  "gustan": "please (plural)",
  "mí": "me (after a preposition)",
  "prefiero": "I prefer",
  "tenemos": "we have",
  "salir": "to go out / leave",
  "dormir": "to sleep",
  "comprar": "to buy",
  "entrar": "to enter",
  "venir": "to come",
  "van": "they / you all go",
  "próxima": "next (feminine)",
  "próximo": "next (masculine)",
  "hacer": "to do / make",
  "cine": "cinema",
  "conmigo": "with me",
  "cumpleaños": "birthday",
  "pasada": "past / last (feminine)",
  "hiciste": "you did / made",
  "final": "end",
  "repente": "suddenness (in a fixed phrase)",
  "niño": "boy / male child",
  "niña": "girl / female child",
  "fue": "went / was",
  "regresé": "I returned",
  "incluye": "includes",
  "internet": "internet",
  "funciona": "works / functions",
  "caliente": "hot",
  "toalla": "towel",
  "segundo": "second (masculine)",
  "piso": "floor / storey",
  "dejar": "to leave",
  "embarque": "boarding",
  "llega": "arrives",
  "retrasado": "delayed (masculine)",
  "perdí": "I lost",
  "ida": "outward journey",
  "vuelta": "return",
  "dura": "lasts",
  "cambiar": "to change",
  "duele": "hurts (singular)",
  "duelen": "hurt (plural)",
  "pies": "feet",
  "fiebre": "fever",
  "tos": "cough",
  "emergencia": "emergency",
  "llame": "call (polite)",
  "ambulancia": "ambulance",
  "creo": "I think / believe",
  "pienso": "I think",
  "interesante": "interesting",
  "importante": "important",
  "acuerdo": "agreement",
  "razón": "reason / rightness",
  "verdad": "truth",
  "sé": "I know",
  "encanta": "delights / pleases very much",
  "comida": "food",
  "hoteles": "hotels",
  "grandes": "big (plural)",
  "piensas": "you think",
  "prefieres": "you prefer",
  "parece": "seems",
  "serio": "serious",
  "lástima": "pity / shame",
  "ser": "to be (identity)",
  "momento": "moment",
  "déjame": "let me",
  "pensar": "to think",
  "ejemplo": "example",
  "decir": "to say",
  "dio": "gave",
  "verte": "to see you",
  "tengas": "you may have (in a wish)",
  "día": "day",
  "seguimos": "we continue",
  "contacto": "contact",
  "pronto": "soon",
  "mando": "I send",
  "escribir": "to write",
  "gustaría": "would please",
  "podría": "could (polite / I / he / she)",
  "ayudarme": "to help me",
  "trae": "brings / you bring (polite)",
  "llamar": "to call",
  "encuentro": "I find",
  "cargar": "to charge / load",
  "duerme": "sleeps",
  "animales": "animals",
  "canta": "sings",
  "muertos": "dead people",
  "tal": "such / how (in a greeting)",
  "conocer": "to get to know",
  "rica": "tasty (feminine)",
  "terminas": "you finish",
  "desayunas": "you eat breakfast",
  "compraste": "you bought",
  "vivías": "you used to live",
  "eras": "you used to be",
  "tenías": "you had / used to have",
  "necesitas": "you need",
  "te": "you / yourself (object)",
  "ayuda": "help",
  "leche": "milk",
  "agua": "water",
  "pan": "bread",
  "ciento": "one hundred (before another number)",
  "levantas": "you get up",
  "duermes": "you sleep",
  "acuestas": "you go to bed",
  "lavo": "I wash",
  "manos": "hands",
  "quiere": "wants / you want (polite)",
  "estudias": "you study",
  "empiezas": "you start",
  "domingos": "Sundays",
  "fuiste": "you went / were",
  "comiste": "you ate",
  "vivo": "I live",
  "siéntate": "have a seat (to a friend)",
  "ay": "oh",
  "padrísimo": "really great (Mexico)",
  "tomamos": "we have / drink",
  "así": "like this",
  "árbol": "tree",
  "ár-bol": "tree (said in syllables)",
  "rápido": "quickly / fast",
  "libro": "book",
  "mesa": "table",
  "silla": "chair",
  "queso": "cheese",
  "carne": "meat",
  "pollo": "chicken",
  "pescado": "fish (food)",
  "arroz": "rice",
  "huevo": "egg",
  "sopa": "soup",
  "manzana": "apple",
  "papa": "potato",
  "té": "tea",
  "jugo": "juice",
  "cerveza": "beer",
  "azúcar": "sugar",
  "sal": "salt",
  "restaurante": "restaurant",
  "menú": "menu",
  "propina": "tip",
  "ciudad": "city",
  "calle": "street",
  "parque": "park",
  "museo": "museum",
  "plaza": "square",
  "tienda": "shop",
  "banco": "bank",
  "farmacia": "pharmacy",
  "hospital": "hospital",
  "mercado": "market",
  "esquina": "corner",
  "cuadra": "city block",
  "camión": "bus (Mexico)",
  "metro": "subway",
  "taxi": "taxi",
  "coche": "car",
  "bicicleta": "bicycle",
  "estación": "station",
  "parada": "stop",
  "boleto": "ticket",
  "aeropuerto": "airport",
  "tren": "train",
  "precio": "price",
  "dinero": "money",
  "tarjeta": "card",
  "bolsa": "bag",
  "camisa": "shirt",
  "playera": "T-shirt (Mexico)",
  "pantalón": "trousers",
  "chamarra": "jacket (Mexico)",
  "zapatos": "shoes",
  "talla": "clothing size",
  "madre": "mother",
  "padre": "father",
  "hijo": "son",
  "hija": "daughter",
  "familia": "family",
  "hermano": "brother",
  "hermana": "sister",
  "abuela": "grandmother",
  "abuelo": "grandfather",
  "padres": "parents",
  "casa": "house",
  "departamento": "apartment (Mexico)",
  "cocina": "kitchen",
  "recámara": "bedroom (Mexico)",
  "cama": "bed",
  "puerta": "door",
  "ventana": "window",
  "sofá": "sofa",
  "llave": "key",
  "lluvia": "rain",
  "maestro": "male teacher",
  "maestra": "female teacher",
  "doctor": "male doctor",
  "doctora": "female doctor",
  "oficina": "office",
  "escuela": "school",
  "trabajo": "work / job",
  "lunes": "on Monday",
  "sábado": "on Saturday",
  "primavera": "spring",
  "verano": "summer",
  "otoño": "autumn",
  "invierno": "winter",
  "año": "year",
  "fecha": "date",
  "reservación": "reservation (Mexico)",
  "habitación": "hotel room",
  "recepción": "reception desk",
  "elevador": "lift / elevator (Mexico)",
  "pasaporte": "passport",
  "maleta": "suitcase",
  "equipaje": "luggage",
  "vuelo": "flight",
  "viaje": "trip",
  "entrada": "entrance",
  "salida": "exit / departure",
  "llegada": "arrival",
  "asiento": "seat",
  "cabeza": "head",
  "mano": "hand",
  "estómago": "stomach",
  "espalda": "back",
  "medicina": "medicine",
  "alergia": "allergy",
  "mensaje": "message",
  "correo": "email",
  "número": "number",
  "contraseña": "password",
  "celular": "mobile phone (Mexico)",
  "perro": "dog",
  "gato": "cat",
  "pájaro": "bird",
  "pez": "fish (animal)",
  "conejo": "rabbit",
  "caballo": "horse",
  "vaca": "cow",
  "cerdo": "pig",
  "gallina": "hen",
  "oveja": "sheep",
  "león": "lion",
  "elefante": "elephant",
  "mono": "monkey",
  "tortuga": "turtle",
  "mariposa": "butterfly",
  "tamal": "tamal (filled corn dough)",
  "pozole": "pozole (hominy soup)",
  "salsa": "sauce / salsa",
  "chile": "chile pepper",
  "aguacate": "avocado",
  "mariachi": "mariachi musician / ensemble",
  "zócalo": "main square (Mexico)",
  "artesanía": "handicraft",
  "fiesta": "party / celebration",
  "plática": "chat (Mexico)"
});
// END SPANISH GLOSSARY
/* Pictures for concrete words. "#..." is a text tile. */
const EMOJI={'jirafa':'🦒','tortilla':'🫓','piña':'🍍','hotel':'🏨','chocolate':'🍫','café':'☕','teléfono':'📱','guitarra':'🎸','taco':'🌮','cereal':'🥣',
 'Hola':'👋','Buenos días':'🌅','Buenas tardes':'☀️','Buenas noches':'🌙','Adiós':'👋','Hasta luego':'🔜','Nos vemos':'👀','Gracias':'🙏','Por favor':'🤲','De nada':'😊',
 'Sí':'👍','No':'👎','Perdón':'🙇','Con permiso':'🚶','Está bien':'👌','¿Cómo estás?':'🙂','Muy bien':'🤩','No pasa nada':'🤷','Mucho gusto':'🤝','Buena suerte':'🍀',
 'Yo':'🙋','Tú':'👉','Él':'👨','Ella':'👩','Nosotros':'🧑‍🤝‍🧑','Usted':'🧑‍💼','Ustedes':'👥','Ellos':'👬','Ellas':'👭','Me llamo Tomás':'🏷️','¿Cómo te llamas?':'📛','Soy de Estados Unidos':'🇺🇸',
 'Bien, gracias':'😊','¿Y tú?':'🔁','Más o menos':'😐','Todo bien':'✅','Yo también':'🙌','¿Qué haces?':'🤔','Nada especial':'🫥','¿Qué onda?':'🤙','Encantado':'😍','Igualmente':'🔄',
 'Hablo un poco de español':'🤏','¿Cómo se dice en español?':'💬','¿Qué significa esta palabra?':'📖','No entiendo':'😕','¿Puedes repetir?':'🔁','¿Mande?':'👂','Más despacio, por favor':'🐢',
 'Estoy aprendiendo':'📚','Otra vez':'🔂','Ya entendí':'💡'};
/* Shared illustrations use meaning-based names, so other courses can reuse the same asset.
   The first Spanish unit is the first complete set in the approved rounded cartoon style. */
const PICTURE_ASSETS={'jirafa':'art-v2/giraffe','tortilla':'art-v2/tortilla','piña':'art-v2/pineapple','hotel':'art-v2/hotel',
 'chocolate':'art-v2/chocolate','café':'art-v2/coffee','teléfono':'art-v2/telephone','guitarra':'art-v2/guitar','taco':'art-v2/taco','cereal':'art-v2/cereal'};
// BEGIN SPANISH PICTURES
Object.assign(PICTURE_ASSETS,{
  "el agua": "art-v2/water",
  "el pan": "art-v2/bread",
  "la leche": "art-v2/milk",
  "el queso": "art-v2/cheese",
  "la carne": "art-v2/meat",
  "el pollo": "art-v2/chicken",
  "el pescado": "art-v2/fish",
  "el huevo": "art-v2/egg-v2",
  "la sopa": "art-v2/soup",
  "la manzana": "art-v2/apple",
  "la papa": "art-v2/potato",
  "el té": "art-v2/tea",
  "la cerveza": "art-v2/beer",
  "el azúcar": "art-v2/sugar",
  "la sal": "art-v2/salt",
  "el restaurante": "art-v2/restaurant",
  "el menú": "art-v2/menu",
  "la propina": "art-v2/tip",
  "Tengo hambre": "art-v2/i-am-hungry",
  "Hola": "art-v2/hello",
  "Buenos días": "art-v2/good-morning",
  "Buenas tardes": "art-v2/good-day",
  "Buenas noches": "art-v2/good-evening",
  "Adiós": "art-v2/goodbye",
  "Hasta luego": "art-v2/goodbye-until-we-meet",
  "Nos vemos": "art-v2/bye",
  "Gracias": "art-v2/thank-you",
  "Por favor": "art-v2/please",
  "Sí": "art-v2/yes",
  "No": "art-v2/no",
  "Perdón": "art-v2/sorry",
  "Está bien": "art-v2/ok",
  "¿Cómo estás?": "art-v2/how-are-you",
  "Muy bien": "art-v2/great",
  "No pasa nada": "art-v2/no-problem",
  "Mucho gusto": "art-v2/nice-to-meet-you",
  "Buena suerte": "art-v2/good-luck",
  "Yo": "art-v2/i-as-in-i-am",
  "Tú": "art-v2/you-to-a-friend",
  "Él": "art-v2/he",
  "Ella": "art-v2/she",
  "Nosotros": "art-v2/we",
  "Ustedes": "art-v2/you-formal-or-plural",
  "Ellos": "art-v2/they-men-or-mixed",
  "Ellas": "art-v2/they-women",
  "Me llamo Tomás": "art-v2/my-name-is-tomas",
  "¿Cómo te llamas?": "art-v2/what-is-your-name",
  "Soy de Estados Unidos": "art-v2/i-am-from-america",
  "Bien, gracias": "art-v2/fine-thanks",
  "¿Y tú?": "art-v2/and-you-after-how-are-you",
  "Más o menos": "art-v2/so-so",
  "Yo también": "art-v2/me-too",
  "¿Qué haces?": "art-v2/what-are-you-up-to",
  "Nada especial": "art-v2/nothing-special",
  "Encantado": "art-v2/very-nice-to-meet-you",
  "Igualmente": "art-v2/you-too",
  "No entiendo": "art-v2/i-don-t-understand",
  "¿Puedes repetir?": "art-v2/can-you-repeat-that-to-a-friend",
  "Estoy aprendiendo": "art-v2/i-m-learning",
  "Otra vez": "art-v2/one-more-time",
  "Ya entendí": "art-v2/got-it",
  "Estamos aquí": "art-v2/we-are-here",
  "No como carne": "art-v2/i-don-t-eat-meat",
  "¿Qué recomienda?": "art-v2/what-do-you-recommend",
  "agua sin gas": "art-v2/still-water",
  "con leche": "art-v2/with-milk",
  "Está rico": "art-v2/tasty",
  "La cuenta, por favor": "art-v2/the-bill-please",
  "¿Puedo pagar con tarjeta?": "art-v2/can-i-pay-by-card",
  "en efectivo": "art-v2/in-cash",
  "¡Buen provecho!": "art-v2/enjoy-your-meal",
  "regreso": "art-v2/i-m-coming-back",
  "y": "art-v2/and",
  "pero": "art-v2/but",
  "o": "art-v2/or",
  "entonces": "art-v2/then",
  "ya": "art-v2/already",
  "todavía": "art-v2/still-yet",
  "cuando": "art-v2/when-not-a-question",
  "todos": "art-v2/everyone",
  "Gracias por todo": "art-v2/thanks-for-everything",
  "¡Qué bueno!": "art-v2/that-s-great",
  "¿Qué significa esta palabra?": "art-v2/what-does-this-word-mean",
  "Soy estudiante": "art-v2/i-am-a-student",
  "hablar": "art-v2/to-speak",
  "dónde": "art-v2/where",
  "cómo": "art-v2/how",
  "la mesa": "art-v2/table",
  "¿De dónde eres?": "art-v2/where-are-you-from-v2",
  "¿Cuántos años tienes?": "art-v2/how-old-are-you",
  "Soy maestro": "art-v2/i-am-a-teacher-v3",
  "a las ocho": "art-v2/at-eight-o-clock",
  "Me visto": "art-v2/i-get-dressed",
  "siempre": "art-v2/always",
  "a veces": "art-v2/sometimes",
  "nunca": "art-v2/never",
  "El menú, por favor": "art-v2/the-menu-please",
  "la ciudad": "art-v2/city",
  "la calle": "art-v2/street",
  "la tienda": "art-v2/shop",
  "el banco": "art-v2/bank",
  "la farmacia": "art-v2/pharmacy",
  "el hospital": "art-v2/hospital",
  "el mercado": "art-v2/market",
  "a la izquierda": "art-v2/to-the-left",
  "derecho": "art-v2/straight-ahead",
  "el taxi": "art-v2/taxi",
  "la bicicleta": "art-v2/bicycle",
  "la estación": "art-v2/station",
  "el boleto": "art-v2/ticket",
  "el tren": "art-v2/train",
  "el dinero": "art-v2/money",
  "la bolsa": "art-v2/bag",
  "caro": "art-v2/expensive",
  "barato": "art-v2/cheap",
  "la camisa": "art-v2/shirt",
  "el pantalón": "art-v2/trousers",
  "los zapatos": "art-v2/shoes",
  "rojo": "art-v2/red",
  "azul": "art-v2/blue-v2",
  "verde": "art-v2/green",
  "negro": "art-v2/black",
  "blanco": "art-v2/white-v5",
  "pequeño": "art-v2/small",
  "la familia": "art-v2/family",
  "el hermano": "art-v2/brother",
  "la hermana": "art-v2/sister",
  "la abuela": "art-v2/grandmother",
  "el abuelo": "art-v2/grandfather",
  "la casa": "art-v2/house",
  "el baño": "art-v2/bathroom",
  "la ventana": "art-v2/window",
  "bajo": "art-v2/short-height",
  "joven": "art-v2/young",
  "mayor": "art-v2/older",
  "amable": "art-v2/kind",
  "nuevo": "art-v2/new",
  "viejo": "art-v2/old",
  "malo": "art-v2/bad",
  "Mi hermana es alta": "art-v2/my-sister-is-tall",
  "la lluvia": "art-v2/rain",
  "chofer": "art-v2/driver",
  "la escuela": "art-v2/school",
  "el trabajo": "art-v2/work-job",
  "leer": "art-v2/to-read",
  "Me gusta la música": "art-v2/i-like-music",
  "la primavera": "art-v2/spring",
  "el otoño": "art-v2/autumn",
  "el año": "art-v2/year",
  "porque": "art-v2/because-v2",
  "solo": "art-v2/only-v2",
  "nadie": "art-v2/nobody-v2",
  "ayer": "art-v2/yesterday",
  "primero": "art-v2/first",
  "de repente": "art-v2/suddenly",
  "la noche": "art-v2/night",
  "Tengo una reservación": "art-v2/i-have-a-reservation",
  "el pasaporte": "art-v2/passport",
  "la maleta": "art-v2/suitcase",
  "el estómago": "art-v2/stomach",
  "Me duele el estómago": "art-v2/my-stomach-hurts",
  "Tengo fiebre": "art-v2/i-have-a-fever",
  "Me duele la espalda": "art-v2/my-back-hurts",
  "¿En serio?": "art-v2/really",
  "el gato": "art-v2/cat",
  "el pájaro": "art-v2/bird",
  "el conejo": "art-v2/rabbit",
  "el caballo": "art-v2/horse",
  "la vaca": "art-v2/cow",
  "el cerdo": "art-v2/pig",
  "la gallina": "art-v2/hen",
  "la oveja": "art-v2/sheep",
  "la mariposa": "art-v2/butterfly",
  "De nada": "art-v2/es-youre-welcome",
  "Con permiso": "art-v2/es-excuse-me-passing",
  "Usted": "art-v2/es-you-polite",
  "¿Hablas inglés?": "art-v2/do-you-speak-english-to-a-friend",
  "el camión": "art-v2/bus",
  "la chamarra": "art-v2/jacket",
  "el departamento": "art-v2/flat-apartment",
  "la recámara": "art-v2/bedroom",
  "ingeniero": "art-v2/engineer",
  "cocinero": "art-v2/cook-chef-v2",
  "luego": "art-v2/then",
  "el elevador": "art-v2/lift-elevator",
  "la salida": "art-v2/exit",
  "la mano": "art-v2/hand-arm",
  "el pie": "art-v2/leg-foot",
  "Llame a una ambulancia": "art-v2/call-an-ambulance",
  "sale": "art-v2/ok",
  "la espalda": "art-v2/back-of-the-body",
  "Todo bien": "art-v2/es-all-good",
  "¿Qué onda?": "art-v2/es-whats-up",
  "Hablo un poco de español": "art-v2/es-speak-little-spanish",
  "¿Cómo se dice en español?": "art-v2/es-how-say-spanish",
  "Más despacio, por favor": "art-v2/es-slower-please",
  "¿Mande?": "art-v2/es-sorry-what",
  "el libro": "art-v2/es-book",
  "el arroz": "art-v2/es-rice",
  "la silla": "art-v2/es-chair-v2",
  "el jugo": "art-v2/es-juice",
  "el parque": "art-v2/es-park",
  "la madre": "art-v2/mom",
  "el padre": "art-v2/dad",
  "la doctora": "art-v2/doctor-woman",
  "el celular": "art-v2/telephone",
  "la parada": "art-v2/bus-stop",
  "la recepción": "art-v2/reception",
  "el equipaje": "art-v2/suitcase",
  "el museo": "art-v2/es-museum",
  "trabajar": "art-v2/work-job",
  "comer": "art-v2/i-am-eating-bread",
  "como": "art-v2/i-am-eating-bread",
  "beber": "art-v2/i-am-drinking-water",
  "bebo": "art-v2/i-am-drinking-water",
  "aprender": "art-v2/i-m-learning",
  "aprendo": "art-v2/i-m-learning",
  "cuándo": "art-v2/when-a-question-v2",
  "quiero": "art-v2/to-want",
  "años": "art-v2/year",
  "Quiero agua": "art-v2/water",
  "Tengo un teléfono": "art-v2/telephone",
  "por la mañana": "art-v2/morning",
  "por la noche": "art-v2/night",
  "Me baño": "art-v2/shower",
  "desayuno": "art-v2/breakfast",
  "duermo": "art-v2/i-sleep-eight-hours",
  "Como arroz": "art-v2/es-rice",
  "Bebo agua": "art-v2/i-am-drinking-water",
  "Tengo sed": "art-v2/thirsty",
  "Una mesa para dos": "art-v2/table",
  "Quiero un taco": "art-v2/taco",
  "Un café, por favor": "art-v2/coffee",
  "Soy alérgico a los cacahuates": "art-v2/i-m-allergic-to-nuts",
  "sin carne": "art-v2/i-don-t-eat-meat",
  "¿Tiene leche?": "art-v2/milk",
  "lejos": "art-v2/far",
  "¿Dónde está la farmacia?": "art-v2/pharmacy",
  "vamos": "art-v2/let-s-go",
  "Voy al parque": "art-v2/es-park",
  "Vamos a la tienda": "art-v2/shop",
  "Siga derecho": "art-v2/straight-ahead",
  "¿Dónde está el museo?": "art-v2/es-museum",
  "La tienda está lejos": "art-v2/far",
  "¿Me puede ayudar?": "art-v2/please-help",
  "en camión": "art-v2/bus",
  "Voy en taxi": "art-v2/taxi",
  "Un boleto, por favor": "art-v2/ticket",
  "¿Va al centro?": "art-v2/centre",
  "¿A qué hora sale?": "art-v2/when-does-it-leave",
  "¿Cuánto cuesta el boleto?": "art-v2/ticket",
  "Aquí, por favor": "art-v2/stop-here-please",
  "Cuesta treinta pesos": "art-v2/money",
  "Quiero dos manzanas": "art-v2/apple",
  "¿Acepta tarjeta?": "art-v2/can-i-pay-by-card",
  "Me queda pequeña": "art-v2/too-small",
  "Me llevo la chamarra": "art-v2/jacket",
  "mi familia": "art-v2/family",
  "tu hermano": "art-v2/brother",
  "Tengo una hermana": "art-v2/sister",
  "Ella es mi madre": "art-v2/mom",
  "Él es mi padre": "art-v2/dad",
  "¿Tienes hijos?": "art-v2/child",
  "Mi familia vive aquí": "art-v2/family",
  "la cama": "art-v2/bedroom",
  "Hay una mesa": "art-v2/table",
  "Hay dos sillas": "art-v2/es-chair-v2",
  "¿Hay un baño?": "art-v2/bathroom",
  "La puerta está abierta": "art-v2/open",
  "La ventana está cerrada": "art-v2/window",
  "Vivo en un departamento": "art-v2/flat-apartment",
  "Mi casa es pequeña": "art-v2/house",
  "alto": "art-v2/a-tall-man",
  "bonito": "art-v2/beautiful",
  "Mi hermano es alto": "art-v2/a-tall-man",
  "Los libros son nuevos": "art-v2/books",
  "La casa es bonita": "art-v2/house",
  "Son muy amables": "art-v2/kind",
  "Estoy contento": "art-v2/happy",
  "Estoy cansado": "art-v2/tired",
  "Estoy enfermo": "art-v2/i-am-sick",
  "Estoy triste": "art-v2/sad",
  "Tengo frío": "art-v2/it-s-cold",
  "Tengo calor": "art-v2/i-m-hot",
  "Hace frío": "art-v2/cold-v2",
  "Hace calor": "art-v2/hot",
  "llueve": "art-v2/rain",
  "Hace viento": "art-v2/wind",
  "Está nublado": "art-v2/cloud",
  "Hoy hace calor": "art-v2/it-s-warm",
  "el maestro": "art-v2/i-am-a-teacher-v3",
  "estudiante": "art-v2/i-am-a-student",
  "vendedor": "art-v2/shop-assistant",
  "¿En qué trabajas?": "art-v2/work-job",
  "Termino a las cinco": "art-v2/i-work-until-five",
  "cocinar": "art-v2/cook-chef-v2",
  "nadar": "art-v2/i-know-how-to-swim",
  "escuchar música": "art-v2/i-like-music",
  "ver películas": "art-v2/films-movies",
  "jugar futbol": "art-v2/football-soccer",
  "viajar": "art-v2/trips-travel",
  "Me gusta leer": "art-v2/to-read",
  "Me gusta cocinar": "art-v2/cook-chef-v2",
  "Me gustan los libros": "art-v2/books",
  "¿Te gusta viajar?": "art-v2/trips-travel",
  "Tengo que trabajar": "art-v2/work-job",
  "Necesito ayuda": "art-v2/please-help",
  "Necesito comprar agua": "art-v2/still-water",
  "Quiero aprender": "art-v2/i-m-learning",
  "Quiero comer": "art-v2/i-am-hungry",
  "Voy a viajar": "art-v2/trips-travel",
  "esta noche": "art-v2/night",
  "¿Vamos al cine?": "art-v2/films-movies",
  "Vamos al museo": "art-v2/es-museum",
  "Nos vemos mañana": "art-v2/see-you-tomorrow",
  "Nos vemos en el parque": "art-v2/es-park",
  "Con mi familia": "art-v2/family",
  "Mi cumpleaños es en mayo": "art-v2/cake",
  "Ayer fui al mercado": "art-v2/market",
  "Comí pollo": "art-v2/chicken",
  "Compré una camisa": "art-v2/shirt",
  "Estuve en casa": "art-v2/house",
  "Iba al parque todos los días": "art-v2/es-park",
  "¿Fuiste al mercado?": "art-v2/market",
  "Cuando era niño": "art-v2/child",
  "la reservación": "art-v2/i-have-a-reservation",
  "¿Incluye desayuno?": "art-v2/breakfast",
  "Necesito otra toalla": "art-v2/towel",
  "¿Puedo dejar mi maleta?": "art-v2/suitcase",
  "Necesito un taxi": "art-v2/taxi",
  "el viaje": "art-v2/trips-travel",
  "¿Dónde está la salida?": "art-v2/exit",
  "¿A qué hora llega?": "art-v2/when-does-it-arrive-v2",
  "Perdí mi maleta": "art-v2/suitcase",
  "Aquí está mi pasaporte": "art-v2/passport",
  "Quiero un boleto a México": "art-v2/ticket",
  "¿Puedo cambiar mi boleto?": "art-v2/ticket",
  "Tengo tos": "art-v2/i-m-coughing",
  "Es una emergencia": "art-v2/call-an-ambulance",
  "¿Dónde está el hospital?": "art-v2/hospital",
  "¿Tiene algo para la tos?": "art-v2/i-m-coughing",
  "¿Tienes fiebre?": "art-v2/i-have-a-fever",
  "¿Necesitas ayuda?": "art-v2/please-help",
  "para mí": "art-v2/in-my-opinion",
  "Es interesante": "art-v2/interesting",
  "Es importante": "art-v2/it-s-important",
  "Prefiero el té": "art-v2/tea",
  "¡Qué lástima!": "art-v2/what-a-pity",
  "Es verdad": "art-v2/that-s-right",
  "Tienes razón": "art-v2/that-s-right",
  "Me parece bien": "art-v2/ok",
  "un momento": "art-v2/in-a-moment",
  "déjame pensar": "art-v2/i-m-thinking",
  "¿Cuál es tu número?": "art-v2/telephone",
  "¿Cuál es la contraseña?": "art-v2/what-is-the-wi-fi-password",
  "la contraseña": "art-v2/what-is-the-wi-fi-password",
  "Me gustaría un café": "art-v2/coffee",
  "¿Me trae agua, por favor?": "art-v2/water",
  "¿Me puede llamar un taxi?": "art-v2/taxi",
  "¿Puede hablar más despacio?": "art-v2/es-slower-please",
  "No funciona": "art-v2/it-doesn-t-work",
  "¿Dónde puedo comprar un boleto?": "art-v2/ticket",
  "el pez": "art-v2/fish",
  "Mi gato duerme": "art-v2/cat",
  "El pájaro canta": "art-v2/bird",
  "La comida está muy rica": "art-v2/very-tasty",
  "¿Puede repetir?": "art-v2/can-you-repeat-that-to-a-friend",
  "en metro": "art-v2/es-subway",
  "Quiero ir al aeropuerto": "art-v2/es-airport",
  "Me levanto": "art-v2/es-wake-up",
  "Me levanto temprano": "art-v2/es-wake-up",
  "¿Te levantas temprano?": "art-v2/es-wake-up",
  "en la esquina": "art-v2/es-corner",
  "dos cuadras": "art-v2/es-city-block",
  "¿Cuántas cuadras?": "art-v2/es-city-block",
  "a la derecha": "art-v2/es-turn-right",
  "¿A la derecha?": "art-v2/es-turn-right",
  "caminar": "art-v2/es-walk",
  "Prefiero caminar": "art-v2/es-walk",
  "Podemos caminar": "art-v2/es-walk",
  "¿Cuánto cuesta?": "art-v2/es-price",
  "Es muy grande": "art-v2/es-big",
  "La llave está aquí": "art-v2/es-key",
  "Aquí está la llave": "art-v2/es-key",
  "Hace buen tiempo": "art-v2/es-sunny",
  "Necesito un doctor": "art-v2/es-doctor-man",
  "Necesito hablar con un doctor": "art-v2/es-doctor-man",
  "Trabajo en una oficina": "art-v2/es-office",
  "Tengo un perro": "art-v2/es-dog",
  "Tenía un perro": "art-v2/es-dog",
  "¿Tenías un perro?": "art-v2/es-dog",
  "El perro es pequeño": "art-v2/es-dog",
  "Una habitación para dos": "art-v2/es-hotel-room",
  "¿Dónde está mi habitación?": "art-v2/es-hotel-room",
  "¿Te duele la cabeza?": "art-v2/es-headache",
  "¿Tienes una alergia?": "art-v2/es-allergy",
  "Te mando un mensaje": "art-v2/es-message",
  "¿La salsa está picante?": "art-v2/es-salsa",
  "el aeropuerto": "art-v2/es-airport",
  "la alergia": "art-v2/es-allergy",
  "el aguacate": "art-v2/es-avocado",
  "la tarjeta": "art-v2/es-bank-card",
  "grande": "art-v2/es-big",
  "la puerta de embarque": "art-v2/es-boarding-gate",
  "la fecha": "art-v2/es-calendar",
  "el coche": "art-v2/es-car",
  "Necesito cargar mi celular": "art-v2/es-charge-phone",
  "el chile": "art-v2/es-chile",
  "la cuadra": "art-v2/es-city-block",
  "la esquina": "art-v2/es-corner",
  "Cruce la calle": "art-v2/es-crosswalk",
  "bailar": "art-v2/es-dance",
  "la hija": "art-v2/es-daughter",
  "el Día de Muertos": "art-v2/es-day-of-the-dead",
  "el doctor": "art-v2/es-doctor-man",
  "el perro": "art-v2/es-dog",
  "la puerta": "art-v2/es-door-v3",
  "el elefante": "art-v2/es-elephant",
  "el correo": "art-v2/es-email",
  "la entrada": "art-v2/es-entrance",
  "la fiesta": "art-v2/es-fiesta",
  "el vuelo": "art-v2/es-flight",
  "la artesanía": "art-v2/es-handicraft",
  "la cabeza": "art-v2/es-head",
  "Me duele la cabeza": "art-v2/es-headache",
  "la habitación": "art-v2/es-hotel-room",
  "la llave": "art-v2/es-key",
  "la cocina": "art-v2/es-kitchen",
  "el león": "art-v2/es-lion",
  "Estoy perdido": "art-v2/es-lost",
  "el mariachi": "art-v2/es-mariachi",
  "la medicina": "art-v2/es-medicine",
  "el mensaje": "art-v2/es-message",
  "Me encanta la comida mexicana": "art-v2/es-mexican-food",
  "México": "art-v2/es-mexico",
  "el mono": "art-v2/es-monkey",
  "Estoy nervioso": "art-v2/es-nervous",
  "enfermera": "art-v2/es-nurse",
  "la oficina": "art-v2/es-office",
  "los padres": "art-v2/es-parents",
  "el pozole": "art-v2/es-pozole",
  "el precio": "art-v2/es-price",
  "la salsa": "art-v2/es-salsa",
  "el asiento": "art-v2/es-seat",
  "cantar": "art-v2/es-sing",
  "el sofá": "art-v2/es-sofa",
  "el hijo": "art-v2/es-son",
  "Está picante": "art-v2/es-spicy",
  "la plaza": "art-v2/es-square",
  "el metro": "art-v2/es-subway",
  "el verano": "art-v2/es-summer",
  "Hace sol": "art-v2/es-sunny",
  "la playera": "art-v2/es-t-shirt",
  "el tamal": "art-v2/es-tamal",
  "la maestra": "art-v2/es-teacher-woman",
  "Gire a la derecha": "art-v2/es-turn-right",
  "la tortuga": "art-v2/es-turtle",
  "Me despierto": "art-v2/es-wake-up",
  "a pie": "art-v2/es-walk",
  "Me lavo las manos": "art-v2/es-wash-hands",
  "el invierno": "art-v2/es-winter",
  "el zócalo": "art-v2/es-zocalo"
});
Object.assign(EMOJI,{
  "uno": "#one",
  "dos": "#two",
  "tres": "#three",
  "cuatro": "#four",
  "cinco": "#five",
  "seis": "#six",
  "siete": "#seven",
  "ocho": "#eight",
  "nueve": "#nine",
  "diez": "#ten",
  "once": "#eleven",
  "doce": "#twelve",
  "trece": "#thirteen",
  "catorce": "#fourteen",
  "quince": "#fifteen",
  "veinte": "#twenty",
  "treinta": "#thirty",
  "cien": "#one hundred",
  "pesos": "#pesos",
  "dieciséis": "#sixteen",
  "diecisiete": "#seventeen",
  "dieciocho": "#eighteen",
  "diecinueve": "#nineteen",
  "veintiuno": "#twenty-one",
  "cero": "#zero",
  "cuarenta": "#forty",
  "cincuenta": "#fifty",
  "sesenta": "#sixty",
  "setenta": "#seventy",
  "ochenta": "#eighty",
  "noventa": "#ninety",
  "veintidós": "#twenty-two",
  "lunes": "#Monday",
  "martes": "#Tuesday",
  "miércoles": "#Wednesday",
  "jueves": "#Thursday",
  "viernes": "#Friday",
  "sábado": "#Saturday",
  "domingo": "#Sunday",
  "hoy": "#today",
  "mañana": "#tomorrow",
  "temprano": "#early",
  "tarde": "#late",
  "enero": "#January",
  "febrero": "#February",
  "marzo": "#March",
  "abril": "#April",
  "mayo": "#May",
  "junio": "#June",
  "julio": "#July",
  "agosto": "#August",
  "septiembre": "#September",
  "octubre": "#October",
  "noviembre": "#November",
  "diciembre": "#December"
});
// Abstract words and phrases wait for a reviewed illustration rather than a misleading symbol.
const NO_PIC=new Set([
  "soy",
  "eres",
  "es",
  "somos",
  "son",
  "estoy",
  "estás",
  "está",
  "estamos",
  "están",
  "aquí",
  "allá",
  "Soy estudiante",
  "Estamos aquí",
  "¿Dónde estás?",
  "¿Eres estudiante?",
  "Ella es mexicana",
  "Somos amigos",
  "Estoy en México",
  "¿Están aquí?",
  "ser",
  "estar",
  "Estoy aquí",
  "¿Somos amigos?",
  "¿Es de México?",
  "hablar",
  "hablas",
  "trabajar",
  "trabajas",
  "Trabajo aquí",
  "comer",
  "como",
  "comes",
  "beber",
  "bebo",
  "vivir",
  "vives",
  "aprender",
  "aprendo",
  "No trabajo aquí",
  "hablamos",
  "comemos",
  "vivimos",
  "Aprendemos español",
  "No hablo inglés",
  "habla",
  "trabaja",
  "come",
  "vive",
  "Vivo aquí",
  "hablan",
  "trabajan",
  "bebes",
  "bebe",
  "beben",
  "qué",
  "quién",
  "dónde",
  "cuándo",
  "por qué",
  "cómo",
  "cuánto",
  "cuál",
  "¿Qué es?",
  "¿Quién es?",
  "¿Dónde vives?",
  "¿Hablas inglés?",
  "¿Cuándo trabajas?",
  "¿Por qué aprendes español?",
  "¿Cómo se llama?",
  "el libro",
  "la mesa",
  "la silla",
  "¿Dónde está el libro?",
  "¿Qué significa?",
  "México",
  "Estados Unidos",
  "Soy de México",
  "¿De dónde eres?",
  "Vivo en México",
  "tengo",
  "tienes",
  "quiero",
  "quieres",
  "necesito",
  "años",
  "¿Cuántos años tienes?",
  "Soy maestro",
  "Soy de aquí",
  "Trabajo en México",
  "el agua",
  "el pan",
  "Quiero agua",
  "Necesito un libro",
  "Tengo un teléfono",
  "Tengo veinte años",
  "treinta y uno",
  "ciento uno",
  "el fin de semana",
  "¿Qué hora es?",
  "Es la una",
  "Son las dos",
  "Son las tres y media",
  "a las ocho",
  "por la mañana",
  "por la tarde",
  "por la noche",
  "Me despierto",
  "Me levanto",
  "Me baño",
  "Me visto",
  "desayuno",
  "salgo",
  "Voy al trabajo",
  "regreso",
  "descanso",
  "duermo",
  "siempre",
  "a veces",
  "nunca",
  "todos los días",
  "después",
  "Me levanto temprano",
  "Desayuno a las ocho",
  "Trabajo por la mañana",
  "Después descanso",
  "Me acuesto tarde",
  "¿Te levantas temprano?",
  "¿Desayunas a las ocho?",
  "¿Duermes bien?",
  "¿A qué hora te acuestas?",
  "Me lavo las manos",
  "la leche",
  "el queso",
  "la carne",
  "el pollo",
  "el pescado",
  "el arroz",
  "el huevo",
  "la sopa",
  "la manzana",
  "la papa",
  "el té",
  "el jugo",
  "la cerveza",
  "el azúcar",
  "la sal",
  "Como arroz",
  "Bebo agua",
  "No como carne",
  "Tengo hambre",
  "Tengo sed",
  "el restaurante",
  "el menú",
  "Una mesa para dos",
  "El menú, por favor",
  "¿Qué recomienda?",
  "Quiero un taco",
  "Un café, por favor",
  "sin azúcar",
  "con leche",
  "agua sin gas",
  "Está rico",
  "Está picante",
  "Soy alérgico a los cacahuates",
  "sin carne",
  "¿Tiene leche?",
  "La cuenta, por favor",
  "¿Puedo pagar con tarjeta?",
  "en efectivo",
  "la propina",
  "¡Buen provecho!",
  "la ciudad",
  "la calle",
  "el parque",
  "el museo",
  "la plaza",
  "la tienda",
  "el banco",
  "la farmacia",
  "el hospital",
  "el mercado",
  "cerca",
  "lejos",
  "al lado de",
  "frente a",
  "¿Dónde está la farmacia?",
  "voy",
  "vas",
  "vamos",
  "Voy al parque",
  "Vamos a la tienda",
  "a la derecha",
  "a la izquierda",
  "derecho",
  "la esquina",
  "la cuadra",
  "Siga derecho",
  "Gire a la derecha",
  "Cruce la calle",
  "en la esquina",
  "dos cuadras",
  "¿Dónde está el museo?",
  "El banco está cerca",
  "La tienda está lejos",
  "Está al lado del banco",
  "Estoy perdido",
  "¿Me puede ayudar?",
  "¿Está cerca?",
  "¿A la derecha?",
  "¿Cuántas cuadras?",
  "Ya veo",
  "el camión",
  "el metro",
  "el taxi",
  "el coche",
  "la bicicleta",
  "la estación",
  "la parada",
  "el boleto",
  "el aeropuerto",
  "el tren",
  "en camión",
  "en metro",
  "a pie",
  "Voy en taxi",
  "Un boleto, por favor",
  "¿Va al centro?",
  "¿A qué hora sale?",
  "¿Cuánto cuesta el boleto?",
  "Quiero ir al aeropuerto",
  "Aquí, por favor",
  "el precio",
  "el dinero",
  "la tarjeta",
  "la bolsa",
  "¿Cuánto cuesta?",
  "este",
  "esta",
  "ese",
  "esa",
  "otro",
  "caro",
  "barato",
  "Cuesta treinta pesos",
  "Quiero dos manzanas",
  "Es muy caro",
  "¿Tiene cambio?",
  "¿Acepta tarjeta?",
  "No necesito bolsa",
  "Me llevo este",
  "¿Tiene otro?",
  "la camisa",
  "la playera",
  "el pantalón",
  "la chamarra",
  "los zapatos",
  "rojo",
  "azul",
  "verde",
  "negro",
  "blanco",
  "grande",
  "pequeño",
  "la talla",
  "Me queda bien",
  "Es muy grande",
  "una camisa roja",
  "una chamarra azul",
  "zapatos negros",
  "¿Me la puedo probar?",
  "Quiero una talla más grande",
  "¿Te queda bien?",
  "¿Quieres una talla más pequeña?",
  "¿La quiere en azul?",
  "Me queda pequeña",
  "Me llevo la chamarra",
  "la madre",
  "el padre",
  "el hijo",
  "la hija",
  "la familia",
  "el hermano",
  "la hermana",
  "la abuela",
  "el abuelo",
  "los padres",
  "mi familia",
  "tu hermano",
  "mis hijos",
  "Tengo una hermana",
  "No tengo hermanos",
  "Ella es mi madre",
  "Él es mi padre",
  "¿Tienes hijos?",
  "Tengo dos hijos",
  "Mi familia vive aquí",
  "la casa",
  "el departamento",
  "la cocina",
  "el baño",
  "la recámara",
  "la cama",
  "la puerta",
  "la ventana",
  "el sofá",
  "la llave",
  "hay",
  "Hay una mesa",
  "Hay dos sillas",
  "No hay agua",
  "¿Hay un baño?",
  "La llave está aquí",
  "La puerta está abierta",
  "La ventana está cerrada",
  "Vivo en un departamento",
  "Mi casa es pequeña",
  "alto",
  "bajo",
  "joven",
  "mayor",
  "amable",
  "nuevo",
  "viejo",
  "bonito",
  "bueno",
  "malo",
  "Mi hermano es alto",
  "Mi hermana es alta",
  "Los libros son nuevos",
  "La casa es bonita",
  "Son muy amables",
  "más grande que",
  "menos caro",
  "mejor",
  "peor",
  "Este es más barato",
  "Estoy contento",
  "Estoy cansado",
  "Estoy enfermo",
  "Estoy triste",
  "Estoy nervioso",
  "Tengo frío",
  "Tengo calor",
  "Hace frío",
  "Hace calor",
  "Hace buen tiempo",
  "llueve",
  "Hace sol",
  "Hace viento",
  "Está nublado",
  "la lluvia",
  "¿Cómo te sientes?",
  "Me siento bien",
  "Estoy mejor",
  "Necesito descansar",
  "Hoy hace calor",
  "el maestro",
  "la maestra",
  "el doctor",
  "la doctora",
  "estudiante",
  "ingeniero",
  "enfermera",
  "chofer",
  "cocinero",
  "vendedor",
  "la oficina",
  "la escuela",
  "el trabajo",
  "Trabajo en una oficina",
  "¿En qué trabajas?",
  "estudiar",
  "estudio",
  "empiezo",
  "termino",
  "Termino a las cinco",
  "¿Cuándo terminas?",
  "¿Dónde estudias?",
  "¿A qué hora empiezas?",
  "Trabajo desde casa",
  "No trabajo los domingos",
  "leer",
  "cocinar",
  "caminar",
  "bailar",
  "nadar",
  "escuchar música",
  "ver películas",
  "jugar futbol",
  "viajar",
  "cantar",
  "Me gusta leer",
  "Me gusta cocinar",
  "Me gusta la música",
  "Me gustan los libros",
  "No me gusta bailar",
  "¿Te gusta viajar?",
  "Sí, me gusta",
  "A mí también",
  "A mí no",
  "Prefiero caminar",
  "puedo",
  "puedes",
  "podemos",
  "Puedo hablar español",
  "No puedo ir",
  "tengo que",
  "tienes que",
  "Tengo que trabajar",
  "Tengo que estudiar",
  "Tenemos que salir",
  "Necesito ayuda",
  "Necesito dormir",
  "Necesito comprar agua",
  "¿Puede repetir?",
  "¿Puedo entrar?",
  "Quiero aprender",
  "Quiero comer",
  "¿Quieres venir?",
  "No quiero salir",
  "Podemos caminar",
  "Voy a viajar",
  "Voy a estudiar",
  "Vas a trabajar",
  "Vamos a comer",
  "Van a venir",
  "esta noche",
  "la próxima semana",
  "el próximo año",
  "el lunes",
  "el sábado",
  "¿Qué vas a hacer mañana?",
  "¿Vamos al cine?",
  "¿Quieres comer conmigo?",
  "Vamos al museo",
  "Nos vemos mañana",
  "¿A qué hora?",
  "A las seis",
  "Sí, puedo",
  "No puedo, tengo que trabajar",
  "Está bien, nos vemos a las seis",
  "¿Con quién vas?",
  "¿Con quién?",
  "Con mi familia",
  "¿Dónde nos vemos?",
  "Nos vemos en el parque",
  "la primavera",
  "el verano",
  "el otoño",
  "el invierno",
  "el año",
  "la fecha",
  "Mi cumpleaños es en mayo",
  "Hoy es cinco de mayo",
  "y",
  "pero",
  "porque",
  "o",
  "entonces",
  "ya",
  "todavía",
  "solo",
  "cuando",
  "también",
  "Quiero ir pero no puedo",
  "No voy porque estoy cansado",
  "Quiero café o té",
  "Trabajo y estudio",
  "Todavía estoy aquí",
  "todos",
  "nadie",
  "algo",
  "No hay nadie",
  "¿Quieres algo?",
  "ayer",
  "anoche",
  "la semana pasada",
  "fui",
  "estuve",
  "hablé",
  "comí",
  "viví",
  "trabajé",
  "compré",
  "hice",
  "tuve",
  "vi",
  "salí",
  "llegué",
  "Ayer fui al mercado",
  "Comí pollo",
  "Compré una camisa",
  "Estuve en casa",
  "¿Qué hiciste ayer?",
  "bebí",
  "estudié",
  "caminé",
  "descansé",
  "dormí",
  "primero",
  "luego",
  "al final",
  "antes",
  "de repente",
  "era",
  "estaba",
  "tenía",
  "vivía",
  "iba",
  "Cuando era niño",
  "Vivía en México",
  "Estaba en casa",
  "Tenía un perro",
  "Iba al parque todos los días",
  "¿Cómo te fue?",
  "Me fue bien",
  "Fue muy bonito",
  "Primero comí, luego salí",
  "Al final regresé a casa",
  "¿Qué compraste?",
  "¿Dónde vivías cuando eras niño?",
  "¿Tenías un perro?",
  "¿Fuiste al mercado?",
  "¿Qué comiste?",
  "la reservación",
  "la habitación",
  "la noche",
  "Tengo una reservación",
  "Una habitación para dos",
  "¿Incluye desayuno?",
  "¿Tiene internet?",
  "por dos noches",
  "la recepción",
  "el elevador",
  "La llave no funciona",
  "No hay agua caliente",
  "Necesito otra toalla",
  "¿Dónde está mi habitación?",
  "Está en el segundo piso",
  "¿A qué hora es la salida?",
  "¿Puedo dejar mi maleta?",
  "Necesito un taxi",
  "Aquí está la llave",
  "Gracias por todo",
  "el pasaporte",
  "la maleta",
  "el equipaje",
  "el vuelo",
  "el viaje",
  "la entrada",
  "la salida",
  "la llegada",
  "la puerta de embarque",
  "el asiento",
  "¿Dónde está la salida?",
  "¿A qué hora llega?",
  "Mi vuelo está retrasado",
  "Perdí mi maleta",
  "Aquí está mi pasaporte",
  "Quiero un boleto a México",
  "de ida y vuelta",
  "solo de ida",
  "¿Cuánto dura el viaje?",
  "¿Puedo cambiar mi boleto?",
  "la cabeza",
  "la mano",
  "el pie",
  "el estómago",
  "la espalda",
  "Me duele la cabeza",
  "Me duele el estómago",
  "Me duelen los pies",
  "Tengo fiebre",
  "Tengo tos",
  "¡Ayuda!",
  "Necesito un doctor",
  "Es una emergencia",
  "Llame a una ambulancia",
  "¿Dónde está el hospital?",
  "la medicina",
  "la alergia",
  "¿Tiene algo para la tos?",
  "Soy alérgico a esta medicina",
  "Necesito hablar con un doctor",
  "¿Te duele la cabeza?",
  "¿Tienes fiebre?",
  "¿Necesitas ayuda?",
  "¿Tienes una alergia?",
  "Me duele la espalda",
  "creo que",
  "pienso que",
  "para mí",
  "Es interesante",
  "Es importante",
  "Estoy de acuerdo",
  "No estoy de acuerdo",
  "Tienes razón",
  "Es verdad",
  "No sé",
  "Prefiero el té",
  "Me encanta la comida mexicana",
  "No me gustan los hoteles grandes",
  "Creo que es muy caro",
  "Es mejor caminar",
  "¿Qué piensas?",
  "¿Qué prefieres?",
  "¿Te parece bien?",
  "Me parece bien",
  "¿Por qué no?",
  "¡Qué padre!",
  "¿En serio?",
  "¡Qué bueno!",
  "¡Qué lástima!",
  "¡No puede ser!",
  "¿Y luego?",
  "¿Y después?",
  "¿Con quién hablas?",
  "¿Dónde fue?",
  "Cuéntame",
  "un momento",
  "déjame pensar",
  "por ejemplo",
  "quiero decir",
  "la verdad",
  "Me dio mucho gusto verte",
  "Que tengas buen día",
  "Cuídate",
  "Seguimos en contacto",
  "Hasta pronto",
  "el mensaje",
  "el correo",
  "el número",
  "la contraseña",
  "el celular",
  "¿Cuál es tu número?",
  "Te mando un mensaje",
  "¿Me lo puede escribir?",
  "No tengo internet",
  "¿Cuál es la contraseña?",
  "Me gustaría un café",
  "¿Podría ayudarme?",
  "¿Me trae agua, por favor?",
  "¿Me puede llamar un taxi?",
  "¿Puede hablar más despacio?",
  "No funciona",
  "No encuentro mi teléfono",
  "Perdí mi llave",
  "Necesito cargar mi celular",
  "¿Dónde puedo comprar un boleto?",
  "el perro",
  "el gato",
  "el pájaro",
  "el pez",
  "el conejo",
  "el caballo",
  "la vaca",
  "el cerdo",
  "la gallina",
  "la oveja",
  "el león",
  "el elefante",
  "el mono",
  "la tortuga",
  "la mariposa",
  "Tengo un perro",
  "Mi gato duerme",
  "El perro es pequeño",
  "Me gustan los animales",
  "El pájaro canta",
  "el tamal",
  "el pozole",
  "la salsa",
  "el chile",
  "el aguacate",
  "el mariachi",
  "el Día de Muertos",
  "el zócalo",
  "la artesanía",
  "la fiesta",
  "ahorita",
  "sale",
  "chido",
  "la plática",
  "¿Qué tal?",
  "Me gusta aprender español",
  "Quiero conocer México",
  "La comida está muy rica",
  "¿La salsa está picante?",
  "¡Nos vemos pronto!"
]);
// END SPANISH PICTURES
function picFor(lt){return PICTURE_ASSETS[lt]||EMOJI[lt]||'';}
function picFile(e){if(e.startsWith('art-v2/'))return 'pics/'+e+'.webp';let cps=[...e].map(ch=>ch.codePointAt(0).toString(16));if(!cps.includes('200d'))cps=cps.filter(c=>c!=='fe0f');return 'pics/'+cps.join('-')+'.svg';}
function picHtml(lt,cls){const v=picFor(lt);if(!v)return '';cls=cls||'';
  if(v[0]==='#')return '<span class="pic tile '+cls+'" aria-hidden="true">'+esc(v.slice(1))+'</span>';
  if(v.startsWith('art-v2/'))return '<span class="pic picbox art '+cls+'" aria-hidden="true"><span class="pic-e">'+esc(EMOJI[lt]||'')+'</span><img src="'+picFile(v)+'" alt="" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"></span>';
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
'u0a-1':'Spanish spelling follows regular patterns. Learn the tricky letters here (<b>j</b>, <b>ll</b>, <b>ñ</b> and the silent <b>h</b>) to start sounding out familiar words.',
'u0b-1':'A written accent (<b>é</b>, <b>ó</b>) only shows which syllable to stress. Without one, stress the second-to-last syllable when a word ends in a vowel, n or s (<b>TA</b>-co), and the last one otherwise (ho-<b>TEL</b>).',
'u1a-1':'<b>Hola</b> works with everyone. <b>Buenos días</b> is for the morning, <b>buenas tardes</b> from lunch until dark, <b>buenas noches</b> after that. Notice buen<b>os</b> días but buen<b>as</b> tardes: "good" matches the word after it.',
'u1a-2':'<b>Gracias</b> is "thank you" and <b>de nada</b> is the answer. <b>Hasta luego</b> is the everyday goodbye; <b>adiós</b> can suggest a longer separation.',
'u1b-1':'<b>Sí</b> (yes) needs its accent: <b>si</b> without one means "if". Say <b>con permiso</b> as you squeeze past someone, and <b>perdón</b> when you bump into them.',
'u1b-2':'<b>No pasa nada</b> is what Mexicans say when you apologise: no harm done. <b>Mucho gusto</b> is the handshake phrase when you meet someone.',
'u1c-1':'<b>Yo</b>, <b>tú</b>, <b>él</b>, <b>ella</b>: I, you, he, she. Keep the accents on <b>tú</b> and <b>él</b>: without them, the meanings change to "your" and "the".',
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
// BEGIN SPANISH PRACTICE
Object.assign(LESSON_TIPS,{
  "u22a-1": "Use <b>soy</b> for your identity and <b>eres</b> when asking a friend about theirs. A job normally needs no word for “a”.",
  "u22b-1": "Use <b>estoy</b> for your location or state. The choice of verb depends on meaning, rather than simply how long something lasts.",
  "u22c-1": "Put the location after the verb. In Mexican Spanish <b>aquí</b> and <b>acá</b> both refer to “here”.",
  "u22d-1": "A question can keep the same word order as a statement. Your voice and the question marks show the difference.",
  "u22e-1": "The dictionary forms name the two verbs. Choose their meaning first, then their subject ending.",
  "u23a-1": "For these regular verbs, the “I” form ends in <b>-o</b> and the informal “you” form ends in <b>-as</b>.",
  "u23b-1": "Compare the endings: <b>como</b> becomes <b>comes</b> for “you”. The subject can usually be left out when the verb identifies it.",
  "u23c-1": "A verb can stand on its own as a sentence. Say <b>no</b> before the verb to make it negative.",
  "u23d-1": "The ending <b>-mos</b> signals “we”. Keep the negative word before the verb.",
  "u23e-1": "These forms can describe he, she or polite you. Use a name or subject word when it would otherwise be unclear.",
  "u23f-1": "For they or you all, regular present forms often end in n. Contrast these with the informal singular you form.",
  "u24a-1": "Question words carry written accents. Choose the one that asks for the kind of information you need.",
  "u24b-1": "A question begins with <b>¿</b> and ends with <b>?</b>. The opening mark helps you read the sentence with question intonation.",
  "u24c-1": "The word order in a Spanish question is often the same as in a statement. Keep the accent in the question word.",
  "u24d-1": "Articles go before a noun: <b>el</b> and <b>la</b> both mean “the”. Learn the article together with the noun.",
  "u25a-1": "Use <b>de</b> for origin. Keep the name of your country after it.",
  "u25b-1": "These common verbs have irregular “I” forms. Learn them as useful whole words.",
  "u25c-1": "Age uses the verb for “have”. After learning numbers, put a number before the word for years.",
  "u25d-1": "A short useful sentence can be just a verb and the thing you need. The article is part of the noun phrase.",
  "u2a-1": "Say the numbers in order, then mix them up. Practise hearing each number on its own.",
  "u2b-1": "Keep the vowels short. Practise saying a number without counting up from one first.",
  "u2c-1": "These five numbers each have their own form. Learn them as whole words.",
  "u2d-1": "Use <b>un</b> before a masculine noun, while <b>uno</b> is the counting form. Prices in this course use Mexican pesos.",
  "u2e-1": "The teens combine parts into one written word. Keep written accents where shown.",
  "u2f-1": "Learn the tens as whole words. A zero is useful in phone numbers and prices.",
  "u2g-1": "For a number after thirty, connect the ten and the one with the joining word shown. Twenty-two is written as one word.",
  "u5a-1": "Days of the week are normally written with lowercase letters in Spanish.",
  "u5b-1": "Use the singular article for a particular day, and the plural for a regular weekly activity.",
  "u5c-1": "Use <b>son las</b> for most hours. One o’clock has its own singular form.",
  "u5d-1": "Use these phrases to say when something happens. Watch the article in each phrase.",
  "u26a-1": "In these actions, <b>me</b> shows that you do something involving yourself. Keep it before the conjugated verb.",
  "u26b-1": "Use a time phrase to place an action in your day. The verb itself still shows who does it.",
  "u26c-1": "These expressions tell someone how often you do something. They can go before or after the main action.",
  "u26d-1": "Build a whole sentence from an action and a time phrase. Say it aloud as one smooth group.",
  "u26e-1": "Switch to the informal you form when asking a friend about their routine.",
  "u3a-1": "Learn the article with each food. The noun keeps its form when it is the thing you eat.",
  "u3b-1": "These are everyday foods you can recognise on a menu or ask for at a shop.",
  "u3c-1": "Use these nouns to name a drink or something you want to add to it.",
  "u3d-1": "Use the same noun after the verb. A negative goes before the action word.",
  "u15a-1": "Polite requests can be short. Add <b>por favor</b> after what you need.",
  "u15b-1": "Use a clear request and name your food or drink. The polite “you” form is useful with a server.",
  "u15c-1": "Explain an allergy clearly. Say the whole phrase and name the ingredient.",
  "u15d-1": "Use a question to check the payment method. Thank the server before leaving.",
  "u4a-1": "Use <b>el</b> or <b>la</b> with each place. These nouns will help you ask where things are.",
  "u4b-1": "Ask for a place using the location verb. Keep each noun’s article with it.",
  "u4c-1": "Use a location word after the verb. Some places can also be described by what they are next to.",
  "u4d-1": "The words <b>a</b> and <b>el</b> combine into <b>al</b>. They stay separate before a feminine article.",
  "u14a-1": "Use these short phrases to follow directions. Practise pointing as you say them.",
  "u14b-1": "These are useful polite instruction forms. Learn the complete phrases before trying to change their endings.",
  "u14c-1": "The location verb tells someone where a place is. The place can come first or last.",
  "u14d-1": "Make the request polite when asking a stranger. A short follow-up question can check what you heard.",
  "u7a-1": "These are common transport words in Mexico. Learn the noun and its article together.",
  "u7b-1": "Use these words when planning a journey or looking for your departure point.",
  "u7c-1": "Use <b>en</b> for most means of transport. Going on foot has a different fixed phrase.",
  "u7d-1": "Ask about the destination, time or fare. Say the key place name clearly.",
  "u16a-1": "These words help you identify an item and ask its price.",
  "u16b-1": "Point to the item and use the matching form. Ask for another item if this one is unsuitable.",
  "u16c-1": "Use a description after the verb to comment on the price. A quantity can go straight before the noun.",
  "u16d-1": "These are everyday phrases for finishing a purchase. Ask politely when checking availability.",
  "u28a-1": "Clothing words have a grammatical gender even when anyone can wear the item.",
  "u28b-1": "Many colour words change their ending to match a noun. Learn these basic dictionary forms first.",
  "u28c-1": "Use a size word after the noun or after the verb. Some describing words do not change for grammatical gender.",
  "u28d-1": "A colour usually follows the clothing noun. Ask before trying on an item.",
  "u28e-1": "In these phrases, the object word refers to a feminine clothing item. Ask the other person whether it fits.",
  "u6a-1": "The article is part of the noun phrase. Keep the masculine and feminine family terms distinct.",
  "u6b-1": "Use these words to describe who someone is in your family.",
  "u6c-1": "A possessive goes before the noun. Its plural ending matches how many things or people are owned.",
  "u6d-1": "Use the identity verb to say who a person is. You can identify someone without repeating their name.",
  "u30a-1": "Learn each noun with its article, then picture where it is in your home.",
  "u30b-1": "Use these nouns to describe furniture and things inside a room.",
  "u30c-1": "Use <b>hay</b> for both “there is” and “there are”. It does not change for more than one thing.",
  "u30d-1": "Use the location verb for a specific thing you have already identified. Use <b>hay</b> to introduce its existence.",
  "u29a-1": "Many describing words end in <b>-o</b> for a masculine noun and <b>-a</b> for a feminine noun.",
  "u29b-1": "These words often go after a noun. Some change for grammatical gender; others keep the same ending.",
  "u29c-1": "The describing word agrees with the person or thing it describes, including its plural ending.",
  "u29d-1": "Put <b>más</b> before a describing word and <b>que</b> before the person or thing you compare with.",
  "u9a-1": "Use the state verb for how you feel now. Some of these words have a different form for women.",
  "u9b-1": "Physical sensations often use the verb for “have”. Weather uses a different construction.",
  "u9c-1": "Learn these weather expressions as complete phrases. They do not need a subject word.",
  "u9d-1": "Ask about someone’s state, or describe your own. The context makes clear whether you mean a person or the weather.",
  "u31a-1": "A profession normally follows the identity verb without an article. Some job words change for women.",
  "u31b-1": "These are useful job names for introductions. Notice that some forms are shared by men and women.",
  "u31c-1": "Use a place phrase after the verb to say where someone works.",
  "u31d-1": "These verbs help you talk about work or study. A time word can tell someone when it happens.",
  "u31e-1": "Use the informal you ending when asking a friend about their work or studies.",
  "u8a-1": "Dictionary forms end in <b>-ar</b>, <b>-er</b> or <b>-ir</b>. Learn the whole form for an activity.",
  "u8b-1": "These activities can follow a verb such as “want”. Keep both words together in the longer activities.",
  "u8c-1": "The thing or activity you like is the subject of this construction. Use the singular verb before an activity.",
  "u8d-1": "Use the question form to ask about a friend’s interests. A short answer can connect your interests.",
  "u32a-1": "Keep the second verb in its dictionary form after the word for “can”.",
  "u32b-1": "The “have to” construction needs its linking word before the dictionary form of the action.",
  "u32c-1": "A polite question is useful when asking a stranger for help. Keep the second action in its dictionary form.",
  "u32d-1": "Put the activity straight after the verb for “want”. Keep the dictionary form of that activity.",
  "u33a-1": "For a plan, put <b>a</b> between the form of “go” and the dictionary form of the activity.",
  "u33b-1": "A time expression places your plan in the future. Say the expression as one group.",
  "u33c-1": "A question can turn a plan into an invitation. Suggest a place or an activity that you both know.",
  "u33d-1": "Accept, decline or suggest a time. A short explanation helps make the reply natural.",
  "u33e-1": "Ask who is taking part and where to meet. Keep the question word’s written accent.",
  "u18a-1": "Use these season names to talk about weather or travel plans.",
  "u18b-1": "Month names normally begin with lowercase letters. Use them after a date or a time preposition.",
  "u18c-1": "Practise recognising each month independently, without saying the whole list first.",
  "u18d-1": "A date uses the number followed by the month. Birthdays are a useful reason to practise saying a date.",
  "u41a-1": "These short words connect two ideas. Keep the relationship between those ideas clear.",
  "u41b-1": "A small word can change when something happens or how much is involved.",
  "u41c-1": "Join two short sentences that you can already say. Keep the verb and its subject consistent in each part.",
  "u41d-1": "These words can stand for an unspecified person or thing. A negative answer can put the negative word after the verb.",
  "u34a-1": "These time expressions often go with completed past actions. Learn the irregular past forms as whole words.",
  "u34b-1": "For many regular “I” past forms, a written accent marks the last syllable. Keep it when you type.",
  "u34c-1": "These common past forms do not follow the regular pattern. Learn the whole word with its meaning.",
  "u34d-1": "Put the time phrase before or after the action. A place can follow the movement verb.",
  "u34e-1": "Keep the accent on these regular past endings. Learn the irregular sleep form as a whole word.",
  "u35a-1": "Use these expressions to organise the order of events. They can introduce a short past-tense sentence.",
  "u35b-1": "These past forms often describe background or repeated actions. Context decides how English translates them.",
  "u35c-1": "Use a background form to describe a situation, then a completed action to move the story forward.",
  "u35d-1": "A past question can ask for an event, a place or an opinion. Listen for the time and person in the verb.",
  "u35e-1": "Past questions have their own you forms. Compare the completed event with a background or earlier habit.",
  "u13a-1": "Use a polite request at reception. Say the noun clearly, then add the details.",
  "u13b-1": "Ask which services are included. Learn the complete question as a useful phrase.",
  "u13c-1": "Report the specific problem. A short statement plus a polite request usually does the job.",
  "u13d-1": "Ask about a time or a service before making your plan. These questions use the polite form.",
  "u10a-1": "Keep the article with each travel noun. These are useful words at an airport or hotel.",
  "u10b-1": "These words identify key places and stages of a journey.",
  "u10c-1": "A specific location uses the location verb. Ask the question slowly if the place name is unfamiliar.",
  "u10d-1": "Name the destination and date, then check the details. Use the travel noun to make the question precise.",
  "u36a-1": "Learn body nouns with their articles. They help you describe a problem clearly.",
  "u36b-1": "Use the singular form for one painful body part, and the plural for more than one.",
  "u36c-1": "In an urgent situation, state the need directly. Learn these as complete phrases.",
  "u36d-1": "Explain the symptom and ask for help. Do not guess medicine names or doses from a language exercise.",
  "u36e-1": "Listen for the you form of a symptom question. Answer with a complete phrase about yourself.",
  "u37a-1": "Use these short openings to express a view. You can add a complete sentence after them.",
  "u37b-1": "These responses help you join a conversation without changing the subject.",
  "u37c-1": "Say what you prefer, then give a reason using a sentence you already know how to build.",
  "u37d-1": "Ask a clear question, then listen to the reason. A follow-up question keeps the exchange going.",
  "u38a-1": "A short reaction shows that you are following the conversation. Match your tone to the meaning.",
  "u38b-1": "These short questions invite the other person to add detail.",
  "u38c-1": "These expressions give you time to think or help you explain what you mean.",
  "u38d-1": "Close a conversation politely and leave a natural opening to speak again.",
  "u39a-1": "Use these nouns when exchanging contact details or asking for internet access.",
  "u39b-1": "These phrases make a request clear. Ask politely if you need someone to repeat or write information.",
  "u39c-1": "These fixed phrases introduce a softer request. You can learn the whole phrase before studying its verb pattern.",
  "u39d-1": "Explain what has happened, then say what you need. Keep the phrases short and clear.",
  "u11a-1": "Learn each animal with its article. Some animal nouns have different male and female forms.",
  "u11b-1": "These nouns name common animals. Their grammatical gender belongs to the noun form shown.",
  "u11c-1": "Picture each animal as you say its name. Keep the written accents on the stressed syllables.",
  "u11d-1": "Combine an animal noun with a verb or describing word that you already know.",
  "u12a-1": "These food names are useful in Mexico. Some do not have a single-word English equivalent.",
  "u12b-1": "These words identify cultural places or events. Learn the meaning without assuming everyone celebrates in the same way.",
  "u12c-1": "These are common informal words in Mexico. Listen to the situation before using a casual expression.",
  "u12d-1": "Use the language you have learned to talk about food, places and your reasons for learning."
});
Object.assign(SPEAK_TIPS,{
  "u22": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u23": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u24": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u25": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u2": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u5": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u26": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u3": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u15": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u4": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u14": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u7": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u16": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u28": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u6": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u30": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u29": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u9": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u31": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u8": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u32": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u33": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u18": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u41": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u34": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u35": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u13": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u10": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u36": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u37": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u38": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u39": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u11": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear.",
  "u12": "Say each phrase aloud, then change one familiar word to make it about your life. Keep Spanish vowels short and clear."
});
Object.assign(PATTERNS,{
  "u22": {
    "name": "Identity and location",
    "rows": [
      [
        [
          "Yo",
          "who"
        ],
        [
          "soy",
          "identity"
        ]
      ]
    ],
    "note": "Compare the two meanings of “to be”. Neither simply means permanent versus temporary."
  },
  "u23": {
    "name": "Who does it",
    "rows": [
      [
        [
          "Yo",
          "who"
        ],
        [
          "trabajo",
          "does"
        ],
        [
          "aquí",
          "where"
        ]
      ],
      [
        [
          "Tú",
          "who"
        ],
        [
          "trabajas",
          "does"
        ],
        [
          "aquí",
          "where"
        ]
      ]
    ],
    "note": "The verb ending changes with the subject."
  },
  "u24": {
    "name": "A question word first",
    "rows": [
      [
        [
          "¿Quién",
          "ask"
        ],
        [
          "es?",
          "is"
        ]
      ],
      [
        [
          "¿Dónde",
          "ask"
        ],
        [
          "estás?",
          "are"
        ]
      ]
    ],
    "note": "Choose the question word for the information you need."
  },
  "u25": {
    "name": "Where you are from",
    "rows": [
      [
        [
          "Soy",
          "am"
        ],
        [
          "de",
          "from"
        ],
        [
          "México",
          "where"
        ]
      ]
    ],
    "note": "Use the origin word before the country name."
  },
  "u26": {
    "name": "An action involving yourself",
    "rows": [
      [
        [
          "Me",
          "myself"
        ],
        [
          "levanto",
          "does"
        ]
      ],
      [
        [
          "Me",
          "myself"
        ],
        [
          "visto",
          "does"
        ]
      ]
    ],
    "note": "Keep the little word for yourself before the conjugated verb."
  },
  "u15": {
    "name": "A table for two",
    "rows": [
      [
        [
          "Una mesa",
          "what"
        ],
        [
          "para",
          "for"
        ],
        [
          "dos",
          "how many"
        ]
      ]
    ],
    "note": "Name the thing, then add who or what it is for."
  },
  "u14": {
    "name": "Which direction",
    "rows": [
      [
        [
          "a la",
          "to the"
        ],
        [
          "derecha",
          "where"
        ]
      ],
      [
        [
          "a la",
          "to the"
        ],
        [
          "izquierda",
          "where"
        ]
      ]
    ],
    "note": "Learn each direction as a short group."
  },
  "u16": {
    "name": "Ask the price",
    "rows": [
      [
        [
          "¿Cuánto",
          "ask"
        ],
        [
          "cuesta?",
          "does"
        ]
      ]
    ],
    "note": "Ask the price of the thing you are pointing to."
  },
  "u9": {
    "name": "How you feel now",
    "rows": [
      [
        [
          "Estoy",
          "am"
        ],
        [
          "contento",
          "feeling"
        ]
      ],
      [
        [
          "Estoy",
          "am"
        ],
        [
          "triste",
          "feeling"
        ]
      ]
    ],
    "note": "Many descriptions of your current state use estar."
  },
  "u32": {
    "name": "Can plus an activity",
    "rows": [
      [
        [
          "Puedo",
          "can"
        ],
        [
          "hablar",
          "doing"
        ],
        [
          "español",
          "what"
        ]
      ],
      [
        [
          "No puedo",
          "cannot"
        ],
        [
          "ir",
          "doing"
        ]
      ]
    ],
    "note": "The second verb stays in its dictionary form."
  },
  "u33": {
    "name": "A plan",
    "rows": [
      [
        [
          "Voy",
          "go"
        ],
        [
          "a",
          "link"
        ],
        [
          "estudiar",
          "doing"
        ]
      ],
      [
        [
          "Vamos",
          "go"
        ],
        [
          "a",
          "link"
        ],
        [
          "comer",
          "doing"
        ]
      ]
    ],
    "note": "Keep the linking a in a plan."
  },
  "u41": {
    "name": "Join two ideas",
    "rows": [
      [
        [
          "Trabajo",
          "does"
        ],
        [
          "y",
          "join"
        ],
        [
          "estudio",
          "does"
        ]
      ],
      [
        [
          "Quiero ir",
          "want"
        ],
        [
          "pero",
          "join"
        ],
        [
          "no puedo",
          "cannot"
        ]
      ]
    ],
    "note": "Use a connector to show how the two ideas fit together."
  },
  "u34": {
    "name": "A completed past event",
    "rows": [
      [
        [
          "Ayer",
          "when"
        ],
        [
          "fui",
          "went"
        ],
        [
          "al parque",
          "where"
        ]
      ]
    ],
    "note": "A past time and a completed action make a short story."
  },
  "u35": {
    "name": "Put events in order",
    "rows": [
      [
        [
          "Primero",
          "when"
        ],
        [
          "comí",
          "did"
        ]
      ],
      [
        [
          "Luego",
          "when"
        ],
        [
          "salí",
          "did"
        ]
      ]
    ],
    "note": "Time words organise the order of events."
  },
  "u13": {
    "name": "Check in",
    "rows": [
      [
        [
          "Tengo",
          "have"
        ],
        [
          "una reservación",
          "what"
        ]
      ]
    ],
    "note": "Say what you have, then ask for the details you need."
  },
  "u37": {
    "name": "Give your view",
    "rows": [
      [
        [
          "Creo que",
          "think"
        ],
        [
          "es importante",
          "view"
        ]
      ]
    ],
    "note": "Add a complete statement after the opening phrase."
  }
});
DRILLS.push(...[
  {
    "u": "u22",
    "en": "We are here.",
    "frame": "___ aquí.",
    "ans": "Estamos",
    "opts": [
      "Somos",
      "Estoy"
    ],
    "why": "Use the location form for where we are."
  },
  {
    "u": "u23",
    "en": "We speak Spanish.",
    "frame": "___ español.",
    "ans": "Hablamos",
    "opts": [
      "Hablas",
      "Como"
    ],
    "why": "The ending -mos shows “we”."
  },
  {
    "u": "u24",
    "en": "Where is the book?",
    "frame": "¿___ está el libro?",
    "ans": "Dónde",
    "opts": [
      "Quién",
      "Cuándo"
    ],
    "why": "Ask about a location with the word for where."
  },
  {
    "u": "u25",
    "en": "I have a telephone.",
    "frame": "___ un teléfono.",
    "ans": "Tengo",
    "opts": [
      "Quiero",
      "Soy"
    ],
    "why": "Use the verb for having, rather than identity."
  },
  {
    "u": "u2",
    "en": "I am twenty years old.",
    "frame": "Tengo ___ años.",
    "ans": "veinte",
    "opts": [
      "treinta",
      "cinco"
    ],
    "why": "Age uses the verb for having, followed by a number and years."
  },
  {
    "u": "u5",
    "en": "It is two o’clock.",
    "frame": "___ las dos.",
    "ans": "Son",
    "opts": [
      "Es",
      "Soy"
    ],
    "why": "The time uses a plural form except at one o’clock."
  },
  {
    "u": "u26",
    "en": "I get up early.",
    "frame": "Me levanto ___.",
    "ans": "temprano",
    "opts": [
      "tarde",
      "después"
    ],
    "why": "Choose the time word meaning early."
  },
  {
    "u": "u3",
    "en": "I do not eat meat.",
    "frame": "No ___ carne.",
    "ans": "como",
    "opts": [
      "bebo",
      "comes"
    ],
    "why": "Use the I form of the verb for eating."
  },
  {
    "u": "u15",
    "en": "A coffee with milk.",
    "frame": "Un café ___ leche.",
    "ans": "con",
    "opts": [
      "sin",
      "para"
    ],
    "why": "Choose the word for with."
  },
  {
    "u": "u4",
    "en": "We go to the shop.",
    "frame": "Vamos ___ la tienda.",
    "ans": "a",
    "opts": [
      "en",
      "de"
    ],
    "why": "A destination after this movement verb uses a."
  },
  {
    "u": "u14",
    "en": "Turn right (polite).",
    "frame": "Gire a la ___.",
    "ans": "derecha",
    "opts": [
      "izquierda",
      "esquina"
    ],
    "why": "Choose the direction requested."
  },
  {
    "u": "u7",
    "en": "I am going by taxi.",
    "frame": "Voy ___ taxi.",
    "ans": "en",
    "opts": [
      "a",
      "de"
    ],
    "why": "Use en with this means of transport."
  },
  {
    "u": "u16",
    "en": "It costs thirty pesos.",
    "frame": "Cuesta ___ pesos.",
    "ans": "treinta",
    "opts": [
      "veinte",
      "cien"
    ],
    "why": "Match the number in the price."
  },
  {
    "u": "u28",
    "en": "A red shirt.",
    "frame": "Una camisa ___.",
    "ans": "roja",
    "opts": [
      "rojo",
      "azul"
    ],
    "why": "The describing word matches the feminine clothing noun."
  },
  {
    "u": "u6",
    "en": "My children.",
    "frame": "___ hijos.",
    "ans": "Mis",
    "opts": [
      "Mi",
      "Tu"
    ],
    "why": "Use a plural possessive for a plural noun."
  },
  {
    "u": "u30",
    "en": "There are two chairs.",
    "frame": "___ dos sillas.",
    "ans": "Hay",
    "opts": [
      "Son",
      "Está"
    ],
    "why": "Use the existence word for both one and more than one."
  },
  {
    "u": "u29",
    "en": "My sister is tall.",
    "frame": "Mi hermana es ___.",
    "ans": "alta",
    "opts": [
      "alto",
      "joven"
    ],
    "why": "The describing word matches the person described."
  },
  {
    "u": "u9",
    "en": "I feel cold.",
    "frame": "___ frío.",
    "ans": "Tengo",
    "opts": [
      "Hace",
      "Estoy"
    ],
    "why": "Personal sensations use tener; weather uses hacer."
  },
  {
    "u": "u31",
    "en": "I finish at five.",
    "frame": "Termino a las ___.",
    "ans": "cinco",
    "opts": [
      "seis",
      "ocho"
    ],
    "why": "Choose the correct hour."
  },
  {
    "u": "u8",
    "en": "I like books.",
    "frame": "Me ___ los libros.",
    "ans": "gustan",
    "opts": [
      "gusta",
      "gusto"
    ],
    "why": "The verb agrees with the plural thing liked."
  },
  {
    "u": "u32",
    "en": "I have to work.",
    "frame": "Tengo ___ trabajar.",
    "ans": "que",
    "opts": [
      "a",
      "de"
    ],
    "why": "The obligation construction needs que."
  },
  {
    "u": "u33",
    "en": "I am going to study.",
    "frame": "Voy ___ estudiar.",
    "ans": "a",
    "opts": [
      "que",
      "en"
    ],
    "why": "Keep a between the movement verb and the activity for a plan."
  },
  {
    "u": "u18",
    "en": "My birthday is in May.",
    "frame": "Mi cumpleaños es en ___.",
    "ans": "mayo",
    "opts": [
      "junio",
      "marzo"
    ],
    "why": "Choose the right month."
  },
  {
    "u": "u41",
    "en": "I am not going because I am tired.",
    "frame": "No voy ___ estoy cansado.",
    "ans": "porque",
    "opts": [
      "pero",
      "o"
    ],
    "why": "Use the connector that gives a reason."
  },
  {
    "u": "u34",
    "en": "Yesterday I went to the market.",
    "frame": "Ayer ___ al mercado.",
    "ans": "fui",
    "opts": [
      "voy",
      "iba"
    ],
    "why": "Use the completed past form for this finished trip."
  },
  {
    "u": "u35",
    "en": "I used to live in Mexico.",
    "frame": "___ en México.",
    "ans": "Vivía",
    "opts": [
      "Vivo",
      "Viví"
    ],
    "why": "Use the background past form for a former ongoing situation."
  },
  {
    "u": "u13",
    "en": "I have a reservation.",
    "frame": "Tengo una ___.",
    "ans": "reservación",
    "opts": [
      "habitación",
      "noche"
    ],
    "why": "Choose the booking rather than the room or duration."
  },
  {
    "u": "u10",
    "en": "Here is my passport.",
    "frame": "Aquí está mi ___.",
    "ans": "pasaporte",
    "opts": [
      "maleta",
      "boleto"
    ],
    "why": "Choose the document requested."
  },
  {
    "u": "u36",
    "en": "My feet hurt.",
    "frame": "Me ___ los pies.",
    "ans": "duelen",
    "opts": [
      "duele",
      "duele la"
    ],
    "why": "The pain verb agrees with the plural body part."
  },
  {
    "u": "u37",
    "en": "I agree.",
    "frame": "Estoy de ___.",
    "ans": "acuerdo",
    "opts": [
      "verdad",
      "razón"
    ],
    "why": "Use the fixed expression for agreement."
  },
  {
    "u": "u38",
    "en": "With whom?",
    "frame": "¿Con ___?",
    "ans": "quién",
    "opts": [
      "dónde",
      "cuándo"
    ],
    "why": "Ask for a person rather than a place or time."
  },
  {
    "u": "u39",
    "en": "What is the password?",
    "frame": "¿Cuál es la ___?",
    "ans": "contraseña",
    "opts": [
      "mensaje",
      "correo"
    ],
    "why": "Choose the access word, rather than a message or email."
  },
  {
    "u": "u11",
    "en": "My cat sleeps.",
    "frame": "Mi gato ___.",
    "ans": "duerme",
    "opts": [
      "canta",
      "como"
    ],
    "why": "Choose the action in the prompt."
  },
  {
    "u": "u12",
    "en": "The food tastes very good.",
    "frame": "La comida está muy ___.",
    "ans": "rica",
    "opts": [
      "rico",
      "picante"
    ],
    "why": "The taste word agrees with the feminine noun."
  }
]);
const GRAMMAR=[
  {
    "id": "es-be",
    "u": "u22",
    "name": "Two ways to be",
    "ans": [
      "soy",
      "eres",
      "es",
      "somos",
      "son",
      "estoy",
      "estás",
      "está",
      "estamos",
      "están"
    ],
    "rows": [
      [
        "soy / estoy",
        "I am: identity / state or location"
      ],
      [
        "eres / estás",
        "you are: identity / state or location"
      ],
      [
        "es / está",
        "he, she, it or polite you is"
      ],
      [
        "somos / estamos",
        "we are"
      ],
      [
        "son / están",
        "they or you all are"
      ]
    ],
    "note": "Choose the verb by meaning, then choose its form for the subject. Events use ser for their location; do not treat every location as an estar rule."
  },
  {
    "id": "es-present",
    "u": "u23",
    "name": "Regular present endings",
    "ans": [
      "hablamos",
      "hablas",
      "comemos",
      "comes"
    ],
    "rows": [
      [
        "hablar → hablo, hablas, hablamos",
        "speak: I, you, we"
      ],
      [
        "comer → como, comes, comemos",
        "eat: I, you, we"
      ],
      [
        "vivir → vivo, vives, vivimos",
        "live: I, you, we"
      ]
    ],
    "note": "The subject word can often be omitted because the ending identifies it."
  },
  {
    "id": "es-time",
    "u": "u5",
    "name": "The time",
    "ans": [
      "son",
      "es"
    ],
    "rows": [
      [
        "Es la una",
        "It is one o’clock"
      ],
      [
        "Son las dos",
        "It is two o’clock"
      ],
      [
        "a las ocho",
        "at eight o’clock"
      ]
    ],
    "note": "Use singular at one o’clock and plural for the other hours."
  },
  {
    "id": "es-agreement",
    "u": "u29",
    "name": "Descriptions agree",
    "ans": [
      "alto",
      "alta",
      "roja"
    ],
    "rows": [
      [
        "Mi hermano es alto",
        "My brother is tall"
      ],
      [
        "Mi hermana es alta",
        "My sister is tall"
      ],
      [
        "Los libros son nuevos",
        "The books are new"
      ]
    ],
    "note": "Match grammatical gender and number. Not every describing word has a different feminine ending."
  },
  {
    "id": "es-hay",
    "u": "u30",
    "name": "Existence and location",
    "ans": [
      "hay"
    ],
    "rows": [
      [
        "Hay una mesa",
        "There is a table"
      ],
      [
        "Hay dos sillas",
        "There are two chairs"
      ],
      [
        "La llave está aquí",
        "The key is here"
      ]
    ],
    "note": "Hay introduces existence; estar locates a particular thing."
  },
  {
    "id": "es-like",
    "u": "u8",
    "name": "Saying what you like",
    "ans": [
      "gusta",
      "gustan"
    ],
    "rows": [
      [
        "Me gusta leer",
        "I like reading"
      ],
      [
        "Me gusta la música",
        "I like music"
      ],
      [
        "Me gustan los libros",
        "I like books"
      ]
    ],
    "note": "The verb agrees with the thing liked: singular for an activity or one thing, plural for more than one."
  },
  {
    "id": "es-need",
    "u": "u32",
    "name": "Two verbs together",
    "ans": [
      "que"
    ],
    "rows": [
      [
        "Puedo hablar español",
        "I can speak Spanish"
      ],
      [
        "Tengo que trabajar",
        "I have to work"
      ],
      [
        "Quiero aprender",
        "I want to learn"
      ]
    ],
    "note": "The second verb stays in the dictionary form. The obligation expression needs its linking word."
  },
  {
    "id": "es-plans",
    "u": "u33",
    "name": "Going to do something",
    "frame": [
      "voy",
      "vamos"
    ],
    "rows": [
      [
        "Voy a estudiar",
        "I am going to study"
      ],
      [
        "Vamos a comer",
        "We are going to eat"
      ],
      [
        "Van a venir",
        "They are going to come"
      ]
    ],
    "note": "Use a form of ir, then a, then the dictionary form of the activity."
  },
  {
    "id": "es-past",
    "u": "u34",
    "name": "Completed past actions",
    "ans": [
      "fui",
      "comí",
      "compré"
    ],
    "rows": [
      [
        "hablé / comí / viví",
        "I spoke / ate / lived"
      ],
      [
        "fui / hice / tuve",
        "I went or was / did / had"
      ],
      [
        "Ayer fui al mercado",
        "Yesterday I went to the market"
      ]
    ],
    "note": "Learn irregular forms as whole words. A written accent on regular past endings affects the stress."
  },
  {
    "id": "es-background",
    "u": "u35",
    "name": "Past events and background",
    "ans": [
      "vivía",
      "iba"
    ],
    "rows": [
      [
        "Vivía en México",
        "I used to live in Mexico"
      ],
      [
        "Estaba en casa",
        "I was at home: background"
      ],
      [
        "Primero comí, luego salí",
        "First I ate, then I went out"
      ]
    ],
    "note": "The imperfect describes background or habits; the preterite presents completed events. Context determines the choice."
  },
  {
    "id": "es-pain",
    "u": "u36",
    "name": "What hurts",
    "ans": [
      "duele",
      "duelen"
    ],
    "rows": [
      [
        "Me duele la cabeza",
        "My head hurts"
      ],
      [
        "Me duelen los pies",
        "My feet hurt"
      ]
    ],
    "note": "The pain verb agrees with the painful body part, rather than with the person experiencing it."
  }
];
function grammarFor(d){return GRAMMAR.find(g=>g.u===d.u&&((g.ans||[]).includes(norm(d.ans))||(g.frame||[]).some(w=>norm(d.frame).split(' ').includes(w))));}
const MAKE=[
  [
    "Soy estudiante y trabajo aquí.",
    "I am a student and I work here."
  ],
  [
    "¿Vives aquí?",
    "Do you live here?"
  ],
  [
    "No comemos aquí.",
    "We do not eat here."
  ],
  [
    "¿Dónde está mi libro?",
    "Where is my book?"
  ],
  [
    "Tengo treinta años.",
    "I am thirty years old."
  ],
  [
    "Son las cinco y media.",
    "It is half past five."
  ],
  [
    "Me levanto a las seis.",
    "I get up at six."
  ],
  [
    "Desayuno temprano todos los días.",
    "I eat breakfast early every day."
  ],
  [
    "Quiero sopa y pan, por favor.",
    "I want soup and bread, please."
  ],
  [
    "Un té sin azúcar, por favor.",
    "A tea without sugar, please."
  ],
  [
    "No quiero leche.",
    "I do not want milk."
  ],
  [
    "¿La sopa está picante?",
    "Is the soup spicy?"
  ],
  [
    "La farmacia está al lado del banco.",
    "The pharmacy is next to the bank."
  ],
  [
    "Voy al museo a pie.",
    "I am going to the museum on foot."
  ],
  [
    "¿Cuánto cuesta una camisa?",
    "How much does a shirt cost?"
  ],
  [
    "Quiero una playera verde.",
    "I want a green T-shirt."
  ],
  [
    "Mi hermana trabaja aquí.",
    "My sister works here."
  ],
  [
    "Mi casa está cerca del parque.",
    "My house is near the park."
  ],
  [
    "Hay una silla en la cocina.",
    "There is a chair in the kitchen."
  ],
  [
    "Mi padre es muy amable.",
    "My father is very kind."
  ],
  [
    "Me gustan las películas.",
    "I like films."
  ],
  [
    "No puedo salir esta noche.",
    "I cannot go out tonight."
  ],
  [
    "Tengo que trabajar el sábado.",
    "I have to work on Saturday."
  ],
  [
    "Vamos a viajar en verano.",
    "We are going to travel in summer."
  ],
  [
    "Quiero ir al cine pero tengo que estudiar.",
    "I want to go to the cinema but I have to study."
  ],
  [
    "Ayer comí arroz y pollo.",
    "Yesterday I ate rice and chicken."
  ],
  [
    "Primero trabajé, luego descansé.",
    "First I worked, then I rested."
  ],
  [
    "Cuando era niño, vivía aquí.",
    "When I was a child, I used to live here."
  ],
  [
    "Necesito una habitación por tres noches.",
    "I need a room for three nights."
  ],
  [
    "¿Dónde está la puerta de embarque?",
    "Where is the boarding gate?"
  ],
  [
    "Me duele la mano.",
    "My hand hurts."
  ],
  [
    "Creo que la comida está muy rica.",
    "I think the food tastes very good."
  ],
  [
    "¿Me puede escribir la contraseña?",
    "Can you write the password for me?"
  ],
  [
    "No encuentro mi boleto.",
    "I cannot find my ticket."
  ],
  [
    "Mi perro es muy grande.",
    "My dog is very big."
  ],
  [
    "Quiero conocer el mercado.",
    "I want to get to know the market."
  ]
];
// END SPANISH PRACTICE
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
// Tomás is the shared default learner; a learner's chosen avatar takes precedence.
const LEARNER_PICTURE='art-v2/portrait-learner';
// Approved chat faces (docs/art-direction/es-portrait-records).
const CAST_PICTURES={'Mariana':'art-v2/portrait-mariana','Diego':'art-v2/portrait-diego'};
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
// BEGIN SPANISH CONVERSATIONS
CONVS.push(...[
  {
    "id": "cv2",
    "title": "¿Dónde vives?",
    "scene": "Mariana meets you at the café again. This time you can say more about yourself.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "Hola. ¿Cómo estás?",
        "Hello. How are you?"
      ],
      [
        "m",
        "Muy bien. ¿Y tú?",
        "Very well. And you?",
        "Answer, then ask her back",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Muy bien. ¿De dónde eres?",
        "Very well. Where are you from?"
      ],
      [
        "m",
        "Soy de Estados Unidos.",
        "I am from the United States.",
        "Say where you are from",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Dónde vives?",
        "Where do you live?"
      ],
      [
        "m",
        "Vivo en México.",
        "I live in Mexico.",
        "Say you live in Mexico",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Eres estudiante?",
        "Are you a student?"
      ],
      [
        "c",
        [
          [
            "Sí. Soy estudiante.",
            "Yes. I am a student.",
            "Say you are a student",
            [
              [
                "p",
                "¿Hablas inglés?",
                "Do you speak English?"
              ]
            ]
          ],
          [
            "No. Soy maestro.",
            "No. I am a teacher.",
            "Say you are a teacher",
            [
              [
                "p",
                "¿Hablas inglés?",
                "Do you speak English?"
              ]
            ]
          ]
        ]
      ],
      [
        "m",
        "Hablo un poco de español.",
        "I speak a little Spanish.",
        "Say you speak a little Spanish",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Por qué aprendes español?",
        "Why do you learn Spanish?"
      ],
      [
        "m",
        "Trabajo en México.",
        "I work in Mexico.",
        "Say you work in Mexico",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Tienes un teléfono?",
        "Do you have a telephone?"
      ],
      [
        "m",
        "Sí. Tengo un teléfono.",
        "Yes. I have a telephone.",
        "Say that you do",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Nos vemos.",
        "See you."
      ],
      [
        "m",
        "Hasta luego.",
        "See you later.",
        "Say goodbye",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv3",
    "title": "Mi mañana",
    "scene": "Diego asks about your daily routine over an afternoon coffee.",
    "cast": [
      {
        "name": "Diego",
        "voice": "leonas"
      }
    ],
    "lines": [
      [
        "p",
        "Buenos días. ¿Cómo estás?",
        "Good morning. How are you?"
      ],
      [
        "m",
        "Bien, gracias. ¿Y tú?",
        "Fine, thanks. And you?",
        "Answer and ask back",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Muy bien. ¿Qué hora es?",
        "Very well. What time is it?"
      ],
      [
        "m",
        "Son las dos.",
        "It is two o’clock.",
        "Say it is two",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Cuándo trabajas?",
        "When do you work?"
      ],
      [
        "m",
        "Trabajo por la mañana.",
        "I work in the morning.",
        "Say when you work",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Te levantas temprano?",
        "Do you get up early?"
      ],
      [
        "m",
        "Me levanto temprano.",
        "I get up early.",
        "Say that you get up early",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿A qué hora?",
        "At what time?"
      ],
      [
        "m",
        "A las ocho.",
        "At eight o’clock.",
        "Say at eight",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Desayuno a las ocho.",
        "I eat breakfast at eight."
      ],
      [
        "m",
        "Yo también.",
        "Me too.",
        "Say you do too",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Después descanso.",
        "Afterwards I rest."
      ],
      [
        "m",
        "Voy al trabajo.",
        "I go to work.",
        "Say you go to work",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Está bien. Nos vemos.",
        "OK. See you."
      ],
      [
        "m",
        "Nos vemos.",
        "See you.",
        "Say see you",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv4",
    "title": "Una mesa para dos",
    "scene": "Mariana is helping out at a small restaurant. Practise ordering and paying.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "Buenas tardes.",
        "Good afternoon."
      ],
      [
        "m",
        "Una mesa para dos, por favor.",
        "A table for two, please.",
        "Ask for a table for two",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Aquí, por favor.",
        "Here, please."
      ],
      [
        "m",
        "El menú, por favor.",
        "The menu, please.",
        "Ask for the menu",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Aquí está el menú.",
        "Here is the menu."
      ],
      [
        "m",
        "¿Qué recomienda?",
        "What do you recommend?",
        "Ask for a recommendation",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "El pollo está rico.",
        "The chicken tastes good."
      ],
      [
        "c",
        [
          [
            "Quiero pollo, por favor.",
            "I want chicken, please.",
            "Order chicken",
            [
              [
                "p",
                "Está bien.",
                "OK."
              ]
            ]
          ],
          [
            "No como carne. Quiero sopa.",
            "I do not eat meat. I want soup.",
            "Choose soup without meat",
            [
              [
                "p",
                "Está bien.",
                "OK."
              ]
            ]
          ]
        ]
      ],
      [
        "m",
        "Agua sin gas, por favor.",
        "Still water, please.",
        "Ask for still water",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí. ¿Un café?",
        "Yes. A coffee?"
      ],
      [
        "m",
        "Un café con leche, por favor.",
        "A coffee with milk, please.",
        "Ask for coffee with milk",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Está bien.",
        "OK."
      ],
      [
        "m",
        "La cuenta, por favor.",
        "The bill, please.",
        "Ask for the bill",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí.",
        "Yes."
      ],
      [
        "m",
        "¿Puedo pagar con tarjeta?",
        "Can I pay by card?",
        "Ask to pay by card",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí. Gracias.",
        "Yes. Thank you."
      ],
      [
        "m",
        "Gracias. Hasta luego.",
        "Thank you. See you later.",
        "Thank the server and leave",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv5",
    "title": "Al museo",
    "scene": "You ask Diego how to get to the museum, then check which way to go.",
    "cast": [
      {
        "name": "Diego",
        "voice": "leonas"
      }
    ],
    "lines": [
      [
        "p",
        "Buenos días.",
        "Good morning."
      ],
      [
        "m",
        "Perdón. ¿Me puede ayudar?",
        "Excuse me. Can you help me?",
        "Ask politely for help",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí.",
        "Yes."
      ],
      [
        "m",
        "¿Dónde está el museo?",
        "Where is the museum?",
        "Ask where the museum is",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Está cerca. Siga derecho.",
        "It is nearby. Go straight ahead."
      ],
      [
        "m",
        "¿Cuántas cuadras?",
        "How many blocks?",
        "Ask how many blocks",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Dos cuadras. Gire a la derecha.",
        "Two blocks. Turn right."
      ],
      [
        "m",
        "¿A la derecha?",
        "To the right?",
        "Check the direction",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí, en la esquina.",
        "Yes, on the corner."
      ],
      [
        "m",
        "Ya veo. Gracias.",
        "I see now. Thank you.",
        "Say you understand and thank him",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Vas al parque?",
        "Are you going to the park?"
      ],
      [
        "c",
        [
          [
            "Voy al parque.",
            "I am going to the park.",
            "Say you are going to the park",
            [
              [
                "p",
                "Está cerca.",
                "It is nearby."
              ]
            ]
          ],
          [
            "No. Voy al museo.",
            "No. I am going to the museum.",
            "Say you are going to the museum",
            [
              [
                "p",
                "Está bien.",
                "OK."
              ]
            ]
          ]
        ]
      ],
      [
        "m",
        "Hasta luego.",
        "See you later.",
        "Say goodbye",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Nos vemos.",
        "See you."
      ]
    ]
  },
  {
    "id": "cv6",
    "title": "Un boleto",
    "scene": "Mariana helps you work out the journey to the airport.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "Hola. ¿Dónde estás?",
        "Hello. Where are you?"
      ],
      [
        "m",
        "Estoy en la estación.",
        "I am at the station.",
        "Say you are at the station",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Quieres ir al aeropuerto?",
        "Do you want to go to the airport?"
      ],
      [
        "m",
        "Sí. Quiero ir al aeropuerto.",
        "Yes. I want to go to the airport.",
        "Say yes and name your destination",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Vas en taxi?",
        "Are you going by taxi?"
      ],
      [
        "m",
        "No. Voy en camión.",
        "No. I am going by bus.",
        "Say you are going by bus",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Está bien.",
        "OK."
      ],
      [
        "m",
        "Un boleto, por favor.",
        "One ticket, please.",
        "Ask for one ticket",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Cuesta treinta pesos.",
        "It costs thirty pesos."
      ],
      [
        "m",
        "¿Acepta tarjeta?",
        "Do you accept cards?",
        "Ask if cards are accepted",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí.",
        "Yes."
      ],
      [
        "m",
        "¿A qué hora sale?",
        "What time does it leave?",
        "Ask the departure time",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "A las ocho.",
        "At eight o’clock."
      ],
      [
        "m",
        "Gracias.",
        "Thank you.",
        "Say thank you",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "No entiendo",
            "I do not understand"
          ]
        ]
      ],
      [
        "p",
        "Buena suerte.",
        "Good luck."
      ],
      [
        "m",
        "Hasta luego.",
        "See you later.",
        "Say goodbye",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv7",
    "title": "Una chamarra azul",
    "scene": "You are choosing a jacket in a shop. Ask about size and price.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "Buenas tardes.",
        "Good afternoon."
      ],
      [
        "m",
        "Quiero una chamarra azul.",
        "I want a blue jacket.",
        "Ask for a blue jacket",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Esta?",
        "This one?"
      ],
      [
        "m",
        "Sí. ¿Cuánto cuesta?",
        "Yes. How much does it cost?",
        "Ask the price",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Cien pesos.",
        "One hundred pesos."
      ],
      [
        "m",
        "¿Me la puedo probar?",
        "Can I try it on?",
        "Ask to try on the jacket",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí.",
        "Yes."
      ],
      [
        "m",
        "Es muy grande.",
        "It is very big.",
        "Say it is very big",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Quieres una talla más pequeña?",
        "Do you want a smaller size?"
      ],
      [
        "m",
        "Sí, por favor.",
        "Yes, please.",
        "Ask for the smaller size",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Te queda bien?",
        "Does it fit you well?"
      ],
      [
        "m",
        "Me queda bien.",
        "It fits me well.",
        "Say it fits well",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Quieres una bolsa?",
        "Do you want a bag?"
      ],
      [
        "c",
        [
          [
            "Sí, por favor.",
            "Yes, please.",
            "Ask for a bag",
            [
              [
                "p",
                "Aquí está.",
                "Here it is."
              ]
            ]
          ],
          [
            "No necesito bolsa.",
            "I do not need a bag.",
            "Decline the bag",
            [
              [
                "p",
                "Está bien.",
                "OK."
              ]
            ]
          ]
        ]
      ],
      [
        "m",
        "¿Puedo pagar con tarjeta?",
        "Can I pay by card?",
        "Ask to pay by card",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí. Gracias.",
        "Yes. Thank you."
      ]
    ]
  },
  {
    "id": "cv8",
    "title": "Mi familia",
    "scene": "Diego tells you about his family and asks about yours.",
    "cast": [
      {
        "name": "Diego",
        "voice": "leonas"
      }
    ],
    "lines": [
      [
        "p",
        "Hola. ¿Cómo estás?",
        "Hello. How are you?"
      ],
      [
        "m",
        "Estoy contento.",
        "I am happy.",
        "Say you are happy",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Tienes hijos?",
        "Do you have children?"
      ],
      [
        "c",
        [
          [
            "Tengo dos hijos.",
            "I have two children.",
            "Say you have two children",
            [
              [
                "p",
                "Mi familia vive aquí.",
                "My family lives here."
              ]
            ]
          ],
          [
            "No tengo hijos.",
            "I do not have children.",
            "Say you have no children",
            [
              [
                "p",
                "Mi familia vive aquí.",
                "My family lives here."
              ]
            ]
          ]
        ]
      ],
      [
        "m",
        "¿Tienes hermanos?",
        "Do you have siblings?",
        "Ask about siblings",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Tengo una hermana.",
        "I have a sister."
      ],
      [
        "m",
        "Yo también.",
        "Me too.",
        "Say you do too",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Mi hermana es alta.",
        "My sister is tall."
      ],
      [
        "m",
        "¿Dónde vive?",
        "Where does she live?",
        "Ask where she lives",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Vive en México.",
        "She lives in Mexico."
      ],
      [
        "m",
        "¿En qué trabajas?",
        "What do you do for work?",
        "Ask about his work",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Trabajo en una oficina.",
        "I work in an office."
      ],
      [
        "m",
        "¿Cuándo terminas?",
        "When do you finish?",
        "Ask when he finishes",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Termino a las cinco.",
        "I finish at five."
      ],
      [
        "m",
        "Está bien. Nos vemos.",
        "OK. See you.",
        "Close the conversation",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv9",
    "title": "Planes para mañana",
    "scene": "Mariana invites you out tomorrow. Agree on an activity and a time.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "¿Qué vas a hacer mañana?",
        "What are you going to do tomorrow?"
      ],
      [
        "m",
        "Voy a estudiar.",
        "I am going to study.",
        "Say you are going to study",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Quieres comer conmigo?",
        "Do you want to eat with me?"
      ],
      [
        "c",
        [
          [
            "Sí, puedo.",
            "Yes, I can.",
            "Accept the invitation",
            [
              [
                "p",
                "¿A qué hora?",
                "At what time?"
              ]
            ]
          ],
          [
            "No puedo, tengo que trabajar.",
            "I cannot; I have to work.",
            "Decline because of work",
            [
              [
                "p",
                "¿El sábado?",
                "On Saturday?"
              ]
            ]
          ]
        ]
      ],
      [
        "m",
        "A las seis.",
        "At six o’clock.",
        "Suggest six o’clock",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Está bien. ¿Vamos al cine?",
        "OK. Shall we go to the cinema?"
      ],
      [
        "m",
        "Prefiero caminar.",
        "I prefer walking.",
        "Say you prefer walking",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Te gusta viajar?",
        "Do you like travelling?"
      ],
      [
        "m",
        "Sí, me gusta.",
        "Yes, I like it.",
        "Say you like it",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Voy a viajar la próxima semana.",
        "I am going to travel next week."
      ],
      [
        "m",
        "¿Con quién?",
        "With whom?",
        "Ask who with",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Con mi familia.",
        "With my family."
      ],
      [
        "m",
        "Buena suerte.",
        "Good luck.",
        "Wish her good luck",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Gracias. Nos vemos mañana.",
        "Thank you. See you tomorrow."
      ],
      [
        "m",
        "Nos vemos mañana.",
        "See you tomorrow.",
        "Confirm the plan",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv10",
    "title": "¿Qué hiciste ayer?",
    "scene": "After the weekend, Mariana asks you what happened. Practise a short story.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "Hola. ¿Cómo te fue?",
        "Hello. How did it go?"
      ],
      [
        "m",
        "Me fue bien.",
        "It went well for me.",
        "Say it went well",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Qué hiciste ayer?",
        "What did you do yesterday?"
      ],
      [
        "m",
        "Ayer fui al mercado.",
        "Yesterday I went to the market.",
        "Say you went to the market",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Qué compraste?",
        "What did you buy?"
      ],
      [
        "m",
        "Compré una camisa.",
        "I bought a shirt.",
        "Say you bought a shirt",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Y después?",
        "And afterwards?"
      ],
      [
        "m",
        "Comí pollo.",
        "I ate chicken.",
        "Say what you ate",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Y luego?",
        "And then?"
      ],
      [
        "m",
        "Al final regresé a casa.",
        "In the end I returned home.",
        "Say you returned home in the end",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Dónde vivías cuando eras niño?",
        "Where did you live when you were a child?"
      ],
      [
        "m",
        "Vivía en México.",
        "I used to live in Mexico.",
        "Say where you used to live",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Tenías un perro?",
        "Did you have a dog?"
      ],
      [
        "m",
        "Tenía un perro.",
        "I used to have a dog.",
        "Say that you did",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Fue muy bonito.",
        "It was very nice."
      ],
      [
        "m",
        "Sí. Nos vemos.",
        "Yes. See you.",
        "Close the chat",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv11",
    "title": "En la recepción",
    "scene": "You arrive at a hotel and check the room details.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "Buenas tardes.",
        "Good afternoon."
      ],
      [
        "m",
        "Tengo una reservación.",
        "I have a reservation.",
        "Say you have a reservation",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Una habitación para dos?",
        "A room for two?"
      ],
      [
        "m",
        "Sí, por dos noches.",
        "Yes, for two nights.",
        "Confirm two nights",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Aquí está la llave.",
        "Here is the key."
      ],
      [
        "m",
        "¿Dónde está mi habitación?",
        "Where is my room?",
        "Ask where the room is",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Está en el segundo piso.",
        "It is on the second floor."
      ],
      [
        "m",
        "¿Incluye desayuno?",
        "Does it include breakfast?",
        "Ask about breakfast",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí. A las ocho.",
        "Yes. At eight."
      ],
      [
        "m",
        "¿Tiene internet?",
        "Does it have internet?",
        "Ask about internet",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí.",
        "Yes."
      ],
      [
        "m",
        "¿A qué hora es la salida?",
        "What time is checkout?",
        "Ask about checkout",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "A las doce.",
        "At twelve."
      ],
      [
        "m",
        "¿Puedo dejar mi maleta?",
        "Can I leave my suitcase?",
        "Ask to leave your suitcase",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí. Aquí.",
        "Yes. Here."
      ],
      [
        "m",
        "Gracias por todo.",
        "Thank you for everything.",
        "Thank the receptionist",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv12",
    "title": "Necesito ayuda",
    "scene": "You feel ill and ask Mariana to help you find a doctor.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "¿Cómo te sientes?",
        "How do you feel?"
      ],
      [
        "m",
        "Estoy enfermo.",
        "I am ill.",
        "Say you are ill",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Te duele la cabeza?",
        "Does your head hurt?"
      ],
      [
        "m",
        "Me duele la cabeza.",
        "My head hurts.",
        "Say your head hurts",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Tienes fiebre?",
        "Do you have a fever?"
      ],
      [
        "m",
        "Tengo fiebre.",
        "I have a fever.",
        "Say you have a fever",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Necesitas ayuda?",
        "Do you need help?"
      ],
      [
        "m",
        "Sí. Necesito un doctor.",
        "Yes. I need a doctor.",
        "Ask for a doctor",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "El hospital está cerca.",
        "The hospital is nearby."
      ],
      [
        "m",
        "¿Me puede ayudar?",
        "Can you help me?",
        "Ask politely for help",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí. Vamos en taxi.",
        "Yes. We are going by taxi."
      ],
      [
        "m",
        "Necesito hablar con un doctor.",
        "I need to speak with a doctor.",
        "Say you need to speak with a doctor",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Tienes una alergia?",
        "Do you have an allergy?"
      ],
      [
        "m",
        "Soy alérgico a esta medicina.",
        "I am allergic to this medicine.",
        "Explain a medicine allergy",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Está bien.",
        "OK."
      ],
      [
        "m",
        "Gracias por todo.",
        "Thank you for everything.",
        "Thank her for helping",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv13",
    "title": "Una buena plática",
    "scene": "At dinner with Mariana, share preferences, react and make another plan.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "¿Qué prefieres? ¿Café o té?",
        "What do you prefer? Coffee or tea?"
      ],
      [
        "c",
        [
          [
            "Prefiero el té.",
            "I prefer tea.",
            "Choose tea",
            [
              [
                "p",
                "A mí también.",
                "I do too."
              ]
            ]
          ],
          [
            "Quiero un café.",
            "I want a coffee.",
            "Choose coffee",
            [
              [
                "p",
                "Está bien.",
                "OK."
              ]
            ]
          ]
        ]
      ],
      [
        "m",
        "Me encanta la comida mexicana.",
        "I love Mexican food.",
        "Say you love Mexican food",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Estoy de acuerdo.",
        "I agree."
      ],
      [
        "m",
        "¿La salsa está picante?",
        "Is the salsa spicy?",
        "Ask whether the salsa is spicy",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí, está muy picante.",
        "Yes, it is very spicy."
      ],
      [
        "m",
        "La comida está muy rica.",
        "The food tastes very good.",
        "Compliment the food",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Qué vas a hacer mañana?",
        "What are you going to do tomorrow?"
      ],
      [
        "m",
        "Voy a viajar con mi familia.",
        "I am going to travel with my family.",
        "Say you are travelling with family",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¡Qué padre! ¿Dónde?",
        "How cool! Where?"
      ],
      [
        "m",
        "Quiero conocer México.",
        "I want to get to know Mexico.",
        "Say you want to get to know Mexico",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Cuéntame.",
        "Tell me."
      ],
      [
        "m",
        "Me gusta aprender español.",
        "I like learning Spanish.",
        "Say you like learning Spanish",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Me dio mucho gusto verte.",
        "It was lovely to see you."
      ],
      [
        "m",
        "Seguimos en contacto.",
        "Let’s keep in touch.",
        "Suggest keeping in touch",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Cuídate.",
        "Take care."
      ],
      [
        "m",
        "¡Nos vemos pronto!",
        "See you again soon!",
        "Say see you soon",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  },
  {
    "id": "cv14",
    "title": "Nos escribimos",
    "scene": "Exchange contact details and get help with a small problem.",
    "cast": [
      {
        "name": "Mariana",
        "voice": "ona"
      }
    ],
    "lines": [
      [
        "p",
        "¿Cuál es tu número?",
        "What is your number?"
      ],
      [
        "m",
        "¿Me lo puede escribir?",
        "Can you write it for me?",
        "Ask to have it written down",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí. Aquí está.",
        "Yes. Here it is."
      ],
      [
        "m",
        "Te mando un mensaje.",
        "I will send you a message.",
        "Say you will send a message",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Tienes internet?",
        "Do you have internet?"
      ],
      [
        "m",
        "No tengo internet.",
        "I do not have internet.",
        "Say you have no internet",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Quieres la contraseña?",
        "Do you want the password?"
      ],
      [
        "m",
        "Sí, por favor.",
        "Yes, please.",
        "Ask for it",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Aquí está.",
        "Here it is."
      ],
      [
        "m",
        "No funciona.",
        "It does not work.",
        "Say it is not working",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "¿Necesitas ayuda?",
        "Do you need help?"
      ],
      [
        "m",
        "¿Podría ayudarme?",
        "Could you help me?",
        "Ask politely for help",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Sí. Un momento.",
        "Yes. One moment."
      ],
      [
        "m",
        "Necesito cargar mi celular.",
        "I need to charge my phone.",
        "Say you need to charge your phone",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ],
      [
        "p",
        "Está bien.",
        "OK."
      ],
      [
        "m",
        "Gracias. Seguimos en contacto.",
        "Thank you. Let’s keep in touch.",
        "Thank her and close the conversation",
        [
          [
            "Hola",
            "Hello"
          ],
          [
            "Gracias",
            "Thank you"
          ]
        ]
      ]
    ]
  }
]);
// END SPANISH CONVERSATIONS
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
const PERS_ME=[['Encantado','Encantada'],['encantado','encantada'],['contento','contenta'],['cansado','cansada'],['enfermo','enferma'],['nervioso','nerviosa'],['alérgico','alérgica'],['Estoy perdido','Estoy perdida'],['Soy maestro','Soy maestra'],['era niño','era niña']];
const PERS_THEM=[['Bienvenido','Bienvenida'],['eras niño','eras niña']];
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
const PRON={"y":"EE","Y":"EE"};

/* Audio sprite map: voice -> unit -> item id -> [start, duration] seconds (written by tools/make_audio.py es) */
const SMAP={"ona":{"u0":{"u0a-1:0":[0,1.368],"u0a-1:1":[1.718,1.728],"u0a-1:2":[3.796,1.056],"u0a-1:3":[5.202,1.104],"u0a-1:4":[6.656,1.704],"u0b-1:0":[8.71,1.008],"u0b-1:1":[10.068,1.176],"u0b-1:2":[11.594,1.008],"u0b-1:3":[12.952,0.696],"u0b-1:4":[13.998,1.008]},"u1":{"u1a-1:0":[0,0.864],"u1a-1:1":[1.214,1.368],"u1a-1:2":[2.932,1.536],"u1a-1:3":[4.818,1.704],"u1a-1:4":[6.872,1.224],"u1a-2:0":[8.446,1.176],"u1a-2:1":[9.972,1.464],"u1a-2:2":[11.786,1.008],"u1a-2:3":[13.144,1.008],"u1a-2:4":[14.502,1.128],"u1b-1:0":[15.98,1.176],"u1b-1:1":[17.506,0.816],"u1b-1:2":[18.672,0.888],"u1b-1:3":[19.91,1.224],"u1b-1:4":[21.484,1.368],"u1b-2:0":[23.202,1.248],"u1b-2:1":[24.8,1.104],"u1b-2:2":[26.254,1.584],"u1b-2:3":[28.188,1.584],"u1b-2:4":[30.122,1.584],"u1c-1:0":[32.056,0.888],"u1c-1:1":[33.294,0.696],"u1c-1:2":[34.34,0.768],"u1c-1:3":[35.458,0.936],"u1c-1:4":[36.744,1.464],"u1c-2:0":[38.558,1.008],"u1c-2:1":[39.916,1.248],"u1c-2:2":[41.514,1.224],"u1c-2:3":[43.088,1.128],"u1c-2:4":[44.566,1.824],"u1c-3:0":[46.74,1.536],"u1c-3:1":[48.626,1.704]},"u21":{"u21a-1:0":[0,1.776],"u21a-1:1":[2.126,1.296],"u21a-1:2":[3.772,1.296],"u21a-1:3":[5.418,1.344],"u21a-1:4":[7.112,1.416],"u21a-2:0":[8.878,1.296],"u21a-2:1":[10.524,1.296],"u21a-2:2":[12.17,1.128],"u21a-2:3":[13.648,1.368],"u21a-2:4":[15.366,1.296],"u21b-1:0":[17.012,2.304],"u21b-1:1":[19.666,1.656],"u21b-1:2":[21.672,2.376],"u21b-1:3":[24.398,1.536],"u21b-1:4":[26.284,1.488],"u21b-2:0":[28.122,1.056],"u21b-2:1":[29.528,2.184],"u21b-2:2":[32.062,1.656],"u21b-2:3":[34.068,1.608],"u21b-2:4":[36.026,1.176]},"cv1":{"cv1:0":[0,1.824],"cv1:1":[2.174,1.344],"cv1:2":[3.868,1.704],"cv1:3":[5.922,1.248],"cv1:4":[7.52,2.688],"cv1:5":[10.558,1.848],"cv1:6":[12.756,1.704],"cv1:7":[14.81,1.176],"cv1:8":[16.336,1.248],"cv1:9o0":[17.934,1.344],"cv1:9o0-0":[19.628,1.056],"cv1:9o1":[21.034,2.448],"cv1:9o1-0":[23.832,1.416],"cv1:10":[25.598,1.824],"cv1:11":[27.772,1.728],"cv1:13":[29.85,2.304],"cv1:14":[32.504,2.544],"cv1:15":[35.398,1.584],"cv1:16":[37.332,0.984],"cv1:18":[38.666,2.064],"cv1:19":[41.08,1.968],"cv1:20":[43.398,2.808],"cv1:21":[46.556,2.304],"cv1:22":[49.21,2.544],"cv1:23":[52.104,1.224]},"cv16":{"cv16:0":[0,2.568],"cv16:1o0":[2.918,2.088],"cv16:1o0-0":[5.356,1.536],"cv16:1o1":[7.242,2.136],"cv16:1o1-0":[9.728,1.656],"cv16:1o2":[11.734,2.424],"cv16:1o2-0":[14.508,3.144],"cv16:2":[18.002,1.104],"cv16:3":[19.456,3.048],"cv16:4":[22.854,2.544],"cv16:5":[25.748,2.064],"cv16:6":[28.162,5.136],"cv16:7":[33.648,1.536],"cv16:8":[35.534,1.536],"cv16:9":[37.42,1.704],"cv16:10":[39.474,2.016],"cv16:11":[41.84,2.376],"cv16:12":[44.566,2.016],"cv16:13":[46.932,3.624],"cv16:15":[50.906,2.184],"cv16:16":[53.44,1.056],"cv16:17":[54.846,1.704],"cv16:18":[56.9,2.688],"cv16:19":[59.938,2.304],"cv16:20":[62.592,3.144],"cv16:21":[66.086,2.016],"cv16:22":[68.452,1.824],"cv16:23":[70.626,1.224],"cv16:24":[72.2,3.984],"cv16:25":[76.534,2.496]},"me1":{"me1:name":[0,1.128],"me1:learn":[1.478,2.184],"me1:nice":[4.012,1.416],"me1:from-mx":[5.778,1.728],"me1:live-mx":[7.856,1.656],"me1:from-us":[9.862,1.536],"me1:live-us":[11.748,2.016],"me1:from-ca":[14.114,1.536],"me1:live-ca":[16,1.368],"me1:from-gb":[17.718,1.488],"me1:live-gb":[19.556,1.536],"me1:from-sc":[21.442,1.416],"me1:live-sc":[23.208,1.704],"me1:from-ie":[25.262,1.656],"me1:live-ie":[27.268,1.728],"me1:from-au":[29.346,1.824],"me1:live-au":[31.52,1.704],"me1:from-gt":[33.574,1.416],"me1:live-gt":[35.34,1.944],"me1:from-sv":[37.634,1.536],"me1:live-sv":[39.52,1.824],"me1:from-co":[41.694,1.416],"me1:live-co":[43.46,1.536],"me1:from-pr":[45.346,1.536],"me1:live-pr":[47.232,1.824],"me1:from-cu":[49.406,1.488],"me1:live-cu":[51.244,1.704],"me1:from-es":[53.298,1.416],"me1:live-es":[55.064,1.536],"me1:from-de":[56.95,1.656],"me1:live-de":[58.956,1.656],"me1:from-fr":[60.962,1.704],"me1:live-fr":[63.016,1.536],"me1:from-it":[64.902,1.704],"me1:live-it":[66.956,1.536],"me1:from-pl":[68.842,1.416],"me1:live-pl":[70.608,1.944],"me1:from-lt":[72.902,1.416],"me1:live-lt":[74.668,1.824],"me1:from-ua":[76.842,1.536],"me1:live-ua":[78.728,1.824],"me1:from-br":[80.902,1.248],"me1:live-br":[82.5,1.848],"me1:from-in":[84.698,1.488],"me1:live-in":[86.536,1.848],"me1:from-ph":[88.734,1.656],"me1:live-ph":[90.74,1.656],"me1:from-jp":[92.746,1.368],"me1:live-jp":[94.464,1.608],"me1:live-cdmx":[96.422,2.088],"me1:live-gdl":[98.86,1.584],"me1:live-mty":[100.794,1.416],"me1:live-pue":[102.56,1.704],"me1:live-tij":[104.614,1.656],"me1:live-cun":[106.62,1.536],"me1:live-la":[108.506,1.704],"me1:live-hou":[110.56,2.328],"me1:live-chi":[113.238,1.728],"me1:live-sa":[115.316,1.968],"me1:live-phx":[117.634,1.584],"me1:live-ny":[119.568,1.536],"me1:live-ldn":[121.454,1.704],"me1:job-teacher-m":[123.508,1.728],"me1:job-teacher-f":[125.586,1.488],"me1:job-student-m":[127.424,1.704],"me1:job-student-f":[129.478,1.488],"me1:job-doctor-m":[131.316,1.128],"me1:job-doctor-f":[132.794,1.656],"me1:job-nurse-m":[134.8,1.176],"me1:job-nurse-f":[136.326,1.416],"me1:job-engineer-m":[138.092,1.704],"me1:job-engineer-f":[140.146,1.824],"me1:job-programmer-m":[142.32,1.536],"me1:job-programmer-f":[144.206,1.584],"me1:job-driver-m":[146.14,1.416],"me1:job-driver-f":[147.906,1.416],"me1:job-cook-m":[149.672,1.464],"me1:job-cook-f":[151.486,1.488],"me1:job-builder-m":[153.324,1.848],"me1:job-builder-f":[155.522,1.488],"me1:job-seller-m":[157.36,1.536],"me1:job-seller-f":[159.246,1.656],"me1:job-accountant-m":[161.252,1.248],"me1:job-accountant-f":[162.85,1.656],"me1:job-manager-m":[164.856,1.464],"me1:job-manager-f":[166.67,1.536],"me1:job-mechanic-m":[168.556,1.416],"me1:job-mechanic-f":[170.322,1.488],"me1:job-farmer-m":[172.16,1.416],"me1:job-farmer-f":[173.926,1.488],"me1:job-artist-m":[175.764,1.296],"me1:job-artist-f":[177.41,1.608],"me1:job-home-m":[179.368,1.704],"me1:job-home-f":[181.422,1.416],"me1:job-retired-m":[183.188,1.536],"me1:job-retired-f":[185.074,1.344],"me1:job-unemployed-m":[186.768,2.208],"me1:job-unemployed-f":[189.326,1.848],"me1:work-office":[191.524,1.896],"me1:work-home":[193.77,1.728],"me1:work-hospital":[195.848,1.728],"me1:work-shop":[197.926,1.896],"me1:work-school":[200.172,1.536],"me1:work-factory":[202.058,1.824],"me1:work-warehouse":[204.232,2.184],"me1:work-restaurant":[206.766,2.016],"me1:work-bank":[209.132,1.944],"me1:work-farm":[211.426,1.728],"me1:work-university":[213.504,2.016],"me1:partner-married-m":[215.87,1.464],"me1:partner-married-f":[217.684,1.704],"me1:partner-single-m":[219.738,1.704],"me1:partner-single-f":[221.792,1.536],"me1:partner-wife":[223.678,1.296],"me1:partner-husband":[225.324,1.296],"me1:partner-gf":[226.97,1.608],"me1:partner-bf":[228.928,1.488],"me1:kids-none":[230.766,1.536],"me1:kids-son":[232.652,1.848],"me1:kids-daughter":[234.85,1.728],"me1:kids-sd":[236.928,1.848],"me1:kids-two":[239.126,1.608],"me1:kids-three":[241.084,1.464],"me1:kids-four":[242.898,1.536],"me1:sib-none":[244.784,1.896],"me1:sib-brother":[247.03,1.608],"me1:sib-sister":[248.988,1.536],"me1:sib-both":[250.874,2.904],"me1:sib-brothers":[254.128,1.704],"me1:sib-sisters":[256.182,1.584],"me1:pet-dog":[258.116,1.248],"me1:pet-cat":[259.714,1.656],"me1:pet-both":[261.72,1.968],"me1:why-family":[264.038,2.328],"me1:why-kids":[266.716,2.064],"me1:why-trip":[269.13,1.824],"me1:why-wife":[271.304,2.064],"me1:why-husband":[273.718,2.448],"me1:why-gf":[276.516,2.184],"me1:why-bf":[279.05,1.584],"me1:why-friends":[280.984,2.448],"me1:why-love":[283.782,1.728],"me1:why-languages":[285.86,2.328],"me1:like-read":[288.538,1.488],"me1:like-travel":[290.376,1.824],"me1:like-cook":[292.55,1.728],"me1:like-sport":[294.628,2.424],"me1:like-basketball":[297.402,2.088],"me1:like-football":[299.84,1.968],"me1:like-films":[302.158,2.304],"me1:like-music":[304.812,2.136],"me1:like-fish":[307.298,1.416],"me1:like-walk":[309.064,1.656],"me1:like-dance":[311.07,1.464],"me1:like-sing":[312.884,1.488],"me1:like-draw":[314.722,1.536],"me1:like-games":[316.608,2.328],"me1:like-garden":[319.286,2.376],"me1:like-swim":[322.012,1.464]},"me2":{"me2:u21a-2:3~f":[0,1.464],"me2:u15c-1:2~f":[1.814,2.448],"me2:u14c-1:4~f":[4.612,1.728],"me2:u9a-1:0~f":[6.69,1.656],"me2:u9a-1:1~f":[8.696,1.728],"me2:u9a-1:2~f":[10.774,1.416],"me2:u9a-1:4~f":[12.54,1.728],"me2:u41c-1:1~f":[14.618,2.616],"me2:u35c-1:0~f":[17.584,1.776],"me2:u36d-1:3~f":[19.71,2.376],"me2:cv1:22~n":[22.436,1.728],"me2:cv16:0~n":[24.514,2.184],"me2:cv2:7o1~f":[27.048,2.304],"me2:cv8:1~f":[29.702,1.488],"me2:cv10:10~f":[31.54,2.304],"me2:cv12:1~f":[34.194,1.896],"me2:cv12:13~f":[36.44,2.568]},"u22":{"u22a-1:0":[0,0.648],"u22a-1:1":[0.998,0.696],"u22a-1:2":[2.044,1.056],"u22a-1:3":[3.45,1.104],"u22a-1:4":[4.904,0.984],"u22b-1:0":[6.238,1.008],"u22b-1:1":[7.596,1.368],"u22b-1:2":[9.314,0.984],"u22b-1:3":[10.648,1.536],"u22b-1:4":[12.534,1.224],"u22c-1:0":[14.108,1.104],"u22c-1:1":[15.562,1.008],"u22c-1:2":[16.92,1.704],"u22c-1:3":[18.974,1.656],"u22c-1:4":[20.98,1.728],"u22d-1:0":[23.058,1.704],"u22d-1:1":[25.112,1.704],"u22d-1:2":[27.166,1.464],"u22d-1:3":[28.98,2.184],"u22d-1:4":[31.514,1.536],"u22e-1:0":[33.4,0.648],"u22e-1:1":[34.398,1.008],"u22e-1:2":[35.756,1.464],"u22e-1:3":[37.57,1.608],"u22e-1:4":[39.528,1.584]},"u23":{"u23a-1:0":[0,0.768],"u23a-1:1":[1.118,1.224],"u23a-1:2":[2.692,1.128],"u23a-1:3":[4.17,1.128],"u23a-1:4":[5.648,1.608],"u23b-1:0":[7.606,1.128],"u23b-1:1":[9.084,1.008],"u23b-1:2":[10.442,1.008],"u23b-1:3":[11.8,1.176],"u23b-1:4":[13.326,1.056],"u23c-1:0":[14.732,1.176],"u23c-1:1":[16.258,1.176],"u23c-1:2":[17.784,1.176],"u23c-1:3":[19.31,1.224],"u23c-1:4":[20.884,1.416],"u23d-1:0":[22.65,1.176],"u23d-1:1":[24.176,1.008],"u23d-1:2":[25.534,1.248],"u23d-1:3":[27.132,2.424],"u23d-1:4":[29.906,1.056],"u23e-1:0":[31.312,1.008],"u23e-1:1":[32.67,1.008],"u23e-1:2":[34.028,0.816],"u23e-1:3":[35.194,1.176],"u23e-1:4":[36.72,1.608],"u23f-1:0":[38.678,1.104],"u23f-1:1":[40.132,1.344],"u23f-1:2":[41.826,1.008],"u23f-1:3":[43.184,0.888],"u23f-1:4":[44.422,1.104]},"u24":{"u24a-1:0":[0,0.864],"u24a-1:1":[1.214,0.768],"u24a-1:2":[2.332,1.008],"u24a-1:3":[3.69,1.296],"u24a-1:4":[5.336,1.008],"u24b-1:0":[6.694,0.456],"u24b-1:1":[7.5,1.368],"u24b-1:2":[9.218,1.176],"u24b-1:3":[10.744,1.176],"u24b-1:4":[12.27,1.008],"u24c-1:0":[13.628,1.536],"u24c-1:1":[15.514,1.728],"u24c-1:2":[17.592,1.656],"u24c-1:3":[19.598,2.064],"u24c-1:4":[22.012,1.536],"u24d-1:0":[23.898,1.536],"u24d-1:1":[25.784,1.224],"u24d-1:2":[27.358,1.224],"u24d-1:3":[28.932,1.656],"u24d-1:4":[30.938,1.536]},"u25":{"u25a-1:0":[0,1.416],"u25a-1:1":[1.766,1.848],"u25a-1:2":[3.964,1.608],"u25a-1:3":[5.922,1.608],"u25a-1:4":[7.88,1.776],"u25b-1:0":[10.006,1.176],"u25b-1:1":[11.532,1.008],"u25b-1:2":[12.89,0.744],"u25b-1:3":[13.984,1.104],"u25b-1:4":[15.438,1.536],"u25c-1:0":[17.324,1.104],"u25c-1:1":[18.778,1.728],"u25c-1:2":[20.856,1.656],"u25c-1:3":[22.862,1.176],"u25c-1:4":[24.388,1.584],"u25d-1:0":[26.322,1.056],"u25d-1:1":[27.728,1.176],"u25d-1:2":[29.254,1.296],"u25d-1:3":[30.9,1.704],"u25d-1:4":[32.954,1.536]},"u2":{"u2a-1:0":[0,0.816],"u2a-1:1":[1.166,1.128],"u2a-1:2":[2.644,0.864],"u2a-1:3":[3.858,1.128],"u2a-1:4":[5.336,1.056],"u2b-1:0":[6.742,1.224],"u2b-1:1":[8.316,1.464],"u2b-1:2":[10.13,1.008],"u2b-1:3":[11.488,1.176],"u2b-1:4":[13.014,1.008],"u2c-1:0":[14.372,1.128],"u2c-1:1":[15.85,1.056],"u2c-1:2":[17.256,1.104],"u2c-1:3":[18.71,1.296],"u2c-1:4":[20.356,1.416],"u2d-1:0":[22.122,1.296],"u2d-1:1":[23.768,1.104],"u2d-1:2":[25.222,1.104],"u2d-1:3":[26.676,1.008],"u2d-1:4":[28.034,2.088],"u2e-1:0":[30.472,1.488],"u2e-1:1":[32.31,1.464],"u2e-1:2":[34.124,1.488],"u2e-1:3":[35.962,1.488],"u2e-1:4":[37.8,1.416],"u2f-1:0":[39.566,1.104],"u2f-1:1":[41.02,1.296],"u2f-1:2":[42.666,1.656],"u2f-1:3":[44.672,1.488],"u2f-1:4":[46.51,1.656],"u2g-1:0":[48.516,1.224],"u2g-1:1":[50.09,1.296],"u2g-1:2":[51.736,1.488],"u2g-1:3":[53.574,1.488],"u2g-1:4":[55.412,1.008]},"u5":{"u5a-1:0":[0,1.224],"u5a-1:1":[1.574,1.176],"u5a-1:2":[3.1,1.464],"u5a-1:3":[4.914,1.584],"u5a-1:4":[6.848,1.464],"u5b-1:0":[8.662,1.464],"u5b-1:1":[10.476,1.704],"u5b-1:2":[12.53,1.104],"u5b-1:3":[13.984,0.936],"u5b-1:4":[15.27,1.488],"u5c-1:0":[17.108,1.176],"u5c-1:1":[18.634,1.728],"u5c-1:2":[20.712,1.248],"u5c-1:3":[22.31,1.704],"u5c-1:4":[24.364,1.344],"u5d-1:0":[26.058,1.368],"u5d-1:1":[27.776,1.488],"u5d-1:2":[29.614,1.416],"u5d-1:3":[31.38,1.824],"u5d-1:4":[33.554,1.008]},"u26":{"u26a-1:0":[0,1.224],"u26a-1:1":[1.574,1.248],"u26a-1:2":[3.172,1.416],"u26a-1:3":[4.938,1.416],"u26a-1:4":[6.704,1.584],"u26b-1:0":[8.638,0.576],"u26b-1:1":[9.564,1.536],"u26b-1:2":[11.45,1.656],"u26b-1:3":[13.456,1.488],"u26b-1:4":[15.294,1.224],"u26c-1:0":[16.868,1.296],"u26c-1:1":[18.514,1.296],"u26c-1:2":[20.16,1.128],"u26c-1:3":[21.638,1.488],"u26c-1:4":[23.476,1.656],"u26d-1:0":[25.482,1.656],"u26d-1:1":[27.488,1.536],"u26d-1:2":[29.374,2.184],"u26d-1:3":[31.908,1.656],"u26d-1:4":[33.914,1.656],"u26e-1:0":[35.92,2.256],"u26e-1:1":[38.526,1.728],"u26e-1:2":[40.604,1.368],"u26e-1:3":[42.322,1.656],"u26e-1:4":[44.328,1.704]},"u3":{"u3a-1:0":[0,1.536],"u3a-1:1":[1.886,1.176],"u3a-1:2":[3.412,1.176],"u3a-1:3":[4.938,1.608],"u3a-1:4":[6.896,1.368],"u3b-1:0":[8.614,1.056],"u3b-1:1":[10.02,1.176],"u3b-1:2":[11.546,1.176],"u3b-1:3":[13.072,1.368],"u3b-1:4":[14.79,1.368],"u3c-1:0":[16.508,0.984],"u3c-1:1":[17.842,1.224],"u3c-1:2":[19.416,1.704],"u3c-1:3":[21.47,1.176],"u3c-1:4":[22.996,1.344],"u3d-1:0":[24.69,1.368],"u3d-1:1":[26.408,1.296],"u3d-1:2":[28.054,1.488],"u3d-1:3":[29.892,1.176],"u3d-1:4":[31.418,1.224]},"u15":{"u15a-1:0":[0,1.416],"u15a-1:1":[1.766,1.128],"u15a-1:2":[3.244,1.584],"u15a-1:3":[5.178,1.824],"u15a-1:4":[7.352,1.416],"u15b-1:0":[9.118,1.296],"u15b-1:1":[10.764,1.416],"u15b-1:2":[12.53,1.536],"u15b-1:3":[14.416,0.984],"u15b-1:4":[15.75,1.584],"u15c-1:0":[17.684,1.416],"u15c-1:1":[19.45,1.824],"u15c-1:2":[21.624,2.544],"u15c-1:3":[24.518,1.488],"u15c-1:4":[26.356,1.464],"u15d-1:0":[28.17,1.968],"u15d-1:1":[30.488,1.704],"u15d-1:2":[32.542,1.704],"u15d-1:3":[34.596,1.416],"u15d-1:4":[36.362,1.536]},"u4":{"u4a-1:0":[0,1.296],"u4a-1:1":[1.646,1.416],"u4a-1:2":[3.412,1.176],"u4a-1:3":[4.938,1.128],"u4a-1:4":[6.416,1.128],"u4b-1:0":[7.894,1.248],"u4b-1:1":[9.492,1.704],"u4b-1:2":[11.546,1.488],"u4b-1:3":[13.384,1.176],"u4b-1:4":[14.91,1.248],"u4c-1:0":[16.508,1.248],"u4c-1:1":[18.106,1.104],"u4c-1:2":[19.56,1.248],"u4c-1:3":[21.158,1.176],"u4c-1:4":[22.684,2.496],"u4d-1:0":[25.53,1.128],"u4d-1:1":[27.008,1.008],"u4d-1:2":[28.366,0.936],"u4d-1:3":[29.652,1.248],"u4d-1:4":[31.25,1.488]},"u14":{"u14a-1:0":[0,1.176],"u14a-1:1":[1.526,1.584],"u14a-1:2":[3.46,1.224],"u14a-1:3":[5.034,1.368],"u14a-1:4":[6.752,1.536],"u14b-1:0":[8.638,1.128],"u14b-1:1":[10.116,1.968],"u14b-1:2":[12.434,1.488],"u14b-1:3":[14.272,1.704],"u14b-1:4":[16.326,1.704],"u14c-1:0":[18.38,1.968],"u14c-1:1":[20.698,1.776],"u14c-1:2":[22.824,1.896],"u14c-1:3":[25.07,1.584],"u14c-1:4":[27.004,1.728],"u14d-1:0":[29.082,1.608],"u14d-1:1":[31.04,1.248],"u14d-1:2":[32.638,1.128],"u14d-1:3":[34.116,1.728],"u14d-1:4":[36.194,1.008]},"u7":{"u7a-1:0":[0,1.176],"u7a-1:1":[1.526,1.344],"u7a-1:2":[3.22,1.296],"u7a-1:3":[4.866,1.296],"u7a-1:4":[6.512,1.704],"u7b-1:0":[8.566,1.176],"u7b-1:1":[10.092,1.296],"u7b-1:2":[11.738,1.296],"u7b-1:3":[13.384,1.536],"u7b-1:4":[15.27,1.056],"u7c-1:0":[16.676,1.488],"u7c-1:1":[18.514,1.248],"u7c-1:2":[20.112,1.008],"u7c-1:3":[21.47,1.656],"u7c-1:4":[23.476,1.704],"u7d-1:0":[25.53,1.296],"u7d-1:1":[27.176,1.536],"u7d-1:2":[29.062,2.448],"u7d-1:3":[31.86,1.728],"u7d-1:4":[33.938,1.464]},"u16":{"u16a-1:0":[0,1.296],"u16a-1:1":[1.646,1.176],"u16a-1:2":[3.172,1.416],"u16a-1:3":[4.938,1.224],"u16a-1:4":[6.512,1.728],"u16b-1:0":[8.59,1.128],"u16b-1:1":[10.068,1.296],"u16b-1:2":[11.714,0.504],"u16b-1:3":[12.568,1.128],"u16b-1:4":[14.046,1.296],"u16c-1:0":[15.692,0.768],"u16c-1:1":[16.81,1.128],"u16c-1:2":[18.288,1.968],"u16c-1:3":[20.606,2.184],"u16c-1:4":[23.14,1.488],"u16d-1:0":[24.978,1.536],"u16d-1:1":[26.864,1.776],"u16d-1:2":[28.99,1.608],"u16d-1:3":[30.948,1.968],"u16d-1:4":[33.266,1.488]},"u28":{"u28a-1:0":[0,1.344],"u28a-1:1":[1.694,1.224],"u28a-1:2":[3.268,1.368],"u28a-1:3":[4.986,1.584],"u28a-1:4":[6.92,1.464],"u28b-1:0":[8.734,1.128],"u28b-1:1":[10.212,1.224],"u28b-1:2":[11.786,1.128],"u28b-1:3":[13.264,1.008],"u28b-1:4":[14.622,1.488],"u28c-1:0":[16.46,1.056],"u28c-1:1":[17.866,1.344],"u28c-1:2":[19.56,1.104],"u28c-1:3":[21.014,1.608],"u28c-1:4":[22.972,1.608],"u28d-1:0":[24.93,1.488],"u28d-1:1":[26.768,1.776],"u28d-1:2":[28.894,1.536],"u28d-1:3":[30.78,1.488],"u28d-1:4":[32.618,1.896],"u28e-1:0":[34.864,1.776],"u28e-1:1":[36.99,2.064],"u28e-1:2":[39.404,1.728],"u28e-1:3":[41.482,1.536],"u28e-1:4":[43.368,1.944]},"u6":{"u6a-1:0":[0,1.176],"u6a-1:1":[1.526,1.248],"u6a-1:2":[3.124,1.296],"u6a-1:3":[4.77,1.128],"u6a-1:4":[6.248,1.296],"u6b-1:0":[7.894,1.344],"u6b-1:1":[9.588,1.704],"u6b-1:2":[11.642,1.176],"u6b-1:3":[13.168,1.728],"u6b-1:4":[15.246,1.224],"u6c-1:0":[16.82,1.536],"u6c-1:1":[18.706,1.536],"u6c-1:2":[20.592,1.296],"u6c-1:3":[22.238,1.368],"u6c-1:4":[23.956,1.728],"u6d-1:0":[26.034,1.416],"u6d-1:1":[27.8,1.416],"u6d-1:2":[29.566,1.128],"u6d-1:3":[31.044,1.608],"u6d-1:4":[33.002,1.848]},"u30":{"u30a-1:0":[0,1.464],"u30a-1:1":[1.814,1.656],"u30a-1:2":[3.82,1.296],"u30a-1:3":[5.466,1.368],"u30a-1:4":[7.184,1.176],"u30b-1:0":[8.71,1.464],"u30b-1:1":[10.524,1.224],"u30b-1:2":[12.098,1.296],"u30b-1:3":[13.744,1.416],"u30b-1:4":[15.51,1.248],"u30c-1:0":[17.108,0.984],"u30c-1:1":[18.442,1.176],"u30c-1:2":[19.968,1.416],"u30c-1:3":[21.734,1.608],"u30c-1:4":[23.692,1.704],"u30d-1:0":[25.746,1.896],"u30d-1:1":[27.992,1.704],"u30d-1:2":[30.046,2.016],"u30d-1:3":[32.412,2.304],"u30d-1:4":[35.066,2.016]},"u29":{"u29a-1:0":[0,1.248],"u29a-1:1":[1.598,1.008],"u29a-1:2":[2.956,1.008],"u29a-1:3":[4.314,1.248],"u29a-1:4":[5.912,1.008],"u29b-1:0":[7.27,1.296],"u29b-1:1":[8.916,1.008],"u29b-1:2":[10.274,1.344],"u29b-1:3":[11.968,0.768],"u29b-1:4":[13.086,0.816],"u29c-1:0":[14.252,1.416],"u29c-1:1":[16.018,1.824],"u29c-1:2":[18.192,1.896],"u29c-1:3":[20.438,2.016],"u29c-1:4":[22.804,1.488],"u29d-1:0":[24.642,1.464],"u29d-1:1":[26.456,1.608],"u29d-1:2":[28.414,0.768],"u29d-1:3":[29.532,1.104],"u29d-1:4":[30.986,1.536]},"u9":{"u9a-1:0":[0,1.536],"u9a-1:1":[1.886,1.536],"u9a-1:2":[3.772,1.536],"u9a-1:3":[5.658,1.656],"u9a-1:4":[7.664,1.824],"u9b-1:0":[9.838,1.416],"u9b-1:1":[11.604,1.128],"u9b-1:2":[13.082,1.416],"u9b-1:3":[14.848,1.224],"u9b-1:4":[16.422,1.584],"u9c-1:0":[18.356,1.296],"u9c-1:1":[20.002,1.464],"u9c-1:2":[21.816,1.296],"u9c-1:3":[23.462,1.464],"u9c-1:4":[25.276,1.536],"u9d-1:0":[27.162,1.656],"u9d-1:1":[29.168,1.296],"u9d-1:2":[30.814,1.656],"u9d-1:3":[32.82,1.824],"u9d-1:4":[34.994,1.608]},"u31":{"u31a-1:0":[0,1.416],"u31a-1:1":[1.766,1.368],"u31a-1:2":[3.484,1.344],"u31a-1:3":[5.178,1.104],"u31a-1:4":[6.632,1.656],"u31b-1:0":[8.638,1.176],"u31b-1:1":[10.164,1.224],"u31b-1:2":[11.738,1.296],"u31b-1:3":[13.384,1.104],"u31b-1:4":[14.838,1.176],"u31c-1:0":[16.364,1.368],"u31c-1:1":[18.082,1.248],"u31c-1:2":[19.68,1.248],"u31c-1:3":[21.278,1.896],"u31c-1:4":[23.524,1.464],"u31d-1:0":[25.338,1.416],"u31d-1:1":[27.104,1.104],"u31d-1:2":[28.558,1.488],"u31d-1:3":[30.396,0.984],"u31d-1:4":[31.73,1.536],"u31e-1:0":[33.616,1.608],"u31e-1:1":[35.574,1.944],"u31e-1:2":[37.868,1.416],"u31e-1:3":[39.634,1.536],"u31e-1:4":[41.52,2.424]},"u8":{"u8a-1:0":[0,1.008],"u8a-1:1":[1.358,1.416],"u8a-1:2":[3.124,1.008],"u8a-1:3":[4.482,1.104],"u8a-1:4":[5.936,1.056],"u8b-1:0":[7.342,1.728],"u8b-1:1":[9.42,1.656],"u8b-1:2":[11.426,1.176],"u8b-1:3":[12.952,1.056],"u8b-1:4":[14.358,1.008],"u8c-1:0":[15.716,1.224],"u8c-1:1":[17.29,1.536],"u8c-1:2":[19.176,1.824],"u8c-1:3":[21.35,1.824],"u8c-1:4":[23.524,1.728],"u8d-1:0":[25.602,1.656],"u8d-1:1":[27.608,0.888],"u8d-1:2":[28.846,1.296],"u8d-1:3":[30.492,1.104],"u8d-1:4":[31.946,1.776]},"u32":{"u32a-1:0":[0,0.768],"u32a-1:1":[1.118,1.104],"u32a-1:2":[2.572,1.008],"u32a-1:3":[3.93,2.088],"u32a-1:4":[6.368,1.704],"u32b-1:0":[8.422,0.984],"u32b-1:1":[9.756,0.984],"u32b-1:2":[11.09,1.488],"u32b-1:3":[12.928,1.776],"u32b-1:4":[15.054,1.416],"u32c-1:0":[16.82,1.536],"u32c-1:1":[18.706,1.704],"u32c-1:2":[20.76,2.064],"u32c-1:3":[23.174,1.776],"u32c-1:4":[25.3,1.176],"u32d-1:0":[26.826,1.176],"u32d-1:1":[28.352,1.008],"u32d-1:2":[29.71,1.416],"u32d-1:3":[31.476,1.416],"u32d-1:4":[33.242,1.728]},"u33":{"u33a-1:0":[0,1.536],"u33a-1:1":[1.886,1.776],"u33a-1:2":[4.012,1.848],"u33a-1:3":[6.21,1.344],"u33a-1:4":[7.904,1.224],"u33b-1:0":[9.478,1.248],"u33b-1:1":[11.076,1.704],"u33b-1:2":[13.13,1.704],"u33b-1:3":[15.184,1.224],"u33b-1:4":[16.758,1.704],"u33c-1:0":[18.812,1.728],"u33c-1:1":[20.89,1.464],"u33c-1:2":[22.704,1.704],"u33c-1:3":[24.758,1.656],"u33c-1:4":[26.764,2.064],"u33d-1:0":[29.178,1.008],"u33d-1:1":[30.536,1.056],"u33d-1:2":[31.942,1.368],"u33d-1:3":[33.66,1.824],"u33d-1:4":[35.834,2.496],"u33e-1:0":[38.68,1.536],"u33e-1:1":[40.566,1.296],"u33e-1:2":[42.212,1.536],"u33e-1:3":[44.098,1.536],"u33e-1:4":[45.984,1.656]},"u18":{"u18a-1:0":[0,1.464],"u18a-1:1":[1.814,1.488],"u18a-1:2":[3.652,1.368],"u18a-1:3":[5.37,1.704],"u18a-1:4":[7.424,1.368],"u18b-1:0":[9.142,1.248],"u18b-1:1":[10.74,1.344],"u18b-1:2":[12.434,1.296],"u18b-1:3":[14.08,1.296],"u18b-1:4":[15.726,1.344],"u18c-1:0":[17.42,0.504],"u18c-1:1":[18.274,0.696],"u18c-1:2":[19.32,1.248],"u18c-1:3":[20.918,1.488],"u18c-1:4":[22.756,1.296],"u18d-1:0":[24.402,1.608],"u18d-1:1":[26.36,1.056],"u18d-1:2":[27.766,1.296],"u18d-1:3":[29.412,2.088],"u18d-1:4":[31.85,2.256]},"u41":{"u41a-1:0":[0,0.696],"u41a-1:1":[1.046,1.008],"u41a-1:2":[2.404,1.056],"u41a-1:3":[3.81,0.696],"u41a-1:4":[4.856,1.536],"u41b-1:0":[6.742,0.696],"u41b-1:1":[7.788,0.816],"u41b-1:2":[8.954,1.104],"u41b-1:3":[10.408,1.008],"u41b-1:4":[11.766,0.984],"u41c-1:0":[13.1,1.896],"u41c-1:1":[15.346,2.184],"u41c-1:2":[17.88,1.704],"u41c-1:3":[19.934,2.328],"u41c-1:4":[22.612,2.568],"u41d-1:0":[25.53,0.744],"u41d-1:1":[26.624,1.296],"u41d-1:2":[28.27,0.888],"u41d-1:3":[29.508,1.536],"u41d-1:4":[31.394,1.464]},"u34":{"u34a-1:0":[0,1.008],"u34a-1:1":[1.358,1.104],"u34a-1:2":[2.812,1.848],"u34a-1:3":[5.01,0.744],"u34a-1:4":[6.104,1.296],"u34b-1:0":[7.75,1.056],"u34b-1:1":[9.156,1.056],"u34b-1:2":[10.562,1.176],"u34b-1:3":[12.088,1.344],"u34b-1:4":[13.782,1.008],"u34c-1:0":[15.14,1.056],"u34c-1:1":[16.546,0.528],"u34c-1:2":[17.424,0.864],"u34c-1:3":[18.638,0.816],"u34c-1:4":[19.804,1.008],"u34d-1:0":[21.162,1.896],"u34d-1:1":[23.408,1.248],"u34d-1:2":[25.006,1.536],"u34d-1:3":[26.892,1.896],"u34d-1:4":[29.138,1.416],"u34e-1:0":[30.904,0.936],"u34e-1:1":[32.19,1.056],"u34e-1:2":[33.596,1.008],"u34e-1:3":[34.954,1.536],"u34e-1:4":[36.84,1.008]},"u35":{"u35a-1:0":[0,0.936],"u35a-1:1":[1.286,1.248],"u35a-1:2":[2.884,1.128],"u35a-1:3":[4.362,0.888],"u35a-1:4":[5.6,1.176],"u35b-1:0":[7.126,1.536],"u35b-1:1":[9.012,1.224],"u35b-1:2":[10.586,1.344],"u35b-1:3":[12.28,1.008],"u35b-1:4":[13.638,0.936],"u35c-1:0":[14.924,1.344],"u35c-1:1":[16.618,1.776],"u35c-1:2":[18.744,1.728],"u35c-1:3":[20.822,1.848],"u35c-1:4":[23.02,2.424],"u35d-1:0":[25.794,1.704],"u35d-1:1":[27.848,1.224],"u35d-1:2":[29.422,1.296],"u35d-1:3":[31.068,2.256],"u35d-1:4":[33.674,2.328],"u35e-1:0":[36.352,1.464],"u35e-1:1":[38.166,2.136],"u35e-1:2":[40.652,1.536],"u35e-1:3":[42.538,1.368],"u35e-1:4":[44.256,1.224]},"u13":{"u13a-1:0":[0,1.536],"u13a-1:1":[1.886,1.464],"u13a-1:2":[3.7,1.176],"u13a-1:3":[5.226,1.896],"u13a-1:4":[7.472,2.184],"u13b-1:0":[10.006,1.728],"u13b-1:1":[12.084,1.488],"u13b-1:2":[13.922,1.536],"u13b-1:3":[15.808,1.416],"u13b-1:4":[17.574,1.248],"u13c-1:0":[19.172,1.968],"u13c-1:1":[21.49,1.896],"u13c-1:2":[23.736,2.448],"u13c-1:3":[26.534,1.848],"u13c-1:4":[28.732,2.016],"u13d-1:0":[31.098,1.536],"u13d-1:1":[32.984,1.704],"u13d-1:2":[35.038,2.136],"u13d-1:3":[37.524,1.536],"u13d-1:4":[39.41,1.848]},"u10":{"u10a-1:0":[0,1.944],"u10a-1:1":[2.294,1.416],"u10a-1:2":[4.06,1.488],"u10a-1:3":[5.898,1.176],"u10a-1:4":[7.424,1.296],"u10b-1:0":[9.07,1.176],"u10b-1:1":[10.596,1.128],"u10b-1:2":[12.074,1.656],"u10b-1:3":[14.08,1.536],"u10b-1:4":[15.966,1.368],"u10c-1:0":[17.684,1.968],"u10c-1:1":[20.002,1.608],"u10c-1:2":[21.96,2.064],"u10c-1:3":[24.374,1.536],"u10c-1:4":[26.26,1.896],"u10d-1:0":[28.506,2.016],"u10d-1:1":[30.872,1.536],"u10d-1:2":[32.758,1.536],"u10d-1:3":[34.644,1.848],"u10d-1:4":[36.842,2.328]},"u36":{"u36a-1:0":[0,1.536],"u36a-1:1":[1.886,1.464],"u36a-1:2":[3.7,1.104],"u36a-1:3":[5.154,1.344],"u36a-1:4":[6.848,1.704],"u36b-1:0":[8.902,1.776],"u36b-1:1":[11.028,2.088],"u36b-1:2":[13.466,1.776],"u36b-1:3":[15.592,1.248],"u36b-1:4":[17.19,1.416],"u36c-1:0":[18.956,1.224],"u36c-1:1":[20.53,1.896],"u36c-1:2":[22.776,1.896],"u36c-1:3":[25.022,1.824],"u36c-1:4":[27.196,2.016],"u36d-1:0":[29.562,1.464],"u36d-1:1":[31.376,1.608],"u36d-1:2":[33.334,1.896],"u36d-1:3":[35.58,2.328],"u36d-1:4":[38.258,2.136],"u36e-1:0":[40.744,1.704],"u36e-1:1":[42.798,1.248],"u36e-1:2":[44.396,1.536],"u36e-1:3":[46.282,1.944],"u36e-1:4":[48.576,1.704]},"u37":{"u37a-1:0":[0,1.008],"u37a-1:1":[1.358,1.176],"u37a-1:2":[2.884,1.056],"u37a-1:3":[4.29,1.584],"u37a-1:4":[6.224,1.656],"u37b-1:0":[8.23,1.488],"u37b-1:1":[10.068,1.536],"u37b-1:2":[11.954,1.296],"u37b-1:3":[13.6,1.008],"u37b-1:4":[14.958,1.224],"u37c-1:0":[16.532,1.608],"u37c-1:1":[18.49,2.064],"u37c-1:2":[20.904,2.328],"u37c-1:3":[23.582,1.704],"u37c-1:4":[25.636,1.824],"u37d-1:0":[27.81,1.488],"u37d-1:1":[29.648,1.368],"u37d-1:2":[31.366,1.848],"u37d-1:3":[33.564,1.368],"u37d-1:4":[35.282,1.104]},"u38":{"u38a-1:0":[0,1.488],"u38a-1:1":[1.838,1.296],"u38a-1:2":[3.484,1.464],"u38a-1:3":[5.298,1.248],"u38a-1:4":[6.896,1.656],"u38b-1:0":[8.902,1.176],"u38b-1:1":[10.428,1.536],"u38b-1:2":[12.314,1.656],"u38b-1:3":[14.32,1.608],"u38b-1:4":[16.278,1.104],"u38c-1:0":[17.732,1.416],"u38c-1:1":[19.498,1.416],"u38c-1:2":[21.264,1.464],"u38c-1:3":[23.078,1.128],"u38c-1:4":[24.556,0.984],"u38d-1:0":[25.89,1.776],"u38d-1:1":[28.016,1.416],"u38d-1:2":[29.782,1.296],"u38d-1:3":[31.428,1.824],"u38d-1:4":[33.602,1.608]},"u39":{"u39a-1:0":[0,1.416],"u39a-1:1":[1.766,1.128],"u39a-1:2":[3.244,1.296],"u39a-1:3":[4.89,1.824],"u39a-1:4":[7.064,1.248],"u39b-1:0":[8.662,1.296],"u39b-1:1":[10.308,1.704],"u39b-1:2":[12.362,1.704],"u39b-1:3":[14.416,1.488],"u39b-1:4":[16.254,1.848],"u39c-1:0":[18.452,1.896],"u39c-1:1":[20.698,1.536],"u39c-1:2":[22.584,1.896],"u39c-1:3":[24.83,2.448],"u39c-1:4":[27.628,1.968],"u39d-1:0":[29.946,1.368],"u39d-1:1":[31.664,1.944],"u39d-1:2":[33.958,1.584],"u39d-1:3":[35.892,2.448],"u39d-1:4":[38.69,2.304]},"u11":{"u11a-1:0":[0,1.416],"u11a-1:1":[1.766,1.224],"u11a-1:2":[3.34,1.296],"u11a-1:3":[4.986,1.464],"u11a-1:4":[6.8,1.176],"u11b-1:0":[8.326,1.128],"u11b-1:1":[9.804,1.224],"u11b-1:2":[11.378,1.248],"u11b-1:3":[12.976,1.488],"u11b-1:4":[14.814,1.224],"u11c-1:0":[16.388,1.104],"u11c-1:1":[17.842,1.416],"u11c-1:2":[19.608,1.464],"u11c-1:3":[21.422,1.656],"u11c-1:4":[23.428,1.656],"u11d-1:0":[25.434,1.296],"u11d-1:1":[27.08,1.536],"u11d-1:2":[28.966,2.016],"u11d-1:3":[31.332,1.728],"u11d-1:4":[33.41,2.088]},"u12":{"u12a-1:0":[0,1.224],"u12a-1:1":[1.574,1.368],"u12a-1:2":[3.292,1.224],"u12a-1:3":[4.866,1.704],"u12a-1:4":[6.92,1.296],"u12b-1:0":[8.566,1.176],"u12b-1:1":[10.092,1.536],"u12b-1:2":[11.978,1.176],"u12b-1:3":[13.504,1.416],"u12b-1:4":[15.27,1.704],"u12c-1:0":[17.324,1.176],"u12c-1:1":[18.85,0.984],"u12c-1:2":[20.184,1.104],"u12c-1:3":[21.638,1.488],"u12c-1:4":[23.476,1.176],"u12d-1:0":[25.002,2.376],"u12d-1:1":[27.728,1.704],"u12d-1:2":[29.782,1.728],"u12d-1:3":[31.86,1.968],"u12d-1:4":[34.178,1.848]},"cv2":{"cv2:0":[0,1.848],"cv2:1":[2.198,1.896],"cv2:2":[4.444,2.544],"cv2:3":[7.338,1.944],"cv2:4":[9.632,1.704],"cv2:5":[11.686,1.824],"cv2:6":[13.86,1.704],"cv2:7o0":[15.914,2.568],"cv2:7o0-0":[18.832,1.656],"cv2:7o1":[20.838,2.088],"cv2:7o1-0":[23.276,1.656],"cv2:8":[25.282,2.304],"cv2:9":[27.936,1.848],"cv2:10":[30.134,1.608],"cv2:11":[32.092,1.608],"cv2:12":[34.05,2.688],"cv2:13":[37.088,1.704],"cv2:14":[39.142,1.128]},"cv3":{"cv3:0":[0,2.256],"cv3:1":[2.606,2.256],"cv3:2":[5.212,2.544],"cv3:3":[8.106,1.536],"cv3:4":[9.992,1.608],"cv3:5":[11.95,1.728],"cv3:6":[14.028,1.728],"cv3:7":[16.106,1.464],"cv3:8":[17.92,1.296],"cv3:9":[19.566,1.104],"cv3:10":[21.02,1.824],"cv3:11":[23.194,1.104],"cv3:12":[24.648,1.704],"cv3:13":[26.702,1.536],"cv3:14":[28.588,2.328],"cv3:15":[31.266,1.368]},"cv4":{"cv4:0":[0,1.536],"cv4:1":[1.886,2.016],"cv4:2":[4.252,1.224],"cv4:3":[5.826,1.728],"cv4:4":[7.904,1.536],"cv4:5":[9.79,1.416],"cv4:6":[11.556,2.328],"cv4:7o0":[14.234,2.136],"cv4:7o0-0":[16.72,1.656],"cv4:7o1":[18.726,2.856],"cv4:7o1-0":[21.932,1.416],"cv4:8":[23.698,1.824],"cv4:9":[25.872,1.896],"cv4:10":[28.118,2.664],"cv4:11":[31.132,1.536],"cv4:12":[33.018,1.416],"cv4:13":[34.784,1.224],"cv4:14":[36.358,1.728],"cv4:15":[38.436,1.488],"cv4:16":[40.274,2.136]},"cv5":{"cv5:0":[0,1.824],"cv5:1":[2.174,2.544],"cv5:2":[5.068,0.456],"cv5:3":[5.874,1.896],"cv5:4":[8.12,2.928],"cv5:5":[11.398,1.824],"cv5:6":[13.572,3.048],"cv5:7":[16.97,1.656],"cv5:8":[18.976,1.896],"cv5:9":[21.222,2.064],"cv5:10":[23.636,1.536],"cv5:11o0":[25.522,1.848],"cv5:11o0-0":[27.72,1.656],"cv5:11o1":[29.726,2.448],"cv5:11o1-0":[32.524,1.536],"cv5:12":[34.41,1.128],"cv5:13":[35.888,1.776]},"cv6":{"cv6:0":[0,2.328],"cv6:1":[2.678,2.328],"cv6:2":[5.356,1.704],"cv6:3":[7.41,4.488],"cv6:4":[12.248,1.344],"cv6:5":[13.942,2.544],"cv6:6":[16.836,1.488],"cv6:7":[18.674,1.584],"cv6:8":[20.608,2.184],"cv6:9":[23.142,1.488],"cv6:10":[24.98,1.224],"cv6:11":[26.554,1.464],"cv6:12":[28.368,1.368],"cv6:13":[30.086,1.104],"cv6:14":[31.54,1.248],"cv6:15":[33.138,1.056]},"cv7":{"cv7:0":[0,1.464],"cv7:1":[1.814,2.016],"cv7:2":[4.18,0.864],"cv7:3":[5.394,2.208],"cv7:4":[7.952,1.776],"cv7:5":[10.078,1.536],"cv7:6":[11.964,1.008],"cv7:7":[13.322,1.416],"cv7:8":[15.088,2.256],"cv7:9":[17.694,1.704],"cv7:10":[19.748,1.584],"cv7:11":[21.682,1.704],"cv7:12":[23.736,1.656],"cv7:13o0":[25.742,1.416],"cv7:13o0-0":[27.508,1.776],"cv7:13o1":[29.634,1.536],"cv7:13o1-0":[31.52,1.488],"cv7:14":[33.358,2.184],"cv7:15":[35.892,2.328]},"cv8":{"cv8:0":[0,2.424],"cv8:1":[2.774,1.608],"cv8:2":[4.732,1.296],"cv8:3o0":[6.378,1.416],"cv8:3o0-0":[8.144,2.088],"cv8:3o1":[10.582,1.536],"cv8:3o1-0":[12.468,1.704],"cv8:4":[14.522,1.416],"cv8:5":[16.288,1.608],"cv8:6":[18.246,1.536],"cv8:7":[20.132,1.656],"cv8:8":[22.138,1.296],"cv8:9":[23.784,1.608],"cv8:10":[25.742,1.488],"cv8:11":[27.58,2.016],"cv8:12":[29.946,1.536],"cv8:13":[31.832,1.704],"cv8:14":[33.886,2.616]},"cv9":{"cv9:0":[0,1.536],"cv9:1":[1.886,1.728],"cv9:2":[3.964,1.608],"cv9:3o0":[5.922,1.536],"cv9:3o0-0":[7.808,1.464],"cv9:3o1":[9.622,1.944],"cv9:3o1-0":[11.916,1.368],"cv9:4":[13.634,1.368],"cv9:5":[15.352,2.808],"cv9:6":[18.51,1.368],"cv9:7":[20.228,1.608],"cv9:8":[22.186,1.728],"cv9:9":[24.264,2.376],"cv9:10":[26.99,1.104],"cv9:11":[28.444,1.416],"cv9:12":[30.21,1.968],"cv9:13":[32.528,2.304],"cv9:14":[35.182,1.704]},"cv10":{"cv10:0":[0,2.304],"cv10:1":[2.654,1.728],"cv10:2":[4.732,1.416],"cv10:3":[6.498,1.728],"cv10:4":[8.576,1.464],"cv10:5":[10.39,1.704],"cv10:6":[12.444,1.368],"cv10:7":[14.162,1.704],"cv10:8":[16.216,1.104],"cv10:9":[17.67,2.376],"cv10:10":[20.396,2.424],"cv10:11":[23.17,2.256],"cv10:12":[25.776,1.584],"cv10:13":[27.71,1.728],"cv10:14":[29.788,1.776],"cv10:15":[31.914,2.376]},"cv11":{"cv11:0":[0,1.416],"cv11:1":[1.766,1.416],"cv11:2":[3.532,2.016],"cv11:3":[5.898,1.704],"cv11:4":[7.952,1.656],"cv11:5":[9.958,1.848],"cv11:6":[12.156,2.016],"cv11:7":[14.522,1.824],"cv11:8":[16.696,2.064],"cv11:9":[19.11,1.248],"cv11:10":[20.708,1.224],"cv11:11":[22.282,1.776],"cv11:12":[24.408,1.848],"cv11:13":[26.606,1.824],"cv11:14":[28.78,1.344],"cv11:15":[30.474,1.416]},"cv12":{"cv12:0":[0,1.584],"cv12:1":[1.934,1.728],"cv12:2":[4.012,1.848],"cv12:3":[6.21,1.704],"cv12:4":[8.264,1.416],"cv12:5":[10.03,1.296],"cv12:6":[11.676,1.656],"cv12:7":[13.682,3.648],"cv12:8":[17.68,2.016],"cv12:9":[20.046,1.416],"cv12:10":[21.812,2.448],"cv12:11":[24.61,2.256],"cv12:12":[27.216,1.608],"cv12:13":[29.174,2.424],"cv12:14":[31.948,1.536],"cv12:15":[33.834,1.416]},"cv13":{"cv13:0":[0,1.968],"cv13:1o0":[2.318,1.704],"cv13:1o0-0":[4.372,1.536],"cv13:1o1":[6.258,1.224],"cv13:1o1-0":[7.832,1.488],"cv13:2":[9.67,3.048],"cv13:3":[13.068,1.536],"cv13:4":[14.954,2.016],"cv13:5":[17.32,1.728],"cv13:6":[19.398,2.424],"cv13:7":[22.172,1.728],"cv13:8":[24.25,2.016],"cv13:9":[26.616,2.328],"cv13:10":[29.294,1.896],"cv13:11":[31.54,1.008],"cv13:12":[32.898,2.328],"cv13:13":[35.576,2.064],"cv13:14":[37.99,1.536],"cv13:15":[39.876,1.248],"cv13:16":[41.474,1.656]},"cv14":{"cv14:0":[0,1.536],"cv14:1":[1.886,1.368],"cv14:2":[3.604,3.288],"cv14:3":[7.242,1.656],"cv14:4":[9.248,1.464],"cv14:5":[11.062,1.416],"cv14:6":[12.828,1.896],"cv14:7":[15.074,1.176],"cv14:8":[16.6,1.704],"cv14:9":[18.654,1.416],"cv14:10":[20.42,1.968],"cv14:11":[22.738,1.656],"cv14:12":[24.744,2.448],"cv14:13":[27.542,2.064],"cv14:14":[29.956,1.536],"cv14:15":[31.842,2.448]},"mk1":{"mk1:1j8bqyj":[0,2.136],"mk1:jtpejt":[2.486,1.776],"mk1:v9qg7o":[4.612,1.656],"mk1:156khiz":[6.618,1.536],"mk1:aif1bs":[8.504,2.088],"mk1:of5ey5":[10.942,2.256],"mk1:13g3lim":[13.548,1.728],"mk1:xx15fs":[15.626,2.784],"mk1:1qlnnbr":[18.76,2.784],"mk1:17as2vk":[21.894,2.424],"mk1:15wlnd7":[24.668,1.968],"mk1:1t0jeb9":[26.986,1.728],"mk1:lor6dv":[29.064,3.264],"mk1:1axlupt":[32.678,1.824],"mk1:hetqr7":[34.852,2.328],"mk1:qh9085":[37.53,1.704],"mk1:zunlmf":[39.584,1.968],"mk1:4075o2":[41.902,2.088],"mk1:d8bjbc":[44.34,2.328],"mk1:r31339":[47.018,2.088],"mk1:15ahe46":[49.456,2.064],"mk1:odelhj":[51.87,2.328],"mk1:1fywn62":[54.548,1.968],"mk1:1hz9wz6":[56.866,2.064],"mk1:10sbp6r":[59.28,2.568],"mk1:5h1mpe":[62.198,2.016]},"mk2":{"mk2:kddstp":[0,3.048],"mk2:32uuni":[3.398,2.256],"mk2:j899z":[6.004,3.144],"mk2:1bug946":[9.498,2.256],"mk2:163b4cp":[12.104,1.824],"mk2:1x9mvzv":[14.278,2.136],"mk2:11z4mmi":[16.764,2.424],"mk2:61k3az":[19.538,1.488],"mk2:uhrhb2":[21.376,2.064],"mk2:v3g9hg":[23.79,2.184]}},"leonas":{"u0":{"u0a-1:0":[0,1.176],"u0a-1:1":[1.526,1.416],"u0a-1:2":[3.292,1.008],"u0a-1:3":[4.65,1.368],"u0a-1:4":[6.368,1.584],"u0b-1:0":[8.302,1.296],"u0b-1:1":[9.948,0.768],"u0b-1:2":[11.066,1.368],"u0b-1:3":[12.784,0.696],"u0b-1:4":[13.83,1.464]},"u1":{"u1a-1:0":[0,1.248],"u1a-1:1":[1.598,1.896],"u1a-1:2":[3.844,0.888],"u1a-1:3":[5.082,1.944],"u1a-1:4":[7.376,1.416],"u1a-2:0":[9.142,1.416],"u1a-2:1":[10.908,0.864],"u1a-2:2":[12.122,0.816],"u1a-2:3":[13.288,1.056],"u1a-2:4":[14.694,1.248],"u1b-1:0":[16.292,0.408],"u1b-1:1":[17.05,0.936],"u1b-1:2":[18.336,1.368],"u1b-1:3":[20.054,1.848],"u1b-1:4":[22.252,1.536],"u1b-2:0":[24.138,1.704],"u1b-2:1":[26.192,1.608],"u1b-2:2":[28.15,1.008],"u1b-2:3":[29.508,1.416],"u1b-2:4":[31.274,1.848],"u1c-1:0":[33.472,1.104],"u1c-1:1":[34.926,1.296],"u1c-1:2":[36.572,0.408],"u1c-1:3":[37.33,1.224],"u1c-1:4":[38.904,1.536],"u1c-2:0":[40.79,0.576],"u1c-2:1":[41.716,1.368],"u1c-2:2":[43.434,0.816],"u1c-2:3":[44.6,1.464],"u1c-2:4":[46.414,1.488],"u1c-3:0":[48.252,1.008],"u1c-3:1":[49.61,2.304]},"u21":{"u21a-1:0":[0,1.728],"u21a-1:1":[2.078,1.296],"u21a-1:2":[3.724,0.744],"u21a-1:3":[4.818,0.624],"u21a-1:4":[5.792,1.344],"u21a-2:0":[7.486,1.296],"u21a-2:1":[9.132,1.776],"u21a-2:2":[11.258,1.584],"u21a-2:3":[13.192,1.128],"u21a-2:4":[14.67,0.864],"u21b-1:0":[15.884,1.728],"u21b-1:1":[17.962,1.488],"u21b-1:2":[19.8,1.584],"u21b-1:3":[21.734,1.416],"u21b-1:4":[23.5,1.008],"u21b-2:0":[24.858,1.176],"u21b-2:1":[26.384,2.256],"u21b-2:2":[28.99,1.704],"u21b-2:3":[31.044,1.536],"u21b-2:4":[32.93,1.536]},"cv1":{"cv1:0":[0,1.896],"cv1:1":[2.246,0.816],"cv1:2":[3.412,1.296],"cv1:3":[5.058,1.344],"cv1:4":[6.752,3.456],"cv1:5":[10.558,2.016],"cv1:6":[12.924,1.968],"cv1:7":[15.242,1.536],"cv1:8":[17.128,1.656],"cv1:9o0":[19.134,1.296],"cv1:9o0-0":[20.78,1.536],"cv1:9o1":[22.666,1.728],"cv1:9o1-0":[24.744,1.656],"cv1:10":[26.75,1.056],"cv1:11":[28.156,2.424],"cv1:13":[30.93,2.016],"cv1:14":[33.296,1.896],"cv1:15":[35.542,1.944],"cv1:16":[37.836,1.656],"cv1:18":[39.842,1.944],"cv1:19":[42.136,1.848],"cv1:20":[44.334,3.504],"cv1:21":[48.188,2.808],"cv1:22":[51.346,2.088],"cv1:23":[53.784,1.416]},"cv16":{"cv16:0":[0,1.416],"cv16:1o0":[1.766,2.376],"cv16:1o0-0":[4.492,1.944],"cv16:1o1":[6.786,1.416],"cv16:1o1-0":[8.552,0.696],"cv16:1o2":[9.598,1.536],"cv16:1o2-0":[11.484,3.264],"cv16:2":[15.098,1.536],"cv16:3":[16.984,3.048],"cv16:4":[20.382,2.616],"cv16:5":[23.348,1.416],"cv16:6":[25.114,5.088],"cv16:7":[30.552,1.536],"cv16:8":[32.438,1.584],"cv16:9":[34.372,1.896],"cv16:10":[36.618,1.656],"cv16:11":[38.624,1.536],"cv16:12":[40.51,2.616],"cv16:13":[43.476,3.576],"cv16:15":[47.402,1.704],"cv16:16":[49.456,1.464],"cv16:17":[51.27,2.376],"cv16:18":[53.996,2.664],"cv16:19":[57.01,1.824],"cv16:20":[59.184,2.904],"cv16:21":[62.438,2.688],"cv16:22":[65.476,2.424],"cv16:23":[68.25,1.848],"cv16:24":[70.448,4.968],"cv16:25":[75.766,1.944]},"me1":{"me1:name":[0,1.416],"me1:learn":[1.766,2.208],"me1:nice":[4.324,1.344],"me1:from-mx":[6.018,2.016],"me1:live-mx":[8.384,1.008],"me1:from-us":[9.742,2.304],"me1:live-us":[12.396,1.848],"me1:from-ca":[14.594,1.896],"me1:live-ca":[16.84,1.896],"me1:from-gb":[19.086,1.848],"me1:live-gb":[21.284,2.376],"me1:from-sc":[24.01,2.856],"me1:live-sc":[27.216,1.176],"me1:from-ie":[28.742,1.848],"me1:live-ie":[30.94,1.296],"me1:from-au":[32.586,1.848],"me1:live-au":[34.784,1.704],"me1:from-gt":[36.838,1.944],"me1:live-gt":[39.132,1.824],"me1:from-sv":[41.306,1.968],"me1:live-sv":[43.624,1.776],"me1:from-co":[45.75,1.848],"me1:live-co":[47.948,1.416],"me1:from-pr":[49.714,2.016],"me1:live-pr":[52.08,1.296],"me1:from-cu":[53.726,1.848],"me1:live-cu":[55.924,1.128],"me1:from-es":[57.402,1.464],"me1:live-es":[59.216,1.128],"me1:from-de":[60.694,2.256],"me1:live-de":[63.3,1.176],"me1:from-fr":[64.826,1.776],"me1:live-fr":[66.952,1.296],"me1:from-it":[68.598,1.776],"me1:live-it":[70.724,1.704],"me1:from-pl":[72.778,1.728],"me1:live-pl":[74.856,1.056],"me1:from-lt":[76.262,2.256],"me1:live-lt":[78.868,1.536],"me1:from-ua":[80.754,1.896],"me1:live-ua":[83,1.008],"me1:from-br":[84.358,2.304],"me1:live-br":[87.012,0.936],"me1:from-in":[88.298,1.896],"me1:live-in":[90.544,1.008],"me1:from-ph":[91.902,2.136],"me1:live-ph":[94.388,1.368],"me1:from-jp":[96.106,1.728],"me1:live-jp":[98.184,0.984],"me1:live-cdmx":[99.518,2.208],"me1:live-gdl":[102.076,1.488],"me1:live-mty":[103.914,1.776],"me1:live-pue":[106.04,1.536],"me1:live-tij":[107.926,1.608],"me1:live-cun":[109.884,1.104],"me1:live-la":[111.338,1.536],"me1:live-hou":[113.224,1.536],"me1:live-chi":[115.11,1.104],"me1:live-sa":[116.564,1.704],"me1:live-phx":[118.618,1.248],"me1:live-ny":[120.216,1.176],"me1:live-ldn":[121.742,1.176],"me1:job-teacher-m":[123.268,1.656],"me1:job-teacher-f":[125.274,1.656],"me1:job-student-m":[127.28,2.184],"me1:job-student-f":[129.814,1.848],"me1:job-doctor-m":[132.012,1.536],"me1:job-doctor-f":[133.898,1.608],"me1:job-nurse-m":[135.856,1.248],"me1:job-nurse-f":[137.454,1.896],"me1:job-engineer-m":[139.7,1.728],"me1:job-engineer-f":[141.778,1.416],"me1:job-programmer-m":[143.544,1.824],"me1:job-programmer-f":[145.718,1.968],"me1:job-driver-m":[148.036,1.416],"me1:job-driver-f":[149.802,1.536],"me1:job-cook-m":[151.688,1.536],"me1:job-cook-f":[153.574,1.488],"me1:job-builder-m":[155.412,1.488],"me1:job-builder-f":[157.25,1.896],"me1:job-seller-m":[159.496,1.704],"me1:job-seller-f":[161.55,1.248],"me1:job-accountant-m":[163.148,1.704],"me1:job-accountant-f":[165.202,1.008],"me1:job-manager-m":[166.56,1.776],"me1:job-manager-f":[168.686,1.848],"me1:job-mechanic-m":[170.884,1.848],"me1:job-mechanic-f":[173.082,1.704],"me1:job-farmer-m":[175.136,2.088],"me1:job-farmer-f":[177.574,1.824],"me1:job-artist-m":[179.748,1.344],"me1:job-artist-f":[181.442,1.896],"me1:job-home-m":[183.688,2.256],"me1:job-home-f":[186.294,1.824],"me1:job-retired-m":[188.468,1.776],"me1:job-retired-f":[190.594,1.584],"me1:job-unemployed-m":[192.528,1.944],"me1:job-unemployed-f":[194.822,1.848],"me1:work-office":[197.02,2.064],"me1:work-home":[199.434,1.656],"me1:work-hospital":[201.44,2.016],"me1:work-shop":[203.806,1.944],"me1:work-school":[206.1,2.184],"me1:work-factory":[208.634,2.184],"me1:work-warehouse":[211.168,2.016],"me1:work-restaurant":[213.534,2.016],"me1:work-bank":[215.9,1.848],"me1:work-farm":[218.098,2.304],"me1:work-university":[220.752,2.424],"me1:partner-married-m":[223.526,1.728],"me1:partner-married-f":[225.604,1.656],"me1:partner-single-m":[227.61,1.848],"me1:partner-single-f":[229.808,1.944],"me1:partner-wife":[232.102,1.896],"me1:partner-husband":[234.348,1.824],"me1:partner-gf":[236.522,1.704],"me1:partner-bf":[238.576,1.608],"me1:kids-none":[240.534,1.776],"me1:kids-son":[242.66,2.064],"me1:kids-daughter":[245.074,1.008],"me1:kids-sd":[246.432,1.584],"me1:kids-two":[248.366,1.776],"me1:kids-three":[250.492,2.016],"me1:kids-four":[252.858,1.344],"me1:sib-none":[254.552,1.824],"me1:sib-brother":[256.726,1.008],"me1:sib-sister":[258.084,1.776],"me1:sib-both":[260.21,2.256],"me1:sib-brothers":[262.816,2.016],"me1:sib-sisters":[265.182,1.536],"me1:pet-dog":[267.068,1.728],"me1:pet-cat":[269.146,1.584],"me1:pet-both":[271.08,1.704],"me1:why-family":[273.134,2.496],"me1:why-kids":[275.98,2.424],"me1:why-trip":[278.754,1.968],"me1:why-wife":[281.072,1.944],"me1:why-husband":[283.366,1.776],"me1:why-gf":[285.492,2.448],"me1:why-bf":[288.29,1.728],"me1:why-friends":[290.368,1.848],"me1:why-love":[292.566,1.704],"me1:why-languages":[294.62,2.208],"me1:like-read":[297.178,1.704],"me1:like-travel":[299.232,1.488],"me1:like-cook":[301.07,1.536],"me1:like-sport":[302.956,2.064],"me1:like-basketball":[305.37,2.016],"me1:like-football":[307.736,1.728],"me1:like-films":[309.814,1.848],"me1:like-music":[312.012,1.896],"me1:like-fish":[314.258,1.536],"me1:like-walk":[316.144,1.728],"me1:like-dance":[318.222,1.776],"me1:like-sing":[320.348,1.536],"me1:like-draw":[322.234,2.376],"me1:like-games":[324.96,2.304],"me1:like-garden":[327.614,2.448],"me1:like-swim":[330.412,1.416]},"me2":{"me2:u21a-2:3~f":[0,2.088],"me2:u15c-1:2~f":[2.438,2.424],"me2:u14c-1:4~f":[5.212,2.064],"me2:u9a-1:0~f":[7.626,1.488],"me2:u9a-1:1~f":[9.464,1.656],"me2:u9a-1:2~f":[11.47,1.704],"me2:u9a-1:4~f":[13.524,1.704],"me2:u41c-1:1~f":[15.578,1.848],"me2:u35c-1:0~f":[17.776,1.368],"me2:u36d-1:3~f":[19.494,2.808],"me2:cv1:22~n":[22.652,2.304],"me2:cv16:0~n":[25.306,1.464],"me2:cv2:7o1~f":[27.12,2.664],"me2:cv8:1~f":[30.134,1.896],"me2:cv10:10~f":[32.38,2.376],"me2:cv12:1~f":[35.106,1.536],"me2:cv12:13~f":[36.992,2.376]},"u22":{"u22a-1:0":[0,1.536],"u22a-1:1":[1.886,1.248],"u22a-1:2":[3.484,1.296],"u22a-1:3":[5.13,1.536],"u22a-1:4":[7.016,1.728],"u22b-1:0":[9.094,1.008],"u22b-1:1":[10.452,1.416],"u22b-1:2":[12.218,1.416],"u22b-1:3":[13.984,0.768],"u22b-1:4":[15.102,1.416],"u22c-1:0":[16.868,1.608],"u22c-1:1":[18.826,1.128],"u22c-1:2":[20.304,2.184],"u22c-1:3":[22.838,1.728],"u22c-1:4":[24.916,1.848],"u22d-1:0":[27.114,1.704],"u22d-1:1":[29.168,1.104],"u22d-1:2":[30.622,1.968],"u22d-1:3":[32.94,2.088],"u22d-1:4":[35.378,1.344],"u22e-1:0":[37.072,0.576],"u22e-1:1":[37.998,0.528],"u22e-1:2":[38.876,1.296],"u22e-1:3":[40.522,1.008],"u22e-1:4":[41.88,0.984]},"u23":{"u23a-1:0":[0,1.224],"u23a-1:1":[1.574,1.296],"u23a-1:2":[3.22,1.248],"u23a-1:3":[4.818,1.464],"u23a-1:4":[6.632,1.416],"u23b-1:0":[8.398,0.528],"u23b-1:1":[9.276,1.344],"u23b-1:2":[10.97,0.648],"u23b-1:3":[11.968,1.128],"u23b-1:4":[13.446,1.104],"u23c-1:0":[14.9,0.504],"u23c-1:1":[15.754,0.648],"u23c-1:2":[16.752,1.896],"u23c-1:3":[18.998,1.416],"u23c-1:4":[20.764,1.104],"u23d-1:0":[22.218,1.464],"u23d-1:1":[24.032,1.296],"u23d-1:2":[25.678,1.488],"u23d-1:3":[27.516,1.944],"u23d-1:4":[29.81,1.968],"u23e-1:0":[32.128,1.128],"u23e-1:1":[33.606,1.656],"u23e-1:2":[35.612,0.576],"u23e-1:3":[36.538,1.344],"u23e-1:4":[38.232,1.296],"u23f-1:0":[39.878,1.344],"u23f-1:1":[41.572,1.416],"u23f-1:2":[43.338,0.696],"u23f-1:3":[44.384,1.704],"u23f-1:4":[46.438,1.104]},"u24":{"u24a-1:0":[0,1.224],"u24a-1:1":[1.574,0.408],"u24a-1:2":[2.332,1.656],"u24a-1:3":[4.338,0.576],"u24a-1:4":[5.264,0.528],"u24b-1:0":[6.142,1.224],"u24b-1:1":[7.716,0.696],"u24b-1:2":[8.762,1.056],"u24b-1:3":[10.168,1.344],"u24b-1:4":[11.862,1.656],"u24c-1:0":[13.868,1.704],"u24c-1:1":[15.922,0.936],"u24c-1:2":[17.208,1.584],"u24c-1:3":[19.142,2.208],"u24c-1:4":[21.7,2.016],"u24d-1:0":[24.066,1.896],"u24d-1:1":[26.312,0.744],"u24d-1:2":[27.406,1.488],"u24d-1:3":[29.244,2.184],"u24d-1:4":[31.778,1.968]},"u25":{"u25a-1:0":[0,1.248],"u25a-1:1":[1.598,1.704],"u25a-1:2":[3.652,1.968],"u25a-1:3":[5.97,1.056],"u25a-1:4":[7.376,1.248],"u25b-1:0":[8.974,1.296],"u25b-1:1":[10.62,1.464],"u25b-1:2":[12.434,1.248],"u25b-1:3":[14.032,1.416],"u25b-1:4":[15.798,1.416],"u25c-1:0":[17.564,0.816],"u25c-1:1":[18.73,1.464],"u25c-1:2":[20.544,2.064],"u25c-1:3":[22.958,1.704],"u25c-1:4":[25.012,1.968],"u25d-1:0":[27.33,1.464],"u25d-1:1":[29.144,1.488],"u25d-1:2":[30.982,1.704],"u25d-1:3":[33.036,1.176],"u25d-1:4":[34.562,1.944]},"u2":{"u2a-1:0":[0,0.456],"u2a-1:1":[0.806,0.648],"u2a-1:2":[1.804,1.296],"u2a-1:3":[3.45,0.648],"u2a-1:4":[4.448,1.344],"u2b-1:0":[6.142,1.488],"u2b-1:1":[7.98,0.504],"u2b-1:2":[8.834,0.696],"u2b-1:3":[9.88,1.104],"u2b-1:4":[11.334,1.488],"u2c-1:0":[13.172,1.488],"u2c-1:1":[15.01,1.104],"u2c-1:2":[16.464,1.368],"u2c-1:3":[18.182,1.368],"u2c-1:4":[19.9,1.104],"u2d-1:0":[21.354,0.696],"u2d-1:1":[22.4,1.416],"u2d-1:2":[24.166,1.128],"u2d-1:3":[25.644,1.488],"u2d-1:4":[27.482,1.704],"u2e-1:0":[29.536,1.536],"u2e-1:1":[31.422,1.176],"u2e-1:2":[32.948,1.704],"u2e-1:3":[35.002,1.416],"u2e-1:4":[36.768,1.008],"u2f-1:0":[38.126,0.576],"u2f-1:1":[39.052,1.248],"u2f-1:2":[40.65,2.016],"u2f-1:3":[43.016,1.776],"u2f-1:4":[45.142,1.008],"u2g-1:0":[46.5,1.248],"u2g-1:1":[48.098,1.464],"u2g-1:2":[49.912,1.536],"u2g-1:3":[51.798,0.816],"u2g-1:4":[52.964,1.296]},"u5":{"u5a-1:0":[0,0.648],"u5a-1:1":[0.998,0.816],"u5a-1:2":[2.164,1.368],"u5a-1:3":[3.882,0.696],"u5a-1:4":[4.928,0.744],"u5b-1:0":[6.022,1.344],"u5b-1:1":[7.716,1.464],"u5b-1:2":[9.53,0.816],"u5b-1:3":[10.696,1.536],"u5b-1:4":[12.582,1.008],"u5c-1:0":[13.94,1.656],"u5c-1:1":[15.946,1.944],"u5c-1:2":[18.24,1.488],"u5c-1:3":[20.078,1.896],"u5c-1:4":[22.324,1.656],"u5d-1:0":[24.33,1.584],"u5d-1:1":[26.264,1.488],"u5d-1:2":[28.102,0.816],"u5d-1:3":[29.268,1.344],"u5d-1:4":[30.962,0.576]},"u26":{"u26a-1:0":[0,1.248],"u26a-1:1":[1.598,1.464],"u26a-1:2":[3.412,1.536],"u26a-1:3":[5.298,1.608],"u26a-1:4":[7.256,1.656],"u26b-1:0":[9.262,1.344],"u26b-1:1":[10.956,1.896],"u26b-1:2":[13.202,0.768],"u26b-1:3":[14.32,1.344],"u26b-1:4":[16.014,1.416],"u26c-1:0":[17.78,1.416],"u26c-1:1":[19.546,1.608],"u26c-1:2":[21.504,1.344],"u26c-1:3":[23.198,0.864],"u26c-1:4":[24.412,1.416],"u26d-1:0":[26.178,2.256],"u26d-1:1":[28.784,1.608],"u26d-1:2":[30.742,2.328],"u26d-1:3":[33.42,2.136],"u26d-1:4":[35.906,1.224],"u26e-1:0":[37.48,1.008],"u26e-1:1":[38.838,1.848],"u26e-1:2":[41.036,1.776],"u26e-1:3":[43.162,2.496],"u26e-1:4":[46.008,2.136]},"u3":{"u3a-1:0":[0,1.656],"u3a-1:1":[2.006,1.464],"u3a-1:2":[3.82,0.768],"u3a-1:3":[4.938,1.656],"u3a-1:4":[6.944,0.864],"u3b-1:0":[8.158,1.224],"u3b-1:1":[9.732,1.728],"u3b-1:2":[11.81,1.536],"u3b-1:3":[13.696,0.984],"u3b-1:4":[15.03,1.296],"u3c-1:0":[16.676,0.528],"u3c-1:1":[17.554,0.816],"u3c-1:2":[18.72,1.728],"u3c-1:3":[20.798,0.768],"u3c-1:4":[21.916,1.536],"u3d-1:0":[23.802,1.608],"u3d-1:1":[25.76,1.584],"u3d-1:2":[27.694,0.936],"u3d-1:3":[28.98,1.416],"u3d-1:4":[30.746,1.488]},"u15":{"u15a-1:0":[0,1.104],"u15a-1:1":[1.454,1.608],"u15a-1:2":[3.412,2.256],"u15a-1:3":[6.018,1.968],"u15a-1:4":[8.336,0.864],"u15b-1:0":[9.55,1.848],"u15b-1:1":[11.748,1.968],"u15b-1:2":[14.066,1.416],"u15b-1:3":[15.832,1.416],"u15b-1:4":[17.598,1.608],"u15c-1:0":[19.556,1.656],"u15c-1:1":[21.562,1.704],"u15c-1:2":[23.616,2.376],"u15c-1:3":[26.342,1.584],"u15c-1:4":[28.276,1.368],"u15d-1:0":[29.994,1.176],"u15d-1:1":[31.52,1.944],"u15d-1:2":[33.814,0.864],"u15d-1:3":[35.028,1.416],"u15d-1:4":[36.794,1.848]},"u4":{"u4a-1:0":[0,1.296],"u4a-1:1":[1.646,1.416],"u4a-1:2":[3.412,1.584],"u4a-1:3":[5.346,1.056],"u4a-1:4":[6.752,0.768],"u4b-1:0":[7.87,1.296],"u4b-1:1":[9.516,1.344],"u4b-1:2":[11.21,1.584],"u4b-1:3":[13.144,0.864],"u4b-1:4":[14.358,1.416],"u4c-1:0":[16.124,1.296],"u4c-1:1":[17.77,1.296],"u4c-1:2":[19.416,0.816],"u4c-1:3":[20.582,1.464],"u4c-1:4":[22.396,2.424],"u4d-1:0":[25.17,1.104],"u4d-1:1":[26.624,1.056],"u4d-1:2":[28.03,1.704],"u4d-1:3":[30.084,0.984],"u4d-1:4":[31.418,1.848]},"u14":{"u14a-1:0":[0,1.008],"u14a-1:1":[1.358,1.296],"u14a-1:2":[3.004,1.368],"u14a-1:3":[4.722,1.824],"u14a-1:4":[6.896,1.776],"u14b-1:0":[9.022,1.608],"u14b-1:1":[10.98,1.704],"u14b-1:2":[13.034,1.608],"u14b-1:3":[14.992,1.656],"u14b-1:4":[16.998,1.584],"u14c-1:0":[18.932,1.944],"u14c-1:1":[21.226,1.176],"u14c-1:2":[22.752,2.016],"u14c-1:3":[25.118,1.656],"u14c-1:4":[27.124,2.256],"u14d-1:0":[29.73,1.704],"u14d-1:1":[31.784,1.176],"u14d-1:2":[33.31,1.728],"u14d-1:3":[35.388,1.608],"u14d-1:4":[37.346,1.368]},"u7":{"u7a-1:0":[0,1.224],"u7a-1:1":[1.574,0.816],"u7a-1:2":[2.74,1.104],"u7a-1:3":[4.194,0.768],"u7a-1:4":[5.312,1.944],"u7b-1:0":[7.606,1.536],"u7b-1:1":[9.492,0.744],"u7b-1:2":[10.586,1.416],"u7b-1:3":[12.352,1.056],"u7b-1:4":[13.758,1.416],"u7c-1:0":[15.524,1.344],"u7c-1:1":[17.218,1.464],"u7c-1:2":[19.032,1.224],"u7c-1:3":[20.606,1.656],"u7c-1:4":[22.612,1.176],"u7d-1:0":[24.138,1.608],"u7d-1:1":[26.096,1.776],"u7d-1:2":[28.222,1.656],"u7d-1:3":[30.228,1.536],"u7d-1:4":[32.114,1.776]},"u16":{"u16a-1:0":[0,1.416],"u16a-1:1":[1.766,1.344],"u16a-1:2":[3.46,0.936],"u16a-1:3":[4.746,1.344],"u16a-1:4":[6.44,1.704],"u16b-1:0":[8.494,1.584],"u16b-1:1":[10.428,1.464],"u16b-1:2":[12.242,0.816],"u16b-1:3":[13.408,0.816],"u16b-1:4":[14.574,0.504],"u16c-1:0":[15.428,1.728],"u16c-1:1":[17.506,1.344],"u16c-1:2":[19.2,1.968],"u16c-1:3":[21.518,2.064],"u16c-1:4":[23.932,1.944],"u16d-1:0":[26.226,2.064],"u16d-1:1":[28.64,1.584],"u16d-1:2":[30.574,1.944],"u16d-1:3":[32.868,2.208],"u16d-1:4":[35.426,1.464]},"u28":{"u28a-1:0":[0,1.656],"u28a-1:1":[2.006,1.344],"u28a-1:2":[3.7,1.728],"u28a-1:3":[5.778,1.536],"u28a-1:4":[7.664,1.656],"u28b-1:0":[9.67,1.248],"u28b-1:1":[11.268,1.104],"u28b-1:2":[12.722,1.416],"u28b-1:3":[14.488,0.528],"u28b-1:4":[15.366,1.656],"u28c-1:0":[17.372,0.528],"u28c-1:1":[18.25,0.768],"u28c-1:2":[19.368,1.464],"u28c-1:3":[21.182,1.656],"u28c-1:4":[23.188,1.176],"u28d-1:0":[24.714,1.656],"u28d-1:1":[26.72,1.416],"u28d-1:2":[28.486,1.584],"u28d-1:3":[30.42,1.368],"u28d-1:4":[32.138,2.664],"u28e-1:0":[35.152,1.656],"u28e-1:1":[37.158,2.376],"u28e-1:2":[39.884,1.344],"u28e-1:3":[41.578,1.416],"u28e-1:4":[43.344,1.368]},"u6":{"u6a-1:0":[0,1.296],"u6a-1:1":[1.646,0.816],"u6a-1:2":[2.812,1.368],"u6a-1:3":[4.53,0.696],"u6a-1:4":[5.576,0.888],"u6b-1:0":[6.814,1.224],"u6b-1:1":[8.388,1.584],"u6b-1:2":[10.322,0.768],"u6b-1:3":[11.44,0.696],"u6b-1:4":[12.486,1.008],"u6c-1:0":[13.844,1.344],"u6c-1:1":[15.538,1.368],"u6c-1:2":[17.256,1.128],"u6c-1:3":[18.734,1.008],"u6c-1:4":[20.092,1.608],"u6d-1:0":[22.05,1.416],"u6d-1:1":[23.816,1.584],"u6d-1:2":[25.75,1.896],"u6d-1:3":[27.996,1.704],"u6d-1:4":[30.05,1.728]},"u30":{"u30a-1:0":[0,1.656],"u30a-1:1":[2.006,1.416],"u30a-1:2":[3.772,1.296],"u30a-1:3":[5.418,1.416],"u30a-1:4":[7.184,1.368],"u30b-1:0":[8.902,1.248],"u30b-1:1":[10.5,1.248],"u30b-1:2":[12.098,1.344],"u30b-1:3":[13.792,1.464],"u30b-1:4":[15.606,1.536],"u30c-1:0":[17.492,1.176],"u30c-1:1":[19.018,1.704],"u30c-1:2":[21.072,1.176],"u30c-1:3":[22.598,1.536],"u30c-1:4":[24.484,1.344],"u30d-1:0":[26.178,2.184],"u30d-1:1":[28.712,1.944],"u30d-1:2":[31.006,2.304],"u30d-1:3":[33.66,1.416],"u30d-1:4":[35.426,1.656]},"u29":{"u29a-1:0":[0,0.504],"u29a-1:1":[0.854,1.344],"u29a-1:2":[2.548,1.104],"u29a-1:3":[4.002,0.624],"u29a-1:4":[4.976,1.344],"u29b-1:0":[6.67,0.624],"u29b-1:1":[7.644,1.368],"u29b-1:2":[9.362,0.648],"u29b-1:3":[10.36,0.768],"u29b-1:4":[11.478,1.128],"u29c-1:0":[12.956,1.488],"u29c-1:1":[14.794,1.488],"u29c-1:2":[16.632,2.256],"u29c-1:3":[19.238,1.896],"u29c-1:4":[21.484,2.064],"u29d-1:0":[23.898,1.224],"u29d-1:1":[25.472,0.936],"u29d-1:2":[26.758,1.296],"u29d-1:3":[28.404,1.296],"u29d-1:4":[30.05,2.136]},"u9":{"u9a-1:0":[0,1.848],"u9a-1:1":[2.198,2.256],"u9a-1:2":[4.804,1.848],"u9a-1:3":[7.002,1.704],"u9a-1:4":[9.056,2.208],"u9b-1:0":[11.614,1.584],"u9b-1:1":[13.548,1.464],"u9b-1:2":[15.362,1.656],"u9b-1:3":[17.368,1.416],"u9b-1:4":[19.134,1.896],"u9c-1:0":[21.38,0.504],"u9c-1:1":[22.234,1.584],"u9c-1:2":[24.168,1.464],"u9c-1:3":[25.982,2.016],"u9c-1:4":[28.348,0.816],"u9d-1:0":[29.514,1.224],"u9d-1:1":[31.088,1.536],"u9d-1:2":[32.974,2.088],"u9d-1:3":[35.412,1.848],"u9d-1:4":[37.61,1.536]},"u31":{"u31a-1:0":[0,0.936],"u31a-1:1":[1.286,1.656],"u31a-1:2":[3.292,0.744],"u31a-1:3":[4.386,1.704],"u31a-1:4":[6.44,1.536],"u31b-1:0":[8.326,1.416],"u31b-1:1":[10.092,1.464],"u31b-1:2":[11.906,1.416],"u31b-1:3":[13.672,0.744],"u31b-1:4":[14.766,1.248],"u31c-1:0":[16.364,1.656],"u31c-1:1":[18.37,1.584],"u31c-1:2":[20.304,1.608],"u31c-1:3":[22.262,2.064],"u31c-1:4":[24.676,1.944],"u31d-1:0":[26.97,1.848],"u31d-1:1":[29.168,1.416],"u31d-1:2":[30.934,1.344],"u31d-1:3":[32.628,1.416],"u31d-1:4":[34.394,1.224],"u31e-1:0":[35.968,1.944],"u31e-1:1":[38.262,1.848],"u31e-1:2":[40.46,1.536],"u31e-1:3":[42.346,1.656],"u31e-1:4":[44.352,2.208]},"u8":{"u8a-1:0":[0,1.416],"u8a-1:1":[1.766,1.464],"u8a-1:2":[3.58,1.536],"u8a-1:3":[5.466,0.576],"u8a-1:4":[6.392,0.696],"u8b-1:0":[7.438,1.848],"u8b-1:1":[9.636,2.424],"u8b-1:2":[12.41,0.864],"u8b-1:3":[13.624,1.584],"u8b-1:4":[15.558,1.416],"u8c-1:0":[17.324,1.704],"u8c-1:1":[19.378,1.536],"u8c-1:2":[21.264,1.848],"u8c-1:3":[23.462,2.064],"u8c-1:4":[25.876,1.416],"u8d-1:0":[27.642,1.464],"u8d-1:1":[29.456,1.848],"u8d-1:2":[31.654,1.416],"u8d-1:3":[33.42,1.248],"u8d-1:4":[35.018,1.728]},"u32":{"u32a-1:0":[0,1.296],"u32a-1:1":[1.646,3.264],"u32a-1:2":[5.26,1.104],"u32a-1:3":[6.714,1.608],"u32a-1:4":[8.672,0.768],"u32b-1:0":[9.79,1.464],"u32b-1:1":[11.604,0.768],"u32b-1:2":[12.722,1.008],"u32b-1:3":[14.08,1.008],"u32b-1:4":[15.438,1.368],"u32c-1:0":[17.156,1.896],"u32c-1:1":[19.402,1.776],"u32c-1:2":[21.528,1.704],"u32c-1:3":[23.582,1.656],"u32c-1:4":[25.588,0.768],"u32d-1:0":[26.706,1.848],"u32d-1:1":[28.904,1.296],"u32d-1:2":[30.55,1.344],"u32d-1:3":[32.244,0.888],"u32d-1:4":[33.482,1.968]},"u33":{"u33a-1:0":[0,1.416],"u33a-1:1":[1.766,1.104],"u33a-1:2":[3.22,1.056],"u33a-1:3":[4.626,1.848],"u33a-1:4":[6.824,1.656],"u33b-1:0":[8.83,0.936],"u33b-1:1":[10.116,2.304],"u33b-1:2":[12.77,0.984],"u33b-1:3":[14.104,1.344],"u33b-1:4":[15.798,0.864],"u33c-1:0":[17.012,2.016],"u33c-1:1":[19.378,1.488],"u33c-1:2":[21.216,2.376],"u33c-1:3":[23.942,1.968],"u33c-1:4":[26.26,1.176],"u33d-1:0":[27.786,1.176],"u33d-1:1":[29.312,1.224],"u33d-1:2":[30.886,1.728],"u33d-1:3":[32.964,1.584],"u33d-1:4":[34.898,1.728],"u33e-1:0":[36.976,1.896],"u33e-1:1":[39.222,1.368],"u33e-1:2":[40.94,1.848],"u33e-1:3":[43.138,1.128],"u33e-1:4":[44.616,1.224]},"u18":{"u18a-1:0":[0,1.296],"u18a-1:1":[1.646,1.824],"u18a-1:2":[3.82,0.936],"u18a-1:3":[5.106,1.008],"u18a-1:4":[6.464,1.416],"u18b-1:0":[8.23,0.408],"u18b-1:1":[8.988,1.416],"u18b-1:2":[10.754,0.744],"u18b-1:3":[11.848,1.104],"u18b-1:4":[13.302,1.128],"u18c-1:0":[14.78,0.576],"u18c-1:1":[15.706,1.176],"u18c-1:2":[17.232,1.224],"u18c-1:3":[18.806,1.584],"u18c-1:4":[20.74,1.728],"u18d-1:0":[22.818,1.296],"u18d-1:1":[24.464,1.656],"u18d-1:2":[26.47,0.816],"u18d-1:3":[27.636,2.304],"u18d-1:4":[30.29,1.728]},"u41":{"u41a-1:0":[0,1.248],"u41a-1:1":[1.598,0.504],"u41a-1:2":[2.452,0.528],"u41a-1:3":[3.33,1.248],"u41a-1:4":[4.928,0.648],"u41b-1:0":[5.926,1.008],"u41b-1:1":[7.284,1.296],"u41b-1:2":[8.93,1.296],"u41b-1:3":[10.576,1.224],"u41b-1:4":[12.15,1.536],"u41c-1:0":[14.036,1.368],"u41c-1:1":[15.754,1.656],"u41c-1:2":[17.76,1.656],"u41c-1:3":[19.766,2.328],"u41c-1:4":[22.444,2.016],"u41d-1:0":[24.81,0.696],"u41d-1:1":[25.856,0.504],"u41d-1:2":[26.71,1.104],"u41d-1:3":[28.164,0.864],"u41d-1:4":[29.378,1.464]},"u34":{"u34a-1:0":[0,1.248],"u34a-1:1":[1.598,1.464],"u34a-1:2":[3.412,1.848],"u34a-1:3":[5.61,0.384],"u34a-1:4":[6.344,0.648],"u34b-1:0":[7.342,0.456],"u34b-1:1":[8.148,1.248],"u34b-1:2":[9.746,1.656],"u34b-1:3":[11.752,1.464],"u34b-1:4":[13.566,1.728],"u34c-1:0":[15.644,0.528],"u34c-1:1":[16.522,1.104],"u34c-1:2":[17.976,0.408],"u34c-1:3":[18.734,1.296],"u34c-1:4":[20.38,1.248],"u34d-1:0":[21.978,1.656],"u34d-1:1":[23.984,1.656],"u34d-1:2":[25.99,2.088],"u34d-1:3":[28.428,1.656],"u34d-1:4":[30.434,1.008],"u34e-1:0":[31.792,1.056],"u34e-1:1":[33.198,1.128],"u34e-1:2":[34.676,1.464],"u34e-1:3":[36.49,1.464],"u34e-1:4":[38.304,1.176]},"u35":{"u35a-1:0":[0,0.696],"u35a-1:1":[1.046,1.656],"u35a-1:2":[3.052,0.888],"u35a-1:3":[4.29,1.008],"u35a-1:4":[5.648,1.728],"u35b-1:0":[7.726,0.408],"u35b-1:1":[8.484,1.296],"u35b-1:2":[10.13,1.344],"u35b-1:3":[11.824,1.224],"u35b-1:4":[13.398,0.528],"u35c-1:0":[14.276,0.984],"u35c-1:1":[15.61,2.256],"u35c-1:2":[18.216,1.824],"u35c-1:3":[20.39,1.656],"u35c-1:4":[22.396,1.704],"u35d-1:0":[24.45,1.416],"u35d-1:1":[26.216,1.488],"u35d-1:2":[28.054,1.296],"u35d-1:3":[29.7,2.376],"u35d-1:4":[32.426,1.584],"u35e-1:0":[34.36,1.848],"u35e-1:1":[36.558,1.848],"u35e-1:2":[38.756,1.104],"u35e-1:3":[40.21,1.344],"u35e-1:4":[41.904,1.536]},"u13":{"u13a-1:0":[0,1.776],"u13a-1:1":[2.126,1.608],"u13a-1:2":[4.084,1.344],"u13a-1:3":[5.778,1.296],"u13a-1:4":[7.424,2.136],"u13b-1:0":[9.91,1.536],"u13b-1:1":[11.796,1.416],"u13b-1:2":[13.562,1.608],"u13b-1:3":[15.52,1.848],"u13b-1:4":[17.718,1.608],"u13c-1:0":[19.676,2.376],"u13c-1:1":[22.402,1.248],"u13c-1:2":[24,2.304],"u13c-1:3":[26.654,2.016],"u13c-1:4":[29.02,2.064],"u13d-1:0":[31.434,1.968],"u13d-1:1":[33.752,1.944],"u13d-1:2":[36.046,1.176],"u13d-1:3":[37.572,1.728],"u13d-1:4":[39.65,1.656]},"u10":{"u10a-1:0":[0,1.896],"u10a-1:1":[2.246,1.656],"u10a-1:2":[4.252,0.888],"u10a-1:3":[5.49,1.488],"u10a-1:4":[7.328,1.584],"u10b-1:0":[9.262,1.416],"u10b-1:1":[11.028,1.776],"u10b-1:2":[13.154,1.344],"u10b-1:3":[14.848,1.176],"u10b-1:4":[16.374,0.888],"u10c-1:0":[17.612,1.248],"u10c-1:1":[19.21,1.368],"u10c-1:2":[20.928,2.424],"u10c-1:3":[23.702,1.776],"u10c-1:4":[25.828,2.136],"u10d-1:0":[28.314,2.448],"u10d-1:1":[31.112,1.488],"u10d-1:2":[32.95,1.416],"u10d-1:3":[34.716,1.896],"u10d-1:4":[36.962,1.296]},"u36":{"u36a-1:0":[0,1.488],"u36a-1:1":[1.838,1.536],"u36a-1:2":[3.724,0.696],"u36a-1:3":[4.77,1.656],"u36a-1:4":[6.776,1.296],"u36b-1:0":[8.422,1.728],"u36b-1:1":[10.5,1.656],"u36b-1:2":[12.506,2.256],"u36b-1:3":[15.112,1.416],"u36b-1:4":[16.878,1.464],"u36c-1:0":[18.692,1.128],"u36c-1:1":[20.17,2.064],"u36c-1:2":[22.584,1.128],"u36c-1:3":[24.062,2.328],"u36c-1:4":[26.74,1.776],"u36d-1:0":[28.866,1.704],"u36d-1:1":[30.92,1.608],"u36d-1:2":[32.878,2.256],"u36d-1:3":[35.484,2.808],"u36d-1:4":[38.642,1.896],"u36e-1:0":[40.888,1.176],"u36e-1:1":[42.414,1.608],"u36e-1:2":[44.372,2.304],"u36e-1:3":[47.026,1.704],"u36e-1:4":[49.08,1.704]},"u37":{"u37a-1:0":[0,1.344],"u37a-1:1":[1.694,0.768],"u37a-1:2":[2.812,0.984],"u37a-1:3":[4.146,1.128],"u37a-1:4":[5.624,1.176],"u37b-1:0":[7.15,1.344],"u37b-1:1":[8.844,2.016],"u37b-1:2":[11.21,1.608],"u37b-1:3":[13.168,0.744],"u37b-1:4":[14.262,0.528],"u37c-1:0":[15.14,1.536],"u37c-1:1":[17.026,1.968],"u37c-1:2":[19.344,1.968],"u37c-1:3":[21.662,1.416],"u37c-1:4":[23.428,1.464],"u37d-1:0":[25.242,1.896],"u37d-1:1":[27.488,1.896],"u37d-1:2":[29.734,1.584],"u37d-1:3":[31.668,1.176],"u37d-1:4":[33.194,1.488]},"u38":{"u38a-1:0":[0,1.824],"u38a-1:1":[2.174,1.416],"u38a-1:2":[3.94,1.464],"u38a-1:3":[5.754,0.816],"u38a-1:4":[6.92,1.656],"u38b-1:0":[8.926,1.224],"u38b-1:1":[10.5,1.728],"u38b-1:2":[12.578,2.016],"u38b-1:3":[14.944,1.176],"u38b-1:4":[16.47,0.696],"u38c-1:0":[17.516,1.608],"u38c-1:1":[19.474,0.984],"u38c-1:2":[20.808,1.368],"u38c-1:3":[22.526,1.296],"u38c-1:4":[24.172,1.488],"u38d-1:0":[26.01,1.584],"u38d-1:1":[27.944,2.256],"u38d-1:2":[30.55,1.488],"u38d-1:3":[32.388,1.776],"u38d-1:4":[34.514,1.416]},"u39":{"u39a-1:0":[0,1.128],"u39a-1:1":[1.478,1.728],"u39a-1:2":[3.556,1.296],"u39a-1:3":[5.202,1.848],"u39a-1:4":[7.4,1.536],"u39b-1:0":[9.286,1.464],"u39b-1:1":[11.1,1.224],"u39b-1:2":[12.674,2.088],"u39b-1:3":[15.112,0.984],"u39b-1:4":[16.446,1.656],"u39c-1:0":[18.452,2.496],"u39c-1:1":[21.298,1.848],"u39c-1:2":[23.496,2.256],"u39c-1:3":[26.102,2.208],"u39c-1:4":[28.66,2.256],"u39d-1:0":[31.266,0.864],"u39d-1:1":[32.48,1.536],"u39d-1:2":[34.366,1.704],"u39d-1:3":[36.42,2.424],"u39d-1:4":[39.194,1.776]},"u11":{"u11a-1:0":[0,0.888],"u11a-1:1":[1.238,1.584],"u11a-1:2":[3.172,0.864],"u11a-1:3":[4.386,1.344],"u11a-1:4":[6.08,1.704],"u11b-1:0":[8.134,1.656],"u11b-1:1":[10.14,1.416],"u11b-1:2":[11.906,1.968],"u11b-1:3":[14.224,1.488],"u11b-1:4":[16.062,1.176],"u11c-1:0":[17.588,1.536],"u11c-1:1":[19.474,1.536],"u11c-1:2":[21.36,1.344],"u11c-1:3":[23.054,0.936],"u11c-1:4":[24.34,1.008],"u11d-1:0":[25.698,1.704],"u11d-1:1":[27.752,1.776],"u11d-1:2":[29.878,1.224],"u11d-1:3":[31.452,1.728],"u11d-1:4":[33.53,1.944]},"u12":{"u12a-1:0":[0,1.344],"u12a-1:1":[1.694,1.968],"u12a-1:2":[4.012,1.536],"u12a-1:3":[5.898,1.584],"u12a-1:4":[7.832,1.656],"u12b-1:0":[9.838,1.656],"u12b-1:1":[11.844,1.848],"u12b-1:2":[14.042,1.368],"u12b-1:3":[15.76,1.464],"u12b-1:4":[17.574,0.888],"u12c-1:0":[18.812,1.464],"u12c-1:1":[20.626,0.648],"u12c-1:2":[21.624,1.128],"u12c-1:3":[23.102,1.656],"u12c-1:4":[25.108,0.504],"u12d-1:0":[25.962,2.664],"u12d-1:1":[28.976,1.896],"u12d-1:2":[31.222,2.208],"u12d-1:3":[33.78,1.944],"u12d-1:4":[36.074,1.128]},"cv2":{"cv2:0":[0,2.016],"cv2:1":[2.366,1.896],"cv2:2":[4.612,2.304],"cv2:3":[7.266,2.136],"cv2:4":[9.752,1.608],"cv2:5":[11.71,1.128],"cv2:6":[13.188,1.056],"cv2:7o0":[14.594,4.128],"cv2:7o0-0":[19.072,1.536],"cv2:7o1":[20.958,1.776],"cv2:7o1-0":[23.084,1.728],"cv2:8":[25.162,2.136],"cv2:9":[27.648,1.728],"cv2:10":[29.726,2.016],"cv2:11":[32.092,1.656],"cv2:12":[34.098,4.944],"cv2:13":[39.392,1.728],"cv2:14":[41.47,1.608]},"cv3":{"cv3:0":[0,2.736],"cv3:1":[3.086,2.304],"cv3:2":[5.74,2.496],"cv3:3":[8.586,2.064],"cv3:4":[11,1.128],"cv3:5":[12.478,1.848],"cv3:6":[14.676,1.008],"cv3:7":[16.034,2.136],"cv3:8":[18.52,1.344],"cv3:9":[20.214,1.416],"cv3:10":[21.98,1.536],"cv3:11":[23.866,1.608],"cv3:12":[25.824,2.424],"cv3:13":[28.598,1.584],"cv3:14":[30.532,2.424],"cv3:15":[33.306,1.416]},"cv4":{"cv4:0":[0,1.704],"cv4:1":[2.054,1.656],"cv4:2":[4.06,1.728],"cv4:3":[6.138,1.656],"cv4:4":[8.144,1.728],"cv4:5":[10.222,0.864],"cv4:6":[11.436,1.728],"cv4:7o0":[13.514,1.416],"cv4:7o0-0":[15.28,1.656],"cv4:7o1":[17.286,4.176],"cv4:7o1-0":[21.812,1.656],"cv4:8":[23.818,1.968],"cv4:9":[26.136,2.976],"cv4:10":[29.462,2.328],"cv4:11":[32.14,1.584],"cv4:12":[34.074,2.088],"cv4:13":[36.512,0.456],"cv4:14":[37.318,2.184],"cv4:15":[39.852,1.296],"cv4:16":[41.498,2.496]},"cv5":{"cv5:0":[0,0.888],"cv5:1":[1.238,2.376],"cv5:2":[3.964,1.296],"cv5:3":[5.61,2.256],"cv5:4":[8.216,2.904],"cv5:5":[11.47,1.728],"cv5:6":[13.548,2.376],"cv5:7":[16.274,1.656],"cv5:8":[18.28,2.016],"cv5:9":[20.646,2.256],"cv5:10":[23.252,1.416],"cv5:11o0":[25.018,0.936],"cv5:11o0-0":[26.304,1.896],"cv5:11o1":[28.55,4.224],"cv5:11o1-0":[33.124,1.944],"cv5:12":[35.418,1.224],"cv5:13":[36.992,1.728]},"cv6":{"cv6:0":[0,1.896],"cv6:1":[2.246,1.704],"cv6:2":[4.3,1.848],"cv6:3":[6.498,5.304],"cv6:4":[12.152,1.584],"cv6:5":[14.086,3.936],"cv6:6":[18.372,1.944],"cv6:7":[20.666,1.104],"cv6:8":[22.12,1.704],"cv6:9":[24.174,1.416],"cv6:10":[25.94,1.296],"cv6:11":[27.586,1.656],"cv6:12":[29.592,1.848],"cv6:13":[31.79,1.296],"cv6:14":[33.436,1.656],"cv6:15":[35.442,1.224]},"cv7":{"cv7:0":[0,1.056],"cv7:1":[1.406,2.016],"cv7:2":[3.772,1.248],"cv7:3":[5.37,2.568],"cv7:4":[8.288,1.488],"cv7:5":[10.126,1.464],"cv7:6":[11.94,1.296],"cv7:7":[13.586,2.016],"cv7:8":[15.952,2.256],"cv7:9":[18.558,1.656],"cv7:10":[20.564,0.816],"cv7:11":[21.73,1.848],"cv7:12":[23.928,1.776],"cv7:13o0":[26.054,1.848],"cv7:13o0-0":[28.252,1.464],"cv7:13o1":[30.066,1.296],"cv7:13o1-0":[31.712,1.344],"cv7:14":[33.406,2.256],"cv7:15":[36.012,1.296]},"cv8":{"cv8:0":[0,1.848],"cv8:1":[2.198,1.728],"cv8:2":[4.276,1.464],"cv8:3o0":[6.09,2.088],"cv8:3o0-0":[8.528,1.728],"cv8:3o1":[10.606,1.656],"cv8:3o1-0":[12.612,1.728],"cv8:4":[14.69,1.848],"cv8:5":[16.888,1.728],"cv8:6":[18.966,1.368],"cv8:7":[20.684,1.776],"cv8:8":[22.81,1.728],"cv8:9":[24.888,1.224],"cv8:10":[26.462,1.944],"cv8:11":[28.756,1.896],"cv8:12":[31.002,1.128],"cv8:13":[32.48,2.256],"cv8:14":[35.086,2.976]},"cv9":{"cv9:0":[0,1.224],"cv9:1":[1.574,1.464],"cv9:2":[3.388,1.704],"cv9:3o0":[5.442,1.656],"cv9:3o0-0":[7.448,1.656],"cv9:3o1":[9.454,1.728],"cv9:3o1-0":[11.532,1.536],"cv9:4":[13.418,1.416],"cv9:5":[15.184,2.544],"cv9:6":[18.078,1.728],"cv9:7":[20.156,2.256],"cv9:8":[22.762,1.896],"cv9:9":[25.008,1.944],"cv9:10":[27.302,1.128],"cv9:11":[28.78,1.296],"cv9:12":[30.426,1.656],"cv9:13":[32.432,2.064],"cv9:14":[34.846,1.704]},"cv10":{"cv10:0":[0,2.616],"cv10:1":[2.966,1.416],"cv10:2":[4.732,1.704],"cv10:3":[6.786,1.968],"cv10:4":[9.104,1.008],"cv10:5":[10.462,1.704],"cv10:6":[12.516,1.224],"cv10:7":[14.09,1.656],"cv10:8":[16.096,1.416],"cv10:9":[17.862,1.944],"cv10:10":[20.156,2.376],"cv10:11":[22.882,2.016],"cv10:12":[25.248,1.896],"cv10:13":[27.494,1.608],"cv10:14":[29.452,1.896],"cv10:15":[31.698,2.568]},"cv11":{"cv11:0":[0,1.056],"cv11:1":[1.406,2.448],"cv11:2":[4.204,2.016],"cv11:3":[6.57,1.776],"cv11:4":[8.696,1.848],"cv11:5":[10.894,2.016],"cv11:6":[13.26,1.728],"cv11:7":[15.338,1.704],"cv11:8":[17.392,3.864],"cv11:9":[21.606,1.416],"cv11:10":[23.372,1.296],"cv11:11":[25.018,2.304],"cv11:12":[27.672,1.944],"cv11:13":[29.966,1.776],"cv11:14":[32.092,1.968],"cv11:15":[34.41,1.704]},"cv12":{"cv12:0":[0,1.128],"cv12:1":[1.478,1.536],"cv12:2":[3.364,1.176],"cv12:3":[4.89,1.656],"cv12:4":[6.896,1.848],"cv12:5":[9.094,1.896],"cv12:6":[11.34,2.304],"cv12:7":[13.994,2.976],"cv12:8":[17.32,1.248],"cv12:9":[18.918,1.704],"cv12:10":[20.972,2.664],"cv12:11":[23.986,2.376],"cv12:12":[26.712,1.704],"cv12:13":[28.766,2.256],"cv12:14":[31.372,1.656],"cv12:15":[33.378,1.416]},"cv13":{"cv13:0":[0,2.616],"cv13:1o0":[2.966,2.064],"cv13:1o0-0":[5.38,1.608],"cv13:1o1":[7.338,1.584],"cv13:1o1-0":[9.272,1.944],"cv13:2":[11.566,1.896],"cv13:3":[13.812,1.728],"cv13:4":[15.89,1.944],"cv13:5":[18.184,2.256],"cv13:6":[20.79,2.184],"cv13:7":[23.324,1.368],"cv13:8":[25.042,1.968],"cv13:9":[27.36,2.424],"cv13:10":[30.134,2.184],"cv13:11":[32.668,1.416],"cv13:12":[34.434,2.016],"cv13:13":[36.8,2.256],"cv13:14":[39.406,2.184],"cv13:15":[41.94,0.816],"cv13:16":[43.106,1.704]},"cv14":{"cv14:0":[0,1.848],"cv14:1":[2.198,1.896],"cv14:2":[4.444,2.736],"cv14:3":[7.53,1.008],"cv14:4":[8.888,1.848],"cv14:5":[11.086,2.016],"cv14:6":[13.452,1.176],"cv14:7":[14.978,1.704],"cv14:8":[17.032,1.464],"cv14:9":[18.846,1.656],"cv14:10":[20.852,1.944],"cv14:11":[23.146,1.704],"cv14:12":[25.2,2.304],"cv14:13":[27.854,1.656],"cv14:14":[29.86,1.416],"cv14:15":[31.626,2.136]},"mk1":{"mk1:1j8bqyj":[0,2.136],"mk1:jtpejt":[2.486,1.248],"mk1:v9qg7o":[4.084,1.536],"mk1:156khiz":[5.97,1.704],"mk1:aif1bs":[8.024,1.368],"mk1:of5ey5":[9.742,2.184],"mk1:13g3lim":[12.276,1.896],"mk1:xx15fs":[14.522,2.208],"mk1:1qlnnbr":[17.08,2.328],"mk1:17as2vk":[19.758,2.088],"mk1:15wlnd7":[22.196,1.944],"mk1:1t0jeb9":[24.49,1.824],"mk1:lor6dv":[26.664,2.424],"mk1:1axlupt":[29.438,1.224],"mk1:hetqr7":[31.012,2.448],"mk1:qh9085":[33.81,2.496],"mk1:zunlmf":[36.656,1.848],"mk1:4075o2":[38.854,1.728],"mk1:d8bjbc":[40.932,2.304],"mk1:r31339":[43.586,2.016],"mk1:15ahe46":[45.952,2.496],"mk1:odelhj":[48.798,2.424],"mk1:1fywn62":[51.572,1.488],"mk1:1hz9wz6":[53.41,2.376],"mk1:10sbp6r":[56.136,3.048],"mk1:5h1mpe":[59.534,2.088]},"mk2":{"mk2:kddstp":[0,3.144],"mk2:32uuni":[3.494,1.896],"mk2:j899z":[5.74,3.264],"mk2:1bug946":[9.354,1.656],"mk2:163b4cp":[11.36,1.488],"mk2:1x9mvzv":[13.198,2.304],"mk2:11z4mmi":[15.852,2.736],"mk2:61k3az":[18.938,1.296],"mk2:uhrhb2":[20.584,1.656],"mk2:v3g9hg":[22.59,2.136]}},"kore":{"cv1":{"cv1:0":[0,1.704],"cv1:2":[2.054,1.416],"cv1:4":[3.82,3.216],"cv1:6":[7.386,1.968],"cv1:8":[9.704,1.344],"cv1:9o0-0":[11.398,1.656],"cv1:9o1-0":[13.404,1.536],"cv1:10":[15.29,1.968],"cv1:18":[17.608,1.968],"cv1:20":[19.926,3.264],"cv1:22":[23.54,2.424]},"cv16":{"cv16:0":[0,1.536],"cv16:1o0-0":[1.886,2.328],"cv16:1o1-0":[4.564,1.656],"cv16:1o2-0":[6.57,3.264],"cv16:2":[10.184,1.536],"cv16:4":[12.07,3.216],"cv16:6":[15.636,5.784],"cv16:8":[21.77,1.848],"cv16:10":[23.968,1.848],"cv16:12":[26.166,2.256],"cv16:16":[28.772,1.464],"cv16:18":[30.586,2.976],"cv16:20":[33.912,2.688],"cv16:22":[36.95,2.328],"cv16:24":[39.628,3.504]},"me2":{"me2:cv1:22~n":[0.0,2.088],"me2:cv16:0~n":[2.438,2.568],"me2:cv10:10~f":[5.356,2.328]},"cv2":{"cv2:0":[0.0,1.728],"cv2:2":[2.078,2.208],"cv2:4":[4.636,1.848],"cv2:6":[6.834,1.728],"cv2:7o0-0":[8.912,1.776],"cv2:7o1-0":[11.038,1.728],"cv2:9":[13.116,2.184],"cv2:11":[15.65,1.536],"cv2:13":[17.536,1.848]},"cv4":{"cv4:0":[0.0,1.416],"cv4:2":[1.766,1.944],"cv4:4":[4.06,1.656],"cv4:6":[6.066,2.136],"cv4:7o0-0":[8.552,1.368],"cv4:7o1-0":[10.27,1.584],"cv4:9":[12.204,3.864],"cv4:11":[16.418,1.584],"cv4:13":[18.352,0.456],"cv4:15":[19.158,2.424]},"cv6":{"cv6:0":[0.0,2.736],"cv6:2":[3.086,1.728],"cv6:4":[5.164,1.464],"cv6:6":[6.978,1.584],"cv6:8":[8.912,2.088],"cv6:10":[11.35,0.456],"cv6:12":[12.156,1.296],"cv6:14":[13.802,1.176]},"cv7":{"cv7:0":[0.0,1.776],"cv7:2":[2.126,1.296],"cv7:4":[3.772,1.608],"cv7:6":[5.73,1.344],"cv7:8":[7.424,2.496],"cv7:10":[10.27,1.656],"cv7:12":[12.276,1.656],"cv7:13o0-0":[14.282,1.704],"cv7:13o1-0":[16.336,1.728],"cv7:15":[18.414,2.424]},"cv9":{"cv9:0":[0.0,2.424],"cv9:2":[2.774,1.824],"cv9:3o0-0":[4.948,1.296],"cv9:3o1-0":[6.594,1.368],"cv9:5":[8.312,3.024],"cv9:7":[11.686,1.536],"cv9:9":[13.572,2.496],"cv9:11":[16.418,1.704],"cv9:13":[18.472,2.064]},"cv10":{"cv10:0":[0.0,1.824],"cv10:2":[2.174,1.968],"cv10:4":[4.492,1.704],"cv10:6":[6.546,1.776],"cv10:8":[8.672,1.464],"cv10:10":[10.486,2.304],"cv10:12":[13.14,1.488],"cv10:14":[14.978,1.704]},"cv11":{"cv11:0":[0.0,1.944],"cv11:2":[2.294,2.088],"cv11:4":[4.732,1.776],"cv11:6":[6.858,2.256],"cv11:8":[9.464,2.328],"cv11:10":[12.142,1.224],"cv11:12":[13.716,1.296],"cv11:14":[15.362,2.304]},"cv12":{"cv12:0":[0.0,1.176],"cv12:2":[1.526,2.136],"cv12:4":[4.012,1.248],"cv12:6":[5.61,1.656],"cv12:8":[7.616,2.424],"cv12:10":[10.39,3.408],"cv12:12":[14.148,2.208],"cv12:14":[16.706,1.416]},"cv13":{"cv13:0":[0.0,2.856],"cv13:1o0-0":[3.206,1.728],"cv13:1o1-0":[5.284,1.584],"cv13:3":[7.218,1.416],"cv13:5":[8.984,3.264],"cv13:7":[12.598,1.584],"cv13:9":[14.532,2.568],"cv13:11":[17.45,1.656],"cv13:13":[19.456,2.064],"cv13:15":[21.87,1.488]},"cv14":{"cv14:0":[0.0,1.488],"cv14:2":[1.838,2.328],"cv14:4":[4.516,1.536],"cv14:6":[6.402,1.824],"cv14:8":[8.576,1.704],"cv14:10":[10.63,1.608],"cv14:12":[12.588,2.736],"cv14:14":[15.674,1.584]}},"orus":{"cv1":{"cv1:1":[0,1.536],"cv1:3":[1.886,1.344],"cv1:5":[3.58,1.656],"cv1:7":[5.586,1.248],"cv1:9o0":[7.184,1.128],"cv1:9o1":[8.662,2.856],"cv1:11":[11.868,2.136],"cv1:14":[14.354,2.016],"cv1:16":[16.72,1.728],"cv1:19":[18.798,1.656],"cv1:21":[20.804,2.256],"cv1:23":[23.41,1.224]},"cv16":{"cv16:1o0":[0,1.896],"cv16:1o1":[2.246,2.544],"cv16:1o2":[5.14,2.616],"cv16:3":[8.106,3.024],"cv16:5":[11.48,2.424],"cv16:7":[14.254,1.776],"cv16:9":[16.38,2.304],"cv16:11":[19.034,1.968],"cv16:13":[21.352,2.544],"cv16:15":[24.246,1.704],"cv16:17":[26.3,1.896],"cv16:19":[28.546,2.208],"cv16:21":[31.104,2.664],"cv16:23":[34.118,1.488],"cv16:25":[35.956,2.568]},"cv2":{"cv2:1":[0.0,2.448],"cv2:3":[2.798,1.824],"cv2:5":[4.972,2.664],"cv2:7o0":[7.986,2.664],"cv2:7o1":[11.0,2.424],"cv2:8":[13.774,2.424],"cv2:10":[16.548,1.776],"cv2:12":[18.674,3.936],"cv2:14":[22.96,0.984]},"cv3":{"cv3:1":[0.0,2.544],"cv3:3":[2.894,1.848],"cv3:5":[5.092,1.824],"cv3:7":[7.266,1.704],"cv3:9":[9.32,1.776],"cv3:11":[11.446,1.296],"cv3:13":[13.092,1.536],"cv3:15":[14.978,1.248]},"cv4":{"cv4:1":[0.0,2.184],"cv4:3":[2.534,2.208],"cv4:5":[5.092,1.848],"cv4:7o0":[7.29,1.536],"cv4:7o1":[9.176,2.664],"cv4:8":[12.19,2.016],"cv4:10":[14.556,2.064],"cv4:12":[16.97,1.656],"cv4:14":[18.976,1.896],"cv4:16":[21.222,2.424]},"cv5":{"cv5:1":[0.0,2.136],"cv5:3":[2.486,1.848],"cv5:5":[4.684,1.944],"cv5:7":[6.978,1.296],"cv5:9":[8.624,2.304],"cv5:11o0":[11.278,1.416],"cv5:11o1":[13.044,4.584],"cv5:12":[17.978,1.344]},"cv6":{"cv6:1":[0.0,2.328],"cv6:3":[2.678,2.976],"cv6:5":[6.004,2.424],"cv6:7":[8.778,1.704],"cv6:9":[10.832,1.608],"cv6:11":[12.79,1.416],"cv6:13":[14.556,1.488],"cv6:15":[16.394,1.248]},"cv7":{"cv7:1":[0.0,2.424],"cv7:3":[2.774,1.728],"cv7:5":[4.852,1.416],"cv7:7":[6.618,1.704],"cv7:9":[8.672,1.344],"cv7:11":[10.366,1.248],"cv7:13o0":[11.964,1.224],"cv7:13o1":[13.538,2.304],"cv7:14":[16.192,2.376]},"cv8":{"cv8:1":[0.0,1.608],"cv8:3o0":[1.958,1.728],"cv8:3o1":[4.036,1.944],"cv8:4":[6.33,1.536],"cv8:6":[8.216,1.248],"cv8:8":[9.814,1.344],"cv8:10":[11.508,1.656],"cv8:12":[13.514,2.136],"cv8:14":[16.0,2.904]},"cv9":{"cv9:1":[0.0,1.344],"cv9:3o0":[1.694,1.848],"cv9:3o1":[3.892,2.376],"cv9:4":[6.618,1.176],"cv9:6":[8.144,2.016],"cv9:8":[10.51,1.416],"cv9:10":[12.276,1.008],"cv9:12":[13.634,1.536],"cv9:14":[15.52,2.256]},"cv10":{"cv10:1":[0.0,1.488],"cv10:3":[1.838,1.848],"cv10:5":[4.036,2.256],"cv10:7":[6.642,1.176],"cv10:9":[8.168,2.448],"cv10:11":[10.966,1.584],"cv10:13":[12.9,1.248],"cv10:15":[14.498,2.424]},"cv11":{"cv11:1":[0.0,1.968],"cv11:3":[2.318,1.584],"cv11:5":[4.252,2.208],"cv11:7":[6.81,1.608],"cv11:9":[8.768,1.416],"cv11:11":[10.534,1.704],"cv11:13":[12.588,1.968],"cv11:15":[14.906,1.536]},"cv12":{"cv12:1":[0.0,1.416],"cv12:3":[1.766,2.256],"cv12:5":[4.372,1.104],"cv12:7":[5.826,2.928],"cv12:9":[9.104,1.656],"cv12:11":[11.11,2.328],"cv12:13":[13.788,2.256],"cv12:15":[16.394,1.944]},"cv13":{"cv13:1o0":[0.0,1.128],"cv13:1o1":[1.478,1.488],"cv13:2":[3.316,2.544],"cv13:4":[6.21,2.448],"cv13:6":[9.008,2.136],"cv13:8":[11.494,2.136],"cv13:10":[13.98,1.368],"cv13:12":[15.698,2.256],"cv13:14":[18.304,1.536],"cv13:16":[20.19,1.536]},"cv14":{"cv14:1":[0.0,1.776],"cv14:3":[2.126,2.256],"cv14:5":[4.732,1.848],"cv14:7":[6.93,1.224],"cv14:9":[8.504,1.584],"cv14:11":[10.438,1.296],"cv14:13":[12.084,2.136],"cv14:15":[14.57,2.616]},"me2":{"me2:cv2:7o1~f":[0.0,2.328],"me2:cv8:1~f":[2.678,1.416],"me2:cv12:1~f":[4.444,1.536],"me2:cv12:13~f":[6.33,2.976]}},"despina":{"cv1":{"cv1:1":[0,0.888],"cv1:3":[1.238,1.728],"cv1:5":[3.316,1.656],"cv1:7":[5.322,1.008],"cv1:9o0":[6.68,1.776],"cv1:9o1":[8.806,2.136],"cv1:11":[11.292,1.944],"cv1:14":[13.586,1.728],"cv1:16":[15.664,0.936],"cv1:19":[16.95,1.608],"cv1:21":[18.908,2.616],"cv1:23":[21.874,1.584]},"cv16":{"cv16:1o0":[0,2.424],"cv16:1o1":[2.774,2.376],"cv16:1o2":[5.5,2.928],"cv16:3":[8.778,2.424],"cv16:5":[11.552,2.304],"cv16:7":[14.206,1.728],"cv16:9":[16.284,2.016],"cv16:11":[18.65,1.704],"cv16:13":[20.704,2.664],"cv16:15":[23.718,1.944],"cv16:17":[26.012,1.704],"cv16:19":[28.066,1.608],"cv16:21":[30.024,1.656],"cv16:23":[32.03,1.824],"cv16:25":[34.204,2.136]},"cv2":{"cv2:1":[0.0,2.088],"cv2:3":[2.438,2.088],"cv2:5":[4.876,1.488],"cv2:7o0":[6.714,3.144],"cv2:7o1":[10.208,2.328],"cv2:8":[12.886,1.536],"cv2:10":[14.772,2.256],"cv2:12":[17.378,2.496],"cv2:14":[20.224,1.416]},"cv3":{"cv3:1":[0.0,2.208],"cv3:3":[2.558,0.936],"cv3:5":[3.844,1.968],"cv3:7":[6.162,2.256],"cv3:9":[8.768,1.464],"cv3:11":[10.582,1.416],"cv3:13":[12.348,1.704],"cv3:15":[14.402,1.488]},"cv4":{"cv4:1":[0.0,1.944],"cv4:3":[2.294,1.704],"cv4:5":[4.348,0.984],"cv4:7o0":[5.682,1.896],"cv4:7o1":[7.928,2.376],"cv4:8":[10.654,2.184],"cv4:10":[13.188,2.136],"cv4:12":[15.674,1.896],"cv4:14":[17.92,1.536],"cv4:16":[19.806,1.656]},"cv5":{"cv5:1":[0.0,2.808],"cv5:3":[3.158,1.848],"cv5:5":[5.356,1.128],"cv5:7":[6.834,1.344],"cv5:9":[8.528,2.616],"cv5:11o0":[11.494,0.888],"cv5:11o1":[12.732,2.184],"cv5:12":[15.266,1.224]},"cv6":{"cv6:1":[0.0,1.704],"cv6:3":[2.054,2.304],"cv6:5":[4.708,1.824],"cv6:7":[6.882,1.176],"cv6:9":[8.408,1.128],"cv6:11":[9.886,1.176],"cv6:13":[11.412,0.744],"cv6:15":[12.506,1.296]},"cv7":{"cv7:1":[0.0,2.016],"cv7:3":[2.366,1.536],"cv7:5":[4.252,1.656],"cv7:7":[6.258,0.816],"cv7:9":[7.424,1.104],"cv7:11":[8.878,1.488],"cv7:13o0":[10.716,1.104],"cv7:13o1":[12.17,1.416],"cv7:14":[13.936,2.256]},"cv8":{"cv8:1":[0.0,1.848],"cv8:3o0":[2.198,1.896],"cv8:3o1":[4.444,1.776],"cv8:4":[6.57,1.416],"cv8:6":[8.336,1.776],"cv8:8":[10.462,1.416],"cv8:10":[12.228,1.944],"cv8:12":[14.522,1.848],"cv8:14":[16.72,2.904]},"cv9":{"cv9:1":[0.0,1.704],"cv9:3o0":[2.054,1.008],"cv9:3o1":[3.412,1.824],"cv9:4":[5.586,1.368],"cv9:6":[7.304,1.416],"cv9:8":[9.07,1.656],"cv9:10":[11.076,1.104],"cv9:12":[12.53,0.816],"cv9:14":[13.696,1.056]},"cv10":{"cv10:1":[0.0,1.656],"cv10:3":[2.006,1.488],"cv10:5":[3.844,2.328],"cv10:7":[6.522,0.936],"cv10:9":[7.808,1.728],"cv10:11":[9.886,1.704],"cv10:13":[11.94,1.416],"cv10:15":[13.706,1.704]},"cv11":{"cv11:1":[0.0,2.088],"cv11:3":[2.438,1.176],"cv11:5":[3.964,1.488],"cv11:7":[5.802,1.464],"cv11:9":[7.616,1.416],"cv11:11":[9.382,1.776],"cv11:13":[11.508,1.368],"cv11:15":[13.226,1.128]},"cv12":{"cv12:1":[0.0,1.536],"cv12:3":[1.886,1.896],"cv12:5":[4.132,1.536],"cv12:7":[6.018,2.496],"cv12:9":[8.864,1.416],"cv12:11":[10.63,2.256],"cv12:13":[13.236,1.968],"cv12:15":[15.554,1.896]},"cv13":{"cv13:1o0":[0.0,1.464],"cv13:1o1":[1.814,1.656],"cv13:2":[3.82,1.824],"cv13:4":[5.994,1.824],"cv13:6":[8.168,1.416],"cv13:8":[9.934,1.608],"cv13:10":[11.892,2.088],"cv13:12":[14.33,2.424],"cv13:14":[17.104,1.536],"cv13:16":[18.99,1.224]},"cv14":{"cv14:1":[0.0,1.368],"cv14:3":[1.718,2.088],"cv14:5":[4.156,1.776],"cv14:7":[6.282,1.008],"cv14:9":[7.64,1.704],"cv14:11":[9.694,1.704],"cv14:13":[11.748,1.776],"cv14:15":[13.874,2.496]},"me2":{"me2:cv2:7o1~f":[0.0,2.016],"me2:cv8:1~f":[2.366,1.776],"me2:cv12:1~f":[4.492,1.848],"me2:cv12:13~f":[6.69,2.448]}},"charon":{"cv1":{"cv1:13":[0,2.496],"cv1:15":[2.846,2.136]},"cv3":{"cv3:0":[0.0,2.784],"cv3:2":[3.134,2.544],"cv3:4":[6.028,1.896],"cv3:6":[8.274,2.088],"cv3:8":[10.712,1.368],"cv3:10":[12.43,1.704],"cv3:12":[14.484,2.016],"cv3:14":[16.85,2.256]},"cv5":{"cv5:0":[0.0,1.416],"cv5:2":[1.766,1.248],"cv5:4":[3.364,4.344],"cv5:6":[8.058,2.928],"cv5:8":[11.336,1.968],"cv5:10":[13.654,1.848],"cv5:11o0-0":[15.852,1.656],"cv5:11o1-0":[17.858,1.224],"cv5:13":[19.432,1.008]},"cv8":{"cv8:0":[0.0,1.968],"cv8:2":[2.318,1.176],"cv8:3o0-0":[3.844,2.184],"cv8:3o1-0":[6.378,1.728],"cv8:5":[8.456,1.656],"cv8:7":[10.462,2.256],"cv8:9":[13.068,1.704],"cv8:11":[15.122,1.944],"cv8:13":[17.416,1.704]}}};

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

// BEGIN SPANISH SKILLS
CANDO.push(...[
  [
    "es-u22",
    "💬",
    "being and location",
    [
      "u22a",
      "u22b",
      "u22c",
      "u22d",
      "u22e"
    ],
    "cv2"
  ],
  [
    "es-u23",
    "💬",
    "everyday verbs",
    [
      "u23a",
      "u23b",
      "u23c",
      "u23d",
      "u23e",
      "u23f"
    ],
    "cv2"
  ],
  [
    "es-u24",
    "💬",
    "asking questions",
    [
      "u24a",
      "u24b",
      "u24c",
      "u24d"
    ],
    "cv2"
  ],
  [
    "es-u25",
    "💬",
    "talking about yourself",
    [
      "u25a",
      "u25b",
      "u25c",
      "u25d"
    ],
    "cv2"
  ],
  [
    "es-u2",
    "💬",
    "numbers",
    [
      "u2a",
      "u2b",
      "u2c",
      "u2d",
      "u2e",
      "u2f",
      "u2g"
    ],
    "cv3"
  ],
  [
    "es-u5",
    "💬",
    "days and time",
    [
      "u5a",
      "u5b",
      "u5c",
      "u5d"
    ],
    "cv3"
  ],
  [
    "es-u26",
    "💬",
    "my day",
    [
      "u26a",
      "u26b",
      "u26c",
      "u26d",
      "u26e"
    ],
    "cv3"
  ],
  [
    "es-u3",
    "💬",
    "food and drink",
    [
      "u3a",
      "u3b",
      "u3c",
      "u3d"
    ],
    "cv4"
  ],
  [
    "es-u15",
    "💬",
    "at the restaurant",
    [
      "u15a",
      "u15b",
      "u15c",
      "u15d"
    ],
    "cv4"
  ],
  [
    "es-u4",
    "💬",
    "around town",
    [
      "u4a",
      "u4b",
      "u4c",
      "u4d"
    ],
    "cv5"
  ],
  [
    "es-u14",
    "💬",
    "directions",
    [
      "u14a",
      "u14b",
      "u14c",
      "u14d"
    ],
    "cv5"
  ],
  [
    "es-u7",
    "💬",
    "transport",
    [
      "u7a",
      "u7b",
      "u7c",
      "u7d"
    ],
    "cv6"
  ],
  [
    "es-u16",
    "💬",
    "shopping",
    [
      "u16a",
      "u16b",
      "u16c",
      "u16d"
    ],
    "cv6"
  ],
  [
    "es-u28",
    "💬",
    "clothes and colours",
    [
      "u28a",
      "u28b",
      "u28c",
      "u28d",
      "u28e"
    ],
    "cv7"
  ],
  [
    "es-u6",
    "💬",
    "family",
    [
      "u6a",
      "u6b",
      "u6c",
      "u6d"
    ],
    "cv8"
  ],
  [
    "es-u30",
    "💬",
    "at home",
    [
      "u30a",
      "u30b",
      "u30c",
      "u30d"
    ],
    "cv8"
  ],
  [
    "es-u29",
    "💬",
    "describing people and things",
    [
      "u29a",
      "u29b",
      "u29c",
      "u29d"
    ],
    "cv8"
  ],
  [
    "es-u9",
    "💬",
    "feelings and weather",
    [
      "u9a",
      "u9b",
      "u9c",
      "u9d"
    ],
    "cv8"
  ],
  [
    "es-u31",
    "💬",
    "work and jobs",
    [
      "u31a",
      "u31b",
      "u31c",
      "u31d",
      "u31e"
    ],
    "cv8"
  ],
  [
    "es-u8",
    "💬",
    "free time",
    [
      "u8a",
      "u8b",
      "u8c",
      "u8d"
    ],
    "cv9"
  ],
  [
    "es-u32",
    "💬",
    "can, must and need",
    [
      "u32a",
      "u32b",
      "u32c",
      "u32d"
    ],
    "cv9"
  ],
  [
    "es-u33",
    "💬",
    "making plans",
    [
      "u33a",
      "u33b",
      "u33c",
      "u33d",
      "u33e"
    ],
    "cv9"
  ],
  [
    "es-u18",
    "💬",
    "seasons and dates",
    [
      "u18a",
      "u18b",
      "u18c",
      "u18d"
    ],
    "cv9"
  ],
  [
    "es-u41",
    "💬",
    "joining ideas",
    [
      "u41a",
      "u41b",
      "u41c",
      "u41d"
    ],
    "cv10"
  ],
  [
    "es-u34",
    "💬",
    "yesterday",
    [
      "u34a",
      "u34b",
      "u34c",
      "u34d",
      "u34e"
    ],
    "cv10"
  ],
  [
    "es-u35",
    "💬",
    "telling a story",
    [
      "u35a",
      "u35b",
      "u35c",
      "u35d",
      "u35e"
    ],
    "cv10"
  ],
  [
    "es-u13",
    "💬",
    "at the hotel",
    [
      "u13a",
      "u13b",
      "u13c",
      "u13d"
    ],
    "cv11"
  ],
  [
    "es-u10",
    "💬",
    "travel",
    [
      "u10a",
      "u10b",
      "u10c",
      "u10d"
    ],
    "cv12"
  ],
  [
    "es-u36",
    "💬",
    "health and getting help",
    [
      "u36a",
      "u36b",
      "u36c",
      "u36d",
      "u36e"
    ],
    "cv12"
  ],
  [
    "es-u37",
    "💬",
    "opinions",
    [
      "u37a",
      "u37b",
      "u37c",
      "u37d"
    ],
    "cv14"
  ],
  [
    "es-u38",
    "💬",
    "keep the conversation going",
    [
      "u38a",
      "u38b",
      "u38c",
      "u38d"
    ],
    "cv14"
  ],
  [
    "es-u39",
    "💬",
    "messages and practical requests",
    [
      "u39a",
      "u39b",
      "u39c",
      "u39d"
    ],
    "cv14"
  ],
  [
    "es-u11",
    "💬",
    "animals",
    [
      "u11a",
      "u11b",
      "u11c",
      "u11d"
    ],
    "cv13"
  ],
  [
    "es-u12",
    "💬",
    "culture and everyday mexico",
    [
      "u12a",
      "u12b",
      "u12c",
      "u12d"
    ],
    "cv13"
  ]
]);
// END SPANISH SKILLS
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
