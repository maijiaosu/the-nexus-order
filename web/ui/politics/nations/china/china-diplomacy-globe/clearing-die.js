/* The two graded racks act on one clearing slip. Relative pressure moves the slip along the bed. */
(() => {
  const ink = '#071222', recess = '#182b40', steel = '#45617b', edge = '#95a9bd';
  const paper = '#d6c6b2', plate = '#8d9cac';
  const dollar = {face:'#67c8d9', rim:'#b3e6e9', bevel:'#39788b', shade:'#294a60'};
  const bloc = {face:'#db879e', rim:'#f3b7bd', bevel:'#965b72', shade:'#563f58'};
  const path = (d, fill, stroke=ink, width=1.25) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
  const line = (d, stroke, width=1) => path(d, 'none', stroke, width);
  const oval = (x,y,rx,ry,fill,stroke=ink,width=1) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
  const run = (n, cb) => Array.from({length:n}, (_,i)=>cb(i)).join('');
  const group = (transform, body) => `<g transform="${transform}">${body}</g>`;

  function bed() {
    return path('M10 48 31 43 123 44 144 48H237l18-4h93l22 4-11 7-112 2-18-2h-87l-16 3H27Z',recess,ink,1.5)
      + path('M10 48l18 4h101l14-3h93l11 3h104l19-4-12 8H246l-12-3h-89l-15 4H27Z',steel)
      + line('M28 52h100l15-3h90m13 3h103',edge,.85)
      + line('M47 58h68m155-1h65',steel,1.25)
      + run(11,i=>{const x=115+i*15; return line(`M${x} 54v${i===5?6:i%2?2.1:3.5}`,i===5?edge:steel,1)})
      + path('M187 62l3-5 3 5Z',edge,'none');
  }

  function ticket() {
    const holes = run(3,i=>oval(-14+i*7,52-i*.8,1.45,1.3,recess,'none'));
    return path('M-21 17l36-11 5 2-1 12 7 9 1 20-4 4-4-1-5 3-4-1-5 4-5-1-5 4-5-1-9 3 3-17-6-12Z','#65596c',ink,1.4)
      + path('M-22 15 12 5l8 5-3 14 4 12-3 15-6-.4-6 3-4-1-6 4-4-1-10 3 4-21-6-12Z',paper,ink,1.4)
      + path('M12 5l8 5-9 2Z','#ede1c9',ink,.8)
      + path('M-19 17 9 9l-1 4-25 6Z','#a39b96','none')
      + line('M-16 21l26-7m-25 10 11-3m9-1 7-2',steel,1)
      + line('M-17 43l25-7m-24 10 10-3m3-1 11-3',steel,.8)
      + line('M-17 49l28-7',steel,.8)+holes
      + group('translate(1 31) rotate(-16)',oval(0,0,7.5,6.6,'none','#896d76',1.5)+oval(0,0,4.9,4.2,'none','#a08d91',.8)
        +line('M-3 0h5m-4-2h4m-3 4h2','#806c78',.9))
      + path('M15 25l5 12-2 14-4 3 1-15-4-9Z','#b0a3a1',ink,.65);
  }

  function outerBearing(isDollar, c) {
    const housing = path('M10 26l12-10 14 2 7 9-1 14-10 10-14-2-8-8Z',c.bevel,ink,1.6)
      + path('M11 25l10-10 15 2 6 8-10 2-8-3-9 6Z',c.face)
      + path('M16 45l8 5 10-2-2 5-16 1-7-4Z',steel,ink,.9);
    if (isDollar) {
      const coin=oval(25,33,13,13.5,c.face,ink,1.45)+oval(25,33,10.1,10.7,'none',c.shade,1.15)
        +line('M29 28q-5-3-8 .7-2 3 3.8 4.2 5 1.3 2.9 4.2-2.2 2.9-7.1.4M24.6 25v2.6m.2 11v2.2',recess,1.6);
      return housing+coin;
    }
    const face=path('M14 26l8-6 12 2 5 8-2 10-9 6-12-4-4-8Z',c.face,ink,1.35)
      +path('M17 27l7-5 9 1 5 7-3 9-8 5-9-4-3-8Z','none',c.shade,.9)
      +path('M18 34l5-9 4 1-5 10Z M23 37l6-10 4 1-6 11Z M29 39l5-9 2 4-4 6Z',c.shade,'none');
    return housing+face;
  }

  function rack(side, grade, front) {
    const isDollar=side==='usd', c=isDollar?dollar:bloc;
    const neck=front-19, heel=42, field=neck-heel-11;
    const rail = path(`M31 26l15-6 ${field+7} 0 11 7-2 11H51l-14 8-12-5Z`,c.shade,ink,1.55)
      +path(`M37 23l11-6H${neck-5}l8 6-7 5H47Z`,c.bevel)
      +path(`M47 28h${field+3}l9-5v17l-8 4H46Z`,recess)
      +line(`M49 22h${field-6}m-2 21H48`,plate,.8);
    const toothWidth=field/5;
    const teeth=run(5,i=>{
      const x=heel+6+i*toothWidth, w=toothWidth-1.3, engaged=i<=grade;
      const tip=Math.min(w*.38,5);
      const face=engaged?c.face:c.shade;
      return `<g data-tooth="${i+1}" data-engaged="${engaged}">`+
        path(`M${x} 26l${tip} -4h${w-tip}l-${tip} 4Z`,engaged?c.rim:steel,ink,.8)
        +path(`M${x} 26h${w}l-${tip} 10h-${w-tip}Z`,face,ink,1)
        +path(`M${x} 36h${w-tip}l-2 4h-${w-tip-2}Z`,engaged?c.bevel:recess,ink,.7)+'</g>';
    });
    const jaws=group(`translate(${front} 0)`,
      path('M-26 19l12 1 15 7 7 2 1 5-6 4-11-5-9 2-12-5Z',c.bevel,ink,1.5)
      +path('M-25 19l8-4 9 1 14 7 4 5-5 3-13-7-11 1Z',c.face)
      +line('M-17 18l7 .7 13 6',c.rim,1)
      +path('M-24 32l10 3 9 5 10-3 4 3-2 5-13 6-17-4-7-7Z',c.shade,ink,1.4)
      +path('M-25 31l7-3 14 10 10-3 2 3-13 7-13-6Z',c.bevel)
      +line('M-21 31l15 10 9-3',c.face,1.1)
      +path('M3 25l5 1 4 5-2 4-5-3Z',plate,ink,.9)
      +oval(-18,27,3.1,3.1,steel,ink,.8)+line('M-19.5 28l3-2',c.rim,.95));
    const transform=isDollar?'':' transform="translate(380 0) scale(-1 1)"';
    return `<g data-side="${side}"${transform}>${rail}${teeth}${jaws}${outerBearing(isDollar,c)}</g>`;
  }

  window.drawClearingDie = (usdGrade, bricsGrade) => {
    const contact=190+15*(usdGrade-bricsGrade);
    return `<svg class="clearing-die" viewBox="0 0 380 68" aria-hidden="true" data-usd-grade="${usdGrade}" data-brics-grade="${bricsGrade}" data-contact="${contact}" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">
      ${bed()}<g data-note="" transform="translate(${contact} 0)">${ticket()}</g>
      ${rack('usd',usdGrade,contact-17)}${rack('brics',bricsGrade,380-contact-17)}
    </svg>`;
  };
})();
