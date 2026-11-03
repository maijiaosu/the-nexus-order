/* Hand-built symbolic plates. Grade is supplied by the user's province assignment. */
window.EconSymbols=(()=>{
 const P=(d,c='line')=>`<path class="s-${c}" d="${d}"/>`, C=(x,y,r,c='line')=>`<circle class="s-${c}" cx="${x}" cy="${y}" r="${r}"/>`, G=(b,x,y,s=1,r=0)=>`<g transform="translate(${x} ${y}) scale(${s}) rotate(${r})">${b}</g>`;
 let serial=0;
 const svg=(b,box='0 0 160 140')=>{const id='econ-etch-'+(++serial);b=b.replace(/<path class="s-(cloth|panel|metal|paper|gold)" d="([^"]*)"\/>/g,(all,c,d)=>all+`<path d="${d}" fill="url(#${id})" stroke="none" opacity=".26"/>`);return `<svg class="econ-symbol" viewBox="${box}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><defs><pattern id="${id}" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 3L3 0" stroke="#d5d1b5" stroke-width=".5"/></pattern></defs>${b}</svg>`};
 const yen=(x,y,s=1)=>G(P('M-7-8L0 1 7-8M-7 2H7M-7 7H7M0 1V16','bright'),x,y,s);
 const coin=(x,y,r)=>C(x,y,r,'gold')+C(x,y,r*.76,'fine')+yen(x,y-r*.23,r/17);
 function note(x,y,s=1,r=0){return G(P('M0 0Q18-7 40 0V21Q18 14 0 21Z','paper')+P('M4 3Q18-2 36 3V17Q18 12 4 17ZM6 9H10M30 9H34','fine')+yen(20,6,.4),x,y,s,r)}
 function bag(g){let b='';
  if(g===4)b+=G(sack(3),57,20,.68,8);
  if(g===5)b+=G(sack(3),-10,15,.74,-14)+G(sack(3),64,12,.72,13);
  b+=sack(g);if(g===5){b+=note(3,111,.8,-12)+note(3,116,.8,-12)+note(3,121,.8,-12);}
  if(g===1){b+=note(115,23,.72,-25)+note(121,61,.6,13)+P('M119 28Q97 6 96 25Q107 20 114 28M136 14Q153-2 155 7Q143 10 140 16M125 19Q118 5 110 9M139 9L148 4','feather');b+=P('M111 77Q125 94 137 83M116 85Q123 101 141 91','fine')+coin(116,119,6)}
  if(g===2)b+=coin(117,122,7)+P('M19 109l-9 7m-2-9 8-4','fine');
  if(g>=3){for(let i=0;i<g-1;i++)b+=P(`M${103+i*8} ${121-i*3}v6q10 7 21 0v-6m-21 0q10-7 21 0-10 7-21 0`,'gold');}
  return b;
 }
 function sack(g){let b=P('M54 40L44 14q12 6 21 0l9 8 15-8-8 26','cloth')+P('M51 39q16-7 33 0l-1 8q39 29 36 58-2 25-49 24-47 1-49-24-4-27 32-58z','cloth')+P('M52 40q17 5 31 0m-31 5q16 5 31 0M59 48Q39 71 37 93M81 49q22 18 25 42M29 110q17 15 67 7M55 19l8 16m16-12-6 12','fine')+yen(68,76,1.1);
 if(g===1)b+=P('M43 98l10-6 8 6 7-3 8 10-10 5 1 12-13-4-10 4-9-11z','hole')+P('M42 98l11-4 8 6 7-3 7 9-12 1 2 14M44 120l4-9m9 7 3-7','torn');
 if(g===2)b+=P('M37 78l12 5-4 21-15-5z','patch')+P('M32 81l15 16M37 79l-3 7m10-4-3 8m-9 5 8 4','fine');
 return b;
 }
 function shop(g){let b=P('M20 37V19q0-8 10-8h109M132 11v19M30 20H128','metal')+C(37,31,3)+C(124,31,3);
 const sign=P('M25 38h107v47H25z','panel')+P('M30 43h97v37H30z','fine');
 if(g===1){b+=G(sign,17,-15,1,13)+G(P('M38 56h31m-31 6h24M89 50v16m-7-8h14','dim'),17,-15,1,13);b+=P('M34 93L113 57l8 16-80 36z','crossbar')+P('M42 100l68-32M30 91l6 5m79-38 5 5','fine')+P('M33 123h88M49 115l11-5 11 8M114 109l8 7-12 4','dim')}
 else {b+=sign;for(let i=0;i<5;i++)b+=P(`M${31+i*19} 82v15q9 12 18 0V82Z`,i%2?'cloth':'brightfill');b+=P('M34 105v18h92v-18M45 51h68M54 59h50M62 68h33','line');if(g===2)b+=P('M53 106v17m12-17v17m12-17v17m12-17v17m12-17v17','dim')+G(lock(),87,103,.55);if(g>=4)b+=P('M136 38l10-11m-5 27h14M10 56H2m12-15-7-7','bright');if(g===5)b+=coin(27,119,10)+coin(136,116,12)}
 return b;
 }
 function lock(){return P('M0 10V0a10 10 0 0 1 20 0v10M-4 10h28v23H-4z','metal')+C(10,20,3,'dark')+P('M10 22v5','dark')}
 function clock(g){let b=C(75,72,48,'metal')+C(75,72,42,'dark')+C(75,72,38,'fine');for(let i=0;i<12;i++){let a=i*Math.PI/6;b+=P(`M${75+Math.sin(a)*32} ${72-Math.cos(a)*32}l${Math.sin(a)*4} ${-Math.cos(a)*4}`,'bright')}
 b+=P('M64 17h22v7H64zM69 7h12v10H69zM110 29l9-9 8 8-10 9','metal');
 if(g<=2){b+=P('M75 72V46M75 72l20 13','bright');b+=P('M26 104l88-64 9 12-88 64z','crossbar')+G(lock(),60,89,.78);if(g===1)b+=P('M71 35l-9 13 10 12-13 7m-12 51 10-9 10 5','torn')}
 else{b+=P(g===3?'M75 72V49M75 72l21-4':'M75 72L88 47M75 72l25 10','bright');if(g>=4)b+=P('M9 54h18M4 66h20M8 78h17M110 114q28-12 29-43l-8 9m8-9 7 11','bright')}
 b+=C(75,72,4,'gold');return b;
 }
 function orders(g){let b='';const count=g===1?1:g===2?5:g===3?2:g===4?4:6;
 for(let j=count-1;j>=0;j--){let x=18+j*5,y=28-j*3;b+=G(P('M0 0h70l14 14v84H0z','paper')+P('M69 0v15h15M10 25h58M10 32h49M10 48h23M43 48h24M10 57h56M10 66h56M10 75h36M10 85h25','fine'),x,y)}
 if(g===1)b+=P('M22 30l60 83M81 34l-59 80','alarm')+P('M28 122l-13 7 9 7 16-5M91 119l13-9 7 9-8 7','torn');
 else if(g===2)b+=P('M16 67h82v19H16z','strap')+G(lock(),69,61,.7);
 else {b+=C(81,103,20,'seal')+C(81,103,15,'fine')+P('M71 103l7 7 15-17','bright');if(g>=4){b+=P('M107 49h24V26l24 29-24 29V62h-24z','arrow');b+=P('M111 95h35m-28 8h27m-20 8h20','fine')}}
 return b;
 }
 function buildings(g){let b='';const heights=g===1?[35,51,29]:g===2?[48,73,36]:g===3?[51,73,42]:g===4?[67,95,51]:[78,111,64];
 heights.forEach((h,i)=>{let x=19+i*39,y=124-h;b+=P(`M${x} ${y}l27-8 10 8v${h}h-37z`,'panel')+P(`M${x+27} ${y-8}v${h+8}M${x} ${y+3}h27`,'fine');for(let r=0;r<Math.floor(h/15)-1;r++)for(let c=0;c<3;c++)b+=P(`M${x+5+c*7} ${y+11+r*13}h3v6h-3z`,g<=2?'dark':'window')});
 if(g===2){b+=P('M16 126V56h48V8h71M57 11l68-9 16 9M115 11v36l-6 6h12M10 70h55M10 87h55M10 104h55M10 121h55M10 56v71m17-71v71m17-71v71','metal');b+=G(clock(2),85,72,.37)}
 if(g===1)b+=P('M23 113l25-19m-24 0 23 18M64 50l12-5 9 8-9 12-9-5z','torn');
 if(g>=4)b+=P('M8 111l33-20 23 1 23-29 30-14V34l27 19-27 22V61L93 75 72 106H48L14 126Z','arrow');
 if(g===5)b+=P('M12 105l29-19h19l28-30 29-13M15 100l26-18h18l27-30 31-13','bright');b+=P('M12 132h135','fine');return b;
 }
 function people(g){let b='';
 for(let i=0;i<5;i++){let x=25+i*24,y=52+(i%2)*7;b+=C(x,y,9,g<=2?'mutedfill':'paper')+P(`M${x-11} ${y+15}q11-9 22 0l4 32h-30z`,g<=2?'mutedfill':'panel')+P(`M${x-5} ${y+12}l5 10 5-10M${x} ${y+22}v10`,'fine')}
 if(g<=2){b+=P('M51 94h55v28H51zM65 93v-8h25v8M51 107h55M75 104h8v6h-8z','metal')+P('M61 98l35 20M96 98l-35 20','alarm');if(g===1)b+=P('M20 34l-4-10m15 11 1-13M122 37l8-9','dim')}
 else {b+=P('M58 115l37-53q-4-11 7-19l2 14 12 1 5-12q8 16-7 23L78 124z','metal')+C(69,113,3,'dark');if(g>=4)b+=P('M120 115V91h-10l22-25 23 25h-12v24z','arrow')}
 return b;
 }
 function credit(g){let b=P('M78 14l39 14v37q-1 38-39 62-38-24-39-62V28z','metal')+P('M78 23l30 11v31q0 30-30 52-29-22-30-52V34z','dark');
 if(g===1)b+=P('M78 24l-13 26 17 7-19 24 15 2-8 30 18-26-10-9 16-22-15-6 11-19','torn')+P('M54 126l10-12 13 8-9 10','panel');
 else if(g===2)b+=G(lock(),67,58,1.05);
 else b+=P('M58 66l15 15 27-35','bright');
 if(g>=4){for(let i=0;i<(g===5?4:2);i++){b+=P(`M${28-i*3} ${54+i*15}q-18-15-20-4 0 13 20 16M${128+i*3} ${54+i*15}q18-15 20-4 0 13-20 16`,'laurel')}b+=P('M20 111q8 16 26 20M136 111q-8 16-26 20','bright')}
 return b;
 }
 const draws={bag,shop,clock,orders,buildings,people,credit};
 const icon=(type,g)=>svg(draws[type](g));
 function commerce(g){return svg(G(shop(g),0,11,.84)+G(people(g),96,46,.66)+G(g<=2?clock(g):buildings(g),153,0,.74),'0 0 280 140')}
 return {icon,commerce};
})();
