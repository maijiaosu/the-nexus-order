'use strict';
(function(scope){
 const DRAFT='nexus-china-enterprise-draft-v1',APPLIED='nexus-china-enterprise-applied-v1';
 const kinds=['private','state'];
 const defaults=scope.ECON_ENTERPRISE_PROPOSALS||{};
 const names=Object.keys(defaults);
 const valid=g=>g===null||(Number.isInteger(g)&&g>=1&&g<=5);
 function clean(raw){const out={};if(!raw||typeof raw!=='object')return out;for(const n of names)for(const k of kinds)if(Object.prototype.hasOwnProperty.call(raw[n]||{},k)&&valid(raw[n][k]))(out[n]||={})[k]=raw[n][k];return out;}
 function read(key){try{const raw=JSON.parse(scope.localStorage.getItem(key)||'null');return raw?.version===1?clean(raw.grades):{};}catch{return {};}}
 function merge(...sets){const result={};for(const n of names)result[n]={private:null,state:null};for(const set of sets)for(const [n,row]of Object.entries(clean(set)))Object.assign(result[n],row);return result;}
 function draft(){return merge(defaults,applied(),read(DRAFT));}
 function applied(){const out=clean(scope.ECON_ENTERPRISE_CONFIRMED);for(const [n,row] of Object.entries(read(APPLIED)))Object.assign(out[n]||={},row);return out;}
 function write(key,grades){const record={version:1,updatedAt:new Date().toISOString(),grades:clean(grades)};scope.localStorage.setItem(key,JSON.stringify(record));return record;}
 function set(n,k,g){if(!names.includes(n)||!kinds.includes(k)||!valid(g))throw Error('无效评级');const current=draft();current[n][k]=g;write(DRAFT,current);return current;}
 function apply(){const current=draft();write(APPLIED,current);scope.dispatchEvent(new Event('enterprise-grades-change'));return current;}
 function withGrades(n,f={}){const row=applied()[n];if(!row)return f;const enterprises={...f.enterprises};for(const k of kinds)if(Object.prototype.hasOwnProperty.call(row,k))enterprises[k]={grade:row[k],approved:true,origin:'user'};return {...f,enterprises};}
 function subscribe(fn){const storage=e=>{if(e.key===APPLIED||e.key===null)fn();};scope.addEventListener('storage',storage);scope.addEventListener('enterprise-grades-change',fn);scope.addEventListener('focus',fn);return()=>{scope.removeEventListener('storage',storage);scope.removeEventListener('enterprise-grades-change',fn);scope.removeEventListener('focus',fn);};}
 scope.EconEnterpriseGrades={DRAFT,APPLIED,names,kinds,clean,merge,draft,applied,set,apply,withGrades,subscribe};
})(window);
