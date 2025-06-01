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

// Datenstruktur der Parkhäuser
const parkHouses = [
  {
    id: "baselparkhauseurope",
    title: "Parkhaus Europe",
    auslastung_prozent: 0,
    free: 0,
    status: "",
    address: "Hammerstrasse 68",
  },
  {
    id: "baselparkhausclarahuus",
    title: "Parkhaus Clarahuus",
    auslastung_prozent: 0,
    free: 0,
    status: "",
    address: "Webergasse 34",
  },
  {
    id: "baselparkhausrebgasse",
    title: "Parkhaus Rebgasse",
    auslastung_prozent: 0,
    free: 0,
    status: "",
    address: "Rebgasse 20",
  },
  {
    id: "baselparkhausstorchen",
    title: "Parkhaus Storchen",
    auslastung_prozent: 0,
    free: 0,
    status: "",
    address: "Fischmarkt 10",
  }
];


// Verknüpfung id's und buttons
const popupMap = {
  "baselparkhauseurope": "popup-europe",
  "baselparkhausclarahuus": "popup-clarahuus",
  "baselparkhausrebgasse": "popup-rebgasse",
  "baselparkhausstorchen": "popup-storchen"
};

// Hole ein Parkhaus-Objekt anhand der ID
function getParkhouseData(id) {
  return parkHouses.find(p => p.id === id);
}

// Fülle Popup mit Daten
function fillPopup(popup, data) {
  popup.querySelector(".popup-title").textContent = data.title;
  popup.querySelector(".free").textContent = data.free;
  popup.querySelector(".auslastung_prozent").textContent = data.auslastung_prozent;
  popup.querySelector(".status-text").textContent = data.status;
  popup.querySelector(".address").textContent = data.address;

  const bar = popup.querySelector(".auslastung-bar");
  if (bar) {
    bar.style.width = `${data.auslastung_prozent}%`;
    bar.style.backgroundColor = data.auslastung_prozent < 50 ? "green" :
                                data.auslastung_prozent < 80 ? "orange" : "red";
  }
}

// Event-Listener für Parkhaus-Buttons
Object.entries(popupMap).forEach(([buttonId, popupId]) => {
  const button = document.getElementById(buttonId);
  const popup = document.getElementById(popupId);
  const data = getParkhouseData(buttonId);

  if (!button || !popup || !data) return;

  button.addEventListener("click", () => {
    fillPopup(popup, data);
    popup.style.display = "flex";
  });
});

// Popups schliessen mit "x"-Button
document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const popupId = closeBtn.getAttribute("data-close");
    const popup = document.getElementById(popupId);
    if (popup) popup.style.display = "none";
  });
});

// Popups schliessen durch Klick ausserhalb des Inhalts
window.addEventListener("click", (e) => {
  document.querySelectorAll(".popup").forEach(popup => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});

// Popups schliessen durch ESC
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".popup").forEach(popup => {
      popup.style.display = "none";
    });
  }
});