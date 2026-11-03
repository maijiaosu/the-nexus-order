/* Match the existing national desktop: drag, close and keep the map visible. */
(()=>{
 'use strict';
 const room=document.querySelector('.desktop'),mast=document.querySelector('.mast');
 if(!room||!mast)return;
 const embedded=window.parent!==window;
 const close=document.createElement('button');
 close.type='button';close.className='room-close';close.textContent='×';
 close.setAttribute('aria-label','关闭议会');mast.append(close);
 function leave(){
  if(embedded)window.parent.postMessage({type:'tno-close-politics'},location.protocol==='file:'?'*':location.origin);
 }
 close.hidden=!embedded;close.addEventListener('click',leave);
 // The bundle clears a selected party first; a subsequent Escape closes this window.
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape'||event.defaultPrevented)return;
  event.preventDefault();event.stopPropagation();leave();
 });
 let drag=null;
 function clamp(left,top){
  const rect=room.getBoundingClientRect();
  room.style.left=Math.max(0,Math.min(innerWidth-rect.width,left))+'px';
  room.style.top=Math.max(0,Math.min(innerHeight-rect.height,top))+'px';
 }
 mast.addEventListener('pointerdown',event=>{
  if(event.button!==0||event.target.closest('button,a,input,select'))return;
  const rect=room.getBoundingClientRect();
  drag={x:event.clientX,y:event.clientY,left:rect.left,top:rect.top};
  mast.setPointerCapture(event.pointerId);mast.classList.add('dragging');event.preventDefault();
 });
 mast.addEventListener('pointermove',event=>{if(drag)clamp(drag.left+event.clientX-drag.x,drag.top+event.clientY-drag.y);});
 const stop=()=>{drag=null;mast.classList.remove('dragging');};
 mast.addEventListener('pointerup',stop);mast.addEventListener('lostpointercapture',stop);
 mast.addEventListener('dblclick',event=>{if(!event.target.closest('button,a')){room.style.removeProperty('left');room.style.removeProperty('top');}});
 addEventListener('resize',()=>{if(room.style.left){const rect=room.getBoundingClientRect();clamp(rect.left,rect.top);}});
})();
