document.addEventListener('DOMContentLoaded', function() {
    fetch('../js/words.json')
        .then(response => response.json())
        .then(data => {
            let selectedWords = shuffle(data.words.filter(word => word.length === 6)).slice(0, 12); // Filtrar palabras de longitud 6
            let correctWord = selectedWords[Math.floor(Math.random() * selectedWords.length)];
            let attempts = 4;
            initGame(selectedWords, correctWord, attempts);
        });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
                        document.getElementById('word-container-computer').innerHTML = 'Access granted.';
                    } else {
                        attempts--;
                        updateAttempts(attempts);
                        if (attempts <= 0) {
                            document.getElementById('word-container-computer').innerHTML = 'Terminal locked.';
                        } else {
                            const correctLetters = getCorrectLetters(selectedWord, correctWord);
                            correctLettersDisplay.textContent = `${correctLetters}/6 correct`;
                            correctLettersDisplay.style.display = 'block'; // Mostrar el elemento
                            addToAttemptsHistory(selectedWord, correctLetters, correctWord); // Agregar el intento al historial
                        }
                    }
                }
            });
        });
    }

    function addSymbols(words) {
        const symbols = ['@', '%', ',', '!', '-','+','#', '>', '^', '/', '|', '?', '~','[',']', ':', ';']; // Símbolos aleatorios
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
        attempt.textContent = `${word}: ${correctLetters}/6 correct`;
        attemptsHistory.insertBefore(attempt, attemptsHistory.firstChild); // Agregar al principio del historial
    }
});