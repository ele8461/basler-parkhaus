console.log('hoi')

const url = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20';
async function loadTimetable() {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const timetable = await loadTimetable();
console.log(timetable); // gibt die Daten der API oder false in der Konsole aus


const dialog = document.getElementById("parkhausDialog");
const dialogText = document.getElementById("dialog-text");

// Alle klickbaren Flächen suchen
document.querySelectorAll(".parkhaus_flaeche").forEach((flaeche) => {
  flaeche.addEventListener("click", () => {
    const title = flaeche.querySelector("h2")?.textContent || "Parkhaus Info";
    dialogText.textContent = `Informationen zu: ${title}`;
    dialog.showModal();
  });
});

// was wir brauchen vom datensatz:
//title
//free
//auslastung_prozent
//status
//address
    //lon:
    //lat:


// event scroll moveCar

// event click popup
    // Datensatz anzeigen
    // Funktion Regler
const button_steinen = document.querySelector("#steinen");
button_steinen.addEventListener("click", (e) => {
  const haus_id = e.target.id;
  const parkhaus = parkHouses.find(h => haus_id === h.id);
  showDialog(parkhaus);
});

function showDialog(parkhaus) {
  // dialog öffnen
  // daten darstellen
}

// event click close_popup

// event contentLoading kreisfarbe
    // Funktion if > 80% {rot} else {gruen}

//event click button_zurueck