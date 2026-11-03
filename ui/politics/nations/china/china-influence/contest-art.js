(function(global){
  'use strict';
  const C={cn:{hi:'#f1b1a8',face:'#ee828b',mid:'#b15f69',low:'#2c222b',edge:'#663d4a'},us:{hi:'#a3dfd2',face:'#10c5c2',mid:'#318f91',low:'#0b2c33',edge:'#23595f'}};
  const ink='#03161a', paper='#c5d6c7', shadow='#061e25';
  let serial=0;
  const p=(d,f='none',s=null,w=1)=>`<path d="${d}" fill="${f}"${s?` stroke="${s}" stroke-width="${w}"`:''}/>`;
  const e=(x,y,rx,ry,f,s=null,w=1)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"${s?` stroke="${s}" stroke-width="${w}"`:''}/>`;
  const text=(x,y,t,c,size=30,anchor='middle')=>`<text x="${x}" y="${y}" style="fill:${c}" font-size="${size}" font-family="Georgia,serif" text-anchor="${anchor}">${t}</text>`;
  const score=v=>Math.max(1,Math.min(9,Math.round(Number(v)||1)));
  const level=(side,n,value,body)=>`<g class="contest-level${n<=value?' active':''}" data-side="${side}" data-level="${n}" data-active="${n<=value}">${body}</g>`;
  function number(x,y,value,side,size=1){
    const d={a:'M-8-30L-5-33H6L9-30 6-28H-5Z',b:'M10-29L12-26V-18L9-15 7-18V-26Z',c:'M10-13L12-10V-2L9 1 7-2V-10Z',d:'M-8 2L-5-1H6L9 2 6 4H-5Z',e:'M-10-13L-7-10V-2L-10 1-12-2V-10Z',f:'M-10-29L-7-26V-18L-10-15-12-18V-26Z',g:'M-8-14L-5-17H6L9-14 6-12H-5Z'};
    const on={1:'bc',2:'abged',3:'abgcd',4:'fgbc',5:'afgcd',6:'afegcd',7:'abc',8:'abcdefg',9:'abfgcd'}[value];
    return `<g class="contest-reading" data-side="${side}" data-value="${value}" transform="translate(${x} ${y-2}) scale(${size})">${[...on].map(k=>p(d[k],C[side].face)).join('')}${text(30,2,'/9',C[side].hi,12)}</g>`;
  }
  function coin(cx,cy,rx,ry,side,n,value){
    const c=C[side],lit=n<=value,face=lit?c.face:c.low;
    let out=p(`M${cx-rx} ${cy}v7Q${cx-rx} ${cy+ry+8} ${cx} ${cy+ry+8}Q${cx+rx} ${cy+ry+8} ${cx+rx} ${cy+7}v-7Z`,face,ink,1.6);
    // Broad black edge notches share the ellipse perspective of the chip rim.
    for(let j=0;j<7;j++){
      const a=(j+.25)*Math.PI/7,b=(j+.73)*Math.PI/7;
      const x1=cx-rx*Math.cos(a),y1=cy+ry*Math.sin(a),x2=cx-rx*Math.cos(b),y2=cy+ry*Math.sin(b);
      out+=p(`M${x1} ${y1}L${x2} ${y2}v7L${x1} ${y1+7}Z`,ink);
    }
    out+=e(cx,cy,rx,ry,face,ink,1.5)+e(cx,cy,rx-5,ry-2,'none',lit?c.hi:c.edge,.85)+e(cx,cy,rx-12,ry-4,'none',ink,1.1);
    for(let j=0;j<8;j++){
      const a=j*Math.PI/4+.18;
      out+=p(`M${cx+(rx-5)*Math.cos(a)} ${cy+(ry-2)*Math.sin(a)}L${cx+(rx-12)*Math.cos(a)} ${cy+(ry-4)*Math.sin(a)}`,'none',ink,2.1);
    }
    return level(side,n,value,out);
  }
  function economy(a=6,b=8){
    a=score(a);b=score(b);let out='';
    // A single exchange table: its two tracks physically enter the same recessed centre.
    out+=p('M61 137L125 108H430L500 139 459 169H107Z',shadow,'#506267',1.2);
    out+=p('M61 137L107 164H458L500 139v9L460 179H105L61 148Z','#14252b','#456067',1);
    out+=p('M69 141L109 167H456L490 143M111 172H453','none','#82978e',.65);
    // Engraved feet and squared return ends keep the common platform legible.
    out+=p('M105 178v10h62l8-9M395 180l8 8h56v-10','none','#738b85',1.2);
    for(let j=0;j<11;j++)out+=p(`M${188+j*15} 168v9`,'none','#29434a',.7);
    out+=p('M110 126H212L228 143H351L369 125H451','none','#7b9290',1);
    out+=p('M123 122H208L225 138H354L371 122H436','none','#344b51',3);
    // Offset rear and front stacks overlap one another in the shared recess.
    for(let n=1;n<=9;n++){
      if(n<=a)out+=coin(231,122-(n-1)*8.1,64,17,'cn',n,a);
      else out+=level('cn',n,a,'');
    }
    for(let n=1;n<=9;n++){
      if(n<=b)out+=coin(324,143-(n-1)*8.1,66,18,'us',n,b);
      else out+=level('us',n,b,'');
    }
    const top=(cx,cy,side,v)=>{
      const c=C[side],lit=true;let s=e(cx,cy,49,11,c.face,c.hi,.8);
      const d=side==='cn'?'M-11-9L0 0 11-9M0 0V12M-10 1H10M-10 6H10':'M10-7C4-13-11-12-11-4C-11 2 10-1 10 6C10 13-5 15-11 8M0-15V17';
      s+=`<g transform="translate(${cx} ${cy}) scale(1 .6)">${p(d,'none',lit?ink:c.edge,2.4)}</g>`;
      return s;
    };
    out+=top(231,122-(a-1)*8.1,'cn',a)+top(324,143-(b-1)*8.1,'us',b);
    // Two directional brass inlays meet under the overlapping coin stacks.
    out+=p('M88 111l16-10 42 27-16 9Z',C.cn.mid,ink,1)+p('M473 109l-17-10-37 25 17 10Z',C.us.mid,ink,1);
    for(let j=0;j<5;j++){out+=p(`M${99+j*5} ${106+j*3.2}l6-4M${461-j*5} ${105+j*3.2}l-6-4`,'none',paper,.75)}
    out+=number(92,71,a,'cn')+number(459,71,b,'us');
    out+=p('M72 82h55v13l31 19','none',C.cn.edge,1)+p('M438 82h45v13l-45 28','none',C.us.edge,1);
    return `<g class="contest-economy" data-kind="economy">${out}</g>`;
  }
  function military(a=6,b=8){
    a=score(a);b=score(b);let out='';const id=`military-${++serial}`;
    // The line of contact is one continuous interlocking tooth seam, not a scale.
    out+=p('M45 42L231 23 266 47 287 47 307 32 513 60 497 143 314 172 288 153 262 153 237 170 57 144Z',ink,'#53696b',1);
    out+=p('M48 42L238 22M316 174L498 145','none',paper,.7);
    const left='M56 52L227 35 260 58H280V75H265V95H283V114H265V137L234 158 66 133Z';
    const right='M504 69L309 44 289 58H280V75H294V95H283V114H298V137L315 159 489 133Z';
    out+=`<defs><clipPath id="${id}-l">${p(left,'white')}</clipPath><clipPath id="${id}-r">${p(right,'white')}</clipPath></defs>`;
    out+=p(left,C.cn.low,C.cn.face,1.7)+p(right,C.us.low,C.us.face,1.7);
    // Nine independently lit broad folded segments per side. Their ends bite into the same throat.
    for(const side of ['cn','us']){
      const c=C[side],v=side==='cn'?a:b,clip=side==='cn'?'l':'r';let parts='';
      for(let n=1;n<=9;n++){
        const x=side==='cn'?43+(n-1)*25:517-(n-1)*25,lit=n<=v;
        const d=side==='cn'?`M${x} 20L${x+39} 97 ${x} 173H${x+12}L${x+51} 97 ${x+12} 20Z`:`M${x} 20L${x-39} 97 ${x} 173H${x-12}L${x-51} 97 ${x-12} 20Z`;
        let s=p(d,lit?c.face:c.low,ink,1.5);
        if(lit){const t=side==='cn'?1:-1;s+=p(`M${x+t*4} 31L${x+t*37} 97 ${x+t*4} 163`,'none',c.hi,.7)}
        parts+=level(side,n,v,s);
      }
      out+=`<g clip-path="url(#${id}-${clip})">${parts}</g>`;
    }
    out+=p('M280 59v16h-15v20h18v19h-18v23','none',paper,1.2);
    // Clamps follow the sloping outer edges; end bolts are structural, not scattered decoration.
    out+=p('M57 45L229 28 244 38 60 57Z',C.cn.mid,ink,1.4)+p('M315 164L492 137 498 146 321 175Z',C.us.mid,ink,1.4);
    for(let k=0;k<6;k++){
      out+=p(`M${67+k*29} ${46-k*2.9}l3 6M${327+k*29} ${167-k*4.35}l-1-6`,'none',paper,.7);
    }
    for(const [x,y,c] of [[63,49,C.cn],[230,33,C.cn],[326,167,C.us],[488,143,C.us]])out+=e(x,y,3,3,ink,c.hi,.7);
    // Values sit in carved end tabs rather than on top of the folded data surface.
    out+=p('M6 64h41l12 31-12 30H6Z',ink,C.cn.face,1.1)+p('M553 76h-41l-12 26 12 30h41Z',ink,C.us.face,1.1);
    out+=number(24,105,a,'cn')+number(519,112,b,'us');
    return `<g class="contest-military" data-kind="military">${out}</g>`;
  }
  function politics(a=6,b=8){
    a=score(a);b=score(b);let out='';
    // One open charter, shared crease and bindings. Each book half has nine exposed page edges.
    out+=p('M93 26Q190 11 277 51Q368 14 466 31L483 151Q381 138 280 185Q185 146 78 164Z',shadow,'#80938b',1.2);
    out+=p('M83 162Q183 142 280 182Q384 137 481 150v6Q377 147 280 193Q181 151 81 170Z','#29373b','#8a9d92',.8);
    for(let n=1;n<=9;n++){
      const off=(9-n)*5, lc=n<=a?C.cn.face:C.cn.low,rc=n<=b?C.us.face:C.us.low;
      out+=level('cn',n,a,p(`M100 ${31+off}Q191 ${21+off} 277 ${58+off}L279 ${131+off}Q181 ${96+off} 91 ${120+off}Z`,lc,ink,.9)+p(`M91 ${120+off}Q185 ${99+off} 279 ${133+off}`,'none',n<=a?C.cn.hi:C.cn.edge,.6));
      out+=level('us',n,b,p(`M284 ${59+off}Q370 ${25+off} 458 ${36+off}L469 ${120+off}Q375 ${106+off} 282 ${134+off}Z`,rc,ink,.9)+p(`M282 ${134+off}Q380 ${104+off} 469 ${120+off}`,'none',n<=b?C.us.hi:C.us.edge,.6));
    }
    // Broad quiet writing fields sit over the coloured leaf edges, not transparent wireframes.
    out+=p('M100 31Q191 21 277 58L279 131Q181 96 91 120Z','#193137',C.cn.edge,.8);
    out+=p('M284 59Q370 25 458 36L469 120Q375 106 282 134Z','#193137',C.us.edge,.8);
    out+=p('M277 58Q270 89 279 134Q284 139 290 133L284 59Z','#879b8e',ink,.8);
    out+=p('M281 62Q279 92 283 130','none',paper,.8);
    // Impressed horizontal rules follow each curved page; lower signatures terminate at seals.
    for(let j=0;j<4;j++){
      out+=p(`M112 ${44+j*5}Q183 ${40+j*5} 253 ${63+j*5}`,'none',j===0?C.cn.hi:C.cn.edge,j===0?1.1:.7);
      out+=p(`M307 ${67+j*5}Q374 ${43+j*5} 447 ${48+j*5}`,'none',j===0?C.us.hi:C.us.edge,j===0?1.1:.7);
    }
    out+=p('M108 41Q185 29 263 62M107 45v16M252 59h11v10M105 107l-1 5 14-1M311 63Q372 39 450 45M313 65h-10v8M450 48v14M447 109l9 1v-7','none','#7c9a92',.65);
    out+=p('M111 109Q172 99 243 118M310 119Q374 102 450 108','none','#5b726e',.7);
    out+=number(189,104,a,'cn')+number(373,107,b,'us');
    // Two independent fastenings cross the same spine. The underside is visible at the turn.
    out+=p('M149 122L181 116 277 169 282 184 254 196 253 181Z',C.cn.mid,ink,1.1);
    out+=p('M423 121L391 115 288 165 279 181 305 194 305 177Z',C.us.mid,ink,1.1);
    out+=p('M156 125L266 180 260 190M413 121L298 177 291 184','none',paper,.6);
    out+=p('M254 182L263 170 277 169 282 184 267 177Z',C.cn.face,ink,.7);
    out+=p('M279 181L288 165 301 159 295 174 305 179 305 194Z',C.us.face,ink,.7);
    const seal=(x,y,side)=>{let c=C[side],s='';
      const pts=[];for(let q=0;q<24;q++){let t=q*Math.PI/12,r=q%2?15:17;pts.push(`${(x+Math.cos(t)*r).toFixed(2)},${(y+Math.sin(t)*r*.68).toFixed(2)}`)}
      s+=`<polygon points="${pts.join(' ')}" fill="${c.mid}" stroke="${ink}" stroke-width="1.2"/>`;
      s+=e(x,y,12,8,c.face,c.hi,.8)+e(x,y,9,5.7,'none',ink,.7);
      s+=p(`M${x-4} ${y-2}h8v4h-8Z`,'none',ink,1);
      for(let j=0;j<10;j++){const aa=j*Math.PI/5;s+=p(`M${x+14*Math.cos(aa)} ${y+9*Math.sin(aa)}l${1.5*Math.cos(aa)} ${Math.sin(aa)}`,'none',c.hi,.5)}
      return s;
    };
    out+=seal(172,124,'cn')+seal(403,124,'us');
    return `<g class="contest-politics" data-kind="politics">${out}</g>`;
  }
  function assembly(cn=[6,3,3],us=[8,9,8]){
    cn=cn.map(score);us=us.map(score);const id=`assembly-${++serial}`;let out='';
    const label=(x,y,caption,anchor='start')=>`<text class="assembly-caption" x="${x}" y="${y}" text-anchor="${anchor}" style="font-family:TNO,'Songti SC',serif;font-size:24px;fill:#b8c7b7;letter-spacing:2px">${caption}</text>`;
    const read=(x,y,value,side)=>number(x,y,value,side).replace('font-size="12"','font-size="18"');
    // One opened folio supports every element. The upper fold recedes, and the
    // exposed lower paper block belongs to the same contour, not a third plinth.
    out+=p('M57 152Q172 104 311 161Q420 100 562 137L583 521Q443 515 314 605Q181 553 64 592Z','#13272d','#748982',1.4);
    out+=p('M61 161Q179 115 310 174Q425 112 552 147L566 514Q435 519 313 590Q183 542 76 576Z','#0e2129','#354e52',.8);
    out+=p('M57 152L46 170 56 593 64 604 314 621 585 540 583 521Q443 515 314 605Q181 553 64 592Z','#101c23','#526e70',1.1);
    out+=p('M57 590L63 598 313 614 577 537M71 580Q180 543 313 597Q438 514 572 525','none','#86968a',.8);
    // A folded rear sheet makes a real recess for the currency stacks.
    out+=p('M87 182Q180 139 310 184Q428 128 536 166L544 273Q428 237 314 286Q192 246 86 282Z','#1b3036','#5c7370',1);
    out+=p('M87 182L97 198Q191 158 310 200Q426 145 536 182v-16Q428 128 310 184Q180 139 87 182Z','#34484a','#657873',.75);
    out+=p('M96 198Q199 166 310 207Q425 153 531 185','none','#9fae9c',.65);
    out+=p('M310 183L317 287 326 283 319 180Z','#668681',ink,.6);
    // The economic stacks sit in the rear recess; the lower table edge is never
    // drawn as an independent complete object.
    let eco='';
    for(const side of ['cn','us']){
      const value=side==='cn'?cn[0]:us[0],cx=side==='cn'?211:389,cy=side==='cn'?230:211;
      for(let n=1;n<=9;n++)eco+=n<=value?coin(cx,cy-(n-1)*8.6,68,20,side,n,value):level(side,n,value,'');
      const topY=cy-(value-1)*8.6,c=C[side];
      eco+=e(cx,topY,53,13,c.face,c.hi,.7)+e(cx,topY,46,10,'none',c.mid,.6);
      const mark=side==='cn'?'M-11-10L0 0 11-10M0 0V13M-11 2H11M-11 7H11':'M11-8C3-15-12-13-12-5C-12 2 12-1 12 7C12 15-5 17-12 9M0-17V19';
      eco+=`<g transform="translate(${cx} ${topY}) scale(1.3 .72)">${p(mark,'none',ink,2.3)}</g>`;
    }
    eco+=read(85,170,cn[0],'cn')+read(506,146,us[0],'us');
    eco+=p('M73 181h36l22 26M493 158h40v30l-48 30','none','#9aae9e',.9);
    eco+=label(327,80,'经济影响');
    eco+=p('M323 88H465l13 10M326 92H455','none','#768e86',.9);
    out+=`<g id="${id}-economy" class="contest-economy" data-kind="economy">${eco}</g>`;
    // The military fold is a single cut and opened sheet, interlocked at its
    // spine. Its upper shoulder conceals the rear folio surface, and its lower
    // turn disappears beneath the foreground signed leaf.
    let mil='';
    const ld='M35 291L105 254 270 276 299 306H313V330H297V357H315V383H298V412L270 439 76 410Z';
    const rd='M574 252L360 283 333 306H313V330H335V357H315V383H336V411L365 436 586 392Z';
    mil+=`<defs><clipPath id="${id}-l">${p(ld,'white')}</clipPath><clipPath id="${id}-r">${p(rd,'white')}</clipPath></defs>`;
    mil+=p('M35 291L105 254 270 276 312 310 360 283 574 252 591 400 366 447 314 423 269 450 73 423Z','#0a1a21','#9bae9e',1.2);
    mil+=p(ld,C.cn.low,C.cn.edge,1)+p(rd,C.us.low,C.us.edge,1);
    for(const side of ['cn','us']){
      const c=C[side],v=side==='cn'?cn[1]:us[1],clip=side==='cn'?'l':'r';let body='';
      for(let n=1;n<=9;n++){
        const x=side==='cn'?32+(n-1)*27:591-(n-1)*27,dir=side==='cn'?1:-1,lit=n<=v;
        const d=`M${x} 244L${x+dir*50} 350 ${x} 450H${x+dir*15}L${x+dir*65} 350 ${x+dir*15} 244Z`;
        let segment=p(d,lit?c.face:c.low,ink,1.5);
        if(lit)segment+=p(`M${x+dir*4} 250L${x+dir*51} 350 ${x+dir*4} 444`,'none',c.hi,.75);
        body+=level(side,n,v,segment);
      }
      mil+=`<g clip-path="url(#${id}-${clip})">${body}</g>`;
    }
    mil+=p('M313 307v23h-16v27h18v26h-17v29','none','#d8cdb2',1.3);
    // Structural fold returns: broad on the exposed left shoulder, interrupted
    // by the foreground page on the lower right.
    mil+=p('M35 291L44 278 106 243 273 267 292 290 270 276 105 254Z',C.cn.mid,ink,1.1);
    mil+=p('M367 436L586 392 591 400 366 447 345 433Z',C.us.mid,ink,1.1);
    for(let j=0;j<15;j++){
      const x=110+j*11;
      mil+=p(`M${x} ${247+j*1.5}l2 6`,'none',C.cn.hi,.65);
    }
    for(let j=0;j<15;j++)mil+=p(`M${373+j*14} ${440-j*2.8}l-2-5`,'none',C.us.hi,.65);
    // Quiet end cut-outs carry numbers without hiding any of the nine folds.
    mil+=p('M10 328H57l16 29-16 27H10Z',ink,C.cn.face,1)+p('M610 310h-45l-17 28 17 25h45Z',ink,C.us.face,1);
    mil+=read(31,365,cn[1],'cn')+read(574,347,us[1],'us');
    mil+=`<text class="assembly-caption" x="316" y="295" style="font-family:TNO,'Songti SC',serif;font-size:22px;fill:#b8c7b7;paint-order:stroke;stroke:${ink};stroke-width:6px;text-anchor:middle">军事影响</text>`;
    out+=`<g id="${id}-military" class="contest-military" data-kind="military">${mil}</g>`;
    // The continuous foreground cut edge is the political reading. It closes
    // the whole folio. No separate book silhouette is added below the military.
    let pol='';
    for(let n=1;n<=9;n++){
      const off=(9-n)*7.2,lc=n<=cn[2]?C.cn.face:C.cn.low,rc=n<=us[2]?C.us.face:C.us.low;
      pol+=level('cn',n,cn[2],p(`M78 ${440+off}Q175 ${412+off} 308 ${477+off}L312 ${520+off}Q185 ${459+off} 73 ${490+off}Z`,lc,ink,1)+p(`M75 ${486+off}Q185 ${456+off} 310 ${516+off}`,'none',n<=cn[2]?C.cn.hi:C.cn.edge,.65));
      pol+=level('us',n,us[2],p(`M323 ${478+off}Q443 ${406+off} 558 ${430+off}L567 ${478+off}Q443 ${459+off} 315 ${522+off}Z`,rc,ink,1)+p(`M319 ${518+off}Q443 ${454+off} 565 ${474+off}`,'none',n<=us[2]?C.us.hi:C.us.edge,.65));
    }
    // Only the forward lip of the top leaf is seen; it occludes the lower
    // military clamps, giving the components a real common depth order.
    pol+=p('M75 423Q188 395 308 455L323 455Q445 392 558 410L559 432Q443 410 323 479L308 478Q177 414 78 441Z','#20363b','#8fa18e',1);
    pol+=p('M83 429Q185 407 306 464M326 464Q446 404 550 418','none','#bec5a9',.75);
    pol+=p('M308 455Q311 490 312 527H319Q319 490 323 455Z','#1d3034',ink,.7);
    pol+=p('M312 461Q316 489 314 523M319 461Q317 489 317 523','none','#809383',.75);
    // Signing ribbons cross each other's field and return through the same
    // exposed book mouth. Their static widths carry no derived quantity.
    // The seals adhere to the curved page, bend over its cut edge, and tuck
    // beneath it. Rounded returns expose the darker underside; no free sticks
    // project beyond the folio and no decorative cross is floating above it.
    pol+=p('M189 426Q241 449 279 482Q296 499 307 524Q313 539 302 548L290 542Q298 536 292 526Q277 505 267 497Q232 464 184 445Z',C.cn.mid,ink,1.2);
    pol+=p('M478 411Q425 440 377 474Q347 494 327 519Q320 529 325 536Q329 541 338 539L337 549Q321 553 311 542Q303 534 312 520Q338 486 365 466Q412 432 451 413Z',C.us.mid,ink,1.2);
    pol+=p('M191 435Q239 455 274 490Q293 510 303 531M468 418Q418 444 371 475Q341 497 320 524','none','#b7c6ad',.7);
    pol+=p('M279 482Q293 498 300 511L291 523Q281 506 267 497Z',C.cn.face,ink,.7);
    pol+=p('M327 519Q320 529 325 536Q329 541 338 539L337 549Q321 553 311 542Q307 538 308 534Z',C.us.mid,ink,.8);
    pol+=p('M300 511L307 524Q313 539 302 548L290 542Q298 536 292 526Z',C.cn.low,ink,.8);
    pol+=p('M305 527Q310 540 301 543M315 533Q316 548 333 545','none',paper,.65);
    // A narrow paper lip occludes the returned ends to establish attachment.
    pol+=p('M286 540Q311 552 339 539v4Q311 557 286 544Z','#18292d','#6b847d',.7);
    const seal=(x,y,side)=>{const c=C[side];let s='';const pts=[];
      for(let q=0;q<24;q++){const t=q*Math.PI/12,r=q%2?23:26;pts.push(`${(x+Math.cos(t)*r).toFixed(2)},${(y+Math.sin(t)*r*.69).toFixed(2)}`)}
      s+=`<polygon points="${pts.join(' ')}" fill="${c.mid}" stroke="${ink}" stroke-width="1.4"/>`;
      s+=e(x,y,20,13,c.face,c.hi,.8)+e(x,y,15,9,'none',ink,.9);
      s+=p(`M${x-7} ${y-4}h14v8h-14Z`,'none',ink,1.2)+p(`M${x-3} ${y-2}h6v4h-6Z`,'none',ink,.75);
      return s;
    };
    pol+=seal(201,435,'cn')+seal(463,423,'us');
    // All foreground data is in front of ribbons. Physical page edges remain
    // visible beside the narrow seals and bindings.
    pol+=read(146,571,cn[2],'cn')+read(490,550,us[2],'us');
    pol+=p('M128 583l68 5M464 565l56-7','none','#8ea499',.9);
    pol+=label(380,622,'政治影响');
    out+=`<g id="${id}-politics" class="contest-politics" data-kind="politics">${pol}</g>`;
    return `<g class="contest-assembly">${out}</g>`;
  }
  function politics3(a=6,b=8){
    a=score(a);b=score(b);let out='';
    // A single folded dispatch: the central ridge belongs to the paper,
    // while its two counters occupy equal impressions in the same plane.
    out+=p('M106 30L296 11 325 24 504 14 519 151 330 177 300 163 118 178Z','#0d1e26','#47666a',1.1);
    out+=p('M108 24L296 7 325 20 502 10 512 143 330 168 299 155 120 169Z','#16363b','#8d9f8c',1.15);
    out+=p('M108 24L296 7 299 155 120 169Z','#071b20');
    out+=p('M296 7L307 20 315 154 299 155Z','#021419');
    out+=p('M307 20L325 20 330 168 315 154Z','#41766b');
    out+=p('M325 20L502 10 512 143 330 168Z','#071b20');
    out+=p('M110 26L294 10M326 23L499 13M120 175L299 162 330 176 518 151','none','#60968d',.65);
    out+=p('M302 20L308 150M322 27L327 161','none','#9eac98',.7);
    // Left pierced binding turns under the sheet; its stitches stop at the
    // paper edge. It is a narrow material detail, not another data scale.
    out+=p('M108 24L122 23 133 167 120 169Z','#3e514a','#647f74',.7);
    for(let k=0;k<7;k++){
      const yy=38+k*17,xx=114+k*.95;
      out+=e(xx,yy,1.5,2.2,ink)+p(`M${xx-4} ${yy-1}q7-6 10 0`,'none','#c4c9aa',.75);
    }
    // The quiet upper document field has only two short rules per plane.
    // The unequal endings follow actual writing runs rather than a grid.
    out+=p('M140 42L252 32M142 49L236 41M353 38L471 30M360 45L468 37','none','#597970',.8);
    out+=p('M143 52L187 48M437 44L470 42','none','#92a28b',.8);
    // Two lower page turns overlap the print field. Every impression is
    // drawn before those lips, so none can float beyond its supporting page.
    for(const side of ['cn','us']){
      const v=side==='cn'?a:b,c=C[side],dir=side==='cn'?1:-1;
      for(let n=1;n<=9;n++){
        const row=Math.floor((n-1)/3),col=(n-1)%3;
        const x=side==='cn'?145+row*24+col*37:476-row*24-col*37;
        const y=67+row*27+(side==='cn'?-col*1.3:col*1.3),lit=n<=v;
        // Small broken inner corners are impressed seal detail; the body
        // is a single opaque ink patch, never a transparent wireframe tile.
        let stamp=p(`M${x-13} ${y-10}l8-.6 5 .5 12-.5.4 7-.6 5 .4 9-9 .4-6-.6-10 .4.4-9-.5-6Z`,lit?c.face:'#0a1d22',lit?c.mid:'#293c3d',.8);
        stamp+=p(`M${x-9} ${y-7}h18v15h-18Z M${x} ${y-4}l5 4-5 4-5-4Z M${x-6} ${y+6}h12`,'none',lit?ink:'#293c3d',1.2);
        stamp+=p(`M${x-11} ${y-9}h8M${x+11} ${y+7}v3h-7`,'none',lit?c.hi:'#293c3d',.65);
        out+=level(side,n,v,`<g transform="translate(${x} ${y}) scale(1.12) translate(${-x} ${-y})">${stamp}</g>`);
      }
    }
    // A shallow folded corner has a lit rim and a darker underside. Its
    // silhouette breaks the sheet's outer rectangle without inventing a rail.
    out+=p('M485 11L502 10 504 34 490 31Z','#788d7b',ink,.8);
    out+=p('M490 31L485 11 480 32Z','#314d4d',ink,.7);
    out+=p('M132 142L293 129 300 155 136 169Z','#103139','#6f8b7e',.8);
    out+=p('M337 143L509 120 512 143 330 168Z','#082b34','#6f8b7e',.8);
    out+=p('M138 147L291 134M340 148L503 126','none','#a0b09a',.65);

    out+=p('M136 169L141 172 300 158 330 172 512 147 512 143 330 168 300 155Z','#0c232a','#65847b',.6);
    for(let k=0;k<7;k++)out+=p(`M${144+k*19} ${164-k*1.65}l9-.7M${349+k*22} ${163-k*3.3}l9-1.3`,'none','#547871',.55);
    // The single title sits on the raised crease; the two numerical readings
    // remain outside the paper and never cover any of the eighteen stamps.
    out+=`<text class="assembly-caption" x="312" y="48" text-anchor="middle" style="font-family:TNO,'Songti SC',serif;font-size:24px;fill:#c4ccb9;letter-spacing:2px;paint-order:stroke;stroke:${ink};stroke-width:5px">政治影响</text>`;
    out+=number(72,109,a,'cn').replace('font-size="12"','font-size="18"')+number(551,109,b,'us').replace('font-size="12"','font-size="18"');
    out+=p('M52 121h38l17-9M536 121h37l-14-9','none','#829a8b',.8);
    return `<g class="contest-politics" data-kind="politics" transform="translate(0 330)">${out}</g>`;
  }
  function assembly2(cn=[6,3,3],us=[8,9,8]){
    cn=cn.map(score);us=us.map(score);
    const read=(y,a,b)=>number(47,y,a,'cn').replace('font-size="12"','font-size="18"')+number(555,y,b,'us').replace('font-size="12"','font-size="18"')+p(`M29 ${y+12}h45l15-8M537 ${y+12}h45l15-8`,'none','#728b82',.85);
    const label=(y,t)=>`<text class="assembly-caption" x="310" y="${y}" text-anchor="middle" style="font-family:TNO,'Songti SC',serif;font-size:24px;fill:#c4ccb9;letter-spacing:2px">${t}</text>`;
    const f=v=>Number(v.toFixed(2));
    // A continuous rolled-metal rim: each coin is a complete, countable body.
    // The reflected arc and fine reeding describe curvature without black slots.
    const stack=(cx,base,rx,ry,side,v)=>{
      const c=C[side];let s='';
      const metal=side==='cn'?['#8f535e','#ce7b83','#5e3945']:['#266b72','#409c9c','#123e48'];
      for(let n=1;n<=9;n++){
        if(n>v){s+=level(side,n,v,'');continue;}
        const y=base-(n-1)*10.3,h=9.7;
        let b=p(`M${cx-rx} ${y}a${rx} ${ry} 0 0 0 ${2*rx} 0v${h}a${rx} ${ry} 0 0 1 ${-2*rx} 0Z`,metal[0],ink,1.25);
        b+=p(`M${cx-rx} ${y}a${rx} ${ry} 0 0 0 ${rx*1.12} ${ry*.994}v${h}a${rx} ${ry} 0 0 1 ${-rx*1.12} ${-ry*.994}Z`,metal[1]);
        b+=p(`M${cx+rx*.72} ${y+ry*.69}Q${cx+rx} ${y+ry*.35} ${cx+rx} ${y}v${h}Q${cx+rx} ${y+h+ry*.35} ${cx+rx*.72} ${y+h+ry*.69}Z`,metal[2]);
        for(let j=1;j<25;j++){
          const a=j*Math.PI/25,x=cx-rx*Math.cos(a),yy=y+ry*Math.sin(a);
          b+=p(`M${f(x)} ${f(yy+1.8)}v5.8`,'none',j<13?metal[0]:metal[2],.65);
        }
        b+=p(`M${cx-rx+2} ${y+3}Q${cx-rx+10} ${y+ry+5} ${cx+rx*.22} ${y+ry+2}`,'none',c.hi,.65);
        b+=e(cx,y,rx,ry,c.face,ink,1.25)+e(cx,y,rx-4,ry-1.8,'none',c.hi,.75)+e(cx,y,rx-10,ry-4,'none',metal[0],.8);
        b+=p(`M${cx-rx+3} ${y-2}Q${cx-rx+15} ${y-ry-2} ${cx+rx*.38} ${y-ry+2}`,'none',c.hi,1.15);
        s+=level(side,n,v,`<g class="metal-coin" data-coin="${n}">${b}</g>`);
      }
      const y=base-(v-1)*10.3;
      const mark=side==='cn'?'M-11-13L0 0 11-13M0 0V16M-11 2H11M-11 8H11':'M11-10C4-19-12-16-12-7C-11 2 12-1 12 10C12 20-5 21-12 12M0-23V25';
      s+=`<g class="coin-denomination" transform="translate(${cx} ${y}) scale(1.08 .58)">${p(mark,'none',ink,2.7)}</g>`;
      return s;
    };
    let eco='';
    // The recessed well, turned lip and shallow feet share one ellipse.
    eco+=p('M126 170Q133 207 310 207Q487 207 494 170v10Q487 221 310 221Q133 221 126 180Z','#172d33','#4c6b6c',1.1);
    eco+=e(310,169,184,39,'#20373b','#8c9e90',1.1)+e(310,168,174,33,'#0b2027','#405e62',.8)+e(310,170,163,27,'#0c252c','#2d4b50',.7);
    eco+=p('M133 178Q171 211 310 212Q449 211 487 178M159 201l-5 11 29 3M461 201l5 11-29 3','none','#9aa998',.9);
    for(let j=0;j<14;j++){
      const a=.23+j*.205,x=310-178*Math.cos(a),y=172+34*Math.sin(a);
      eco+=p(`M${f(x)} ${f(y)}v5`,'none','#52706e',.7);
    }
    eco+=stack(239,168,61,18,'cn',cn[0])+stack(372,178,64,19,'us',us[0]);
    eco+=label(36,'经济影响')+read(174,cn[0],us[0]);
    // Compact rear lugs disappear behind the blades, leaving the tray lip
    // embedded in the command carrier rather than suspended on long legs.
    let mil=p('M168 203L181 207 157 243 146 239Z','#223b3e',ink,1.25)+p('M452 203L439 207 463 243 474 239Z','#223b3e',ink,1.25);
    mil+=p('M169 207L151 237M451 207L469 237','none','#7d9385',.75);
    mil+=p('M96 274L244 305 251 312 101 283Z','#3b5452','#83998b',.85)+p('M524 274L376 305 369 312 519 283Z','#3b5452','#83998b',.85);
    mil+=p('M101 283L251 312 249 320 103 291Z','#142c32','#48696a',.85)+p('M519 283L369 312 371 320 517 291Z','#142c32','#48696a',.85);
    for(const side of ['cn','us']){
      const c=C[side],v=side==='cn'?cn[1]:us[1],d=side==='cn'?1:-1;
      for(let n=1;n<=9;n++){
        const x=side==='cn'?99+(n-1)*15.6:521-(n-1)*15.6,y=279+(n-1)*3.3,lit=n<=v;
        // Short shouldered commands lean inward. The pressed blade narrows
        // into a black socket, so its identity does not depend on a book spine.
        let b=p('M-2-2L14-2 17 2 0 2Z',ink,'#5a736c',.7);
        b+=p('M0-49L4-59 10-62 15-55 15-48 12-43 10-4 3-4 1-43Z',lit?c.mid:c.low,ink,1.3);
        b+=p('M10-62L15-55 15-48 12-43 10-4 7-5 8-46Z',lit?c.face:(side==='cn'?'#302932':'#153139'));
        b+=p('M15-55L18-52 18-46 15-41 13-1 10-4 12-43 15-48Z',lit?c.edge:'#0c242b',ink,.75);
        b+=`<g class="command-head">${p('M0-49L4-59 10-62 15-55 13-51 7-55 4-47Z',lit?c.hi:'#3c5152',ink,.7)}</g>`;
        b+=p('M3-44L6-48 5-11 3-10Z',lit?(side==='cn'?'#70434f':'#194e58'):'#10232a');
        b+=p('M8-46L7-5','none',lit?c.hi:'#3a4e51',.65);
        b+=p('M3-7L10-7 10-4 3-4Z',lit?c.edge:'#172b32');
        mil+=level(side,n,v,`<g class="command-plaque" transform="translate(${f(x)} ${f(y)}) scale(${d} 1) skewX(-10)">${b}</g>`);
      }
    }
    mil+=p('M103 286L245 315M517 286L375 315','none','#9aa995',.7);
    mil+=label(264,'军事影响')+read(309,cn[1],us[1]);
    // The dossier's rear corners cover only the foot of the two sockets.
    // Its central valley leaves a quiet opening for the political caption.
    let pol=p('M112 309L285 329 313 347 495 301 512 498 323 524 299 511 126 524Z','#081b23','#597477',1.3);
    pol+=p('M126 511L299 500 323 514 510 488 512 498 323 524 299 511 126 524Z','#374d4b','#91a28d',.8);
    pol+=p('M128 516L299 505 323 519 510 494M131 520L299 509 323 522 506 498','none','#172c31',.85);
    // The folded page pair is asymmetric but shares a narrow valley.
    const planes={cn:[[128,315],[293,344],[299,500],[143,510]],us:[[318,344],[490,309],[505,488],[323,513]]};
    const pt=(side,u,v)=>{
      const q=planes[side];return [f((1-v)*((1-u)*q[0][0]+u*q[1][0])+v*((1-u)*q[3][0]+u*q[2][0])),f((1-v)*((1-u)*q[0][1]+u*q[1][1])+v*((1-u)*q[3][1]+u*q[2][1]))];
    };
    const flat=(side,points,fill,stroke=null,w=.7,close=true)=>p(points.map(([u,v],i)=>`${i?'L':'M'}${pt(side,u,v).join(' ')}`).join('')+(close?'Z':''),fill,stroke,w);
    pol+=flat('cn',[[0,0],[1,0],[1,1],[0,1]],'#193034','#86998a',.9)+flat('us',[[0,0],[1,0],[1,1],[0,1]],'#152d32','#789487',.9);
    pol+=p('M293 344L303 350 307 501 299 500Z','#0a1e25')+p('M303 350L318 344 323 513 307 501Z','#34564f');
    pol+=p('M309 353L316 505','none','#809582',.7);
    // Binding and interrupted writing rules stay away from the impressions.
    pol+=flat('cn',[[0,0],[.068,0],[.068,1],[0,1]],'#415750','#8c9d88',.7);
    for(let j=0;j<7;j++){
      const [x,y]=pt('cn',.032,.075+j*.135);
      pol+=e(x,y,1.55,2,ink)+p(`M${x-3.5} ${y-1}q5-4 8 0`,'none','#a6b29a',.75);
    }
    for(const side of ['cn','us']){
      for(const [a,b,v] of [[.14,.76,.10],[.14,.57,.145],[.15,.86,.89],[.15,.68,.93]])pol+=flat(side,[[a,v],[b,v]],'none','#71897b',.6,false);
      const c=C[side],value=side==='cn'?cn[2]:us[2];
      for(let n=1;n<=9;n++){
        const row=Math.floor((n-1)/3),col=(n-1)%3,lit=n<=value;
        const u=side==='cn'?.17+col*.25:.70-col*.25,v=.225+row*.205,w=.18,h=.155;
        const s=pts=>pts.map(([x,y])=>[u+x*w,v+y*h]);
        // Both silhouette and inner insignia are projected onto the page.
        // Tiny discontinuities belong to ink wear, not raised tile highlights.
        let stamp=flat(side,s([[0,.02],[.34,0],[.37,.025],[.70,.01],[1,0],[.98,.46],[1,.51],[.99,1],[.62,.98],[.59,1],[0,.98],[.018,.55]]),lit?(side==='cn'?'#bf777d':'#2caaaa'):'#1b3438',lit?null:'#395257',.55);
        stamp+=flat(side,s([[.13,.35],[.13,.13],[.64,.13]]),'none',lit?'#112b30':'#304a4d',.9,false)+flat(side,s([[.87,.13],[.87,.83],[.13,.83],[.13,.60]]),'none',lit?'#112b30':'#304a4d',.9,false);
        stamp+=flat(side,s([[.5,.26],[.73,.48],[.5,.67],[.27,.48]]),'none',lit?'#112b30':'#304a4d',1.05);
        stamp+=flat(side,s([[.3,.76],[.7,.76]]),'none',lit?'#112b30':'#304a4d',.7,false);
        if(lit){stamp+=flat(side,s([[.09,0],[.24,0],[.24,.10],[.09,.10]]),'#193034');stamp+=flat(side,s([[.89,.70],[1,.70],[1,.84],[.89,.84]]),'#193034');}
        pol+=level(side,n,value,`<g class="paper-impression">${stamp}</g>`);
      }
    }
    pol+=p('M475 312L490 309 493 330 482 327Z','#859783',ink,.8)+p('M475 312L482 327 471 332Z','#314a46','#5c786c',.6);
    pol+=p('M145 502L291 493M329 505L499 482','none','#a0ad94',.7);
    pol+=label(332,'政治影响')+read(478,cn[2],us[2]);
    return `<g class="contest-assembly2"><g class="contest-economy" data-kind="economy">${eco}</g><g class="contest-military" data-kind="military">${mil}</g><g class="contest-politics" data-kind="politics">${pol}</g></g>`;
  }
  function standalone(kind,a=6,b=8){return `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="200" viewBox="0 0 560 200"><rect width="560" height="200" fill="${ink}"/>${{economy,military,politics}[kind](a,b)}</svg>`}
  function scene(cn=[6,3,3],us=[8,9,8]){
    cn=cn.map(score);us=us.map(score);
    const stripReadings=s=>s.replace(/<g class="contest-reading"[\s\S]*?<\/g>/g,'');
    let m=stripReadings(military(cn[1],us[1]));
    m=m.replace(p('M6 64h41l12 31-12 30H6Z',ink,C.cn.face,1.1),'').replace(p('M553 76h-41l-12 26 12 30h41Z',ink,C.us.face,1.1),'');
    const ec=stripReadings(economy(cn[0],us[0]));
    const pg=stripReadings(politics3(cn[2],us[2]).replace('transform="translate(0 330)"','transform="translate(0 0)"')).replace(p('M52 121h38l17-9M536 121h37l-14-9','none','#829a8b',.8),'').replace(/<text class="assembly-caption"[\s\S]*?<\/text>/,'');
    return `<g class="contest-scene">
      <g transform="translate(490 776) scale(1.14)">${m}</g>
      <g transform="translate(128 807) scale(.93)">${ec}</g>
      <g transform="translate(940 800) scale(.97)">${pg}</g>
      <g data-kind="economy" class="reading-rail">
        <path d="M212 962v19h62M508 962v19h62" fill="none" stroke="#627b73"/>
        ${number(230,977,cn[0],'cn')}${number(525,977,us[0],'us')}
      </g>
      <g data-kind="military" class="reading-rail">
        <path d="M573 831V775h69l15 13H800M582 831v-47h54l14 13H800" fill="none" stroke="#c86f7a"/><path d="M800 788H976l15-13h71v68M800 797H983l14-13h56v57" fill="none" stroke="#27a8a9"/>
        <path d="M583 776h59v37h-59ZM994 776h68v37h-68Z" fill="#08191f"/>
        ${number(594,806,cn[1],'cn')}${number(1005,806,us[1],'us')}
      </g>
      <g data-kind="politics" class="reading-rail">
        ${number(1133,952,cn[2],'cn',.73)}${number(1340,952,us[2],'us',.73)}
      </g>
      <text x="388" y="1016" class="contest-title" text-anchor="middle">经济影响</text>
      <text x="815" y="1016" class="contest-title" text-anchor="middle">军事影响</text>
      <text x="1241" y="1016" class="contest-title" text-anchor="middle">政治影响</text>
    </g>`;
  }

  global.ContestArt={scene,economy,military,politics,politics3,assembly,assembly2,standalone,size:{economy:[560,200],military:[560,200],politics:[560,200],assembly:[620,640],assembly2:[620,590]}};
})(typeof window==='undefined'?globalThis:window);
