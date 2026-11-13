"""Actual UI driver; synthetic correct answers, never learner proficiency evidence."""
def practical_tables(page,uid):
 spec=page.evaluate('id=>window.WordamiDocumentContent?.units[id]||null',uid)
 if not spec:return
 page.evaluate('id=>WordamiDocuments.open(id)',uid);d=page.locator('#a1-practice')
 if d.get_by_role('button',name='Learn table reading',exact=True).count():d.get_by_role('button',name='Learn table reading',exact=True).click()
 if d.get_by_role('button',name='I studied the table guide',exact=True).count():d.get_by_role('button',name='I studied the table guide',exact=True).click()
 for variant in spec['variants']:
  if page.evaluate('x=>WordamiDocuments.progress(x.id).passedVariants.includes(x.v)',{'id':uid,'v':variant['id']}):continue
  button=d.get_by_role('button',name='Resume this table',exact=True)
  if button.count():button.first.click()
  else:d.get_by_role('button',name='Read this table',exact=True).first.click()
  count=page.evaluate('id=>WordamiDocuments.evidence(id).record.attempts.at(-1).answers.length',uid)
  for q in variant['questions'][count:]:d.get_by_role('button',name=q['answer'],exact=True).click()
  assert 'Table details checked' in d.inner_text()
  d.get_by_role('button',name='All table tasks',exact=True).click()
 assert page.evaluate('id=>WordamiDocuments.progress(id).complete',uid)
 d.get_by_role('button',name='Back to unit',exact=True).click()
