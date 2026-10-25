const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 3000;

const percorsoDatabase = path.join(__dirname, "database", "attivita.db");
const db = new Database(percorsoDatabase);

// Permette di leggere il JSON delle richieste
app.use(express.json());

// Rende accessibili i file HTML, CSS e JavaScript
app.use(express.static(__dirname));

// Legge tutte le attività dal database
app.get("/attivita", function(req, res) {
    const attivita = db.prepare(
        "SELECT * FROM attivita"
    ).all();

    res.json(attivita);
});

// Inserisce una nuova attività
app.post("/attivita", function(req, res) {
    const testo = req.body?.testo;

    if (typeof testo !== "string" || testo.trim() === "") {
        return res.status(400).json({
            errore: "Il testo dell'attività è obbligatorio"
        });
    }

    const risultato = db.prepare(
        "INSERT INTO attivita (testo) VALUES (?)"
    ).run(testo.trim());

    const nuovaAttivita = db.prepare(
        "SELECT * FROM attivita WHERE id = ?"
    ).get(risultato.lastInsertRowid);

    res.status(201).json(nuovaAttivita);
});

// Avvia il server
app.listen(PORT, function() {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
