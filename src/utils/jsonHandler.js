// settings.js

const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const settingsJsonFilePath = path.join(app.getPath('userData'), 'settings.json');

const defaultSettings = {
    pomodoro: {
        work_time: 1,
        break_time: 5,
        set_number: 4,
        is_sound: true
    }
};

if (!fs.existsSync(settingsJsonFilePath)) {
    fs.writeFileSync(settingsJsonFilePath, JSON.stringify(defaultSettings, null, 2), 'utf8');
}

function readJson(jsonFilePath) {
    try {
        const filePath = path.join(app.getPath('userData'), jsonFilePath);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

function updateJson(jsonFilePath ,key, value) {
    try {
        const filePath = path.join(app.getPath('userData'),jsonFilePath);
        const data = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(data);
        json[key] = value;
        fs.writeFileSync(settingsJsonFilePath, JSON.stringify(json, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error updating JSON file:', error);
        return false;
    }
}

function writeJson(jsonFilePath ,jsonObject) {
    try {
        const filePath = path.join(app.getPath('userData'),jsonFilePath);
        fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        return false;
    }
}

module.exports = {
    readJson,
    updateJson,
    writeJson
};