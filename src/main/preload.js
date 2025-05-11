const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('db', {
    insert: (tableName, data) => ipcRenderer.invoke('db-insert', tableName, data),
    getAll: (tableName) => ipcRenderer.invoke('db-get-all', tableName),
    getByField: (table, field, value) => ipcRenderer.invoke('db-get-by-field', table, field, value),
    update: (tableName, id, data) => ipcRenderer.invoke('db-update', tableName, id, data),
    remove: (tableName, id) => ipcRenderer.invoke('db-remove', tableName, id),
    addPointToday: () => ipcRenderer.invoke('db-add-point-today')
});

contextBridge.exposeInMainWorld('electron', {
    playNotificationSound: () => ipcRenderer.invoke('play-notification-sound'),
    showNotification: (title, body, is_sound) => ipcRenderer.invoke('show-notification', title, body, is_sound)
});