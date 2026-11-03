'use strict';
window.SocietyCylinder=class {
 constructor(viewport,index,onCommit){
  this.viewport=viewport;this.ring=viewport.querySelector('.soc-cylinder');
  this.faces=[...this.ring.children];this.slices=this.faces.map(face=>[...face.querySelectorAll('.soc-surface-strip')]);this.unit=360/this.faces.length;
  this.angle=index*this.unit;this.target=index;this.onCommit=onCommit;this.frame=0;
  this.motion=matchMedia('(prefers-reduced-motion: reduce)');
  this.resize=new ResizeObserver(()=>this.measure());this.resize.observe(viewport.parentElement);
  this.events=new AbortController();const signal=this.events.signal;
  viewport.addEventListener('pointerdown',e=>this.grab(e),{signal});
  viewport.addEventListener('pointermove',e=>this.drag(e),{signal});
  viewport.addEventListener('pointerup',e=>this.release(e),{signal});
  viewport.addEventListener('pointercancel',e=>this.release(e),{signal});
  viewport.addEventListener('wheel',e=>{
   const dx=e.shiftKey?e.deltaY:e.deltaX;
   if(Math.abs(dx)<Math.abs(e.shiftKey?e.deltaX:e.deltaY))return;
   e.preventDefault();const now=performance.now();
   if(now-this.wheelAt>180)this.wheelDistance=0;
   this.wheelAt=now;this.wheelDistance=(this.wheelDistance||0)+dx;
   if(Math.abs(this.wheelDistance)>65&&now-(this.wheelCommitAt||0)>350){
    this.onCommit(this.target+Math.sign(this.wheelDistance));this.wheelDistance=0;this.wheelCommitAt=now;
   }
  },{passive:false,signal});
  this.measure();this.surface=new SocietySurface(this);
 }
 measure(){
  const frame=this.viewport.parentElement;
  if(!frame.clientWidth||!frame.clientHeight)return;
  this.width=Math.min(frame.clientWidth,frame.clientHeight*720/555);
  const height=this.width*555/720;
  this.viewport.style.width=this.width+'px';this.viewport.style.height=height+'px';
  this.radius=this.width/(2*Math.sin(Math.PI/this.faces.length));
  this.viewport.style.perspective=Math.max(650,this.width*1.3)+'px';
  const arcWidth=this.radius*this.unit*Math.PI/180;
  if(!this.surface?.active)this.faces.forEach((face,i)=>{
   face.style.transform=`rotateY(${i*this.unit}deg)`;
   this.slices[i].forEach((strip,j)=>{
    const count=this.slices[i].length,width=arcWidth/count+.6,fraction=(j+.5)/count;
    strip.style.width=width+'px';strip.style.marginLeft=-width/2+'px';
    strip.style.transform=`rotateY(${(fraction-.5)*this.unit}deg) translateZ(${this.radius}px)`;
    const sourceWidth=width/arcWidth*720,sourceX=fraction*720-sourceWidth/2;
    strip.querySelector('svg').setAttribute('viewBox',`${sourceX} 0 ${sourceWidth} 555`);
   });
  });
  this.paint();
 }
 paint(){
  if(this.surface?.active){this.surface.paint();this.ring.dataset.angle=this.angle.toFixed(3);this.ring.dataset.front=String(((Math.round(this.angle/this.unit)%this.faces.length)+this.faces.length)%this.faces.length);return;}
  this.ring.style.transform=`translateZ(${-this.radius}px) rotateY(${-this.angle}deg)`;
  this.ring.dataset.angle=this.angle.toFixed(3);
  const front=((Math.round(this.angle/this.unit)%this.faces.length)+this.faces.length)%this.faces.length;
  this.ring.dataset.front=String(front);
  this.faces.forEach((face,i)=>{
   const facing=Math.cos((i*this.unit-this.angle)*Math.PI/180);
   const opacity=String(Math.min(1,Math.max(0,(facing-.72)/.28)));
   this.slices[i].forEach(strip=>strip.style.opacity=opacity);
   face.inert=i!==front;face.setAttribute('aria-hidden',String(i!==front));
  });
 }
 stop(){cancelAnimationFrame(this.frame);this.frame=0;}
 to(step){
  this.stop();this.target=step;const from=this.angle,to=step*this.unit;
  const distance=Math.abs(to-from)/this.unit;
  this.viewport.classList.toggle('is-turning',distance>.001);
  if(this.motion.matches||distance<.001){this.angle=to;this.paint();this.viewport.classList.remove('is-turning');return;}
  const duration=420+180*distance,start=performance.now();
  const tick=now=>{
   const t=Math.min(1,(now-start)/duration),ease=(1-Math.cos(Math.PI*t))/2;
   this.angle=from+(to-from)*ease;this.paint();
   if(t<1)this.frame=requestAnimationFrame(tick);
   else{this.frame=0;this.viewport.classList.remove('is-turning');}
  };
  this.frame=requestAnimationFrame(tick);
 }
 grab(e){
  if(e.button!==0||e.target.closest('button,a'))return;
  this.stop();this.pointer={id:e.pointerId,x:e.clientX,y:e.clientY,angle:this.angle,moved:false};
  this.viewport.setPointerCapture(e.pointerId);
 }
 drag(e){
  const p=this.pointer;if(!p||p.id!==e.pointerId)return;
  const dx=e.clientX-p.x;
  if(!p.moved&&Math.abs(dx)<5)return;
  p.moved=true;this.viewport.classList.add('is-turning');
  this.angle=p.angle-dx/this.width*this.unit*1.25;this.paint();
 }
 release(e){
  const p=this.pointer;if(!p||p.id!==e.pointerId)return;
  this.pointer=null;
  if(this.viewport.hasPointerCapture(e.pointerId))this.viewport.releasePointerCapture(e.pointerId);
  this.onCommit(Math.round(this.angle/this.unit));
 }
 destroy(){this.surface?.destroy();this.stop();this.resize.disconnect();this.events.abort();}
};
window.SocietyFoldGeometry=(width,count,active)=>{
 const sliver=9,inset=active<0?Math.min(11,width/count*.14):Math.min(33,width*.065);
 let top=[],bottom=[];
 if(active<0){
  const unit=(width-2*inset)/count;
  for(let i=0;i<=count;i++){const edge=inset+i*unit,shift=i%2?inset:-inset;top.push(edge+shift);bottom.push(edge-shift);}
 }else{
  const direction=active%2?-1:1;
  for(let i=0;i<=count;i++){
   const edge=i<=active?inset+i*sliver:width-inset-(count-i)*sliver;
   const shift=(i<=active?-inset:inset)*direction;
   top.push(edge+shift);bottom.push(edge-shift);
  }
 }
 return Array.from({length:count},(_,i)=>{
  const left=Math.min(top[i],bottom[i]),right=Math.max(top[i+1],bottom[i+1]);
  const span=right-left;
  return {left,width:span,top:[top[i],top[i+1]],bottom:[bottom[i],bottom[i+1]],shape:`polygon(${(top[i]-left)/span*100}% 0,${(top[i+1]-left)/span*100}% 0,${(bottom[i+1]-left)/span*100}% 100%,${(bottom[i]-left)/span*100}% 100%)`};
 });
};
