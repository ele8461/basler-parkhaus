console.log('hoi');

// API-URL
const url = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20';

// API-Daten laden
async function loadParkhouseData() {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Verknüpfung id's mit den pop-ups
const popupMap = {
  "baselparkhauseurope": "popup-europe",
  "baselparkhausclarahuus": "popup-clarahuus",
  "baselparkhausrebgasse": "popup-rebgasse",
  "baselparkhausstorchen": "popup-storchen"
};

// Popup mit Daten füllen
function fillPopup(popup, data) {
  popup.querySelector(".popup-title").textContent = data.title;
  popup.querySelector(".free").textContent = data.free;
  popup.querySelector(".auslastung_prozent").textContent = data.auslastung_prozent;

  const regulator = popup.querySelector(".regulator");
  const barContainer = popup.querySelector(".auslastung-bar-container");

  if (regulator && barContainer) {
    let percent = Math.max(0, Math.min(100, data.auslastung_prozent));
    // Regler Position
    regulator.textContent = `${percent}%`;
    regulator.style.left = `${percent}%`;
  }

  popup.querySelector(".status-text").textContent = data.status;
  popup.querySelector(".address").textContent = data.address;
}

// Event Listener Buttons
Object.entries(popupMap).forEach(([buttonId, popupId]) => {
  const button = document.getElementById(buttonId);
  const popup = document.getElementById(popupId);

  if (!button || !popup) return;

  button.addEventListener("click", async () => {
    const apiData = await loadParkhouseData();
    if (!apiData || !apiData.results) {
      console.error("API-Daten konnten nicht geladen werden.");
      return;
    }

    // Passendes Parkhaus finden
    const result = apiData.results.find(item =>
      item.name && item.name.toLowerCase().includes(buttonId.replace("baselparkhaus", ""))
    );

    if (!result) {
      console.warn("Kein passendes Parkhaus gefunden.");
      return;
    }

    const data = {
      title: result.title,
      auslastung_prozent: result.auslastung_prozent,
      free: result.free,
      status: result.status || "",
      address: result.address || ""
    };

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