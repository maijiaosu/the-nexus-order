/* The Nexus Order · Windows 桌面壳
   - 加载内置 app/ (沙盘完整独立版, 数据快照 + Gist 远程更新)
   - 新闻「阅读原文」等外链一律转到系统默认浏览器打开 */
const { app, BrowserWindow, shell, Menu } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: "The Nexus Order",
    backgroundColor: "#0b0f14",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  Menu.setApplicationMenu(null);
  win.loadFile("app/index.html");

  // window.open / target=_blank → 系统浏览器
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith("file://")) {
      e.preventDefault();
      if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit(); // Windows 语义: 全关即退出
});
