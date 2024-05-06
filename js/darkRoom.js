let mouseX = 0;
let mouseY = 0;
document.addEventListener("DOMContentLoaded",()=>{
  if (JSON.parse(localStorage.getItem("crystalariumLantern")) == 1) {
    document.getElementById("dark-room-lights-off").hidden = true;
  } else {
    showDialog(
      "This room is pitch black... My flashlight lost all its brightness after Jax decided to perform emergency maneuvers in the asteroid belt while fleeing from the pirates of Ceres... If only my flashlight had broken, it would have been simpler. Dad and I spent two weeks fixing the navigation system while Lena shouted, 'Captain Thorn, I dont care how many years youve served, make a maneuver like that again and Ill ensure you face a court martial.' If I could find some kind of crystal that could amplify light, I might be able to get it working again...",
      `SILA (${JSON.parse(localStorage.getItem("username"))})`,
      "../resources/sprites/Sila/Sila_triste.png"
    );
    document.getElementById("dialogBox").addEventListener("click", exitRoom);
  }
});

//Funcion para salir de la habitacion
function exitRoom(){
  document.getElementById("dialogBox").removeEventListener("click", exitRoom);
  window.location.href = `Room1.html`;
}

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
  if ((keysPressed["u"]||keysPressed["U"]) && (keysPressed["v"]||keysPressed["V"]) && (keysPressed["q"]||keysPressed["Q"])) {
    console.log("Luces encendidas");
    document.getElementById("room4-background").style.cursor = "auto";
    flashlight.remove();
    document.getElementById("dark-room-lights-off").remove();
    keysPressed = {};
  }
}

// Función para manejar el evento keyup
function handleKeyUp(event) {
  // Eliminamos la tecla liberada del objeto keysPressed
  delete keysPressed[event.key];
}

// Agregamos los event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
