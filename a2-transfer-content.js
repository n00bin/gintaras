/* A2 controlled reading: changed plans, conditions and confirmation in prepared language. */
(()=>{
'use strict';
const bank=window.WordamiTransferContent;if(!bank)return;
const lt=LANG.code==='lt';
const q=(prompt,options,answer,model,explanation)=>({prompt,options,answer,model,explanation});
const units={
 A2:{title:'Read a changed arrangement',documentKind:'A message proposing another arrangement',variants:lt?[
  {id:'saturday-eight-rain',text:'Penktadienį turiu dirbti iki aštuntos valandos, todėl septintą ateiti negaliu. Gal galime susitikti šeštadienį aštuntą valandą prie parko? Jei lis, susitikime kavinėje šalia parko. Parašyk, ar tau tinka šis laikas.',questions:[
   q('Why is Friday at seven not possible?',['The writer works until eight','The park closes at seven','The friend has already cancelled Saturday'],0,'Penktadienį turiu dirbti iki aštuntos valandos, todėl septintą ateiti negaliu.','The reason is the writer’s work, not a closure or a reply from the friend.'),
   q('Which replacement is proposed in this message?',['Saturday at ten','Friday at eight','Saturday at eight'],2,'Gal galime susitikti šeštadienį aštuntą valandą prie parko?','Read this proposal rather than carrying over the ten o’clock time from the prepared message.'),
   q('What changes if it rains?',['The meeting is automatically cancelled','They meet in the café beside the park','The meeting moves back to Friday'],1,'Jei lis, susitikime kavinėje šalia parko.','The condition changes the meeting place; it does not cancel the arrangement or change its day.')
  ]},
  {id:'friday-ten-reply',text:'Rytoj negaliu ateiti, nes turiu dirbti. Gal galime susitikti penktadienį dešimtą valandą? Parašyk, ar tau tinka šis laikas. Jei lis, susitikime kavinėje.',questions:[
   q('What explains the proposed change?',['The café has confirmed a booking','The writer has to work tomorrow','The friend refuses every meeting'],1,'Rytoj negaliu ateiti, nes turiu dirbti.','Nes introduces the reason for not coming tomorrow.'),
   q('What should the reader do next?',['Reply whether the proposed time works','Assume ten has already been agreed','Ask the writer to work until ten'],0,'Parašyk, ar tau tinka šis laikas.','The writer requests a response about the proposed time.'),
   q('What can you conclude about Friday at ten?',['Both people have already confirmed it','It has been cancelled because of rain','It is proposed, with a reply still requested'],2,'Gal galime susitikti penktadienį dešimtą valandą? Parašyk, ar tau tinka šis laikas.','A proposal and request for a reply do not establish that the other person has accepted.')
  ]}
 ]:[
  {id:'saturday-eight-rain',text:'El viernes tengo que trabajar hasta las ocho, así que no puedo llegar a las siete. ¿Podemos vernos el sábado a las ocho junto al parque? Si llueve, nos vemos en la cafetería que está al lado del parque. Dime si te viene bien esa hora.',questions:[
   q('Why is Friday at seven not possible?',['The writer works until eight','The park closes at seven','The friend has already cancelled Saturday'],0,'El viernes tengo que trabajar hasta las ocho, así que no puedo llegar a las siete.','The reason is the writer’s work, not a closure or a reply from the friend.'),
   q('Which replacement is proposed in this message?',['Saturday at ten','Friday at eight','Saturday at eight'],2,'¿Podemos vernos el sábado a las ocho junto al parque?','Read this proposal rather than carrying over the ten o’clock time from the prepared message.'),
   q('What changes if it rains?',['The meeting is automatically cancelled','They meet in the café beside the park','The meeting moves back to Friday'],1,'Si llueve, nos vemos en la cafetería que está al lado del parque.','The condition changes the meeting place; it does not cancel the arrangement or change its day.')
  ]},
  {id:'friday-ten-reply',text:'Mañana no puedo ir porque tengo que trabajar. ¿Podemos vernos el viernes a las diez? Dime si esa hora te parece bien. Si llueve, nos vemos en una cafetería.',questions:[
   q('What explains the proposed change?',['The café has confirmed a booking','The writer has to work tomorrow','The friend refuses every meeting'],1,'Mañana no puedo ir porque tengo que trabajar.','Porque introduces the reason for not coming tomorrow.'),
   q('What should the reader do next?',['Reply whether the proposed time works','Assume ten has already been agreed','Ask the writer to work until ten'],0,'Dime si esa hora te parece bien.','The writer requests a response about the proposed time.'),
   q('What can you conclude about Friday at ten?',['Both people have already confirmed it','It has been cancelled because of rain','It is proposed, with a reply still requested'],2,'¿Podemos vernos el viernes a las diez? Dime si esa hora te parece bien.','A proposal and request for a reply do not establish that the other person has accepted.')
  ]}
 ]},
 'A2-services':{title:'Distinguish a booking from a request',documentKind:'A service appointment message or notice',variants:lt?[
  {id:'request-tuesday-ten',text:'Mano susitikimas yra penktadienį trečią valandą po pietų. Penktadienį turiu dirbti iki aštuntos valandos, todėl negaliu atvykti. Norėčiau užsiregistruoti antradienį dešimtą valandą. Prašau patvirtinti naują laiką žinute. Atsinešiu dokumentus.',questions:[
   q('Which new appointment is being requested?',['Friday at three','Tuesday at ten','Friday at eight'],1,'Norėčiau užsiregistruoti antradienį dešimtą valandą.','Friday at three identifies the original appointment; Tuesday at ten is the requested replacement.'),
   q('Why does the original appointment not work?',['The writer is working until eight on Friday','The office refuses to accept documents','The new appointment has already happened'],0,'Penktadienį turiu dirbti iki aštuntos valandos, todėl negaliu atvykti.','The work commitment conflicts with the original Friday appointment.'),
   q('What is the status of the new time?',['It is guaranteed by the writer’s message','It has been refused by the office','Confirmation by message is still requested'],2,'Prašau patvirtinti naują laiką žinute.','Requesting confirmation is different from reporting that confirmation was received.')
  ]},
  {id:'friday-notice',text:'Jūsų susitikimas yra penktadienį trečią valandą po pietų. Prašome atvykti dešimt minučių anksčiau ir atsinešti dokumentus. Jei šis laikas netinka, parašykite mums. Naują laiką reikia patvirtinti iki ketvirtadienio.',questions:[
   q('What should the visitor do for the appointment?',['Arrive exactly ten minutes late without documents','Arrive ten minutes early and bring documents','Bring documents only if the appointment is cancelled'],1,'Prašome atvykti dešimt minučių anksčiau ir atsinešti dokumentus.','The instruction contains two actions; neither is conditional on cancellation.'),
   q('When should the visitor write to the office?',['If the proposed time does not work','Only after missing the appointment','Only if the office has lost the documents'],0,'Jei šis laikas netinka, parašykite mums.','Jei introduces the condition for contacting the office.'),
   q('Which day is named for confirming the new time?',['Tuesday','Friday','Thursday'],2,'Naują laiką reikia patvirtinti iki ketvirtadienio.','The confirmation deadline is tied to Thursday, while the appointment itself is on Friday.')
  ]}
 ]:[
  {id:'request-tuesday-ten',text:'Mi cita es el viernes a las tres de la tarde. El viernes tengo que trabajar hasta las ocho y no puedo ir. Quisiera cambiarla al martes a las diez. Por favor, confirmen el nuevo horario por mensaje. Voy a llevar los documentos.',questions:[
   q('Which new appointment is being requested?',['Friday at three','Tuesday at ten','Friday at eight'],1,'Quisiera cambiarla al martes a las diez.','Friday at three identifies the original appointment; Tuesday at ten is the requested replacement.'),
   q('Why does the original appointment not work?',['The writer is working until eight on Friday','The office refuses to accept documents','The new appointment has already happened'],0,'El viernes tengo que trabajar hasta las ocho y no puedo ir.','The work commitment conflicts with the original Friday appointment.'),
   q('What is the status of the new time?',['It is guaranteed by the writer’s message','It has been refused by the office','Confirmation by message is still requested'],2,'Por favor, confirmen el nuevo horario por mensaje.','Requesting confirmation is different from reporting that confirmation was received.')
  ]},
  {id:'friday-notice',text:'Su cita es el viernes a las tres de la tarde. Por favor, llegue diez minutos antes y traiga los documentos. Si ese horario no le viene bien, escríbanos. Debe confirmar el horario antes del jueves.',questions:[
   q('What should the visitor do for the appointment?',['Arrive exactly ten minutes late without documents','Arrive ten minutes early and bring documents','Bring documents only if the appointment is cancelled'],1,'Por favor, llegue diez minutos antes y traiga los documentos.','The instruction contains two actions; neither is conditional on cancellation.'),
   q('When should the visitor write to the office?',['If the proposed time does not work','Only after missing the appointment','Only if the office has lost the documents'],0,'Si ese horario no le viene bien, escríbanos.','Si introduces the condition for contacting the office.'),
   q('Which confirmation deadline is given?',['After Friday','On Tuesday','Before Thursday'],2,'Debe confirmar el horario antes del jueves.','Antes means before; the appointment itself is on Friday.')
  ]}
 ]},
 'A2-work':{title:'Read a changed working plan',documentKind:'A practical update to a colleague',variants:lt?[
  {id:'remote-ten-deadline',text:'Šiandien dirbu iš namų, nes laukiu meistro. Į komandos susitikimą prisijungsiu internetu. Mūsų susitikimas bus dešimtą, o ne vienuoliktą. Ryte prašau paruošti klientų sąrašą. Aš patikrinsiu dokumentus. Jei nespėsi paruošti sąrašo, pranešk iki vienuoliktos.',questions:[
   q('Why is the writer working from home?',['The writer is waiting for a repair worker','The team meeting has been cancelled','The clients have moved to another office'],0,'Šiandien dirbu iš namų, nes laukiu meistro.','The stated reason is waiting for the repair worker; joining online does not mean the meeting is cancelled.'),
   q('Which meeting time does this update give?',['Eleven','Nine','Ten'],2,'Mūsų susitikimas bus dešimtą, o ne vienuoliktą.','The update contrasts ten with eleven. Do not carry over the time from the prepared recording.'),
   q('What should the colleague do if the list will not be ready?',['Assume the writer has prepared it','Let the writer know by eleven','Call every client before nine'],1,'Jei nespėsi paruošti sąrašo, pranešk iki vienuoliktos.','The conditional instruction gives a communication step and a time for it.')
  ]},
  {id:'office-after-meeting',text:'Rytoj būsiu biure. Darbą pradedu devintą. Po susitikimo paskambinsiu klientui. Prašau paruošti klientų sąrašą. Aš patikrinsiu dokumentus. Galime pasidalyti užduotis.',questions:[
   q('When will the writer call the client?',['Before starting work','After the meeting','Only after receiving a new appointment'],1,'Po susitikimo paskambinsiu klientui.','Po susitikimo gives the sequence, not a separate clock time.'),
   q('Who says they will check the documents?',['The writer','The client','The repair worker'],0,'Aš patikrinsiu dokumentus.','Aš identifies the writer’s responsibility; the list preparation is requested from the colleague.'),
   q('What deadline for preparing the list is stated here?',['It must be ready before eleven','It must be ready after lunch','No explicit deadline is given in this message'],2,'Prašau paruošti klientų sąrašą.','This request gives no deadline. A deadline from another lesson message must not be added to this one.')
  ]}
 ]:[
  {id:'remote-ten-deadline',text:'Hoy trabajo desde casa porque espero a un técnico. Voy a conectarme a la reunión por internet. Nuestra reunión va a ser a las diez, no a las once. Por la mañana prepara la lista de clientes, por favor. Yo voy a revisar los documentos. Si no terminas la lista, avísame antes de las once.',questions:[
   q('Why is the writer working from home?',['The writer is waiting for a repair worker','The team meeting has been cancelled','The clients have moved to another office'],0,'Hoy trabajo desde casa porque espero a un técnico.','The stated reason is waiting for the repair worker; joining online does not mean the meeting is cancelled.'),
   q('Which meeting time does this update give?',['Eleven','Nine','Ten'],2,'Nuestra reunión va a ser a las diez, no a las once.','The update contrasts ten with eleven. Do not carry over the time from the prepared recording.'),
   q('What should the colleague do if the list will not be ready?',['Assume the writer has prepared it','Let the writer know before eleven','Call every client before nine'],1,'Si no terminas la lista, avísame antes de las once.','The conditional instruction gives a communication step and a time for it.')
  ]},
  {id:'office-after-meeting',text:'Mañana voy a estar en la oficina. Empiezo a trabajar a las nueve. Después de la reunión voy a llamar al cliente. Prepara la lista de clientes, por favor. Yo voy a revisar los documentos. Podemos repartir las tareas.',questions:[
   q('When will the writer call the client?',['Before starting work','After the meeting','Only after receiving a new appointment'],1,'Después de la reunión voy a llamar al cliente.','Después de la reunión gives the sequence, not a separate clock time.'),
   q('Who says they will check the documents?',['The writer','The client','The repair worker'],0,'Yo voy a revisar los documentos.','Yo identifies the writer’s responsibility; the list preparation is requested from the colleague.'),
   q('What deadline for preparing the list is stated here?',['It must be ready before eleven','It must be ready after lunch','No explicit deadline is given in this message'],2,'Prepara la lista de clientes, por favor.','This request gives no deadline. A deadline from another lesson message must not be added to this one.')
  ]}
 ]},
 'A2-meals':{title:'Read a changed group meal order',documentKind:'A message to a restaurant about a group order',variants:lt?[
  {id:'five-seven-chicken',text:'Mūsų planas pasikeitė. Atvyksime penkiese, o ne keturiese. Galėtume atvykti septintą valandą. Trims žmonėms reikės patiekalų be mėsos. Du vištienos patiekalai lieka. Padažą vis dar norėtume gauti atskirai. Prašau patvirtinti užsakymą.',questions:[
   q('How many people will now arrive?',['Four','Five','Three'],1,'Atvyksime penkiese, o ne keturiese.','The new group size is five; four is the earlier number being replaced.'),
   q('Which requests are explicitly kept?',['Two chicken dishes and sauce separately','Chicken for everyone with the sauce mixed in','Only the original group size'],0,'Du vištienos patiekalai lieka. Padažą vis dar norėtume gauti atskirai.','Lieka and vis dar preserve those requests while other details change.'),
   q('What does the writer request from the restaurant?',['Cancel the chicken dishes','Serve all sauce together','Confirm the updated order'],2,'Prašau patvirtinti užsakymą.','The message requests confirmation; it does not report that the restaurant has already agreed.')
  ]},
  {id:'four-seven-thirty',text:'Šeštadienį norėtume užsisakyti vakarienę keturiems žmonėms. Du žmonės nevalgo mėsos. Kiti du norėtų vištienos. Galėsime būti tik pusę aštuonių. Jei reikės ilgiau laukti, praneškite žinute. Prieš atvykdami norėtume gauti užsakymo patvirtinimą.',questions:[
   q('Which meal needs are described?',['All four people want chicken','Three meat-free dishes and two chicken dishes','Two people avoid meat and two want chicken'],2,'Du žmonės nevalgo mėsos. Kiti du norėtų vištienos.','The two groups together make four; this is not the five-person order from another message.'),
   q('When can this group arrive?',['Seven-thirty','Seven','Eight-thirty'],0,'Galėsime būti tik pusę aštuonių.','Pusę aštuonių is half past seven, not half past eight.'),
   q('What should happen if the wait is longer?',['The restaurant must cancel the whole order','The restaurant should notify the group by message','The group has already agreed to wait half an hour'],1,'Jei reikės ilgiau laukti, praneškite žinute.','Jei states a condition. It does not establish that a longer wait has already been confirmed.')
  ]}
 ]:[
  {id:'five-seven-chicken',text:'Nuestro plan cambió. Vamos a llegar cinco personas, no cuatro. Podemos llegar a las siete. Tres personas necesitan platillos sin carne. Los dos platos de pollo se mantienen. Seguimos queriendo la salsa aparte. Confirme el pedido, por favor.',questions:[
   q('How many people will now arrive?',['Four','Five','Three'],1,'Vamos a llegar cinco personas, no cuatro.','The new group size is five; four is the earlier number being replaced.'),
   q('Which requests are explicitly kept?',['Two chicken dishes and sauce separately','Chicken for everyone with the sauce mixed in','Only the original group size'],0,'Los dos platos de pollo se mantienen. Seguimos queriendo la salsa aparte.','Se mantienen and seguimos preserve those requests while other details change.'),
   q('What does the writer request from the restaurant?',['Cancel the chicken dishes','Serve all sauce together','Confirm the updated order'],2,'Confirme el pedido, por favor.','The message requests confirmation; it does not report that the restaurant has already agreed.')
  ]},
  {id:'four-seven-thirty',text:'El sábado quisiéramos pedir cena para cuatro personas. Dos no comen carne. Las otras dos quieren pollo. Solo podemos estar a las siete y media. Si hay que esperar más, avísennos por mensaje. Quisiéramos recibir la confirmación del pedido antes de llegar.',questions:[
   q('Which meal needs are described?',['All four people want chicken','Three meat-free dishes and two chicken dishes','Two people avoid meat and two want chicken'],2,'Dos no comen carne. Las otras dos quieren pollo.','The two groups together make four; this is not the five-person order from another message.'),
   q('When can this group arrive?',['Seven-thirty','Seven','Eight-thirty'],0,'Solo podemos estar a las siete y media.','Siete y media means seven-thirty.'),
   q('What should happen if the wait is longer?',['The restaurant must cancel the whole order','The restaurant should notify the group by message','The group has already agreed to wait half an hour'],1,'Si hay que esperar más, avísennos por mensaje.','Si states a condition. It does not establish that a longer wait has already been confirmed.')
  ]}
 ]}
};
Object.assign(bank.units,units);
})();
