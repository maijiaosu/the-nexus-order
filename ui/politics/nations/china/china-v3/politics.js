'use strict';
const NPC_SAMPLE={total:2977,cpc:2091,other:886,year:2023};
/* Coordinates follow the user's photograph: stage at left, a floor fan, and
   two curved galleries wrapping around the RIGHT wall, not stacked half-discs. */
const NPC_DECKS={floor:{outer:680,inner:340,elevation:0,rise:55,rows:6,columns:11},middle:{outer:870,inner:610,elevation:20,rise:65,rows:5,columns:12},upper:{outer:1120,inner:900,elevation:60,rise:70,rows:5,columns:13}};
function npcProject(x,z,elevation){
  // One projective camera for every tier, railing and rectangular block.
  const horizontal=.9701425*x+.2425356*z,depth=-.2425356*x+.9701425*z;
  const distance=.94*depth+.34*elevation,w=1-distance*.00019;
  return [300+horizontal/w,700+(.34*depth-.94*elevation)/w];
}
function npcWorld(deck,t,u){
  const d=NPC_DECKS[deck],r=d.outer+(d.inner-d.outer)*t,theta=(-40+90*u)*Math.PI/180;
  return {r,theta,elevation:d.elevation+(1-t)*d.rise,x:r*Math.cos(theta),z:r*Math.sin(theta)};
}
function npcPoint(deck,t,u){const p=npcWorld(deck,t,u);return npcProject(p.x,p.z,p.elevation)}
function npcCurvePoints(deck,t,start=0,end=1){return Array.from({length:70},(_,i)=>npcPoint(deck,t,start+(end-start)*i/69))}
function npcBandPoints(deck,a,b){return [...npcCurvePoints(deck,a),...npcCurvePoints(deck,b,1,0)]}
function npcFasciaPoints(deck){const front=npcCurvePoints(deck,1.08);return [...front,...[...front].reverse().map(([x,y])=>[x,y+32])]}
function npcPolygonPath(points){return points.map((p,i)=>(i?'L':'M')+p.map(n=>n.toFixed(2)).join(' ')).join(' ')+'Z'}
function npcChairGeometry(s){
  // A solid curved rectangular block, with four sides and a flat top in 3D.
  const p=npcWorld(s.deck,s.t,s.u);p.elevation=NPC_DECKS[s.deck].elevation+(1-s.row/(s.rows-1))*NPC_DECKS[s.deck].rise;const halfAngle=s.width/p.r/2,near=p.r-s.height/2,far=p.r+s.height/2;
  const point=(r,angle,h)=>npcProject(r*Math.cos(angle),r*Math.sin(angle),h);
  const arc=(r,h,reverse=false)=>Array.from({length:7},(_,i)=>point(r,p.theta+halfAngle*(2*(reverse?6-i:i)/6-1),h));
  const top=p.elevation+s.thickness,face=[...arc(far,top),...arc(near,top,true)];
  const front=[...arc(near,top),...arc(near,p.elevation,true)],back=[...arc(far,top),...arc(far,p.elevation,true)];
  const sideA=[point(near,p.theta-halfAngle,top),point(far,p.theta-halfAngle,top),point(far,p.theta-halfAngle,p.elevation),point(near,p.theta-halfAngle,p.elevation)];
  const sideB=[point(far,p.theta+halfAngle,top),point(near,p.theta+halfAngle,top),point(near,p.theta+halfAngle,p.elevation),point(far,p.theta+halfAngle,p.elevation)];
  const all=[...face,...front,...back,...sideA,...sideB].sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
  const lower=[],upper=[];for(const a of all){while(lower.length>=2&&cross(lower.at(-2),lower.at(-1),a)<=0)lower.pop();lower.push(a)}for(const a of [...all].reverse()){while(upper.length>=2&&cross(upper.at(-2),upper.at(-1),a)<=0)upper.pop();upper.push(a)}
  return {face,front,back,sideA,sideB,radialFront:(-.2425356*Math.cos(p.theta)+.9701425*Math.sin(p.theta))<0,outline:[...lower.slice(0,-1),...upper.slice(0,-1)],highlight:arc(near,top)};
}
function npcSeats(){
  const seats=[];
  const inside=(p,poly)=>{let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;};
  const intersects=(a,b)=>{
    if(a.some(p=>inside(p,b))||b.some(p=>inside(p,a)))return true;
    const orient=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
    for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++){
      const p=a[i],q=a[(i+1)%a.length],r=b[j],t=b[(j+1)%b.length];
      if(orient(p,q,r)*orient(p,q,t)<0&&orient(r,t,p)*orient(r,t,q)<0)return true;
    }return false;
  };
  const pointDistance=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)};
  const polysNear=(a,b,gap=1.5)=>{
    if(intersects(a,b))return true;
    for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++){
      const p=a[i],q=a[(i+1)%a.length],r=b[j],t=b[(j+1)%b.length];
      if(Math.min(pointDistance(p,r,t),pointDistance(q,r,t),pointDistance(r,p,q),pointDistance(t,p,q))<gap)return true;
    }return false;
  };
  const nearRail=(poly,deck)=>{
    const curve=npcCurvePoints(deck,1.08);
    for(let i=1;i<curve.length;i++)if(polysNear(poly,[curve[i-1],curve[i]],10))return true;
    return false;
  };
  const middleCover=npcBandPoints('middle',-.025,1.04),upperCover=npcBandPoints('upper',-.025,1.04);
  const middleFascia=npcFasciaPoints('middle'),upperFascia=npcFasciaPoints('upper');
  const stageCover=[[14,212],[582,302],[574,614],[36,764]];
  for(const [deck,total,rows] of [['floor',1587,6],['middle',750,5],['upper',640,5]]){
    const deckSeats=[];
    for(let row=0;row<rows;row++){
      const t=(row+.5)/rows;
      const count=NPC_DECKS[deck].columns,step=1/rows;
      for(let j=0;j<count;j++){
        const ratio=(j+.5)/count,u=.025+ratio*.95;
        if(j===Math.floor(count/2))continue;
        const [x,y]=npcPoint(deck,t,u),world=npcWorld(deck,t,u);
        const width=world.r*(90*Math.PI/180)*.95/count*.9;
        const height=(NPC_DECKS[deck].outer-NPC_DECKS[deck].inner)*step*.9;
        const candidate={deck,t,u,x,y,width,height,thickness:22,row,size:1,block:ratio<.34?0:ratio<.69?1:2,rows,count};
        const footprint=npcChairGeometry(candidate).outline;
        if(footprint.some(p=>p[0]<10||p[0]>1190||p[1]<5||p[1]>755))continue;
        if(polysNear(footprint,stageCover,2))continue;
        if(deck==='floor'&&([middleCover,middleFascia,upperCover,upperFascia].some(p=>polysNear(footprint,p,2))||nearRail(footprint,'middle')||nearRail(footprint,'upper')))continue;
        if(deck==='middle'&&([upperCover,upperFascia].some(p=>polysNear(footprint,p,2))||nearRail(footprint,'upper')))continue;
        if(deck!=='floor'&&nearRail(footprint,deck))continue;
        deckSeats.push({...candidate,footprint});
      }
    }
    const visible=deckSeats;
    visible.forEach((s,i)=>s.capacity=Math.floor((i+1)*total/visible.length)-Math.floor(i*total/visible.length));
    seats.push(...visible);
  }
  let remaining=NPC_SAMPLE.cpc;
  const ordered=[...seats].sort((a,b)=>a.block-b.block||a.u-b.u||a.y-b.y);
  ordered.forEach((s,i)=>{
    if(remaining>0&&remaining<s.capacity){
      const extra=s.capacity-remaining,next=ordered.slice(i+1).find(n=>n.deck===s.deck)||ordered[i+1];
      s.capacity=remaining;next.capacity+=extra;
    }
    s.party=remaining>0?'cpc':'other';s.cpc=s.party==='cpc'?s.capacity:0;s.other=s.party==='other'?s.capacity:0;remaining-=s.cpc;
  });
  return seats;
}
function npcCurve(deck,t,start=0,end=1){return npcCurvePoints(deck,t,start,end).map((p,i)=>(i?'L':'M')+p.map(n=>n.toFixed(2)).join(' ')).join(' ')}
function npcBand(deck,a,b){return npcPolygonPath(npcBandPoints(deck,a,b))}
function npcFascia(deck){return npcPolygonPath(npcFasciaPoints(deck))}
function npcChair(s){
  const g=npcChairGeometry(s),red=s.party==='cpc';
  return `<g class="seat-graphic" data-deck="${s.deck}" data-affiliation="${s.party}" data-seats="${s.capacity}" data-cpc="${s.cpc}" data-other="${s.other}" role="button" tabindex="-1" aria-label="${red?'中共党员':'非中共党员'}席位组">
    <path d="${npcPolygonPath(g.sideB)}" fill="${red?'#8a3430':'#a28035'}" stroke="#1c1517" stroke-width=".7"/>
    <path d="${npcPolygonPath(g.radialFront?g.front:g.back)}" fill="url(#block-front-${s.party})" stroke="#211719" stroke-width=".7"/>
    <path d="${npcPolygonPath(g.face)}" fill="url(#hall-seat-${s.party})" stroke="${red?'#d17c66':'#f1d689'}" stroke-width=".7"/>
    <path d="${g.highlight.map((p,i)=>(i?'L':'M')+p.join(' ')).join(' ')}" fill="none" stroke="${red?'#f1a183':'#fff0a6'}" stroke-width="1" opacity=".8"/>
  </g>`;
}
function npcSteps(deck){
  const d=NPC_DECKS[deck],at=(r,u,h)=>{const angle=(-40+90*u)*Math.PI/180;return npcProject(r*Math.cos(angle),r*Math.sin(angle),h)},arc=(r,h,reverse=false)=>Array.from({length:60},(_,i)=>at(r,(reverse?59-i:i)/59,h));
  let out='';
  for(let row=0;row<d.rows;row++){
    const outer=d.outer+(d.inner-d.outer)*row/d.rows,inner=d.outer+(d.inner-d.outer)*(row+1)/d.rows;
    const h=d.elevation+(1-row/(d.rows-1))*d.rise,low=h-d.rise/(d.rows-1);
    out+=`<path d="${npcPolygonPath([...arc(outer,h),...arc(inner,h,true)])}" fill="#38242a" stroke="#856351" stroke-width=".65"/>
      <path d="${npcPolygonPath([...arc(inner,h),...arc(inner,low,true)])}" fill="url(#tier-riser)" stroke="#221c20" stroke-width=".6"/>
      <path d="${npcPolygonPath([at(outer,0,h),at(inner,0,h),at(inner,0,d.elevation-24),at(outer,0,d.elevation-24)])}" fill="#30242a" stroke="#665046" stroke-width=".7"/>`;
  }
  return out;
}
function npcCeiling(){
  return `<image class="ceiling-generated" href="../china-tno-study/assets/ceiling-continuous.png" x="60" y="-72" width="1200" height="320" preserveAspectRatio="none" mask="url(#ceiling-continuity)"/>`;
}
function npcStage(){
  const opening='M14 212L582 302L574 606L36 764Z';
  let coffers='',desks='',sideLights='';
  for(let i=0;i<23;i++)for(let r=0;r<4;r++){
    const x=43+i*21,y=250+r*17+i*2.58;
    coffers+=`<path d="M${x} ${y}l17 2.1l-5 10l-17-2.1Z" fill="#101617" stroke="#8d826a" stroke-width=".9"/>`;
  }
  for(let i=0;i<7;i++){
    const left=[49+i*2,671+i*10],right=[381+i*9,524+i*10];
    const pos=u=>[left[0]+(right[0]-left[0])*u,left[1]+(right[1]-left[1])*u];
    for(const [start,end] of [[.02,.29],[.33,.62],[.66,.99]]){
      const a=pos(start),b=pos(end),dx=15+i*.7,dy=8;
      desks+=`<path d="M${a[0]-3} ${a[1]+3}L${b[0]} ${b[1]+3}l${dx} ${dy+6}L${a[0]+dx} ${a[1]+dy+9}Z" fill="#161317"/>
      <path d="M${a}L${b}l${dx} ${dy}L${a[0]+dx} ${a[1]+dy+3}Z" fill="url(#hall-wood)" stroke="#ac8158" stroke-width=".8"/>
      <path d="M${a}L${b}l${dx} ${dy}L${a[0]+dx} ${a[1]+dy+3}Z" fill="url(#wood-material)" opacity=".58"/>
      <path d="M${a}L${b}l${dx} ${dy}" fill="none" stroke="#bd9165" stroke-width="1.2"/>
      <path d="M${a[0]+dx} ${a[1]+dy+3}L${b[0]+dx} ${b[1]+dy}" fill="none" stroke="#e0b580" stroke-width=".7"/>
      <path d="M${a[0]+dx} ${a[1]+dy+3}L${b[0]+dx} ${b[1]+dy}v8L${a[0]+dx} ${a[1]+dy+11}Z" fill="url(#desk-front)" stroke="#3c2825" stroke-width=".5"/>`;
      for(let j=0;j<8;j++){
        const [x,y]=pos(start+(end-start)*(j+.5)/8);
        desks+=`<path d="M${x+1} ${y-3}l5-2v4l-5 2Z" fill="#351e25" stroke="#89634c" stroke-width=".45"/><path d="M${x+7} ${y+3}l3-1.3l2 1.8l-3 1.3Z" fill="#c6bda0" opacity=".65"/>`;
      }
    }
  }
  for(let i=0;i<12;i++)sideLights+=`<ellipse cx="531" cy="${387+i*13.8}" rx="2.6" ry="4" fill="#dcead9"/><ellipse cx="548" cy="${390+i*13.7}" rx="2.6" ry="4" fill="#dcead9"/>`;
  return `<g class="hall-structure">
    <path d="${opening}" fill="#151616"/>
    <path class="reserved-stage-area" d="M62 348L511 365L503 579L61 719Z" fill="#090b0d"/>
    <path d="M62 716L507 576L576 614L93 762H32Z" fill="url(#hall-carpet)"/>
    <g clip-path="url(#stage-material-clip)"><foreignObject x="0" y="0" width="1200" height="800" style="overflow:visible"><div xmlns="http://www.w3.org/1999/xhtml" style="position:relative;width:1200px;height:800px"><img class="proscenium-generated" src="../china-tno-study/assets/proscenium-material.png" alt="" style="position:absolute;left:0;top:0;width:1254px;height:1254px;transform-origin:0 0;transform:matrix3d(0.4489612006,-0.1060064503,0.0000000000,-0.0000720597,0.0210054178,0.4918228513,0.0000000000,0.0000507988,0.0000000000,0.0000000000,1.0000000000,0.0000000000,-19.2536973910,209.0022041753,0.0000000000,1.0000000000)"/></div></foreignObject></g>
    ${desks}
    <path d="M273 676L293 669V691L273 699Z" fill="#33212c" stroke="#c99155"/>
    <path d="M267 674L288 667L298 671L277 678Z" fill="#b27646"/>
    <path d="M220 755L275 736M220 749L275 730M220 743L275 724M220 737L275 718" stroke="#c89262" stroke-width="2"/>
  </g>`;
}
window.chinaPoliticsScene=function(){
  const seats=npcSeats();
  return `<div class="view politics-native" data-focus="all"><svg class="npc-auditorium" viewBox="0 0 1200 764" preserveAspectRatio="none" aria-label="按照人民大会堂原图斜视角绘制的人大席位分布">
  <defs>
  <pattern id="wood-material" width="100" height="160" patternUnits="userSpaceOnUse" patternTransform="rotate(66)"><svg width="100" height="160" viewBox="0 0 627 1254" preserveAspectRatio="none"><image href="../china-tno-study/assets/hall-material-atlas.png" width="1254" height="1254"/></svg></pattern>
  <pattern id="brass-material" width="170" height="150" patternUnits="userSpaceOnUse"><svg width="170" height="150" viewBox="627 0 627 1254" preserveAspectRatio="none"><image href="../china-tno-study/assets/hall-material-atlas.png" width="1254" height="1254"/></svg></pattern>
  <clipPath id="stage-material-clip"><path d="M14 212L582 302L574 606L36 764Z"/></clipPath>
  <linearGradient id="ceiling-depth-y" x1="0" y1="0" x2="0" y2="1"><stop stop-color="white"/><stop offset=".58" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient>
  <linearGradient id="ceiling-left-wall"><stop stop-color="black"/><stop offset=".30" stop-color="white"/><stop offset="1" stop-color="white"/></linearGradient><mask id="ceiling-left-mask" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#ceiling-left-wall)"/></mask><mask id="ceiling-continuity" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#ceiling-depth-y)" mask="url(#ceiling-left-mask)"/></mask>
  <filter id="hall-grain"><feTurbulence type="fractalNoise" baseFrequency=".74" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
  <radialGradient id="room-light" cx=".70" cy="0" r=".9"><stop stop-color="#827969" stop-opacity=".16"/><stop offset=".70" stop-color="#827969" stop-opacity="0"/></radialGradient>

  <linearGradient id="hall-wall" x2=".6" y2="1"><stop stop-color="#222322"/><stop offset=".7" stop-color="#111313"/><stop offset="1" stop-color="#080b0d"/></linearGradient>
  <linearGradient id="hall-stone"><stop stop-color="#a79a80"/><stop offset=".17" stop-color="#61594c"/><stop offset=".85" stop-color="#302f2b"/><stop offset="1" stop-color="#a3967d"/></linearGradient>
  <linearGradient id="hall-gold" x2="0" y2="1"><stop stop-color="#cabb94"/><stop offset=".25" stop-color="#a88c65"/><stop offset=".7" stop-color="#80604b"/><stop offset="1" stop-color="#d4a269"/></linearGradient>
  <linearGradient id="tier-riser" x2="0" y2="1"><stop stop-color="#664138"/><stop offset="1" stop-color="#271e23"/></linearGradient>
  <linearGradient id="desk-front" x2="0" y2="1"><stop stop-color="#572f2b"/><stop offset="1" stop-color="#241c20"/></linearGradient>
  <linearGradient id="hall-wood" x2=".3" y2="1"><stop stop-color="#87583e"/><stop offset=".5" stop-color="#5d392d"/><stop offset="1" stop-color="#382325"/></linearGradient>
  <linearGradient id="hall-carpet" x2=".5" y2="1"><stop stop-color="#702d36"/><stop offset="1" stop-color="#281b23"/></linearGradient>
  <linearGradient id="hall-gallery-face" x2=".7" y2="1"><stop stop-color="#977a54"/><stop offset=".12" stop-color="#58493c"/><stop offset=".7" stop-color="#121415"/><stop offset="1" stop-color="#08090a"/></linearGradient>
  ${['cpc','other'].map(k=>`<linearGradient id="block-front-${k}" x2="0" y2="1"><stop stop-color="${k==='cpc'?'#b75248':'#c8a44f'}"/><stop offset="1" stop-color="${k==='cpc'?'#6b292b':'#80642c'}"/></linearGradient><linearGradient id="hall-seat-${k}" x2=".2" y2="1"><stop stop-color="${k==='cpc'?'#d9745b':'#f5d67a'}"/><stop offset=".4" stop-color="${k==='cpc'?'#b7473d':'#dcba5d'}"/><stop offset="1" stop-color="${k==='cpc'?'#923831':'#b58d3d'}"/></linearGradient>
  <g id="hall-chair-${k}">
  <path d="M-5.3-6H4.6L6.2-2.5V.8H-4L-5.3-2Z" fill="#080b0c" stroke="#050808" stroke-width=".6"/>
  <path d="M-5.3-6H4.6L6.2-2.5H-3.8Z" fill="url(#hall-seat-${k})"/>
  <path d="M-3.8-2.5H6.2V.8H-3.8Z" fill="${k==='cpc'?'#71242b':'#936e31'}"/>
  <path d="M-5.3-6H4.6M-3.8-2.5H6.2" stroke="${k==='cpc'?'#d68162':'#e7c679'}" stroke-width=".6"/>
  </g>`).join('')}
  <pattern id="hall-lines" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 2H3" stroke="#777c7b" opacity=".075" stroke-width=".6"/></pattern>
  </defs>
  <path d="M0 0H1200V763H0Z" fill="url(#hall-wall)"/>
  ${npcCeiling()}

  ${[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i=>`<path d="M${35+i*60} ${105+i*10}v80" stroke="#707575" stroke-width=".8" opacity=".17"/>`).join('')}
  <path d="M572 505L869 460L920 548L599 585Z" fill="#111213" stroke="#867456"/>
  ${[0,1,2,3,4,5,6,7,8].map(i=>`<path d="M${586+i*33} ${526-i*4.3}v18h14v-18Z" fill="#4b3c35" stroke="#a79769" stroke-width="1"/>`).join('')}
  <path d="M288 763L563 577L878 553L971 763Z" fill="url(#hall-carpet)"/>
  ${['floor','middle','upper'].map(deck=>`
    ${deck==='floor'?'':`<path d="${npcFascia(deck)}" fill="url(#hall-gallery-face)" stroke="#a18d63"/><path d="${npcFascia(deck)}" fill="url(#brass-material)" opacity=".23"/>`}
    <path d="${npcBand(deck,-.025,1.04)}" fill="${deck==='floor'?'#371d2a':'#2b1c25'}" stroke="#82614c"/>
    ${npcSteps(deck)}
    ${seats.filter(s=>s.deck===deck).sort((a,b)=>{const distance=s=>{const p=npcWorld(s.deck,s.t,s.u),h=NPC_DECKS[s.deck].elevation+(1-s.row/(s.rows-1))*NPC_DECKS[s.deck].rise;return .94*(-.2425356*p.x+.9701425*p.z)+.34*h};return distance(a)-distance(b)}).map(npcChair).join('')}
    ${deck==='floor'?'':`<path d="${npcCurve(deck,1.08)}" fill="none" stroke="#312a27" stroke-width="16"/><path d="${npcCurve(deck,1.08)}" fill="none" stroke="url(#hall-gold)" stroke-width="10"/><path d="${npcCurve(deck,1.08)}" fill="none" stroke="url(#brass-material)" stroke-width="7" opacity=".38"/><path d="${npcCurve(deck,1.065)}" fill="none" stroke="#cfb68a" stroke-width="1"/>
      ${Array.from({length:27},(_,i)=>{const a=npcPoint(deck,1.10,(i+.5)/27),b=[a[0],a[1]+25];const c=npcPoint(deck,1.10,(i+.90)/27);return `<path d="M${a[0]+3} ${a[1]+7}L${c[0]} ${c[1]+7}v15L${a[0]+3} ${a[1]+22}Z" fill="#302a24" stroke="#b6a17a" stroke-width=".45"/><path d="M${a}L${b}" stroke="#96805b" stroke-width="2"/>`}).join('')}`}`).join('')}
  <path d="M0 0H1200V760H0Z" fill="url(#room-light)" pointer-events="none"/>
  ${npcStage()}
  <rect width="1200" height="764" filter="url(#hall-grain)" opacity=".055" style="mix-blend-mode:soft-light" pointer-events="none"/><path d="M0 0H1200V764H0Z" fill="url(#hall-lines)" pointer-events="none"/>
  </svg><svg class="npc-legend" viewBox="0 764 1200 36" preserveAspectRatio="none" aria-label="人大席位统计"><path d="M0 764H1200" stroke="#69b5b8"/><path d="M0 765H1200V800H0Z" fill="#05151b"/>
  <text x="12" y="787" font-size="20" fill="#e6e9df">全国人民代表大会</text><text x="220" y="787" font-size="12" fill="#8fa9a6">2023年换届</text>
  <g class="affiliation-key" role="button" tabindex="0" data-affiliation="cpc" aria-label="中共党员，2091名" aria-pressed="false"><rect x="330" y="769" width="294" height="30" fill="transparent"/><path class="key-rule" d="M330 772H624V796H330" fill="none" stroke="#8e4759"/><use href="#hall-chair-cpc" transform="translate(344 788) scale(1.9)"/><text x="361" y="790" font-size="18" fill="#e87964">中共党员</text><text x="534" y="791" font-family="Digits,TNO" font-size="25" fill="#e87964">2091</text></g>
  <g class="affiliation-key" role="button" tabindex="0" data-affiliation="other" aria-label="非中共党员，886名" aria-pressed="false"><rect x="637" y="769" width="316" height="30" fill="transparent"/><path class="key-rule" d="M637 772H953V796H637" fill="none" stroke="#ae8841"/><use href="#hall-chair-other" transform="translate(652 788) scale(1.9)"/><text x="669" y="790" font-size="18" fill="#edcf78">非中共党员</text><text x="873" y="791" font-family="Digits,TNO" font-size="25" fill="#edcf78">886</text></g>
  <text x="1187" y="790" text-anchor="end" font-size="18" fill="#e7d7af">共 <tspan font-family="Digits,TNO" font-size="25">2977</tspan> 名代表</text>
  </svg><div class="seat-tooltip" hidden></div></div>`;
};
window.mountChinaPolitics=function(root){
  const scene=root.querySelector('.politics-native'),tooltip=scene.querySelector('.seat-tooltip');
  const focus=k=>{const next=scene.dataset.focus===k?'all':k;scene.dataset.focus=next;scene.querySelectorAll('.affiliation-key').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.affiliation===next)))};
  scene.addEventListener('click',e=>{const key=e.target.closest('.affiliation-key,.seat-graphic');if(key)focus(key.dataset.affiliation)});
  scene.addEventListener('pointerover',e=>{const seat=e.target.closest('.seat-graphic,.affiliation-key');if(!seat)return;const cpc=seat.dataset.affiliation==='cpc';tooltip.style.setProperty('--seat-color',cpc?'#ed725f':'#e7c774');tooltip.innerHTML=`<strong>${cpc?'中共党员':'非中共党员'}</strong>${cpc?NPC_SAMPLE.cpc:NPC_SAMPLE.other} 名代表`;tooltip.hidden=false});
  scene.addEventListener('pointermove',e=>{if(tooltip.hidden)return;tooltip.style.left=Math.min(innerWidth-240,e.clientX+16)+'px';tooltip.style.top=Math.min(innerHeight-100,e.clientY+15)+'px'});
  scene.addEventListener('pointerout',e=>{if(e.target.closest('.seat-graphic,.affiliation-key'))tooltip.hidden=true});
};
