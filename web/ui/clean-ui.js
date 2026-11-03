/* Presentation copy only: preserve data keys, values, URLs and event bindings. */
(()=>{
 const skip='script,style,code,pre,textarea,[contenteditable],#map';
 const clean=value=>value.replace(/\s*[·•]\s*/g,' ').replace(/(\d{4})\s+年/g,'$1年');
 function visit(node){
  if(node.nodeType===3){if(node.parentElement?.closest(skip))return;const text=clean(node.nodeValue);if(text!==node.nodeValue)node.nodeValue=text;return}
  if(node.nodeType!==1||node.matches(skip))return;
  for(const name of ['title','aria-label','alt']){const value=node.getAttribute(name);if(value){const text=clean(value);if(text!==value)node.setAttribute(name,text)}}
  for(const child of node.childNodes)visit(child);
 }
 visit(document.body);
 new MutationObserver(records=>{
  const roots=new Set();
  for(const r of records){if(r.type==='childList')r.addedNodes.forEach(n=>roots.add(n));else roots.add(r.target)}
  for(const n of roots)if(n.isConnected)visit(n);
 }).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','alt']});
})();
