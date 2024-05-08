const fotos = document.getElementsByClassName("hub-promotor-card-photo");
fotos[0].style.backgroundImage = "url(resources/img/pfpHub/miguel-photo.jpg)";
fotos[1].style.backgroundImage = "url(resources/img/pfpHub/eris-photo.png)";
fotos[2].style.backgroundImage = "url(resources/img/pfpHub/tanys-photo.png)";

const overlay = document.getElementById("fullscreen-window-warning-overlay");

const fontButton = document.getElementById("hub-font-button");

const arrChilds = document.getElementById("hub-body").childNodes;

let fullscreen = false;

document
  .getElementById("hub-start-button")
  .addEventListener("click", function () {
    if (fullscreen == false) {
      openModal();
      document.getElementById("hub-start-button").disabled = true;
    } else {
      window.location.href = "html/intro.html";
    }
  });

document.addEventListener("keydown", function (event) {
  if (event.key === "F11") {
    console.log("El usuario presionó F11 para pantalla completa.");
    closeModal();
    if (document.getElementById("hub-name-input").value.length === 0) {
      localStorage.setItem("username", JSON.stringify("Heroine"));
    } else {
      localStorage.setItem(
        "username",
        JSON.stringify(document.getElementById("hub-name-input").value)
      );
    }
    document.getElementById("hub-start-button").disabled = false;
    fullscreen = true;
  }
});

//Abre el modal
function openModal() {
  overlay.style.display = "block";
}

//Cierra el modal
function closeModal() {
  overlay.style.display = "none";
}

let selected_img = 0;
document.getElementById(
  "hub-icon-selector-img"
).src = `resources/sprites/Player Icons/Portrait Science Fantasy (${selected_img})-320px.png`;

document.getElementById("hub-icon-selector").addEventListener("click", () => {
  selected_img++;
  if (selected_img == 25) {
    selected_img = 0;
  }
  document.getElementById(
    "hub-icon-selector-img"
  ).src = `resources/sprites/Player Icons/Portrait Science Fantasy (${selected_img})-320px.png`;
});

function pickElements(arrChilds) {
  Array.from(arrChilds).forEach((a) => {
    if (a.nodeType === 1) {
      // Verifica si es un elemento
      if (a.hasChildNodes()) {
        let arrChilds2 = a.childNodes;
        changeFont(a);
        pickElements(arrChilds2);
      } else {
        changeFont(a);
      }
    }
  });
}

function changeFont(a) {
  if (a.nodeType === 1) {
    // Verifica si es un elemento
    if (a.classList.contains("font-ours")) {
      a.classList.replace("font-ours", "font-normal");
    } else if (a.classList.contains("font-normal")) {
      a.classList.replace("font-normal", "font-ours");
    }
  }
}

fontButton.addEventListener("click", () => {
  pickElements(arrChilds);
});
