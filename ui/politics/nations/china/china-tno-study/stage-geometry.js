'use strict';

/* Native stage solids share the hall camera and depth buffer. Material numbers:
   3 stone, 4 carpet, 8 upholstery, 9 flag silk, 10 gold curtain, 11 dark wood. */
window.buildChinaStage = function buildChinaStage({add, cuboid, textureLast, items, project, path}) {
  const chairs = [], leaderHits = [], stairs = [], nameplates=[];
  const leaderIds=['li-xi','cai-qi','zhao-leji','xi-jinping','li-qiang','wang-huning','ding-xuexiang'];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const normalize = v => { const n = Math.hypot(...v) || 1; return v.map(x => x / n); };
  const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  const minus = (a, b) => a.map((x, i) => x - b[i]);
  const light = normalize([.59, .73, .35]);
  const lit = (n, ambient = .64, strength = .46) => ambient + strength * Math.max(0, normalize(n).reduce((s, v, i) => s + v * light[i], 0));
  const face = (p, color, material = 0, uv, shades) => {
    add(p, color, 'none', 0);
    const mesh = items.at(-1).mesh[0];
    mesh.material = material;
    // Coplanar inset decoration needs its own drawn border: normal-only edges lose it.
    if(material===11&&['#af7143','#75412b','#ac734b','#754833','#603723','#af7648','#724029'].includes(color))mesh.material=19;
    if(material===0&&['#bd8060','#b4935b'].includes(color))mesh.material=18;
    mesh.uv = uv || p.map((_, i) => [[0, 0], [1, 0], [1, 1], [0, 1]][i % 4]);
    if (shades) mesh.shades = shades;
    return mesh;
  };
  const box = (x1, x2, y1, y2, z1, z2, color, material = 0) => {
    const a=[x1,y1,z1],b=[x2,y1,z1],c=[x2,y1,z2],d=[x1,y1,z2];
    const e=[x1,y2,z1],f=[x2,y2,z1],g=[x2,y2,z2],h=[x1,y2,z2];
    for (const [p, n] of [[[e,f,g,h],[0,1,0]], [[b,f,g,c],[1,0,0]], [[d,h,g,c],[0,0,1]], [[a,e,h,d],[-1,0,0]], [[a,b,f,e],[0,0,-1]], [[a,d,c,b],[0,-1,0]]]) {
      face(p, color, material, undefined, p.map(() => lit(n)));
    }
  };
  // A small cylindrical member is used for poles, the chair piping and curved arms.
  function tube(points, radius, color, material = 0, sides = 8) {
    const rings = points.map((p, i) => {
      const tangent=normalize(minus(points[Math.min(points.length-1,i+1)],points[Math.max(0,i-1)]));
      const ref=Math.abs(tangent[1])>.9?[1,0,0]:[0,1,0];
      const a=normalize(cross(tangent,ref)),b=normalize(cross(tangent,a));
      return Array.from({length:sides},(_,j)=>{
        const angle=j*2*Math.PI/sides,normal=a.map((v,k)=>v*Math.cos(angle)+b[k]*Math.sin(angle));
        return {p:p.map((v,k)=>v+radius*normal[k]),shade:lit(normal,.55,.55)};
      });
    });
    for(let i=0;i<rings.length-1;i++)for(let j=0;j<sides;j++){
      const v=[rings[i][j],rings[i+1][j],rings[i+1][(j+1)%sides],rings[i][(j+1)%sides]];
      face(v.map(q=>q.p),color,material,[[0,0],[1,0],[1,1],[0,1]],v.map(q=>q.shade));
    }
    face(rings[0].map(q=>q.p),color,material);
    face(rings.at(-1).map(q=>q.p),color,material);
  }
  function surface(sample, cols, rows, color, material, orientation = [1,0,0]) {
    const vertices=Array.from({length:rows+1},(_,j)=>Array.from({length:cols+1},(_,i)=>{
      const u=i/cols,v=j/rows,p=sample(u,v),eps=.0001;
      const du=minus(sample(Math.min(1,u+eps),v),sample(Math.max(0,u-eps),v));
      const dv=minus(sample(u,Math.min(1,v+eps)),sample(u,Math.max(0,v-eps)));
      let n=cross(du,dv);if(n.reduce((s,x,k)=>s+x*orientation[k],0)<0)n=n.map(x=>-x);
      return {p,uv:[u,v],shade:lit(n,.57,.52)};
    }));
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
      const q=[vertices[j][i],vertices[j][i+1],vertices[j+1][i+1],vertices[j+1][i]];
      face(q.map(v=>v.p),color,material,q.map(v=>v.uv),q.map(v=>v.shade));
    }
  }
  const backdrop=window.buildChinaStageBackdrop({add,items,project});
  const {frameCorners,curtainCorners,emblemCorners,flags,frame,banner}=backdrop;
  const daisHeight=44,daisFront=-570;
  const arcCenter=[-1870,145],radius=1400;
  const frontAt=(z,run=0)=>arcCenter[0]+Math.sqrt(radius*radius-(z-arcCenter[1])**2)+run;
  const carpet=(ps,brightness=1)=>face(ps,'#d1c9c3',4,ps.map(p=>[(p[0]+800)/400,(p[2]+1100)/400]),ps.map(()=>brightness));
  // The deep stage starts behind the portal. The presiding desk is inside it;
  // the broad empty apron in front then joins the audience floor.
  box(-1018,daisFront,0,daisHeight,-355,640,'#81503a',11);
  carpet([[-1018,44.08,-355],[daisFront,44.08,-355],[daisFront,44.08,640],[-1018,44.08,640]]);
  const rowDais={x1:-925,x2:-650,z1:-235,z2:590,y:62};
  box(rowDais.x1,rowDais.x2,44,62,rowDais.z1,rowDais.z2,'#814732',11);
  carpet([[rowDais.x1,62.08,rowDais.z1],[rowDais.x2,62.08,rowDais.z1],[rowDais.x2,62.08,rowDais.z2],[rowDais.x1,62.08,rowDais.z2]]);
  // Short internal risers separate the rear desk level from the open stage.
  for(const [z1,z2]of[[-325,-235],[590,640]])for(let i=0;i<3;i++){
    const x1=-720+i*22,x2=x1+22,h=56-i*6;
    box(x1,x2,44,h,z1,z2,'#773c2e',11);
    carpet([[x1,h+.1,z1],[x2,h+.1,z1],[x2,h+.1,z2],[x1,h+.1,z2]],1.15);
  }

  // A broad, shallow bow joins the entire stage. Its two flights descend
  // toward the audience with fixed-width wings, rather than rotating into fans.
  const frontSections=80,frontZ1=-355,frontZ2=640;
  for(let i=0;i<frontSections;i++){
    const z1=mix(frontZ1,frontZ2,i/frontSections),z2=mix(frontZ1,frontZ2,(i+1)/frontSections);
    const x1=frontAt(z1),x2=frontAt(z2);
    carpet([[daisFront,44.08,z1],[x1,44.08,z1],[x2,44.08,z2],[daisFront,44.08,z2]]);
    face([[x1,0,z1],[x1,44,z1],[x2,44,z2],[x2,0,z2]],'#875039',11,[[z1/100,1],[z1/100,0],[z2/100,0],[z2/100,1]],[.62,.96,.96,.62]);
    face([[x1-.8,44.12,z1],[x1+1.1,44.12,z1],[x2+1.1,44.12,z2],[x2-.8,44.12,z2]],'#b78050',11);
  }
  // Close both stage ends all the way to the floor. Decorative panelling is
  // inset into this body, so no detached plaque can appear beyond a stair.
  for(const z of [frontZ1,frontZ2])face([[daisFront,0,z],[frontAt(z),0,z],[frontAt(z),44,z],[daisFront,44,z]],'#75432f',11);
  for(let z=arcCenter[1]-246;z<arcCenter[1]+245;z+=41){
    const z2=Math.min(z+37,arcCenter[1]+246);
    face([[frontAt(z)+.3,8,z],[frontAt(z)+.3,34,z],[frontAt(z2)+.3,34,z2],[frontAt(z2)+.3,8,z2]],'#603723',11);
    face([[frontAt(z)+.5,34,z],[frontAt(z)+.5,35,z],[frontAt(z2)+.5,35,z2],[frontAt(z2)+.5,34,z2]],'#ae7849',11);
  }
  for(const [flight,z1,z2]of[['far',-300,-110],['near',400,590]])for(let i=0;i<6;i++){
    const innerRun=i*14,outerRun=(i+1)*14,height=44*(5-i)/6,previousHeight=44*(6-i)/6;
    // Small quadrilateral patches retain the bow in projection and avoid
    // triangulating one long, nearly edge-on concave annulus.
    for(let j=0;j<20;j++){
      const a=mix(z1,z2,j/20),b=mix(z1,z2,(j+1)/20);
      const innerA=frontAt(a,innerRun),innerB=frontAt(b,innerRun),outerA=frontAt(a,outerRun),outerB=frontAt(b,outerRun);
      carpet([[innerA,height+.1,a],[outerA,height+.1,a],[outerB,height+.1,b],[innerB,height+.1,b]],1.12);
      face([[innerA,height,a],[innerA,previousHeight,a],[innerB,previousHeight,b],[innerB,height,b]],'#704333',4,[[a/220,1],[a/220,0],[b/220,0],[b/220,1]],[.66,.88,.88,.66]);
      face([[innerA-.4,previousHeight+.13,a],[innerA+.6,previousHeight+.13,a],[innerB+.6,previousHeight+.13,b],[innerB-.4,previousHeight+.13,b]],'#bd8060');
    }
    for(const z of[z1,z2])face([[frontAt(z,innerRun),0,z],[frontAt(z,outerRun),0,z],[frontAt(z,outerRun),height,z],[frontAt(z,innerRun),height,z]],'#59362b');
    stairs.push({flight,index:i,innerRun,outerRun,z1,z2,height,previousHeight,center:arcCenter});
  }

  // Low plinth, inset wood panels and small bronze rosettes continue around
  // the apron. Their fronts follow the actual bow, with no detached decals.
  for(let z=-342;z<631;z+=34){
    if((z>-301&&z<-108)||(z>398&&z<592))continue;
    const z2=Math.min(z+28,638),x1=frontAt(z)+.8,x2=frontAt(z2)+.8;
    face([[x1,7,z],[x1,35,z],[x2,35,z2],[x2,7,z2]],'#af7143',11);
    face([[x1+.15,9,z+1.3],[x1+.15,32,z+1.3],[x2+.15,32,z2-1.3],[x2+.15,9,z2-1.3]],'#75412b',11);
    const cz=(z+z2)/2,cx=frontAt(cz)+1.25;
    const ring=Array.from({length:12},(_,i)=>[cx,21+2*Math.sin(i*Math.PI/6),cz+2*Math.cos(i*Math.PI/6)]);
    face(ring,'#b4935b',0,undefined,ring.map((_,i)=>.7+.25*Math.sin(i*Math.PI/6)));
  }
  for(const z of[-355,640]){
    const sign=z>0?1:-1,front=frontAt(z);
    for(let x=-1000;x<front-8;x+=42){
      const end=Math.min(x+35,front-4);
      face([[x,7,z+sign*.3],[end,7,z+sign*.3],[end,36,z+sign*.3],[x,36,z+sign*.3]],'#ac734b',11);
      face([[x+1.5,9,z+sign*.5],[end-1.5,9,z+sign*.5],[end-1.5,33,z+sign*.5],[x+1.5,33,z+sign*.5]],'#754833',11);
    }
    face([[-1018,41,z+sign],[front,41,z+sign],[front,43,z+sign],[-1018,43,z+sign]],'#b18054',11);
    face([[-1018,2,z+sign*.7],[front,2,z+sign*.7],[front,5,z+sign*.7],[-1018,5,z+sign*.7]],'#4d3025',11);
  }
  // Seven places share one continuous ceremonial desk, behind the portal.
  const desk={x1:-735,x2:-670,z1:-205,z2:555,bottom:62,top:116};
  box(desk.x1,desk.x2,111,116,desk.z1,desk.z2,'#9b5734',11);
  box(desk.x2-5,desk.x2,62,111,desk.z1+1,desk.z2-1,'#82482d',11);
  box(desk.x1+3,desk.x2-2,62,111,desk.z1+1,desk.z1+5,'#713c29',11);
  box(desk.x1+3,desk.x2-2,62,111,desk.z2-5,desk.z2-1,'#713c29',11);
  box(desk.x2-.1,desk.x2+1.2,109.5,112,desk.z1,desk.z2,'#b17d4b',11);
  for(let i=0;i<7;i++){
    const z=415-i*90;
    box(desk.x2+.1,desk.x2+.8,70,92,z-36,z+36,'#af7648',11);
    box(desk.x2+.9,desk.x2+1.1,72,90,z-33,z+33,'#724029',11);
    face([[-727,116.15,z-16],[-705,116.15,z-16],[-705,116.15,z+10],[-727,116.15,z+10]],'#d6ccb0');
    box(-693,-687,116,118,z-2,z+2,'#272726');
    tube([[-690,118,z],[-699,130,z],[-706,133,z]],.72,'#242526',0,7);
    tube([[-706,133,z],[-710,132,z]],1.2,'#2a2a29',0,8);
    // A real folded name card stands on the desk in front of this exact chair.
    const id=leaderIds[i],leader=window.CHINA_LEADERS.find(p=>p.id===id),first=items.length;
    const z1=z-27,z2=z+27,base=116.25,top=132.5;
    const front=[[-688,top,z2],[-688,top,z1],[-679,base,z1],[-679,base,z2]];
    face(front,'#ffffff',17,[[i/7,.5],[(i+1)/7,.5],[(i+1)/7,1],[i/7,1]]);
    face([[-688,top,z1],[-688,top,z2],[-698,base,z2],[-698,base,z1]],'#c9a76e');
    for(const zz of[z1,z2])face([[-679,base,zz],[-688,top,zz],[-698,base,zz]],'#997140');
    box(-699,-678,116,116.5,z1-.7,z2+.7,'#b0884b',11);
    items.slice(first).flatMap(item=>item.mesh||[]).forEach(m=>{m.pickId=4001+i;m.stagePart='nameplate';});
    nameplates.push({id,name:leader.name,seatIndex:i,pickId:4001+i,corners:front,baseY:base});

  }

  // Rounded rectangles retain straight edges between soft quarter-circle corners.
  function outline(width,height,radius,segments=6){
    const pts=[];
    for(let corner=0;corner<4;corner++){
      const sx=[1,-1,-1,1][corner],sy=[1,1,-1,-1][corner],angle=corner*Math.PI/2;
      for(let j=0;j<=segments;j++){
        const t=angle+j/segments*Math.PI/2;
        pts.push([sx*(width/2-radius)+radius*Math.cos(t),sy*(height/2-radius)+radius*Math.sin(t)]);
      }
    }
    return pts;
  }
  // Padded faces are several curved rings, including the rounded side roll.
  function pad({width,height,radius,depth,crown,map,color,material}){
    const edge=outline(width,height,radius),N=edge.length;
    const profiles=[[1,0],[.995,.45],[.975,1.1],[.94,1.8],[.85,2.7],[.66,3.4],[.38,3.85],[.06,4.02]];
    const rings=profiles.map(([scale,rise])=>edge.map(([u,v])=>({p:map(u*scale,v*scale,rise*crown/4.02),uv:[.5+u*scale/width,.5+v*scale/height]})));
    const outward=minus(map(0,0,1),map(0,0,0));
    rings.forEach((ring,r)=>ring.forEach((v,j)=>{
      const tangent=minus(ring[(j+1)%N].p,ring[(j+N-1)%N].p);
      const a=rings[Math.max(0,r-1)][j].p,b=rings[Math.min(rings.length-1,r+1)][j].p;
      let n=cross(tangent,minus(b,a));
      if(n.reduce((s,x,k)=>s+x*outward[k],0)<0)n=n.map(x=>-x);
      v.shade=lit(n,.66,.42);
    }));
    for(let r=0;r<rings.length-1;r++)for(let j=0;j<N;j++){
      const k=(j+1)%N,q=[rings[r][j],rings[r][k],rings[r+1][k],rings[r+1][j]];
      face(q.map(v=>v.p),color,material,q.map(v=>v.uv),q.map(v=>v.shade));
    }
    const center=map(0,0,crown),last=rings.at(-1);
    for(let j=0;j<N;j++)face([last[j].p,last[(j+1)%N].p,center],color,material,[last[j].uv,last[(j+1)%N].uv,[.5,.5]],[last[j].shade,last[(j+1)%N].shade,lit(outward,.66,.42)]);
    for(let j=0;j<N;j++){
      const k=(j+1)%N,a=edge[j],b=edge[k];
      face([map(...a,0),map(...b,0),map(...b,-depth),map(...a,-depth)],color,material,[[j/N,0],[k/N,0],[k/N,1],[j/N,1]],[.72,.72,.56,.56]);
    }
    face(edge.map(p=>map(...p,-depth)),color,material,edge.map(([u,v])=>[.5+u/width,.5+v/height]),edge.map(()=>.58));
    return edge;
  }
  const hull=points=>{
    const p=points.map(v=>v.slice(0,2)).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
    const turn=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
    const lo=[],hi=[];
    for(const v of p){while(lo.length>=2&&turn(lo.at(-2),lo.at(-1),v)<=0)lo.pop();lo.push(v);}
    for(const v of p.slice().reverse()){while(hi.length>=2&&turn(hi.at(-2),hi.at(-1),v)<=0)hi.pop();hi.push(v);}
    return lo.slice(0,-1).concat(hi.slice(0,-1));
  };
  leaderIds.forEach((id,i)=>{
    const z=415-i*90,x=-770,first=items.length;
    // Four tapered, lightly splayed legs; no heavy box-shaped pedestal.
    for(const back of [false,true])for(const side of [-1,1]){
      const topX=back?x+3:x+34,bottomX=topX+(back?-1.4:1.5),topZ=z+side*20,bottomZ=z+side*20.5;
      const foot=[[bottomX-1.45,44,bottomZ-1.45],[bottomX+1.45,44,bottomZ-1.45],[bottomX+1.45,44,bottomZ+1.45],[bottomX-1.45,44,bottomZ+1.45]];
      const head=[[topX-1.9,69,topZ-1.9],[topX+1.9,69,topZ-1.9],[topX+1.9,69,topZ+1.9],[topX-1.9,69,topZ+1.9]];
      for(let j=0;j<4;j++)face([foot[j],foot[(j+1)%4],head[(j+1)%4],head[j]],'#53372b',11,undefined,[.59,.59,.9,.9]);
      face(head,'#76503a',11);
    }
    // Slim aprons and side rails support a distinct, rounded upholstered seat.
    box(x+3,x+35,64,67.5,z-22,z+22,'#61402f',11);
    const seatMap=(u,v,d)=>[x+20+v,70.5+d,z+u];
    pad({width:44,height:34,radius:2.5,depth:2,crown:1.5,map:seatMap,color:'#b43832',material:8});
    const seatRim=outline(44.2,34.2,2.6).map(([u,v])=>seatMap(u,v,.35));seatRim.push(seatRim[0]);
    tube(seatRim,.27,'#8c2825',8,5);
    // The back reclines gently and narrows toward its softly rounded crown.
    const backMap=(u,v,d)=>[x+4-v*.028+d,97.2+v,z+u*(1-.035*(v/27+.5))];
    pad({width:48,height:55,radius:3,depth:2.7,crown:.4,map:backMap,color:'#5d3d2d',material:11});
    pad({width:43,height:50,radius:2.4,depth:.65,crown:1.3,map:(u,v,d)=>backMap(u,v,d+.7),color:'#b13731',material:8});
    const backRim=outline(43.2,50.2,2.5).map(([u,v])=>backMap(u,v,.9));backRim.push(backRim[0]);
    tube(backRim,.26,'#872724',8,5);
    for(const side of [-1,1]){
      const armZ=z+side*24;
      tube([[x+3,69,armZ],[x+3,89.5,armZ],[x+5,94,armZ]],1.25,'#5b3b2b',11,8);
      tube([[x+32,67,armZ],[x+32,82,armZ],[x+32,89,armZ]],1.45,'#5b3b2b',11,8);
      const arm=Array.from({length:11},(_,j)=>{const t=j/10;return[x+3+t*29,90-.5*t,armZ];});
      tube(arm,1.85,'#6c4832',11,10);
      // Narrow red leather arm pads wrap the centre, leaving the fine frame visible.
      tube(arm.slice(2,9).map(p=>[p[0],p[1]+.55,p[2]]),1.48,'#a6332c',8,8);
    }
    // Raise the seven chairs onto the rear presiding level inside the portal.
    items.slice(first).flatMap(item=>item.mesh||[]).forEach(m=>{m.p=m.p.map(p=>[p[0],p[1]+18,p[2]]);m.pickId=4001+i;});
    const bounds=items.slice(first).flatMap(item=>item.mesh||[]).flatMap(m=>m.p),screen=bounds.map(project);
    const leader=(window.CHINA_LEADERS||[]).find(p=>p.id===id);
    leaderHits.push(`<path data-pick-id="${4001+i}" class="leader-chair" data-leader="${id}" tabindex="0" role="button" aria-label="${leader?.name||id}生平" d="${path(hull(screen))}" fill="transparent"/>`);
    chairs.push({id,center:[x+23,62,z],bounds});
  });
  return {chairs,leaderHits,stairs,nameplates,emblemCorners,frameCorners,curtainCorners,daisHeight,flags,frame,banner,
    stage:{main:{x1:-1018,x2:daisFront,z1:-355,z2:640,y:44},rowDais,desk,apron:{center:arcCenter,radius,z1:frontZ1,z2:frontZ2,y:44}}};
};
