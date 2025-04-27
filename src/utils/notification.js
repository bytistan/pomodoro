// utils/notification.js
const fs = require('fs');
const path = require('path');
const Speaker = require('speaker');
const wav = require('wav');
const { Notification } = require('electron'); 

function playNotificationSound() {
  const soundPath = path.join(__dirname, '..', 'assets', 'sounds', 'win.wav'); 
  console.log(`Playing sound from: ${soundPath}`);

  const file = fs.createReadStream(soundPath);
  const reader = new wav.Reader();

  file.pipe(reader).pipe(new Speaker());
}

function showNotification(title, body) {
  const notification = new Notification({
    title: title,
    body: body,
    silent: true
  });

  notification.show();

  playNotificationSound();
}

module.exports = {
  playNotificationSound,
  showNotification
};
