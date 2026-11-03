'use strict';
/* The architectural cutaway is local art. Seats and counts remain native SVG. */
function npcHallScene(){
  const rows=32,total=2977,members=2091;
  const weights=Array.from({length:rows},(_,i)=>.52+.48*i/(rows-1));
  const sum=weights.reduce((a,b)=>a+b,0),counts=weights.map(w=>Math.floor(total*w/sum));
  for(let n=counts.reduce((a,b)=>a+b,0),i=0;n<total;n++,i++)counts[rows-1-i%rows]++;
  const chairs=[];
  for(let row=0;row<rows;row++){
    const t=row/(rows-1),n=counts[row],width=615+675*t;
    for(let j=0;j<n;j++){
      const a=(j+.5)/n;
      // Separate front-to-back aisles follow the cutaway's marble and carpet edges.
      let u=(a-.5)*.91;
      if(a<.2)u-=.026;else if(a>.8)u+=.026;
      if(a<.5)u-=.018;else u+=.018;
      const x=827-57*t+u*width;
      const y=613+253*t+22*(1-Math.abs(u)*2)*t;
      chairs.push({x,y,u,row,scale:.59+.45*t,party:false});
    }
  }
  [...chairs].sort((a,b)=>a.u-b.u||a.row-b.row).slice(0,members).forEach(c=>c.party=true);
  return `<svg class="hall-world" viewBox="0 0 1614 975" role="img" aria-label="人民大会堂顶灯下的立体席位构成，2977名代表"><defs>
  <linearGradient id="chair-r" x2="0" y2="1"><stop stop-color="#ff9297"/><stop offset=".35" stop-color="#ee4c66"/><stop offset="1" stop-color="#9c213a"/></linearGradient>
  <linearGradient id="chair-c" x2="0" y2="1"><stop stop-color="#e0f4ed"/><stop offset=".35" stop-color="#8cd2dc"/><stop offset="1" stop-color="#356e85"/></linearGradient>
  <g id="seat-r"><path d="M-3-6H3V0L4 2V4H-3L-4 2V0Z" fill="#381522" stroke="#170e17" stroke-width=".8"/><path d="M-3-6H3V0H-3Z" fill="url(#chair-r)"/><path d="M-3 0H3L4 2H-2Z" fill="#e35d70"/><path d="M-3-6H3" stroke="#ffb6a0" stroke-width=".7"/></g>
  <g id="seat-c"><path d="M-3-6H3V0L4 2V4H-3L-4 2V0Z" fill="#132b39" stroke="#06131b" stroke-width=".8"/><path d="M-3-6H3V0H-3Z" fill="url(#chair-c)"/><path d="M-3 0H3L4 2H-2Z" fill="#9cced8"/><path d="M-3-6H3" stroke="#e2ede0" stroke-width=".7"/></g>
  <pattern id="hall-scan" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 3H4" stroke="#001923" stroke-width=".65" opacity=".28"/></pattern>
  <mask id="hall-silhouette"><image href="assets/hall-cutaway.png" width="1614" height="975" filter="url(#hall-alpha)"/></mask><filter id="hall-alpha"><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter>
  </defs><image class="hall-architecture" href="assets/hall-cutaway.png" width="1614" height="975"/>
  <g class="hall-seating">${chairs.map(c=>`<use href="#seat-${c.party?'r':'c'}" class="hall-seat ${c.party?'seat-cpc':'seat-other'}" transform="translate(${c.x.toFixed(2)} ${c.y.toFixed(2)}) scale(${c.scale.toFixed(3)})"/>`).join('')}</g>
  <rect width="1614" height="975" fill="url(#hall-scan)" mask="url(#hall-silhouette)" pointer-events="none"/>
  </svg>`;
}
