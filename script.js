// Card images - 8 unique images for the memory game
const imageFiles = [
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg',
    'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg'
];

// Game state
let gameState = {
    moves: 0,
    matches: 0,
    timer: 0,
    timerInterval: null,
    firstCard: null,
    secondCard: null,
    canFlip: true,
    gameStarted: false,
    totalPairs: 8
};

// DOM elements
const elements = {
    welcomeScreen: document.getElementById('welcomeScreen'),
    gameContainer: document.getElementById('gameContainer'),
    invitationOverlay: document.getElementById('invitationOverlay'),
    gameGrid: document.getElementById('gameGrid'),
    moves: document.getElementById('moves'),
    timer: document.getElementById('timer'),
    startButton: document.getElementById('startButton'),
    muteButton: document.getElementById('muteButton'),
    gameAudio: document.getElementById('gameAudio'),
    confettiContainer: document.getElementById('confettiContainer')
};

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create a card element
function createCard(imageSrc, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'gridcell');
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Card ${index + 1}`);
    card.dataset.symbol = imageSrc;

    card.innerHTML = `
        <div class="card-face card-front">
            <img src="${imageSrc}" alt="Memory card ${index + 1}" loading="lazy" />
        </div>
        <div class="card-face card-back"></div>
    `;

    return card;
}

// Initialize game grid
function initializeGrid() {
    elements.gameGrid.innerHTML = '';
    gameState.moves = 0;
    gameState.matches = 0;
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.canFlip = true;
    gameState.gameStarted = false;

    elements.moves.textContent = '0';
    clearInterval(gameState.timerInterval);
    gameState.timer = 0;
    elements.timer.textContent = '00:00';

    // Create pairs (each image appears twice) and shuffle
    const cardPairs = [...imageFiles, ...imageFiles];
    const shuffledCards = shuffle(cardPairs);

    // Create card elements
    shuffledCards.forEach((img, index) => {
        elements.gameGrid.appendChild(createCard(img, index));
    });
}

// Start game timer
function startTimer() {
    if (!gameState.gameStarted) {
        gameState.gameStarted = true;
        gameState.timerInterval = setInterval(() => {
            gameState.timer++;
            const minutes = Math.floor(gameState.timer / 60);
            const seconds = gameState.timer % 60;
            elements.timer.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}

// Check if all pairs are matched (win condition)
function checkWin() {
    if (gameState.matches === gameState.totalPairs) {
        clearInterval(gameState.timerInterval);

        // Firecracker animation on final match
        if (gameState.secondCard) {
            gameState.secondCard.classList.add('firecracker');
        }

        // Show Save the Date invitation with confetti
        setTimeout(() => {
            createConfetti();
            elements.invitationOverlay.classList.add('show');
        }, 700);
    }
}

// Create confetti animation
function createConfetti() {
    const colors = ['#d4a017', '#3d4a18', '#5d6f23', '#f5e9d3'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        elements.confettiContainer.appendChild(confetti);
    }
}

// Flip card logic
function flipCard(card) {
    // Prevent flipping if:
    // - Cards are being checked
    // - Card is already matched
    // - Card is already flipped
    if (!gameState.canFlip || card.classList.contains('matched') ||
        card.getAttribute('aria-pressed') === 'true') return;

    // Start timer on first card flip
    startTimer();
    
    // Flip the card
    card.setAttribute('aria-pressed', 'true');

    if (!gameState.firstCard) {
        // First card of the pair
        gameState.firstCard = card;
    } else if (!gameState.secondCard && card !== gameState.firstCard) {
        // Second card of the pair
        gameState.secondCard = card;
        gameState.canFlip = false;
        gameState.moves++;
        elements.moves.textContent = gameState.moves;

        // Check if cards match
        if (gameState.firstCard.dataset.symbol === gameState.secondCard.dataset.symbol) {
            // Match found!
            gameState.matches++;
            gameState.firstCard.classList.add('matched');
            gameState.secondCard.classList.add('matched');
            gameState.firstCard.setAttribute('aria-label', 'Matched');
            gameState.secondCard.setAttribute('aria-label', 'Matched');
            
            // Reset for next pair
            gameState.firstCard = null;
            gameState.secondCard = null;
            gameState.canFlip = true;
            
            // Check if game is won
            checkWin();
        } else {
            // No match - flip cards back after delay
            setTimeout(() => {
                gameState.firstCard.setAttribute('aria-pressed', 'false');
                gameState.secondCard.setAttribute('aria-pressed', 'false');
                gameState.firstCard = null;
                gameState.secondCard = null;
                gameState.canFlip = true;
            }, 1000);
        }
    }
}

// Event Listeners

// Start game button
elements.startButton.addEventListener('click', () => {
    elements.welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        elements.gameContainer.classList.add('active');
        // Try to play audio (may be blocked by browser)
        elements.gameAudio.play().catch(e => {
            console.log('Audio autoplay prevented. User will need to interact first.');
        });
    }, 800);
});

// Mute button
elements.muteButton.addEventListener('click', () => {
    elements.gameAudio.muted = !elements.gameAudio.muted;
    elements.muteButton.textContent = elements.gameAudio.muted ? 
        '🔇 Unmute' : '🔊 Mute';
});

// Card click
elements.gameGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) flipCard(card);
});

// Keyboard support
elements.gameGrid.addEventListener('keydown', (e) => {
    const card = e.target.closest('.card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        flipCard(card);
    }
});

// Initialize game on page load
initializeGrid();
