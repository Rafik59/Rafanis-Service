function openContact() {
  document.getElementById("contactModal").style.display = "block";
}

function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}

window.onclick = function (e) {
  const modal = document.getElementById("contactModal");
  if (e.target === modal) closeContact();
};

function checkStatus() {
  const badge = document.getElementById("statusBadge");
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  let periods = [];

  if (day >= 1 && day <= 4) {
    periods = [[570, 720], [810, 1170]];
  } else if (day === 5) {
    periods = [[570, 720], [840, 1170]];
  } else if (day === 6) {
    periods = [[570, 720], [810, 1170]];
  }

  if (periods.length === 0) {
    badge.className = "status closed";
    badge.textContent = "🔴 Fermé";
    return;
  }

  for (let [start, end] of periods) {
    if (minutes >= start && minutes < end) {
      if (end - minutes <= 15) {
        badge.className = "status closing-soon";
        badge.textContent = "🟠 Fermeture bientôt";
      } else {
        badge.className = "status open";
        badge.textContent = "🟢 Ouvert";
      }
      return;
    }

    if (start - minutes > 0 && start - minutes <= 15) {
      badge.className = "status opening-soon";
      badge.textContent = "🔵 Ouverture bientôt";
      return;
    }
  }

  badge.className = "status closed";
  badge.textContent = "🔴 Fermé";
}

checkStatus();
setInterval(checkStatus, 60000);
