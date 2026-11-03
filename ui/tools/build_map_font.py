"""Local preview subset from the mod's original bitmap outlines, not original vector fonts.
Run with Pillow, numpy, contourpy and fontTools installed. Source stays unchanged.
"""
from pathlib import Path
import re
import numpy as np
import contourpy
from PIL import Image
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT/'ui/politics'
SRC = ROOT / 'tno/TNO/gfx/fonts'
text = (ROOT/'data.js').read_text()
needed = {ord(c) for c in text if ord(c)>127}
records = {}
images = {int(f.stem.split('_')[-1]):Image.open(f).convert('RGBA') for f in SRC.glob('mapfont_*.dds')}
for f in sorted(SRC.glob('mapfont_*.fnt')):
    source = f.read_text()
    for page, name in re.findall(r'page id=(\d+) file="([^"]+)"',source):
        images[int(page)] = Image.open(SRC/name).convert('RGBA')
    for line in source.splitlines():
        if line.startswith('char id='):
            d={k:int(v) for k,v in re.findall(r'(\w+)=(-?\d+)',line)}
            if d['id'] in needed: records[d['id']]=d
fb=FontBuilder(1000,isTTF=True)
order=['.notdef']+[f'uni{c:04X}' for c in sorted(records)]
fb.setupGlyphOrder(order)
glyphs={'.notdef':TTGlyphPen(None).glyph()}; metrics={'.notdef':(1000,0)}
for cp,d in sorted(records.items()):
    glyph=f'uni{cp:04X}'; pen=TTGlyphPen(None)
    im=images[d['page']].crop((d['x'],d['y'],d['x']+d['width'],d['y']+d['height']))
    rgba=np.asarray(im,dtype=float)
    # RGB is the light glyph, alpha includes its black outline. Exclude that outline.
    z=np.pad(rgba[:,:,0]*rgba[:,:,3]/255,1)
    for contour in contourpy.contour_generator(z=z).lines(35):
        points=[(round((x-1+d['xoffset'])*1000/60),round((63-(y-1+d['yoffset']))*1000/60)) for x,y in contour]
        if len(points)<4: continue
        pen.moveTo(points[0])
        for pt in points[1:-1]: pen.lineTo(pt)
        pen.closePath()
    glyphs[glyph]=pen.glyph(); metrics[glyph]=(round(d['xadvance']*1000/60),0)
fb.setupGlyf(glyphs)
# Correct side bearings to keep contours at the source position.
for name,g in glyphs.items():
    if g.numberOfContours: metrics[name]=(metrics[name][0],g.xMin)
fb.setupHorizontalMetrics(metrics)
fb.setupHorizontalHeader(ascent=1050,descent=-317)
fb.setupCharacterMap({c:f'uni{c:04X}' for c in records})
fb.setupNameTable({'familyName':'TNO Map Bitmap Study','styleName':'Regular','uniqueFontIdentifier':'TNO-Map-Study-60','fullName':'TNO Map Bitmap Study','psName':'TNOMapBitmapStudy'})
fb.setupOS2(sTypoAscender=1050,sTypoDescender=-317,usWinAscent=1100,usWinDescent=350)
fb.setupPost(); fb.setupMaxp()
fb.font.flavor='woff'; fb.save(OUT/'assets/tno-map-study.woff')
print('Map font glyphs:',len(records))
