
const formAttivita = document.getElementById("form-attivita");
const inputAttivita = document.getElementById("nuova-attivita");
const listaAttivita = document.getElementById("lista-attivita");
const conteggio = document.getElementById("conteggio");
const cancellaCompletate = document.getElementById("cancella-completate");

function aggiornaConteggio() {
    const attivita = listaAttivita.querySelectorAll(
        ".attivita:not(.vuota)"
    );

    conteggio.textContent = attivita.length + " attività";
}

function aggiornaMessaggioVuoto() {
    const attivita = listaAttivita.querySelectorAll(
        ".attivita:not(.vuota)"
    );

    if (attivita.length === 0) {
        const messaggio = document.createElement("li");
        messaggio.classList.add("attivita", "vuota");
        messaggio.textContent =
            "Non ci sono ancora attività. Aggiungine una!";

        listaAttivita.appendChild(messaggio);
    }
}

function mostraAttivita(attivita) {
    const elemento = document.createElement("li");

    elemento.classList.add("attivita");
    elemento.dataset.id = attivita.id;
    elemento.textContent = attivita.testo;

    if (attivita.completata === 1) {
        elemento.classList.add("completata");
    }

    elemento.addEventListener("click", async function() {
        const nuovoStato = elemento.classList.contains("completata")
            ? 0
            : 1;

        try {
            const risposta = await fetch(
                `/attivita/${attivita.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        completata: nuovoStato
                    })
                }
            );

            if (!risposta.ok) {
                throw new Error("Errore nell'aggiornamento");
            }

            const attivitaAggiornata = await risposta.json();

            elemento.classList.toggle(
                "completata",
                attivitaAggiornata.completata === 1
            );

            aggiornaConteggio();

        } catch (errore) {
            console.error(errore);
            alert("Non è stato possibile aggiornare l'attività.");
        }
    });

    listaAttivita.appendChild(elemento);
}

async function caricaAttivita() {
    try {
        const risposta = await fetch("/attivita");

        if (!risposta.ok) {
            throw new Error("Errore nel caricamento delle attività");
        }

        const attivita = await risposta.json();

        listaAttivita.innerHTML = "";

        attivita.forEach(mostraAttivita);

        aggiornaMessaggioVuoto();
        aggiornaConteggio();

    } catch (errore) {
        console.error(errore);
    }
}

formAttivita.addEventListener("submit", async function(event) {
    event.preventDefault();

    const testo = inputAttivita.value.trim();

    if (testo === "") {
        return;
    }

    try {
        const risposta = await fetch("/attivita", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ testo: testo })
        });

        if (!risposta.ok) {
            throw new Error("Errore nel salvataggio dell'attività");
        }

        const nuovaAttivita = await risposta.json();

        listaAttivita.querySelector(".vuota")?.remove();

        mostraAttivita(nuovaAttivita);

        inputAttivita.value = "";

        aggiornaConteggio();

    } catch (errore) {
        console.error(errore);
        alert("Non è stato possibile salvare l'attività.");
    }
});


cancellaCompletate.addEventListener("click", async function() {
    try {
        const risposta = await fetch("/attivita/completate", {
            method: "DELETE"
        });

        if (!risposta.ok) {
            throw new Error("Errore nell'eliminazione delle attività");
        }

        await risposta.json();

        const completate = listaAttivita.querySelectorAll(".completata");

        completate.forEach(function(attivita) {
            attivita.remove();
        });

        aggiornaMessaggioVuoto();
        aggiornaConteggio();

    } catch (errore) {
        console.error(errore);
        alert("Non è stato possibile eliminare le attività completate.");
    }
});

caricaAttivita();
