const Database = require("better-sqlite3");

const db = new Database("./db/journal.db");

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS journals (
    entry_date TEXT PRIMARY KEY,
    content TEXT NOT NULL
    )
    `
).run();

module.exports = db;
