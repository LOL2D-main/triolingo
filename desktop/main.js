const { app, BrowserWindow, shell, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow = null;

// Lock single instance so only one Triolingo window runs at a time
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function getTargetUrl() {
  const configFile = path.join(__dirname, "config.json");
  if (fs.existsSync(configFile)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(configFile, "utf8"));
      if (cfg && cfg.url) return cfg.url;
    } catch {}
  }
  return process.env.TRIOLINGO_URL || "https://triolingo.vercel.app";
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 980,
    minHeight: 640,
    title: "Triolingo",
    icon: path.join(__dirname, "icon.ico"),
    autoHideMenuBar: true,
    show: false,
    backgroundColor: "#FFFFFF",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });

  const targetUrl = getTargetUrl();

  const loadingHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Triolingo</title>
        <style>
          body {
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #58CC02;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #ffffff;
            user-select: none;
          }
          .spinner {
            width: 48px;
            height: 48px;
            border: 5px solid rgba(255,255,255,0.3);
            border-top: 5px solid #ffffff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          h1 { margin: 0; font-size: 28px; font-weight: 800; }
          p { margin-top: 8px; font-size: 15px; opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="spinner"></div>
        <h1>Triolingo</h1>
        <p>Đang khởi động ứng dụng...</p>
      </body>
    </html>
  `;

  mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(loadingHtml)}`);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    setTimeout(() => {
      mainWindow.loadURL(targetUrl).catch((err) => {
        showOfflineScreen(targetUrl);
      });
    }, 400);
  });

  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
    // Ignore internal aborts
    if (errorCode === -3) return;
    showOfflineScreen(validatedURL || targetUrl);
  });

  // Handle external links (open in user's default browser)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(targetUrl) && !url.includes("localhost")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function showOfflineScreen(retryUrl) {
  if (!mainWindow) return;
  const offlineHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Triolingo - Mất kết nối</title>
        <style>
          body {
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #F7F7F7;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #4B4B4B;
            text-align: center;
            padding: 20px;
          }
          .card {
            background: #ffffff;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
            max-width: 420px;
            width: 100%;
            border: 2px solid #E5E5E5;
          }
          h2 { margin-top: 0; color: #3C3C3C; font-size: 24px; font-weight: 800; }
          p { color: #777; font-size: 15px; line-height: 1.5; margin-bottom: 24px; }
          button {
            background: #58CC02;
            color: #ffffff;
            border: none;
            border-bottom: 4px solid #46A302;
            padding: 14px 28px;
            border-radius: 16px;
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.1s ease;
            width: 100%;
          }
          button:hover { background: #61E002; }
          button:active { transform: translateY(2px); border-bottom-width: 2px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Chưa thể kết nối tới Triolingo</h2>
          <p>Vui lòng kiểm tra lại kết nối mạng Internet của bạn hoặc máy chủ rồi thử lại nhé.</p>
          <button onclick="window.location.href='${retryUrl}'">Thử lại ngay</button>
        </div>
      </body>
    </html>
  `;
  mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(offlineHtml)}`);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
