To-do List

Una semplice applicazione web per gestire le attività quotidiane, sviluppata per mettere in pratica le tecnologie frontend e backend e comprendere il funzionamento di un'applicazione web completa.

Funzionalità

Visualizzazione delle attività salvate

Inserimento di nuove attività

Contrassegno delle attività come completate

Eliminazione delle attività completate

Salvataggio permanente dei dati tramite database SQLite

Comunicazione tra frontend e backend tramite API REST

Tecnologie utilizzate

HTML5 — struttura della pagina

CSS3 — stile e layout

JavaScript — interazioni e richieste HTTP

Node.js — ambiente di esecuzione del backend

Express — gestione del server e degli endpoint API

SQLite — archiviazione dei dati

better-sqlite3 — interazione con il database
Installazione e avvio

1. Clonare il repository

git clone URL_DEL_REPOSITORY
cd To-do-list

Sostituire URL_DEL_REPOSITORY con l'indirizzo effettivo del repository GitHub.

2. Installare le dipendenze

npm install

3. Inizializzare il database

node database/init.js

Questo comando crea il database SQLite e la tabella necessaria per memorizzare le attività.

4. Avviare il server

node server.js

Aprire quindi il browser all'indirizzo:

http://localhost:3000

API REST

Il backend espone i seguenti endpoint:

Metodo HTTP

Endpoint

Descrizione

GET

/attivita

Recupera tutte le attività

POST

/attivita

Inserisce una nuova attività

PUT

/attivita/:id

Aggiorna lo stato di completamento

DELETE

/attivita/completate

Elimina tutte le attività completate

Le risposte del server vengono restituite in formato JSON.

Obiettivo del progetto

Il progetto nasce con l'obiettivo di approfondire il collegamento tra interfaccia utente, server e database. Durante lo sviluppo ho lavorato sulla gestione delle richieste HTTP, sulla creazione di API REST e sulla persistenza dei dati, consolidando le conoscenze attraverso la realizzazione pratica di un'applicazione completa.