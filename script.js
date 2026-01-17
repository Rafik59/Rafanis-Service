function openMapChoice() {
  const ua = navigator.userAgent.toLowerCase();
  const address = encodeURIComponent("16 Rue de Tourcoing 59100 Roubaix");
  const box = document.getElementById("mapButtons");

  box.innerHTML = "";

  if (/iphone|ipad|ipod/.test(ua)) {
    box.innerHTML = `
      <a class="btn primary" href="https://maps.apple.com/?q=${address}" target="_blank">🗺 Plans</a><br><br>
      <a class="btn primary" href="https://www.google.com/maps/search/?api=1&query=${address}" target="_blank">📍 Google Maps</a><br><br>
      <a class="btn primary" href="https://waze.com/ul?q=${address}&navigate=yes" target="_blank">🚗 Waze</a>
    `;
  } else if (/android/.test(ua)) {
    box.innerHTML = `
      <a class="btn primary" href="https://www.google.com/maps/search/?api=1&query=${address}" target="_blank">📍 Google Maps</a><br><br>
      <a class="btn primary" href="https://waze.com/ul?q=${address}&navigate=yes" target="_blank">🚗 Waze</a>
    `;
  } else {
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${address}`;
    return;
  }

  document.getElementById("mapModal").style.display = "block";
}

function closeMap() {
  document.getElementById("mapModal").style.display = "none";
}

/* OUVERT / FERMÉ */
function checkStatus() {
  const badge = document.getElementById("statusBadge");
  const now = new Date();
  const d = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;

  let open = false;

  if (d >= 1 && d <= 4) open = (h >= 9.5 && h < 12) || (h >= 13.5 && h < 19.5);
  if (d === 5) open = (h >= 9.5 && h < 12) || (h >= 14 && h < 19.5);
  if (d === 6) open = (h >= 9.5 && h < 12) || (h >= 13.5 && h < 19.5);

  badge.className = "status " + (open ? "open" : "closed");
  badge.textContent = open ? "🟢 Ouvert" : "🔴 Fermé";
}

checkStatus();
setInterval(checkStatus, 60000);
