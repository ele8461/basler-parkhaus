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

// event click close_popup

// event contentLoading kreisfarbe
    // Funktion if > 80% {rot} else {gruen}

//event click button_zurueck