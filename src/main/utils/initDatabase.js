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
        name: 'text',
        columns: [
            'id INTEGER PRIMARY KEY AUTOINCREMENT',
            'language_id INTEGER NOT NULL',
            'text VARCHAR NOT NULL',
            'created_date DATETIME NOT NULL',
            'updated_date DATETIME'
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

async function initializeTables(database) {
    const now = new Date().toISOString();

    for (const table of tables) {
        await database.createTable(table.name, table.columns);
    }

    const languages = ['en', 'tr'];
    for (const lang of languages) {
        const existing = await database.getByField('language', 'language', lang);
        if (!existing) {
            await database.insert('language', {
                language: lang,
                character_type: 0,
                created_date: now
            });
        }
    }

    const clockSetting = await database.getByField('clock_settings', 'id', 1);
    if (!clockSetting) {
        await database.insert('clock_settings', {
            is_sound: 1,
            work_time: 25,
            break_time: 5,
            set_number: 4,
            created_date: now
        });
    }

    const settings = await database.getByField('settings', 'id', 1);
    const clock = await database.getByField('clock_settings', 'id', 1);
    const lang = await database.getByField('language', 'language', 'en');

    if (!settings && clock && lang) {
        await database.insert('settings', {
            clock_id: clock.id,
            language_id: lang.id,
            is_sound: 1,
            is_dark_mode: 0,
            is_character: 0,
            character_funny_level: 0,
            created_date: now
        });
    }
}


module.exports = { initializeTables };
