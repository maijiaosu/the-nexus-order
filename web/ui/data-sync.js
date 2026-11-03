/* Data-only synchronization. The installed application and its personal storage stay local. */
(function () {
  'use strict';
  let base = window.NEXUS_DATA_BASE || 'https://74.82.200.68:4434/nexus/';
  const listeners = new Set(), objectURLs = new Map();
  // These mappings are generated and hash-checked by the release packager.
  const bundledManifest=window.NEXUS_BUNDLED_MANIFEST || null;
  const bundledAssets=window.NEXUS_BUNDLED_ASSETS || {};
  const bundledSnapshot=window.NEXUS_BUNDLED;
  let snapshot = window.NEXUS_BUNDLED || {schema: 1, globals: {GEO_LIVE: window.GEO_LIVE || {}}};
  let revision = '', pending = null, database = null, status = null, activeManifest = bundledManifest;
  let timer = null, failures = 0, pointerSupported = null;
  const POLL_MS = 45000;
  let cleanupTimer=null;
  const blank = {schema: 1, jobs: [], last_success: {}, issues: {}};
  const ready = openCache();
  function openCache() {
    if (!window.indexedDB) return Promise.resolve(null);
    return new Promise(resolve => {
      const request = indexedDB.open('the-nexus-order-data-v1', 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore('state'); request.result.createObjectStore('assets');
      };
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
      request.onsuccess = () => { database = request.result; resolve(database); };
    });
  }
  function get(store, key) {
    return new Promise((resolve, reject) => {
      const request = database.transaction(store).objectStore(store).get(key);
      request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error);
    });
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function replace(target, source) {
    if (target && source && typeof target === 'object' && typeof source === 'object' && !Array.isArray(target) && !Array.isArray(source)) {
      Object.keys(target).forEach(key => { if (!(key in source)) delete target[key]; });
      Object.keys(source).forEach(key => { target[key] = replace(target[key], source[key]); });
      return target;
    }
    if (Array.isArray(target) && Array.isArray(source)) { target.splice(0, target.length, ...source); return target; }
    return source;
  }
  function localAsset(value) {
    if (typeof value !== 'string') return value;
    return objectURLs.get(value) || bundledAssets[value] || value;
  }
  function materialize(value) {
    if (typeof value === 'string') return localAsset(value);
    if (Array.isArray(value)) return value.map(materialize);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,materialize(v)]));
    return value;
  }
  function equal(a,b) { return a === b || JSON.stringify(a) === JSON.stringify(b); }
  function changedKeys(previous={},next={}) {
    return [...new Set([...Object.keys(previous),...Object.keys(next)])].filter(key=>!equal(previous[key],next[key]));
  }
  function apply(data, rev, initial=false) {
    const changed=initial ? null : {
      globals:changedKeys(snapshot.globals,data.globals),
      sections:changedKeys(Object.fromEntries(Object.entries(snapshot).filter(([k])=>k!=='globals')),Object.fromEntries(Object.entries(data).filter(([k])=>k!=='globals'))),
      countries:changedKeys(snapshot.globals?.GEO_DB,data.globals?.GEO_DB),
      parliaments:changedKeys(snapshot.parliaments?.countries,data.parliaments?.countries)
    };
    snapshot = data; revision = rev || '';
    if(document.documentElement)document.documentElement.dataset.nexusRevision=revision;
    for (const name of changed?.globals || Object.keys(data.globals)) {
      if (/^(?:GEO_[A-Z0-9_]+|TNO_[A-Z0-9_]+|CHINA_LEADERS|DEFAULT_DATA|ECON_FISCAL_DATA|ECONOMY_PROFILES|ECONOMY_PHOTOS|China[A-Za-z0-9_]+)$/.test(name) && name in data.globals)
        window[name] = replace(window[name], materialize(data.globals[name]));
    }
    const event = {main: window.GEO_LIVE || {}, snapshot: data, revision, changed};
    listeners.forEach(cb => { try { cb(event); } catch(e) { console.error('Nexus data subscriber', e); } });
    window.dispatchEvent(new CustomEvent('nexus:data', {detail: event}));
  }
  function validate(data) {
    function safe(value) {
      if(!value || typeof value!=='object')return;
      for(const key of Object.keys(value)) {
        if(['__proto__','prototype','constructor'].includes(key))throw Error('Unsafe snapshot key');
        safe(value[key]);
      }
    }
    safe(data);
    if(data.schema!==1 || !data.globals || !data.globals.GEO_DB || !Object.keys(data.globals.GEO_DB).length)throw Error('Invalid country database');
    if(data.parliaments!==undefined) {
      const p=data.parliaments;
      if(p.schema!==1 || !p.countries || !Object.keys(p.countries).length)throw Error('Invalid parliamentary dataset');
      for(const [iso,c] of Object.entries(p.countries)) {
        if(!/^[A-Z]{3}$/.test(iso)||typeof c.nameZh!=='string'||!Array.isArray(c.chambers)||!c.chambers.length)throw Error('Invalid parliamentary country');
        if(['USA','FRA','JPN'].includes(iso)&&c.chambers.length!==2)throw Error('Two chambers required');
        if(['USA','FRA','JPN','DEU'].includes(iso)&&c.chambers.some(ch=>!ch.groups?.length))throw Error('Seat groups required');
        if(iso==='DEU'&&!c.coalition)throw Error('German coalition required');
        if(c.coalition&&(!Array.isArray(c.coalition.groups)||c.coalition.groups.some(id=>!c.chambers.some(ch=>ch.groups?.some(g=>g.id===id)))))throw Error('Unknown coalition group');
        const seen=new Set();
        for(const ch of c.chambers) {
          if(typeof ch.id!=='string'||!/^[\p{L}\p{N}_.:+-]+$/u.test(ch.id)||seen.has(ch.id)||typeof ch.nameZh!=='string'||!Number.isInteger(ch.total)||ch.total<=0||ch.total>10000||!Array.isArray(ch.groups))throw Error('Invalid parliamentary chamber');
          seen.add(ch.id);const ids=new Set();let sum=0;
          for(const g of ch.groups) {
            if(!g||typeof g.id!=='string'||!/^[\p{L}\p{N}_.:+-]+$/u.test(g.id)||ids.has(g.id)||typeof g.nameZh!=='string'||!Number.isInteger(g.seats)||g.seats<0||!/^#[a-f0-9]{6}$/i.test(g.color))throw Error('Invalid parliamentary group');
            ids.add(g.id);sum+=g.seats;
          }
          if(ch.groups.length&&sum!==ch.total)throw Error('Invalid parliamentary seat sum');
          if(!Array.isArray(ch.sources)||!ch.sources.length||ch.sources.some(url=>typeof url!=='string'||!url.startsWith('https://')))throw Error('Missing parliamentary source');
        }
      }
    }
  }
  async function bounded(items,limit,visit) {
    let index=0,failure=null;
    // Drain in-flight work before rejecting so the next check cannot overlap it.
    await Promise.all(Array.from({length:Math.min(limit,items.length)},async()=>{
      while(!failure&&index<items.length){const item=items[index++];try{await visit(item);}catch(error){failure=error||Error('Update stage failed');}}
    }));
    if(failure)throw failure;
  }
  async function hydrateAssets(manifest, downloads) {
    await bounded(Object.keys(manifest.assets || {}),4,async name=>{
      if(objectURLs.has(name) || bundledAssets[name])return;
      let blob = downloads && downloads.get(name);
      if (!blob && database) blob = await get('assets', name);
      if (!blob) throw Error('Cached image missing');
      if (!objectURLs.has(name)) objectURLs.set(name, URL.createObjectURL(blob));
    });
  }
  async function digest(buffer) {
    if (!window.crypto || !crypto.subtle) throw Error('Content verification unavailable');
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buffer))).map(x => x.toString(16).padStart(2,'0')).join('');
  }
  function validPath(path, asset) {
    return typeof path === 'string' && (asset ? /^assets\/[a-f0-9]{64}\.(?:jpg|png|webp)$/ : /^data\/[a-f0-9]{64}\.json$/).test(path);
  }
  async function timedFetch(url,options,timeout,consume) {
    // AbortSignal.timeout is absent from older Android System WebViews.
    const controller=typeof AbortController==='function'?new AbortController():null;
    let deadline;
    const expired=new Promise((_,reject)=>{deadline=setTimeout(()=>{controller?.abort();reject(Error('Request timed out'));},timeout);});
    try{return await Promise.race([(async()=>consume(await fetch(url,{...options,...(controller?{signal:controller.signal}:{})})))(),expired]);}
    finally{clearTimeout(deadline);}
  }
  function retireAssets(manifest) {
    if(cleanupTimer!==null)clearTimeout(cleanupTimer);
    cleanupTimer=setTimeout(()=>{
      cleanupTimer=null;
      const keep=new Set(Object.keys(activeManifest?.assets || manifest.assets || {})),visible=new Set(),visited=new Set();
      function inspect(doc) {
        if(!doc||visited.has(doc))return;visited.add(doc);
        for(const el of doc.querySelectorAll?.('*') || []) {
          for(const attribute of el.attributes || [])for(const match of String(attribute.value).matchAll(/blob:[^\s"'()<>]+/g))visible.add(match[0]);
          if(el.currentSrc?.startsWith('blob:'))visible.add(el.currentSrc);
          if(el.tagName==='IFRAME')try{inspect(el.contentDocument);}catch{}
        }
      }
      inspect(document);
      for(const [name,url] of objectURLs)if(!keep.has(name)&&!visible.has(url)){URL.revokeObjectURL(url);objectURLs.delete(name);}
    },3000);
  }
  async function download(path, entry, asset) {
    if (!validPath(path,asset) || !/^[a-f0-9]{64}$/.test(entry.sha256) || !Number.isInteger(entry.bytes) || entry.bytes < 0 || entry.bytes > 12_000_000) throw Error('Invalid download entry');
    const buffer = await timedFetch(new URL(path,base).href, {cache:'no-cache',credentials:'omit'},30000,async response=>{
      if(!response.ok)throw Error('Data download failed');return response.arrayBuffer();
    });
    if (buffer.byteLength !== entry.bytes || await digest(buffer) !== entry.sha256) throw Error('Data verification failed');
    return buffer;
  }
  async function jsonResponse(path) {
    try {return await timedFetch(new URL(path,base).href,{cache:'no-cache',credentials:'omit'},12000,async response=>({ok:response.ok,status:response.status,data:response.ok?await response.json():null}));}
    catch(error){error.nexusTransport=true;throw error;}
  }
  async function manifestFromServer() {
    if(pointerSupported!==false) {
      const response=await jsonResponse('revision.json');
      if(response.status===404)pointerSupported=false;
      else {
        if(!response.ok)throw Error('Update service unavailable');
        const pointer=response.data;
        if(pointer.schema!==1 || !/^[a-f0-9]{64}$/.test(pointer.revision)||!pointer.manifest)throw Error('Invalid revision pointer');
        pointerSupported=true;
        if(pointer.revision===revision)return null;
        const raw=await download(pointer.manifest.path,pointer.manifest,false);
        const manifest=JSON.parse(new TextDecoder().decode(raw));
        if(manifest.revision!==pointer.revision)throw Error('Mismatched revision pointer');
        return manifest;
      }
    }
    const response=await jsonResponse('manifest.json');
    if(!response.ok)throw Error('Update service unavailable');
    return response.data;
  }
  async function sync() {
    await cacheReady;
    let manifest;
    try { manifest=await manifestFromServer(); }
    catch(error) {
      if(!error.nexusTransport || window.NEXUS_DATA_BASE || base !== 'https://74.82.200.68:4434/nexus/')throw error;
      base='https://74.82.200.68:8443/nexus/';pointerSupported=null;
      manifest=await manifestFromServer();
    }
    if(!manifest)return {updated:false,revision};
    if (manifest.schema !== 1 || !/^[a-f0-9]{64}$/.test(manifest.revision) || manifest.data?.sha256 !== manifest.revision) throw Error('Unsupported data manifest');
    if (manifest.revision === revision) return {updated:false,revision};
    const published=Number(manifest.published_at),currentPublished=Number(activeManifest?.published_at);
    if(Number.isFinite(published)&&Number.isFinite(currentPublished)&&published<currentPublished)return {updated:false,revision,stale:true};
    let next;
    if(manifest.sections) {
      const entries=Object.entries(manifest.sections);
      if(entries.length>200 || !manifest.sections.schema || !manifest.sections['globals:GEO_DB'] || entries.reduce((n,[,v])=>n+v.bytes,0)>24_000_000)throw Error('Invalid snapshot sections');
      next={globals:{}};
      await bounded(entries,4,async ([key,entry])=>{
          if(!/^(?:globals:[A-Za-z][A-Za-z0-9_]*|[a-z][A-Za-z0-9_]*)$/.test(key))throw Error('Invalid section key');
          let value;
          if(activeManifest?.sections?.[key]?.sha256===entry.sha256)
            value=key.startsWith('globals:')?snapshot.globals[key.slice(8)]:snapshot[key];
          else if(bundledManifest?.sections?.[key]?.sha256===entry.sha256)
            value=key.startsWith('globals:')?bundledSnapshot.globals[key.slice(8)]:bundledSnapshot[key];
          else value=JSON.parse(new TextDecoder().decode(await download(entry.path,entry,false)));
          if(key.startsWith('globals:'))next.globals[key.slice(8)]=value;else next[key]=value;
      });
    } else next=JSON.parse(new TextDecoder().decode(await download(manifest.data.path,manifest.data,false)));
    validate(next);
    const assets = Object.entries(manifest.assets || {});
    if (assets.length > 3000 || assets.reduce((sum, pair) => sum + pair[1].bytes,0) > 256_000_000) throw Error('Asset cache limit exceeded');
    const downloads = new Map();
    await bounded(assets,4,async ([path,entry])=>{
      if (!validPath(path,true)) throw Error('Invalid asset path');
      if (!objectURLs.has(path) && !bundledAssets[path] && (!database || !await get('assets',path))) downloads.set(path,new Blob([await download(path,entry,true)], {type:path.endsWith('.png')?'image/png':path.endsWith('.webp')?'image/webp':'image/jpeg'}));
    });
    if (database) await new Promise((resolve,reject) => {
      const tx = database.transaction(['state','assets'],'readwrite');
      downloads.forEach((blob,path) => tx.objectStore('assets').put(blob,path));
      const keep=new Set(Object.keys(manifest.assets || {}));
      const cursor=tx.objectStore('assets').openCursor();
      cursor.onsuccess=()=>{const row=cursor.result;if(row){if(!keep.has(row.key))row.delete();row.continue();}};
      tx.objectStore('state').put({snapshot:next,manifest},'current');
      tx.oncomplete=resolve;tx.onerror=tx.onabort=()=>reject(tx.error || Error('Offline cache unavailable'));
    });
    await hydrateAssets(manifest,downloads);
    activeManifest=manifest;
    apply(next,manifest.revision);
    retireAssets(manifest);
    return {updated:true,revision};
  }
  async function check() {
    if (pending) return pending;
    if(!window.NEXUS_DATA_BASE)base='https://74.82.200.68:4434/nexus/';
    pending = sync().then(result=>{failures=0;return result;},error=>{failures++;throw error;}).finally(() => { pending = null;queue(); });
    return pending;
  }
  async function readStatus() {
    status=await timedFetch(new URL('status.json',base).href,{cache:'no-cache',credentials:'omit'},12000,async response=>{
      if(!response.ok)throw Error('Server status unavailable');return response.json();
    });return status;
  }
  window.NexusData = {
    onDataChange(cb) { listeners.add(cb); cb({main:window.GEO_LIVE || {},snapshot,revision,changed:null});return () => listeners.delete(cb); },
    check, readStatus, getSnapshot:() => snapshot, getStatus:() => status || blank,
    asset:localAsset, materialize, get base(){return base}, replace
  };
  function foreground(){return document.visibilityState!=='hidden' && window.navigator?.onLine!==false;}
  function queue(delay) {
    if(timer!==null)clearTimeout(timer);
    const wait=delay??(foreground()?Math.min(300000,POLL_MS*2**Math.min(failures,3)):300000);
    timer=setTimeout(()=>{timer=null;if(foreground())check().catch(()=>{});else queue();},wait);
  }
  function catchup(){if(foreground()){if(timer!==null)clearTimeout(timer);check().catch(()=>{});}else queue();}
  apply(snapshot,bundledManifest?.revision || '',true);
  const cacheReady=(async () => {
    await ready;
    if(database) {
      try {
        const saved=await get('state','current');
        if(saved && (!bundledManifest || Number(saved.manifest.published_at)>Number(bundledManifest.published_at))) {validate(saved.snapshot);await hydrateAssets(saved.manifest);activeManifest=saved.manifest;apply(saved.snapshot,saved.manifest.revision);}
      } catch(e) {console.warn('Nexus offline cache',e.message);}
    }
  })();
  cacheReady.then(catchup);
  window.addEventListener('online',catchup);
  window.addEventListener('offline',()=>queue());
  window.addEventListener('pageshow',catchup);
  document.addEventListener('visibilitychange',catchup);
  function addButton() {
    if (document.getElementById('geo-upd')) return;
    const meta = document.getElementById('meta');if (!meta) return;
    const button = document.createElement('button');button.id='geo-upd';button.textContent='检查更新';
    button.style.cssText='margin-left:8px;background:none;border:1px solid #3a4450;color:#8fa3b8;font-size:10px;padding:1px 8px;border-radius:4px;cursor:pointer';
    button.onclick=async () => {
      button.disabled=true;button.textContent='检查中…';
      try { const result=await check();button.textContent=result.updated?'已同步':'已是最新'; }
      catch(e) { button.textContent='离线 · 使用缓存'; }
      setTimeout(() => {button.disabled=false;button.textContent='检查更新';},2500);
    };
    meta.appendChild(button);
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',addButton);else addButton();
})();
