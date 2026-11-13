"""Audit narrow feedback against actual prepared language, including negative cases."""
import json
import subprocess
from pathlib import Path
from audit_transfer_content import words

ROOT=Path(__file__).resolve().parents[1]
PROGRAM="""global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};for(const f of ['writing-content','skills-content','curriculum-content','vocabulary-content','learning-design','source-support','a1-feedback'])require('./'+f+'.js');const f=WordamiA1Feedback;const lt=LANG.code==='lt';const good=lt?{
'A1.profile':'Mano vardas Lina. Aš gyvenu Vilniuje. Man patinka muzika.',
'A1.home-note':'Mano butas mažas. Susitikime rytoj. Septintą valandą.',
'A1.meeting-message':'Labas! Mano vardas Rasa. Susitikime rytoj. Aštuntą valandą.',
'A1.production':'Mano vardas Lina. Aš gyvenu Vilniuje. Man patinka muzika. Susitikime rytoj. Septintą valandą.',
'A1-shopping.writing':'Du obuoliai. Norėčiau duonos. Ačiū, viso gero!',
'A1-shopping.production':'Du obuoliai. Mokėsiu kortele.',
'A1-home.writing':'Prašau užeiti. Raktas yra ant stalo. Ar nori arbatos?',
'A1-home.production':'Kambarys šviesus. Raktas yra ant kėdės. Gal nori vandens?',
'A1-travel.writing':'Stotelė yra prie parko. Eikite tiesiai. Autobusas atvažiuoja dešimtą.',
'A1-travel.production':'Stotelė yra prie parduotuvės. Sukite į kairę. Bilietą pirkite autobuse.'
}:{
'A1.profile':'Me llamo Ana. Vivo en la Ciudad de México. Me gusta la música.',
'A1.home-note':'Mi casa es pequeña. Nos vemos mañana. A las siete.',
'A1.meeting-message':'¡Hola! Me llamo Rosa. Nos vemos mañana. A las ocho.',
'A1.production':'Me llamo Ana. Vivo en la Ciudad de México. Me gusta la música. Nos vemos mañana. A las siete.',
'A1-shopping.writing':'Dos manzanas. Quisiera pan. Gracias, ¡hasta luego!',
'A1-shopping.production':'Dos manzanas. Voy a pagar con tarjeta.',
'A1-home.writing':'Pasa, por favor. La llave está sobre la mesa. ¿Quieres un té?',
'A1-home.production':'El cuarto es luminoso. La llave está sobre la silla. ¿Quieres agua?',
'A1-travel.writing':'La parada está junto al parque. Siga derecho. El autobús llega a las diez.',
'A1-travel.production':'La parada está junto a la tienda. Dé vuelta a la izquierda. Compre el boleto en el autobús.'
};const errors=lt?['Aš gyvena Vilnius.','Mano namai mažas.','Perku du obuoliai.']:['Yo vive en México.','Mi casa es pequeño.','La llave es sobre la mesa.','Me gusta el música.'];console.log(JSON.stringify({units:WordamiSkillsContent.units,vocabulary:WordamiVocabularyContent.units,support:WordamiSourceSupport.units,plans:f.plans,good:Object.fromEntries(Object.entries(good).map(([k,v])=>[k,{text:v,result:f.analyse(k,v)}])),empty:Object.fromEntries(f.plans.map(p=>[p,f.analyse(p,'')])),unknown:f.analyse('A1.profile',lt?'Esu Živilė. Gyvenu Kaune. Mėgstu džiazą.':'Soy Lucía. Resido en Puebla. Me encanta el jazz.'),negative:f.analyse('A1.profile',lt?'Ne mano vardas Lina. Aš negyvenu Vilniuje. Man nepatinka muzika.':'No me llamo Ana. No vivo en la Ciudad de México. No me gusta la música.'),negativeItems:f.analyse('A1-shopping.writing',lt?'Neperku obuolių. Nenoriu duonos.':'No compro manzanas. No quiero pan.'),lateGreeting:f.analyse('A1.meeting-message',lt?'Mano vardas Lina. Labas! Susitikime rytoj. Septintą valandą.':'Me llamo Ana. ¡Hola! Nos vemos mañana. A las siete.'),errors:errors.map(t=>f.analyse('A1-home.writing',t))}));"""


def main():
    reports=[]
    for lang in ['lt','es']:
        data=json.loads(subprocess.check_output(['node','-e',PROGRAM,lang],cwd=ROOT).decode('utf8'))
        assert len(data['plans'])==10
        taught=set()
        for unit in data['units'][:4]:
            uid=unit['id'];taught.update(words(' '.join(p[0] for p in unit['writing']['phrases'])))
            taught.update(words(' '.join(w['text'] for w in data['vocabulary'][uid])))
            taught.update(words(' '.join(w['text'] for w in data['support'][uid])))
            for pid,result in data['empty'].items():
                if not pid.startswith(uid+'.'):continue
                for check in result['checks']:
                    assert not (words(check['example'])-taught),(lang,pid,check['example'],words(check['example'])-taught)
        for pid,case in data['good'].items():
            assert all(c['found'] for c in case['result']['checks']),(lang,pid,case['result'])
            assert not case['result']['warnings']
            assert case['result']['assessedProficiency'] is False
            for c in case['result']['checks']:assert c['evidence'] in case['text']
        assert all(not c['found'] for c in data['negative']['checks'])
        assert not next(c for c in data['negativeItems']['checks'] if c['id']=='items')['found']
        assert not data['unknown']['warnings']
        assert not all(c['found'] for c in data['unknown']['checks'])
        assert not next(c for c in data['lateGreeting']['checks'] if c['id']=='greeting')['found']
        assert all(r['warnings'] for r in data['errors'])
        reports.append({'language':lang,'feedbackContexts':10,'positiveExamplesMatch':True,'negativeClaimsDoNotMatchPositiveGoals':True,'unknownWordingNotDeclaredWrong':True,'helpExamplesUsePreparedForms':True,'proficiencyNotAssessed':True})
    out=ROOT/'output/a1-feedback';out.mkdir(parents=True,exist_ok=True)
    (out/'content-verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('Twenty bilingual feedback contexts passed prepared-language, positive/negative, alternate wording and narrow-correction checks.')
    return reports


if __name__=='__main__':main()
