(function(){
 const header=document.getElementById('topbar');
 function sizeHeader(){document.documentElement.style.setProperty('--shell-header-height',header.getBoundingClientRect().height+'px')}
 sizeHeader();if(window.ResizeObserver)new ResizeObserver(sizeHeader).observe(header);
 const panel=document.getElementById('country-extension'),frame=document.getElementById('politics-frame');
 window.TNOCloseExtension=()=>{if(panel.open)panel.close();panel.hidden=true;frame.contentWindow?.postMessage({type:'tno-china-visibility',visible:false},location.protocol==='file:'?'*':location.origin)};
 panel.addEventListener('cancel',e=>{e.preventDefault();window.TNOCloseExtension()});
 panel.addEventListener('click',e=>{if(e.target!==panel)return;const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)window.TNOCloseExtension()});
 window.TNOOpenPolitics=function(iso){
  if(!(window.GEO_DB||{})[iso])return;
  const national={CHN:'china/china-tno-study/index',SAU:'saudi',SDN:'sudan',RUS:'russia/index'};
  const parliament=window.TNOParliaments?.[iso];
  panel.classList.toggle('national-desktop',!!national[iso]||!!parliament);
  const target=national[iso]?'ui/politics/nations/'+national[iso]+'.html?embedded=1&v='+(iso==='CHN'?'china-tabs20261103-1':'national-sep26-russia'):parliament?parliament.source:'politics.html?embedded=1&v=national-sep26-russia&country='+encodeURIComponent(iso);
  const label=parliament?parliament.name+'议会':'内政';
  frame.title=label;panel.setAttribute('aria-label',label);
  if(frame.getAttribute('src')!==target)frame.src=target;
  panel.hidden=false;if(!panel.open)panel.showModal();frame.contentWindow?.postMessage({type:'tno-china-visibility',visible:true},location.protocol==='file:'?'*':location.origin);document.getElementById('close-extension').focus();
 };
 document.getElementById('close-extension').onclick=window.TNOCloseExtension;
 const body=document.getElementById('sb-body');
 body.addEventListener('click',e=>{const b=e.target.closest('[data-open-archive]');if(b)window.TNOOpenPolitics(b.dataset.openArchive)});
 let selectedCountry='', active=null, pinned=false, closeTimer;
 const card=document.createElement('aside');
 card.id='faction-card';card.hidden=true;card.setAttribute('role','dialog');
 document.body.append(card);
 const escape=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const selector='[data-pie-detail],[data-leader-name]';
 function closeCard(){card.hidden=true;active=null;pinned=false;clearTimeout(closeTimer)}
 function scheduleClose(){if(!pinned){clearTimeout(closeTimer);closeTimer=setTimeout(closeCard,230)}}
 function positionCard(){
   if(active&&!card.hidden)window.TNONationPanel.placeTooltip(card,active.point);
 }
 window.TNOCloseFactionCard=closeCard;
 window.TNOUpdateCountryHeader=function(iso){
   if(selectedCountry!==iso)closeCard();
   else if(active)requestAnimationFrame(()=>{
     if (!active || active.anchor.isConnected) return;
     const replacement=[...body.querySelectorAll(selector)].find(e=>
       active.kind==='leader'?e.dataset.leaderName===active.label:e.dataset.pieName===active.label);
     if(replacement){active.anchor=replacement;positionCard()}else closeCard();
   });
   selectedCountry=iso;document.body.dataset.country=iso;
   const flag=document.getElementById('sb-flag'),code=(window.GEO_ISO2||{})[iso];
   flag.innerHTML=code?'<img src="ui/politics/assets/flags/'+escape(iso)+'.png" alt="">':'<span>'+escape(iso)+'</span>';
   const img=flag.querySelector('img');if(img)img.onerror=()=>{flag.textContent=iso};
 };
 function renderPassages(entry, original, id){
   const container=card.querySelector('.profile-passages');
   container.lang=original ? new URL(entry.sources[0]).hostname.split('.')[0] : 'zh-CN';
   const lines=original ? entry.original : entry.paragraphs;
   const marks=window.NexusPoliticalLanguage.annotate(lines,{id});
   container.replaceChildren(...lines.map((line,index)=>{
     const paragraph=document.createElement('p');
     window.NexusPoliticalLanguage.render(paragraph,line,marks[index]);return paragraph;
   }));
 }
 function showProfile(e){
   const anchor=e.target.closest(selector);if(!anchor)return;
   const activate=e.type==='click'||e.type==='keydown';
   clearTimeout(closeTimer);
   if(pinned&&!activate&&e.type!=='focusin')return;
   const kind=anchor.hasAttribute('data-leader-name')?'leader':'faction';
   const label=kind==='leader'?anchor.dataset.leaderName:anchor.dataset.pieName;
   const point=window.TNONationPanel.hoverPoint(e,anchor);
   if(active?.anchor===anchor){
     if(activate)pinned=true;
     if(activate||e.type!=='focusin'){active.point=point;positionCard()}
     return;
   }
   let name=label,photo='',role='',alt='',symbol=false;
   const thought=kind==='faction' ? window.NexusChinaThoughts?.get(selectedCountry,label) : null;
   const texts=window.NexusPoliticalTexts;
   let entryId=texts?.leaders[selectedCountry]?.[label];
   if(kind==='faction'){
     const out=anchor.closest('.sidebar-pie')?.querySelector('.pie-tooltip');
     if(out)out.textContent=anchor.dataset.pieDetail;
     if(thought)name=thought.name;
     else{
       const person=window.nexusFactionFigure?.(selectedCountry,label);
       if(!person){closeCard();return}
       name=person.name;role=person.role;alt=person.alt||name;symbol=!!person.symbol;
       photo=person.symbol?'ui/politics/assets/figures/'+person.symbol:person.leader?'assets/leaders/'+person.leader+'.jpg':'ui/politics/assets/figures/'+person.photo+'.jpg';
       entryId=texts?.figures[name];
     }
   }
   const entry=texts?.entries[entryId];
   if(!thought&&!entry){closeCard();return}
   window.TNONationPanel.hideSpirit();
   active={anchor,kind,label,point};pinned=activate;
   const title=thought ? thought.titleHTML : '<a href="'+escape(entry.sources[0])+'" target="_blank" rel="noopener noreferrer">'+escape(name)+'</a>';
   const head=photo?'<div class="faction-person"><img class="'+(symbol?'faction-symbol':'faction-portrait')+'" src="'+escape(photo)+'" alt="'+escape(alt)+'"><div><h3>'+title+'</h3><span>'+escape(role)+'</span></div></div>':'<h3>'+title+'</h3>';
   const switcher=!thought&&entry.original?'<button class="profile-language" type="button" aria-pressed="false">原文</button>':'';
   card.innerHTML='<button class="faction-close" aria-label="关闭介绍">×</button>'+head+switcher+'<div class="profile-passages"></div>';
   if(thought)card.querySelector('.profile-passages').innerHTML=thought.bodyHTML;
   else renderPassages(entry,false,entryId);
   card.setAttribute('aria-label',name);card.hidden=false;card.scrollTop=0;positionCard();
   const language=card.querySelector('.profile-language');
   if(language)language.onclick=()=>{
     const original=language.getAttribute('aria-pressed')==='false';
     language.setAttribute('aria-pressed',String(original));language.textContent=original?'译文':'原文';
     pinned=true;renderPassages(entry,original,entryId);card.scrollTop=0;positionCard();
   };
   card.querySelector('img')?.addEventListener('load',positionCard,{once:true});
   card.querySelector('.faction-close').onclick=closeCard;
 }
 ['pointerover','focusin','click'].forEach(type=>body.addEventListener(type,showProfile));
 body.addEventListener('pointermove',e=>{
   if(active&&!pinned&&active.anchor.contains(e.target)){active.point=window.TNONationPanel.hoverPoint(e,active.anchor);positionCard()}
 });
 body.addEventListener('keydown',e=>{
   if((e.key==='Enter'||e.key===' ')&&e.target.closest(selector)){e.preventDefault();showProfile(e)}
 });
 for(const type of ['pointerout','focusout'])body.addEventListener(type,e=>{
   const anchor=e.target.closest(selector);if(anchor&&!anchor.contains(e.relatedTarget))scheduleClose();
 });
 card.addEventListener('focusin',()=>clearTimeout(closeTimer));
 card.addEventListener('pointerenter',()=>clearTimeout(closeTimer));card.addEventListener('pointerleave',scheduleClose);
 window.addEventListener('resize',positionCard);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCard()});
 document.addEventListener('pointerdown',e=>{if(!card.contains(e.target)&&!e.target.closest(selector))closeCard()});
 window.addEventListener('message',e=>{if(e.source!==frame.contentWindow||(location.protocol!=='file:'&&e.origin!==location.origin))return;if(e.data?.type==='tno-close-politics')window.TNOCloseExtension()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.open){e.preventDefault();e.stopImmediatePropagation();window.TNOCloseExtension()}});
})();
