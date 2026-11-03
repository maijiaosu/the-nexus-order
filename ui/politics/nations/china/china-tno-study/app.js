'use strict';
const STORAGE='tno-china-v2-editor';
let data=readChinaConfig(null);try{data=readChinaConfig(JSON.parse(localStorage.getItem(STORAGE)||'null'))}catch{}
const stage=document.getElementById('stage'),main=document.querySelector('main'),tip=document.getElementById('hover-card');
const VIEW_KEY='nexus-china-view:unified';
const state={page:'politics',org:'xi',province:'广东',economicLayer:'status',plan:'innovation',thought:'left',politicalView:new URLSearchParams(location.search).get('politics')==='meeting'?'meeting':'standard',east:'JPN',region:'middleeast',worldPartner:null};
try{const saved=JSON.parse(sessionStorage.getItem(VIEW_KEY)||'null');if(saved&&['politics','economy','thoughts','east','diplomacy'].includes(saved.page))state.page=saved.page;if(data.provinces[saved?.province])state.province=saved.province;if(data.thoughts.some(t=>t.id===saved?.thought))state.thought=saved.thought;if(saved?.politicalView&&!location.search.includes('politics='))state.politicalView=saved.politicalView;}catch{}
function saveView(){try{sessionStorage.setItem(VIEW_KEY,JSON.stringify({page:state.page,province:state.province,thought:state.thought,politicalView:state.politicalView}))}catch{}}
const statusColors={'腾飞':'#7bed98','平稳':'#62cce0','停滞':'#f1cb52','凋敝':'#ed6c7d'};
const relationColors={'敌对':'#e15666','不友善':'#d99b70','中立':'#b8c2ce','良好':'#65d4c9','盟友':'#8fe19a'};
const escapeText=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=s=>escapeText(String(s??'').replaceAll('·',' '));
const semanticTerms=[['人民币','currency'],['党中央','left'],['公共控制','left'],['公有制','left'],['产业规划','left'],['再分配','social'],['资本','conservative'],['收入差距','bad'],['群众参与','newleft'],['平等','social'],['市场配置','liberal'],['组织动员','authority'],['战略产业','national'],['民主','liberal'],['福利','social'],['特权','bad'],['政策连续性','authority'],['宏观调控','left'],['个人自由','liberal'],['市场竞争','liberal'],['思想自由','liberal'],['劳动','newleft'],['威权社会主义','authority'],['社会主义市场经济','left'],['改革开放','liberal'],['个人权利','liberal'],['自由主义','liberal'],['表达空间','liberal'],['法治','liberal'],['权利保障','liberal'],['民主参与','social'],['公共服务','social'],['社会保障','social'],['经济平等','social'],['劳动者','newleft'],['共同富裕','left'],['劳动保障','newleft'],['人民','left'],['社会主义','left'],['党的领导','left'],['国家能力','authority'],['组织纪律','authority'],['国家安全','authority'],['国家主权','national'],['民族复兴','national'],['战略自主','national'],['大汉族复兴','fascism'],['极端民族主义','extreme'],['排他','fascism'],['冲突','bad'],['风险','bad'],['压力','bad'],['制约','bad'],['债务','bad'],['差距','bad'],['腐败','bad'],['自由贸易','liberal'],['创新','good'],['发展','good'],['增长','good'],['就业','good']];
const semRE=new RegExp(semanticTerms.map(x=>x[0]).sort((a,b)=>b.length-a.length).join('|'),'g');
function sem(text){return clean(text).replace(semRE,m=>`<span class="sem-${semanticTerms.find(x=>x[0]===m)[1]}">${m}</span>`)}
function pic(src,alt,cls=''){return `<figure class="photo ${cls}"><img src="${clean(src)}" alt="${clean(alt)}" loading="eager"></figure>`}
function button(id,label,attr=''){return `<button ${attr} data-reference="${id}">${label}　›</button>`}
function fmt(n){return Number(n).toLocaleString('zh-CN',{maximumFractionDigits:1})}
function stars(){return '<span class="semantic-icon">☭</span>'}
function gridDefs(){return `<defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#33666e" stroke-width=".5" opacity=".38"/></pattern></defs>`}
const observedImages=new WeakSet();
function setupImages(root=stage){root.querySelectorAll('img').forEach(im=>{if(observedImages.has(im))return;observedImages.add(im);im.addEventListener('error',()=>{im.closest('figure')?.classList.add('image-unavailable')},{once:true})})}
const titles={politics:['',''],economy:['国家发展和改革委员会',''],thoughts:['中国社会思潮',''],east:['俯瞰东亚',''],diplomacy:['环球同此凉热','中国的全球外交']};
// Each page owns one connected panel. Switching never detaches its DOM or GPU surfaces.
const pagePanels=new Map();
let hallBuilt=false,economyData=null,societyData=null,renderRevision=0,meetingFrame=null,activePage=null;
function pagePanel(page){
 if(!pagePanels.has(page)){const panel=document.createElement('div');panel.className='china-page-panel';panel.dataset.page=page;panel.hidden=true;stage.append(panel);pagePanels.set(page,panel);}
 return pagePanels.get(page);
}
async function renderPage(page=state.page,force=false){
 const revision=++renderRevision,started=performance.now();
 if(page===activePage&&!force)return;
 await Promise.all([ChinaModules.load(({politics:'politics',economy:'economy',thoughts:'thoughts',east:'influence',diplomacy:'diplomacy'})[page]),...(page==='economy'?[ChinaModules.load('maps')]:[])]);
 if(revision!==renderRevision)return;
 if(activePage==='thoughts'&&societyData)ChinaSociety.suspend();
 if(meetingFrame)meetingFrame.hidden=true;
 if(page!=='east')window.ChinaInfluence?.hide();
 if(page!=='diplomacy')window.ChinaDiplomacy?.hide();
 for(const panel of pagePanels.values())panel.hidden=true;
 for(const el of document.querySelectorAll('.seat-tooltip,.leader-tooltip'))el.hidden=true;
 state.page=page;activePage=page;saveView();tip.hidden=true;
 document.querySelectorAll('[role=tab][data-page]').forEach(b=>b.setAttribute('aria-selected',b.dataset.page===page));
 document.getElementById('page-title').textContent=titles[page][0];document.getElementById('page-subtitle').textContent=titles[page][1];document.body.dataset.page=page;
 ({politics,economy,thoughts,east,diplomacy}[page])();setupImages(pagePanels.get(page)||stage);
 main.dataset.switchBuildMs=(performance.now()-started).toFixed(1);
 main.dataset.activePage=page;
 requestAnimationFrame(()=>{main.dataset.switchFrameMs=(performance.now()-started).toFixed(1)});
}
function politics(){
 if(!main.querySelector('.nation-shell'))window.mountChinaShell();
 document.body.dataset.politicalView=state.politicalView;
 const button=main.querySelector('.politics-view-toggle'),meeting=state.politicalView==='meeting',panel=pagePanel('politics');
 button.setAttribute('aria-pressed',String(meeting));button.title=button.ariaLabel=meeting?'切换至一般版':'切换至会场版';
 if(meeting){panel.hidden=true;if(!meetingFrame){meetingFrame=document.createElement('iframe');meetingFrame.className='meeting-view';meetingFrame.title='中国政治会场';meetingFrame.src='../china-meeting/hall-view.html';main.append(meetingFrame);}meetingFrame.hidden=false;meetingFrame.contentWindow.resumeMeeting?.();return;}
 panel.hidden=false;
 if(hallBuilt){panel.querySelector('.politics-native')?._resumeHall?.();}
 else{const sceneStart=performance.now();panel.innerHTML=window.chinaPoliticsScene();main.dataset.hallGeometryMs=(performance.now()-sceneStart).toFixed(1);const mountStart=performance.now();window.mountChinaPolitics(panel);main.dataset.hallMountMs=(performance.now()-mountStart).toFixed(1);hallBuilt=true;main.dataset.hallBuilds='1';}
}
function selectOrg(id){state.org=id;document.querySelectorAll('[data-org]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.org===id))}
function economy(){const panel=pagePanel('economy');panel.hidden=false;if(economyData!==data){window.ChinaEconomy.mount(panel,data,MAPS,state.province,openDrawer);economyData=data;}}
function selectProvince(name){state.province=name;saveView();window.ChinaEconomy.select(name)}
function selectPlan(id){state.plan=id;const p=data.plans.find(x=>x.id===id);document.querySelectorAll('[data-plan]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.plan===id));document.getElementById('plan-detail').innerHTML=`${pic('../assets/'+p.photo,p.name)}<div><h3>${p.name}</h3><p>${sem(p.text)}</p><button data-reference="plan-${id}">建设任务</button></div>`}
function thoughts(){const panel=pagePanel('thoughts');panel.hidden=false;if(societyData===data){ChinaSociety.resume();}else{ChinaSociety.mount(panel,data,state.thought,selectThought);societyData=data;}}
function selectThought(id){state.thought=id;saveView();window.ChinaSociety.select(id)}
const eastLabelPos={JPN:[142,39],KOR:[130,35],PRK:[127,43],TWN:[125,24],VNM:[105,20],LAO:[103,23],KHM:[108,10],THA:[98,15],MMR:[94,23],MYS:[106,3],SGP:[104,-1],IDN:[116,-5],PHL:[127,13],AUS:[135,-25],NZL:[173,-40],BRN:[116,6],TLS:[129,-11]};
function east(){window.ChinaInfluence.mount(main);}
function selectCountry(id){state.east=id;const d=data.countries[id];document.querySelectorAll('[data-country]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.country===id));const selected=MAPS.world.find(w=>w.id===id);document.getElementById('selected-country-pattern').innerHTML=`<path d="${selected.east}" fill="url(#east-hatch)" style="color:${relationColors[d.attitude]}"/><path d="${selected.east}" class="selected-coast"/>`;const r=document.getElementById('east-right');r.style.setProperty('--relation',relationColors[d.attitude]);r.innerHTML=`<div class="leader-summary"><img class="leader-flag-corner" src="assets/flag-${id}.png" alt=""><div class="portrait"><img src="${d.photo}" alt="${clean(d.leader.n)}"></div><div><h2>${d.name}</h2><h3>${clean(d.leader.n)}</h3><p>${clean(d.leader.t)}</p><p>${clean(d.party)}</p><span class="attitude-label">${d.attitude}</span></div></div><div class="contest-flags"><div><img src="assets/flag-CHN.png" alt="中国国旗"><span>中国</span></div><b>地区影响</b><div><span>美国</span><img src="assets/flag-USA.png" alt="美国国旗"></div></div><div class="influence-contest">${['经济影响力','军事影响力','政治影响力'].map((n,i)=>`<div class="contest"><img class="contest-native" src="assets/tno-${['commerce','military','political'][i]}.png" alt=""><h3>${n}</h3><span class="contest-side">◁</span><div class="dual-rails"><div class="rail" aria-label="中国${n} ${d.cn[i]}档"><i style="width:${d.cn[i]/9*100}%"></i></div><div class="rail us" aria-label="美国${n} ${d.us[i]}档"><i style="width:${d.us[i]/9*100}%"></i></div></div><span class="contest-side us">▷</span></div>`).join('')}</div><p class="east-text">${sem(d.text)}</p>`;setupImages(r)}
const worldPowers=['USA','RUS','IND','BRA','ZAF','SAU','ARE','IRN','EGY','ETH','IDN','DEU','FRA'];
const powerTexts={USA:'美元金融、先进技术与安全同盟构成美国的结构性力量。中美在贸易、科技和地区秩序方面竞争，同时仍存在深厚的经济联系。',RUS:'能源供应与战略协作深化合作。俄罗斯对中国市场、工业品与人民币结算的重要性上升。',IND:'印度参与金砖与全球南方合作，同时发展与美国及其他伙伴的关系。边界争议与产业竞争制约中印互信。',BRA:'巴西的大豆、铁矿石和能源供应连接中国市场，关注发展融资、绿色转型与本币结算，也保持多元外交。',ZAF:'矿产、制造业、基础设施与金砖金融合作构成联系。当地就业、产业升级和电力供给是重要利益。',SAU:'海湾能源与中国需求相互连接，投资合作扩大；安全关系与美元资产仍对其政策选择产生重要影响。',ARE:'金融、能源和港口枢纽地位使阿联酋成为重要合作节点，同时保持广泛的西方经济与安全联系。',IRN:'能源与贸易合作受到制裁、支付障碍和地区冲突影响，替代结算需求强烈。',EGY:'苏伊士通道、经贸园区与基础设施关系到双方利益，外汇压力和债务约束影响合作节奏。',ETH:'工业园区、交通、电力和制造业投资支持发展议程，外汇供给和债务重组影响项目持续性。',IDN:'镍矿、电池、制造业和基础设施投资带来合作机会，印度尼西亚通过金砖和东盟保持多向外交。',DEU:'制造业、汽车和技术合作伴随市场竞争、风险分散与欧洲产业政策调整。',FRA:'航空、能源和消费市场联系深厚，法国同时强调欧洲战略自主与贸易平衡。'};
function diplomacy(){window.ChinaDiplomacy.mount(main);}
function selectRegion(id){state.region=id;const r=data.regions.find(r=>r.id===id);document.querySelectorAll('[data-region]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.region===id));document.getElementById('region-content').innerHTML=`${pic('assets/'+r.photo,r.caption||r.name)}<div><h3>${mark(r.icon)} ${r.name}</h3><div class="goods">${r.goods.map(x=>`<span>${x}</span>`).join('')}</div><p>${sem(r.text)}</p></div>`;setupImages(document.getElementById('region-content'))}
function selectWorld(id){state.worldPartner=id;const c=data.countries[id];document.getElementById('world-partner').innerHTML=`<div class="relationship-strip"><img src="${c.photo}" alt="${clean(c.leader.n)}"><div><h3>${c.name}　${clean(c.leader.n)}</h3><p>${sem(powerTexts[id])}</p></div><button data-close-world aria-label="关闭国家资料">×</button></div>`}
const files={
'economic-system':['社会主义市场经济',['<h3>国家规划与市场配置</h3><p>公有制为主体，多种所有制经济共同发展。国家规划、财政金融与产业政策协调发展方向，企业经营和市场竞争承担广泛的资源配置功能。</p><p>国有经济集中于能源、基础设施和金融等关键领域。民营经济广泛覆盖制造、服务和创新活动，企业预期与产权保护影响投资和就业。</p>','<h3>增长与结构压力</h3><p>2026年上半年全国GDP为69.57万亿元，实际增长4.7%。制造业升级与新产业形成增长动力，房地产调整、地方债务和居民消费预期构成约束。</p><p>地方一般公共预算收入与支出的差额，并不等于财政赤字；还涉及中央转移支付、调入资金及其他预算安排。</p>'],'bottom'],
cips:['人民币跨境支付',['<h3>CIPS</h3><p>人民币跨境支付系统提供跨境及离岸人民币支付清算结算服务，参与者通过直接或间接方式接入。</p><p>清算基础设施可以扩大结算选择，但人民币使用规模仍取决于贸易、融资、资产需求与市场信任。</p>']],
swap:['本币互换',['<h3>央行互换安排</h3><p>双边本币互换可提供流动性支持，便利贸易与投资。协议额度不代表已经实际使用的资金，也不等同于外汇储备占比。</p>']],
ndb:['新开发银行',['<h3>发展融资</h3><p>新开发银行为基础设施和可持续发展项目提供融资，推动成员本币融资，减少项目面临的部分汇率错配。</p><p>它与成员国其他金融渠道并存，项目质量、信用风险和借款国需求决定融资成效。</p>']],
settlement:['贸易与结算',['<h3>计价、结算与储备</h3><p>交易采用什么币种定价、支付采用什么币种、央行持有什么储备，是三个不同问题。扩大人民币贸易结算有助于形成使用网络，但不能直接换算成储备货币份额。</p>']],
treasury:['美元资产',['<h3>流动性与安全资产</h3><p>美国国债市场、美元银行体系与广泛的金融工具提供流动性和抵押品。网络效应使替代货币需要同时提供足够的市场深度、可获得性与信任。</p>']],
clearing:['美元清算',['<h3>跨境支付网络</h3><p>美元代理银行、清算系统与金融市场构成跨境支付基础。SWIFT提供金融信息通信服务，本身不是统一的全球资金清算机构。</p>']],
sanctions:['金融制裁',['<h3>准入与约束</h3><p>制裁通过限制资产、交易及金融机构准入影响跨境活动。替代支付渠道能减少部分障碍，却难以完全替代美元流动性和全球市场准入。</p>']],
commodities:['大宗商品定价',['<h3>能源与原料</h3><p>美元在石油及多种大宗商品的国际定价和融资中占据重要地位。本币结算可以在部分双边贸易中推进，价格基准与风险对冲体系的变化通常更缓慢。</p>']]};
function showFile(id){if(id.startsWith('plan-')){const p=data.plans.find(p=>p.id===id.slice(5));openDrawer(id,p.name,[`${pic('../assets/'+p.photo,p.name)}<h3>${p.name}</h3><p>${sem(p.text)}</p><p>${sem(p.items)}</p><p>建设期：2026—2030年</p>`],'bottom');return}if(files[id])openDrawer(id,...files[id])}
let z=30,openDrawers=[];
function movable(el,grip){let drag;grip.classList.add('window-grip');grip.addEventListener('pointerdown',e=>{if(e.button||e.target.closest('button,a'))return;el.getAnimations().forEach(a=>a.cancel());const r=el.getBoundingClientRect();drag={x:e.clientX,y:e.clientY,left:r.left,top:r.top+(el===main?scrollY:0)};grip.setPointerCapture(e.pointerId);grip.classList.add('dragging');e.preventDefault();el.style.zIndex=++z});grip.addEventListener('pointermove',e=>{if(!drag)return;el.style.left=Math.max(el===main?33:0,Math.min(innerWidth-el.offsetWidth,drag.left+e.clientX-drag.x))+'px';el.style.top=Math.max(0,Math.min((el===main?document.documentElement.scrollHeight:innerHeight)-el.offsetHeight,drag.top+e.clientY-drag.y))+'px';el.style.right=el.style.bottom='auto'});const stop=()=>{drag=null;grip.classList.remove('dragging')};grip.addEventListener('pointerup',stop);grip.addEventListener('lostpointercapture',stop);el.addEventListener('pointerdown',()=>el.style.zIndex=++z)}
main.querySelector('.politics-view-toggle').addEventListener('click',()=>{state.politicalView=state.politicalView==='standard'?'meeting':'standard';saveView();renderPage('politics',true);});
ChinaWindow.attachDrag(main.querySelector('header'));
function closeDrawer(d){d.getAnimations().forEach(a=>a.cancel());d.close();openDrawers=openDrawers.filter(x=>x!==d);d._opener?.isConnected&&d._opener.focus()}
function openDrawer(id,title,pages,edge='right'){let d=document.getElementById('drawer-'+id);const existed=!!d?.open;if(!d){d=document.createElement('dialog');d.className='drawer';d.id='drawer-'+id;d.dataset.edge=edge;d.innerHTML=`<header><h2>${clean(title)}</h2><button aria-label="关闭${clean(title)}">×</button></header><section class="paper"></section>`;document.body.append(d);d.setAttribute('aria-label',title);movable(d,d.querySelector('header'));d.querySelector('header button').onclick=()=>closeDrawer(d);d.addEventListener('cancel',e=>{e.preventDefault();closeDrawer(d)})}let page=0;function paint(){d.querySelector('.paper').innerHTML=pages[page]+(pages.length>1?`<div class="page-turn"><button data-prev ${page===0?'disabled':''} aria-label="上一页">‹</button><span>${page+1} / ${pages.length}</span><button data-next ${page===pages.length-1?'disabled':''} aria-label="下一页">›</button></div>`:'');d.querySelector('[data-prev]')?.addEventListener('click',()=>{page--;paint()});d.querySelector('[data-next]')?.addEventListener('click',()=>{page++;paint()})}paint();d.style.zIndex=++z;if(existed)return;d._opener=document.activeElement;d.show();openDrawers.push(d);const bottom=edge==='bottom';d.animate([{transform:bottom?'translateY(-65%)':'translateX(-65%)',clipPath:bottom?'inset(100% 0 0 0)':'inset(0 0 0 100%)'},{transform:'translate(0,0)',clipPath:'inset(0 0 0 0)'}],{duration:matchMedia('(prefers-reduced-motion:reduce)').matches?0:760,easing:'cubic-bezier(.2,.45,.22,1)'});d.querySelector('header button').focus()}
function showHover(el){if(el.dataset.reference){const id=el.dataset.reference;if(id.startsWith('plan-')){const p=data.plans.find(p=>p.id===id.slice(5));tip.innerHTML=`<div class="dossier"><img class="native-hover" src="../assets/${p.photo}" alt=""><div><h3>${clean(p.name)}</h3><p>${sem(p.text)}</p><p>${sem(p.items)}</p></div></div>`}else if(files[id]){tip.innerHTML=`<div class="short-reference"><h3>${clean(files[id][0])}</h3>${files[id][1].join('').replace(/<h3>.*?<\/h3>/g,'').replace(/<p>(.*?)<\/p>/g,(_,t)=>'<p>'+sem(t)+'</p>')}</div>`}}else if(el.dataset.world){const id=el.dataset.world,d=data.countries[id];tip.innerHTML=`<div class="dossier"><img src="${clean(d.photo)}" alt="${clean(d.leader.n)}"><div><h3>${clean(d.name)}</h3><div class="bio-role">${clean(d.leader.n)}　${clean(d.party)}</div><p>${sem(powerTexts[id]||d.text)}</p></div></div>`}else if(el.dataset.hoverOrg){const d=data.orgs.find(o=>o.id===el.dataset.hoverOrg);tip.innerHTML=`<div class="dossier"><img src="assets/${d.image}" alt="${d.name}"><div><h3>${d.name}</h3><div class="bio-role">${d.org}　${d.role}</div><p>${sem(d.bio)}</p><p>${sem(d.ideas)} ${sem(d.current)}</p></div></div>`}else{tip.innerHTML=`<div class="dossier no-face"><h3>${clean(el.dataset.hover)}</h3><p>${sem(el.dataset.hoverText)}</p></div>`}tip.hidden=false;const r=el.getBoundingClientRect();tip.style.width=Math.min(750,innerWidth-24)+'px';const tr=tip.getBoundingClientRect();tip.style.left=Math.max(10,Math.min(innerWidth-tr.width-10,r.left))+'px';tip.style.top=Math.min(innerHeight-tr.height-10,r.bottom+9)+'px'}
document.addEventListener('pointerover',e=>{const el=e.target.closest('[data-hover-org],[data-hover],[data-reference],[data-world]');if(el&&!el.contains(e.relatedTarget))showHover(el)});document.addEventListener('pointerout',e=>{const el=e.target.closest('[data-hover-org],[data-hover],[data-reference],[data-world]');if(el&&!el.contains(e.relatedTarget))tip.hidden=true});document.addEventListener('focusin',e=>{const el=e.target.closest('[data-hover-org],[data-hover],[data-reference],[data-world]');if(el)showHover(el)});document.addEventListener('focusout',()=>tip.hidden=true);
document.addEventListener('click',e=>{const el=e.target.closest('[role=tab][data-page],[data-org],[data-province],[data-economic-layer],[data-plan],[data-thought],[data-country],[data-region],[data-world],[data-reference],[data-close-world],.home-position');if(!el)return;const d=el.dataset;if(d.page)renderPage(d.page);else if(d.org)selectOrg(d.org);else if(d.province)selectProvince(d.province);else if(d.economicLayer){state.economicLayer=d.economicLayer;economy()}else if(d.plan)selectPlan(d.plan);else if(d.thought)selectThought(d.thought);else if(d.country)selectCountry(d.country);else if(d.region)selectRegion(d.region);else if(d.world)showHover(el);else if(d.reference)showHover(el);else if('closeWorld'in d){state.worldPartner=null;document.getElementById('world-partner').innerHTML=''}else if(el.classList.contains('home-position')){ChinaWindow.reset()}});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg [role=button]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}if(e.key==='Escape'){tip.hidden=true;if(openDrawers.length){closeDrawer(openDrawers.reduce((a,b)=>+a.style.zIndex>+b.style.zIndex?a:b))}}});
addEventListener('storage',e=>{if(e.key===STORAGE){try{const next=JSON.parse(e.newValue);data=readChinaConfig(next);renderPage(state.page,true)}catch{}}});
addEventListener('resize',()=>{tip.hidden=true;document.querySelectorAll('dialog[open]').forEach(el=>{if(!el.style.left)return;el.style.left=Math.max(0,Math.min(innerWidth-el.offsetWidth,parseFloat(el.style.left)))+'px';el.style.top=Math.max(0,Math.min(innerHeight-el.offsetHeight,parseFloat(el.style.top)||0))+'px'})});
renderPage();
addEventListener('load',()=>{requestAnimationFrame(()=>{const n=performance.getEntriesByType('navigation')[0];main.dataset.readyMs=performance.now().toFixed(1);main.dataset.domReadyMs=n?.domContentLoadedEventEnd.toFixed(1)||'';});},{once:true});

// Start loading the requested module as the pointer or keyboard reaches its tab.
for(const type of ['pointerover','focusin'])main.querySelector('.edge-tabs').addEventListener(type,event=>{
 const page=event.target.closest('[data-page]')?.dataset.page;if(!page)return;
 ChinaModules.load(({politics:'politics',economy:'economy',thoughts:'thoughts',east:'influence',diplomacy:'diplomacy'})[page]).catch(()=>{});
 if(page==='economy')ChinaModules.load('maps').catch(()=>{});
});
addEventListener('china-window-visibility',event=>{
 if(state.page==='thoughts'&&societyData){if(event.detail)ChinaSociety.resume();else ChinaSociety.suspend();}
 if(event.detail&&state.page==='politics')pagePanels.get('politics')?.querySelector('.politics-native')?._resumeHall?.();
 if(!event.detail){tip.hidden=true;for(const el of document.querySelectorAll('.seat-tooltip,.leader-tooltip'))el.hidden=true;}
});

// Data refresh keeps the current view and never writes user editor preferences.
window.TNOChinaRefresh=function(){
 let local=null;try{local=JSON.parse(localStorage.getItem(STORAGE)||'null')}catch{}
 const next=readChinaConfig(local);if(JSON.stringify(next)===JSON.stringify(data))return;data=next;renderPage(state.page,true);
};
