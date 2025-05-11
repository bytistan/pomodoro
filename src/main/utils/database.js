const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

const dbPath = path.join(app.getPath('userData'), 'pomodoro.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Failed to open database:', err.message);
    } else {
        console.log('✅ Database connection successful.');
    }
});

function createTable(tableName, columns) {
    return new Promise((resolve, reject) => {
        const columnsString = columns.map(col => {
            if (typeof col === 'string') return col;
            if (typeof col === 'object' && col.name && col.type) return `${col.name} ${col.type}`;
            return null;
        }).filter(Boolean).join(', ');

        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsString})`;
        db.run(sql, (err) => {
            if (err) {
                console.error(`❌ Failed to create table ${tableName}:`, err.message);
                reject(err);
            } else {
                console.log(`✅ Table ${tableName} created successfully.`);
                resolve();
            }
        });
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
                    console.error('❌ Failed to insert record:', err.message);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

function getAll(tableName) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
            if (err) {
                console.error('❌ Failed to fetch data:', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function update(tableName, id, data) {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE ${tableName} SET ${updates} WHERE id = ?`,
            values,
            function (err) {
                if (err) {
                    console.error('❌ Failed to update record:', err.message);
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
}

function remove(tableName, id) {
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM ${tableName} WHERE id = ?`,
            [id],
            function (err) {
                if (err) {
                    console.error('❌ Failed to delete record:', err.message);
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
        db.all(
            `SELECT * FROM ${tableName} WHERE ${fieldName} = ?`,
            [value],
            (err, row) => {
                if (err) {
                    console.error('❌ Failed to fetch record:', err.message);
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
        console.log('✅ Existing record updated.');
    } else {
        await insert('points', { date: dateStr, points: 1 });
        console.log('✅ New record created.');
    }
}

function getByMultipleFields(tableName, conditions) {
    const keys = Object.keys(conditions);
    const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
    const values = Object.values(conditions);

    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM ${tableName} WHERE ${whereClause}`,
            values,
            (err, row) => {
                if (err) {
                    console.error('❌ Failed to fetch record:', err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

module.exports = {
    createTable,
    insert,
    getAll,
    update,
    remove,
    getByField,
    addPointForToday,
    getByMultipleFields,
    db
};
