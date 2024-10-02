const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let score = 0;
let combo = 0;

// Mélanger les cartes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialiser le plateau de jeu
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(cards).forEach(symbol => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.symbol = symbol;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    updateScore();
    resetCombo();
}

// Retourner une carte
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    // Animation de retournement
    this.style.transform = 'rotateY(180deg)';
    
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true; // Bloquer les autres clics jusqu'à vérification
    checkForMatch();
}

// Vérifier si les deux cartes correspondent
function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards();
        score += 100 * (combo + 1); // Bonus de combo
        combo++;
        showCombo();
        updateScore();
        matches++;
        if (matches === symbols.length) {
            setTimeout(() => showVictoryMessage(), 500);
        }
    } else {
        resetCombo();
        unflipCards();
    }
}

// Désactiver les cartes appariées
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

// Retourner les cartes si elles ne correspondent pas
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.style.transform = 'rotateY(0deg)'; // Retour à la position initiale
        secondCard.style.transform = 'rotateY(0deg)'; // Retour à la position initiale
        resetBoard(); // Ne reset qu'après que les cartes soient remises à l'état initial
    }, 1000);
}

// Réinitialiser les variables de la planche
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false; // Débloquer la planche pour permettre d'autres clics
}

// Mise à jour du score
function updateScore() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
        scoreDisplay.style.opacity = 0; // Fade out
        setTimeout(() => {
            scoreDisplay.style.opacity = 1; // Fade in
        }, 200);
    }
}

// Afficher le combo
function showCombo() {
    const comboDisplay = document.getElementById('combo-display');
    if (combo > 1) {
        comboDisplay.textContent = `Combo x${combo}!`;
        comboDisplay.style.visibility = 'visible';
    } else {
        comboDisplay.style.visibility = 'hidden';
    }
}

// Réinitialiser le combo
function resetCombo() {
    combo = 0;
    const comboDisplay = document.getElementById('combo-display');
    if (comboDisplay) {
        comboDisplay.style.visibility = 'hidden';
    }
}

// Afficher un message de victoire
function showVictoryMessage() {
    alert(`Bravo ! Vous avez gagné avec un score de ${score} points !`);
    resetGame();
}

// Recommencer le jeu
document.getElementById('restart-btn').addEventListener('click', () => {
    resetGame();
});

// Fonction pour réinitialiser le jeu
function resetGame() {
    matches = 0;
    score = 0;
    createBoard();
}

// Démarrer le jeu au chargement
createBoard();

// Bouton pour changer de jeu
document.getElementById('switch-game-btn').addEventListener('click', () => {
    window.location.href = '../index.html';
});
