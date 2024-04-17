/*
const overlay = document.getElementById("fullscreen-window-warning-overlay");
const warning_window = document.getElementById("fullscreen-window-warning");

//Cuando se abre la pagina se esperan 4 segundos y aparece la ventana
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    openModal(warning_window);
  }, 4000);
});

let completa = false;

document.addEventListener("keydown", function (event) {
  if (event.key === "F11") {
    console.log("El usuario presionó F11 para pantalla completa.");
    closeModal(warning_window);
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
*/
