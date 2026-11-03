'use strict';
window.ChinaSociety=(()=>{
 let root,data,onSelect,selected,expanded=null,cylinder,foldResize,plannedStep=0,pendingStep=null,foldFrame=0,foldGeometry=null,foldTarget='';
 const media=new Map();
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const palettes={left:['#44212b','#693440','#180f16','#b99186','#cbb698'],right:['#343c41','#525b60','#141b20','#a4b6bb','#c1c9c5'],center:['#152f4d','#294b70','#0b1728','#7facca','#abc9d7'],mao:['#59251e','#843a2a','#230e0c','#c88466','#d9b88b'],dem:['#493244','#73516a','#20151f','#c19dad','#ddc3c6'],lib:['#164052','#27617b','#0b202b','#88bdca','#b4d9d9'],pop:['#504221','#776036','#241f12','#b5a064','#d6c18c'],nation:['#3d2d22','#634732','#1c1712','#ad916e','#cebb99']};
 const tones=Object.fromEntries(Object.entries(palettes).map(([id,p])=>[id,p[3]]));

 const arrow=n=>n===0?'—':(n>0?'↑':'↓').repeat(Math.min(3,Math.abs(n)));
 const mod=n=>(n%data.thoughts.length+data.thoughts.length)%data.thoughts.length;
 function face(t){
  const style=['stone','metal','shadow','ink','light'].map((k,j)=>`--${k}:${palettes[t.id][j]}`).join(';');
  const scene=SocietyArt.left(t,data.levels,data.societyUI.labels,data.societyUI.textColors).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'');
  const key=JSON.stringify([t.id,t.levels,t.trends,data.levels,data.societyUI.labels,data.societyUI.textColors,...(t.id==='left'&&window.SocietyLeft?[SocietyLeft.version]:[])]);
  return `<div data-texture-key="${esc(key)}" class="soc-ring-face soc-left-art" data-face="${t.id}" style="${style}" aria-hidden="true"><svg class="soc-scene-library" width="0" height="0"><defs><g id="soc-scene-${t.id}" class="soc-left-art"><g class="soc-engraving">${scene}</g></g></defs></svg>${Array.from({length:40},()=>`<i class="soc-surface-strip"><svg class="soc-engraving" preserveAspectRatio="none"><use href="#soc-scene-${t.id}"/></svg></i>`).join('')}</div>`;
 }
 function requestStep(step){pendingStep=step;onSelect(data.thoughts[mod(step)].id);}
 function mount(target,d,id,callback){
  unmount();root=target;data=d;onSelect=callback;selected=id;expanded=null;
  document.querySelector('.mast h1').innerHTML=ChinaText.render(data.societyUI.title,data.societyUI.textColors?.title);
  plannedStep=data.thoughts.findIndex(t=>t.id===id);
  const total=data.thoughts.reduce((s,t)=>s+Number(t.share),0);
  root.innerHTML=`<div class="social-console"><section class="soc-symbolic" aria-label="选中思潮"><h2 class="soc-main-title"></h2><figure class="soc-image-slot soc-image-portrait" aria-hidden="true"></figure><div class="soc-scene-frame"><div class="soc-cylinder-viewport" tabindex="0" aria-label="转动中央主体"><div class="soc-cylinder">${data.thoughts.map(face).join('')}</div></div></div><figure class="soc-image-slot soc-image-landscape" aria-hidden="true"></figure><blockquote class="soc-quotation"><p></p><cite></cite></blockquote></section><section class="soc-atlas" aria-label="八种社会思潮"><div class="soc-folds">${data.thoughts.map((t,i)=>`<article class="soc-fold" data-id="${t.id}" style="--tone:${tones[t.id]};--wash:color-mix(in srgb,${tones[t.id]} 12%,#071115)" data-direction="${i%2?'up':'down'}"><div class="soc-fold-frame"></div><div class="soc-fold-content"><div class="soc-fold-art">${SocietyArt.art(t.id,'fold')}</div><div class="soc-expanded-art">${SocietyArt.art(t.id,'expanded')}</div><div class="soc-fold-heading"><h3>${ChinaText.render(t.name,t.textColors?.name)}</h3><b>${Number(t.share)}<small>%</small></b></div><div class="soc-fold-reading" id="soc-reading-${t.id}"><h4>${ChinaText.render(data.societyUI.roots,data.societyUI.textColors?.roots)}</h4><p>${ChinaText.render(t.roots,t.textColors?.roots)}</p><h4>${ChinaText.render(data.societyUI.positions,data.societyUI.textColors?.positions)}</h4><p>${ChinaText.render(t.positions,t.textColors?.positions)}</p></div></div><button class="soc-fold-select" data-soc-select="${t.id}" aria-label="${esc(t.name)} ${t.share}%" aria-expanded="false" aria-controls="soc-reading-${t.id}"></button><button class="soc-fold-close" aria-label="收起${esc(t.name)}">×</button></article>`).join('')}</div><div class="soc-edge-label" hidden></div><div class="soc-share-ribbon" aria-label="思潮占比">${data.thoughts.map(t=>`<span style="flex:${t.share};background:${tones[t.id]}" title="${esc(t.name)} ${t.share}%" data-share="${t.share}" data-ratio="${total?Number(t.share)/total:0}"></span>`).join('')}</div></section></div>`;
  cylinder=new SocietyCylinder(root.querySelector('.soc-cylinder-viewport'),plannedStep,requestStep);
  root.querySelector('.soc-symbolic').addEventListener('keydown',e=>{
   if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();requestStep(plannedStep+(e.key==='ArrowRight'?1:-1));}
   if(e.key==='Home'||e.key==='End'){e.preventDefault();onSelect(data.thoughts[e.key==='Home'?0:data.thoughts.length-1].id);}
  });
  const folds=root.querySelector('.soc-folds');
  folds.addEventListener('click',e=>{
   const button=e.target.closest('[data-soc-select]');
   if(button){const id=button.dataset.socSelect;expanded=expanded===id?null:id;onSelect(id);syncFolds();}
   if(e.target.closest('.soc-fold-close')){expanded=null;syncFolds();}
  });
  folds.addEventListener('keydown',e=>{
   if(e.key==='Escape'){e.preventDefault();const id=expanded;expanded=null;syncFolds();if(id)root.querySelector(`[data-soc-select="${id}"]`).focus();return;}
   const button=e.target.closest('[data-soc-select]');if(!button)return;
   const buttons=[...root.querySelectorAll('[data-soc-select]')],i=buttons.indexOf(button);
   if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){
    e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?buttons.length-1:mod(i+(e.key==='ArrowRight'?1:-1));
    buttons[n].focus();if(expanded)expanded=buttons[n].dataset.socSelect;onSelect(buttons[n].dataset.socSelect);syncFolds();
   }
  });
  const edgeLabel=root.querySelector('.soc-edge-label');
  const showLabel=e=>{const f=e.target.closest('.soc-fold');if(!f||!expanded||f.dataset.id===expanded)return;edgeLabel.textContent=data.thoughts.find(t=>t.id===f.dataset.id).name;edgeLabel.hidden=false;};
  folds.addEventListener('pointerover',showLabel);folds.addEventListener('focusin',showLabel);
  folds.addEventListener('pointerout',()=>edgeLabel.hidden=true);folds.addEventListener('focusout',()=>edgeLabel.hidden=true);
  foldResize=new ResizeObserver(layoutFolds);foldResize.observe(folds);
  syncFixed();syncFolds();
 }
 function layoutFolds(){
  const folds=root.querySelector('.soc-folds'),panels=[...folds.children];
  const key=folds.clientWidth+':'+expanded;if(key===foldTarget)return;foldTarget=key;
  const geometry=SocietyFoldGeometry(folds.clientWidth,panels.length,panels.findIndex(p=>p.dataset.id===expanded));
  cancelAnimationFrame(foldFrame);
  const paint=edges=>{
   foldGeometry=edges;
   panels.forEach((f,i)=>{
    const {top,bottom}=edges[i],left=Math.min(top[0],bottom[0]),width=Math.max(top[1],bottom[1])-left;
    f.style.left=left+'px';f.style.width=width+'px';
    f.style.setProperty('--reading-inset',Math.max(top[0]-left,bottom[0]-left,12)+12+'px');
    f.style.setProperty('--shape',`polygon(${(top[0]-left)/width*100}% 0,${(top[1]-left)/width*100}% 0,${(bottom[1]-left)/width*100}% 100%,${(bottom[0]-left)/width*100}% 100%)`);
   });
  };
  if(!foldGeometry||matchMedia('(prefers-reduced-motion: reduce)').matches){paint(geometry);return;}
  const from=foldGeometry,start=performance.now();
  const tick=now=>{
   const t=Math.min(1,(now-start)/360),ease=1-Math.pow(1-t,3);
   paint(geometry.map((g,i)=>({top:g.top.map((v,j)=>from[i].top[j]+(v-from[i].top[j])*ease),bottom:g.bottom.map((v,j)=>from[i].bottom[j]+(v-from[i].bottom[j])*ease)})));
   if(t<1)foldFrame=requestAnimationFrame(tick);else foldFrame=0;
  };foldFrame=requestAnimationFrame(tick);
 }
 function syncFolds(){
  root.querySelector('.soc-folds').classList.toggle('has-expanded',!!expanded);
  root.querySelector('.soc-edge-label').hidden=true;
  root.querySelectorAll('.soc-fold').forEach(f=>{
   const open=f.dataset.id===expanded;
   f.classList.toggle('is-expanded',open);f.classList.toggle('is-selected',f.dataset.id===selected);
   f.querySelector('.soc-fold-select').setAttribute('aria-expanded',String(open));
   f.querySelector('.soc-fold-select').setAttribute('aria-pressed',String(f.dataset.id===selected));
   f.querySelector('.soc-fold-reading').inert=!open;
   f.querySelector('.soc-fold-reading').tabIndex=open?0:-1;
   f.querySelector('.soc-fold-close').tabIndex=open?0:-1;
  });layoutFolds();
 }
 function syncFixed(){
  const t=data.thoughts.find(t=>t.id===selected),host=root.querySelector('.social-console'),symbolic=root.querySelector('.soc-symbolic');
  host.dataset.thought=selected;host.style.setProperty('--thought',tones[selected]);
  ['stone','metal','shadow','ink','light'].forEach((k,i)=>symbolic.style.setProperty('--'+k,palettes[selected][i]));
  symbolic.querySelector('.soc-main-title').innerHTML=ChinaText.render(t.name,t.textColors?.name);
  symbolic.querySelector('.soc-quotation p').innerHTML=ChinaText.render(t.quote,t.textColors?.quote);
  symbolic.querySelector('.soc-quotation cite').innerHTML='——'+ChinaText.render(t.quoteSource,t.textColors?.quoteSource);
  symbolic.querySelector('.soc-cylinder-viewport').setAttribute('aria-label',t.name+'；'+data.societyUI.labels.map((label,i)=>label+' '+data.levels[t.levels[i]-1]+' '+arrow(t.trends[i])).join('；'));
  updateMedia();
 }
 function select(id){
  selected=id;const index=data.thoughts.findIndex(t=>t.id===id);
  plannedStep=pendingStep===null?plannedStep+index-mod(plannedStep):pendingStep;pendingStep=null;
  cylinder.to(plannedStep);syncFixed();syncFolds();
 }
 function updateMedia(){
  const slots=media.get(selected)||data.thoughts.find(t=>t.id===selected).media;
  root.querySelectorAll('.soc-image-slot').forEach((el,i)=>{
   const item=slots[i];el.classList.toggle('has-image',!!item);el.setAttribute('aria-hidden',String(!item));
   el.innerHTML=item?`<img src="${esc(item.src)}" alt="${esc(item.alt)}" decoding="async" style="object-position:${item.x??50}% ${item.y??50}%;--photo-gray:${(item.grayscale??35)/100}">`:'';
  });
 }
 function setMedia(id,slots){media.set(id,slots);if(root?.isConnected)updateMedia();}
 function unmount(){cylinder?.destroy();foldResize?.disconnect();cancelAnimationFrame(foldFrame);cylinder=null;foldResize=null;foldGeometry=null;foldTarget='';pendingStep=null;}
 function suspend(){cylinder.stop();foldResize.disconnect();cylinder.resize.disconnect();cancelAnimationFrame(foldFrame);}
 function resume(){cylinder.resize.observe(root.querySelector('.soc-scene-frame'));cylinder.measure();cylinder.to(plannedStep);foldResize.observe(root.querySelector('.soc-folds'));layoutFolds();document.querySelector('.mast h1').innerHTML=ChinaText.render(data.societyUI.title,data.societyUI.textColors?.title);}
 return {mount,select,setMedia,unmount,suspend,resume};
})();
