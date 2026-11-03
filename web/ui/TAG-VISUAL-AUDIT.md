# TNO Tag Visual Study · 2026-09-16

This is a development record, not in-game content. Distinctiveness should come from thematic objects and gameplay feedback rather than putting different wireframes around the same component.

## Local Original Mod Material Actually Examined

- Guangdong: `interface/Guangdong/TNO_GNG_Product_Decisions_GUI.gui/.gfx` organizes product illustrations, research, quality, markets, and profits around concrete products. Corporate marks and decree letterheads in `TNO_GNG_LegCo.gfx` turn corporate politics into tangible objects. The economic GUI uses actual/potential curves rather than a generic statistics card.
- Tomsk: `interface/Russia/TNO_Tomsk_GUIs.gui/.gfx`; DDS assets for Salon_Table, GUI_Humanists, and Tomsk_Duma_GUI were inspected. Salons, regions, and Duma buildings have distinct meanings. The empty Salon_Table frame must not be mistaken for a complete distinctive design.
- Siberian Plan: `TNO_legacy_of_siberian_plan.gui/.gfx`; positive and negative circular scales overlay industrial icons, with a worker-discontent bar below. Readings are connected to the industrial system.
- Speer: the Speerdometer beginning at line 66 of `interface/Germany/TNO_Germany.gui` has its own scale, needle, political directions, and propaganda copy. Outline and economic-background DDS files in germany_speer_guis were inspected.
- Flags: `gfx/interface/flag_overlay_tno.dds`, an 82×52 transparent cloth-lighting overlay, decoded to `politics/assets/materials/flag-drape.png`. CSS overlays it on original flags, preserving their designs instead of drawing invented flags.

## Additional Online Searches

- https://tno.wiki.gg/wiki/State_of_Guangdong
- https://tno.wiki.gg/wiki/Tomsk
- https://www.reddit.com/r/TNOmod/comments/sem7rk
- https://www.reddit.com/r/TNOmod/comments/qzuk7k
- https://static.tvtropes.org/pmwiki/pub/images/productcyclegui.png

Image search also returned generic focus trees, Komi, and screenshots of other games; these were not used as visual evidence. Direct access to some pages/images failed, so their complete native screenshots were not claimed as viewed. Implementation primarily followed inspection of local GUI and DDS files.

## Implemented in This Revision

France: a republican allegorical statue, photographic paper collage, and an elected parliamentary composition. This preserves a distinct French civic-political language without copying Tomsk's fictional salon system.
Germany: actual seat combinations drive a needle and digital reading; the halfway point marks the threshold. The design does not reuse Speer's political-orientation metric or invent industrial data.
Other countries temporarily retain their previous versions; this is not a claim of completed, deeply customized artwork for every country.

## Subsequent Thematic Branching

Four industrial-object DDS files from the Siberian Plan were also inspected. Decoded factory/construction assets were used in China's planning tab, without misrepresenting the original industrial-bonus rings as real-world construction completion. Additional power-grid, public-service, railway-medallion, and folded tactical-map objects were drawn. Physical foreground objects crossing panel borders and interactive feedback replace superficial frame changes. See `politics/DOSSIER-SOURCES.md`.
