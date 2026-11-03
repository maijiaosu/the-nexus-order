/* The regional exchange and hanging political folio meet the chart at its eastern edge. */
window.DiplomaticHardware=(()=>{
 const {path,line,circle,range,group}=AtlasArt;
 const ink='#081523', silver='#8ca6ba';
 const bolt=(x,y,r)=>circle(x,y,r,ink,silver,.8)+line(`M${x-r*.53} ${y+r*.45}l${r} -${r*.82}`,.8,silver);
 function caseFoot(id){
   const pipe=d=>line(d,7,'#101e31')+line(d,3.5,'#637e96')+line(d,1,'#acc7d9');
   switch(id){
    case 'na': {let a='';    // A flat slotted coupling projects over the chart. It only appears at the point of contact.
   a+=path('M1085 345q15-16 40-11l49 10 18-9 21 4 16 11 258-7 16-10 28-4 15 5-17 18-35 9-262 7-29 11-34-5-14-16-37-9-24 12Z','#294459','#738da6',1.2);
   a+=line('M1100 345l20-5 52 13 23-8 27 9 268-6 27-11',1,'#abc2cd');
 return a;}
    case 'sa': return path('M1133 326q54-22 152-8l100-9 39 19q-58 24-105 47l-112-13-57 8 20-22Z','#202e45','#8092aa',1.1)+path('M1202 362l117 13 91-43-7 9-81 38-119-12Z','#53556e')+line('M1160 329l69 5m-60 1 60 6m88 21 60-27',1,'#8792a7');
    case 'we': return line('M1060 346q38-5 72 2t83 0m30 4q86 3 144-10m27-2 100-12m-380 32q40 4 71 0m52 2 40-3m49-1 61-5',1.3,'#528ba7')+line('M1095 342l46-3m301-10 52-7m-279 38 37-2',1.2,'#8aafc6');
    case 'ee':return path('M1191 328q-18 10-20 29-2 15-21 18l-42-4 4 8 43 6q21-2 29-22 3-15 26-25Z','#457693','#8ab8cd',1)+range(12,i=>line('M'+(1119+i*3.5)+' '+(375+i*.4)+'l2 2',.85,'#142539'))+path('M1398 335q22 13 67 4l36-14 13 3-18 10-35 12q-45 6-64-7Z','#805369','#bc8298',1);
    case 'me':return path('M1125 337l107-33 79 12 94-8 103 19-50 17-83 6-47 18-114-14-62 8Z','#302c40','#95869e',1)+line('M1141 337l94-27 81 13 88-8 84 15-31 10-81 5-49 18-112-12-52 6Z',1,'#8a7f93')+range(15,i=>line('M'+(1198+i*5)+' '+(349+i*.56)+'l6-2',.8,'#ac99a9'));
    case 'sas':return pipe('M1114 342l24 7h42l14-9h85m100 11 15 8h86l19-15h35')+range(3,i=>path('M'+(1137+i*33)+' 343v12h5v-12Z','#7792a6','#223043',.9));
    case 'sea':return path('M1144 336l112 8 186-16 62-18v10l-61 17-187 17-114-8Z','#284859','#678a9f',1)+range(18,i=>line('M'+(1259+i*9)+' '+(346-i*.8)+'l1 4',.8,'#93aab7'));
    case 'ea':return pipe('M1173 330v15q0 10 12 12h41q16 0 26-10l37-24')+pipe('M1340 324l28 19q19 13 35 12l56-5q16-1 16-12v-18')+circle(1182,354,4,'#52839f','#aac7d8',1)+circle(1469,347,4,'#895d76','#c8aec4',1);
    case 'wa':return path('M1147 332l117-27 69 8-132 34Z','#3e5063','#788b9f',1)+path('M1147 332l54 15v9l-54-16Zm54 15 132-34v8l-132 35Z','#34475c','#5e758b',.8)+path('M1287 351l139-31 60 8-143 35Z','#445669','#8b9bad',1)+path('M1287 351l56 12v8l-56-12Zm56 12 143-35v9l-143 34Z','#24364c','#6a8196',.9)+bolt(1159,336,2)+bolt(1317,358,2);
    case 'saf':return path('M1087 335l35-12 34 7 40-9 52 14 34 7 35-10 44 11 52-15 31 4 59-13-44 23-55 11-28-3-24 11-45-5-28 7-33-10-37 1-30-13-35 3-43-8Z','#263a4e')+line('M1108 334l48 8 40-9 46 12 36 5 26-8m57 7 42-13 35 4 26-8m-208 28 37 8 28-7m30-3 31 6 29-13',1.4,'#68859c')+line('M1092 350q27-2 51 3t51 2m216 14 57-11',1,'#5a95ae');
   }
   return '';
 }

 function institution(id, currents){
   let a=path('M1142 479q27-10 57-3l292-6 47-13 26 17-2 309-17 29-322 9-30-8 6-27-7-197-21-23Z','#172426','#445b58',1.1);
   a+=path('M1150 465q25-5 53 0l279-7 47-16 27 16-3 306q-20 13-18 34l-303 11-42-10 4-78-13-186-28-35Z','#0c191c','#536a65',.9);
   a+=path('M1186 493l13-18 20 5 1 286-12 25-11-9Z','#253432')+line('M1195 499l8-13 4 276-5 10',1.1,'#596e69');
   a+=line('M1226 786l298-9 17-14m-306 34 288-8',.9,'#455856');
   a+=range(3,i=>group(`translate(${1188+i*2} ${533+i*88})`,path('M-11-4l18-6 9 2v6l-21 8-8-4Z','#657671',ink,.9)+bolt(8,-3,2)));
   // Four political currents need a longer leaf, while the financial mechanism stays at its own elevation.
   return (currents >= 4 ? group('translate(0 465) scale(1 1.21) translate(0 -465)',a) : a) + group('translate(0 -36)',caseFoot(id));
 }
 // Front lip of each existing plate, expressed in its 320-by-115 drawing.
 const mountPoints={
   na:[148,101],sa:[151,95],we:[156,88],ee:[149,103],me:[158,103],sas:[154,93],
   sea:[149,103],ea:[140,102],wa:[146,105],saf:[147,104],eaf:[149,96],
   caf:[142,98],cas:[138,93],oc:[143,105]
 };
 function joinClearingBed(region, layer, upper, lower){
   const upperCTM=upper?.getScreenCTM(), lowerCTM=lower?.getScreenCTM(), layerCTM=layer.getScreenCTM();
   if(!upperCTM || !lowerCTM || !layerCTM)return;
   const point=new DOMPoint(...mountPoints[region]).matrixTransform(upperCTM).matrixTransform(lowerCTM.inverse());
   const x=point.x,y=point.y;
   // The seat is fixed to the bed, so the moving slip and jaws pass in front of it.
   const foot=Math.max(52,Math.min(328,x+12)),heel=43;
   const fixture=path(`M${x-10} ${y-3}l18-4 5 3 ${foot-x+3} ${heel-y+1} -21 4Z`,'#32475d',ink,1.25)
      +path(`M${x-9} ${y-3}l13-3 2 3L${foot+5} ${heel}l-12 2Z`,'#597186',ink,.8)
      +line(`M${x-7} ${y+1}L${foot-5} ${heel-3}m4-2L${x+1} ${y+3}`,.95,'#a0afbc')
      +path(`M${x-17} ${y-1}l4-5 24-4 8 2-4 5-22 5Z`,'#657e90',ink,1)
      +line(`M${x-13} ${y-4}l24-4`,1.15,'#b3bec5')+bolt(x-7,y-2.5,1.5)+bolt(x+8,y-5,1.5)
      +path(`M${foot-16} ${heel}l9-5 17-2 7 5-9 6-24 1Z`,'#526a7e',ink,1.1);
   const m=layerCTM.inverse().multiply(lowerCTM);
   layer.innerHTML=group(`matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`,fixture);
 }
 return {institution,joinClearingBed};
})();