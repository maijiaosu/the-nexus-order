(()=>{
 const art=new URL("tno-skin-assets/",document.currentScript.src).href;
 function decorateTension(){
  const scale=document.querySelector('#wb-body>.wb-scale');
  if(!scale)return;
  const tension=Number(scale.querySelector('.on i')?.textContent);
  if(!Number.isInteger(tension)||tension<1||tension>5)return;
  // Danger increases in the app; original DEFCON numbers run in reverse.
  const defcon=6-tension;
  // Align danger descriptions with the original lamp, highest danger at top.
  [...scale.children].reverse().forEach(row=>scale.append(row));
  const board=document.createElement('div');board.className='tension-instrument';
  board.innerHTML='<div class="tension-map"><img src="'+art+'tension-map.png" alt=""><span class="tension-map-label">紧张度</span></div><div class="tension-controls"><img class="defcon-lamp" src="'+art+'defcon-'+defcon+'.png" alt="DEFCON '+defcon+'"></div>';
  scale.replaceWith(board);board.querySelector('.tension-controls').append(scale);
  document.querySelector('#wb-body').scrollTop=0;
 }
 new MutationObserver(decorateTension).observe(document.querySelector('#wb-body'),{childList:true});
 decorateTension();
})();
