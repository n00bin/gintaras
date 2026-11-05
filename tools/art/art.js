/* Gintaras word pictures: the Flat warm set on a 256 x 256 square. Things are drawn here as plain shapes, and the people are the
   cast's chat faces (Notionists by Zoish, CC0, through the app's avatars.js), so they look the same everywhere. tools/make_art.py
   turns each word into pics/art/<name>.webp.
   Shape classes: o = gets the outline; c1..c9 = colour slots; ink, thin = a line only; sk = a hand or a face drawn here (white, like the cast);
   nv = navy. Add -s to a colour to use it as a line. No letters in a picture: nothing may give an answer away ("?" "=" and "z" are fine). */
const ST={
  pal:{c1:'#E89A1E',c2:'#FFF6E5',c3:'#8A5A2B',c4:'#2F6B4A',c5:'#7FB8D6',c6:'#FFFFFF',c7:'#D9644A',c8:'#F2C94C',c9:'#5B3A22',sk:'#FFFFFF',h1:'#3A2A22',h2:'#7A4524',h3:'#231F22',h4:'#EFEBE3',h5:'#A5713B',nv:'#34465C',blush:'#E8896E',sky:'#CFE6F2',night:'#2E3A5C',lawn:'#8DBB7A',dawn:'#FFDDB0',dusk:'#6D5A8C',disc:'#FBEBCB'},
  line:'#000',lw:3.4};
function css(){const p=ST.pal;return '<style>'+Object.keys(p).map(k=>'.'+k+'{fill:'+p[k]+'}.'+k+'-s{stroke:'+p[k]+'}').join('')+
  '.o{stroke:'+ST.line+';stroke-width:'+ST.lw+'px;stroke-linejoin:round;stroke-linecap:round}'+
  '.ink{fill:none;stroke:'+ST.line+';stroke-width:'+ST.lw+'px;stroke-linecap:round;stroke-linejoin:round}'+
  '.thin{fill:none;stroke:'+ST.line+';stroke-width:'+Math.max(2,ST.lw*.55)+'px;stroke-linecap:round}'+
  '.ln{fill:none;stroke:'+ST.line+';stroke-linecap:butt;stroke-linejoin:round}.rs{fill:none;stroke-linecap:round;stroke-linejoin:round}.lnf{fill:'+ST.line+'}</style>';}
/* ---------------- the cast ----------------
   chat(name,x,bottom,size,o): a person's chat face and clothes, drawn size px square with its middle at x and its lower edge at bottom.
   The lower edge goes past the frame (248 is the bottom of the disc), or behind something, so a body never ends in mid air.
   o: flip (looks left, not right); g (a gesture of the set: real arm and hand); gt ([degrees, size, x of the arm's foot]: that arm turned);
   lips (a mouth from the set, where the word asks for one); closed (eyes shut); nobody (head only, for under a blanket).
   The set's own faces all look right, have no shut eyes and no handshake: those are flipped or drawn here.
   MOUTH: the calm mouth a person usually has in a picture, where the chat one reads oddly at this size. CLOTH: the small colour on their clothes. */
const MOUTH={'Rūta':14,'Danutė':22,Darius:23,me:3};
const CLOTH={'Rūta':'#8DBB7A',me:'#E89A1E','Danutė':'#D9644A',Darius:'#7FB8D6',Jonas:'#C9A27A','Eglė':'#F2C94C'};
const LOOK_OF=n=>n==='me'?TOMAS_LOOK:CAST_LOOK[n];
const PEOPLE_LINE=.7;/* px added to the set's lines, so they hold up beside the things */
const castSvg=(name,size,o)=>{const a=LOOK_OF(name).split('.').map(Number),v=n=>'variant'+String(n).padStart(2,'0');
  const opt={hair:[a[0]===64?'hat':v(a[0])],beardProbability:a[1]?100:0,glassesProbability:a[2]?100:0,body:[v(a[3])],brows:[v(a[4])],eyes:[v(a[5])],lips:[v(o.lips||MOUTH[name]||a[6])],nose:[v(a[7])],radius:0,bodyIconProbability:0,gestureProbability:o.g?100:0};
  if(o.g)opt.gesture=[o.g];if(a[1])opt.beard=[v(a[1])];if(a[2])opt.glasses=[v(a[2])];
  const root=new DOMParser().parseFromString(Ava.svg(opt,size),'image/svg+xml').documentElement;
  [...root.querySelectorAll('metadata')].forEach(m=>m.remove());
  root.querySelectorAll('path[fill="#000"]').forEach(p=>{p.setAttribute('stroke','#000');p.setAttribute('stroke-width',(PEOPLE_LINE*1744/size).toFixed(1));p.setAttribute('stroke-linejoin','round');});
  return {root,G:[...root.querySelector('g[mask]').children]};};/* head, clothes, hair, lips, beard, nose, eyes, glasses, brows, gesture */
function chat(name,x,bottom,size,o){o=o||{};const {root,G}=castSvg(name,size,o);
  const first=G[1].querySelector('path[fill="#fff"]');if(first)first.setAttribute('fill',CLOTH[name]);
  if(o.nobody)G[1].innerHTML='';
  if(o.closed)G[6].innerHTML='<path d="M35 74 Q63 112 96 76 M226 74 Q262 112 296 76" fill="none" stroke="#000" stroke-width="16" stroke-linecap="round"/>';
  if(o.gt){const [r,k,px]=o.gt,t=G[9].getAttribute('transform')||'';G[9].setAttribute('transform','rotate('+r+' '+px+' 1744) translate('+px+' 1744) scale('+k+') translate('+(-px)+' -1744) '+t);}
  root.setAttribute('x',x-size/2);root.setAttribute('y',bottom-size);root.setAttribute('width',size);root.setAttribute('height',size);
  const s=new XMLSerializer().serializeToString(root);
  return o.flip?'<g transform="translate('+(2*x)+' 0) scale(-1 1)">'+s+'</g>':s;}
/* an arm of the set on its own, reaching in from outside the picture: its foot (px across the set's square) goes at x,y, turned rot degrees */
function castArm(g,x,y,size,rot,px,flip){const {G}=castSvg('me',size,{g});
  return '<g transform="translate('+x+' '+y+') rotate('+(rot||0)+') scale('+(flip?-size/1744:size/1744)+' '+(size/1744)+') translate('+(-(px||1500))+' -1744)">'+new XMLSerializer().serializeToString(G[9])+'</g>';}
const LW=.85;/* the hand and arm lines, as a share of the things' */
const dot=(x,y,r,c,x2)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="'+c+'"'+(x2||'')+'/>';
/* a hand: fingers and palm in one outlined shape. kind = open | fist | point | thumb | pinch; rot = where the fingers go, in degrees (0 is up) */
function mitt(x,y,k,kind,rot,skin){const r=(rot||0),q=Math.max(k,.8),l=ST.lw*LW*.8/q,fw=6.2,pr=10;
  const f={open:[[-34,19],[-11,22],[12,22],[35,19],[88,14]],fist:[[60,11]],point:[[0,23],[80,10]],thumb:[[0,23]],pinch:[[-22,22],[22,22]]}[kind||'open'];
  const ends=f.map(a=>{const t=(a[0]+r-90)*Math.PI/180;return 'M0 0 L'+(Math.cos(t)*a[1]).toFixed(1)+' '+(Math.sin(t)*a[1]).toFixed(1);}).join(' ');
  return '<g transform="translate('+x+' '+y+') scale('+q+')"><path d="'+ends+'" class="ln" style="stroke-linecap:round;stroke-width:'+(fw+2*l).toFixed(2)+'px"/><circle r="'+(pr+l).toFixed(2)+'" class="lnf"/><path d="'+ends+'" class="rs '+skin+'-s" style="stroke-width:'+fw+'px"/><circle r="'+pr+'" class="'+skin+'"/></g>';}
/* ---------------- things ---------------- */
const limb=(d,w,cls)=>'<path d="'+d+'" class="ln" style="stroke-linecap:round;stroke-width:'+(w+2*ST.lw*LW).toFixed(1)+'px"/><path d="'+d+'" class="rs '+cls+'-s" style="stroke-width:'+w+'px"/>';
/* an arm reaching in from outside the picture */
const reach=(d,to,s,kind,rot,cls)=>limb(d,20*s,cls||'c1')+mitt(to[0],to[1],s,kind,rot,'sk');
/* the handshake: one clasp, a thumb over the top and the other hand's fingers wrapping round */
const clasp=(x,y,s)=>'<g transform="translate('+x+' '+y+') rotate(-8) scale('+(s||1)+')"><rect x="-27" y="-15" width="54" height="31" rx="14" class="sk o"/><path d="M-13 -13 C-6 -24 8 -24 13 -11 C5 -14 -4 -14 -13 -13 Z" class="sk o"/><path d="M-3 -3 L10 9 M-10 0 L2 12 M4 -7 L17 4" class="thin"/></g>';
const star=(x,y,r,cls)=>{let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;d+=(i?'L':'M')+(x+Math.cos(a)*rr).toFixed(1)+' '+(y+Math.sin(a)*rr).toFixed(1);}return '<path d="'+d+'Z" class="'+(cls||'c8')+' o"/>';};
const spark=(x,y,r,c)=>star(x,y,r,c).replace(' o"','"');
const wave=(x,y)=>'<path d="M'+x+' '+y+' q9 8 7 20 M'+(x+11)+' '+(y-9)+' q13 12 9 30" class="thin"/>';
const zed=(x,y,s)=>'<path d="M'+x+' '+y+' h'+s+' l-'+s+' '+s+' h'+s+'" class="rs c6-s" style="stroke-width:'+(s/4.2+1.4).toFixed(1)+'px"/>';
const cup=(x,y,k)=>{k=k||1;const t=(px,py)=>(x+px*k)+' '+(y+py*k);return '<ellipse cx="'+x+'" cy="'+(y+44*k)+'" rx="'+(46*k)+'" ry="'+(10*k)+'" class="c2 o"/>'+
  '<path d="M'+(x+30*k)+' '+(y+4*k)+' c'+(22*k)+' -2 '+(24*k)+' '+(26*k)+' 0 '+(26*k)+'" class="ink"/>'+
  '<path d="M'+t(-32,-6)+' L'+t(32,-6)+' L'+t(26,36)+' Q'+t(0,46)+' '+t(-26,36)+' Z" class="c6 o"/><ellipse cx="'+x+'" cy="'+(y-6*k)+'" rx="'+(32*k)+'" ry="'+(7*k)+'" class="c9 o"/>';};
const spill=(x,y,s)=>'<g transform="translate('+x+' '+y+') scale('+s+')"><ellipse cx="-22" cy="31" rx="60" ry="16" class="c9 o"/><path d="M6 -24 C6 -46 34 -46 34 -22" class="ink" style="stroke-width:7px"/><path d="M-26 -28 L36 -24 Q50 0 36 26 L-26 30 Z" class="c6 o"/><ellipse cx="-26" cy="1" rx="10" ry="29" class="c9 o"/></g>';
const bubble=(x,y,w,h,inner)=>'<path d="M'+x+' '+y+' h'+w+' a12 12 0 0 1 12 12 v'+h+' a12 12 0 0 1 -12 12 h-'+(w-30)+' l-16 14 l2 -14 h-16 a12 12 0 0 1 -12 -12 v-'+h+' a12 12 0 0 1 12 -12 z" class="c6 o"/>'+inner;
const heart=(x,y,s)=>'<path transform="translate('+x+' '+y+') scale('+s+')" d="M0 6 C-10 -6 -22 4 -12 14 L0 26 L12 14 C22 4 10 -6 0 6 Z" class="c7 o"/>';
const sun=(x,y,r)=>{let ray='';for(let i=0;i<8;i++){const a=i*Math.PI/4;ray+='<path d="M'+(x+Math.cos(a)*(r+8))+' '+(y+Math.sin(a)*(r+8))+' L'+(x+Math.cos(a)*(r+20))+' '+(y+Math.sin(a)*(r+20))+'" class="ink"/>';}return ray+'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="c8 o"/>';};
/* a question mark and an equals sign, drawn, so they match the outlines */
const qm=(x,y,s,cls)=>'<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-11 -12 C-11 -30 13 -30 13 -11 C13 2 0 1 0 15" class="rs '+(cls||'c7')+'-s" style="stroke-width:8px"/><circle cx="0" cy="28" r="5" class="'+(cls||'c7')+'"/></g>';
const same=(x,y,s)=>'<path d="M'+(x-s)+' '+(y-s*.32)+' h'+(2*s)+' M'+(x-s)+' '+(y+s*.32)+' h'+(2*s)+'" class="ink"/>';
const glow=(x,y,r)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="c8" style="opacity:.5"/>';
const glowWide=(x,y,w,h)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+Math.min(80,h/2)+'" class="c8" style="opacity:.5"/>';
const thumb=(x,y,s,down,bare)=>'<g transform="translate('+x+' '+y+') rotate('+(down?180:0)+') scale('+s+')">'+(bare?'':'<rect x="-27" y="28" width="62" height="70" rx="6" class="c1 o"/>')+'<path d="M-41 -22 h22 C-16 -42 -20 -62 -8 -74 C4 -82 16 -72 12 -52 L9 -28 h28 c12 0 15 11 11 21 c5 8 4 17 -3 22 c3 9 0 16 -7 20 c1 9 -5 15 -13 15 h-38 c-12 0 -20 -3 -28 -6 Z" class="sk o"/><path d="M-20 -19 L-20 34" class="thin"/><path d="M24 -8 H46 M22 14 H43 M20 34 H37" class="thin"/></g>';
const tick=(x,y,r)=>'<g transform="translate('+x+' '+y+') scale('+r/19+')"><circle r="19" class="c4 o" style="stroke-width:'+(ST.lw*19/r)+'px"/><path d="M-8 0 l6 7 l11 -13" class="rs c6-s" style="stroke-width:5px"/></g>';
const nameTag=(x,y,w,h,inner)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="8" class="c6 o"/><path d="M'+x+' '+(y+h*.32)+' V'+(y+8)+' q0 -8 8 -8 H'+(x+w-8)+' q8 0 8 8 V'+(y+h*.32)+' Z" class="c7 o"/>'+(inner||'<path d="M'+(x+w*.2)+' '+(y+h*.68)+' q'+(w*.1)+' -'+(h*.16)+' '+(w*.2)+' 0 t'+(w*.2)+' 0 t'+(w*.2)+' 0" class="ink"/>');
const flagLT=(x,y,w,h)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h/3+'" class="c8"/><rect x="'+x+'" y="'+(y+h/3)+'" width="'+w+'" height="'+h/3+'" class="c4"/><rect x="'+x+'" y="'+(y+2*h/3)+'" width="'+w+'" height="'+h/3+'" class="c7"/><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="2" class="ink"/>';
const gauge=(deg,mouth)=>{const cx=128,cy=168,r=84,p=a=>[(cx+r*Math.cos(a*Math.PI/180)).toFixed(1),(cy-r*Math.sin(a*Math.PI/180)).toFixed(1)].join(' ');
  const arc=(a,b)=>'M'+p(a)+' A'+r+' '+r+' 0 0 1 '+p(b),nx=(cx+62*Math.cos(deg*Math.PI/180)).toFixed(1),ny=(cy-62*Math.sin(deg*Math.PI/180)).toFixed(1);
  return '<path d="'+arc(180,0)+'" class="ln" style="stroke-width:38px;stroke-linecap:round"/><path d="'+arc(180,122)+'" class="rs c7-s" style="stroke-width:28px"/><path d="'+arc(58,0)+'" class="rs c4-s" style="stroke-width:28px"/><path d="'+arc(122,58)+'" class="c8-s" style="fill:none;stroke-width:28px"/>'
    +limb('M'+cx+' '+cy+' L'+nx+' '+ny,9,'nv')+'<circle cx="'+cx+'" cy="'+cy+'" r="30" class="sk o"/>'+'<circle cx="'+(cx-10)+'" cy="'+(cy-6)+'" r="3.6" class="lnf"/><circle cx="'+(cx+10)+'" cy="'+(cy-6)+'" r="3.6" class="lnf"/><path d="'+mouth+'" class="thin" transform="translate('+cx+' '+cy+')" style="stroke-width:3.4px"/>';};
const bulb=(x,y,s)=>'<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 -36 C-24 -36 -32 -14 -24 2 C-20 10 -13 14 -13 24 H13 C13 14 20 10 24 2 C32 -14 24 -36 0 -36 Z" class="c8 o"/><rect x="-12" y="24" width="24" height="14" rx="3" class="c6 o"/><path d="M-8 0 L-3 10 L3 0 L8 10" class="thin" transform="translate(0 -4)"/></g>';
const clover=(x,y,s)=>{const leaf=a=>'<path transform="rotate('+a+')" d="M0 0 C-30 -12 -38 -46 -16 -52 C-8 -54 -2 -49 0 -42 C2 -49 8 -54 16 -52 C38 -46 30 -12 0 0 Z" class="lawn o" style="fill:#5FA36E"/>';return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 0 C6 24 14 40 30 56" class="ink" style="stroke-width:9px;stroke:#000"/><path d="M0 0 C6 24 14 40 30 56" class="rs c4-s" style="stroke-width:4px"/>'+[45,135,225,315].map(leaf).join('')+'<circle r="5" class="c4"/></g>';};
const calendar=(x,y,w,h)=>{const hd=h*.24,dots=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++)dots.push(dot(x+w*(.17+c*.22),y+hd+h*(.15+r*.21),3.6,r===1&&c===2?'c7':'c3'));
  return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" class="c6 o"/><path d="M'+x+' '+(y+hd)+' V'+(y+10)+' q0 -10 10 -10 H'+(x+w-10)+' q10 0 10 10 V'+(y+hd)+' Z" class="c7 o"/>'+dots.join('')+'<circle cx="'+(x+w*.61)+'" cy="'+(y+hd+h*.36)+'" r="11" class="ln" style="stroke-width:3.5px;stroke:#D9644A"/><path d="M'+(x+w*.28)+' '+(y-8)+' v18 M'+(x+w*.72)+' '+(y-8)+' v18" class="ink"/>';};
const book=(x,y,s,line)=>'<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 -40 C-22 -56 -58 -54 -78 -44 V42 C-58 32 -22 30 0 46 C22 30 58 32 78 42 V-44 C58 -54 22 -56 0 -40 Z" class="c6 o"/><path d="M0 -40 V46" class="ink"/>'+(line||'<path d="M-60 -24 C-44 -30 -28 -30 -14 -24 M-60 -6 C-44 -12 -28 -12 -14 -6 M-60 12 C-44 6 -28 6 -14 12 M14 -24 C28 -30 44 -30 60 -24 M14 -6 C28 -12 44 -12 60 -6 M14 12 C28 6 44 6 60 12" class="thin"/>')+'</g>';
const loop=(x,y,r,w,cls)=>{const p=a=>[(x+r*Math.cos(a)).toFixed(1),(y+r*Math.sin(a)).toFixed(1)].join(' '),a1=-.55,a0=-.55+1.05;const d='M'+p(a0)+' A'+r+' '+r+' 0 1 1 '+p(a1);const tx=x+r*Math.cos(a1),ty=y+r*Math.sin(a1),s=w*1.15;
  return limb(d,w,cls||'c1')+'<path d="M'+(tx-s).toFixed(1)+' '+(ty-s*.55).toFixed(1)+' L'+(tx+s).toFixed(1)+' '+(ty-s*.75).toFixed(1)+' L'+(tx+s*.45).toFixed(1)+' '+(ty+s*1.1).toFixed(1)+' Z" class="'+(cls||'c1')+' o"/>';};
const twoCurves=(cy)=>limb('M88 '+(cy-14)+' Q128 '+(cy-46)+' 164 '+(cy-16),7,'c1')+'<path d="M154 '+(cy-30)+' L180 '+(cy-10)+' L150 '+(cy-5)+' Z" class="c1 o"/>'+limb('M168 '+(cy+22)+' Q128 '+(cy+52)+' 92 '+(cy+24),7,'c4')+'<path d="M102 '+(cy+38)+' L76 '+(cy+18)+' L106 '+(cy+13)+' Z" class="c4 o"/>';
const globe=(x,y,r)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="c5 o"/><path d="M'+(x-r*.62)+' '+(y-r*.5)+' C'+(x-r*.25)+' '+(y-r*.82)+' '+(x+r*.12)+' '+(y-r*.5)+' '+(x-r*.05)+' '+(y-r*.18)+' C'+(x-r*.22)+' '+(y+r*.12)+' '+(x-r*.5)+' '+(y-r*.02)+' '+(x-r*.62)+' '+(y-r*.5)+' Z" class="lawn o"/><path d="M'+(x+r*.2)+' '+(y+r*.12)+' C'+(x+r*.58)+' '+(y-r*.1)+' '+(x+r*.82)+' '+(y+r*.22)+' '+(x+r*.46)+' '+(y+r*.7)+' C'+(x+r*.22)+' '+(y+r*.62)+' '+(x+r*.06)+' '+(y+r*.36)+' '+(x+r*.2)+' '+(y+r*.12)+' Z" class="lawn o"/>';
const pin=(x,y,s)=>'<path transform="translate('+x+' '+y+') scale('+s+')" d="M0 40 C-10 22 -30 4 -30 -14 A30 30 0 0 1 30 -14 C30 4 10 22 0 40 Z" class="c7 o"/><circle cx="'+x+'" cy="'+(y-14*s)+'" r="'+11*s+'" class="c6 o"/>';
const coffee=(x,y,k)=>'<path d="M'+(x-20*k)+' '+(y-58*k)+' q-10 -14 0 -28 q10 -14 0 -28 M'+(x+14*k)+' '+(y-58*k)+' q-10 -14 0 -28 q10 -14 0 -28" class="thin"/>'+cup(x,y,k);
const hill='<ellipse cx="128" cy="258" rx="170" ry="70" class="lawn o"/>';
const pointAt=(x1,y1,cx,cy,x2,y2,rot)=>reach('M'+x1+' '+y1+' Q'+cx+' '+cy+' '+x2+' '+y2,[x2,y2],1,'point',rot);

/* ---------------- the words, unit by unit ----------------
   sky = the colour behind a picture that has one; otherwise the warm disc. A word without a clear drawing isn't here: it shows no picture. */
const WORDS_ART=[
 /* ---- Basics ---- */
 {lt:'Labas',draw:()=>chat('Rūta',102,284,275,{g:'waveLongArm',lips:5})+wave(206,62)},
 {lt:'Ačiū',draw:()=>chat('me',70,262,222)+chat('Danutė',188,262,222,{flip:true})+heart(128,26,1.2)},
 {lt:'Prašau',draw:()=>chat('Danutė',102,284,262,{g:'waveLongArm'})+cup(190,88,.62)+'<path d="M180 56 q-6 -9 0 -18 M198 56 q-6 -9 0 -18" class="thin"/>'},
 {lt:'Kaip sekasi?',draw:()=>chat('Rūta',80,274,232)+bubble(134,30,84,46,'<circle cx="164" cy="62" r="17" class="sk o"/><circle cx="158" cy="58" r="2.6" class="lnf"/><circle cx="170" cy="58" r="2.6" class="lnf"/><path d="M157 66 Q164 73 171 66" class="thin"/>'+qm(204,58,.82))},
 {lt:'Gerai',draw:()=>castArm('okLongArm',122,306,430,0,1400)},
 {lt:'Sveiki',draw:()=>chat('Danutė',58,262,212)+chat('me',204,262,212,{flip:true,g:'waveLongArm'})},
 {lt:'Labas rytas',sky:'dawn',draw:()=>'<path d="M144 190 a48 48 0 0 1 96 0 Z" class="c8 o"/><path d="M192 130 v-22 M226 146 l16 -14 M158 146 l-14 -14" class="ink"/>'+hill+chat('Eglė',84,284,244)},
 {lt:'Laba diena',sky:'sky',draw:()=>sun(198,56,26)+chat('Darius',106,284,258,{g:'waveLongArm'})},
 {lt:'Labas vakaras',sky:'dusk',draw:()=>'<circle cx="208" cy="150" r="34" class="c1 o"/>'+spark(62,44,9,'c8')+spark(128,30,7,'c8')+spark(196,70,8,'c8')+chat('Jonas',96,284,256,{g:'waveLongArm'})},
 {lt:'Labanakt',sky:'night',draw:()=>'<path d="M196 30 a30 30 0 1 0 28 42 a24 24 0 1 1 -28 -42 z" class="c8 o"/>'+spark(146,36,9,'c8')+spark(92,44,7,'c8')+zed(128,84,14)+zed(148,62,11)
   +'<ellipse cx="82" cy="186" rx="66" ry="26" class="c6 o"/><g transform="rotate(-78 112 160)">'+chat('me',112,240,205,{closed:true,nobody:true})+'</g><path d="M126 160 C156 132 232 134 262 152 L262 262 L104 262 C100 226 108 186 126 160 Z" class="c5 o"/><path d="M126 160 C150 176 214 176 262 170" class="thin"/>'},
 {lt:'Viso gero',draw:()=>'<rect x="150" y="44" width="92" height="200" class="c3 o"/><rect x="164" y="60" width="64" height="184" class="c2 o"/><circle cx="218" cy="156" r="5" class="c1 o"/>'+chat('Jonas',88,284,252,{g:'waveLongArm'})},
 {lt:'Iki',draw:()=>chat('me',100,284,270,{g:'waveLongArm'})+wave(206,62)},
 {lt:'Iki pasimatymo',draw:()=>calendar(36,50,116,116)+castArm('waveLongArm',186,288,300,0,1400)+wave(214,84)},
 {lt:'Taip',draw:()=>thumb(122,118,1.3)},
 {lt:'Ne',draw:()=>thumb(134,138,1.3,true)},
 {lt:'Atsiprašau',draw:()=>chat('me',152,276,256,{g:'waveLongArm',lips:18,flip:true})+spill(72,206,.92)},
 {lt:'Puikiai',draw:()=>spark(70,40,12,'c1')+spark(186,34,12,'c1')+spark(128,16,8,'c1')+chat('me',128,290,285,{g:'waveLongArms',lips:5})},
 {lt:'Nieko tokio',draw:()=>chat('me',88,270,250,{g:'okLongArm'})+spill(186,196,.9)},
 {lt:'Malonu susipažinti',draw:()=>chat('Rūta',64,262,222)+chat('me',192,262,222,{flip:true})+limb('M78 262 Q92 216 118 200',15,'c6')+limb('M178 262 Q164 216 138 200',15,'c6')+clasp(128,196,.86)},
 {lt:'Sėkmės',draw:()=>clover(120,108,1.5)+spark(204,70,12,'c1')+spark(52,180,9,'c1')},
 /* I, you, he, she: a yellow glow says who the word is about */
 {lt:'Aš',draw:()=>glow(128,128,92)+chat('me',118,276,262,{g:'pointLongArm',gt:[-40,.8,1560]})},
 {lt:'Tu',draw:()=>glow(170,122,78)+chat('Darius',174,270,250,{flip:true})+castArm('pointLongArm',-44,226,250,80,1400,true)},
 {lt:'Jis',draw:()=>glow(128,128,92)+chat('Jonas',128,284,270)},
 {lt:'Ji',draw:()=>glow(128,128,92)+chat('Rūta',128,284,270)},
 {lt:'Mes',draw:()=>glowWide(12,52,232,176)+chat('Rūta',70,264,226)+chat('me',186,264,226,{flip:true})},
 {lt:'Jūs',draw:()=>glowWide(70,36,174,170)+chat('Danutė',126,258,200)+chat('Darius',204,258,200,{flip:true})+castArm('pointLongArm',-82,226,250,80,1400,true)},
 {lt:'Jie',draw:()=>glowWide(12,52,232,176)+chat('Jonas',70,264,226)+chat('Darius',186,264,226,{flip:true})},
 {lt:'Jos',draw:()=>glowWide(12,52,232,176)+chat('Rūta',70,264,226)+chat('Eglė',186,264,226,{flip:true})},
 {lt:'Aš esu Tomas',draw:()=>chat('me',128,274,262)+nameTag(84,190,88,50)},
 {lt:'Tu esi Jonas?',draw:()=>chat('Jonas',96,270,250)+castArm('pointLongArm',300,226,250,-80,1400)+qm(204,70,1.2)},
 {lt:'Jis yra Jonas',draw:()=>chat('Jonas',96,270,250)+nameTag(44,186,76,46)+castArm('pointLongArm',300,226,250,-80,1400)},
 {lt:'Ji yra Rūta',draw:()=>chat('Rūta',96,270,250)+nameTag(44,186,76,46)+castArm('pointLongArm',300,226,250,-80,1400)},
 {lt:'Mes esame čia',draw:()=>hill+chat('me',78,262,190)+chat('Rūta',176,262,190,{flip:true})+pin(128,62,1.1)},
 {lt:'Mano vardas Tomas',draw:()=>chat('me',128,252,236)+nameTag(66,160,124,74)},
 {lt:'Koks tavo vardas?',draw:()=>chat('Eglė',76,276,232)+bubble(124,28,96,66,nameTag(136,40,62,46,'')+qm(210,60,.7))},
 {lt:'Aš esu iš Amerikos',draw:()=>chat('me',82,276,246)+'<path d="M178 214 V46" class="ink" style="stroke-width:6px"/>'+'<rect x="178" y="50" width="58" height="40" class="c6 o"/><path d="M178 56 h58 M178 68 h58 M178 80 h58" class="rs c7-s" style="stroke-width:6px;stroke-linecap:butt"/><rect x="178" y="50" width="26" height="22" class="nv"/><rect x="178" y="50" width="58" height="40" class="ink"/>'},
 {lt:'Iš kur?',draw:()=>globe(112,136,76)+qm(208,76,1.5)},
 {lt:'Kavos?',draw:()=>coffee(98,160,1.2)+qm(208,92,1.5)},
 {lt:'Arbatos?',draw:()=>cup(98,160,1.2).replace(/class="c9 o"/,'class="c8 o"')+'<path d="M124 158 C146 178 150 196 150 208" class="thin"/><rect x="138" y="206" width="24" height="26" rx="3" class="c7 o"/>'+qm(208,92,1.5)},
 /* ---- Small talk ---- */
 {lt:'Gerai, ačiū',draw:()=>chat('me',92,278,256,{g:'okLongArm'})+heart(200,36,1.2)},
 {lt:'O tau?',draw:()=>chat('me',62,270,206)+chat('Rūta',194,270,206,{flip:true})+qm(128,54,1.1)},
 {lt:'Neblogai',draw:()=>gauge(38,'M-9 7 Q0 15 9 7')},
 {lt:'Taip sau',draw:()=>gauge(90,'M-9 10 L9 10')},
 {lt:'Man irgi gerai',draw:()=>chat('Rūta',60,270,216)+chat('me',196,270,216,{flip:true})+thumb(106,208,.44,false,true)+thumb(150,208,.44,false,true)+same(128,48,15)},
 {lt:'Aš irgi',draw:()=>chat('Rūta',66,274,196)+chat('me',190,274,196,{flip:true})+bubble(30,36,64,36,heart(66,44,1))+bubble(158,36,64,36,heart(194,44,1))+same(128,58,14)},
 {lt:'Ką veiki?',draw:()=>chat('Jonas',76,284,218)+bubble(84,34,112,44,'<g transform="translate(110 58) scale(.27)"><path d="M0 -40 C-22 -56 -58 -54 -78 -44 V42 C-58 32 -22 30 0 46 C22 30 58 32 78 42 V-44 C58 -54 22 -56 0 -40 Z" class="c5 o" style="stroke-width:12px"/></g><circle cx="150" cy="58" r="13" class="c1 o"/><path d="M138 54 Q150 61 162 54 M150 45 V71" class="thin"/>'+qm(184,55,.72))},
 {lt:'Nieko ypatingo',draw:()=>chat('Jonas',128,288,280,{g:'waveLongArms',lips:24})},
 {lt:'Labai malonu',draw:()=>limb('M-6 214 Q50 184 112 168',34,'c4')+limb('M262 214 Q206 184 144 168',34,'c1')+clasp(128,160,1.75)+heart(128,44,2)},
 {lt:'Ir tau',draw:()=>chat('Eglė',60,270,190)+chat('me',196,270,190,{flip:true})+twoCurves(70)},
 {lt:'Aš truputį kalbu lietuviškai',draw:()=>chat('me',72,276,226)+bubble(126,28,92,50,flagLT(144,38,62,36))+'<rect x="132" y="122" width="96" height="22" rx="11" class="c6 o"/><rect x="134" y="124" width="24" height="18" rx="9" class="c1"/>'},
 {lt:'Kaip tai pasakyti lietuviškai?',draw:()=>chat('me',72,282,220)+bubble(112,28,104,54,flagLT(128,40,50,32)+qm(200,58,.76))+'<circle cx="184" cy="184" r="30" class="c7 o"/><path d="M184 156 q2 -14 14 -18" class="ink"/><path d="M186 150 q14 -10 22 -2 q-10 10 -22 2 Z" class="lawn o"/>'},
 {lt:'Ką reiškia šis žodis?',draw:()=>book(128,164,1.25,'<rect x="-64" y="-14" width="52" height="16" rx="4" class="c8"/><path d="M-60 -32 C-44 -38 -28 -38 -14 -32 M-60 -6 C-44 -12 -28 -12 -14 -6 M-60 16 C-44 10 -28 10 -14 16 M14 -32 C28 -38 44 -38 60 -32 M14 -8 C28 -14 44 -14 60 -8 M14 16 C28 10 44 10 60 16" class="thin"/>')+qm(128,62,1.5)},
 {lt:'Aš nelabai suprantu',draw:()=>chat('me',98,278,258,{lips:1})+'<path transform="translate(198 62) scale(1.4)" d="M-22 2 C-30 -20 8 -32 22 -14 C34 4 2 22 -8 6 C-14 -8 14 -18 16 -2 C16 8 2 10 2 2" class="ink" style="stroke-width:4px"/>'},
 {lt:'Ar gali pakartoti?',draw:()=>chat('me',90,278,256,{lips:1})+bubble(166,30,40,40,'<path d="M198 68 A15 15 0 1 1 195.6 50.4" class="ink"/><path d="M188 42 L204 52 L187 60 Z" class="lnf"/>')},
 {lt:'Palauk',draw:()=>chat('Jonas',70,274,226,{lips:24})+castArm('waveLongArm',172,300,330,0,1400)},
 {lt:'Teisingai',draw:()=>tick(128,128,82)+spark(214,54,13,'c1')+spark(40,72,10,'c1')},
 {lt:'Aš mokausi',draw:()=>chat('me',128,226,226)+'<rect x="0" y="186" width="256" height="76" class="c3 o"/>'+book(124,166,.92)+limb('M196 178 L216 136',7,'c8')},
 {lt:'Dar kartą',draw:()=>loop(128,128,68,24,'c1')},
 {lt:'Supratau',draw:()=>chat('Eglė',92,282,252,{g:'pointLongArm'})+bulb(196,62,1)+'<path d="M154 42 l-10 -10 M238 42 l10 -10" class="ink"/>'},
];
function artSvg(item){const body=item.draw();
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256"><defs><clipPath id="cl"><circle cx="128" cy="128" r="120"/></clipPath></defs>'+css()+'<circle cx="128" cy="128" r="120" class="'+(item.sky||'disc')+'"/><g clip-path="url(#cl)">'+body+'</g></svg>';}
