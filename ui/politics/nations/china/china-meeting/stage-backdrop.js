'use strict';

// Physical proscenium, recessed gold curtain and ten independently draped flags.
// No picture plane or depth-only mask participates in this backdrop.
window.buildChinaStageBackdrop=function buildChinaStageBackdrop({add,items,project}){
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const mix=(a,b,t)=>a+(b-a)*t;
  const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);};
  const sub=(a,b)=>a.map((v,i)=>v-b[i]);
  const norm=v=>{const d=Math.hypot(...v)||1;return v.map(x=>x/d);};
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const dot=(a,b)=>a.reduce((n,v,i)=>n+v*b[i],0);
  const light=norm([1,.38,.2]);
  const lit=(n,ambient=.43,strength=.68)=>ambient+strength*Math.max(0,dot(norm(n),light));
  let part='frame';
  function face(p,color,material=0,uv,shades){
    add(p,color,'none',0);
    const m=items.at(-1).mesh[0];
    m.material=material;m.stagePart=part;
    m.uv=uv||p.map((_,i)=>[[0,0],[1,0],[1,1],[0,1]][i%4]);
    if(shades)m.shades=shades;
    return m;
  }
  function box(x1,x2,y1,y2,z1,z2,color,material=0){
    const a=[x1,y1,z1],b=[x2,y1,z1],c=[x2,y1,z2],d=[x1,y1,z2],e=[x1,y2,z1],f=[x2,y2,z1],g=[x2,y2,z2],h=[x1,y2,z2];
    for(const [p,n] of [[[e,f,g,h],[0,1,0]],[[b,f,g,c],[1,0,0]],[[d,h,g,c],[0,0,1]],[[a,e,h,d],[-1,0,0]],[[a,b,f,e],[0,0,-1]],[[a,d,c,b],[0,-1,0]]])face(p,color,material,undefined,p.map(()=>lit(n,.55,.48)));
  }
  function tube(points,radius,color,material=0,sides=8){
    const rings=points.map((p,i)=>{
      const tangent=norm(sub(points[Math.min(points.length-1,i+1)],points[Math.max(0,i-1)]));
      const a=norm(cross(tangent,Math.abs(tangent[1])>.9?[1,0,0]:[0,1,0])),b=norm(cross(tangent,a));
      return Array.from({length:sides},(_,j)=>{const t=j*Math.PI*2/sides,n=a.map((v,k)=>v*Math.cos(t)+b[k]*Math.sin(t));return{p:p.map((v,k)=>v+radius*n[k]),shade:lit(n,.43,.7)};});
    });
    for(let i=0;i<rings.length-1;i++)for(let j=0;j<sides;j++){
      const q=[rings[i][j],rings[i+1][j],rings[i+1][(j+1)%sides],rings[i][(j+1)%sides]];
      face(q.map(v=>v.p),color,material,undefined,q.map(v=>v.shade));
    }
    face(rings[0].map(v=>v.p),color,material);
    face(rings.at(-1).map(v=>v.p),color,material);
  }
  function surface(sample,cols,rows,color,material,shadeAt,orientation=[1,0,0]){
    const vertices=Array.from({length:rows+1},(_,j)=>Array.from({length:cols+1},(_,i)=>{
      const u=i/cols,v=j/rows,p=sample(u,v),e=.0001;
      const du=sub(sample(Math.min(1,u+e),v),sample(Math.max(0,u-e),v)),dv=sub(sample(u,Math.min(1,v+e)),sample(u,Math.max(0,v-e)));
      let n=cross(du,dv);if(dot(n,orientation)<0)n=n.map(x=>-x);
      return{p,uv:[u,v],shade:lit(n,.70,.38)*(shadeAt?shadeAt(p,u,v,n):1)};
    }));
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
      const q=[vertices[j][i],vertices[j][i+1],vertices[j+1][i+1],vertices[j+1][i]];
      face(q.map(v=>v.p),color,material,q.map(v=>v.uv),q.map(v=>v.shade));
    }
    return vertices.flat();
  }
  const frontX=-650,rearX=-1020,openingFar=-355,openingNear=650,gridRear=-770;
  const roofY=x=>mix(343,388,(x-gridRear)/(frontX-gridRear));
  const frameCorners=[[frontX,414,700],[frontX,414,-405],[frontX,0,-405],[frontX,0,700]];
  const curtainCorners=[[-1012,307,650],[-1012,307,-355],[-1012,44,-355],[-1012,44,650]];
  const emblemCorners=[[-865,250.5,194.5],[-865,250.5,95.5],[-865,133.5,95.5],[-865,133.5,194.5]];

  const banner={text:window.CHINA_MEETING?.banner?.trim()||'中华民族的伟大复兴势不可挡',corners:[[-690,354,620],[-690,354,-345],[-690,301,-345],[-690,301,620]]};
  part='banner';
  face(banner.corners,'#ffffff',15,[[0,0],[1,0],[1,1],[0,1]]);
  box(-700,-691,299,356,-347,622,'#5b2c20',11);
  // A mahogany lintel, stepped stone reveals and small entrance downlights.
  box(-706,-691,354,360,-352,627,'#95613e',11);
  box(-706,-691,295,301,-352,627,'#704328',11);
  part='frame';
  // The front jambs are shallow stone bodies. The inner returns lie on their
  // correct side planes and reveal 370 units of actual stage depth.
  box(frontX-22,frontX,0,414,650,700,'#d2c3a5',13);
  box(frontX-22,frontX,0,414,-405,-355,'#c9bba0',13);
  box(frontX-22,frontX,388,414,-355,650,'#d1c1a2',13);
  box(frontX-1,frontX+2.1,406,414,-405,700,'#dbc9a8',13);
  box(frontX-1,frontX+2.1,0,414,692,700,'#deceb1',13);
  box(frontX-1,frontX+2.1,0,414,-405,-397,'#d3c2a5',13);
  for(const side of [-1,1]){
    const z=side>0?openingNear:openingFar;
    const cuts=[rearX,-970,-920,-870,-820,gridRear,-730,-690,frontX];
    for(let k=0;k<cuts.length-1;k++){
      const x1=cuts[k],x2=cuts[k+1],back=x2<=gridRear;
      const y1=back?414:roofY(x1),y2=back?414:roofY(x2),a=(x1-rearX)/(frontX-rearX),b=(x2-rearX)/(frontX-rearX);
      const shade=mix(.46,.88,(a+b)/2);
      face([[x1,110,z],[x2,110,z],[x2,y2,z],[x1,y1,z]],side>0?'#ad9a7e':'#c1ae8c',13,[[a,1],[b,1],[b,0],[a,0]],[shade,shade+.02,shade+.1,shade+.06]);
      face([[x1,44,z],[x2,44,z],[x2,110,z],[x1,110,z]],'#785038',11,[[a,1],[b,1],[b,0],[a,0]],[shade*.7,shade*.75,shade*.9,shade*.86]);
    }
    // Narrow horizontal wood mouldings reinforce the depth of both returns.
    box(rearX,frontX,108,111,z-1.1,z+1.1,'#8d6848',11);
  }
  // The polished reveals have several shallow profiles rather than one slab.
  for(let n=0;n<3;n++){
    const inset=n*3.5,x=frontX+1+n*.8;
    box(x-.7,x,5,405,653+inset,655+inset,'#ded4be',13);
    box(x-.7,x,5,405,-361-inset,-359-inset,'#b9ad95',13);
    box(x-.7,x,389+inset,391+inset,-359-inset,655+inset,'#ded4be',13);
  }
  for(let n=0;n<22;n++){
    const z=mix(-337,632,n/21);
    face([[-667,386,z-4],[-654,386,z-4],[-654,386,z+4],[-667,386,z+4]],'#f5e2bd',0,undefined,[.95,1.07,1.07,.95]);
  }
  box(frontX-7,frontX+.5,25,389,645,650,'#8b795b',11);
  box(frontX-7,frontX+.5,25,389,-355,-350,'#806d51',11);
  box(frontX-7,frontX+.5,386,391,-350,645,'#9d8b6b',11);

  // The sloped coffer board occupies the front 120 units only. The actual
  // backstage roof is higher and dark, rather than a 370-unit grazing grid.
  face([[rearX,414,-355],[gridRear,414,-355],[gridRear,414,650],[rearX,414,650]],'#292821',0,undefined,[.48,.64,.64,.48]);
  face([[rearX,281,-355],[rearX,414,-355],[rearX,414,650],[rearX,281,650]],'#30291e',0,undefined,[.52,.38,.38,.52]);
  face([[gridRear,350,-355],[frontX,395,-355],[frontX,395,650],[gridRear,350,650]],'#23231e');
  const coffers=[];
  function roofStrip(x1,x2,z1,z2,inset,color,material){
    const p=[[x1,roofY(x1)+inset,z1],[x2,roofY(x2)+inset,z1],[x2,roofY(x2)+inset,z2],[x1,roofY(x1)+inset,z2]];
    face(p,color,material,undefined,[.55,.84,.84,.55]);
    for(let i=0;i<4;i++){const a=p[i],b=p[(i+1)%4];face([a,b,[b[0],b[1]+5,b[2]],[a[0],a[1]+5,a[2]]],color,material,undefined,[.42,.61,.75,.53]);}
  }
  // One shared set of broad structural ribs; no second inset decorative frame.
  for(let row=0;row<=3;row++){
    const x=mix(gridRear,frontX,row/3);
    roofStrip(Math.max(gridRear,x-2.6),Math.min(frontX,x+2.6),openingFar,openingNear,0,'#c3b393',13);
  }
  for(let col=0;col<=16;col++){
    const z=mix(openingFar,openingNear,col/16);
    roofStrip(gridRear,frontX,Math.max(openingFar,z-3.6),Math.min(openingNear,z+3.6),0,'#c3b393',13);
  }
  for(let row=0;row<3;row++)for(let col=0;col<16;col++){
    const x1=mix(gridRear,frontX,row/3),x2=mix(gridRear,frontX,(row+1)/3),z1=mix(openingFar,openingNear,col/16),z2=mix(openingFar,openingNear,(col+1)/16);
    const rim=[[x1+2.6,z1+3.6],[x2-2.6,z1+3.6],[x2-2.6,z2-3.6],[x1+2.6,z2-3.6]];
    const bottom=rim.map(p=>[p[0],roofY(p[0])+4.5,p[1]]);
    face(bottom,'#c8c6b8',14,[[0,0],[1,0],[1,1],[0,1]],[.65,.96,.96,.65]);
    for(let edge=0;edge<4;edge++){
      const next=(edge+1)%4,a=rim[edge],b=rim[next];
      face([[a[0],roofY(a[0]),a[1]],[b[0],roofY(b[0]),b[1]],bottom[next],bottom[edge]],'#a2957b',13,undefined,[.88,.88,.45,.45]);
    }
    if((row+col)%4===1){
      const cx=(x1+x2)/2,cz=(z1+z2)/2;
      face([[cx-10,roofY(cx-10)+4.35,cz-8],[cx+10,roofY(cx+10)+4.35,cz-8],[cx+10,roofY(cx+10)+4.35,cz+8],[cx-10,roofY(cx-10)+4.35,cz+8]],'#343a35');
      face([[cx-7.4,roofY(cx-7.4)+4.28,cz-5.4],[cx+7.4,roofY(cx+7.4)+4.28,cz-5.4],[cx+7.4,roofY(cx+7.4)+4.28,cz+5.4],[cx-7.4,roofY(cx-7.4)+4.28,cz+5.4]],'#c1c5b6',0,undefined,[.43,.69,.92,.69]);
    }
    coffers.push({x1,x2,z1,z2,frontY:roofY(x2),rearY:roofY(x1),recess:4.5});
  }
  // Lamps occupy only a narrow service strip at the far entrance. The deep
  // return behind this strip remains open to the eye rather than a lit facade.
  const frameLights=[];
  for(let row=0;row<7;row++)for(let col=0;col<2;col++){
    const x=-704+col*22,y=59+row*29,z=openingFar+1.3;
    box(x-6.4,x+6.4,y-8.7,y+8.7,z-.9,z+.1,'#302d25');
    face([[x-3.5,y-5.2,z+.3],[x+3.5,y-5.2,z+.3],[x+3.5,y+5.2,z+.3],[x-3.5,y+5.2,z+.3]],'#dde1d8',0,undefined,[.59,.78,1.08,.84]);
    frameLights.push([x,y,z]);
  }

  // Broad rectangular cloths, each with a hanging free upper corner. The top
  // widths remain substantial, and the bottom opens only below the emblem.
  const specs=[];
  for(const side of [-1,1])for(let i=0;i<5;i++){
    const spec={side,index:i,baseX:-860+i*8,poleZ:145+side*(150+i*36),topY:276-i*.65,bottomY:47+i*.5};
    spec.width=v=>63+49*smooth(.12,1,v);
    spec.top=u=>spec.topY-112*Math.pow(clamp(u),.86);
    spec.bottom=u=>spec.bottomY+33*Math.pow(clamp(u),3)-7*Math.sin(Math.PI*clamp(u));
    spec.sample=(u,v)=>{
      const width=spec.width(v)+2*Math.sin(Math.PI*v),z=spec.poleZ-side*u*width;
      const top=spec.top(u),bottom=spec.bottom(u);
      // Vertical hanging folds bend into nested swag curves at the free hem.
      // The fold trajectory is continuous: no sawtooth diagonal triangles.
      const bend=55*smooth(.28,1,v)*Math.pow(u,1.8);
      const phase=(u*width+bend)*Math.PI*2/18;
      const envelope=smooth(0,.1,u);
      const amplitude=2.6+2.8*smooth(.48,1,v);
      const x=spec.baseX+envelope*(amplitude*Math.cos(phase)+.55*Math.cos(2*phase))+.8*u;
      return[x,mix(top,bottom,v),z];
    };
    specs.push(spec);
  }
  // Solve the cloth coordinates of a point on a light ray. This makes the
  // shadow follow the real flag silhouette and its actual distance to a receiver.
  function clothRay(receiver,spec){
    const distance=spec.baseX-receiver[0];
    if(distance<-13)return null;
    const guessY=receiver[1]+distance*.38,guessZ=receiver[2]+distance*.2;
    const lateral=spec.side*(spec.poleZ-guessZ);
    if(lateral<-20||lateral>140||guessY<spec.bottomY-20||guessY>spec.topY+20)return null;
    let plane=spec.baseX,u=.5,v=.5,travel=0;
    for(let ray=0;ray<3;ray++){
      travel=plane-receiver[0];if(travel<=.6)return null;
      const y=receiver[1]+travel*.38,z=receiver[2]+travel*.2;
      for(let j=0;j<4;j++){
        const top=spec.top(u),bottom=spec.bottom(u);
        v=(top-y)/(top-bottom);
        const width=spec.width(clamp(v))+2*Math.sin(Math.PI*clamp(v));
        u=spec.side*(spec.poleZ-z)/width;
      }
      plane=spec.sample(clamp(u),clamp(v))[0];
    }
    const width=spec.width(clamp(v)),height=spec.top(u)-spec.bottom(u);
    const edge=Math.min(u*width,(1-u)*width,v*height,(1-v)*height);
    return{edge,travel};
  }
  function shadow(receiver,exclude=-1){
    let darkness=0;
    for(let i=0;i<specs.length;i++){
      if(i===exclude)continue;
      const hit=clothRay(receiver,specs[i]);if(!hit)continue;
      const penumbra=2.5+hit.travel*.052;
      darkness=Math.max(darkness,.38*smooth(-penumbra,penumbra,hit.edge));
    }
    // A soft oval is the distant cast shadow of the emblem's raised wreath.
    const distance=-865-receiver[0];
    if(distance>3){
      const z=receiver[2]+distance*.2,y=receiver[1]+distance*.38;
      const radius=Math.hypot((z-145)/48,(y-192)/56);
      darkness=Math.max(darkness,.32*(1-smooth(.93,1.1,radius)));
    }
    return 1-darkness;
  }

  part='gold-curtain';
  const goldSample=(u,v)=>{
    const z=mix(openingFar,openingNear,u),phase=u*Math.PI*2*91;
    const major=2.25*Math.sin(phase)+.65*Math.sin(phase*2+.4);
    const minor=.72*Math.sin(phase*3.1+v*.7),hem=.65*Math.sin(v*Math.PI)*Math.cos(phase*.52);
    return[-988+major+minor+hem,mix(44,371,v),z];
  };
  const goldVertices=surface(goldSample,728,18,'#edc45c',10,(p,u,v)=>shadow(p)*(.89+.11*smooth(0,.14,v))*(.84+.16*(1-smooth(.91,1,v))));
  for(const side of[-1,1]){
    const z=side>0?openingNear:openingFar;
    surface((u,v)=>[-988+u*280,44+327*v,z-side*(3*Math.sin(u*Math.PI*2*35))],280,16,'#dcad4e',10,(p,u,v)=>.85+.15*u,side>0?[0,0,-1]:[0,0,1]);
  }
  // Rolled curtain hems close the vertical mesh without giving it a hard box edge.
  tube(Array.from({length:291},(_,i)=>goldSample(i/290,0)),.75,'#9e7438',10,5);
  tube(Array.from({length:291},(_,i)=>goldSample(i/290,1)),.6,'#a88848',10,5);

  // The golden valance is the dense pleated band directly below the sign.
  // It belongs to the FRONT curtain portal, not the distant rear gold wall.
  part='gold-valance';
  const valance=(u,v)=>{
    const phase=u*Math.PI*2*76;
    return[-683+3.1*Math.cos(phase)+.7*Math.cos(phase*2),301-v*(24+1.1*Math.cos(phase)) ,mix(-345,620,u)];
  };
  surface(valance,608,8,'#d8a348',10,(p,u,v)=>.83+.17*(1-v));
  tube(Array.from({length:609},(_,i)=>valance(i/608,1)),.45,'#916122',10,5);
  part='side-curtain';
  for(const side of[-1,1]){
    const outside=side>0?620:-345;
    const sample=(u,v)=>{
      // Full gathered velvet side curtain: the opening sweeps outward toward
      // its low tie, then a narrow weighted fall reaches the stage floor.
      const gather=.77,width=v<gather?22+90*Math.pow(1-v/gather,1.45):22+8*(v-gather)/(1-gather);
      const z=outside-side*u*width;
      const phase=u*Math.PI*24+v*2.0;
      const depth=4.8+2.5*Math.sin(Math.PI*v);
      return[-690+depth*Math.cos(phase)+.7*Math.cos(phase*2),294-250*v-9*Math.sin(Math.PI*u)*Math.sin(Math.PI*v),z];
    };
    surface(sample,120,80,'#a87530',10,(p,u,v)=>.79+.19*Math.sin(Math.PI*u));
    tube(Array.from({length:91},(_,i)=>sample(i/90,1)),.7,'#68421f',10,6);
    // Gathered tie and its short tassel sit on the side drape itself.
    const tie=sample(.53,.77);
    tube([[tie[0]+3,tie[1]+2,outside-side*5],[tie[0]+3,tie[1],outside-side*31]],1.1,'#b68a42',10,6);
    tube([[tie[0]+4,tie[1],outside-side*28],[tie[0]+4,tie[1]-17,outside-side*29]],1.2,'#bd9147',10,6);
  }

  const flags=[];
  specs.forEach((spec,which)=>{
    part='flag-'+spec.side+'-'+spec.index;
    const points=surface(spec.sample,100,70,'#e93629',9,(p,u,v)=>shadow(p,which)*(.89+.11*Math.sin(Math.PI*u)));
    // The actual reverse is offset along x; a thick rolled hem closes the fold.
    surface((u,v)=>{const p=spec.sample(u,v);return[p[0]-.86,p[1],p[2]];},50,35,'#b72b24',9,(p,u,v)=>shadow(p,which)*.79,[-1,0,0]);
    for(const edge of [0,1])for(let j=0;j<30;j++){
      const a=spec.sample(edge,j/30),b=spec.sample(edge,(j+1)/30);
      face([a,b,[b[0]-.86,b[1],b[2]],[a[0]-.86,a[1],a[2]]],'#7c211b',9,undefined,[.73,.8,.54,.54]);
    }
    const hem=Array.from({length:61},(_,j)=>{const p=spec.sample(j/60,1);return[p[0]-.4,p[1]-.1,p[2]];});
    tube(hem,1.3,'#a62b24',9,7);
    const pole=spec.sample(0,0),poleTop=spec.topY+7;
    tube([[pole[0],44,spec.poleZ],[pole[0],poleTop,spec.poleZ]],.98,'#c4a059',0,10);
    for(let j=0;j<8;j++){
      const a=j*Math.PI/4,b=(j+1)*Math.PI/4;
      face([[pole[0]+2.2*Math.cos(a),poleTop,spec.poleZ+2.2*Math.sin(a)],[pole[0],poleTop+8,spec.poleZ],[pole[0]+2.2*Math.cos(b),poleTop,spec.poleZ+2.2*Math.sin(b)]],'#d2b66a',0,undefined,[.73,1.14,.92]);
    }
    const bounds=[0,1,2].map(k=>[Math.min(...points.map(v=>v.p[k])),Math.max(...points.map(v=>v.p[k]))]);
    flags.push({side:spec.side,index:spec.index,pole:[pole[0],spec.poleZ],height:poleTop,topWidth:72,bottomWidth:116,poleSpacing:36,hemThickness:2.6,clothBounds:bounds});
  });
  return{frameCorners,curtainCorners,emblemCorners,flags,banner,
    frame:{frontX,rearX,opening:{z1:openingFar,z2:openingNear,y1:30,y2:388,backTop:307},coffers,lights:frameLights,
      curtainDepth:370,shadowLight:[1,.38,.2],goldShadeRange:[Math.min(...goldVertices.map(v=>v.shade)),Math.max(...goldVertices.map(v=>v.shade))]}};
};
