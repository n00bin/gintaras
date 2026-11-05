/* Gintaras word pictures: the Flat warm set, drawn here as plain shapes on a 256 x 256 square, so the art is entirely the
   project's own, the cast included. tools/make_art.py turns each word into pics/art/<name>.webp.
   Shape classes: o = gets the outline; c1..c9 = colour slots; ink, thin = a line only; sk, sk2 = skin; h1..h5 = hair; nv = navy.
   Add -s to a colour to use it as a line. No letters in a picture: nothing may give an answer away ("?" "=" and "z" are fine). */
const ST={
  pal:{c1:'#E89A1E',c2:'#FFF6E5',c3:'#8A5A2B',c4:'#2F6B4A',c5:'#7FB8D6',c6:'#FFFFFF',c7:'#D9644A',c8:'#F2C94C',c9:'#5B3A22',sk:'#F7CFAE',sk2:'#EDBB93',h1:'#3A2A22',h2:'#7A4524',h3:'#231F22',h4:'#EFEBE3',h5:'#A5713B',nv:'#34465C',blush:'#E8896E',sky:'#CFE6F2',night:'#2E3A5C',lawn:'#8DBB7A',dawn:'#FFDDB0',dusk:'#6D5A8C',disc:'#FBEBCB'},
  line:'#3B2A1A',lw:5};
function css(){const p=ST.pal;return '<style>'+Object.keys(p).map(k=>'.'+k+'{fill:'+p[k]+'}.'+k+'-s{stroke:'+p[k]+'}').join('')+
  '.o{stroke:'+ST.line+';stroke-width:'+ST.lw+'px;stroke-linejoin:round;stroke-linecap:round}'+
  '.ink{fill:none;stroke:'+ST.line+';stroke-width:'+ST.lw+'px;stroke-linecap:round;stroke-linejoin:round}'+
  '.thin{fill:none;stroke:'+ST.line+';stroke-width:'+Math.max(2,ST.lw*.55)+'px;stroke-linecap:round}'+
  '.ln{fill:none;stroke:'+ST.line+';stroke-linecap:butt;stroke-linejoin:round}.rs{fill:none;stroke-linecap:round;stroke-linejoin:round}.lnf{fill:'+ST.line+'}</style>';}
/* ---------------- the cast ----------------
   person(name,x,y,k,opts): (x,y) is the middle of the head, k the size. The body runs off the bottom and the frame clips it.
   An arm starts inside the shoulder: its outline goes behind the body and its colour over it, so the two join with no seam.
   opts: face (each person has their own usual one, see LOOKS); outfit = doctor; back = seen from behind;
   arms = [{from:'l'|'r',c:[x,y],to:[x,y],hand,rot,front}] in picture coordinates (front = the whole arm over the body and head). */
const LW=.85;/* people's outline, as a share of the objects': faces are small, so a touch lighter */
const lineW=(k,f)=>(ST.lw*(f||LW)/k).toFixed(2);
const sP=(d,c,k,f)=>'<path d="'+d+'" class="'+c+' o" style="stroke-width:'+lineW(k,f)+'px"/>';
const sC=(x,y,r,c,k,f)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="'+c+' o" style="stroke-width:'+lineW(k,f)+'px"/>';
const thin=(d,k,f)=>'<path d="'+d+'" class="ln" style="stroke-linecap:round;stroke-width:'+lineW(k,f||.6)+'px"/>';
const fill=(d,c)=>'<path d="'+d+'" class="'+c+'"/>';
const dot=(x,y,r,c,x2)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="'+c+'"'+(x2||'')+'/>';
const curls=(k,list,c)=>list.map(p=>sC(p[0],p[1],p[2],c,k)).join('');
const LOOKS={
  'Rūta':{skin:'sk',top:'c4',usual:'warm',
    back:k=>sP('M-33 -4 C-37 -46 37 -46 33 -4 L36 40 L-36 40 Z','h1',k),
    front:k=>sP('M-30 -3 C-34 -42 34 -42 30 -3 L25 -13 C10 -17 -10 -17 -25 -13 Z','h1',k)+sP('M-31 -9 C-37 16 -36 46 -41 74 L-24 74 C-25 48 -26 22 -25 -2 Z','h1',k)+sP('M31 -9 C37 16 36 46 41 74 L24 74 C25 48 26 22 25 -2 Z','h1',k),
    cloth:k=>thin('M-13 42 Q0 56 13 42',k)+dot(-24,74,3.4,'h1')+dot(22,82,3.4,'h1')+dot(-6,92,3.4,'h1')+dot(28,108,3.4,'h1')+dot(-30,112,3.4,'h1')+dot(6,122,3.4,'h1')},
  Jonas:{skin:'sk',top:'c5',usual:'smirk',
    front:k=>sP('M-30 -6 C-37 -30 -21 -43 -6 -39 C4 -47 29 -41 30 -6 C27 -18 21 -23 12 -21 C2 -25 -14 -25 -22 -17 Z','h2',k),
    mouth:k=>sP('M-12 11 C-7 6 -2 7 0 9 C2 7 7 6 12 11 C7 15 -7 15 -12 11 Z','h2',k,.5),
    cloth:k=>sP('M-14 40 L14 40 L14 300 L-14 300 Z','h3',k)},
  'Danutė':{skin:'sk2',top:'c7',usual:'kind',
    back:k=>sP('M-36 -4 C-39 -46 39 -46 36 -4 C39 12 37 26 31 31 L-31 31 C-37 26 -39 12 -36 -4 Z','h4',k),
    front:k=>sP('M-30 2 C-33 -36 31 -38 30 0 C18 -15 2 -20 -13 -23 C-20 -16 -26 -8 -30 2 Z','h4',k),
    specs:k=>'<circle cx="-11" cy="-1" r="9" class="ln" style="stroke-width:'+lineW(k,.55)+'px"/><circle cx="11" cy="-1" r="9" class="ln" style="stroke-width:'+lineW(k,.55)+'px"/>'+thin('M-2 -2 Q0 -4 2 -2 M-20 -2 L-28 -5 M20 -2 L28 -5',k,.5),
    cloth:k=>sP('M-22 38 C-34 44 -30 62 -12 58 L12 58 C30 62 34 44 22 38 Z','c7',k,.7)+thin('M-6 58 L-7 84 M6 58 L7 84',k,.5)},
  Darius:{skin:'sk2',top:'nv',usual:'steady',
    front:k=>curls(k,[[-26,-12,10],[26,-12,10],[-22,-26,11],[22,-26,11],[-9,-33,12],[9,-33,12]],'h3')+fill('M-20 -14 C-10 -28 10 -28 20 -14 L14 -30 L-14 -30 Z','h3'),
    mouth:k=>fill('M-13 13 C-7 9 7 9 13 13 C10 15 -10 15 -13 13 Z','h3')+sP('M-11 20 C-9 33 9 33 11 20 C6 24 -6 24 -11 20 Z','h3',k,.5),
    cloth:k=>sP('M-15 40 L15 40 L19 300 L-19 300 Z','c2',k,.7)},
  'Eglė':{skin:'sk',top:'c8',usual:'bright',
    back:k=>sP('M4 -36 C34 -60 58 -26 44 12 C40 -6 26 -20 8 -28 Z','h2',k)+sP('M-31 -4 C-35 -44 35 -44 31 -4 L30 14 L-30 14 Z','h2',k),
    front:k=>sP('M-30 -3 C-34 -42 34 -42 30 -3 L25 -13 C10 -17 -10 -17 -25 -13 Z','h2',k)+sC(0,-36,6.5,'c6',k,.6),
    cloth:k=>''},
  me:{skin:'sk',top:'c1',usual:'soft',
    front:k=>sP('M-30 -4 C-35 -38 -9 -43 6 -39 C25 -37 35 -22 30 -2 C26 -12 18 -20 6 -22 C-6 -18 -20 -16 -30 -4 Z','h5',k),
    cloth:k=>sP('M-15 41 C-8 50 8 50 15 41 L13 36 L-13 36 Z','c3',k,.6)}};
const eyes=(y,r)=>dot(-11,y,r||3.7,'lnf')+dot(11,y,r||3.7,'lnf');
const FACES={
  warm:k=>eyes(-1)+thin('M-9 11 Q0 20 9 11',k),
  smirk:k=>eyes(-1)+thin('M-5 21 Q3 25 10 18',k),
  kind:k=>thin('M-15 -1 Q-11 -6 -7 -1 M7 -1 Q11 -6 15 -1',k)+thin('M-8 13 Q0 20 8 13',k),
  steady:k=>eyes(-1)+thin('M-17 -11 L-6 -11 M6 -11 L17 -11',k,.8),
  bright:k=>eyes(-1)+thin('M-17 -11 Q-11 -16 -6 -12 M6 -12 Q11 -16 17 -11',k,.5)+thin('M-9 11 Q0 19 9 11',k),
  soft:k=>eyes(-1)+thin('M-7 13 Q0 18 7 13',k),
  big:k=>eyes(-2)+sP('M-12 8 Q0 11 12 8 Q11 26 0 26 Q-11 26 -12 8 Z','c6',k,.55),
  asleep:k=>thin('M-15 -2 Q-11 3 -7 -2 M7 -2 Q11 3 15 -2',k)+thin('M-5 13 Q0 17 5 13',k),
  oh:k=>eyes(-2,3.9)+thin('M-17 -13 L-7 -15 M7 -15 L17 -13',k)+sC(0,15,4.6,'c9',k,.45),
  sorry:k=>eyes(-1)+thin('M-17 -9 L-7 -15 M7 -15 L17 -9',k)+thin('M-8 16 Q0 8 8 16',k),
  puzzled:k=>eyes(-1)+thin('M-17 -13 L-6 -11 M7 -16 L17 -13',k)+thin('M-7 14 Q2 16 8 11',k),
  flat:k=>eyes(-1)+thin('M-8 14 L8 14',k),
  shrug:k=>eyes(-1)+thin('M-17 -14 Q-11 -19 -6 -14 M6 -14 Q11 -19 17 -14',k)+thin('M-8 15 Q-3 12 0 14 Q4 16 8 12',k)};
/* a hand: fingers and palm in one outlined shape. kind = open | fist | point | thumb | pinch; rot = where the fingers go, in degrees (0 is up) */
function mitt(x,y,k,kind,rot,skin){const r=(rot||0),q=Math.max(k,.8),l=ST.lw*LW*.8/q,fw=6.2,pr=10;
  const f={open:[[-34,19],[-11,22],[12,22],[35,19],[88,14]],fist:[[60,11]],point:[[0,23],[80,10]],thumb:[[0,23]],pinch:[[-22,22],[22,22]]}[kind||'open'];
  const ends=f.map(a=>{const t=(a[0]+r-90)*Math.PI/180;return 'M0 0 L'+(Math.cos(t)*a[1]).toFixed(1)+' '+(Math.sin(t)*a[1]).toFixed(1);}).join(' ');
  return '<g transform="translate('+x+' '+y+') scale('+q+')"><path d="'+ends+'" class="ln" style="stroke-linecap:round;stroke-width:'+(fw+2*l).toFixed(2)+'px"/><circle r="'+(pr+l).toFixed(2)+'" class="lnf"/><path d="'+ends+'" class="rs '+skin+'-s" style="stroke-width:'+fw+'px"/><circle r="'+pr+'" class="'+skin+'"/></g>';}
function person(name,x,y,k,o){o=o||{};const L=LOOKS[name],doc=o.outfit==='doctor',top=doc?'c6':L.top;
  const G=c=>'<g transform="translate('+x+' '+y+') scale('+k+')">'+c+'</g>';
  const torso='M-53 300 L-53 74 C-53 54 -33 46 -13 42 L13 42 C33 46 53 54 53 74 L53 300 Z';
  const arms=(o.arms||[]).map(a=>{const sx=x+(a.from==='l'?-41:41)*k,sy=y+66*k,d='M'+sx+' '+sy+' Q'+a.c[0]+' '+a.c[1]+' '+a.to[0]+' '+a.to[1],w=20*k;return Object.assign({},a,{d,w,cls:a.cls||top});});
  const out=a=>'<path d="'+a.d+'" class="ln" style="stroke-width:'+(a.w+2*ST.lw*LW).toFixed(2)+'px"/>';
  const col=a=>'<path d="'+a.d+'" class="rs '+a.cls+'-s" style="stroke-width:'+a.w.toFixed(2)+'px"/>';
  const hnd=a=>a.hand==='none'?'':mitt(a.to[0],a.to[1],k,a.hand,a.rot,L.skin);
  if(o.back)return arms.filter(a=>!a.front).map(out).join('')+G(sP(torso,top,k))+arms.filter(a=>!a.front).map(col).join('')
    +G(sP('M-11 18 L11 18 L11 50 L-11 50 Z',L.skin,k,.7)+sC(-29,3,5.5,L.skin,k,.7)+sC(29,3,5.5,L.skin,k,.7)+'<ellipse rx="29" ry="31" class="'+(L.backHair||'h5')+' o" style="stroke-width:'+lineW(k)+'px"/>')
    +arms.filter(a=>!a.front).map(hnd).join('');
  const docCloth=doc?sP('M-16 40 L16 40 L0 92 Z','c5',k,.7)+thin('M0 92 L0 300',k)+sP('M-16 38 L-31 64 L-6 78 L0 92 L6 78 L31 64 L16 38 L0 58 Z','c6',k,.6)
    +thin('M-20 46 C-30 62 -24 76 0 78 C24 76 30 62 20 46',k)+sC(0,84,6.5,'c5',k,.7)
    +'<path d="M31 72 V90 M22 81 H40" class="rs c7-s" style="stroke-width:6px;stroke-linecap:butt"/>':'';
  const face=o.face||L.usual;
  return G(L.back?L.back(k):'')
    +arms.filter(a=>!a.front).map(out).join('')
    +G(sP('M-11 18 L11 18 L11 50 L-11 50 Z',L.skin,k,.7)+sP(torso,top,k)+(doc?docCloth:L.cloth(k)))
    +arms.filter(a=>!a.front).map(col).join('')
    +G(sC(-29,3,5.5,L.skin,k,.7)+sC(29,3,5.5,L.skin,k,.7)+'<ellipse cx="0" cy="0" rx="29" ry="31" class="'+L.skin+' o" style="stroke-width:'+lineW(k)+'px"/>'
      +(face==='asleep'?'':dot(-19,11,5,'blush',' opacity=".55"')+dot(19,11,5,'blush',' opacity=".55"'))
      +FACES[face](k)+(L.mouth?L.mouth(k):'')+(L.specs?L.specs(k):'')+L.front(k))
    +arms.filter(a=>!a.front).map(hnd).join('')
    +arms.filter(a=>a.front).map(a=>out(a)+col(a)+hnd(a)).join('');}
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
const clover=(x,y,s)=>{const leaf=a=>'<path transform="rotate('+a+')" d="M0 0 C-30 -12 -38 -46 -16 -52 C-8 -54 -2 -49 0 -42 C2 -49 8 -54 16 -52 C38 -46 30 -12 0 0 Z" class="lawn o" style="fill:#5FA36E"/>';return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 0 C6 24 14 40 30 56" class="ink" style="stroke-width:9px;stroke:#3B2A1A"/><path d="M0 0 C6 24 14 40 30 56" class="rs c4-s" style="stroke-width:4px"/>'+[45,135,225,315].map(leaf).join('')+'<circle r="5" class="c4"/></g>';};
const calendar=(x,y,w,h)=>{const hd=h*.24,dots=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++)dots.push(dot(x+w*(.17+c*.22),y+hd+h*(.15+r*.21),3.6,r===1&&c===2?'c7':'c3'));
  return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" class="c6 o"/><path d="M'+x+' '+(y+hd)+' V'+(y+10)+' q0 -10 10 -10 H'+(x+w-10)+' q10 0 10 10 V'+(y+hd)+' Z" class="c7 o"/>'+dots.join('')+'<circle cx="'+(x+w*.61)+'" cy="'+(y+hd+h*.36)+'" r="11" class="ln" style="stroke-width:3.5px;stroke:#D9644A"/><path d="M'+(x+w*.28)+' '+(y-8)+' v18 M'+(x+w*.72)+' '+(y-8)+' v18" class="ink"/>';};
const book=(x,y,s,line)=>'<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 -40 C-22 -56 -58 -54 -78 -44 V42 C-58 32 -22 30 0 46 C22 30 58 32 78 42 V-44 C58 -54 22 -56 0 -40 Z" class="c6 o"/><path d="M0 -40 V46" class="ink"/>'+(line||'<path d="M-60 -24 C-44 -30 -28 -30 -14 -24 M-60 -6 C-44 -12 -28 -12 -14 -6 M-60 12 C-44 6 -28 6 -14 12 M14 -24 C28 -30 44 -30 60 -24 M14 -6 C28 -12 44 -12 60 -6 M14 12 C28 6 44 6 60 12" class="thin"/>')+'</g>';
const loop=(x,y,r,w,cls)=>{const p=a=>[(x+r*Math.cos(a)).toFixed(1),(y+r*Math.sin(a)).toFixed(1)].join(' '),a1=-.55,a0=-.55+1.05;const d='M'+p(a0)+' A'+r+' '+r+' 0 1 1 '+p(a1);const tx=x+r*Math.cos(a1),ty=y+r*Math.sin(a1),s=w*1.15;
  return limb(d,w,cls||'c1')+'<path d="M'+(tx-s).toFixed(1)+' '+(ty-s*.55).toFixed(1)+' L'+(tx+s).toFixed(1)+' '+(ty-s*.75).toFixed(1)+' L'+(tx+s*.45).toFixed(1)+' '+(ty+s*1.1).toFixed(1)+' Z" class="'+(cls||'c1')+' o"/>';};
const pinch=(x,y,s)=>'<g transform="translate('+x+' '+y+') scale('+s+')">'+limb('M18 -14 C-4 -30 -30 -28 -34 -14',13,'sk')+limb('M18 14 C-4 30 -30 28 -34 14',13,'sk')+'<circle cx="26" r="25" class="sk o"/><path d="M22 -12 h20 M20 2 h24 M22 15 h19" class="thin"/></g>';
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
 {lt:'Labas',draw:()=>person('Rūta',104,112,1.25,{face:'big',arms:[{from:'r',c:[182,196],to:[172,92],hand:'open',rot:10}]})+wave(192,72)},
 {lt:'Ačiū',draw:()=>person('Danutė',66,128,.78)+person('me',172,116,.98,{face:'warm',arms:[{from:'l',c:[110,226],to:[134,194],hand:'fist',rot:40,front:true},{from:'r',c:[230,240],to:[176,202],hand:'fist',rot:-40,front:true}]})+cup(156,176,.46)+heart(116,46,1.25)},
 {lt:'Prašau',draw:()=>person('Danutė',92,100,1.2,{arms:[{from:'r',c:[170,216],to:[186,190],hand:'fist',rot:0,front:true}]})+'<path d="M170 106 q-8 -11 0 -22 M192 106 q-8 -11 0 -22" class="thin"/>'+cup(182,142,.82)},
 {lt:'Kaip sekasi?',draw:()=>person('Rūta',88,136,1.05)+bubble(128,30,88,46,'<circle cx="160" cy="62" r="17" class="sk o"/><circle cx="154" cy="58" r="2.6" class="lnf"/><circle cx="166" cy="58" r="2.6" class="lnf"/><path d="M153 66 Q160 73 167 66" class="thin"/>'+qm(201,58,.82))},
 {lt:'Gerai',draw:()=>{const palm=[128,158];return '<rect x="96" y="186" width="66" height="70" rx="6" class="c1 o"/>'+limb('M152 150 L176 70',17,'sk')+limb('M138 150 L146 54',17,'sk')+limb('M162 158 L200 92',16,'sk')+'<circle cx="128" cy="158" r="46" class="sk o"/>'+limb('M100 134 C60 118 62 72 96 70 C126 68 134 104 118 130',17,'sk')+'<path d="M132 120 C146 118 158 122 166 130" class="thin"/>';}},
 {lt:'Sveiki',draw:()=>person('Danutė',72,112,.92)+person('me',188,124,.9,{arms:[{from:'r',c:[242,190],to:[230,104],hand:'open',rot:6,front:true}]})},
 {lt:'Labas rytas',sky:'dawn',draw:()=>'<path d="M136 196 a52 52 0 0 1 104 0 Z" class="c8 o"/><path d="M188 130 v-26 M226 146 l18 -16 M150 146 l-14 -14" class="ink"/>'+hill+person('Eglė',84,136,.9,{arms:[{from:'l',c:[22,194],to:[28,96],hand:'open',rot:-12},{from:'r',c:[146,194],to:[138,96],hand:'open',rot:12}]})},
 {lt:'Laba diena',sky:'sky',draw:()=>sun(186,66,36)+hill+person('Darius',112,122,1.15,{arms:[{from:'l',c:[30,196],to:[42,106],hand:'open',rot:-10}]})},
 {lt:'Labas vakaras',sky:'dusk',draw:()=>'<circle cx="192" cy="168" r="36" class="c1 o"/>'+spark(70,60,10,'c8')+spark(128,38,7,'c8')+spark(186,62,8,'c8')+hill+person('Jonas',104,130,1.05,{arms:[{from:'l',c:[26,196],to:[36,112],hand:'open',rot:-10}]})},
 {lt:'Labanakt',sky:'night',draw:()=>'<path d="M196 30 a30 30 0 1 0 28 42 a24 24 0 1 1 -28 -42 z" class="c8 o"/>'+spark(146,36,9,'c8')+spark(92,50,7,'c8')+spark(46,92,7,'c8')
   +zed(120,92,14)+zed(140,68,11)+zed(158,50,8)
   +'<rect x="0" y="212" width="256" height="50" class="c9 o"/>'
   +'<rect x="26" y="112" width="18" height="110" rx="6" class="c3 o"/><rect x="216" y="150" width="16" height="72" rx="6" class="c3 o"/>'
   +'<rect x="34" y="174" width="190" height="30" rx="6" class="c3 o"/>'
   +'<ellipse cx="82" cy="164" rx="42" ry="16" class="c6 o"/>'
   +'<g transform="translate(84 136) rotate(-14) scale(.86)"><ellipse rx="29" ry="31" class="sk o" style="stroke-width:'+lineW(.86)+'px"/>'+FACES.asleep(.86)+LOOKS.me.front(.86)+'</g>'
   +'<path d="M104 182 C110 150 176 136 222 182 Z" class="c5 o"/><path d="M122 168 C140 158 172 156 194 168" class="thin"/>'},
 {lt:'Viso gero',draw:()=>'<rect x="150" y="44" width="92" height="200" class="c3 o"/><rect x="164" y="60" width="64" height="184" class="c2 o"/><circle cx="218" cy="156" r="5" class="c1 o"/>'+person('Jonas',96,112,1.05,{arms:[{from:'l',c:[22,180],to:[32,92],hand:'open',rot:-10}]})},
 {lt:'Iki',draw:()=>person('me',112,104,1.15,{back:true,arms:[{from:'r',c:[196,176],to:[188,78],hand:'open',rot:8}]})+wave(204,64)},
 {lt:'Iki pasimatymo',draw:()=>calendar(52,62,116,116)+reach('M250 240 Q214 216 200 160',[200,150],1.2,'open',6)+wave(216,116)},
 {lt:'Taip',draw:()=>thumb(122,118,1.3)},
 {lt:'Ne',draw:()=>thumb(134,138,1.3,true)},
 {lt:'Atsiprašau',draw:()=>person('me',160,92,.98,{face:'sorry',arms:[{from:'l',c:[98,170],to:[100,112],hand:'open',rot:-8},{from:'r',c:[238,170],to:[224,112],hand:'open',rot:8}]})
   +spill(104,178,.94)},
 {lt:'Puikiai',draw:()=>spark(48,84,14,'c1')+spark(212,76,14,'c1')+spark(128,28,11,'c1')+person('me',128,112,1.1,{face:'big',arms:[{from:'l',c:[44,176],to:[56,72],hand:'open',rot:-16},{from:'r',c:[212,176],to:[200,72],hand:'open',rot:16}]})},
 {lt:'Nieko tokio',draw:()=>person('me',78,100,.92,{arms:[{from:'r',c:[166,176],to:[144,112],hand:'open',rot:20}]})
   +spill(176,178,1.04)+tick(204,62,24)},
 {lt:'Malonu susipažinti',draw:()=>person('Rūta',64,100,.86,{face:'big',arms:[{from:'r',c:[92,186],to:[120,182],hand:'none',front:true}]})+person('me',192,100,.86,{face:'big',arms:[{from:'l',c:[164,186],to:[136,182],hand:'none',front:true}]})
   +clasp(128,182)},
 {lt:'Sėkmės',draw:()=>clover(120,108,1.5)+spark(204,70,12,'c1')+spark(52,180,9,'c1')},
 /* I, you, he, she: a yellow glow says who the word is about */
 {lt:'Aš',draw:()=>glow(128,128,92)+person('me',128,96,1.25,{arms:[{from:'r',c:[206,216],to:[150,174],hand:'point',rot:-90,front:true}]})},
 {lt:'Tu',draw:()=>glow(172,128,70)+person('Darius',172,108,.92)+person('me',60,132,.72,{arms:[{from:'r',c:[100,190],to:[112,158],hand:'point',rot:80,front:true}]})},
 {lt:'Jis',draw:()=>glow(128,128,92)+person('Jonas',128,110,1.25)},
 {lt:'Ji',draw:()=>glow(128,128,92)+person('Rūta',128,110,1.25)},
 {lt:'Mes',draw:()=>glowWide(12,52,232,176)+person('Rūta',76,112,.98)+person('me',180,112,.98)},
 {lt:'Jūs',draw:()=>glowWide(82,44,160,150)+person('Danutė',128,106,.72)+person('Darius',202,106,.72)+person('me',44,148,.72,{arms:[{from:'r',c:[80,206],to:[92,176],hand:'point',rot:70,front:true}]})},
 {lt:'Jie',draw:()=>glowWide(12,52,232,176)+person('Jonas',76,112,.98)+person('Darius',180,112,.98)},
 {lt:'Jos',draw:()=>glowWide(12,52,232,176)+person('Rūta',76,112,.98)+person('Eglė',180,112,.98)},
 {lt:'Aš esu Tomas',draw:()=>person('me',128,92,1.2,{arms:[{from:'r',c:[218,214],to:[176,176],hand:'point',rot:-80,front:true}]})+nameTag(84,158,74,48)},
 {lt:'Tu esi Jonas?',draw:()=>person('Jonas',96,116,1.05)+pointAt(256,190,226,190,196,172,-80)+qm(194,76,1.25)},
 {lt:'Jis yra Jonas',draw:()=>person('Jonas',104,104,1.1)+nameTag(66,166,74,46)+pointAt(256,190,226,196,190,180,-84)},
 {lt:'Ji yra Rūta',draw:()=>person('Rūta',104,104,1.1)+nameTag(66,166,74,46)+pointAt(256,190,226,196,190,180,-84)},
 {lt:'Mes esame čia',draw:()=>hill+person('me',84,160,.72)+person('Rūta',172,160,.72)+pin(128,74,1.2)},
 {lt:'Mano vardas Tomas',draw:()=>person('me',128,78,.92)+nameTag(58,126,140,84)},
 {lt:'Koks tavo vardas?',draw:()=>person('Eglė',82,134,1)+bubble(116,30,104,66,nameTag(130,42,66,46,'')+qm(208,62,.7))},
 {lt:'Aš esu iš Amerikos',draw:()=>person('me',86,116,1.05)+'<path d="M172 214 V46" class="ink" style="stroke-width:7px"/>'+'<rect x="172" y="50" width="62" height="42" class="c6 o"/><path d="M172 56 h62 M172 68 h62 M172 80 h62" class="rs c7-s" style="stroke-width:6px;stroke-linecap:butt"/><rect x="172" y="50" width="26" height="22" class="nv"/><rect x="172" y="50" width="62" height="42" class="ink"/>'},
 {lt:'Iš kur?',draw:()=>globe(112,136,76)+qm(208,76,1.5)},
 {lt:'Kavos?',draw:()=>coffee(98,160,1.2)+qm(208,92,1.5)},
 {lt:'Arbatos?',draw:()=>cup(98,160,1.2).replace(/class="c9 o"/,'class="c8 o"')+'<path d="M124 158 C146 178 150 196 150 208" class="thin"/><rect x="138" y="206" width="24" height="26" rx="3" class="c7 o"/>'+qm(208,92,1.5)},
 /* ---- Small talk ---- */
 {lt:'Gerai, ačiū',draw:()=>person('me',100,108,1.1,{face:'warm',arms:[{from:'r',c:[184,226],to:[180,172],hand:'none',front:true}]})+thumb(184,148,.62,false,true)+heart(196,48,1.25)},
 {lt:'O tau?',draw:()=>person('me',66,132,.8,{arms:[{from:'r',c:[116,200],to:[128,156],hand:'open',rot:68,front:true}]})+person('Rūta',190,132,.8)+qm(128,70,1.15)},
 {lt:'Neblogai',draw:()=>gauge(38,'M-9 7 Q0 15 9 7')},
 {lt:'Taip sau',draw:()=>gauge(90,'M-9 10 L9 10')},
 {lt:'Man irgi gerai',draw:()=>person('Rūta',64,124,.8,{arms:[{from:'r',c:[106,226],to:[106,192],hand:'none',front:true}]})+thumb(108,172,.46,false,true)+person('me',192,124,.8,{arms:[{from:'l',c:[150,226],to:[150,192],hand:'none',front:true}]})+thumb(150,172,.46,false,true)+same(128,72,16)},
 {lt:'Aš irgi',draw:()=>person('Rūta',66,158,.8)+person('me',190,158,.8)+bubble(30,40,64,36,heart(66,48,1))+bubble(158,40,64,36,heart(194,48,1))+same(128,62,14)},
 {lt:'Ką veiki?',draw:()=>person('Jonas',76,162,.88)+bubble(84,46,112,44,'<g transform="translate(110 70) scale(.27)"><path d="M0 -40 C-22 -56 -58 -54 -78 -44 V42 C-58 32 -22 30 0 46 C22 30 58 32 78 42 V-44 C58 -54 22 -56 0 -40 Z" class="c5 o" style="stroke-width:15px"/></g><circle cx="150" cy="70" r="13" class="c1 o"/><path d="M138 66 Q150 73 162 66 M150 57 V83" class="thin"/>'+qm(184,67,.72))},
 {lt:'Nieko ypatingo',draw:()=>person('Jonas',128,102,1.1,{face:'shrug',arms:[{from:'l',c:[30,190],to:[46,140],hand:'open',rot:-40},{from:'r',c:[226,190],to:[210,140],hand:'open',rot:40}]})},
 {lt:'Labai malonu',draw:()=>limb('M-6 214 Q50 184 112 168',34,'c4')+limb('M262 214 Q206 184 144 168',34,'c1')+clasp(128,160,1.75)+heart(128,44,2)},
 {lt:'Ir tau',draw:()=>person('Eglė',62,142,.74)+person('me',194,142,.74)+twoCurves(82)},
 {lt:'Aš truputį kalbu lietuviškai',draw:()=>person('me',78,136,1)+limb('M262 244 Q224 214 200 186',24,'c1')+pinch(172,174,.86)+bubble(126,28,92,50,flagLT(144,38,62,36))},
 {lt:'Kaip tai pasakyti lietuviškai?',draw:()=>person('me',76,142,.86)+bubble(112,28,104,54,flagLT(128,40,50,32)+qm(200,58,.76))+'<circle cx="184" cy="184" r="30" class="c7 o"/><path d="M184 156 q2 -14 14 -18" class="ink"/><path d="M186 150 q14 -10 22 -2 q-10 10 -22 2 Z" class="lawn o"/>'},
 {lt:'Ką reiškia šis žodis?',draw:()=>book(128,164,1.25,'<rect x="-64" y="-14" width="52" height="16" rx="4" class="c8"/><path d="M-60 -32 C-44 -38 -28 -38 -14 -32 M-60 -6 C-44 -12 -28 -12 -14 -6 M-60 16 C-44 10 -28 10 -14 16 M14 -32 C28 -38 44 -38 60 -32 M14 -8 C28 -14 44 -14 60 -8 M14 16 C28 10 44 10 60 16" class="thin"/>')+qm(128,62,1.5)},
 {lt:'Aš nelabai suprantu',draw:()=>person('me',104,128,1.1,{face:'puzzled',arms:[{from:'r',c:[210,176],to:[148,96],hand:'open',rot:-40,front:true}]})+'<path transform="translate(190 66) scale(1.5)" d="M-22 2 C-30 -20 8 -32 22 -14 C34 4 2 22 -8 6 C-14 -8 14 -18 16 -2 C16 8 2 10 2 2" class="ink" style="stroke-width:5px"/>'},
 {lt:'Ar gali pakartoti?',draw:()=>person('me',92,122,1.2,{face:'puzzled',arms:[{from:'r',c:[176,212],to:[144,128],hand:'open',rot:-8,front:true}]})+
   bubble(166,30,40,40,'<path d="M198 68 A15 15 0 1 1 195.6 50.4" class="ink"/><path d="M188 42 L204 52 L187 60 Z" class="lnf"/>')},
 {lt:'Palauk',draw:()=>person('Jonas',84,108,1,{face:'flat'})+limb('M268 262 Q210 226 182 164',30,'c1')+mitt(176,128,2.2,'open',0,'sk')},
 {lt:'Teisingai',draw:()=>tick(128,128,82)+spark(214,54,13,'c1')+spark(40,72,10,'c1')},
 {lt:'Aš mokausi',draw:()=>person('me',128,84,.96,{arms:[{from:'r',c:[230,180],to:[206,160],hand:'fist',rot:0,front:true}]})+'<rect x="0" y="186" width="256" height="76" class="c3 o"/>'+book(124,166,.92)+limb('M196 178 L216 136',7,'c8')},
 {lt:'Dar kartą',draw:()=>loop(128,128,68,24,'c1')},
 {lt:'Supratau',draw:()=>person('Eglė',96,130,1.08,{arms:[{from:'r',c:[196,200],to:[172,134],hand:'point',rot:12}]})+bulb(190,66,1.05)+'<path d="M146 44 l-10 -10 M234 44 l10 -10 M250 76 h14" class="ink"/>'},
];
function artSvg(item){const body=item.draw();
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256"><defs><clipPath id="cl"><circle cx="128" cy="128" r="120"/></clipPath></defs>'+css()+'<circle cx="128" cy="128" r="120" class="'+(item.sky||'disc')+'"/><g clip-path="url(#cl)">'+body+'</g></svg>';}
