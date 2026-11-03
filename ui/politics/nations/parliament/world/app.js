/* Local parliamentary snapshots remain separate from political-influence estimates. */
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const regions={Europe:'欧洲',Americas:'美洲',AsiaPacific:'亚太',MiddleEast:'中东',Africa:'非洲'};
const data=JSON.parse($('#study-data').textContent);
const catalog=data.config.countries;
let code='GBR',locked=null;
const sort=groups=>[...groups].sort((a,b)=>(a.id==='VAC')-(b.id==='VAC')||b.seats-a.seats);
const symbol=()=>esc(data.assets[code].file);
const crest=(cls='watermark')=>`<img class="${cls}" src="${symbol()}" alt="">`;
const attr=c=>`data-chamber="${esc(c.id)}" data-total="${c.total}" aria-label="${esc(c.nameZh)}" title="${esc(({membership:'议员名册',election:'选举席位',statutory:'法定席位'})[c.basis]||'')} ${esc(c.asOf||c.verifiedOn||'')}"`;
const tag=c=>`<header class="chamber-heading"><h2>${esc(c.nameZh)}</h2><strong class="number">${c.total}</strong></header>`;
function key(g){return `<button class="party-key" data-party="${esc(g.id)}" aria-pressed="false" title="${esc(g.nameOriginal||g.nameZh)} · ${g.seats} 席" aria-label="${esc(g.nameZh)}，${g.seats}席" style="--party:${g.color}"><i></i><span>${esc(g.nameZh)}</span><strong>${g.seats}</strong></button>`;}
function keys(c,extra=''){return `<div class="party-list ${extra}">${sort(c.groups).map(key).join('')}</div>`;}
function marks(c,positions,shape='circle'){
 let i=0; const groups=c.groups.length?c.groups:[{id:'UNASSIGNED',seats:c.total,color:'#627580',nameZh:c.nameZh}];
 return groups.map(g=>Array.from({length:g.seats},()=>{const p=positions[i++];return shape==='rect'?`<rect class="seat" data-party="${esc(g.id)}" x="${p.x}" y="${p.y}" width="8" height="6" fill="${g.color}"/>`:`<circle class="seat" data-party="${esc(g.id)}" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${c.total>500?4.3:c.total>300?5.5:c.total>150?7:9}" fill="${g.color}"/>`;}).join('')).join('');
}
function arc(c){
 const rows=c.total>500?12:c.total>300?10:c.total>150?8:5;
 const radii=Array.from({length:rows},(_,i)=>132+i*185/(rows-1)),sum=radii.reduce((a,b)=>a+b,0),raw=radii.map(r=>c.total*r/sum),counts=raw.map(Math.floor);
 const rest=raw.map((n,i)=>({i,f:n-counts[i]})).sort((a,b)=>b.f-a.f);
 const missing=c.total-counts.reduce((a,b)=>a+b,0);for(let i=0;i<missing;i++)counts[rest[i].i]++;
 const points=[];radii.forEach((r,row)=>{for(let i=0;i<counts[row];i++){const angle=Math.PI-Math.PI*i/Math.max(1,counts[row]-1);points.push({x:335+r*Math.cos(angle),y:328-r*Math.sin(angle),angle,row});}});
 points.sort((a,b)=>b.angle-a.angle||a.row-b.row);
 return `<svg class="arc" viewBox="0 0 670 350" role="img" aria-label="${esc(c.nameZh)}，${c.total}席"><path class="rail" d="M8 329 A327 327 0 0 1 662 329 M211 329 A124 124 0 0 1 459 329"/>${marks(c,points)}<path class="dais" d="M294 327 L300 300 H370 L376 327Z"/></svg>`;
}
function matrix(c,columns=36){
 const rows=Math.ceil(c.total/columns),positions=Array.from({length:c.total},(_,i)=>({x:(i%columns)*12+3,y:Math.floor(i/columns)*11+3}));
 return `<svg class="matrix" viewBox="0 0 ${columns*12} ${rows*11+5}" role="img" aria-label="${esc(c.nameZh)}，${c.total}席">${marks(c,positions,'rect')}</svg>`;
}
function partyBlocks(c){return `<div class="party-blocks">${sort(c.groups).map(g=>`<article class="party-block" data-party="${esc(g.id)}">${key(g)}${matrix({...c,total:g.seats,groups:[g]},30)}</article>`).join('')}</div>`;}
function ledger(c){return `<div class="ledger">${sort(c.groups).map(g=>`<div class="ledger-entry" data-party="${esc(g.id)}" style="--party:${g.color};--amount:${g.seats/c.total*100}%">${key(g)}<div class="track"><i></i></div></div>`).join('')}</div>`;}
function strip(c){return `<div class="seat-strip" role="img" aria-label="${esc(c.nameZh)}，${c.total}席">${c.groups.map(g=>`<span class="seat" data-party="${esc(g.id)}" title="${esc(g.nameZh)} ${g.seats}" style="flex:${g.seats};--party:${g.color}"></span>`).join('')}</div>`;}
function upper(c){return `<section class="chamber upper" ${attr(c)}>${tag(c)}${c.groups.length?strip(c)+keys(c):matrix(c,38)}</section>`;}
function single(c){return `<section class="chamber fan-house" ${attr(c)}>${tag(c)}<div class="fan-floor"><div class="diagram">${crest()}${arc(c)}</div>${c.groups.length?ledger(c):''}</div></section>`;}
function doubles(country){
 if(country.chambers.length<2)return single(country.chambers[0]);
 return `<div class="double-houses">${crest()}${country.chambers.map(c=>`<section class="chamber half-house" ${attr(c)}>${tag(c)}<div class="diagram">${arc(c)}</div>${keys(c)}</section>`).join('')}</div>`;
}
function opposing(c){
 const columns=14,rows=Math.ceil(c.total/(columns*2)),points=[];
 const half=Math.ceil(c.total/2);
 for(let i=0;i<c.total;i++){const side=i<half?0:1,j=i<half?i:i-half;points.push({x:side?290+(j%columns)*12:18+(columns-1-j%columns)*12,y:20+Math.floor(j/columns)*11});}
 return `<svg class="opposing" viewBox="0 0 480 ${Math.max(140,rows*11+40)}" role="img" aria-label="${esc(c.nameZh)}，${c.total}席"><path class="rail" d="M194 14V${rows*11+30} M277 14V${rows*11+30}"/><rect class="table" x="219" y="${rows*5}" width="33" height="42"/>${marks(c,points,'rect')}</svg>`;
}
function benches(country){const c=country.chambers[0];return `<div class="westminster"><section class="chamber bench-house" ${attr(c)}>${tag(c)}<div class="bench-floor"><div class="diagram">${crest()}${opposing(c)}</div>${ledger(c)}</div></section>${country.chambers.slice(1).map(upper).join('')}</div>`;}
function federal(country){const c=country.chambers[0];return `<div class="federal"><section class="chamber federal-main" ${attr(c)}>${tag(c)}${c.groups.length?partyBlocks(c):matrix(c)}</section><aside class="federal-side">${crest('standing-crest')}${country.chambers.slice(1).map(upper).join('')}</aside></div>`;}
function tiers(country){return `<div class="tiered">${crest()}${country.chambers.map(c=>`<section class="chamber tier" ${attr(c)}>${tag(c)}<div class="tier-floor"><div class="diagram">${matrix(c)}</div>${keys(c)}</div></section>`).join('')}</div>`;}
function assembly(country){const c=country.chambers[0];return `<div class="assembly"><div class="assembly-symbol">${crest('standing-crest')}</div><section class="chamber assembly-house" ${attr(c)}>${tag(c)}<div class="assembly-floor">${matrix(c,32)}</div>${keys(c)}</section>${country.chambers.slice(1).map(upper).join('')}</div>`;}
function council(country){const c=country.chambers[0];
 if(code==='IRN'){
  const general=c.groups[0],reserved=c.groups.slice(1);
  return `<section class="chamber council" ${attr(c)}>${tag(c)}<div class="reserved-floor">${crest('standing-crest')}<article class="council-group">${key(general)}${matrix({...c,total:general.seats,groups:[general]},24)}</article><div class="reserved-groups">${reserved.map(g=>`<article>${key(g)}${matrix({...c,total:g.seats,groups:[g]},1)}</article>`).join('')}</div></div></section>`;
 }
 return `<section class="chamber council" ${attr(c)}>${tag(c)}<div class="council-floor">${crest('standing-crest')}${c.groups.length?c.groups.map(g=>`<article class="council-group" data-party="${esc(g.id)}">${key(g)}${matrix({...c,total:g.seats,groups:[g]},g.seats<30?5:24)}</article>`).join(''):matrix(c)}</div>${country.chambers.slice(1).map(upper).join('')}</section>`;
}
function highlight(id){
 document.querySelectorAll('.chamber').forEach(c=>c.classList.toggle('has-selection',!!id&&!![...c.querySelectorAll('[data-party]')].find(el=>el.dataset.party===id)));
 document.querySelectorAll('[data-party]').forEach(el=>{el.classList.toggle('selected',el.dataset.party===id);if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',String(el.dataset.party===id));});
}
function renderNavigation(region){
 $('#regions').innerHTML=Object.entries(regions).map(([id,name])=>`<button data-region="${id}" aria-pressed="${id===region}">${name}</button>`).join('');
 $('#countries').innerHTML=catalog.filter(c=>c.region===region).map(c=>`<button data-country="${c.id}" aria-pressed="${code===c.id}"><img src="../../../assets/flags/${c.id}.png" alt="">${c.nameZh}</button>`).join('');
 const rail=$('#countries'),active=rail.querySelector('[aria-pressed="true"]');
 requestAnimationFrame(()=>{if(active?.isConnected)rail.scrollLeft=active.offsetLeft-rail.offsetLeft-(rail.clientWidth-active.offsetWidth)/2;});
}
function render(){
 const cfg=catalog.find(c=>c.id===code),country=data.countries[code];
 $('#scene').dataset.country=code;$('#scene').dataset.layout=cfg.layout;$('#scene').style.setProperty('--accent',cfg.accent);
 $('#country-name').textContent=country.nameZh;$('#native-name').textContent=country.nativeName||'';
 $('#header-crest').src=data.assets[code].file;$('#header-flag').src=`../../../assets/flags/${code}.png`;
 $('#status').hidden=country.status!=='dissolved';$('#status').textContent=country.status==='dissolved'?'议会解散':'';
 const renderers={benches,double:doubles,fan:c=>single(c.chambers[0])+c.chambers.slice(1).map(upper).join(''),federation:federal,tiers,assembly,council};
 $('#composition').innerHTML=renderers[cfg.layout](country);
 $('#scene').classList.toggle('dense',country.chambers.some(c=>c.groups.length>14));
 renderNavigation(cfg.region);locked=null;highlight(null);$('#scene').setAttribute('aria-busy','false');document.title=`${country.nameZh} · 议会`;
}
function readHash(){const fixed=new URLSearchParams(location.search).get('country')?.toUpperCase();const requested=catalog.some(c=>c.id===fixed)?fixed:location.hash.slice(1).toUpperCase();code=catalog.some(c=>c.id===requested)?requested:'GBR';render();}
$('#regions').addEventListener('click',e=>{const b=e.target.closest('[data-region]');if(b)location.hash=catalog.find(c=>c.region===b.dataset.region).id;});
$('#countries').addEventListener('click',e=>{const b=e.target.closest('[data-country]');if(b)location.hash=b.dataset.country;});
$('#composition').addEventListener('click',e=>{const b=e.target.closest('[data-party]');if(b&&b.dataset.party!=='UNASSIGNED'){locked=locked===b.dataset.party?null:b.dataset.party;highlight(locked);}});
$('#composition').addEventListener('pointerover',e=>{const b=e.target.closest('.seat');if(b&&b.dataset.party!=='UNASSIGNED')highlight(b.dataset.party);});
$('#composition').addEventListener('pointerleave',()=>highlight(locked));
$('#composition').addEventListener('pointerout',e=>{if(e.target.closest('.seat')&&!e.relatedTarget?.closest?.('.seat'))highlight(locked);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&locked){locked=null;highlight(null);e.preventDefault();e.stopImmediatePropagation();}});
window.addEventListener('hashchange',readHash);
try{readHash();}catch(e){$('#error').hidden=false;$('#error').textContent=`议会资料无法显示。${e.message}`;}

window.TNOParliamentRefresh=function(payload,changedCountries){
 if(!payload||payload.schema!==1||!payload.countries)return;
 const current=code, incoming=payload.countries[current];
 if(!incoming||(changedCountries&&!changedCountries.includes(current)))return;
 const previous=data.countries[current];
 if(JSON.stringify(previous)===JSON.stringify(incoming))return;
 const selected=locked;
 data.countries[current]=JSON.parse(JSON.stringify(incoming));
 render();
 if(selected&&incoming.chambers.some(ch=>ch.groups.some(g=>g.id===selected))){locked=selected;highlight(locked);}
};
