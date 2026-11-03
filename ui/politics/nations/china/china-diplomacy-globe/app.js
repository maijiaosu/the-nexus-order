'use strict';
const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let regionMap;
const grades=['微弱','有限','成势','强势','主导'];
const archiveTabs={countries:'国别',places:'地点',finance:'金融机制',currents:'政治思潮',case:'地区案例'};
const countryRegions = new Map();
const countryCoords={USA:[-98,38],RUS:[90,57],IND:[79,23],BRA:[-52,-12],ZAF:[25,-29],SAU:[45,24],ARE:[54,24],IRN:[54,31],EGY:[30,27],ETH:[39,9],IDN:[116,-4],DEU:[10,51],FRA:[2,46]};
let trade,affairs,archives,globe,current='ea',archiveType='countries',activeItem='',opener;
const amt = (value,places=1) => (value/1e8).toLocaleString('en-US',{minimumFractionDigits:places,maximumFractionDigits:places});
function chassis(){
  const {path,line,circle,range}=AtlasArt;
  const rail='#496661', muted='#253b39',shine='#94a8a3';
  const title='M414 11H1186l-24 19-27 3-22 40-285 3-28 14-28-14-285-3-22-40-27-3Z';
  return path('M9 5H1591l6 7v891l-10 12H12l-9-9V14Z','none','#60736e',3)+line('M15 14h1570v885l-8 8H21l-7-7Z',1,rail)+
    path(title,'#0a1517',shine,1.4)+line('M424 17l24 18 18 2 24 42 278 5 32 13 32-13 278-5 24-42 18-2 24-18',1.4,rail)+
    range(47,i=>line(`M${501+i*13} 70v6l3 4 3-4v-6`,.7,rail))+
    range(2,i=>{let x=i?1183:32;return range(20,j=>line(`M${x+j*19} 14v${j%4===0?10:6}`,1.1,rail))+line(`M${x} 74h367m-367 7h320`,1,rail)})+
    line('M26 115h302l22-17h156m-478 27v90M1574 110h-185l-17-13h-197m391 14v100m0 522v43h-338l-18 14h-123',1.2,rail)+
    line('M33 868h61m1300 0h171',1.1,muted)+
    line('M34 875h31m1467 0h32',1,rail)+
    range(55,i=>line(`M${39+i*28} 900v${i%5===0?-6:-3}`,1,muted))+
    range(22,i=>line(`M24 ${148+i*29}h${i%4===0?8:4}M1575 ${148+i*29}h-${i%4===0?8:4}`,1,muted))+
    [[20,21],[1580,21],[20,898],[1580,898]].map(([x,y])=>circle(x,y,3,'#081115',rail,1)+line(`M${x-1.6} ${y+1.6}l3.2-3.2`,1,shine)).join('');
}
function tradeDock(direction, amount, goods) {
  const name = direction === 'out' ? '出口' : '进口';
  const entries = goods.map((item,index) =>
    `<button class="cargo" data-good="${direction}-${index}" aria-label="${name}商品：${escapeHTML(item.name)}">${window.cargoCut(item.hs,direction)}<span>${escapeHTML(item.name)}</span></button>`
  ).join('');
  return `<section class="flow ${direction}" aria-label="${name}"><header><strong>${name}</strong><span>${amt(amount)} <small>亿美元</small></span></header>${entries}</section>`;
}
function seatFinancialPlate(){
  DiplomaticHardware.joinClearingBed(current,$('#register-support'),$('#case-engraving svg'),$('#clearing-die svg'));
}
function renderRegion(id,{orient=true}={}){
  const t=trade[id],a=affairs[id],region=regionMap[id];
  if(!t||!a||!region)return;
  current=id;const scene=$('#scene');scene.dataset.region=id;scene.dataset.currents=a.currents.length;scene.style.setProperty('--region',AtlasArt.accents[id]);document.title=region.name+' · 环球同此凉热';
  $('#region-title').textContent=region.name;
  $('.region-imprint').style.setProperty('--letters', [...region.name].length);
  $('#region-ground').innerHTML=window.regionalSeal(id);
  $('#region-geography').innerHTML=window.regionalGeography(id);
  $('#region-geography svg').setAttribute('preserveAspectRatio','xMinYMid meet');
  const net=t.exports-t.imports;
  $('#trade-balance').innerHTML=`<div class="balance-head"><b>${net<0?'贸易逆差':net>0?'贸易顺差':'贸易平衡'}</b></div><div class="balance-number">${amt(Math.abs(net),2)}<small>亿美元</small></div><time>2025</time>`;
  $('#trade-docks').innerHTML=tradeDock('in',t.imports,t.inGoods)+tradeDock('out',t.exports,t.outGoods);
  $('#case-engraving').setAttribute('aria-label', '查看' + region.name + '金融案例');
  $('#case-engraving').innerHTML=window.financePlate(id);
  $('#case-fittings').innerHTML=DiplomaticHardware.institution(id, a.currents.length);
  $('#clearing-die').innerHTML=window.drawClearingDie(a.usdGrade, a.bricsGrade);
  $('[data-side="usd"] output').textContent=grades[a.usdGrade];
  $('[data-side="brics"] output').textContent=grades[a.bricsGrade];
  $('#government').textContent=a.government;$('#society').textContent=a.society;
  $('#currents').innerHTML=a.currents.map((c,i)=>`<button data-current="${i}">${escapeHTML(c.name)}<small>${escapeHTML(c.actor)}</small></button>`).join('');
  seatFinancialPlate();
  if(location.hash.slice(1)!==id)history.replaceState(null,'','#'+id);
  globe?.selectRegion(id,{orient});
}
function items(type){
  if(type==='countries')return Object.entries(archives.countries).map(([id,c])=>[id,c.name]);
  if(type==='places')return archives.places.map(p=>[p.id,p.caption]);
  if(type==='finance')return [['reserve','储备货币'],...Object.entries(archives.finance).map(([id,m])=>[id,m.name])];
  if(type==='currents')return affairs[current].currents.map((c,i)=>[String(i),c.name]);
  if(type==='trade')return ['in','out'].flatMap(d=>(d==='in'?trade[current].inGoods:trade[current].outGoods).map((g,i)=>[d+'-'+i,(d==='in'?'进口':'出口')+' '+g.name]));
  return [[current,regionMap[current].name]];
}
function archivePage(type,requested){
  archiveType=type;const list=items(type);
  activeItem=list.some(([key])=>key===requested)?requested:list[0][0];
  $('#archive-tabs').innerHTML=Object.entries(archiveTabs).map(([key,name])=>`<button data-tab="${key}" aria-pressed="${key===type}">${name}</button>`).join('');
  $('#file-index').innerHTML=list.length>1?list.map(([key,name])=>`<button data-item="${escapeHTML(key)}" aria-pressed="${key===activeItem}">${escapeHTML(name)}</button>`).join(''):'';
  let html='';const e=escapeHTML;
  if(type==='countries'){
    const c=archives.countries[activeItem];
    html=`<img class="photo" src="assets/${e(c.photo)}" alt="${e(c.person)}"><h3><img class="flag" src="assets/flag-${activeItem}.png" alt="">${e(c.name)}</h3><p>${e(c.person)}　${e(c.role)}<br>${e(c.party)}</p><p>${e(c.text)}</p><button data-locate-country="${activeItem}">地球定位</button>`;
  }else if(type==='places'){
    const p=archives.places.find(p=>p.id===activeItem);
    html=`<img class="photo location" src="assets/${e(p.photo)}" alt="${e(p.caption)}"><h3>${e(p.caption)}</h3><p>${p.goods.map(e).join('　')}</p><p>${e(p.text)}</p><button data-locate-place="${e(p.id)}">地球定位</button>`;
  }else if(type==='finance'){
    if(activeItem==='reserve'){
      const {period,currencies}=archives.reserve;
      html='<h3>全球官方外汇储备</h3><div class="file-reading">'+currencies.map(c=>'<b>'+e(c.name)+'　'+e(c.share)+'</b>').join('')+'</div><p>'+e(period)+'</p>'+currencies.map(c=>'<p>'+e(c.overview)+'</p>').join('');
    }
    else{const f=archives.finance[activeItem];html='<h3>'+e(f.title)+'</h3>'+f.paragraphs.map(p=>'<p>'+e(p)+'</p>').join('')}
  }else if(type==='case'){
    const a=affairs[current];html=`<h3>${e(a.caseTitle)}</h3><p>${e(a.caseKind)}</p><div class="case-detail-art">${window.financePlate(current)}</div><p>${e(a.caseText)}</p><div class="file-reading"><b>美元体系　${grades[a.usdGrade]}</b><b>金砖体系　${grades[a.bricsGrade]}</b></div><p>${e(a.usdRole)}　／　${e(a.bricsRole)}</p>`;
  }else if(type==='currents'){
    const a=affairs[current],c=a.currents[Number(activeItem)];html=`<h3>${e(c.name)}</h3><p>${e(c.actor)}　${e(c.status)}</p><h4>政府取向</h4><p>${e(a.government)}</p><h4>社会态度</h4><p>${e(a.society)}</p>`;
  }else{
    const [dir,index]=activeItem.split('-'),out=dir==='out',g=(out?trade[current].outGoods:trade[current].inGoods)[Number(index)];
    html=`<h3>${e(g.name)}</h3>${window.cargoCut(g.hs,dir)}<p>2025 年中国${out?'向':'自'}${regionMap[current].name}${out?'出口':'进口'}</p><div class="file-reading">${amt(g.value,2)} 亿美元</div>`;
  }
  $('#file-title').textContent=type==='trade'?'贸易货单':'外交档案';$('#file-detail').innerHTML=html;
}
function openArchive(type, item, button){
  opener=button;archivePage(type,item);if(!$('#archive').open)$('#archive').showModal();
}
function fit(){
  const compact=matchMedia('(max-width:700px) and (orientation:portrait)').matches;
  const scale=Math.min(innerWidth/1600,innerHeight/920);
  if(compact){document.body.style.removeProperty('grid-template-columns');document.body.style.removeProperty('grid-template-rows');$('#scene').style.transform='none';}
  else{document.body.style.gridTemplateColumns='minmax(0,1fr)';document.body.style.gridTemplateRows='minmax(0,1fr)';$('#scene').style.transform='scale('+scale+')';}
}
async function start(){
  fit();
  [trade,affairs,archives]=window.DIPLOMACY_BOOTSTRAP || await Promise.all(['trade','affairs','archive'].map(async name=>{const response=await fetch('data/'+name+'.json');if(!response.ok)throw Error(name);return response.json()}));
  regionMap = Object.fromEntries(Object.entries(trade).map(([id, record]) => {
    const {name, lon, lat, partners, mapOnly, islets} = record;
    for (const iso of [...partners, ...mapOnly]) countryRegions.set(iso, id);
    return [id, {name, lon, lat, partners, mapOnly, islets}];
  }));
  $('.chassis').innerHTML=chassis()+'<g id="case-fittings"></g>';
  globe=window.createDiplomaticGlobe($('#globe'),{regions:regionMap,onRegion:id=>renderRegion(id,{orient:false})});
  renderRegion(regionMap[location.hash.slice(1)]?location.hash.slice(1):'ea');
  document.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b)return;
    if(b.dataset.layer){const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on));globe.setLayer(b.dataset.layer,on);}
    else if(b.dataset.archive)openArchive(b.dataset.archive,undefined,b);
    else if(b.dataset.good)openArchive('trade',b.dataset.good,b);
    else if('current' in b.dataset)openArchive('currents',b.dataset.current,b);
    else if(b.dataset.tab)archivePage(b.dataset.tab);
    else if(b.dataset.item)archivePage(archiveType,b.dataset.item);
    else if(b.dataset.locateCountry){const iso=b.dataset.locateCountry;$('#archive').close();const region=countryRegions.get(iso);if(region)renderRegion(region,{orient:false});globe.focusLocation(...countryCoords[iso]);}
    else if(b.dataset.locatePlace){
      const p=archives.places.find(p=>p.id===b.dataset.locatePlace);
      $('#archive').close();
      if(p.region)renderRegion(p.region,{orient:false});
      globe.focusLocation(p.lon,p.lat);
    }
  });
  $('#archive').addEventListener('close',()=>opener?.isConnected&&opener.focus({preventScroll:true}));
  addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(regionMap[id])renderRegion(id)});
  addEventListener('resize',fit);
  new ResizeObserver(seatFinancialPlate).observe($('.finance'));
  $('#boot-status').textContent='';
}
start().catch(error=>{console.error(error);$('#boot-status').textContent='外交档案加载失败，请刷新';});

