
const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 3000;

const percorsoDatabase = path.join(
    __dirname,
    "database",
    "attivita.db"
);

const db = new Database(percorsoDatabase);

app.use(express.json());
app.use(express.static(__dirname));

// GET: recupera tutte le attività
app.get("/attivita", function(req, res) {
    const attivita = db.prepare(
        "SELECT * FROM attivita"
    ).all();

    res.json(attivita);
});

// POST: aggiunge una nuova attività
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

// PUT: aggiorna lo stato di completamento
app.put("/attivita/:id", function(req, res) {
    const id = Number(req.params.id);
    const completata = req.body?.completata;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            errore: "ID non valido"
        });
    }

    if (completata !== 0 && completata !== 1) {
        return res.status(400).json({
            errore: "Stato non valido"
        });
    }

    const risultato = db.prepare(
        "UPDATE attivita SET completata = ? WHERE id = ?"
    ).run(completata, id);

    if (risultato.changes === 0) {
        return res.status(404).json({
            errore: "Attività non trovata"
        });
    }

    const attivita = db.prepare(
        "SELECT * FROM attivita WHERE id = ?"
    ).get(id);

    res.json(attivita);
});

 // DELETE: elimina tutte le attività completate
app.delete("/attivita/completate", function(req, res) {
    const risultato = db.prepare(
        "DELETE FROM attivita WHERE completata = 1"
    ).run();

    res.json({
        messaggio: "Attività completate eliminate",
        eliminate: risultato.changes
    });
});

app.listen(PORT, function() {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
