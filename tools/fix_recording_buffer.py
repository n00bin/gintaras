"""Load course MP3 bytes before seeking; cold HTTP responses may not support ranges."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
replacement="""function playRecorded(text){
 stopAllAudio();if(recAudio)recAudio.pause();if(cancelAudio)cancelAudio();
 if(S.sound===false)return Promise.reject(Error('sound off'));
 const item=ITEMS.find(i=>i.lt===text&&(taught(i)||window.WordamiUnitSkills?.canAssessPhrase(text)));
 if(!item)return Promise.reject(Error('missing card'));
 const voice='ona',unit=unitOf(item.au||item.id),segment=SMAP[voice]?.[unit]?.[item.au||item.id];
 if(!segment)return Promise.reject(Error('missing recording'));
 return new Promise((resolve,reject)=>{
  let settled=false,player=null,url=null;const request=new AbortController();
  const finish=err=>{if(settled)return;settled=true;clearTimeout(timeout);request.abort();if(player){player.pause();player.removeEventListener('timeupdate',progress);player.removeEventListener('error',error);player.removeEventListener('ended',ended);}if(url)URL.revokeObjectURL(url);if(audio===player)audio=null;if(cancelAudio===cancel)cancelAudio=null;err?reject(err):resolve();};
  const progress=()=>{if(player.currentTime>=segment[0]+segment[1]-.04)finish();},error=()=>finish(Error('playback failed')),ended=()=>finish(Error('recording ended early')),cancel=()=>finish(Error('cancelled'));
  const timeout=setTimeout(()=>finish(Error('timeout')),60000);cancelAudio=cancel;
  fetch(audioUrl(voice,unit),{signal:request.signal}).then(response=>{if(!response.ok)throw Error('recording unavailable');return response.blob();}).then(blob=>{
   if(settled)return;url=URL.createObjectURL(blob);player=new Audio(url);audio=player;
   player.addEventListener('timeupdate',progress);player.addEventListener('error',error);player.addEventListener('ended',ended);
   player.addEventListener('loadedmetadata',()=>{if(settled)return;player.currentTime=segment[0];player.play().catch(error);},{once:true});player.load();
  }).catch(err=>{if(!settled)finish(err);});
 });
} """
for folder,filename in [(R,'activities.js'),(R/'.release-lithuanian-art','foundation-ui.js')]:
 p=folder/filename;s=p.read_text(encoding='utf8');start=s.index('function playRecorded(text){');end=s.index('\n',start)
 assert 'return new Promise' in s[start:end]
 p.write_text(s[:start]+replacement.rstrip()+s[end:],encoding='utf8')
