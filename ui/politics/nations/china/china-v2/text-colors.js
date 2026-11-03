'use strict';
window.SocietyColorEditor=(()=>{
 const palette=[['青','#59d8ec'],['绿','#b4e866'],['黄','#f3d75a'],['橙','#ffa568'],['红','#e27d87'],['紫','#bd91ed'],['粉','#e4aacb'],['白','#edf0e8']];
 const base='#cbd5cd';let ink=null;
 function field(key,label,value,ranges,multiline){return `<div class="text-field"><label id="label-${key}">${label}</label><div role="textbox" aria-labelledby="label-${key}" aria-multiline="${multiline}" contenteditable="true" spellcheck="false" data-color-text data-key="${key}" class="color-text ${multiline?'multiline':''}">${ChinaText.render(value,ranges)}</div></div>`;}
 function hex(value){if(/^#[\da-f]{6}$/i.test(value))return value.toLowerCase();const rgb=value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);return rgb?'#'+rgb.slice(1,4).map(n=>Number(n).toString(16).padStart(2,'0')).join(''):null;}
 function read(el){
  const text=el.innerText.replace(/\r\n/g,'\n'),ranges=[];let cursor=0;
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
   const node=walker.currentNode,value=node.nodeValue.replace(/\r\n/g,'\n');if(!value)continue;
   const start=text.indexOf(value,cursor);if(start<0)continue;
   let color=null;
   for(let p=node.parentElement;p&&p!==el;p=p.parentElement){const c=hex(p.style.color||p.getAttribute('color')||'');if(c){color=c;break;}}
   if(color&&color!==base)ranges.push({start,end:start+value.length,color});cursor=start+value.length;
  }
  return {text,ranges:ChinaText.normalize(text,ranges)};
 }
 function attach(editor,toolbar,write){
  toolbar.innerHTML=`<span>文字颜色</span>${palette.map(([name,color])=>`<button type="button" class="color-swatch" style="--swatch:${color}" data-ink="${color}" aria-label="${name}色" aria-pressed="false" title="${name}色"></button>`).join('')}<label class="custom-color">自定义<input type="color" value="#59d8ec" aria-label="自定义颜色"><input type="text" value="#59d8ec" aria-label="HEX 色值" placeholder="#RRGGBB" maxlength="7" spellcheck="false"></label><button type="button" data-ink="${base}" aria-pressed="false">清除颜色</button><button type="button" data-stop>结束涂色</button>`;
  const custom=toolbar.querySelector('.custom-color'),colorInput=custom.querySelector('[type=color]'),hexInput=custom.querySelector('[type=text]');
  function choose(color,isCustom=false){
   ink=color;custom.classList.toggle('is-active',isCustom);
   toolbar.querySelectorAll('[data-ink]').forEach(b=>b.setAttribute('aria-pressed',String(!isCustom&&b.dataset.ink===ink)));
  }
  colorInput.addEventListener('click',()=>choose(colorInput.value,true));
  colorInput.addEventListener('input',()=>{hexInput.value=colorInput.value;hexInput.removeAttribute('aria-invalid');choose(colorInput.value,true);});
  hexInput.addEventListener('input',()=>{
   const raw=hexInput.value.trim().replace(/^#/,'');
   const valid=/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(raw);hexInput.setAttribute('aria-invalid',String(!valid));
   if(valid){const value='#'+(raw.length===3?[...raw].map(c=>c+c).join(''):raw).toLowerCase();colorInput.value=value;choose(value,true);}
  });
  hexInput.addEventListener('change',()=>{if(hexInput.getAttribute('aria-invalid')==='false')hexInput.value=colorInput.value;});
  function sync(el){const value=read(el);write(el.dataset.key,value.text,value.ranges);}
  function paint(){
   if(!ink)return;const selection=getSelection();if(!selection.rangeCount||selection.isCollapsed)return;
   const range=selection.getRangeAt(0),start=range.startContainer.nodeType===1?range.startContainer:range.startContainer.parentElement,end=range.endContainer.nodeType===1?range.endContainer:range.endContainer.parentElement;
   const el=start.closest('[data-color-text]');if(!el||!editor.contains(el)||end.closest('[data-color-text]')!==el)return;
   document.execCommand('styleWithCSS',false,true);document.execCommand('foreColor',false,ink);sync(el);
  }
  toolbar.addEventListener('mousedown',e=>{if(e.target.closest('button'))e.preventDefault();});
  toolbar.addEventListener('click',e=>{
   const button=e.target.closest('button');if(!button)return;
   choose(button.dataset.ink||null);
  });
  editor.addEventListener('pointerup',e=>{if(e.target.closest('[data-color-text]'))requestAnimationFrame(paint);});
  editor.addEventListener('keyup',e=>{if(e.target.closest('[data-color-text]')&&(e.key==='Shift'||e.shiftKey||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='a')))paint();});
  editor.addEventListener('input',e=>{const el=e.target.closest('[data-color-text]');if(el)sync(el);});
  editor.addEventListener('paste',e=>{if(!e.target.closest('[data-color-text]'))return;e.preventDefault();document.execCommand('insertText',false,e.clipboardData.getData('text/plain'));});
 }
 return {field,attach,read};
})();
