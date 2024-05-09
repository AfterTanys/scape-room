//Programacion de la ventana
const modal_big_box = document.getElementById("modal-puzzle-box");

//Cuando haces click fuera de la ventana modal cierra la ventana modal
document
  .getElementById("big-box-puzzle-close-btn")
  .addEventListener("click", () => {
    console.log("Cerrando modal slidePuzzle");
    closeModal(modal_big_box);
  });

//Cuando haces click en el elemento abre la ventana modal
document.getElementById("big-box-glow").addEventListener("click", () => {
  console.log("Abriendo modal slidePuzzle");
  if (JSON.parse(localStorage.getItem("solvedSlide")) == 1) {
    //Si esta solucionado muestra dialogo de solucion
    showDialog(
      "This old scroll cost us half of the science wing of the ship. And that's considering Nila's great negotiating skills got it for half the price...",
      `SILA (${JSON.parse(localStorage.getItem("username"))})`,
      "../resources/sprites/Sila/Sila_Enfadada.png"
    );
  }else{
    //Si no esta solucionado muestra dialogo de puzzle
    showDialog(
      "This is the V-45 storage unit, the most advanced cryostasis model for radioactive elements, delicate items, and all kinds of food. We use it to store everything we find across the solar system. Its biometric recognition system allows any of the 10 of us to access it easily. However, Vik doesn't trust technology; he's obsessed with the idea that a robot could easily breach the system if it wanted to, so he's installed his ridiculous puzzles as an additional lock just in case. I'll need to find the balls and solve it if I want to unlock and open the box.",
      `SILA (${JSON.parse(localStorage.getItem("username"))})`,
      "../resources/sprites/Sila/Sila_Neutra.png"
    );
  }
  openModal(modal_big_box);
});

//Programacion del juego
//Const
const slideRows = 3;
const slideColumns = 3;

const slideDivGame = document.getElementById("game-slide");
const slideSpanTurns = document.getElementById("slideTurns");

const slideListTiles = document.getElementsByClassName("tile");
const h1_msg = document.getElementById("msg-slide");

let currTile;
let otherTile; //blank tile

let slideTurns = 0;
let slideTurnLim = 80;
let slideWin = false;

const tileOrder = ["2", "4", "8", "5", "3", "6", "9", "1", "7"];

const tileOrder_solved = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; //test

//Variable that it will be false until we pick the balls
let boolBalls;
//Variable de resolver el problema antes de recoger bolas
let tileOrder_local;
let boolSlideSolved;

let slideBallsProve = 0;

//No me convence lo de que se carguen los items en carga del dom porque da lugar a glitches raros...
//Carga en 2 F5
document.addEventListener("DOMContentLoaded", () => {
  slideBallsProve = JSON.parse(localStorage.getItem("slideBallsItem")).length;

  if (slideBallsProve === 4) {
    boolBalls = true;
  } else {
    boolBalls = false;
  }

  if (localStorage.getItem("boolSlideSolved") != null) {
    tileOrder_local = JSON.parse(JSON.stringify(tileOrder_solved));
    boolSlideSolved = true;
    slideWin = true;
  } else {
    tileOrder_local = JSON.parse(JSON.stringify(tileOrder));
    boolSlideSolved = false;
  }

  if (JSON.parse(localStorage.getItem("solvedSlide")) == 1) {
    slideStart();
    h1_msg.childNodes[0].textContent = "You Won!!";
    slideSpanTurns.innerText = "";
    completeSlidePuzzle();
  } else {
    slideStart();
  }
});

function slideStart() {
  //Initialize divs;
  for (let r = 0; r < slideRows; r++) {
    for (let c = 0; c < slideColumns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");

      tile.classList.add("c_" + tileOrder_local.shift());

      tile.addEventListener("click", slideFunctionClick);

      slideDivGame.appendChild(tile);
    }
  }

  slideSpanTurns.innerText = slideTurns + "/" + slideTurnLim;

  checkBalls();
}

function slideFunctionClick() {
  if (slideTurns < slideTurnLim) {
    if (!boolSlideSolved) {
      currTile = this;

      otherTile = slideGetEmpty();

      let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
      let r = parseInt(currCoords[0]);
      let c = parseInt(currCoords[1]);

      let otherCoords = otherTile.id.split("-");
      let r2 = parseInt(otherCoords[0]);
      let c2 = parseInt(otherCoords[1]);

      let moveLeft = r == r2 && c2 == c - 1;
      let moveRight = r == r2 && c2 == c + 1;

      let moveUp = c == c2 && r2 == r - 1;
      let moveDown = c == c2 && r2 == r + 1;

      let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

      if (isAdjacent) {
        let currImg = slideGetClass(currTile);
        let otherImg = slideGetClass(otherTile);

        let soundTile = new Audio("../audio/slide/slide-sound.mp3");
        soundTile.play();

        currTile.classList.add(otherImg);
        otherTile.classList.add(currImg);

        slideTurns += 1;
        slideSpanTurns.textContent = slideTurns + "/" + slideTurnLim;
      }
      slideWin = slideCheckWon();
    }
  }
}

function slideGetClass(ctile) {
  let classes = ctile.classList;
  let clase = "";

  clase = classes[1];
  ctile.classList.remove(clase);

  return clase;
}

function slideGetEmpty() {
  let tile = "";

  for (const [key, value] of Object.entries(slideListTiles)) {
    if (value.className.includes("c_6")) {
      tile = value;
      break;
    }
  }
  return tile;
}

function slideCheckWon() {
  let num = 1;
  if (!boolSlideSolved) {
    for (const [key, value] of Object.entries(slideListTiles)) {
      if (value.className.includes(num)) {
        slideWin = true;
        num++;
      } else {
        slideWin = false;
        break;
      }
    }
  }
  if (slideWin && boolBalls) {
    if (boolSlideSolved) {
      h1_msg.textContent = "You Won by Introducing the balls!!";
    } else {
      h1_msg.childNodes[0].textContent = "You Won!! Turn: ";
      //[FIXED] Se muestra el dialogo de solucion solo si lo solucionas con las bolas del tiron
      showDialog(
        "This old scroll cost us half of the science wing of the ship. And that's considering Nila's great negotiating skills got it for half the price...",
        `SILA (${JSON.parse(localStorage.getItem("username"))})`,
        "../resources/sprites/Sila/Sila_Enfadada.png"
      );
    }
    //Metodo para completar el slide y mostrar la pista
    completeSlidePuzzle();
    //Se almacena que esta solucionado
    localStorage.setItem("solvedSlide", JSON.stringify(1));
    //Se almacenan las llaves del jeep
    jeepKeysItem=1;
    localStorage.setItem("jeepKeys", JSON.stringify(jeepKeysItem));
    //Se actualiza el item al momento de acabar
    updateJeepKeysItem(document.getElementsByClassName("inventory-item")[2]);
  } else if (slideWin && !boolBalls) {
    let slideMsg = "Looks like something is missing...";
    if (slideTurns > 1) {
      h1_msg.childNodes[0].textContent = slideMsg + " Turn: ";
    } else {
      h1_msg.innerText = slideMsg;
    }
    boolSlideSolved = true;
    if (localStorage.getItem("boolSlideSolved") == null) {
      localStorage.setItem("boolSlideSolved", JSON.stringify(boolSlideSolved));
    }
  } else if (slideTurns >= slideTurnLim) {
    h1_msg.childNodes[0].textContent = "You Lost!! Turn: ";
    let tOut = setTimeout(() => {
      slideRestart();
    }, 2000);
  } else {
    if (boolSlideSolved) {
      h1_msg.textContent = "Looks like something is missing...";
    } else {
      h1_msg.childNodes[0].textContent = "Turn: ";
    }
  }
  return slideWin;
}

function checkBalls() {
  if (boolBalls) {
    for (const [key, value] of Object.entries(slideListTiles)) {
      if (value.className.includes(1)) {
        value.className = value.className.replace("c_1", "bc_1");
      } else if (value.className.includes(3)) {
        value.className = value.className.replace("c_3", "bc_3");
      } else if (value.className.includes(7)) {
        value.className = value.className.replace("c_7", "bc_7");
      } else if (value.className.includes(9)) {
        value.className = value.className.replace("c_9", "bc_9");
      }
    }
  }
  slideCheckWon();
}

function slideRestart() {
  //Initialize cons
  slideTurns = 0;
  tileOrder_local = JSON.parse(JSON.stringify(tileOrder));
  slideDivGame.innerHTML = "";
  h1_msg.childNodes[0].textContent = "Turn: ";
  slideStart();
}

function completeSlidePuzzle() {
  document.getElementById("game-slide").remove();
  let slideClue = document.createElement("div");
  slideClue.classList.add("slide-solved-clue");
  document.getElementById("container-slide").appendChild(slideClue);
  document.getElementById("container-slide").style.width = "40em";
}
