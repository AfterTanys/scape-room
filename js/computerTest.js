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
    
        selectedWords.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.textContent = word;
            wordElement.classList.add('word');
            wordElement.addEventListener('click', function() { 
                if (!wordElement.classList.contains('disabled')) {
                    checkWord(word, wordElement, correctWord, attempts); 
                }
            });
            wordContainer.appendChild(wordElement);
        });
    }
    
    function checkWord(selectedWord, wordElement, correctWord) {
        if (selectedWord === correctWord) {
            document.getElementById('word-container').innerHTML = 'Access granted.';
        } else {
            let attempts = parseInt(document.getElementById('attempts').textContent) - 1;
            document.getElementById('attempts').textContent = `${attempts} ATTEMPT(S) LEFT`; // Actualiza el valor global
            wordElement.classList.add('disabled'); // Deshabilitar la palabra después de seleccionarla
            if (attempts <= 0) {
                document.getElementById('word-container').innerHTML = 'Terminal locked.';
            } else {
                let correctLetters = getCorrectLetters(selectedWord, correctWord);
                wordElement.innerHTML = `${selectedWord} (${correctLetters}/${correctWord.length} correct)`;
            }
        }
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