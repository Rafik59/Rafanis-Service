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
