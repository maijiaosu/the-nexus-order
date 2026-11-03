/* Country desktops: retain the original DOM and handlers in adjoining windows. */
(()=>{
 const $=s=>document.querySelector(s),saudi=!!$('.saudi-room');
 const room=$('main');document.documentElement.classList.add('nation-desktop');
 if(window.parent!==window){const exit=document.createElement('button');exit.className='room-close';exit.textContent='×';exit.setAttribute('aria-label','关闭内政');exit.onclick=()=>window.parent.postMessage({type:'tno-close-politics'},location.protocol==='file:'?'*':location.origin);room.append(exit)}
 const dock=document.createElement('nav');dock.className='window-dock';dock.setAttribute('aria-label','国家档案');room.append(dock);
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 let z=10;const opened=[];
 function movable(el,handle){
  handle.classList.add('window-grip');
  let drag=null;
  handle.addEventListener('pointerdown',e=>{
   if(e.button!==0||e.target.closest('button,a,input'))return;
   el.getAnimations().forEach(a=>a.cancel());const r=el.getBoundingClientRect();drag={x:e.clientX,y:e.clientY,left:r.left,top:r.top};
   el.style.zIndex=++z;handle.setPointerCapture(e.pointerId);handle.classList.add('dragging');e.preventDefault();
  });
  handle.addEventListener('pointermove',e=>{
   if(!drag)return;const r=el.getBoundingClientRect();
   el.style.left=Math.max(0,Math.min(innerWidth-r.width,drag.left+e.clientX-drag.x))+'px';
   el.style.top=Math.max(0,Math.min(innerHeight-r.height,drag.top+e.clientY-drag.y))+'px';
   el.style.right='auto';el.style.bottom='auto';
  });
  const stop=()=>{drag=null;handle.classList.remove('dragging')};
  handle.addEventListener('pointerup',stop);handle.addEventListener('lostpointercapture',stop);
  el.addEventListener('pointerdown',()=>el.style.zIndex=++z);
  addEventListener('resize',()=>{if(!el.style.left)return;const r=el.getBoundingClientRect();el.style.left=Math.max(0,Math.min(innerWidth-r.width,r.left))+'px';el.style.top=Math.max(0,Math.min(innerHeight-r.height,r.top))+'px'});
 }
 movable(room,room.querySelector('.mast'));
 function register(d,edge='right'){
  d.classList.add('satellite');d.dataset.edge=edge;
  const title=d.querySelector('header h2');if(!title.id)title.id=d.id+'-title';d.setAttribute('aria-labelledby',title.id);
  const show=d.show.bind(d),close=d.close.bind(d);let opener=null;
  movable(d,d.querySelector('header'));
  d.showModal=()=>{
   if(d.open){d.style.zIndex=++z;return;}
   opener=document.activeElement;opened.push(d);show();d.style.zIndex=++z;
   d.getAnimations().forEach(a=>a.cancel());
   d.animate([{transform:edge==='bottom'?'translateY(-100%)':'translateX(-100%)',clipPath:edge==='bottom'?'inset(100% 0 0 0)':'inset(0 0 0 100%)'},{transform:'translate(0,0)',clipPath:'inset(0 0 0 0)'}],{duration:reduced()?0:720,easing:'cubic-bezier(.22,.55,.28,1)'});
   d.querySelector('header button')?.focus();
  };
  d.close=()=>{
   if(!d.open)return;d.getAnimations().forEach(a=>a.cancel());close();
   const i=opened.indexOf(d);if(i>=0)opened.splice(i,1);if(opener?.isConnected)opener.focus();
  };
  d.addEventListener('cancel',e=>{e.preventDefault();d.close()});
 }
 function make(id,title,edge,nodes){
  const d=document.createElement('dialog');d.id=id;
  d.innerHTML=`<header><h2>${title}</h2><button aria-label="关闭${title}">×</button></header><section class="satellite-content"></section>`;
  document.body.append(d);nodes.forEach(n=>d.lastElementChild.append(n));
  d.querySelector('header button').onclick=()=>d.close();register(d,edge);return d;
 }
 function button(title,d,edge='right'){
  const b=document.createElement('button');b.className='press dock-button';b.innerHTML=`${title}<span aria-hidden="true">${edge==='bottom'?'⌄':'›'}</span>`;
  b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls',d.id);b.onclick=()=>d.open?d.close():d.showModal();dock.append(b);return b;
 }
 if(saudi){
  register($('#project-file'));register($('#annual-dialog'));
  const dossier=$('#project-file');
  const projectButton=button('项目档案',dossier);
  projectButton.onclick=()=>{
   if(dossier.open){dossier.close();return;}
   $('#modal-title').textContent=$('#sector-title').textContent;
   $('#modal-body').innerHTML='<div class="file-photo">'+$('#sector-photo').innerHTML+'</div>'+$('#project-document').innerHTML;
   $('#modal-body').querySelector('#open-strategy')?.remove();dossier.showModal();
  };
  const energy=make('energy-window','能源与建设','bottom',[$('.portfolio-brief')]);
  const shelf=$('.institution-shelf');const detail=shelf.querySelector('p');energy.lastElementChild.append(detail);
  shelf.querySelector('h3').replaceWith(Object.assign(document.createElement('button'),{className:'energy-open',textContent:'能源与建设  ⌄',onclick:()=>energy.showModal()}));
  const ledger=$('.national-ledger');ledger.classList.add('compact-ledger');
  dock.prepend(ledger);
  $('.fund-footer').remove();
  const key=$('#annual-toggle');key.textContent='年度账册 ›';
 }else{
  register($('#file'));
  const records=make('events-window','事件档案','bottom',[$('.records')]);
  const civil=make('civil-window','平民与公共设施','right',[$('.civilian-strip'),$('.khartoum-photo')]);
  button('事件档案',records,'bottom');button('平民与公共设施',civil);
  const move=button('地区档案',$('#file'));move.onclick=()=>$('#open-region').click();
  const summary=make('region-window','地区概况','right',[$('#region-topics')]);
  const btn=document.createElement('button');btn.className='press region-overview';btn.textContent='地区概况 ›';btn.onclick=()=>{summary.querySelector('header h2').textContent=$('#region-name').textContent;summary.showModal()};
  $('.dispatch').append(btn);
 }
 document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if(opened.length){e.preventDefault();e.stopImmediatePropagation();opened.reduce((a,b)=>+a.style.zIndex>+b.style.zIndex?a:b).close();}
 },true);
})();
