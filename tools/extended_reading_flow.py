"""Exercise the full reading portfolio UI with explicitly synthetic answers and drafts."""
def extended_reading(page,uid,wrong=False):
 spec=page.evaluate('id=>window.WordamiExtendedReadingContent?.units[id]||null',uid)
 if not spec:return
 page.evaluate('id=>WordamiExtendedReading.open(id)',uid);d=page.locator('#a1-practice')
 if d.get_by_role('button',name='Prepare this reading',exact=True).count():d.get_by_role('button',name='Prepare this reading',exact=True).click()
 passages=[line for section in spec['sections'] for line in section['lines']]
 count=page.evaluate('id=>WordamiExtendedReading.progress(id).preparedPassages',uid)
 for index,line in enumerate(passages[count:],start=count):
  d.get_by_role('button',name='Practise this passage meaning',exact=True).click()
  if wrong and index==0:
   d.get_by_role('button',name=passages[1][1],exact=True).click();assert 'try again' in d.locator('[role=status]').inner_text()
  d.get_by_role('button',name=line[1],exact=True).click()
 assert page.evaluate('id=>WordamiExtendedReading.progress(id).prepared',uid)
 if wrong:
  assert d.get_by_role('button',name='Take purposeful notes',exact=True).is_disabled()
  d.get_by_role('button',name='Read the whole text and answer',exact=True).click()
  for index,q in enumerate(spec['questions']):
   if index==0:d.get_by_role('button',name='Show relevant parts',exact=True).click()
   d.get_by_role('button',name=q['options'][(q['answer']+1)%3] if index==0 else q['options'][q['answer']],exact=True).click()
   if index<3:assert 'Source answer:' not in d.inner_text()
  assert not page.evaluate('id=>WordamiExtendedReading.progress(id).readingPassed',uid)
  d.get_by_role('button',name='Reading portfolio',exact=True).click()
 d.get_by_role('button',name='Read the whole text and answer',exact=True).click()
 for q in spec['questions']:d.get_by_role('button',name=q['options'][q['answer']],exact=True).click()
 assert 'Whole-text reading checked' in d.inner_text();d.get_by_role('button',name='Reading portfolio',exact=True).click()
 d.get_by_role('button',name='Take purposeful notes',exact=True).click()
 if wrong:
  d.get_by_text('Worked note example',exact=True).click()
  d.get_by_role('button',name='Save checked notes',exact=True).click();assert 'every part' in d.locator('[role=status]').inner_text()
 for i,s in enumerate(spec['sections']):
  d.get_by_role('textbox',name='Note for part '+str(i+1),exact=True).fill(s['lines'][0][0])
  d.get_by_role('textbox',name='Source quotation for part '+str(i+1),exact=True).fill(s['lines'][0][0])
 if wrong:
  d.get_by_role('textbox',name='Source quotation for part 2',exact=True).fill(spec['sections'][0]['lines'][0][0]);d.get_by_role('checkbox').check();d.get_by_role('button',name='Save checked notes',exact=True).click();assert 'same part' in d.locator('[role=status]').inner_text();d.get_by_role('textbox',name='Source quotation for part 2',exact=True).fill(spec['sections'][1]['lines'][0][0])
 d.get_by_role('checkbox').check();d.get_by_role('button',name='Save checked notes',exact=True).click();assert page.evaluate('id=>WordamiExtendedReading.progress(id).notesComplete',uid)
 d.get_by_role('button',name='Use notes to write a brief',exact=True).click()
 draft=' '.join(s['lines'][0][0] for s in spec['sections']);revised=draft+' '+spec['sections'][-1]['lines'][-1][0]
 d.get_by_role('textbox',name='Source-based brief',exact=True).fill(draft);d.get_by_role('button',name='Save first brief',exact=True).click()
 if wrong:d.get_by_role('button',name='Save revised brief',exact=True).click();assert 'Revise the first' in d.locator('[role=status]').inner_text()
 d.get_by_role('textbox',name='Source-based brief',exact=True).fill(revised)
 for i in range(3):d.get_by_role('textbox',name='Brief evidence '+str(i+1),exact=True).fill(spec['sections'][i]['lines'][0][0])
 for check in d.get_by_role('checkbox').all():check.check()
 d.get_by_role('textbox',name='Brief revision reflection',exact=True).fill('Synthetic workflow fixture: I added the final condition so this reader can distinguish the next step from the earlier claim. This is not learner performance evidence.')
 d.get_by_role('button',name='Save revised brief',exact=True).click();assert 'Brief revised and self-reviewed' in d.inner_text();assert page.evaluate('id=>WordamiExtendedReading.progress(id).complete',uid)
 d.get_by_role('button',name='Reading portfolio',exact=True).click();d.get_by_role('button',name='Back to unit',exact=True).click()
