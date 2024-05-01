
let slideBallsItem;
let crystalariumLanternItem;
let jeepKeysItem;

document.addEventListener("DOMContentLoaded", () => {
  //Comprobación de items cuando carga cualquier pagina
  if (localStorage.getItem("slideBallsItem")) {
    slideBallsItem = JSON.parse(localStorage.getItem("slideBallsItem"));
  } else {
    slideBallsItem = new Array();
    localStorage.setItem("slideBallsItem", JSON.stringify(slideBallsItem));
  }

  if (localStorage.getItem("jeepKeys")) {
    jeepKeysItem = JSON.parse(localStorage.getItem("jeepKeys"));
  } else {
    jeepKeysItem = 0;
    localStorage.setItem("jeepKeys", JSON.stringify(jeepKeysItem));
  }

  if (localStorage.getItem("crystalariumLantern")) {
    crystalariumLanternItem = JSON.parse(
      localStorage.getItem("crystalariumLantern")
    );
  } else {
    crystalariumLanternItem = 0;
    localStorage.setItem(
      "crystalariumLantern",
      JSON.stringify(crystalariumLanternItem)
    );
  }

  //Creacion del modal
  const inventoryCanvas = document.getElementsByTagName("body")[0];
  let inventoryModal = document.createElement("div");
  inventoryModal.classList.add("modal-puzzle");
  inventoryModal.id = "inventory-modal";
  inventoryCanvas.appendChild(inventoryModal);

  //Creación de items individuales
  let inventoryItem1 = document.createElement("div");
  inventoryItem1.classList.add("inventory-item");
  inventoryModal.appendChild(inventoryItem1);

  updateSlideBallsItem(inventoryItem1);

  let inventoryItem2 = document.createElement("div");
  inventoryItem2.classList.add("inventory-item");
  inventoryModal.appendChild(inventoryItem2);

  //Meter lo de abajo en funcion
  if (crystalariumLanternItem != 0) {
    inventoryItem2.style.backgroundImage="url('../resources/img/items/inventory-crystal.png')";
  } else {
    inventoryItem2.style.backgroundImage="url('../resources/img/items/inventory-crystal-empty.png')";
  }

  let inventoryItem3 = document.createElement("div");
  inventoryItem3.classList.add("inventory-item");
  inventoryModal.appendChild(inventoryItem3);

  //Meter lo de abajo en funcion
  if (jeepKeysItem != 0) {
    inventoryItem3.style.backgroundImage =
      "url('../resources/img/items/jeep-keys.png')";
  } else {
    inventoryItem3.style.backgroundImage =
      "url('../resources/img/items/jeep-keys-empty.png')";
  }
});

function openInventory() {
  openModal(document.getElementById("inventory-modal"));
}

function closeInventory() {
  closeModal(document.getElementById("inventory-modal"));
}
//Con esta funcion borras todo lo que haya en el inventario
function resetInventory(){
    localStorage.removeItem("slideBallsItem");
    localStorage.removeItem("jeepKeys");
    localStorage.removeItem("crystalariumLantern");
    //Se resetea username al pulsar el boton de tips
    localStorage.removeItem("username");
    //Se resetea el timer al pulsar tips
    //resetTimer();
}

function updateSlideBallsItem(inventoryItem1){
  if (slideBallsItem.length < 4) {
    inventoryItem1.style.backgroundImage =
      "url('../resources/img/items/inventory-balls-empty.png')";
    inventoryItem1.innerHTML = slideBallsItem.length;
  } else {
    inventoryItem1.style.backgroundImage =
      "url('../resources/img/items/inventory-balls.png')";
  }
}
