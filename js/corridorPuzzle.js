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

let mazearray_copy;

const maze = document.getElementById("maze-container");
const btnRoom = document.getElementById("enterRoom");
const posVisited = calcVisited(mazearray, 1);

let numVisited;
let pjPosition;
let doorPosition;

const url = "../html/Room";

let boolRoom = 3; //pilla al que va
let fromRoom=1;//del que viene
let boolCompleted;

function goInRoom() {
  if (boolCompleted) {
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

function setStartPosition(x, y) {
  pj.style.top = x + "px"; //0 1140
  pj.style.left = y + "px"; //0 1140

}
function setDoorPosition(x, y) {

  door.style.bottom = x + "px"; //2
  door.style.right = y + "px"; //2


}

function setColor(cell) {
  if (boolRoom != 1) {
    cell.classList.add("road1");
  } else {
    cell.classList.add("road2");
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
  img.src = "../resources/corridor/door.png";
  img.id = "door";
  img.classList.add("door");
  img.style.width = "50px";
  img.style.height = "50px";
  img.alt = "door";
  maze.appendChild(img);

  let pj = document.getElementById("pj");
  let door = document.getElementById("door");
  mazearray_copy = JSON.parse(JSON.stringify(mazearray));
  numVisited = 0;

  for (let i = 0; i < mazearray_copy.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < mazearray_copy[i].length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = i + "-" + j;

      if (mazearray_copy[i][j] == 0) {
        cell.classList.add("wall");
      }

      if (i == 0 && j == 0) {
        cell.classList.add("road2");
      } else if (
        i == mazearray_copy.length - 1 &&
        j == mazearray_copy[i].length - 1
      ) {
        cell.classList.add("road1");
      } else {
        setColor(cell);
      }
      row.appendChild(cell);

      // pj = 3 ,door = 4, replace 3 with 0,0 of mazearray ---------------------------------
      if (boolRoom == 1) {
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
  if (boolRoom == 1) {
    setStartPosition(0, 0);
    setEndPosition(2, 2);
  } else {
    setStartPosition(950, 950);
    door.style.top = 0 + "px"; //0 1140
    door.style.left = 0 + "px"; //0 1140
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
  if(!boolCompleted){
  if (boolRoom == 1) {
    if (road.classList.replace("road2", "road1") == false) {
      resetMaze();
    }
  } else {
    if (road.classList.replace("road1", "road2") == false) {
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

//Listeners

document.addEventListener("keydown", function (e) {
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
    e.key == "d" &&
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
    e.key == "a" &&
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
    e.key == "w" &&
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
    e.key == "s" &&
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
  if (boolMoves&&numVisited > 0) {
    checkCompleted();
    updateRoad(pjPosition);
  }
});

function checkCompleted() {
  if (
    pjPosition[0] == doorPosition[0] &&
    pjPosition[1] == doorPosition[1] &&
    numVisited == posVisited
  ) {
    btnRoom.innerText = "Its Open!!";
    boolCompleted = true;
    btnRoom.removeAttribute("disabled");
  } else {
    btnRoom.innerText = "Its Closed";
    btnRoom.setAttribute("disabled", true);
  }
}

btnRoom.addEventListener("click", goInRoom);
