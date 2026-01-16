function openContact() {
  document.getElementById("contactModal").style.display = "block";
}

function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("contactModal");
  if (e.target === modal) {
    closeContact();
  }
});

/* ================= OUVERT / FERME ================= */
function checkOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = dimanche
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;

  let open = false;

  // Lundi
  if (day === 1) {
    open = time >= 13.5 && time <= 19.5;
  }

  // Mardi à Jeudi
  if (day >= 2 && day <= 4) {
    open =
      (time >= 9.5 && time <= 12) ||
      (time >= 13.5 && time <= 19.5);
  }

  // Vendredi
  if (day === 5) {
    open =
      (time >= 9.5 && time <= 12) ||
      (time >= 14 && time <= 19.5);
  }

  // Samedi
  if (day === 6) {
    open =
      (time >= 9.5 && time <= 12) ||
      (time >= 13.5 && time <= 19.5);
  }

  const status = document.getElementById("status");

  if (open) {
    status.className = "status open";
    status.innerHTML = "🟢 Ouvert";
  } else {
    status.className = "status closed";
    status.innerHTML = "🔴 Fermé";
  }
}

checkOpenStatus();
setInterval(checkOpenStatus, 60000);

