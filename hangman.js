const words = ['cuvant', 'arhanghel', 'biblioteca', 'masina', 'computers', 'paralelipiped'];
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
    const messageElement = document.getElementById('message');

    if (letter.length !== 1 || !/^[a-z]$/.test(letter)) {
        displayMessage('Va rugam introduceti o litera.', 'warning');
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
            displayMessage(`Litera "${letter}" a fost deja ghicită.`, 'info');
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
            displayMessage(`Litera "${letter}" nu este în cuvânt.`, 'danger');
        }
    }
    guessInput.value = '';
}

function displayWord() {
    const wordElement = document.getElementById('word');
    wordElement.innerHTML = hiddenWord.split('').map(letter => `<span class="word-line">${letter}</span>`).join('');
}

function updateLivesDisplay() {
    const livesElement = document.getElementById('lives');
    livesElement.textContent = lives;
}

function endGame(result) {
    const messageElement = document.getElementById('message');
    let message;

    if (result === 'won') {
        message = 'Felicitari, ai castigat!';
    } else {
        message = `:( Ai pierdut. Cuvantul era: ${currentWord}`;
    }

    displayMessage(message, result === 'won' ? 'success' : 'danger');
    setTimeout(startGame, 3000);
}

function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = `alert alert-${type}`; // Use Bootstrap classes for alert types
    messageElement.style.display = 'block'; // Make sure it's visible
    setTimeout(() => { messageElement.style.display = 'none'; }, 3000); // Hide after 3 seconds
}

startGame();
