/* Build applications from reviewed source-card IDs; never invent target-language sentences. */
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const inventory=JSON.parse(fs.readFileSync(path.join(root,'docs/cefr/native-source-cards.json'),'utf8'));
const blueprints=require('./native_application_blueprints');
const result={};
for(const lang of ['lt','es']){
 const rows=blueprints[lang].map(([unitId,indices,title,brief,read1,read2])=>{
  const unit=inventory[lang].units.find(u=>u.id===unitId);if(!unit)throw Error('Missing unit '+lang+unitId);
  const cards=indices.map(i=>unit.items[i]);if(cards.some(c=>!c)||new Set(cards.map(c=>c.id)).size!==4)throw Error('Invalid sources '+lang+unitId);
  return {unitId,title,brief,questions:[read1,read2],cards:cards.map(c=>({id:c.id,meaning:lang==='lt'&&unitId==='u12'&&c.en==='zeppelins'?'potato dumplings':c.en}))};
 });
 const expected=inventory[lang].units.filter(u=>!(lang==='lt'&&['u1','u21','u3'].includes(u.id))).map(u=>u.id);
 if(rows.length!==expected.length||expected.some(id=>!rows.some(r=>r.unitId===id)))throw Error('Incomplete unit coverage '+lang);
 result[lang]=rows;
}
fs.writeFileSync(path.join(root,'native-application-content.js'),'/* Authored situations; every target-language form comes from a source card. */\nwindow.WordamiNativeApplicationBlueprints='+JSON.stringify(result,null,2)+';\n');
let base=fs.readFileSync(path.join(root,'.release-lithuanian-art/foundation-content.js'),'utf8').replace('window.WordamiTopicContent=','window.WordamiUnitApplicationContent=');
base=base.replace("if(!window.WordamiActivities||LANG.code!=='lt')return;","if(!window.WordamiActivities)return;if(LANG.code!=='lt'){window.WordamiUnitApplicationContent=[];return;}");
base+=`\n(()=>{
'use strict';
const rows=window.WordamiNativeApplicationBlueprints?.[LANG.code];if(!rows||!window.WordamiActivities)return;
if(LANG.code==='lt')WordamiUnitApplicationContent.forEach((t,i)=>t.unitId=['u1','u21','u3'][i]);
for(const row of rows){
 const keys=['a','b','c','d'],cards=row.cards.map(c=>BYID[c.id]);if(cards.some(c=>!c))throw Error('Application source unavailable: '+row.unitId);
 const options=pair=>pair.map(i=>({value:keys[i],label:row.cards[i].meaning}));
 WordamiUnitApplicationContent.push({id:'unit-'+row.unitId,unitId:row.unitId,objective:'apply-'+row.unitId,title:row.title,brief:row.brief,sources:Object.fromEntries(keys.map((key,i)=>[key,{cardId:cards[i].id}])),speech:'a',build:v=>{
  const first=v?1:0,second=v?3:2;
  return [
   {skill:'reading',prompt:row.questions[0],lines:[keys[first]],options:options([0,1]),answer:keys[first]},
   {skill:'reading',prompt:row.questions[1],lines:[keys[second]],options:options([2,3]),answer:keys[second]},
   {skill:'listening',prompt:row.questions[0],audio:keys[1-first],options:options([0,1]),answer:keys[1-first]},
   {skill:'listening',prompt:row.questions[1],audio:keys[5-second],options:options([2,3]),answer:keys[5-second]},
   {skill:'writing',prompt:row.brief+' Use the learned wording for: “'+row.cards[first].meaning+'”.',accept:[keys[first]],policy:'one'},
   {skill:'writing',prompt:'Continue the same situation. Use the learned wording for: “'+row.cards[second].meaning+'”.',accept:[keys[second]],policy:'one'}
  ];
 }});
}
})();\n`;
fs.writeFileSync(path.join(root,'unit-application-content.js'),base);
let runner=fs.readFileSync(path.join(root,'.release-lithuanian-art/foundation-practice.js'),'utf8');
runner=runner.replace('content=window.WordamiTopicContent','content=window.WordamiUnitApplicationContent').replace('window.WordamiTopicCatalogue=','window.WordamiUnitApplicationCatalogue=').replace('window.WordamiA1Placement.find','window.WordamiUnitPlacement.find');
runner=runner.replace("ITEMS.find(i=>(i.lt0||i.lt)===text)","typeof text==='object'?BYID[text.cardId]:ITEMS.find(i=>(i.lt0||i.lt)===text)");
runner=runner.replace("registered.push({id,topic:topic.id,title:topic.title});","registered.push({id,topic:topic.id,title:topic.title,unitId:topic.unitId});");
runner=runner.replace("requiredPhrases:phrases,tasks:","ownerUnit:topic.unitId,requiredPhrases:phrases,requiredStudy:['unit-application-teaching.'+topic.unitId],tasks:");
runner=runner.replace("requiredPhrases:[sources[topic.speech].lt],tasks:","ownerUnit:topic.unitId,requiredPhrases:[sources[topic.speech].lt],requiredStudy:['unit-application-teaching.'+topic.unitId],tasks:");
runner=runner.replace("b('Try a new visit',()=>start(true)));return;}","b('Try a new visit',()=>start(true)));const next=window.WordamiUnitSkills?.nextPending();if(spoken&&next&&next.activityId!==id)dialog.append(n('p','This test-out also covers earlier units. Continue with the next required check.'),b('Next required check',()=>WordamiUnitSkills.continueTestout(),'a1-primary'));return;}");
fs.writeFileSync(path.join(root,'unit-application.js'),runner);
console.log(JSON.stringify({lt:result.lt.length+3,es:result.es.length,total:result.lt.length+result.es.length+3,variants:160,sourceLanguage:'existing immutable card IDs; no new recordings needed'}));
