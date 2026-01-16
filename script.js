// ===== MODAL CONTACT =====
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

// ===== PANNEAU OUVERT / FERMÉ =====
document.addEventListener("DOMContentLoaded", function () {
  const statusPanel = document.getElementById("status-panel");
  const statusText = document.getElementById("status-text");

  if (!statusPanel || !statusText) return;

  function isOpenNow() {
    const now = new Date();
    const day = now.getDay(); // 0 = dimanche
    const hour = now.getHours();
    const min = now.getMinutes();
    const time = hour * 60 + min;

    // Fermé le dimanche
    if (day === 0) return false;

    // Lundi : 13h30 – 19h30
    if (day === 1) {
      return time >= 810 && time <= 1170;
    }

    // Mardi à Jeudi : 09h30 – 12h00 / 13h30 – 19h30
    if (day >= 2 && day <= 4) {
      return (
        (time >= 570 && time <= 720) ||
        (time >= 810 && time <= 1170)
      );
    }

    // Vendredi : 09h30 – 12h00 / 14h00 – 19h30
    if (day === 5) {
      return (
        (time >= 570 && time <= 720) ||
        (time >= 840 && time <= 1170)
      );
    }

    // Samedi : 09h30 – 12h00 / 13h30 – 19h30
    if (day === 6) {
      return (
        (time >= 570 && time <= 720) ||
        (time >= 810 && time <= 1170)
      );
    }

    return false;
  }

  function updateStatus() {
    if (isOpenNow()) {
      statusPanel.classList.remove("closed");
      statusPanel.classList.add("open");
      statusText.textContent = "Ouvert";
    } else {
      statusPanel.classList.remove("open");
      statusPanel.classList.add("closed");
      statusText.textContent = "Fermé";
    }
  }

  // Mise à jour immédiate + toutes les minutes
  updateStatus();
  setInterval(updateStatus, 60000);
});
