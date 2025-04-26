const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

const dbPath = path.join(app.getPath('userData'), 'pomodoro.db');
console.log(dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Veritabanı açılamadı:', err.message);
    } else {
        console.log('✅ Veritabanı bağlantısı başarılı.');
    }
});

function createTable(tableName, columns) {
    const columnsString = columns.map(col => `${col.name} ${col.type}`).join(', ');
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columnsString})`;
    db.run(sql, (err) => {
        if (err) {
            console.error(`❌ ${tableName} tablosu oluşturulamadı:`, err.message);
        } else {
            console.log(`✅ ${tableName} tablosu başarıyla oluşturuldu.`);
        }
    });
}

function insert(tableName, data) {
    const keys = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
            values,
            function (err) {
                if (err) {
                    console.error('❌ Kayıt eklenemedi:', err.message);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

// Tüm verileri çekme
function getAll(tableName) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
            if (err) {
                console.error('❌ Veriler çekilemedi:', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Veri güncelleme
function update(tableName, id, data) {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE ${tableName} SET ${updates} WHERE id = ?`,
            values,
            function (err) {
                if (err) {
                    console.error('❌ Güncelleme hatası:', err.message);
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
}

// Veri silme
function remove(tableName, id) {
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM ${tableName} WHERE id = ?`,
            [id],
            function (err) {
                if (err) {
                    console.error('❌ Silme hatası:', err.message);
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
}

function getByField(tableName, fieldName, value) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM ${tableName} WHERE ${fieldName} = ?`,
            [value],
            (err, row) => {
                if (err) {
                    console.error('❌ Veri çekilemedi:', err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

async function addPointForToday() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    const existingRecord = await getByField('points', 'date', dateStr);

    if (existingRecord) {
        await update('points', existingRecord.id, { points: existingRecord.points + 1 });
        console.log('✅ Mevcut güncelleştirildi.');
    } else {
        await insert('points', { date: dateStr, points: 1 });
        console.log('✅ Yeni kayıt oluşturuldu.');
    }
}

module.exports = {
    createTable,
    insert,
    getAll,
    update,
    remove,
    getByField,
    addPointForToday
};
