 'use strict';
// Clip in world space, preserving material coordinates across the near plane.
// A floor crossing behind the eye must not make its visible portion disappear.
function clipHallMesh(mesh,project,near=30,projected){
  const depths=projected?projected.map(p=>p[2]):mesh.p.map(p=>project(p)[2]);
  if(depths.every(d=>d>=near))return mesh;
  if(depths.every(d=>d<near))return null;
  const p=[],uv=[],shades=[];
  for(let i=0;i<mesh.p.length;i++){
    const j=(i+mesh.p.length-1)%mesh.p.length,a=depths[j],b=depths[i];
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
      if(pickPass>3.5){gl_FragColor=vec4(uv.z>15.5&&uv.z<16.5?vec3(1.0,.86,.58):vec3(0),1);return;}
      if(pickPass>2.5){gl_FragColor=vec4(packDepth(gl_FragCoord.z),1);return;}
      if(pickPass>1.5){gl_FragColor=vec4(packDepth(cameraDepth/5000.0),1);return;}
      if(pickPass>.5){float id=floor(identity+.5);gl_FragColor=vec4(mod(id,256.0)/255.0,floor(id/256.0)/255.0,0,1);return;}
      float dim=(focus>0.5&&group>0.5&&abs(group-focus)>0.5)?0.25:1.0;
      vec3 c=col;
      if(uv.z>0.5&&uv.z<6.5){
        float lo=0.0;float hi=0.30;
        if(uv.z>1.5){lo=0.32;hi=0.535;}
        if(uv.z>2.5){lo=0.56;hi=0.75;}
        if(uv.z>3.5){lo=0.765;hi=0.995;}
        vec3 t=texture2D(atlas,vec2(fract(uv.x),mix(lo,hi,(uv.z>3.5&&uv.z<4.5)?fract(uv.y):clamp(uv.y,0.0,1.0)))).rgb;
        if(uv.z>4.5){float start=uv.z>5.5?0.56:0.01;float end=uv.z>5.5?0.98:0.54;t=texture2D(wall,vec2(fract(uv.x),mix(start,end,clamp(uv.y,0.0,1.0)))).rgb;}
        if(uv.z>3.5&&uv.z<4.5){float pile=texture2D(stageAtlas,vec2(fract(world.x/85.0),fract(world.z/85.0)*.24)).r;t=vec3(.76,.125,.16)*(.94+.10*pile);}
        if(uv.z>4.5&&uv.z<5.5){float grain=dot(t,vec3(.299,.587,.114));float joint=smoothstep(0.0,.014,fract(uv.y*16.0))*smoothstep(0.0,.012,fract(uv.x*9.0));t=vec3(.94,.90,.81)*(.84+.28*grain)*(.93+.07*joint);}
        c=t*col;
      }
      if(uv.z>6.5&&uv.z<7.5){
        vec3 grain=texture2D(atlas,vec2(fract(uv.x*3.0),mix(0.34,0.50,uv.y))).rgb;
        float lum=dot(grain,vec3(0.299,0.587,0.114));
        float rim=smoothstep(0.0,0.045,uv.y)*smoothstep(0.0,0.045,1.0-uv.y);
        float edge=smoothstep(0.0,0.035,uv.x)*smoothstep(0.0,0.035,1.0-uv.x);
        c=col*(0.87+0.22*lum)*(0.82+0.18*rim)*(0.92+0.08*edge);
      }
      if(uv.z>7.5&&uv.z<11.5){
        float row=uv.z-8.0;
        vec3 t=texture2D(stageAtlas,vec2(clamp(uv.x,0.002,0.998),row*0.25+0.004+clamp(uv.y,0.0,1.0)*0.242)).rgb;
        float lum=dot(t,vec3(0.299,0.587,0.114));
        // Geometry provides the folds and rounded silhouette; atlas supplies fine grain.
        float fine=sin(uv.x*820.0)*sin(uv.y*470.0);
        c=col*(uv.z<8.5?0.96+0.07*lum:uv.z<9.5?0.70+0.90*lum:uv.z<10.5?0.65+0.78*lum:0.82+0.70*lum);
        if(uv.z<8.5){float pores=sin(uv.x*541.0+sin(uv.y*417.0))*sin(uv.y*629.0);c*=.99+.01*pores;}
        else if(uv.z<9.5)c*=0.98+0.02*fine;
      }
      if(uv.z>11.5&&uv.z<12.5){vec4 t=texture2D(emblem,uv.xy);if(t.a<0.35)discard;c=t.rgb*col;}
      if(uv.z>12.5&&uv.z<13.5){vec3 stone=texture2D(atlas,vec2(clamp(uv.x,0.01,0.99),mix(0.622,0.686,clamp(uv.y,0.0,1.0)))).rgb;c=stone*col;}
      if(uv.z>13.5&&uv.z<14.5){c=texture2D(coffer,mix(vec2(0.16),vec2(0.84),uv.xy)).rgb*col;}
      if(uv.z>14.5&&uv.z<15.5){c=texture2D(banner,vec2(uv.x,uv.y*.5)).rgb*col;}
      if(uv.z>16.5&&uv.z<17.5){c=texture2D(banner,uv.xy).rgb*col;}
      vec3 n=normalize(surfaceNormal),l=normalize(vec3(1.0,1.6,.6)),v=normalize(cameraEye-world);
      float direct=max(dot(n,l),0.0),shadow=lightReady>.5?visibility(n):1.0,ao=lightReady>.5?contactAO():1.0;
      vec3 illumination=vec3(.94,.91,.83)+vec3(.44,.42,.37)*direct*(.45+.55*shadow);
      float stageFill=1.0-smoothstep(-690.0,-580.0,world.x);illumination+=vec3(.13,.10,.045)*stageFill;
      // Distributed ceiling illumination follows sixteen lamp clusters on the
      // same concentric rings as the visible ceiling lights, with falloff.
      vec3 ceilingLight=vec3(0);
      for(int ring=0;ring<4;ring++)for(int quadrant=0;quadrant<4;quadrant++){
        float radius=350.0+float(ring)*340.0,a=float(quadrant)*1.5707963;
        vec3 source=vec3(100.0+radius*cos(a),600.0,radius*.92*sin(a));
        vec3 ray=source-world;float distance2=dot(ray,ray);
        float incidence=max(dot(n,normalize(ray)),0.0);
        ceilingLight+=vec3(1.0,.955,.86)*incidence*25500.0/(distance2+60000.0);
      }
      illumination+=ceilingLight;

      // Gold silk catches a broad sheen, lacquer a tighter one; carpet remains matte.
      float leather=(uv.z>7.5&&uv.z<8.5)?1.0:0.0;
      float lacquer=(uv.z>10.5&&uv.z<11.5)?1.0:0.0;
      float silk=(uv.z>8.5&&uv.z<10.5)?1.0:0.0;
      float stone=(uv.z>12.5&&uv.z<13.5)?1.0:0.0;
      float highlight=pow(max(dot(n,normalize(l+v)),0.0),mix(12.0,48.0,lacquer));
      c=c*illumination*ao+vec3(1.0,.85,.65)*highlight*(.22*lacquer+.13*leather+.09*silk+.03*stone)*shadow;
      if(lacquer>.5&&n.y>.75){
        vec3 reflected=reflect(-v,n);float sheen=pow(max(dot(reflected,normalize(vec3(.4,1.0,.2))),0.0),18.0);
        c+=vec3(.24,.205,.14)*sheen;
        vec3 ceilingHit=world+reflected*(600.0-world.y)/max(.05,reflected.y);
        vec2 delta=ceilingHit.xz-vec2(100,0);delta.y/=.92;float radius=length(delta),angle=atan(delta.y,delta.x)/6.283185;
        float glow=0.0;
        for(int i=0;i<8;i++){
          float ring=350.0+float(i)*170.0,count=24.0+float(i)*10.0;
          float lateral=abs(fract(angle*count+.5)-.5)*6.283185*ring/count;
          glow+=exp(-pow((radius-ring)/18.0,2.0)-pow(lateral/13.0,2.0));
        }
        c+=vec3(.75,.67,.49)*glow*(.18+.42*pow(1.0-max(dot(n,v),0.0),2.0));
      }
      if(uv.z>8.5&&uv.z<10.5)c*=1.12;
      if(uv.z>11.5&&uv.z<12.5)c*=1.08;
      if(uv.z>15.5&&uv.z<16.5)c=col*1.25;
      gl_FragColor=vec4(c*dim,1.0);
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
    if(color.some(Number.isNaN))continue;
    let normal=[0,1,0];
    for(let j=1;j<mesh.p.length-1;j++){
      const a=mesh.p[j],b=mesh.p[j+1],o=mesh.p[0],ax=a[0]-o[0],ay=a[1]-o[1],az=a[2]-o[2],bx=b[0]-o[0],by=b[1]-o[1],bz=b[2]-o[2];
      const nx=ay*bz-az*by,ny=az*bx-ax*bz,nz=ax*by-ay*bx,length=Math.hypot(nx,ny,nz);
      if(length>.00001){normal=[nx/length,ny/length,nz/length];break;}
    }
    const view=data.eye.map((v,k)=>v-mesh.p[0][k]);if(normal.reduce((sum,v,k)=>sum+v*view[k],0)<0)normal=normal.map(v=>-v);

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
  const depthTarget=makeTarget(),shadowTarget=makeTarget();
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
    renderLightTarget(depthTarget,canvas.width,canvas.height,2);renderLightTarget(shadowTarget,2048,2048,3);
    gl.activeTexture(gl.TEXTURE6);gl.bindTexture(gl.TEXTURE_2D,depthTarget.tex);gl.activeTexture(gl.TEXTURE7);gl.bindTexture(gl.TEXTURE_2D,shadowTarget.tex);gl.activeTexture(gl.TEXTURE0);
    gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform1f(pickPass,0);gl.uniform1f(lightReady,1);gl.clearColor(0,0,0,0);canvas.dataset.lighting='warm-ceiling-area-lights-depth-aware-bloom';
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
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([170,144,100,255]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);const img=new Image();img.onload=()=>{if(!canvas.isConnected)return;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);canvas.dataset.materials='loaded';draw()};img.src='../china-tno-study/assets/architecture-details.png';const wallTexture=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,wallTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([76,69,60,255]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.uniform1i(gl.getUniformLocation(program,'wall'),1);gl.activeTexture(gl.TEXTURE0);const wallImg=new Image();wallImg.onload=()=>{if(!canvas.isConnected)return;gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,wallTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,wallImg);gl.activeTexture(gl.TEXTURE0);canvas.dataset.wallMaterials='loaded';draw()};wallImg.src='../china-tno-study/assets/wall-details.png';draw();const observer=new MutationObserver(draw);observer.observe(scene,{attributes:true,attributeFilter:['data-focus']});
  function detailTexture(unit,uniform,file,dataset){
    const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([192,172,140,255]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program,uniform),unit);gl.activeTexture(gl.TEXTURE0);
    const image=new Image();image.onload=()=>{if(!canvas.isConnected)return;gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.activeTexture(gl.TEXTURE0);canvas.dataset[dataset]='loaded';if(dataset==='emblem'){renderPick();renderLighting();}draw();};image.src='../china-tno-study/assets/'+file;
    return ()=>{image.onload=null;gl.deleteTexture(tex)};
  }
  const disposeStage=detailTexture(2,'stageAtlas','stage-surface-atlas.png','stageMaterials');
  const disposeEmblem=detailTexture(3,'emblem','stage-emblem.png','emblem');
  const disposeCoffer=detailTexture(4,'coffer','stage-coffer.png','coffer');
  // Exact live text on a red fabric sign; the sign is projected and depth-tested.
  const bannerTexture=gl.createTexture(),sign=document.createElement('canvas');sign.width=4096;sign.height=512;
  const signCtx=sign.getContext('2d');
  const paintBanner=()=>{
    if(!canvas.isConnected)return;
    const g=signCtx.createLinearGradient(0,0,0,256);g.addColorStop(0,'#a22220');g.addColorStop(.5,'#a92a26');g.addColorStop(1,'#90201d');signCtx.fillStyle=g;signCtx.fillRect(0,0,4096,256);
    signCtx.fillStyle='#ffffff03';for(let y=1;y<256;y+=3)signCtx.fillRect(0,y,4096,1);
    const wording=window.chinaStageRenderData.banner.text;
    // Heavy upright Songti with deliberate spacing; never stretch the glyphs to
    // fill the long sign. Two-times raster size retains edge quality in perspective.
    const lettersCount=[...wording].length,letterSize=Math.min(202,3340/lettersCount*.92);
    signCtx.font=`900 ${letterSize}px "Hall Meeting", "Songti SC", serif`;signCtx.textAlign='center';signCtx.textBaseline='middle';
    const spacing=3340/lettersCount;
    [...wording].forEach((letter,i)=>{
      const x=378+spacing*(i+.5);signCtx.fillStyle='#46120f';signCtx.fillText(letter,x+1.4,135.4);
      signCtx.lineWidth=.35;signCtx.strokeStyle='#f3eee3';signCtx.strokeText(letter,x,133);signCtx.fillStyle='#f3eee3';signCtx.fillText(letter,x,133);
    });
    // All seven card faces share the bottom half of this material atlas.
    const nameplates=window.chinaStageRenderData.nameplates;
    nameplates.forEach((p,i)=>{
      const x=i*4096/7,w=4096/7;
      const card=signCtx.createLinearGradient(0,256,0,512);card.addColorStop(0,'#f4deb0');card.addColorStop(1,'#dbb975');
      signCtx.fillStyle=card;signCtx.fillRect(x,256,w,256);
      signCtx.strokeStyle='#9e7136';signCtx.lineWidth=3;signCtx.strokeRect(x+7,265,w-14,237);
      signCtx.font='900 116px "Hall Meeting", "Songti SC", serif';signCtx.fillStyle='#813c20';
      const letters=[...p.name],gap=letters.length===2?154:132;
      letters.forEach((letter,j)=>signCtx.fillText(letter,x+w/2+(j-(letters.length-1)/2)*gap,392));
    });
    gl.activeTexture(gl.TEXTURE5);gl.bindTexture(gl.TEXTURE_2D,bannerTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,sign);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program,'banner'),5);gl.activeTexture(gl.TEXTURE0);canvas.dataset.banner=wording;canvas.dataset.nameplates=nameplates.map(p=>p.name).join(',');canvas.setAttribute('aria-label','会场横幅：'+wording);draw();
  };paintBanner();document.fonts.load('900 202px "Hall Meeting"',window.chinaStageRenderData.banner.text+window.chinaStageRenderData.nameplates.map(p=>p.name).join('')).then(fonts=>{if(!canvas.isConnected)return;canvas.dataset.bannerFont=fonts.length?"Hall Ceremony Heavy":"fallback";paintBanner()});
  // Blur only visible lamp emitters, using the hall depth test. Keep the
  // untouched beauty image crisp; furniture, text and wall textures never blur.
  const beautyTarget=makeTarget(),lampTarget=makeTarget(),blurX=makeTarget(),blurY=makeTarget();
  const postVs=shader(gl.VERTEX_SHADER,`attribute vec2 position;varying vec2 vUV;void main(){vUV=position*.5+.5;gl_Position=vec4(position,0,1);}`);
  const postFs=shader(gl.FRAGMENT_SHADER,`precision mediump float;varying vec2 vUV;uniform sampler2D source;uniform sampler2D bloom;uniform vec2 stepUV;uniform float composite;
    void main(){if(composite>.5){vec4 base=texture2D(source,vUV);vec3 light=texture2D(bloom,vUV).rgb;gl_FragColor=vec4(base.rgb+light*.65,base.a);return;}
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
    if(dirty){renderLightTarget(lampTarget,qw,qh,4);allocateColor(blurX,qw,qh);allocateColor(blurY,qw,qh);bloomWidth=w;bloomHeight=h;}
    allocateColor(beautyTarget,w,h);gl.bindFramebuffer(gl.FRAMEBUFFER,null);restoreTextures();restoreGeometry();render();
    // Resolve the native multisampled framebuffer before compositing so slim
    // chair arms, folds and stair edges retain the original antialiasing.
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,beautyTarget.tex);gl.copyTexSubImage2D(gl.TEXTURE_2D,0,0,0,0,0,w,h);
    gl.useProgram(postProgram);gl.disable(gl.DEPTH_TEST);for(const[a]of attributes)gl.disableVertexAttribArray(a);gl.bindBuffer(gl.ARRAY_BUFFER,quad);gl.enableVertexAttribArray(postPosition);gl.vertexAttribPointer(postPosition,2,gl.FLOAT,false,0,0);
    gl.uniform1i(gl.getUniformLocation(postProgram,'source'),0);gl.uniform1i(gl.getUniformLocation(postProgram,'bloom'),1);
    if(dirty){gl.viewport(0,0,qw,qh);gl.uniform1f(postMode,0);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,lampTarget.tex);gl.bindFramebuffer(gl.FRAMEBUFFER,blurX.frame);gl.uniform2f(postStep,1.6/qw,0);gl.drawArrays(gl.TRIANGLES,0,6);gl.bindTexture(gl.TEXTURE_2D,blurX.tex);gl.bindFramebuffer(gl.FRAMEBUFFER,blurY.frame);gl.uniform2f(postStep,0,1.6/qh);gl.drawArrays(gl.TRIANGLES,0,6);}
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,w,h);gl.uniform1f(postMode,1);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,beautyTarget.tex);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,blurY.tex);gl.drawArrays(gl.TRIANGLES,0,6);
    gl.disableVertexAttribArray(postPosition);restoreTextures();restoreGeometry();canvas.dataset.bloom='visible-lamps-only';
  };
  restoreGeometry();draw();
  const disposeBloom=()=>{for(const t of[beautyTarget,lampTarget,blurX,blurY]){gl.deleteFramebuffer(t.frame);gl.deleteTexture(t.tex);gl.deleteRenderbuffer(t.depth)}gl.deleteBuffer(quad);gl.deleteProgram(postProgram);gl.deleteShader(postVs);gl.deleteShader(postFs)};
  window.disposeChinaHall=()=>{disposeBloom();delete scene._hallPick;for(const t of[depthTarget,shadowTarget]){gl.deleteFramebuffer(t.frame);gl.deleteTexture(t.tex);gl.deleteRenderbuffer(t.depth)}gl.deleteFramebuffer(pickFramebuffer);gl.deleteTexture(pickTexture);gl.deleteRenderbuffer(pickDepth);gl.deleteTexture(bannerTexture);viewportObserver.disconnect();observer.disconnect();disposeStage();disposeEmblem();disposeCoffer();img.onload=null;wallImg.onload=null;gl.deleteTexture(wallTexture);gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs)};
  canvas.dataset.triangles=String(vertexCount/3);canvas.dataset.depthTest='true';canvas.dataset.occlusionVertices=String(occlusionVertices);
}
const mountHallInteraction=window.mountChinaPolitics;
window.mountChinaPolitics=root=>{mountHallInteraction(root);mountHallDepth(root);window.mountChinaLeaders?.(root)};
