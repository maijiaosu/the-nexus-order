/* Original vector artwork for the economic panel. No image generation. */
window.EconEngraving=(()=>{
 const path=(d,c='')=>`<path class="${c}" d="${d}"/>`,circle=(x,y,r,c='')=>`<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;
 const line=(x,y,n,dx,dy,lx,ly,c='detail')=>Array.from({length:n},(_,i)=>path(`M${x+i*dx} ${y+i*dy}l${lx} ${ly}`,c)).join('');
 function gear(x,y,r,n=16){let a=[];for(let i=0;i<n*4;i++){let t=i*Math.PI*2/(n*4),rr=(i%4<2?r:r*.84);a.push(`${i?'L':'M'}${(x+Math.cos(t)*rr).toFixed(2)} ${(y+Math.sin(t)*rr).toFixed(2)}`)}return path(a.join('')+'Z','gear')+circle(x,y,r*.58)+circle(x,y,r*.2,'paper')+Array.from({length:6},(_,i)=>{let t=i*Math.PI/3;return path(`M${x+Math.cos(t)*r*.25} ${y+Math.sin(t)*r*.25}L${x+Math.cos(t)*r*.52} ${y+Math.sin(t)*r*.52}`,'detail')}).join('')}
 const core={
 distill:()=>path('M28 62Q20 82 24 105L42 118h34l18-13q4-23-4-43zM28 62Q32 46 58 43q27 2 32 19M42 118v10m33-10v10M38 130h43','solid')+path('M49 44V27q0-8 10-8h33q12 0 12 13v47M56 43V29h33q6 0 6 9v42','hot')+path('M96 80h30v18H96zM103 80V43h6v37M103 101q-8 5-8 13v13h36v-14q0-8-11-12M100 127v7h25v-7','paper')+path('M24 82h70M24 103h70M35 68v32m12-32v32m12-32v32m12-32v32m12-32v32M100 116h25','detail')+path('M139 119V74h13v45M137 72h17v-8h-17zM8 141h154','paper')+path('M139 100h13v19h-13z','hot-fill'),
 chip:()=>path('M25 56L89 24l66 32-66 34zM25 56v30l64 32 66-32V56M89 90v28','solid')+path('M42 55L89 32l48 23-48 24zM52 55l37-18 36 18-36 18z','paper')+line(34,91,6,9,4,0,9)+line(101,113,6,9,-4,0,9)+line(17,57,6,0,5,8,4)+line(155,57,6,0,5,9,-4)+path('M65 55l24-12 23 12-23 12z','hot-fill')+path('M13 35h18l12 6M6 43h18M127 23v10l20 9M130 116h29V97M7 97h21v18h22','circuit')+circle(13,35,3,'hot')+circle(159,97,3,'hot')+line(66,53,5,5,2,14,-7,'micro'),
 car:()=>path('M29 63l16-30q4-7 13-7h64q9 0 13 7l14 30 8 8v42H20V73z','solid')+path('M48 34h79l13 28H36z','paper')+path('M59 35l-13 26M66 35l-12 26','detail')+path('M25 70l29 4 7 13-36-5zM149 70l-28 4-7 13 35-5z','hot-fill')+path('M62 76h50l-4 13H66zM28 102h122M61 96h51v8H61z','paper')+line(69,80,7,5,0,0,5,'hot')+path('M25 114v10q0 8 9 8h6q8 0 8-8v-10M127 114v10q0 8 9 8h6q8 0 8-8v-10M18 65H6v10h12M151 65h14v10h-13','paper')+path('M16 142h145M9 136h25m20 0h29m22 0h29M28 16h33m46 0h31M76 7h20','detail')+path('M9 27v22M5 31h8M159 26v21M155 29h8','hot'),
 port:()=>path('M10 94l66 19 91-38-6 25-81 36-61-19z','solid')+path('M15 93l79-32 67 14M25 90V69l23-10 22 7v23M49 63v23M76 101V77l28-13 22 7v12M105 67v22M26 105l47 14 87-36','paper')+line(31,73,4,4,-1.6,0,13)+line(82,80,5,4,-1.8,0,13)+path('M40 58V16l47 7v8L46 24M46 24v32M50 25l30 29M87 23v34M116 63V5l48 13v8L122 15M122 15v46M126 17l32 36M162 23v32','hot')+path('M33 17l8-7 50 13M109 6l8-5 51 15M4 123l20 6m7 2 24 8m50-5 48-21','detail'),
 factory:()=>path('M18 71l23-15 1 15 25-14v17l29-17v44l-38 23-40-17zM96 57l60 18v32l-60-6M31 62V22l10-5 10 5v38M65 58V13l10-5 10 5v47','solid')+path('M31 24l10 4 10-6M65 15l10 4 10-6M18 80l40 16 38-24M58 96v28','paper')+line(24,85,5,6,2.5,0,12,'hot')+line(105,79,6,7,2.2,0,12,'hot')+line(65,99,4,7,-4,0,12,'hot')+path('M9 116l48 18 105-24M41 10V3m35 1V0','detail'),
 power:()=>path('M44 19L26 119M45 19l23 102M32 103h29M29 117h37M20 62h54M26 39h40M36 19h20M36 45l24 49M58 46l-25 48M33 65l27 19M58 65L35 85','paper')+path('M30 37H12v11M70 39h14v9M18 61H4v11M76 62h16v10','hot')+path('M112 120V51M117 120V51M114 46l-8-31q-2-12 6-10l7 37M121 47l33 10q12 4 9 9l-40-9M109 53l-24 27q-9 9-11 2l30-34')+circle(114,48,6,'hot')+path('M95 128h43M19 126h53M90 24l10 1M141 102h21l-6 16h-22z','detail'),
 oil:()=>path('M15 107h71M22 104l20-53 14 5-17 48M40 62l34 11M59 32l-38 5 2 10 40-3 20 19 10-12-20-21zM25 41v50M30 40v50M66 43v25M42 81l27 18M39 92l19-16','paper')+circle(69,88,18)+circle(69,88,11,'hot')+circle(69,88,3)+path('M101 106V45l13-7 13 7v61M101 52h26M101 59h26M133 117V64l13-6 13 6v53M133 71h26M15 118h145')+line(106,69,4,5,0,0,31,'detail')+path('M12 120l36 13h114M112 35V21h30v30M145 45h12V31','circuit'),
 grain:()=>path('M44 120V29M44 49Q16 45 19 29q23 4 25 20M44 71Q14 65 18 48q24 5 26 23M44 96Q13 89 18 72q23 3 26 24M44 61q29-8 25-26-21 5-25 26M44 87q30-9 25-28-24 7-25 28M44 35q-13-20 0-30 15 11 0 30','paper')+path('M86 119V52l22-17 23 17v67M85 60h47M94 70v39m14-39v39m14-39v39M131 119V78l18-13 19 13v41','hot')+path('M13 128h155M78 27l9-4m47 15 10-5M20 119l11-6','detail'),
 metal:()=>path('M61 15h38l9 14v52l-11 10-39-12V30zM59 39l49 11M59 60l49 10M73 9v6m18-10v10M59 20l-24 9v52l23 10M37 35l21-9M38 73l20 9M105 78l28 5v20','solid')+path('M115 104l40-13 9 15-10 24-27 8-15-22zM115 104l14 15 33-13','paper')+path('M106 83q20 9 30 23M106 88q12 10 21 17','hot')+line(66,34,6,6,1.5,0,17)+path('M12 109l54-12 39 13-54 14zM12 109v13l40 11 53-13v-10M51 124v9','detail'),
 research:()=>path('M51 19l13-12 40 40-14 14zM55 24l16-12M79 51L67 67l15 14 18-16M66 69Q33 84 52 109M63 111h48l17 13H32l14-13M60 104h48M91 63q26 24 9 40M106 49l14 18M57 84H25v8h52','paper')+circle(110,77,7,'hot')+path('M123 26h31M130 26v30l-11 36q0 8 17 8h10q17 0 15-8l-12-36V26M126 77h29','hot')+path('M127 84l11-3 13 9M8 128h154','detail')+circle(137,63,2)+circle(146,70,2),
 air:()=>path('M14 82l62-32 37-39 10 2-18 41 39 18 17 17-59-12-23 37-13 3 7-39-39 18z','solid')+path('M74 51l31 3M73 78l29-1M85 55l19-17M93 67l49 14M34 87l35-17','paper')+path('M15 126h146M23 115h18m13 0h18m13 0h18m13 0h18M11 30h29M26 16v28M140 20l16 7M141 30l14-7','hot'),
 rail:()=>path('M55 14h56l20 23v61l-40 23-49-17V35z','solid')+path('M55 14l49 17 27 6M104 31v58l-13 32M49 39l45 13v31L49 70zM55 45l31 10v20l-31-9zM104 44l19-9v34l-19 11','paper')+path('M54 89l23 7v8l-23-7M108 88l15-8v8l-15 8','hot')+circle(55,110,6)+circle(110,115,6)+path('M51 116l-18 20M105 122l-4 15M30 130h79M24 139h88M76 12l5-10h19l8 18M12 56h20M4 64h27','detail'),
 cloth:()=>path('M37 18l44 15v59l-44-15zM81 33l47-17v59L81 92M37 18l47-14 44 12M27 86l49 18 66-24v17l-65 26-50-17zM37 81V29M127 22v60M77 104v19','solid')+line(47,24,6,5,1.7,0,54,'paper')+line(89,36,6,5,-1.7,0,38,'hot')+path('M21 116v16M139 104v21M55 46l54 17M43 62l68-25M4 118h17M4 125h17','detail'),
 culture:()=>path('M23 75q17-6 30-16l35-12 35 12q13 10 30 16l-19 3-12-5H54L41 80zM41 80v33h97V80M60 84v29M118 82v31M29 121h121M20 130h137M72 85h28v27H72z','solid')+path('M41 49q19-4 29-19l18-5 18 5q10 15 29 19l-16 2-12-6H70L58 52zM63 54v10M112 54v10M88 8v18','paper')+line(45,118,11,9,0,0,5,'hot')+path('M29 75l16-8M141 74l-18-8M85 90v19','detail'),
 finance:()=>path('M21 48l59-22 56 18v66l-59 23-56-21zM21 48l56 19 59-23M77 67v66','solid')+path('M36 50l44-16 41 12-44 17zM91 79l34-13v9L91 89zM91 101l34-13v9l-34 13z','paper')+line(31,66,5,8,2.7,0,13,'hot')+line(31,90,5,8,2.7,0,12)+path('M40 25V11h22M99 19h32v10M152 56v34l12 5M6 62V46h9','circuit')+circle(62,11,3,'hot')+circle(164,95,3,'hot')+path('M46 7v8M49 5v11M52 8v7','detail'),
 forest:()=>path('M47 8L17 48h16L5 85h33v39h18V85h36L64 48h15zM116 23L92 55h13L84 87h25v37h15V87h29l-21-32h12z','solid')+path('M47 28v83M31 56l16 12 17-12M23 78l24 15 20-15M116 39v72M101 76l15 11 15-11M6 133h155','paper')
 };
 const kind=n=>[[/白酒|酿造/,'distill'],[/商贸|现代服务|零售/,'finance'],[/林业/,'forest'],[/电子|半导体|集成电路|显示|信息|数字|算力/,'chip'],[/汽车/,'car'],[/轨道|铁路/,'rail'],[/航空|航天/,'air'],[/港|物流|航运|贸易|通道|船舶/,'port'],[/农业|农牧|食品|乳业|白酒|粮|棉/,'grain'],[/能源|电力|光伏|储能/,'power'],[/金融/,'finance'],[/医药|健康|科研|教育/,'research'],[/旅游|文旅/,'culture'],[/金属|钢铁|冶金|煤炭|盐湖|矿/,'metal'],[/化工|石化|油气/,'oil'],[/纺织/,'cloth']].find(([r])=>r.test(n))?.[1]||'factory';
 function sector(n){const native={car:'precision',factory:'factory',grain:'grain',research:'microscope'}[kind(n)];if(native)return `<img class="engraving-native" src="../china-economy/assets/native-${native}.png" alt="" aria-hidden="true">`;return `<svg class="engraving" viewBox="0 0 176 146" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">${core[kind(n)]()}</svg>`}
 function drive(grade){const g=grade||3;return `<svg class="drive-engraving" viewBox="0 0 180 150" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">${path('M17 109V31l44-20h73l28 19v79l-28 24H51z','detail')}${gear(69,66,41)}${gear(125,101,24,12)}${circle(69,66,48,'detail')}${g>=3?path('M34 110l86 17M28 101l91 18','hot'):path('M34 110q27 33 48 13m11-1 27 5','hot')}${g>=4?path('M99 34h51v28M101 39h44v24','paper'):path('M99 34h18m13 0h20v28','detail')}${circle(151,69,5,g>=4?'hot-fill':'detail')}${line(13,128,g+2,7,0,0,9,g>=4?'hot':'detail')}${g<=2?path('M64 23l-7 13 12 3-8 15M15 145l17-4 10 4','hot'):path('M142 15l6-4m-4 15h10M20 58l-10-3','paper')}</svg>`}

 const svg=(body,box='0 0 200 150')=>`<svg class="mood-art" viewBox="${box}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
 const coin=(x,y,r=8)=>circle(x,y,r,'coin')+path(`M${x-3} ${y-4}l3 4 3-4m-6 5h6m-6 3h6m-3-4v8`,'coin-mark');
 function bank(g){const roof=g===1?'M19 51L91 13l21 16-7 10 15-2 58 24':'M19 51L98 12l80 39z';let b=path(roof,'architecture')+path('M15 57h168v9H15zM10 124h178v10H10zM6 140h186M46 49h101M55 45l43-23 42 23','paper');
 for(let i=0;i<5;i++){let x=29+i*31;if(g===1&&i===2)b+=path(`M${x} 70l-3 17 9 8-8 10m2 10v7m12-52v13m-3 14 3 21`,'damage');else b+=path(`M${x} 70h12v48h-12zM${x-3} 69h18M${x-3} 121h18M${x+4} 76v35M${x+8} 76v35`,'architecture')}
 b+=coin(98,41,9);
 const arrows={1:'M33 81l35 8 19 18 27-8 35 30m-20-2 20 2-1-20',2:'M32 83l31-1 26 15 26-5 34 14m-19 1 19-1-7-17',3:'M29 94h121m-13-12 13 12-13 12',4:'M30 111l31-10 30 3 28-24 33-11m-19-3 19 3-4 18',5:'M29 115l29-10 21 2 31-31 40-18m-21-3 21 3-3 22M29 125l37-10 19 2 31-31 26-12'};
 b+=path(arrows[g]||arrows[3],'momentum');if(g<3)b+=path('M23 138l8-4 9 5m111-2 9-6 8 7','damage');if(g>=4)b+=path('M174 17v17m-8-9h16M18 24v12m-5-6h10','highlight');return svg(b)}

 function pig(g){
 let body=g===1?'M37 66Q39 44 66 43L68 27l20 15Q103 35 126 43L121 59l10 12-19 13 15 16-8 14Q98 121 75 112l-8 18H53l3-26Q43 97 39 91H21V70zM137 44Q175 54 170 83q-4 18-20 26l8 21h-15l-9-19 6-13-10-15 19-13-14-12z':'M37 66Q39 44 66 43L68 27l20 15Q106 34 135 45q37 10 35 38-2 17-20 26l8 21h-15l-9-19q-31 12-59 1l-8 18H53l3-26Q43 97 39 91H21V70z';
 let b=path(body,'pig-body')+path('M42 66q6-12 17-15M71 42l1-9 9 9M95 42h26M99 47h19M168 68q17-18 22-7t-8 13q-9-3-4-8M28 73v13M34 73v13M59 119h11M144 122h10','paper')+circle(54,64,2.5,'paper')+path('M45 89q5 9 16 13M80 107q25 9 45 1M145 52q20 9 18 24','detail');
 if(g===1)b+=path('M126 46l-6 12 12 13-19 13 15 16-8 12 6 2 10-17-12-13 19-14-13-15 3-9z','fracture-face')+path('M132 133l11 4-6 9-12-5zM113 134l8-3 4 7-11 3zM88 136l11 2-7 8-9-4z','rubble')+coin(28,125,8)+coin(166,140,8);
 if(g===2)b+=path('M122 45l-4 16 6 13-10 14 3 13 3-2-2-11 10-14-7-13 4-14z','fracture-face')+path('M119 72l-14 2-7 8','damage')+coin(117,21,9);
 if(g===3)b+=coin(109,19,10);
 if(g>=4){for(let i=0;i<(g===5?5:3);i++)b+=`<ellipse class="coin" cx="176" cy="${130-i*7}" rx="16" ry="4"/>`;b+=coin(108,17,11)}
 if(g===5)b+=coin(32,130,9)+coin(82,135,8)+coin(111,132,9)+path('M149 13v12m-6-6h12','highlight');
 return svg(b);
 }
 function works(g){let b=path('M5 105V50l36-19v20l36-20v20l36-20v74M113 105V60l54-23 48 18v50M215 105V67h48V39h37v66','architecture')+path('M26 36V10h13v25M80 35V5h14v28M244 65V21h12v44','paper');
 for(let i=0;i<11;i++){let x=14+i*25;b+=`<path class="${i<g*2?'window-lit':'window-dark'}" d="M${x} 68h13v17h-13z"/>`}
 b+=path('M3 110h302M7 116h292','paper');for(let i=0;i<(g===1?0:g===2?1:g===3?2:g===4?4:6);i++)b+=path(`M${38+i*36} 132v-13h26v13zM${51+i*36} 119v13`,'cargo');
 if(g<=2)b+=path('M123 109l18 13 17-9 17 14m-23-72-8 16 12 9-9 14M7 137l12-6 10 8','damage');
 if(g>=3)for(let i=0;i<g-2;i++)b+=path(`M${32+i*55} 5q-9-10 6-13t12-12`,'steam');
 if(g===5)b+=path('M280 8v17m-8-9h16M178 10v14m-7-7h14','highlight');return svg(b,'0 -22 310 165')}

 function belt(g){let b=path('M5 22h172M8 29h166','paper');for(let i=0;i<10;i++)b+=circle(14+i*16,25,3,'detail');if(g===1)b=path('M5 22h48l18 20m15 0 19-20h72M5 29h42l20 21m25-5 18-16h64','damage');for(let i=0;i<g-1;i++)b+=path(`M${20+i*35} 21V7h24v14M${32+i*35} 7v14`,'cargo');if(g===5)b+=path('M12 40h158M19 47h148','highlight');return svg(b,'0 0 184 52')}
 function resource(g,type){
 const native={research:'native-education',people:'native-labor',trade:'native-trade',chip:'native-research',oil:'resource-0',factory:'native-factory'}[type];
 if(native)return `<img class="econ-native-resource" src="../china-economy/assets/${native}.png" alt="" aria-hidden="true">`;
 if(['rail','culture','wood','trade'].includes(type)){const k={rail:'rail',culture:'culture',wood:'forest',trade:'finance'}[type];return `<svg class="engraving" viewBox="0 0 176 146" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${core[k]()}</svg>`}
 if(type==='power'){let b=path('M25 130L53 12h16l29 118M47 40h33M38 72h48M30 107h64M28 131h70M43 76l40 29M82 76l-44 29M49 42l27 28M73 43l-27 27M30 35h58M20 68h78','paper')+path('M128 47h134l20 83H111zM150 47v83m23-83v83m24-83v83m24-83v83m24-83v83','architecture');for(let i=0;i<g+1;i++)b+=path(`M112 ${137+i*5}q14-7 27 0t27 0t27 0t27 0t27 0t27 0`,'steam');if(g<=2)b+=path('M160 49l-8 19 13 8-13 15','damage');if(g>=3)b+=path('M124 24l17-22-5 16h18l-22 21 5-15z','cargo');if(g===5)b+=path('M259 21l10-19-1 15h17l-21 18 4-14z','cargo');return svg(b,'0 0 310 175')}
 if(type==='research'||type==='people'||type==='chip'){let b=path('M36 107l72-27 143 29-73 28zM36 107v15l142 28 73-29v-12M178 137v13','architecture');for(let i=0;i<g;i++){let y=91-i*16;b+=path(`M51 ${y}l62-20 122 26-59 23zM51 ${y}v10l125 25 59-26v-9M176 ${y+29}v6`,'paper')}if(g===1)b+=path('M95 48l42-16 33 17-44 16zM198 67l30-8 21 15-35 8zM117 86l-9 15 18 8-7 15','damage');if(g>=4)b+=path('M26 32v20m-9-10h18M256 19v15m-7-8h14','highlight');return svg(b,'0 0 310 160')}
 if(!['port','water','trade','ore','oil','grain','wood'].includes(type))return works(g);
 let b='';if(['port','water','trade'].includes(type)){b=path('M18 26V126M24 26v100M12 125h25M18 27L220 8v11L24 37M26 29l191-13M180 21v62M188 20v63M175 83h20M182 86v10','paper');const n=[0,1,2,3,5,7][g];for(let i=0;i<n;i++){let x=42+(i%4)*54,y=119-Math.floor(i/4)*27;b+=path(`M${x} ${y}v-23l43-5v28zM${x+8} ${y-21}v19m8-20v20m8-21v21m8-22v22`,'cargo')}b+=path('M7 135h285M13 144h275','detail');if(g<=2)b+=path('M122 18l-14 17 15 7-8 13M202 126l14-6 21 11','damage');if(g===5)b+=path('M246 20v18m-8-9h16M262 8v11m-5-5h10','highlight')}
 else if(type==='ore'||type==='oil'){b=path('M5 130l22-35 23 7 29-46 30 11 31-44 25 8 31 50 25-10 28 45 36 14z','architecture')+path('M27 95l13 22 20-5 19-56 19 36 31-5 12-64 12 48 36 28 31-28M19 136h269','detail');for(let i=0;i<g;i++){let x=28+i*47;b+=path(`M${x} 120l12-18 22 2 10 16zM${x} 120v12h44v-12M${x+12} 102l6 18v12`,'cargo')}if(g<=2)b+=path('M96 56l-9 16 11 8-8 19M193 80l11 17-8 12','damage');if(g>=4)b+=path('M67 10v18m-8-9h16M218 22v13m-6-6h12','highlight')}
 else{for(let i=0;i<5;i++){let x=50+i*47,h=70+((i%2)*20),lean=(g<=2?30-(g*5):0);b+=path(`M${x} 137Q${x-8} 98 ${x+lean} ${137-h}`,'paper');for(let j=0;j<g+1;j++){let y=125-j*11;b+=path(`M${x} ${y}q-18-3-18-16 15 1 18 16M${x+1} ${y-5}q18-3 18-16-15 1-18 16`,'cargo')}}b+=path('M21 142h269','detail');if(g===1)b+=path('M10 133l17-5 13 9M233 140l18-14 12 16','damage')}
 return svg(b,'0 0 310 150')}

 function order(g){let b=path(g===1?'M21 9h87v49l-14 9 14 10v50l-18-9-16 11-17-10-18 9-18-8z':'M21 9h87v116H21z','paper');if(g>=4)b+=path('M113 15h7v118H29M125 21h7v119H36','paper');b+=path('M34 26h58M34 34h37M34 49h58M34 58h42M34 83h58M34 92h49','detail');if(g===1)b+=path('M83 37L49 74M49 37l34 37M17 135l19-8 10 15M79 139l17-8 12 8','damage');if(g===2)b+=path('M57 106h26M71 96v20','detail');if(g>=3)b+=circle(74,104,13,'hot')+path('M66 104l6 5 11-13','hot');if(g===5)b+=path('M5 42H-8M5 63h-19M5 84H-6M141 44h14M141 65h20','hot');return svg(b,'-15 0 182 150')}

 function scene(n,g){const k=kind(n),q=g||3;let art=sector(n),env='',accent='',floor='';
 const box=(x,y,w=25,h=19)=>path(`M${x} ${y}v-${h}h${w}v${h}zM${x+w/2} ${y-h}v${h}`,'cargo');
 const glow=(x,y)=>path(`M${x} ${y-8}v16M${x-8} ${y}h16`,'highlight');
 const lamp=(x,y,on)=>circle(x,y,5,on?'window-lit':'window-dark');
 const runs=q===1?0:q===2?1:q===3?2:q===4?4:6;
 if(['port','rail','air'].includes(k)){
   env+=path('M8 151h245M8 158h245M13 151v-12m45 12v-12m45 12v-12m45 12v-12m45 12v-12','paper');
   for(let i=0;i<runs;i++)env+=box(14+(i%3)*29,137-Math.floor(i/3)*22,26,19);
   floor+=path('M0 176q14-6 28 0t28 0t28 0t28 0t28 0t28 0t28 0t28 0t28 0M11 184q14-6 28 0t28 0t28 0t28 0t28 0t28 0t28 0','detail');
   if(q<=2)accent+=path('M197 106v33m-14-7q14 24 28 0M186 132l-3-8-4 10M205 132l8-8 3 10','paper')+circle(197,101,5,'paper');
   if(q>=3)accent+=path('M164 169h78l-12 9h-54zM176 166v-12h45v12M185 154v12m9-12v12m9-12v12m9-12v12','cargo');
   if(q>=4)accent+=path('M207 38h45m-12-12 12 12-12 12','momentum');
   if(q===5)accent+=path('M199 56h45m-10-9 10 9-10 9','hot')+glow(249,94);
 }else if(['grain','forest','culture'].includes(k)){
   for(let i=0;i<5;i++)floor+=path(`M${10+i*45} 180l${28-i*5} -33M${20+i*45} 185l${27-i*5} -35`,'detail');
   env+=path('M198 137V92l26-21 25 21v45zM198 96h51M207 102v29m9-29v29m9-29v29m9-29v29','architecture');
   for(let i=0;i<runs;i++)accent+=`<ellipse class="cargo" cx="${23+(i%3)*20}" cy="${144-Math.floor(i/3)*19}" rx="9" ry="12"/>`;
   if(q<=2)accent+=path('M223 77l-9 19 13 10-10 14M39 144q-11-23-22-16m22 16v-30M20 143l17 7','damage');
   if(q>=4)accent+=path('M200 34h46v16h-46zM206 34l7-8h26l7 8M212 50v10m24-10v10','cargo')+glow(240,15);
   if(q===5)accent+=path('M167 176h73M178 167h73','hot')+glow(21,66);
 }else if(['power','oil','metal'].includes(k)){
   env+=path('M7 131v-20h18v29h40M192 99h43v38h20M193 107h35v38h25','architecture')+circle(28,140,8,'paper')+path('M28 132v16m-8-8h16','detail');
   floor+=path('M6 161h83m27 0h140M6 170h83m27 0h140','paper');
   if(q===1)accent+=path('M82 157l10 8-11 8M118 157l-12 8 12 8M100 173l-5 9 10 2z','damage');
   else accent+=path('M89 161h27M89 170h27','paper');
   for(let i=0;i<runs;i++)accent+=path(`M${134+i*19} 152v-16l13-3v19z`,'cargo');
   if(q>=3)accent+=path('M226 49l15-25-4 18h16l-25 24 6-17z','cargo');
   if(q>=4)accent+=path('M16 70q-13-12 0-20t0-20M28 70q-13-12 0-20t0-20','steam');
   if(q===5)accent+=glow(253,16)+path('M24 161h36m-8-5 8 5-8 5','hot');
 }else if(['finance','research'].includes(k)){
   art=k==='finance'?bank(q):sector(n);
   env+=path('M10 144h247M18 147v22m231-22v22','paper');
   if(k==='research')for(let i=0;i<runs;i++)accent+=path(`M${196+i*6} 135V${94-i*4}h5v${41+i*4}`,'cargo');
   else for(let i=0;i<runs;i++)accent+=coin(24+i*15,134,8);
   accent+=path(q<=2?'M220 25h26v31l-12-6-14 6zM225 30l15 16m0-16-15 16':'M220 25h26v33h-26zM226 42l6 6 9-15','paper');
   if(q===1)accent+=path('M27 154l12 6-15 12M204 160l14-6 19 12','damage');
   if(q>=4)accent+=glow(30,43)+glow(250,78);
   if(q===5)accent+=path('M6 178h237M15 184h225','hot');
 }else{
   env+=path('M8 142V81l34-20v19l33-20v19M198 141V56h48v85M204 65h36M204 74h36M204 83h36M204 92h36','architecture');
   for(let i=0;i<3;i++)env+=lamp(209+i*13,50,i<q-2);
   if(q<=2)accent+=path('M198 96h48v42h-48zM199 103h46m-46 7h46m-46 7h46m-46 7h46m-46 7h46','paper');
   if(q===1)accent+=path('M202 98l39 38m0-38-39 38M14 155l19 11 13-9','damage');
   floor+=path(q===1?'M7 152h78l18 21m16-4 14-17h118M7 162h73l18 21m29-8 12-13h112':'M7 152h245M7 164h245','paper');
   for(let i=0;i<11;i++)floor+=circle(17+i*21,158,4,'detail');
   for(let i=0;i<runs;i++)accent+=box(14+i*39,148,29,19);
   if(q>=3)accent+=path('M211 138v-31h21v31','cargo');
   if(q>=4)accent+=path('M22 42q-8-9 2-16t2-16','steam');
   if(q===5)accent+=glow(241,20)+path('M17 178h217m-12-7 12 7-12 7','hot');
 }
 const frame=path('M6 40V16h30M263 129v52h-25','detail');
 return `<div class="industry-scene scene-${k}" data-state="${q}"><svg class="industry-environment mood-art" viewBox="0 0 270 195" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${frame+env+floor+accent}</svg><div class="industry-object">${art}</div></div>`;
 }

 function city(g){let b='';
 // A street is a single illustrative scene, not additional economic measurements.
 b+=path('M3 125h354M3 134h354M16 144h30m18 0h30m18 0h30m18 0h30m18 0h30m18 0h30m18 0h30','paper');
 b+=path('M13 122V70h67v52M8 70l10-16h57l12 16zM18 56v13m12-13v13m12-13v13m12-13v13m12-13v13M19 78h55v14H19zM19 97h23v25M49 97h25v25','architecture');
 if(g===1)b+=path('M18 96h57v27H18zM20 99l51 22M22 121l48-22M22 85l11-4 15 6 16-6','damage');
 if(g===2)b+=path('M19 99h23m-23 6h23m-23 6h23m-23 6h23','paper');
 if(g>=3)b+=path('M23 81h13v6H23zM43 81h23v6H43z','window-lit');
 b+=path('M91 122V44h65v78M99 53h49v13H99zM99 74h19v19H99zM129 74h19v19h-19zM99 101h19v21m11-21h19v21','architecture');
 for(let j=0;j<2;j++)for(let k=0;k<2;k++)b+=path(`M${102+j*30} ${56+k*21}h12v8h-12z`,g>2?'window-lit':'window-dark');
 b+=path('M163 122V78h57v44M167 78l9-15h31l9 15M175 86h34v17h-34zM189 103v19','paper');
 if(g<=2)b+=path('M169 114l12-5 14 12M238 121V37h20v84M247 37V16h64v7h-64M291 23v57M285 80h13','detail');
 if(g===1)b+=path('M246 67l-8 10 11 9-9 15M267 125l16-8 17 9','damage');
 if(g===2)b+=path('M269 118V90h47v28M279 90V73h26v17','architecture');
 if(g>=3){b+=path('M236 122V23l51 7v92M287 122V45l47 8v69M244 32l35 5M244 47l35 5M244 62l35 5M244 77l35 5M244 92l35 5M296 61h29M296 78h29M296 95h29','architecture');for(let k=0;k<g-1;k++)b+=path(`M245 ${44+k*17}l30 4v7l-30-4z`,'window-lit')}
 if(g>=4){b+=path('M215 57V14h56M214 19l45-12 18 7M254 16v12','paper');b+=path('M26 40l8-15h21l9 15M34 25v-7h21v7M31 40h27','hot');}
 if(g===5)b+=path('M169 46V6h19v40M174 11h9m-9 8h9m-9 8h9m-9 8h9M338 123V70h13v53','architecture')+glitter(312,15)+glitter(112,17);
 const people=g===1?1:g===2?2:g===3?4:g===4?6:8;
 for(let n=0;n<people;n++){let x=42+n*35,y=117;b+=circle(x,y-9,2.5,'paper')+path(`M${x} ${y-6}v9m0-6-4 4m4-4 4 3m-4 3-3 5m3-5 3 5`,'paper');if(g>=4)b+=path(`M${x+4} ${y-2}h5v7h-5z`,'cargo')}
 if(g>=3)b+=path('M205 134v-7h24l5 7M203 134h34','paper')+circle(208,136,3,'paper')+circle(231,136,3,'paper');
 return svg(b,'0 0 360 152');
 }
 function glitter(x,y){return path(`M${x} ${y-6}v12M${x-6} ${y}h12`,'highlight')}
 function cash(g){let b=path('M30 35h88v84H30zM35 40h78v74H35zM42 47h62v58H42z','architecture')+circle(75,76,18,'paper')+circle(75,76,5,'paper')+path('M75 58v13m0 10v13M57 76h13m11 0h12','paper');
 b+=path('M28 122h98M19 132h130','paper');
 if(g===1)b+=path('M87 37l-11 14 13 14-16 15M133 79l21-8 11 9-19 9zM142 111l19-6 11 9-22 7z','damage');
 if(g===2)b+=coin(139,120,9)+path('M127 100l21-5 12 8-22 5z','paper');
 if(g>=3){for(let n=0;n<g-1;n++)b+=path(`M${124+n*5} ${115-n*9}l31-5 12 7-31 6z`,'cargo');b+=coin(37,129,8)}
 if(g>=4)b+=coin(131,133,10)+coin(155,130,8);
 if(g===5)b+=coin(28,114,8)+glitter(155,36)+glitter(10,66);
 return svg(b,'0 0 182 150');
 }
 function pulse(g){const a={1:'M8 14h14l7 17 18 1 13 20 23 6m-15-12 15 12-18 4',2:'M8 23h17l12 9 19-2 27 13m-15 2 15-2-6-14',3:'M8 35h75m-12-11 12 11-12 11',4:'M8 54l22-8 16 2 18-20 19-5m-15-4 15 4-3 15',5:'M8 55l18-8 16 1 21-27 20-10m-16-1 16 1-1 17M8 64l24-8 16 1 22-27'};return svg(path(a[g],'momentum'),'0 0 95 75')}

 function note(g){let b=path('M15 10H304l18 18v259l-18 18H15L0 289V26z','architecture')+path('M22 20h272l17 17v240l-17 17H22L11 282V36z','paper')+path('M39 31h238M39 281h238','detail');
 for(let i=0;i<6;i++)b+=`<ellipse class="guilloche" cx="161" cy="125" rx="${126-i*5}" ry="${61-i*3}" transform="rotate(${(i%2?1:-1)*(i+1)*2} 161 125)"/>`;
 for(let i=0;i<9;i++){b+=path(`M${31+i*33} 22v10M${31+i*33} 282v10`,'paper')}
 b+=path('M23 69h38M261 69h38M24 176h41M257 176h41M19 40h9v16h-9zM293 40h9v16h-9zM19 249h9v16h-9zM293 249h9v16h-9z','hot');
 if(g<=2)b+=path(g===1?'M13 195l15 12-18 14 17 13-14 15M310 90l-17 13 18 12':'M14 206l13 10-13 12','damage');
 if(g>=4)b+=path('M14 43l12-9 10 9-10 9zM284 43l12-9 10 9-10 9z','hot');
 
 return svg(b,'-5 0 332 315');
 }
 function ledgerArt(g){let b=path('M13 32q60-12 136 3 76-15 136-3v185q-60-8-136 8-76-16-136-8z','architecture')+path('M8 40H2v190q70-12 147 8 77-20 147-8V40h-6M149 36v185M144 45v169M154 45v169','paper')+path('M22 47q51-6 112 2M164 49q61-8 110-2M22 189q53-6 112 4M164 193q58-10 110-4','detail');
 for(let j=0;j<6;j++)b+=path(`M24 ${65+j*21}q45-4 105 1M169 ${66+j*21}q54-5 104-1`,'rule');
 b+=path('M32 245h234M20 257h257M20 294h257M28 259v33m9-33v33m224-33v33m9-33v33','paper');
 if(g===1){b+=path('M13 183l10-3 3 4 8-5 6 3 3 7-4 4 2 8-8 4-5-3-5 3-10-2z','paper-loss');b+=path('M14 182l8 0 4 4 8-4 5 2 1 6-3 5 2 6-7 2-6-3-5 3-7-1','paper-fray');b+=path('M22 184l-2 6m9-7-1 6m9 4-5 1m-7 6 1-6m-10 5 3-6','paper-fiber');b+=path('M276 52l8 3-3 5 4 4-1 11-6-5 2-5-4-6z','paper-loss')}
 if(g===2)b+=path('M17 42l13-4-10 14zM271 210l13-11v12z','paper-fold');
 if(g>=4)b+=path('M143 45v177l6-5 6 5V45','book-binding');
 
 return svg(b,'-4 0 308 315');
 }

 function bankFacade(g){
 const id='bank-'+g;
 let b=`<defs><pattern id="${id}-stone" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M1 1h.6M3.5 3.5h.6" class="stone-grain"/></pattern><pattern id="${id}-shade" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 4L4 0" class="stone-hatch"/></pattern></defs>`;
 // The drawing has actual walls and recesses. The middle opening is reserved for data.
 b+=path('M29 115h362v222H29z','bank-wall')+path('M101 123h218v209H101z','bank-recess');
 b+=path('M109 130h202v195H109z','bank-inner')+path('M114 137v182M306 137v182','detail');
 // Masonry courses behind the paired side pilasters.
 for(let y=129;y<325;y+=20){b+=path(`M31 ${y}h66M323 ${y}h66`,'mortar');if((y-129)%40===0)b+=path(`M54 ${y}v20M365 ${y}v20`,'mortar')}
 b+=path('M30 119h67v207H30zM323 119h67v207h-67z','stone-surface');
 const roof=g===1?'M10 85L92 57l-5 15 15-3 9 8 16-13 7 5 13-17-4-10 16-11L210 12l200 73z':'M10 85L210 12l200 73z';
 b+=path(roof,'bank-roof');
 b+=path('M20 82L210 22l190 60M31 83L210 31l180 52','roof-rule');
 if(g!==1)b+=path('M71 76L210 38l139 38z','bank-tympanum');
 else b+=path('M153 58l57-20 139 38H154l-10-7z','bank-tympanum');
 // Fine radial carving and a recognisable financial seal, drawn into the pediment.
 for(let k=0;k<17;k++){let t=Math.PI+(k*Math.PI/16);let x=210+Math.cos(t)*43,y=78+Math.sin(t)*29;b+=path(`M${x.toFixed(2)} ${y.toFixed(2)}L${(210+Math.cos(t)*55).toFixed(2)} ${(78+Math.sin(t)*36).toFixed(2)}`,'carving')}
 b+=path('M181 79a29 29 0 0 1 58 0M186 79a24 24 0 0 1 48 0','roof-rule')+path('M202 57l8 10 8-10m-15 12h14m-14 5h14m-7-7v13','seal');
 b+=path('M9 86h402v9H9zM17 98h386v27H17zM23 126h374v7H23z','bank-cornice');
 for(let x=26;x<394;x+=15)b+=path(`M${x} 90v6h8v-6`,'dentil');
 b+=path('M104 101h212v23H104z','bank-frieze');
 // Capital, abacus, fluted shaft and stepped base are separate layers.
 for(const x of [37,72,329,364]){
  b+=path(`M${x-8} 134h39v6h-39zM${x-5} 142h33v5h-33zM${x} 149h23v160h-23zM${x-4} 310h31v6h-31zM${x-7} 318h37v11h-37z`,'bank-column');
  b+=path(`M${x+18} 150h5v158h-5z`,'column-shadow');
  for(let j=0;j<4;j++)b+=path(`M${x+4+j*4} 155v148`,'flute');
  b+=path(`M${x-4} 146q7 9 14 1m1 0q7 8 14-1M${x-3} 322h29`,'carving');
 }
 b+=path('M26 332h368v10H26zM17 344h386v10H17zM8 356h404v14H8zM4 372h412','bank-step');
 b+=path('M28 338h365M21 351h379M12 367h396','step-light');
 // Spalls are filled cavities with lit exposed edges, not a zigzag pasted on stone.
 if(g===1){
  b+=path('M88 62l9-5 13 4 7-8 14 3 9-17 16-7-8 14 4 11-15 18-11-4-15 14-15-8-13 2z','cavity');
 b+=path('M88 62l9-5 13 4 7-8 14 3 9-17 16-7-8 8-6 10-3 11-7 1-10-4-10 11-15-7-8 6zM87 76l10-3 15 7 16-14 9 5 14-18-6 15-9 8-9-4-16 15-14-8-12 2z','fracture-face');
 b+=path('M100 63l6 5-4 5m14-12 9 3m8-9 7 3M93 76l8 3m17-3 5-5M139 40l6 4M147 67l8 6 9-2M85 70l-14 9','carving');
  b+=path('M37 209l9-3 4 7 10-2 2 10-6 9 6 11-8 10-17-8 5-9-6-7z','cavity');
  b+=path('M36 206l12 1 3 7 10-4 2 10-9 4-5-9-12 2zM39 242l11-3 10 9-5 7-18-8z','fracture-face');
  b+=path('M48 170l-3 27 8 15M49 248l-7 24 6 13-4 23M82 145l7 22-7 29 10 16-9 35M297 99l-12 7 16 5M370 192l8 19-8 21','hairline');
  const shards=['M19 335l9-12 16 9-6 10z','M42 341l15-6 9 12-19 5z','M63 354l11-13 16 10-6 10z','M21 360l7-9 13 7-6 8z','M93 340l8-7 11 6-7 7z'];
  shards.forEach(d=>b+=path(d,'rubble'));
  b+=path('M178 345l7 9-5 7 11 7M183 354l23-5','hairline');
 }else if(g===2){
  b+=path('M26 114l8 1 3 6-13 0zM80 304l9-5 8 8-3 4h-12zM367 350l10-4 7 6-17 2z','fracture-face');
  b+=path('M57 150l-5 31 4 15-6 12M374 257l-5 22 8 17M290 85l-6 7 13 7','hairline');
 }else if(g>=4){
  for(const x of [25,399]){b+=path(`M${x-3} 176h6v29h-6zM${x-5} 173h10M${x-5} 208h10`,'lamp');b+=path(`M${x} 179v23`,'lamp-core')}
  if(g===5){b+=path('M33 334h354M22 346h377M11 359h398','prosperity-inlay');for(let x=124;x<303;x+=12)b+=path(`M${x} 116l3 3 3-3`,'prosperity-inlay')}
 }
 b+=`<path d="M30 135h67v194H30zM323 135h67v194h-67z" fill="url(#${id}-stone)" stroke="none"/>`;
 return `<svg class="bank-facade mood-art" viewBox="0 0 420 380" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">${b}</svg>`;
 }
 return {sector,drive,kind,bank,pig,works,belt,resource,scene,order,city,cash,pulse,note,ledgerArt,bankFacade};
})();
