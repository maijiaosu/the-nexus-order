'use strict';
(function(scope){
 const KEY='nexus-china-warning-states-v1',keys=['realGrowth','debt','deficit','employment','inflation','crisis'];
 const config=scope.ECON_WARNING_CONFIG||{editable:false,states:{}};
 const valid=row=>Array.isArray(row)&&row.length===6&&row.every(v=>typeof v==='boolean');
 const editable=()=>config.editable===true;
 function read(){try{const raw=JSON.parse(scope.localStorage.getItem(KEY)||'null');if(raw?.version!==1)return {};return Object.fromEntries(Object.entries(raw.states||{}).filter(([n,row])=>Object.hasOwn(config.states,n)&&valid(row)));}catch{return {};}}
 function states(name){const base=valid(config.states[name])?config.states[name]:Array(6).fill(false);return [...(editable()?read()[name]||base:base)];}
 function toggle(name,key){if(!editable())return false;const i=keys.indexOf(key);if(i<0||!Object.hasOwn(config.states,name))return false;const all=read(),row=states(name);row[i]=!row[i];all[name]=row;scope.localStorage.setItem(KEY,JSON.stringify({version:1,updatedAt:new Date().toISOString(),states:all}));scope.dispatchEvent(new Event('warning-states-change'));return true;}
 function snapshot(){return Object.fromEntries(Object.keys(config.states).map(n=>[n,states(n)]));}
 function subscribe(fn){const onStorage=e=>{if(e.key===KEY||e.key===null)fn();};scope.addEventListener('storage',onStorage);scope.addEventListener('warning-states-change',fn);scope.addEventListener('focus',fn);return()=>{scope.removeEventListener('storage',onStorage);scope.removeEventListener('warning-states-change',fn);scope.removeEventListener('focus',fn);};}
 scope.EconWarningState={KEY,keys,editable,states,toggle,snapshot,subscribe};
})(window);
