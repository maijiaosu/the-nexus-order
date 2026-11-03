# Russia v3 Art Revision Study

Only the standalone study was updated. v2, the China study, the production program, and the plugin remain unchanged.

## Changes in This Version

- The politics page retains its layout, with a clear double-headed eagle behind the State Duma. Hover dossiers for five seat groups use wide horizontal strips, a portrait on the far left, and continuous prose covering ideology, positions, and current circumstances. They expand downward on desktop and remain constrained within narrow viewports.
- The economy page reuses the existing industrial-tower asset at its center, surrounded by growth, credit, raw-material exports, public finances, and automobile-production information.
- The trade page restores the Russia base map. Six countries use unframed flag corners, and connections intensify for the selected country. Commodities use original TNO local icons and native vector illustrations.
- Front-line cities no longer use the browser's rounded focus box; yellow markers remain. SVG click targets were completed and support keyboard selection.

## Data and Interpretation

Existing economic, trade, war, institution, and seat data and sources follow the [v2 record](russia-v2-notes.md). Figures include forecasts, preliminary statistics, and estimates; their original meanings are retained and were not updated during this art revision.
The 450 dots represent party seats, without invented individual deputy identities. Seats from the same party display that party's representative dossier. The remaining 10 seats are grouped together; Mironov represents only A Just Russia within that group, not all remaining seats. Ideological terms are classifications summarized from party programs.

## Party Sources

- [United Russia party chairman](https://spb.er.ru/persons/predsedatel-partii)
- [United Russia conservatism](https://rostov.er.ru/activity/news/mif-ob-otsutstvii-u-edinoj-rossii-ideologii)
- [Communist Party of the Russian Federation program](https://kprf.ru/party/program)
- [LDPR 2026 program](https://ldpr.ru/event/sezd-ldpr-utverdil-predvybornuyu-programmu-partii/)
- [New People 2026 platform](https://lp.newpeople.ru/2026/)
- [A Just Russia 2026 program](https://orenburg.spravedlivo.ru/29132410)

## Image Credits

Portraits were downloaded from Wikimedia Commons. Original files, licenses, and download URLs are preserved in matching `.source.json` records. The frontend applies only CSS grayscale and scanlines. Slutsky is the politician Leonid Eduardovich Slutsky.

- [Dmitry Medvedev official portrait (01) (cropped).jpg](https://commons.wikimedia.org/wiki/File:Dmitry_Medvedev_official_portrait_(01)_(cropped).jpg) — Пресс-служба Правительства России; CC BY 4.0。Original record: `assets/russia-v3/Medvedev.jpg.source.json`
- [Sergey Mironov (13-01-2021) (cropped).jpg](https://commons.wikimedia.org/wiki/File:Sergey_Mironov_(13-01-2021)_(cropped).jpg) — State Duma; CC BY 4.0。Original record: `assets/russia-v3/Mironov.jpg.source.json`
- [Alexey Nechayev (2023-02-15, cropped).jpg](https://commons.wikimedia.org/wiki/File:Alexey_Nechayev_(2023-02-15,_cropped).jpg) — Presidential Executive Office of Russia; CC BY 4.0。Original record: `assets/russia-v3/Nechayev.jpg.source.json`
- [Портрет Леонида Слуцкого (cropped).png](https://commons.wikimedia.org/wiki/File:%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%9B%D0%B5%D0%BE%D0%BD%D0%B8%D0%B4%D0%B0_%D0%A1%D0%BB%D1%83%D1%86%D0%BA%D0%BE%D0%B3%D0%BE_(cropped).png) — ; CC BY 4.0。Original record: `assets/russia-v3/Slutsky.png.source.json`
- [Gennady Zyuganov 2022-03-22 (cropped).jpg](https://commons.wikimedia.org/wiki/File:Gennady_Zyuganov_2022-03-22_(cropped).jpg) — duma.gov.ru; CC BY 4.0。Original record: `assets/russia-v3/Zyuganov.jpg.source.json`
- [eagle-federation.source](https://commons.wikimedia.org/wiki/File:Coat_of_Arms_of_the_Russian_Federation_2.svg) — ; Public domain。Original record: `assets/russia-v3/eagle-federation.source.json`

- The double-headed eagle is a vector coat of arms of the Russian Federation, rendered silver-gray in the UI. The superseded small TNO eagle file is retained but not loaded.
- The industrial tower reuses `assets/russia-tower.png`; the earlier generated asset and prompt are documented in [sources.md](sources.md). No new images were generated in this revision.
- The Norilsk background is a historical archival photograph used only as an artistic backdrop, not evidence of conditions in 2026.
- Original TNO commodity-asset paths are listed in `assets/russia-v3/tno-sources.json`; processing is limited to DDS-to-PNG conversion.
- The six country flags retain their designs; CSS supplies flag corners and scan textures. The EU flag and a few remaining commodity illustrations are drawn in code.

## Verification

Browser checks covered 1440×900, 1280×720, and 564×837. Desktop and narrow-screen screenshots are under screenshots/russia-v3-*. Artwork deliberately crosses pane boundaries; text and controls require no scrolling. See russia-v3-verification.json.
