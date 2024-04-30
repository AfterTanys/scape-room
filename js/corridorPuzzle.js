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
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0],
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
let ratposition;

const url = "../html/puzzleCorridor";

let boolRoom = 2;

function goInRoom() {
  if (boolRoom) {
    window.location.href = url + boolRoom + ".html";
    
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


function setratposition(x, y) {
  rat.style.top = x + "px"; //0 1140
  rat.style.left = y + "px"; //0 1140
}
function setfoodposition(x, y) {
  food.style.bottom = x + "px"; //2
  food.style.right = y + "px"; //2
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
  img.src = "../resources/corridor/rat.png";
  img.id = "rat";
  img.classList.add("rat");
  img.style.width = "50px";
  img.style.height = "50px";
  img.alt = "rat";
  maze.appendChild(img);

  img = document.createElement("img");
  img.src = "../resources/corridor/food.png";
  img.id = "food";
  img.classList.add("food");
  img.style.width = "50px";
  img.style.height = "50px";
  img.alt = "food";
  maze.appendChild(img);

  let rat = document.getElementById("rat");
  let food = document.getElementById("food");
  mazearray_copy = JSON.parse(JSON.stringify(mazearray));
  numVisited = 0;

  for (let i = 0; i < mazearray_copy.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < mazearray_copy[i].length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = i + "-" + j;

      setColor(cell);

      if (mazearray_copy[i][j] == 0) {
        cell.classList.add("wall");
      }
      if (i == 0 && j == 0) {
        cell.classList.add("road1");
      } else if (
        i == mazearray_copy.length - 1 &&
        j == mazearray_copy[i].length - 1
      ) {
        cell.classList.add("road2");
      }
      row.appendChild(cell);

      // rat = 3 , replace 3 with 0,0 of mazearray ---------------------------------
      if (boolRoom != 2) {
        if (i == 0 && j == 0) {
          mazearray_copy[i][j] = 3;
        }
      } else {
        if (
          i == mazearray_copy.length - 1 &&
          j == mazearray_copy[i].length - 1
        ) {
          mazearray_copy[i][j] = 3;
        }
      }
      maze.appendChild(row);
    }
  }
  if (boolRoom != 2) {
    setratposition(0, 0);
    setfoodposition(2, 2);
  } else {
    setratposition(1140, 1140);
    food.style.top = 0 + "px"; //0 1140
    food.style.left = 0 + "px"; //0 1140
  }
  console.log(mazearray);
  console.log(mazearray_copy);
}

function getratposition(mazearray_copy) {
  // find 3 in mazearray and return its position
  ratposition = [-1, -1];
  for (let i = 0; i < mazearray_copy.length; i++) {
    for (let j = 0; j < mazearray_copy[i].length; j++) {
      if (mazearray_copy[i][j] == 3) {
        ratposition[0] = i;
        ratposition[1] = j;
        console.log(i,j);
      }
    }
  }
  
  return ratposition;
}



function updateRoad(ratposition) {
  let road = document.getElementById(`${ratposition[0]}-${ratposition[1]}`);
 /* if (boolRoom == 1) {
    if (road.classList.replace("road2", "road1") == false) {
      maze.innerHTML = "";
      mazearray_copy = null;
      createMaze();
    }
  } else if (boolRoom == 2) {
    if (road.classList.replace("road1", "road2") == false) {
      maze.innerHTML = "";
      mazearray_copy = null;
      createMaze();
    }
  }*/
}




//Listeners

document.addEventListener("keydown", function (e) {
  let rat = document.getElementById("rat");
  let food = document.getElementById("food");
  let ratleft = rat.offsetLeft;
  let rattop = rat.offsetTop;
  let foodleft = food.offsetLeft;
  let foodtop = food.offsetTop;
  let ratposition = getratposition(mazearray_copy);
  let boolMoves = false;

  //console.log(ratleft, rattop);
  //console.log(foodleft, foodtop);
  if (
    e.key == "d" &&
    ratleft < (mazearray_copy.length - 1) * 60 &&
    mazearray_copy[ratposition[0]][ratposition[1] + 1] == 1
  ) {
    ratleft += 60;
    rat.style.left = ratleft + "px";
    mazearray_copy[ratposition[0]][ratposition[1]] = 1;
    mazearray_copy[ratposition[0]][ratposition[1] + 1] = 3;
    boolMoves = true;
  }

  if (
    e.key == "a" &&
    ratleft > 0 &&
    mazearray_copy[ratposition[0]][ratposition[1] - 1] == 1
  ) {
    ratleft -= 60;
    rat.style.left = ratleft + "px";
    mazearray_copy[ratposition[0]][ratposition[1]] = 1;
    mazearray_copy[ratposition[0]][ratposition[1] - 1] = 3;
    boolMoves = true;
  }

  if (
    e.key == "w" &&
    rattop > 0 &&
    mazearray_copy[ratposition[0] - 1][ratposition[1]] == 1
  ) {
    rattop -= 60;
    rat.style.top = rattop + "px";
    mazearray_copy[ratposition[0]][ratposition[1]] = 1;
    mazearray_copy[ratposition[0] - 1][ratposition[1]] = 3;
    boolMoves = true;
  }

  if (
    e.key == "s" &&
    rattop < (mazearray_copy.length - 1) * 60 &&
    mazearray_copy[ratposition[0] + 1][ratposition[1]] == 1
  ) {
    rattop += 60;
    rat.style.top = rattop + "px";
    mazearray_copy[ratposition[0]][ratposition[1]] = 1;
    mazearray_copy[ratposition[0] + 1][ratposition[1]] = 3;
    boolMoves = true;
  }

  if (boolMoves) {
    numVisited++;
    updateRoad(ratposition);
  }

  if (ratleft == foodleft && rattop == foodtop && numVisited==posVisited) {
    alert("You Won");
  }
});



btnRoom.addEventListener("click", goInRoom);
