"""Read-only production verification using an isolated browser profile."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1];out=R/'output/complete-art-release';out.mkdir(parents=True,exist_ok=True)
url='https://n00bin.github.io/gintaras/'
with sync_playwright() as p:
 b=p.chromium.launch(channel='chrome',headless=True);c=b.new_context(viewport={'width':390,'height':844});page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 response=page.goto(url);assert response.status==200;page.wait_for_function('window.WordamiUnitSkills && APP_VERSION===191');page.locator('#splash').wait_for(state='detached')
 assert page.evaluate('APP_RELEASE')=='3.119'
 assert page.evaluate('PICTURE_MIGRATION_COMPLETE && Object.keys(PICTURE_ASSETS).length===488')
 assert not page.evaluate('LANG_PREVIEW')
 assert not page.evaluate("LANGS.find(l=>l.code==='es').ready")
 assert page.evaluate('WordamiA1Placement.length')==3
 rows=page.evaluate("()=>Object.keys(PICTURE_ASSETS).map(word=>picHtml(word,'big')).concat(Object.keys(CAST_PICTURES).map(name=>castFace({name},64)),[myFace(64)])")
 page.evaluate("rows=>{const grid=document.createElement('div');grid.id='verify-live-art';grid.innerHTML=rows.join('');document.body.append(grid)}",rows)
 page.wait_for_function("document.querySelectorAll('#verify-live-art .picbox.ok img').length===488 && document.querySelectorAll('#verify-live-art .cast-art.ok').length===21",timeout=120000)
 assert page.locator('#verify-live-art img').evaluate_all('imgs=>imgs.every(i=>i.naturalWidth===512)')
 page.evaluate("document.querySelector('#verify-live-art').remove();WordamiPracticeUI.openActivity('a1.food-order')")
 assert 'Learn these phrases first' in page.locator('#a1-practice').inner_text()
 page.screenshot(path=str(out/'live-3.119-mobile.png'))
 assert not errors,errors;b.close()
result={'passed':True,'url':url,'release':'3.119','build':191,'courseMappings':488,'portraits':21,'requiredUnits':3,'prerequisiteLocks':True,'pageErrors':errors}
(out/'live-verification.json').write_text(json.dumps(result,indent=2),encoding='utf8');print(json.dumps(result))
