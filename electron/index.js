const { app, BrowserWindow, ipcMain, screen } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 220,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    transparent: true,
    skipTaskbar: true,
    webPreferences: {
      preload: __dirname + '/preload.js'
    }
  });

  mainWindow.loadURL('http://localhost:4300');
}

/**
 * 🧲 SNAP TO NEAREST CORNER
 */
ipcMain.on('snap-window', () => {
  if (!mainWindow) return;

  const bounds = mainWindow.getBounds();
  const display = screen.getPrimaryDisplay();
  const workArea = display.workArea; // excludes taskbar

  const centerX = workArea.width / 2;
  const centerY = workArea.height / 2;

  const snapX =
    bounds.x + bounds.width / 2 < centerX
      ? workArea.x
      : workArea.x + workArea.width - bounds.width;

  const snapY =
    bounds.y + bounds.height / 2 < centerY
      ? workArea.y
      : workArea.y + workArea.height - bounds.height;

  mainWindow.setPosition(snapX, snapY, true);
});

app.whenReady().then(createWindow);
