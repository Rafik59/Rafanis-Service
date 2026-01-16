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
function checkOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = dimanche
  const time = now.getHours() * 60 + now.getMinutes();

  let open = false;

  const ranges = {
    1: [[810, 1170]], // lundi
    2: [[570, 720], [810, 1170]],
    3: [[570, 720], [810, 1170]],
    4: [[570, 720], [810, 1170]],
    5: [[570, 720], [840, 1170]], // vendredi corrigé
    6: [[570, 720], [810, 1170]]
  };

  if (ranges[day]) {
    open = ranges[day].some(r => time >= r[0] && time <= r[1]);
  }

  const panel = document.getElementById("statusPanel");
  const text = document.getElementById("statusText");

  if (open) {
    panel.classList.add("open");
    panel.classList.remove("closed");
    text.textContent = "Ouvert";
  } else {
    panel.classList.add("closed");
    panel.classList.remove("open");
    text.textContent = "Fermé";
  }
}

checkOpenStatus();
setInterval(checkOpenStatus, 60000);
