'use strict';
window.ChinaInfluence = (() => {
  let frame, main, drag;
  function mount(windowElement) {
    main = windowElement;
    if (!frame) {
      frame = document.createElement('iframe');
      frame.className = 'influence-view';
      frame.title = '中国势力';
      frame.src = '../china-influence/index.html?embedded=1&v=20261030-1#CHN';
      main.append(frame);
    }
    frame.hidden = false;
    window.scrollTo(0, 0);
  }
  function hide() { if (frame) frame.hidden = true; drag = null; }
  addEventListener('message', event => {
    if (!frame || frame.hidden || event.source !== frame.contentWindow ||
        (location.protocol !== 'file:' && event.origin !== location.origin)) return;
    const data = event.data;
    if (data?.type === 'tno-close-politics') {
      window.ChinaWindow.close();
      return;
    }
    if (data?.type !== 'tno-influence-drag') return;
    window.ChinaWindow.dragMessage(data);
  });
  return {mount, hide};
})();
