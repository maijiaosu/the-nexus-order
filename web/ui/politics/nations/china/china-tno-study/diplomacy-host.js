'use strict';
window.ChinaDiplomacy = (() => {
  let frame, main, drag;
  function mount(windowElement) {
    main = windowElement;
    if (!frame) {
      frame = document.createElement('iframe');
      frame.className = 'diplomacy-view';
      frame.title = '中国外交 · 环球同此凉热';
      frame.src = '../china-diplomacy-globe/index.html?embedded=1&v=spin20261103-1#ea';
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
    if (data?.type !== 'tno-diplomacy-drag') return;
    window.ChinaWindow.dragMessage(data);
  });
  return {mount, hide};
})();
