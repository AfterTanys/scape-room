let musicVolume;
document.addEventListener("DOMContentLoaded", (event) => {
  //Recoger el volumen de musica almacenado anteriormente y ponerlo a la musica
  if(localStorage.getItem("musicVolume")){
    musicVolume=JSON.parse(localStorage.getItem("musicVolume"));
    document.getElementsByTagName("audio")[0].volume=musicVolume;
  }

  // Crear el contenedor HUD y sus botones
  const hud = document.createElement("div");
  hud.id = "hud";

  const optionsButton = document.createElement("div");
  optionsButton.id = "optionsButton";
  optionsButton.className = "hud-button";

  /*
  const hintButton = document.createElement("div");
  hintButton.id = "hintButton";
  hintButton.className = "hud-button";
  */

  const inventoryButton = document.createElement("div");
  inventoryButton.id = "inventoryButton";
  inventoryButton.className = "hud-button";

  // Añadir los botones al HUD
  hud.appendChild(optionsButton);
  //hud.appendChild(hintButton);
  hud.appendChild(inventoryButton);

  // Crear el cuadro de diálogo
  const dialogBox = document.createElement("div");
  dialogBox.id = "dialogBox";
  dialogBox.className = "hidden";

  const speakerSprite = document.createElement("div");
  speakerSprite.id = "speakerSprite";
  speakerSprite.className = "hidden";

  const speakerContainer = document.createElement("div");
  speakerContainer.id = "speakerContainer";

  const speakerName = document.createElement("div");
  speakerName.id = "speakerName";
  speakerName.textContent = "Nombre...";

  const dialogTextContainer = document.createElement("div");
  dialogTextContainer.id = "dialogTextContainer";

  const dialogText = document.createElement("p");
  dialogText.id = "dialogText";
  dialogText.textContent = "Texto del diálogo...";

  // Añadir elementos al cuadro de diálogo
  speakerContainer.appendChild(speakerName);
  dialogTextContainer.appendChild(dialogText);

  dialogBox.appendChild(speakerSprite);
  dialogBox.appendChild(speakerContainer);
  dialogBox.appendChild(dialogTextContainer);

  // Añadir HUD y cuadro de diálogo al cuerpo del documento
  document.body.appendChild(hud);
  document.body.appendChild(dialogBox);

  // Ejemplo de dialogo (como se utiliza)
  // showDialog("DIALOG", "NAME","../resources/sprites/ejemplo.jpg");
  // hideDialog();
  // con dialog() hace toggle

  //Modal de boton de configuración

  generateOptions();

  //Evento de boton de configuracion
  let activeOptions = false;
    optionsButton
    .addEventListener("click", function () {
      if(activeOptions == false){
        openModal(document.getElementById("configuration-modal"));
        activeOptions=true;
      }else{
        closeModal(document.getElementById("configuration-modal"));
        activeOptions=false;
      }
    });

  // Evento de abrir inventario
  let activeInventory = false;
  inventoryButton.addEventListener("click", () => {
    if (activeInventory == false) {
      openInventory();
      activeInventory = true;
    } else {
      closeInventory();
      activeInventory = false;
    }
  });
});

let activeDialog = false;

function toggleDialog(text, speakerName, speakerSpritePath) {
  if (activeDialog == false) {
    showDialog(text, speakerName, speakerSpritePath);
  } else {
    hideDialog();
  }
}
// Función para mostrar la caja de diálogo
function showDialog(text, speakerName, speakerSpritePath) {

  const dialogBackgroundOverlay = document.createElement("div");
  dialogBackgroundOverlay.id="dialog-background-overlay";
  if(document.getElementById("dialog-background-overlay")){
    //Nothing
  }else{
    document.body.appendChild(dialogBackgroundOverlay);
  }

  const dialogBox = document.getElementById("dialogBox");
  const dialogText = document.getElementById("dialogText");
  const speakerNameElement = document.getElementById("speakerName");
  const speakerSprite = document.getElementById("speakerSprite");

  dialogText.textContent = text;
  speakerNameElement.textContent = speakerName;

  // Verifica si se ha proporcionado una ruta de imagen y actualiza el src del sprite
  if (speakerSpritePath) {
    speakerSprite.style.backgroundImage = `url('${speakerSpritePath}')`;
    speakerSprite.classList.remove("hidden");
  } else {
    speakerSprite.classList.add("hidden");
  }

  dialogBox.addEventListener("click", hideDialog);

  dialogBox.classList.remove("hidden");
  activeDialog = true;
}

// Función para ocultar la caja de diálogo
function hideDialog() {
  document.getElementById("dialog-background-overlay").remove();
  const dialogBox = document.getElementById("dialogBox");
  dialogBox.classList.add("hidden");
  dialogBox.removeEventListener("click", hideDialog);
  activeDialog = false;
}

//Funcion para generar el menu de opciones
function generateOptions(){
  const configCanvas = document.getElementsByTagName("body")[0];
  let configModal = document.createElement("div");
  configModal.classList.add("modal-puzzle");
  configModal.id = "configuration-modal";
  configCanvas.appendChild(configModal);

  let configHeader3 = document.createElement("div");
  configHeader3.classList.add("configuration-header");
  configHeader3.innerText = "Volume";
  configModal.appendChild(configHeader3);

  let configDivider3 = document.createElement("hr");
  configDivider3.classList.add("configuration-divider");
  configModal.appendChild(configDivider3);

  let configContent3 = document.createElement("div");
  configContent3.classList.add("configuration-container");
  configModal.appendChild(configContent3);

  let voluemeButton1 = document.createElement("div");
  voluemeButton1.classList.add("configuration-volume-icon");
  voluemeButton1.style.backgroundImage="url(../resources/Icons/02.png)";
  voluemeButton1.addEventListener("click", ()=>{
    let bgMusic = document.getElementsByTagName("audio")[0];
    if(bgMusic.volume>0){
      bgMusic.volume-=0.1;
    }
    localStorage.setItem("musicVolume", JSON.stringify(bgMusic.volume));
  });
  configContent3.appendChild(voluemeButton1);

  let voluemeButton2 = document.createElement("div");
  voluemeButton2.classList.add("configuration-volume-icon");
  voluemeButton2.style.backgroundImage="url(../resources/Icons/01.png)";
  voluemeButton2.addEventListener("click", ()=>{
    let bgMusic = document.getElementsByTagName("audio")[0];
    if(bgMusic.volume<1){
      bgMusic.volume+=0.1;
    }
    localStorage.setItem("musicVolume", JSON.stringify(bgMusic.volume));
  });
  configContent3.appendChild(voluemeButton2);

  let voluemeButton3 = document.createElement("div");
  voluemeButton3.classList.add("configuration-volume-icon");
  let mutedMusic;
  if(JSON.parse(localStorage.getItem("mutedMusic"))==true){
    mutedMusic = true;
    voluemeButton3.style.backgroundImage="url(../resources/Icons/34.png)";
  }else{
    mutedMusic = false;
    voluemeButton3.style.backgroundImage="url(../resources/Icons/35.png)";
  }
  voluemeButton3.addEventListener("click", ()=>{
    let bgMusic = document.getElementsByTagName("audio")[0];
    if(mutedMusic==false){
      mutedMusic=true;
      voluemeButton3.style.backgroundImage="url(../resources/Icons/34.png)";
      bgMusic.volume=0;
    }else{
      mutedMusic=false;
      voluemeButton3.style.backgroundImage="url(../resources/Icons/35.png)";
      bgMusic.volume=1;
    }
    localStorage.setItem("musicVolume", JSON.stringify(bgMusic.volume));
    localStorage.setItem("mutedMusic", JSON.stringify(mutedMusic));
  });
  configContent3.appendChild(voluemeButton3);

  let configHeader = document.createElement("div");
  configHeader.classList.add("configuration-header");
  configHeader.innerText = "Room Skip";
  configModal.appendChild(configHeader);

  let configDivider = document.createElement("hr");
  configDivider.classList.add("configuration-divider");
  configModal.appendChild(configDivider);

  let configContent = document.createElement("div");
  configContent.classList.add("configuration-container");
  configModal.appendChild(configContent);

  let configSkipButton1 = document.createElement("button");
  configSkipButton1.classList.add("close-modal-btn");
  configSkipButton1.innerText="Door";
  configSkipButton1.addEventListener("click", ()=>{window.location.href = `Room1.html`;});
  configContent.appendChild(configSkipButton1);

  let configSkipButton2 = document.createElement("button");
  configSkipButton2.classList.add("close-modal-btn");
  configSkipButton2.innerText="Corridor (1)";
  configSkipButton2.addEventListener("click", ()=>{ window.location.href = `puzzleCorridor.html?fromRoom=1&boolRoom=3`;});
  configContent.appendChild(configSkipButton2);

  let configSkipButton3 = document.createElement("button");
  configSkipButton3.classList.add("close-modal-btn");
  configSkipButton3.innerText="Corridor (3)";
  configSkipButton3.addEventListener("click", ()=>{ window.location.href = `puzzleCorridor.html?fromRoom=3&boolRoom=1`;});
  configContent.appendChild(configSkipButton3);

  let configSkipButton4 = document.createElement("button");
  configSkipButton4.classList.add("close-modal-btn");
  configSkipButton4.innerText="Jeep";
  configSkipButton4.addEventListener("click", ()=>{ window.location.href = `Room3.html`;});
  configContent.appendChild(configSkipButton4);

  let configSkipButton5 = document.createElement("button");
  configSkipButton5.classList.add("close-modal-btn");
  configSkipButton5.innerText="Dark";
  configSkipButton5.addEventListener("click", ()=>{ window.location.href = `Room4.html`;});
  configContent.appendChild(configSkipButton5);

  let configContent2 = document.createElement("div");
  configContent2.classList.add("configuration-container");
  configModal.appendChild(configContent2);

  let configSkipButton6 = document.createElement("button");
  configSkipButton6.classList.add("close-modal-btn");
  configSkipButton6.innerText="Good Ending";
  configSkipButton6.addEventListener("click", ()=>{ window.location.href = `Ending.html`;});
  configContent2.appendChild(configSkipButton6);

  let configSkipButton7 = document.createElement("button");
  configSkipButton7.classList.add("close-modal-btn");
  configSkipButton7.innerText="Bad Ending";
  configSkipButton7.addEventListener("click", ()=>{ window.location.href = `badEnding.html`;});
  configContent2.appendChild(configSkipButton7);

  let configHeader2 = document.createElement("div");
  configHeader2.classList.add("configuration-header");
  configHeader2.innerText = "Timer";
  configModal.appendChild(configHeader2);

  let configDivider2 = document.createElement("hr");
  configDivider2.classList.add("configuration-divider");
  configModal.appendChild(configDivider2);

  let configContent4 = document.createElement("div");
  configContent4.classList.add("configuration-container");
  configModal.appendChild(configContent4);

  let configTimeStop = document.createElement("button");
  configTimeStop.classList.add("close-modal-btn");
  configTimeStop.innerText="Stop Timer";
  configTimeStop.addEventListener("click", ()=>{ stopTimer();});
  configContent4.appendChild(configTimeStop);

  let configTimeReset = document.createElement("button");
  configTimeReset.classList.add("close-modal-btn");
  configTimeReset.innerText="Reset Timer";
  configTimeReset.addEventListener("click", ()=>{ resetTimer();});
  configContent4.appendChild(configTimeReset);

}


