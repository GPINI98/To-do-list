
const Database = require("better-sqlite3"); /*libreria che permette a Node.js di comunicare con sqlite3*/ 
const path = require("path");

const percorsoDatabase = path.join(__dirname, "attivita.db");

const db = new Database(percorsoDatabase); /*apre o crea il database*/

db.exec(`
    CREATE TABLE IF NOT EXISTS attivita (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        testo TEXT NOT NULL,
        completata INTEGER NOT NULL DEFAULT 0
    );
`);

console.log("Database e tabella pronti!");

db.close(); /*chiude la connessione al database*/
