# Sources for Formal Integration

The mechanisms-v5 versions of Saudi Arabia and Sudan, including their refinements, were adopted unchanged apart from resource paths and the window-close bridge. Political, trade, and conflict facts were not updated.

# Additional Sudan Geographic Layers

- Administrative boundaries: geoBoundaries gbOpen SDN ADM1, originally from IMWG / OCHA ROSEA; 2020 boundary data. Eighteen states plus Abyei. CC BY 3.0 IGO. Original API metadata: geo-source.json; original data: assets/sudan-adm1.geojson.
- Place names: GeoNames Sudan gazetteer, https://download.geonames.org/export/dump/SD.zip , CC BY 4.0. Thirteen unambiguous cities were used, excluding small villages with duplicate names. Selected coordinates are recorded in geonames-cities.json and sudan-atlas.js.
- Al-Fashir: GeoNames 379555, 13.62793 N, 25.34936 E; https://www.geonames.org/379555/al-fashir.html.
- Rivers: Natural Earth 1:50m rivers/lake centerlines, public domain; https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_rivers_lake_centerlines.geojson . Named Nile-basin river segments were selected and clipped to the national boundary.
- Coordinate projection matches the original Sudan outline exactly, using world.geo.js national bounds and the approximate equidistant projection in build_theatres.py.
- An Al-Fashir event record dated 2025-10-27 was added from a UN human-rights statement: https://sudan.un.org/en/304113-appalling-reports-summary-executions-and-other-serious-violations-rsf-makes-major . The March camp-crisis entry still uses its original March text; it is not mixed with the October event.
- The original approximate theatre layer is not presented as a newly surveyed precise front line. New data in this revision only refines states, rivers, and city geography. The control-area snapshot retains its original date.

Al-Fashir is highlighted by default. All thirteen cities support click and keyboard selection. State names appear on hover, and the Al-Fashir event is linked to the right dossier.
