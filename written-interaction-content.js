/* Written interaction revisits already taught checking questions and partner replies. */
(()=>{'use strict';
const course=window.WordamiSkillsContent,bank=window.WordamiInteractionPracticeContent;
if(!course||!bank)return;
const units={};
for(const u of course.units){
 const sourceIds=u.sourceUnits||[u.id],exchanges=[];
 for(const sourceId of sourceIds){const spec=bank.units[sourceId];if(!spec)throw Error('Missing written exchange source '+sourceId);
  for(const [branch,question,meaning] of spec.questions){const detail=spec.branches?.[branch]||spec;
   exchanges.push({key:sourceId+':'+branch,sourceUnit:sourceId,branch,title:spec.title,intention:meaning,questionModel:question,partnerReply:spec.replies[branch],detailQuestion:detail.detailQuestion,options:detail.options,answer:detail.answer,responseModel:detail.detailModel,goals:[detail.responseGoal,'Preserve the confirmed detail and any condition in the partner’s message.','Close or continue the exchange in a way that fits the recipient.']});
  }
 }
 units[u.id]={id:u.id,band:u.band||u.id,title:'Exchange useful messages · '+u.theme,preparation:'The question frames and replies come from this unit’s prepared checking exchange. For a band application, they come from the two preceding source units.',exchanges};
 const goal=window.WordamiLearningDesign?.units[u.id]?.outcomes.writing;
 if(goal){goal.relatedScales=['Correspondence','Notes, messages and forms'];goal.relatedPracticeIds=exchanges.map(e=>'written-exchange.'+u.id+'.'+e.key);}
}
window.WordamiWrittenInteractionContent=Object.freeze({version:1,language:LANG.code,units});
})();
