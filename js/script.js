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

// Verknüpfung buttons id (parkhäuser) mit zugehörigem popup
const popupMap = {
  "baselparkhauseurope": "popup_europe",
  "baselparkhausclarahuus": "popup_clarahuus",
  "baselparkhausrebgasse": "popup_rebgasse",
  "baselparkhausstorchen": "popup_storchen"
};


// status-farbe on page load
window.addEventListener("DOMContentLoaded", async () => {
  const data = await loadParkhouseData();
  if (!data?.results) return;

  Object.keys(popupMap).forEach(id => {
    const button = document.getElementById(id);
    const result = data.results.find(r =>
      r.name?.toLowerCase().includes(id.replace("baselparkhaus", ""))
    );
    const circle = button?.querySelector(".status");
    const percent = result?.auslastung_prozent;

    if (circle && typeof percent === "number") {
      circle.style.backgroundColor =
        percent <= 40 ? "var(--gruen)" :
        percent <= 80 ? "var(--orange)" :
        "var(--rot)";
    }
  });
});

// Popup mit Daten füllen
function fillPopup(popup, data) {
  popup.querySelector(".popup_title").textContent = data.title;
  popup.querySelector(".free").textContent = data.free;

  const regulator = popup.querySelector(".regulator");
  const barContainer = popup.querySelector(".auslastung_bar_container");
  const percentSpan = popup.querySelector(".regulator .auslastung_prozent");

  if (regulator && barContainer && typeof data.auslastung_prozent === "number") {
    let percent = Math.max(0, Math.min(100, data.auslastung_prozent));
    regulator.style.left = `${percent}%`;

    if (percentSpan) {
      percentSpan.textContent = `${percent}`;
    }
  }

  popup.querySelector(".status_text").textContent = data.status;
  
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lon}`;
  popup.querySelector(".address").innerHTML = `<a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">${data.address}</a>`;
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
      address: result.address || "",
      lat: result.geo_point_2d?.lat,
      lon: result.geo_point_2d?.lon,
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