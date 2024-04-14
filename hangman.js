// hangman.js
const words = ['cuvant', 'arhanghel', 'biblioteca', 'masina', 'computers', 'paralelipiped'];
let currentWord;
let hiddenWord;
let lives;

function startGame() {
    // Choose a random word from the words array
    currentWord = words[Math.floor(Math.random() * words.length)];

    // Initialize hidden word
    hiddenWord = '_'.repeat(currentWord.length);
    displayWord();

    // Initialize lives
    lives = 7;
    updateLivesDisplay();
}

function guessLetter() {
    const guessInput = document.getElementById('guessInput');
    const letter = guessInput.value.toLowerCase();

    if (letter.length !== 1 || !/^[a-z]$/.test(letter)) {
        alert('Va rugam introduceti o litera.');
        return;
    }

    if (currentWord.includes(letter)) {
        // Replace '_' with guessed letter
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                hiddenWord = hiddenWord.substring(0, i) + letter + hiddenWord.substring(i + 1);
            }
        }
        displayWord();
        if (!hiddenWord.includes('_')) {
            endGame('won');
        }
    } else {
        lives--;
        updateLivesDisplay();
        if (lives === 0) {
            endGame('lost');
        }
    }

    guessInput.value = '';
}

function displayWord() {
    const wordElement = document.getElementById('word');
    let wordHtml = '';
    for (let i = 0; i < hiddenWord.length; i++) {
        if (hiddenWord[i] === '_') {
            wordHtml += '<span class="word-line">_</span>';
        } else {
            wordHtml += '<span class="word-line">' + hiddenWord[i] + '</span>';
        }
    }
    wordElement.innerHTML = wordHtml;
}

function updateLivesDisplay() {
    const livesElement = document.getElementById('lives');
    livesElement.textContent = lives;
}

function endGame(result) {
    const message = result === 'won' ? 'Felicitari ai castigat!' : ':( Ai pierdut!';
    alert(message);
    startGame();
}

// Start the game when the page loads
startGame();
