'use strict';
const db=window.GEO_DB, profiles=window.TNO_PROFILES, $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const trends={up2:'▲▲',up:'▲',flat:'●',down:'▼',down2:'▼▼'};
const assetRoot=new URL('assets/',document.currentScript.src).href;
const portraitRoot=new URL('assets/leaders/',document.querySelector('script[src$="data.js"]').src).href;
let iso='USA',country,profile,current='senate',selected=0,view='congress';
const totalOf=g=>g.reduce((s,x)=>s+x[1],0);
function chamber(){return country.parl?.type==='us'?country.parl[current]:country.parl;}
function partyColor(g,i){if(iso==='USA')return ['#e08282','#5577c6','#dcda50'][i];const c=g[2]||'#a4b5a9';if(/^#[0-9a-f]{6}$/i.test(c)){const n=parseInt(c.slice(1),16);if(((n>>16)*.2126+((n>>8)&255)*.7152+(n&255)*.0722)<70)return '#929eaf';}return c;}
function setParty(index){
 const c=chamber(); if(!c?.groups?.[index])return;
 selected=index;const g=c.groups[index],total=totalOf(c.groups),color=partyColor(g,index);
 $('party-name').textContent=g[0];$('party-seats').textContent=`${g[1]} / ${total}`;
 document.querySelector('.detail-top').style.color=color;
 $('party-description').textContent=`占本机构 ${+(g[1]/total*100).toFixed(1)}% 席位${iso==='SAU'?'，成员由国王任命。':g[1]>total/2?'，超过半数。':'。'}`;
 $('mandate-track').replaceChildren();for(let i=0;i<40;i++){const s=document.createElement('span');if(i<Math.round(g[1]/total*40))s.style.background=color;$('mandate-track').append(s)}
 document.querySelectorAll('.party-button').forEach((b,i)=>{b.classList.toggle('selected',i===index);b.setAttribute('aria-pressed',String(i===index))});
 $('status').textContent=`${country.n} · ${g[0]} ${g[1]} 席`;
}
function seatPositions(total){
 const result=[];
 if(iso!=='USA'){
  const benches=['GBR','CAN','AUS','PAK','SGP'].includes(iso);
  const assembly=['CHN','PRK','CUB'].includes(iso);
  const council=['SAU','IRN'].includes(iso);
  if(benches){
   const half=Math.ceil(total/2),cols=Math.ceil(Math.sqrt(half*2)),rows=Math.ceil(half/cols);
   for(let i=0;i<total;i++){let side=i<half?0:1,j=side?i-half:i;result.push({x:125+(j%cols)*550/cols,y:side?192+Math.floor(j/cols)*92/rows:154-Math.floor(j/cols)*92/rows})}
  }else if(assembly||council){
   const cols=Math.ceil(Math.sqrt(total*2.9)),rows=Math.ceil(total/cols);
   for(let i=0;i<total;i++)result.push({x:125+(i%cols)*550/cols,y:82+Math.floor(i/cols)*205/rows});
  }else{
   const rows=Math.max(4,Math.ceil(Math.sqrt(total)/2.2));let counts=Array.from({length:rows},(_,r)=>Math.floor(total*(r+rows)/(rows*rows+(rows-1)*rows/2)));
   for(let i=0,left=total-counts.reduce((a,b)=>a+b,0);i<left;i++)counts[rows-1-i%rows]++;
   counts.forEach((n,r)=>{const rad=65+r*215/Math.max(1,rows-1);for(let i=0;i<n;i++){const angle=Math.PI+i/Math.max(1,n-1)*Math.PI;result.push({x:400+rad*Math.cos(angle),y:290+rad*.78*Math.sin(angle),angle,r})}});result.sort((a,b)=>a.angle-b.angle||a.r-b.r);
  }
  return result;
 }
 if(profile[0]==='arc'){
  let counts;
  if(iso==='USA')counts=current==='senate'?[16,18,20,22,24]:[30,33,36,39,42,45,48,51,54,57];
  else {const rows=Math.max(4,Math.min(12,Math.ceil(Math.sqrt(total)/2.5))),weights=Array.from({length:rows},(_,r)=>148+r*130/(rows-1)),sum=weights.reduce((a,b)=>a+b,0);counts=weights.map(w=>Math.floor(w/sum*total));for(let i=0,rest=total-totalOf(counts.map(n=>['',n]));i<rest;i++)counts[counts.length-1-i%counts.length]++;}
  counts.forEach((n,r)=>{const radius=iso==='USA'?(current==='senate'?154+r*25:148+r*13.2):148+r*130/(counts.length-1);for(let i=0;i<n;i++){const angle=Math.PI+i/Math.max(1,n-1)*Math.PI;result.push({x:400+radius*Math.cos(angle),y:291+radius*.78*Math.sin(angle),angle,r})}});
  result.sort((a,b)=>a.angle-b.angle||a.r-b.r);
 }else{
  const half=Math.ceil(total/2),cols=Math.max(8,Math.ceil(Math.sqrt(half*1.35))),rows=Math.ceil(half/cols),dx=Math.min(19,198/cols),dy=Math.min(22,185/rows);
  for(let i=0;i<total;i++){const side=i<half?0:1,j=side?i-half:i;result.push({x:side?505+(j%cols)*dx:295-(j%cols)*dx,y:104+Math.floor(j/cols)*dy})}
 }
 return result;
}
function renderChamber(key){
 current=key;const c=chamber(),svg=$('seats');svg.replaceChildren();$('parties').replaceChildren();
 if(!c?.groups?.length){document.querySelector('.majority>span').textContent='席位资料';$('threshold').textContent='—';$('chamber-en').textContent='INSTITUTIONAL ARCHIVE';$('control').textContent='未收录席位数据';$('seat-explainer').textContent='';$('party-name').textContent=country.party||'未收录';$('party-seats').textContent='—';$('party-description').textContent='';$('mandate-track').replaceChildren();$('status').textContent=country.n+' · 制度档案';return;}
 const total=totalOf(c.groups),ns='http://www.w3.org/2000/svg';
 document.querySelectorAll('[data-chamber]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.chamber===key)));
 $('threshold').textContent=iso==='SAU'?total:Math.floor(total/2)+1;
 document.querySelector('.majority>span').textContent=iso==='SAU'?'任命成员':'过半席位';
 $('chamber-en').textContent=iso==='USA'?(key==='senate'?'THE SENATE':'HOUSE OF REPRESENTATIVES'):profile[3];
 const largest=c.groups.reduce((a,b)=>a[1]>b[1]?a:b);
 $('control').textContent=iso==='SAU'?'任命制协商机构':`${largest[0]} ${largest[1]} 席`;
 $('seat-explainer').textContent='';
 svg.setAttribute('aria-label',`${c.name}：`+c.groups.map(g=>`${g[0]} ${g[1]} 席`).join('，'));
 const positions=seatPositions(total),size=iso==='USA'?(key==='senate'?12:6.4):Math.min(9,150/Math.sqrt(total));
 const paths=c.groups.map(()=>[]);let group=0,remaining=c.groups[0][1];
 positions.forEach(pos=>{while(remaining===0&&group<c.groups.length-1){group++;remaining=c.groups[group][1]}remaining--;paths[group].push(`M${(pos.x-size/2).toFixed(2)},${(pos.y-size/2).toFixed(2)}h${size}v${size}h-${size}z`)});
 paths.forEach((parts,i)=>{const path=document.createElementNS(ns,'path');path.setAttribute('d',parts.join(''));path.setAttribute('fill',partyColor(c.groups[i],i));path.setAttribute('fill-opacity','.84');const title=document.createElementNS(ns,'title');title.textContent=c.groups[i][0]+' · '+c.groups[i][1]+' 席';path.append(title);svg.append(path)});
 c.groups.forEach((g,i)=>{const b=document.createElement('button');b.className='party-button';b.style.setProperty('--party',partyColor(g,i));b.innerHTML=`<span class="party-n">${esc(g[0].replace('(亲民主党)',''))}</span><small>${(g[1]/total*100).toFixed(1)}% OF ${total}</small><strong>${g[1]}</strong>`;b.setAttribute('aria-label',`${g[0]}，${g[1]} 席`);b.addEventListener('click',()=>setParty(i));$('parties').append(b)});
 setParty(0);
}
function renderIdeology(){
 const pie=country.pie||[],total=pie.reduce((s,p)=>s+p[1],0);if(!total){$('ideology-panel').innerHTML='';return;}
 const fills=window.NexusIdeologyPalette.chartColors(pie,iso);
 let angle=-Math.PI/2;const paths=pie.map(p=>{const next=angle+p[1]/total*Math.PI*2,r=64,c=80,xy=a=>`${c+r*Math.cos(a)},${c+r*Math.sin(a)}`;let path;if(p[1]===total)path=`<circle cx="80" cy="80" r="64" fill="${fills.get(p[0])}"/>`;else path=`<path d="M80,80 L${xy(angle)} A64,64 0 ${p[1]/total>.5?1:0},1 ${xy(next)} Z" fill="${fills.get(p[0])}" stroke="#090d0c" stroke-width="1.3"><title>${esc(p[0])} ${p[1]}%</title></path>`;angle=next;return path}).join('');
 $('ideology-panel').innerHTML=`<div class="section-title">意识形态构成 <small>IDEOLOGICAL COMPOSITION</small></div><div class="ideology-content"><div class="ideology-chart"><svg viewBox="0 0 160 160" role="img" aria-label="${esc(country.n)}意识形态构成">${paths}<circle cx="80" cy="80" r="37" fill="#0b100e" stroke="#657b6c" stroke-width="1"/><text x="80" y="78" text-anchor="middle">${esc(iso)}</text><text x="80" y="93" text-anchor="middle" class="pie-caption">思想构成</text></svg></div><div class="ideology-legend">${pie.map(p=>`<div class="ideology-item"><i style="background:${fills.get(p[0])}"></i><span>${esc(p[0])}</span><em class="trend-${p[2]}">${trends[p[2]]||'●'}</em><b>${p[1]}%</b></div>`).join('')}</div></div>`;
}
function setView(v){
 view=v;document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===v));$('congress-view').hidden=v!=='congress';$('relations-view').hidden=v!=='relations';document.querySelector('.window-title>span').textContent=v==='congress'?(window.TNO_DOSSIERS?.[iso]?.title||profile[4]):`${country.n} · 对外关系`;
}
function selectCountry(code){
 if(!db[code]||db[code].news_only)return;iso=code;country={...db[iso],n:db[iso].n||(window.GEO_CN||{})[iso]||iso};current='senate';
 profile=profiles[iso]||['arc','civic','#a8c1b0','NATIONAL INSTITUTIONS',`${country.n} · 政治档案`,country.gov,'',['政治体制',country.gov],['执政组织',country.party],['选举制度',country.elec]];
 document.body.dataset.hasSeats=String(!!country.parl);document.body.dataset.culture=profile[1];document.body.dataset.layout=profile[0];document.body.dataset.iso=iso;document.body.style.setProperty('--national-accent',profile[2]);
 $('country-select').value=iso;
 document.querySelector('.detail-note').textContent='';
 document.querySelector('.detail-top').style.color='var(--national-accent)';
 for(const [id,value] of Object.entries({leader:country.leader?.n||'未收录',since:`${country.leader?.t||''} · ${country.leader?.since||'—'} 就任`,'ruling-party':country.party,gov:country.gov,government:country.gov,cycle:country.elec,economy:country.econ,capital:country.cap?.n,election:country.parl?.year||''}))$(id).textContent=value||'—';
 document.querySelector('.country-heading>div').textContent=country.en||iso;document.querySelector('.country-heading h1').textContent=iso==='USA'?'美利坚合众国':country.n;
 document.querySelector('.window-title small').textContent=profile[3];document.querySelector('.small-title small').textContent=iso;
 $('nation-mark').innerHTML=`<img src="${assetRoot}congress.png" alt="">${esc(country.n)} · ${esc(profile[5])}`;
 const portrait=document.querySelector('.portrait img');portrait.hidden=!country.leader?.photo;portrait.src=portraitRoot+iso+'.jpg';portrait.alt=country.leader?.n||'';portrait.onerror=()=>{portrait.hidden=true;};
 const emblem=document.querySelector('.seal-center img');emblem.src=assetRoot+(iso==='USA'?'seal.png':profiles[iso]?`emblems/${iso}.svg`:'emblems/generic.svg');emblem.alt=iso==='USA'?'美国国玺，来自 TNO 原模组':`${country.n}机构主题纹样（绘制）`;
 document.querySelector('.window-title>img').src=assetRoot+(iso==='USA'?'capitol.png':profiles[iso]?`emblems/${iso}.svg`:'emblems/generic.svg');
 document.querySelector('.president-info>span').textContent=country.leader?.t||'档案领导人';
 document.querySelector('.dossier .section-title').innerHTML='国家机构关系 <small>INSTITUTIONAL RECORD</small>';
 document.querySelector('.stage-label small').textContent='';
 document.querySelector('.seal-center span').textContent=iso==='USA'?'E PLURIBUS UNUM':iso;
 document.querySelector('.state-map').style.backgroundImage=`url("${assetRoot}${iso==='USA'?'states.png':`maps/${iso}.svg`}")`;
 document.querySelector('.state-map').hidden=!profiles[iso];
 document.querySelector('.chamber-tabs').innerHTML=iso==='USA'?'<button id="senate-tab" role="tab" aria-selected="true" data-chamber="senate">参议院 <b>100</b></button><button id="house-tab" role="tab" aria-selected="false" data-chamber="house">众议院 <b>435</b></button>':`<div class="chamber-name">${esc(country.parl?.name||'国家机构')} <b>${country.parl?totalOf(country.parl.groups||[]):''}</b></div>`;
 const year=document.createElement('span');year.id='election';year.textContent=country.parl?.year||'制度档案';document.querySelector('.chamber-tabs').append(year);
 document.querySelectorAll('[data-chamber]').forEach(b=>{b.onclick=()=>renderChamber(b.dataset.chamber);b.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();renderChamber(current==='senate'?'house':'senate');$(current+'-tab').focus()}}});
 document.querySelector('.institution-footer').innerHTML=`<div><span>制度结构</span><strong>${esc(profile[5])}</strong></div><div class="connection">${esc(profile[6])}</div>`;
 document.querySelector('.power-grid').innerHTML=profile.slice(7,10).map((p,i)=>`<div><span class="number">${['I','II','III'][i]}</span><b>${esc(p[0])}</b><p>${esc(p[1])}</p></div>`).join('');
 document.querySelector('.archive-note p').textContent='';
 $('memberships').replaceChildren();(country.al||[]).forEach(x=>{const s=document.createElement('span');s.textContent=x;$('memberships').append(s)});
 $('relation-list').replaceChildren();for(const [k,label] of Object.entries({ally:'盟友',good:'友好',tense:'紧张',war:'冲突'})){const el=document.createElement('section');el.className='relation-group';el.dataset.relation=k;el.innerHTML=`<h3>${label}</h3><div>${(country.rel?.[k]||[]).map(code=>`<button data-country="${esc(code)}">${esc(db[code]?.n||code)}</button>`).join('')||'<span class="empty-relation">档案未列出</span>'}</div>`;el.querySelectorAll('[data-country]').forEach(b=>b.onclick=()=>selectCountry(b.dataset.country));$('relation-list').append(el)}
 renderChamber('senate');renderIdeology();setView(view);renderNationalStructure();window.renderCountryDossier?.(iso,country,assetRoot);
 const url=new URL(location.href);url.searchParams.set('country',iso);history.replaceState(null,'',url);
}
function majorityDial(total){
 let ticks='';for(let i=0;i<=30;i++){const a=Math.PI+i/30*Math.PI,r=i%5?115:109;const x=Math.cos(a),y=Math.sin(a);ticks+=`<line x1="${150+x*r}" y1="${150+y*r}" x2="${150+x*122}" y2="${150+y*122}" class="${i===15?'majority-tick':''}"/>`}
 return `<svg viewBox="0 0 300 198" role="img" aria-label="所选党派议会席位仪表"><path class="dial-arc" d="M20 150 A130 130 0 0 1 280 150"/><path class="dial-inner" d="M48 150 A102 102 0 0 1 252 150"/><g class="dial-ticks">${ticks}</g><text x="150" y="15" text-anchor="middle" class="dial-threshold">${Math.floor(total/2)+1} · 过半</text><text x="18" y="170">0</text><text x="282" y="170" text-anchor="end">${total}</text><text x="150" y="88" text-anchor="middle" class="dial-value">0</text><text x="150" y="108" text-anchor="middle" class="dial-unit">SEATS / 席</text><g class="dial-needle"><path d="M29 150 L159 147 L159 153 Z"/></g><circle cx="150" cy="150" r="8" class="dial-hub"/><text x="150" y="192" text-anchor="middle" class="dial-unit">PARLAMENTARISCHE MEHRHEIT</text></svg>`;
}
function renderNationalStructure(){
 let el=document.getElementById('national-structure');if(!el){el=document.createElement('section');el.id='national-structure';document.getElementById('congress-view').prepend(el)}
 const configs={
 ITA:['dual','PARLAMENTO ITALIANO','共和国总统','部长会议','众议院 ⇄ 参议院','内阁须获得两院信任'],
 ESP:['federal','CORTES GENERALES','众议院','政府主席','参议院 · 国王','众议院授予政府信任 · 君主为国家元首'],
 POL:['dual','RZECZPOSPOLITA POLSKA','共和国总统','总理与部长会议','众议院 · 参议院','议会信任与总统否决'],
 UKR:['vertical','ВЕРХОВНА РАДА','最高拉达','总统与部长会议','宪法法院',''],
 KOR:['supervision','대한민국','总统','国会','宪法法院','行政、立法与宪法审判'],
 PAK:['benches','MAJLIS-E-SHOORA','总统','国民议会','总理与内阁 · 参议院','议会责任政府与联邦单位代表'],
 MEX:['dual','ESTADOS UNIDOS MEXICANOS','联邦总统','联邦议会','众议院 / 参议院','总统制与联邦两院'],
 ARG:['federal','REPÚBLICA ARGENTINA','总统','众议院','参议院 · 各省与首都','总统行政与联邦代表'],
 TUR:['vertical','TÜRKİYE BÜYÜK MİLLET MECLİSİ','总统','大国民议会','宪法法院','总统行政 · 一院制立法'],
 EGY:['vertical','ARAB REPUBLIC OF EGYPT','总统与政府','众议院','参议院','立法监督与咨询审议'],
 NGA:['federal','FEDERAL REPUBLIC OF NIGERIA','总统','众议院','参议院 · 各州代表','人口代表与联邦单位代表'],
 VEN:['vertical','REPÚBLICA BOLIVARIANA','总统与政府','全国代表大会','最高法院',''],
 SGP:['benches','PARLIAMENT OF SINGAPORE','总统','国会','总理与内阁','议会信任与责任政府'],
 TWN:['dual','地区机构','立法院','行政院','司法院','立法、行政与司法机构资料'],
 CHN:['assembly','人民代表大会制度','中国共产党领导','全国人民代表大会','国务院 · 国家监察委员会 · 最高人民法院 · 最高人民检察院','国家权力机关与行政、监察、司法机关'],
 GBR:['benches','WESTMINSTER','君主 · 国家元首','下议院的信任','首相与内阁 ⇄ 反对党及其他议员','责任内阁 · 对席辩论'],
 FRA:['dual','LA CINQUIÈME RÉPUBLIQUE','共和国总统','总理与政府','国民议会 · 参议院','总统任命总理 · 政府向议会负责'],
 DEU:['federal','BUND / LÄNDER','联邦议院','联邦总理与内阁','联邦参议院 · 各州政府','议会多数形成政府 · 各州参与联邦立法'],
 RUS:['vertical','РОССИЙСКАЯ ФЕДЕРАЦИЯ','联邦总统','联邦政府','国家杜马 / 联邦委员会','总统制衡与联邦两院'],
 JPN:['cabinet','国会と内閣','天皇 · 国家象征','国会指名首相','内阁对国会负责','众议院 · 参议院'],
 IND:['federal','UNION OF INDIA','人民院','总理与部长会议','联邦院 · 各邦代表','议会信任与联邦结构'],
 SAU:['appointment','مجلس الشورى','国王','部长会议','协商会议 · 任命成员','咨询与审议 · 不构成竞争性组阁多数'],
 IRN:['supervision','ISLAMIC REPUBLIC','最高领袖','总统与内阁','伊斯兰议会 ⇄ 宪法监护委员会','民选机构与宗教法律监督'],
 BRA:['dual','REPÚBLICA FEDERATIVA','总统','国民议会','众议院 / 联邦参议院','总统行政与两院立法'],
 CAN:['benches','PARLEMENT / PARLIAMENT','君主与总督','下议院的信任','总理与内阁 · 反对党','联邦责任政府 · 双语议会'],
 AUS:['benches','COMMONWEALTH','君主与总督','众议院','总理与内阁 / 联邦参议院','责任政府与联邦审议'],
 ISR:['coalition','KNESSET','议会各党派','议会信任与组阁','总理与内阁','比例代表制 · 联盟政治'],
 ZAF:['coalition','REPUBLIC OF SOUTH AFRICA','国民议会','议会选举总统','全国省级事务委员会','多党合作与省级代表'],
 IDN:['federal','REPUBLIK INDONESIA','总统','人民代表会议','地方代表理事会','群岛国家 · 全国与地区代表'],
 PRK:['vertical','国家机构','朝鲜劳动党领导','国务委员会','最高人民会议 · 内阁','国家领导与行政机构'],
 CUB:['assembly','PODER POPULAR','全国人民政权代表大会','国务委员会','部长会议','人民政权代表大会制度']
 };
 const fallback={arc:'hemicycle',benches:'benches',assembly:'assembly',council:'appointment'};
 const c=configs[iso]||[fallback[profile[0]],profile[3],profile[7][0],profile[8][0],profile[9][0],profile[6]];
 document.body.dataset.structure=iso==='USA'?'capitol':c[0];
 el.hidden=iso==='USA';el.innerHTML=`${['CHN','GBR'].includes(iso)?'<img class="national-building" src="'+assetRoot+(iso==='CHN'?'tiananmen-daylight-slogans.png':'commons-tno.png')+'" alt="'+(iso==='CHN'?'天安门广场正面日景':'英国下议院')+'建筑插画">':''}<div class="national-caption">${esc(c[1])}</div><div class="institution-route"><div class="route-a">${esc(c[2])}</div><div class="route-b">${esc(c[3])}</div><div class="route-c">${esc(c[4])}</div></div><p>${esc(c[5])}</p>`;
 document.querySelector('.majority').hidden=['SAU','CHN','PRK','CUB','IRN'].includes(iso);
 if(iso==='FRA'){
  el.querySelector('.institution-route').remove();
  const allegory=document.createElement('img');allegory.className='republic-allegory';allegory.src=assetRoot+'marianne-republic.png';allegory.alt='Marianne, allégorie de la République';el.prepend(allegory);
  const poles=document.createElement('div');poles.className='french-poles';
  const figures=window.TNO_FACTION_FIGURES?.FRA||{};
  poles.innerHTML=Object.entries(figures).map(([key,p])=>`<article><img src="${p.leader?portraitRoot+p.leader+'.jpg':assetRoot+'figures/'+p.photo+'.jpg'}" alt="${esc(p.name)}"><div><b>${esc(p.name)}</b><span>${esc(key.split('-').slice(1).join('-'))}</span></div></article>`).join('');
  el.append(poles);const note=document.createElement('p');note.textContent='总统行政 · 议会竞争 · 社会动员';el.append(note);
 }
 if(iso==='DEU'){
  const c=chamber(),calc=document.createElement('section');calc.className='coalition-lab';
  calc.innerHTML='<div class="instrument-name">BUNDESTAG <span>议会多数试算</span></div><div class="majority-dial">'+majorityDial(totalOf(c.groups))+'</div><div class="coalition-controls"><div class="coalition-options"></div><p class="coalition-result" aria-live="polite"></p></div>';
  const chosen=new Set(),total=totalOf(c.groups),threshold=Math.floor(total/2)+1;
  const update=()=>{const n=[...chosen].reduce((a,i)=>a+c.groups[i][1],0);calc.querySelector('.dial-needle').setAttribute('transform','rotate('+(n/total*180)+' 150 150)');calc.querySelector('.dial-value').textContent=n;calc.dataset.majority=String(n>=threshold);calc.querySelector('.coalition-result').textContent=n+' / '+total+' 席 · '+(n>=threshold?'达到过半席位':'距过半还差 '+(threshold-n)+' 席')};
  c.groups.forEach((g,i)=>{const b=document.createElement('button');b.textContent=g[0];b.setAttribute('aria-pressed','false');b.style.setProperty('--party-color',g[2]);b.onclick=()=>{chosen.has(i)?chosen.delete(i):chosen.add(i);b.setAttribute('aria-pressed',String(chosen.has(i)));update()};calc.querySelector('.coalition-options').append(b)});update();
  const prior=document.querySelector('.coalition-lab');if(prior)prior.remove();document.querySelector('.chamber-tabs').after(calc);
 }else document.querySelector('.coalition-lab')?.remove();

}
const major=document.createElement('optgroup');major.label='主要国家与地区';const other=document.createElement('optgroup');other.label='其他档案';
for(const [code,c] of Object.entries(db)){if(c.news_only)continue;const o=document.createElement('option');o.value=code;o.textContent=`${c.n||code} · ${code}`;(profiles[code]?major:other).append(o)}$('country-select').append(major,other);$('country-select').onchange=e=>selectCountry(e.target.value);
for(const b of document.querySelectorAll('[data-view]'))b.onclick=()=>setView(b.dataset.view);
const requested=new URL(location.href).searchParams.get('country');selectCountry(db[requested]?requested:'USA');
$('map-return').onclick=e=>{if(window.parent!==window){e.preventDefault();window.parent.postMessage({type:'tno-close-politics',iso},location.protocol==='file:'?'*':location.origin)}};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&window.parent!==window)window.parent.postMessage({type:'tno-close-politics',iso},location.protocol==='file:'?'*':location.origin)});

// Repaint the current dossier after a data-only synchronization.
window.TNORefreshPolitics=()=>selectCountry(iso);
