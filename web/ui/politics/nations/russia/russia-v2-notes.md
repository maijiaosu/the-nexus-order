# Russia Four-Page Rework Study

Entry: http://127.0.0.1:8773/russia-v2.html

Only the standalone Russia v2 study was created. The first russia.html version, China study, and all shared styles/scripts were preserved. dist was not built, and nothing was deployed to Obsidian. Original photographs remain unchanged; CSS supplies cropping, desaturation, and scanlines.

## Structure and Interaction

- Politics: Putin, Vaino, Mishustin, Shoigu, and Volodin each use their own photograph. All 450 seats are linked to party buttons. The first four parties account for 440 seats; the remaining 10 appear only as a combined remainder, without inventing their final distribution among other groups.
- Economy: 2023–2026 growth trends, 2026 forecasts and interest rate, the 2025 contraction in automobile production, raw-material export dependence, and oil/gas fiscal revenue. Historical factory photos provide industrial archival imagery rather than evidence of an economic downturn in 2026. The pumpjack is native SVG decoration drawn for this study.
- Trade: six external-relationship entries. Export and import categories are presented separately. Amounts represent Russia's global merchandise trade; switching countries does not misrepresent global categories as bilateral amounts. European export figures include the whole continent and are not equivalent to the EU.
- Conflict: a control-area map, eight situation entries, six combined-arms armies, three commanders, and estimated manpower losses. The full front and Donbas maps can be switched. Armies are associated with directions mentioned in situation reports, without precise deployment points or forced identification of group-of-forces commanders as army commanders.
- Short explanations use pointerover/pointerout tooltips and are also accessible by keyboard focus. Only longer source notes use auxiliary windows. Main and auxiliary windows drag independently. Auxiliary windows retain the 720 ms drawer opening; clicking close hides them immediately.

## TNO References

The actual `tno/TNO/interface/Russia/TNO_Tomsk_GUIs.gui` and `.gfx` were read: seat diagrams, faction motifs, and directly displayed political information are separated from detailed interaction layers. Tabs sit outside the main window's top edge. The study does not copy the old fictional salon politics or invent current parties.

## Data Sources

Checked: 2026-09-26. The following data is a fixed snapshot, not an automatically refreshed live feed.

- [Interfax preliminary seats, 2026-09-21](https://interfax.com/newsroom/top-stories/119214/)：United Russia 355, CPRF 40, LDPR 25, New People 20. Preliminary reports had not completely resolved the other seats, so only the remainder of 10 is shown.
- [AP election report](https://apnews.com/article/5342c2757623f2e46e94b4c548e94213)：Restrictions on candidacy and the political environment.
- [Bank of Russia September 2026 survey](https://cbr.ru/eng/statistics/ddkp/mo_br/)：Actual GDP growth: 2023 4.1%, 2024 4.9%, 2025 1.0%. Growth of 0.5% in 2026 and a consolidated budget deficit of 3.5% of GDP are both analyst forecasts.
- [Central-bank rate](https://www.cbr.ru/eng/press/keypr)：Held at 14% on 2026-09-11.
- [Rosstat via Interfax](https://www.interfax.ru/amp/1071520)：2025 passenger-car production was 673,000, down 11.8%; truck production was 131,000, down 32.6%. Bars index each category's 2024 output to 100.
- [Oxford Institute for Energy Studies 2025 oil/gas review](https://www.oxfordenergy.org/wpcms/wp-content/uploads/2026/02/Comment-Russian-Oil-and-Gas-2025.pdf)：2025 oil/gas revenue fell to approximately 8.5 trillion rubles, putting pressure on the civilian economy.[Reuters revenue review, reproduced](https://meduza.io/en/news/2026/07/24/reuters-projects-a-60-jump-in-russia-s-july-oil-and-gas-revenue)：8.48 trillion, down 24%.
- [Russian customs full-year 2025 trade, Interfax](https://interfax.com/newsroom/top-stories/116055/)：Merchandise exports 418.3 and imports 279.0, in USD billions. The chart's 53.9%=225.3/418.3. Other goods equal the total minus listed categories, including rounding differences. Right-hand bars are normalized independently to the largest category on the page; they do not bind amounts to the partner diagram on the left.
- [Reuters China–Russia trade](https://www.marketscreener.com/news/china-s-2025-trade-with-russia-posts-first-decline-in-5-years-ce7e58d8da80f522)：2025 bilateral trade was USD 228.1 billion, down 6.9%.
- [EU energy phaseout arrangements](https://www.consilium.europa.eu/en/policies/ending-russian-energy-imports/)；[Sanctions explained](https://www.consilium.europa.eu/en/policies/sanctions-against-russia-explained/)。
- [AP US sanctions bill signing, 2026-09-18](https://apnews.com/article/d1715ad5e8feccba76bfae51c5f28c45)。
- [Indian Ministry of External Affairs relationship brief](https://www.mea.gov.in/Portal/ForeignRelation/India-Russia-Relations.pdf)：Energy, defense, and merchandise links.[Indian foreign policy](https://www.mea.gov.in/indian-foreign-policy.htm)：Strategic autonomy and relationship context.
- [EU conclusions of 2026-06-18/19](https://www.consilium.europa.eu/en/meetings/european-council/2026/06/18-19/)：Military support from North Korea and Belarus.[AP alliance relationships](https://apnews.com/article/b29fe37a9468d03e22be2f6121b3ac7b)。
- [ISW situation report, 2026-09-23](https://www.criticalthreats.org/analysis/russian-offensive-campaign-assessment-september-23-2026)：Eight situation points and the associated 6th, 25th, 3rd, 8th, 51st, and 36th armies. Unconfirmed claims in the report are not drawn as confirmed control areas.
- [ISW public interactive map](https://storymaps.arcgis.com/stories/36a7f6a6f5a9448496de641cf64bd375)：The actual ArcGIS webmap read was `9f04944a2fe84edab9da31750c2b15eb`, with `pub_date=2026-09-24` on its features. The raw response is saved in `russia-v2-map-source.json`. Three layers are displayed: assessed control, assessed advances, and assessed infiltration. The Russian-claimed-control layer is not displayed. Base national boundaries come from the project's existing world.geo.js, projected on a longitude/latitude grid with a fixed latitude ratio. This is a public theatre-situation snapshot, not live tactical positioning.
- [AP / TVNZ 2026-09-12](https://tvnz-1-news-prod.cdn.arcpublishing.com/2026/09/12/more-than-500000-russian-troops-killed-in-ukraine-uk-defence-chief/)：On September 11, the UK Chief of the Defence Staff estimated cumulative Russian casualties at approximately 1.5 million, including more than 500,000 killed. The UI explicitly labels the estimate and source. It is neither an independently verified list nor Ukrainian casualties.

Offices were checked against relevant public biographies and presidential institutional pages; photograph dates are not dates of office. Figures: Vaino, Presidential Administration; Mishustin, Prime Minister; Shoigu, Security Council Secretary; Volodin, Duma Chairman; Gerasimov, Chief of the General Staff; Mordvichev, Commander-in-Chief of the Ground Forces; Teplinsky, Airborne Forces Commander.

## New Photograph Credits

Commons metadata is saved in `russia-v2-photo-metadata.json`; files and hashes are recorded in `russia-v2-photos.json`. CSS presentation adaptations retain the original licenses. The existing Putin image follows the project's asset records.

- [File:Anton Vaino (2019-06-26).jpg](https://commons.wikimedia.org/wiki/File:Anton_Vaino_(2019-06-26).jpg): kremlin.ru；CC BY 4.0。
- [File:AvtoVAZ-5393.JPG](https://commons.wikimedia.org/wiki/File:AvtoVAZ-5393.JPG): ShinePhantom；CC BY-SA 3.0。
- [File:Mikhail Mishustin (2026-02-25).jpg](https://commons.wikimedia.org/wiki/File:Mikhail_Mishustin_(2026-02-25).jpg): duma.gov.ru；CC BY 4.0。
- [File:Mikhail Teplinskiy 2022.jpg](https://commons.wikimedia.org/wiki/File:Mikhail_Teplinskiy_2022.jpg): Департамент информации и массовых коммуникаций Министерства обороны Российской Федерации；CC BY 4.0。
- [File:Shoigu 2024-10-10.jpg](https://commons.wikimedia.org/wiki/File:Shoigu_2024-10-10.jpg): Пресс-служба Президента Российской Федерации；CC BY 4.0。
- [File:Valery Gerasimov official photo version 2022-10-03 (cropped)(2).jpg](https://commons.wikimedia.org/wiki/File:Valery_Gerasimov_official_photo_version_2022-10-03_(cropped)(2).jpg): Vadim Savitsky, Press and Information Office of Ministy of Defence of the Russian Federation；CC BY 4.0。
- [File:Vyacheslav Volodin (15-01-2024).jpg](https://commons.wikimedia.org/wiki/File:Vyacheslav_Volodin_(15-01-2024).jpg): duma.gov.ru；CC BY 4.0。
- [File:Мордвичев Андрей 2025.jpg](https://commons.wikimedia.org/wiki/File:Мордвичев_Андрей_2025.jpg): Министерство обороны Российской Федерации；CC BY 4.0。
