const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),out={};
for(const lang of ['lt','es']){
 let data={};
 new Function('out','function norm(s){return s.toLowerCase().trim()}function esc(s){return s;}'+fs.readFileSync(path.join(root,'lang',lang+'.js'),'utf8')+';Object.assign(out,{units:COURSE.map(u=>({id:u.id,title:u.en,retired:!!u.retire,items:u.lessons.filter(l=>!l.speak).flatMap(l=>l.items.map(i=>({id:i.id,text:i.lt,en:i.en,lesson:l.id})))})),path:PATH.filter(p=>typeof p==="string")});')(data);
 out[lang]=data;
}
fs.writeFileSync(path.join(root,'docs/cefr/native-source-cards.json'),JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(Object.fromEntries(Object.entries(out).map(([l,d])=>[l,{units:d.units.length,cards:d.units.reduce((n,u)=>n+u.items.length,0)}]))));
