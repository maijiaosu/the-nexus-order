'use strict';
// Authored paths registered to the approved 1400 × 466.667 frontal facade.
// Hand-authored material planes and relief. Existing portrait and slogan paths are preserved.
window.mountChinaShell=function(){
const out=[],gold='#baaa76',stone='#b2c5bf',red='#c06a68',mint='#6ca6a3',f=n=>Number(n.toFixed(2));
const path=(d,c=stone,w=.7,o=1)=>out.push(`<path d="${d}" stroke="${c}" stroke-width="${w*1.2}" opacity="${o}"/>`);
const line=(x,y,X,Y,c=stone,w=.65,o=1)=>path(`M${f(x)} ${f(y)}L${f(X)} ${f(Y)}`,c,w,o);
const rect=(x,y,w,h,c=stone,sw=.7)=>out.push(`<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" stroke="${c}" stroke-width="${sw*1.2}"/>`);
const ellipse=(x,y,rx,ry,c=stone,w=.7)=>out.push(`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" stroke="${c}" stroke-width="${w*1.2}"/>`);
const star=(x,y,r,c=gold,rot=-Math.PI/2)=>path(Array.from({length:10},(_,i)=>{const a=rot+i*Math.PI/5,R=i%2?r*.382:r;return `${i?'L':'M'}${f(x+Math.cos(a)*R)} ${f(y+Math.sin(a)*R)}`}).join('')+'Z',c,.65);
// Masonry, timber and recess planes precede the fine architectural strokes.
const face=(d,fill,edge='none',width=.5)=>out.push(`<path d="${d}" fill="${fill}" stroke="${edge}" stroke-width="${width}"/>`);
face('M5 278H1395V459H5Z','#342328');
face('M5 290H1395V458H5Z','url(#gate-plaster)');
face('M5 278H1395V291H5Z','#455450');
face('M5 278H1395V283H5Z','#84908a');
face('M5 291H1395V298H5Z','#13191a');
face('M5 446H1395V459H5Z','#4d5c56');
face('M5 454H1395V459H5Z','#718277');
for(let x=12;x<1390;x+=41){line(x,447,x,454,'#252e2c',.55,.8);line(x+1,448,x+1,453,'#9aaba1',.3,.5);}
// Sparse plaster joints and fine broken strokes, not a conspicuous grid over the wall.
for(let y=356;y<440;y+=14){for(let x=14+((y-356)%28?19:0);x<1380;x+=47){line(x,y,x+35,y,'#82625c',.28,.27);line(x+35,y,x+35,y+10,'#a37870',.25,.16);}}
face('M345 114H1055V162H345Z','#152b2a');
face('M348 117H1052V139H348Z','#091b1e');
face('M318 190H1087V214H318Z','#18312e');
face('M327 216H1073V267H327Z','#0b1518');
for(const x of [333,410,487,564,641,758,835,912,989,1066]){
 face(`M${x-3} 211h6v55h-6Z`,'#703d3e');
 face(`M${x+1} 212h2v54h-2Z`,'#2c2227');
 line(x-2,215,x-2,262,'#ba7c70',.5,.85);
}
for(const[a,b]of[[61,255],[1151,1342]])face(`M${a} 251H${b}V272H${a}Z`,'#2c2225');
for(const x of [326,500,700,899,1080]){
 face(`M${x-33} 454V405a33 39 0 0 1 66 0V454Z`,'#78504a');
 face(`M${x-28} 454V405a28 34 0 0 1 56 0V454Z`,'#0a1115');
 face(`M${x-22} 451V409a22 27 0 0 1 44 0V451Z`,'#352226');
 face(`M${x+13} 387q13 6 14 22v43h-14Z`,'#19171c');
 for(let y=407;y<445;y+=7)line(x-21,y,x+20,y,'#8b5950',.35,.35);
}
// Flag outlines and tension folds; each star is an unfilled path.
for(const[x,y,w,h]of[[48,34,101,131],[149,36,101,135],[254,30,111,132],[1154,27,108,137],[1262,30,125,146]]){
line(x-1,y-2,x-1,268,stone,.9);line(x+2,y-2,x+2,268,stone,.65);ellipse(x+.5,y-4,5.5,6,gold,.8);
path(`M${x+3} ${y+5}C${x+w*.3} ${y+19} ${x+w*.8} ${y+53} ${x+w} ${y+67}L${x+w-1} ${y+h}C${x+w*.6} ${y+h-14} ${x+w*.36} ${y+h-46} ${x+3} ${y+h-34}Z`,red,.95);out[out.length-1]=out.at(-1).replace('/>',' fill="#54252e" fill-opacity=".75"/>');
// Fine sewn hoist and a few cloth folds retain a flag silhouette at small sizes.
path(`M${x+6} ${y+11}L${x+6} ${y+h-35}`,red,.45,.7);
path(`M${x+8} ${y+14}Q${x+w*.34} ${y+h*.68} ${x+w-3} ${y+h-8}Q${x+w*.37} ${y+h*.52} ${x+8} ${y+14}Z`,red,.4,.6);out[out.length-1]=out.at(-1).replace('/>',' fill="#b66165" fill-opacity=".12"/>');
for(const t of [.12,.38,.7])path(`M${x+5} ${y+8+t*23}Q${x+w*.45} ${y+h*.64+t*16} ${x+w-3} ${y+h-4-t*15}`,red,.5,.64);
star(x+23,y+36,11);out[out.length-1]=out.at(-1).replace('/>',' fill="#cbb479"/>');for(const[dx,dy]of[[44,28],[52,39],[53,52],[43,60]]){star(x+dx,y+dy,3.8,gold,Math.atan2(36-dy,23-dx));out[out.length-1]=out.at(-1).replace('/>',' fill="#cbb479"/>');}
}
function roof(left,right,top,bottom,inset){
const L=left+inset,R=right-inset;
const outline=`M${left} ${bottom-9}Q${L-8} ${bottom-6} ${L} ${top}H${R}Q${R+8} ${bottom-6} ${right} ${bottom-9}L${right-2} ${bottom-1}Q${right-12} ${bottom+6} ${right-31} ${bottom+7}H${left+31}Q${left+12} ${bottom+6} ${left+2} ${bottom-1}Z`;
face(outline,'#3d4130');face(outline,'url(#gate-tile-grain)');
face(`M${left+3} ${bottom}Q${left+22} ${bottom+7} ${left+38} ${bottom+7}H${right-38}Q${right-22} ${bottom+7} ${right-3} ${bottom}v5q-15 9-35 9H${left+38}q-20 0-35-9Z`,'#102522');
face(`M${L} ${top}H${R}v5H${L}Z`,'#8c8359');
// Curved tile barrels have a lit shoulder and a narrow shaded trough.
const tileCount=Math.floor((right-left)/8.4);
for(let k=0;k<tileCount;k++){
 const a=k/tileCount,b=(k+.48)/tileCount;
 const x=L+(R-L)*a,X=left+7+(right-left-14)*a,xx=L+(R-L)*b,XX=left+7+(right-left-14)*b;
 face(`M${f(x)} ${top+8}Q${f(x+(X-x)*.24)} ${bottom-5} ${f(X)} ${bottom+1}H${f(XX)}Q${f(xx+(XX-xx)*.24)} ${bottom-5} ${f(xx)} ${top+8}Z`,k%3===0?'#655f40':'#50543a');
 path(`M${f(x+.7)} ${top+9}Q${f(x+(X-x)*.24+.7)} ${bottom-5} ${f(X+.7)} ${bottom}`, '#c0ad75',.3,.7);
}
// Segmented horizontal glazing seams bend with the roof rather than cutting across it.
for(let j=1;j<=3;j++){const t=j/4;const yy=top+8+(bottom-top-8)*t;const spread=inset*t*t;line(L-spread+4,yy,R+spread-4,yy,'#b2a06c',.28,.32);}

path(`M${left} ${bottom-9}Q${L-8} ${bottom-6} ${L} ${top}H${R}Q${R+8} ${bottom-6} ${right} ${bottom-9}L${right-2} ${bottom-1}Q${right-12} ${bottom+6} ${right-31} ${bottom+7}H${left+31}Q${left+12} ${bottom+6} ${left+2} ${bottom-1}Z`,gold,.85);
line(L,top+3,R,top+3,gold,.55);line(L+1,top+6,R-1,top+6,gold,.6);
const count=Math.floor((right-left)/4.2);
for(let i=0;i<=count;i++){const t=i/count,x=L+(R-L)*t,X=left+7+(right-left-14)*t;
path(`M${f(x)} ${top+8}Q${f(x+(X-x)*.24)} ${f(bottom-5)} ${f(X)} ${bottom+1}`,gold,.42,.9);path(`M${f(X-1)} ${bottom+1}q1 2 2 0`,gold,.47);}
for(const dy of[3,6,9])path(`M${left+6} ${bottom+dy-3}Q${left+22} ${bottom+dy+3} ${left+38} ${bottom+dy+3}H${right-38}Q${right-22} ${bottom+dy+3} ${right-6} ${bottom+dy-3}`,gold,.5,.8);
}
roof(44,268,219,247,28);roof(1136,1360,219,247,28);
for(const[a,b]of[[61,255],[1151,1342]]){for(let x=a;x<b;x+=19){rect(x,254,13,17,red,.55);line(x+3,255,x+3,270,red,.45);line(x+9,255,x+9,270,red,.45);}line(a-8,251,b+9,251,mint,.7);}
roof(336,1066,45,109,86);for(const y of[36,39,42])line(427,y,976,y,gold,.62);for(let x=432;x<972;x+=8)rect(x,37,5,6,gold,.4);
// Paired ridge chiwen, drawn as nested scrolls.
for(const[x,flip]of[[422,1],[977,-1]]){out.push(`<g transform="translate(${x} 0) scale(${flip} 1)">`);face('M0 46Q-8 38 -10 24Q-11 11 -1 12Q9 12 8 24Q8 32 0 29L4 44Z','#666042');path('M0 46Q-8 38 -10 24Q-11 11 -1 12Q9 12 8 24Q8 32 0 29Q-5 25 -1 21Q3 19 3 25M-8 18Q-18 11 -13 8L-4 10Q8 6 12 15Q14 23 8 32L10 42M-7 28L-15 37L-13 48M-5 33L-10 46M0 33L4 44',gold,.85);path('M-12 12l-4 5 7 2M9 14l6 4-4 3M-10 40l10 6 9-2',gold,.55);out.push('</g>');}
function brackets(x,y,scale=1){out.push(`<g transform="translate(${f(x)} ${y}) scale(${scale})">`);face('M-11 5h7l2 3h4l2-3h7l-5 7H-6Z','#325448');face('M-4 12h8v7h-8Z','#685e43');line(-8,6,8,6,'#a7ad83',.5,.85);path('M-8 0H8M-6 2H6M-2 2V8H2V2M-11 5h7l2 3h4l2-3h7M-9 7l3 5h12l3-5M-4 12v5h8v-5M-8 15h16M-5 18h10',mint,.55);path('M-2 4h4M-5 10h10M-2 14h4',gold,.45);out.push('</g>');}
for(let x=365;x<=1036;x+=17)brackets(x,121,.78);
for(let x=374;x<1030;x+=66){face(`M${x} 140h59v16h-59Z`,'#223c38');face(`M${x+3} 143h53v10h-53Z`,'#2c493e');rect(x,140,59,16,mint,.65);rect(x+3,143,53,10,gold,.4);path(`M${x+7} 148l5-3 5 3-5 3ZM${x+43} 148l5-3 5 3-5 3Z`,gold,.45);rect(x+23,145,14,6,gold,.4);line(x+26,148,x+34,148,gold,.4);}
// Painted scrollwork sits within the existing beam panels, under the lower eave.
for(let x=374;x<1030;x+=66){
 path(`M${x+12} 148q6-6 12 0t12 0t12 0M${x+12} 149q6 5 12 0t12 0t12 0`,'#b9ad78',.32,.65);
 for(const X of [x+14,x+45]){path(`M${X} 145q-3-3-5 0q0 3 4 2M${X} 151q3 3 5 0q0-3-4-2`,'#c2ae78',.32,.68);}
}
roof(282,1122,165,180,67);for(let x=319;x<1086;x+=15)brackets(x,193,.7);
const colXs=[333,410,487,564,641,758,835,912,989,1066];line(327,211,1073,211,mint,.7);line(327,215,1073,215,gold,.5);
for(let i=0;i<colXs.length-1;i++){const x=colXs[i]+6,end=colXs[i+1]-6,span=end-x;rect(x,222,span,43,red,.6);line(x,228,end,228,gold,.4);
for(let j=0;j<4;j++){const X=x+3+j*(span-4)/4,w=(span-8)/4-2;face(`M${X} 231h${w}v32h-${w}Z`,'#4b292f');face(`M${X+2} 233h${w-4}v27h-${w-4}Z`,'#192126');rect(X,231,w,32,red,.55);rect(X+2,233,w-4,27,red,.35);for(let k=1;k<5;k++)line(X+2+k*(w-4)/5,233,X+2+k*(w-4)/5,260,red,.3,.55);for(let y=236;y<260;y+=5)line(X+2,y,X+w-2,y,red,.3,.55);}}
for(const x of colXs){path(`M${x-3} 210V266Q${x} 269 ${x+3} 266V210M${x-5} 211h10M${x-5} 264h10M${x-4} 269h8`,red,.8);line(x-1,215,x-1,263,red,.4,.7);rect(x-7,267,14,5,stone,.6);}
out.push('<image href="../china-tno-study/assets/emblem-authored-r9.svg" x="678" y="117" width="44" height="48"/>');
function railing(x1,x2,y,step=25){face(`M${x1} ${y+11}H${x2}v4H${x1}Z`,'#596c61');line(x1,y+11,x2,y+11,stone,.75);line(x1,y+15,x2,y+15,stone,.6);
for(let x=x1;x<=x2;x+=step){face(`M${f(x-1.5)} ${y+13}V${y-1}Q${f(x-4)} ${y-3} ${f(x)} ${y-6}Q${f(x+4)} ${y-3} ${f(x+1.5)} ${y-1}V${y+13}Z`,'#708677');path(`M${f(x-1.5)} ${y+13}V${y-1}Q${f(x-4)} ${y-3} ${f(x)} ${y-6}Q${f(x+4)} ${y-3} ${f(x+1.5)} ${y-1}V${y+13}M${f(x-3)} ${y}h6M${f(x-3)} ${y+10}h6`,stone,.6);
if(x+step<=x2){line(x+3,y+2,x+step-3,y+2,stone,.55);line(x+3,y+5,x+step-3,y+5,stone,.55);path(`M${f(x+4)} ${y+10}l4-3h${step-16}l4 3`,stone,.45);}}}
railing(7,1393,259,24);for(const y of[277,281,290])line(5,y,1395,y,stone,y===281?.9:.55);
line(5,292,5,459,red,.8);line(1395,292,1395,459,red,.8);line(5,458,1395,458,red,.65);
for(const[x,w,text]of[[189,417,'中华人民共和国万岁'],[798,420,'世界人民大团结万岁']]){
rect(x,301,w,44,red,.8);out[out.length-1]=out.at(-1).replace('/>',' fill="#8c3039"/>');
out.push(`<rect x="${x+1}" y="302" width="${w-2}" height="42" fill="url(#shell-crt)" stroke="none"/>`);
out.push(`<text x="${x+w/2}" y="333" text-anchor="middle" font-family="TNO,PingFang SC,sans-serif" font-weight="700" font-size="27" letter-spacing="3.5" fill="#e8e1c9" stroke="none">${text}</text>`);
}
for(const x of[326,500,700,899,1080]){path(`M${x-33} 454V405a33 39 0 0 1 66 0V454M${x-29} 454V405a29 34 0 0 1 58 0V454`,red,.85);path(`M${x-23} 451V409a23 27 0 0 1 46 0V451ZM${x} 383V452`,gold,.55);for(let a=0;a<=Math.PI;a+=Math.PI/11)line(x+30*Math.cos(a),405-36*Math.sin(a),x+33*Math.cos(a),405-40*Math.sin(a),red,.4);for(let y=407;y<=444;y+=7)for(let dx=-17;dx<=17;dx+=6)ellipse(x+dx,y,.55,.55,gold,.35);}
rect(667,278,67,85,gold,.8);rect(670,281,61,79,stone,.6);
// Original photographic portrait, subdued TNO duotone with a separate scanline overlay.
out.push('<g clip-path="url(#shell-mao)" filter="url(#portrait-ink)"><svg x="670" y="281" width="61" height="79" viewBox="1764 1190 347 488" preserveAspectRatio="xMidYMid slice"><image href="assets/mao-tiananmen-real-2014.jpg" width="4000" height="3000"/></svg></g><rect x="670" y="281" width="61" height="79" fill="url(#portrait-crt)" stroke="none"/>');
roof(0,151,371,387,17);roof(1249,1400,371,387,17);path('M5 402H143V443M1257 443V402H1395',red,.7);
function lion(cx,y,s=1){out.push(`<g transform="translate(${cx} ${y}) scale(${s})">`);face('M-10 18h20v5h-20Z','#596c62');face('M-8 14h16v4H-8Z','#8c9c89');face('M-6 14Q-10 10 -8 4L-6 0Q-12 -7 -7 -13Q-8 -20 -1 -20Q6 -21 8 -14Q12 -9 7 -3Q11 3 7 10L7 14Z','#546d61');rect(-10,18,20,5,stone,.65);rect(-8,14,16,4,stone,.6);path('M-6 14Q-10 10 -8 4L-6 0Q-12 -7 -7 -13Q-8 -20 -1 -20Q6 -21 8 -14Q12 -9 7 -3Q11 3 7 10L7 14M-6 0Q-2 -3 3 0L5 8L2 13M-5 2l-2 9 4 2M-3 -15Q0 -18 3 -14M-5 -11l3-1M2 -12l3 1M-4 -7q4 4 7-1M-8 -13l-3 1M8 -11l3 2M-5 -3q-5 1-3 6M6 -2q4 2 1 6',stone,.6);ellipse(-1,-8,1.8,1.2,stone,.4);path('M-1 -4l-2 3M1 -3l2 3M-4 5q5-3 7 3',stone,.45);out.push('</g>');}
railing(5,1395,442,31);
for(const[x,d]of[[184,-1],[370,1],[579,-1],[821,1],[1030,-1],[1216,1]]){lion(x,409,1.05);const end=x+d*85;for(const dy of[0,4,15])path(`M${x} ${424+dy}Q${(x+end)/2} ${429+dy} ${end} ${444+dy}`,stone,.65);for(let i=1;i<7;i++){const t=i/7,X=x+(end-x)*t,Y=424+20*t*t;path(`M${f(X-1.2)} ${f(Y+14)}V${f(Y-3)}q-2-3 1.2-4q3.2 1 1.2 4v17`,stone,.6);}line(x-11,435,x-11,462,stone,.7);line(x+11,435,x+11,462,stone,.7);}
for(const y of[460,463,466])line(0,y,1400,y,stone,.6);
const content=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 466.667" data-artwork="authored-material-r10"><defs><pattern id="gate-plaster" width="11" height="9" patternUnits="userSpaceOnUse"><path d="M1 2h.5M5 5h.8M9 1h.5M2 8h1" stroke="#ba8e7c" stroke-width=".4" opacity=".32"/><path d="M0 9l3-3m4 0 4-4" stroke="#946960" stroke-width=".28" opacity=".22"/></pattern><pattern id="gate-tile-grain" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5L5 0" stroke="#d1c190" stroke-width=".35" opacity=".16"/></pattern><clipPath id="shell-mao"><rect x="670" y="281" width="61" height="79"/></clipPath><filter id="portrait-ink" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values=".18"/><feComponentTransfer><feFuncR type="linear" slope="1.45" intercept="-.19"/><feFuncG type="linear" slope="1.5" intercept="-.17"/><feFuncB type="linear" slope="1.37" intercept="-.15"/></feComponentTransfer></filter><pattern id="shell-crt" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 .5H3" stroke="#e4b1a0" stroke-width=".5" stroke-opacity=".20"/><path d="M0 2H3" stroke="#31151d" stroke-width=".5" stroke-opacity=".26"/></pattern><pattern id="portrait-crt" width="2" height="2" patternUnits="userSpaceOnUse"><path d="M0 1H2" stroke="#061318" stroke-width=".4" stroke-opacity=".25"/></pattern></defs><g fill="none" stroke-linecap="round" stroke-linejoin="round">${out.join('')}</g></svg>`;
document.getElementById('main-window').insertAdjacentHTML('afterbegin',`<div class="nation-shell" aria-hidden="true">${content}</div>`);
};
