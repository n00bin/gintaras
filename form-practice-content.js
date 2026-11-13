/* Practical forms use source details already prepared in the connected unit. */
(()=>{'use strict';
const course=window.WordamiSkillsContent;if(!course)return;
const lt=LANG.code==='lt',units={};
const rows=lt?[
 ['A1','A short meeting form',[['name','Vardas','Name'],['city','Miestas','City'],['time','Susitikimo laikas','Meeting time']],['Lina','Vilnius','septintą valandą'],['Rasa','Vilnius','aštuntą valandą'],'Vilniuje means in Vilnius. A city-name field uses Vilnius. Keep the meeting time from the selected source.'],
 ['A1-travel','A travel details form',[['stop','Stotelės vieta','Stop location'],['turn','Posūkis','Turn'],['time','Atvykimo laikas','Arrival time']],['prie parko','į dešinę','dešimtą'],['prie parduotuvės','į kairę','vienuoliktą'],'Keep the complete location and direction chunks: prie parko / prie parduotuvės and į dešinę / į kairę. Dešimtą and vienuoliktą give the arrival time.'],
 ['A2-services','An appointment change form',[['day','Susitikimo diena','Appointment day'],['time','Susitikimo laikas','Appointment time'],['documents','Reikalingi dokumentai','Required documents']],['antradienį','dešimtą valandą','dokumentus'],['penktadienį','trečią valandą','dokumentus'],'Antradienį / penktadienį answer when. Keep trečią valandą as one time expression; po pietų supplies the afternoon context in the original message. Dokumentus is the document form used after bring.']
]:[
 ['A1','A short meeting form',[['name','Nombre','Name'],['city','Ciudad','City'],['time','Hora de la reunión','Meeting time']],['Ana','Ciudad de México','a las siete'],['Rosa','Ciudad de México','a las ocho'],'Vivo en la Ciudad de México gives the city. In a city field, write Ciudad de México. Keep a las with the meeting time.'],
 ['A1-travel','A travel details form',[['stop','Ubicación de la parada','Stop location'],['turn','Vuelta','Turn'],['time','Hora de llegada','Arrival time']],['junto al parque','a la derecha','a las diez'],['junto a la tienda','a la izquierda','a las once'],'Keep the complete location chunks junto al parque / junto a la tienda. A la derecha and a la izquierda are opposite directions; a las introduces the time.'],
 ['A2-services','An appointment change form',[['day','Día de la cita','Appointment day'],['time','Hora de la cita','Appointment time'],['documents','Documentos necesarios','Required documents']],['el martes','a las diez','los documentos'],['el viernes','a las tres','los documentos'],'El martes / el viernes identify the day. Keep a las with the time. Los documentos names what to bring; the source gives the afternoon context for the new appointment.']
];
for(const [id,title,labels,first,second,note] of rows){const u=course.units.find(u=>u.id===id);if(!u)continue;
 units[id]={id,title,note,fields:labels.map(([key,label,meaning])=>({key,label,meaning})),variants:[
  {id:'original',title:'Record the original details',source:u.reading,sourceKind:'prepared reading',values:first},
  {id:'changed',title:id==='A2-services'?'Record the requested replacement':'Record the changed source details',source:u.listen,sourceKind:'prepared message shown as text',values:second}
 ],teaching:labels.map(([key,label,meaning],index)=>({label,meaning,example:first[index],secondExample:second[index]}))};
 const outcome=window.WordamiLearningDesign?.units[id]?.outcomes.writing;
 if(outcome){outcome.relatedScales=[...new Set([...(outcome.relatedScales||[]),'Notes, messages and forms'])];outcome.relatedPracticeIds=[...(outcome.relatedPracticeIds||[]),...units[id].variants.map(v=>'forms.'+id+'.'+v.id)];}
}
window.WordamiFormContent=Object.freeze({version:1,units});
})();
