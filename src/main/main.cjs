const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const database = require(path.join(__dirname, './utils/database'));
const initDatabase = require(path.join(__dirname, './utils/initDatabase'));
const notification = require(path.join(__dirname, './utils/notification'));
const jsonHandler = require(path.join(__dirname, './utils/jsonHandler'));

const isDev = require('electron-is-dev');
const { initializeTables } = require('./utils/initDatabase');

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        minWidth: 500,
        minHeight: 600,
        resizable: true,
        autoHideMenuBar: !isDev,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        },
        title: 'Pomodoro',
        icon: 'assets/icons/logo.png'
    });

    win.once('ready-to-show', () => {
        win.show();
    });

    if (isDev) {
        win.loadURL('http://localhost:5173')
            .catch(err => console.error('Vite dev sunucusu yükleme hatası:', err));
    } else {
        win.loadFile(path.join(__dirname, '../../build/index.html'))
            .catch(err => console.error('Dosya yükleme hatası:', err));
    }
}

app.whenReady().then(() => {
    initDatabase.initializeTables(database.db);
    createWindow();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
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

ipcMain.handle('show-notification', async (event, title, body, is_sound) => {
    notification.showNotification(title, body, is_sound);
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
