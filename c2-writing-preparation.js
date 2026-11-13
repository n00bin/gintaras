/* C2 worked transformations: framing, qualification and decision-changing nuance. */
(()=>{'use strict';
const api=window.WordamiWritingPreparation,course=window.WordamiSkillsContent;if(!api||!course)return;
const lt=LANG.code==='lt',unit=id=>course.units.find(u=>u.id===id);
const pick=(id,kind,indices)=>{const texts=unit(id)[kind].split(/(?<=[.!?])\s+|\n+/u).filter(s=>s.trim());return indices.map(i=>texts[i]).join(' ');};
const phrase=(id,index)=>unit(id).writing.phrases[index][0],line=(id,goal,text,why)=>({id,goal,text,why});
const lessons={
 'C2.synthesis-essay':{range:lt?[280,520]:[330,580],lines:[
  line('frame','Identify the actual disagreement and test the first source',pick('C2','reading',[0,1,2,3,4,5,6,7,8]),'The essay refuses a misleading binary and locates the disagreement in standards of improvement. A plausible operational proposal remains distinct from demonstrated lasting benefit.'),
  line('alternative','Develop the second perspective without turning it into a universal objection',pick('C2','reading',[9,10,11,12,13]),'Formal channel availability differs from effective assistance, but that does not make every digital tool a threat to autonomy. The synthesis preserves the force and limits of both positions.'),
  line('judgement','Defend a conditional synthesis and specify what would change it',pick('C2','reading',[14,15,16,17,18,19,20,21,22]),'The conclusion is derived from the sources’ shared purpose and limitations, rather than compromise as an automatic midpoint. A group-level failure can trigger revision despite favourable averages.')
 ]},
 'C2.executive-brief':{range:lt?[150,290]:[180,330],lines:[
  line('decision','Lead with a precise revisable recommendation',pick('C2','reading',[14,20,21]),'The decision-maker sees the proposed action and review trigger immediately. This changes the essay’s structure while preserving its conditional force.'),
  line('evidence','Make the evidence limits and operational risks easy to locate',pick('C2','reading',[4,5,6,10,11]),'Operational promise is not a long-term result, and an available channel is not guaranteed help. The brief keeps both cautions without reproducing the essay’s entire discussion.'),
  line('criteria','Specify the evaluation criteria and their consequence',pick('C2','reading',[15,16,17,22]),'The criteria cover averages, abandoned processes, repeat contacts, understanding and access to human help. The brief makes clear why a favourable average alone cannot settle the decision.')
 ]},
 'C2.critical-commentary':{range:lt?[140,340]:[190,390],lines:[
  line('assumption','Expose the definition hidden inside a simple claim',pick('C2','listen',[0,1,2,3]),'The opening examines what works means for different people. It avoids assuming either speed or experienced access is automatically the only legitimate measure.'),
  line('counterargument','Engage the strongest favourable-average argument',pick('C2','listen',[4,5,6,7,8]),'The hypothetical case recognises a real overall improvement while revealing the value judgement in calling some experiences mere exceptions. It does not claim every failure negates all progress.'),
  line('insight','Close with a precise implication for decision-making',pick('C2','listen',[9,10,11]),'The ending asks for explicit standards before numbers justify a decision. It preserves the distinction between technical measurement and the public value choice measurement cannot make on its own.')
 ]},
 'C2-science.writing':{range:lt?[230,450]:[270,500],lines:[
  line('standard','Make the decision standard explicit without asserting unobserved harm',pick('C2-science','reading',[0,1,2,3,4,5,6]),'Neither lack of contrary evidence nor a demand for total certainty settles the decision. Rejecting two weak arguments does not establish equal weakness, a midpoint or an observed harm.'),
  line('tradeoffs','Distinguish consequences, reversibility and the cost of delay',pick('C2-science','reading',[7,8,9,10,11])+' '+pick('C2-science','listen',[6,7]),'The recommendation identifies distinct trade-offs. Stopping a trial is not the same as being able to reverse every consequence, and the decision criterion must not be hidden behind the data.'),
  line('accountability','Give a conditional action and an accountable review trigger',pick('C2-science','listen',[3,4,5,8]),'A small conditional continuation requires real limits, a review point and someone authorised to act. It is not general validation of the technology.')
 ]},
 'C2-literature.writing':{range:lt?[190,420]:[230,470],lines:[
  line('reading','Ground the interpretation in the discrepancy and unresolved detail',pick('C2-literature','reading',lt?[7,8,9,10,11]:[8,9,10,11,12]),'The interpretation connects words, conduct, concrete help and the unfinished entry. It preserves the unresolved ending rather than inventing a definitive moral conversion.'),
  line('alternatives','Test the preferred reading against credible alternatives',pick('C2-literature','listen',[0,1,2,3,4]),'Conversion and justification readings each have textual support and a limitation. Engagement with them strengthens the argument without claiming unlimited interpretive freedom.'),
  line('defence','Defend the emphasis through structure rather than supposed authorial intention',pick('C2-literature','listen',[5,6,7,8])+' '+phrase('C2-literature',5),'The preferred emphasis rests on the initial self-description, its complication and the lack of closure. The final qualification rules out treating ambiguity as permission for any interpretation.')
 ]},
 'C2-register.writing':{range:lt?[90,330]:[130,370],lines:[
  line('public','Give the public the decision and its condition',lt?'Viešai:\nKomitetas prašo patikslinti išvados pagrindimą. Po pataisymo grįšime prie tvirtinimo klausimo. Pataisymas pats savaime negarantuoja patvirtinimo, nes komitetas dar turės įvertinti jo pakankamumą.':'Para el público:\nEl comité solicita precisar el fundamento de la conclusión. Retomaremos la cuestión de la aprobación después de la revisión. La corrección no garantiza por sí sola la aprobación, porque el comité aún deberá valorar si resulta suficiente.','The public notice is concise and preserves the difference between reconsideration and guaranteed approval. It does not present the polite initial comment as merely optional.'),
  line('internal','Give the team a more precise account of the revision need',lt?'Komandai:\nIšvados pastraipoje stebėtas pokytis pateikiamas kaip įrodyta priežastis. Siūlau: komandos vadovas turi patikslinti išvados pagrindimą. Komitetas: „Kol nebus atskirta stebėta nauda nuo numanomos priežasties, išvados netvirtinsime.“ Mandagus tonas nepanaikina reikalavimo.':'El equipo:\nEn el párrafo de la conclusión, el cambio observado se presenta como causa probada. Propongo: el responsable del equipo debe precisar el fundamento de la conclusión. El comité: «No aprobaremos la conclusión hasta que se distinga el beneficio observado de la causa supuesta». El tono cortés no elimina el requisito.','The internal note locates the substantive problem and proposes a responsible reviewer. That proposal is not attributed to the source as an existing commitment. The committee’s explicit condition is quoted instead of inferring intent from polite wording alone.'),
  line('commitment','Preserve the exact commitment when shortening either version',pick('C2-register','listen',lt?[4,5,6,7]:[4,5,6,7]),'This explanation belongs with the internal note. It makes the contrast between promising a review and promising acceptance explicit, so shorter wording cannot silently strengthen the commitment.')
 ]}
};
for(const [id,lesson] of Object.entries(lessons)){
 lesson.id=id;lesson.model=lesson.lines.map(l=>l.text).join('\n\n');
 lesson.guidance='Attempt a complete formulation before using the model. Test the strongest alternative, preserve distinctions that would change a decision and choose register for the actual reader. A shorter executive brief should reorganise the reasoning, not merely delete qualifications. The model is one defensible solution, not a required position or proficiency benchmark.';
}
Object.assign(api.lessons,lessons);
})();
