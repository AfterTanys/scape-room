const timerText = document.getElementsByClassName("timer")[0];
//Cambiar el valor de abajo para cambiar el tiempo total
const minutes = 60;

let timerSeconds = 0;
let timerMinutes = minutes;
let timerInterval;
let startTime;

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('startTime')) {
        const storedTime = JSON.parse(localStorage.getItem('startTime'));
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

    timerInterval = setInterval(updateTimer, 1000);
    timerText.addEventListener("click", resetTimer);
});

function updateTimer() {
    if (timerSeconds === 0 && timerMinutes === 0) {
        clearInterval(timerInterval);
        timerText.innerHTML = "HAS PERDIDO";
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
    clearInterval(timerInterval);
    timerMinutes = minutes;
    timerSeconds = 0;
    timerText.innerHTML = formatTime(timerMinutes, timerSeconds);
    startTime = new Date();
    saveStartTime();
    timerInterval = setInterval(updateTimer, 1000);
}




/*
const timerText = document.getElementsByClassName("timer")[0];
let timerSeconds = 0;
let timerMinutes = 1;
let timerInterval;

document.addEventListener("DOMContentLoaded", ()=>{

    timerText.innerHTML = "40:00"; 

    timerInterval = setInterval(escribir, 1000);
    
});

function escribir(){

    let ss;
    let smin;

    timerSeconds--;

    if(timerSeconds<0){
        timerMinutes--;
        timerSeconds=59;
    }

    ss = ("0" + timerSeconds).slice(-2);
    smin = ("0" + timerMinutes).slice(-2);

    timerText.innerHTML = `${smin}:${ss}`; //Voy a usar por una vez las comillas con expresiones regulares y dolar
    //Todo lo que haga entre comillas oblicuas es expresion regular y si hay ${variable} se escribe el valor

    if(timerMinutes<0){
        clearInterval(timerInterval);
        timerText.innerHTML = "HAS PERDIDO";
    }

}
*/