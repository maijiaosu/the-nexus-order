/* Shared presentation rules for political influence pies and the ideology map. Labels and shares stay in the data. */
(function (root) {
  'use strict';
  const colors = {
    authoritarian:['#83868a','#797d82','#909398'], junta:['#41454a','#363a3f','#50545a'],
    paternal:['#efeee9','#e3e2dd','#f8f7f2'], communist:['#971d33','#85162a','#aa2940'],
    socialist:['#ea7876','#db6869','#f18983'], socialDem:['#ea94b9','#df81ab','#f3a7c5'],
    religious:['#40834e','#337342','#52935b'], farRight:['#6d432c','#5c3726','#805237'],
    ultra:['#151619','#101114','#212226'], liberalCon:['#264b86','#1c4075','#325a97'],
    populist:['#e8bf4f','#dbae3f','#f1cb64'], mao:['#c7282c','#b72127','#d03234'],
    liberal:['#79b5df','#69a8d5','#8bc2e6']
  };
  const groups = {
    authoritarian:'威权主义 专制主义 君主制 个人崇拜 专制民族主义', junta:'军政府', paternal:'家长制 家长制威权主义 家长式专制 家长制专制主义',
    populist:'民粹主义', mao:'毛主义 毛泽东思想',
    communist:'威权社会主义 共产主义 威权共产主义 布尔什维主义 共产党',
    socialist:'社会主义 极左翼自由社会主义 自由社会主义 左翼无政府主义 左翼民族主义 左翼民粹主义',
    socialDem:'社会民主 社会民主主义 民主社会主义 社民党',
    religious:'神权政治 宗教政治', farRight:'右翼温和民族主义 温和右翼民族主义 法西斯主义 右翼民族社会主义 右翼民粹主义',
    ultra:'极端民族主义 极端民族主义残余 极端军国主义',
    liberalCon:'自由保守主义 保守的自由主义 保守自由主义', liberal:'绿色生态 绿党 新自由主义 自由主义'
  };
  const byLabel = new Map();
  for (const [id, names] of Object.entries(groups)) for (const name of names.split(' ')) byLabel.set(name,id);
  function family(label,iso) {
    const actor=root.NexusPieActors?.[iso]?.[label];
    if (actor === "unassigned") return null;
    if (Object.prototype.hasOwnProperty.call(colors, actor)) return actor;
    const clean = String(label).normalize('NFKC').replace(/\([^()]*\)\s*$/,'').trim();
    const [base,...rest] = clean.split(/[-—–]/), sub=rest.join('-');
    if (base==='民粹主义') {
      if (sub.includes('右翼') || sub.includes('右派')) return 'farRight';
      if (sub.includes('左翼') || sub.includes('左派')) return 'socialist';
    }
    if (base==='民族主义') {
      if (/左翼|左派/.test(sub)) return 'socialist';
      if (/^(?:右翼|温和右翼|修宪右翼|疑欧保守|秩序右翼)$/.test(sub)) return 'farRight';
      if (/保王|保皇/.test(sub)) return 'authoritarian';
    }
    if (base==='保守主义' && /^(?:温和自由|自由保守|自由意志派)$/.test(sub)) return 'liberalCon';
    if ((base==='威权主义' || base==='军国主义') && sub.includes('军政府')) return 'junta';
    if (base==='社会民主' && /^(?:绿党|绿色生态)$/.test(sub)) return 'liberal';
    if (base==='社会主义' && /^(?:社会民主|社民阵线|民主社会主义)/.test(sub)) return 'socialDem';
    if (base==='社会主义' && /^(?:共产党|共产主义|布尔什维主义|马列)/.test(sub)) return 'communist';
    return byLabel.get(base.trim()) || null;
  }
  const purple = '#9257b5';
  const displayOverrides = new Map([
    ['ISR', new Map([['法西斯主义', purple]])],
    ['USA', new Map([['民粹主义-右翼', purple]])],
    ['CHN', new Map([
      ['威权社会主义-右派', colors.authoritarian[0]],
      ['威权社会主义-中间派', colors.liberalCon[0]]
    ])]
  ]);
  function color(label,iso) {
    return displayOverrides.get(iso)?.get(label) ?? familyColor(label,iso);
  }
  function familyColor(label,iso) {
    const id=family(label,iso);
    if (!id) {
      const base=String(label).normalize('NFKC').split(/[-—–(]/)[0].trim();
      const preserved={部族政治:'#998e83',军阀割据:'#645e59',无政府:'#59534f',教派分权:'#aa9d91'};
      return Object.prototype.hasOwnProperty.call(preserved,base) ? preserved[base] : '#756e63';
    }
    if (byLabel.has(label)) return colors[id][0];
    let hash=0; for(const char of String(label)) hash=(Math.imul(hash,31)+char.charCodeAt(0))>>>0;
    return colors[id][hash % colors[id].length];
  }
  // Mix only with black or white. Equal brightness steps remain visible through the scanlines.
  function shadeRamp(base, count, pinned) {
    if (count === 1) return [base];
    const rgb = base.slice(1).match(/../g).map(channel => parseInt(channel, 16));
    const brightness = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
    const step = Math.min(23, 230 / (count - 1));
    const span = step * (count - 1);
    const first = Math.max(12, Math.min(brightness - span / 2, 245 - span));
    let targets = Array.from({length: count}, (_, i) => first + step * i);
    if (pinned) {
      // Align the nearest slot with the exact requested color.
      const nearest = Math.round((brightness - first) / step);
      targets = targets.map((_, i) => brightness + (i - nearest) * step);
    }
    return targets.map(target => {
      target = Math.max(0, Math.min(255, target));
      const end = target >= brightness ? 255 : 0;
      const mix = (target - brightness) / (end - brightness);
      return '#' + rgb.map(channel => Math.round(channel + (end - channel) * mix)
        .toString(16).padStart(2, '0')).join('');
    });
  }

  function chartColors(pie, iso) {
    const fixed = displayOverrides.get(iso) ?? new Map();
    const fills = new Map();
    const groups = new Map();
    const redirectedFamilies = new Set();
    for (const [label] of pie) {
      if (fills.has(label)) continue;
      const id = family(label, iso);
      const fill = color(label, iso);
      const base = fixed.get(label) ?? colors[id]?.[0] ?? fill;
      if (fixed.has(label)) redirectedFamilies.add(id);
      fills.set(label, fill);
      if (!groups.has(base)) groups.set(base, []);
      groups.get(base).push(label);
    }
    for (const [base, labels] of groups) {
      if (labels.length === 1) {
        const label = labels[0];
        if (redirectedFamilies.has(family(label, iso))) fills.set(label, base);
        continue;
      }
      const movable = labels.filter(label => !fixed.has(label)).sort();
      const pinned = movable.length < labels.length;
      const shades = shadeRamp(base, movable.length + Number(pinned), pinned)
        .filter(shade => !pinned || shade !== base);
      movable.forEach((label, index) => fills.set(label, shades[index]));
    }
    return fills;
  }
  function rulingColor(country, iso) {
    if (!country || !country.party) return null;
    const association = root.NexusRulingPartyColors?.[iso];
    // A changed government must never inherit the old party's color or the largest slice.
    if (!association || association[0] !== country.party) return '#756e63';
    const label = association[1];
    const fixed = displayOverrides.get(iso)?.get(label);
    if (fixed) return fixed;
    const id = family(label, iso);
    if (['communist','socialist','mao'].includes(id)) return colors.communist[0];
    // Use the legend's family color, without party-to-party pie shading.
    return colors[id]?.[0] ?? '#756e63';
  }
  function mapColor(hex) {
    const rgb = hex.slice(1).match(/../g).map(channel => parseInt(channel,16));
    const gray = rgb[0]*0.299 + rgb[1]*0.587 + rgb[2]*0.114;
    return '#' + rgb.map(channel => Math.round((channel*0.7 + gray*0.3)*0.55)
      .toString(16).padStart(2,'0')).join('');
  }
  const legend = [
    ['威权主义', [colors.authoritarian[0]]], ['军政府', [colors.junta[0]]],
    ['家长制', [colors.paternal[0]]], ['共产主义', [colors.communist[0]]],
    ['社会民主主义', [colors.socialDem[0]]], ['宗教政治', [colors.religious[0]]],
    ['法西斯／右翼民粹', [colors.farRight[0], purple]],
    ['极端民族主义', [colors.ultra[0]]],
    ['自由保守主义', [colors.liberalCon[0]]], ['自由主义', [colors.liberal[0]]],
    ['民粹主义', [colors.populist[0]]], ['其他', ['#756e63']]
  ];
  root.NexusIdeologyPalette = Object.freeze({family,color,chartColors,rulingColor,mapColor,legend});
})(typeof window!=='undefined'?window:globalThis);
