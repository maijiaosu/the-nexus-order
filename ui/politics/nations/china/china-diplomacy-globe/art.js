/* Shared geometry for the printed bezel, exchange press and binding hardware. */
window.AtlasArt = (() => {
  const range = (n, fn) => Array.from({length:n}, (_, i) => fn(i)).join('');
  const path = (d, fill='currentColor', stroke='none', w=1) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const line = (d,w=1,color='currentColor') => path(d,'none',color,w);
  const rect = (x,y,w,h,fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
  const circle = (x,y,r,fill,stroke='none',w=1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
  const group = (t,art) => `<g transform="${t}">${art}</g>`;
  const svg = (box,art,cls='') => `<svg class="${cls}" viewBox="${box}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${art}</svg>`;
  const accents = {na:'#709de0',sa:'#c486af',we:'#a79ed2',ee:'#809acb',me:'#d98b91',sas:'#cc92bc',sea:'#6ebbc9',ea:'#75bacf',wa:'#c28ba9',saf:'#ac9cba',eaf:'#d39994',caf:'#ba91b2',cas:'#9bafd5',oc:'#77bfcb'};
  return {accents,svg,path,line,rect,circle,group,range};
})();
