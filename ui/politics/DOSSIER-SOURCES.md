# National Dossier Themes and Sources · 2026-09-16

## Actual Coverage

Fourteen countries use thematic dossiers: SDN, YEM, MMR, COD, CHN, IRN, SAU, MNG, NPL, NGA, RUS, PRK, CUB, EGY.
Seven content structures are used: theatres of war, planning, power relationships, royal institutions and investment, diplomatic corridors, federal finances, and supply ledgers.
These are not fourteen fully completed independent art packages. Russia, North Korea, and Egypt still share the relationship-diagram skeleton and need country-specific foreground components with substantive meaning in later work.

- Entries remain in country sidebars. Countries not centered on elections no longer display seat summaries, majority thresholds, or election cycles in the main sidebar.
- NGA retains actual parliamentary seats from the database, collapsed by default. MNG/NPL retain electoral-system fields, but the existing database has no parliamentary seats for them; an expanded seat view cannot be claimed.
- Existing US, French, and German custom structures remain.
- Themes are not a comprehensive political encyclopedia. Headings and discussion dimensions are not real-time influence estimates.

## Geographic and Conflict Snapshots

Theatre geometry is derived by `ui/tools/build_theatres.py` from this project's `world.geo.js` / `dist/conflict.js`, retaining the date 2026-08-04. It is not a newly verified live front line. Colors illustrate control/activity areas in that snapshot only; uncolored territory does not mean uncontrolled territory. The two-sided Yemen diagram cannot fully represent southern political forces, and Myanmar resistance organizations must not be treated as a unified command. The COD map enlarges the east.

Faction membership retains relationship qualifications such as alleged military aid or support from the original records. Missing relationship types are explicitly shown as unspecified rather than promoted to direct participation in fighting.

## Fact Checks for New Structures

- Fifteenth Five-Year Plan period and construction themes: National People's Congress planning outline (2026–2030): https://www.npc.gov.cn/c2/c30834/202603/t20260316_453274.html
- Iran's Leader, Guardian Council composition, military institutions, and Assembly of Experts: Constitution articles 91, 107, 110, 150: https://www.constituteproject.org/constitution/Iran_1989
- Guardian Council relationships cross-check: https://www.iranicaonline.org/articles/guardian-council/
- Corporate and welfare networks of Iranian foundations (reported asset-size estimates are not used): https://apnews.com/article/64b09236ce31358d5b6dda9f390b68ba
- Mongolia's third-neighbor diplomacy: https://mfa.gov.mn/wp-content/uploads/2022/01/MT-4-final.pdf
- Nepal's transit trade: https://www.mea.gov.in/Portal/LegalTreatiesDoc/NP23B3978-1.pdf
- Saudi Vision and Public Investment Fund: https://my.gov.sa/en/content/saudivision ; https://www.pif.gov.sa/en/who-we-are/
- Nigeria's 36 states and federal fiscal relationships: https://blogs.worldbank.org/en/africacan/navigating-politics-fiscal-governance-reform-lessons-from-nigeria-states

Other content qualitatively organizes institutional fields already present in the project; no current officeholders, live conflict facts, or numerical values were added. Ethnic and religious identities were not turned into conflict indices or percentage charts.

## Art and Performance

- `industrial/factory.png`, `construction.png`: losslessly decoded from local original TNO Siberian Plan `icon_factory_output.dds` / `icon_construction_speed.dds`. Original resources/production files were also saved for later use but are not currently applied. Full source: `tno/TNO/gfx/interface/russia/legacy_of_siberian_plan/`.
- `objects/energy.svg`, `public-services.svg`, `transit-medallion.svg`, `field-map.svg`: drawn from the subdued solid colors, shadows, and object silhouettes of inspected originals. These are authored thematic icons, not official coats of arms.
- Icons appear in planning tabs, content pages, theatre-map corners, and diplomatic-diagram edges, deliberately crossing internal panel borders without crossing the screen or obscuring close controls.
- `mongolia-corridor.png`: a newly generated image_gen engraving of Mongolian grassland, a railway, and distant mountains. It is a thematic illustration, not a geographic map or documentary photograph. Prompt requirements: dark petrol/jade/ochre engraved atlas, railway to distant city, no text/flags/UI, dark edges, empty left for labels.
- Theatre views embed derived SVGs rather than loading a second world-map engine. No continuous animations, particles, or new timers were added.

## Verification

Actual browser checks: Sudan faction buttons updated text/maps; all four CHN topics were clicked; NGA parliamentary expansion was repaired; the USA parliament was retained; the MNG image/text combination was inspected; China and Yemen scrolling layouts were checked at 390 px. No new console errors appeared. The 110 main-program assertions, three original tests, and new country-dossiers test passed.
