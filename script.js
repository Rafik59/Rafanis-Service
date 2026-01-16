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

/* ===== OUVERT / FERME ===== */
function updateStatus() {
  const panel = document.getElementById("statusPanel");
  const text = document.getElementById("statusText");

  const now = new Date();
  const day = now.getDay(); // 0 = dimanche
  const time = now.getHours() * 60 + now.getMinutes();

  let open = false;

  if (day >= 1 && day <= 4) {
    open = (time >= 570 && time <= 720) || (time >= 810 && time <= 1170);
  }
  if (day === 5) {
    open = (time >= 570 && time <= 720) || (time >= 840 && time <= 1170);
  }
  if (day === 6) {
    open = (time >= 570 && time <= 720) || (time >= 810 && time <= 1170);
  }

  panel.classList.remove("open", "closed");

  if (open) {
    panel.classList.add("open");
    text.textContent = "Ouvert";
  } else {
    panel.classList.add("closed");
    text.textContent = "Fermé";
  }
}

updateStatus();
setInterval(updateStatus, 60000);
