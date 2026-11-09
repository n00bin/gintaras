"""Read-only production smoke check in a separate, disposable browser profile."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/required-unit-skills'
url='https://n00bin.github.io/gintaras/'
with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    context=browser.new_context(viewport={'width':390,'height':844})
    page=context.new_page();errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    response=page.goto(url,wait_until='domcontentloaded');assert response.status==200
    page.wait_for_function('window.WordamiUnitSkills')
    assert page.evaluate('APP_RELEASE')=='3.116'
    assert page.evaluate('APP_VERSION')==188
    assert page.locator('#a1-practice-card').count()==0
    assert len(page.evaluate('WordamiA1Placement'))==3
    assert page.locator('[data-required=true]').count()==3
    assert all('Required' in text for text in page.locator('[data-required=true]').all_inner_texts())
    assert page.evaluate('LANG_PREVIEW') is False
    assert page.evaluate('WordamiActivities.catalogue().length')==6
    assert page.evaluate("LANGS.find(l=>l.code==='es').ready") is False
    page.locator('#splash').wait_for(state='detached')
    rows=page.evaluate("""()=>({cards:ITEMS.filter(i=>PICTURE_ASSETS[i.lt]).map(i=>({path:picFile(picFor(i.lt)),html:picHtml(i.lt,'big')})),portraits:Object.entries(CAST_PICTURES).map(([name,p])=>({path:picFile(p),html:castFace({name},64)}))})""")
    assert len(rows['cards'])==297 and len(rows['portraits'])==20
    for row in rows['cards']+rows['portraits']:
        assert page.request.get(url+row['path']).status==200,row['path']
    page.evaluate("rows=>{const grid=document.createElement('div');grid.id='live-images';grid.innerHTML=rows.map(r=>r.html).join('');document.body.append(grid);}",rows['cards']+rows['portraits'])
    page.wait_for_function("document.querySelectorAll('#live-images .picbox.ok img').length===297 && document.querySelectorAll('#live-images .cast-art.ok').length===20")
    assert page.locator('#live-images img').evaluate_all('imgs=>imgs.every(i=>i.naturalWidth===512)')
    page.evaluate("document.querySelector('#live-images').remove();WordamiPracticeUI.openActivity('a1.food-order')")
    assert 'Learn these phrases first' in page.locator('#a1-practice').inner_text()
    page.screenshot(path=str(OUT/'live-3.116-mobile.png'))
    assert not errors,errors
    browser.close()
(OUT/'live-verification.json').write_text(json.dumps({'passed':True,'url':url,'release':'3.116','build':188,'cardImages':297,'portraitImages':20,'publicPracticeActivities':3,'pageErrors':errors},indent=2),encoding='utf8')
print('Live 3.116/build 188 verified: 297 card images, 20 portraits, public activities and prerequisite locks.')
