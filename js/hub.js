const fotos = document.getElementsByClassName("hub-promotor-card-photo");
fotos[0].style.backgroundImage="url(resources/img/pfpHub/miguel-photo.jpg)";
fotos[1].style.backgroundImage="url(resources/img/pfpHub/eris-photo.png)";
fotos[2].style.backgroundImage="url(resources/img/pfpHub/tanys-photo.png)";

const overlay = document.getElementById("fullscreen-window-warning-overlay");

document.getElementById('hub-start-button').addEventListener('click', function() {
    openModal();
    document.getElementById('hub-start-button').disabled=true;
});

document.addEventListener("keydown", function (event) {
  if (event.key === "F11") {
    console.log("El usuario presionó F11 para pantalla completa.");
    closeModal();
    setTimeout(() => {
        window.location.href = 'html/intro.html'; // Redirige a intro.html
    }, 500);
  }
});

//Abre el modal
function openModal() {
  overlay.style.display="block";
}

//Cierra el modal
function closeModal() {
  overlay.style.display="none";
}

let selected_img=0;
document.getElementById("hub-icon-selector-img").src=`resources/sprites/Player Icons/Portrait Science Fantasy (${selected_img})-320px.png`;

document.getElementById("hub-icon-selector").addEventListener("click", ()=>{
  selected_img++;
  if(selected_img==25){
    selected_img=0;
  }
  document.getElementById("hub-icon-selector-img").src=`resources/sprites/Player Icons/Portrait Science Fantasy (${selected_img})-320px.png`;
});


