(()=>{
 const embedded=window.parent!==window;
 if(embedded)document.documentElement.classList.add('in-country-window');
 function close(){if(embedded)window.parent.postMessage({type:'tno-close-politics'},location.protocol==='file:'?'*':location.origin)}
 document.getElementById('close-national').addEventListener('click',close);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!e.defaultPrevented&&!document.querySelector('dialog[open]')){e.preventDefault();close()}});
})();
