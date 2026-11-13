/* Project-specific A1 models and planning. Existing drafts and completion IDs remain intact. */
(()=>{
'use strict';
const lt=LANG.code==='lt';
// Line IDs also key saved planning notes; retain them when editing teaching copy.
const line=(id,goal,text,why)=>({id,goal,text,why});
const lessons={
 'A1.profile':{range:[8,35],lines:[
  line('name','Give a name',lt?'Mano vardas Rasa.':'Me llamo Rosa.','This identifies the person writing.'),
  line('place','Say where you live or are from',lt?'Aš esu iš Lietuvos.':'Soy de México.','This supplies origin; a residence would also meet this goal.'),
  line('interest','Mention an interest',lt?'Man patinka muzika.':'Me gusta la música.','This gives the new group member something to talk about.')
 ]},
 'A1.home-note':{range:[6,30],lines:[
  line('home','Give a simple fact about home',lt?'Mano butas mažas.':'Mi casa es pequeña.','This gives the visitor one useful description.'),
  line('invitation','Suggest meeting tomorrow',lt?'Susitikime rytoj.':'Nos vemos mañana.','This proposes the meeting day.'),
  line('time','Give the meeting time',lt?'Aštuntą valandą.':'A las ocho.','This makes the arrangement usable; a day alone is incomplete.')
 ]},
 'A1.meeting-message':{range:[8,30],lines:[
  line('opening','Greet and introduce yourself',lt?'Labas! Mano vardas Lina.':'¡Hola! Me llamo Ana.','The reader can identify who is contacting them.'),
  line('day','Give a day',lt?'Susitikime rytoj.':'Nos vemos mañana.','This supplies tomorrow as the meeting day.'),
  line('time','Give a time',lt?'Septintą valandą.':'A las siete.','This supplies the time without changing the day.')
 ]},
 'A1-shopping.writing':{range:[6,25],lines:[
  line('apples','Name an item and quantity',lt?'Du obuoliai.':'Dos manzanas.','A short shopping note can list an item and its quantity without a full request sentence.'),
  line('bread','Name a different item',lt?'Norėčiau duonos.':'Quisiera pan.','The friend needs two different items; repeating apples twice does not add a second item.'),
  line('closing','Close politely',lt?'Ačiū, viso gero!':'Gracias, ¡hasta luego!','This closes the short note politely.')
 ]},
 'A1-home.writing':{range:[8,35],lines:[
  line('welcome','Welcome the visitor',lt?'Prašau užeiti.':'Pasa, por favor.','This tells the visitor they can come in.'),
  line('key','Locate a useful object',lt?'Raktas yra ant kėdės.':'La llave está sobre la silla.','This tells the visitor where to find the key.'),
  line('offer','Make a simple offer',lt?'Ar nori arbatos?':'¿Quieres un té?','This offers a drink; an appropriate useful instruction could also meet this goal.')
 ]},
 'A1-travel.writing':{range:[12,40],lines:[
  line('stop','Locate the stop',lt?'Stotelė yra prie parduotuvės.':'La parada está junto a la tienda.','The landmark identifies where the visitor should go.'),
  line('direction','Give a direction',lt?'Eikite tiesiai. Sukite į dešinę.':'Siga derecho. Dé vuelta a la derecha.','This gives the walking sequence. Right and left must stay distinct.'),
  line('bus','Give a useful bus detail',lt?'Autobusas atvažiuoja vienuoliktą.':'El autobús llega a las once.','The arrival time adds a practical transport detail; a learned ticket instruction is another valid choice.')
 ]}
};
for(const [id,lesson] of Object.entries(lessons)){
 lesson.id=id;lesson.model=lesson.lines.map(l=>l.text).join(' ');
 lesson.guidance='Use the information your reader needs. A short, complete message is fine; the suggested length is practice guidance, not a CEFR requirement.';
}
function mount({container,id,notes,onNote,draftField}){
 const lesson=lessons[id],ui=window.WordamiPracticeUI;if(!lesson||!ui)return null;
 const {node:n,button:b}=ui,panel=n('section',null,container.closest('#writing-studio')?'ws-card':'skills-panel');panel.style.overflowWrap='anywhere';
 panel.append(n('h3','Plan a useful message'),n('p',lesson.guidance,'a1-small'));
 const model=n('details');model.append(n('summary','Study a short worked model'));
 const text=n('p',lesson.model);text.lang=LANG.code;text.style.whiteSpace='pre-wrap';model.append(text);
 for(const entry of lesson.lines)model.append(n('h4',entry.goal),n('p',entry.text),n('p',entry.why));
 panel.append(model);
 const practice=n('div'),begin=b('Practise the purpose of each line',()=>{model.open=false;begin.disabled=true;question(0);});
 function question(index){practice.replaceChildren();if(index===lesson.lines.length){practice.append(n('p','Purpose practice complete. Choose your own details below, then write your message.'));return;}
  const goal=lesson.lines[index];practice.append(n('h4','Which line helps you: '+goal.goal.toLowerCase()+'?'));
  const status=n('p');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  for(const choice of [...lesson.lines].sort(()=>Math.random()-.5))practice.append(b(choice.text,()=>{if(choice.id!==goal.id){status.textContent='Compare what this line tells the reader, then try again.';return;}practice.replaceChildren(n('p',goal.why),b('Next purpose',()=>question(index+1)));}));practice.append(status);
 }
 panel.append(begin,practice,n('h4','Choose your own details'));
 for(const entry of lesson.lines){const label=n('label',entry.goal),field=n('input');field.type='text';field.maxLength=300;field.value=notes[entry.id]||'';field.setAttribute('aria-label','Plan: '+entry.goal);field.oninput=()=>onNote(entry.id,field.value);label.append(field);panel.append(label);}
 panel.append(n('p','Planning notes are saved with this project. They are not copied into your draft automatically.','a1-small'),b('Write using my plan',()=>draftField.focus()));
 container.append(panel);return panel;
}
const formatPlan=(id,notes)=>lessons[id]?.lines.filter(l=>typeof notes?.[l.id]==='string'&&notes[l.id].trim()).map(l=>l.goal+': '+notes[l.id]).join('\n')||'';
window.WordamiWritingPreparation=Object.freeze({version:1,lessons,get:id=>lessons[id]||null,formatPlan,mount});
})();
