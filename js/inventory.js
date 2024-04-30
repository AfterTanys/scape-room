
let slideBallsItem;
let crystalariumLanternItem;
let jeepKeysItem;

document.addEventListener("DOMContentLoaded", () => {
  //Comprobación de items
  if (localStorage.getItem("slideBallsItem")) {
    slideBallsItem = JSON.parse(localStorage.getItem("slideBallsItem"));
  } else {
    slideBallsItem = 0;
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

  if (slideBallsItem < 4) {
    inventoryItem1.style.backgroundImage =
      "url('../resources/img/inventory-balls-empty.png')";
    inventoryItem1.innerHTML = slideBallsItem;
  } else {
    inventoryItem1.style.backgroundImage =
      "url('../resources/img/inventory-balls.png')";
  }

  let inventoryItem2 = document.createElement("div");
  inventoryItem2.classList.add("inventory-item");
  inventoryModal.appendChild(inventoryItem2);

  if (crystalariumLanternItem != 0) {
    //Linterna encendida
  } else {
    //Linterna apagada
  }

  let inventoryItem3 = document.createElement("div");
  inventoryItem3.classList.add("inventory-item");
  inventoryModal.appendChild(inventoryItem3);

  if (jeepKeysItem != 0) {
    inventoryItem3.style.backgroundImage =
      "url('../resources/img/jeep-keys.png')";
  } else {
    inventoryItem3.style.backgroundImage =
      "url('../resources/img/jeep-keys-empty.png')";
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
}
