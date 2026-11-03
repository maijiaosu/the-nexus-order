/* Country-specific local studies; canonical source data is embedded in the document. */
'use strict';
const $=selector=>document.querySelector(selector);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names={USA:['美利坚合众国','UNITED STATES OF AMERICA'],FRA:['法兰西共和国','RÉPUBLIQUE FRANÇAISE'],DEU:['德意志联邦共和国','BUNDESREPUBLIK DEUTSCHLAND'],JPN:['日本国','日本国会']};
let data,countryCode='USA',locked=null;
const sorted=groups=>[...groups].sort((a,b)=>(a.id==='VAC')-(b.id==='VAC')||b.seats-a.seats);
function arcPositions(total){
 const rows=total>500?11:total>350?10:total>200?8:5;
 const radii=Array.from({length:rows},(_,i)=>145+i*181/(rows-1));
 const sum=radii.reduce((a,b)=>a+b,0),exact=radii.map(r=>total*r/sum),counts=exact.map(Math.floor);
 const fractions=exact.map((n,i)=>({i,remainder:n-counts[i]})).sort((a,b)=>b.remainder-a.remainder);
 for(let i=0,left=total-counts.reduce((a,b)=>a+b,0);i<left;i++)counts[fractions[i].i]++;
 const points=[];
 radii.forEach((radius,row)=>{for(let i=0;i<counts[row];i++){const angle=Math.PI-Math.PI*i/(counts[row]-1);points.push({x:350+radius*Math.cos(angle),y:342-radius*Math.sin(angle),angle,row});}});
 return points.sort((a,b)=>b.angle-a.angle||a.row-b.row);
}
function arc(chamber){
 const positions=arcPositions(chamber.total),radius=chamber.total>500?5.1:chamber.total>350?5.8:chamber.total>200?6.6:9.1;
 let index=0;
 const dots=chamber.groups.map(g=>Array.from({length:g.seats},()=>{const p=positions[index++];return `<circle aria-hidden="true" class="seat" data-party="${esc(g.id)}" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${radius}" fill="${g.color}"><title>${esc(g.nameZh)} ${g.seats} 席</title></circle>`;}).join('')).join('');
 return `<svg class="arc" viewBox="0 0 700 370" role="img" aria-label="${esc(chamber.nameZh)}，${chamber.total}席"><path class="arc-rail" d="M15 343 A335 335 0 0 1 685 343 M214 343 A136 136 0 0 1 486 343"/>${dots}<text class="arc-total" x="350" y="327" text-anchor="middle">${chamber.total}</text></svg>`;
}
function groupButton(g,style=''){
 const shortJapan={'国民民主党及无所属俱乐部':'国民民主·无所属','国民民主党及新绿风会':'国民民主·新绿风会','未来团队及无所属会':'未来团队·无所属','自民党及无所属会':'自民党·无所属'};
 const label=countryCode==='JPN'?(shortJapan[g.nameZh]||g.nameZh):g.nameZh;
 return `<button class="party-key ${style}" data-party="${esc(g.id)}" aria-pressed="false" aria-label="${esc(g.nameZh)}，${g.seats}席" title="${esc(g.nameOriginal)} · ${g.seats} 席" style="--party:${g.color}"><i aria-hidden="true"></i><span>${esc(label)}</span><strong>${g.seats}</strong></button>`;
}
function chamberTag(c){return `data-chamber="${esc(c.id)}" data-total="${c.total}" aria-label="${esc(c.nameZh)}"`;}
function usa(country){
 return `<div class="us-congress"><img class="us-watermark" src="assets/USA.svg" alt="">${country.chambers.map(c=>`<section class="us-house chamber" ${chamberTag(c)}><h2>${esc(c.nameZh)}</h2><div class="arc-well">${arc(c)}</div><div class="us-parties">${sorted(c.groups).map(g=>groupButton(g)).join('')}</div></section>`).join('')}</div>`;
}
function france(country){
 const [assembly,senate]=country.chambers;
 return `<div class="fr-parliament"><section class="fr-assembly chamber" ${chamberTag(assembly)}><h2>${esc(assembly.nameZh)}</h2><img class="fr-watermark" src="assets/FRA.svg" alt=""><div class="arc-well">${arc(assembly)}</div><div class="fr-parties">${sorted(assembly.groups).map(g=>groupButton(g)).join('')}</div></section><section class="fr-senate chamber" ${chamberTag(senate)}><header><h2>${esc(senate.nameZh)}</h2><strong class="number">${senate.total}</strong></header><div class="senate-ledger">${sorted(senate.groups).map(g=>`<div class="ledger-entry" data-party="${esc(g.id)}" style="--party:${g.color};--amount:${g.seats/senate.total*100}%">${groupButton(g)}<div class="ledger-track" aria-hidden="true"><span></span></div></div>`).join('')}</div></section></div>`;
}
function benches(g,columns){
 const rows=Math.ceil(g.seats/columns),width=columns*13+2,height=rows*12+2;
 const marks=Array.from({length:g.seats},(_,i)=>`<rect aria-hidden="true" class="seat" data-party="${esc(g.id)}" x="${(i%columns)*13+2}" y="${Math.floor(i/columns)*12+2}" width="9" height="8" fill="${g.color}"/>`).join('');
 return `<svg class="bench-array" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(g.nameZh)}，${g.seats}席">${marks}</svg>`;
}
function germany(country){
 const c=country.chambers[0],coalition=country.coalition.groups;
 const governing=coalition.map(id=>c.groups.find(g=>g.id===id));
 const others=sorted(c.groups.filter(g=>!coalition.includes(g.id)));
 return `<section class="de-bundestag chamber" ${chamberTag(c)}><header class="de-heading"><h2>${esc(c.nameZh)}</h2><strong class="number">${c.total}</strong></header><div class="de-floor"><div class="de-coalition"><h3>联合执政</h3><div class="linked-parties">${governing.map(g=>`<article class="bench-party" style="--party:${g.color}">${groupButton(g)}${benches(g,26)}</article>`).join('')}</div></div><div class="de-eagle"><img src="assets/DEU.svg" alt=""></div><div class="de-parties">${others.map(g=>`<article class="bench-party" style="--party:${g.color}">${groupButton(g)}${benches(g,26)}</article>`).join('')}</div></div></section>`;
}
function matrix(c){
 const columns=31,stepX=15,stepY=15,rows=Math.ceil(c.total/columns),offsetY=(225-rows*stepY)/2;let index=0;
 const blocks=c.groups.map(g=>Array.from({length:g.seats},()=>{const i=index++;return `<rect aria-hidden="true" class="seat" data-party="${esc(g.id)}" x="${(i%columns)*stepX+2}" y="${Math.floor(i/columns)*stepY+2+offsetY}" width="10" height="9" fill="${g.color}"/>`;}).join('')).join('');
 return `<svg class="jpn-matrix" viewBox="0 0 ${columns*stepX} 225" role="img" aria-label="${esc(c.nameZh)}，${c.total}席">${blocks}</svg>`;
}
function japan(country){
 return `<div class="jp-diet"><div class="jp-axis"><img src="assets/JPN.svg" alt=""><i aria-hidden="true"></i></div><div class="jp-chambers">${country.chambers.map(c=>`<section class="jp-house chamber" ${chamberTag(c)}><header><h2>${esc(c.nameZh)}</h2><strong class="number">${c.total}</strong></header><div class="jp-row"><div class="matrix-well">${matrix(c)}</div><div class="jp-parties">${sorted(c.groups).map(g=>groupButton(g)).join('')}</div></div></section>`).join('')}</div></div>`;
}
function highlight(id){
 $('#scene').classList.toggle('party-selected',!!id);
 document.querySelectorAll('.chamber').forEach(chamber=>chamber.classList.toggle('has-selection',!!id&&!!chamber.querySelector(`[data-party="${id}"]`)));
 document.querySelectorAll('.seat,.party-key,.ledger-entry').forEach(el=>{el.classList.toggle('selected',el.dataset.party===id);if(el.matches('button'))el.setAttribute('aria-pressed',String(el.dataset.party===id));});
}
function render(){
 const country=data.countries[countryCode];
 country.chambers.forEach(c=>{if(c.groups.reduce((n,g)=>n+g.seats,0)!==c.total)throw Error('Seat total mismatch');});
 $('#scene').dataset.country=countryCode;
 $('#country-name').textContent=names[countryCode][0];
 $('#native-name').textContent=names[countryCode][1];
 $('#header-crest').src=`assets/${countryCode}.svg`;
 $('#composition').innerHTML=({USA:usa,FRA:france,DEU:germany,JPN:japan})[countryCode](country);
 document.querySelectorAll('.country-buttons button').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.country===countryCode)));
 document.title=`${country.nameZh} · 议会`;
 locked=null;highlight(null);$('#scene').setAttribute('aria-busy','false');
}
function readHash(){const fixed=new URLSearchParams(location.search).get('country')?.toUpperCase();const code=names[fixed]?fixed:location.hash.slice(1).toUpperCase();countryCode=names[code]?code:'USA';render();}
$('.country-buttons').addEventListener('click',e=>{const b=e.target.closest('[data-country]');if(b)location.hash=b.dataset.country;});
$('#composition').addEventListener('click',e=>{const el=e.target.closest('[data-party]');if(el){locked=locked===el.dataset.party?null:el.dataset.party;highlight(locked);}});
$('#composition').addEventListener('pointerover',e=>{const el=e.target.closest('.seat');if(el)highlight(el.dataset.party);});
$('#composition').addEventListener('pointerout',e=>{if(e.target.closest('.seat')&&!e.relatedTarget?.closest?.('.seat'))highlight(locked);});
$('#composition').addEventListener('pointerleave',()=>highlight(locked));
window.addEventListener('hashchange',()=>{if(data)readHash();});
document.addEventListener('keydown',e=>{if(data&&e.key==='Escape'&&locked){locked=null;highlight(null);e.preventDefault();e.stopImmediatePropagation();}});
try{data=JSON.parse($('#study-data').textContent).parliament;readHash();}catch(error){$('#error').hidden=false;$('#error').textContent=`议会资料暂时无法载入。${error.message}`;$('#scene').setAttribute('aria-busy','false');}

window.TNOParliamentRefresh=function(payload,changedCountries){
 if(!payload||payload.schema!==1||!payload.countries)return;
 const current=countryCode, incoming=payload.countries[current];
 if(!incoming||(changedCountries&&!changedCountries.includes(current)))return;
 const previous=data.countries[current];
 if(JSON.stringify(previous)===JSON.stringify(incoming))return;
 const selected=locked;
 data.countries[current]=JSON.parse(JSON.stringify(incoming));
 render();
 if(selected&&incoming.chambers.some(ch=>ch.groups.some(g=>g.id===selected))){locked=selected;highlight(locked);}
};
