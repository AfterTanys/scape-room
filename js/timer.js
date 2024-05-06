const timerText = document.getElementsByClassName("timer")[0];
//Cambiar el valor de abajo para cambiar el tiempo total
const minutes = 60;

let timerSeconds = 0;
let timerMinutes = minutes;
let timerInterval;
let startTime;
let timerEnd;

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('startTime')) {
        const storedTime = JSON.parse(localStorage.getItem('startTime'));
        timerEnd = JSON.parse(localStorage.getItem("timerEnd"));
        startTime = new Date(storedTime);
        const currentTime = new Date();

        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const remainingTime = (timerMinutes * 60) + timerSeconds - elapsedTime;

        if (remainingTime > 0) {
            timerMinutes = Math.floor(remainingTime / 60);
            timerSeconds = remainingTime % 60;
        } else {
            timerMinutes = 0;
            timerSeconds = 0;
        }
    } else {
        startTime = new Date();
    }

    timerText.innerHTML = formatTime(timerMinutes, timerSeconds);

    if(timerEnd===false){
        timerInterval = setInterval(updateTimer, 1000);
    }
    //Descomentar la linea de abajo para reiniciar el timer en click
    //timerText.addEventListener("click", resetTimer);
    //Descomentar la linea de abajo para reiniciar el timer en click
    //timerText.addEventListener("click", resetTimer);
});

function updateTimer() {
    if (timerSeconds === 0 && timerMinutes === 0) {
        clearInterval(timerInterval);
        timerText.innerHTML = "HAS PERDIDO";
        window.location.href = "badEnding.html";
        return;
    }

    timerSeconds--;

    if (timerSeconds < 0) {
        timerMinutes--;
        timerSeconds = 59;
    }

    timerText.innerHTML = formatTime(timerMinutes, timerSeconds);
    saveStartTime();
}

function formatTime(minutes, seconds) {
    const formattedMinutes = ("0" + minutes).slice(-2);
    const formattedSeconds = ("0" + seconds).slice(-2);
    return `${formattedMinutes}:${formattedSeconds}`;
}

function saveStartTime() {
    localStorage.setItem('startTime', JSON.stringify(startTime));
}

//Con esta funcion se resetea el timer a 40 minutos
function resetTimer() {
    timerEnd = false;
    localStorage.setItem('timerEnd', JSON.stringify(timerEnd));
    clearInterval(timerInterval);
    timerMinutes = minutes;
    timerSeconds = 0;
//  timerText.innerHTML = formatTime(timerMinutes, timerSeconds);
    startTime = new Date();
    saveStartTime();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
    timerEnd=true;
    localStorage.setItem('timerEnd', JSON.stringify(timerEnd));
}




