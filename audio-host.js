/* Where the recordings live.
   The app always asks for 'audio/...mp3'. On the live site those files come from separate sites, two per language:
   n00bin.github.io/wordami-audio-<lang> for the short clips (words, sentences, conversations) and
   .../wordami-audio-<lang>-long for the long readings and listening recordings (audio/graded/). So the app itself
   stays far below GitHub Pages' 1 GB limit and each of those sites has its own 1 GB. The folder layout there is the
   same as under audio/ here.
   On this computer (localhost / 127.0.0.1) the local files are used, so new recordings can be tried before they
   are published (tools/publish_audio.py).
   Loaded first by the page, and by the service worker (importScripts). Recordings are still saved on the device
   under the app's own address, so what a phone already saved keeps working. */
(function(scope){
'use strict';
const SITE='https://n00bin.github.io/',REPO='wordami-audio-';
// which language a recording belongs to: audio/es/..., or a file named es.* / es-* / es_* in a shared folder
function lang(path){if(path.startsWith('es/'))return 'es';const name=path.slice(path.lastIndexOf('/')+1);return /^es[._-]/.test(name)?'es':'lt';}
// the site a recording lives on: wordami-audio-lt, wordami-audio-lt-long, wordami-audio-es, ...
function site(path){return REPO+lang(path)+(path.startsWith('graded/')?'-long':'');}
function local(host){return host==='localhost'||host==='127.0.0.1'||host==='[::1]';}
function create(base){
  const app=new URL(base),on=!local(app.hostname),prefix=new URL('audio/',app).href;
  // the app's address of a recording -> the recordings site (null: not a recording, or local)
  function remote(url){
    if(!on||typeof url!=='string'||!url.startsWith(prefix))return null;
    const rest=url.slice(prefix.length),path=rest.split(/[?#]/)[0];
    return path.endsWith('.mp3')?SITE+site(path)+'/'+rest:null;
  }
  // the recordings site -> the app's address, which is what recordings are saved under on the device
  function home(url){
    if(typeof url!=='string'||!url.startsWith(SITE+REPO))return null;
    const rest=url.slice((SITE+REPO).length),slash=rest.indexOf('/');
    return slash<0?null:prefix+rest.slice(slash+1);
  }
  return {on,remote,home};
}
scope.WordamiAudioHost={create,lang,site,SITE,REPO};

// In the page: point every request for a recording at its site (new Audio(...), audio.src = ..., fetch(...)).
if(typeof document==='undefined')return;
const host=create(new URL('./',document.baseURI).href);
if(!host.on)return;
function to(u){if(u==null)return u;let abs;try{abs=new URL(String(u),document.baseURI).href;}catch(e){return u;}return host.remote(abs)||u;}
scope.WordamiAudioHost.to=to;
const NativeAudio=window.Audio;
function Audio(src){return arguments.length?new NativeAudio(to(src)):new NativeAudio();}
Audio.prototype=NativeAudio.prototype;window.Audio=Audio;
for(const proto of [HTMLMediaElement.prototype,HTMLSourceElement.prototype]){
  const d=Object.getOwnPropertyDescriptor(proto,'src');
  if(d&&d.set)Object.defineProperty(proto,'src',{configurable:true,enumerable:d.enumerable,get:d.get,set(v){d.set.call(this,to(v));}});
}
const nativeFetch=window.fetch;
window.fetch=function(input,init){
  if(typeof input==='string'||input instanceof URL){const t=to(input);if(t!==input)return nativeFetch.call(this,t,init);}
  else if(input instanceof Request){const t=host.remote(input.url);if(t)return nativeFetch.call(this,new Request(t,input),init);}
  return nativeFetch.apply(this,arguments);
};
})(self);
