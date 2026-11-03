/* Host bridge only; preserves native panel interactions. */
(()=>{
 if(window.parent===window)return;
 document.documentElement.classList.add('in-country-window');
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const dialogs=[...document.querySelectorAll('dialog[open]')];
  const dialog=dialogs.sort((a,b)=>(+b.style.zIndex||0)-(+a.style.zIndex||0))[0];
  if(dialog){event.preventDefault();event.stopImmediatePropagation();dialog.close();return;}
  event.preventDefault();event.stopPropagation();
  window.parent.postMessage({type:'tno-close-politics'},location.protocol==='file:'?'*':location.origin);
 },true);
})();
