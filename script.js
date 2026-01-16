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

/* ===== OUVERT / FERME ===== */
function checkOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() + now.getMinutes() / 60;

  let open = false;

  if (day === 1) open = time >= 13.5 && time <= 19.5;
  if (day >= 2 && day <= 4)
    open = (time >= 9.5 && time <= 12) || (time >= 13.5 && time <= 19.5);
  if (day === 5)
    open = (time >= 9.5 && time <= 12) || (time >= 14 && time <= 19.5);
  if (day === 6)
    open = (time >= 9.5 && time <= 12) || (time >= 13.5 && time <= 19.5);

  const panel = document.getElementById("status");
  panel.className = open ? "status-bar open" : "status-bar closed";
  panel.querySelector(".label").textContent = open ? "Ouvert" : "Fermé";
}

checkOpenStatus();
setInterval(checkOpenStatus, 60000);
