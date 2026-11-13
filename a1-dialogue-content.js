/* Complete short practice dialogues, using only existing taught course phrases. */
(()=>{
const datasets=[
 {id:'meeting-seven',title:'Making a plan · seven',lines:[['leonas','Ar nori eiti kartu?'],['ona','Taip, noriu'],['leonas','Kur susitiksime?'],['ona','Prie kavinės'],['leonas','Kelintą valandą?'],['ona','Septintą valandą']],questions:[['Where will they meet?',['By the café','At the station'],0],['What time do they agree?',['Seven','Eight'],0]]},
 {id:'meeting-eight',title:'Making a plan · eight',lines:[['leonas','Ar nori eiti kartu?'],['ona','Taip, noriu'],['leonas','Kur susitiksime?'],['ona','Prie kavinės'],['leonas','Kelintą valandą?'],['ona','Aštuntą valandą']],questions:[['Where will they meet?',['By the café','At the station'],0],['What time do they agree?',['Seven','Eight'],1]]},
 {id:'shop-two',title:'At the market · two euros',lines:[['ona','Ar turite obuolių?'],['leonas','Taip'],['ona','Kiek kainuoja obuoliai?'],['leonas','du eurai'],['ona','Gerai, aš imu'],['leonas','Ačiū']],questions:[['What does the customer want?',['Apples','Cheese'],0],['What price does the seller give?',['Two euros','Ten euros'],0]]},
 {id:'shop-ten',title:'At the market · ten euros',lines:[['ona','Ar turite obuolių?'],['leonas','Taip'],['ona','Kiek kainuoja obuoliai?'],['leonas','dešimt eurų'],['ona','Gerai, aš imu'],['leonas','Ačiū']],questions:[['What does the customer want?',['Apples','Cheese'],0],['What price does the seller give?',['Two euros','Ten euros'],1]]},
 {id:'family',title:'Talking about a brother',lines:[['leonas','Ar turi brolių ar seserų?'],['ona','Aš turiu brolį'],['leonas','Koks jis?'],['ona','Jis linksmas']],questions:[['Who does the speaker have?',['A brother','A daughter'],0],['What is he like?',['Cheerful','Quiet'],0]]},
 {id:'home',title:'A guest at home',lines:[['leonas','Kur yra virtuvė?'],['ona','čia'],['ona','Ar nori arbatos?'],['leonas','Taip, noriu']],questions:[['Which room is the guest looking for?',['Kitchen','Bedroom'],0],['What drink is offered?',['Tea','Coffee'],0]]}
];
for(const d of datasets){if(d.id.startsWith('meeting-'))d.title='Arrange a meeting · conversation '+(d.id.endsWith('seven')?'1':'2');if(d.id.startsWith('shop-'))d.title='At the market · conversation '+(d.id.endsWith('two')?'1':'2');if(d.id==='family')d.title='Talk about family';}
globalThis.WordamiA1DialogueContent=datasets;
})();
