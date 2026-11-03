/* Country-specific content replaces the generic chamber when it is not the subject. */
window.renderCountryDossier=function(code,country,assetRoot){
 const d=window.TNO_DOSSIERS?.[code],body=document.body;
 document.getElementById('country-dossier')?.remove();document.getElementById('chamber-reveal')?.remove();
 body.removeAttribute('data-dossier');body.classList.remove('show-secondary-chamber');
 document.querySelector('[data-view="congress"]').textContent='国会与政党';
 if(!d)return;
 const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 body.dataset.dossier=d.kind;
 document.querySelector('.window-title>span').textContent=d.title;
 document.querySelector('.window-title small').textContent=d.en;
 document.querySelector('[data-view="congress"]').textContent=d.title;
 const el=document.createElement('section');el.id='country-dossier';
 el.innerHTML=`<header class="dossier-heading"><small>${e(d.en)}</small><h2>${e(d.title)}</h2><p>${e(d.summary)}</p></header>`;
 const card=(item,i)=>`<article><small>${e(item[0])}</small><h3>${e(item[1])}</h3><p>${e(item[2])}</p></article>`;
 if(d.kind==='war'){
  const t=window.TNO_THEATRES[code],c=t.conflict;
  el.innerHTML+=`<div class="theatre-board"><img class="field-map-object" src="${assetRoot}objects/field-map.svg" alt=""><div class="theatre-coordinate">${e(code)} / ${e(c.since)} —<span>CONTROL & ACCESS</span></div><div class="theatre-map">${t.svg}</div><div class="theatre-key">${c.zones.map(z=>`<span><i style="background:${c.colors[z.side]||'#a89663'}"></i>${e(z.label)}</span>`).join('')}</div></div><div class="theatre-actors"><button data-side="all" aria-pressed="true">全局</button>${['left','right'].map(k=>`<button data-side="${k}" aria-pressed="false" style="--actor:${c.colors[k]}">${e(c[k].name)}</button>`).join('')}</div><section class="actor-brief" aria-live="polite"></section><div class="field-notes">${d.notes.map((n,i)=>`<article><small>FIELD NOTE / 0${i+1}</small><h3>${e(n[0])}</h3><p>${e(n[1])}</p></article>`).join('')}</div>`;
  const update=side=>{
   el.querySelectorAll('.theatre-map [data-side]').forEach(p=>p.style.opacity=side==='all'||p.dataset.side===side?'.85':'.18');
   el.querySelectorAll('button[data-side]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.side===side)));
   el.querySelector('.actor-brief').innerHTML=side==='all'?'':`<h3>${e(c[side].name)}</h3><ul>${c[side].members.map(m=>`<li><b>${e(m.label||window.GEO_DB[m.iso]?.n||m.iso)}</b><span>${e(m.tag||'')}</span></li>`).join('')}</ul>`;
  };el.querySelectorAll('button[data-side]').forEach(b=>b.onclick=()=>update(b.dataset.side));update('all');
 }else if(d.kind==='plan'){
  const planIcons=['industrial/factory.png','industrial/construction.png','objects/energy.svg','objects/public-services.svg'];
  el.innerHTML+=`<div class="plan-cover"><img src="${assetRoot}tiananmen-daylight-slogans.png" alt="天安门正面日景，左右标语完整"><div><b>十五五</b><span>国民经济与社会发展</span><strong>2026 — 2030</strong></div></div><ol class="plan-years">${d.period.map(x=>`<li>${x}</li>`).join('')}</ol><div class="programme-tabs" role="tablist" aria-label="建设议题">${d.items.map((x,i)=>`<button id="plan-tab-${i}" role="tab" aria-controls="programme-sheet" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}" data-programme="${i}"><img src="${assetRoot+planIcons[i]}" alt="">${e(x[0])}</button>`).join('')}</div><section id="programme-sheet" class="programme-sheet" role="tabpanel" tabindex="0"></section>`;
  const pick=i=>{el.querySelectorAll('[data-programme]').forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1});const p=el.querySelector('.programme-sheet');p.setAttribute('aria-labelledby','plan-tab-'+i);p.innerHTML='<img class="programme-object" src="'+assetRoot+planIcons[i]+'" alt="">'+card(d.items[i],i)+'<div class="plan-process"><span>规划部署</span><i>›</i><span>专项与地方落实</span><i>›</i><span>评估与调整</span></div>';};
  el.querySelectorAll('[data-programme]').forEach((b,i)=>{b.onclick=()=>pick(i);b.onkeydown=event=>{if(['ArrowRight','ArrowLeft'].includes(event.key)){event.preventDefault();const n=(i+(event.key==='ArrowRight'?1:3))%4;pick(n);el.querySelector('[data-programme="'+n+'"]').focus()}}});pick(0);
 }else if(d.kind==='network'){
  el.innerHTML+=`<div class="power-atlas"><div class="power-apex"><small>政治中枢</small><h3>${e(d.apex[0])}</h3><p>${e(d.apex[1])}</p></div><div class="power-branches">${d.branches.map(card).join('')}</div><div class="power-foundation"><b>${e(d.foot[0])}</b><p>${e(d.foot[1])}</p></div></div>`;
  if(code==='IRN'){
   const layers=document.createElement('section');layers.className='iran-supervision';
   layers.innerHTML='<div class="guardian-composition"><strong>6 <i>＋</i> 6</strong><div><h3>宪法监护委员会</h3><p>六名教法学者由最高领袖任命；另六名法律人士由司法首长提名、议会选出。</p></div></div><details><summary>宗教与经济组织的社会基础</summary><p>宗教界并非单一派系。宗教基金会还连接福利服务与企业网络；例如弱势者基金会拥有跨行业经济资产。其影响不能用政党席位直接衡量。</p></details>';
   el.querySelector('.power-foundation').before(layers);
  }
 }else if(d.kind==='diplomacy'){
  el.innerHTML+=`<div class="diplomatic-chart"><img class="transit-medallion" src="${assetRoot}objects/transit-medallion.svg" alt="铁路通道徽章"><div class="compass-rose" aria-hidden="true">N<br>╋<br>S</div><div class="pole pole-n"><small>${e(d.poles[0][0])}</small><p>${e(d.poles[0][1])}</p></div><div class="diplomatic-center"><img src="${assetRoot}flags/${code}.png" alt=""><h3>${e(d.center)}</h3><span>自主外交</span></div><div class="pole pole-s"><small>${e(d.poles[1][0])}</small><p>${e(d.poles[1][1])}</p></div><div class="pole pole-third"><small>${e(d.poles[2][0])}</small><p>${e(d.poles[2][1])}</p></div></div>`;
 }else if(d.kind==='court'){
  el.innerHTML+=`<div class="royal-record"><div class="royal-heading"><span>المملكة العربية السعودية</span><h3>${e(d.apex[0])}</h3><p>${e(d.apex[1])}</p></div><div class="royal-flow">${d.items.map(card).join('')}</div><div class="vision-imprint">VISION <strong>2030</strong></div></div>`;
 }else if(d.kind==='federal'){
  el.innerHTML+=`<div class="federal-ledger"><div class="federal-register"><strong>36</strong><span>州 · 联邦行政单位</span><div aria-hidden="true">${Array.from({length:36},(_,i)=>`<i>${String(i+1).padStart(2,'0')}</i>`).join('')}</div></div><div class="distribution-record">${d.items.map(card).join('')}</div></div>`;
 }else{
  el.innerHTML+=`<div class="supply-ledger">${d.items.map(card).join('')}</div>`;
 }
 // Appending a note must not reconstruct interactive descendants.
 document.getElementById('congress-view').prepend(el);
 if(d.retainChamber&&country.parl){const b=document.createElement('button');b.id='chamber-reveal';b.textContent='展开立法机构资料';b.setAttribute('aria-expanded','false');b.onclick=()=>{const open=body.classList.toggle('show-secondary-chamber');b.setAttribute('aria-expanded',String(open));b.textContent=open?'收起立法机构资料':'展开立法机构资料'};el.after(b)}
};
