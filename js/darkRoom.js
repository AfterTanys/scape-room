let mouseX = 0;
let mouseY = 0;

let flashlight = document.getElementById("flashlight");
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

function getMousePosition(e) {
  mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
  mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;

  flashlight.style.setProperty("--Xpos", mouseX + "px");
  flashlight.style.setProperty("--Ypos", mouseY + "px");
}

document.addEventListener("mousemove", getMousePosition);
document.addEventListener("touchmove", getMousePosition);

let keysPressed = {};

// Función para manejar el evento keydown
function handleKeyDown(event) {
  // Agregamos la tecla presionada al objeto keysPressed
  keysPressed[event.key] = true;

  // Verificamos si se han presionado todas las teclas requeridas al mismo tiempo
  if (keysPressed['u'] && keysPressed['v'] && keysPressed['q']) {
    console.log("Luces encendidas");
    document.getElementById("room4-background").style.cursor="auto";
    flashlight.remove();
    keysPressed = {};
  }
}

// Función para manejar el evento keyup
function handleKeyUp(event) {
  // Eliminamos la tecla liberada del objeto keysPressed
  delete keysPressed[event.key];
}

// Agregamos los event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
