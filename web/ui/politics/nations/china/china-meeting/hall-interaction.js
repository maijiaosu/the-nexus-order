'use strict';
// Same-term evidence only. The unsourced 2091/886 split has been withdrawn.
const NPC_SAMPLE={total:2977,year:2023};
const NPC_PARTIES=[
 {id:'remaining',name:'中国共产党',count:2696,color:'#b84232'},
 {id:'minge',name:'民革',count:41,color:'#db9760'},
 {id:'minmeng',name:'民盟',count:56,color:'#b9b76b'},
 {id:'minjin',name:'民进',count:54,color:'#79ae98'},
 {id:'nonggong',name:'农工党',count:60,color:'#c47e85'},
 {id:'jiusan',name:'九三学社',count:56,color:'#859eb8'},
 {id:'taimeng',name:'台盟',count:14,color:'#ae91bd'}
];
// Identifiable historic events and institutions, with explicit captions. No default leader portraits.
const NPC_INTROS=[
 ['中国共产党','中国共产党成立于1921年，是中华人民共和国的执政党，在多党合作和政治协商制度中发挥领导作用，强调党的领导与社会主义现代化建设。'],
 ['中国国民党革命委员会','1948年成立的中国特色社会主义参政党，与原国民党及台湾各界有历史联系。2023年换届后，聚焦社会法制、和平统一与“三农”议题。'],
 ['中国民主同盟','以文化教育及相关科技界知识分子为主体的中国特色社会主义参政党。2023年在云南开展长江生态保护监督，结合专家资源提供技术帮扶。'],
 ['中国民主促进会','以教育文化、出版传媒界人士为主要联系群体的中国特色社会主义参政党。2023年新一届领导班子强调政治交接、自身建设与议政能力。'],
 ['中国农工民主党','主要联系医药卫生、人口资源和生态环境领域的中国特色社会主义参政党。2023年提出关注养老生育支持、重大疾病防治与健康促进。'],
 ['九三学社','以科学技术界知识分子为主体的中国特色社会主义参政党。2023年提出加强基础研究、提升企业创新能力，为科技自立自强建言。'],
 ['台湾民主自治同盟','主要联系居住在祖国大陆的台湾省人士及台湾问题研究者的中国特色社会主义参政党。2023年强调深化两岸交流融合，推动和平统一。']
];
const NPC_ART=[
 ['政协第一届全体会议','1949年','执政党'],
 ['民革中央机关','北京','中国特色社会主义参政党'],
 ['特园','民盟成立地','中国特色社会主义参政党'],
 ['中国科学社旧址','民进成立地','中国特色社会主义参政党'],
 ['重庆中央机关旧址','复建陈列馆','中国特色社会主义参政党'],
 ['九三学社中央机关','北京','中国特色社会主义参政党'],
 ['台盟首届政协代表','1949年','中国特色社会主义参政党']
];
NPC_PARTIES.forEach((p,i)=>Object.assign(p,{fullName:NPC_INTROS[i][0],intro:NPC_INTROS[i][1],artTitle:NPC_ART[i][0],artDate:NPC_ART[i][1],role:NPC_ART[i][2],image:'../china-tno-study/assets/party-history/'+p.id+(p.id==='remaining'||p.id==='taimeng'?'.jpg':'.png')}));
function partyArtwork(p){return p.id==='remaining'?`<svg viewBox="0 1878 5614 2780" preserveAspectRatio="xMidYMid meet" role="img" aria-label="1949年政协第一届全体会议会场历史照片"><image href="${p.image}" width="5614" height="6980"/></svg>`:`<img src="${p.image}" alt="${p.artTitle}，${p.artDate}"/>`}
const partyText=text=>text.replace(/中国特色社会主义参政党|执政党|多党合作|祖国统一|社会法制|三农|文化教育|科学技术|教育文化|医药卫生|生态环境|健康中国|科技创新|基础研究|创新能力|两岸交流|和平统一|政治协商|民主监督/g,word=>`<em class="${/执政党|参政党|多党合作|统一/.test(word)?'party-key-political':'party-key-field'}">${word}</em>`);
window.mountChinaPolitics=function(root){
 NPC_PARTIES.forEach(p=>{const image=new Image();image.src=p.image});

 const scene=root.querySelector('.politics-native'),tooltip=scene.querySelector('.seat-tooltip');
 scene._partyTooltip=tooltip;document.body.append(tooltip);
 const resize=new ResizeObserver(()=>scene.style.setProperty('--hall-height',scene.clientHeight+'px'));resize.observe(scene);
 scene._disposeInteraction=()=>{resize.disconnect();tooltip.remove();scene._disposeLeaders?.()};
 const focus=k=>{scene.dataset.focus=scene.dataset.focus===k?'all':k};
 let currentSeat=null,mode='pointer',pointerFocus=false;
 const position=(x,y)=>{
   const r=tooltip.getBoundingClientRect(),gap=14;
   let left=x+gap,top=y+gap;
   if(left+r.width>innerWidth-8)left=x-r.width-gap;
   if(top+r.height>innerHeight-8)top=y-r.height-gap;
   tooltip.style.left=Math.max(8,Math.min(innerWidth-r.width-8,left))+'px';
   tooltip.style.top=Math.max(8,Math.min(innerHeight-r.height-8,top))+'px';
 };
 const show=(seat,x,y,kind='pointer')=>{
   const p=NPC_PARTIES.find(p=>p.id===seat.dataset.affiliation);
   if(!p)return;
   scene._hideLeaderTooltip?.();
   currentSeat=seat;mode=kind;scene._keyboardSeat=kind==='keyboard';tooltip.dataset.party=p.id;tooltip.dataset.trigger=kind;tooltip.style.setProperty('--seat-color',p.color);
   tooltip.innerHTML=`<figure class="party-identity"><div class="party-art ${p.id==='remaining'||p.id==='taimeng'?'archival':''}">${partyArtwork(p)}</div></figure><div class="seat-tooltip-copy"><strong>${p.fullName}</strong><div class="party-role">${p.role}</div><div class="seat-stat"><b>${p.count}</b> 席　<b>${(p.count/2977*100).toFixed(2)}%</b></div><p>${partyText(p.intro)}</p></div>`;
   tooltip.hidden=false;position(x,y);
 };
 const pointerTarget=e=>scene._hallPick?.(e.clientX,e.clientY)||null;
 const pointerShow=e=>{
   if(mode==='keyboard'&&e.type==='pointermove'&&!e.movementX&&!e.movementY)return;
   scene._keyboardSeat=false;mode='pointer';
   const target=pointerTarget(e),seat=target?.matches('.seat-graphic')?target:null,leader=target?.matches('.leader-chair')?target:null;
   scene.dataset.pointerTarget=target?.dataset.seatId||target?.dataset.leader||'';
   scene.dataset.pointerParty=seat?.dataset.affiliation||'';
   scene.dataset.pointerTrusted=String(e.isTrusted);scene.dataset.pointerButtons=String(e.buttons);
   scene.dataset.pointerEvent=e.type;
   scene.style.cursor=target?'pointer':'';
   if(seat){if(seat!==currentSeat||tooltip.hidden)show(seat,e.clientX,e.clientY);else position(e.clientX,e.clientY);}
   else{tooltip.hidden=true;currentSeat=null;if(leader)scene._showLeaderAt?.(leader,e.clientX,e.clientY,false);else scene._hideLeaderTooltip?.();}
 };
 scene.addEventListener('pointermove',pointerShow);
 scene.addEventListener('pointerover',e=>{if(!scene._keyboardSeat)pointerShow(e)});
 scene.addEventListener('pointerleave',()=>{if(mode==='pointer'){tooltip.hidden=true;currentSeat=null;scene._hideLeaderTooltip?.();scene.style.cursor='';scene.dataset.pointerParty='';}});
 scene.addEventListener('pointerdown',()=>{pointerFocus=true;mode='pointer';scene._keyboardSeat=false;scene.querySelector('.hall-depth-canvas')?.focus({preventScroll:true})});
 scene.addEventListener('click',e=>{pointerFocus=false;const target=pointerTarget(e);if(target?.matches('.seat-graphic')){focus(target.dataset.affiliation);show(target,e.clientX,e.clientY)}else if(target?.matches('.leader-chair'))scene._showLeaderAt?.(target,e.clientX,e.clientY,false)});
 scene.addEventListener('focusin',e=>{const seat=e.target.closest('.seat-graphic');if(seat){const r=seat.getBoundingClientRect();show(seat,r.left+r.width/2,r.top,pointerFocus?'pointer':'keyboard')}});
 scene.addEventListener('focusout',e=>{if(mode==='keyboard'&&e.target===currentSeat){tooltip.hidden=true;currentSeat=null;scene._keyboardSeat=false}});
 scene.addEventListener('keydown',e=>{pointerFocus=false;if(e.key==='Escape'){tooltip.hidden=true;scene._keyboardSeat=false;scene.dataset.focus='all'}const seat=e.target.closest('.seat-graphic');if(seat&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopPropagation();const r=seat.getBoundingClientRect();show(seat,r.left+r.width/2,r.top,'keyboard');focus(seat.dataset.affiliation)}});
 // One keyboard stop per category; pointer hit targets remain the actual curved solids.
 NPC_PARTIES.forEach(p=>scene.querySelector(`.seat-graphic[data-affiliation="${p.id}"]`)?.setAttribute('tabindex','0'));
};
