(() => {
  const ink='#0a1525', dark='#293a50', slate='#5b6e88', steel='#8ea0b6', bone='#cbd3e0', light='#ebdfe1';
  const rust='#96596d', copper='#dd997f', umber='#694459', glass='#85b4ca';
  const metal='url(#cg-metal)', brass='url(#cg-brass)', cast='url(#cg-cast)', drawings={};
  const p=(d,f=bone,s=ink,w=1.3)=>'<path d="'+d+'" fill="'+f+'" stroke="'+s+'" stroke-width="'+w+'"/>';
  const l=(d,s=ink,w=.95)=>p(d,'none',s,w);
  const e=(x,y,rx,ry,f=bone,s=ink,w=1.1)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+f+'" stroke="'+s+'" stroke-width="'+w+'"/>';
  const g=(t,body)=>'<g transform="'+t+'">'+body+'</g>';
  const n=(count,fn)=>Array.from({length:count},(_,i)=>fn(i)).join('');
  const shadow=(x,y,rx,ry)=>e(x,y,rx,ry,'#10191a','none')+e(x-2,y-.25,rx*.76,ry*.56,'#091214','none');
  const bolt=(x,y,sz=1.65)=>e(x,y,sz,sz*.85,bone,ink,.72)+l('M'+(x-sz*.52)+' '+(y+.32)+'l'+sz+' -.75',dark,.56);
  const grad=(id,stops)=>'<linearGradient id="cg-'+id+'" x2=".12" y2="1">'+stops.map(([x,c])=>'<stop offset="'+x+'" stop-color="'+c+'"/>').join('')+'</linearGradient>';
  const defs='<defs>'+grad('metal',[[0,'#e4deca'],[.25,'#a1a79b'],[.49,'#c4c5b5'],[.7,'#808a85'],[1,'#4a5655']])+grad('brass',[[0,'#edcf9e'],[.22,'#c49367'],[.50,'#eed2a1'],[.78,'#a66f4e'],[1,'#684c40']])+grad('cast',[[0,'#9da59a'],[.34,'#6e7975'],[1,'#374445']])+'</defs>';
  let serial=0;
  window.cargoCut=(hs,direction)=>{
    const draw=drawings[String(hs)]; if(!draw)return '';
    const out=direction==='out'||direction==='exports'||direction==='X'||direction===true;
    return ('<svg class="good-cut" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 63" aria-hidden="true" stroke-linejoin="round" stroke-linecap="round">'+defs+draw(out)+'</svg>').replaceAll('cg-','cg-'+(++serial)+'-');
  };

  const insulator=(x,y,size)=>g('translate('+x+' '+y+') scale('+size+')',
    p('M-1.8 2v-18l3-.4V1Z',brass)+n(4,i=>p('M-4 '+(-2-i*3.25)+'q4-2.5 8-1l1.1 1.2q-5.1 3.4-9.8 1Z',metal,ink,.7))+e(0,-16,2.4,1.25,brass,ink,.75));
  drawings['85']=out=>out
    ? shadow(44,54,34,4)+p('M14 48l41-10 18 7-41 13-20-5Z',cast)+p('M26 47l3-11 7-2 3 10 12-2 1-9 8-2 4 12-35 10Z',metal)
      +p('M23 23l29-9q13-2 17 13t-5 16l-31 9q-12-6-10-29Z',cast,ink,1.6)
      +n(10,i=>{const x=26+i*3.55,y=23-i;return l('M'+x+' '+y+'q10 6 9 25',i%2?steel:dark,1.35)})
      +p('M36 15l15-5 10 3-16 6Z',bone)+p('M36 15l9 4v6l-9-3Zm9 4 16-6v7l-16 5Z',cast)
      +e(25,36,12.5,16,metal,ink,1.65)+e(24,36,9.3,12,cast,ink,1.1)+e(22.5,36,5,7,dark,bone,.8)
      +p('M21 32l-12 3q-4 3-1 8l15-3q3-5-2-8Z',metal)+e(8.5,39,2.2,4,steel,ink,.9)+l('M11 36l9-2',light,.8)
      +bolt(20,25,1.5)+bolt(31,44,1.4)+l('M45 28l11-3m-12 6 12-3',bone,.65)
    : shadow(44,54,34,4)+p('M10 45l30-10 34 7 1 6-32 12-33-9Z',cast,ink,1.5)+p('M10 45l30-10 34 7-31 11Z',metal)
      +p('M16 43l4-20 8-2 2 3-4 23Zm40 0 4-24 8-2 4 3-4 24Z',cast)+insulator(21,27,.96)+insulator(65,23,1)
      +g('translate(42 34) rotate(-15)',e(2,1,21,19,umber,ink,1.6)+e(-1,0,20,19,brass,ink,1.55)+e(-2,0,8,8,dark,ink,.95)
      +n(30,i=>{const a=i*Math.PI/15,c=Math.cos(a),s=Math.sin(a);return l('M'+(-1+c*19.6)+' '+(s*18.4)+'Q'+(-1+c*14-s*2)+' '+(s*14+c*2)+' '+(-2+c*8)+' '+(s*7.9),i%3===0?light:umber,i%3===0?.7:1.03)}))
      +l('M29 45q-5 4-11 0l-2-9m41 1q7-2 9-10',copper,1.85)+bolt(17,47)+bolt(67,44);

  drawings['84']=out=>out ? shadow(45,55,31,4)+g('translate(44 32) rotate(-13) scale(1 .83)',
      e(1,4,29,27,cast,ink,1.7)+e(0,0,29,27,metal,ink,1.5)+e(0,0,25.5,24.4,dark,ink,1.3)
      +n(8,i=>g('rotate('+i*45+')',p('M-3-4Q-15-13-9-23l6-1q-10 10 3 17Z',metal,ink,1.05)+l('M-3-7q-10-9-5-16',light,.7)))
      +e(0,0,10,9,brass,ink,1.35)+e(0,0,5.3,4.8,dark,ink,1.15)+p('M-2-4l1-4 3 .2v4Z',ink,'none')
      +n(8,i=>g('rotate('+i*45+')',l('M0-26l4 .3',light,.7))))
    : shadow(45,55,32,4)+p('M15 53l34-10 22 3-7 7-39 6Z',cast)
      +p('M27 51l4-13 12-5 7 7 7 7 8-.5 3 3-10 4-10-8-9 2-3 6Z',metal)
      +p('M22 27q7-9 18-8l13-6 1-5 11-1 2 17-16 5q10 13 1 21-12 10-28 1-11-8-8-17Z',metal,ink,1.75)
      +p('M51 16l12-5 4 10-13 5Z',cast)+e(60,8,9,3.5,metal,ink,1.25)+e(60,8,5.6,1.65,dark,ink,.6)
      +e(33,36,15.5,15,cast,ink,1.4)+l('M22 32q8-13 18-4t-1 17q-7 5-15-1',bone,1.35)
      +p('M31 33l-14 3-3 5 4 5 16-4q5-5-3-9Z',metal)
      +e(15,41,5.5,8,cast,ink,1.2)+e(15,41,2.5,4.4,ink,steel,.8)+bolt(24,24)+bolt(44,42)+bolt(26,48)+bolt(61,24,1.2);

  const drum=(x,y,sz)=>g('translate('+x+' '+y+') scale('+sz+')',p('M-12-16q12 5 25-1l.5 31q-11 8-25 1Z',metal,ink,1.4)
    +e(.3,-16,12.5,4.5,metal,ink,1.05)+e(.7,-16,9,2.6,'none',slate,.8)+e(5,-16,2.1,1.1,dark,ink,.65)
    +n(2,i=>p('M-12 '+(-8+i*16)+'q12 4.9 25-1v2.6q-13 5.5-25 1Z',cast,ink,.7))
    +l('M-8-10v3m0 4v5m-.2 11 6 1.4',light,.9)+l('M8-9l.3 3m.4 3 .2 6',slate,.9));
  drawings['27']=out=>out ? shadow(42,55,34,4)+p('M15 51l14-37h6l14 38-7 .7-10-29-9 29Z',cast,ink,1.5)
    +p('M26 15l3-6 7-2 4 6-8 4Z',metal)+p('M31 9V4l2-1v6Z',bone,ink,.8)
    +n(4,i=>{const y=21+i*7.3,w=4+i*2.3;return l('M'+(32-w)+' '+y+'l'+(w*2+3)+' 7m-2-7l-'+(w*2+2)+' 7',steel,1)})
    +p('M10 53l20-5 25 3-21 7Z',metal)+drum(65,41,.8)+drum(50,49,.51)
    : shadow(43,55,31,4)+g('rotate(11 48 31)',drum(49,30,1.34))+g('rotate(-10 23 45)',drum(23,43,.67))
      +p('M47 54l6-6 8-1 5 4 9 1-5 5-17 2Z',cast)+l('M51 54l8-4 3 3m3-2 4 3',steel,.85);

  function wheel(x,y,rx,ry){
    return e(x,y,rx,ry,ink,ink,1.3)+e(x,y,rx*.7,ry*.77,dark,steel,.75)+e(x,y,rx*.34,ry*.4,metal,ink,.7);
  }
  drawings['87']=out=>out ? shadow(43,54,34,4)+wheel(54,45,5,8)+p('M7 25l39-10 16 7-1 19-41 12-12-8Z',metal)
    +p('M8 25l39-10 14 6-40 11Z',bone)+p('M20 31l41-10v20L20 52Z',cast)
    +n(9,i=>l('M'+(24+i*4)+' '+(32-i*1.04)+'v14.8',slate,.85))
    +p('M43 41l8-11 17-5 9 6 3 13-8 7-22 4-11-4Z',metal,ink,1.5)
    +p('M54 32l12-4 7 5-15 5-6-.7Z',dark)+l('M58 33l6-2',glass,.85)+p('M72 34l5-.9 2 6-6 2Z',dark)
    +wheel(21,48,5,7)+wheel(48,49,5.5,7.4)+wheel(72,46,5,6.4)+l('M58 45l10-3m-10 6 8-2',slate,.85)+p('M75 41l4-1v2l-4 1Z',light,ink,.5)
    : shadow(43,51,34,4)+wheel(58,43,5,7)+p('M7 34l9-4 11-11 21-5 13 6 8 9 10 4-1 8-12 6-44 7-13-5Z',metal,ink,1.65)
      +p('M27 31l5-10 15-4 9 4 8 9-17 3Z',dark)+p('M30 30l5-7 11-3-1 11Z',glass,ink,.85)
      +p('M49 19l7 3 6 7-14 3Z',slate,ink,.85)+l('M32 22l13-3m8 6 5 3',bone,.7)
      +p('M7 35l25 1 12-.5 22-5 12 3-32 10-30 3-9-2Z',metal)+wheel(24,45,6.5,8)+wheel(65,40,5.7,7.6)
      +l('M32 38l1 9 17-3 2-9m-7 .5 2-.5',dark,.9)+p('M9 38l10-1-2 3-8 1Z',light,ink,.6)+l('M9 44l9 1',slate,1.3);
  function ore(x,y,sc,tint){
    return g('translate('+x+' '+y+') scale('+sc+')',p('M-14 1l8-12 13-2 9 8-4 12-15 5-12-5Z',cast,ink,1.4)
      +p('M-14 1l8-12 13-2-5 10-10 6Z',tint,ink,.85)+p('M2-3l5-10 9 8-2 6-8 3Z',slate,ink,.85)
      +l('M-11 2l6-3 3-4 5 1m-4 5L4 0l3 3 5-2',bone,.85)+p('M-3-6l4-3 2 .4-2.4 3Z',copper,ink,.52));
  }
  drawings['26']=out=>out
    ? shadow(45,55,33,3.4)+p('M9 39l35-19 32 10-27 23-22 4-16-9Z',cast,ink,1.45)+p('M10 38l32-20 34 10-29 22-19 4-15-8Z',metal)
      +p('M16 38l26-15 27 6-25 18-15 3Z',dark,ink,.85)
      +n(27,i=>{const row=i%3,j=Math.floor(i/3),x=24+j*3.95+row*4.5,y=39-j*1.58+row*2.5;return p('M'+x+' '+y+'l1.1-2.1 2.3-.5 1.6 1.3-1.7 2.3-3 .35Z',i%5===0?copper:i%3===0?bone:steel,ink,.65)})
      +ore(54,25,.52,steel)+ore(42,27,.45,bone)+l('M20 48l8 3 15-3m7-2 20-14',bone,.85)
    : shadow(43,54,32,4)+ore(57,40,1.08,steel)+ore(27,41,1.08,bone)+ore(43,24,1.22,steel)+ore(43,49,.67,bone)
      +n(5,i=>l('M'+(34+i*2.2)+' '+(20-i*1.5)+'l2-1.7',slate,.62))+p('M63 54l2-4 4-1 3 3-4 3Z',cast,ink,.85);

  function ingot(x,y,size){
    return g('translate('+x+' '+y+') scale('+size+')',p('M-18-3l22-10 15 4 4 10-25 12-18-5Z',brass,ink,1.2)
      +p('M-18-3l22-10 15 4-23 11Z',light,ink,.85)+p('M-4 2l23-11 4 10-25 12Z',brass,ink,.85)
      +l('M-16-2l11 3 18-8m-6 5 5-2.2',copper,.7)+e(6,-6,3.2,1,'none',rust,.65));
  }
  function gem(x,y,sz){
    return g('translate('+x+' '+y+') scale('+sz+')',p('M-13-1l5-7 13-2 9 5-1 4L1 12Z',bone,ink,1.2)
      +p('M-13-1l5-7 5 4-3 5Z',glass,ink,.8)+p('M-3-4l-5-4 13-2 4 5Z',light,ink,.75)+p('M-3-4l12-1-4 6-11 0Z',steel,ink,.8)
      +p('M5 1l8-5-1 4L1 12Z',rust,ink,.65)+l('M-6 1L1 12 5 1',light,.68));
  }
  drawings['71']=out=>out
    ? shadow(45,54,28,3.4)+g('translate(53 39) rotate(24)',e(0,0,17,13,'none',ink,6.8)+e(0,0,17,13,'none',brass,4.3)+l('M-16-4q3-9 11-9',light,1.05))
      +g('translate(34 37) rotate(-24)',e(0,2,15,18,'none',ink,7.3)+e(0,1,15,18,'none',brass,4.8)+l('M-14 4q-1 6 5 11',light,.95))
      +p('M27 25l-5-8 4-.5 7 6 4-9 4 1-3 12-6 3Z',brass)+gem(29,16,1.03)
    : shadow(45,53,33,4)+ingot(26,45,.9)+ingot(54,42,.98)+ingot(45,30,1.1)+gem(18,31,.54);

  const cabin=(x,y,s)=>g('translate('+x+' '+y+') scale('+s+')',p('M-7 1v-10l10-4 10 3-.3 12-10 4Z',metal,ink,1)
    +p('M-9-11l12-5 12 3-12 5Z',bone,ink,.85)+n(4,i=>p('M'+(-6+i*3.6)+' '+(-8+i*.55)+'l2.2 .2v2.5L'+(-6+i*3.6)+' '+(-5.6+i*.55)+'Z',ink,'none'))
    +p('M3-14l-.5-6 4-1 4 1-.3 6Z',rust,ink,.8)+l('M-4-12v-8m-3.2 3 6-1',steel,.75));
  drawings['89']=out=>out
    ? shadow(44,54,31,3.4)+p('M11 40l49-25 16 8 1 11-19 18-25 8-20-10Z',cast,ink,1.5)
      +p('M11 39l18-12 33-9 14 5-44 22Z',metal,ink,1.1)+p('M11 39l21 6 44-22-1 10-39 23-17-6Z',cast)
      +p('M11 39l20 5 4 12-4 4-12-9Z',metal)+l('M37 47l36-19m-38 25 23-13',bone,.88)
      +cabin(59,22,.68)+n(6,i=>{const x=24+(i%3)*7+Math.floor(i/3)*7,y=34-(i%3)*3-Math.floor(i/3)*4;return p('M'+x+' '+y+'v-5l6-3 8 2v5l-7 4Z',i%2?cast:brass,ink,.85)+l('M'+(x+2)+' '+(y-5)+'l5 1m1 1 5-2',steel,.55)})
      +e(22,45,1.7,1.3,ink,steel,.65)+l('M21 47q-1 3 2 4',bone,.7)
    : shadow(43,52,35,3.4)+p('M4 38l13 2 9-4 33-2 17-7 6 1-5 13-12 7-41 5-12-5Z',cast,ink,1.5)
      +p('M4 38l13 2 9-4 33-2 17-7 6 1-18 10-44 6Z',bone)+l('M14 47l9 3 41-6 12-6',copper,1.15)
      +cabin(60,34,.83)+l('M27 37V19l3-4 9 21m-10-18 16 5-2 3m-7-1v7',steel,1.2)
      +p('M24 36l14-2 5 2-15 3Z',brass)+p('M42 34l10-2 5 2-11 3Z',brass)+n(7,i=>e(29+i*4.5,42-i*.45,1,.6,ink,'none'))
      +l('M15 53l-6 1m18 0 14-1m16-3 11-1',slate,.65);

  const bean=(x,y,a,size)=>g('translate('+x+' '+y+') rotate('+a+') scale('+size+')',
    p('M-6-1q1-6 7-5 6 .7 5.4 5.4-.7 5-7 5.5-6.3.1-5.4-5.9Z',brass,ink,1)
    +l('M-2-2q2.1-1.4 4 .3',umber,1)+l('M-4-1q.6-2.8 3.8-3.4',light,.7));
  drawings['12']=out=>out
    ? shadow(41,54,29,3.1)+g('translate(39 28) rotate(-14)',n(20,i=>g('rotate('+i*18+')',p('M-3.5-13q-4-7-.5-12Q2-20 3-14Z',i%3===0?copper:bone,ink,.85)))
      +e(0,0,15,14.4,brass,ink,1.1)+n(52,i=>{const a=i*2.39996,rr=Math.sqrt(i/52)*13;return e(Math.cos(a)*rr,Math.sin(a)*rr,.85,1.15,i%3?umber:bone,ink,.43)}))
      +g('translate(59 46) rotate(39)',p('M-3-8q6 1 6 7t-4 9q-5-6-4-11Z',dark,ink,1)+l('M-1-6q4 8 1 12',bone,1.1))
      +bean(46,52,13,.64)+bean(69,43,-50,.63)
    : shadow(42,53,30,3.2)+p('M18 46q-5-9 .5-18 4-4 12-5 6-6 13-5 10-8 19-8l5-4-3 8q-4 16-17 24-13 12-29 13Z',cast,ink,1.45)
      +p('M19 44q.5-10 7-12 7-6 11-5 9-9 17-8l9-6q-4 17-18 25-14 9-26 6Z',bone,ink,1)
      +bean(28,37,-26,.84)+bean(40,31,-29,.88)+bean(53,23,-35,.85)
      +p('M17 46q21 4 44-22-8 18-23 24-14 5-21-2Z',steel,ink,1)+l('M22 47q11 2 25-8',light,.7)
      +bean(58,45,12,.95)+bean(68,39,-37,.72);

  const pipe=(x,y,s)=>g('translate('+x+' '+y+') rotate(-16) scale('+s+')',p('M-15-6l32-3q6 1 7 7.5.5 5.4-5 6.8l-32 4Z',metal,ink,1.25)
    +e(-14,1.3,7.3,9.5,metal,ink,1.1)+e(-14.4,1.3,4.8,6.6,dark,ink,.85)+l('M-17 5q-4-7 1-10',slate,.72)
    +l('M-6-5l22-2.2m-19 12 18-1.8',bone,.72));
  drawings['39']=out=>out
    ? shadow(45,54,32,4)+pipe(35,43,1.09)+pipe(56,43,.91)+pipe(45,29,1.03)
      +p('M41 20l7-2 5 5-2 7-4 1 2-7Z',brass,ink,.85)
    : shadow(43,55,33,3.1)+p('M11 41l17-18q12-7 23-3l6 5 18-12q3-2 5 1 1 2-1 4L59 33q-3 10-15 19-9 4-22 2Z',metal,ink,1.5)
      +p('M13 40l17-16q12-7 21-1l3 4q-17 7-25 19Z',cast,ink,.95)
      +p('M13 40l16 6 25-20 4 3q-2 10-17 20l-13 5-11-5Z',metal,ink,1)
      +n(21,i=>{const x=20+(i%7)*3.1+Math.floor(i/7)*4.1,y=40-(i%7)*1.55+Math.floor(i/7)*1.25;return p('M'+x+' '+y+'l.4-2.5 2.6-1 2 1.5-.4 2.3-2.5 1Z',i%4===0?copper:bone,ink,.66)})
      +n(6,i=>{const x=13+i*5.4,y=49+i%3*2.3;return p('M'+x+' '+y+'l.5-2.1 2.5-.7 1.3 1.5-.5 2.2-2 .5Z',metal,ink,.72)})
      +l('M61 28l14-10',light,.78);

  drawings['40']=out=>out
    ? shadow(43,55,29,3.5)+g('translate(42 32) rotate(-17)',
        p('M-20-7q3-17 20-18l8 3q17 4 15 22-3 20-19 23l-9-.5q-18-3-15-29.5Z',cast,ink,1.7)
        +e(3,0,18.8,24,cast,ink,1.4)+e(4,0,12.1,16.7,dark,ink,.9)+e(5.3,0,9.7,14.4,'#152528',steel,.85)
        +e(2,0,16.8,21.8,'none',slate,.8)
        +n(17,i=>{const a=-Math.PI*.6+i*Math.PI*1.2/16,x=-2-19*Math.cos(a),y=22.5*Math.sin(a);return l('M'+x+' '+y+'l4.5-1.7 2.8 1',i%4===0?steel:dark,.95)})
        +n(13,i=>g('rotate('+(i*22-138)+' 3 0)',l('M3-20.7l1.4 1.2',steel,.62))))
    : shadow(43,55,27,3.3)+p('M28 52q8-11 8-23l-3-20 7-4 13 1 3 11-3 15 5 19 5 4-18 3Z',cast,ink,1.55)
      +p('M35 10q12 2 20-2l-1 11-15 14-3 3Z',brass,ink,.9)
      +n(5,i=>l('M'+(36+i*.45)+' '+(13+i*3.7)+'q8 0 16-8',i%2?bone:umber,.95))
      +l('M52 15l-6 16-7 3-1 7',light,1.55)+p('M37 32l6-2-1 4-5 2Z',metal,ink,.75)
      +p('M25 40l20-1-2 9q-8 7-15 1Z',cast,ink,1.3)+e(35,39.6,10,2.95,bone,ink,1)+e(35,39.8,6.8,1.2,light,'none')
      +l('M28 44q7 4 15-.5m5-7q0 10 5 16m-12-2-3 3m12-42 2 1',steel,.8)
      +p('M56 51l8-4 9 3-3 4-12 3Z',bone,ink,1)+l('M58 52l10-2',slate,.72);

  function cathode(x,y,s){
    return g('translate('+x+' '+y+') scale('+s+')',p('M-16-11l3-1 1-4 4-1 1 3 16-4 1-4 4-.5 1 4 3 .2.4 30-33 9Z',brass,ink,1.15)
      +p('M-15-10l29-7 .1 27-28 8Z',copper,umber,.55)+l('M-13-9l24-6m-1 23-19 5',light,.7)
      +n(12,i=>{const xx=-10+(i%4)*5.3,yy=-4+Math.floor(i/4)*5.1-(i%4)*1.25;return l('M'+xx+' '+yy+'l1.8 -.65',i%3===0?light:rust,.65)}));
  }
  drawings['74']=out=>out
    ? shadow(42,55,31,3.7)+p('M18 32l19-13 23 3 9 17-23 15-20-3Z',umber)
      +g('translate(39 33) rotate(-20)',e(-7,0,16,23,brass,ink,1.35)+p('M-7-23l23 2 1 43-24 1Z',brass,ink,1.2)
        +n(15,i=>l('M'+(-7+i*1.65)+' -20q17 13 1 40',i%3===0?light:umber,.95))
        +e(16,0,15.5,22.2,brass,ink,1.3)+e(16,0,10.6,15.1,umber,ink,.85)+e(16,0,6.5,9.1,dark,copper,.95)
        +n(3,i=>e(16,0,11.4+i*1.35,16.3+i*1.72,'none',i%2?light:rust,.6)))
      +l('M58 46q9 7 16 0 4-4 2-7',copper,1.85)
    : shadow(43,55,30,3.5)+cathode(31,34,.91)+cathode(39,32,1)+cathode(48,33,1.1)
      +p('M51 48l13-6 7 1-11 8-11 3Z',brass,ink,.9)+l('M53 50l10-5',light,.65);

  const flameGlass=(x,y,sc)=>g('translate('+x+' '+y+') scale('+sc+')',p('M-4-17h8l-.5 4-2 .5.6 9q11 8 10 15-1 8-12 8t-12-8q-.4-6 10-15l.1-9-2-.2Z',glass,ink,1.2)
    +p('M-9 6q5 1 10-.7 5-1.3 8-.1 4 11-9 11-12 0-9-10Z',brass,ink,.75)
    +l('M-1.5-11l-.4 10q-7 6-8 10',light,1.1)+e(.1,-16.7,4,1.2,metal,ink,.6));
  drawings['29']=out=>out
    ? shadow(42,54,30,3.2)+g('translate(10 3)',p('M6 21l5-2 .5-7 10-.5v7l7 3 1.5 23-3 4-21 .4-2-4Z',cast,ink,1.3)
        +p('M9 31q7 3 17 0l1 12-3 2-15-.4Z',brass,ink,.75)+p('M10 10l12-.6v6l-12 .5Z',metal)+l('M8 25v10m3-2 1 7',light,.8))
      +g('translate(49 33) rotate(-11)',l('M-13-7l13-7 13 7v15L0 15l-13-7Z',bone,2.25)
        +l('M-9-5l8-4m11 5v9m-19 0 8 4',slate,1.25)
        +n(6,i=>{const a=(i*60-90)*Math.PI/180;return e(15*Math.cos(a),15*Math.sin(a),3.4,3.3,i%2?steel:bone,ink,.9)})
        +l('M13-7l7-4',bone,1.8)+e(22,-12,3.7,3.4,copper,ink,1))
    : shadow(43,55,31,3.5)+p('M10 53l49-8 16 3-49 10Z',cast)+p('M16 51l2-38 3-1-.8 38Z',metal,ink,.9)
      +p('M16 24l12-2 3 2-1 3-13 1Z',metal,ink,.8)+flameGlass(32,33,.94)
      +p('M33 19l4-5 7 1 19 16 1 7-3 1-1-6-19-14-4 .7-2 2Z',glass,ink,.95)
      +p('M41 14l4-2 19 15-3 5Z',metal,ink,.95)+n(5,i=>l('M'+(44+i*3.1)+' '+(16+i*2.45)+'l2-2',slate,.68))
      +p('M58 37l7-1v3l-1 1 5 7q2 3-2 4l-12 1q-3-.9-.5-4l5-8Z',glass,ink,1)
      +p('M56 46l10-1 2 4-13 .7Z',brass,ink,.55)+l('M45 15l14 11',light,.75);

  function crystal(x,y,sz,rotate){
    return g('translate('+x+' '+y+') rotate('+rotate+') scale('+sz+')',p('M-9-5L0-10l12 4v10L2 11-9 6Z',metal,ink,1.05)
      +p('M-9-5L0-10l12 4L2 0Z',light,ink,.75)+p('M-9-5L2 0v11L-9 6Z',bone,ink,.7)+l('M-6 3l5 2m5 1 5-3',steel,.6));
  }
  drawings['28']=out=>out
    ? shadow(45,54,31,3.2)+g('translate(49 28)',l('M-15-9l16-9 17 6v19L3 18l-18-7Zm0 0L2-2l16-10M2-2l1 20m-2-36 .4 17',steel,1.65)
      +n(7,i=>{const pts=[[-15,-9],[1,-18],[18,-12],[18,7],[3,18],[-15,11],[2,-2]],xy=pts[i];return e(xy[0],xy[1],3.45,3.45,i%2?bone:copper,ink,.95)}))
      +crystal(27,44,.86,1)+crystal(15,48,.53,-12)+crystal(47,50,.55,9)
    : shadow(43,55,32,3.7)+p('M11 36q30-15 63-5-2 19-29 25-23 3-34-20Z',metal,ink,1.55)
      +e(42,34,30.5,8.8,cast,ink,1.2)+e(42,34,26,5.5,slate,ink,.75)
      +crystal(29,30,.91,-13)+crystal(48,24,1.05,6)+crystal(56,33,.61,1)+crystal(38,36,.65,-3)
      +p('M14 38q22 9 57-3-4 9-17 15-19 9-32-1Z',metal,ink,1.0)+l('M21 40q16 4 36-1m-31 9 9 3',light,.9);


  // Cured tobacco leaves retain their midrib and paired branching veins when reduced.
  function curedLeaf(x,y,angle,scale) {
    return g('translate('+x+' '+y+') rotate('+angle+') scale('+scale+')',
      p('M0 0Q-15-5-12-18q1-9 9-20l4-9q1 8 7 13 10 10 6 19Q12-5 0 0Z','#ba8369',ink,1.45)
      +p('M0 0Q-8-14-5-24l6-21q-3 15 1 22L0 0Z','#8b6059','none')
      +l('M-2 5Q4-12 0-27-1-37 1-45',bone,1.05)
      +l('M1-9q-4-2-9-9m10 3q4-1 8-8m-8 1q-4-2-7-8m6 2q3-2 5-6',brass,.85));
  }
  drawings['24']=()=>shadow(43,54,34,4)+curedLeaf(45,48,-56,.87)+curedLeaf(48,49,-16,.98)+curedLeaf(48,49,31,.94)
    +p('M37 42q6 3 13 2l4 7q-10 2-16-4Z',metal,ink,.9)+l('M39 45l12 4m-6 1 7 4',light,.7);
})();
