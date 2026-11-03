'use strict';
/* All structural points and curved solids share this camera. SVG is only the
   output surface: no separately stretched tiers or pasted seat polygons. */
function hallSpace(){
  const W=1200,H=500,eye=[-178.301487,120,1099.831211],yaw=-1.8790744;
  const sub=(a,b)=>a.map((v,i)=>v-b[i]),dot=(a,b)=>a.reduce((n,v,i)=>n+v*b[i],0);
  const forward=[Math.cos(yaw),0,Math.sin(yaw)],right=[-Math.sin(yaw),0,Math.cos(yaw)],up=[0,1,0],focal=570;
  const project=p=>{const a=sub(p,eye),depth=dot(a,forward);return [385+focal*dot(a,right)/depth,320-focal*dot(a,up)/depth,depth]};
  const path=ps=>ps.map((p,i)=>(i?'L':'M')+p.slice(0,2).map(v=>v.toFixed(2)).join(' ')).join(' ')+'Z';
  const geometryPath=ps=>path(ps.map(project));
  const items=[],seats=[];
  const add=(ps,fill,stroke='#221d1e',sw=.5,extra='')=>{items.push({mesh:[{p:ps,color:fill,party:0}],depth:0,html:''})};
  const textureLast=(material,uv)=>{const m=items.at(-1).mesh[0];m.material=material;m.color=material===4?'#d1c9c3':material===1?'#968c79':material===5?'#c1c6cc':'#b2aa98';m.uv=uv;};
  let arcCenter=-600;
  const arc=(r,h,a,b,n=8)=>Array.from({length:n+1},(_,i)=>{const t=(a+(b-a)*i/n)*Math.PI/180;return[arcCenter+r*Math.cos(t),h,r*Math.sin(t)]});
  const fanQuad=(r1,r2,h,a,b,n=8)=>[...arc(r2,h,a,b,n),...arc(r1,h,b,a,n)];
  const cuboid=(x1,x2,y1,y2,z1,z2,top,front,side)=>{
    const tp=[[x1,y2,z1],[x2,y2,z1],[x2,y2,z2],[x1,y2,z2]];add(tp,top,'#ab8056',.5);if(top==='url(#wood-material)')textureLast(2,[[z1/300,0],[z1/300,1],[z2/300,1],[z2/300,0]]);
    add([[x2,y1,z1],[x2,y2,z1],[x2,y2,z2],[x2,y1,z2]],front);
    add([[x1,y1,z2],[x1,y2,z2],[x2,y2,z2],[x2,y1,z2]],side);
  };
  // The whole stage participates in the hall depth buffer: no flattened backdrop.
  const ground=[[-1600,0,-1300],[2000,0,-1300],[2000,0,1450],[-1600,0,1450]];
  add(ground,'#302025');textureLast(4,ground.map(p=>[(p[0]+800)/400,(p[2]+1100)/400]));
  const stageStart=items.length;
  const stage=window.buildChinaStage({add,cuboid,textureLast,items,project,path});
  const {leaderHits}=stage;
  items.slice(stageStart).flatMap(i=>i.mesh||[]).forEach(m=>{if(m.material===3)m.material=13;});
  // The feet meet the carpet with soft native contact shading.
  for(const chair of stage.chairs){
    const [x,y,z]=chair.center,level=y+.13,center=[x,level,z];
    for(let i=0;i<32;i++){
      const a=i*Math.PI/16,b=(i+1)*Math.PI/16;
      const ps=[center,[x+28*Math.cos(a),level,z+38*Math.sin(a)],[x+28*Math.cos(b),level,z+38*Math.sin(b)]];
      add(ps,'#7f5e50','none',0);Object.assign(items.at(-1).mesh[0],{material:4,uv:ps.map(p=>[(p[0]+800)/400,(p[2]+1100)/400]),shades:[.48,1,1]});
    }
  }
  add(stage.emblemCorners,'#fff3da','none',0);
  Object.assign(items.at(-1).mesh[0],{material:12,uv:[[0,0],[1,0],[1,1],[0,1]]});
  window.chinaStageRenderData=stage;
  // The portal belongs to the auditorium wall, not to a freestanding frame.
  // Only its actual opening is omitted; the enclosing wall meets the carpet.
  for(const [z1,z2] of [[-1700,-405],[700,1450]]){
    add([[-674,80,z1],[-674,80,z2],[-674,600,z2],[-674,600,z1]],'#59564e');
    textureLast(5,[[z1/500,1],[z2/500,1],[z2/500,0],[z1/500,0]]);
    add([[-674,0,z1],[-674,0,z2],[-674,80,z2],[-674,80,z1]],'#785239');
    textureLast(6,[[z1/500,1],[z2/500,1],[z2/500,0],[z1/500,0]]);
  }
  add([[-674,414,-405],[-674,414,700],[-674,600,700],[-674,600,-405]],'#59564e');
  textureLast(5,[[-.81,1],[1.4,1],[1.4,.5],[-.81,.5]]);
  add([[-674,0,-1700],[-330,0,-1700],[-330,630,-1700],[-674,630,-1700]],'#59564e');
  textureLast(5,[[0,1],[.68,1],[.68,0],[0,0]]);
  // Shared back wall and its wainscot anchor the tiers to the room.
  for(let j=0;j<12;j++){
    const x1=-330+j*160,x2=x1+160,z=-1700;
    add([[x1,80,z],[x2,80,z],[x2,630,z],[x1,630,z]],'#59564e');textureLast(5,[[j/5,1],[(j+1)/5,1],[(j+1)/5,0],[j/5,0]]);
    add([[x1,-30,z],[x2,-30,z],[x2,80,z],[x1,80,z]],'#785239');textureLast(6,[[j/5,1],[(j+1)/5,1],[(j+1)/5,0],[j/5,0]]);
  }
  for(const x of[-175,270,720,1170,1530]){
    cuboid(x-28,x+28,0,71,-1699,-1696,'#b08156','#452d20','#452d20');
    cuboid(x-25,x-1,0,68,-1696,-1693,'#98653d','#80512f','#80512f');
    cuboid(x+1,x+25,0,68,-1696,-1693,'#98653d','#80512f','#80512f');
    cuboid(x-1.5,x+1.5,27,32,-1693,-1691,'#c7b27e','#c7b27e','#c7b27e');
    add([[x-5,76,-1694],[x+5,76,-1694],[x+5,79,-1694],[x-5,79,-1694]],'#287c69','none',0);
  }
  for(const x of[-390,70,510,970,1400]){
    cuboid(x-4,x+4,51,62,-1699,-1693,'#ae8b51','#a68d5a','#a68d5a');
    add([[x-3,53,-1692],[x+3,53,-1692],[x+3,61,-1692],[x-3,61,-1692]],'#ffedcd','none',0);items.at(-1).mesh[0].material=16;
  }
  // Each radial row has one continuous level across every seating bank.
  // Walking aisles have their own intermediate steps; no chair sits on them.
  const terraces=[],aisles=[],allocated=[];
  const decks=[
    {key:'floor',inner:600,outer:1250,base:0,rise:48,rows:24,total:1587,center:-720,a0:-54.875,a1:55},
    {key:'middle',inner:1150,outer:1400,base:160,rise:40,rows:10,total:750,center:-600,a0:-72,a1:55},
    {key:'upper',inner:1280,outer:1610,base:280,rise:65,rows:12,total:640,center:-600,a0:-72,a1:55}
  ];
  const carpetFace=(ps,shade=1)=>{add(ps,'#d1c9c3','none',0);Object.assign(items.at(-1).mesh[0],{material:4,uv:ps.map(q=>[q[0]/40,q[2]/40]),shades:ps.map(()=>shade)});};
  for(const d of decks){
    arcCenter=d.center;
    const dr=(d.outer-d.inner)/d.rows,dh=d.rise/(d.rows-1),span=d.a1-d.a0;
    const aisleAngles=[d.a0+span*.30,d.a0+span*.60];
    let used=0;const weights=Array.from({length:d.rows},(_,i)=>d.inner+(i+.5)*dr),weight=weights.reduce((a,b)=>a+b,0);
    let sum=0;
    for(let row=0;row<d.rows;row++){
      const ri=d.inner+row*dr,ro=ri+dr,h=d.base+row*dh,mid=(ri+ro)/2;
      sum+=weights[row];const count=Math.round(sum/weight*d.total)-used;used+=count;
      const gap=26/mid*180/Math.PI;
      const rowEnd=d.key==='floor'?d.a1+22*Math.max(0,(ri-650)/(d.outer-650)):d.a1;
      const banks=[[d.a0,aisleAngles[0]-gap/2],[aisleAngles[0]+gap/2,aisleAngles[1]-gap/2],[aisleAngles[1]+gap/2,rowEnd]];
      const usable=banks.reduce((v,[a,b])=>v+b-a,0);let assigned=0,cumulative=0;
      banks.forEach(([a,b],bank)=>{
        const terrace={id:d.key+'-'+row+'-'+bank,deck:d.key,row,bank,center:d.center,ri,ro,a,b,h};terraces.push(terrace);
        // One flat landing carries the complete chair-and-desk row.
        for(let j=0;j<12;j++){
          const aa=a+(b-a)*j/12,bb=a+(b-a)*(j+1)/12;
          carpetFace(fanQuad(ri,ro,h,aa,bb,2));
          if(row>0)carpetFace([...arc(ri,h,aa,bb,2),...arc(ri,h-dh,bb,aa,2)],.8);
        }
        cumulative+=b-a;const n=Math.round(cumulative/usable*count)-assigned;assigned+=n;
        const pitch=(b-a)/n;
        for(let col=0;col<n;col++){
          const angle=a+pitch*(col+.5),width=Math.min(17,mid*pitch*Math.PI/180*.78),half=width/2/mid*180/Math.PI;
          const r1=ri+dr*.46,r2=r1+10.5;
          const s={deck:d.key,row:d.key==='floor'?Math.floor(row/3):row,physicalRow:row,col:bank,subrow:row%3,subcol:col,center:d.center,
            a:angle-half,b:angle+half,r1,r2,h,top:h+10,capacity:1,terrace:terrace.id,
            desk:{r1:ri+2,r2:ri+9,a:a+pitch*col+.006,b:a+pitch*(col+1)-.006,h:h+17}};
          s.faces=[{p:fanQuad(r1,r2,h+10,s.a,s.b,2),type:'top'}];
          s.depth=project([d.center+mid*Math.cos(angle*Math.PI/180),h,mid*Math.sin(angle*Math.PI/180)])[2];
          allocated.push(s);
        }
      });
      // Aisles remain 26 world units wide. Two short steps join adjacent rows.
      for(const angle of aisleAngles){
        const a=angle-gap/2,b=angle+gap/2;
        for(let n=0;n<2;n++){
          const inner=ri+n*dr/2,outer=inner+dr/2,y=h+(row<d.rows-1?n*dh/2:0);
          carpetFace(fanQuad(inner,outer,y,a,b,3),.98);
          if(n&&row<d.rows-1)carpetFace([...arc(inner,y,a,b,3),...arc(inner,h,b,a,3)],.78);
          if(n===0&&row>0)carpetFace([...arc(inner,h,a,b,3),...arc(inner,h-dh/2,b,a,3)],.78);
          aisles.push({deck:d.key,row,center:d.center,ri:inner,ro:outer,a,b,h:y});
        }
      }
      // Closed end returns are walls, with no furniture crossing their edge.
      for(const angle of[d.a0,rowEnd]){
        const ps=[arc(ri,h,angle,angle)[0],arc(ro,h,angle,angle)[0],arc(ro,d.key==='floor'?0:d.base-24,angle,angle)[0],arc(ri,d.key==='floor'?0:d.base-24,angle,angle)[0]];
        add(ps,'#817866','none',0);textureLast(d.key==='floor'?4:13,[[0,0],[1,0],[1,1],[0,1]]);
      }
    }
    if(d.key!=='floor')for(let j=0;j<96;j++){
      const a=d.a0+span*j/96,b=d.a0+span*(j+1)/96,r=d.inner-16,h=d.base+5;
      add(fanQuad(r,d.outer,d.base-24,a,b,2),'#b7afa1','none',0);
      add([...arc(r,h,a,b,1),...arc(r,h-29,b,a,1)],'#d9cfbb','none',0);textureLast(13,[[j/12,0],[(j+1)/12,0],[(j+1)/12,1],[j/12,1]]);
      add([...arc(r-1,h-24,a,b,2),...arc(r-1,h-27,b,a,2)],'#d6c8ae','none',0);
      add(fanQuad(r-3,r+3,h+2,a,b,2),'#693a24','none',0);
      add([...arc(r,h+3,a,b,1),...arc(r,h+11,b,a,1)],'#865331','none',0);
      add([...arc(r-.5,h-5,a,b,1),...arc(r-.5,h-7,b,a,1)],'#b8a68c','none',0);
      if(j%4===0){const q=arc(r,h+2,a,a)[0];cuboid(q[0]-.7,q[0]+.7,h+2,h+13,q[2]-.7,q[2]+.7,'#805032','#704126','#47291d');}
      add([...arc(r,h+13,a,b,2),...arc(r,h+15,b,a,2)],'#754128','none',0);
      if(j%6===2)add([...arc(r-.2,h-21,a+.1,b-.1,2),...arc(r-.2,h-19,b-.1,a+.1,2)],'#ede0c5','none',0);
      // Recessed soffit lamps and continuous carved-cream fascia from the photo.
      if(j%3===1){
        const angle=(a+b)/2,rr=r+42,y=d.base-24.12,q=arc(rr,y,angle,angle)[0];
        const ring=Array.from({length:12},(_,i)=>[q[0]+2.2*Math.cos(i*Math.PI/6),y,q[2]+2.2*Math.sin(i*Math.PI/6)]);
        add(ring,'#fff0cf','none',0);items.at(-1).mesh[0].material=16;
      }
      if(j%8===3){
        const angle=(a+b)/2,q=arc(r+58,d.base-24,angle,angle)[0];
        cuboid(q[0]-.8,q[0]+.8,d.base-32,d.base-24,q[2]-.8,q[2]+.8,'#c3ae7c','#c3ae7c','#c3ae7c');
        for(let k=0;k<6;k++){
          const t=k*Math.PI/3,x=q[0]+5*Math.cos(t),z=q[2]+5*Math.sin(t);
          const lower=[[x-1.5,d.base-37,z-1.5],[x+1.5,d.base-37,z-1.5],[x+1.5,d.base-37,z+1.5],[x-1.5,d.base-37,z+1.5]];
          for(let n=0;n<4;n++){const p=lower[n],pp=lower[(n+1)%4];add([p,pp,[pp[0],pp[1]+5,pp[2]],[p[0],p[1]+5,p[2]]],'#fff1d2','none',0);items.at(-1).mesh[0].material=16;}
        }
      }
      if(j%2===0){
        for(let n=0;n<8;n++){
          const t0=n/8,t1=(n+1)/8,aa=a+(b-a)*t0,bb=a+(b-a)*t1;
          const y0=h-10-5*Math.sin(Math.PI*t0),y1=h-10-5*Math.sin(Math.PI*t1);
          add([arc(r-.6,y0,aa,aa)[0],arc(r-.6,y1,bb,bb)[0],arc(r-.6,y1+1.1,bb,bb)[0],arc(r-.6,y0+1.1,aa,aa)[0]],'#e9d4a7','none',0);
        }
      }

    }
  }
  arcCenter=-600;
  for(let j=0;j<120;j++){
    const a=-72+127*j/120,b=-72+127*(j+1)/120,r=1660;
    add([...arc(r,0,a,b,1),...arc(r,630,b,a,1)],'#c2c6cc','none',0);
    textureLast(5,[[j/12,1],[(j+1)/12,1],[(j+1)/12,0],[j/12,0]]);
    add([...arc(r-.4,0,a,b,1),...arc(r-.4,90,b,a,1)],'#8b4b29','none',0);
    textureLast(6,[[j/12,1],[(j+1)/12,1],[(j+1)/12,0],[j/12,0]]);
  }
  // Continuous physical ceiling meets the gallery walls. The original star
  // image supplies the centre ornament; the surrounding lit plaster is geometry.
  const ceilingY=(x,z)=>618-48*Math.min(1,Math.hypot((x-100)/1850,z/1750));
  for(let ix=0;ix<22;ix++)for(let iz=0;iz<22;iz++){
    const x=-1700+ix*170,z=-1800+iz*160;
    const ps=[[x,z],[x+170,z],[x+170,z+160],[x,z+160]].map(([xx,zz])=>[xx,ceilingY(xx,zz),zz]);
    add(ps,'#eee3cc','none',0);
  }
  for(let ring=0;ring<8;ring++){
    const radius=350+ring*170,count=24+ring*10;
    for(let i=0;i<count;i++){
      const a=i*Math.PI*2/count,x=100+radius*Math.cos(a),z=radius*.92*Math.sin(a),y=ceilingY(x,z)-.25;
      const ps=Array.from({length:12},(_,j)=>[x+4.2*Math.cos(j*Math.PI/6),y,z+4.2*Math.sin(j*Math.PI/6)]);
      add(ps,'#fff9e9','none',0);items.at(-1).mesh[0].material=16;
    }
  }
  // Place the six minority-party sectors in the visible foreground requested
  // by the user. Every selected chair stays on its existing physical landing.
  allocated.forEach(s=>s.party=NPC_PARTIES[0].id);
  const foreground=allocated.filter(s=>{
    if(s.deck!=='floor')return false;
    const a=(s.a+s.b)*Math.PI/360,r=(s.r1+s.r2)/2;
    const [x,y,depth]=project([s.center+r*Math.cos(a),s.h+20,r*Math.sin(a)]);
    return depth>95&&x>40&&x<1080&&y>385&&y<495;
  }).sort((x,y)=>(y.a+y.b-x.a-x.b)||x.r1-y.r1);
  const required=NPC_PARTIES.slice(1).reduce((sum,p)=>sum+p.count,0);
  if(foreground.length<required)throw Error('Insufficient visible foreground seats');
  let start=0;
  for(const party of NPC_PARTIES.slice(1)){
    foreground.slice(start,start+party.count).forEach(s=>s.party=party.id);start+=party.count;
  }
  seats.splice(0,seats.length,...allocated);
  // Rounded, leather-covered auditorium chairs observed in empty-hall photographs, paired with writing desks.
  // Dimensions are fixed in world units instead of stretching to fill each cell.
  const furniture=[];
  const darken=(hex,v)=>'#'+[1,3,5].map(i=>Math.min(255,Math.round(parseInt(hex.slice(i,i+2),16)*v)).toString(16).padStart(2,'0')).join('');
  for(const s of seats){
    const party=NPC_PARTIES.find(p=>p.id===s.party),group=NPC_PARTIES.indexOf(party)+1,meshes=[];
    const fabric=s.party==='remaining'?'#80412d':darken(party.color,.94),wood='#743b23';
    const point=(u,v,y)=>{const a=(s.a+(s.b-s.a)*u)*Math.PI/180,r=s.r1+(s.r2-s.r1)*v;return[s.center+r*Math.cos(a),s.h+y,r*Math.sin(a)];};
    const surface=(ps,color,material=0,shades)=>meshes.push({p:ps,color,party:group,material,uv:ps.map((_,i)=>[[0,0],[1,0],[1,1],[0,1]][i%4]),shades:shades||ps.map(()=>1)});
    const solid=(u1,u2,v1,v2,y1,y2,color,material)=>{
      const a=point(u1,v1,y1),b=point(u2,v1,y1),c=point(u2,v2,y1),d=point(u1,v2,y1),e=point(u1,v1,y2),f=point(u2,v1,y2),g=point(u2,v2,y2),h=point(u1,v2,y2);
      surface([e,f,g,h],color,material,[1,1,1,1]);surface([a,b,f,e],color,material,[.68,.68,.9,.9]);surface([d,h,g,c],color,material,[.65,.95,.95,.65]);surface([a,e,h,d],color,material,[.7,.93,.93,.7]);surface([b,c,g,f],color,material,[.65,.65,.86,.86]);
    };
    const shadow=Array.from({length:12},(_,i)=>point(.5+.47*Math.cos(i*Math.PI/6),.51+.47*Math.sin(i*Math.PI/6),.03));
    for(let i=0;i<12;i++){
      const ps=[point(.5,.51,.03),shadow[i],shadow[(i+1)%12]];
      meshes.push({p:ps,color:'#d1c9c3',party:0,material:4,uv:ps.map(q=>[q[0]/40,q[2]/40]),shades:[.42,.95,.95]});
    }
    // Four short concealed supports meet one level landing. The back is a
    // deep upholstered shell, not a timber rectangle with a coloured sticker.
    for(const u of[.12,.88])for(const v of[.13,.87])solid(u-.042,u+.042,v-.04,v+.04,0,8.7,'#3e291e',11);
    solid(.08,.92,.08,.87,7.6,9.3,wood,11);
    const contour=[],detail=s.depth>30&&s.depth<650?3:s.depth<1200&&s.depth>30?2:1;
    for(let corner=0;corner<4;corner++){
      const cx=[.87,.13,.13,.87][corner],cy=[23.3,23.3,8.8,8.8][corner];
      for(let j=0;j<=detail;j++){const a=(corner+j/detail)*Math.PI/2;contour.push([cx+.10*Math.cos(a),cy+1.8*Math.sin(a)]);}
    }
    const back=(u,y,d=0)=>point(u,.87+(y-9)*.006+d,y);
    const front=contour.map(([u,y])=>back(u,y,-.05)),rear=contour.map(([u,y])=>back(u,y,.11));
    // Rounded edge, narrow stitched welt, and a softly crowned leather face.
    for(const side of[-1,1]){
      const edge=side<0?front:rear;
      let last=edge;
      for(const [scale,depth,light] of (detail===1?[[.93,.065,1],[.3,.12,1.01]]:detail===2?[[.98,.025,.98],[.86,.095,1],[.2,.12,1.01]]:[[.98,.025,.98],[.89,.08,1.00],[.62,.115,1.01],[.2,.12,1.01]])){
        const inset=contour.map(([u,y])=>back(.5+(u-.5)*scale,16+(y-16)*scale,(side<0?-.05:.11)+side*depth*(side>0?.30:.65)));
        for(let j=0;j<last.length;j++){const k=(j+1)%last.length;surface([last[j],last[k],inset[k],inset[j]],fabric,8,[light*.91,light*.91,light,light]);}
        last=inset;
      }
      surface(last,fabric,8,last.map(()=>1.02));
    }
    for(let j=0;j<front.length;j++){const k=(j+1)%front.length;surface([front[j],front[k],rear[k],rear[j]],fabric,8,[.75,.75,.87,.87]);}
    // Seat cushion has rounded front corners and an inset top, not a plank.
    const seatOutline=[[.13,.03],[.87,.03],[.96,.12],[.96,.79],[.88,.89],[.12,.89],[.04,.79],[.04,.12]];
    const seatEdge=seatOutline.map(([u,v])=>point(u,v,9.4));
    const seatTop=seatOutline.map(([u,v])=>point(.5+(u-.5)*.9,.46+(v-.46)*.9,11.4));
    for(let j=0;j<8;j++)surface([seatEdge[j],seatEdge[(j+1)%8],seatTop[(j+1)%8],seatTop[j]],fabric,8,[.7,.7,1.04,1.04]);
    surface(seatTop,fabric,8);
    for(const u of[.02,.98]){
      solid(u-.035,u+.035,.21,.33,8.5,14.1,wood,11);
      solid(u-.05,u+.05,.15,.88,14.1,15.3,fabric,8);
      surface([point(u-.045,.21,15.32),point(u+.045,.21,15.32),point(u+.045,.82,15.32),point(u-.045,.82,15.32)],fabric,8,[1.10,1.10,1.04,1.04]);
    }
    const chairBounds=meshes.flatMap(m=>m.p);
    // A shallow continuous writing desk sits in front on the SAME landing.
    const t=s.desk,deskPoint=(r,a,y)=>[s.center+r*Math.cos(a*Math.PI/180),y,r*Math.sin(a*Math.PI/180)];
    const aa=t.a,bb=t.b;
    const top=[deskPoint(t.r1,aa,t.h),deskPoint(t.r2,aa,t.h),deskPoint(t.r2,bb,t.h),deskPoint(t.r1,bb,t.h)];
    surface(top,'#aa6136',11,[1.13,1.02,1.02,1.13]);
    surface([deskPoint(t.r2,aa,t.h-.9),deskPoint(t.r2,aa,t.h),deskPoint(t.r2,bb,t.h),deskPoint(t.r2,bb,t.h-.9)],'#7c4125',11);
    surface([deskPoint(t.r1,aa,s.h+3),deskPoint(t.r1,aa,t.h-.5),deskPoint(t.r1,bb,t.h-.5),deskPoint(t.r1,bb,s.h+3)],'#864525',11);
    for(const angle of[aa+.15,bb-.15])surface([deskPoint(t.r1,angle,s.h),deskPoint(t.r2,angle,s.h),deskPoint(t.r2,angle,t.h-.8),deskPoint(t.r1,angle,t.h-.8)],'#693820',11);
    // Moulded top lip and recessed front panels continue along each curved row.
    for(const [y1,y2,c] of [[t.h-1.4,t.h-.5,'#a85e34'],[s.h+3.3,s.h+3.8,'#a25a32']])
      surface([deskPoint(t.r1-.08,aa,y1),deskPoint(t.r1-.08,aa,y2),deskPoint(t.r1-.08,bb,y2),deskPoint(t.r1-.08,bb,y1)],c,11);
    // Small porcelain tea cup, blank writing sheet and voting-console housing,
    // observed on the real meeting desks; these carry no invented text or data.
    const middle=(aa+bb)/2,pitch=bb-aa;
    const deskUV=(u,v,y)=>deskPoint(t.r1+(t.r2-t.r1)*v,aa+pitch*u,y);
    surface([[.20,.20],[.51,.20],[.51,.79],[.20,.79]].map(([u,v])=>deskUV(u,v,t.h+.06)),'#e0d9c6',0);
    surface([[.59,.73],[.76,.73],[.76,.95],[.59,.95]].map(([u,v])=>deskUV(u,v,t.h+.25)),'#292927',0);
    const cup=deskUV(.76,.36,t.h),cupRadius=.68;
    const ring=(y,r)=>Array.from({length:8},(_,j)=>[cup[0]+r*Math.cos(j*Math.PI/4),y,cup[2]+r*Math.sin(j*Math.PI/4)]);
    const low=ring(t.h+.1,.56),high=ring(t.h+1.8,.68),lid=ring(t.h+1.94,.75);
    for(let j=0;j<8;j++){const k=(j+1)%8;surface([low[j],low[k],high[k],high[j]],'#e7e1d5',0,[.77,.83,1.02,.95]);surface([high[j],high[k],lid[k],lid[j]],'#f2ecdf',0);}
    surface(lid,'#f4ecdb',0);
    const feet=[point(.12,.13,0),point(.12,.87,0),point(.88,.13,0),point(.88,.87,0)];
    furniture.push({terrace:s.terrace,deck:s.deck,feet,chairBounds,deskBounds:top,center:s.center});
    const pickId=100+furniture.length,seatId=[s.deck,s.physicalRow,s.col,s.subcol].join('-');
    meshes.forEach(m=>m.pickId=m.party?pickId:0);
    const html=`<g data-pick-id="${pickId}" data-seat-id="${seatId}" class="seat-graphic" data-row="${s.row}" data-subrow="${s.subrow}" data-subcol="${s.subcol}" data-col="${s.col}" data-deck="${s.deck}" data-affiliation="${s.party}" data-seats="${s.capacity}" role="button" tabindex="-1" aria-label="${party.name}席位组">${[...s.faces.map(f=>f.p),front,rear].map(ps=>`<path d="${geometryPath(ps)}" fill="transparent"/>`).join('')}</g>`;
    items.push({mesh:meshes,depth:s.depth,html});
  }
  window.chinaHallSpatialData={terraces,aisles,furniture,decks};
  window.chinaHallRenderData={meshes:items.flatMap(i=>i.mesh||[]),project,eye};
  const topNear=project(stage.frameCorners[0]),topFar=project(stage.frameCorners[1]);
  // The ceiling image ends at the physical top of the portal instead of
  // ghosting over the raised stone frame and its newly exposed coffer work.
  const ceilingLimit=`M0 0H1200V132H${topFar[0].toFixed(2)}L${topFar[0].toFixed(2)} ${(topFar[1]-1).toFixed(2)}L${topNear[0].toFixed(2)} ${(topNear[1]-1).toFixed(2)}H0Z`;
  const scene=`<foreignObject class="hall-render-surface" width="1200" height="500" clip-path="url(#room-geometry)"><canvas class="hall-depth-canvas" xmlns="http://www.w3.org/1999/xhtml" width="2400" height="1000" style="width:1200px;height:500px;display:block"></canvas></foreignObject>`+items.filter(i=>i.html.includes('seat-graphic')).sort((a,b)=>b.depth-a.depth).map(i=>i.html.replace(/fill="[^"]*"/g,'fill="transparent"').replace(/stroke="[^"]*"/g,'stroke="none"')).join('')+leaderHits.join('');
  return `<svg class="npc-auditorium" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax meet" aria-label="按参考照片空间关系建立的人大阶梯席位">
    <defs><clipPath id="ceiling-portal-limit"><path d="${ceilingLimit}"/></clipPath><clipPath id="hall-scene-bounds"><rect class="hall-full-bounds" width="1200" height="500"/></clipPath><clipPath id="room-geometry"><rect class="hall-room-bounds" y="0" width="1200" height="500"/></clipPath>
      <linearGradient id="room-wall" x2="0" y2="1"><stop stop-color="#33322e"/><stop offset=".6" stop-color="#1b1d1c"/><stop offset="1" stop-color="#0b1010"/></linearGradient>
      <linearGradient id="stage-carpet"><stop stop-color="#582e30"/><stop offset="1" stop-color="#2a1e23"/></linearGradient>
      <linearGradient id="block-red" x2=".4" y2="1"><stop stop-color="#d1654c"/><stop offset="1" stop-color="#b74936"/></linearGradient>
      <linearGradient id="block-yellow" x2=".4" y2="1"><stop stop-color="#f1d573"/><stop offset="1" stop-color="#cbaa48"/></linearGradient>
      <linearGradient id="ceiling-fade" x2="0" y2="1"><stop offset=".4" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient><linearGradient id="ceiling-left"><stop stop-color="black"/><stop offset=".22" stop-color="white"/></linearGradient><mask id="ceiling-left-space"><rect width="1200" height="132" fill="url(#ceiling-left)"/></mask><mask id="ceiling-space"><rect width="1200" height="132" fill="url(#ceiling-fade)" mask="url(#ceiling-left-space)"/></mask>
      <pattern id="wood-material" width="110" height="110" patternUnits="userSpaceOnUse"><svg width="110" height="110" viewBox="0 0 627 1254" preserveAspectRatio="none"><image href="../china-tno-study/assets/hall-material-atlas.png" width="1254" height="1254"/></svg></pattern>
      <pattern id="brass-material" width="170" height="150" patternUnits="userSpaceOnUse"><svg width="170" height="150" viewBox="627 0 627 1254" preserveAspectRatio="none"><image href="../china-tno-study/assets/hall-material-atlas.png" width="1254" height="1254"/></svg></pattern>
      <g id="hall-chair-cpc"><path d="M-6-5H5L8 1V5H-3L-6 1Z" fill="#b74b38" stroke="#e58b65"/></g><g id="hall-chair-other"><path d="M-6-5H5L8 1V5H-3L-6 1Z" fill="#d9b64f" stroke="#f6df8b"/></g>
    </defs>
    <g clip-path="url(#hall-scene-bounds)">
    <rect class="hall-full-bounds" width="1200" height="500" fill="url(#room-wall)"/>
    <svg width="1200" height="500" viewBox="0 0 1254 685" preserveAspectRatio="none" opacity=".14"><image href="../china-tno-study/assets/wall-details.png" width="1254" height="1254"/></svg>
    ${scene}
    <image class="ceiling-generated" href="../china-tno-study/assets/ceiling-continuous.png" x="50" y="-35" width="1200" height="165" preserveAspectRatio="none" mask="url(#ceiling-space)" clip-path="url(#ceiling-portal-limit)"/>
    </g>
  </svg>`;
}
window.chinaPoliticsScene=()=>`<div class="view politics-native" data-focus="all"><div class="hall-viewport">${hallSpace()}</div><div class="seat-tooltip" hidden></div><div class="leader-tooltip" role="tooltip" hidden></div></div>`;
