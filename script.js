/* CONTACT */
function openContact() {
  document.getElementById("contactModal").style.display = "block";
}

function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}

/* STATUS */
function checkStatus() {
  const badge = document.getElementById("statusBadge");
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;

  let open = false;

  if (day >= 1 && day <= 4) {
    open = (hour >= 9.5 && hour < 12) || (hour >= 13.5 && hour < 19.5);
  } else if (day === 5) {
    open = (hour >= 9.5 && hour < 12) || (hour >= 14 && hour < 19.5);
  } else if (day === 6) {
    open = (hour >= 9.5 && hour < 12) || (hour >= 13.5 && hour < 19.5);
  }

  badge.className = "status " + (open ? "open" : "closed");
  badge.textContent = open ? "🟢 Ouvert" : "🔴 Fermé";
}

checkStatus();
setInterval(checkStatus, 60000);

/* ITINÉRAIRE INTELLIGENT */
function openNavigation() {
  const address = "16 Rue de Tourcoing 59100 Roubaix";
  const ua = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) {
    if (confirm("Plans Apple ?")) {
      window.location.href = `maps://?q=${encodeURIComponent(address)}`;
    } else if (confirm("Google Maps ?")) {
      window.location.href = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    } else {
      window.location.href = `https://waze.com/ul?q=${encodeURIComponent(address)}`;
    }
  } else {
    if (confirm("Google Maps ?")) {
      window.location.href = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    } else {
      window.location.href = `https://waze.com/ul?q=${encodeURIComponent(address)}`;
    }
  }
}
