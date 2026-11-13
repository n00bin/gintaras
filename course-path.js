/* One course path: ordinary teaching units and required all-skills units through C2. */
(()=>{
'use strict';
const studio=window.WordamiSkillsStudio,content=window.WordamiSkillsContent;
if(!LANG_PREVIEW||!studio||!content)return;
const units=content.units||content.levels,rows=new Map(),originalSteps=[...STEPS];
const anchors=LANG.code==='lt'?['u20','u16','u32','u32','u34','u17','u17','u18']:['u25','u16','u30','u30','u33','u13','u13','u36'];
const wanted=Object.fromEntries(['A1','A1-shopping','A1-home','A1-travel','A2','A2-services','A2-work','A2-meals'].map((id,i)=>[id,anchors[i]]));
wanted['A1-capstone']=anchors[3];wanted['A2-capstone']=anchors[7];
const last=[...PATH].reverse().find(id=>typeof id==='string'&&UNIT_BY[id]&&!UNIT_BY[id].retire);
const groups=new Map();let position=-1;
for(const [index,unit] of units.entries()){
 let anchor=wanted[unit.id]||last,at=PATH.indexOf(anchor);if(at<0)throw Error('Missing course anchor '+anchor);
 if(at<position){anchor=PATH[position];at=position;}position=at;
 const id='course.'+unit.id;rows.set(id,{id,unitId:unit.id,title:unit.theme,band:unit.band||unit.id,anchor});
 if(!groups.has(anchor))groups.set(anchor,[]);groups.get(anchor).push(id);
}
for(const [anchor,ids] of [...groups].reverse()){
 const additions=[];let band=null;
 for(const id of ids){const row=rows.get(id);if(['B1','B2','C1','C2'].includes(row.band)&&row.band!==band){additions.push({part:row.band+' · Use the language',sub:'Units for reading, listening, speaking, conversation, explaining and writing'});band=row.band;}additions.push(id);}
 PATH.splice(PATH.indexOf(anchor)+1,0,...additions);
}
const order=PATH.filter(id=>typeof id==='string'&&(UNIT_BY[id]||CONV_BY[id]||rows.has(id))),signature=JSON.stringify(order);
if(S.coursePathSignature!==signature){
 const previous=Array.isArray(S.coursePathOrder)?S.coursePathOrder:originalSteps,index=S.placedTo||0,anchor=previous[index];
 if(index>0)S.placedTo=anchor?Math.max(0,order.indexOf(anchor)):index>=previous.length?order.length:index;
 S.coursePathSignature=signature;S.coursePathOrder=order;save();
}
STEPS.splice(0,STEPS.length,...order);
function status(id){const row=rows.get(id);return row?studio.progress(row.unitId):null;}
function renderUnit(id,parent){
 const row=rows.get(id),done=status(id)?.complete===true,open=studio.isOpen(row.unitId),section=document.createElement('section');
 section.id='unit-'+id.replaceAll('.','-');section.className='unit'+(open?'':' locked')+(done?' done':'');section.dataset.curriculumUnit=row.unitId;section.dataset.required='true';
 const head=document.createElement('div');head.className='unit-head';const text=document.createElement('div'),label=document.createElement('span');label.className='eyebrow';label.textContent=row.band+' · Required skill unit';
 const title=document.createElement('h2');title.textContent=row.title;const description=document.createElement('span');description.className='sub';description.textContent=done?'All required lessons and checks complete':open?'Learn, read, listen, speak, interact and write':'Complete the preceding unit first';text.append(label,title,description);head.append(text);section.append(head);
 const button=document.createElement('button');button.type='button';button.className='lesson-row'+(done?' did':'');button.textContent=done?'Review this unit':open?'Continue required unit':'Finish the preceding unit';button.disabled=!open;button.onclick=()=>studio.openUnit(row.unitId);section.append(button);parent.append(section);
}
window.WordamiCoursePath=Object.freeze({isUnit:id=>rows.has(id),done:id=>status(id)?.complete===true,started:id=>{const row=rows.get(id);return !!row&&studio.started(row.unitId);},title:id=>rows.get(id)?.title,canEnter:unitId=>stepUnlocked('course.'+unitId),renderUnit,units:()=>[...rows.values()].map(row=>({...row}))});
window.addEventListener('wordami:curriculum-progress',()=>renderTree());
window.addEventListener('wordami:practice-extensions-ready',()=>renderTree());
renderTree();
})();
