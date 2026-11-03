(function(global){
  'use strict';
  const ink='#05181e',steel='#263e43',edge='#78988e',light='#b8c7b5',orange='#db955b',red='#b86b73';
  const names=['温和','平衡','中等','大幅','严重'];let serial=0;
  const p=(d,fill='none',stroke=null,w=1)=>`<path d="${d}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"`:''}/>`;
  const e=(x,y,rx,ry,fill,stroke=null,w=1)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${w}"`:''}/>`;
  const text=(x,y,t,size=21,color=light)=>`<text x="${x}" y="${y}" text-anchor="middle" style="fill:${color};font-size:${size}px;letter-spacing:1.4px">${t}</text>`;
  const tier=v=>Math.max(1,Math.min(5,Math.round(Number(v)||1)));
  function link(x,y,angle=0){
    return `<g transform="translate(${x} ${y}) rotate(${angle})">${p('M-7-6Q-7-11 0-11Q7-11 7-6V6Q7 11 0 11Q-7 11-7 6Z','#6b6251',ink,1.5)}${p('M-3-6Q0-10 3-6V6Q0 10-3 6Z',ink,'#ae9d7a',.65)}${p('M-5-7Q-2-11 3-8','none','#c8b798',1)}</g>`;
  }
  function chain(points){return points.map(([x,y,a])=>link(x,y,a)).join('');}
  function lock(x,y,closed){return `<g transform="translate(${x} ${y})">${p(closed?'M-9-5V-13Q-9-24 0-24Q9-24 9-13V-5':'M-9-5V-21Q-9-34 7-34Q23-34 23-20','none','#aa9b77',4)}${p('M-14-8L10-11 15-6V15L-10 19-15 13Z','#92724f',ink,1.5)}${p('M-14-8L10-11 11 12-10 16Z','#c18b57','#dfb17a',.8)}${p('M11-10L15-6V15L11 12Z','#614832')}${e(0,1,2.1,2.7,ink)}${p('M-1 3L-2 8H2L1 3Z',ink)}${p('M-11-5L7-7M-9 12L6 10','none','#f0c593',.6)}</g>`;}
  function conflict(v){
    let out=p('M20 27L75 8 133 25 128 91Q122 127 77 157Q31 133 24 97Z','#152a31',ink,1.8);
    out+=p('M17 20L74 2 132 20 126 87Q122 121 76 151Q32 125 24 91Z','#4c6562','#9cae98',1.1);
    out+=p('M26 28L74 12 121 27 116 87Q112 111 76 138Q40 116 34 88Z',steel,ink,1.4);
    out+=p('M26 28L74 12 76 138Q40 116 34 88Z','#40595a');
    out+=p('M74 13L76 137','none','#92a899',1.2)+p('M34 34L68 23M36 41L61 32M110 36L117 31','none','#b3bca5',.65);
    for(const [x,y] of [[24,26],[74,8],[125,25],[31,86],[118,85],[76,144]])out+=e(x,y,2.1,2,ink,'#c0c4ab',.65);
    if(v===2){out+=p('M90 51L109 65 110 83 99 98 85 95 78 79 82 63Z','#304b50','#687f73',.8);out+=p('M90 51L87 66 91 85 99 98 85 95 78 79 82 63Z','#748b7c');out+=p('M87 66L102 69 104 83 91 85Z','#405a59');out+=p('M91 85L104 83 99 98','none','#9cab93',.9);}
    if(v>=3){out+=p('M90 18L79 49 88 66 67 82 78 96 62 126 74 118 87 93 79 83 99 67 89 49 102 22Z',ink);out+=p('M90 19L79 49 88 66 67 82 78 96 62 126','none','#b4bca6',1.1);out+=p('M88 66L111 72 116 83M77 96L48 92 42 82','none','#183239',1.7);}
    if(v>=4){out+=p('M83 63L105 55 116 76 103 96 87 100 74 85Z',ink);out+=p('M104 55L118 55 131 73 116 76Z','#759184',ink,1.2)+p('M116 76L131 73 120 100 103 96Z','#324e4d',ink,1.2);out+=p('M74 85L87 100 79 110 67 94Z','#8da08c',ink,1.1);out+=p('M110 57L124 72M117 82L112 92','none','#c2c9ad',.6);}
    if(v===5){out+=p('M49 68L63 56 80 61 93 50 114 62 119 85 100 106 84 114 66 104 47 91Z',ink)+p('M119 85L100 106 84 114 66 104 47 91 52 91 68 100 85 109 99 101 116 82Z','#1c383f');out+=p('M49 68L33 68 37 82 47 91 58 89Z','#6a8277',ink,1.1);out+=p('M63 56L58 43 77 48 80 61Z','#a6b59b',ink,1);out+=p('M66 104L59 118 75 124 84 114Z','#637f72',ink,1.1);out+=p('M114 62L127 63 121 80 119 85Z','#b2bea4',ink,1);out+=p('M39 73L48 83M64 111L75 118M64 51L75 54','none','#d1d4b7',.8);}
    return out;
  }
  function seal(x,y,scale=1){return `<g transform="translate(${x} ${y}) scale(${scale})">${p('M-19-16L-7-18 17-15 19 1 17 17-2 18-19 15-18 0Z','#bd795f',ink,.8)}${p('M-14-10V-13H12V11M13 14H-13V-6M-9-6L0-11 9-5 0 0Z M-9 3H9M-7 7H7','none','#34262a',1.5)}${p('M-8-18h6v3h-6M15 4h5v5h-5',steel)}</g>`;}
  function readiness(v,side,id,prefix){
    const c=side==='china'?{face:'#ba737b',mid:'#794854',dark:'#3b2834',line:'#e2aaa0'}:(id==='TWN'?{face:'#547ba7',mid:'#314c71',dark:'#1c304b',line:'#a4bfd0'}:id==='JPN'?{face:'#aa9d4e',mid:'#716a3c',dark:'#343a2b',line:'#d0c68c'}:{face:'#749ca4',mid:'#426570',dark:'#213f4a',line:'#afc5c0'});
    let out=p('M25 79L23 5 26 0 30 5 31 79Z','#6e7d71',ink,1.15)+p('M25 8L26 76','none','#c3c9aa',.8);
    out+=p('M20 4L26-8 32 4 26 10Z','#899b83',ink,1)+p('M26-7L26 7 31 4Z','#4c655d');
    const shapes=[null,'M31 20Q47 16 54 22L61 121Q48 131 36 121Z','M31 20Q56 14 67 29L77 61 64 79 70 123Q49 131 36 121Z','M31 20Q61 8 94 29L105 64 126 82 113 128Q71 117 36 124Z','M31 20Q73 2 113 21L161 45 145 82 159 114Q103 134 35 123Z','M31 20Q72 2 114 16L183 28 165 62 190 97Q131 110 95 126L35 123Z'];
    const shape=shapes[v],clip=prefix+'-'+side+'-'+v;
    out+=`<defs><clipPath id="${clip}">${p(shape,'white')}</clipPath></defs>`;
    out+=p(shape,c.face,ink,1.6);
    const folds=[null,'M42 19Q50 42 49 67Q47 97 56 123L61 121 54 22Z','M48 18L61 44 58 69 65 95 70 123 58 128Q47 91 49 63Z','M52 16Q66 43 61 64L84 94 84 123 108 128 91 89 95 55 88 26Z','M61 13L82 41 80 71 111 96 113 128 140 121 129 85 134 47 113 21Z','M67 10L90 44 87 73 113 91 109 121 139 110 130 80 141 42 125 18Z'];
    out+=p(folds[v],c.mid);
    out+=p(v===1?'M32 26Q45 20 49 28L54 116 40 122Z':v===2?'M33 25L41 21 52 121 39 124Z':v===3?'M33 26Q46 19 54 23L77 122 38 120Z':v===4?'M34 26L53 20 74 70 97 94 97 128 39 119Z':'M34 26L57 19 82 62 79 85 101 111 93 125 38 118Z',c.dark);
    out+=`<g clip-path="url(#${clip})"><image class="readiness-symbol" href="assets/symbols/${side==='china'?'CHN-input':id}.svg?v=allies-20261016-1" x="${v<3?34:55}" y="${v<3?48:35}" width="${v<3?37:66}" height="${v<3?44:77}" opacity=".86"/></g>`;
    out+=p(v===1?'M35 22Q43 18 48 24M40 119Q49 125 57 119':v===2?'M34 25Q50 17 62 28M38 118Q53 127 66 120M65 42L74 61 62 77':v===3?'M35 25Q63 13 88 31M41 119Q77 113 108 125M94 44L101 65 121 83':v===4?'M36 25Q73 8 110 25L154 47M41 119Q100 128 152 111M143 53L138 81 151 109':'M36 25Q72 8 111 21L177 31M41 119L94 121Q132 103 181 95M159 63L179 93','none',c.line,1.2);
    for(let j=0;j<(v<3?4:7);j++){
      const x=40+j*(v<3?4:15),y=v<3?123:122-(v===5?Math.max(0,j-3)*6:0);
      out+=p(`M${x} ${y}v6l2 2 2-2v-6`,'none',c.mid,.7);
    }
    out+=p('M22 26Q13 14 16 9Q23 8 27 20Q36 9 40 14Q40 20 29 25M24 25L17 45 25 40 29 47 31 26','none',c.line,1.1);
    out+=p('M22 73L32 73 35 79 21 81Z','#3b5953',ink,.8)+p('M23 75L31 75','none','#99ad92',.7);
    return out;
  }
  function restraint(v){
    const rings=[[221,145,0],[410,145,0]];
    let s=rings.map(([x,y])=>e(x,y,8,6,'#45615c',ink,1.2)+e(x,y,4,3,ink,'#a3ad8d',.7)).join('');
    const route={
      1:[[411,151,18],[424,169,-32],[437,187,-35],[448,206,-28],[453,227,-9],[449,247,19],[437,262,45]],
      2:[[411,151,18],[422,171,-25],[434,191,-25],[442,213,-12],[444,236,0],[437,259,20],[427,279,30],[414,296,41],[396,310,52],[376,321,62],[354,327,75],[332,328,92]],
      3:[[411,151,18],[421,172,-18],[425,194,-7],[424,216,5],[420,238,12],[412,260,23],[402,281,30],[390,300,38],[374,318,43],[358,336,46],[341,351,49],[324,367,47],[308,380,55],[289,365,126],[271,349,131],[255,332,137],[239,313,145],[225,294,150],[214,273,159],[205,251,167],[202,231,175]],
      4:[[411,151,18],[421,172,-18],[425,194,-7],[424,216,5],[420,238,12],[412,260,23],[402,281,30],[390,300,38],[374,318,43],[358,336,46],[341,351,49],[324,367,47],[308,380,55],[289,365,126],[271,349,131],[255,332,137],[239,313,145],[225,294,150],[214,273,159],[205,251,167],[202,231,175],[201,210,178],[203,190,5],[210,170,15],[219,152,25]],
      5:[[411,151,18],[419,172,-18],[422,194,-7],[421,216,5],[417,238,12],[409,260,23],[399,281,30],[387,300,38],[371,318,43],[355,336,46],[338,351,49],[321,367,47],[307,377,55],[291,364,126],[273,348,131],[258,331,137],[242,312,145],[228,293,150],[217,272,159],[209,250,167],[206,230,175],[205,210,178],[207,190,5],[213,171,15],[221,152,25]]
    };
    s+=chain(route[v]);
    if(v===5)s+=chain([[233,140,66],[253,131,69],[274,123,76],[296,118,84],[318,117,96],[340,122,108],[361,129,109],[382,139,118],[400,148,119]]);
    s+=p('M192 159L207 150 218 160 211 180 193 186Z','#304c4c',ink,1.2)+p('M195 158L209 154 211 160 196 164Z','#91a18b');
    s+=lock(197,185,v>=4);
    return s;
  }
  function notice(v){
    // One thin diplomatic sheet turns over the same lower rim in all states.
    // Its clipped seal follows the inclined paper; it never becomes a button.
    let s=p('M221 351L229 340 243 346 240 365Z','#72897b',ink,1.2);
    const shapes=[null,'M229 347L281 363 278 402 228 387 218 366Z','M229 347L287 362 309 385 283 411 227 388 218 367Z','M229 347L296 365 351 382 337 427 279 414 225 390 218 368Z','M229 347L291 364 351 381 410 392 423 428 372 449 304 432 225 390 218 368Z','M229 347L291 364 356 379 423 391 451 418 414 455 354 449 291 427 224 390 218 368Z'];
    s+=p(shapes[v],'#a5af95','#d0d1b0',.9);
    s+=p(v<3?'M229 347L245 351 241 392 228 387 218 366Z':'M229 347L251 354 240 399 225 390 218 368Z','#4a665e',ink,.8);
    if(v>=3){s+=p('M291 364L303 369 292 424 279 414Z','#758d7a');s+=p('M291 367L281 412','none','#d4d5b6',.9);}
    if(v>=4){s+=p('M351 381L356 381 365 447 355 444Z','#69816e');s+=p('M355 384L361 441','none','#d5d7b6',.75);}
    const end=v===1?272:v===2?281:v===3?331:v===4?397:427;
    for(let n=0;n<3;n++)s+=p(`M${247-n*1.5} ${365+n*9}L${end-n*2} ${365+n*9+(end-247)*.31}`,'none','#4c675b',.8);
    const sx=v<3?257:v===3?300:v===4?341:360,sy=v<3?378:v===3?395:v===4?408:415;
    s+=`<g transform="translate(${sx} ${sy}) matrix(.94 .28 -.15 .74 0 0)">${seal(0,0,v===5?1.13:.8)}</g>`;
    if(v>=4)s+=p(v===4?'M410 392L423 428 402 423Z':'M423 391L451 418 429 419Z','#ccd0ac',ink,.8);
    s+=p('M219 367Q211 361 215 352Q219 346 230 348','none','#c1c7a6',1);
    return s;
  }
  function scene(values,regionName,regionId='JPN'){
    const v=values.map(tier),id='tension-'+(++serial);
    const state=(kind,value,draw)=>`<g class="tension-metric" data-kind="${kind}" data-value="${value}">${[1,2,3,4,5].map(n=>`<g class="tension-state${n===value?' active':''}" data-level="${n}" data-active="${n===value}"${n!==value?' style="display:none" aria-hidden="true"':''}>${draw(n)}</g>`).join('')}</g>`;
    let out=p('M146 429L449 91 455 97 155 436Z','#213a41',ink,2)+p('M150 430L452 95','none','#9cac94',1.2);
    out+=p('M156 120L452 435 446 441 149 128Z','#263f43',ink,1.6)+p('M155 127L448 436','none','#839c8a',.8);
    // Two standards share the rear cross-brace. Their silhouettes change
    // behind the shield, while the same knots stay visible in every state.
    out+=state('chinaReadiness',v[3],n=>`<g transform="translate(141 107) rotate(13 26 140) scale(-.84 1.46) translate(-58 0)">${readiness(n,'china',regionId,id)}</g>`);
    out+=state('regionReadiness',v[4],n=>`<g transform="translate(383 112) rotate(-13 26 100) scale(.84 1.46)">${readiness(n,'region',regionId,id)}</g>`);
    out+=p('M189 136L223 139 226 153 189 150Z','#3a5550',ink,1.2)+p('M392 132L420 137 418 150 391 146Z','#3a5550',ink,1.2)+p('M191 138L219 142M393 135L417 140','none','#a6b398',.8);
    out+=state('militaryConflict',v[1],n=>`<g transform="translate(149 98) scale(2.12)">${conflict(n)}</g>`);
    out+=state('economicBlockade',v[0],restraint);
    out+=state('politicalCondemnation',v[2],notice);
    // Read positions surround the unified object; leaders end at physical
    // joins rather than connecting separate panels or inventing a total.
    out+=text(310,28,'紧张度',28,'#c6bca1');
    const read=(x,y,label,value)=>text(x,y,label,19)+text(x,y+27,names[value-1],22,value>=4?'#c4767d':'#c4aa81');
    out+=read(112,69,'中国备战度',v[3])+read(310,69,'军事冲突',v[1])+read(511,69,regionName+'备战度',v[4]);
    out+=read(83,346,'经济封锁',v[0])+read(526,415,'政治谴责',v[2]);
    const noticeEdge=['278 398','300 394','342 414','419 420','443 416'][v[2]-1];
    out+=p('M112 107v15l14 13M310 107v12M510 107v16l-19 13M112 359h30l39-157M493 425h-29L'+noticeEdge,'none','#617e75',.8);
    return `<g class="tension-assembly" data-region="${regionId}" role="img" aria-label="中国与${regionName}的紧张度">${out}</g>`;
  }
  global.TensionArt={scene,levels:names,size:[620,530]};
})(typeof window==='undefined'?globalThis:window);
