/* Bind existing country pages to the shared data snapshot without replacing their layouts. */
(function(){
  'use strict';
  const script=document.currentScript, root=new URL('../',script.src);
  const page=decodeURIComponent(location.pathname).split('/ui/')[1];
  const pageKey=page?'ui/'+page:(location.pathname.endsWith('politics.html')?'politics.html':'index.html');
  let latest=null,scheduled=false,connected=false,unsubscribe=null,observer=null,bindingsInstalled=false,hadTextMappings=false;
  const textBindings=new WeakMap(), attributeBindings=new WeakMap(), imageBindings=new WeakMap();
  function replaced(value,items){
    for(const item of items)if(item.old&&value.includes(item.old))value=value.split(item.old).join(item.new);
    return value;
  }
  function sourcePath(value){
    if(typeof value!=='string'||value.startsWith('blob:'))return value;
    try{return new URL(value,document.baseURI).href.replace(root.href,'');}catch{return value;}
  }
  function rewrite(){
    scheduled=false;if(!latest||!connected)return;
    const items=latest.content?.[pageKey]||[],assets=latest.assets||{};
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];
    if(items.length||hadTextMappings)while(walker.nextNode())nodes.push(walker.currentNode);
    hadTextMappings=items.length>0;
    for(const node of nodes){
      if(node.parentElement?.closest('script,style,textarea,input,[contenteditable]'))continue;
      let binding=textBindings.get(node);
      if(!binding||node.nodeValue!==binding.last)binding={original:node.nodeValue};
      const value=replaced(binding.original,items);
      binding.last=value;textBindings.set(node,binding);
      if(value!==node.nodeValue)node.nodeValue=value;
    }
    document.querySelectorAll('[title],[alt],[data-tip],[data-tip-title],img').forEach(el=>{
      for(const key of ['title','alt','data-tip','data-tip-title']){
        let value=el.getAttribute(key);if(!value)continue;
        let bindings=attributeBindings.get(el)||{},binding=bindings[key];
        if(!binding||value!==binding.last)binding={original:value};
        value=replaced(binding.original,items);binding.last=value;bindings[key]=binding;attributeBindings.set(el,bindings);
        if(value!==el.getAttribute(key))el.setAttribute(key,value);
      }
      if(el.tagName!=='IMG')return;
      const src=el.getAttribute('src');let binding=imageBindings.get(el);
      if(!binding||(src!==binding.last&&!src?.startsWith('blob:')))binding={path:sourcePath(src),originalSrc:src,hidden:el.hidden,last:src};
      imageBindings.set(el,binding);
      const path=binding.path;let replacement=assets[path];
      const flag=/ui\/politics\/assets\/flags\/([A-Z]{3})\.png$/.exec(path||'');
      const leader=/assets\/leaders\/([A-Z]{3})\.jpg$/.exec(path||'');
      if(flag)replacement=assets['flag:'+flag[1]]||replacement;
      if(leader){
        const person=latest.globals?.GEO_DB?.[leader[1]]?.leader;
        if(person?.photo)replacement=person.photo;
        else if(person&&person.photo===null){el.hidden=true;return;}
      }
      if(replacement){const url=window.NexusData?.asset(replacement)||replacement;binding.last=url;el.hidden=Boolean(binding.hidden);if(el.getAttribute('src')!==url)el.src=url;}
      else {el.hidden=Boolean(binding.hidden);if(src===binding.last&&src!==binding.originalSrc){if(binding.originalSrc===null)el.removeAttribute('src');else el.setAttribute('src',binding.originalSrc);}binding.last=el.getAttribute('src');}
    });
  }
  function schedule(){if(connected&&!scheduled){scheduled=true;requestAnimationFrame(rewrite);}}
  function received(event){
    const data=event.snapshot;if(!data)return;
    const previous=latest,change=event.changed;latest=data;
    const names=change?.globals || Object.keys(data.globals||{});
    for(const name of names){const value=data.globals?.[name];if(value!==undefined&&window[name]&&typeof window[name]==='object')window.NexusData.replace(window[name],window.NexusData.materialize(value));}
    const all=!change,section=name=>all||change.sections.includes(name);
    if(typeof window.TNORussiaRefresh==='function'&&section('details'))window.TNORussiaRefresh(data.details?.RUS);
    if(typeof window.TNORefreshPolitics==='function'&&(all||names.some(n=>n==='GEO_DB'||n.startsWith('TNO_'))))window.TNORefreshPolitics();
    if(typeof window.TNOChinaRefresh==='function'&&(all||names.some(n=>n.startsWith('China')||n==='CHINA_LEADERS'||n==='DEFAULT_DATA')))window.TNOChinaRefresh();
    if(typeof window.TNOParliamentRefresh==='function'&&section('parliaments'))window.TNOParliamentRefresh(data.parliaments,change?.parliaments);
    if(all||JSON.stringify(previous?.content?.[pageKey])!==JSON.stringify(data.content?.[pageKey])||section('assets')||names.includes('GEO_DB'))schedule();
  }
  function connect(api){
    if(connected)return;connected=true;window.NexusData=api;unsubscribe=api.onDataChange(received);
    if(!bindingsInstalled){bindingsInstalled=true;
    // Deferred China modules assign this array after the page bridge has connected.
    for(const key of ['DEFAULT_DATA','ECON_FISCAL_DATA','ECONOMY_PROFILES','ECONOMY_PHOTOS']){
      let value=window[key];
      Object.defineProperty(window,key,{configurable:true,get:()=>value,set:incoming=>{value=latest?.globals?.[key] ? api.materialize(JSON.parse(JSON.stringify(latest.globals[key]))) : incoming;}});
    }
    let leaders=window.CHINA_LEADERS;
    Object.defineProperty(window,'CHINA_LEADERS',{configurable:true,get:()=>leaders,set:value=>{
      leaders=latest?.globals?.CHINA_LEADERS ? api.materialize(JSON.parse(JSON.stringify(latest.globals.CHINA_LEADERS))) : value;
    }});
    }
    observer=new MutationObserver(schedule);observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src','data-tip','title']});
  }
  function disconnect(){unsubscribe?.();unsubscribe=null;observer?.disconnect();observer=null;connected=false;scheduled=false;}
  window.addEventListener('pagehide',disconnect);
  window.addEventListener('unload',disconnect);
  window.addEventListener('pageshow',()=>{if(!connected&&window.NexusData)connect(window.NexusData);});
  function boot(){
    let api=window.NexusData;try{api=api||(window.parent!==window&&window.parent.NexusData);}catch{}
    if(api){connect(api);return;}
    const bundled=document.createElement('script');bundled.src=new URL('ui/data-bundled.js',root).href;
    bundled.onload=()=>{const runtime=document.createElement('script');runtime.src=new URL('ui/data-sync.js',root).href;runtime.onload=()=>connect(window.NexusData);document.head.append(runtime);};
    document.head.append(bundled);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
