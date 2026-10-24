const formAttivita = document.getElementById("form-attivita");
const inputAttivita = document.getElementById("nuova-attivita");
const listaAttivita = document.getElementById("lista-attivita");
const conteggio = document.getElementById("conteggio");
const cancellaCompletate = document.getElementById("cancella-completate");

function aggiornaConteggio() {
    const attivita = listaAttivita.querySelectorAll(".attivita:not(.vuota)");
    conteggio.textContent = attivita.length + " attività";
}

function aggiornaMessaggioVuoto() {
    const attivita = listaAttivita.querySelectorAll(".attivita");

    if (attivita.length === 0) {
        const messaggio = document.createElement("li");
        messaggio.classList.add("attivita", "vuota");
        messaggio.textContent = "Non ci sono ancora attività. Aggiungine una!";
        listaAttivita.appendChild(messaggio);
    }
}

formAttivita.addEventListener("submit", function(event) {
    event.preventDefault();

    const testo = inputAttivita.value.trim();

    if (testo === "") {
        return;
    }


const nuovaAttivita = document.createElement("li");
nuovaAttivita.classList.add("attivita");
nuovaAttivita.textContent = testo;

nuovaAttivita.addEventListener("click", function() {
    nuovaAttivita.classList.toggle("completata");
});

const messaggioVuoto = listaAttivita.querySelector(".vuota");

if (messaggioVuoto) {
    messaggioVuoto.remove();
}

listaAttivita.appendChild(nuovaAttivita);
inputAttivita.value = "";
aggiornaConteggio();

cancellaCompletate.addEventListener("click", function() {
    const completate = listaAttivita.querySelectorAll(".completata");

    completate.forEach(function(attivita) {
        attivita.remove();
    });

    aggiornaMessaggioVuoto();
    aggiornaConteggio();
});

});
