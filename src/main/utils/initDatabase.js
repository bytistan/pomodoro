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
      'date TEXT NOT NULL',
      'points INTEGER NOT NULL'
    ]
  }
];

function initializeTables(db) {
  db.serialize(() => {
    tables.forEach(table => {
      const columnsDef = table.columns.join(', ');
      const sql = `CREATE TABLE IF NOT EXISTS ${table.name} (${columnsDef})`;
      db.run(sql, err => {
        if (err) {
          console.error(`Error creating table ${table.name}:`, err.message);
        } else {
          console.log(`Table created or exists: ${table.name}`);
        }
      });
    });
  });
}

module.exports = {
    initializeTables
}