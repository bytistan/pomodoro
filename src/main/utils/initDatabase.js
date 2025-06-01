const tables = [
    {
        name: 'clock_settings',
        columns: [
            'id INTEGER PRIMARY KEY AUTOINCREMENT',
            'is_sound BOOLEAN NOT NULL',
            'work_time INTEGER NOT NULL',
            'break_time INTEGER NOT NULL',
            'set_number INTEGER NOT NULL',
            'updated_date DATETIME',
            'created_date DATETIME NOT NULL'
        ]
    },
    {
        name: 'settings',
        columns: [
            'id INTEGER PRIMARY KEY AUTOINCREMENT',
            'clock_id INTEGER NOT NULL',
            'language_id INTEGER NOT NULL',
            'is_sound BOOLEAN NOT NULL',
            'is_dark_mode INTEGER NOT NULL',
            'is_character INTEGER NOT NULL',
            'is_insert BOOLEAN NOT NULL',
            'character_funny_level INTEGER NOT NULL',
            'updated_date DATETIME',
            'created_date DATETIME NOT NULL'
        ]
    },
    {
        name: 'language',
        columns: [
            'id INTEGER PRIMARY KEY AUTOINCREMENT',
            'language VARCHAR NOT NULL',
            'character_type INTEGER NOT NULL',
            'updated_date DATETIME',
            'created_date DATETIME NOT NULL'
        ]
    },
    {
        name: 'points',
        columns: [
            'id INTEGER PRIMARY KEY AUTOINCREMENT',
            'date TEXT NOT NULL',
            'points INTEGER NOT NULL'
        ]
    }
];

async function insertLanguage(database) {
    const now = new Date().toISOString();
    const languages = ['en', 'tr'];
    for (const lang of languages) {
        const existingLangs = await database.getByField('language', 'language', lang);
        const existing = existingLangs[0];

        if (!existing) {
            await database.insert('language', {
                language: lang,
                character_type: 0,
                created_date: now
            });
        }
    }
}

async function insertClock(database) {
    const now = new Date().toISOString();
    const clockSettings = await database.getByField('clock_settings', 'id', 1);
    const clockSetting = clockSettings[0];

    if (!clockSetting) {
        await database.insert('clock_settings', {
            is_sound: 1,
            work_time: 1,
            break_time: 1,
            set_number: 1,
            created_date: now
        });
    }
}

async function insertSettings(database) {
    const now = new Date().toISOString();
    const settingsArr = await database.getByField('settings', 'id', 1);
    const clockArr = await database.getByField('clock_settings', 'id', 1);
    const langArr = await database.getByField('language', 'language', 'en');

    const settings = settingsArr[0];
    const clock = clockArr[0];
    const lang = langArr[0];

    if (!settings && clock && lang) {
        await database.insert('settings', {
            clock_id: clock.id,
            language_id: lang.id,
            is_sound: 1,
            is_dark_mode: 0,
            is_character: 0,
            is_insert: 0,
            character_funny_level: 0,
            created_date: now
        });
    }
}

async function insertData(database) {
    await insertClock(database);
    await insertLanguage(database);
    await insertSettings(database);
}

async function createTables(database) {
    for (const table of tables) {
        await database.createTable(table.name, table.columns);
    }
}

async function checkTableExists(database, tableName) {
    const result = await new Promise((resolve, reject) => {
        database.db.all(
            `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
            [tableName],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });

    return result.length > 0;
}

async function initialize(database) {
    const settingsTableExists = await checkTableExists(database, 'settings');

    if (!settingsTableExists) {
        await createTables(database);
    }

    let settings = await database.getAll('settings');

    if (settings.length === 0 || !settings[0].is_insert) {
        try {
            await insertData(database);

            if (settings.length === 0) {
                await database.insert('settings', { is_insert: true });
            } else {
                settings[0].is_insert = true;
                await database.update('settings', settings[0].id, settings[0]);
            }

            console.log('✅ Initialization completed successfully.');
        } catch (error) {
            console.error('❌ Error during initialization:', error.message);
        }
    } else {
        console.log('✅ Initialization is already completed.');
    }
}

module.exports = { initialize };
