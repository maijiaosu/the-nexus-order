'use strict';
// Shared window geometry and controls survive page changes and map visits.
window.ChinaWindow=(()=>{
 const host=document.getElementById('main-window');let drag;
 const compact=()=>matchMedia('(max-width:700px) and (orientation:portrait)').matches;
 function place(left,top){
  if(compact())return;
  const box=host.getBoundingClientRect();
  host.style.setProperty('--china-left',Math.max(50,Math.min(innerWidth-box.width-10,left))+'px');
  host.style.setProperty('--china-top',Math.max(12,Math.min(innerHeight-box.height-12,top))+'px');
 }
 function reset(){host.style.removeProperty('--china-left');host.style.removeProperty('--china-top');drag=null;}
 function close(){
  if(parent!==window)parent.postMessage({type:'tno-close-politics'},location.protocol==='file:'?'*':location.origin);
  else location.href=new URL('../../../../../index.html',document.baseURI).href;
 }
 function dragMessage(data){
  if(data.phase==='reset'){reset();return;}
  if(data.phase==='end'){drag=null;return;}
  if(compact()||!Number.isFinite(data.x)||!Number.isFinite(data.y))return;
  if(data.phase==='start'){const r=host.getBoundingClientRect();drag={x:data.x,y:data.y,left:r.left,top:r.top};}
  else if(data.phase==='move'&&drag)place(drag.left+data.x-drag.x,drag.top+data.y-drag.y);
 }
 function attachDrag(grip){
  grip.addEventListener('pointerdown',event=>{
   if(event.button||event.target.closest('button,a')||compact())return;
   grip.setPointerCapture(event.pointerId);dragMessage({phase:'start',x:event.screenX,y:event.screenY});event.preventDefault();
  });
  grip.addEventListener('pointermove',event=>{if(grip.hasPointerCapture(event.pointerId))dragMessage({phase:'move',x:event.screenX,y:event.screenY});});
  for(const type of ['pointerup','lostpointercapture'])grip.addEventListener(type,()=>dragMessage({phase:'end'}));
  grip.addEventListener('dblclick',event=>{if(!event.target.closest('button,a'))reset();});
 }
 host.querySelector('.china-close').addEventListener('click',close);
 addEventListener('resize',()=>{if(host.style.getPropertyValue('--china-left')){const r=host.getBoundingClientRect();place(r.left,r.top);}});
 addEventListener('message',event=>{
  if(event.source!==parent||(location.protocol!=='file:'&&event.origin!==location.origin)||event.data?.type!=='tno-china-visibility')return;
  dispatchEvent(new CustomEvent('china-window-visibility',{detail:event.data.visible===true}));
 });
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!event.defaultPrevented&&!document.querySelector('dialog[open]')){event.preventDefault();close();}
 });
 return {place,reset,close,dragMessage,attachDrag};
})();
