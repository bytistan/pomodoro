const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const waitOn = require('wait-on');

const { createTable, insert, getAll, update, remove } = require(path.join(__dirname, './utils/database'));

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true, 
      contextIsolation: true
    },
  });

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  createTable('points', [
      { name: 'date', type: 'TEXT NOT NULL' },
      { name: 'points', type: 'INTEGER NOT NULL' }
  ]);

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

ipcMain.handle('db-insert', async (event, tableName, data) => {
  return await insert(tableName, data);
});

ipcMain.handle('db-get-all', async (event, tableName) => {
  return await getAll(tableName);
});

ipcMain.handle('db-update', async (event, tableName, id, data) => {
  return await update(tableName, id, data);
});

ipcMain.handle('db-remove', async (event, tableName, id) => {
  return await remove(tableName, id);
});

