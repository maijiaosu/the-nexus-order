(function (root) {
  'use strict';
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  function stageIndex(definition, value) {
    if (!finite(value)) return -1;
    return (definition.cutoffs || []).filter(edge => value >= edge).length;
  }
  function formatValue(definition, value) {
    if (!finite(value)) return '—';
    let precision = definition.precision == null ? 1 : definition.precision;
    const actualStage = stageIndex(definition,value);
    while(precision < 15 && stageIndex(definition,Number(value.toFixed(precision))) !== actualStage)precision++;
    const n = new Intl.NumberFormat('zh-CN', {maximumFractionDigits: precision}).format(value);
    const unit = definition.unit || '';
    return n + (unit === '%' ? '%' : unit ? ' ' + unit : '');
  }
  function ranges(definition) {
    const edges = definition.cutoffs || [];
    const unit = definition.unit === '%' ? '%' : '';
    const n = value => new Intl.NumberFormat('zh-CN', {maximumFractionDigits: 2}).format(value);
    return edges.map((edge, index) => index ? n(edges[index - 1]) + '–<' + n(edge) + unit : '< ' + n(edge) + unit)
      .concat(edges.length ? ['≥ ' + n(edges[edges.length - 1]) + unit] : []);
  }
  function leaderNameGeometry(width, lines, textHeight, maximumHeight) {
    if (!finite(width) || width <= 0 || !finite(lines) || lines <= 1 || !finite(textHeight)) return null;
    const baseHeight = Math.min(width * 258 / 174, finite(maximumHeight) && maximumHeight > 0 ? maximumHeight : Infinity);
    const captionHeight = Math.max(48, Math.ceil(textHeight) + 6);
    const extra = Math.max(captionHeight - 28, captionHeight + 4 - baseHeight * 36 / 258);
    return {baseHeight,captionHeight,extra,upperHeight:baseHeight*222/258,plateHeight:baseHeight*36/258+extra,leftEdge:width*9/174,rightEdge:width*7/174,bottomEdge:baseHeight*7/258};
  }
  const api = {stageIndex, formatValue, ranges, leaderNameGeometry};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (!root.document) return;

  const doc = root.document;
  const names = {CHN:'中国',RUS:'俄罗斯',SAU:'沙特阿拉伯',SDN:'苏丹'};
  const model = {iso:null,country:null,bridge:null,drawer:null,metric:null,collapsed:new Set(),spirit:null};
  const sidebar = doc.getElementById('sidebar');
  const body = doc.getElementById('sb-body');
  const leaderLabels = new WeakMap();
  let initialized = false, closeSpiritTimer;
  const originalIcons = new Set(['parties','religion','unions','immigration','forced_labor','assembly','press','voting','recruitment','oversight','group-political','group-military','group-economic','group-social']);
  const icon = (id, stage) => {
    const source = root.TNO_STAGE_ICONS?.[id]?.[stage] || ('ui/nation-assets/' + (originalIcons.has(id) ? 'original/' + id + '.png' : 'indicators/' + id + '.svg'));
    return '<img src="'+esc(source.replace('nation-assets/original/','nation-assets/fidelity/original/').replace('nation-assets/stages/','nation-assets/fidelity/stages/'))+'?v=fidelity7" alt="" draggable="false">';
  };
  const record = () => (root.TNO_SYSTEMS?.countries || {})[model.iso] || {metrics:{},policies:{}};
  const defs = () => root.TNO_SYSTEMS?.definitions || {};
  function observation(id, definition) {
    return (definition.kind === 'metric' ? record().metrics : record().policies)?.[id] || null;
  }
  function currentIndex(id, definition) {
    const value = observation(id, definition);
    return definition.kind === 'metric' ? stageIndex(definition, value?.value) : (definition.stages || []).findIndex(stage => stage.id === value?.stage);
  }
  function currentLabel(id, definition) {
    const value = observation(id, definition);
    if (definition.kind === 'metric') return formatValue(definition, value?.value);
    return definition.stages?.find(stage => stage.id === value?.stage)?.label || '—';
  }
  function cells() {
    return (root.TNO_SYSTEMS?.groups || []).map(group => {
      const items = group.items.map(id => {
        const d = defs()[id];
        if (!d) return '';
        const selected = currentIndex(id,d), count = d.kind === 'metric' ? d.cutoffs.length + 1 : d.stages.length;
        const segments = '<svg viewBox="0 0 162 11" preserveAspectRatio="none" aria-hidden="true">' + Array.from({length:count}, (_,i) => '<rect x="'+(1+i*162/count)+'" y="1" width="'+(162/count-4)+'" height="9" fill="'+(i===selected?'#8bd6cf':'#092126')+'" stroke="#438d91" stroke-width="1"/>').join('') + '</svg>';
        return '<button class="nation-cell" data-nation-policy="'+esc(id)+'" aria-expanded="'+(model.drawer==='policy'&&model.metric===id)+'" aria-controls="nation-drawer">' + icon(id, d.stages?.[selected]?.id) + '<span class="nation-cell-copy"><span class="nation-cell-name" data-tno-font="policy" data-tno-color="#ffffff">'+esc(d.name)+'</span><strong data-tno-font="policy">'+esc(currentLabel(id,d))+'</strong><span class="nation-scale" aria-hidden="true">'+segments+'</span></span></button>';
      }).join('');
      const collapsed = model.collapsed.has(group.id);
      return '<section class="nation-group'+(collapsed?' collapsed':'')+'" data-nation-group="'+esc(group.id)+'"><button class="nation-group-title" data-nation-collapse="'+esc(group.id)+'" aria-expanded="'+!collapsed+'">'+icon('group-'+group.id)+'<span data-tno-font="group">'+esc(group.title)+'</span><span class="nation-fold" aria-hidden="true">'+(collapsed?'▾':'▴')+'</span></button><div class="nation-grid"'+(collapsed?' hidden':'')+'>'+items+'</div></section>';
    }).join('');
  }
  function top(c, pieHTML) {
    const l = c.leader || {};
    const affiliation = Object.prototype.hasOwnProperty.call(l,'party') ? l.party : l.identity ? null : c.party;
    const spirits = root.TNO_SPIRITS?.[model.iso] || [];
    const partyGlyph = {libdem:'liberalism',consdem:'conservatism',hybrid:'paternalism',comm:'communist',auth:'despotism',mon:'despotism',theo:'despotism',mil:'paternalism'}[c.cls];
    const partyMark = partyGlyph ? '<img class="nation-party-mark" src="ui/nation-assets/fidelity/ideologies/'+partyGlyph+'.png" alt="">' : '';
    const alliances = c.al?.length ? '<div class="nation-alliances">'+c.al.map(a=>'<span data-tno-font="policy">'+esc(a)+'</span>').join('')+'</div>' : '';
    return '<div class="nation-identity"><div class="nation-leader-column"><div class="leader" data-leader-name="'+esc(l.n||'')+'" tabindex="0" aria-label="'+esc(l.n||'')+'" aria-haspopup="dialog"><div class="ph"'+(l.photo?' style="background-image:url(\''+esc(l.photo)+'\')"':'')+' role="img" aria-label="'+esc(l.n||'')+' 头像"></div><div class="who"><div class="nm" data-tno-font="leader">'+esc(l.n||'—')+'</div><div class="tt">'+esc(l.t||'')+(affiliation?' '+esc(affiliation):'')+'</div><div class="sn">'+(l.since?'在位自 '+esc(l.since):'')+'</div></div></div>'+alliances+'</div><div class="nation-identity-right"><div class="nation-spirit-heading" data-tno-font="spirit-heading">民族精神</div><div class="nation-spirits">'+spirits.map((s,i)=>'<button class="nation-spirit" data-nation-spirit="'+i+'" aria-label="'+esc(s.title)+'" aria-describedby="nation-spirit-text"><img src="'+esc(s.icon.replace('nation-assets/spirits/','nation-assets/fidelity/spirits/'))+'?v=fidelity7" alt="" draggable="false"></button>').join('')+'</div><div class="nation-party-well"><div class="nation-party-label">'+partyMark+'<div class="ruling-title" data-tno-font="party" data-tno-color="#accac2">'+esc(c.party||'')+'</div></div><div class="sidebar-pie">'+pieHTML+'<div class="pie-tooltip" role="status"></div></div></div></div></div>';
  }
  function resizeLeaderName(leaf, detail) {
    if (!leaf?.isConnected) return;
    if (detail) leaderLabels.set(leaf, detail);
    const measured = leaderLabels.get(leaf), leader = leaf.closest('.leader');
    if (!measured || !leader) return;
    const maximum = Number.parseFloat(root.getComputedStyle(leader).getPropertyValue('--nation-leader-max-height'));
    const geometry = leaderNameGeometry(leader.getBoundingClientRect().width, measured.lines, measured.height, maximum);
    const keys = ['baseHeight','captionHeight','extra','upperHeight','plateHeight','leftEdge','rightEdge','bottomEdge'];
    leader.classList.toggle('multiline-name', !!geometry);
    for (const key of keys) {
      const property = '--nation-leader-' + key.replace(/[A-Z]/g, c => '-' + c.toLowerCase());
      if (!geometry) { if (leader.style.getPropertyValue(property)) leader.style.removeProperty(property); }
      else { const value = geometry[key] + 'px'; if (leader.style.getPropertyValue(property) !== value) leader.style.setProperty(property,value); }
    }
  }
  function layout() {
    if (!model.iso) return;
    resizeLeaderName(body.querySelector('.leader .nm'));
    const rect = sidebar.getBoundingClientRect();
    const transform = root.getComputedStyle?.(sidebar).transform;
    const translateX = transform && transform !== 'none' ? Number(transform.split(',')[4]) || 0 : 0;
    const edge = rect.right - translateX;
    doc.documentElement.style.setProperty('--nation-edge', edge+'px');
    doc.documentElement.style.setProperty('--nation-top', rect.top+'px');
    doc.documentElement.style.setProperty('--nation-height', rect.height+'px');
    const available = root.innerWidth - edge - 48;
    const drawer = doc.getElementById('nation-drawer');
    drawer.classList.toggle('nation-drawer-overlay', available < 290);
    drawer.style.setProperty('--drawer-width', Math.min(360, Math.max(290,available))+'px');
    if (model.spirit) positionSpirit(model.spirit.anchor);
  }
  function hideSpirit() {
    clearTimeout(closeSpiritTimer);
    model.spirit = null;
    doc.getElementById('nation-spirit-card').hidden = true;
  }
  function hoverPoint(event, anchor) {
    if (event && Number.isFinite(event.clientX) && Number.isFinite(event.clientY) &&
        (event.type.startsWith('pointer') || event.detail > 0)) {
      return {x:event.clientX, y:event.clientY};
    }
    const rect=anchor.getBoundingClientRect();
    return {x:rect.left+rect.width/2, y:rect.top+rect.height/2};
  }
  function placeTooltip(card, point) {
    const gap=12, edge=8;
    function axis(at, size, limit) {
      const preferred=at+gap+size <= limit-edge ? at+gap : at-gap-size;
      return Math.max(edge,Math.min(preferred,limit-edge-size));
    }
    card.style.left=axis(point.x,card.offsetWidth,root.innerWidth)+'px';
    card.style.top=axis(point.y,card.offsetHeight,root.innerHeight)+'px';
  }
  Object.assign(api,{hoverPoint,placeTooltip,hideSpirit});
  function positionSpirit(anchor) {
    if (!anchor?.isConnected) return hideSpirit();
    placeTooltip(doc.getElementById('nation-spirit-card'),model.spirit.point);
  }
  function showSpirit(anchor, pinned, event) {
    const s = root.TNO_SPIRITS?.[model.iso]?.[Number(anchor.dataset.nationSpirit)];
    if (!s) return;
    root.TNOCloseFactionCard?.();
    clearTimeout(closeSpiritTimer);
    const point=hoverPoint(event,anchor);
    if(model.spirit?.anchor===anchor){
      if(pinned)model.spirit.pinned=true;
      if(!model.spirit.pinned || pinned){model.spirit.point=point;positionSpirit(anchor);}
      return;
    }
    const card=doc.getElementById('nation-spirit-card');
    card.innerHTML='<div class="nation-spirit-card-head"><h3 data-tno-font="tooltip" data-tno-color="#dcda25">'+esc(s.title)+'</h3></div><div id="nation-spirit-text"></div>';
    const paragraphs=String(s.body).split(/\n+/).filter(Boolean);
    const marks=root.NexusPoliticalLanguage.annotate(paragraphs,{spirit:true,title:s.title,id:s.id});
    const content=card.querySelector('#nation-spirit-text');
    paragraphs.forEach((line,i)=>{
      const paragraph=doc.createElement('p');paragraph.dataset.tnoFont='tooltip';paragraph.dataset.tnoColor='#c7af8d';
      root.NexusPoliticalLanguage.render(paragraph,line,marks[i]);content.append(paragraph);
    });
    card.hidden=false; model.spirit={anchor,point,pinned:!!pinned}; positionSpirit(anchor);
    root.TNOBitmap?.paint(card);
  }
  function setDrawer(kind, id) {
    hideSpirit(); model.drawer=kind; model.metric=kind==='policy'?id:null;
    renderDrawer();
  }
  function closeDrawer() {
    model.drawer=null; model.metric=null; renderDrawer();
  }
  function renderDrawer() {
    const drawer=doc.getElementById('nation-drawer'), content=doc.getElementById('nation-drawer-body');
    const title=doc.getElementById('nation-drawer-title'), rail=doc.getElementById('nation-news-tab');
    drawer.hidden=!model.drawer; drawer.dataset.mode=model.drawer||'';
    rail.setAttribute('aria-expanded',String(model.drawer==='news')); rail.classList.toggle('on',model.drawer==='news');
    body.querySelectorAll('[data-nation-policy]').forEach(b=>{const on=model.drawer==='policy'&&b.dataset.nationPolicy===model.metric;b.classList.toggle('selected',on);b.setAttribute('aria-expanded',String(on));});
    if (!model.drawer) {content.innerHTML='';return;}
    if (model.drawer==='news') {
      title.textContent=(doc.getElementById('sb-name').textContent||'')+'新闻';
      content.innerHTML=model.bridge.newsHTML;
      const section=content.querySelector('.sec-intel');
      if(section){section.querySelector('.sec-t')?.remove();section.className='nation-news';}
      content.querySelectorAll('#news-list li').forEach(item=>item.dataset.newsCountry=model.iso);
    } else {
      const d=defs()[model.metric];
      if(!d) return closeDrawer();
      title.textContent=d.name;
      const index=currentIndex(model.metric,d), observed=observation(model.metric,d);
      const list=d.kind==='metric'?ranges(d).map(label=>({label})):d.stages;
      content.innerHTML='<ol class="nation-stages">'+list.map((s,i)=>'<li'+(i===index?' class="current" aria-current="true"':'')+'><div><h3 data-tno-font="stage">'+esc(s.label)+'</h3>'+(d.kind==='metric'&&i===index?'<strong class="nation-observed" data-tno-font="policy">'+esc(currentLabel(model.metric,d))+'</strong>':'')+(s.detail?'<p data-tno-font="policy">'+esc(s.detail)+'</p>':'')+'</div>'+icon(model.metric,s.id)+'</li>').join('')+'</ol>';
    }
    content.scrollTop=0; root.TNOBitmap?.paint(drawer); root.TNOScrollbars?.attach(content,content.parentElement).refresh(); layout();
  }
  function updateEntry() {
    const entry=doc.getElementById('nation-entry'), parliament=root.TNOParliaments?.[model.iso], visible=!!names[model.iso]||!!parliament;
    entry.hidden=!visible; doc.body.classList.toggle('nation-entry-visible',visible);
    if(!visible)return;
    const label=parliament?parliament.name+'议会':root.TNO_DOSSIERS?.[model.iso]?.title || {CHN:'中国内政',RUS:'总统中枢与联邦纵深',SAU:'王室与国家',SDN:'苏丹局势'}[model.iso];
    const image=parliament?parliament.icon:'ui/nation-assets/indicators/entry-'+model.iso.toLowerCase()+'.svg?v=fidelity7';
    entry.classList.toggle('parliament-entry',!!parliament);
    entry.dataset.ink=parliament?.tone||'natural';
    entry.innerHTML='<span class="nation-entry-arrow" aria-hidden="true"></span><img src="'+esc(image)+'" alt="">';
    entry.setAttribute('aria-label',label);entry.title=label;
    entry.setAttribute('aria-haspopup','dialog');entry.setAttribute('aria-controls','country-extension');
  }
  function init() {
    if(initialized)return; initialized=true;
    const mount=doc.createElement('div');mount.id='nation-overlays';
    mount.innerHTML='<button id="nation-news-tab" aria-controls="nation-drawer" aria-expanded="false" hidden><span aria-hidden="true">▸</span><span>新闻</span></button><aside id="nation-drawer" hidden aria-label="国家详情"><header><h2 id="nation-drawer-title" data-tno-font="window"></h2><button id="nation-drawer-close" aria-label="关闭详情">×</button></header><div class="nation-drawer-viewport"><div id="nation-drawer-body"></div></div></aside><aside id="nation-spirit-card" role="tooltip" hidden></aside><button id="nation-entry" hidden></button>';
    doc.body.append(mount);
    doc.getElementById('nation-news-tab').addEventListener('click',()=>model.drawer==='news'?closeDrawer():setDrawer('news'));
    doc.getElementById('nation-drawer-close').addEventListener('click',closeDrawer);
    body.addEventListener('click',e=>{
      const cell=e.target.closest('[data-nation-policy]');if(cell){setDrawer('policy',cell.dataset.nationPolicy);return;}
      const toggle=e.target.closest('[data-nation-collapse]');if(toggle){const id=toggle.dataset.nationCollapse;model.collapsed.has(id)?model.collapsed.delete(id):model.collapsed.add(id);const group=toggle.closest('.nation-group');group.classList.toggle('collapsed',model.collapsed.has(id));group.querySelector('.nation-grid').hidden=model.collapsed.has(id);toggle.setAttribute('aria-expanded',String(!model.collapsed.has(id)));toggle.querySelector('.nation-fold').textContent=model.collapsed.has(id)?'▾':'▴';return;}
      const spirit=e.target.closest('[data-nation-spirit]');if(spirit)showSpirit(spirit,true,e);
    });
    body.addEventListener('tno-bitmap-painted',e=>{if(e.detail?.role==='leader'&&e.target.matches('.leader .nm'))resizeLeaderName(e.target,e.detail);});
    ['pointerover','focusin'].forEach(type=>body.addEventListener(type,e=>{const b=e.target.closest('[data-nation-spirit]');if(b)showSpirit(b,false,e);}));
    body.addEventListener('pointermove', e=>{
      if(model.spirit && !model.spirit.pinned && model.spirit.anchor.contains(e.target)){
        model.spirit.point=hoverPoint(e,model.spirit.anchor);positionSpirit(model.spirit.anchor);
      }
    });
    ['pointerout','focusout'].forEach(type=>body.addEventListener(type,e=>{if(e.target.closest('[data-nation-spirit]')&&!model.spirit?.pinned)closeSpiritTimer=setTimeout(hideSpirit,240);}));
    const card=doc.getElementById('nation-spirit-card');
    if(root.ResizeObserver)new ResizeObserver(()=>{if(model.spirit)positionSpirit(model.spirit.anchor);}).observe(card);
    card.addEventListener('pointerenter',()=>clearTimeout(closeSpiritTimer));card.addEventListener('pointerleave',()=>{if(!model.spirit?.pinned)closeSpiritTimer=setTimeout(hideSpirit,240);});card.addEventListener('click',e=>{if(e.target.closest('[data-spirit-close]'))hideSpirit();});
    body.addEventListener('scroll',hideSpirit,{passive:true,capture:true});
    doc.getElementById('nation-drawer-body').addEventListener('click',e=>{
      if(model.drawer!=='news')return;
      const li=e.target.closest('#news-list li');if(!li||li.dataset.newsCountry!==model.iso)return;
      const a=e.target.closest('a');e.preventDefault();
      if(a&&!li.dataset.paper){model.bridge.openExternal?.(a.href);return;}
      if(li.dataset.paper==='1')model.bridge.openArticle(Number(li.dataset.ix));
      else li.classList.toggle('open');
    });
    doc.getElementById('nation-entry').addEventListener('click',()=>{
      if(!names[model.iso]&&!root.TNOParliaments?.[model.iso])return;
      hideSpirit();root.TNOOpenPolitics?.(model.iso);
    });
    doc.addEventListener('pointerdown',e=>{if(model.spirit&&!e.target.closest('#nation-spirit-card,[data-nation-spirit]'))hideSpirit();});
    doc.addEventListener('keydown',e=>{
      if(e.key!=='Escape'||doc.getElementById('paper')?.classList.contains('show')||doc.getElementById('country-extension')?.open)return;
      if(model.spirit){hideSpirit();e.preventDefault();e.stopImmediatePropagation();}
      else if(model.drawer){closeDrawer();e.preventDefault();e.stopImmediatePropagation();}
    },true);
    root.addEventListener('resize',layout);
    if(root.ResizeObserver)new ResizeObserver(layout).observe(sidebar);
  }
  api.show=function(iso,c,bridge){
    init();
    const changed=model.iso!==iso;
    if(changed){hideSpirit();if(model.drawer!=='news')model.drawer=null;model.metric=null;}
    const scroll=changed?0:(body.querySelector('.nation-policies')?.scrollTop||0);
    model.iso=iso;model.country=c;model.bridge=bridge;
    body.innerHTML=c&&!c.news_only?top(c,bridge.pieHTML)+'<div class="nation-policy-viewport"><div class="nation-policies">'+cells()+'</div></div>':'';
    const policyScroll=body.querySelector('.nation-policies');
    if(policyScroll){policyScroll.scrollTop=scroll;root.TNOScrollbars?.attach(policyScroll,policyScroll.parentElement);}
    doc.getElementById('sb-name').setAttribute('data-tno-font','window');
    root.TNOBitmap?.paint(sidebar);
    sidebar.classList.add('open');sidebar.classList.add('nation-sidebar');
    doc.body.classList.add('nation-sidebar-open');doc.getElementById('nation-news-tab').hidden=false;
    if(!c||c.news_only)model.drawer='news';
    updateEntry();renderDrawer();layout();
  };
  api.close=function(){
    if(!initialized)return;
    hideSpirit();closeDrawer();model.iso=null;
    doc.getElementById('nation-news-tab').hidden=true;doc.getElementById('nation-entry').hidden=true;
    doc.body.classList.remove('nation-sidebar-open','nation-entry-visible');
  };
  root.TNONationPanel=api;
})(typeof window!=='undefined'?window:globalThis);
