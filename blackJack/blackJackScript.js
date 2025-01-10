const playerCards = document.getElementById('player-cards');
const dealerCards = document.getElementById('dealer-cards');
const playerScoreEl = document.getElementById('player-score');
const dealerScoreEl = document.getElementById('dealer-score');
const gameStatus = document.getElementById('game-status');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const restartButton = document.getElementById('restart-button');

// Add win/loss/tie counters
const playerWinCountEl = document.getElementById('player-wins');
const dealerWinCountEl = document.getElementById('dealer-wins');
const tieCountEl = document.getElementById('ties');

let playerScore = 0;
let dealerScore = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];
let isGameOver = false;
let playerWins = 0;
let dealerWins = 0;
let ties = 0;

function initializeDeck() {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = [
        { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' },
        { value: 5, label: '5' }, { value: 6, label: '6' }, { value: 7, label: '7' },
        { value: 8, label: '8' }, { value: 9, label: '9' }, { value: 10, label: '10' },
        { value: 10, label: 'J' }, { value: 10, label: 'Q' }, { value: 10, label: 'K' },
        { value: 11, label: 'A' },
    ];

    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ ...value, suit });
        });
    });
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard(hand) {
    const card = deck.pop();
    hand.push(card);
    return card;
}

function update() {
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';

    playerHand.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.textContent = `${card.label}${card.suit}`;
        playerCards.appendChild(cardEl);
    });

    dealerHand.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.textContent = `${card.label}${card.suit}`;
        dealerCards.appendChild(cardEl);
    });

    playerScoreEl.textContent = `Score: ${calculateScore(playerHand)}`;
    dealerScoreEl.textContent = `Score: ${calculateScore(dealerHand)}`;
}

function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    hand.forEach(card => {
        score += card.value;
        if (card.label === 'A') aceCount++;
    });

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

function checkGameStatus() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);

    if (playerScore > 21) {
        gameStatus.textContent = 'Player Busts! Dealer Wins!';
        dealerWins++;
        updateScoreboard();
        endGame();
    } else if (dealerScore > 21) {
        gameStatus.textContent = 'Dealer Busts! Player Wins!';
        playerWins++;
        updateScoreboard();
        endGame();
    } else if (isGameOver) {
        if (playerScore > dealerScore) {
            gameStatus.textContent = 'Player Wins!';
            playerWins++;
        } else if (playerScore < dealerScore) {
            gameStatus.textContent = 'Dealer Wins!';
            dealerWins++;
        } else {
            gameStatus.textContent = 'It’s a Tie!';
            ties++;
        }
        updateScoreboard();
        endGame();
    }
}

function updateScoreboard() {
    playerWinCountEl.textContent = `Player Wins: ${playerWins}`;
    dealerWinCountEl.textContent = `Dealer Wins: ${dealerWins}`;
    tieCountEl.textContent = `Ties: ${ties}`;
}

function endGame() {
    isGameOver = true;
    hitButton.disabled = true;
    standButton.disabled = true;
}

function startGame() {
    deck = [];
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    isGameOver = false;

    initializeDeck();
    shuffleDeck();

    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);

    update();
    gameStatus.textContent = '';
    hitButton.disabled = false;
    standButton.disabled = false;
}

// Event listeners
hitButton.addEventListener('click', () => {
    dealCard(playerHand);
    update();
    checkGameStatus();
});

standButton.addEventListener('click', () => {
    isGameOver = true;

    while (calculateScore(dealerHand) < 17) {
        dealCard(dealerHand);
    }

    update();
    checkGameStatus();
});

restartButton.addEventListener('click', startGame);

startGame();
