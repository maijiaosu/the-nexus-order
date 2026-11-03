"""Derive light dossier maps from the project's existing geographical snapshot."""
import json, pathlib, html, math
root=pathlib.Path(__file__).resolve().parents[2]
def read(name):
 s=(root/name).read_text();return json.loads(s[s.index('{'):].rstrip(';\n '))
geo=read('world.geo.js');data=read('dist/conflict.js');out={}
db=json.JSONDecoder().raw_decode((root/'dist/data.js').read_text().split('window.GEO_DB=',1)[1])[0]
for iso,cid in [('SDN','sdn'),('YEM','yem'),('MMR','mmr'),('COD','cod-m23')]:
 c=next(x for x in data['conflicts'] if x['id']==cid);g=next(x['geometry'] for x in geo['features'] if x['id']==iso)
 def rings(g):return g['coordinates'] if g['type']=='Polygon' else [r for p in g['coordinates'] for r in p]
 pts=[p for r in rings(g) for p in r]; xmin,xmax=min(p[0] for p in pts),max(p[0] for p in pts);ymin,ymax=min(p[1] for p in pts),max(p[1] for p in pts)
 if iso=='COD':xmin,xmax,ymin,ymax=25,32,-6,3
 fac=math.cos((ymin+ymax)/2*math.pi/180);scale=min(440/((xmax-xmin)*fac),300/(ymax-ymin))
 def xy(p):return (250+(p[0]-(xmin+xmax)/2)*scale*fac,175-(p[1]-(ymin+ymax)/2)*scale)
 def path(g):return ' '.join('M'+' L'.join('%.1f %.1f'%xy(p) for p in r)+' Z' for r in rings(g))
 d=path(g);parts=[f'<svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="{iso} 控制区资料示意"><defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#395156" stroke-width=".5"/></pattern><pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 7L7 0" stroke="#c7b978" stroke-width="2"/></pattern><clipPath id="land"><path d="{d}"/></clipPath></defs><rect width="500" height="350" fill="#0a171c"/><rect width="500" height="350" fill="url(#grid)"/><path d="{d}" fill="#253333" stroke="#879083" stroke-width="1.5"/>']
 for z in c.get('zones',[]):parts.append(f'<path data-side="{z["side"]}" clip-path="url(#land)" d="{path(z["geom"])}" fill="{c["colors"].get(z["side"],"url(#hatch)")}" stroke="#c3bba0" stroke-width="1" opacity=".8"><title>{html.escape(z["label"])}</title></path>')
 for line in c.get('front',[]):parts.append('<path d="M'+' L'.join('%.1f %.1f'%xy(p) for p in line['coordinates'])+'" fill="none" stroke="#e0b39d" stroke-dasharray="5 4"/>')
 cap=db[iso].get('cap')
 if cap and xmin<=cap['lon']<=xmax and ymin<=cap['lat']<=ymax:
  x,y=xy([cap['lon'],cap['lat']]);parts.append(f'<g class="theatre-capital"><circle cx="{x:.1f}" cy="{y:.1f}" r="4" fill="#e7d777" stroke="#06111a"/><text x="{x+8:.1f}" y="{y+4:.1f}" font-size="12" fill="#d3e9e9" stroke="#06111a" stroke-width="3" paint-order="stroke">{html.escape(cap["n"])}</text></g>')
 parts.append('</svg>');(root/f'ui/politics/assets/theatres/{iso}.svg').write_text(''.join(parts))
 out[iso]={'updated':data['updated'],'conflict':c,'svg':''.join(parts)}
(root/'ui/politics/theatres.js').write_text('window.TNO_THEATRES='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
