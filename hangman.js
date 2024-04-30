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
    const letter = guessInput.value.toLowerCase(); // Convertim inputul direct în literă mică

    if (!/^[a-z]$/.test(letter)) { // Verificăm dacă 'letter' este exact o literă        displayMessage('Vă rugăm introduceți o literă.', 'warning');
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
    wordElement.textContent = ''; // Clear existing content
    const hiddenWordArray = hiddenWord.split('');

    hiddenWordArray.forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'word-line'; // Apply the same class
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
