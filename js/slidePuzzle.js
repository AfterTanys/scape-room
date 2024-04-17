//Programacion de la ventana
const overlay = document.getElementById("background-overlay");
const modal_small_box = document.getElementById("modal-puzzle-box");

//Cuando haces click fuera de la ventana modal cierra la ventana modal
document.getElementById("small-box-puzzle-close-btn").addEventListener("click", ()=>{
    closeModal(modal_small_box);
});

//Cuando haces click en el elemento abre la ventana modal
document.getElementById("small-box-glow").addEventListener("click", ()=>{
    console.log("Hola2");
    openModal(modal_small_box);
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

//Programacion del juego
//Const
const rows = 3;
const columns = 3;

const div_game = document.getElementById("game-slide");
const span_turns = document.getElementById("turns");

const list_tiles = document.getElementsByClassName("tile");
const h1_msg = document.getElementById("msg-slide");

let currTile;
let otherTile; //blank tile

let turns = 0;
let turns_lim = 100;
let boolWin = false;

//Variable that it will be false until we pick the balls
let boolBalls;
//Cuando carga la pagina se comprueba si hay o no bolas
if(localStorage.getItem('bolas')){
  boolBalls=true;
}else{
  boolBalls=false;
}

let tileOrder = ["2", "4", "8", "5", "3", "6", "9", "1", "7"];
let tileOrder_backup=["2", "4", "8", "5", "3", "6", "9", "1", "7"];


//let tileOrder = ["1", "2", "3", "4", "6", "5", "7", "8", "9"]; //test
//const tileOrder_backup = ["1", "2", "3", "4", "6", "5", "7", "8", "9"]; //test

//Probably we need to put it on the display button.
window.onload = slideStart(); 
//Preguntar a miguel si puede cambiar el puzzle para que se borre porque se genera puzzle debajo del puzzle
//Las bolas si no las encuentras en la pagina es una liada

function slideStart() {
  //Initialize divs;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");

      tile.classList.add("c_" + tileOrder.shift());

      tile.addEventListener("click", functionClick);

      div_game.appendChild(tile);
    }
  }

  span_turns.innerText = turns + "/" + turns_lim;

  checkBalls();
}

function functionClick() {
  if(turns<turns_lim){
  if (!boolWin) {
    currTile = this;

    otherTile = getEmpty();

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
      let currImg = getClass(currTile);
      let otherImg = getClass(otherTile);

      currTile.classList.add(otherImg);
      otherTile.classList.add(currImg);

      turns += 1;
      span_turns.textContent = turns + "/" + turns_lim;
    }

    boolWin = checkWon();

  }
}
}

function getClass(ctile) {
  let classes = ctile.classList;
  let clase = "";

  clase = classes[1];
  ctile.classList.remove(clase);

  return clase;
}

function getEmpty() {
  let tile = "";

  for (const [key, value] of Object.entries(list_tiles)) {
    if (value.className.includes("c_6")) {
      tile = value;
      break;
    }
  }
  return tile;
}

function checkWon() {
  let num = 1;
  for (const [key, value] of Object.entries(list_tiles)) {
    if (value.className.includes(num)) {
      boolWin = true;
      num++;
    } else {
      boolWin = false;
      break;
    }
  }
  if (boolWin && boolBalls) {
    h1_msg.childNodes[0].textContent = "You Won!! Turn: ";
  } else if (turns >= turns_lim) {
    h1_msg.childNodes[0].textContent = "You Lost!! Turn: ";
    let tOut = setTimeout(() => {
      slideRestart();
    }, 2000);
  }
  return boolWin;
}

function checkBalls() {
  if (boolBalls) {
    for (const [key, value] of Object.entries(list_tiles)) {
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
}

function slideRestart() {
  //Initialize cons
  turns = 0;
  tileOrder = tileOrder_backup.slice();
  div_game.innerHTML = "";
  h1_msg.childNodes[0].textContent = "Turn: ";
  slideStart();
}


