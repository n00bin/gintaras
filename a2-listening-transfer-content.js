/* Separate A2 spoken messages. Sources and keys stay hidden until check feedback. */
(()=>{
'use strict';
const bank=window.WordamiListeningTransferContent;if(!bank)return;
const lt=LANG.code==='lt',q=(prompt,options,answer,model,explanation)=>({prompt,options,answer,model,explanation});
const units={
 A2:{title:'Understand another spoken plan',documentKind:'A voice message about an arrangement or a day out',variants:lt?[
  {id:'friday-ten-park',text:'Labas, Lina. Skambinu dėl mūsų susitikimo. Penktadienį turiu dirbti iki aštuntos valandos. Siūlau dešimtą valandą prie parko. Jei lis, susitikime kavinėje šalia parko. Parašyk, ar tau tinka šis laikas. Ačiū už supratimą.',questions:[
   q('Which meeting time does the speaker propose?',['Eight','Ten','Seven'],1,'Siūlau dešimtą valandą prie parko.','Eight is when work ends. Ten is the proposed meeting time.'),
   q('What happens if it rains?',['The friend must work later','The meeting is automatically cancelled','They meet in the café beside the park'],2,'Jei lis, susitikime kavinėje šalia parko.','The rain condition changes the place, not the time or the need to reply.'),
   q('What does the speaker still need from the listener?',['A reply about whether the time works','Proof that the park is open','A confirmation that the meeting already happened'],0,'Parašyk, ar tau tinka šis laikas.','The message asks for a reply; it does not establish that the listener has accepted.')
  ]},
  {id:'outing-tired-home',text:'Labas! Vakar buvau mieste. Pirmiausia nuėjau į parką. Paskui susitikau su drauge. Buvo smagu, bet pradėjo lyti. Grįžau namo, nes buvau pavargusi. Gal galime susitikti šeštadienį? Siūlau septintą valandą prie parko.',questions:[
   q('What happened before meeting the friend?',['The speaker went home','The speaker went to the park','The speaker worked until eight'],1,'Pirmiausia nuėjau į parką. Paskui susitikau su drauge.','Pirmiausia and paskui give the order of the two events.'),
   q('What reason does the speaker give for going home?',['The friend cancelled Saturday','The café was closed','The speaker was tired'],2,'Grįžau namo, nes buvau pavargusi.','Rain is mentioned, but the stated reason for returning home is tiredness.'),
   q('Which new arrangement is proposed?',['Saturday at seven','Friday at ten','Saturday at eight'],0,'Gal galime susitikti šeštadienį? Siūlau septintą valandą prie parko.','The proposed Saturday meeting is separate from the account of yesterday.')
  ]}
 ]:[
  {id:'friday-ten-park',text:'Hola, Ana. Te llamo por nuestra cita. El viernes tengo que trabajar hasta las ocho. Propongo a las diez, junto al parque. Si llueve, nos vemos en la cafetería que está al lado del parque. Dime si te viene bien esa hora. Gracias por tu comprensión.',questions:[
   q('Which meeting time does the speaker propose?',['Eight','Ten','Seven'],1,'Propongo a las diez, junto al parque.','Eight is when work ends. Ten is the proposed meeting time.'),
   q('What happens if it rains?',['The friend must work later','The meeting is automatically cancelled','They meet in the café beside the park'],2,'Si llueve, nos vemos en la cafetería que está al lado del parque.','The rain condition changes the place, not the time or the need to reply.'),
   q('What does the speaker still need from the listener?',['A reply about whether the time works','Proof that the park is open','A confirmation that the meeting already happened'],0,'Dime si te viene bien esa hora.','The message asks for a reply; it does not establish that the listener has accepted.')
  ]},
  {id:'outing-tired-home',text:'¡Hola! Ayer estuve en el centro. Primero fui al parque. Después me encontré con una amiga. Fue divertido, pero empezó a llover. Regresé a casa porque estaba cansada. ¿Podemos vernos el sábado? Propongo a las siete, junto al parque.',questions:[
   q('What happened before meeting the friend?',['The speaker went home','The speaker went to the park','The speaker worked until eight'],1,'Primero fui al parque. Después me encontré con una amiga.','Primero and después give the order of the two events.'),
   q('What reason does the speaker give for going home?',['The friend cancelled Saturday','The café was closed','The speaker was tired'],2,'Regresé a casa porque estaba cansada.','Rain is mentioned, but the stated reason for returning home is tiredness.'),
   q('Which new arrangement is proposed?',['Saturday at seven','Friday at ten','Saturday at eight'],0,'¿Podemos vernos el sábado? Propongo a las siete, junto al parque.','The proposed Saturday meeting is separate from the account of yesterday.')
  ]}
 ]},
 'A2-services':{title:'Understand a spoken appointment update',documentKind:'An appointment request or a service office message',variants:lt?[
  {id:'request-friday-ten',text:'Laba diena, skambinu dėl savo susitikimo. Mano susitikimas yra antradienį dešimtą valandą. Antradienį ryte turiu dirbti, todėl negaliu atvykti. Norėčiau užsiregistruoti penktadienį dešimtą valandą. Atsinešiu dokumentus. Prašau patvirtinti naują laiką žinute.',questions:[
   q('Which replacement does the caller request?',['Tuesday at ten','Friday at three','Friday at ten'],2,'Norėčiau užsiregistruoti penktadienį dešimtą valandą.','Tuesday at ten is the old appointment. The request moves it to Friday at ten.'),
   q('Why can the caller not attend the original appointment?',['The caller has to work on Tuesday morning','The documents have already been refused','The office is closed all day on Friday'],0,'Antradienį ryte turiu dirbti, todėl negaliu atvykti.','The caller gives a work conflict as the reason.'),
   q('How does the caller want confirmation?',['Through a call to a client','By message','By arriving without a reply'],1,'Prašau patvirtinti naują laiką žinute.','Confirmation by message is requested; this call itself does not confirm availability.')
  ]},
  {id:'office-tuesday-three',text:'Laba diena. Jūsų susitikimas dėl dokumentų yra antradienį trečią valandą po pietų. Prašome atvykti dešimt minučių anksčiau ir atsinešti dokumentus. Jei šis laikas netinka, parašykite mums. Penktadienį turime laisvą laiką dešimtą valandą. Naują laiką reikia patvirtinti iki ketvirtadienio.',questions:[
   q('When is the existing appointment?',['Friday at ten','Tuesday at three in the afternoon','Tuesday at ten'],1,'Jūsų susitikimas dėl dokumentų yra antradienį trečią valandą po pietų.','Tuesday afternoon is the existing appointment; Friday is an alternative.'),
   q('Which alternative does the office offer?',['Friday at ten','Friday at three','Tuesday at eight'],0,'Penktadienį turime laisvą laiką dešimtą valandą.','An available alternative is offered; it is not automatically a confirmed replacement.'),
   q('What should the listener do if the existing time does not work?',['Wait until after missing the appointment','Assume the Friday appointment is already booked','Write to the office'],2,'Jei šis laikas netinka, parašykite mums.','The office asks the listener to make contact if the time is unsuitable.')
  ]}
 ]:[
  {id:'request-friday-ten',text:'Buenos días, llamo por mi cita. Mi cita es el martes a las diez. El martes por la mañana tengo que trabajar y no puedo ir. Quisiera cambiarla al viernes a las diez. Voy a llevar los documentos. Por favor, confirmen el nuevo horario por mensaje.',questions:[
   q('Which replacement does the caller request?',['Tuesday at ten','Friday at three','Friday at ten'],2,'Quisiera cambiarla al viernes a las diez.','Tuesday at ten is the old appointment. The request moves it to Friday at ten.'),
   q('Why can the caller not attend the original appointment?',['The caller has to work on Tuesday morning','The documents have already been refused','The office is closed all day on Friday'],0,'El martes por la mañana tengo que trabajar y no puedo ir.','The caller gives a work conflict as the reason.'),
   q('How does the caller want confirmation?',['Through a call to a client','By message','By arriving without a reply'],1,'Por favor, confirmen el nuevo horario por mensaje.','Confirmation by message is requested; this call itself does not confirm availability.')
  ]},
  {id:'office-tuesday-three',text:'Buenos días. Su cita para revisar los documentos es el martes a las tres de la tarde. Por favor, llegue diez minutos antes y traiga los documentos. Si ese horario no le viene bien, escríbanos. El viernes tenemos un espacio a las diez. Debe confirmar el nuevo horario antes del jueves.',questions:[
   q('When is the existing appointment?',['Friday at ten','Tuesday at three in the afternoon','Tuesday at ten'],1,'Su cita para revisar los documentos es el martes a las tres de la tarde.','Tuesday afternoon is the existing appointment; Friday is an alternative.'),
   q('Which alternative does the office offer?',['Friday at ten','Friday at three','Tuesday at eight'],0,'El viernes tenemos un espacio a las diez.','An available alternative is offered; it is not automatically a confirmed replacement.'),
   q('What should the listener do if the existing time does not work?',['Wait until after missing the appointment','Assume the Friday appointment is already booked','Write to the office'],2,'Si ese horario no le viene bien, escríbanos.','The office asks the listener to make contact if the time is unsuitable.')
  ]}
 ]},
 'A2-work':{title:'Understand another spoken work update',documentKind:'A colleague explains timing, responsibilities or a temporary change',variants:lt?[
  {id:'office-eleven-call',text:'Labas. Rytoj būsiu biure. Darbą pradedu devintą. Mūsų susitikimas bus vienuoliktą, o ne dešimtą. Po susitikimo paskambinsiu klientui. Prašau paruošti klientų sąrašą. Aš patikrinsiu dokumentus. Galime pasidalyti užduotis.',questions:[
   q('What time is the meeting now?',['Nine','Ten','Eleven'],2,'Mūsų susitikimas bus vienuoliktą, o ne dešimtą.','Nine is the work start; ten is the meeting time being replaced.'),
   q('Who is asked to prepare the client list?',['The colleague receiving the message','The client','The repair worker'],0,'Prašau paruošti klientų sąrašą. Aš patikrinsiu dokumentus.','The speaker asks the colleague to prepare the list and takes responsibility for the documents.'),
   q('When will the speaker call the client?',['Before starting work','After the meeting','Only if the colleague cannot prepare the list'],1,'Po susitikimo paskambinsiu klientui.','The call follows the meeting; it is not made conditional on a problem with the list.')
  ]},
  {id:'remote-online-help',text:'Labas. Šiandien dirbu iš namų, nes laukiu meistro. Į komandos susitikimą prisijungsiu internetu. Klientams paskambinsiu po pietų. Jei nespėsi paruošti sąrašo, pranešk iki vienuoliktos. Galėsime pasidalyti darbą.',questions:[
   q('Why is the speaker at home today?',['The team has cancelled work','The speaker is waiting for a repair worker','The clients cannot use the internet'],1,'Šiandien dirbu iš namų, nes laukiu meistro.','The temporary location change has a stated reason: waiting for the repair worker.'),
   q('How will the speaker take part in the team meeting?',['By joining online','By cancelling it','By sending the client instead'],0,'Į komandos susitikimą prisijungsiu internetu.','Working at home does not mean missing or cancelling the meeting.'),
   q('What should the listener do if the list will not be ready?',['Call the clients before lunch','Wait without telling anyone','Tell the speaker by eleven so they can share the work'],2,'Jei nespėsi paruošti sąrašo, pranešk iki vienuoliktos. Galėsime pasidalyti darbą.','The condition leads to a request for contact and an offer to divide the work.')
  ]}
 ]:[
  {id:'office-eleven-call',text:'Hola. Mañana voy a estar en la oficina. Empiezo a trabajar a las nueve. Nuestra reunión va a ser a las once, no a las diez. Después de la reunión voy a llamar al cliente. Prepara la lista de clientes, por favor. Yo voy a revisar los documentos. Podemos repartir las tareas.',questions:[
   q('What time is the meeting now?',['Nine','Ten','Eleven'],2,'Nuestra reunión va a ser a las once, no a las diez.','Nine is the work start; ten is the meeting time being replaced.'),
   q('Who is asked to prepare the client list?',['The colleague receiving the message','The client','The repair worker'],0,'Prepara la lista de clientes, por favor. Yo voy a revisar los documentos.','The speaker asks the colleague to prepare the list and takes responsibility for the documents.'),
   q('When will the speaker call the client?',['Before starting work','After the meeting','Only if the colleague cannot prepare the list'],1,'Después de la reunión voy a llamar al cliente.','The call follows the meeting; it is not made conditional on a problem with the list.')
  ]},
  {id:'remote-online-help',text:'Hola. Hoy trabajo desde casa porque espero a un técnico. Voy a conectarme a la reunión por internet y llamar a los clientes por la tarde. Si no terminas la lista, avísame antes de las once. Podemos repartir el trabajo.',questions:[
   q('Why is the speaker at home today?',['The team has cancelled work','The speaker is waiting for a repair worker','The clients cannot use the internet'],1,'Hoy trabajo desde casa porque espero a un técnico.','The temporary location change has a stated reason: waiting for the repair worker.'),
   q('How will the speaker take part in the team meeting?',['By joining online','By cancelling it','By sending the client instead'],0,'Voy a conectarme a la reunión por internet','Working at home does not mean missing or cancelling the meeting.'),
   q('What should the listener do if the list will not be ready?',['Call the clients before lunch','Wait without telling anyone','Tell the speaker before eleven so they can share the work'],2,'Si no terminas la lista, avísame antes de las once. Podemos repartir el trabajo.','The condition leads to a request for contact and an offer to divide the work.')
  ]}
 ]},
 'A2-meals':{title:'Understand another spoken meal plan',documentKind:'A group meal update or a message about a wait',variants:lt?[
  {id:'five-eight-update',text:'Laba diena. Mūsų planas pasikeitė. Atvyksime penkiese, o ne keturiese. Galėsime būti tik aštuntą valandą. Trims žmonėms reikės patiekalų be mėsos. Du vištienos patiekalai lieka. Padažą vis dar norėtume gauti atskirai. Prašau patvirtinti užsakymą.',questions:[
   q('Which group size and arrival time does this update give?',['Four people at eight','Five people at seven-thirty','Five people at eight'],2,'Atvyksime penkiese, o ne keturiese. Galėsime būti tik aštuntą valandą.','The new number is five, and this message says eight rather than seven-thirty.'),
   q('Which requests are retained?',['Two chicken dishes and the sauce separately','Chicken for all five people','The original group size and arrival time'],0,'Du vištienos patiekalai lieka. Padažą vis dar norėtume gauti atskirai.','The chicken dishes and separate sauce remain while other details change.'),
   q('What does the speaker want the restaurant to do?',['Assume no reply is needed','Confirm the order','Cancel the whole meal'],1,'Prašau patvirtinti užsakymą.','This asks the restaurant to confirm; it is not a report of a confirmed booking.')
  ]},
  {id:'four-half-hour-wait',text:'Norėtume užsisakyti keturiems žmonėms. Du žmonės nevalgo mėsos. Kiti du norėtų vištienos. Reikės palaukti pusvalandį. Ar jums tinka? Galime ateiti vėliau.',questions:[
   q('Which meal needs are described?',['Two people avoid meat and two want chicken','All four people want chicken','Three people avoid meat and two want chicken'],0,'Du žmonės nevalgo mėsos. Kiti du norėtų vištienos.','The two groups add up to four people, not five.'),
   q('What does the message say about waiting?',['There will definitely be no wait','A half-hour wait is expected','The meal has been cancelled'],1,'Reikės palaukti pusvalandį.','Unlike a conditional warning about a possible delay, this says a half-hour wait will be needed.'),
   q('Has everyone already accepted the wait?',['Yes, acceptance is explicitly confirmed','No, everyone has refused','No acceptance is stated; the speaker asks whether it works'],2,'Ar jums tinka? Galime ateiti vėliau.','The speaker asks whether the arrangement works and offers arriving later.')
  ]}
 ]:[
  {id:'five-eight-update',text:'Buenos días. Nuestro plan cambió. Vamos a llegar cinco personas, no cuatro. Solo podemos estar a las ocho. Tres personas necesitan platillos sin carne. Los dos platos de pollo se mantienen. Seguimos queriendo la salsa aparte. Confirme el pedido, por favor.',questions:[
   q('Which group size and arrival time does this update give?',['Four people at eight','Five people at seven-thirty','Five people at eight'],2,'Vamos a llegar cinco personas, no cuatro. Solo podemos estar a las ocho.','The new number is five, and this message says eight rather than seven-thirty.'),
   q('Which requests are retained?',['Two chicken dishes and the sauce separately','Chicken for all five people','The original group size and arrival time'],0,'Los dos platos de pollo se mantienen. Seguimos queriendo la salsa aparte.','The chicken dishes and separate sauce remain while other details change.'),
   q('What does the speaker want the restaurant to do?',['Assume no reply is needed','Confirm the order','Cancel the whole meal'],1,'Confirme el pedido, por favor.','This asks the restaurant to confirm; it is not a report of a confirmed booking.')
  ]},
  {id:'four-half-hour-wait',text:'Quisiéramos pedir para cuatro personas. Dos no comen carne. Las otras dos quieren pollo. Hay que esperar media hora. ¿Les parece bien? Podemos llegar más tarde.',questions:[
   q('Which meal needs are described?',['Two people avoid meat and two want chicken','All four people want chicken','Three people avoid meat and two want chicken'],0,'Dos no comen carne. Las otras dos quieren pollo.','The two groups add up to four people, not five.'),
   q('What does the message say about waiting?',['There will definitely be no wait','A half-hour wait is expected','The meal has been cancelled'],1,'Hay que esperar media hora.','Unlike a conditional warning about a possible delay, this says a half-hour wait will be needed.'),
   q('Has everyone already accepted the wait?',['Yes, acceptance is explicitly confirmed','No, everyone has refused','No acceptance is stated; the speaker asks whether it works'],2,'¿Les parece bien? Podemos llegar más tarde.','The speaker asks whether the arrangement works and offers arriving later.')
  ]}
 ]}
};
Object.assign(bank.units,units);
})();
