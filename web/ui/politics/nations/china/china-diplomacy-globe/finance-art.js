(() => {
  const ink='#091326', deep='#192b43', mid='#526a86', pewter='#8394b3', paper='#b5bece', ivory='#dde5ee';
  const blue='#5ed9ed', blueD='#285f7b', red='#f08c9f', redD='#7d425b';
  const plates={}, back={}, finish={};
  const g=(transform,body)=>'<g transform="'+transform+'">'+body+'</g>';
  const p=(d,f=paper,s=ink,w=1.35)=>'<path d="'+d+'" fill="'+f+'" stroke="'+s+'" stroke-width="'+w+'"/>';
  const l=(d,s=ink,w=1)=>p(d,'none',s,w);
  const e=(x,y,rx,ry,f=paper,s=ink,w=1.2)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+f+'" stroke="'+s+'" stroke-width="'+w+'"/>';
  const n=(count,fn)=>Array.from({length:count},(_,i)=>fn(i)).join('');
  const metal='url(#fp-metal)', iron='url(#fp-iron)', parchment='url(#fp-paper)';
  const bolt=(x,y,sz=2.5)=>e(x,y,sz,sz*.78,paper,ink,.9)+l('M'+(x-sz*.55)+' '+(y+.35)+'l'+sz+' -1',deep,.7);
  function wheel(x,y,rx,ry){
    return g('translate('+x+' '+y+') scale(1 '+ry/rx+')',n(5,i=>g('rotate('+i*72+')',p('M-1.7 -1 -1 -'+(rx-2)+' 1 -'+(rx-2)+' 2.5 0Z',mid,ink,1)))+e(0,0,rx,rx,'none',ink,5.6)+e(0,-.9,rx,rx,'none',paper,2.7)+e(0,0,3.8,3.8,metal,ink,1.2));
  }
  const defs='<defs><linearGradient id="fp-metal" x2=".16" y2="1"><stop stop-color="#c4d4e1"/><stop offset=".19" stop-color="#8198b1"/><stop offset=".4" stop-color="#b6c6d7"/><stop offset=".66" stop-color="#5e7491"/><stop offset="1" stop-color="#35425e"/></linearGradient><linearGradient id="fp-iron" x2=".11" y2="1"><stop stop-color="#8297ac"/><stop offset=".37" stop-color="#425773"/><stop offset="1" stop-color="#202b41"/></linearGradient><linearGradient id="fp-paper" x2=".5" y2="1"><stop stop-color="#e2d6d0"/><stop offset=".66" stop-color="#b2a5b4"/><stop offset="1" stop-color="#797d95"/></linearGradient></defs>';
  let instance=0;
  window.financePlate=function(regionId){
    if (!plates[regionId]) return '';
    const prefix='fp-'+regionId+'-'+(++instance)+'-';
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 115" fill="none" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'+defs+(back[regionId]?.() || '')+plates[regionId]()+(finish[regionId]?.() || '')+'</svg>').replaceAll('fp-',prefix);
  };

  plates.na=()=>{
    const notes=(x,y,tilt,face,shade)=>g('translate('+x+' '+y+') rotate('+tilt+')',
      p('M-43 -20Q-11-27 35-20L43 19Q2 12-39 23Z',face,ink,1.7)
      +l('M-39-17Q-7-22 32-17L38 15Q3 10-36 19ZM-35-13Q-9-18 28-13L33 11Q2 7-32 15Z',shade,1.1)
      +e(0,-1,16,10,'none',shade,1.4)+e(0,-1,11,8,'none',shade,.8)
      +n(9,i=>l('M'+(-12+i*3)+' -9q-8 8 1 16',shade,.65))
      +n(5,i=>l('M-29 '+(-8+i*4)+'q6 -3 12 -2m34 -1 8 1',shade,.8)));
    return notes(56,68,-17,blue,blueD)+notes(264,58,18,red,redD)
      +p('M54 80Q77 83 106 65L122 68 126 77Q83 96 55 87Z',blueD,ink,1.4)+l('M58 83Q86 88 116 68',blue,1.4)
      +p('M197 61Q229 47 255 56L269 63 258 70Q227 60 203 75Z',redD,ink,1.5)+l('M205 65Q231 54 254 60',red,1.4)
      +p('M95 96l100-18 36 9-103 23-38-8Z',iron,ink,1.8)+p('M90 101l38 9 103-23-1 5-100 22-40-8Z',deep,ink,1.2)
      +p('M112 99l7-29 15-3 8 27-6 5-10-2-1-14-5 17Z',metal)+p('M177 87l5-31 14-4 10 28-6 7-8 1-4-18-3 18Z',metal)
      +e(111,65,11,20,metal,ink,1.8)+p('M110 45l71-14q13-2 15 20t-5 26l-78 10q9-19-3-42Z',metal,ink,2)
      +n(19,i=>{let x=116+i*3.65,y=43-i*.68;return l('M'+x+' '+y+'q14 16 3 40',i%3===0?ivory:deep,i%3===0?1.2:1.6)})
      +p('M107 43l5-2q17 20 6 45l-6 2q10-21-5-45Z',metal)
      +e(187,54,16,25,iron,ink,2)+e(190,53,14,23,metal,ink,1.2)+e(191,54,9.5,16,deep,paper,.9)
      +p('M190 45l20-4q7 1 6 11t-5 12l-20 2q4-10-1-21Z',iron)+e(211,52,5,11,metal,ink)
      +p('M143 42l1-8 23-5 6 9-5 8-19 3Z',metal)+l('M151 37l11-3',ivory,1.7)
      +p('M151 36l-1-12 6-2 4 13Z',metal)+wheel(151,20,23,10)
      +l('M95 100l28 6m12 0 82-18',paper,1)+bolt(104,99)+bolt(208,88)+bolt(134,104);
  };
  plates.sa=()=>{
    const pages=p('M26 82Q74 49 113 50q44-10 77-5l65 24-63 31q-46-6-91 11Z',deep,ink,2)
      +p('M29 78Q74 47 112 47l37 7 45-13 67 24-71 33q-38-4-86 10Z',paper)
      +p('M27 74q41-32 85-32l37 9 45-14 66 25-73 31q-30-6-83 10Z',parchment,ink,1.6)
      +p('M28 73q37-26 80-32l41 10-45 52q3-15 24-43-48-4-100 13Z','#9c9d8b')
      +p('M34 69q35-37 73-35l43 13-17 17q-39-13-99 5Z',parchment,ink,1.5)
      +n(8,i=>l('M'+(42+i*5)+' '+(63-i*2.35)+'q34-13 '+(74-i*5)+' -6','#817f72',.7))
      +n(5,i=>l('M'+(107+i*4)+' '+(100-i*4)+'Q147 '+(81-i*4)+' 169 '+(86-i*4),'#727769',.9))
      +l('M29 78l75 28q47-13 83-10l69-29M149 51l-30 37',deep,1);
    const stamp=g('rotate(22 199 56)',p('M183 17q-6-14 10-16 15-2 13 12-1 7-7 12l1 14 15 6 4 8q-14 7-44 2l2-8 14-9-1-13Z',iron,ink,1.8)
      +p('M183 12q1-9 11-9 10 0 10 9-9-5-21 0Z',redD)+l('M186 10q5-7 12-5m-8 18q6-2 10-6',red,1.1)
      +p('M173 50q17-5 45-3l5 9q-25 9-53 2Z',metal)+p('M170 58q27 3 53-2l-1 5q-23 7-51 2Z',redD)
      +n(7,i=>l('M'+(175+i*6)+' 53l2 4',deep,.8)));
    return pages+p('M43 81q25 1 53-9l10-9-6 15q-24 15-47 16Z',blueD,ink,1.4)+l('M54 86q23-2 43-12',blue,1.5)
      +p('M128 71l43-24 61 15-42 23-7-1-5 4-8-1-6 4Z',parchment,ink,1.2)
      +n(8,i=>l('M'+(145+i*3.8)+' '+(73+i*.65)+'l11-6',mid,.65))
      +g('translate(194 69) rotate(-13) scale(1 .39)',e(0,0,20,20,'none',redD,3)+e(0,0,15,15,'none',redD,1.7)+n(12,i=>g('rotate('+i*30+')',l('M0-18v3',redD,1.1))))
      +p('M229 67l25-9 18 8-30 10-5-3-6 1Z',red,ink)+l('M243 67l13-5m-9 8 14-5',redD,.9)
      +n(3,i=>e(58+i*6,73-i*3,15,5,blueD,blue,1))+e(70,64,15,5,blue,ink,1)+e(70,64,10.5,2.8,'none',blueD,.9)
      +stamp;
  };

  plates.we=()=>{
    const dome=(x,y,sz)=>g('translate('+x+' '+y+') scale('+sz+')',p('M-21 2a21 22 0 0 1 42 0l-4 4h-34Z',metal,ink,1.25)
      +n(5,i=>l('M0-20q'+(-32+i*16)+' 10 '+(-17+i*8.5)+' 23',mid,.85))+l('M-18-7q17 4 36 0m-38 6q22 4 40 0',mid,.85)+e(0,-20,3.5,1.4,paper,ink,.7));
    const sea=n(13,i=>{let x=20+i*22;return l('M'+x+' '+(96+(i*7)%10)+'q8-2 18-1m-11 4 7-.7',i%3?deep:blueD,.8)});
    return sea+p('M17 70l16 2 13-7 180-9 36-9 30 6-10 23-26 11-185 12-31-10Z',iron,ink,1.7)
      +p('M19 70l30-9 174-9 38-8 31 9-47 12-191 9Z',paper,ink,1.3)
      +p('M21 71l31 5 191-11 45-10-4 11-39 11-188 11-21-5Z',metal,ink,1.1)
      +l('M41 87l20 5 185-12 36-10',deep,1.7)+n(23,i=>e(63+i*7.6,79-i*.44,1.25,.78,ink,'none'))
      +p('M222 55l-1-16 11-3 29 3-1 14-16 6Z',metal)+p('M220 38l1-8 17-6 28 6v10l-18 5Z',paper)
      +p('M218 29l19-6 30 6-18 7Z',mid)+n(5,i=>p('M'+(225+i*5)+' '+(32+i*.65)+'l3 .5v3l-3-.3Z',ink,'none'))
      +p('M245 25l-1-16 7-3 7 4-1 17Z',redD)+p('M244 10l7-3 7 3-1 3-12 0Z',deep)+l('M237 27V12m-5 4 10-2',pewter,1.1)
      +dome(73,63,.77)+dome(109,61,.91)+dome(150,58,.98)+dome(190,54,.84)
      +n(22,i=>l('M'+(48+i*8)+' '+(68-i*.42)+'v-3.7',pewter,.8))+l('M45 65l173 -9',pewter,.8)
      +p('M20 15l9 1 3 40-5 5-8-46Z',blueD,ink,1.5)+p('M25 17l25 12-2 6-24-13Z',blue,ink)
      +p('M48 29l7-2 4 19 12 10-3 4-16-10Z',blueD,ink)+e(50,30,4,3,blue,ink)
      +p('M274 66l15-9 11-24 5 1-9 28-19 12Z',redD,ink)+l('M279 68l13-8 11-25',red,1.35)
      +l('M28 15l24 14m-20 10 17-7',blue,.7)+e(70,58,3,2,blue,ink,.7);
  };

  plates.ee=()=>{
    const tape=p('M10 79q19-22 50-20t49 12l-2 13q-33-20-52-15S29 88 16 92Z',blue,ink,1.5)
      +p('M12 80q-7 9 5 13l6-3-3-4Z',blueD,ink)+n(17,i=>{let x=26+i*4,y=71-9*Math.sin(i/16*Math.PI);return l('M'+x+' '+y+'l1 3',blueD,.9)});
    const gears=g('translate(151 67)',n(2,i=>g('translate('+i*25+' '+(-i*5)+')',e(0,0,17-i*5,17-i*5,iron,ink,1.4)+n(12,j=>g('rotate('+j*30+')',p('M-1-17l3 .1.4 4-3-.1Z',paper,ink,.6)))+e(0,0,11-i*3,11-i*3,deep,pewter,1)+n(5,j=>g('rotate('+j*72+')',l('M0 0v-10',pewter,1.6)))+e(0,0,3,3,paper,ink,1))));
    return tape+p('M94 92l65-14 63 4 8 13-64 15-74-8Z',iron,ink,1.7)
      +p('M94 92l67-14 63 5-65 16Z',metal)+p('M95 96l64 6 69-15-1 7-66 16-67-8Z',deep)
      +p('M118 79q-5-31 6-46 11-18 42-20 32-1 43 25 8 16 5 31l-50 14Z','#39474a',pewter,1.5)
      +p('M128 78l5-29 5-2-3 32m44-5 6-40 5 1-2 37',metal)
      +gears+p('M130 41q3-13 13-14l26-3q10 3 8 10l-29 8Z',paper)
      +n(11,i=>l('M'+(137+i*3.3)+' '+(31-i*.46)+'l1.2 6.6',mid,.8))
      +l('M121 57q-3-28 23-38m1-2q30-11 52 4m2 4q8 10 9 23',ivory,1.5)
      +l('M124 53q1-17 11-24m-13 31 1-4m78-19 4 12',pewter,.7)
      +p('M110 78q48 4 106-13l5 6q-49 18-111 16Z',metal,ink,1.5)
      +p('M105 78l13-2 6 5-14 4Z',blueD)+l('M110 80l9-1',blue,1.4)
      +p('M205 59q15 11 34 4 19-7 19-19 1-12 16-12l14 5-2 9q-11-7-16 1 0 17-23 26-24 6-43-4Z',red,ink,1.5)
      +p('M275 33q17-2 17 8l-6 5q-1-7-14-8Z',redD)
      +n(12,i=>l('M'+(216+i*3.3)+' '+(66+2*Math.sin(i*.37)-Math.max(0,i-8)*1.6)+'l.9 2.8',redD,.9))
      +p('M151 15l1-4 8-3 8 1 2 4Z',metal)+e(160,7,6,3,metal,ink,1)+bolt(117,94)+bolt(190,96);
  };

  plates.me=()=>{
    const leaf=(x,y,angle,sz)=>g('translate('+x+' '+y+') rotate('+angle+') scale('+sz+')',
      p('M0 1q-17-10-13-35Q6-19 0 1Z',paper,ink,1.1)+p('M0 0q-6-14-13-34 15 15 13 34Z',pewter,'none')
      +l('M0 1q-4-17-12-32m7 20-6-10m6 14-6-6',deep,.85));
    const coupon=(x,y,angle,f,d)=>g('translate('+x+' '+y+') rotate('+angle+')',
      p('M-43-14l93-3 2 29-93 6Z',f,ink,1.35)+l('M-37-10l82-3 1 21-81 6ZM-33-7l37-1m-37 4 26-.6m-25 4 22-.5',d,1)
      +n(12,i=>e(25+i*.45,-1,9-i*.2,7-i*.17,'none',d,.42))
      +n(8,i=>l('M'+(-34+i*4.2)+' 7v3.4',d,.75)));
    return coupon(78,73,-18,blue,blueD)+coupon(237,65,16,red,redD)
      +p('M64 90l88-30 83 11 20 10-94 28-97-13Z',iron,ink,1.6)
      +p('M64 88l91-31 96 19-91 30Z',parchment)
      +n(7,i=>l('M'+(78+i*4)+' '+(88+i*.5)+'l59-19m35 18 36-12',mid,.65))
      +p('M131 84l37-10 25 6-32 13Z',paper)+e(161,84,10,3.1,'none',mid,.9)
      +p('M136 78q12 2 38-7l-4-5-24 4Z',metal)
      +p('M145 73l-1-25 5-9 15-3 5 6-2 25q-9 7-22 6Z',metal)
      +n(7,i=>l('M'+(146+i*3)+' '+(71-i*.5)+'l0-20',deep,.9))
      +p('M141 48q-9-8-10-17l23 6 25-13q-1 12-11 20-9 6-27 4Z',metal)
      +n(7,i=>l('M'+(139+i*4)+' '+(35+Math.sin(i/6*Math.PI)*3.8)+'l'+(3-i*.9)+' 8',deep,.85))
      +l('M143 44q12 2 26-5',ivory,1.2)
      +l('M153 40Q143 22 119 14m35 25q4-23 23-32m-20 32q20-14 42-12',pewter,1.9)
      +leaf(146,34,-35,.9)+leaf(157,35,16,1)+leaf(170,32,52,.84)+leaf(182,29,77,.56)
      +p('M87 76q-3-16 8-19l14-4q-10 5-7 18l-12 5Z',blueD,ink)+l('M91 71q-2-9 5-13',blue,1.1)
      +p('M203 72l5-12 8-4q-4 8-4 17Z',redD,ink)+l('M208 70l4-10',red,1.1);
  };

  plates.sas=()=>{
    const derrick=p('M132 85l23-51 7-1 20 53-11 2-14-38-16 39Z',iron,ink,1.5)
      +l('M142 77l27-21m-21 4 25 17m-33 4 33 1',pewter,1.5)
      +p('M133 88l46-6 13 4-48 7-15-2Z',metal);
    const pump=p('M69 37q-2-15 7-23l16-6q-4 11-3 19l60 6 52 12 2 7-56-11-59-7-7 18-10-4Z',metal,ink,1.9)
      +p('M69 36q-2-15 6-22l14-5q-8 13-8 26l-6 17-4-4Z',blueD,ink)+l('M75 41q-2-14 5-25',blue,1.3)
      +n(12,i=>l('M'+(90+i*7.9)+' '+(28+i*.99)+'l4 4.5',mid,.67))
      +p('M145 39l9-8 11 3 5 6-12 4Z',metal)+bolt(158,37,3)
      +l('M72 50l-1 26m5-25-1 26',paper,1.15)
      +p('M59 82l7-4h3V70h8v8l8 3v5l-26 3Z',metal);
    const fly=g('translate(206 66) rotate(-11)',e(0,0,15,17,redD,ink,1.5)+e(0,0,11,13,deep,red,1.4)
      +n(5,i=>g('rotate('+i*72+')',p('M-2 1l.7-13h2.5L2 1Z',redD,ink,.6)))+e(0,0,3.8,4,metal,ink,1.2));
    const barrel=(x,y,sz)=>g('translate('+x+' '+y+') scale('+sz+')',p('M-12-12q12 6 23-2l1 24q-10 9-23 3Z',metal,ink,1.4)
      +e(0,-13,11.5,4,metal,ink,1)+e(4,-13,2.2,.9,deep,ink,.6)+l('M-11-4q13 4 22-2m-22 13q14 4 23-3',deep,2)+l('M-7-7l.4 4m.2 5v3',ivory,.8));
    return p('M12 90q32-9 53-10l42 1 39 1 70-9 34 5 46 9-30 4-45-2-49 7-42 1-65 4Z',deep,'none')
      +p('M29 92l20-4 5-9 13-1 8 4 35-4 1 6-37 5-11-4-5 1-6 8-21 4Z',blueD,ink)+l('M32 93l19-4 5-8 9-1',blue,1.05)
      +derrick+fly+p('M192 79l7-19 7-3 7 19-7 3-3-8-5 9Z',iron)
      +p('M196 48l6 1 4 14-4 3Z',metal)+pump
      +p('M210 81l12-12 38-4 19 8-1 5-18-7-34 4-11 12Z',redD,ink)+l('M218 78l7-7 33-4',red,1.1)
      +barrel(253,82,.77)+barrel(272,84,.88)
      +n(9,i=>l('M'+(46+i*24)+' '+(97-(i%4)*1.4)+'l14-2',i%2?mid:deep,.7));
  };

  plates.sea=()=>{
    const key=(x,y,shade)=>g('translate('+x+' '+y+')',p('M-3.8 0l6.4-1.8 2.7 1.1v2l-6 2-3.1-1.2Z',shade?pewter:paper,ink,.78)+l('M-2.6 0l4.5-1',ivory,.45));
    const roll=(x,y,f,d)=>g('translate('+x+' '+y+')',p('M-39 13q-2-12 11-18l25-8q10-1 12 9L7 5-24 17Z',f,ink,1.4)
      +e(0,-3,7.8,11,d,ink,1)+e(1,-3,4,6.8,f,d,.9)+e(1,-3,1.5,3.5,deep,'none'));
    return p('M28 69q-4-12 9-16l39-12q16-6 23-16l12 12q-3 11-21 17L54 67q-18 6-17 12Z',blue,ink,1.4)
      +n(9,i=>l('M'+(44+i*5.4)+' '+(58-i*2)+'l3 1m-2 2 3 1',blueD,.7))
      +p('M208 33q26-21 40-15 11 4 8 15l-22 9-5-9Z',redD,ink)
      +p('M223 28q40-21 51-8 11 15 25 9l-5 12q-18 9-29-7-6-8-25 2l-10 5Z',red,ink,1.4)
      +n(9,i=>l('M'+(242+i*5.3)+' '+(26-Math.sin(i*.65)*4)+'l2 2.4',redD,.65))
      +p('M71 84l32-38 123-29 24 13 5 42-28 17-103 22-51-15Z',iron,ink,2)
      +p('M71 84l45-18 112-30 21 5-27 37-102 28Z',metal)
      +p('M120 105l103-27 27-36 4 28-29 18-105 23Z',deep)
      +p('M93 67l10-28 118-28 15 11 8 24-115 28Z',metal,ink,1.5)+p('M98 63l10-21 114-26 6 4-117 30-5 13Z',deep)
      +roll(144,26,blue,blueD)+roll(208,18,red,redD)
      +p('M117 44l106-26 6 3-2 8-107 26-7-5Z',iron)+l('M119 48l106-25',paper,1.2)
      +p('M84 82l49-16 78-18 13 4-22 19-79 23Z',deep)
      +n(4,row=>n(10,col=>key(97+col*10.2+row*5.05,82-col*2.65-row*3.5,(col+row)%4===0)))
      +p('M150 90l53-14 8 0-4 5-55 14-9-1Z',paper)+l('M147 92l53-14',mid,.8)
      +p('M236 65l8-4 11 4 6-11 5 1-8 18-14-5-7 2Z',metal)+e(265,53,4.3,6,redD,ink,1.2)
      +bolt(82,90)+bolt(216,84)+l('M126 103l82-21',pewter,.9);
  };

  plates.ea=()=>{
    const tank=(x,y,sc,light,shade)=>g('translate('+x+' '+y+') scale('+sc+')',
      p('M-22-23q19-10 43-14l18 8 .3 46-40 13-22-11Z',iron,ink,1.6)
      +p('M-21-24q1-12 22-18 18-4 35 4l2 9Q16-17-5-13Z',metal)
      +p('M-21-23l16 9 41-14v17L-4 2l-17-9Z',light,ink,1)+p('M-21-7l17 9 40-13v23L-4 25l-17-10Z',shade,ink,1)
      +l('M-18-2l14 7 37-12m-50 17 13 7 37-12',light,1.2)
      +n(10,i=>l('M'+(-1+i*3.8)+' '+(-14-i*1.2)+'v39',i%3===0?ink:shade,i%3===0?.9:.5))
      +p('M-23 14l18 10 44-14v6L-4 31l-19-11Z',metal)+l('M-4 24l41-13',ivory,.9)
      +p('M-4-35l6-2 11 2-6 3Z',deep)+p('M1-36v-9l6-2 4 2v8l-5 2Z',metal)+e(5,-46,4,1.6,paper,ink,.8));
    const rays=n(6,i=>l('M'+(203+i*3.5)+' '+(51+i*.5)+'v18',mid,.6));
    return p('M23 84l15-4V56l9-2v16l6-2V48l12-2v18l9-2V38l15-5V23l4 1v9l6-2v24l7-1v20l118-33 27 9-2 8Z',deep,'none')
      +p('M235 48V20l10-3V10l3 1v6l8 5v18l7-1V26l9 2v21Z',deep,'none')
      +l('M79 41l12-6-9 17 11 9-15 10m159-47 15 8-14 10',mid,.8)
      +p('M24 87l152-44 116 17-151 46-116-11Z',iron,ink,1.7)+l('M30 89l110 12 139-42',pewter,1.1)
      +tank(89,57,.78,blue,blueD)+tank(209,46,.89,red,redD)
      +p('M76 79l5-6 13 5 5-2 3-8 12-3 5 5-11 5-3 8-10 3Z',blueD,ink,1.3)+l('M82 77l10 4 8-2',blue,1.15)
      +p('M166 78l21-5 9-12 8-3 8 2-3 4-8 2-10 13-22 6Z',redD,ink)+l('M173 78l15-3 11-12 6-2',red,1.1)
      +p('M110 79l31-20 37 4 14 13-29 18-41-4Z',metal,ink,1.7)
      +p('M113 78l28-16 30 3 12 9-25 14-35-3Z',deep,ink,1.2)
      +p('M120 81l20-12 30 2 8 3-20 12-32-2Z',pewter,ink,.8)
      +n(6,i=>l('M'+(129+i*3.5)+' '+(80-i*1.4)+'q6-2 12-.6',ivory,.8))
      +p('M112 80l11 7 40 4 26-16v7l-25 17-42-5-11-6Z',metal)
      +l('M115 86l9 5 38 4 23-14',mid,.95)+n(6,i=>bolt(126+i*6,90+i*.58,1.4))+rays;
  };

  plates.wa=()=>{
    const crate=p('M68 46l108-27 75 20-1 49-112 25-70-35Z',iron,ink,1.9)
      +p('M68 46l108-27 75 20-109 29Z',parchment,ink,1.55)
      +p('M69 47l72 22-3 42-69-33Z',pewter,ink,1.5)
      +p('M142 68l107-28v47l-111 24Z',metal,ink,1.4)
      +n(5,i=>l('M'+(85+i*14)+' '+(42-i*3.6)+'l69 19',mid,.85))
      +n(4,i=>l('M70 '+(53+i*7.8)+'l69 '+(22+i*2.5)+'m3-1 106-'+(27-i*.9),deep,.95))
      +n(5,i=>l('M'+(150+i*16)+' '+(68-i*4.14)+'l15-4m-16 12 8-1m-10 10 13-3','#535b56',.65))
      +p('M70 46l8 2 63 55-1 9-10-3-59-53Z',paper)
      +p('M244 42l6-1v7l-100 57-10 2 1-7Z',paper)
      +l('M77 52l58 50m14-1 93-54',mid,.8)
      +p('M83 43l7-2 73 21-3 45-7 1 3-44Z',blueD,ink,1.1)
      +p('M151 26l8-2 74 18-1 48-7 2 1-47Z',redD,ink,1.1)
      +l('M86 42l74 21-2 39',blue,.9)+l('M155 25l74 19-1 42',red,.9);
    const strap=l('M26 12q27 2 37 22l15 20 48 28',ink,5.8)+l('M26 12q27 2 37 22l15 20 48 28',blueD,3.8)
      +n(11,i=>{const t=(i+.5)/11,u=1-t;
        return l('M'+(26*u*u+106*u*t+63*t*t+.5)+' '+(12*u*u+28*u*t+34*t*t-.8)+'l-1 1.6',blue,.75)});
    const lock=g('translate(236 75) rotate(-13)',p('M-8-3v-8q0-13 10-13 10 0 10 12v7h-5v-8q-.5-8-5-8-6 0-6 9v9Z',metal,ink,1.6)
      +p('M-13-6l20-3 8 4v19L-4 20l-10-6Z',redD,ink,1.5)+p('M-13-6l20-3 8 4-20 5Z',red)
      +p('M-5 0l20-5v19l-19 6Z',red,ink,1)+e(5,5,2.6,3.3,deep,ink,.7)+p('M4.5 7l-1 4 4-1-1.5-3Z',deep,'none')
      +n(4,i=>l('M-1 '+(13+i*1.1)+'l4-1',redD,.55)));
    return strap+p('M20 89q19-4 42-21l30-2 6 7-34 5-31 17Z',blueD,ink)
      +p('M27 86l27-17 30-2 7 5-27 4-29 17Z',blue,ink)
      +n(5,i=>l('M'+(41+i*4)+' '+(83-i*2.15)+'l13-2',blueD,.8))
      +crate+g('rotate(-14 100 66)',p('M89 54l14-1 12 20-16 4Z',parchment,ink,1)+e(95,56,1.4,1.2,ink,'none')+n(5,i=>l('M98 '+(61+i*2.3)+'l6-1',mid,.65)))
      +p('M218 63l16-5 7 3-1 8-15 4-6-3Z',iron,ink)+e(230,65,3,3,deep,paper,1)+lock
      +n(4,i=>bolt(76+i*17,52+i*14.8,1.25))+n(4,i=>bolt(157+i*25,97-i*14.4,1.25));
  };

  plates.saf=()=>{
    const rock=p('M8 77l19-17 18-5 14-13 18 4 15-9 17 6 23-9 32 2 11-6 17 4 23-14 13 4 11-6 20 8 17 5 17 15 15 12-36-1-63 16-93 15-60 3Z',iron,ink,1.35)
      +l('M19 73l20-15 11 1 12-12 12 5 11-6m16-.5 9 2 22-10 32 2m34-3 17-13 13 4 10-6 15 7m-32 3 10-2 11-4 15 6',pewter,.8);
    const water=p('M15 74q29-7 57-14l72-11 43 2-37 15-105 17Z',blueD,ink,1.2)
      +n(9,i=>l('M'+(24+i*11)+' '+(73-i*2.23)+'q9-2 16-2m-4 4 11-2',blue,.8));
    const dam=p('M96 61q46-4 92-27l5 7q-6 30 7 46-35 19-73 22-19-18-31-48Z',metal,ink,1.7)
      +p('M96 61q49-6 92-28l5 5q-41 25-92 30Z',paper,ink,1.2)
      +n(12,i=>{const x=105+i*7.3,y=65-i*1.75;return l('M'+x+' '+y+'q5 22 '+(19-i*.95)+' '+(40+i*.19),i%2===0?deep:pewter,.9)})
      +n(4,i=>l('M'+(103+i*4.1)+' '+(75+i*7.3)+'q49-7 86-29',mid,.65))
      +n(16,i=>l('M'+(100+i*5.85)+' '+(62-i*.92-i*i*.055)+'v-3.1',pewter,.85))
      +l('M99 59q45-6 88-29',pewter,.9);
    const fore=p('M165 100l22-20 13-4 2-16 20-11 14-3 13 5 17-6 19 7 9 15 13 7-14 10-59 9-35 14Z',iron,ink,1.4)
      +p('M191 93l20-21 3-9 25-13 13 4 13-5 14 5-28 9-7 13-20 11Z',pewter,ink,1)
      +l('M183 98l19-9 12-16 17-8m-25 30 18-9 17-8m12-23 9 1 10-5m-4 22 9-7 14-1m-32 20 13-6 15-1',deep,.95)
      +n(8,i=>l('M'+(203+i*7.5)+' '+(82-i%3*5)+'l4-3',mid,.75));
    const tunnel=p('M219 90q2-19 17-25 13-3 21 9l-1 10-38 10Z',paper,ink,1.5)
      +p('M224 89q3-15 14-20 10-1 14 8l-.3 6-28 8Z',deep,ink,1.1)
      +n(8,i=>{let a=(i/7)*Math.PI;return l('M'+(239-16*Math.cos(a))+' '+(84-17*Math.sin(a))+'l'+(-3*Math.cos(a))+' '+(-2.7*Math.sin(a)),mid,.85)})
      +p('M229 85l17-7 9 3 2 2 19 5 16 2-4 7-19-4-22-6-15 3Z',redD,ink)
      +l('M232 86l14-5 27 9 16 2',red,1.25);
    return rock+water+dam+fore+tunnel+p('M12 81l22-4 27-1 12-5 26 1 8 13 8 10-27-1-22-6-19 4-18-3Z',iron,ink)
      +l('M17 80l18-.5 21 2 17-7 22 1m-43 11 15-4 19 5 12 1',pewter,.85);
  };

  finish.na=()=>{
    const cornerMark=(x,y,rotation,dx,dy,color)=>g('translate('+x+' '+y+') rotate('+rotation+')',
      n(2,i=>e(dx+i*.55,dy,3.6-i,2.7-i*.6,'none',color,.55))+l('M'+(dx-5)+' '+dy+'q-2-3-4-2m14 4q3 1 5-1',color,.6));
    return cornerMark(56,68,-17,-24,5,blueD)+cornerMark(264,58,18,25,-7,redD)
      +n(12,i=>l('M'+(118+i*5.45)+' '+(78-i*.79)+'q1.3-2.2 1.8-4.4',ink,.75))
      +p('M142 91l18-4 6 2-18 5Z',pewter,ink,.8)
      +l('M148 91l4-.6-.6-1 2 .4 1.4-1.4.5 1.1 2.1-.3-2 1.1.8.4-2.7.6',deep,.65)
      +n(6,i=>l('M'+(95+i*3.6)+' '+(101+i*.7)+'l1.5 2.5',mid,.55))
      +l('M183 36q-5 3-7 10m6 22 2 3m23-23 3-2',ivory,.9);
  };
  finish.sa=()=>g('rotate(22 199 56)',n(9,i=>l('M'+(183+i*2.55)+' '+(9+i%3)+'q2 8-1 12',i%3===0?red:mid,.6))
      +l('M181 51q15-4 33-2m-23-9 10-1m-18 5 4-3',paper,.8))
    +n(7,i=>l('M'+(123+i*3.4)+' '+(91-i*2.4)+'q8-3 16-2',mid,.65))
    +n(8,i=>l('M'+(143+i*3.1)+' '+(72-i*1.65)+'l.8 1.5',redD,.7))
    +l('M71 73l11-3m-24 9 12-1M31 79l71 25q28-8 44-9m-113-13 69 26',mid,.7);
  finish.we=()=>p('M232 55l.3-10 4-.7v10Z',deep,ink,.8)
    +n(4,i=>p('M'+(243+i*3.6)+' '+(44-i*.65)+'l2-.4v2.1l-2 .5Z',deep,'none'))
    +l('M250 48l1.2 6m2.5-7.2 1.1 6.2m-3.5-3.9 2.8-.4m-2.3 2.6 2.8-.4',mid,.7)
    +e(40,77,2.2,2,ink,pewter,.7)+l('M39 79q-1 3 2.5 3 .6 2-1.6 2.5',paper,.7)
    +n(8,i=>l('M'+(73+i*19.8)+' '+(85-i*1.04)+'l2.4 3.3m.4-4 2.5 3',mid,.55))
    +n(3,i=>p('M'+(106+i*39.3)+' '+(60-i*2.7)+'v-5l2-.5v5Z',paper,ink,.6))
    +l('M92 65l7-3 70-5 7 1m-64 3 63-4m61-10 1 5',mid,.8)
    +n(6,i=>l('M'+(67+i*39)+' '+(62-i*2.0)+'q3-4 2-9',ivory,.55));
  finish.ee=()=>n(6,i=>l('M'+(130+i*2)+' '+(51-i*2.5)+'q-4 9-4 18',i%2?pewter:mid,.55))
    +n(7,i=>l('M'+(178+i*2.8)+' '+(23+i*1.1)+'q5 3.5 6 6.2',mid,.55))
    +n(8,i=>l('M'+(133+i*6.6)+' '+(94-i*.91)+'l2.3-2',mid,.65))
    +e(172,85,4,1.45,paper,ink,.6)+l('M107 94l49 4 50-11',mid,.8)
    +n(9,i=>l('M'+(33+i*7.1)+' '+(74-7*Math.sin(i*.4))+'l2-.35',blueD,.6))
    +n(6,i=>l('M'+(222+i*4.6)+' '+(72-i*.3)+'l2-.6',redD,.65));
  back.sas=()=>g('translate(11 0)',p('M194 78l11-27h4l6 24 9-4 1-46h3l2.5 43 7-1 1-34 4 .3 4 35 6 3-1 6Z',deep,ink,1)
    +l('M214 75l12-4m-4-26h8m-7-9h5m8 14h7m-18-24v-3m11 16 5 .4',mid,.75)
    +n(4,i=>l('M'+(203+i*3.2)+' '+(62+i*1.4)+'v8',mid,.6)));
  finish.sas=()=>n(7,i=>l('M'+(83+i*2.2)+' '+(15+i*2)+'l1 4',mid,.75))
    +n(6,i=>l('M'+(143+i*.95)+' '+(75-i*2.3)+'l3 1',deep,.75))
    +l('M159 50l11 29 7 1m-34 4 16-3m-15-41 9 2',ivory,.75)
    +p('M187 82l5-7 6-.5 1 5-8 4Z',metal,ink,.95)+bolt(193,79,1.6)
    +n(4,i=>l('M'+(244+i*5.6)+' '+(89-i*.6)+'l1 .7',deep,.7))
    +l('M256 74l5-.6m6 9 1 7',pewter,.8);
  finish.me=()=>n(8,i=>l('M'+(87+i*5.6)+' '+(89+i*.6)+'l7.8-2.3',mid,.65))
    +n(9,i=>l('M'+(143+i*3.4)+' '+(97-i*.2)+'l1.5 1.6',mid,.6))
    +g('translate(186 83) rotate(-14)',e(0,0,11,3.5,'none',mid,.75)+e(0,0,7,2,'none',mid,.5))
    +l('M146 69q10 1.4 21-4m-22-19q11 2 21-3m-25-8 5 6m24-12-7 11',ivory,.9)
    +n(4,i=>l('M'+(152+i*2)+' '+(46-i*.3)+'l.6 1.4',deep,.7));
  finish.sea=()=>n(10,i=>p('M'+(113+i*9.6)+' '+(47-i*2.2)+'l2.2-.45v2.3l-2.2.55Z',ink,'none'))
    +n(8,i=>l('M'+(118+i*3.1)+' '+(25-i*.8)+'l-.7 3',blueD,.65))
    +n(8,i=>l('M'+(185+i*2.5)+' '+(17-i*.6)+'l-.5 2.8',redD,.65))
    +n(9,i=>l('M'+(156+i*6.1)+' '+(100-i*1.5)+'l3.7-1',mid,.55))
    +l('M111 59l4-7 106-25m-59 56 28-8',ivory,.75)
    +p('M225 56l9-3-2.5 4.3-9 3Z',deep)+e(234,54,2,1.25,paper,ink,.6);
  finish.ea=()=>n(7,i=>l('M'+(85+i*4.35)+' '+(45-i*1.3)+'l1.4-.4m-2 12 1.7-.4',paper,.65))
    +n(9,i=>l('M'+(204+i*3.5)+' '+(32-i*1.05)+'l1.7-.45m-.2 11.5 1.5-.3',paper,.65))
    +l('M115.5 46l4.5-1.6v28l-4.5 1.6Zm1.3 3 2.6-.7m-2.6 6 2.6-.7m-2.6 6 2.6-.7m-2.6 6 2.6-.7',mid,.7)
    +l('M243 28l5-2v31l-4 1.4Zm1.6 5 3-.9m-3 6.5 3-1m-3 6.7 3-1m-3 7 3-1',mid,.75)
    +p('M150 75l3-1.1 2 1-2.4 2Z',deep,'none')+l('M151 76q6-2 9-1m-16 5q11-4 18-3',paper,.8)
    +n(9,i=>l('M'+(49+i*23)+' '+(90-i*.65)+'l4-1',mid,.6));
  finish.wa=()=>n(7,i=>l('M'+(94+i*11)+' '+(41-i*2.65)+'q10 .2 23 5.5m-5-2 8 2.4',mid,.65))
    +n(6,i=>l('M'+(82+i*9)+' '+(62+i*4.1)+'q4-1 9 2m-8 .4 5 1.6',mid,.68))
    +n(7,i=>l('M'+(156+i*11.7)+' '+(83-i*2.95)+'q4-2.3 8-1.6m-4 1.3 3-.65',mid,.65))
    +e(183,73,3.5,1.15,'none',deep,.7)+l('M177 75q6-4 14-3',mid,.7)
    +n(5,i=>l('M'+(64+i*2.65)+' '+(34.7+i*3.6)+'l-1.5 1.5',blue,.7));
  finish.saf=()=>n(10,i=>l('M'+(110+i*7.5)+' '+(73-i*1.6)+'l2.1 7.3m-.4 5.1 2.4 6',mid,.6))
    +n(9,i=>l('M'+(188+i*7.1)+' '+(96-(i%4)*3.9)+'l4.7-3.3m-1.6 2.9 3.5-2',mid,.67))
    +n(8,i=>l('M'+(32+i*9.4)+' '+(72-i%4*3.1)+'l3.6-1.5',pewter,.6))
    +l('M226 87q2-13 13-16m-8 16q4-13 11-15m-62-32q-1 14 1 24',pewter,.85)
    +p('M180 35l5-5 5 1 .6 5-9 3Z',metal,ink,1)+l('M183 34l3-1',deep,.7);

  // The cost of the railway and its foreign-currency debt refer to the same line.
  plates.eaf=()=>{
    const sleepers=n(17,i=>p('M'+(15+i*16)+' '+(96-i*.7)+'l5-3 22 8-5 3Z',mid,ink,.7));
    const rails=l('M17 96l273-14m-244 22 266-16',pewter,2.3);
    const carriage=g('translate(185 0)',p('M-7 40l72-4 25 6v31l-83 7-14-6Z',iron)+p('M-7 40l15 6 82-4-24-7Z',metal)
      +p('M8 47l81-4v30L8 80Z',metal)+n(10,i=>p('M'+(13+i*7.4)+' '+(49-i*.38)+'l5-.3v9l-5 .4Z',deep,paper,.7))
      +p('M8 66l81-6v3l-81 6Z',red)+e(21,81,5,7,deep,ink)+e(75,76,5,7,deep,ink));
    const locomotive=p('M57 51l20-16 74-6 25 8 6 19-1 21-87 12-39-14Z',iron,ink,1.7)
      +p('M57 51l26-5 12 14 1 27-37-12-8-11Z',metal)+p('M74 38l68-7 26 6-83 10-20 2Z',paper)
      +p('M81 48l84-9 12 17-81 9Z',metal)+p('M96 65l82-10v20L96 87Z',iron)
      +p('M58 52l20-3 5 9-23 3Z',deep,ink,1)+l('M68 51l2 8m-10 2 23-3',ivory,.9)
      +p('M86 49l10-1 5 11-9 1Z',blueD)+n(10,i=>l('M'+(111+i*5.15)+' '+(46-i*.55)+'l4-1m-5 4 6-.8m-5 4 5-.6m-5 4 5-.6',deep,.85))
      +p('M52 65l40 11 89-12-2 4-86 13-38-11Z',red,ink,.7)+p('M56 73l38 12 87-13-3 5-83 14-40-13Z',deep)
      +p('M60 78l31 10-5 5-30-10Z',metal)+l('M63 82l20 6',ivory,1.1)+e(62,67,2.5,2.5,ivory,ink,.5)
      +e(83,70,2.3,2.5,ivory,ink,.5)+n(4,i=>{let x=[99,111,155,166][i],y=[86,85,79,78][i];return e(x,y,5,6.2,deep,ink,1)+e(x+.3,y,2.1,2.8,mid,ink,.6)})
      +l('M64 39l12-8 77-6 10 3',pewter,1.2)+p('M114 32l4-7 15-1 3 6Z',deep);
    const stub=p('M39 94l45 12 47-7 8 2 18-4-45-13Z',parchment,ink,.9)
      +l('M50 94l34 8 23-4m-14-5 14-3m-5 6 18-3',mid,1)+n(6,i=>l('M'+(123+i*3)+' '+(94+i*.64)+'l-1.5 2.7',redD,.8));
    return sleepers+rails+carriage+locomotive+stub+l('M10 99l31 7m130-14 123-7',blue,1.3);
  };

  // Copper cathodes rest on one edge of an unrolled mineral-for-roads contract.
  plates.caf=()=>{
    let contract=p('M28 72q23-21 43-18l81-16q16-15 36-17l74 12q-33 10-39 38-5 17-27 22l-101 16Z',parchment,ink,1.7)
      +p('M151 39q9-21 32-22l77 13q10 3 5 10l-12 6 1-11-69-11q-17 0-25 16Z',metal,ink,1.1)
      +l('M49 72l47 20 93-18m-141 0 48 23 75-16',mid,.75)
      +n(7,i=>l('M'+(130+i*2.8)+' '+(58+i*2.8)+'l32-7m5-1 13-3',mid,.85))
      +p('M164 54l12-4 19 2 15-5 7-13 14-4', 'none',blueD,3)+l('M164 54l12-4 19 2 15-5 7-13 14-4',blue,1);
    const copper=(x,y,k)=>g('translate('+x+' '+y+') scale('+k+')',
      p('M0 3l56-17 37 9-3 8-54 18L0 10Z','#9c5b50',ink,1.4)+p('M1 3l55-17 37 9-57 18Z','#d09279',ink,1.2)+
      p('M36 13l55-18-1 7-54 18Z','#713f43',ink,.8)+n(6,i=>l('M'+(13+i*7)+' '+(1-i*1.75)+'l8-2m-4 3 12-3','#edb19a',.8)));
    const seal=g('translate(212 78) rotate(-14) scale(1 .48)',e(0,0,19,19,'none',redD,2)+e(0,0,15,15,'none',redD,1)+n(12,i=>g('rotate('+i*30+')',l('M0-14v2',redD,1.5)))+p('M-8 5l6-13 9 13Z','none',redD,1.3));
    return contract+copper(43,77,1)+copper(41,69,1)+copper(48,60,.94)+p('M70 55l17-6 25 7-2 26-5 2 1-25-23-7-11 5Z',deep,ink,.75)
      +p('M99 48l8-2 24 5-1 23-4 2v-22Z',blueD,ink,.7)+seal+
      p('M173 100l72-20 34-32 7 3-34 35-73 19Z',iron,ink,1.1)+l('M181 101l67-19 32-32',ivory,.85)+e(248,84,2.5,1.8,metal,ink,.7);
  };

  // The strip of interest coupons is attached to the same bond as the red issue seal.
  plates.cas=()=>{
    const bond=g('translate(50 54) matrix(1 -.17 .28 .78 0 0)',
      p('M0 0h205v70h-205Z',iron,ink,1.6)+p('M0-4h205v69H0Z',parchment,ink,1.5)
      +p('M5 1h153v59H5ZM10 6h143v49H10Z','none',blueD,1.1)
      +n(16,i=>{let x=14+i*8.9;return l('M'+x+' 9q4-7 8 0t8 0m-16 42q4 7 8 0t8 0',blueD,.7)})
      +e(82,30,35,18,'none',blueD,1)+n(7,i=>e(82,30,32-i*2.3,16-i*.65,'none',blueD,.55))
      +p('M66 36l9-10 5 4 9-13 12 18Z',mid,blueD,.8)+l('M69 35l6-7 5 4 9-13 7 10',ivory,1)
      +n(3,i=>p('M162 '+(i*22)+'h39v18h-39Z','none',mid,.85)+l('M166 '+(4+i*22)+'h23m-22 4h15m2 4h10',mid,.7))
      +n(12,i=>l('M160 '+(i*5)+'v2',deep,.75))+l('M17 39h17m-17 4h13m90-25h14m-16 3h17',mid,.9));
    const wax=g('translate(183 75) rotate(-8)',p('M-8 0l-3 26 7-6 4 5 5-26m0 1 7 21 4-6 5 3-7-22Z',redD,ink,1)
       +e(0,0,16,11,redD,ink,1.2)+e(-1,-2,13,8,red,ink,1)+e(-1,-2,9.5,5.3,'none',redD,.8)
       +l('M-7 0l4-5 3 3 3-4 5 5',redD,.9));
    return p('M35 65l181-36 48 16-21 30-172 31Z',paper,ink,1.1)+n(5,i=>l('M'+(59+i*3)+' '+(88+i*2.1)+'l50-9',mid,.55))+bond+wax;
  };

  // Grab, hanging scale and stone share a single load path.
  plates.oc=()=>{
    const stones=[[25,88,8],[41,94,7],[50,80,11],[64,89,12],[80,90,6],[102,89,9],[121,82,9],[139,91,11],[170,88,8],[187,83,7],[203,91,10],[235,90,8]];
    const bed=p('M13 96l167-26 101 15-181 26Z',iron,ink,1.7)+p('M14 96l87 14 178-25-10 9-170 21-74-13Z',deep,ink,1)
      +stones.map(([x,y,r],i)=>g('translate('+x+' '+y+')',p('M0 0l'+(r*.34)+' -'+(r*.7)+' '+r+' -'+r+' '+(r*1.6)+' -2 -'+(r*.05)+' 3Z',i%2?'#ad786d':'#845d60',ink,.9)+l('M2-1l5-4 3 1','#d99b81',.8))).join('');
    const dial=g('translate(245 70)',p('M-12 9l-6 20 30-3-5-18Z',iron)+e(0,0,17,19,metal,ink,1.4)+e(0,0,13,15,deep,paper,.8)
      +n(9,i=>g('rotate('+(-110+i*28)+')',l('M0-12v2.8',i>4?red:blue,1.2)))+l('M-7 8L6-9',ivory,1.4)+e(0,0,2.3,2.3,paper,ink,.5));
    const grab=l('M115 0l3 25m9-25-4 25m28-25-6 24m12-24-7 24',pewter,1.4)+
      p('M113 22l14-3 25 4 2 6-32 6-14-8Z',metal,ink,1.35)+bolt(124,27)+bolt(146,25)+
      p('M116 29l4-1 17 25 19 13-5 4-20-13Z',metal)+p('M145 28l5-1-12 22-24 21-6-3 24-24Z',iron)
      +p('M94 49l10-3 21 16 8 13-19-3-17-9Z',metal,ink,1.5)+p('M94 49l5 13 16 9 18 4-17 3-20-9-7-14Z',deep,ink,1.1)
      +p('M168 47l8 9-8 16-15 8-15-1 16-12Z',metal,ink,1.5)+p('M168 47l-14 19-16 13 13-27Z',iron,ink,1.1)
      +l('M103 51l14 13m44-8-8 12',ivory,1)+bolt(101,53)+bolt(167,54)+bolt(135,49);
    return bed+dial+grab+l('M20 98l35 5m114-4 44-6',blue,1.55)+l('M215 94l39-6',red,1.55);
  };

})();
