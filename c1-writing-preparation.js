/* C1 composition models: source attribution, evidence limits and audience adaptation. */
(()=>{'use strict';
const api=window.WordamiWritingPreparation,course=window.WordamiSkillsContent;if(!api||!course)return;
const lt=LANG.code==='lt',unit=id=>course.units.find(u=>u.id===id);
const pick=(id,kind,indices)=>{const texts=unit(id)[kind].split(/(?<=[.!?])\s+|\n+/u).filter(s=>s.trim());return indices.map(i=>texts[i]).join(' ');};
const phrase=(id,index)=>unit(id).writing.phrases[index][0],line=(id,goal,text,why)=>({id,goal,text,why});
const lessons={
 'C1.committee-report':{range:lt?[150,330]:[180,360],lines:[
  line('synthesis','Synthesise the shared purpose and differing priorities',pick('C1','reading',[0,1,2,3]),'Both sources are situated in a shared service problem, then their priorities are distinguished. This is synthesis rather than two unconnected source summaries.'),
  line('limits','Explain the evidential limit without reversing the claim',pick('C1','reading',[4,5,6,7,8,9]),'A limited trial does not establish suitability for everyone; this does not establish that digital service has no value. The reader group’s condition is preserved rather than caricatured as opposition to change.'),
  line('recommend','Link a conditional recommendation to the missing evidence',pick('C1','reading',[10,11,12,13]),'The proposed next stage answers the identified evidence gap. The decision remains revisable once a wider group of users has been observed.')
 ]},
 'C1.public-briefing':{range:lt?[100,240]:[120,270],lines:[
  line('meaning','Explain the useful result and its limit plainly',pick('C1','listen',[1,2,3]),'The briefing gives the observed change first and immediately identifies who participated. Readers need the reason for caution, not an unexplained label such as selection bias.'),
  line('people','Connect staff and reader concerns without jargon',pick('C1','listen',[6,7,8,9]),'The practical question is whether someone can finish the procedure and get help. Both sources are represented by their actual concerns rather than as a contest between good and bad intentions.'),
  line('next','Say what is proposed and what is not yet settled',pick('C1','listen',[10,11]),'The next stage and agreed evaluation criteria are visible. Propondría or siūlyčiau expresses a proposal, so this model does not falsely announce a final decision.')
 ]},
 'C1.critical-response':{range:lt?[130,300]:[155,340],lines:[
  line('inference','Separate the observation from the overstrong inference',pick('C1','reading',[3,4,5])+' '+phrase('C1',6),'The source supports a useful observed change in a limited trial. The response identifies the unsupported jump to digital-only suitability rather than merely disagreeing with the conclusion.'),
  line('counterevidence','Use the second source with accurate scope',pick('C1','reading',[6,7,8,9])+' '+pick('C1','listen',[4,8,9]),'The reader group asks to preserve choice, not to abandon digital tools. Accurate disagreement requires neither exaggerating their concern nor dismissing the trial.'),
  line('conclusion','Offer a defensible and revisable conclusion',pick('C1','reading',[10,11,12,13]),'The conclusion explains what can reasonably follow now and what additional evidence is required. It does not present either practice source as a conclusive study.')
 ]},
 'C1-academic.writing':{range:lt?[170,360]:[190,390],lines:[
  line('observation','Separate the reported difference from its explanation',pick('C1-academic','reading',[0,1,2,3,4]),'The observed submission difference and the report’s interpretation are distinguished. Self-selection and missing baseline information explain why the comparison cannot settle causation.'),
  line('limits','Explain what the limitation does and does not establish',pick('C1-academic','reading',[5,6,7])+' '+pick('C1-academic','listen',[1,2,3,4]),'The two opposing overstatements are corrected: the programme is neither proved effective nor proved worthless by this comparison. The unresolved question is made explicit.'),
  line('decision','Tie continuation and future evaluation to a concrete evidence need',pick('C1-academic','listen',[5,6,7,8,9]),'The briefing recommends continued limited activity alongside better comparison and attention to people unable to attend. Public wording remains proportionate to the evidence and its resource implications.')
 ]},
 'C1-culture.writing':{range:lt?[140,340]:[165,370],lines:[
  line('purpose','Explain the introductory purpose without promising mastery',pick('C1-culture','listen',[2,3,4]),'The same activity can be honestly presented as an introduction or misleadingly as mastery. The note makes the promised learning scope visible to visitors.'),
  line('practitioners','Preserve the practitioners’ position and longer learning path',pick('C1-culture','reading',[3,4,5,6,7,8,9]),'A concern about how the activity is described is not a demand to ban participation. Practitioners’ expertise and extended learning remain part of the proposed solution.'),
  line('evaluate','Move beyond labels and popularity to educational value',pick('C1-culture','listen',[5,6,7,8]),'Changing a label is insufficient. Involving practitioners and asking visitors what they understood provide ways to evaluate learning rather than infer it from attendance or enjoyment.')
 ]},
 'C1-professional.writing':{range:lt?[140,360]:[170,390],lines:[
  line('difference','Reconstruct the two formulations without inventing intent',pick('C1-professional','reading',lt?[0,1,2,3,4]:[0,1,2,3,4,5]),'The email’s condition and the shortened note explain the misunderstanding. The model does not claim either party deliberately deceived the other.'),
  line('status','Distinguish uncertainty from an inevitable delay',pick('C1-professional','listen',[0,1])+' '+phrase('C1-professional',0),'The specification is still unconfirmed, so Friday cannot be reliably confirmed. That does not itself establish that delivery will be late or that a new date is guaranteed.'),
  line('responsibility','State a responsible next action and update process',pick('C1-professional','listen',[2,3,4,5,6])+' '+phrase('C1-professional',7),'A named responsibility, information deadline and updated written schedule replace a vague promise to try. Different levels of certainty remain visible in the next communication.')
 ]}
};
for(const [id,lesson] of Object.entries(lessons)){
 lesson.id=id;lesson.model=lesson.lines.map(l=>l.text).join('\n\n');
 lesson.guidance='Choose an organisation that serves this reader. Attribute source positions, distinguish what was observed from what you infer and make uncertainty useful to a decision. Draft from an outline before consulting the model; alternative supported interpretations can be valid. Length guidance is not a proficiency threshold.';
}
Object.assign(api.lessons,lessons);
})();
