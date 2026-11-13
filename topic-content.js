/* Reviewed-course source phrases only. These task proposals still need educator review. */
(()=>{
'use strict';
if(!window.WordamiActivities||!['lt','es'].includes(LANG.code))return;
const lt=LANG.code==='lt';
const read=(prompt,lines,options,answer,extra={})=>({skill:'reading',prompt,lines,options,answer,...extra});
const hear=(audio,options,answer)=>({skill:'listening',prompt:'Listen, then choose the detail you hear.',audio,options,answer});
const write=(prompt,accept,policy='one')=>({skill:'writing',prompt,accept,policy});
const option=(value,label)=>({value,label});
const pair=(a,b)=>[option('a',a),option('b',b)];
const topics=[];
topics.push({id:'routines',objective:'daily-routine',title:'A day in your life',brief:'Read a short diary, listen for daily activities, then describe a practice day in your own choice of learned sentences.',
 sources:lt?{up:'Aš keliuosi septintą valandą',breakfast:'Aš pusryčiauju',work:'Aš einu į darbą',bed:'Aš einu miegoti'}:{up:'Me levanto temprano',breakfast:'Desayuno a las ocho',work:'Voy al trabajo',bed:'Me acuesto tarde'},
 build(v){const early=v?'breakfast':'up',late=v?'bed':'work';return [
 read('Which activity comes first in this diary?',[early,late],pair(v?'Breakfast':'Getting up',v?'Going to bed':'Going to work'),'a'),
 read('Which activity is described at the end?',[early,late],pair(v?'Breakfast':'Getting up',v?'Going to bed':'Going to work'),'b'),
 hear(early,pair(v?'Breakfast':'Getting up',v?'Going to bed':'Going to work'),'a'),hear(late,pair(v?'Breakfast':'Getting up',v?'Going to bed':'Going to work'),'b'),
 write('Describe a practice day. Write two different sentences from the routines you have learned, one per line. Choose activities that suit your practice day.',['up','breakfast','work','bed'],'any-two'),
 write(v?(lt?'A friend asks about your evening. Say you go to bed.':'A friend asks about bedtime. Say you go to bed late.'):lt?'A friend asks when you get up. Say you get up at seven.':'A friend asks when you get up. Say you get up early.',[v?'bed':'up'])];},speech:'up'});
topics.push({id:'directions',objective:'places-directions',title:'Find your way',brief:'You are facing north at a junction. Read a direction, find the building, then ask for help and give a short route.',
 sources:lt?{left:'kairėn',right:'dešinėn',straight:'tiesiai',ask:'Kur yra stotis?'}:{left:'a la izquierda',right:'a la derecha',straight:'derecho',ask:'¿Dónde está el museo?'},
 build(v){const turn=v?'right':'left',dest=lt?'station':'museum';return [
 read('You face north at the junction. Follow the sign. Which building do you reach?',[turn],[option('left','Library · west'),option('right','Shop · east')],turn,{map:true}),
 read('Which place is this person trying to find?',['ask'],pair(dest==='station'?'The station':'The museum','The café'),'a'),
 hear(turn,[option('left','Turn left'),option('right','Turn right')],turn),hear('straight',pair('Go straight ahead','Turn back'),'a'),
 write('Ask where the '+dest+' is.',['ask']),write('Write this route as two instructions, one per line: '+(v?'right':'left')+', then straight ahead.',[turn,'straight'],'in-order')];},speech:'ask'});
topics.push({id:'messages',objective:'simple-arrangement',title:'Reply to an invitation',brief:'A friend sends an invitation. Find the meeting details, listen for a time, then write a reply that accepts or declines.',
 sources:lt?{invite:'Ar nori eiti kartu?',place:'Prie kavinės',timeA:'Septintą valandą',timeB:'Aštuntą valandą',yes:'Taip, noriu',no:'Šiandien negaliu',ask:'Kelintą valandą?'}:{invite:'¿Vamos al cine?',place:'Nos vemos en el parque',timeA:'A las seis',timeB:'a las ocho',yes:'Sí, puedo',no:'No puedo, tengo que trabajar',ask:'¿A qué hora?'},
 build(v){const time=v?'timeB':'timeA',other=v?'timeA':'timeB',a=lt?'7:00':'6:00',b='8:00';return [
 read('Where does this message say to meet?',['invite','place',time],pair(lt?'By the café':'In the park','At the station'),'a',{document:'Message from a friend'}),
 read('What meeting time is given?',['place',time],pair(a,b),v?'b':'a',{document:'Meeting details'}),
 hear(time,pair(a,b),v?'b':'a'),hear(other,pair(a,b),v?'a':'b'),
 write('Reply to the invitation. You may accept or decline using a phrase you have learned. Both choices are valid.',['yes','no']),
 write('A second invitation has no meeting time. Ask what time.',['ask'])];},speech:'ask'});
topics.push({id:'prices',objective:'numbers-prices',title:'Check a price',brief:'Read two price labels, listen to amounts, and ask about a price or quantity.',
 sources:lt?{low:'du eurai',high:'dešimt eurų',ask:'Kiek kainuoja?',two:'du',three:'trys'}:{low:'veinte',high:'treinta',ask:'¿Cuánto cuesta?',two:'dos',three:'tres'},
 build(v){const key=v?'high':'low',a=lt?'€2':'20',b=lt?'€10':'30';return [
 read('What amount is on this price label?',[key],pair(a,b),v?'b':'a',{document:lt?'Price in euros':'Price in pesos'}),
 read('Which quantity is written on this order?',[v?'three':'two'],pair('2 items','3 items'),v?'b':'a',{document:'Order quantity'}),
 hear(key,pair(a,b),v?'b':'a'),hear(v?'two':'three',pair('2 items','3 items'),v?'a':'b'),
 write('You cannot see a price. Ask how much it costs.',['ask']),write('Write the number of items requested: '+(v?'three':'two')+'.',[v?'three':'two'])];},speech:'ask'});
topics.push({id:'times',objective:'times-dates',title:'Read a simple schedule',brief:'Find a day and time in a simple schedule, check what you hear, then ask about the time.',
 sources:lt?{dayA:'pirmadienis',dayB:'antradienis',timeA:'Septintą valandą',timeB:'Aštuntą valandą',ask:'Kelintą valandą?'}:{dayA:'lunes',dayB:'martes',timeA:'A las seis',timeB:'a las ocho',ask:'¿A qué hora?'},
 build(v){const day=v?'dayB':'dayA',time=v?'timeB':'timeA';return [
 read('Which day is shown?',[day,time],pair('Monday','Tuesday'),v?'b':'a',{document:'Your appointment'}),
 read('What time is shown?',[day,time],pair(lt?'7:00':'6:00','8:00'),v?'b':'a',{document:'Your appointment'}),
 hear(day,pair('Monday','Tuesday'),v?'b':'a'),hear(time,pair(lt?'7:00':'6:00','8:00'),v?'b':'a'),
 write('The invitation has a day but no time. Ask what time.',['ask']),write('Reply with the day and time from the appointment, one per line.',[day,time],'in-order')];},speech:'ask'});
topics.push({id:'family',objective:'family-description',title:'Talk about family',brief:'Read a short family profile and describe a practice family using familiar sentences.',
 sources:lt?{relative:'Aš turiu brolį',children:'Aš turiu du vaikus',ask:'Ar turi vaikų?'}:{relative:'Tengo una hermana',children:'Tengo dos hijos',ask:'¿Tienes hijos?'},
 build(v){return [read('Which relative does this person say they have?',['relative','children'],pair(lt?'A brother':'A sister','A grandmother'),'a',{document:'Family profile'}),
 read('How many children does this person have?',['children'],pair('Two','Three'),'a'),
 hear(v?'children':'relative',pair('They mention a sibling','They mention children'),v?'b':'a'),hear('ask',pair('Do you have children?','Where do you live?'),'a'),
 write('Describe the practice family using two sentences: '+(lt?'a brother':'a sister')+' and two children, one sentence per line.',['relative','children'],'in-order'),write('Ask whether someone has children.',['ask'])];},speech:'ask'});
topics.push({id:'home',objective:'home-information',title:'Describe a home',brief:'Read a short home description, understand a practical question, and write two facts about a practice home.',
 sources:lt?{home:'Aš gyvenu bute',size:'Mano butas mažas',ask:'Kur yra virtuvė?'}:{home:'Vivo en un departamento',size:'Mi casa es pequeña',ask:'¿Hay un baño?'},
 build(v){return [read('What kind of home does this person describe?',['home','size'],pair('An apartment','A hotel room'),'a',{document:'A note about home'}),
 read('What detail is given about the size?',['size'],pair('It is small','It is large'),'a'),
 hear(v?'home':'size',pair('A home description','A price question'),'a'),hear('ask',pair(lt?'Where is the kitchen?':'Is there a bathroom?','What time is it?'),'a'),
 write('Describe this practice home in two sentences: '+(lt?'you live in an apartment; your apartment is small.':'you live in an apartment; your home is small.')+' Write one sentence per line.',['home','size'],'in-order'),write(lt?'Ask where the kitchen is.':'Ask whether there is a bathroom.',['ask'])];},speech:'ask'});
topics.push({id:'preferences',objective:'preferences',title:'Find a shared interest',brief:'Read a short interest profile, listen for preferences and share familiar interests of your own choosing.',
 sources:lt?{read:'Aš mėgstu skaityti',cook:'Aš mėgstu gaminti',music:'Man patinka muzika',ask:'Ar tau patinka?'}:{read:'Me gusta leer',cook:'Me gusta cocinar',music:'Me gusta la música',ask:'¿Te gusta viajar?'},
 build(v){const key=v?'cook':'read';return [read('Which activity does this person enjoy?',[key,'music'],pair('Reading','Cooking'),v?'b':'a',{document:'Interests profile'}),
 read('What else does this person like?',['music'],pair('Music','Shopping'),'a'),hear(key,pair('Reading','Cooking'),v?'b':'a'),hear('music',pair('Music','Shopping'),'a'),
 write('Share two interests in separate sentences. Choose any two of the reading, cooking or music phrases you have learned.',['read','cook','music'],'any-two'),
 write(lt?'Ask whether the other person likes it.':'Ask whether the other person likes travelling.',['ask'])];},speech:'ask'});
topics.push({id:'shopping',objective:'simple-purchase',title:'Choose an item',brief:'Read a shopping request, check what someone needs, and ask a useful question in a shop.',
 sources:lt?{request:'Ar turite obuolių?',size:'per mažas',ask:'Ar galiu pasimatuoti?',take:'Gerai, aš imu'}:{request:'Quiero dos manzanas',size:'Es muy grande',ask:'¿Me la puedo probar?',take:'Me llevo la chamarra'},
 build(v){return [read('What item does this customer mention?',['request'],pair('Apples','Bread'),'a',{document:'Shopping note'}),
 read('What is the problem with this item?',['size'],pair('It is too small','It is very big'),lt?'a':'b'),hear(v?'ask':'request',pair(v?'Trying something on':'Apples',v?'Asking the price':'Bread'),'a'),hear('size',pair('Too small','Very big'),lt?'a':'b'),
 write('You want to try on the item. Ask if you can.',['ask']),write(lt?'You decide to buy it. Say “OK, I’ll take it.”':'You decide to buy the jacket. Say you will take it.',['take'])];},speech:'ask'});
topics.push({id:'clarification',objective:'clarification',title:'Keep a conversation going',brief:'Recognise when someone needs help, then ask for repetition or explain that you do not understand.',
 sources:lt?{repeat:'Ar gali pakartoti?',unknown:'Aš nelabai suprantu',meaning:'Ką reiškia šis žodis?'}:{repeat:'¿Puedes repetir?',unknown:'No entiendo',meaning:'¿Qué significa esta palabra?'},
 build(v){return [read('What does this person need you to do?',['repeat'],pair('Repeat what you said','Speak louder'),'a',{document:'A message during a conversation'}),
 read('What difficulty are they describing?',['unknown'],pair('They do not understand','They cannot find their phone'),'a'),
 hear(v?'meaning':'repeat',pair('They want a word explained','They want something repeated'),v?'a':'b'),hear('unknown',pair('They do not understand','They agree'),'a'),
 write('You missed what your friend said. Ask them to repeat it.',['repeat']),write('You do not understand. Explain that using your learned phrase.',['unknown'])];},speech:'repeat'});
if(lt){
 topics.push({id:'calendar',objective:'times-dates',title:'Use a calendar',brief:'Recognise the complete month set, read a numbered calendar entry and record the month and day separately.',
  sources:{jan:'sausis',feb:'vasaris',mar:'kovas',apr:'balandis',may:'gegužė',jun:'birželis',jul:'liepa',aug:'rugpjūtis',sep:'rugsėjis',oct:'spalis',nov:'lapkritis',dec:'gruodis',two:'du',three:'trys'},
  build(v){const month=v?'nov':'apr',day=v?'three':'two';return [read('Which month is this calendar entry in?',[month,day],pair('April','November'),v?'b':'a',{document:'Calendar: month heading and numbered day'}),read('Which numbered day is shown?',[month,day],pair('2','3'),v?'b':'a'),hear(v?'aug':'may',pair('May','August'),v?'b':'a'),hear(v?'sep':'oct',pair('September','October'),v?'a':'b'),write('Record the calendar entry as two fields, one per line: the month name, then the day as a number word.',[month,day],'in-order'),write('Write the name of '+(v?'December':'February')+'.',[v?'dec':'feb'])];},speech:'apr'});
 topics.push({id:'descriptions',objective:'family-description',title:'Describe someone you know',brief:'Understand a short personal description and combine matching details about a practice person.',
  sources:{brother:'Mano brolis aukštas',sister:'Mano sesuo aukšta',cheerful:'Jis linksmas',clever:'Ji labai protinga',ask:'Koks jis?'},
  build(v){const person=v?'sister':'brother',trait=v?'clever':'cheerful';return [read('Who is being described?',[person,trait],pair('A brother','A sister'),v?'b':'a',{document:'A family description'}),read('What else do we learn about this person?',[person,trait],pair('They are cheerful','They are very clever'),v?'b':'a'),hear(person,pair('A tall brother','A tall sister'),v?'b':'a'),hear(trait,pair('He is cheerful','She is very clever'),v?'b':'a'),write('Write the two facts about this practice person, one sentence per line.',[person,trait],'in-order'),{...write('Choose either the brother or the sister. Write two matching sentences about the same person.',['brother','sister','cheerful','clever'],'compatible-pair'),pairs:[['brother','cheerful'],['sister','clever']]}];},speech:'ask'});
 topics.push({id:'rooms',objective:'home-information',title:'Help a guest at home',brief:'Read room labels, understand household instructions and write useful instructions for a guest.',
  sources:{kitchen:'virtuvė',bedroom:'miegamasis',open:'Atidaryk langą',close:'Uždaryk duris',light:'Įjunk šviesą',ask:'Kur yra virtuvė?'},
  build(v){return [read('Which label marks the room where you would cook?',['kitchen','bedroom'],[option('a','virtuvė'),option('b','miegamasis')],'a',{document:'Room labels in a small apartment'}),read('What is the guest being asked to do?',[v?'open':'close'],pair('Close the door','Open the window'),v?'b':'a'),hear(v?'bedroom':'kitchen',pair('Kitchen','Bedroom'),v?'b':'a'),hear(v?'open':'close',pair('Close the door','Open the window'),v?'b':'a'),write('A guest needs to find the kitchen. Ask where it is.',['ask']),write('Write two instructions for a guest, one per line: open the window, then turn on the light.',['open','light'],'in-order')];},speech:'ask'});
}
window.WordamiTopicContent=topics;
})();
