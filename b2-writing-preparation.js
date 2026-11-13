/* B2 worked composition: a position, fair counterargument and conditional recommendation. */
(()=>{'use strict';
const api=window.WordamiWritingPreparation,course=window.WordamiSkillsContent;if(!api||!course)return;
const lt=LANG.code==='lt',unit=id=>course.units.find(u=>u.id===id);
const parts=(id,kind)=>unit(id)[kind].split(/(?<=[.!?])\s+|\n+/u).filter(s=>s.trim());
const pick=(id,kind,indices)=>indices.map(i=>parts(id,kind)[i]).join(' ');
const phrase=(id,index)=>unit(id).writing.phrases[index][0];
const line=(id,goal,text,why)=>({id,goal,text,why});
const lessons={
 'B2.public-argument':{range:lt?[110,280]:[150,310],lines:[
  line('position','State a position and the benefit you want to retain',phrase('B2',6)+' '+pick('B2','reading',[1,2]),'The position is visible at the start and acknowledges what digital services can offer, rather than treating the opposing option as pointless.'),
  line('example','Develop an access concern through a concrete example',pick('B2','reading',lt?[3,4,5,6]:[3,4,5]),'The example connects a general access claim to a particular user situation. It explains why availability and effective use can differ.'),
  line('objection','Answer the cost objection and define a practical conclusion',pick('B2','reading',lt?[7,8,10,11]:[6,7,8,10,11,12]),'The cost objection is retained and answered through a broader value criterion. The conclusion includes testing and consultation rather than an unsupported guarantee.')
 ]},
 'B2.compare-options':{range:lt?[110,280]:[130,300],lines:[
  line('criteria','Establish criteria that apply to both options',pick('B2','listen',[0,1,2]),'Speed, staff time and usable access provide shared comparison criteria. A comparison becomes unfair if each option is judged against a different purpose.'),
  line('users','Explain why different users need different support',pick('B2','listen',[3,4,5])+' '+pick('B2','reading',lt?[6]:[5]),'The comparison recognises independent users as well as people needing help. A hybrid model answers this difference but does not eliminate the cost question.'),
  line('recommend','Recommend an option while retaining its cost and evaluation needs',pick('B2','listen',[6,7,8,9]),'The recommendation is conditional on evaluating both waiting and abandoned registrations. It preserves the limitation rather than announcing that the preferred option must succeed.')
 ]},
 'B2.formal-response':{range:lt?[120,280]:[145,310],lines:[
  line('fairness','Represent the attraction of the proposal fairly',pick('B2','listen',[0])+' '+pick('B2','reading',lt?[7]:[6]),'The opening recognises the operational and cost reasoning. It does not invent a bad motive for the author or concede that cheaper necessarily means better.'),
  line('challenge','Challenge the inference from saving time to better access',pick('B2','listen',[1,2,3,4])+' '+pick('B2','reading',lt?[8]:[7,8]),'A concrete access problem challenges the reasoning rather than attacking its author. The response also recognises readers who prefer independent service.'),
  line('alternative','Offer an alternative with a way to test it',pick('B2','listen',[5,8,9])+' '+pick('B2','reading',lt?[11]:[11]),'The response ends with a workable trial and an evaluation plan. Disagreement creates a next step instead of merely repeating a negative judgement.')
 ]},
 'B2-workplace.writing':{range:lt?[120,280]:[140,300],lines:[
  line('needs','Balance shared work with focused work',phrase('B2-workplace',3)+' '+pick('B2-workplace','reading',[3,4]),'Both legitimate needs are named and linked to a trial arrangement. A model that only lists preferred office days would not explain the compromise.'),
  line('fairness','Explain a temporary exception and its safeguards',pick('B2-workplace','listen',[1,2,3,4]),'Newcomers and mentors have a specific temporary need. Written reasons and regular review prevent an exception becoming unexplained personal favouritism.'),
  line('review','State evaluation criteria and a trigger for changing course',phrase('B2-workplace',6)+' '+pick('B2-workplace','listen',[5,6,7]),'The review considers support, useful decisions and concentration rather than attendance alone. Insufficient support can require change even when most people like the schedule.')
 ]},
 'B2-media.writing':{range:lt?[110,270]:[130,290],lines:[
  line('claim','Identify the overstatement and the correction',pick('B2-media','listen',[0,1,2]),'The note identifies what changed and why. It does not silently replace a headline or imply the survey established the opposite causal conclusion.'),
  line('evidence','Explain what the evidence supports and what remains possible',pick('B2-media','reading',lt?[1,2,3,4,5,6]:[2,3,4,5,6,7]),'The evidence allows an association and further questions. Alternative explanations and volunteer selection limit the claim without making the survey worthless.'),
  line('safeguard','Describe a visible correction and a concrete preventive step',pick('B2-media','listen',[3,4,5,6]),'The retained correction lets readers understand the original error. Checking evidence type is a practical safeguard, not a promise that errors will never happen again.')
 ]},
 'B2-mobility.writing':{range:lt?[110,280]:[130,300],lines:[
  line('scope','Identify the limited proposal and its access constraints',pick('B2-mobility','reading',[0,1,2,3]),'The proposal establishes a limited trial and acknowledges people and businesses whose access needs may differ from the majority’s.'),
  line('arrangements','Make delivery and passenger access workable',pick('B2-mobility','listen',[0,1,2,3]),'The conditions specify delivery time, safe drop-off and an early review. These are arrangements to test, not a claim that access problems are already solved.'),
  line('decision','Use evidence to distinguish adjustment from unconditional expansion',pick('B2-mobility','listen',[4,5,6]),'A favourable visitor total does not erase persistent access barriers. Conversely, one isolated difficulty does not automatically settle the whole decision.')
 ]}
};
for(const [id,lesson] of Object.entries(lessons)){
 lesson.id=id;lesson.model=lesson.lines.map(l=>l.text).join('\n\n');
 lesson.guidance='Plan a clear position, the evidence that supports it and a credible objection. Attempt your own outline before opening the model. Check that the conclusion follows from the reasons and preserves a real limitation; another well-supported position can be valid. Length guidance is not a CEFR pass mark.';
}
Object.assign(api.lessons,lessons);
})();
