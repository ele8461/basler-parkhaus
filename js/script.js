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
    title: "Parkhaus Europe",
    auslastung_prozent: 0,
    free: 0,
    status: "",
    adress: "Hammerstrasse 68",
  },
  {
    id: "baselparkhausclarahuus",
    title: "Parkhaus Clarahuus",
    auslastung_prozent: 0,
    free: 0,
    status: "",
    adress: "Webergasse 34",
  },
  {
    id: "baselparkhausrebgasse",
    title: "Parkhaus Rebgasse",
    auslastung_prozent: 0,
    free: 0,
    status: "",
    adress: "Rebgasse 20",
  },
  {
    id: "baselparkhausstorchen",
    title: "Parkhaus Storchen",
    auslastung_prozent: 0,
    free: 0,
    status: "",
    adress: "Fischmarkt 10",
  }
];


// Map buttons to their popup IDs
const popupMap = {
  "baselparkhauseurope": "popup-europe",
  "baselparkhausclarahuus": "popup-clarahuus",
  "baselparkhausrebgasse": "popup-rebgasse",
  "baselparkhausstorchen": "popup-storchen"
};

// find parkhouse data by ID
function getParkhouseData(id) {
  return parkHouses.find(p => p.id === id);
}

// click listeners to parkhaus buttons
Object.keys(popupMap).forEach(buttonId => {
  const button = document.getElementById(buttonId);
  const popupId = popupMap[buttonId];
  const popup = document.getElementById(popupId);

  button.addEventListener("click", () => {
    const data = getParkhouseData(buttonId);
    if (!data) return;

    // Inject data dynamically
    popup.querySelector(".popup-title").textContent = data.title;
    popup.querySelector(".free").textContent = data.free;
    popup.querySelector(".auslastung_prozent").textContent = data.auslastung_prozent;

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

// Close popup on clicking outside popup content
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


// event click popup
    // Datensatz anzeigen
    // Funktion Regler
  // dialog öffnen
  // daten darstellen


// event contentLoading kreisfarbe
    // Funktion if > 80% {rot} else {gruen}