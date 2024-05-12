const mazearray = [
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
];

//Bool Skip [Change for doing it Faster]
let boolSkip = false;
//

let mazearray_copy;

const maze = document.getElementById("maze-container");
const btnRoom = document.getElementById("enterRoom");
const posVisited = calcVisited(mazearray, 1);
const corridorBackground = document.getElementById("corridor-background");

let numVisited;
let pjPosition;
let doorPosition;
let boolCompleted;
let numPassed = 0;

const url = "../html/Room";

// Obtener la cadena de consulta de la URL actual
let queryString = window.location.search;

// Crear un objeto URLSearchParams con la cadena de consulta
let params = new URLSearchParams(queryString);

let boolRoom = parseInt(params.get("boolRoom")); //pilla al que va
let fromRoom = parseInt(params.get("fromRoom")); //del que viene


//Llorones Skip
document.addEventListener("DOMContentLoaded", () => {
  if (fromRoom==1) {
    showDialog(
      "This way leads to the jeep they've left for me. I think I might find something interesting inside it... Damn, there's a huge radiation leak in the next room, so I'll need to put on the suit. I don't think the safety hatch on the other side will open until the radiation clears, so I'll have to be careful where I step until then. Fortunately, the emergency system is fully operational, and I'll be able to move all the contamination to the adjacent chamber, but I'll need to bring it back to this corridor if I want to return.",
      `SILA (${JSON.parse(localStorage.getItem("username"))})`,
      "../resources/sprites/Sila/Sila_sorprendida.png"
    );
  }
  
  numPassed = JSON.parse(localStorage.getItem("numPassedCorridor"));
  if (numPassed >= 2) {
    boolSkip = true;
  } else {
    localStorage.setItem("numPassedCorridor", JSON.stringify(numPassed));
  }
});

function goInRoom() {
  if (boolCompleted || (boolSkip && numVisited >= 1)) {
    numPassed = JSON.parse(localStorage.getItem("numPassedCorridor"));
    if (numPassed >= 2) {
      boolSkip = true;
    } else {
      numPassed++;
      localStorage.setItem("numPassedCorridor", JSON.stringify(numPassed));
    }
    window.location.href = url + boolRoom + ".html";
  } else {
    window.location.href = url + fromRoom + ".html";
  }
}

function calcVisited(arr, elem) {
  let roads = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == elem) {
        roads++;
      }
    }
  }
  return roads - 1;
}

function setStartPosition(elem, x, y) {
  elem.style.top = x + "px"; //0 1140
  elem.style.left = y + "px"; //0 1140
}

function setEndPosition(elem, x, y) {
  elem.style.bottom = x + "px"; //2
  elem.style.right = y + "px"; //2
}

function setColor(cell, n) {
  if (boolRoom == 1) {
    cell.classList.add("road1" + n);
  } else {
    cell.classList.add("road2" + n);
  }
}

function createMaze() {
  let img = document.createElement("img");
  img.src = "../resources/corridor/pj.png";
  img.id = "pj";
  img.classList.add("pj");
  img.style.width = "50px";
  img.style.height = "50px";
  img.alt = "pj";
  maze.appendChild(img);

  img = document.createElement("img");
  if (boolRoom == 1) img.src = "../resources/corridor/door1.png";
  else {
    img.src = "../resources/corridor/door2.png";
  }
  img.id = "door";
  img.classList.add("door");
  img.style.width = "50px";
  img.style.height = "50px";
  img.alt = "door";
  maze.appendChild(img);

  img = document.createElement("img");
  if (boolRoom != 1) img.src = "../resources/corridor/door1.png";
  else {
    img.src = "../resources/corridor/door2.png";
  }
  img.id = "entry";
  img.classList.add("door");
  img.style.width = "50px";
  img.style.height = "50px";
  img.style.zIndex = "1";
  img.alt = "entry";
  maze.appendChild(img);

  let pj = document.getElementById("pj");
  let door = document.getElementById("door");
  let entry = document.getElementById("entry");

  mazearray_copy = JSON.parse(JSON.stringify(mazearray));
  numVisited = 0;

  for (let i = 0; i < mazearray_copy.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < mazearray_copy[i].length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = i + "-" + j;

      let nCell = "";
      if (i == 0 && j == 0) {
        cell.classList.add("road2" + nCell);
      } else if (
        i == mazearray_copy.length - 1 &&
        j == mazearray_copy[i].length - 1
      ) {
        cell.classList.add("road1" + nCell);
      } else {
        if (mazearray_copy[i][j] == 0) {
          cell.classList.add("wall");
        } else {
          nCell = Math.floor(Math.random() * (3 - 0) + 0); //inclusive exclusive
          if (nCell > 0) {
            nCell = "";
          } else {
            nCell = "1";
          }
          setColor(cell, nCell);
        }
      }

      row.appendChild(cell);
      // pj = 3 ,door = 4, replace 3 with 0,0 of mazearray ---------------------------------
      if (boolRoom != 1) {
        if (i == 0 && j == 0) {
          mazearray_copy[i][j] = 3;
        } else if (
          i == mazearray_copy.length - 1 &&
          j == mazearray_copy[i].length - 1
        ) {
          doorPosition = [i, j];
        }
      } else {
        if (
          i == mazearray_copy.length - 1 &&
          j == mazearray_copy[i].length - 1
        ) {
          mazearray_copy[i][j] = 3;
        } else if (i == 0 && j == 0) {
          doorPosition = [i, j];
        }
      }
      maze.appendChild(row);
    }
  }
  if (boolRoom != 1) {
    corridorBackground.style.backgroundImage =
      "url(../resources/img/dark-room-background-alt.jpg)";
    setStartPosition(pj, 0, 0);
    setEndPosition(door, 2, 2);
    setStartPosition(entry, 0, -2);
  } else {
    corridorBackground.style.backgroundImage =
      "url(../resources/img/dark-room-background-alt-clue.jpg)";
    setStartPosition(pj, 950, 950);
    setStartPosition(door, 0, -2);
    setStartPosition(entry, 950, 950); //0 1140
  }
  console.log(mazearray);
  console.log(mazearray_copy);
}

function getPosition(array_copy, elem) {
  // find elem in array and return its position
  position = [-1, -1];
  for (let i = 0; i < array_copy.length; i++) {
    for (let j = 0; j < array_copy[i].length; j++) {
      if (array_copy[i][j] == elem) {
        position[0] = i;
        position[1] = j;
        console.log(i, j);
      }
    }
  }

  return position;
}

function updateRoad(pjPosition) {
  let road = document.getElementById(`${pjPosition[0]}-${pjPosition[1]}`);
  console.log(`${pjPosition[0]}-${pjPosition[1]} ` + numVisited);
  if (!boolCompleted) {
    if (boolRoom != 1) {
      if (
        !road.classList.replace("road2", "road1") &&
        !road.classList.replace("road2", "road11") &&
        !road.classList.replace("road21", "road1") &&
        !road.classList.replace("road21", "road11")
      ) {
        resetMaze();
      } else if (
        (numVisited == 2 && `${pjPosition[0]}-${pjPosition[1]}` == "0-0") ||
        `${pjPosition[0]}-${pjPosition[1]}` == "19-19"
      ) {
        resetMaze();
      }
    } else {
      if (
        !road.classList.replace("road1", "road2") &&
        !road.classList.replace("road1", "road21") &&
        !road.classList.replace("road11", "road2") &&
        !road.classList.replace("road11", "road21")
      ) {
        resetMaze();
      } else if (
        (numVisited == 2 && `${pjPosition[0]}-${pjPosition[1]}` == "0-0") ||
        `${pjPosition[0]}-${pjPosition[1]}` == "19-19"
      ) {
        resetMaze();
      }
    }
  }
}

function resetMaze() {
  maze.innerHTML = "";
  mazearray_copy = null;
  btnRoom.removeAttribute("disabled");
  btnRoom.innerText = "Go back in";
  createMaze();
}

function checkCompleted() {
  if (
    pjPosition[0] == doorPosition[0] &&
    pjPosition[1] == doorPosition[1] &&
    numVisited >= posVisited
  ) {
    btnRoom.innerText = "Its Open!!";
    boolCompleted = true;
    btnRoom.removeAttribute("disabled");
  } else {
    btnRoom.innerText = "Its Closed";
    btnRoom.setAttribute("disabled", true);
  }
  if (boolSkip) {
    btnRoom.removeAttribute("disabled");
    btnRoom.innerText = `Skip...`;
  }
}

///
//Listeners
///

document.addEventListener("keydown", function (e) {
  let corridorSound= new Audio("../audio/corridor/Retro Electric Short 03.wav");
  corridorSound.volume=0.1;
  corridorSound.play();
  let pj = document.getElementById("pj");
  let door = document.getElementById("door");
  let pjleft = pj.offsetLeft;
  let pjtop = pj.offsetTop;
  let doorleft = door.offsetLeft;
  let doortop = door.offsetTop;
  pjPosition = getPosition(mazearray_copy, 3);
  let boolMoves = false;

  //console.log(pjleft, pjtop);
  //console.log(doorleft, doortop);
  if (
    (e.key == "d" || e.key == "ArrowRight") &&
    pjleft < (mazearray_copy.length - 1) * 50 &&
    mazearray_copy[pjPosition[0]][pjPosition[1] + 1] == 1
  ) {
    pjleft += 50;
    pj.style.left = pjleft + "px";
    mazearray_copy[pjPosition[0]][pjPosition[1]] = 1;
    mazearray_copy[position[0]][pjPosition[1] + 1] = 3;
    boolMoves = true;
  }

  if (
    (e.key == "a" || e.key === "ArrowLeft") &&
    pjleft > 0 &&
    mazearray_copy[pjPosition[0]][pjPosition[1] - 1] == 1
  ) {
    pjleft -= 50;
    pj.style.left = pjleft + "px";
    mazearray_copy[pjPosition[0]][pjPosition[1]] = 1;
    mazearray_copy[pjPosition[0]][pjPosition[1] - 1] = 3;
    boolMoves = true;
  }

  if (
    (e.key == "w" || e.key === "ArrowUp") &&
    pjtop > 0 &&
    mazearray_copy[pjPosition[0] - 1][pjPosition[1]] == 1
  ) {
    pjtop -= 50;
    pj.style.top = pjtop + "px";
    mazearray_copy[pjPosition[0]][pjPosition[1]] = 1;
    mazearray_copy[pjPosition[0] - 1][pjPosition[1]] = 3;
    boolMoves = true;
  }

  if (
    (e.key == "s" || e.key === "ArrowDown") &&
    pjtop < (mazearray_copy.length - 1) * 50 &&
    mazearray_copy[pjPosition[0] + 1][pjPosition[1]] == 1
  ) {
    pjtop += 50;
    pj.style.top = pjtop + "px";
    mazearray_copy[pjPosition[0]][pjPosition[1]] = 1;
    mazearray_copy[pjPosition[0] + 1][pjPosition[1]] = 3;
    boolMoves = true;
  }

  if (boolMoves) {
    pjPosition = getPosition(mazearray_copy, 3);
    numVisited++;
  }
  if (boolMoves && numVisited > 0) {
    checkCompleted();
    updateRoad(pjPosition);
  }
});

btnRoom.addEventListener("click", goInRoom);
