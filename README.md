# The Nexus Order · 世界沙盘

以世界地图为核心的地缘态势沙盘：152 国政治档案、意识形态饼图、10 场战争前线/占区、8 种地图视图、每日新闻情报。

## 网页版

直接打开 GitHub Pages 即可：<https://maijiaosu.github.io/the-nexus-order/>

每日 07:23 自动嗅探国际新闻并更新数据（Gist 通道），页面右上角可点「检查更新」手动拉取最新快照。

## 桌面 / 移动端下载

打开网页后点右上角「⬇ 桌面 App」，或直接访问 [GitHub Releases](https://github.com/maijiaosu/the-nexus-order/releases/latest)：

- **Windows**：`TheNexusOrder-Setup-0.1.0.exe`（一键安装，x64/arm64 双架构）
- **macOS**：`The Nexus Order-0.1.0-arm64.dmg`（Apple 芯片）/ `The Nexus Order-0.1.0.dmg`（Intel）
- **Android**：`TheNexusOrder-0.2.0.apk`（直装，Android 7+）

## 仓库结构

- `web/` — 静态网页版全部资源（GitHub Pages 发布目录）
- `android/` — Android WebView 壳工程（源码；构建时把 `web/` 复制到 `app/src/main/assets/www`）

## 技术栈

纯前端：HTML/CSS/JS + ECharts + Canvas 单图层合成；数据由 Python 生成器与每日嗅探器产出，无后端。
