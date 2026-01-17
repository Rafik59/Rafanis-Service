function openContact() {
  document.getElementById("contactModal").style.display = "block";
}

function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}

/* STATUT OUVERT / FERME */
function checkStatus() {
  const badge = document.getElementById("statusBadge");
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;

  let open = false;

  if (day >= 1 && day <= 4) open = (hour >= 9.5 && hour < 12) || (hour >= 13.5 && hour < 19.5);
  if (day === 5) open = (hour >= 9.5 && hour < 12) || (hour >= 14 && hour < 19.5);
  if (day === 6) open = (hour >= 9.5 && hour < 12) || (hour >= 13.5 && hour < 19.5);

  badge.className = "status " + (open ? "open" : "closed");
  badge.textContent = open ? "🟢 Ouvert" : "🔴 Fermé";
}

checkStatus();
setInterval(checkStatus, 60000);

/* ITINERAIRE */
function openMapChoice() {
  const ua = navigator.userAgent.toLowerCase();
  const address = encodeURIComponent("16 Rue de Tourcoing 59100 Roubaix");
  const container = document.getElementById("mapButtons");
  container.innerHTML = "";

  if (/iphone|ipad|ipod/.test(ua)) {
    container.innerHTML += `<a class="btn primary" href="https://maps.apple.com/?q=${address}">🗺 Plans</a><br><br>`;
    container.innerHTML += `<a class="btn primary" href="https://www.google.com/maps?q=${address}">📍 Google Maps</a><br><br>`;
    container.innerHTML += `<a class="btn primary" href="https://waze.com/ul?q=${address}">🚗 Waze</a>`;
  } else if (/android/.test(ua)) {
    container.innerHTML += `<a class="btn primary" href="https://www.google.com/maps?q=${address}">📍 Google Maps</a><br><br>`;
    container.innerHTML += `<a class="btn primary" href="https://waze.com/ul?q=${address}">🚗 Waze</a>`;
  } else {
    window.open(`https://www.google.com/maps?q=${address}`, "_blank");
    return;
  }

  document.getElementById("mapModal").style.display = "block";
}

function closeMap() {
  document.getElementById("mapModal").style.display = "none";
}
