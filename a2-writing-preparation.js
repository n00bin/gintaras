/* A2 adds connected reasons, alternatives, conditions and responsibilities to familiar messages. */
(()=>{
'use strict';
const api=window.WordamiWritingPreparation;if(!api)return;
const lt=LANG.code==='lt',line=(id,goal,text,why)=>({id,goal,text,why});
const lessons={
 'A2.day-out':{range:[20,70],lines:[
  line('sequence','Put the events in order',lt?'Vakar buvau mieste. Pirmiausia nuėjau į parką, o paskui susitikau su drauge.':'Ayer estuve en el centro. Primero fui al parque y después me encontré con una amiga.','The time and sequence words show what happened first and next.'),
  line('reaction','Say what you liked or disliked',lt?'Buvo smagu, bet pradėjo lyti.':'Fue divertido, pero empezó a llover.','This gives a reaction and a contrasting complication.'),
  line('reason','Explain one reason',lt?'Grįžau namo, nes buvau pavargusi.':'Regresé a casa porque estaba cansada.','Nes / porque links the action to its reason, rather than just listing another event.')
 ]},
 'A2.change-plan':{range:lt?[15,70]:[20,70],lines:[
  line('problem','Explain why you cannot attend',lt?'Penktadienį negaliu ateiti, nes turiu dirbti.':'El viernes no puedo ir porque tengo que trabajar.','The day, problem and reason are connected in one practical explanation.'),
  line('alternative','Propose another arrangement',lt?'Gal galime susitikti šeštadienį dešimtą valandą prie parko?':'¿Podemos vernos el sábado a las diez junto al parque?','A useful alternative gives a day, time and place; it is a proposal, not a confirmed booking.'),
  line('confirm','Ask for confirmation',lt?'Parašyk, ar tau tinka šeštadienis.':'Dime si te viene bien el sábado.','This asks the other person to confirm whether the replacement works.')
 ]},
 'A2.recommend-place':{range:lt?[15,70]:[20,70],lines:[
  line('activity','Say what someone can do there',lt?'Kavinėje šalia parko galime išgerti arbatos.':'En la cafetería que está al lado del parque podemos tomar un té.','This identifies the place and a simple activity available there.'),
  line('reason','Give a reason to visit',lt?'Siūlau susitikti prie parko, nes galime pasivaikščioti.':'Propongo vernos junto al parque porque podemos caminar.','The reason makes the proposal useful for the visitor instead of only naming a place.'),
  line('practical','Give a practical detail',lt?'Man tinka septinta valanda.':'A mí me viene bien a las siete.','A convenient meeting time is a practical detail. It is not a claim about opening hours.')
 ]},
 'A2-services.writing':{range:[20,85],lines:[
  line('booking','Identify the original booking',lt?'Mano susitikimas yra antradienį dešimtą valandą.':'Mi cita es el martes a las diez.','This lets the office identify the appointment that needs changing.'),
  line('alternative','Explain the problem and propose a replacement',lt?'Antradienį ryte turiu dirbti, todėl negaliu atvykti. Norėčiau užsiregistruoti penktadienį trečią valandą.':'El martes por la mañana tengo que trabajar y no puedo ir. Quisiera cambiarla al viernes a las tres.','The replacement is a request. Keep it separate from the original appointment.'),
  line('confirm','Request confirmation and acknowledge the documents',lt?'Atsinešiu dokumentus. Prašau patvirtinti naują laiką žinute.':'Voy a llevar los documentos. Por favor, confirmen el nuevo horario por mensaje.','The reader knows what you will bring and how to confirm the new arrangement.')
 ]},
 'A2-work.writing':{range:[25,90],lines:[
  line('change','State the change and its reason',lt?'Šiandien dirbu iš namų, nes laukiu meistro.':'Hoy trabajo desde casa porque espero a un técnico.','The temporary work-location change is linked to its reason.'),
  line('sequence','Give times or sequence',lt?'Darbą pradedu devintą. Į komandos susitikimą prisijungsiu internetu.':'Empiezo a trabajar a las nueve. Voy a conectarme a la reunión por internet.','The team gets a start time and knows how you will join the meeting.'),
  line('tasks','Assign work and explain when help is needed',lt?'Aš patikrinsiu dokumentus. Ryte prašau paruošti klientų sąrašą. Jei nespėsi paruošti sąrašo, pranešk iki vienuoliktos.':'Yo voy a revisar los documentos. Por la mañana prepara la lista de clientes, por favor. Si no terminas la lista, avísame antes de las once.','Each task has an owner. The condition and deadline explain when the colleague should ask for help.')
 ]},
 'A2-meals.writing':{range:[25,90],lines:[
  line('change','Identify the changed group size and time',lt?'Atvyksime penkiese, o ne keturiese. Galėsime būti tik pusę aštuonių.':'Vamos a llegar cinco personas, no cuatro. Solo podemos estar a las siete y media.','The changed number and time are explicit; the old number is not silently carried forward.'),
  line('meals','Separate changed and unchanged requests',lt?'Trims žmonėms reikės patiekalų be mėsos. Du vištienos patiekalai lieka. Padažą vis dar norėtume gauti atskirai.':'Tres personas necesitan platillos sin carne. Los dos platos de pollo se mantienen. Seguimos queriendo la salsa aparte.','This keeps the new meat-free count separate from the unchanged chicken dishes and sauce request.'),
  line('confirm','Request confirmation',lt?'Ar galėtumėte patvirtinti naują žmonių skaičių ir laiką?':'¿Podría confirmar el nuevo número de personas y la hora?','The restaurant is asked to confirm the change, rather than being treated as if it had already agreed.')
 ]}
};
for(const [id,lesson] of Object.entries(lessons)){lesson.id=id;lesson.model=lesson.lines.map(l=>l.text).join(' ');lesson.guidance='Connect the useful details: explain a reason, make the change clear and give the reader a next step. The suggested length is practice guidance, not a CEFR requirement.';}
Object.assign(api.lessons,lessons);
})();
