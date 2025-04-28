const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const waitOn = require('wait-on');

const database = require(path.join(__dirname, './utils/database'));
const notification = require(path.join(__dirname, './utils/notification'));
const jsonHandler = require(path.join(__dirname, './utils/jsonHandler'));


function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 600,
    minWidth: 500, 
    minHeight: 600, 
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true, 
      contextIsolation: true
    },
  });

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  database.createTable('points', [
      { name: 'date', type: 'TEXT NOT NULL' },
      { name: 'points', type: 'INTEGER NOT NULL' }
  ]);

  waitOn({ resources: ['http://localhost:5173'], timeout: 10000 }, (err) => {
    if (err) {
      console.error('Vite dev server is not ready:', err);
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
  return await database.insert(tableName, data);
});

ipcMain.handle('db-get-all', async (event, tableName) => {
  return await database.getAll(tableName);
});

ipcMain.handle('db-update', async (event, tableName, id, data) => {
  return await database.update(tableName, id, data);
});

ipcMain.handle('db-remove', async (event, tableName, id) => {
  return await database.remove(tableName, id);
});

ipcMain.handle('db-add-point-today', async (event) => {
  return await database.addPointForToday();
});

ipcMain.handle('play-notification-sound', async () => {
  notification.playNotificationSound();
});

ipcMain.handle('show-notification', async (event, title, body) => {
  notification.showNotification(title, body);
});

ipcMain.handle('read-json', async (event, jsonFilePath) => {
  return jsonHandler.readJson(jsonFilePath);
});

ipcMain.handle('update-json', async (event, jsonFilePath, key, value) => {
  return jsonHandler.updateJson(jsonFilePath, key, value);
});

ipcMain.handle('write-json', async (event, jsonFilePath, jsonObject) => {
  return jsonHandler.writeJson(jsonFilePath, jsonObject);
});
