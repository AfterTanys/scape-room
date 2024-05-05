//Abrir la ventana modal
const modal_pc = document.getElementById("modal-puzzle-computer");

//Cuando haces click en el elemento abre la ventana modal
document.getElementById("computer-glow").addEventListener("click", ()=>{
    console.log("Abriendo modal del ordenador");
    openModal(modal_pc);
});

document
  .getElementById("computer-puzzle-close-btn")
  .addEventListener("click", () => {
    console.log("Cerrando modal slidePuzzle");
    closeModal(modal_pc);
  });

//Cosas del puzzle
document.addEventListener('DOMContentLoaded', function() {
    let logs = {};
    let initialStateHTML = ''; // Almacena el HTML inicial de los logs

    function loadLogs() {
        fetch('../js/logs.json')
            .then(response => response.json())
            .then(data => {
                logs = data;
                setupComputerEntries();
            })
            .catch(error => console.error('Error loading the log data:', error));
    }

    function setupComputerEntries() {
        const container = document.getElementById('content-computer');
        container.addEventListener('click', function(event) {
            const entry = event.target.closest('.entry-computer');
            if (entry) {
                const key = entry.getAttribute('data-key');
                displayLogs(key);
            }
        });
        saveInitialState(); // Guarda el estado inicial después de configurar las entradas
    }

    function displayLogs(key) {
        const contentDiv = document.getElementById('content-computer');
        contentDiv.classList.add('log-computer');
        if (key === "4") {
            displayPasswordInput(contentDiv);
         } else {
            const logText = logs[key] || "No log available for this entry.";
           contentDiv.innerHTML = logText.replace(/\\n/g, '<br>') + createBackLink();
           attachBackEvent();
            }
    }

    function displayPasswordInput(contentDiv) {
        contentDiv.innerHTML = ''; // Limpiar contenido anterior
    
        contentDiv.classList.add('password-screen-computer') ;
        // Crear un elemento de entrada para la contraseña
        let passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter password here';
        passwordInput.id = 'password-computer';
    
        // Crear un elemento de texto para mostrar errores
        let errorMessage = document.createElement('div');
        errorMessage.style.color = 'red';
        errorMessage.style.height = '20px';  // Reservar espacio para el mensaje de error
        
        let backText = document.createElement('span');
        backText.textContent = '> BACK...';
        backText.id= 'text-back-computer';

        // Crear un texto cliclable para enviar la contraseña
        let submitText = document.createElement('span');
        submitText.textContent = '> VERIFY PASSWORD';
        submitText.id = 'submit-computer';
        contentDiv.appendChild(passwordInput);
        contentDiv.appendChild(submitText);
        contentDiv.appendChild(errorMessage);
        contentDiv.appendChild(backText);
        
        backText.onclick = function() {
            restoreInitialState();
            document.getElementById('computer').style.display = 'block';
            document.getElementById('content-computer').classList.remove('log-computer');
            document.getElementById('word-container-computer').style.display = 'none';
            contentDiv.classList.remove('password-screen-computer') ;
            setupComputerEntries(); 
        };
        // Agregar evento al texto cliclable
        submitText.onclick = function() {
            if (passwordInput.value === "TaraIsHot133") { // Cambiar por la contraseña real del juego
                displayLogs(4);
                setupPrintTitaniaCode();
                contentDiv.classList.remove('password-screen-computer');
                
            } else {
                errorMessage.textContent = 'Wrong password. Please try again.';
                passwordInput.value = ''; // Limpiar el input para reintento
            }
        };
    }
    
    function createBackLink() {
        return '<span id="text-back-computer" >\n > BACK... </span>';
    }

    function attachBackEvent() {
        const backButton = document.querySelector('#text-back-computer');
        if (backButton) {
            backButton.onclick = function() {
                restoreInitialState();
                document.getElementById('computer').style.display = 'block';
                document.getElementById('content-computer').classList.remove('log-computer');
                document.getElementById('word-container-computer').style.display = 'none';
                setupComputerEntries(); 
            };
        }
    }

    function saveInitialState() {
        const contentDiv = document.getElementById('content-computer');
        initialStateHTML = contentDiv.innerHTML; // Guarda el HTML inicial
    }

    function restoreInitialState() {
        const contentDiv = document.getElementById('content-computer');
        contentDiv.innerHTML = initialStateHTML; // Restaura el HTML inicial
    }

    loadLogs(); // Carga los logs al cargar la página


    fetch('../js/words.json')
        .then(response => response.json())
        .then(data => {
            const levels = [
                { length: 4, attempts: 5 },
                { length: 6, attempts: 5 },
                { length: 8, attempts: 5 }
            ];

            let currentLevel = 0;
            let selectedWords = [];
            let correctWord = '';
            let attempts = 0;

            initLevel(levels[currentLevel]);

            function initLevel(level) {
                selectedWords = shuffle(data.words.filter(word => word.length === level.length)).slice(0, 12);
                correctWord = selectedWords[Math.floor(Math.random() * selectedWords.length)];
                console.log(correctWord);
                attempts = level.attempts;
                initGame(selectedWords, correctWord, attempts);
            }

            function initGame(selectedWords, correctWord, attempts) {
                const wordContainer = document.getElementById('word-container-computer');
                wordContainer.innerHTML = '';
                updateAttempts(attempts);

                let wordsWithSymbols = addSymbols(selectedWords); // Agregar símbolos entre las palabras

                const paragraph = document.createElement('p');
                paragraph.innerHTML = wordsWithSymbols;
                wordContainer.appendChild(paragraph);

                const correctLettersDisplay = document.createElement('div');
                correctLettersDisplay.id = 'correct-letters';
                correctLettersDisplay.textContent = '0/6 correct';
                correctLettersDisplay.style.display = 'none'; // Ocultar el elemento inicialmente
                wordContainer.appendChild(correctLettersDisplay);

                const attemptsHistory = document.createElement('div'); // Elemento para mostrar el historial de intentos
                attemptsHistory.id = 'attempts-history';
                wordContainer.appendChild(attemptsHistory);

                // Agregar evento de clic a cada span
                const spans = paragraph.querySelectorAll('span');
                spans.forEach(span => {
                    span.addEventListener('click', function() {
                        if (!span.classList.contains('clicked')) { // Verificar si la palabra ya ha sido clickeada
                            const selectedWord = span.textContent.trim();
                            span.classList.add('clicked'); // Marcar la palabra como clickeada
                            if (selectedWord === correctWord) {
                                if (currentLevel < levels.length - 1) {
                                    currentLevel++;
                                    initLevel(levels[currentLevel]);
                                } else {
                                    // Aquí haces visible la sección computer cuando se hayan completado todos los niveles
                                    document.getElementById('computer').style.display = 'block';
                                    document.getElementById('word-container-computer').innerHTML = 'Access granted.';
                                }
                            } else {
                                attempts--;
                                updateAttempts(attempts);
                                if (attempts <= 0) {
                                    document.getElementById('word-container-computer').innerHTML = 'Terminal locked.';
                                } else {
                                    const correctLetters = getCorrectLetters(selectedWord, correctWord);
                                    correctLettersDisplay.textContent = `${correctLetters}/${correctWord.length} correct`;
                                    correctLettersDisplay.style.display = 'block'; // Mostrar el elemento
                                    addToAttemptsHistory(selectedWord, correctLetters, correctWord); // Agregar el intento al historial
                                }
                            }
                        }
                    });
                });
            }

            function addSymbols(words) {
                const symbols = ['@', '%', ',', '!', '-','+','#', '/', '|', '?', '~','[',']', ':', ';']; // Símbolos aleatorios
                let result = '';
                for (let i = 0; i < words.length; i++) {
                    result += `<span>${words[i]}</span>`;
                    let numSymbols = Math.floor(Math.random() * 31) + 10; // Entre 10 y 40 símbolos aleatorios entre cada palabra
                    for (let j = 0; j < numSymbols; j++) {
                        result += symbols[Math.floor(Math.random() * symbols.length)]; // Agregar un símbolo aleatorio
                    }
                }
                return result;
            }

            function updateAttempts(attempts) {
                const attemptsDiv = document.getElementById('attempts');
                attemptsDiv.textContent = `${attempts} ATTEMPT(S) LEFT`;
            }

            function getCorrectLetters(word1, word2) {
                let correct = 0;
                for (let i = 0; i < word1.length; i++) {
                    if (word1[i] === word2[i]) correct++;
                }
                return correct;
            }

            function addToAttemptsHistory(word, correctLetters, correctWord) {
                const attemptsHistory = document.getElementById('attempts-history');
                const attempt = document.createElement('div');
                attempt.textContent = `${word}: ${correctLetters}/${correctWord.length} correct`;
                attemptsHistory.insertBefore(attempt, attemptsHistory.firstChild); // Agregar al principio del historial
            }
        });
});
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setupPrintTitaniaCode() {
    const contentDiv = document.getElementById('content-computer');
    
    // Crear un span para el texto clicable
    let printLink = document.createElement('span');
    printLink.textContent = 'PRINT TITANIA CODE';
    printLink.style.cursor = 'pointer';
    printLink.style.textDecoration = 'underline';
    printLink.style.color = 'blue';
    printLink.style.display = 'block'; // Asegura que esté en su propia línea
    printLink.style.margin = '10px 0'; // Espacio antes y después

    // Añadir evento para cambiar el contenido al hacer clic
    printLink.onclick = function() {
        contentDiv.textContent = 'PRINTING...'; // Cambiar texto del div
        const clueDiv = document.createElement('div');
        clueDiv.id = "clue-computer";
        contentDiv.appendChild(clueDiv);
    };

    // Agregar el texto clicable al div
    contentDiv.appendChild(printLink);
}