function openContact() {
  document.getElementById("contactModal").style.display = "block";
}

function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("contactModal");
  if (e.target === modal) closeContact();
});

/* OUVERT / FERME */
function checkStatus() {
  const badge = document.getElementById("statusBadge");
  const now = new Date();
  const day = now.getDay(); // 0 dimanche
  const hour = now.getHours() + now.getMinutes() / 60;

  let open = false;

  if (day >= 1 && day <= 4) {
    open = (hour >= 9.5 && hour < 12) || (hour >= 13.5 && hour < 19.5);
  } else if (day === 5) {
    open = (hour >= 9.5 && hour < 12) || (hour >= 14 && hour < 19.5);
  } else if (day === 6) {
    open = (hour >= 9.5 && hour < 12) || (hour >= 13.5 && hour < 19.5);
  }

  badge.classList.remove("loading", "open", "closed");

  if (open) {
    badge.classList.add("open");
    badge.textContent = "🟢 Ouvert";
  } else {
    badge.classList.add("closed");
    badge.textContent = "🔴 Fermé";
  }
}

checkStatus();
setInterval(checkStatus, 60000);
