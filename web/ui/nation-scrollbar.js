/* Original TNO scrollbar artwork; the content element retains native scrolling. */
(function (global) {
  'use strict';
  var instances = new WeakMap();
  var nextId = 0;

  function attach(scroller, host) {
    if (!scroller || !host || !scroller.ownerDocument || !host.appendChild) {
      throw new TypeError('TNOScrollbars.attach requires a scroller and its positioned host.');
    }
    var previous = instances.get(scroller);
    if (previous && previous.host === host) {
      previous.refresh();
      return previous;
    }
    if (previous) previous.destroy();

    var doc = scroller.ownerDocument;
    var win = doc.defaultView || global;
    var rail = doc.createElement('div');
    var up = doc.createElement('button');
    var track = doc.createElement('div');
    var thumb = doc.createElement('div');
    var down = doc.createElement('button');
    var disposers = [];
    var observedChildren = new Set();
    var frame = 0;
    var repeatTimer = 0;
    var drag = null;
    var destroyed = false;
    var connected = scroller.isConnected && host.isConnected;
    var ownId = !scroller.id;
    var resizeObserver;
    var contentObserver;
    var attachmentObserver;

    if (ownId) scroller.id = 'tno-scroll-region-' + (++nextId);
    var controlledId = scroller.id;
    rail.className = 'tno-scrollbar';
    rail.hidden = true;
    up.className = 'tno-scrollbar-arrow tno-scrollbar-up';
    down.className = 'tno-scrollbar-arrow tno-scrollbar-down';
    up.type = down.type = 'button';
    up.setAttribute('aria-label', '向上滚动');
    down.setAttribute('aria-label', '向下滚动');
    up.setAttribute('aria-controls', controlledId);
    down.setAttribute('aria-controls', controlledId);
    track.className = 'tno-scrollbar-track';
    thumb.className = 'tno-scrollbar-thumb';
    thumb.tabIndex = 0;
    thumb.setAttribute('role', 'scrollbar');
    thumb.setAttribute('aria-label', scroller.getAttribute('aria-label') || '滚动');
    thumb.setAttribute('aria-orientation', 'vertical');
    thumb.setAttribute('aria-controls', controlledId);
    thumb.setAttribute('aria-valuemin', '0');
    thumb.setAttribute('aria-valuemax', '100');
    track.appendChild(thumb);
    rail.append(up, track, down);
    host.appendChild(rail);

    function listen(target, type, handler, options) {
      target.addEventListener(type, handler, options);
      disposers.push(function () { target.removeEventListener(type, handler, options); });
    }

    function range() { return Math.max(0, scroller.scrollHeight - scroller.clientHeight); }
    function travel() { return Math.max(0, track.clientHeight - thumb.offsetHeight); }
    function lineStep() {
      var line = parseFloat(win.getComputedStyle(scroller).lineHeight);
      return Math.max(24, Number.isFinite(line) ? line * 2 : 36);
    }
    function setScroll(value) {
      scroller.scrollTop = Math.max(0, Math.min(range(), value));
      schedule();
    }
    function stopRepeat() {
      win.clearTimeout(repeatTimer);
      repeatTimer = 0;
    }
    function releaseDrag() {
      if (!drag) return;
      var pointerId = drag.pointerId;
      drag = null;
      rail.classList.remove('is-dragging');
      if (thumb.hasPointerCapture && thumb.hasPointerCapture(pointerId)) {
        thumb.releasePointerCapture(pointerId);
      }
    }
    function watchChildren() {
      if (!resizeObserver) return;
      var children = new Set(Array.from(scroller.children).filter(function (node) { return node !== rail; }));
      observedChildren.forEach(function (node) {
        if (!children.has(node)) resizeObserver.unobserve(node);
      });
      children.forEach(function (node) {
        if (!observedChildren.has(node)) resizeObserver.observe(node);
      });
      observedChildren = children;
    }
    function refresh() {
      if (destroyed) return;
      if (connected && (!scroller.isConnected || !host.isConnected)) {
        destroy();
        return;
      }
      connected = connected || (scroller.isConnected && host.isConnected);
      var maximum = range();
      var visible = maximum > 0 && scroller.clientHeight > 0;
      rail.hidden = !visible;
      thumb.setAttribute('aria-disabled', String(!visible));
      if (!visible) {
        releaseDrag();
        stopRepeat();
      }
      var current = Math.max(0, Math.min(maximum, scroller.scrollTop));
      var progress = maximum ? current / maximum : 0;
      thumb.style.top = Math.round(progress * travel()) + 'px';
      thumb.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      up.disabled = !visible || current <= 0;
      down.disabled = !visible || current >= maximum - 0.5;
      watchChildren();
    }
    function schedule() {
      if (!destroyed && !frame) frame = win.requestAnimationFrame(function () { frame = 0; refresh(); });
    }
    function moveBy(direction) { setScroll(scroller.scrollTop + direction * lineStep()); }
    function bindArrow(button, direction) {
      listen(button, 'pointerdown', function (event) {
        if (event.button !== 0 || button.disabled) return;
        event.preventDefault();
        stopRepeat();
        button.focus({ preventScroll: true });
        button.setPointerCapture(event.pointerId);
        moveBy(direction);
        repeatTimer = win.setTimeout(function repeat() {
          if (destroyed || button.disabled) { stopRepeat(); return; }
          moveBy(direction);
          repeatTimer = win.setTimeout(repeat, 55);
        }, 320);
      });
      listen(button, 'click', function (event) {
        // Pointer presses already move on pointerdown; keyboard clicks have detail 0.
        if (event.detail === 0) moveBy(direction);
      });
      listen(button, 'pointerup', stopRepeat);
      listen(button, 'pointercancel', stopRepeat);
      listen(button, 'lostpointercapture', stopRepeat);
    }
    bindArrow(up, -1);
    bindArrow(down, 1);

    listen(thumb, 'pointerdown', function (event) {
      if (event.button !== 0 || !range()) return;
      event.preventDefault();
      event.stopPropagation();
      stopRepeat();
      thumb.focus({ preventScroll: true });
      drag = { pointerId: event.pointerId, offset: event.clientY - thumb.getBoundingClientRect().top };
      rail.classList.add('is-dragging');
      thumb.setPointerCapture(event.pointerId);
    });
    listen(thumb, 'pointermove', function (event) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      var distance = travel();
      if (!distance) return;
      event.preventDefault();
      var position = event.clientY - track.getBoundingClientRect().top - drag.offset;
      setScroll(position / distance * range());
    });
    listen(thumb, 'pointerup', releaseDrag);
    listen(thumb, 'pointercancel', releaseDrag);
    listen(thumb, 'lostpointercapture', releaseDrag);
    listen(track, 'pointerdown', function (event) {
      if (event.button !== 0 || event.target === thumb || !travel()) return;
      event.preventDefault();
      thumb.focus({ preventScroll: true });
      var position = event.clientY - track.getBoundingClientRect().top - thumb.offsetHeight / 2;
      setScroll(position / travel() * range());
    });
    listen(thumb, 'keydown', function (event) {
      var target = scroller.scrollTop;
      if (event.key === 'ArrowUp') target -= lineStep();
      else if (event.key === 'ArrowDown') target += lineStep();
      else if (event.key === 'PageUp') target -= scroller.clientHeight * 0.85;
      else if (event.key === 'PageDown') target += scroller.clientHeight * 0.85;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = range();
      else return;
      event.preventDefault();
      setScroll(target);
    });
    listen(rail, 'wheel', function (event) {
      if (event.ctrlKey || !event.deltaY || !range()) return;
      var multiplier = event.deltaMode === 1 ? lineStep() / 2 : event.deltaMode === 2 ? scroller.clientHeight : 1;
      var before = scroller.scrollTop;
      setScroll(before + event.deltaY * multiplier);
      if (scroller.scrollTop !== before) event.preventDefault();
    }, { passive: false });
    listen(scroller, 'scroll', schedule, { passive: true });
    listen(scroller, 'load', schedule, true);
    listen(win, 'resize', schedule, { passive: true });
    listen(win, 'blur', function () { stopRepeat(); releaseDrag(); });

    if (win.ResizeObserver) {
      resizeObserver = new win.ResizeObserver(schedule);
      resizeObserver.observe(scroller);
      resizeObserver.observe(host);
      resizeObserver.observe(track);
      watchChildren();
    }
    if (win.MutationObserver) {
      contentObserver = new win.MutationObserver(function (records) {
        if (records.some(function (record) { return !rail.contains(record.target); })) schedule();
      });
      contentObserver.observe(scroller, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'hidden', 'open', 'src'] });
      attachmentObserver = new win.MutationObserver(function () {
        if (connected && (!scroller.isConnected || !host.isConnected)) destroy();
        else if (!connected && scroller.isConnected && host.isConnected) schedule();
      });
      attachmentObserver.observe(doc.documentElement, { subtree: true, childList: true });
    }
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(schedule);

    function destroy() {
      if (destroyed) return;
      destroyed = true;
      stopRepeat();
      releaseDrag();
      if (frame) win.cancelAnimationFrame(frame);
      if (resizeObserver) resizeObserver.disconnect();
      if (contentObserver) contentObserver.disconnect();
      if (attachmentObserver) attachmentObserver.disconnect();
      disposers.forEach(function (dispose) { dispose(); });
      disposers.length = 0;
      observedChildren.clear();
      rail.remove();
      if (ownId && scroller.id === controlledId) scroller.removeAttribute('id');
      if (instances.get(scroller) === controller) instances.delete(scroller);
    }
    var controller = { host: host, element: rail, refresh: refresh, destroy: destroy };
    instances.set(scroller, controller);
    refresh();
    return controller;
  }

  global.TNOScrollbars = Object.freeze({ attach: attach });
})(window);
