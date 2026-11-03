'use strict';
(async()=>{
 const [data,sources,portraits,map,symbolLayouts,tensionData]=await Promise.all(['countries.json','sources.json','portraits.json','map-metadata.json','symbol-layout.json','tension.json'].map(p=>fetch(p+(p==='countries.json'||p==='map-metadata.json'||p==='tension.json'?'?v=tension-20261029-2':'')).then(r=>{if(!r.ok)throw Error(p+': '+r.status);return r.json()})));
 await Promise.all([...data.east.map(id=>'assets/flags-cloth/'+id+'.svg?v=allies-2'),...Object.values(portraits)].map(src=>{const img=new Image();img.src=src;return img.decode().catch(()=>{});}));
 const bilateralIds=new Set(['RUS','PRK','PAK']);
 const ids=[...data.east,'CHN'],dossier=document.querySelector('#dossier'),dialog=document.querySelector('#sources');let selected='';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const txt=(x,y,t,cls,extra='')=>`<text x="${x}" y="${y}" class="${cls}" ${extra}>${esc(t)}</text>`;
 const palettes=map.palette;
 const influenceNote=document.querySelector('#ratings-note').textContent;
 const tensionLabels=['经济封锁','军事冲突','政治谴责','中国备战度'];
 const setVisible=(el,on)=>{el.style.display=on?'':'none';el.setAttribute('aria-hidden',String(!on))};
 function chooseHome(updateHash){
  selected='CHN';const contest=document.querySelector('#shared-contest');
  contest.replaceChildren();delete contest.dataset.cn;delete contest.dataset.us;
  setVisible(document.querySelector('#contests'),false);
  const alliance=document.querySelector('#bilateral-display');alliance.replaceChildren();alliance.removeAttribute('aria-label');setVisible(alliance,false);
  const tension=document.querySelector('#tension-display');tension.replaceChildren();delete tension.dataset.country;delete tension.dataset.values;setVisible(tension,false);
  const home=document.querySelector('#china-home-display');
  home.innerHTML='<image href="assets/china-home.svg?v=ceremonial-20261030-2" x="890" y="95" width="680" height="930"/><image class="china-home-poem" href="assets/china-home-poem.svg?v=20261029-1" x="890" y="334" width="680" height="580"/>';
  home.setAttribute('aria-label','完整中国国徽居中的竖直长剑，麦穗、徽饰与绶带包覆剑身，竖排安得倚天抽宝剑诗句');setVisible(home,true);
  setVisible(document.querySelector('#us-background-emblem'),false);
  document.querySelector('#screen').dataset.mode='home';
  document.querySelector('#country-ground').replaceChildren();document.querySelector('#map-selection').replaceChildren();
  dossier.innerHTML='<g id="home-identity"><path d="M48 837h525M48 842h245" stroke="#895960" stroke-width="1"/><image href="flag-cn.svg" x="52" y="867" width="138" height="92"/><text x="212" y="906" class="country-name" style="font-size:32px;letter-spacing:2px">中华人民共和国</text><path d="M213 922h336M52 984h537" stroke="#486a62" stroke-width=".8"/></g>';
  dossier.dataset.country='CHN';dossier.setAttribute('aria-label','中华人民共和国，国徽、麦穗与徽饰环绕的竖直长剑及昆仑诗句');
  document.querySelectorAll('.territory.selectable').forEach(el=>{el.style.fill=el.dataset.id==='CHN'?'url(#selected-home)':''});
  document.querySelectorAll('.territory.selectable,.geographic-label,.point-callout').forEach(el=>{const on=el.dataset.id==='CHN';el.classList.toggle('selected',on);el.setAttribute('aria-pressed',String(on))});
  document.querySelector('#screen > svg').setAttribute('aria-label','东亚地图与国徽居中的竖直长剑图样');
  document.querySelector('#ratings-note').hidden=true;dialog.querySelector('h1').textContent='资料来源';
  document.querySelector('#selected-summary').textContent=dossier.getAttribute('aria-label');if(updateHash)history.replaceState(null,'','#CHN');
 }
 function choose(id,updateHash=true){
  if(!ids.includes(id))return;if(id==='CHN'){chooseHome(updateHash);return;}selected=id;const c=data.countries[id],pal=palettes[c.attitude],bilateral=bilateralIds.has(id),tensionValues=tensionData.countries[id],isTension=!!tensionValues;
  setVisible(document.querySelector('#us-background-emblem'),true);const home=document.querySelector('#china-home-display');home.replaceChildren();setVisible(home,false);document.querySelector('#screen').dataset.mode=bilateral?'allied':isTension?'tension':'ordinary';
  const bannerColors={JPN:'#b4a42d',IND:'#d19453',RUS:'#7392af',SGP:'#c9787e',KOR:'#c8d1c6',PRK:'#bb626b',TWN:'#385e94',VNM:'#b7666d',LAO:'#859977',KHM:'#b19565',THA:'#b7b5a0',MMR:'#b89c56',MYS:'#bd8783',IDN:'#bd8275',PHL:'#aa9570',AUS:'#6d9a9d',NZL:'#9caeaa',BRN:'#c7b253',TLS:'#b77665',NPL:'#b7667f',BTN:'#bd8951',BGD:'#7aab94',PAK:'#819e80',KAZ:'#70a9af',MNG:'#9caab4'};const banner=bannerColors[id],symbol=symbolLayouts[id],front=symbol.front,ground=symbol.ground;
  const tint='#'+[6,21,28].map((base,i)=>Math.round(base*.78+parseInt(banner.slice(1+i*2,3+i*2),16)*.22).toString(16).padStart(2,'0')).join('');
  document.querySelector('#country-ground').innerHTML=`<defs><filter id="selected-ground-ink" color-interpolation-filters="sRGB"><feFlood flood-color="${tint}"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs><image data-country="${id}" href="assets/symbols/${id}.svg?v=allies-20261016-1" x="${ground.x}" y="${ground.y}" width="${ground.w}" height="${ground.h}" transform="rotate(${ground.angle} ${ground.cx} ${ground.cy})" filter="url(#selected-ground-ink)"/>`;
  const has=!!portraits[id],rank=['敌对','不友善','中立','良好','盟友'].indexOf(c.attitude);
  const wrap=(str,n)=>{const lines=Array.from({length:Math.ceil(str.length/n)},(_,i)=>str.slice(i*n,(i+1)*n));if(lines.length>1&&lines[lines.length-1].length<=2)lines[lines.length-2]+=lines.pop();return lines};
  const sep=Math.max(c.leader.n.lastIndexOf('·',10),c.leader.n.lastIndexOf(' ',10)); const leaderLines=c.leader.n.length>10&&sep>=5?[c.leader.n.slice(0,sep),c.leader.n.slice(sep+1)]:wrap(c.leader.n,10);
  dossier.innerHTML=`<g id="region-identity">
  <path d="M42 672H245V900L139 949 42 905Z" fill="${banner}" stroke="#c1b474" stroke-width="1.2"/>
  <path d="M49 679H238V894L139 941 49 900Z" fill="none" stroke="#091e23" stroke-width="1.2"/>
  <path d="M49 698h18v-19M220 679v19h18M49 880h18v23" fill="none" stroke="#102328" stroke-width="1.5"/>
  <image class="country-symbol" x="${front.x}" y="${front.y}" width="${front.w}" height="${front.h}" href="assets/symbols/${id}.svg?v=allies-20261016-1" />
  <path d="M70 858h172M70 864h172" stroke="#253732" stroke-width="1.2"/>

  <g class="country-details" transform="translate(22 0)"><path d="M202 741H563l21 21v230H202Z" fill="#07171c"/>
  <path d="M214 749h342l20 18M214 991h341" fill="none" stroke="#34534f" stroke-width=".8"/>
  ${txt(220,781,c.name,'country-name',`style="font-size:${c.name.length>5?34:40}px;letter-spacing:4px"`)}
  <image class="country-flag" x="220" y="797" width="102" height="61" href="assets/flags-cloth/${id}.svg?v=allies-2" preserveAspectRatio="xMinYMid meet"/>
  ${txt(345,812,'对华态度','attitude-caption','style="font-size:17px"')}${txt(345,848,c.attitude,'attitude-value',`style="font-size:26px;fill:${pal.line}"`)}
  <path d="M214 867h341" stroke="#345b55"/>
  ${has?`<image class="portrait" x="213" y="875" width="91" height="112" href="${portraits[id]}" preserveAspectRatio="xMidYMin slice"/>`:''}
  ${leaderLines.map((line,i)=>txt(324,902+i*23,line,'leader-name','style="font-size:20px"')).join('')}
  ${txt(324,905+leaderLines.length*23,c.leader.t,'leader-role','style="font-size:17px"')}
  ${wrap(c.party,13).map((line,i)=>txt(324,928+leaderLines.length*23+i*18,line,'party','style="font-size:16px"')).join('')}
  </g><path d="M58 1007h537" stroke="#345a53" stroke-width=".8"/></g>`;
  dossier.dataset.country=id;
  const identity=`${c.name}，${c.leader.t}${c.leader.n}，${c.party}，对华态度${c.attitude}。`;
  const tensionSummary=isTension?tensionValues.map((v,i)=>(tensionLabels[i]||c.name+'备战度')+'：'+tensionData.levels[v-1]).join('；')+'。五档项目评级。':'';
  dossier.setAttribute('aria-label',identity+(isTension?tensionSummary:bilateral?'中国与'+c.name+'双旗、双方纹章与展开的共同文册，封缄处为握手印记。':`经济：中方${c.cn[0]}，美方${c.us[0]}；军事：中方${c.cn[1]}，美方${c.us[1]}；政治：中方${c.cn[2]}，美方${c.us[2]}。九档项目评级。`));
  const contest=document.querySelector('#shared-contest'),alliance=document.querySelector('#bilateral-display');
  const comparison=document.querySelector('#comparison-crest');comparison.style.display='';comparison.removeAttribute('aria-hidden');
  for(const selector of ['#contests']){const g=document.querySelector(selector);g.style.display=bilateral||isTension?'none':'';g.setAttribute('aria-hidden',String(bilateral||isTension));}
  alliance.style.display=bilateral?'':'none';alliance.setAttribute('aria-hidden',String(!bilateral));
  const tension=document.querySelector('#tension-display');setVisible(tension,isTension);
  if(!isTension){tension.replaceChildren();delete tension.dataset.country;delete tension.dataset.values;}
  document.querySelector('#screen > svg').setAttribute('aria-label',isTension?'东亚地图与中国、'+c.name+'的紧张度':bilateral?'东亚地图与中国、'+c.name+'双旗、共同文册与握手封缄':'东亚地图与中美影响力');
  if(bilateral){
   contest.replaceChildren();delete contest.dataset.cn;delete contest.dataset.us;
   alliance.innerHTML=`<image class="alliance-folio" data-country="${id}" href="assets/alliance/folio-${id}.svg?v=folio-20261029-4" x="892" y="334" width="660" height="590"/>`;
   alliance.setAttribute('aria-label','中国与'+c.name+'双旗、双方纹章与展开的共同文册，封缄处为握手印记');
  }else if(isTension){
   alliance.replaceChildren();alliance.removeAttribute('aria-label');contest.replaceChildren();delete contest.dataset.cn;delete contest.dataset.us;
   tension.innerHTML=TensionArt.scene(tensionValues,c.name,id);tension.dataset.country=id;tension.dataset.values=tensionValues.join(',');tension.setAttribute('aria-label',tensionSummary);
  }else{
   alliance.replaceChildren();alliance.removeAttribute('aria-label');
   contest.innerHTML=ContestArt.assembly2(c.cn,c.us);contest.dataset.cn=c.cn.join(',');contest.dataset.us=c.us.join(',');
  }
  document.querySelector('#ratings-note').hidden=bilateral;document.querySelector('#ratings-note').textContent=isTension?'紧张度按经济封锁、军事冲突、政治谴责、中国备战度及当前地区备战度分别计级。五档为温和、平衡、中等、大幅、严重；本页档位由项目作者指定。':influenceNote;
  dialog.querySelector('h1').textContent=bilateral?'资料来源':'资料与评级';
  const geo=map.countries.find(g=>g.id===id),bounds=geo.bounds,small=['SGP','BRN','BTN','TLS'].includes(id);
  const pad=Math.max(bounds[2]-bounds[0],bounds[3]-bounds[1])*(id==='SGP'?.55:.24);const neighbors={SGP:['MYS','IDN'],BRN:['MYS'],BTN:['CHN','IND'],TLS:['IDN']};const context=(neighbors[id]||[]).map(n=>`<path d="${document.querySelector('.territory[data-id="'+n+'"]').getAttribute('d')}" fill="#112a32" stroke="#47777a" stroke-width=".65" vector-effect="non-scaling-stroke"/>`).join('');let selection='';const shape=document.querySelector('.territory[data-id="'+id+'"]').getAttribute('d');
  if(small){const ax=18+geo.anchor[0]*.99,ay=127+geo.anchor[1]*.99;selection=`<circle cx="${ax}" cy="${ay}" r="2.2" fill="#cfe4d7"/><path d="M${ax-8} ${ay-8}h5m6 0h5v5m0 6v5h-5m-6 0h-5v-5m0-6v-5" fill="none" stroke="#c3d8ca" stroke-width="1.1"/><path d="M${ax+9} ${ay}H673V452H698" stroke="#6a9590" stroke-width=".8" fill="none"/><path d="M700 273h155v174h-155Z" fill="#071921" stroke="#578581" stroke-width="1"/><path d="M706 279h143v138h-143Z" fill="url(#dots)"/><svg x="712" y="285" width="130" height="128" viewBox="${bounds[0]-pad} ${bounds[1]-pad} ${bounds[2]-bounds[0]+pad*2} ${bounds[3]-bounds[1]+pad*2}">${context}<path d="${shape}" fill="#327e7a" stroke="#b5d7cb" stroke-width=".75" vector-effect="non-scaling-stroke"/></svg><text x="777" y="436" text-anchor="middle" font-size="17" fill="#b7d1c5">${esc(c.name)}</text>`;}
  document.querySelector('#map-selection').innerHTML=selection;
  const stateKeys={'敌对':'hostile','不友善':'unfriendly','中立':'neutral','良好':'friendly','盟友':'allied'};
  document.querySelectorAll('.territory.selectable').forEach(el=>{el.style.fill=el.dataset.id===id?'url(#selected-'+stateKeys[c.attitude]+')':''});
  document.querySelectorAll('.territory.selectable,.geographic-label,.point-callout').forEach(el=>{const on=el.dataset.id===id;el.classList.toggle('selected',on);el.setAttribute('aria-pressed',String(on))});
  document.querySelector('#selected-summary').textContent=dossier.getAttribute('aria-label');if(updateHash)history.replaceState(null,'','#'+id);
 }
 const host=document.querySelector('#screen');host.addEventListener('click',e=>{const el=e.target.closest('.geographic-label,.point-callout,.territory.selectable');if(el)choose(el.dataset.id)});
 host.addEventListener('keydown',e=>{const el=e.target.closest('.geographic-label,.point-callout,.territory.selectable');if(!el)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(el.dataset.id)}else if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();const d=['ArrowRight','ArrowDown'].includes(e.key)?1:-1,id=ids[(ids.indexOf(el.dataset.id)+d+ids.length)%ids.length];choose(id);document.querySelector(`.territory.selectable[data-id="${id}"]`).focus()}});
 function openInfo(){const host=document.querySelector('#source-links');host.replaceChildren();const r=sources[selected];if(r){const h=document.createElement('h2');h.textContent=r.name+' · 官方资料';host.append(h);const small=document.createElement('small');small.textContent='资料核对：'+r.checked_on;host.append(small);for(const s of r.sources){const a=document.createElement('a');a.href=s.url;a.textContent=s.title;a.target='_blank';a.rel='noopener noreferrer';host.append(a)}}else{const p=document.createElement('p');p.textContent=selected==='CHN'?'国徽与利剑的风格化构图。竖排文字沿用指定诗句；字形取自李金铎创作的方正大草。':data.countries[selected].name+'：沿用项目资料，尚未逐项复核。';host.append(p)}dialog.showModal()}
 const info=document.querySelector('#info-button');info.addEventListener('click',openInfo);info.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openInfo()}});dialog.addEventListener('close',()=>info.focus());window.addEventListener('hashchange',()=>choose(location.hash.slice(1),false));
 choose(ids.includes(location.hash.slice(1))?location.hash.slice(1):'JPN',false);document.querySelector('#screen').dataset.ready='true';
})().catch(error=>{console.error(error);const p=document.createElement('p');p.textContent='页面资料未能加载，请通过本地预览服务打开。';document.body.append(p)});
