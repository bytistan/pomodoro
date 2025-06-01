const fs = require('fs');
const path = require('path');
const { Notification } = require('electron');
const { exec } = require('child_process');

function playNotificationSound() {
    const soundPath = path.join(__dirname, '..', 'assets', 'sounds', 'win.wav');

    if (process.platform === 'linux') {
        exec(`aplay "${soundPath}"`, (error) => {
            if (error) {
                console.error('Ses çalma hatası:', error);
            }
        });
    }
}

function showNotification(title, body, is_sound = true) {
    const notification = new Notification({
        title: title,
        body: body,
        silent: true 
    });

    notification.show();

    if (is_sound) {
        playNotificationSound();
    }
}

module.exports = {
    playNotificationSound,
    showNotification
};
