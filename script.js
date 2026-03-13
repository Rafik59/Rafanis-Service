function openContact() {
  const modal = document.getElementById("contactModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeContact() {
  const modal = document.getElementById("contactModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("contactModal");
  if (e.target === modal) {
    closeContact();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeContact();
  }
});

/* Animation au scroll */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* Statut d'ouverture */
const schedule = {
  0: [], // Dimanche
  1: [["13:30", "19:30"]], // Lundi
  2: [["09:30", "12:00"], ["13:30", "19:30"]], // Mardi
  3: [["09:30", "12:00"], ["13:30", "19:30"]], // Mercredi
  4: [["09:30", "12:00"], ["13:30", "19:30"]], // Jeudi
  5: [["09:30", "12:00"], ["14:00", "19:30"]], // Vendredi
  6: [["09:30", "12:00"], ["13:30", "19:30"]]  // Samedi
};

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatHour(time) {
  return time.replace(":", "h");
}

function updateStatus() {
  const badge = document.getElementById("statusBadge");
  const label = document.getElementById("statusLabel");
  const subtext = document.getElementById("statusSubtext");

  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todaySlots = schedule[day] || [];

  badge.className = "status";

  if (todaySlots.length === 0) {
    badge.classList.add("closed");
    label.textContent = "Fermé aujourd’hui";
    subtext.textContent = "Réouverture selon les prochains horaires";
    return;
  }

  let isOpen = false;
  let nextOpen = null;
  let currentClose = null;

  for (const [start, end] of todaySlots) {
    const startMin = timeToMinutes(start);
    const endMin = timeToMinutes(end);

    if (currentMinutes >= startMin && currentMinutes < endMin) {
      isOpen = true;
      currentClose = end;
      break;
    }

    if (currentMinutes < startMin && !nextOpen) {
      nextOpen = start;
    }
  }

  if (isOpen) {
    const closingIn = timeToMinutes(currentClose) - currentMinutes;

    if (closingIn <= 60) {
      badge.classList.add("closing-soon");
      label.textContent = "Ouvert • Ferme bientôt";
      subtext.textContent = `Fermeture à ${formatHour(currentClose)}`;
    } else {
      badge.classList.add("open");
      label.textContent = "Ouvert actuellement";
      subtext.textContent = `Fermeture à ${formatHour(currentClose)}`;
    }
    return;
  }

  if (nextOpen) {
    const openingIn = timeToMinutes(nextOpen) - currentMinutes;

    if (openingIn <= 60) {
      badge.classList.add("opening-soon");
      label.textContent = "Fermé • Ouvre bientôt";
      subtext.textContent = `Ouverture à ${formatHour(nextOpen)}`;
    } else {
      badge.classList.add("closed");
      label.textContent = "Actuellement fermé";
      subtext.textContent = `Prochaine ouverture à ${formatHour(nextOpen)}`;
    }
    return;
  }

  badge.classList.add("closed");
  label.textContent = "Fermé pour aujourd’hui";
  subtext.textContent = "Réouverture au prochain créneau";
}

updateStatus();
setInterval(updateStatus, 60000);