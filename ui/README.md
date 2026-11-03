## Latest: Performance and Map Labels
Country names now use a separate custom-series rendering layer; dragging no longer calls setOption on the entire map. Labels use interior geometric baselines, manually defined axes for prominent countries, and font sizes that follow map scale. Institutional details use different compositions according to each political system; countries other than the United States no longer use a central seal. Seats are consolidated into party paths while retaining exact counts. Generated China/UK assets and original prompts are documented in politics/assets/GENERATED-ART.md.

## 2026-09-16 Interaction Revisions
The global political-archive entry and mismatched icon were removed from the main UI. Country information remains in each country's sidebar. Institutional details open in an adjacent local panel in embedded mode and close when the country changes or its sidebar closes. Pie slices support hover, focus, and click; explanations appear directly below the chart. Map font sizes are constrained by projected dimensions, and labels are hidden when a small country cannot accommodate them. The complete original politics.html remains at its compatibility path but is no longer a main-game navigation entry. Reference notes were removed from that page.

# TNO visual system

The accepted congress study is now shared by `politics.html` and the review URL. The game shell loads `tno-shell.css` / `tno-shell.js`; the authoritative map and sidebar renderer stays in `widget_index.html`.

- `politics/profiles.js`: 32 institutional profiles. Legislature shapes, institution relationships, accents and illustrated roundels vary by profile. All seat and ideology values come from the existing data snapshot. Other countries receive a factual-data fallback with no invented seats.
- `politics/app.js`: exact seats (including all 2,977 NPC seats), US chamber selection, party selection, original ideology palette and trends, country picker and relationships.
- `politics/assets/emblems`: authored institutional studies, not official coats of arms. The American seal and state outline retain the original TNO artwork.
- `tools/build_artwork.py`: derives country outlines from local `world.geo.js` and draws the institutional roundels.
- Aldrich WOFF is converted from original TNO TTF. Chinese interface font is reconstructed from `fzrzhm_34_outline_*` glyph silhouettes (1,332 glyphs in this build). Missing characters use the system fallback.
- `tools/build_map_font.py`: reconstructs 1,080 glyphs from the separate `mapfont_*` atlases (original font metadata: `阿里巴巴普惠体 Medium`, 60px). The semi-transparent atlas needs a different contour threshold from the UI font. These are bitmap-contour reconstructions, not the source vector fonts.
- Toolbar PNGs use the first state of the two-frame original TNO toolbar textures, as declared in `interface/topbar.gfx`.
- Sidebar: portrait / government / full circular ideology chart, expandable ideology and seat records, compact institutional controls. Expanded archive retains the approved central roundel composition and analytic ideology donut.
- Map: subdued relief and oceans, dark country borders, larger spaced names using the map font and mainland orientation, cyan capital stars. Names remain visible on thematic maps.

Build: `python3 build_dist.py`. This generates both pages and copies the shared UI. Tests: `node geo-sandbox-test.js` (108 assertions) and `node tests/politics-layout.test.js` (33 chambers / 32 profiles, exact counts, unique positions and geometry bounds).

Browser verification: all 32 profiles switched using real controls; US chamber / faction changes; Saudi appointment label; absent-seat fallback; all 8 map modes; news newspaper; mobile 390px with no horizontal overflow. Native installers are not rebuilt by the HTML build.

Data note: root `data.js` and the packaged snapshot have an existing difference (169 vs 171 political entities). This UI task leaves both snapshots intact. Regression tests exercise the packaged data served by the game against the authoritative widget source.
