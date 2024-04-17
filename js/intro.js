/*
Cambiar lo de abajo y mover todo el resto al HUB

document.getElementById('startButton').addEventListener('click', function() {
    //window.location.href = 'cinematic.html';
});
*/
const overlay = document.getElementById("fullscreen-window-warning-overlay");
const warning_window = document.getElementById("fullscreen-window-warning");

document.getElementById('startButton').addEventListener('click', function() {
    openModal(warning_window);
    document.getElementById('startButton').disabled=true;
    //window.location.href = 'cinematic.html';
});

document.addEventListener("keydown", function (event) {
  if (event.key === "F11") {
    console.log("El usuario presionó F11 para pantalla completa.");
    closeModal(warning_window);
    setTimeout(() => {
        window.location.href = 'cinematic.html'; // Redirige a cinematic.html
    }, 1000);
  }
});

//Abre el modal
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

//Cierra el modal
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
