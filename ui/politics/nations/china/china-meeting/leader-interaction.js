'use strict';
window.mountChinaLeaders=function(root){
 const scene=root.querySelector('.politics-native'),tip=scene.querySelector('.leader-tooltip');
 document.body.append(tip);scene._disposeLeaders=()=>tip.remove();
 const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let current=null,keyboard=false,pointerFocus=false;
 const place=(x,y)=>{const r=tip.getBoundingClientRect(),gap=16;let left=x+gap,top=y-r.height*.48;if(left+r.width>innerWidth-10)left=x-r.width-gap;tip.style.left=Math.max(10,Math.min(innerWidth-r.width-10,left))+'px';tip.style.top=Math.max(10,Math.min(innerHeight-r.height-10,top))+'px'};
 const show=(chair,x,y,key)=>{const p=(window.CHINA_LEADERS||[]).find(p=>p.id===chair.dataset.leader);if(!p)return;current=chair;keyboard=key;scene._partyTooltip.hidden=true;tip.innerHTML=`<div class="leader-profile"><div class="leader-heading"><figure class="leader-portrait"><img src="${safe(p.image)}" alt="${safe(p.name)}"/></figure><div class="leader-identity"><strong>${safe(p.name)}</strong><p class="leader-office">${safe(p.title)}</p><p class="leader-born">${safe(p.born)}</p></div></div><p class="leader-biography">${safe(p.bio)}</p></div>`;tip.hidden=false;place(x,y);chair.classList.add('is-hovered')};
 const hide=()=>{tip.hidden=true;current?.classList.remove('is-hovered');current=null};
 scene._hideLeaderTooltip=hide;
 scene._showLeaderAt=(chair,x,y,key)=>{if(current!==chair||tip.hidden){hide();show(chair,x,y,key)}else place(x,y)};
 scene.addEventListener('focusin',e=>{const chair=e.target.closest('.leader-chair');if(chair){hide();const r=chair.getBoundingClientRect();show(chair,r.right,r.top+r.height/2,true)}});
 scene.addEventListener('focusout',e=>{if(e.target.closest('.leader-chair'))hide()});
 scene.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
};
