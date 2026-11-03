'use strict';
// Re-express the existing party focus action using the LegCo reference's strip.
// No new data or state persistence; the physical seats retain their own IDs.
const mountTnoHall=window.mountChinaPolitics;
window.mountChinaPolitics=root=>{
  mountTnoHall(root);
  const scene=root.querySelector('.politics-native');
  document.querySelector('.hall-party-strip')?.remove();
  const strip=document.createElement('nav');strip.className='hall-party-strip';strip.setAttribute('aria-label','席位分组');
  strip.innerHTML=NPC_PARTIES.map(p=>`<button type="button" data-party-focus="${p.id}" aria-label="${p.name}，${p.count}席" aria-pressed="false" style="--party-ink:${p.color}"><span class="party-signal" aria-hidden="true"></span><span class="party-name">${p.name}</span><span class="party-count">${p.count}<small>席</small></span></button>`).join('');
  document.getElementById('main-window').append(strip);
  strip.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;scene.dataset.focus=scene.dataset.focus===b.dataset.partyFocus?'all':b.dataset.partyFocus;scene._partyTooltip.hidden=true;scene._hideLeaderTooltip?.()});
  strip.addEventListener('keydown',e=>{if(e.key==='Escape')scene.dataset.focus='all'});
  const sync=()=>strip.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.partyFocus===scene.dataset.focus)));
  const watch=new MutationObserver(sync);watch.observe(scene,{attributes:true,attributeFilter:['data-focus']});sync();
  const dispose=scene._disposeInteraction;scene._disposeInteraction=()=>{watch.disconnect();strip.remove();dispose?.()};
};
