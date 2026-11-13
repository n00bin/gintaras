"""Expose the new written tasks in source review books and the task map."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'tools/build_skills_audio.py';s=p.read_text(encoding='utf8');needle='guidedInteraction:WordamiInteractionPracticeContent.units,';assert needle in s
s=s.replace(needle,needle+'writtenInteraction:WordamiWrittenInteractionContent.units,');p.write_text(s,encoding='utf8')
p=R/'tools/export_curriculum_review.py';s=p.read_text(encoding='utf8');needle="            feedback={key:value";at=s.index(needle)
extra="""            written=course.get('writtenInteraction',{}).get(u['id'])
            if written:
                lines+=['','### Required written exchanges','','Write the question, understand the prepared partner reply, then draft and revise a response. Own writing is self-reviewed; no automatic accuracy or CEFR grade is assigned.']
                for e in written['exchanges']:
                    lines+=['','#### '+e['key'],'','Question purpose: '+e['intention'],'','Prepared question: '+e['questionModel'],'','Partner message: '+e['partnerReply'],'','Detail check: '+e['detailQuestion'],'','Key: '+e['options'][e['answer']],'','Optional response frame: '+e['responseModel'],'','Response goals:']+['- '+g for g in e['goals']]
"""
s=s[:at]+extra+s[at:];p.write_text(s,encoding='utf8')
p=R/'tools/report_course_evidence.py';s=p.read_text(encoding='utf8');needle="'reviewPortfolio':True";assert needle in s
s=s.replace(needle,"'writtenExchanges':len(c['writtenInteraction'][uid]['exchanges']),'newPresentationAttempts':{'recordings':2,'firstReviewAndRevisedReview':True,'pastCompletionPreserved':True},"+needle);p.write_text(s,encoding='utf8')
