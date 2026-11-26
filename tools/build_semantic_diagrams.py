"""Create editable SVG teaching diagrams with exact relationships, counts and times."""
import base64,json,math,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
DIR=ROOT/'docs/art-direction'
SOURCES=DIR/'semantic-diagrams';SOURCES.mkdir(exist_ok=True)
RECORDS=DIR/'semantic-records';RECORDS.mkdir(exist_ok=True)
NAVY='#14264e';TEAL='#00b9b0';AMBER='#ffb900';CORAL='#ff6657';CREAM='#fff3dc'
def img(name,x,y,w,h=None):
    raw=base64.b64encode((ROOT/'pics/art-v2'/f'{name}.webp').read_bytes()).decode()
    return f'<image x="{x}" y="{y}" width="{w}" height="{h or w}" href="data:image/webp;base64,{raw}"/>'
def text(t,x,y,size=32,colour=NAVY):return f'<text x="{x}" y="{y}" text-anchor="middle" fill="{colour}" font-family="Arial,sans-serif" font-weight="bold" font-size="{size}">{t}</text>'
def path(d,colour=TEAL,width=10):return f'<path d="{d}" fill="none" stroke="{colour}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>'
def arrow(x,y):return path(f'M{x} {y-35} V{y-8} M{x-12} {y-20} L{x} {y-5} L{x+12} {y-20}',CORAL,9)
def person(x,y,female=False,target=False,you=False,size=1):
    # Compact family graph person; coral ring indicates the word's referent.
    shape=f'<g transform="translate({x} {y}) scale({size})">'
    if target:shape+=f'<rect x="-47" y="-48" width="94" height="136" rx="22" fill="{CREAM}" stroke="{CORAL}" stroke-width="7"/>'
    if female:shape+=f'<path d="M-28 8 Q-40 -38 0 -38 Q40 -38 28 8Z" fill="#542c23"/>'
    shape+=f'<circle cy="-9" r="25" fill="#ffbc77"/>'
    shape+=f'<path d="M-25 -17 Q-25 -42 3 -35 Q25 -37 26 -13 Q9 -30 -25 -17" fill="#542c23"/>'
    shape+=f'<circle cx="-8" cy="-9" r="3" fill="{NAVY}"/><circle cx="8" cy="-9" r="3" fill="{NAVY}"/>'
    shape+=path('M-7 4 Q0 11 8 3',NAVY,3)
    colour=AMBER if you else CORAL if female else TEAL
    shape+=f'<rect x="-28" y="20" width="56" height="40" rx="13" fill="{colour}"/><path d="M-16 60V78 M16 60V78" stroke="{NAVY}" stroke-width="15" stroke-linecap="round"/>'
    if you:shape+=text('YOU',0,108,23)
    return shape+'</g>'
def family(kind):
    cousin=kind in {'a1x-pusbrolis','a1x-pussesere'}
    older=kind in {'a1x-teta','a1x-dede'}
    if cousin or older:
        s=path('M256 88V132H135V170 M256 132H377V170 M135 272V350 M377 272V350',TEAL,11)
        s+=person(256,55,size=.65)+person(135,205,size=.78)
        s+=person(377,205,female=kind in {'a1x-teta','a1x-pussesere'},target=older,size=.78)
        s+=person(135,383,you=True,size=.78)
        s+=person(377,383,female=kind=='a1x-pussesere',target=cousin,size=.78)
        return s
    s=path('M195 115H317 M256 115V230H130V290 M256 230H382V290',TEAL,11)
    return s+person(195,72,female=True,size=.75)+person(317,72,size=.75)+person(130,340,you=True)+person(382,340,female=kind=='sister',target=True)
def clock(hour,minute,x=256,y=256,r=148):
    s=f'<circle cx="{x}" cy="{y}" r="{r}" fill="{CREAM}" stroke="{TEAL}" stroke-width="16"/>'
    for k in range(12):
        a=math.pi*k/6-math.pi/2
        s+=path(f'M{x+(r-22)*math.cos(a):.1f} {y+(r-22)*math.sin(a):.1f} L{x+(r-34)*math.cos(a):.1f} {y+(r-34)*math.sin(a):.1f}',NAVY,6)
    for a,length,width in [(math.pi*(hour%12+minute/60)/6-math.pi/2,r*.5,12),(math.pi*minute/30-math.pi/2,r*.73,9)]:
        s+=path(f'M{x} {y} L{x+length*math.cos(a):.1f} {y+length*math.sin(a):.1f}',NAVY,width)
    return s+f'<circle cx="{x}" cy="{y}" r="10" fill="{CORAL}"/>'
def calendar(month):
    s=f'<rect x="165" y="45" width="205" height="192" rx="18" fill="{CREAM}" stroke="{TEAL}" stroke-width="9"/><path d="M170 95H365" stroke="{CORAL}" stroke-width="42"/>'
    s+=text(month,267,108,40,'#fff')
    for y in [140,177,214]:
        for x in [199,244,289,334]:s+=f'<rect x="{x-9}" y="{y-9}" width="18" height="18" rx="3" fill="{AMBER}"/>'
    return s
diagrams={}
for key in ['sister','brother','a1x-teta','a1x-dede','a1x-pusbrolis','a1x-pussesere']:diagrams[key]=family(key)
diagrams['a1x-popiete']=f'<circle cx="100" cy="116" r="48" fill="{AMBER}"/>'+''.join(path(f'M{100+63*math.cos(a):.1f} {116+63*math.sin(a):.1f} l{17*math.cos(a):.1f} {17*math.sin(a):.1f}',AMBER,9) for a in [k*math.pi/4 for k in range(8)])+clock(15,0,298,288,151)+text('15:00',298,480,36)
diagrams['money']=f'<path d="M90 125H370L445 256L370 387H90Z" fill="{AMBER}"/><circle cx="371" cy="256" r="15" fill="{CREAM}"/>'+text('30',235,280,120)+text('MXN',235,344,40)
diagrams['cake']=calendar('05')+img('cake',110,220,295)
diagrams['es-wake-up']=img('es-wake-up',3,145,303)+clock(6,0,361,171,105)+text('06:00',360,319,34)+img('morning',313,330,130)
diagrams['es-dog']=img('es-dog',25,265,155)+img('es-dog',207,88,285)+arrow(99,270)
diagrams['a-tall-man']=path('M186 79H326 M256 79V130H100V180 M256 130H392V180',TEAL,11)+person(186,45,female=True,size=.4)+person(326,45,size=.4)+person(100,332,you=True,size=.9)+person(392,270,target=True,size=1.3)
diagrams['personal-origin']=person(103,260,you=True,size=1.5)+path('M185 290H235 M220 277L235 290L220 303',CORAL,12)+f'<circle cx="355" cy="255" r="110" fill="{TEAL}" stroke="{CREAM}" stroke-width="6"/>'+path('M246 255H464 M355 145Q260 255 355 365 M355 145Q450 255 355 365 M260 205Q355 237 450 205 M260 305Q355 273 450 305',CREAM,7)+f'<path d="M380 207C343 162 369 124 399 124C432 124 454 162 416 207L399 230Z" fill="{CORAL}"/><circle cx="399" cy="160" r="12" fill="{CREAM}"/>'
diagrams['personal-name']=f'<rect x="72" y="99" width="368" height="315" rx="30" fill="{CREAM}" stroke="{TEAL}" stroke-width="15"/><path d="M78 178H434" stroke="{CORAL}" stroke-width="65"/>'+text('YOU',256,196,42,'#fff')+person(170,293,size=.8)+path('M247 282H384 M247 333H351',TEAL,15)
diagrams['breakfast']=f'<rect x="45" y="55" width="422" height="405" rx="28" fill="{CREAM}" stroke="{TEAL}" stroke-width="14"/>'+img('hotel',187,65,135)+path('M70 209H442',TEAL,8)+img('breakfast',70,220,225)+path('M317 326L350 361L424 271','#28a44c',24)
diagrams['es-city-block']=f'<rect x="35" y="180" width="190" height="185" rx="15" fill="#a6d2b3"/><rect x="287" y="180" width="190" height="185" rx="15" fill="#a6d2b3"/>'
for block in [35,287]:
    for x,y,colour in [(block+24,205,CORAL),(block+108,205,AMBER),(block+24,290,TEAL),(block+108,290,CORAL)]:diagrams['es-city-block']+=f'<rect x="{x}" y="{y}" width="57" height="48" rx="7" fill="{colour}"/>'
diagrams['es-city-block']+=path('M45 410H468 M450 393L469 410L450 427',CORAL,15)+text('1',130,143,44)+text('2',382,143,44)
with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    page=browser.new_page(viewport={'width':512,'height':512},device_scale_factor=1)
    for finding,body in diagrams.items():
        if len(sys.argv)>1 and finding not in sys.argv[1:]:continue
        key='semantic-'+finding+('-v2' if finding in {'sister','brother','a1x-teta','a1x-dede','a1x-pusbrolis','a1x-pussesere','a-tall-man','breakfast'} else '')
        if key.endswith('-v2'):
            old=RECORDS/('semantic-'+finding+'.json')
            if old.exists():
                previous=json.loads(old.read_text(encoding='utf8'));previous.update(review_status='needs-revision',replacement=key)
                old.write_text(json.dumps(previous,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
        svg='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">'+body+'</svg>'
        (SOURCES/f'{key}.svg').write_text(svg,encoding='utf8')
        page.set_content('<style>html,body{margin:0;background:transparent}</style>'+svg)
        page.locator('svg').screenshot(path=str(SOURCES/f'{key}.png'),omit_background=True)
        record={'id':key,'finding':finding,'source':str(SOURCES/f'{key}.png'),'generator':'deterministic editable SVG diagram','prompt':'Exact diagram for '+finding,'native_source':f'docs/art-direction/semantic-diagrams/{key}.svg','review_status':'awaiting-review'}
        (RECORDS/f'{key}.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    browser.close()
print(f'Created {len(diagrams)} editable SVG diagrams and transparent PNG exports.')
