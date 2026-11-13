"""Drive source-based forms through the UI; no learner records are used."""
def practical_forms(page,unit_id):
 spec=page.evaluate('id=>window.WordamiFormContent?.units[id]||null',unit_id)
 if not spec:return
 page.evaluate('id=>WordamiForms.open(id)',unit_id);d=page.locator('#a1-practice')
 if d.get_by_role('button',name='Learn the form labels',exact=True).count():d.get_by_role('button',name='Learn the form labels',exact=True).click()
 if d.get_by_role('button',name='I studied the form labels',exact=True).count():d.get_by_role('button',name='I studied the form labels',exact=True).click()
 for field in spec['fields']:
  if d.get_by_role('heading',name='Check a form label',exact=True).count():d.get_by_role('button',name=field['meaning'],exact=True).click()
 completed=page.evaluate('id=>WordamiForms.progress(id).completedForms',unit_id)
 for variant in [v for v in spec['variants'] if v['id'] not in completed]:
  if not d.get_by_role('button',name='Complete this form',exact=True).count():break
  d.get_by_role('button',name='Complete this form',exact=True).first.click()
  for field,value in zip(spec['fields'],variant['values']):d.get_by_role('textbox',name=field['label']+' · '+field['meaning'],exact=True).fill(value)
  d.get_by_role('button',name='Check all form details',exact=True).click();assert 'Form details checked correctly.' in d.inner_text()
  d.get_by_role('button',name='All forms in this unit',exact=True).click()
 assert page.evaluate('id=>WordamiForms.progress(id).complete',unit_id)
 d.get_by_role('button',name='Back to unit',exact=True).click()
