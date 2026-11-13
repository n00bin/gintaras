"""Drive required changed-source checks and both recorded exchange branches."""
import re

def record_exchange(page,d,reflection=False):
 d.get_by_role('button',name='Start recording',exact=True).click()
 d.get_by_role('button',name='Stop recording',exact=True).wait_for();page.wait_for_timeout(1200)
 d.get_by_role('button',name='Stop recording',exact=True).click()
 page.wait_for_function("[...document.querySelectorAll('#a1-practice button')].some(b=>b.textContent==='Replay my response'&&!b.disabled)")
 d.get_by_role('button',name='Replay my response',exact=True).click()
 page.wait_for_function("[...document.querySelectorAll('#a1-practice button')].some(b=>b.textContent==='Save this response review'&&!b.disabled)")
 d.get_by_role('checkbox').check()
 if reflection:d.get_by_role('textbox',name='One improvement for this exchange',exact=True).fill('I will preserve the clarified condition in my next response.')
 d.get_by_role('button',name='Save this response review',exact=True).click()

def required_applications(page,uid):
 d=page.locator('#a1-practice')
 for kind,api,bank in [('reading','WordamiTransferChecks','WordamiTransferContent'),('listening','WordamiListeningTransferChecks','WordamiListeningTransferContent')]:
  spec=page.evaluate('([bank,id])=>window[bank].units[id]',[bank,uid])
  if not spec:continue
  page.evaluate('([api,id])=>window[api].open(id,()=>WordamiSkillsStudio.openUnit(id))',[api,uid])
  for v in spec['variants']:
   button=d.get_by_role('button',name=re.compile('^(Begin a new version|Try the other new version|Repeat a used version)$'))
   button.click()
   if kind=='listening':
    d.get_by_role('button',name='Listen to the complete message',exact=True).click()
    page.wait_for_function("!!document.querySelector('#a1-practice form button:not(:disabled)')",timeout=60000)
   for q in v['questions']:
    if q.get('options'):
     d.get_by_role('button',name=q['options'][q['answer']],exact=True).click()
    else:
     answers=q.get('accept') or q.get('answers')
     if not answers:raise AssertionError(('Missing short-answer key',uid,q))
     d.get_by_role('textbox').fill(answers[0]);d.get_by_role('button',name='Record answer',exact=True).click()
   assert '3 of 3 details correct' in d.inner_text(),(uid,kind,d.inner_text())
  assert page.evaluate('([api,id])=>window[api].progress(id).passed',[api,uid])
 spec=page.evaluate('id=>WordamiInteractionPracticeContent.units[id]',uid)
 if spec:
  page.evaluate('id=>WordamiInteractionPractice.open(id,()=>WordamiSkillsStudio.openUnit(id))',uid)
  for index,(branch,text,meaning) in enumerate(spec['questions']):
   d.get_by_role('button',name='Begin guided exchange' if index==0 else 'Practise another exchange',exact=True).click()
   d.get_by_role('button',name='Hear the situation',exact=True).click()
   label='Ask about: '+meaning if spec.get('supportMode')=='intent_first' else 'Ask: '+text
   d.get_by_role('button',name=label,exact=True).click()
   record_exchange(page,d)
   d.get_by_role('button',name='Hear the partner reply',exact=True).click()
   choice=spec.get('branches',{}).get(branch,spec)
   d.get_by_role('button',name=choice['options'][choice['answer']],exact=True).wait_for()
   page.wait_for_function('text=>[...document.querySelectorAll("#a1-practice button")].some(b=>b.textContent===text&&!b.disabled)',arg=choice['options'][choice['answer']])
   d.get_by_role('button',name=choice['options'][choice['answer']],exact=True).click()
   record_exchange(page,d,True)
   assert 'Guided exchange self-reviewed' in d.inner_text()
  assert page.evaluate('id=>WordamiInteractionPractice.progress(id).complete',uid)
 if spec:d.get_by_role('button',name='Back to unit',exact=True).click()
