/* Extra source language is taught before A1 comprehension and role-play.
   These contextual forms supplement the eight scheduled vocabulary items.
   A spelling may recur because its construction or role changes. */
(()=>{
'use strict';
const course=window.WordamiSkillsContent,design=window.WordamiLearningDesign;
if(!course||!design)return;
const rows=LANG.code==='lt'?{
 A1:[['aštuntą','at eight, with valandą understood'],['gal','perhaps / shall we, in the invitation'],['gyveni','you live, in kur gyveni?'],['iki','until / see you, in iki rytojaus'],['koks','what, in koks tavo vardas?'],['kur','where'],['parke','in the park'],['Rasa','a person’s name'],['rytojaus','tomorrow, in the complete farewell iki rytojaus'],['tavo','your, addressing one person informally']],
 'A1-shopping':[['ar','introduces a yes/no question'],['dar','more / else, in ar dar ko nors?'],['diena','day, in the greeting laba diena'],['eurus','euros, object form in a price expression'],['gerai','okay / well'],['ir','and'],['keturi','four, in the stated price'],['ko','part of ko nors: anything / something'],['laba','part of the greeting laba diena: hello / good day'],['mokėsite','you will pay, polite or plural'],['nors','part of ko nors: anything / something'],['norėtumėte','you would like, polite or plural'],['obuolius','apples, object form after perku here'],['obuolių','apples, form used with the requested amount here'],['parduotuvėje','in the shop'],['perku','I buy / am buying'],['trijų','three, form used in the request norėčiau trijų obuolių'],['tris','three, object form in tris eurus']],
 'A1-home':[['antrame','second, location form in antrame aukšte'],['aukšte','on the floor / storey, in antrame aukšte'],['bet','but'],['didelis','big / large, masculine singular'],['gal','perhaps / could, in the request'],['galiu','I can'],['gauti','get / receive'],['krepšį','bag, object form'],['kur','where'],['maža','small, feminine singular'],['o','and / while, linking contrasting details'],['padėti','put / place, in the question about the bag'],['savo','one’s own, referring back to the person involved'],['tavo','your, informal singular'],['užeik','come in, informal singular'],['virtuvės','kitchen, form used after šalia'],['šalia','beside / next to'],['šis','this, masculine singular'],['šviesūs','bright, masculine plural with namai']],
 'A1-travel':[['autobuse','on the bus'],['bilietų','tickets, form after kiek'],['galite','you can, polite or plural'],['ir','and'],['norėtumėte','you would like, polite or plural'],['nusipirkti','buy / purchase for oneself'],['nuvažiuoti','travel / get to a place by transport'],['parduotuvės','shop, form used after prie'],['parko','park, form used after prie'],['paskui','then / afterwards'],['pirkite','buy, polite or plural instruction'],['prie','by / near, with the following place form'],['stotį','station, destination form after į'],['žinote','you know, polite or plural']]
}:{
 A1:[['cómo','how, in ¿cómo te llamas?'],['dónde','where'],['el','the, masculine singular article'],['hasta','until / see you, in hasta mañana'],['llamas','are called, addressing tú in te llamas'],['ocho','eight'],['parque','park'],['Rosa','a person’s name'],['te','part of te llamas when asking someone’s name'],['vives','you live, addressing tú']],
 'A1-shopping':[['algo','something / anything'],['bien','well / okay, in está bien'],['buenos','part of buenos días: good morning'],['compro','I buy / am buying'],['cuarenta','forty'],['desea','you would like / want, polite usted'],['días','days, in the greeting buenos días'],['está','is, in está bien: that is okay'],['más','more / else'],['o','or'],['qué','what'],['tres','three'],['va','you are going to, polite usted in va a pagar'],['y','and']],
 'A1-home':[['bolsa','bag'],['dar','give'],['dejar','leave / put, in the question about the bag'],['departamento','apartment, common in Mexico'],['dónde','where'],['este','this, masculine singular'],['grande','big / large'],['junto','part of junto a: next to'],['luminosa','bright, feminine singular with casa'],['pero','but'],['piso','floor / storey'],['puedes','you can, informal tú'],['puedo','I can'],['segundo','second, with piso'],['tu','your, informal singular; no accent in the possessive'],['y','and']],
 'A1-travel':[['adónde','where to'],['al','a + el: to / by the, in junto al parque'],['boletos','tickets'],['comprar','buy'],['compre','buy, polite usted instruction'],['cuántos','how many, with masculine plural boletos'],['después','then / afterwards'],['ir','go'],['junto','part of junto a: next to'],['parque','park'],['puede','you can, polite usted'],['quiere','you want, polite usted'],['sabe','you know, polite usted'],['y','and']]
};
rows.A1.push(LANG.code==='lt'?['taip','yes, as an affirmative response']:['sí','yes, with an accent; si without an accent means if / whether']);
const units={};
for(const [id,entries] of Object.entries(rows)){
 const unit=course.units.find(u=>u.id===id);
 units[id]=entries.map(([text,meaning])=>({text,meaning,context:design.contextFor(unit,text)}));
}
window.WordamiSourceSupport=Object.freeze({version:1,units});
})();
