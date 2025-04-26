const { app, BrowserWindow } = require('electron');
const path = require('path');
const waitOn = require('wait-on');

console.log(path.join(__dirname, './utils/electron.js'))

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true, 
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  // Vite dev server'ı hazır olana kadar bekle
  waitOn({ resources: ['http://localhost:5173'], timeout: 10000 }, (err) => {
    if (err) {
      console.error('Vite dev server hazır olmadı:', err);
      app.quit();
      return;
    }

    createWindow();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

