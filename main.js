const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        width: 1280,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.setMenuBarVisibility(false);

    win.webContents.on('before-input-event', (event, input) => {
        const isControlR = (input.control || input.meta) && input.key.toLowerCase() === 'r';
        const isF5 = input.key === 'F5';

        if (isControlR || isF5) {
            event.preventDefault();
        }
    });

    win.loadFile(path.join(__dirname, 'dist/aem-dashboard/index.html'));
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

