/* Practical tasks use exact course cards, bound to the learner's personalised forms. */
(()=>{
'use strict';
if(!window.WordamiActivities||LANG.code!=='lt')return;
const choice=(value,label)=>({value,label});
const read=(prompt,lines,options,answer)=>({skill:'reading',prompt,lines,options,answer});
const listen=(prompt,audio,options,answer)=>({skill:'listening',prompt,audio,options,answer});
const write=(prompt,accept,policy='one')=>({skill:'writing',prompt,accept,policy});
window.WordamiTopicContent=[
 {id:'first-meeting',objective:'introduce-yourself',title:'Unit 1 · A first meeting',brief:'Greet someone, recognise a name and introduce yourself.',
 sources:{hello:'Labas',morning:'Labas rytas',evening:'Labas vakaras',name:'Mano vardas Tomas',ask:'Koks tavo vardas?',bye:'Iki'},speech:'name',
 build:v=>[
  read('You meet someone '+(v?'in the evening':'in the morning')+'. What does this greeting mean?',[v?'evening':'morning'],[choice('morning','Good morning'),choice('evening','Good evening')],v?'evening':'morning'),
  read('What does the speaker tell you?',['name'],[choice('name','Their name'),choice('goodbye','They are leaving')],'name'),
  listen('What is the speaker asking?', 'ask',[choice('name','Your name'),choice('feeling','How you are')],'name'),
  listen('Is the speaker greeting you or saying goodbye?',v?'bye':'hello',[choice('hello','Greeting you'),choice('bye','Saying goodbye')],v?'bye':'hello'),
  write('You meet a new friend. Write the informal word for “Hello”.',['hello']),
  write('They ask your name. Introduce yourself with “My name is …”, using the name in your course.',['name'])
 ]},
 {id:'small-talk',objective:'keep-a-conversation-going',title:'Unit 2 · Keep a conversation going',brief:'Respond to a greeting and ask a friend to repeat something.',
 sources:{fine:'Gerai, ačiū',so:'Taip sau',nothing:'Nieko ypatingo',upto:'Ką veiki?',repeat:'Ar gali pakartoti?',understand:'Aš nelabai suprantu',got:'Supratau'},speech:'repeat',
 build:v=>[
  read('Your friend asks how you are. What does this reply mean?',[v?'so':'fine'],[choice('fine','Fine, thanks'),choice('so','So-so')],v?'so':'fine'),
  read('Your friend asks what you are up to. What are you telling them?',['nothing'],[choice('nothing','Nothing special'),choice('repeat','Please repeat that')],'nothing'),
  listen('What does your friend want to know?','upto',[choice('activity','What you are up to'),choice('name','Your name')],'activity'),
  listen('What does the speaker need?',v?'repeat':'understand',[choice('help',v?'You to repeat something':'Help understanding'),choice('bye','To say goodbye')],'help'),
  write('Tell your friend “I don’t quite understand”, using the phrase you learned.',['understand']),
  write('Ask your friend “Can you repeat that?”, using the phrase you learned.',['repeat'])
 ]},
 {id:'food-order',objective:'order-and-ask-for-the-bill',title:'Unit 3 · Your café order',brief:'Read a simple menu, understand an order, then order a drink and ask for the bill.',
 sources:{menu:'meniu',coffee:'kava',tea:'arbata',coffeeOrder:'Aš noriu kavos',teaOrder:'Aš noriu arbatos',bill:'Sąskaitą, prašau'},speech:'coffeeOrder',
 build:v=>[
  read('Which of these menu words means '+(v?'coffee':'tea')+'?',['menu','coffee','tea'],[choice('coffee','kava'),choice('tea','arbata')],v?'coffee':'tea'),
  read('Which drink does the customer want?',[v?'teaOrder':'coffeeOrder'],[choice('coffee','Coffee'),choice('tea','Tea')],v?'tea':'coffee'),
  listen('Which drink does the customer want?',v?'coffeeOrder':'teaOrder',[choice('coffee','Coffee'),choice('tea','Tea')],v?'coffee':'tea'),
  listen('What is the customer asking for?','bill',[choice('bill','The bill'),choice('tea','Tea')],'bill'),
  write('Order '+(v?'tea':'coffee')+' using the “I want …” phrase you learned.',[v?'teaOrder':'coffeeOrder']),
  write('You have finished your drink. Ask for the bill, please.',['bill'])
 ]}
];
})();
