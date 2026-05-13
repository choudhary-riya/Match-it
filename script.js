/* ============================================
   Memory Card Game - Game Logic
   5 pairs = 10 cards positioned over template2.png
   ============================================ */

// 5 unique images for the memory game (each appears twice for pairs)
// Replace these with your actual image filenames
const cardImages = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg'
];

// Game state
const gameState = {
    moves: 0,
    matches: 0,
    timer: 0,
    timerInterval: null,
    firstCard: null,
    secondCard: null,
    canFlip: true,
    gameStarted: false,
    totalPairs: 5
};

// DOM Elements
const $ = (id) => document.getElementById(id);
const elements = {
    welcomeScreen: $('welcomeScreen'),
    gameScreen: $('gameScreen'),
    inviteScreen: $('inviteScreen'),
    gameBoard: $('gameBoard'),
    moves: $('moves'),
    timer: $('timer'),
    startButton: $('startButton'),
    muteButton: $('muteButton'),
    muteIcon: $('muteIcon'),
    gameAudio: $('gameAudio'),
    confettiContainer: $('confettiContainer')
};

// ============ HELPER FUNCTIONS ============

// Shuffle array (Fisher-Yates)
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Show a specific screen, hide others
function showScreen(screenId) {
    [elements.welcomeScreen, elements.gameScreen, elements.inviteScreen].forEach(s => {
        s.classList.remove('active');
    });
    setTimeout(() => $(screenId).classList.add('active'), 50);
}

// ============ GAME SETUP ============

function createCard(imageSrc, position) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.pos = position;
    card.dataset.symbol = imageSrc;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', `Card ${position + 1}`);
    card.setAttribute('tabindex', '0');

    card.innerHTML = `
        <div class="card-face card-back"></div>
        <div class="card-face card-front">
            <img src="${imageSrc}" alt="Card ${position + 1}" loading="lazy" />
        </div>
    `;

    return card;
}

function initializeGame() {
    // Reset state
    elements.gameBoard.innerHTML = '';
    gameState.moves = 0;
    gameState.matches = 0;
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.canFlip = true;
    gameState.gameStarted = false;
    gameState.timer = 0;
    
    elements.moves.textContent = '0';
    elements.timer.textContent = '00:00';
    clearInterval(gameState.timerInterval);

    // Create pairs (each image appears twice) and shuffle
    const cardPairs = [...cardImages, ...cardImages];
    const shuffled = shuffle(cardPairs);

    // Create card elements with position data
    shuffled.forEach((image, index) => {
        const card = createCard(image, index);
        elements.gameBoard.appendChild(card);
    });
}

// ============ TIMER ============

function startTimer() {
    if (gameState.gameStarted) return;
    gameState.gameStarted = true;
    
    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        const mins = Math.floor(gameState.timer / 60);
        const secs = gameState.timer % 60;
        elements.timer.textContent = 
            `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

// ============ CARD FLIPPING LOGIC ============

function flipCard(card) {
    // Prevent invalid flips
    if (!gameState.canFlip) return;
    if (card.classList.contains('matched')) return;
    if (card.getAttribute('aria-pressed') === 'true') return;

    startTimer();
    card.setAttribute('aria-pressed', 'true');

    if (!gameState.firstCard) {
        // First card of the pair
        gameState.firstCard = card;
    } else if (card !== gameState.firstCard) {
        // Second card of the pair
        gameState.secondCard = card;
        gameState.canFlip = false;
        gameState.moves++;
        elements.moves.textContent = gameState.moves;

        // Check for match
        if (gameState.firstCard.dataset.symbol === gameState.secondCard.dataset.symbol) {
            handleMatch();
        } else {
            handleMismatch();
        }
    }
}

function handleMatch() {
    gameState.matches++;
    gameState.firstCard.classList.add('matched');
    gameState.secondCard.classList.add('matched');
    
    const lastSecondCard = gameState.secondCard;
    
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.canFlip = true;
    
    // Check win condition
    if (gameState.matches === gameState.totalPairs) {
        // Add firecracker effect on last matched card
        lastSecondCard.classList.add('firecracker');
        clearInterval(gameState.timerInterval);
        
        // Show invite after celebration animation
        setTimeout(() => {
            showInviteScreen();
        }, 1000);
    }
}

function handleMismatch() {
    setTimeout(() => {
        if (gameState.firstCard) gameState.firstCard.setAttribute('aria-pressed', 'false');
        if (gameState.secondCard) gameState.secondCard.setAttribute('aria-pressed', 'false');
        gameState.firstCard = null;
        gameState.secondCard = null;
        gameState.canFlip = true;
    }, 1000);
}

// ============ INVITE REVEAL ============

function showInviteScreen() {
    showScreen('inviteScreen');
    createConfetti();
}

function createConfetti() {
    const colors = ['#c89855', '#5d6f23', '#f0d989', '#c5dde8', '#a17e1a'];
    elements.confettiContainer.innerHTML = '';
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.width = (8 + Math.random() * 8) + 'px';
        confetti.style.height = confetti.style.width;
        elements.confettiContainer.appendChild(confetti);
    }
}

// ============ EVENT LISTENERS ============

// Start button
elements.startButton.addEventListener('click', () => {
    showScreen('gameScreen');
    // Try to play audio (user gesture allows it)
    elements.gameAudio.play().catch(e => console.log('Audio:', e.message));
});

// Mute button
elements.muteButton.addEventListener('click', () => {
    elements.gameAudio.muted = !elements.gameAudio.muted;
    elements.muteIcon.textContent = elements.gameAudio.muted ? '🔇' : '🔊';
});

// Card clicks (event delegation)
elements.gameBoard.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) flipCard(card);
});

// Keyboard support
elements.gameBoard.addEventListener('keydown', (e) => {
    const card = e.target.closest('.card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        flipCard(card);
    }
});

// ============ INITIALIZE ============
showScreen('welcomeScreen');
initializeGame();
