const words = ['word', 'arhanghel', 'vertical', 'cars', 'computers', 'moon'];
let currentWord;
let hiddenWord;
let lives;

function startGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = '_'.repeat(currentWord.length);
    displayWord();
    lives = 7;
    updateLivesDisplay();
}

function guessLetter() {
    const guessInput = document.getElementById('guessInput');
    const letter = guessInput.value.toLowerCase();

    if (!/^[a-z]$/.test(letter)) { 
        displayMessage('Please enter a letter.', 'warning');
        return;
    }

    if (currentWord.includes(letter)) {
        let updated = false;
        for (let i = 0; i < currentWord.length; ++i) {
            if (currentWord[i] === letter && hiddenWord[i] === '_') {
                hiddenWord = hiddenWord.substring(0, i) + letter + hiddenWord.substring(i + 1);
                updated = true;
            }
        }
        if (!updated) {
            displayMessage(`Letter "${letter}" has already been guessed.`, 'info');
        } else {
            displayWord();
        }
        if (!hiddenWord.includes('_')) {
            endGame('won');
        }
    } else {
        --lives;
        updateLivesDisplay();
        if (lives === 0) {
            endGame('lost');
        } else {
            displayMessage(`Letter "${letter}" is not in the word.`, 'danger');
        }
    }
    guessInput.value = '';
}

function displayWord() {
    const wordElement = document.getElementById('word');
    wordElement.textContent = ''; // Clear existing content
    const hiddenWordArray = hiddenWord.split('');

    hiddenWordArray.forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'word-line';
        letterSpan.textContent = letter;
        wordElement.appendChild(letterSpan);
    });
}

function updateLivesDisplay() {
    const livesElement = document.getElementById('lives');
    livesElement.textContent = lives;
}

function endGame(result) {
    const messageElement = document.getElementById('message');
    let message;

    if (result === 'won') {
        message = 'Congratulations. You win!';
    } else {
        message = `:( You lost. The word was: ${currentWord}`;
    }

    displayMessage(message, result === 'won' ? 'success' : 'danger');
    setTimeout(startGame, 3000);
}

function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = `alert alert-${type}`;
    messageElement.style.display = 'block';
    setTimeout(() => { messageElement.style.display = 'none'; }, 3000); // Hide after 3 seconds
}

startGame();
