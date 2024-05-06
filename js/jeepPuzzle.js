//Abrir ventana modal

const modal_jeep = document.getElementById("modal-puzzle-jeep");

document.getElementById("jeep-door-glow").addEventListener("click", ()=>{
    if(JSON.parse(localStorage.getItem("jeepKeys"))==1){
      console.log("Opening jeep modal");
      showDialog(
        "Thankfully, the jeep is intact. Dad and I have put a lot of effort into the spectrometer in the back. I could use it to handle the Phobos rune without worrying about damaging it; I just need to follow the synchronization sequence... It's a simple machine, but it usually requires three people to operate it.",
        `SILA (${JSON.parse(localStorage.getItem("username"))})`,
        "../resources/sprites/Sila/Sila_Neutra.png"
      );
      openModal(modal_jeep);
    }else{
      showDialog("What is happening, I am missing the keys to open the jeep? Maybe I should check on another room to search for them.", `SILA (${JSON.parse(localStorage.getItem("username"))})`, "../resources/sprites/Sila/Sila_Enfadada.png");
    }
});

document.getElementById("jeep-puzzle-close-btn").addEventListener("click", ()=>{
    console.log("Closing jeep modal");
    closeModal(modal_jeep);
});

//Mantener el puzzle resuelto
document.addEventListener("DOMContentLoaded", ()=>{

  if(JSON.parse(localStorage.getItem("solvedSimon"))==1){
    showSolvedSimon();
  }

});

//Constantes
const container = document.getElementById("simon-container");
const cells = document.getElementsByClassName("simon-tile");
const start_button = document.getElementById("start-button");

//Visualizacion
cells[0].style.backgroundColor = "#56742e";
cells[1].style.backgroundColor = "crimson";
cells[2].style.backgroundColor = "var(--color-one)";
cells[3].style.backgroundColor = "var(--color-four)";

cells[4].innerHTML = "a";
cells[4].style.color = "#56742e";
cells[5].innerHTML = "w";
cells[5].style.color = "crimson";
cells[6].innerHTML = "s";
cells[6].style.color = "var(--color-one)";
cells[7].innerHTML = "d";
cells[7].style.color = "var(--color-four)";

cells[8].innerHTML = `<img src="../resources/runes/all-hive-runes_sigil_01.png" alt="rune1" class="simon-rune">`;
cells[9].innerHTML = `<img src="../resources/runes/all-hive-runes_sigil_05_RED.png" alt="rune2" class="simon-rune">`;
cells[10].innerHTML = `<img src="../resources/runes/all-hive-runes_sigil_12_YELLOW.png" alt="rune3" class="simon-rune">`;
cells[11].innerHTML = `<img src="../resources/runes/all-hive-runes_sigil_18_TEAL.png" alt="rune4" class="simon-rune">`;

//Eventos de click
for (let i = 0; i < 4; i++) {
  cells[i].addEventListener("click", () => {
    cells[i].classList.add("simon-active");
    checkSequence(i);
    setTimeout(() => {
      cells[i].classList.remove("simon-active");
    }, 300);
  });
}

document.addEventListener("keypress", function (event) {
  let pulsada = -1;
  switch (event.key) {
    case "a":
      pulsada = 4;
      break;
    case "w":
      pulsada = 5;
      break;
    case "s":
      pulsada = 6;
      break;
    case "d":
      pulsada = 7;
      break;
    case "j":
      pulsada = 8;
      break;
    case "i":
      pulsada = 9;
      break;
    case "k":
      pulsada = 10;
      break;
    case "l":
      pulsada = 11;
      break;
    default:
      pulsada = -1;
      break;
  }
  if (pulsada != -1) {
    cells[pulsada].classList.add("simon-active");
    checkSequence(pulsada);
    setTimeout(() => {
      cells[pulsada].classList.remove("simon-active");
    }, 300);
  }
});

//Logica de las rondas

let round1 = 4;
let round2 = 8;
let round3 = 12;

let rounds = [
  { percution: 3, round: round1 },
  { percution: 5, round: round1 },
  { percution: 7, round: round1 },
  { percution: 5, round: round2 },
  { percution: 7, round: round2 },
  { percution: 9, round: round2 },
  { percution: 7, round: round3 },
  { percution: 9, round: round3 },
  { percution: 12, round: round3 },
];

let current_round = 0;

let response_position = 0;

let correct = new Array();

//Reinicia el juego
function resetGame() {
  current_round = 0;
  response_position = 0;
  document.getElementById("simon-score").innerHTML = `Round ${
    current_round + 1
  }`;
  start_button.innerHTML="Start";
}

//Funcion de jugar una ronda
function playRound() {
  correct = new Array();
  for (let i = 0; i < rounds[current_round].percution; i++) {
    correct.push(Math.floor(Math.random() * rounds[current_round].round));
  }
  start_button.innerHTML="Playing...";
  start_button.disabled= true;
  start_button.style.pointerEvents = "none";
  animateSequence(0);
  response_position = 0;
}

//Funcion para comprobar la secuencia
function checkSequence(introducido) {
  if (introducido === correct[response_position]) {
    response_position++;
    if (response_position === correct.length) {
      start_button.innerHTML="Loading Next...";
      start_button.disabled= true;
      start_button.style.pointerEvents = "none";
      current_round++;
      if (current_round == 9) {
        document.getElementById("simon-score").innerHTML = `You Win`;
        document.getElementById("simon-start-button").hidden=true;
        //Aqui lo que pone si ganas
        //Se muestra la pista
        showSolvedSimon();
        //Se muestra el dialogo
        showDialog(
          "Great, I managed to reconstruct an image of the Phobos code! Now, I’m going to take a second to catch my breath...",
          `SILA (${JSON.parse(localStorage.getItem("username"))})`,
          "../resources/sprites/Sila/Sila_Feliz.png"
        );
        //Se almacena que se ha ganado
        localStorage.setItem("solvedSimon", JSON.stringify(1));
      } else {
        document.getElementById("simon-score").innerHTML = `Round ${
          current_round + 1
        }`;
        setTimeout(() => {
          playRound();
        }, 2000);
      }
    }
  } else {
    resetGame();
  }
}

//Funcion para animar secuencia
function animateSequence(idx) {
  setTimeout(() => {
    cells[correct[idx]].classList.add("simon-active");
    setTimeout(() => {
      cells[correct[idx]].classList.remove("simon-active");
      if (++idx < correct.length) {
        animateSequence(idx);
      }else{
        console.log("Acabado");
        start_button.innerHTML="Replay";
        start_button.disabled= false;
        start_button.style.pointerEvents = "auto";
      }
    }, 500);
  }, 1000);
}

function showSolvedSimon(){
  document.getElementById("simon-container").remove();
  const simon_clue = document.createElement("div");
  simon_clue.classList.add("simon-solved-clue");
  document.getElementById("modal-puzzle-jeep").appendChild(simon_clue);
  const button_div=document.createElement("div");
  document.getElementById("modal-puzzle-jeep").appendChild(button_div);
  const close_button = document.createElement("button");
  close_button.classList.add("close-modal-btn");
  close_button.innerHTML="CLOSE";
  close_button.addEventListener("click", ()=>{
    console.log("Closing jeep modal");
    closeModal(modal_jeep);
  });
  button_div.appendChild(close_button);
}
