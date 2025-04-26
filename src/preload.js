const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

contextBridge.exposeInMainWorld('api', {
    readJson: (filePath) => {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
        }
    },

    updateJson: (filePath, key, value) => {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const json = JSON.parse(data);
            json[key] = value;
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error updating JSON file:', error);
            return false;
        }
    },

    writeJson: (filePath, jsonObject) => {
        try {
            fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error writing JSON file:', error);
            return false;
        }
    }
});

contextBridge.exposeInMainWorld('db', {
    insert: (tableName, data) => ipcRenderer.invoke('db-insert', tableName, data),
    getAll: (tableName) => ipcRenderer.invoke('db-get-all', tableName),
    update: (tableName, id, data) => ipcRenderer.invoke('db-update', tableName, id, data),
    remove: (tableName, id) => ipcRenderer.invoke('db-remove', tableName, id),
    addPointToday: () => ipcRenderer.invoke('db-add-point-today')
});