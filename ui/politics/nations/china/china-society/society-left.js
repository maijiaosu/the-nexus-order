'use strict';
window.SocietyLeft = (() => {
 const version='original-space-20261029-3';
 const path=(d,cl='b-line')=>`<path class="${cl}" d="${d}"/>`;
 const repeat=(n,fn)=>Array.from({length:n},(_,i)=>fn(i)).join('');
 function companion(){
  const hand='M274 392L272 356Q239 347 217 315Q205 295 209 268L220 231Q225 212 234 218Q239 223 233 241L227 269Q235 289 253 300L248 273Q247 262 255 261Q265 264 271 285L286 312Q302 329 294 351L291 386Z';
  return `<defs><clipPath id="left-d3-globe"><circle cx="304" cy="229" r="96"/><path d="${hand}"/><path d="${hand}" transform="translate(608 0) scale(-1 1)"/></clipPath><clipPath id="left-d3-wrist-crop"><rect width="1088" height="350"/></clipPath></defs>`+
   path('M190 167L214 169L209 191L197 204L181 214L174 204L188 188Z','b-stone')+
   path('M254 167L230 169L235 191L247 204L263 214L270 204L256 188Z','b-stone')+
   path('M180 200L200 189M244 189L264 200','b-etch')+
   `<g transform="translate(42.64 -35.11) scale(.59)"><g clip-path="url(#left-d3-wrist-crop)"><image class="soc-left-globe-paint" width="1088" height="848" href="${window.SOCIETY_LEFT_GLOBE}" clip-path="url(#left-d3-globe)"/></g></g>`;
 }
 function chair(){
  return path('M-17 4V-26L2-32L21-26V4L2 11Z','b-metal')+
   path('M21-26L25-28V3L21 4Z','b-shadow')+
   path('M-13-22L2-27L16-22V-2L2 3L-13-2Z','b-stone')+
   path('M-20 7L0 0L24 8L1 16Z','b-light')+
   path('M-20 7V14L1 22L24 15V8M-20 0V9M24 1V10M1 16V22','b-line')+
   path('M-10-18L2-22L13-18M-10-14V-3M13-14V-3M-15 7L1 12L19 8','b-etch')+
   path('M-10-5L1-16M-5-4L8-17','b-etch');
 }
 function refinement(){
  return `<defs>
   <linearGradient id="left-wall" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#542d38"/><stop offset="1" stop-color="#38202b"/></linearGradient>
   <linearGradient id="left-roof" x1="0" y1="0" x2=".5" y2="1"><stop stop-color="#784653"/><stop offset="1" stop-color="#532d3c"/></linearGradient>
   <linearGradient id="left-column" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#9f8976"/><stop offset=".3" stop-color="#d0bb99"/><stop offset=".65" stop-color="#bba586"/><stop offset="1" stop-color="#887460"/></linearGradient>
   </defs>`;
 }
 function architecturalDetail(){
  let s=path('M264 272H451M265 277H451M257 411H454M252 425H459','b-etch');
  s+=repeat(9,i=>{const x=265+i*22;return path(`M${x+1} 275v125M${x+8} 279v119M${x-2} 409h16`,'b-etch')});
  s+=path('M62 282H231M61 369H231M476 322H656M476 421H657M276 188H432M306 142H403','b-etch');
  s+=repeat(7,i=>path(`M${77+i*21} 295v13h10M${77+i*21} 320v13h10`,'b-etch'));
  s+=repeat(8,i=>path(`M${487+i*20} 334v12h9M${487+i*20} 359v12h9M${487+i*20} 384v12h9`,'b-etch'));
  return s;
 }
 function refine(body,t){
  const parts=SocietyBuildings.parts('left');
  body=body.replace(parts.companion,companion());
  let main=parts.main;
  for(let i=0;i<7;i++)main=main.replace(path(`M${282-i*4} ${472+i*7}v-14M${438+i*4} ${472+i*7}v-14`,'b-etch'),'');
  body=body.replace(parts.main,main+architecturalDetail());
  let index=0;
  body=body.replace(/<g data-left-unit="party"[^>]*>[\s\S]*?<\/g><\/g>/g,()=>{
   const i=index++,row=Math.floor(i/3),col=i%3,x=485+col*57-row*9,y=153+row*42,on=i<t.levels[2];
   return `<g data-left-unit="party" data-on="${on}" class="soc-unit ${on?'on':'off'}"><g transform="translate(${x} ${y})">${chair()}</g></g>`;
  });
  return refinement()+`<g class="soc-left-refined">${body}</g>`;
 }
 return {version,refine};
})();
