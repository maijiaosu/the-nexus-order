"""Author-drawn institutional roundels (not official state emblems) and local map outlines."""
from pathlib import Path
import json, math, re
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'ui/politics/assets'
(OUT/'emblems').mkdir(exist_ok=True);(OUT/'maps').mkdir(exist_ok=True)
profiles=(ROOT/'ui/politics/profiles.js').read_text()
isos=re.findall(r'^ ([A-Z]{3}):',profiles,re.M)
geo=json.loads((ROOT/'world.geo.js').read_text().split('=',1)[1].rstrip(';\n'))
for iso in isos:
 features=[f for f in geo['features'] if f.get('id')==iso]
 rings=[]
 for f in features:
  g=f['geometry'];polys=[g['coordinates']] if g['type']=='Polygon' else g['coordinates'] if g['type']=='MultiPolygon' else []
  rings += [p[0] for p in polys]
 if rings:
  pts=[(x+(360 if iso=='RUS' and x<0 else 0),-y) for r in rings for x,y,*_ in r]
  xs,ys=zip(*pts);lo,top,hi,bottom=min(xs),min(ys),max(xs),max(ys);scale=min(460/max(1,hi-lo),290/max(1,bottom-top))
  paths=[]
  for r in rings:
   p=[((x+(360 if iso=='RUS' and x<0 else 0)-lo)*scale+(500-(hi-lo)*scale)/2,(-y-top)*scale+(330-(bottom-top)*scale)/2) for x,y,*_ in r]
   paths.append('M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in p)+' Z')
  (OUT/'maps'/f'{iso}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 330"><path d="'+' '.join(paths)+'" fill="none" stroke="#59c7c2" stroke-width=".8"/></svg>')
 else:(OUT/'maps'/f'{iso}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 330"/>')
# Architectural / institutional visual motifs. No fabricated heraldic state seals.
columns='<path d="M43 69H117L80 43ZM40 119H120M46 111H114"/><path d="M51 72V107M64 72V107M78 72V107M92 72V107M106 72V107" stroke-width="6"/>'
portcullis='<path d="M45 58H115V114H45ZM58 59V122M73 59V122M88 59V122M103 59V122M45 77H115M45 97H115M49 47L57 35L72 45L80 28L89 45L103 35L111 47Z"/>'
wheel='<circle cx="80" cy="80" r="38"/><circle cx="80" cy="80" r="7"/>'+''.join(f'<path d="M{80+9*math.cos(i*math.pi/12):.2f} {80+9*math.sin(i*math.pi/12):.2f}L{80+36*math.cos(i*math.pi/12):.2f} {80+36*math.sin(i*math.pi/12):.2f}"/>' for i in range(24))
flower=''.join(f'<ellipse cx="80" cy="56" rx="6" ry="21" transform="rotate({i*22.5} 80 80)"/>' for i in range(16))+'<circle cx="80" cy="80" r="10"/>'
dome='<path d="M40 110H120M46 101H114M50 93V77Q80 34 110 77V93ZM50 77H110M66 59V93M80 53V93M94 59V93"/>'
arch='<path d="M46 116V76Q46 62 80 38Q114 62 114 76V116ZM60 116V79Q60 69 80 54Q100 69 100 79V116M40 122H120"/><path d="M80 66L85 79L99 80L88 89L92 102L80 94L68 102L72 89L61 80L75 79Z" stroke-width="1.5"/>'
assembly='<path d="M37 69H123M41 64H119M47 58H113M38 118H122M43 111H117"/>'+''.join(f'<path d="M{x} 73V108" stroke-width="5"/>' for x in range(49,116,11))+'<path d="M80 28L84 39H97L86 46L90 57L80 50L70 57L74 46L63 39H76Z" fill="#b7b49a" stroke="none"/>'
brasilia='<path d="M30 103H130M35 84Q48 111 62 84ZM95 100Q108 72 123 100ZM69 50H79V104H69ZM82 50H92V104H82Z"/>'
for iso in isos+['generic']:
 motif=portcullis if iso in ['GBR','CAN','AUS'] else wheel if iso=='IND' else flower if iso=='JPN' else assembly if iso in ['CHN','PRK','CUB'] else arch if iso in ['IRN','SAU','PAK'] else brasilia if iso=='BRA' else dome if iso in ['DEU','KOR','RUS','IDN','SGP'] else columns
 # Nation initials distinguish related architectural families without invented insignia.
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><title>{iso} institutional study, original illustration</title><g fill="none" stroke="#b7b49a" stroke-width="3"><circle cx="80" cy="80" r="74" stroke-width="5"/><circle cx="80" cy="80" r="65" stroke-width=".7"/>{motif}</g></svg>'
 (OUT/'emblems'/f'{iso}.svg').write_text(svg)
print('Generated',len(isos),'country studies')
