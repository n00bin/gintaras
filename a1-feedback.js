/* Narrow, local feedback on prepared patterns. Never a semantic/proficiency grader. */
(()=>{
'use strict';
const lt=LANG.code==='lt';
const fold=s=>String(s).normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase().replace(/[¡¿]/g,'').replace(/\s+/g,' ').trim();
const rule=(label,pattern,example)=>({label,pattern,example});
const rules=lt?{
 name:rule('Give a name',/^(?:as )?mano vardas [a-z][a-z '\u2019-]*$/,'Mano vardas Lina.'),
 place:rule('Give a residence or origin',/^(?:as )?(?:gyvenu vilniuje|esu is lietuvos)$/,'Aš gyvenu Vilniuje.'),
 interest:rule('Mention an interest',/^man patinka muzika$/,'Man patinka muzika.'),
 greeting:rule('Begin with a greeting',/^labas(?:[ ,].*)?$/,'Labas!'),
 tomorrow:rule('Suggest meeting tomorrow',/^(?:rytoj susitikime(?: parke)?|susitikime rytoj(?: parke)?)$/,'Susitikime rytoj.'),
 time:rule('Give a meeting time',/^(?:septinta|astunta) valanda$/,'Septintą valandą.'),
 home:rule('Describe a home or room',/^(?:mano butas mazas|mano namai mazi|kambarys sviesus|sis kambarys didelis|virtuve maza)$/,'Mano butas mažas.'),
 items:rule('Name two different items',null,'du obuoliai / Norėčiau duonos.'),
 item:rule('Name an item',null,'du obuoliai'),
 room:rule('Describe one room',/^(?:kambarys sviesus|sis kambarys didelis|virtuve maza)$/,'Kambarys šviesus.'),
 quantity:rule('Give an item quantity',/^(?:du obuoliai|trys obuoliai|(?:parduotuveje )?perku du obuolius(?: ir duonos)?|noreciau triju obuoliu)$/,'du obuoliai'),
 closing:rule('Add a polite closing',/^(?:aciu(?:,? viso gero)?|viso gero)$/,'Ačiū, viso gero!'),
 payment:rule('State the payment method',/^mokesiu (?:kortele|grynaisiais)$/,'Mokėsiu kortele.'),
 welcome:rule('Welcome the visitor',/^(?:prasau uzeiti|uzeik)$/,'Prašau užeiti.'),
 location:rule('Locate a room or useful object',/^(?:cia yra virtuve|vonios kambarys yra (?:cia|salia virtuves)|(?:tavo )?raktas yra ant (?:stalo|kedes))$/,'Raktas yra ant stalo.'),
 offer:rule('Give an instruction or offer',/^(?:ar nori arbatos|gal nori vandens|atsisesk cia|prasau uzeiti|uzeik)$/,'Ar nori arbatos?'),
 stop:rule('Locate the stop',/^stotele yra prie (?:parko|parduotuves)$/,'Stotelė yra prie parko.'),
 direction:rule('Give a direction',/^(?:eikite tiesiai(?:,? (?:ir |paskui )sukite i (?:desine|kaire))?|sukite i (?:desine|kaire))$/,'Eikite tiesiai.'),
 bus:rule('Include a bus time or ticket detail',/^(?:autobusas (?:i stoti )?atvaziuoja (?:desimta|vienuolikta)(?: valanda)?|bilieta pirkite autobuse|viena bilieta(?:,? prasau| galite nusipirkti autobuse))$/,'Autobusas atvažiuoja dešimtą.')
}:{
 name:rule('Give a name',/^me llamo [a-z][a-z '\u2019-]*$/,'Me llamo Ana.'),
 place:rule('Give a residence or origin',/^(?:vivo en (?:la ciudad de )?mexico|soy de mexico)$/,'Vivo en la Ciudad de México.'),
 interest:rule('Mention an interest',/^me gusta la musica$/,'Me gusta la música.'),
 greeting:rule('Begin with a greeting',/^hola(?:[ ,].*)?$/,'¡Hola!'),
 tomorrow:rule('Suggest meeting tomorrow',/^nos vemos manana(?: en el parque)?$/,'Nos vemos mañana.'),
 time:rule('Give a meeting time',/^a las (?:siete|ocho)$/,'A las siete.'),
 home:rule('Describe a home or room',/^(?:mi casa es pequena|el cuarto es luminoso|este cuarto es grande|la cocina es pequena)$/,'Mi casa es pequeña.'),
 items:rule('Name two different items',null,'dos manzanas / Quisiera pan.'),
 item:rule('Name an item',null,'dos manzanas'),
 room:rule('Describe one room',/^(?:el cuarto es luminoso|este cuarto es grande|la cocina es pequena)$/,'El cuarto es luminoso.'),
 quantity:rule('Give an item quantity',/^(?:(?:quisiera |compro )?(?:dos|tres) manzanas(?: y pan)?|en la tienda compro dos manzanas y pan)$/,'dos manzanas'),
 closing:rule('Add a polite closing',/^(?:gracias(?:,? hasta luego)?|hasta luego)$/,'Gracias, ¡hasta luego!'),
 payment:rule('State the payment method',/^voy a pagar (?:con tarjeta|en efectivo)$/,'Voy a pagar con tarjeta.'),
 welcome:rule('Welcome the visitor',/^pasa(?:,? por favor)?$/,'Pasa, por favor.'),
 location:rule('Locate a room or useful object',/^(?:aqui esta la cocina|el bano esta (?:aqui|junto a la cocina)|(?:la|tu) llave esta sobre la (?:mesa|silla))$/,'La llave está sobre la mesa.'),
 offer:rule('Give an instruction or offer',/^(?:quieres (?:un te|agua)|sientate aqui|pasa(?:,? por favor)?)$/,'¿Quieres un té?'),
 stop:rule('Locate the stop',/^la parada esta junto (?:al parque|a la tienda)$/,'La parada está junto al parque.'),
 direction:rule('Give a direction',/^(?:siga derecho(?: y (?:despues )?de vuelta a la (?:derecha|izquierda))?|de vuelta a la (?:derecha|izquierda))$/,'Siga derecho.'),
 bus:rule('Include a bus time or ticket detail',/^(?:el autobus (?:a la terminal )?llega a las (?:diez|once)|compre el boleto en el autobus|puede comprar un boleto en el autobus|un boleto,? por favor)$/,'El autobús llega a las diez.')
};
const plans={
 'A1.profile':['name','place','interest'],
 'A1.home-note':['home','tomorrow','time'],
 'A1.meeting-message':['greeting','name','tomorrow','time'],
 'A1.production':['name','place','interest','tomorrow','time'],
 'A1-shopping.writing':['items','quantity','closing'],
 'A1-shopping.production':['item','quantity','payment'],
 'A1-home.writing':['welcome','location','offer'],
 'A1-home.production':['room','location','offer'],
 'A1-travel.writing':['stop','direction','bus'],
 'A1-travel.production':['stop','direction','bus']
};
function analyse(id,text){
 const ids=plans[id];if(!ids)return null;
 const clauses=String(text).split(/[.!?;\n]+/u).map(s=>s.trim()).filter(Boolean);
 const rank=['A1','A1-shopping','A1-home','A1-travel'].indexOf(id.split('.')[0]);
 const normalized=clauses.map(fold),warnings=[];
 const checks=ids.map(key=>{const spec=rules[key];let index=-1;
  if(key==='items'||key==='item'){
   const apple=normalized.findIndex(c=>lt?/\bobuoli(?:ai|us|u)\b/.test(c):/\bmanzanas\b/.test(c));
   const bread=normalized.findIndex(c=>lt?/\bduonos\b/.test(c):/\bpan\b/.test(c));
   // Merely mentioning an item under a negation is not a positive request.
   const positive=c=>lt?!/\b(?:ne|neperku|nenoriu|nenoreciau)\b/.test(c):!/\b(?:no|ni|sin)\b/.test(c);
   if(key==='items'&&apple>=0&&bread>=0&&positive(normalized[apple])&&positive(normalized[bread]))index=apple;
   if(key==='item')index=apple>=0&&positive(normalized[apple])?apple:bread>=0&&positive(normalized[bread])?bread:-1;
  }else if(key==='greeting')index=spec.pattern.test(normalized[0]||'')?0:-1;
  else index=normalized.findIndex(c=>spec.pattern.test(c));
  return {id:key,label:spec.label,found:index>=0,evidence:index>=0?clauses[index]:null,example:spec.example};
 });
 if(lt){
  if(normalized.some(c=>/\bas gyvena\b/.test(c)))warnings.push({issue:'For “I live”, check the verb form.',example:'Aš gyvenu Vilniuje.'});
  if(normalized.some(c=>/\bgyvenu vilnius\b/.test(c)))warnings.push({issue:'With gyvenu, use the learned location form for Vilnius.',example:'Aš gyvenu Vilniuje.'});
  if(rank>=2&&normalized.some(c=>/\bmano namai mazas\b/.test(c)))warnings.push({issue:'The learned plural home description uses a plural adjective.',example:'Mano namai maži.'});
  if(rank>=1&&normalized.some(c=>/\bperku du obuoliai\b/.test(c)))warnings.push({issue:'After perku, check the learned object form for two apples.',example:'Parduotuvėje perku du obuolius ir duonos.'});
 }else{
  if(normalized.some(c=>/\byo vive\b/.test(c)))warnings.push({issue:'For “I live”, use vivo in the learned pattern.',example:'Vivo en la Ciudad de México.'});
  if(normalized.some(c=>/\b(?:mi|la) casa es pequeno\b/.test(c)))warnings.push({issue:'Casa uses the feminine adjective in the learned example.',example:'Mi casa es pequeña.'});
  if(rank>=2&&normalized.some(c=>/\b(?:la|tu) llave es (?:sobre|aqui)\b/.test(c)))warnings.push({issue:'The learned key-location pattern uses está.',example:'La llave está sobre la mesa.'});
  if(normalized.some(c=>/\bme gusta el musica\b/.test(c)))warnings.push({issue:'The learned interest pattern uses la música.',example:'Me gusta la música.'});
 }
 const missing=checks.find(c=>!c.found);
 return {scope:'prepared_patterns_only',checks,warnings,nextStep:warnings.length?'Revisit the flagged example, change that part, and check again.':missing?'Check the goal “'+missing.label+'”. Add or clarify that information, then check again.':'Re-read or replay the whole response. Check that it is useful for this reader or listener, then improve one detail.',assessedProficiency:false};
}
function mount({container,id,getText,input,mode='writing',canCheck=()=>true}){
 const ui=window.WordamiPracticeUI;if(!ui||!plans[id])return null;
 const {node:n,button:b}=ui,panel=n('section',null,container.closest('#writing-studio')?'ws-card':container.closest('#skills-studio')?'skills-panel':'a1-panel'),out=n('div');panel.style.overflowWrap='anywhere';
 panel.append(n('h3',mode==='speaking'?'Review the words in your replay':'Check the task details'),n('p',mode==='speaking'?'After replaying your recording, type brief notes of what you said. Feedback checks those notes; it does not listen to or assess your audio.':'Get feedback on the familiar patterns and requested information. Other valid wording may need your own review.','a1-small'));
 let notes=null;
 if(mode==='speaking'){const label=n('label','Notes from your replay (optional)');notes=n('textarea');notes.maxLength=2500;notes.lang=LANG.code;notes.setAttribute('aria-label','Notes from your speaking replay');label.append(notes);panel.append(label);getText=()=>notes.value;input=notes;}
 const button=b(mode==='speaking'?'Check my replay notes':'Check the task details',()=>{
  if(!canCheck()){out.replaceChildren(n('p','Record and replay your response before checking these notes.'));return;}
  const text=getText();if(!text.trim()){out.replaceChildren(n('p','Add a few words before checking the task details.'));return;}
  const result=analyse(id,text);out.replaceChildren(n('h4','Feedback on prepared patterns'));
  for(const check of result.checks){out.append(n('p',(check.found?'Recognised: ':'Not recognised yet: ')+check.label));if(check.evidence)out.append(n('blockquote',check.evidence));}
  for(const warning of result.warnings)out.append(n('p',warning.issue),n('p',warning.example));
  out.append(n('p',result.nextStep),n('p','Not recognised can mean you used different valid wording. This is not a full grammar, pronunciation or CEFR assessment.','a1-small'));
  const help=n('details');help.append(n('summary','Revisit the learned examples'));for(const check of result.checks)help.append(n('p',check.example));out.append(help);
 });
 button.disabled=!canCheck();panel.append(button,out);container.append(panel);
 input?.addEventListener('input',()=>{if(out.childNodes.length)out.replaceChildren(n('p','Your text changed. Check the task details again.'));});
 return {update(){button.disabled=!canCheck();},reset(){out.replaceChildren();button.disabled=!canCheck();}};
}
window.WordamiA1Feedback=Object.freeze({version:1,analyse,mount,plans:Object.keys(plans),examples:()=>Object.values(rules).map(r=>r.example)});
})();
