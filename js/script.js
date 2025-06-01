console.log('hoi');

// API-URL
const url = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20';

// Fetch --> funktioniert noch nichts...
async function loadParkhouseData() {
 try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
  }
}

// Daten der Parkhäuser
const parkHouses = [
  {
    id: "baselparkhauseurope",
    title: "Parkhaus Europe",
    auslastung_prozent: 30,
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

// Verknüpfung id's mit den pop-ups
const popupMap = {
  "baselparkhauseurope": "popup-europe",
  "baselparkhausclarahuus": "popup-clarahuus",
  "baselparkhausrebgasse": "popup-rebgasse",
  "baselparkhausstorchen": "popup-storchen"
};

// Funktion: hole Daten anhand id
function getParkhouseData(id) {
  return parkHouses.find(p => p.id === id);
}

// Fülle Popup mit Daten
function fillPopup(popup, data) {
  popup.querySelector(".popup-title").textContent = data.title;
  popup.querySelector(".free").textContent = data.free;
  popup.querySelector(".auslastung_prozent").textContent = data.auslastung_prozent;
  // Regler Position
const regulator = popup.querySelector(".regulator");
const barContainer = popup.querySelector(".auslastung-bar-container");

if (regulator && barContainer) {
  let percent = Math.max(0, Math.min(100, data.auslastung_prozent)); // Clamp between 0–100
  regulator.textContent = `${percent}%`;
  regulator.style.left = `${percent}%`;
}
  popup.querySelector(".status-text").textContent = data.status;
  popup.querySelector(".address").textContent = data.address;
}

// Event-Listener für Popup Buttons
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




// ------------------------ Pop-up schliessen -----------------------//
// Popup schliessen - "x" Button
document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const popupId = closeBtn.getAttribute("data-close");
    const popup = document.getElementById(popupId);
    if (popup) popup.style.display = "none";
  });
});

// Popup schlisen - Klick ausserhalb
window.addEventListener("click", (e) => {
  document.querySelectorAll(".popup").forEach(popup => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});

// Popup schliessen - ESC Taste
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".popup").forEach(popup => {
      popup.style.display = "none";
    });
  }
});