/* Regional engraved symbols. Complete geographic silhouettes are a separate underprint. */
window.regionalSeal = (() => {
  let serial = 0;
  const p = (d,o=1) => `<path d="${d}" fill="currentColor" fill-rule="evenodd" opacity="${o}"/>`;
  const l = (d,w=1,o=1) => `<path d="${d}" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" stroke-width="${w}" opacity="${o}"/>`;
  const e = (x,y,rx,ry,o=1) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="currentColor" opacity="${o}"/>`;
  const g = (t,a) => `<g transform="${t}">${a}</g>`;
  const rep = (n,f) => Array.from({length:n},(_,i)=>f(i)).join('');
  function temple(plate){
    let art=p('M57 74h41v14H57z M51 91h53v15H51z M41 111h74v22H41z',.59);
    const roof=(cx,y,r,h) => {
      const d=`M${cx} ${y-h}Q${cx-r*.35} ${y-4} ${cx-r} ${y}q${r*.22} 7 ${r} 7t${r} -7Q${cx+r*.35} ${y-4} ${cx} ${y-h}Z`;
      const ribs=rep(13,i=>{const n=(i-6)/6;return l(`M${cx+n*4} ${y-h+3}Q${cx+n*r*.45} ${y-3} ${cx+n*r*.90} ${y+1.2}`,.64)});
      return plate(p(d)+l(`M${cx-r+1} ${y+2}q${r*.75} 10 ${2*r-2} 0`,1.4),ribs+l(`M${cx-r+3} ${y}q${r*.8} 8 ${2*r-7} 0`,.88));
    };
    art+=roof(78,78,28,24)+roof(78,94,37,16)+roof(78,111,49,17);
    art+=e(78,52,2.1,2.8)+p('M77 50l1-7 1 7z');
    art+=rep(8,i=>p(`M${44+i*9.3} 115l2.3 .4-.2 15.2-2.3 .1z`,.9));
    art+=p('M35 132q42 10 86-1l-1 5q-40 10-88 0z',.80)+p('M30 139q47 10 96-1l4 4q-49 13-104 1z',.67)+p('M22 146q54 10 110-2l9 5q-52 14-126 3z',.52);
    return art;
  }
  function eastAsia({plate}){
    const peak=p('M99 126l17-12 17-10 13-14 6-.5 5 1 10 10 11 7 17 7 19 6-15 2-20-8-13-2-12-10-5 3-6-2-9 7-16 8z',.5)+
      l('M120 120l15-9 10-13 3-3-2 7 5-5 4 2 1-4 6 8 5 3',1.1,.78);
    const swell=p('M121 142q18-15 39-13 14 1 25-4-8 8-24 8-15 0-26 5 16-3 27-1 12 2 24-3-7 7-23 7-21-1-42 5z',.72)+l('M128 150q18-6 32-4t27-2m-16 6q14 1 22-3',1.15,.59);
    return peak+g('translate(-15 -30) scale(1.10)',temple(plate))+swell;
  }
  function northAmerica({plate}){
    const flame=plate(p('M58 66C36 58 38 43 48 32q0 12 6 14-5-19 11-36-3 14 4 19 4-10 1-18 20 15 13 37 6-4 9-12 3 20-15 30Z'),
      p('M53 61q-7-8-4-17 1 9 7 10-1-12 6-18-3 11 3 16 4-9 12-16-2 12-8 20l-3 7z'));
    const torch=plate(p('M42 67q22 5 49-1l-5 8-4 3-4 12-5 3-4 42-12 8-4-50-7-5-2-10-4-3Z',.91),
      l('M45 71q21 5 42-2M50 80q15 4 30-2M53 86q11 4 25-1M61 96l2 31',1.6)+rep(9,i=>l(`M${49+4.2*i} 73l1 4`,1)));
    const grip=plate(p('M21 151l16-23 10-12 5-14 5-9q4-3 7 1l5-3 6 3 2 5-4 5 1 5-5 5-1 6-6 4-5 11-13 6-7 11Z',.83),
      l('M53 101l10 3 8-6m-22 10 13 2 9-5m-24 10 12 3 9-5m-22 10 10 2 4-3m-22 14 10-9',1.6));
    const steel=p('M139 115V52l3-6 2 5v11h8V49l3-5 2 5v65l-4 1v-24h-9v25ZM144 68v10h9V68zm0 15v4h9v-4z',.80)+
      l('M87 112q29-6 54-59m-52 59q35-7 54-51m13-7q25 31 62 24m-62-17q28 26 61 20M84 118l136-26',1.7,.85)+
      rep(11,i=>{const x=93+i*10,y=x<143?109-(x-93)**1.4/5:63+15*Math.sin((x-157)/47*Math.PI*.7);return l(`M${x} ${y}V${116-(x-84)*.19}`,1,.65)})+
      l('M86 121l131-25',1.1,.72);
    return steel+flame+torch+grip;
  }
  function southAmerica({plate}){
    const summits=p('M8 105l19-18 8-19 12-14 7 6 18-16 6-20 9-12 11 19 6 7 4 23 18 22 18 11-9 3-24-15-16-29-7 2-4-8-11 10-6 15-16 10-8 10z',.84)+
      p('M61 85l20-36 5-3-3-7 4-13 6 18 5 1 5 20-9-6-5-8-7 4-8 16zm-37 11 14-21 9-11-3 15 6-2-11 13z',.46)+
      l('M63 84l12-17 6-15m-31 29 8-5 6-11m34-16 6 19 13 17',1.2);
    const terrace=plate(p('M6 112l50-15 21-16 11 3-20 19-20 7 33 2 18-8 13-13 12 3-10 12-23 12-22 3 33 5 31-8 20-12 7 4-19 14-37 9-29-1-15 7-35-1-19-13z',.97),
      l('M9 116l44-14 18-12M14 122l34-10m-29 17 34-12 28 1 15-5m-67 22 29-12 31 1 17-6m-62 18 20-7 22 .3m17 2 27-7 13-8',1.2)+
      rep(11,i=>l(`M${11+i*5.5} ${116-i*.9}l.5 2.9`,.81)));
    return summits+terrace;
  }
  function westernEurope({plate}){
    const frame='M62 9h2l1 11 2 13-.6 3c1 17 4 35 11 54l3 1 1 5q10 25 29 43l-16 .9q-12-23-26-23-14 .3-27 28l-18 1q22-26 32-48l-1-4 3-2q7-31 5-57l-1-2 1-13z';
    const holes=p('M64.5 43q-1 20-2.8 35l7-.3q-3.6-16-4.2-34.7Zm-4 42-2.4 6.5 16.6-1-2.6-6.2Zm-4.8 13.3-5.8 12.3 30.8-2.7-5-10.5ZM45 118l-9 15 19-16zm32.9-3.3 19 12-7.6-14Z');
    const lattice=l('M64 39l1 28m-3 4 5 5-5 .5 6 3.8m-9.7 5 12 4.3m-14 1.3 15-7M56 100l20 5-24 1 22-7m-29 18 7 2-12 6 8-.5-10 7m51-18-6 4 11 3-5 2 9 4',.85);
    const tower=plate(p(frame)+p('M51 95l29-2 .8 3-30 3zm7-14 14-1 .8 2.6-15 1zM23 143l18-.8 1 3-20 2zm73-6 13-.8 3 2.8-15 1.5z'),holes+lattice)+
      l('M64 8l.1-4M27 140q15-17 23-34m35-4q8 18 18 29',.85,.92);
    const rose=(()=>{let art='';
      for(let i=0;i<12;i++)art+=g(`rotate(${i*30} 155 68)`,p('M155 32l1.1-6 1.2 6-.4 3 3 3-.2 5-4.8 11-4.5-11-.4-5 4.1-4z',.7)+l('M151 36q2-4 4-4t4 4',1.0,.8));
      const trefoils=rep(12,i=>g(`rotate(${i*30+15} 155 68)`,l('M150 33q-2-4 1-5 3-1 4 2 1-4 4-3 3 2 .4 5-2 3-4.4 5z',.70,.95)));
      return l('M155 25a43 43 0 1 0 .01 0m0 6a37 37 0 1 0 .01 0',1.9,.75)+trefoils+art+e(155,68,6,6,.77);
    })();
    const flying=l('M95 155q31-26 38-44m-25 47q32-29 35-47m23-.5q14 14 41 17',2,.49)+
      p('M130 115l7-11 4 2-8 41-7 2zm63 15 3-12 2 9 4 2 .5 10-8-1z',.69);
    return rose+flying+tower;
  }
  function easternEurope({plate}){
    function dome(x,y,s,twist){
      const outline='M0 4C-1-1-14-5-16-14q-2-9 9-18 7-8 7-16 3 11 10 17 11 9 8 18Q16-4 3 4Z';
      const grooves=twist?l('M-15-11q17-6 22-19m-17 29q17-11 22-25m-10 25q13-10 15-16',2):l('M0-38q-11 20-5 35m6-34q8 18 4 33',1.35);
      return g(`translate(${x} ${y}) scale(${s})`,plate(p(outline),grooves)+p('M-11 6h23v5h-23zm2 8h19v18H-9z',.71)+l('M1-44v-13m-4 5h8',1.4)+l('M-7 18v10m6-11v11m6-12v11',1));
    }
    const bell=plate(p('M30 138l3-22 6-1 1-17 25-3v25l8-1v20z',.79),p('M46 120v-9q2-10 5 0v9zm9-1v-8q2-9 5-.5v8z'));
    const rail=l('M10 156q59-24 95-13c25 6 37 13 63 1l49-24m-203 41q58-26 91-13 37 17 66 0l47-25',2,.75)+
      rep(20,i=>{const x=15+i*10;const y=x<98?157-15*Math.sin((x-10)/90*1.5):x<160?145+(x-98)*.11:151-(x-160)*.45;return l(`M${x-2} ${y-1}l4 6`,1.4,.81)});
    return dome(46,99,.86,false)+dome(73,78,1.18,true)+dome(95,103,.67,false)+bell+
      p('M146 99l11-9 8 2 19-30 7-6 8 13 9 7 9 15-15-11-12-9-13 17-6 10z',.52)+
      l('M189 52q-4-8 4-12t2-12q11 9 2 17',1.5,.55)+rail;
  }
  function westAsiaNorthAfrica({plate}){
    const pyramid=(x,y,w,h)=>g(`translate(${x} ${y})`,plate(p(`M0 0l${w*.44} ${-h}L${w} -6Z`,.85),
        p(`M${w*.44} ${-h+3}L${w-3} -6 ${w*.49} -4Z`,.67)+rep(9,i=>{const u=(i+1)/10;return l(`M${w*.44*(1-u)} ${-h*(1-u)}l${w*.46*u} ${-2*u}`,.88)})));
    const minaret=plate(p('M166 131l3-7 1-22-3-2v-4l4-1 1-25-4-1 1-5 4-1 2-25 2-3q-5-10 0-14l3-7 3 8q4 6 0 13l1 3 3 24 4 3v4l-4 2 1 24 4 2 .1 5-5 1 2 23 3 4z',.84),
      p('M177 58l.7-14q2-4 3 0l.9 13Zm-1 31 .4-13q2-3 3 .2l.8 13z')+l('M172 66l13-1m-15 34 17-1m-13 28 12-1',1.1));
    const dome=plate(p('M148 131q.5-14 9-18 6-4 7-9l2 5q13 6 16 20z',.64),l('M153 127q3-9 10-14m5 0q4 4 6 13',1.2));
    return pyramid(51,116,90,54)+pyramid(11,130,97,76)+minaret+dome+l('M8 137q43-7 72-4m-43 10 47-6m45-3 74-7',1,.55);
  }
  function southAsia({plate}){
    const dome=plate(p('M36 83q16-4 11-12-7-19 8-31 14-12 16-19l2-8 3 8q4 6 17 14 20 13 15 31-2 8 1 9l9 6q-40 11-82 2z'),
      l('M47 74q31 9 59-4m-55 8q23 5 54-3m-47-9q-7-20 16-41m5 0q16 18 14 37',1.45)+l('M67 28q7 4 15-1m-15 1 6 5 6-5',1));
    const hall=plate(p('M36 85l79-3 .7 46-79 7zm-14 13 13-7v44l-16 2V99zm97-11 11 7v33l-11 2z',.77),
      p('M55 128v-20q2-9 11-13 11 2 14 11v19Zm-12 4v-12q3-6 5-.2v12zm46-4v-14q3-6 6-1v14zm12-1v-17q3-7 7-2v17z')+l('M48 129V101q8-10 18-12 12 2 19 11v24',1.4));
    const tower=(x,y,s)=>g(`translate(${x} ${y}) scale(${s})`,p('M0 103l2-5 2-26-3-2v-3l4-1 1-22-3-2 1-3h3l1-18-2-2v-3l3-.4q-3-7 1-11l2-5 2 4q4 3 2 10l3 2v3l-2 2 1 18 3 1v2l-2 2 2 22 3 1v3l-2 2 2 25 3 4z',.82));
    const mandala=rep(12,i=>g(`rotate(${i*30} 168 108)`,plate(p('M168 73q-7-5-8-16 6 2 8 7 1-5 7-10 1 12-7 19Z',.82),l('M168 68q-1-4-5-8',.85))))+
      l('M168 70a38 38 0 1 0 .01 0m0 6a32 32 0 1 0 .01 0',1.2,.57);
    return mandala+tower(10,38,.91)+tower(112,32,.89)+dome+l('M74 8v12m-3-8q3 3 6-1',1.5)+hall+
      p('M13 139l116-12 13 4-128 15z',.86)+l('M28 151l73-9m-51 13 26-4',1.1,.55);
  }
  function southEastAsia({plate}){
    function lotusSpire(x,y,s) {
      const profile='M0 0l-13 .4 .4-7-4-1 2-6 3-1-2-4 4-5-2-3 3-6 3 1-1-5 3-5 2 2-1-4 3-4 3 3-1 6 2-3 3 4-1 6 3-1 2 6-2 3 4 4-2 4 4 2 1 5-3 1v8z';
      return g(`translate(${x} ${y}) scale(${s})`,plate(p(profile),l('M-10-10q9 4 22-1m-20-5q8 3 15-1m-12-7q5 2 9-.4m-7-4q4 2 6-.7M0-39l.5 26',1.05)));
    }
    const temple=lotusSpire(41,108,1.02)+lotusSpire(56,95,.81)+lotusSpire(74,87,1.41)+lotusSpire(96,94,.88)+lotusSpire(109,106,.95)+
      plate(p('M15 129v-8l12-5 8-10 5 3 7 8 8-6 7-6V89l25-1v18l10 4 9 6 9-6 8 6 11 4v8l-25 4-57 .5z',.78),
      p('M66 124v-17q8-14 15-1v18zm-27 2v-6q3-6 5-.5v6zm67-2v-6q3-5 5 0v6z')+l('M18 126q39 7 67 2m-20-29 19-.4',1.1))+
      l('M18 134q52 7 113-2',1.6,.67);
    const cloth=plate(p('M167 42q-3 26-20 60 16 1 29 7-7-33-9-67z',.89),
      l('M164 66q-3 17-12 32m12-18-5 20m4-9-1 12',1))+p('M171 58q12 15 26 24-9 9-16 21z',.61);
    const prahu=l('M162 119l5-83 12 76m-10-69 33 61',1.4,.9)+
      plate(p('M137 108q18 15 48 7 14-5 24-18-3 20-15 27-30 12-56-6l-6-10z'),l('M142 116q32 15 57-3m-50 9q21 8 39 1',1.35));
    return temple+cloth+prahu;
  }
  function centralAsia({plate}){
    const crown=l('M154 26a32 25 0 1 0 .01 0m0 5a26 20 0 1 0 .01 0',2.4,.87)+
      plate(p('M123 44q30 1 60-4l2 3q-30 6-62 5zm0 7q32 .7 62-5v3q-27 6-61 5zm1 8q31 0 59-5l-2 3q-29 5-55 5zM144 27h3l5 48-3 1zm8-.6 3-.2 5 48-3 .5zm7 0h3l5 46-3 1z'),l('M123 50l61-7',.68));
    const felt=plate(p('M18 105q15-27 51-39l4-5 15-4 8 5q28 6 51 27l5 11-2 35q-54 18-129 7Z',.85),
      p('M68 139l-1-29 21-4 2 31z')+l('M22 104q55 11 126-9m-124 18q55 10 125-9m-123 28q56 7 122-8M63 75l-17 23m35-29-8 31m17-32 17 29m-12-27 29 21',1.4)+
      rep(10,i=>l(`M${25+12*i} ${112-Math.max(0,i-3)*.9}l5 6 5-7`,1.15)));
    return p('M24 80l22-17 14-8 14-18 10 8 19-21 15 17 9-3 15 11-16-4-8 4-15-12-18 21-11-5-11 11z',.44)+crown+felt+l('M68 141l21-4m-26 10 32-6m-107 4 49 .5',1.3,.77);
  }
  function westAfrica({plate}){
    const wall=plate(p('M13 135l3-45 12-1 3-20 3-1 5 19 10-.6 4-31 7-3 5 29 14-3 4-44 3-.6 2-8 7-1 2 7 3 .6 7 42 15 .2 4-36 3-.2 2-7 5-.6 3 7 3 1 7 36 17 1 5-22 3-.4 6 26 9 2 3 37-42 11-71 3z',.91),
      p('M61 127v-20q7-13 13-2v21zm24-.4v-22q8-16 16-2v22Zm28-2v-23q7-13 13-2v21zm26-5V99q6-13 11-1v19z')+
      l('M20 127l2-33m15 33 4-35m14 35 3-39m30 1 3-46m8 44-3-50m36 47 1-30m9 31-4-36',1.15));
    const finials=[e(92,24,2.6,3.6),e(132,32,2.3,3.2),e(57,52,1.3,1.9)].join('');
    const posts=[[54,73,2],[84,54,3],[127,59,3],[25,96,2],[54,94,4],[85,87,4],[126,84,3],[155,91,2]].map(([x,y,count])=>
      rep(count,i=>p(`M${x-4} ${y+i*5.2}l9-3 1 1.9-9 3.8z`)+p(`M${x+5} ${y+i*5.2-.9}l7-2 .8 1.4-6.5 3.6z`,.77))).join('');
    const textile=plate(p('M134 133l43-16 28 11-42 18-9-2-25 10-9-5z',.73),
      rep(7,i=>g(`translate(${139+i*6} ${133-i*2.18})`,p('M0 0l4-2 8 3-3 3z')+l('M5 6l9-4',.8))))+
      rep(10,i=>l(`M${133+i*6.8} ${149-i*2.4}l-2 6`,.95,.72));
    const earthen=rep(5,i=>l(`M${18+i*28} ${130-i*.5}l6 1.1m-.4-3.7 4 .2`,.55,.66));
    const rafterEnds=[[54,73,2],[84,54,3],[127,59,3],[25,96,2],[54,94,4],[85,87,4],[126,84,3],[155,91,2]].map(([x,y,count])=>rep(count,i=>e(x-3,y+i*5.2,.88,.8,.95))).join('');
    return textile+plate(wall,posts)+finials+rafterEnds+earthen+l('M14 140q63 6 135-4',1.5,.56);
  }
  function eastAfrica({plate}){
    const escarpment=p('M11 104q13-13 28-17l22-14 10-6 10-13 11-4 8-9 18-1 8 3 6 3 2 8 8 4 12 13 21 10 18 15-23-7-23-6-14-15-12-4-5-6-9 4-8-2-12 10-14 4-18 13-21 7z',.78);
    const ice=p('M80 66l10-11 10-5 6-7 12-.7 8 2 5 4 2 5-7-2-5 4-6-1-6 4-4-2-9 6 2-5-6 5z')+l('M77 80l14-11 8-1m24-8 11 3 13 10m-35-27 7-.5',1.25,.71);
    const tree=plate(p('M18 110q3-9 11-8-3-7 9-8 7-8 13-4 5-8 14-5 7-5 12-.5 6-2 10 3 10-3 14 5l5 1q7 2 6 8-14 2-22 .5l-11 .8-12 18-3 22 13 6-36 .5 11-6 7-24-12-12-19 8-13-.1Z'),
      l('M43 103l11-3 10 10m22-13-12 7-10 14m-1 16 5-18 8-6',1.75)+p('M28 106l6-5 8-1-2 2-10 4zm24-10 6-4 6 1 4-3 10 1-10 3-6-.4z'));
    return escarpment+ice+tree+l('M23 151q24-3 57-1m-19 5 29-1',1.2,.5);
  }
  function centralAfrica({plate}){
    const okapi=plate(p('M132 115q7-8 16-7l13 1q5 .3 12-5l14-17 6-7 1-9 3-4 2 5-1 6 3-1 2-7 2 .5-1 7 5-5 6-.9-3 6-6 3 4 4 7 3 2 4-6 2-10-3-4 1-7 10-8 14-4 5-1 13 4 16 3 3-6 .6-6-20-.3-9-4 9-3 17 1.8 4-6 .4 1.4-6 2.2-19-3-6-14 .3-5 11-3 16 2 4-6 .6 2.5-20 1.8-9-6.2 6-4.6 16 1.4 5-5.7.5 .9-9 4.5-17-2-10-3-2q-4 5-3 12l-2 6-1.8-5 1-7q-1-10 4-16z',.85),
      p('M137 113q4 3 12 5l-1.9 2q-8-2-12-5zm-3 5q5 4 12 5l-1.5 2q-8-1-11-4zm1 6q4 3.3 9 4l-1.9 2.1-7-3zm5 7 2 .2-1 3.5-3.3-.5zM169 122l6.5.2-1 2.5-6-.6zm.7 5.1 5.5-.2-.9 2.3-4.7.3ZM202 81l6.5-6-2 3.5-4.1 3.4z')+
      l('M143 111q6-1.2 12-.3m14 2q4-2 6-5m3-1 8-13m1 7 6-9m7.5-7 3.8 1m-13-3.7q1-2 4.5-3',.92)+e(202,84,1.05,.9));
    return g('translate(-106 -46) scale(1.35)',okapi+l('M133 161l13-.6m13 .1 10-.5m10 0 14-1.2',.95,.56));
  }
  function southernAfrica({plate}){
    const mesa=plate(p('M16 108l14-16 12-8 12-18 7 5 14-11 13-1 9-10 20-1 11 .9 22-.6 8 3 2 10 8 1 7 14 17 8 15 13-28-7-21-12-14-2-18-7-27 1-17 12-17 2-13 9z',.75),
      l('M34 95l19-13 7-10m24-4 7-5h20l10-4h30m-53 13 20-3 11-4 21 1m5-2 9 6m-90 14 10-4',1.1));
    const petal=(x,y,s,rot)=>g(`translate(${x} ${y}) rotate(${rot}) scale(${s})`,plate(p('M0 0q-9-19-3-40l4-14q3 12 7 23Q12-14 0 0Z'),l('M.4-4Q-1-22 1-40',.95)));
    let florets='';for(let i=0;i<91;i++){const t=i*2.40,r=Math.sqrt(i/91),x=77+Math.cos(t)*r*15,y=110+Math.sin(t)*r*10-7*(1-r*r);florets+=l(`M${x} ${y}q1-2 .1-4.4l1-1.5`,.95,.97)}
    const cup=plate(p('M45 105q7 27 17 32 11 10 25 1 14-9 21-32-16 6-31 9-15 1-32-10z',.7),l('M49 111q8 14 19 18m22-3q9-4 14-13m-43 19 8 5m20-3 8-6',1.15));
    const corolla=petal(68,128,.82,-52)+petal(83,126,.84,47)+petal(69,123,.85,-35)+petal(84,121,.78,34)+petal(75,119,.76,-8)+florets+cup+
      petal(65,131,.58,-53)+petal(88,131,.58,57)+petal(69,136,.55,-40)+petal(85,136,.53,40)+petal(77,140,.50,-19)+petal(82,139,.47,18);
    const stem=plate(p('M77 134l6 2-9 21-4 .4 3-13q-17 0-26-11l-5-9q18 1 31 15zm4 3q14-18 32-17-11 18-32 24z',.82),l('M48 130l21 11m18-3 16-12',1));
    return mesa+stem+corolla;
  }
  function oceania({plate}){
    const shell=(d,cut)=>plate(p(d),l(cut,1.35));
    const sails=shell('M15 71q23 2 50 18l15 32-23-2Q45 94 15 71Z','M28 77q28 13 42 39m-35-36q22 12 32 29')+
      shell('M22 48q41 8 70 35l3 41-17-2Q62 79 22 48Z','M34 54q38 19 53 63M46 58q28 19 37 43')+
      shell('M43 31q45 8 76 29l-20 66-10-2Q81 74 43 31Z','M55 37q35 29 46 73m-34-67q24 22 34 53m-24-47q19 17 26 37')+
      shell('M97 124q20-44 51-63-10 38-32 61Z','M106 118q17-30 32-45m-22 41 16-25')+
      shell('M124 122q12-22 42-23l-17 23Z','M134 117l20-13');
    const podium=plate(p('M10 122l141 1 29 9-11 7-116 5-43-12Z',.86),l('M17 127l39 10 115-6M57 140l96-4',1.35));
    const surf=l('M14 144q15-3 28 .8t30 0m38 1q14-4 30-1m-63 8q14-4 26-1',1.1,.55);
    return sails+podium+surf;
  }
  const marks={na:northAmerica,sa:southAmerica,we:westernEurope,ee:easternEurope,me:westAsiaNorthAfrica,sas:southAsia,sea:southEastAsia,ea:eastAsia,wa:westAfrica,saf:southernAfrica,eaf:eastAfrica,caf:centralAfrica,cas:centralAsia,oc:oceania};
  return function regionalSeal(id,cls=''){
    const make=marks[id];
    if(!make) return '';
    const keys=[];
    const end=(art,holes)=>{
      const key='district-intaglio-'+(++serial);
      keys.push(`<mask id="${key}" x="-300" y="-300" width="800" height="800" maskUnits="userSpaceOnUse" style="mask-type:luminance"><rect x="-300" y="-300" width="800" height="800" fill="white"/><g color="black">${holes}</g></mask>`);
      return `<g mask="url(#${key})">${art}</g>`;
    };
    const art=make({plate:end});
    return `<svg xmlns="http://www.w3.org/2000/svg" class="${String(cls).replace(/[^\w -]/g,'')}" viewBox="0 0 230 180" data-regional-seal="${id}" aria-hidden="true"><defs>${keys.join('')}</defs>${art}</svg>`;
  };
})();
