console.log('hoi')

// fetch
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

// Datenstruktur der Parkhäuser
const parkHouses = [
  {
    id: "baselparkhauseurope",
    name: "Parkhaus Europe",
    freie_plaetze: 85,
    auslastung: 65,
  },
  {
    id: "baselparkhausclarahuus",
    name: "Parkhaus Clarahuus",
    freie_plaetze: 120,
    auslastung: 40
  },
  {
    id: "baselparkhausrebgasse",
    name: "Parkhaus Rebgasse",
    freie_plaetze: 40,
    auslastung: 85
  },
  {
    id: "baselparkhausstorchen",
    name: "Parkhaus Storchen",
    freie_plaetze: 60,
    auslastung: 70
  }
];


// Alle Buttons mit der Klasse "parkhaus_flaeche" holen
const buttons = document.querySelectorAll(".parkhaus_flaeche");

// EventListener zu jedem Button hinzufügen
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const hausId = button.id;
    const parkhaus = parkHouses.find(h => h.id === hausId);

    if (parkhaus) {
      showDialog(parkhaus);
    } else {
      console.warn(`Kein Parkhaus mit ID "${hausId}" gefunden.`);
    }
  });
});

// Funktion zur Anzeige der Parkhausdaten
function showDialog(parkhaus) {
  alert(
    `${parkhaus.name}\n` +
    `Freie Plätze: ${parkhaus.freie_plaetze}\n` +
    `Auslastung: ${parkhaus.auslastung}%`
  );
}


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
  // dialog öffnen
  // daten darstellen

// event click close_popup

// event contentLoading kreisfarbe
    // Funktion if > 80% {rot} else {gruen}

//event click button_zurueck