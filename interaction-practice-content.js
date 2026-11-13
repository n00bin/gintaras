/* Guided checking questions reuse prepared A1 language, not held-out assessment sources. */
(()=>{
'use strict';
const lt=LANG.code==='lt';
const units={
 A1:{title:'Check a meeting time',goal:'Ask a short question to check the meeting time, then respond to the clarified time.',
  questions:lt?[['confirm','Aštuntą valandą?','At eight?'],['correct','Septintą valandą?','At seven?']]:[['confirm','¿A las ocho?','At eight?'],['correct','¿A las siete?','At seven?']],
  replies:lt?{confirm:'Aštuntą valandą.',correct:'Rytoj. Aštuntą valandą.'}:{confirm:'A las ocho.',correct:'Mañana. A las ocho.'},
  detailQuestion:'Which time did your partner clarify?',options:['Seven','Eight','Ten'],answer:1,
  detailModel:lt?'Aštuntą valandą.':'A las ocho.',responseGoal:'Restate the clarified time so your partner can hear you understood.'},
 'A1-shopping':{title:'Check a price',goal:'Ask a short question to check a price, then respond to the clarified amount.',
  questions:lt?[['confirm','Keturi eurai?','Four euros?'],['correct','Trys eurai?','Three euros?']]:[['confirm','¿Cuarenta pesos?','Forty pesos?'],['correct','¿Treinta pesos?','Thirty pesos?']],
  replies:lt?{confirm:'Keturi eurai.',correct:'Keturi eurai. Mokėsiu grynaisiais.'}:{confirm:'Cuarenta pesos.',correct:'Cuarenta pesos. Voy a pagar en efectivo.'},
  detailQuestion:lt?'Which total did your partner clarify?':'Which total did your partner clarify?',options:lt?['Three euros','Four euros','Two apples']:['Thirty pesos','Forty pesos','Two apples'],answer:1,
  detailModel:lt?'Keturi eurai.':'Cuarenta pesos.',responseGoal:'Restate the price, keeping the amount and currency distinct from the item quantity.'},
 'A1-home':{title:'Check where the key is',goal:'Ask a short question to check a location, then respond to the clarified location.',
  questions:lt?[['confirm','Ant kėdės?','On the chair?'],['correct','Ant stalo?','On the table?']]:[['confirm','¿Sobre la silla?','On the chair?'],['correct','¿Sobre la mesa?','On the table?']],
  replies:lt?{confirm:'Ant kėdės.',correct:'Ant kėdės. Gal nori vandens?'}:{confirm:'Sobre la silla.',correct:'Sobre la silla. ¿Quieres agua?'},
  detailQuestion:'Where did your partner say the key is?',options:['On the table','On the chair','In the kitchen'],answer:1,
  detailModel:lt?'Ant kėdės.':'Sobre la silla.',responseGoal:'Restate where the key is, rather than repeating the alternative you first asked about.'},
 'A1-travel':{title:'Check a direction',goal:'Ask a short question to check a turn, then respond to the clarified direction.',
  questions:lt?[['confirm','Į kairę?','To the left?'],['correct','Į dešinę?','To the right?']]:[['confirm','¿A la izquierda?','To the left?'],['correct','¿A la derecha?','To the right?']],
  replies:lt?{confirm:'Sukite į kairę.',correct:'Eikite tiesiai, paskui sukite į kairę.'}:{confirm:'Dé vuelta a la izquierda.',correct:'Siga derecho y después dé vuelta a la izquierda.'},
  detailQuestion:'Which turn did your partner clarify?',options:['Right','Left','No turn'],answer:1,
  detailModel:lt?'Sukite į kairę.':'Dé vuelta a la izquierda.',responseGoal:'Restate the clarified turn so the visitor can follow the correct direction.'}
};
window.WordamiInteractionPracticeContent=Object.freeze({version:1,language:LANG.code,units});
})();
