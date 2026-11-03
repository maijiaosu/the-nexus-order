'use strict';
// Production window controls; the approved drawing and selection code stay unchanged.
if (parent !== window && new URLSearchParams(location.search).get('embedded') === '1') {
  const send = message => parent.postMessage(message, location.protocol === 'file:' ? '*' : location.origin);
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || event.defaultPrevented || document.querySelector('dialog[open]')) return;
    event.preventDefault();
    send({type: 'tno-close-politics'});
  });
  const header = document.getElementById('header');
  let dragging = false;
  header.style.cursor = 'grab';
  header.style.touchAction = 'none';
  const blocked = target => target.closest('#info-button,[role=button],a,button');
  header.addEventListener('pointerdown', event => {
    if (event.button || blocked(event.target)) return;
    dragging = true;
    header.setPointerCapture(event.pointerId);
    header.style.cursor = 'grabbing';
    event.preventDefault();
    send({type: 'tno-influence-drag', phase: 'start', x: event.screenX, y: event.screenY});
  });
  header.addEventListener('pointermove', event => {
    if (dragging) send({type: 'tno-influence-drag', phase: 'move', x: event.screenX, y: event.screenY});
  });
  const stop = () => {
    if (!dragging) return;
    dragging = false;
    header.style.cursor = 'grab';
    send({type: 'tno-influence-drag', phase: 'end'});
  };
  header.addEventListener('pointerup', stop);
  header.addEventListener('lostpointercapture', stop);
  header.addEventListener('dblclick', event => {
    if (!blocked(event.target)) send({type: 'tno-influence-drag', phase: 'reset'});
  });
}
