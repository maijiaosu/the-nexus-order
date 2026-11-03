 'use strict';
// Clip in world space, preserving material coordinates across the near plane.
// A floor crossing behind the eye must not make its visible portion disappear.
function clipHallMesh(mesh,project,near=30,projected){
  const points=projected||mesh.p.map(project);
  let inside=0;for(let i=0;i<points.length;i++)if(points[i][2]>=near)inside++;
  if(inside===points.length)return mesh;
  if(!inside)return null;
  const p=[],uv=[],shades=[];
  for(let i=0;i<mesh.p.length;i++){
    const j=(i+mesh.p.length-1)%mesh.p.length,a=points[j][2],b=points[i][2];
    if((a>=near)!==(b>=near)){
      const t=(near-a)/(b-a);
      p.push(mesh.p[j].map((v,k)=>v+(mesh.p[i][k]-v)*t));
      uv.push([0,1].map(k=>(mesh.uv?.[j]?.[k]||0)+((mesh.uv?.[i]?.[k]||0)-(mesh.uv?.[j]?.[k]||0))*t));
      shades.push((mesh.shades?.[j]??1)+((mesh.shades?.[i]??1)-(mesh.shades?.[j]??1))*t);
    }
    if(b>=near){p.push(mesh.p[i]);uv.push(mesh.uv?.[i]||[0,0]);shades.push(mesh.shades?.[i]??1);}
  }
  return p.length>=3?{...mesh,p,uv,shades}:null;
}

function mountHallDepth(root){
 const perfStart=performance.now();
  window.disposeChinaHall?.();
  const canvas=root.querySelector('.hall-depth-canvas'),scene=root.querySelector('.politics-native'),data=window.chinaHallRenderData;
  if(!canvas||!data)return;
  canvas.tabIndex=-1;
  const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,preserveDrawingBuffer:true});
  if(!gl)throw new Error('会场需要 WebGL 深度缓冲');
  const shader=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s};
  const vs=shader(gl.VERTEX_SHADER,`
    attribute vec4 pos;attribute vec3 color;attribute float party;attribute vec3 tex;attribute float objectId;
    attribute vec3 worldPosition;attribute vec3 normal;
    varying vec3 world;varying vec3 surfaceNormal;varying float cameraDepth;varying float identity;
    uniform float viewHeight;uniform float pickPass;
    varying vec3 col;varying float group;varying vec3 uv;
    void main(){
      gl_Position=pos;gl_Position.y=pos.w-(pos.w-pos.y)*500.0/viewHeight;
      if(pickPass>2.5&&pickPass<3.5){vec3 l=normalize(vec3(1.0,1.6,.6));vec3 r=normalize(cross(vec3(0,1,0),l));vec3 u=cross(l,r);gl_Position=vec4(dot(worldPosition,r)/2100.0,dot(worldPosition,u)/2100.0,-dot(worldPosition,l)/2100.0,1);}
      col=color;group=party;uv=tex;identity=objectId;world=worldPosition;surfaceNormal=normal;cameraDepth=pos.w;
    }`);
  const fs=shader(gl.FRAGMENT_SHADER,`precision highp float;
    varying vec3 col; varying float group; varying vec3 uv; varying float identity; uniform float pickPass;
    varying vec3 world;varying vec3 surfaceNormal;varying float cameraDepth;
    uniform vec2 resolution;uniform vec3 cameraEye;uniform float lightReady;uniform sampler2D sceneDepth;uniform sampler2D lightDepth;
    uniform float focus; uniform sampler2D atlas; uniform sampler2D wall;
    uniform sampler2D stageAtlas; uniform sampler2D emblem; uniform sampler2D coffer; uniform sampler2D banner;
    vec3 packDepth(float d){vec3 q=fract(min(d,.999999)*vec3(1.0,255.0,65025.0));return q-q.yzz*vec3(1.0/255.0,1.0/255.0,0);}
    float unpackDepth(vec3 q){return dot(q,vec3(1,1.0/255.0,1.0/65025.0));}
    float visibility(vec3 normal){
      vec3 l=normalize(vec3(1.0,1.6,.6)),r=normalize(cross(vec3(0,1,0),l)),u=cross(l,r);
      vec2 st=vec2(dot(world,r),dot(world,u))/4200.0+.5;float z=.5-dot(world,l)/4200.0;
      float sum=0.0,bias=.0008+.0012*(1.0-max(dot(normal,l),0.0));
      for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++){
        float d=unpackDepth(texture2D(lightDepth,st+vec2(float(x),float(y))/2048.0).rgb);sum+=z-bias<=d?1.0:0.0;
      }return sum/9.0;
    }
    float contactAO(){
      vec2 st=gl_FragCoord.xy/resolution;float sum=0.0;
      for(int i=0;i<8;i++){
        float a=float(i)*.785398;vec2 o=vec2(cos(a),sin(a));
        float other=unpackDepth(texture2D(sceneDepth,st+o*7.0/resolution).rgb)*5000.0;
        float delta=cameraDepth-other;
        sum+=smoothstep(1.5,8.0,delta)*(1.0-smoothstep(20.0,80.0,delta));
      }return 1.0-.34*sum/8.0;
    }
    void main(){
      if(uv.z>11.5&&uv.z<12.5&&texture2D(emblem,uv.xy).a<.35)discard;
      if(pickPass>4.5){gl_FragColor=vec4(normalize(surfaceNormal)*.5+.5,(floor(uv.z+.5)*8.0+group)/255.0);return;}
      if(pickPass>3.5){gl_FragColor=vec4(uv.z>15.5&&uv.z<16.5?vec3(1.0,.86,.58):vec3(0),1);return;}
      if(pickPass>2.5){gl_FragColor=vec4(packDepth(gl_FragCoord.z),1);return;}
      if(pickPass>1.5){gl_FragColor=vec4(packDepth(cameraDepth/5000.0),1);return;}
      if(pickPass>.5){float id=floor(identity+.5);gl_FragColor=vec4(mod(id,256.0)/255.0,floor(id/256.0)/255.0,0,1);return;}
      float dim=(focus>0.5&&group>0.5&&abs(group-focus)>0.5)?0.25:1.0;
      // Sparse technical line drawing: opaque faces remain empty navy.
      // Silhouettes and hard creases are drawn from the normal/depth pass.
      vec3 lineColor=vec3(.62,.73,.71),ground=vec3(.024,.055,.067);
      if(uv.z>8.5&&uv.z<9.5)lineColor=vec3(.82,.34,.34);
      if(uv.z>9.5&&uv.z<10.5)lineColor=vec3(.80,.68,.40);
      if(uv.z>11.5&&uv.z<12.5)lineColor=vec3(.91,.73,.37);
      if(uv.z>13.5&&uv.z<14.5)lineColor=vec3(.68,.62,.39);
      if(uv.z>14.5&&uv.z<15.5)lineColor=vec3(.84,.82,.70);
      if(uv.z>15.5&&uv.z<16.5)lineColor=vec3(.79,.77,.56);
      if(uv.z>16.5&&uv.z<17.5)lineColor=vec3(.83,.70,.41);
      float detail=0.0;
      if(uv.z>14.5&&uv.z<15.5)detail=smoothstep(.58,.78,dot(texture2D(banner,vec2(uv.x,uv.y*.5)).rgb,vec3(.299,.587,.114)));
      if(uv.z>16.5&&uv.z<17.5)detail=1.0-smoothstep(.35,.58,dot(texture2D(banner,uv.xy).rgb,vec3(.299,.587,.114)));
      if(uv.z>11.5&&uv.z<12.5){vec3 t=texture2D(emblem,uv.xy).rgb;float e=length(t-texture2D(emblem,uv.xy+vec2(.003,0)).rgb)+length(t-texture2D(emblem,uv.xy+vec2(0,.003)).rgb);detail=smoothstep(.10,.40,e)*.8;}
      if(uv.z>13.5&&uv.z<14.5){float t=dot(texture2D(coffer,mix(vec2(.16),vec2(.84),uv.xy)).rgb,vec3(.299,.587,.114));detail=smoothstep(.48,.72,t)*.3;}
      if(uv.z>15.5&&uv.z<16.5)detail=.62;
      if(uv.z>4.5&&uv.z<5.5){
        vec2 tile=fract(vec2(uv.x*6.0,uv.y*16.0));
        float seam=min(min(tile.x,1.0-tile.x),min(tile.y,1.0-tile.y));
        detail=(1.0-smoothstep(.004,.012,seam))*.34;lineColor=vec3(.38,.49,.50);
      }
      if(uv.z>5.5&&uv.z<6.5){
        vec2 panel=vec2(fract(uv.x*5.0),uv.y);
        float vertical=min(panel.x,1.0-panel.x);
        float frame=min(abs(panel.x-.09),abs(panel.x-.91));
        float crossbar=min(abs(panel.y-.12),abs(panel.y-.84));
        detail=max(1.0-smoothstep(.006,.018,vertical),
          max((1.0-smoothstep(.008,.016,frame))*step(.12,panel.y)*step(panel.y,.84),
              (1.0-smoothstep(.005,.012,crossbar))*step(.09,panel.x)*step(panel.x,.91)))*.6;
        lineColor=vec3(.58,.37,.31);
      }
      vec3 drawing=mix(ground,lineColor,detail*dim);
      // Selective accents: title bands, heraldry and a trace of cloth/seat colour.
      if(uv.z>14.5&&uv.z<15.5)drawing=texture2D(banner,vec2(uv.x,uv.y*.5)).rgb;
      if(uv.z>11.5&&uv.z<12.5)drawing=texture2D(emblem,uv.xy).rgb;
      if(uv.z>8.5&&uv.z<9.5)drawing=mix(vec3(.16,.045,.063),drawing,.72);
      if(uv.z>9.5&&uv.z<10.5)drawing=mix(vec3(.105,.09,.058),drawing,.84);
      if(uv.z>7.5&&uv.z<8.5)drawing=mix(ground,mix(col*.16,drawing,.72),dim);
      if(uv.z>17.5&&uv.z<18.5)drawing=col*.8;
      if(uv.z>18.5&&uv.z<19.5){
        float edge=min(min(uv.x,1.0-uv.x),min(uv.y,1.0-uv.y));
        float border=1.0-smoothstep(.022,.042,edge);
        float inset=1.0-smoothstep(.006,.014,abs(edge-.085));
        drawing=mix(ground,vec3(.63,.44,.30),max(border*.75,inset*.35));
      }
      if(uv.z>19.5&&uv.z<20.5){
        float u=fract(uv.x*6.0),y=uv.y;
        float swag=1.0-smoothstep(.012,.03,abs(y-(.34+.24*sin(u*3.14159))));
        float border=1.0-smoothstep(.008,.024,min(abs(y-.12),abs(y-.89)));
        float bud=1.0-smoothstep(.018,.038,length(vec2((u-.5)*.7,y-.72)));
        drawing=mix(ground,vec3(.62,.62,.47),max(max(swag*.72,border*.52),bud*.6));
      }
      gl_FragColor=vec4(drawing,1.0);
    }`);
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
  canvas.dataset.shaderMs=(performance.now()-perfStart).toFixed(1);const meshStart=performance.now();
  const palette={'url(#wood-material)':'#79503b','url(#brass-material)':'#947448','url(#block-red)':'#c65c44','url(#block-yellow)':'#e9c65b'};
  const colorCache=new Map();
  const rgb=fill=>{if(colorCache.has(fill))return colorCache.get(fill);const s=(palette[fill]||fill).replace('#',''),c=[0,2,4].map(i=>parseInt(s.slice(i,i+2),16)/255);colorCache.set(fill,c);return c};
  const orient=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
  const triangle=[[0,1,2]],quadTriangles=[[3,0,1],[1,2,3]];
  function triangulate(p){
    if(p.length===3)return triangle;
    if(p.length===4){const a=orient(p[3],p[0],p[1]),b=orient(p[0],p[1],p[2]),c=orient(p[1],p[2],p[3]),d=orient(p[2],p[3],p[0]);if((a>1e-6&&b>1e-6&&c>1e-6&&d>1e-6)||(a< -1e-6&&b< -1e-6&&c< -1e-6&&d< -1e-6))return quadTriangles;}
    const idx=p.map((_,i)=>i),out=[],area=p.reduce((n,a,i)=>{const b=p[(i+1)%p.length];return n+a[0]*b[1]-b[0]*a[1]},0),sign=area>0?1:-1;
    for(let guard=0;idx.length>3&&guard<p.length*p.length;guard++){
      let ear=false;for(let i=0;i<idx.length;i++){
        const a=idx[(i+idx.length-1)%idx.length],b=idx[i],c=idx[(i+1)%idx.length];
        if(sign*orient(p[a],p[b],p[c])<=.000001)continue;
        if(idx.some(j=>j!==a&&j!==b&&j!==c&&sign*orient(p[a],p[b],p[j])>.000001&&sign*orient(p[b],p[c],p[j])>.000001&&sign*orient(p[c],p[a],p[j])>.000001))continue;
        out.push([a,b,c]);idx.splice(i,1);ear=true;break;
      }if(!ear)break;
    }if(idx.length===3)out.push(idx.slice());return out;
  }
  // Bounded typed blocks avoid a huge boxed-number array and a second full copy.
  const blocks=[];let block=new Float32Array(18*65536),cursor=0;
  let vertices={length:0};let occlusionVertices=0;
  function writeVertex(x,y,z,color,shade,mesh,uv,world,normal){
    if(cursor+18>block.length){blocks.push(block);block=new Float32Array(18*65536);cursor=0;}
    block[cursor++]=(x/600-1)*z;block[cursor++]=(1-y/250)*z;block[cursor++]=((10000+10)/(10000-10)-2*10000*10/((10000-10)*z))*z;block[cursor++]=z;
    block[cursor++]=color[0]*shade;block[cursor++]=color[1]*shade;block[cursor++]=color[2]*shade;block[cursor++]=mesh.party;
    block[cursor++]=uv[0];block[cursor++]=uv[1];block[cursor++]=mesh.material||0;block[cursor++]=mesh.pickId||0;
    block[cursor++]=world[0];block[cursor++]=world[1];block[cursor++]=world[2];block[cursor++]=normal[0];block[cursor++]=normal[1];block[cursor++]=normal[2];vertices.length+=18;
  }
  for(const source of [...(data.occluders||[]),...data.meshes]){
    const before=vertices.length;
    const projected=source.p.map(data.project),mesh=clipHallMesh(source,data.project,30,projected);if(!mesh)continue;
    const p=mesh===source?projected:mesh.p.map(data.project),color=rgb(mesh.color);
    if(Number.isNaN(color[0])||Number.isNaN(color[1])||Number.isNaN(color[2]))continue;
    let normal=[0,1,0];
    for(let j=1;j<mesh.p.length-1;j++){
      const a=mesh.p[j],b=mesh.p[j+1],o=mesh.p[0],ax=a[0]-o[0],ay=a[1]-o[1],az=a[2]-o[2],bx=b[0]-o[0],by=b[1]-o[1],bz=b[2]-o[2];
      const nx=ay*bz-az*by,ny=az*bx-ax*bz,nz=ax*by-ay*bx,length=Math.hypot(nx,ny,nz);
      if(length>.00001){normal=[nx/length,ny/length,nz/length];break;}
    }
    const origin=mesh.p[0];if(normal[0]*(data.eye[0]-origin[0])+normal[1]*(data.eye[1]-origin[1])+normal[2]*(data.eye[2]-origin[2])<0)normal=[-normal[0],-normal[1],-normal[2]];

    for(const tri of triangulate(p))for(const k of tri){const[x,y,z]=p[k],near=10,far=10000;const uv=mesh.uv?.[k]||[0,0];let shade=mesh.shades?.[k]??1;
      if(mesh.material===4){
        const world=mesh.p[k];
        for(const deck of window.chinaHallSpatialData?.decks||[]){
          if(deck.key==='floor'||world[1]>=deck.base-24)continue;
          const dx=world[0]-deck.center,r=Math.hypot(dx,world[2]),angle=Math.atan2(world[2],dx)*180/Math.PI;
          if(angle>=deck.a0&&angle<=deck.a1&&r<deck.outer){
            const occlusion=Math.max(0,Math.min(1,(r-deck.inner+45)/65));shade*=1-.24*occlusion;
          }
        }
      }
      writeVertex(x,y,z,color,shade,mesh,uv,mesh.p[k],normal)}
    if(source.depthOnly)occlusionVertices+=(vertices.length-before)/18;
  }
  canvas.dataset.meshMs=(performance.now()-meshStart).toFixed(1);const uploadStart=performance.now();
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,vertices.length*4,gl.STATIC_DRAW);
  let byteOffset=0;for(const part of blocks){gl.bufferSubData(gl.ARRAY_BUFFER,byteOffset,part);byteOffset+=part.byteLength;}
  gl.bufferSubData(gl.ARRAY_BUFFER,byteOffset,block.subarray(0,cursor));blocks.length=0;block=null;const vertexCount=vertices.length/18;vertices=null;canvas.dataset.uploadedMeshes=String(data.meshes.length);data.meshes=[];data.occluders=[];
  for(const [name,size,offset] of [['pos',4,0],['color',3,4],['party',1,7],['tex',3,8],['objectId',1,11],['worldPosition',3,12],['normal',3,15]]){const a=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,size,gl.FLOAT,false,72,offset*4)}
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.clearColor(0,0,0,0);gl.viewport(0,0,canvas.width,canvas.height);
  canvas.dataset.uploadMs=(performance.now()-uploadStart).toFixed(1);
  const svg=root.querySelector('.npc-auditorium'),surface=root.querySelector('.hall-render-surface'),viewHeight=gl.getUniformLocation(program,'viewHeight');
  let postprocess=null;
  const focus=gl.getUniformLocation(program,'focus'),drawGeometry=()=>{gl.uniform1f(focus,NPC_PARTIES.findIndex(p=>p.id===scene.dataset.focus)+1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.colorMask(false,false,false,false);gl.drawArrays(gl.TRIANGLES,0,occlusionVertices);gl.colorMask(true,true,true,true);gl.drawArrays(gl.TRIANGLES,occlusionVertices,vertexCount-occlusionVertices)};
  const draw=()=>postprocess?postprocess(drawGeometry):drawGeometry();
  gl.uniform3fv(gl.getUniformLocation(program,'cameraEye'),data.eye);
  const resolution=gl.getUniformLocation(program,'resolution'),lightReady=gl.getUniformLocation(program,'lightReady');
  // The ID buffer has the identical depth test, projection, meshes and clipping.
  // Opaque architectural faces write ID 0, so hidden seats cannot steal input.
  const pickPass=gl.getUniformLocation(program,'pickPass'),pickFramebuffer=gl.createFramebuffer(),pickTexture=gl.createTexture(),pickDepth=gl.createRenderbuffer();
  const pixel=new Uint8Array(4),targets=new Map([...root.querySelectorAll('[data-pick-id]')].map(e=>[Number(e.dataset.pickId),e]));
  let previousPick=null;
  const renderPick=()=>{
    previousPick=null;gl.bindTexture(gl.TEXTURE_2D,pickTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,canvas.width,canvas.height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER,pickFramebuffer);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,pickTexture,0);
    gl.bindRenderbuffer(gl.RENDERBUFFER,pickDepth);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,canvas.width,canvas.height);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,pickDepth);
    gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1f(pickPass,1);gl.disable(gl.DITHER);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,vertexCount);gl.enable(gl.DITHER);gl.uniform1f(pickPass,0);gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    gl.bindTexture(gl.TEXTURE_2D,texture);canvas.dataset.pointerPicking='depth-buffer';
  };
  const makeTarget=()=>({frame:gl.createFramebuffer(),tex:gl.createTexture(),depth:gl.createRenderbuffer(),w:0,h:0});
  const depthTarget=makeTarget();
  gl.uniform1i(gl.getUniformLocation(program,'sceneDepth'),6);gl.uniform1i(gl.getUniformLocation(program,'lightDepth'),7);
  const renderLightTarget=(target,w,h,pass)=>{
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,target.tex);
    if(target.w!==w||target.h!==h){gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);target.w=w;target.h=h;}
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER,target.frame);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,target.tex,0);
    gl.bindRenderbuffer(gl.RENDERBUFFER,target.depth);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,w,h);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,target.depth);
    gl.bindTexture(gl.TEXTURE_2D,texture);gl.viewport(0,0,w,h);gl.uniform1f(pickPass,pass);gl.clearColor(pass>3.5?0:1,0,0,1);gl.disable(gl.DITHER);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,vertexCount);gl.enable(gl.DITHER);gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  };
  const renderLighting=()=>{
    gl.activeTexture(gl.TEXTURE6);gl.bindTexture(gl.TEXTURE_2D,texture);gl.activeTexture(gl.TEXTURE7);gl.bindTexture(gl.TEXTURE_2D,texture);gl.activeTexture(gl.TEXTURE0);
    renderLightTarget(depthTarget,canvas.width,canvas.height,2);
    gl.activeTexture(gl.TEXTURE6);gl.bindTexture(gl.TEXTURE_2D,depthTarget.tex);gl.activeTexture(gl.TEXTURE0);
    gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform1f(pickPass,0);gl.uniform1f(lightReady,1);gl.clearColor(0,0,0,0);canvas.dataset.lighting='depth-and-normal-line-renderer';
  };
  scene._hallPick=(x,y)=>{
    if(previousPick?.x===x&&previousPick?.y===y)return previousPick.element;
    const r=canvas.getBoundingClientRect(),px=Math.floor((x-r.left)/r.width*canvas.width),py=canvas.height-1-Math.floor((y-r.top)/r.height*canvas.height);
    if(px<0||py<0||px>=canvas.width||py>=canvas.height)return null;
    gl.bindFramebuffer(gl.FRAMEBUFFER,pickFramebuffer);gl.readPixels(px,py,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    canvas.dataset.pointerPixel=Array.from(pixel).join(',');const element=targets.get(pixel[0]+256*pixel[1])||null;previousPick={x,y,element};return element;
  };
  // Extend the same projected floor into taller panels; never letterbox below it.
  let lastHeight=0;
  const resizeHall=()=>{if(document.body.dataset.page!=='politics')return;const bounds=scene.getBoundingClientRect();if(!bounds.width||!bounds.height)return;const height=Math.max(500,1200*bounds.height/Math.max(1,bounds.width));if(height===lastHeight)return;lastHeight=height;svg.setAttribute('viewBox',`0 0 1200 ${height}`);root.querySelectorAll('.hall-full-bounds').forEach(e=>e.setAttribute('height',height));root.querySelector('.hall-room-bounds').setAttribute('height',height);surface.setAttribute('height',height);canvas.style.height=height+'px';canvas.height=Math.ceil(height*2);gl.viewport(0,0,canvas.width,canvas.height);gl.uniform1f(viewHeight,height);renderPick();renderLighting();draw()};
  scene._resumeHall=resizeHall;
  const viewportObserver=new ResizeObserver(resizeHall);viewportObserver.observe(scene);gl.uniform1f(viewHeight,500);
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([170,144,100,255]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);const img=new Image();img.onload=()=>{if(!canvas.isConnected)return;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);canvas.dataset.materials='loaded';draw()};canvas.dataset.materials='geometry-only';const wallTexture=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,wallTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([76,69,60,255]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.uniform1i(gl.getUniformLocation(program,'wall'),1);gl.activeTexture(gl.TEXTURE0);const wallImg=new Image();wallImg.onload=()=>{if(!canvas.isConnected)return;gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,wallTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,wallImg);gl.activeTexture(gl.TEXTURE0);canvas.dataset.wallMaterials='loaded';draw()};canvas.dataset.wallMaterials='geometry-only';draw();const observer=new MutationObserver(draw);observer.observe(scene,{attributes:true,attributeFilter:['data-focus']});
  function detailTexture(unit,uniform,file,dataset){
    const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([192,172,140,255]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program,uniform),unit);gl.activeTexture(gl.TEXTURE0);
    const image=new Image();image.onload=()=>{if(!canvas.isConnected)return;gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.activeTexture(gl.TEXTURE0);canvas.dataset[dataset]='loaded';if(dataset==='emblem'){renderPick();renderLighting();}draw();};image.src='../china-tno-study/assets/'+file;
    return ()=>{image.onload=null;gl.deleteTexture(tex)};
  }
  const disposeStage=()=>{};
  const disposeEmblem=detailTexture(3,'emblem','emblem-authored-r9.svg','emblem');
  const disposeCoffer=detailTexture(4,'coffer','stage-coffer.png','coffer');
  // Exact live text on a red fabric sign; the sign is projected and depth-tested.
  const bannerTexture=gl.createTexture(),sign=document.createElement('canvas');sign.width=4096;sign.height=512;
  const signCtx=sign.getContext('2d');
  const paintBanner=()=>{
    if(!canvas.isConnected)return;
    const g=signCtx.createLinearGradient(0,0,0,256);g.addColorStop(0,'#993741');g.addColorStop(.5,'#91343d');g.addColorStop(1,'#7d2b36');signCtx.fillStyle=g;signCtx.fillRect(0,0,4096,256);
    signCtx.fillStyle='#e4b1a021';for(let y=1;y<256;y+=5)signCtx.fillRect(0,y,4096,1);
    const wording=window.chinaStageRenderData.banner.text;
    // Original heavy Songti ceremony lettering; never stretch glyphs to
    // fill the long sign. Two-times raster size retains edge quality in perspective.
    signCtx.font='900 202px "Hall Ceremony", "Songti SC", serif';signCtx.textAlign='center';signCtx.textBaseline='middle';
    const spacing=3340/wording.length;
    [...wording].forEach((letter,i)=>{
      const x=378+spacing*(i+.5);
      signCtx.fillStyle='#e8e1c9';signCtx.fillText(letter,x,133);
    });
    // All seven card faces share the bottom half of this material atlas.
    const nameplates=window.chinaStageRenderData.nameplates;
    nameplates.forEach((p,i)=>{
      const x=i*4096/7,w=4096/7;
      const card=signCtx.createLinearGradient(0,256,0,512);card.addColorStop(0,'#f4deb0');card.addColorStop(1,'#dbb975');
      signCtx.fillStyle=card;signCtx.fillRect(x,256,w,256);
      signCtx.strokeStyle='#9e7136';signCtx.lineWidth=3;signCtx.strokeRect(x+7,265,w-14,237);
      signCtx.font='900 116px "Hall Ceremony", "Songti SC", serif';signCtx.fillStyle='#813c20';
      const letters=[...p.name],gap=letters.length===2?154:132;
      letters.forEach((letter,j)=>signCtx.fillText(letter,x+w/2+(j-(letters.length-1)/2)*gap,392));
    });
    gl.activeTexture(gl.TEXTURE5);gl.bindTexture(gl.TEXTURE_2D,bannerTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,sign);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program,'banner'),5);gl.activeTexture(gl.TEXTURE0);canvas.dataset.banner=wording;canvas.dataset.nameplates=nameplates.map(p=>p.name).join(',');canvas.setAttribute('aria-label','会场横幅：'+wording);draw();
  };paintBanner();document.fonts.load('900 202px "Hall Ceremony"',window.chinaStageRenderData.banner.text).then(fonts=>{if(!canvas.isConnected)return;canvas.dataset.bannerFont=fonts.length?"Hall Ceremony Heavy":"fallback";paintBanner()});
  // Blur only visible lamp emitters, using the hall depth test. Keep the
  // untouched beauty image crisp; furniture, text and wall textures never blur.
  const beautyTarget=makeTarget(),normalTarget=makeTarget();
  const postVs=shader(gl.VERTEX_SHADER,`attribute vec2 position;varying vec2 vUV;void main(){vUV=position*.5+.5;gl_Position=vec4(position,0,1);}`);
  const postFs=shader(gl.FRAGMENT_SHADER,`precision mediump float;varying vec2 vUV;uniform sampler2D source;uniform sampler2D bloom;uniform vec2 stepUV;uniform float composite;uniform sampler2D normals;uniform sampler2D geometryDepth;uniform float selected;
    void main(){if(composite>.5){vec4 base=texture2D(source,vUV);vec3 light=texture2D(bloom,vUV).rgb;vec4 center=texture2D(normals,vUV);vec2 ex=vec2(stepUV.x,0),ey=vec2(0,stepUV.y);
        vec3 weights=vec3(1,1.0/255.0,1.0/65025.0);
        float d=dot(texture2D(geometryDepth,vUV).rgb,weights);
        float dx=abs(dot(texture2D(geometryDepth,vUV+ex).rgb,weights)+dot(texture2D(geometryDepth,vUV-ex).rgb,weights)-2.0*d);
        float dy=abs(dot(texture2D(geometryDepth,vUV+ey).rgb,weights)+dot(texture2D(geometryDepth,vUV-ey).rgb,weights)-2.0*d);
        float bend=length(texture2D(normals,vUV+ex).rgb-texture2D(normals,vUV-ex).rgb)+length(texture2D(normals,vUV+ey).rgb-texture2D(normals,vUV-ey).rgb);
        float edge=max(smoothstep(.17,.48,bend),smoothstep(.003,.012,(dx+dy)/max(.15,d)));
        float code=floor(center.a*255.0+.5),party=mod(code,8.0),material=floor(code/8.0);
        vec3 ink=vec3(.41,.58,.59);
        if(material>3.5&&material<4.5)ink=vec3(.48,.28,.31);
        if(material>6.5&&material<7.5)ink=vec3(.52,.62,.58);
        if(material>7.5&&material<8.5)ink=vec3(.70,.40,.39);
        if(material>8.5&&material<9.5)ink=vec3(.87,.34,.35);
        if(material>9.5&&material<10.5)ink=vec3(.82,.70,.41);
        if(material>10.5&&material<11.5)ink=vec3(.63,.43,.37);
        if(material>11.5&&material<12.5)ink=vec3(.90,.70,.33);
        if(material>12.5&&material<13.5)ink=vec3(.65,.70,.62);
        if(material>14.5&&material<15.5)ink=vec3(.78,.34,.36);
        if(material>15.5&&material<17.5)ink=vec3(.78,.71,.45);
        if(party>.5&&party<1.5)ink=vec3(.70,.39,.39);
        if(party>1.5&&party<2.5)ink=vec3(.90,.65,.40);
        if(party>2.5&&party<3.5)ink=vec3(.77,.81,.42);
        if(party>3.5&&party<4.5)ink=vec3(.40,.83,.69);
        if(party>4.5&&party<5.5)ink=vec3(.88,.51,.64);
        if(party>5.5&&party<6.5)ink=vec3(.42,.69,.90);
        if(party>6.5)ink=vec3(.74,.57,.89);
        float dim=(selected>.5&&party>.5&&abs(party-selected)>.5)?.24:1.0;
        // The distant seat bank becomes quieter, preserving readable empty space.
        float strength=mix(.86,.40,smoothstep(.18,.48,d));if(material>17.5)strength*=.15;
        vec3 color=mix(base.rgb,ink,edge*strength*dim);
        gl_FragColor=vec4(color,base.a);return;}
      vec3 c=texture2D(source,vUV).rgb*.227027;
      c+=(texture2D(source,vUV+stepUV).rgb+texture2D(source,vUV-stepUV).rgb)*.194595;
      c+=(texture2D(source,vUV+stepUV*2.0).rgb+texture2D(source,vUV-stepUV*2.0).rgb)*.121622;
      c+=(texture2D(source,vUV+stepUV*3.0).rgb+texture2D(source,vUV-stepUV*3.0).rgb)*.054054;
      c+=(texture2D(source,vUV+stepUV*4.0).rgb+texture2D(source,vUV-stepUV*4.0).rgb)*.016216;gl_FragColor=vec4(c,1);
    }`);
  const postProgram=gl.createProgram();gl.attachShader(postProgram,postVs);gl.attachShader(postProgram,postFs);gl.linkProgram(postProgram);
  if(!gl.getProgramParameter(postProgram,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(postProgram));
  const quad=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,quad);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const postPosition=gl.getAttribLocation(postProgram,'position'),postStep=gl.getUniformLocation(postProgram,'stepUV'),postMode=gl.getUniformLocation(postProgram,'composite');
  const attributes=[['pos',4,0],['color',3,4],['party',1,7],['tex',3,8],['objectId',1,11],['worldPosition',3,12],['normal',3,15]].map(([name,size,offset])=>[gl.getAttribLocation(program,name),size,offset]);
  const restoreGeometry=()=>{gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);for(const[a,size,offset]of attributes){gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,size,gl.FLOAT,false,72,offset*4)}gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.uniform1f(pickPass,0);gl.clearColor(0,0,0,0);gl.viewport(0,0,canvas.width,canvas.height)};
  const allocateColor=(t,w,h)=>{
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,t.tex);
    if(t.w!==w||t.h!==h){gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);gl.bindRenderbuffer(gl.RENDERBUFFER,t.depth);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_STENCIL,w,h);t.w=w;t.h=h;}
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER,t.frame);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t.tex,0);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_STENCIL_ATTACHMENT,gl.RENDERBUFFER,t.depth);
  };
  let bloomWidth=0,bloomHeight=0;
  postprocess=render=>{
    const bindings=[];for(let i=0;i<8;i++){gl.activeTexture(gl.TEXTURE0+i);bindings.push(gl.getParameter(gl.TEXTURE_BINDING_2D))}
    const restoreTextures=()=>{bindings.forEach((t,i)=>{gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,t)});gl.activeTexture(gl.TEXTURE0)};
    const w=canvas.width,h=canvas.height,qw=Math.ceil(w/4),qh=Math.ceil(h/4),dirty=w!==bloomWidth||h!==bloomHeight;
    restoreGeometry();
    if(dirty){renderLightTarget(normalTarget,w,h,5);bloomWidth=w;bloomHeight=h;}
    allocateColor(beautyTarget,w,h);gl.bindFramebuffer(gl.FRAMEBUFFER,null);restoreTextures();restoreGeometry();render();
    // Resolve the native multisampled framebuffer before compositing so slim
    // chair arms, folds and stair edges retain the original antialiasing.
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,beautyTarget.tex);gl.copyTexSubImage2D(gl.TEXTURE_2D,0,0,0,0,0,w,h);
    gl.useProgram(postProgram);gl.disable(gl.DEPTH_TEST);for(const[a]of attributes)gl.disableVertexAttribArray(a);gl.bindBuffer(gl.ARRAY_BUFFER,quad);gl.enableVertexAttribArray(postPosition);gl.vertexAttribPointer(postPosition,2,gl.FLOAT,false,0,0);
    gl.uniform1i(gl.getUniformLocation(postProgram,'source'),0);gl.uniform1i(gl.getUniformLocation(postProgram,'bloom'),1);gl.uniform1i(gl.getUniformLocation(postProgram,'normals'),2);gl.uniform1i(gl.getUniformLocation(postProgram,'geometryDepth'),3);gl.uniform1f(gl.getUniformLocation(postProgram,'selected'),NPC_PARTIES.findIndex(p=>p.id===scene.dataset.focus)+1);
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,w,h);gl.uniform1f(postMode,1);gl.uniform2f(postStep,.75/w,.75/h);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,normalTarget.tex);gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D,depthTarget.tex);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,beautyTarget.tex);gl.drawArrays(gl.TRIANGLES,0,6);
    gl.disableVertexAttribArray(postPosition);restoreTextures();restoreGeometry();canvas.dataset.bloom='not-used-in-line-renderer';
  };
  restoreGeometry();draw();
  const disposeBloom=()=>{for(const t of[beautyTarget,normalTarget]){gl.deleteFramebuffer(t.frame);gl.deleteTexture(t.tex);gl.deleteRenderbuffer(t.depth)}gl.deleteBuffer(quad);gl.deleteProgram(postProgram);gl.deleteShader(postVs);gl.deleteShader(postFs)};
  window.disposeChinaHall=()=>{disposeBloom();delete scene._hallPick;for(const t of[depthTarget]){gl.deleteFramebuffer(t.frame);gl.deleteTexture(t.tex);gl.deleteRenderbuffer(t.depth)}gl.deleteFramebuffer(pickFramebuffer);gl.deleteTexture(pickTexture);gl.deleteRenderbuffer(pickDepth);gl.deleteTexture(bannerTexture);viewportObserver.disconnect();observer.disconnect();disposeStage();disposeEmblem();disposeCoffer();img.onload=null;wallImg.onload=null;gl.deleteTexture(wallTexture);gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs)};
  canvas.dataset.triangles=String(vertexCount/3);canvas.dataset.depthTest='true';canvas.dataset.occlusionVertices=String(occlusionVertices);
}
const mountHallInteraction=window.mountChinaPolitics;
window.mountChinaPolitics=root=>{mountHallInteraction(root);mountHallDepth(root);window.mountChinaLeaders?.(root)};
