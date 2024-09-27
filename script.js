let sequence = [];
let userSequence = [];
let level = 1;
let score = 0;
let combo = 0;
let maxCombo = 0;
let lives = 3;
let powersUnlocked = { slowTime: false, extraLife: false };

// Commence le jeu
document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
    resetGame();
    generateSequence();
    displaySequence();
}

// Réinitialise le jeu
function resetGame() {
    sequence = [];
    userSequence = [];
    level = 1;
    score = 0;
    combo = 0;
    lives = 3;
    powersUnlocked.slowTime = false;
    powersUnlocked.extraLife = false;
    updateScore();
    document.getElementById('slow-time-btn').disabled = true;
    document.getElementById('extra-life-btn').disabled = true;
}

// Génère et affiche la séquence
function generateSequence() {
    sequence.push(Math.floor(Math.random() * 10));
}

function displaySequence() {
    let displayArea = document.getElementById('sequence-area');
    displayArea.textContent = sequence.join(' ');
    setTimeout(() => displayArea.textContent = '', 1000);
}

// Soumission de la séquence par l'utilisateur
document.getElementById('submit-btn').addEventListener('click', () => {
    let userInput = document.getElementById('input-area').value.split('').map(Number);
    if (checkSequence(userInput)) {
        nextLevel();
    } else {
        loseLife();
    }
});

function checkSequence(input) {
    return JSON.stringify(input) === JSON.stringify(sequence);
}

function nextLevel() {
    score += 10;
    level++;
    combo++;
    updateScore();
    checkPowers();
    generateSequence();
    displaySequence();
}

function loseLife() {
    lives--;
    updateScore();
    if (lives <= 0) {
        endGame();
    } else {
        generateSequence();
        displaySequence();
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
}

function checkPowers() {
    if (score >= 50 && !powersUnlocked.slowTime) {
        powersUnlocked.slowTime = true;
        document.getElementById('slow-time-btn').disabled = false;
    }
    if (score >= 100 && !powersUnlocked.extraLife) {
        powersUnlocked.extraLife = true;
        document.getElementById('extra-life-btn').disabled = false;
    }
}

// Utilisation des pouvoirs
document.getElementById('slow-time-btn').addEventListener('click', () => {
    powersUnlocked.slowTime = false;
    document.getElementById('slow-time-btn').disabled = true;
    // Ralentir l'affichage
});

document.getElementById('extra-life-btn').addEventListener('click', () => {
    if (lives < 3) {
        lives++;
        powersUnlocked.extraLife = false;
        document.getElementById('extra-life-btn').disabled = true;
        updateScore();
    }
});

function endGame() {
    document.getElementById('feedback-area').textContent = `Partie terminée ! Score : ${score}`;
    document.getElementById('input-area').disabled = true;
    document.getElementById('submit-btn').disabled = true;
}

// Bouton pour changer de jeu
document.getElementById('switch-game-btn').addEventListener('click', () => {
    window.location.href = 'memory-card/memory-game.html';
});
