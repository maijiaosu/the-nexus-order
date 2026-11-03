'use strict';
window.SocietySurface=class {
 static async texture(face){
  const cached=window.SOCIETY_TEXTURES?.[face.dataset.face];
  if(cached?.key===face.dataset.textureKey){const image=new Image();image.src=cached.src;await image.decode();return image;}
  const original=face.querySelector('.soc-scene-library g'),clone=original.cloneNode(true);
  const source=[original,...original.querySelectorAll('*')],dest=[clone,...clone.querySelectorAll('*')];
  const props=['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-dasharray','fill-opacity','stroke-opacity','opacity','font-family','font-size','font-weight','letter-spacing','text-anchor','paint-order','color'];
  source.forEach((el,i)=>{const cs=getComputedStyle(el);dest[i].setAttribute('style',props.filter(p=>!(el.tagName==='tspan'&&['stroke','stroke-width','paint-order'].includes(p))).map(p=>`${p}:${cs.getPropertyValue(p).replace(/url\(["']?[^)"']*#([^)'" ]+)["']?\)/g,'url(#$1)')}`).join(';'));});
  const texts=[...original.querySelectorAll('text')];
  for(const el of clone.querySelectorAll('text'))el.remove();
  await Promise.all([...original.querySelectorAll('text,tspan')].map(el=>document.fonts.load(getComputedStyle(el).font,el.textContent))); 
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1110" viewBox="0 0 720 555">${new XMLSerializer().serializeToString(clone)}</svg>`;
  const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const image=new Image();image.src=url;await image.decode();URL.revokeObjectURL(url);
  const canvas=document.createElement('canvas');canvas.width=1440;canvas.height=1110;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);ctx.scale(2,2);
  for(const text of texts){
   const runs=[];const walk=el=>{for(const node of el.childNodes){if(node.nodeType===Node.TEXT_NODE){const cs=getComputedStyle(el);ctx.font=cs.font;runs.push({text:node.textContent,font:cs.font,fill:cs.fill,stroke:cs.stroke,width:ctx.measureText(node.textContent).width,lineWidth:parseFloat(cs.strokeWidth)});}else walk(node);}};walk(text);
   const cs=getComputedStyle(text),width=runs.reduce((n,r)=>n+r.width,0),y=Number(text.getAttribute('y'));let start=Number(text.getAttribute('x'))-(cs.textAnchor==='end'?width:cs.textAnchor==='middle'?width/2:0);
   for(const stroke of [true,false]){let x=start;for(const r of runs){ctx.font=r.font;ctx.lineWidth=r.lineWidth;ctx.lineJoin='round';if(stroke&&r.stroke!=='none'){ctx.strokeStyle=r.stroke;ctx.strokeText(r.text,x,y);}else if(!stroke){ctx.fillStyle=r.fill;ctx.fillText(r.text,x,y);}x+=r.width;}}
  }
  return canvas;
 }
 constructor(cylinder){
  this.owner=cylinder;this.canvas=document.createElement('canvas');this.canvas.className='soc-gpu-surface';this.gl=this.canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});
  this.ready=this.prepare();
 }
 async prepare(){
  if(this.owner.faces.some(face=>window.SOCIETY_TEXTURES?.[face.dataset.face]?.key!==face.dataset.textureKey)&&document.readyState!=='complete')await new Promise(resolve=>window.addEventListener('load',resolve,{once:true}));
  const gl=this.gl;
  if(!gl)return;
  const shader=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
  this.program=gl.createProgram();
  gl.attachShader(this.program,shader(gl.VERTEX_SHADER,`attribute vec2 a;varying vec2 uv;uniform float turn,radius,height,perspective,width;void main(){uv=a;float theta=turn+(a.x-.5)*.7853981634;float x=sin(theta)*radius;float z=cos(theta)*radius-radius;gl_Position=vec4(x/(width*.5),1.-2.*a.y,0.,1.-z/perspective);}`));
  gl.attachShader(this.program,shader(gl.FRAGMENT_SHADER,`precision mediump float;varying vec2 uv;uniform sampler2D image;uniform float opacity;void main(){vec4 c=texture2D(image,uv);gl_FragColor=vec4(c.rgb,c.a*opacity);}`));
  gl.linkProgram(this.program);gl.useProgram(this.program);
  this.uniforms=Object.fromEntries(['turn','radius','height','perspective','width','opacity'].map(k=>[k,gl.getUniformLocation(this.program,k)]));
  this.buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);const vertices=[];
  for(let i=0;i<64;i++){const a=i/64,b=(i+1)/64;vertices.push(a,0,a,1,b,0,b,0,a,1,b,1);}
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);const attr=gl.getAttribLocation(this.program,'a');gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);
  gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
  this.textures=[];
  const images=await Promise.all(this.owner.faces.map(face=>SocietySurface.texture(face)));
  if(this.disposed)return;
  for(const image of images){
   const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);this.textures.push(texture);
  }
  this.owner.viewport.append(this.canvas);this.owner.ring.classList.add('is-textured');this.active=true;for(const strips of this.owner.slices)for(const strip of strips)strip.remove();this.owner.slices=this.owner.faces.map(()=>[]);this.paint();
 }
 paint(){
  if(!this.active)return;const c=this.owner,gl=this.gl,scale=Math.min(devicePixelRatio,2);
  const w=Math.round(c.width*scale),h=Math.round(c.width*555/720*scale);
  if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;gl.viewport(0,0,w,h);}
  gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(this.program);
  for(const [key,value] of Object.entries({width:c.width,height:c.width*555/720,radius:c.radius,perspective:Math.max(650,c.width*1.3)}))gl.uniform1f(this.uniforms[key],value);
  this.textures.forEach((texture,i)=>{const turn=(i*c.unit-c.angle)*Math.PI/180,opacity=Math.min(1,Math.max(0,(Math.cos(turn)-.72)/.28));if(!opacity)return;gl.uniform1f(this.uniforms.turn,turn);gl.uniform1f(this.uniforms.opacity,opacity);gl.bindTexture(gl.TEXTURE_2D,texture);gl.drawArrays(gl.TRIANGLES,0,384);});
 }
 destroy(){this.disposed=true;if(this.gl){for(const t of this.textures||[])this.gl.deleteTexture(t);this.gl.deleteBuffer(this.buffer);this.gl.deleteProgram(this.program);}this.canvas.remove();}
};
