'use strict';
window.EconEnterpriseArt=(()=>{
 const cache=new Map(),colors=['#64bdb6','#df7c78','#d6a16e','#dfd58c','#87c9df','#a4dc9b'];
 const path=(d,c='edge')=>`<path class="e-${c}" d="${d}"/>`,rect=(x,y,w,h,c='wall')=>`<rect class="e-${c}" x="${x}" y="${y}" width="${w}" height="${h}"/>`,circle=(x,y,r,c='edge')=>`<circle class="e-${c}" cx="${x}" cy="${y}" r="${r}"/>`;
 function windows(x,y,cols,rows,g,step=12){let s='';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)s+=rect(x+c*step,y+r*14,6,8,g>=3&&(g===5||(c+r)%3!==0)?'light':'window');return s;}
 function parcel(x,y,w=25){return rect(x,y,w,23,'parcel')+path(`M${x+3} ${y+3}h${w-6}m-${w-6} 17h${w-6}M${x+w/2-2} ${y}v8h5v-8`,'detail');}
 function paper(x,y,w=32){return path(`M${x} ${y}h${w-8}l8 8v37h-${w}z`,'paper')+path(`M${x+w-8} ${y}v9h8M${x+5} ${y+15}h${w-10}m-${w-10} 6h${w-10}m-${w-10} 6h${w-15}m-${w-15} 6h${w-18}`,'paper-ink');}
 function shop(g){let s='';
 // Headquarters and production annex form the background silhouette.
 if(g>=4){s+=path('M111 112V39h42v73M108 39h48v-5h-48z','wall')+windows(119,49,3,4,g,11);if(g===5)s+=path('M164 104V58h36v64M160 58h44v-5h-44z','wall')+windows(172,67,2,3,g,12);}
 s+=path('M28 145V54h61v94M24 54h69v-8H24z','wall')+rect(32,59,53,6,'accent')+windows(38,76,4,4,g,11)+path('M29 140h59M30 145h59M88 56v87','detail');
 if(g<=2)s+=path('M129 109V63h40v47M125 61h48m-39 8v35m12-35v35m12-35v35M129 84h40','idle');
 // Front elevation, deep display windows and striped textile canopy.
 s+=path('M15 150h176v83H15z','wall')+rect(10,118,188,25,'sign')+rect(16,123,176,14,'sign-inner')+path('M25 130h35m9 0h46m9 0h31m10 0h18','sign-rule')+path('M9 142h190l8 19H2z','canopy');
 for(let i=0;i<9;i++)s+=path(`M${9+i*21} 143h10l${i<4?-3:3} 17h-11z`,i%2?'stripe':'cloth');
 s+=path('M3 161h203v5q-10 13-20 0-10 13-20 0-10 13-20 0-10 13-20 0-10 13-20 0-10 13-20 0-10 13-20 0-10 13-20 0-10 13-20 0-10 13-23 0z','hem');
 s+=rect(23,177,59,47,'glass')+rect(91,177,39,56,'glass')+rect(140,177,42,47,'glass')+path('M53 178v45M92 204h37M123 207v10M141 213h40M23 226h59m58 0h42M12 234h184v5H12z','detail');
 if(g>=3){s+=path('M29 217v-14h16v14m13 0v-22h17v22M146 207h13v-18h16v18M99 187h24','stock')+path('M29 182l17 17m-11-17 16 16M146 181l17 17','glass-shine');s+=paper(176,201,29)+parcel(145,236,29);}
 if(g===1){s+=path('M17 145l24 8-11 9-13-4 4 15-13-8zM90 149l17 10-8 12-13-6z','crack')+path('M10 125l52 12 6-8 28 8 6-17 35 3 21 10 38-3','fracture')+path('M22 187l62 24-5 12-62-23zM22 220l57-37 7 10-57 38zM95 181l34 32-5 10-34-32z','board')+path('M28 193l45 17m-43 9 48-29','board-grain')+path('M44 57l-8 15 9 12-9 13 7 13-5 16 15-16-8-13 9-15-8-12 4-13z','crack')+path('M38 74l-6 5m11 16 9 5m-11 13-10 5M66 128l7-10m48 10 7 8M31 181l10 10-3 7 11 10m108-26-6 14 9 7-8 11','damage-detail')+path('M21 243l14-6 9 8-6 9-17-3M69 247l9-7 12 8-3 5H72','rubble');}
 if(g===2){s+=rect(23,178,59,47,'shutter')+rect(140,178,42,47,'shutter');for(let y=184;y<224;y+=6)s+=path(`M25 ${y}h55m62 0h39`,'detail');s+=rect(105,205,13,15,'lock')+path('M108 205v-5q4-8 8 0v5','edge')+parcel(154,239,29);}
 if(g>=4){s+=path('M17 243h80v28H17zM97 251h24l11 11v9H97zM102 255h15l8 9h-23z','vehicle')+circle(36,272,7,'wheel')+circle(110,272,7,'wheel')+path('M23 249h66m-66 6h66','detail')+parcel(152,212,24);}
 if(g===5)s+=parcel(119,238,29)+parcel(180,239,23)+paper(189,69,27)+path('M98 95l10-10m-4 12 10-10M205 176l7-7m-3 13 8-8','spark');
 return s;
 }
 function plant(g){let s='';
 // Cooling stacks, power lattice and a broad sawtooth production hall.
 s+=path('M29 122l5-80h21l5 80M73 119l5-98h22l6 98','wall')+rect(32,40,25,8,'rim')+rect(76,18,26,9,'rim');
 for(let y=55;y<119;y+=12)s+=path(`M34 ${y}h22M80 ${y-19}h19`,'detail');
 s+=path('M147 120l19-78h15l20 78M158 77h31m-38 23h45m-38-39h31M163 54l24 38m-2-38-27 38m-2 8 38 19m-4-19-35 20M155 59h37m-41 20h46','pylon')+path('M157 58v9m31-9v9m-35 12v11m39-11v11','ivory');
 if(g>=3)s+=path('M46 31q-17-9 0-15m43-7q-15-5-9-9','steam');
 s+=path('M11 142v-33l48-24v25l49-25v25l49-25v30h51v115H11z','wall')+path('M11 111l48-24v13l-48 24m49-11 48-24v13l-48 24m49-11 48-24v13l-48 24','roof')+rect(17,137,185,9,'accent');
 s+=windows(21,151,15,2,g,12)+rect(25,190,51,40,'glass')+rect(135,190,52,40,'glass')+path('M29 195h43m-43 7h43m-43 7h43m-43 7h43m-43 7h43M139 195h43m-43 7h43m-43 7h43m-43 7h43m-43 7h43','detail');
 s+=path('M5 231h210v8H5zM23 236v18h33m127-18v18h-32','rim');
 // Turbine stator, bearing and a separate substation are functional symbols.
 s+=circle(106,212,34,'turbine')+circle(106,212,27,'glass')+circle(106,212,8,'hub');
 for(let i=0;i<8;i++){if(g===1&&[1,2,5].includes(i))continue;s+=`<path class="e-blade" transform="rotate(${i*45} 106 212)" d="M103 202l-8-12 11-4 7 17-7 4z"/>`;}
 s+=path('M79 239l-5 17h64l-6-17M71 259h71','rim')+rect(165,246,44,25,'transformer')+path('M172 240v6m9-6v6m9-6v6m-18 6v13m6-13v13m6-13v13m6-13v13m6-13v13M12 265h49m-49 6h49','detail');
 if(g===1){s+=path('M80 30l5 21-9 14 11 14-8 16 13 13-2-20 11-14-11-15 7-14-11-17zM154 125l-15 13 7 15-15 11 22-7 3-14 11-12z','crack')+path('M26 195l53 21-5 11-53-21zM137 217l45-24 6 10-46 25z','board')+path('M83 199l15 6-3 7-14-5m31 27 7-14 8 3-5 15','break')+path('M88 57l13 5m-17 20-13 7m19 8 8 8M140 142l-13 6m24 8 11 8','damage-detail')+path('M38 257l10-10 13 8-3 11zM138 271l12-12 11 9-5 7z','rubble');}
 if(g===2)s+=path('M88 194l36 36m-36 0 36-36','idle')+rect(99,210,14,16,'lock')+path('M102 210v-5q4-8 8 0v5','edge');
 if(g>=4){s+=path('M3 248h54v21H3zM5 244h49v4M17 253v12m9-12v12m9-12v12m9-12v12','vehicle')+circle(14,271,5,'wheel')+circle(47,271,5,'wheel')+path('M124 62l20-15h17l-20 15zM127 53l19 3m-10-7 10 6','solar');}
 if(g===5)s+=path('M111 83V48h28v35M113 49h24m-21 9h18m-18 8h18m-18 8h18M201 120V94h13v67m-10-63h7m-7 9h7m-7 9h7','wall')+path('M111 39h32v31h-32zM116 44h22v21h-22z','substation')+path('M126 43l-6 11h9l-6 11','stock')+path('M202 51v46m-13-24h26M205 51l9 8m-9 4 9 8m-9 4 9 8','pylon')+parcel(171,217,28)+path('M10 68l7-7m-2 14 8-8','spark');
 return s;
 }
 function draw(kind,grade){const key=kind+':'+grade;if(cache.has(key))return cache.get(key);const g=grade||3,id='ent-'+kind+'-'+(grade||0);const body=kind==='private'?shop(g):plant(g);
 const svg=`<svg class="enterprise-art ${grade?'':'unrated'}" style="--state:${colors[grade||0]}" viewBox="0 0 230 290" aria-hidden="true"><defs><pattern id="${id}-scan" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 1H4" stroke="#091215" opacity=".4" stroke-width="1"/></pattern></defs><style>
.enterprise-art .e-edge{stroke:#72b9b3}.enterprise-art .e-wall{fill:#163b39;stroke:#69b6af;stroke-width:1.5}.enterprise-art .e-window,.enterprise-art .e-glass{fill:#061217;stroke:#789e97;stroke-width:1}.enterprise-art .e-light{fill:#80b9a2;stroke:#a8c7b6;stroke-width:.5}.enterprise-art .e-detail{stroke:#66918a;stroke-width:.65}.enterprise-art .e-accent{fill:var(--state);fill-opacity:.5;stroke:#90bbb0}.enterprise-art .e-sign{fill:#07171b;stroke:#83bfb5;stroke-width:1.6}.enterprise-art .e-sign-inner{fill:var(--state);fill-opacity:.58;stroke:none}.enterprise-art .e-sign-rule{stroke:#0c2226;stroke-width:2.5}.enterprise-art .e-canopy,.enterprise-art .e-cloth{fill:#235854;stroke:#8ec0af}.enterprise-art .e-stripe{fill:var(--state);fill-opacity:.85;stroke:none}.enterprise-art .e-hem{fill:#3b7770;stroke:#a4c4b0}.enterprise-art .e-stock{fill:#a9b773;stroke:#d1c88d;stroke-width:1}.enterprise-art .e-glass-shine{stroke:#8cc9c1;opacity:.45}.enterprise-art .e-parcel{fill:#635d32;stroke:#c5b578}.enterprise-art .e-paper{fill:#abc3b2;stroke:#d5dfce}.enterprise-art .e-paper-ink{stroke:#213c3d;stroke-width:1}.enterprise-art .e-board{fill:#6d4549;stroke:#d78985}.enterprise-art .e-board-grain{stroke:#b27673;stroke-width:.6}.enterprise-art .e-crack{fill:#020a0e;stroke:#bb7877;stroke-width:.8}.enterprise-art .e-fracture{stroke:#090e12;stroke-width:5}.enterprise-art .e-damage-detail{stroke:#c78d82;stroke-width:.6}.enterprise-art .e-rubble{fill:#715154;stroke:#c27b78}.enterprise-art .e-idle{stroke:#ae9472;opacity:.65}.enterprise-art .e-shutter{fill:#374747;stroke:#7e9b92}.enterprise-art .e-lock{fill:#b9a066;stroke:#e0c58a}.enterprise-art .e-vehicle{fill:#276c67;stroke:#87c8b9;stroke-width:1.2}.enterprise-art .e-wheel{fill:#061318;stroke:#c5cfb9;stroke-width:2}.enterprise-art .e-spark{stroke:#b6d59d;stroke-width:1.6}.enterprise-art .e-rim{fill:#417a6e;stroke:#a4c5b1}.enterprise-art .e-pylon{stroke:#73b6b0;stroke-width:1}.enterprise-art .e-ivory{stroke:#c9cdb9;stroke-width:2}.enterprise-art .e-steam{stroke:#b5c9b9;stroke-width:2}.enterprise-art .e-roof{fill:#4c8274;stroke:#b3cbb5}.enterprise-art .e-turbine{fill:#2b645f;stroke:#a6c6b2;stroke-width:2}.enterprise-art .e-hub{fill:#cdc991;stroke:#e1d7a6}.enterprise-art .e-blade{fill:var(--state);stroke:#b3d2bd;stroke-width:.7}.enterprise-art .e-transformer{fill:#354e52;stroke:#78b2ae}.enterprise-art .e-break{fill:#030c10;stroke:#d38b84}.enterprise-art .e-solar{fill:#326a7d;stroke:#8cc9ce}.enterprise-art .e-substation{fill:#32594e;stroke:#90c4ac}
</style><g fill="none" stroke="#83bcb0" stroke-linejoin="miter" stroke-width="1.2">${body}</g><rect x="1" y="1" width="226" height="282" fill="url(#${id}-scan)" pointer-events="none"/></svg>`;cache.set(key,svg);return svg;}
 return {draw,colors};
})();
