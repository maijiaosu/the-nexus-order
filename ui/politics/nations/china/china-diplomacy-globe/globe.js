/* Orthographic cartography for the independent China diplomacy study. */
(() => {
  'use strict';

  const TAU = Math.PI * 2;
  const RAD = Math.PI / 180;
  const cap = (number, low, high) => Math.max(low, Math.min(high, number));
  const longitude = number => ((number + 540) % 360 + 360) % 360 - 180;
  const scriptBase = document.currentScript?.src || document.baseURI;
  const BRICS = new Set('BRA RUS IND CHN ZAF EGY ETH IRN ARE SAU IDN'.split(' '));
  const BEIJING = [116.41, 39.90];
  const REGION_KEYS = ['na','sa','we','ee','me','sas','sea','ea','wa','saf'];
  const CLEARING = [
    ['伦敦', -0.13, 51.51],
    ['纽约', -74.01, 40.71],
    ['圣保罗', -46.63, -23.55],
    ['新加坡', 103.85, 1.29],
  ];

  // Regional centerlines summarize the official BRI land and maritime directions.
  // Intermediate points are geographic drawing guides, not individual projects.
  const CORRIDORS = [
    ['land', [[108.94,34.34],[103.8,36.1],[94,40],[87.6,43.8],[78,44.2],[69,47],[60,51],[50,53.1],[37.6,55.7],[27.6,53.9],[21,52.2],[13.4,52.5]]],
    ['land', [[78,44.2],[69.2,41.3],[61,38.4],[51.4,35.7],[48.3,30.4]]],
    ['land', [[102.7,25],[100.9,21.1],[102.6,18],[100.5,13.7]]],
    ['sea', [[121.8,30.8],[122.4,26.8],[118.1,23.2],[115.0,18.5],[111.3,12.1],[108,6],[104.2,1.3],[103.1,1.3],[100,4.7],[96.2,6.4],[84.3,5.7],[79.7,5.2],[72,9],[57,13],[49,13],[43.4,12.8],[39.8,19.9],[32.6,29.8],[32.4,31.4],[27,33.3],[23.5,36.8]]],
    ['sea', [[115,18.5],[117.7,11.5],[119,5.4],[123,1.4],[128.8,1.9],[136.2,4.0],[147,1.4],[155,-3],[161,-9.5]]],
  ];
  const LETTERING = [
    ['中 国',104,34,'home'],['俄 罗 斯',96,59,'nation'],['印 度',78,22,'nation'],
    ['蒙 古',102,47,'nation'],['澳大利亚',134,-25,'nation'],['日 本',138,36,'nation'],
    ['巴 西',-52,-11,'nation'],['美 国',-101,38,'nation'],['加拿大',-104,58,'nation'],
    ['阿根廷',-64,-36,'nation'],['阿尔及利亚',2.6,27,'nation'],['南非',25,-30,'nation'],
    ['墨西哥',-102,24,'nation'],['秘鲁',-75,-10,'nation'],['智利',-70,-29,'nation'],
    ['德国',10,51,'nation'],['法国',2.4,46.6,'nation'],['意大利',12.5,43,'nation'],
    ['挪威',9,61,'nation'],['土耳其',35,39,'nation'],['埃及',29,27,'nation'],
    ['苏丹',30,15,'nation'],['马里',-3,17,'nation'],['尼日利亚',8,9,'nation'],
    ['刚果民主共和国',24,-3,'nation'],['安哥拉',17,-13,'nation'],['埃塞俄比亚',39.5,8.5,'nation'],
    ['肯尼亚',37.5,1,'nation'],['坦桑尼亚',35,-6.2,'nation'],['纳米比亚',17,-23,'nation'],
    ['沙特阿拉伯',44,24,'nation'],['哈萨克斯坦',66,48,'nation'],['乌兹别克斯坦',64.5,41.2,'nation'],
    ['巴基斯坦',69.8,29,'nation'],['缅甸',96,21,'nation'],['泰国',101,16,'nation'],
    ['新西兰',171,-43,'nation'],['巴布亚新几内亚',144,-6.5,'nation'],
    ['伊 朗',53.5,32,'nation'],['印尼',115,-6,'nation'],['西 伯 利 亚',116,66,'terrain'],
    ['印 度 洋',74,-16,'sea'],['太 平 洋',155,8,'sea'],['太 平 洋',-130,-9,'sea'],
    ['大 西 洋',-34,14,'sea'],['北 冰 洋',-28,79,'sea'],['南 大 西 洋',-17,-33,'sea'],
  ];

  function sphere(lon, lat) {
    const a = lon * RAD, b = lat * RAD, c = Math.cos(b);
    return [c * Math.cos(a), Math.sin(b), c * Math.sin(a)];
  }

  function viewFor(lon, lat) {
    const a = lon * RAD, b = lat * RAD;
    return {sa:Math.sin(a), ca:Math.cos(a), sb:Math.sin(b), cb:Math.cos(b)};
  }

  function rotate(point, view) {
    const axial = point[0] * view.ca + point[2] * view.sa;
    return [point[2] * view.ca - point[0] * view.sa,
      point[1] * view.cb - axial * view.sb, axial * view.cb + point[1] * view.sb];
  }

  function inversePoint(x, y, view) {
    const z2 = 1 - x*x - y*y;
    if (z2 < 0) return null;
    const z = Math.sqrt(z2), axial = z * view.cb - y * view.sb;
    return [longitude((Math.atan2(x, axial) + Math.atan2(view.sa, view.ca)) / RAD),
      Math.asin(cap(y * view.cb + z * view.sb, -1, 1)) / RAD];
  }

  function greatArc(from, to, peak = 0, count = 80) {
    const a = sphere(...from), b = sphere(...to);
    const omega = Math.acos(cap(a[0]*b[0] + a[1]*b[1] + a[2]*b[2], -1, 1));
    const den = Math.sin(omega);
    if (den < 1e-8) return [a, b];
    return Array.from({length:count+1}, (_,i) => {
      const t = i / count, r = 1 + 4 * peak * t * (1-t);
      const left = r * Math.sin((1-t)*omega)/den, right = r * Math.sin(t*omega)/den;
      return a.map((v,j) => left*v + right*b[j]);
    });
  }

  function orbitPoint(node, phase, radius) {
    const n = node*RAD, a = phase, i = 55*RAD;
    return [radius*(Math.cos(n)*Math.cos(a) - Math.sin(n)*Math.sin(a)*Math.cos(i)),
      radius*Math.sin(a)*Math.sin(i),
      radius*(Math.sin(n)*Math.cos(a) + Math.cos(n)*Math.sin(a)*Math.cos(i))];
  }

  const orbits = [52,-68].map((node,index) => {
    const radius = 1.125;
    return {node, radius, points:Array.from({length:181}, (_,i) => orbitPoint(node, i*TAU/180, radius)), index};
  });

  const corridors = CORRIDORS.map(([kind,coords]) => ({kind,
    points:coords.slice(1).flatMap((p,i) => greatArc(coords[i],p,0,6).slice(i ? 1 : 0))}));
  const links = CLEARING.map(([name,lon,lat]) => {
    const point = sphere(lon,lat);
    const a = sphere(...BEIJING);
    const distance = Math.acos(cap(a[0]*point[0] + a[1]*point[1] + a[2]*point[2], -1,1));
    return {name, point, points:greatArc(BEIJING,[lon,lat],Math.min(.147,.024 + .063*distance),120)};
  });
  const parallels = Array.from({length:5}, (_,i) => {
    const lat = (i-2)*30;
    return {major:lat===0, points:Array.from({length:145}, (_,j) => sphere(-180+j*2.5,lat))};
  });
  const meridians = Array.from({length:12}, (_,i) => ({
    points:Array.from({length:73}, (_,j) => sphere(i*30, -90+j*2.5))}));
  const labels = LETTERING.map(([name,lon,lat,kind]) => ({name,point:sphere(lon,lat),kind}));

  function decodeContours(encoded) {
    const binary=atob(encoded), bytes=Uint8Array.from(binary, c=>c.charCodeAt(0));
    const reader=new DataView(bytes.buffer), rings=[];
    let offset=0;
    while(offset<bytes.length){
      const id=reader.getUint16(offset,true), count=reader.getUint16(offset+2,true);
      const coordinates=new Float32Array(count*3);
      offset+=4;
      for(let i=0;i<count;i++,offset+=4){
        coordinates.set(sphere(reader.getInt16(offset,true)/100,reader.getInt16(offset+2,true)/100),i*3);
      }
      rings.push({id,coordinates});
    }
    return rings;
  }

  // Graphic ink uses continuous projected paths. The index atlas separately owns all picking.
  function vectorInk(map,table,view,radius){
    const groups={coast:new Path2D(),countries:new Path2D(),active:new Path2D(),brics:new Path2D(),home:new Path2D()};
    for(const ring of map.outlines){
      const {id,coordinates}=ring;
      const path=new Path2D();
      let px=0,py=0,pz=0;
      for(let i=0;i<coordinates.length;i+=3){
        const a=coordinates[i],b=coordinates[i+1],c=coordinates[i+2];
        const axial=a*view.ca+c*view.sa;
        const x=(c*view.ca-a*view.sa)*radius, y=-(b*view.cb-axial*view.sb)*radius, z=axial*view.cb+b*view.sb;
        if(i && ((pz>=0)!==(z>=0))){
          const t=pz/(pz-z), hx=px+(x-px)*t, hy=py+(y-py)*t;
          if(pz>=0)path.lineTo(hx,hy);else path.moveTo(hx,hy);
        }
        if(z>=0){if(!i)path.moveTo(x,y);else path.lineTo(x,y);}
        px=x;py=y;pz=z;
      }
      if(!id){groups.coast.addPath(path);continue;}
      groups.countries.addPath(path);
      if(table[id].active)groups.active.addPath(path);
      if(table[id].home)groups.home.addPath(path);
      if(table[id].member)groups.brics.addPath(path);
    }
    return groups;
  }

  function loadPlate(key, file) {
    if (window[key]) return Promise.resolve(window[key]);
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = () => resolve(window[key]); script.onerror = reject;
      script.src = new URL(file, scriptBase); document.head.append(script);
    });
  }

  async function registerLettering(source) {
    const face = new FontFace('TNODiplomaticMap', 'url(' + source + ') format("woff")');
    document.fonts.add(await face.load());
  }

  let atlasPromise;
  function atlas() {
    if (atlasPromise) return atlasPromise;
    atlasPromise = (async () => {
      const [data, print] = await Promise.all([
        loadPlate('DIPLOMATIC_ATLAS', 'globe-assets/atlas.js'),
        loadPlate('DIPLOMATIC_PRINT', 'globe-assets/physical-print.js')
      ]);
      const image = new Image(), material = new Image();
      image.src = data.image; material.src = print.surface;
      await Promise.all([image.decode(), material.decode(), registerLettering(print.lettering)]);
      const layer = document.createElement('canvas');
      layer.width = image.width; layer.height = image.height;
      const ctx = layer.getContext('2d', {willReadFrequently:true});
      ctx.drawImage(image,0,0);
      const pixels=ctx.getImageData(0,0,image.width,image.height).data;
      ctx.drawImage(material,0,0);
      const relief = ctx.getImageData(0,0,image.width,image.height).data;
      const pitch=12, rowScreen=new Uint8Array(pitch);
      for(let y=0;y<image.height;y++){
        const bend=y*.77+4*Math.sin(y/59);
        for(let x=0;x<pitch;x++){
          const t=(x+bend)/pitch;
          rowScreen[x]=Math.round(Math.max(0,1-Math.abs(t-Math.round(t))*pitch/1.8)*5)*51;
        }
        for(let x=0,i=y*image.width*4;x<image.width;x++,i+=4){
          pixels[i+2]=relief[i]; pixels[i+3]=rowScreen[x%pitch];
        }
      }
      ctx.clearRect(0,0,layer.width,layer.height);
      ctx.lineCap='round';ctx.lineJoin='round';
      for(const [kind, coords] of CORRIDORS){
        const factor=image.width/360;
        ctx.beginPath();
        coords.forEach(([lon,lat],i)=>{
          const x=(180+lon)*factor,y=(90-lat)*factor;
          if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);
        });
        for(const [width,alpha] of [[8,.27],[5,.43],[2.5,.62]]){
          ctx.strokeStyle=kind==='land' ? 'rgba(255,0,0,'+alpha+')' : 'rgba(0,255,0,'+alpha+')';
          ctx.lineWidth=width*factor;ctx.stroke();
        }
      }
      const bands=ctx.getImageData(0,0,image.width,image.height).data;
      const corridor=new Uint8Array(image.width*image.height);
      for(let i=0;i<corridor.length;i++){
        const k=i*4;
        const channel=pixels[k]?bands[k]:bands[k+1];
        corridor[i]=Math.round(channel*bands[k+3]/255);
      }
      return {ids:data.ids,width:image.width,height:image.height,pixels,corridor,outlines:decodeContours(data.lines)};
    })();
    return atlasPromise;
  }

  function colorTable(map, membership, selected, brics) {
    return map.ids.map((code,index) => {
      const home = code==='CHN' || code==='SCS';
      const active = !!selected && membership.get(code)===selected;
      const member = brics && BRICS.has(code);
      const delta = ((index*37)%19)-9;
      const ground = active ? [51+delta*.68,98+delta*.88,149+delta*.95] : home ? [56,70,103]
        : member ? [51+delta*.47,59+delta*.54,96+delta*.8] : [35+delta*.56,52+delta*.7,57+delta*.76];
      const border = home ? [177,94,108] : active ? [115,171,214] : member ? [134,119,167] : [81,115,157];
      return {home,active,member,ground,border};
    });
  }

  // During longitudinal spin, latitude and lighting stay fixed. Retain their exact
  // inverse projection in Float64 arrays; only atlas longitude changes per frame.
  function surfaceImage(map, table, view, displayRadius, pixelScale, cache, surfaceOn) {
    const side = Math.max(8,Math.round(displayRadius*2*pixelScale));
    const r = side/2, w=map.width,h=map.height, source=map.pixels;
    if (cache.canvas.width!==side || cache.canvas.height!==side || !cache.image) {
      cache.canvas.width=cache.canvas.height=side;
      cache.image=cache.context.createImageData(side,side);
      cache.rows=Array.from({length:side},(_,row)=>{
        const y=(r-row-.5)/r, span=Math.sqrt(Math.max(0,1-y*y));
        return {y, from:Math.max(0,Math.floor(r*(1-span))), to:Math.min(side,Math.ceil(r*(1+span)))};
      });
    }
    if(cache.projectionSide!==side || cache.projectionLatitude!==view.sb){
      const count=side*side;
      if(!cache.projection || cache.projection.lon.length!==count)cache.projection={
        lon:new Float64Array(count),fy:new Float64Array(count),top:new Uint32Array(count),bottom:new Uint32Array(count),
        light:new Float64Array(count),rim:new Float64Array(count),alpha:new Uint8Array(count)
      };
      const p=cache.projection;
      for(let row=0;row<side;row++){
        const {y,from,to}=cache.rows[row],y2=1-y*y;
        for(let col=from;col<to;col++){
          const x=(col+.5-r)/r,radial=y2-x*x,k=row*side+col;
          if(radial<0){p.alpha[k]=0;continue;}
          const z=Math.sqrt(radial),axial=z*view.cb-y*view.sb;
          const lat=Math.asin(cap(y*view.cb+z*view.sb,-1,1));
          const v=(.5-lat/Math.PI)*h-.5,v0=Math.floor(v);
          p.lon[k]=Math.atan2(x,axial);p.fy[k]=v-v0;
          p.top[k]=Math.max(0,v0)*w;p.bottom[k]=Math.min(h-1,v0+1)*w;
          p.light[k]=.68+.35*z+.16*y-.17*x;
          p.rim[k]=(1-z)*(1-z)*Math.max(0,.42+.6*y-.75*x);
          p.alpha[k]=Math.round(Math.min(1,radial*r*.63)*255);
        }
      }
      cache.projectionSide=side;cache.projectionLatitude=view.sb;
    }
    const dst=cache.image.data, lon0=Math.atan2(view.sa,view.ca), projection=cache.projection;
    for(let row=0;row<side;row++) {
      const {from,to}=cache.rows[row];
      for(let col=from;col<to;col++){
        const pixel=row*side+col,out=pixel*4,opacity=projection.alpha[pixel];
        if(!opacity){dst[out+3]=0;continue;}
        const lon=projection.lon[pixel]+lon0;
        const u=(lon/TAU+.5)*w-.5,u0=Math.floor(u),fx=u-u0,fy=projection.fy[pixel];
        const left=(u0+2*w)%w,right=(left+1)%w;
        const top=projection.top[pixel],bottom=projection.bottom[pixel];
        const a=(top+left)*4,b=(top+right)*4,c=(bottom+left)*4,d=(bottom+right)*4;
        const k=(fy<.5?top:bottom)*4+(fx<.5?left:right)*4;
        const id=source[k];
        const northwest=(1-fx)*(1-fy),northeast=fx*(1-fy),southwest=(1-fx)*fy,southeast=fx*fy;
        const ink=(source[a+1]*northwest+source[b+1]*northeast+source[c+1]*southwest+source[d+1]*southeast)/255;
        const relief=(source[a+2]*northwest+source[b+2]*northeast+source[c+2]*southwest+source[d+2]*southeast-128)/128;
        // One high northwest light and a grazing rim model the round copperplate.
        const directional=projection.light[pixel],grazing=projection.rim[pixel];
        let rr,gg,bb;
        if(id){
          const region=table[id], ground=region.ground, edge=region.border;
          const screen=(source[a+3]*northwest+source[b+3]*northeast+source[c+3]*southwest+source[d+3]*southeast)/255;
          const hatching=(region.home || region.active) ? screen*(region.home?21:18) : 0;
          // A dry shadow bite and a cold raised edge model real ridges even within the selected country.
          const shadow=Math.min(0,relief)*65, highlight=Math.max(0,relief)*62;
          const strength=ink*.16;
          rr=(ground[0]+shadow*.69+highlight*.82+hatching*.63)*(1-strength)+edge[0]*strength;
          gg=(ground[1]+shadow*.83+highlight*.98+hatching*.94)*(1-strength)+edge[1]*strength;
          bb=(ground[2]+shadow+highlight*1.03+hatching*1.07)*(1-strength)+edge[2]*strength;
        }else{
          const floor=relief*51;
          rr=10+floor*.61+ink*7;
          gg=23+floor*.92+ink*14;
          bb=28+floor*.98+ink*16;
        }
        if(surfaceOn){
          const band=map.corridor[k>>2]/255;
          if(band){
            const stripe=.80+.32*source[k+3]/255;
            rr+=band*(id?3:9)*stripe;gg+=band*(id?49:23)*stripe;bb+=band*(id?60:71)*stripe;
          }
        }
        dst[out]=rr*directional+grazing*9;dst[out+1]=gg*directional+grazing*21;dst[out+2]=bb*directional+grazing*32;
        dst[out+3]=opacity;
      }
    }
    cache.context.putImageData(cache.image,0,0);
  }

  function inkPath(ctx, points, view, front, radius, color, width, dash=[]) {
    ctx.beginPath();
    let old;
    for(const point of points) {
      const p=rotate(point,view), inside=front ? p[2]>=0 : p[2]<0;
      if(old) {
        const was=front ? old[2]>=0 : old[2]<0;
        if(inside!==was) {
          const t=old[2]/(old[2]-p[2]);
          const x=radius*(old[0]+(p[0]-old[0])*t), y=-radius*(old[1]+(p[1]-old[1])*t);
          if(was)ctx.lineTo(x,y);else ctx.moveTo(x,y);
        }
      }
      if(inside){
        if(!old)ctx.moveTo(p[0]*radius,-p[1]*radius);
        else ctx.lineTo(p[0]*radius,-p[1]*radius);
      }
      old=p;
    }
    ctx.setLineDash(dash);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();ctx.setLineDash([]);
  }

  function satellite(ctx,x,y,scale,tangent) {
    ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
    // The perspective solar arrays, two bus faces, feed horn and antenna stay readable at atlas scale.
    ctx.rotate(tangent + .26);
    if(Math.cos(tangent+.26)<0)ctx.rotate(Math.PI);
    const face=(points,fill,stroke,width=.75)=>{
      ctx.beginPath();points.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));
      ctx.closePath();ctx.fillStyle=fill;ctx.fill();
      if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}
    };
    ctx.lineCap='round';ctx.lineJoin='round';
    ctx.strokeStyle='#b7c8e1';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(-11,1);ctx.lineTo(12,-1.5);ctx.stroke();
    for(const side of [-1,1]){
      ctx.save();ctx.scale(side,1);
      face([[7,-2],[25,-4],[26,2],[8,5]],'#263b51','#b4c4e5',.8);
      face([[8,-1],[24,-3],[24.6,1.1],[8.5,3.8]],'#445771');
      ctx.strokeStyle='#94a4b4';ctx.lineWidth=.55;
      ctx.beginPath();
      for(let k=0;k<5;k++){const a=10.6+k*3;ctx.moveTo(a,-1.4-k*.32);ctx.lineTo(a+.6,3.5-k*.4);}
      ctx.moveTo(8.3,1.2);ctx.lineTo(24.4,-1);ctx.stroke();ctx.restore();
    }
    face([[-5,-3],[-.7,-6.3],[5.3,-3.1],[1.1,.1]],'#dbe8f5','#a3b6d0');
    face([[-5,-3],[1.1,.1],[1.1,5.8],[-4.9,3.1]],'#93a9c0','#c4d5ef');
    face([[1.1,.1],[5.3,-3.1],[5.5,2.7],[1.1,5.8]],'#505e7b','#9eafcc');
    ctx.strokeStyle='#adbed9';ctx.lineWidth=.8;
    ctx.beginPath();ctx.moveTo(-2,-5);ctx.lineTo(-4.4,-9);ctx.lineTo(-5.7,-11.5);ctx.moveTo(2,3);ctx.lineTo(3.6,8.8);ctx.stroke();
    ctx.beginPath();ctx.ellipse(-4.8,-8.7,3.1,1.05,.65,0,TAU);ctx.fillStyle='#c1ccdf';ctx.fill();ctx.stroke();
    ctx.restore();
  }

  function createDiplomaticGlobe(canvas,{regions={},onRegion}={}) {
    const ctx=canvas.getContext('2d');
    const cacheCanvas=document.createElement('canvas');
    const cache={canvas:cacheCanvas,context:cacheCanvas.getContext('2d')};
    const events=new AbortController();
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const membership=new Map(), islandPoints=[];
    for(const [region,record] of Object.entries(regions)){
      for(const code of [...(record.partners || []),...(record.mapOnly || [])])membership.set(code,region);
      for(const [code,x,y] of record.islets || [])islandPoints.push({code,region,point:sphere(x,y)});
    }
    const smallLandCodes=new Set(islandPoints.map(island=>island.code));
    const layers={surface:true,brics:true,orbit:true,arc:true};
    const home=[100,27];
    let lon=home[0],lat=home[1],selected='',map,table;
    let width=0,height=0,radius=0,device=1,phase=126*RAD;
    let dirty=true,frame=0,timer=0,visible=true,dead=false,pointer=null,tween=null,lastTime=null;
    let lastRasterScale=0,keyboardAim=false,spinResumeAt=0;
    const SPIN_DEGREES_PER_MS=.002, SPIN_FRAME_MS=50, AIM_HOLD_MS=1600;
    const oldKeys=canvas.getAttribute('aria-keyshortcuts'),oldDescription=canvas.getAttribute('aria-description');
    canvas.setAttribute('aria-keyshortcuts','ArrowLeft ArrowRight ArrowUp ArrowDown Enter Home 1 2 3 4 5 6 7 8 9 0 [ ]');
    const regionNames=REGION_KEYS.map((id,i)=>regions[id]?.name ? (i+1)%10+' '+regions[id].name : '').filter(Boolean);
    canvas.setAttribute('aria-description','方向键旋转，回车选中准星所在陆地，左右方括号依次选择地区。'+regionNames.join('，'));
    const oldTouch=canvas.style.touchAction, oldCursor=canvas.style.cursor;
    canvas.style.touchAction='none';canvas.style.cursor='grab';

    function refreshInk(){
      if(map)table=colorTable(map,membership,selected,layers.brics);
      dirty=true;queue();
    }
    function queue(){
      if(dead || !visible || document.hidden || !map)return;
      window.clearTimeout(timer);timer=0;
      if(!frame)frame=requestAnimationFrame(paint);
    }
    function resize(){
      const rect=canvas.getBoundingClientRect();
      const previousRadius=radius;
      width=rect.width;height=rect.height;
      // Keep enough source pixels when the fixed desktop chart is scaled down by its host.
      const hostScale=width>0 ? Math.max(1,canvas.clientWidth/width) : 1;
      device=cap((window.devicePixelRatio||1)*hostScale,1,2);
      radius=Math.min(width,height)*.428;
      if(radius!==previousRadius)dirty=true;
      const w=Math.max(1,Math.round(width*device)),h=Math.max(1,Math.round(height*device));
      if(w!==canvas.width || h!==canvas.height){canvas.width=w;canvas.height=h;dirty=true;}
      queue();
    }
    function stopPending(){
      cancelAnimationFrame(frame);clearTimeout(timer);frame=timer=0;lastTime=null;
    }

    function drawOrbit(view,front){
      for(const plane of orbits){
        const color=plane.index===0 ? (front?'rgba(187,177,230,.81)':'rgba(141,141,188,.68)') :
          (front?'rgba(161,166,205,.52)':'rgba(127,130,177,.48)');
        inkPath(ctx,plane.points,view,front,radius,color,plane.index===0?.95:.73,plane.index?[3.5,2]:[]);
      }
      const position=rotate(orbitPoint(orbits[0].node,phase,orbits[0].radius),view);
      if((position[2]>=0)===front){
        const next=rotate(orbitPoint(orbits[0].node,phase+.02,orbits[0].radius),view);
        const tangent=Math.atan2(position[1]-next[1],next[0]-position[0]);
        satellite(ctx,position[0]*radius,-position[1]*radius,cap(radius/220,.59,1.13),tangent);
      }
    }
    function drawArcs(view,front){
      for(const link of links)inkPath(ctx,link.points,view,front,radius,
        front?'rgba(232,110,147,.94)':'rgba(186,91,127,.73)',front?1.15:.85,[5.0,1.65]);
    }
    function fixedMap(view){
      ctx.drawImage(cache.canvas,-radius,-radius,radius*2,radius*2);
      ctx.save();ctx.beginPath();ctx.arc(0,0,radius-.15,0,TAU);ctx.clip();
      const stroke=(path,width,color,dash=[])=>{
        ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle=color;ctx.lineWidth=width;
        ctx.setLineDash(dash);ctx.stroke(path);ctx.setLineDash([]);
      };
      const ink=cache.vectorInk;
      stroke(ink.coast,2.45,'rgba(42,78,120,.52)');
      stroke(ink.countries,.67,'rgba(101,136,177,.80)');
      stroke(ink.coast,.87,'rgba(107,160,206,.95)');
      stroke(ink.active,1.25,'rgba(150,213,249,.98)');
      stroke(ink.brics,1.12,'rgba(180,144,219,.98)',[2.5,2.4]);
      stroke(ink.home,1.32,'rgba(247,125,125,.99)');
      // The small-scale project atlas omits minor islands. Print their geographic anchors at the scale of coast ink.
      for(const island of islandPoints){
        const [x,y,z]=rotate(island.point,view);if(z<.025)continue;
        const emphasized=island.region===selected;
        ctx.beginPath();ctx.arc(x*radius,-y*radius,emphasized?1.5:.95,0,TAU);
        ctx.fillStyle=emphasized?'#a4d9f7':'#719bbb';ctx.fill();
      }
      for(const line of meridians)inkPath(ctx,line.points,view,true,radius,'rgba(101,147,191,.26)',.65,[1.2,2.8]);
      for(const line of parallels)inkPath(ctx,line.points,view,true,radius,
        line.major?'rgba(117,166,205,.44)':'rgba(101,147,191,.26)',line.major?.8:.65,line.major?[]:[1.2,2.8]);
      if(layers.surface){
        for(const route of corridors){
          const land=route.kind==='land';
          inkPath(ctx,route.points,view,true,radius,land?'rgba(88,211,226,.96)':'rgba(115,167,240,.98)',
            land?1.12:1.06,land?[]:[2.8,2.35]);
        }
      }
      ctx.restore();
      ctx.beginPath();ctx.arc(0,0,radius,0,TAU);
      ctx.lineWidth=1.10;ctx.strokeStyle='rgba(99,184,220,.92)';ctx.stroke();
      ctx.beginPath();ctx.arc(0,0,radius+1.9,Math.PI*1.1,Math.PI*1.91);
      ctx.lineWidth=.65;ctx.strokeStyle='rgba(147,202,236,.77)';ctx.stroke();
    }
    function lettering(view){
      const occupied=[];
      const ratio=cap(radius/218,.72,1.14);
      const put=(text,x,y,size,color,spacing)=>{
        ctx.font=(size*ratio)+'px TNODiplomaticMap';
        text=text.replaceAll(' ','');
        ctx.letterSpacing=spacing*ratio+'px';
        const w=ctx.measureText(text).width,h=size*ratio;
        const box=[x-w/2-3,y-h/2-2,x+w/2+3,y+h/2+2];
        if(occupied.some(b=>b[0]<box[2]&&b[2]>box[0]&&b[1]<box[3]&&b[3]>box[1]))return;
        occupied.push(box);
        ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.lineJoin='round';ctx.lineWidth=2.2;ctx.strokeStyle='rgba(10,21,27,.84)';
        ctx.strokeText(text,x,y);ctx.fillStyle=color;ctx.fillText(text,x,y);
        return true;
      };
      const projected=labels.map(label=>({...label,p:rotate(label.point,view)}));
      const byDepth=(a,b)=>b.p[2]-a.p[2];
      const homeLabel=projected.find(label=>label.kind==='home');
      if(homeLabel.p[2]>.43)put(homeLabel.name,homeLabel.p[0]*radius,-homeLabel.p[1]*radius,19,'#f4cbd0',2.65);
      const pin=(p,name,shape,show)=>{
        const q=rotate(p,view);
        if(q[2]<.10)return;
        const x=q[0]*radius,y=-q[1]*radius;
        ctx.strokeStyle=shape==='star'?'#ff8d88':'#f291b5';ctx.fillStyle='#172239';ctx.lineWidth=.9;
        ctx.beginPath();
        if(shape==='star'){
          const s=4.5*ratio;
          ctx.moveTo(x,y-s);ctx.lineTo(x+s,y);ctx.lineTo(x,y+s);ctx.lineTo(x-s,y);ctx.closePath();
        }else ctx.arc(x,y,2.45*ratio,0,TAU);
        ctx.fill();ctx.stroke();ctx.fillStyle=shape==='star'?'#ff696e':'#ec86ac';ctx.fillRect(x-.65,y-.65,1.3,1.3);
        if(show && q[2]>.46)put(name,x+12*ratio,y-9*ratio,11.1,'#e6bace',.5);
      };
      pin(sphere(...BEIJING),'北京','star',true);
      if(layers.arc)for(const link of links)pin(link.point,link.name,'ring',true);
      let written=0;
      for(const o of projected.filter(l=>l.kind==='nation').sort(byDepth)){
        if(o.p[2]<.47 || written>=(radius<185?4:7))break;
        const before=occupied.length;
        put(o.name,o.p[0]*radius,-o.p[1]*radius,13.9,'#d3deed',1.05);
        if(occupied.length>before)written++;
      }
      const named=new Set();
      for(const o of projected.filter(l=>l.kind==='sea' || l.kind==='terrain').sort(byDepth)){
        if(o.p[2]<.42)break;
        if(!named.has(o.name) && put(o.name,o.p[0]*radius,-o.p[1]*radius,12.0,
          o.kind==='sea'?'#91aac6':'#a4bad1',2.1))named.add(o.name);
      }
      ctx.letterSpacing='0px';
    }
    function paint(time){
      frame=0;
      if(dead || document.hidden || !visible || !map || radius<=1)return;
      const elapsed=lastTime===null?0:Math.min(170,time-lastTime);
      lastTime=time;
      if(layers.orbit && !preference.matches)phase=(phase+elapsed*.000052)%TAU;
      if(!tween && !pointer && time>=spinResumeAt && !preference.matches && elapsed>0){
        lon=longitude(lon+elapsed*SPIN_DEGREES_PER_MS);keyboardAim=false;dirty=true;
      }
      if(tween){
        const t=cap((time-tween.start)/tween.duration,0,1),e=t*t*(3-2*t);
        lon=longitude(tween.lon+tween.delta*e);lat=tween.lat+(tween.to-tween.lat)*e;dirty=true;
        if(t===1)tween=null;
      }
      const view=viewFor(lon,lat);
      const moving=tween || pointer?.dragged;
      const rasterScale=moving ? Math.min(1,device) : Math.min(device,1.65);
      if(dirty || rasterScale!==lastRasterScale){
        surfaceImage(map,table,view,radius,rasterScale,cache,layers.surface);
        cache.vectorInk=vectorInk(map,table,view,radius);
        dirty=false;lastRasterScale=rasterScale;
      }
      ctx.setTransform(device,0,0,device,0,0);
      ctx.clearRect(0,0,width,height);ctx.translate(width/2,height/2);
      ctx.lineJoin='round';ctx.lineCap='round';
      if(layers.arc)drawArcs(view,false);
      if(layers.orbit)drawOrbit(view,false);
      fixedMap(view);
      if(layers.arc)drawArcs(view,true);
      if(layers.orbit)drawOrbit(view,true);
      lettering(view);
      if(keyboardAim && canvas===document.activeElement){
        ctx.beginPath();
        for(const [x,y] of [[-1,0],[1,0],[0,-1],[0,1]]){ctx.moveTo(x*5,y*5);ctx.lineTo(x*9,y*9);}
        ctx.lineWidth=1;ctx.strokeStyle='#b5d7f1';ctx.stroke();
      }
      canvas.dataset.globeReady='true';
      if(tween)queue();
      else if(!preference.matches)timer=window.setTimeout(queue,SPIN_FRAME_MS);
    }
    function focusLocation(targetLon,targetLat,{animate=true}={}){
      if(!Number.isFinite(targetLon)||!Number.isFinite(targetLat))return;
      spinResumeAt=performance.now()+AIM_HOLD_MS;
      const a=longitude(targetLon),b=cap(targetLat,-88,88);
      const delta=longitude(a-lon);
      if(preference.matches || !animate || !map || (Math.abs(delta)<.5 && Math.abs(b-lat)<.5)){
        tween=null;lon=a;lat=b;
      }else{
        tween={lon,lat,to:b,delta,start:performance.now(),duration:420+Math.abs(delta)*1.38};
      }
      dirty=true;queue();
    }
    function selectRegion(id,{orient=true}={}){
      const region=regions[id];if(!region)return;
      selected=id;refreshInk();
      if(orient)focusLocation(region.lon,region.lat);
    }
    function setLayer(key,on){
      if(!Object.hasOwn(layers,key) || layers[key]===!!on)return;
      layers[key]=!!on;
      if(key==='brics')refreshInk();
      else{if(key==='surface')dirty=true;queue();}
    }
    function mapPoint(clientX,clientY){
      const rect=canvas.getBoundingClientRect();
      return inversePoint((clientX-rect.left-width/2)/radius,(rect.top+height/2-clientY)/radius,viewFor(lon,lat));
    }
    function pick(point){
      if(!map || !point)return null;
      const x=Math.min(map.width-1,Math.floor((point[0]+180)/360*map.width));
      const y=Math.min(map.height-1,Math.floor((90-point[1])/180*map.height));
      const code=map.ids[map.pixels[(y*map.width+x)*4]];
      const region=membership.get(code);
      if(region && smallLandCodes.has(code))return {region,code};
      // Allow a small geographic tolerance around charted islets without taking land from adjacent regions.
      const probe=sphere(...point);
      let nearest=null,best=Math.cos(cap(4.5/Math.max(radius,1),.009,.028));
      for(const island of islandPoints){
        if(region && region!==island.region)continue;
        const v=island.point, proximity=probe[0]*v[0]+probe[1]*v[1]+probe[2]*v[2];
        if(proximity>best){nearest=island;best=proximity;}
      }
      if(nearest)return {region:nearest.region,code:nearest.code};
      return region && regions[region] ? {region,code} : null;
    }
    function activate(point){
      const target=pick(point);
      if(!target)return;
      selectRegion(target.region,{orient:false});
      onRegion?.(target.region,target.code);
    }
    function down(e){
      if(!e.isPrimary || e.button!==0 || !map || !mapPoint(e.clientX,e.clientY))return;
      tween=null;keyboardAim=false;
      pointer={id:e.pointerId,x:e.clientX,y:e.clientY,lon,lat,dragged:false};
      canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';queue();
    }
    function move(e){
      if(!pointer){
        if(e.pointerType!=='touch')canvas.style.cursor=pick(mapPoint(e.clientX,e.clientY))?'pointer':'grab';
        return;
      }
      if(pointer.id!==e.pointerId)return;
      const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;
      if(Math.hypot(dx,dy)>4)pointer.dragged=true;
      if(!pointer.dragged)return;
      const scale=67/Math.max(1,radius);
      lon=longitude(pointer.lon-dx*scale);
      lat=cap(pointer.lat+dy*scale,-88,88);
      dirty=true;queue();
    }
    function finish(e,cancelled){
      if(!pointer || e.pointerId!==pointer.id)return;
      const wasTap=!cancelled&&!pointer.dragged;
      pointer=null;spinResumeAt=performance.now()+AIM_HOLD_MS;canvas.style.cursor='grab';
      if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
      if(wasTap){
        activate(mapPoint(e.clientX,e.clientY));
      }
      queue();
    }
    function keyboard(e){
      if(e.ctrlKey || e.metaKey || e.altKey)return;
      if(e.key==='[' || e.key===']'){
        const keys=Object.keys(regions);
        if(keys.length){
          const i=keys.indexOf(selected), step=e.key==='['?-1:1;
          const id=keys[(i+step+keys.length)%keys.length];
          e.preventDefault();keyboardAim=false;selectRegion(id);onRegion?.(id);
        }
        return;
      }
      if(/^[0-9]$/.test(e.key)){
        const id=REGION_KEYS[(Number(e.key)+9)%10];
        if(regions[id]){
          e.preventDefault();keyboardAim=false;
          selectRegion(id);onRegion?.(id);
        }
        return;
      }
      const jump=e.shiftKey?22:8;
      const keys={ArrowLeft:[-jump,0],ArrowRight:[jump,0],ArrowUp:[0,jump],ArrowDown:[0,-jump]};
      if(keys[e.key]){
        e.preventDefault();keyboardAim=true;const d=keys[e.key];focusLocation(lon+d[0],lat+d[1],{animate:false});
      }else if(e.key==='Home'){e.preventDefault();keyboardAim=true;focusLocation(...home);}
      else if(e.key==='Enter'){
        e.preventDefault();spinResumeAt=performance.now()+AIM_HOLD_MS;activate([lon,lat]);
      }
    }
    function destroy(){
      dead=true;stopPending();events.abort();sizeObserver.disconnect();visibilityObserver?.disconnect();
      canvas.style.touchAction=oldTouch;canvas.style.cursor=oldCursor;delete canvas.dataset.globeReady;
      if(oldKeys===null)canvas.removeAttribute('aria-keyshortcuts');else canvas.setAttribute('aria-keyshortcuts',oldKeys);
      if(oldDescription===null)canvas.removeAttribute('aria-description');else canvas.setAttribute('aria-description',oldDescription);
    }
    const listen=(target,type,listener)=>target.addEventListener(type,listener,{signal:events.signal});
    listen(canvas,'pointerdown',down);listen(canvas,'pointermove',move);
    listen(canvas,'pointerup',e=>finish(e,false));listen(canvas,'pointercancel',e=>finish(e,true));
    listen(canvas,'lostpointercapture',e=>finish(e,true));listen(canvas,'keydown',keyboard);
    listen(canvas,'blur',()=>{keyboardAim=false;queue();});
    listen(document,'visibilitychange',()=>{if(document.hidden)stopPending();else queue();});
    listen(preference,'change',queue);
    // Host fitting can change the ancestor transform after this listener, without a layout reflow.
    listen(window,'resize',()=>requestAnimationFrame(()=>{if(!dead)resize();}));
    const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(canvas);
    const visibilityObserver=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{
      visible=entries[entries.length-1].isIntersecting;if(visible)queue();else stopPending();
    }):null;
    visibilityObserver?.observe(canvas);
    resize();
    atlas().then(result=>{
      if(dead)return;
      map=result;refreshInk();
    }).catch(error=>{
      if(!dead){canvas.dataset.globeReady='error';console.error('Diplomatic atlas could not be read.',error);}
    });
    return {selectRegion,setLayer,focusLocation,destroy};
  }
  window.createDiplomaticGlobe=createDiplomaticGlobe;
})();
