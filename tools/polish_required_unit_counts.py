from pathlib import Path
p=Path(__file__).resolve().parents[1]/'.release-lithuanian-art/index.html'
s=p.read_text(encoding='utf8')
old="const nL=u.lessons.filter(l=>!l.speak).length,spk=u.lessons.find(l=>l.speak),spkTodo=spk&&crowns(spk.id)<1;"
new="const skillProgress=window.WordamiUnitSkills?.summary(u.id)||{required:0,complete:0};const nL=u.lessons.filter(l=>!l.speak).length+skillProgress.required,spk=u.lessons.find(l=>l.speak),spkTodo=spk&&crowns(spk.id)<1;"
assert old in s;s=s.replace(old,new)
old="u.lessons.filter(l=>!l.speak&&crowns(l.id)>0).length+' of '+nL+' lessons done'"
new="(u.lessons.filter(l=>!l.speak&&crowns(l.id)>0).length+skillProgress.complete)+' of '+nL+' lessons done'"
assert old in s;s=s.replace(old,new);p.write_text(s,encoding='utf8')
