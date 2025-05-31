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


// Map buttons to their popup IDs
const popupMap = {
  "baselparkhauseurope": "popup-europe",
  "baselparkhausclarahuus": "popup-clarahuus",
  "baselparkhausrebgasse": "popup-rebgasse",
  "baselparkhausstorchen": "popup-storchen"
};

// Helper to find parkhouse data by ID
function getParkhouseData(id) {
  return parkHouses.find(p => p.id === id);
}

// Add click listeners to parkhaus buttons
Object.keys(popupMap).forEach(buttonId => {
  const button = document.getElementById(buttonId);
  const popupId = popupMap[buttonId];
  const popup = document.getElementById(popupId);

  button.addEventListener("click", () => {
    const data = getParkhouseData(buttonId);
    if (!data) return;

    // Inject data dynamically
    popup.querySelector(".popup-title").textContent = data.name;
    popup.querySelector(".freie_plaetze").textContent = data.freie_plaetze;
    popup.querySelector(".auslastung").textContent = data.auslastung;

    // Show popup
    popup.style.display = "flex";
  });
});

// Close popup on clicking the close button
document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const popupId = closeBtn.getAttribute("data-close");
    const popup = document.getElementById(popupId);
    popup.style.display = "none";
  });
});

// Optional: Close popup on clicking outside popup content
window.addEventListener("click", (e) => {
  document.querySelectorAll(".popup").forEach(popup => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
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
  // dialog öffnen
  // daten darstellen

// event click close_popup

// event contentLoading kreisfarbe
    // Funktion if > 80% {rot} else {gruen}

//event click button_zurueck