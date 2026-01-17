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
  const text = document.getElementById("statusText");

  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const seconds = now.getSeconds();

  let periods = [];

  if (day === 1) periods = [[810, 1170]];
  if ([2,3,4,6].includes(day)) periods = [[570,720],[810,1170]];
  if (day === 5) periods = [[570,720],[840,1170]];

  function format(m) {
    return `${String(Math.floor(m/60)).padStart(2,"0")}h${String(m%60).padStart(2,"0")}`;
  }

  function countdown(target) {
    const diff = target*60 - (minutes*60 + seconds);
    const min = Math.floor(diff/60);
    const sec = diff % 60;
    return `${min} min ${String(sec).padStart(2,"0")} s`;
  }

  let next = null;

  for (let [start, end] of periods) {
    if (minutes >= start && minutes < end) {
      if (end - minutes <= 30) {
        badge.className = "status closing-soon";
        text.textContent = "🟠 Ferme dans " + countdown(end);
      } else {
        badge.className = "status open";
        text.textContent = "🟢 OUVERT — Ferme à " + format(end);
      }
      return;
    }
    if (minutes < start && (!next || start < next)) next = start;
  }

  if (next !== null && next - minutes <= 30) {
    badge.className = "status opening-soon";
    text.textContent = "🔵 Ouvre dans " + countdown(next);
    return;
  }

  if (next !== null) {
    badge.className = "status closed";
    text.textContent = "🔴 FERMÉ — Ouvre à " + format(next);
    return;
  }

  badge.className = "status closed";
  text.textContent = "🔴 FERMÉ";
}

checkStatus();
setInterval(checkStatus, 1000);
