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

document.addEventListener("DOMContentLoaded", function () {
  const panel = document.getElementById("status-panel");
  const text = document.getElementById("status-text");

  function isOpen() {
    const d = new Date();
    const day = d.getDay();
    const t = d.getHours() * 60 + d.getMinutes();

    if (day === 0) return false;
    if (day === 1) return t >= 810 && t <= 1170;
    if (day >= 2 && day <= 4) return (t >= 570 && t <= 720) || (t >= 810 && t <= 1170);
    if (day === 5) return (t >= 570 && t <= 720) || (t >= 840 && t <= 1170);
    if (day === 6) return (t >= 570 && t <= 720) || (t >= 810 && t <= 1170);
    return false;
  }

  function update() {
    if (isOpen()) {
      panel.classList.add("open");
      panel.classList.remove("closed");
      text.textContent = "Ouvert";
    } else {
      panel.classList.add("closed");
      panel.classList.remove("open");
      text.textContent = "Fermé";
    }
  }

  update();
  setInterval(update, 60000);
});
