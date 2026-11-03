# The Nexus Order

A TNO-inspired world sandbox with country dossiers, eight map views, daily news and national political interfaces.

[Open the web edition](https://maijiaosu.github.io/the-nexus-order/) · [Download Windows and Android](https://github.com/maijiaosu/the-nexus-order/releases/latest)

Version 1.2.0 uses one shared web payload for Windows x64 and Android. It includes the 37 approved parliamentary interfaces and the continuously rotating China diplomacy globe. Existing China, Russia, Saudi Arabia and Sudan interfaces remain available.

The bundled snapshot opens offline. While online and in the foreground, the application checks the read-only Nexus service every 45 seconds and immediately after returning or reconnecting. Only changed data sections and new images are downloaded, verified and applied; a failed update retains the previous data. Server content updates do not require reinstalling the application. Native engine or application-code updates can still require a new installer.

## Runtime and builds

- `web/`: the frozen, shared application payload, including offline public data.
- `electron/`: Windows desktop shell; `npm ci` then `npm run dist` after copying `web/` to `electron/app/`.
- `android/`: Android WebView shell; copy `web/` to `android/app/src/main/assets/www/`, then run `./gradlew assembleRelease` with the existing signing environment settings.
- `release-manifest.json`: payload hashes and source revision metadata.

The manual installer workflow builds artifacts only. It never overwrites a historical GitHub release. Release assets are published after verification.

Windows targets x64 Windows 10 or newer. Android requires Android 7 or newer and an up-to-date system WebView. No Android device or Windows machine was available for native acceptance in this release session; see the release record for the checks actually performed. The Windows installer is unsigned. Android retains the previous application ID and signing certificate.

Daily collection and client delivery are independent. The existing paid weekly-review worker remains paused at its previously exhausted CNY 10 budget; this release does not change the collection budget.
