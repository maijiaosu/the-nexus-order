/* Compact TNO-like screens: geography, institutions and controls share one stage. */
(function(){
const previous=window.renderCountryDossier;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const themes={GBR:'westminster',CAN:'westminster',AUS:'westminster',PAK:'westminster',SGP:'westminster',JPN:'diet',IND:'union',BRA:'federation',MEX:'federation',ARG:'federation',IDN:'archipelago',ITA:'twohouses',ESP:'twohouses',POL:'twohouses',KOR:'republic',TUR:'republic',ISR:'coalition',ZAF:'coalition',UKR:'wartime',VEN:'republic',TWN:'republic'};
window.renderCountryDossier=function(code,country,assets){
 previous(code,country,assets);
 document.body.removeAttribute('data-refit');
 if(code==='CHN')return;
 document.body.dataset.refit=themes[code]||'national';
 const d=window.TNO_DOSSIERS?.[code],el=document.getElementById('country-dossier');
 if(!d){
  const n=document.getElementById('national-structure');
  if(n&&!['USA','FRA','DEU'].includes(code)){
   const route=n.querySelector('.institution-route');
   if(route){route.querySelectorAll('div').forEach((x,i)=>{const title=document.createElement('small');title.textContent=['I','II','III'][i];x.prepend(title)})}
   if(window.TNO_PROFILES[code]&&!n.querySelector('.national-building')){const map=document.createElement('img');map.className='institution-geography';map.src=assets+'maps/'+(window.TNO_PROFILES[code]?code:'generic')+'.svg';map.alt='';map.onerror=()=>map.remove();n.prepend(map)}
   if(['GBR','JPN','IND','BRA'].includes(code)){const emblem=document.createElement('span');emblem.className='institution-motif institutional-art art-'+code;emblem.setAttribute('aria-hidden','true');n.prepend(emblem)}
  }
  return;
 }
 const header=el.querySelector('.dossier-heading');header.querySelector('h2').remove();
 if(d.kind==='war'){
  const board=el.querySelector('.theatre-board'),actors=el.querySelector('.theatre-actors'),brief=el.querySelector('.actor-brief');
  const grid=document.createElement('div');grid.className='operations-screen';board.before(grid);grid.append(board);
  const channel=document.createElement('div');channel.className='operations-channel';grid.append(channel);channel.append(actors,brief);
  const label=document.createElement('div');label.className='channel-label';label.textContent='势力与外部联系';channel.prepend(label);
  el.querySelector('.field-map-object')?.remove();
  const zoneColors={left:'#5599a9',right:'#b36d87',contested:'#c7b978'};
  el.querySelectorAll('.theatre-key i').forEach((item,i)=>item.style.background=zoneColors[window.TNO_THEATRES[code].conflict.zones[i].side]);
  const tags=document.createElement('div');tags.className='theatre-status';tags.innerHTML='<span>战区档案</span><b>'+esc(window.TNO_THEATRES[code].updated)+'</b>';board.prepend(tags);
  el.querySelectorAll('.field-notes article').forEach(x=>{x.querySelector('small').remove()});
 }else if(d.kind==='network'){
  const positions={IRN:[[280,55],[95,170],[280,245],[465,170]],RUS:[[110,65],[405,65],[405,160],[405,255]],PRK:[[280,45],[110,170],[280,250],[450,170]],EGY:[[90,155],[295,55],[465,155],[295,255]]};
  const points=positions[code],colors=['#e4d86e','#76d6d0','#dd777e','#80a9e6'];
  const labels=[d.apex[0],...d.branches.map(b=>b[1])];
  const body=document.createElement('div');body.className='institution-circuit';
  body.innerHTML=`<div class="circuit-legend"><span style="color:${colors[0]}">政治中枢</span><span style="color:${colors[1]}">${esc(d.branches[0][0])}</span><span style="color:${colors[2]}">${esc(d.branches[1][0])}</span><span style="color:${colors[3]}">${esc(d.branches[2][0])}</span></div><div class="circuit-screen"><svg viewBox="0 0 560 320" aria-hidden="true"><defs><pattern id="circuit-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#173138" stroke-width=".5"/></pattern></defs><rect width="560" height="320" fill="url(#circuit-grid)"/>${points.slice(1).map((p,i)=>`<path d="M${points[0][0]} ${points[0][1]} L${p[0]} ${p[1]}" fill="none" stroke="${colors[i+1]}" stroke-width="1"/><circle cx="${(points[0][0]+p[0])/2}" cy="${(points[0][1]+p[1])/2}" r="3" fill="${colors[i+1]}"/>`).join('')}${code==='IRN'?'<path d="M60 275H34V55H185" stroke="#bd91d2" stroke-dasharray="4 3" fill="none"/><text x="61" y="294" fill="#bd91d2" font-size="12">专家会议 → 选任与监督</text>':''}</svg>${points.map((p,i)=>`<button class="circuit-node" style="left:${p[0]/5.6}%;top:${p[1]/3.2}%;--signal:${colors[i]}" data-node="${i}" aria-pressed="${i===0}"><span>${['◆','I','II','III'][i]}</span><b>${esc(labels[i])}</b></button>`).join('')}</div><div class="circuit-readout" aria-live="polite"></div>`;
  const atlas=el.querySelector('.power-atlas');atlas.replaceWith(body);
  const details=[d.apex[1],...d.branches.map(b=>b[2])];
  function pick(i){body.querySelectorAll('[data-node]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.node===i)));body.querySelector('.circuit-readout').innerHTML='<h3 style="color:'+colors[i]+'">'+esc(labels[i])+'</h3><p>'+esc(details[i])+'</p>';}
  body.querySelectorAll('[data-node]').forEach(b=>b.onclick=()=>pick(+b.dataset.node));pick(0);
  const foot=document.createElement('details');foot.className='institution-supplement';foot.innerHTML='<summary>'+esc(d.foot[0])+'</summary><p>'+esc(d.foot[1])+'</p>';
  if(code==='IRN')foot.innerHTML+='<div class="guardian-sectors"><b>6 <span>＋</span> 6</b><p>宪法监护委员会：领袖任命六名教法学者；司法首长提名、议会选出六名法律人士。</p></div><p>宗教基金会连接福利服务与企业网络；宗教界内部亦存在不同立场。</p>';
  if(d.foot[1])body.after(foot);
 }else if(d.kind==='diplomacy'){
  const chart=el.querySelector('.diplomatic-chart');
  chart.innerHTML=`<div class="transit-map"><img src="${assets}maps/${code}.svg" alt="${esc(country.n)}轮廓"><svg viewBox="0 0 500 330" aria-hidden="true"><path d="M250 125V25M250 195V305M300 165H465" fill="none" stroke="#78cbd4" stroke-width="1" stroke-dasharray="6 4"/><circle cx="250" cy="165" r="8" fill="#ebd967"/><path d="M250 149L254 160L266 160L256 168L260 181L250 173L240 181L244 168L234 160L246 160Z" fill="#ecdc7a"/></svg><span class="transit-home">${esc(d.center)}</span></div><button class="neighbour north" data-link="0"><small>${esc(d.poles[0][0])}</small><span>${esc(d.poles[0][1])}</span></button><button class="neighbour south" data-link="1"><small>${esc(d.poles[1][0])}</small><span>${esc(d.poles[1][1])}</span></button><button class="neighbour third" data-link="2"><small>${esc(d.poles[2][0])}</small><span>${esc(d.poles[2][1])}</span></button>`;
  const readout=document.createElement('div');readout.className='diplomatic-readout';chart.after(readout);const pick=i=>{chart.querySelectorAll('[data-link]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.link===i)));readout.innerHTML='<b>'+esc(d.poles[i][0])+'</b><span>'+esc(d.poles[i][1])+'</span>';};chart.querySelectorAll('[data-link]').forEach(b=>b.onclick=()=>pick(+b.dataset.link));pick(0);
 }else if(d.kind==='federal'){
  el.querySelector('.federal-register').innerHTML='<img src="'+assets+'maps/NGA.svg" alt="尼日利亚轮廓"><strong>36</strong><span>州</span><small>联邦 · 州 · 地方</small>';
  el.querySelectorAll('.distribution-record .folio-number').forEach(x=>x.remove());
 }else if(d.kind==='court'){
  const heading=el.querySelector('.royal-heading');heading.querySelector('span').remove();
  const seal=document.createElement('div');seal.className='royal-insignia';seal.innerHTML='<svg viewBox="0 0 180 150" role="img" aria-label="棕榈与交叉弯刀主题纹样"><path d="M89 85V38M90 43Q62 7 40 33Q66 18 89 47M92 43Q119 7 143 34Q114 17 91 47M89 36Q77 7 67 13M92 36Q106 7 116 14M87 47Q63 34 48 60Q68 43 87 54M95 47Q123 32 137 60Q116 43 94 54" fill="none" stroke="#a9d7bf" stroke-width="5"/><path d="M39 87Q100 137 150 83Q112 151 31 101M141 87Q81 137 30 83Q65 151 149 101" fill="#d9d5bd" stroke="#78b8b5"/><path d="M27 82L46 99M134 99L153 82" stroke="#e6ca73" stroke-width="7"/></svg>';
  heading.prepend(seal);
  el.querySelectorAll('.royal-flow .folio-number').forEach(x=>x.remove());
 }else if(d.kind==='ledger'){
  el.querySelectorAll('.supply-ledger article').forEach((x,i)=>{x.querySelector('.folio-number').remove();const img=document.createElement('img');img.src=assets+['industrial/factory.png','objects/energy.svg','objects/public-services.svg'][i];img.alt='';x.prepend(img)});
 }
};
})();
