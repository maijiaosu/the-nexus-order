/* Original TNO bitmap text. Sources and extraction records are kept in work/nation-fidelity-20261030/fonts/. */
(function (root) {
  'use strict';

  const CLOSE = new Set(Array.from('，。！？：；、）》】」』〕〉］｝…,.!?;:%％)]}'));
  const OPEN = new Set(Array.from('（《【「『〔〈［｛([{'));
  const LATIN_WORD = /^[\p{Letter}\p{Number}_]$/u;
  const CJK = /[\u2e80-\u9fff\uf900-\ufaff]/u;

  function normalizeText(text, whiteSpace) {
    text = String(text).replace(/\r\n?/g, '\n');
    if (/^(pre|pre-wrap|break-spaces)$/.test(whiteSpace)) return text.replace(/\t/g, '    ');
    if (whiteSpace === 'pre-line') return text.replace(/[^\S\n]+/g, ' ').split('\n').map(line => line.trim()).join('\n');
    return text.replace(/\s+/g, ' ').trim();
  }

  function parseColor(value) {
    value = String(value || '').trim();
    if (/^#[\da-f]{3}$/i.test(value)) return value.slice(1).split('').map(c => parseInt(c + c, 16));
    if (/^#[\da-f]{6}$/i.test(value)) return value.slice(1).match(/../g).map(c => parseInt(c, 16));
    const components = value.replace(/^rgb\(\s*/i, '').replace(/\)$/, '').split(/[\s,]+/);
    if (components.length !== 3 || components.some(c => !/^\d+(?:\.\d+)?$/.test(c))) return null;
    const rgb = components.map(Number);
    return rgb.every(v => v >= 0 && v <= 255) ? rgb.map(Math.round) : null;
  }

  function canBreak(left, right) {
    if (!left || !right) return true;
    if (OPEN.has(left) || CLOSE.has(right)) return false;
    if (/\s/.test(left) || left === '-' || left === '–' || left === '/') return true;
    if (CJK.test(left) || CJK.test(right)) return true;
    return !(LATIN_WORD.test(left) && LATIN_WORD.test(right));
  }

  /** Layout is in original FNT pixels. Glyph tuple: x,y,w,h,xoffset,yoffset,xadvance. */
  function layoutText(text, font, maxWidth, options) {
    options = options || {};
    const whiteSpace = options.whiteSpace || 'normal';
    text = normalizeText(text, whiteSpace);
    const missing = Array.from(new Set(Array.from(text).filter(c => c !== '\n' && !font.chars[c.codePointAt(0)])));
    if (missing.length) return {missing, text, lines: []};
    const wrap = whiteSpace !== 'nowrap' && whiteSpace !== 'pre';
    const limit = wrap && Number.isFinite(maxWidth) ? Math.max(1, maxWidth) : Infinity;
    const lines = [];
    const preserveSpaces = /^(pre|pre-wrap|break-spaces)$/.test(whiteSpace);
    const advance = chars => chars.reduce((sum, c) => sum + font.chars[c.codePointAt(0)][6], 0);
    for (const paragraph of text.split('\n')) {
      let remaining = Array.from(paragraph);
      if (!remaining.length) { lines.push({chars: [], width: 0}); continue; }
      while (remaining.length) {
        let width = 0, fit = 0, lastBreak = 0;
        while (fit < remaining.length) {
          const nextWidth = width + font.chars[remaining[fit].codePointAt(0)][6];
          if (nextWidth > limit && fit > 0) break;
          width = nextWidth; fit++;
          if (canBreak(remaining[fit - 1], remaining[fit])) lastBreak = fit;
          if (width > limit) break;
        }
        let end = fit;
        if (fit < remaining.length && lastBreak > 0) end = lastBreak;
        // Avoid an opening mark at line end or a closing mark alone on the next line.
        if (end < remaining.length && end > 1 && OPEN.has(remaining[end - 1])) end--;
        if (end < remaining.length && CLOSE.has(remaining[end]) && end > 1 && lastBreak === 0) end--;
        const chars = remaining.slice(0, Math.max(1, end));
        remaining = remaining.slice(Math.max(1, end));
        if (!preserveSpaces) {
          while (chars.length && /\s/.test(chars.at(-1))) chars.pop();
          while (remaining.length && /\s/.test(remaining[0])) remaining.shift();
        }
        lines.push({chars, width: advance(chars)});
      }
    }
    const lineHeight = font.lineHeight;
    return {missing: [], text, lines, width: Math.max(0, ...lines.map(l => l.width)), height: lines.length * lineHeight, lineHeight};
  }

  const pure = {layoutText, normalizeText, parseColor};
  if (typeof module !== 'undefined' && module.exports) module.exports = pure;
  if (!root.document) return;
  if (root.TNOBitmap) return;

  const doc = root.document;
  const SELECTOR = '[data-tno-font]';
  const OWNED = 'data-tno-bitmap-owned';
  const scriptURL = doc.currentScript && doc.currentScript.src;
  const metadataURL = new URL(scriptURL ? 'nation-assets/fonts/fonts.json' : 'ui/nation-assets/fonts/fonts.json', scriptURL || doc.baseURI);
  const states = new WeakMap();
  const active = new Set();
  const pending = new Set();
  const watches = new Map();
  const images = new Map();
  const tints = new Map();
  let metadata = null, frame = 0, mutationObserver = null;
  const api = {paint, available: false, error: null, metrics: pure};
  root.TNOBitmap = api;

  const px = value => Number.parseFloat(value) || 0;
  function connected(element) { return !!element && element.isConnected; }
  function owned(node) {
    const el = node && (node.nodeType === 1 ? node : node.parentElement);
    return !!el && !!el.closest('[' + OWNED + ']');
  }
  function candidates(scope) {
    if (typeof scope === 'string') scope = doc.querySelector(scope);
    scope = scope || doc;
    const found = [];
    if (scope.nodeType === 1 && scope.matches(SELECTOR)) found.push(scope);
    if (scope.querySelectorAll) found.push(...scope.querySelectorAll(SELECTOR));
    return found;
  }
  function visible(element) {
    if (!connected(element) || !element.getClientRects().length) return false;
    const r = element.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.right > -80 && r.left < root.innerWidth + 80 && r.bottom > -120 && r.top < root.innerHeight + 120;
  }
  function isLeaf(element) {
    if (element.namespaceURI !== 'http://www.w3.org/1999/xhtml' || element.isContentEditable || /^(INPUT|TEXTAREA|SELECT|OPTION|CANVAS|SCRIPT|STYLE)$/.test(element.tagName)) return false;
    return Array.from(element.childNodes).every(node => node.nodeType === 3 || node.nodeType === 8 || (node.nodeType === 1 && (node.hasAttribute(OWNED) || node.matches('span[data-concept-ink]') && !node.children.length)));
  }
  function sourceText(element) {
    return Array.from(element.childNodes).filter(node => !(node.nodeType === 1 && node.getAttribute(OWNED) === 'canvas')).map(node => node.nodeType === 8 ? '' : node.textContent).join('');
  }
  function glyphInks(element) {
    if (!element.querySelector('[data-concept-ink]')) return null;
    const source=element.querySelector('['+OWNED+'="text"]') || element;
    const inks=[];
    for(const node of source.childNodes){
      const color=node.nodeType===1 ? node.dataset.conceptInk : null;
      // Wrapping can drop whitespace, but never reorders printed glyphs.
      for(const char of node.textContent || '')if(!/\s/u.test(char))inks.push(color || null);
    }
    return inks;
  }
  function contentWidth(element, style) {
    style = style || root.getComputedStyle(element);
    return Math.max(0, element.clientWidth - px(style.paddingLeft) - px(style.paddingRight));
  }
  function availableWidth(element, style) {
    let width = contentWidth(element, style);
    const parent = element.parentElement;
    if (!parent) return width;
    const ps = root.getComputedStyle(parent);
    const parentWidth = contentWidth(parent, ps);
    if (ps.display.includes('grid') && !['stretch', 'normal'].includes(ps.justifyItems) && !['stretch'].includes(style.justifySelf)) width = parentWidth;
    // An existing canvas must not stop an intrinsically sized leaf from shrinking with its parent.
    if (parentWidth > 0) width = Math.min(width || parentWidth, parentWidth);
    return width;
  }
  function register(element) {
    let state = states.get(element);
    if (state) return state;
    state = {element, source: null, canvas: null, signature: '', promise: null, again: false, dead: false, observed: new Map()};
    states.set(element, state); active.add(state);
    watch(element, state);
    if (element.parentElement) watch(element.parentElement, state);
    if (intersectionObserver) intersectionObserver.observe(element);
    return state;
  }
  function watch(element, state) {
    if (!resizeObserver) return;
    let subscribers = watches.get(element);
    if (!subscribers) { subscribers = new Set(); watches.set(element, subscribers); resizeObserver.observe(element); }
    subscribers.add(state);
  }
  function unwatch(state) {
    for (const [element, subscribers] of watches) {
      subscribers.delete(state);
      if (!subscribers.size) { watches.delete(element); resizeObserver.unobserve(element); }
    }
  }
  function restore(state, reason, missing) {
    const element = state.element;
    for (const child of Array.from(element.children)) {
      if (child.getAttribute(OWNED) === 'text') child.replaceWith(...Array.from(child.childNodes));
      else if (child.getAttribute(OWNED) === 'canvas') child.remove();
    }
    state.source = null; state.canvas = null; state.signature = '';
    if (element.hasAttribute('data-tno-font')) {
      element.setAttribute('data-tno-bitmap-state', 'fallback');
      element.setAttribute('data-tno-bitmap-reason', reason);
      if (missing && missing.length) element.setAttribute('data-tno-bitmap-missing', missing.join(''));
      else element.removeAttribute('data-tno-bitmap-missing');
    } else {
      element.removeAttribute('data-tno-bitmap-state'); element.removeAttribute('data-tno-bitmap-reason'); element.removeAttribute('data-tno-bitmap-missing');
    }
    return 'fallback';
  }
  function dispose(state) {
    state.dead = true; pending.delete(state); active.delete(state);
    if (intersectionObserver) intersectionObserver.unobserve(state.element);
    unwatch(state); states.delete(state.element);
  }
  function queue(state) {
    if (!state || state.dead) return;
    pending.add(state);
    if (!frame) frame = root.requestAnimationFrame(flush);
  }
  function flush() {
    frame = 0;
    const batch = Array.from(pending); pending.clear();
    for (const state of batch) {
      if (!connected(state.element)) { dispose(state); continue; }
      if (!state.element.hasAttribute('data-tno-font')) { restore(state, 'unmarked'); dispose(state); continue; }
      if (visible(state.element)) render(state);
    }
  }
  function loadAtlas(name) {
    if (!images.has(name)) {
      images.set(name, new Promise((resolve, reject) => {
        const image = new root.Image(); image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Unable to load original font atlas: ' + name));
        image.src = new URL(name, metadataURL).href;
      }));
    }
    return images.get(name);
  }
  function tintAtlas(image, name, rgb) {
    const key = name + ':' + rgb.join(',');
    if (tints.has(key)) {
      const cached = tints.get(key); tints.delete(key); tints.set(key, cached); return cached;
    }
    const canvas = doc.createElement('canvas');
    canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d', {willReadFrequently: true});
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i] = Math.floor(pixels.data[i] * rgb[0] / 255);
      pixels.data[i + 1] = Math.floor(pixels.data[i + 1] * rgb[1] / 255);
      pixels.data[i + 2] = Math.floor(pixels.data[i + 2] * rgb[2] / 255);
    }
    context.putImageData(pixels, 0, 0); tints.set(key, canvas);
    while (tints.size > 16) tints.delete(tints.keys().next().value);
    return canvas;
  }
  function install(state, canvas) {
    const element = state.element;
    const hasNewNodes = Array.from(element.childNodes).some(node => !(node.nodeType === 1 && node.hasAttribute(OWNED)));
    if (!state.source || state.source.parentNode !== element || hasNewNodes) {
      const source = doc.createElement('span'); source.setAttribute(OWNED, 'text');
      source.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:pre;border:0;pointer-events:none;';
      for (const node of Array.from(element.childNodes)) {
        if (node.nodeType === 1 && node.getAttribute(OWNED) === 'canvas') node.remove();
        else if (node.nodeType === 1 && node.getAttribute(OWNED) === 'text') { source.append(...Array.from(node.childNodes)); node.remove(); }
        else source.append(node);
      }
      element.append(source); state.source = source;
    }
    if (state.canvas && state.canvas.parentNode === element) state.canvas.replaceWith(canvas);
    else element.append(canvas);
    state.canvas = canvas;
    element.setAttribute('data-tno-bitmap-state', 'ready');
    element.removeAttribute('data-tno-bitmap-reason'); element.removeAttribute('data-tno-bitmap-missing');
  }
  async function render(state) {
    if (state.promise) { state.again = true; return state.promise; }
    state.promise = (async () => {
      const element = state.element;
      if (state.dead || !connected(element) || !metadata) return 'queued';
      let role = element.getAttribute('data-tno-font');
      const font = metadata.roles[role];
      if (!font) return restore(state, 'unknown-role');
      if (!isLeaf(element)) return restore(state, 'non-leaf');
      const originalText = sourceText(element);
      if (!originalText.trim()) return restore(state, 'empty');
      let image;
      try { image = await loadAtlas(font.atlas); }
      catch (_) { return restore(state, 'atlas-unavailable'); }
      if (state.dead || !connected(element)) return 'queued';
      if (role !== element.getAttribute('data-tno-font')) { state.again = true; return 'queued'; }
      if (!isLeaf(element)) return restore(state, 'non-leaf');
      if (!visible(element)) return 'queued';
      const style = root.getComputedStyle(element);
      if (style.writingMode !== 'horizontal-tb' || style.direction === 'rtl') return restore(state, 'unsupported-writing-mode');
      if (style.display === 'inline' || style.display === 'contents') return restore(state, 'requires-text-box');
      const rawScale = style.getPropertyValue('--tno-font-scale').trim();
      const scale = rawScale ? Number(rawScale) : 1;
      if (!Number.isFinite(scale) || scale <= 0 || scale > 8) return restore(state, 'invalid-scale');
      const rgb = parseColor(element.getAttribute('data-tno-color') || font.color);
      if (!rgb) return restore(state, 'invalid-color');
      const width = availableWidth(element, style);
      if (width <= 0) return 'queued';
      const text = sourceText(element);
      const layout = layoutText(text, font, width / scale, {whiteSpace: style.whiteSpace});
      if (layout.missing.length) return restore(state, 'missing-glyph', layout.missing);
      const dpr = Math.max(0.5, Math.min(4, root.devicePixelRatio || 1));
      const align = style.textAlign;
      const inks=glyphInks(element);
      const signature = JSON.stringify([role, text, inks, Math.round(width * 64) / 64, scale, dpr, rgb, align, style.whiteSpace]);
      if (signature === state.signature && state.canvas && state.canvas.parentNode === element && state.source && state.source.parentNode === element) return 'unchanged';
      const lineWidth = width / scale;
      let minX = 0, maxX = lineWidth, minY = 0, maxY = layout.height;
      const placed = [];
      let inkIndex=0;
      layout.lines.forEach((line, index) => {
        let x = align === 'center' ? (lineWidth - line.width) / 2 : (align === 'right' || align === 'end') ? lineWidth - line.width : 0;
        for (const char of line.chars) {
          const g = font.chars[char.codePointAt(0)];
          const gx = x + g[4], gy = index * layout.lineHeight + g[5];
          minX = Math.min(minX, gx); maxX = Math.max(maxX, gx + g[2]);
          minY = Math.min(minY, gy); maxY = Math.max(maxY, gy + g[3]);
          const ink=inks && !/\s/u.test(char) ? inks[inkIndex++] : null;
          placed.push({g, x: gx, y: gy, ink}); x += g[6];
        }
      });
      const cssWidth = (maxX - minX) * scale, cssHeight = (maxY - minY) * scale;
      const backingWidth = Math.max(1, Math.ceil(cssWidth * dpr)), backingHeight = Math.max(1, Math.ceil(cssHeight * dpr));
      if (backingWidth > 8192 || backingHeight > 16384 || backingWidth * backingHeight > 16777216) return restore(state, 'canvas-size-limit');
      const canvas = doc.createElement('canvas'); canvas.setAttribute(OWNED, 'canvas'); canvas.setAttribute('aria-hidden', 'true');
      canvas.width = backingWidth; canvas.height = backingHeight;
      canvas.style.cssText = 'display:block;max-width:none;pointer-events:none;user-select:none;text-shadow:none;filter:none;font-weight:400;';
      canvas.style.width = cssWidth + 'px'; canvas.style.height = cssHeight + 'px';
      canvas.style.marginLeft = minX * scale + 'px';
      // Ink may extend beyond its advance; cancel that bleed in intrinsic layout to avoid resize growth.
      canvas.style.marginRight = (lineWidth - maxX) * scale + 'px';
      const context = canvas.getContext('2d'); context.imageSmoothingEnabled = false; context.scale(dpr * scale, dpr * scale);
      const atlas = tintAtlas(image, font.atlas, rgb);
      const accents=new Map();
      for (const {g, x, y, ink} of placed){
        if(!g[2] || !g[3])continue;
        if(ink && !accents.has(ink))accents.set(ink,tintAtlas(image,font.atlas,parseColor(ink)));
        context.drawImage(ink ? accents.get(ink) : atlas, g[0], g[1], g[2], g[3], x - minX, y - minY, g[2], g[3]);
      }
      install(state, canvas); state.signature = signature;
      element.dispatchEvent(new root.CustomEvent('tno-bitmap-painted', {bubbles: true, detail: {role, width, height: cssHeight, lines: layout.lines.length}}));
      return 'painted';
    })().catch(() => state.dead ? 'queued' : restore(state, 'render-unavailable')).finally(() => {
      state.promise = null;
      if (state.again && !state.dead) { state.again = false; queue(state); }
    });
    return state.promise;
  }

  async function paint(scope) {
    await api.ready;
    const elements = candidates(scope);
    if (!metadata) return {painted: 0, fallback: elements.length, queued: 0};
    const jobs = [];
    let queued = 0;
    for (const element of elements) {
      if (!connected(element)) continue;
      const state = register(element);
      if (visible(element)) jobs.push(render(state)); else queued++;
    }
    const results = await Promise.all(jobs);
    return {painted: results.filter(r => r === 'painted').length, fallback: results.filter(r => r === 'fallback').length, queued: queued + results.filter(r => r === 'queued').length};
  }

  const resizeObserver = root.ResizeObserver ? new root.ResizeObserver(entries => {
    for (const entry of entries) {
      const subscribers = watches.get(entry.target);
      if (!subscribers) continue;
      const marker = Math.round(entry.contentRect.width * 64) + ':' + (entry.contentRect.height > 0);
      for (const state of subscribers) {
        if (state.observed.get(entry.target) !== marker) { state.observed.set(entry.target, marker); queue(state); }
      }
    }
  }) : null;
  const intersectionObserver = root.IntersectionObserver ? new root.IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) queue(states.get(entry.target));
  }, {rootMargin: '120px 80px'}) : null;

  function scan(scope) {
    for (const element of candidates(scope)) if (connected(element)) queue(register(element));
  }
  function startObserving() {
    if (root.MutationObserver) {
      mutationObserver = new root.MutationObserver(records => {
        for (const record of records) {
          const target = record.target.nodeType === 1 ? record.target : record.target.parentElement;
          if (!target) continue;
          if (record.type === 'characterData') {
            const host = target.closest(SELECTOR); if (host) queue(register(host));
            continue;
          }
          if (record.type === 'attributes') {
            if (owned(target)) continue;
            if (record.attributeName === 'data-tno-font' && !target.hasAttribute('data-tno-font')) { const state = states.get(target); if (state) { restore(state, 'unmarked'); dispose(state); } }
            else scan(target);
            continue;
          }
          const nodes = [...record.addedNodes, ...record.removedNodes];
          // Moving source nodes into the owned accessible span and replacing a canvas is internal.
          if (nodes.length && nodes.every(owned)) continue;
          const host = target.closest(SELECTOR); if (host) queue(register(host));
          for (const node of record.addedNodes) if (node.nodeType === 1 && !owned(node)) scan(node);
        }
        for (const state of active) if (!connected(state.element)) dispose(state);
      });
      mutationObserver.observe(doc.documentElement, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['data-tno-font', 'data-tno-color', 'style', 'class', 'hidden']});
    }
    root.addEventListener('resize', () => { for (const state of active) queue(state); }, {passive: true});
    root.addEventListener('pageshow', () => scan(doc));
    scan(doc);
  }

  // Classic-script metadata also works in Electron/Android file-based shells where fetch(file:) is unavailable.
  const metadataReady = root.TNO_BITMAP_FONTS ? Promise.resolve(root.TNO_BITMAP_FONTS) : Promise.resolve().then(() => root.fetch(metadataURL.href, {cache: 'no-cache'})).then(response => {
    if (!response.ok) throw new Error('Original font metadata: ' + response.status);
    return response.json();
  });
  api.ready = metadataReady.then(data => {
    if (!data || !data.roles || !data.roles.policy) throw new Error('Invalid original font metadata');
    metadata = data; api.available = true; startObserving(); return api;
  }).catch(error => { api.error = error; return api; });
  api.loaded = api.ready;
})(typeof window !== 'undefined' ? window : globalThis);
