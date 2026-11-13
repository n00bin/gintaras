"""Reusable UI driver; prepared test wording is not proficiency evidence."""
def written_exchanges(page,uid):
 d=page.locator('#a1-practice');specs=page.evaluate('id=>WordamiWrittenInteractionContent.units[id].exchanges',uid)
 page.evaluate('id=>WordamiWrittenInteraction.open(id,"overview",()=>WordamiSkillsStudio.openUnit(id))',uid)
 for spec in specs:
  if page.evaluate('([id,key])=>WordamiWrittenInteraction.progress(id).completedExchanges.includes(key)',[uid,spec['key']]):continue
  d.get_by_role('button',name='Open written exchange',exact=True).first.click()
  d.get_by_role('textbox',name='Your checking message',exact=True).fill(spec['questionModel']);d.get_by_role('checkbox').check();d.get_by_role('button',name='Send practice question',exact=True).click()
  d.get_by_role('button',name=spec['options'][spec['answer']],exact=True).click()
  d.get_by_role('textbox',name='Your reply',exact=True).fill(spec['questionModel']);d.get_by_role('button',name='Save first reply',exact=True).click()
  revised=spec['responseModel'];revised=revised if revised.strip()!=spec['questionModel'].strip() else revised+' '+spec['partnerReply']
  d.get_by_role('textbox',name='Your reply',exact=True).fill(revised)
  for i in range(3):d.get_by_role('textbox',name='Reply evidence '+str(i+1),exact=True).fill(spec['responseModel'])
  d.get_by_role('textbox',name='Your message revision reflection',exact=True).fill('I revised my question into a reply that preserves the clarification.')
  d.get_by_role('button',name='Save revised exchange',exact=True).click();d.get_by_role('button',name='All exchanges in this unit',exact=True).click()
 assert page.evaluate('id=>WordamiWrittenInteraction.progress(id).complete',uid)
 d.get_by_role('button',name='Back to unit',exact=True).click()
