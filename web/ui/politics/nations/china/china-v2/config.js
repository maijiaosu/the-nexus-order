'use strict';
window.ChinaText=(()=>{
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function normalize(text,ranges=[]){
  const colors=Array(text.length).fill(null);
  for(const r of Array.isArray(ranges)?ranges:[]){
   if(!Number.isInteger(r.start)||!Number.isInteger(r.end)||!/^#[\da-f]{6}$/i.test(r.color))continue;
   colors.fill(r.color.toLowerCase(),Math.max(0,Math.min(text.length,r.start)),Math.max(0,Math.min(text.length,r.end)));
  }
  const result=[];
  for(let start=0;start<colors.length;){let end=start+1;while(end<colors.length&&colors[end]===colors[start])end++;if(colors[start])result.push({start,end,color:colors[start]});start=end;}
  return result;
 }
 function render(text,ranges,svg=false){
  text=String(text??'');let at=0,html='';
  for(const r of normalize(text,ranges)){html+=escape(text.slice(at,r.start));html+=svg?`<tspan style="fill:${r.color}">${escape(text.slice(r.start,r.end))}</tspan>`:`<span style="color:${r.color}">${escape(text.slice(r.start,r.end))}</span>`;at=r.end;}
  return html+escape(text.slice(at));
 }
 function fields(source,values){return Object.fromEntries(Object.entries(values).map(([k,text])=>[k,normalize(text,source?.[k])]));}
 return {normalize,render,fields};
})();

window.readChinaConfig=function(input,defaults=DEFAULT_DATA){
 const out=structuredClone(defaults);
 out.societyUI={title:'中国社会思潮',roots:'思想根源',positions:'主要主张',labels:['社会话语权','经济影响力','党中央势力']};
 for(const t of out.thoughts){t.media=[null,null];t.roots=t.roots.replace('社会民主主义与民主社会主义的改革目标并不完全相同，此分类聚焦二者交叠的泛左议题。','').replace('毛派与学术新左派并非同一群体，在国家、市场及政治参与问题上也有分歧。','').replace('这一分类借用','源于');}
 if(window.CHINA_SOCIETY_AUTHORED){Object.assign(out,structuredClone(window.CHINA_SOCIETY_AUTHORED));}
 if(!input||typeof input!=='object')return out;
 const str=(x,f)=>typeof x==='string'?x.slice(0,4000):f;
 const num=(x,f,lo,hi)=>typeof x==='number'&&Number.isFinite(x)?Math.min(hi,Math.max(lo,x)):f;
 const image=(x,f)=>typeof x==='string'&&/^(?:assets\/)?[\w\u3400-\u9fff-]+\.(?:png|jpg|jpeg|webp)$/.test(x)?x:f;
 const textKeys=(target,source,keys)=>{for(const k of keys)target[k]=str(source[k],target[k])};
 if(input.societyUI){textKeys(out.societyUI,input.societyUI,['title','roots','positions']);out.societyUI.labels=out.societyUI.labels.map((v,i)=>str(input.societyUI.labels?.[i],v));}
 out.levels=out.levels.map((v,i)=>str(input.levels?.[i],v));
 for(const t of out.thoughts){const s=Array.isArray(input.thoughts)&&input.thoughts.find(x=>x&&x.id===t.id);if(!s)continue;textKeys(t,s,['name','fullName','concept','quote','quoteSource','roots','positions']);t.share=num(s.share,t.share,0,100);t.photo=image(s.photo,t.photo);t.media=[0,1].map(i=>{const m=s.media?.[i];return m&&typeof m.src==='string'&&(/^(?:data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+|\.\.\/china-society\/assets\/authored\/[a-z0-9-]+\.(?:jpeg|png|webp))$/.test(m.src))?{src:m.src,alt:str(m.alt,''),x:num(m.x,50,0,100),y:num(m.y,50,0,100),grayscale:num(m.grayscale,35,0,100)}:null;});if(/^#[\da-f]{6}$/i.test(s.color))t.color=s.color;for(let i=0;i<3;i++){t.levels[i]=Math.round(num(s.levels?.[i],t.levels[i],1,9));t.trends[i]=Math.round(num(s.trends?.[i],t.trends[i],-3,3))}}
 if(!out.thoughts.some(t=>t.share>0))throw new Error('思潮权重总和必须大于零');
 for(const [id,t] of Object.entries(out.countries)){const s=input.countries?.[id];if(!s)continue;textKeys(t,s,['text']);if(['敌对','不友善','中立','良好','盟友'].includes(s.attitude))t.attitude=s.attitude;if(t.cn&&t.us)for(let i=0;i<3;i++){t.cn[i]=Math.round(num(s.cn?.[i],t.cn[i],1,9));t.us[i]=Math.round(num(s.us?.[i],t.us[i],1,9))}}
 for(const [id,t] of Object.entries(out.provinces)){const s=input.provinces?.[id];if(!s)continue;if(['腾飞','平稳','停滞','凋敝'].includes(s.status))t.status=s.status;textKeys(t,s,['context','assessment'])}
 for(const t of out.regions){const s=input.regions?.find?.(x=>x&&x.id===t.id);if(s)textKeys(t,s,['text'])}
 for(const t of out.orgs){const s=input.orgs?.find?.(x=>x&&x.id===t.id);if(s)textKeys(t,s,['bio','ideas','current'])}
 out.societyUI.textColors=ChinaText.fields(input.societyUI?.textColors,{title:out.societyUI.title,roots:out.societyUI.roots,positions:out.societyUI.positions,...Object.fromEntries(out.societyUI.labels.map((v,i)=>['labels.'+i,v])),...Object.fromEntries(out.levels.map((v,i)=>['grade.'+i,v]))});
 for(const t of out.thoughts){const source=input.thoughts?.find?.(s=>s.id===t.id);t.textColors=ChinaText.fields(source?.textColors,Object.fromEntries(['name','fullName','concept','quote','quoteSource','roots','positions'].map(k=>[k,t[k]||''])));}
 return out;
};
