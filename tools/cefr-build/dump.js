const fs=require('fs');const c={};new Function('c','function esc(s){return s};function norm(s){return s.toLowerCase().trim()};'+fs.readFileSync('G:/ai_projects/gintaras/lang/lt.js','utf8')+';Object.assign(c,{COURSE,ITEMS});')(c);
const lt=new Set(),en=new Set();for(const i of c.ITEMS){if(+i.unit.id.slice(1)>=44)continue;lt.add(i.lt.toLowerCase());en.add(i.en.toLowerCase());}
fs.writeFileSync(process.argv[2],JSON.stringify({lt:[...lt],en:[...en]}));console.log(lt.size,en.size, c.COURSE.map(u=>u.id).join(' '));
