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
        const wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = '';
        updateAttempts(attempts);

        let wordsWithSymbols = addSymbols(selectedWords); // Agregar símbolos entre las palabras

        const paragraph = document.createElement('p');
        paragraph.textContent = wordsWithSymbols;
        wordContainer.appendChild(paragraph);

        // Agregar evento de clic al párrafo entero
        paragraph.addEventListener('click', function(event) {
            if (event.target.textContent.trim() === correctWord) {
                document.getElementById('word-container').innerHTML = 'Access granted.';
            } else {
                attempts--;
                updateAttempts(attempts);
                if (attempts <= 0) {
                    document.getElementById('word-container').innerHTML = 'Terminal locked.';
                }
            }
        });
    }

    function addSymbols(words) {
        const symbols = ['@', '%', ',', '!', '-','+','#', '>', '<', '/', '|', '?', '~','[',']', ':', ';']; // Símbolos aleatorios
        let result = '';
        for (let i = 0; i < words.length; i++) {
            result += words[i];
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
});