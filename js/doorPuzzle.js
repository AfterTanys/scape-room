const modal_door = document.getElementById("modal-puzzle-door");

document.getElementById("door-glow").addEventListener("click", ()=>{
    console.log("Opening door modal");
    openModal(modal_door);
});

document.getElementById("door-puzzle-close-btn").addEventListener("click", ()=>{
    console.log("Closing door modal");
    closeModal(modal_door);
});

//Creación del puzzle
const door_puzzle_container = document.getElementById("door-puzzle-container");

let door_puzzle_backgrounds = [
    "../resources/finalDoor/door-input-texture-1.png",
    "../resources/finalDoor/door-input-texture-2.png",
    "../resources/finalDoor/door-input-texture-3.png",
    "../resources/finalDoor/door-input-texture-4.png",
    "../resources/finalDoor/door-input-texture-5.png"
];

let door_puzzle_runes = [
    "",
    "../resources/runes/all-hive-runes_sigil_01.png",
    "../resources/runes/all-hive-runes_sigil_02.png",
    "../resources/runes/all-hive-runes_sigil_03.png",
    "../resources/runes/all-hive-runes_sigil_04.png",
    "../resources/runes/all-hive-runes_sigil_05.png",
    "../resources/runes/all-hive-runes_sigil_06.png",
    "../resources/runes/all-hive-runes_sigil_07.png",
    "../resources/runes/all-hive-runes_sigil_08.png",
    "../resources/runes/all-hive-runes_sigil_09.png",
    "../resources/runes/all-hive-runes_sigil_10.png",
    "../resources/runes/all-hive-runes_sigil_11.png",
    "../resources/runes/all-hive-runes_sigil_12.png",
    "../resources/runes/all-hive-runes_sigil_13.png",
    "../resources/runes/all-hive-runes_sigil_14.png",
    "../resources/runes/all-hive-runes_sigil_15.png",
    "../resources/runes/all-hive-runes_sigil_16.png",
    "../resources/runes/all-hive-runes_sigil_17.png",
    "../resources/runes/all-hive-runes_sigil_18.png",
    "../resources/runes/all-hive-runes_sigil_19.png",
    "../resources/runes/all-hive-runes_sigil_20.png",
    "../resources/runes/all-hive-runes_sigil_21.png",
    "../resources/runes/all-hive-runes_sigil_22.png",
    "../resources/runes/all-hive-runes_sigil_23.png"
]

let door_correct_combination = [2,1,15,7,14,18,3,4,6];
let door_current_combination =[0,0,0,0,0,0,0,0,0];

//Se pone una runa sola por defecto
let correct_rune_position = Math.floor(Math.random()*9);
door_current_combination[correct_rune_position]=door_correct_combination[correct_rune_position];

for(let i =0; i<9; i++){
    let door_tile = document.createElement("div");
    door_tile.classList.add("door-tile");
    door_tile.style.backgroundImage = `url("${door_puzzle_backgrounds[Math.floor(Math.random()*5)]}")`;
    door_puzzle_container.appendChild(door_tile);

    let door_rune = document.createElement("img");
    door_rune.classList.add("door-rune");
    door_tile.appendChild(door_rune);
    door_rune.src = door_puzzle_runes[door_current_combination[i]];

    door_tile.addEventListener("click", ()=>{
        door_current_combination[i]++;
        if(door_current_combination[i]===door_puzzle_runes.length){
            door_current_combination[i]=0;
        }
        door_rune.src = door_puzzle_runes[door_current_combination[i]];
        door_tile.style.backgroundImage = `url("${door_puzzle_backgrounds[Math.floor(Math.random()*5)]}")`;
        if(doorPuzzleCheckRunes()==true){
            stopTimer();
            window.location.href = 'Ending.html';
        }
    });
}

function doorPuzzleCheckRunes(){
    for(let i = 0; i<door_correct_combination.length;i++){
        if(door_correct_combination[i]!=door_current_combination[i]){
            return false;
        }
    }
    return true;
}