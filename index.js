const gameOptions = {
    ROCK: { value: 'rock', beater: 'paper' },
    PAPER: { value: 'paper', beater: 'scissor' },
    SCISSOR: { value: 'scissor', beater: 'rock' },
};

const gameState = {
    DRAW: 0,
    WIN: 1,
    DEFEAT: -1,
};

const MAX_TIME_TOAST = 500;
const MAX_ROUND = 5;

const getComputerChoice = () => {
    const key = Math.floor(Math.random() * 3);

    if (key == 0) return gameOptions.ROCK.value;
    if (key == 1) return gameOptions.PAPER.value;
    return gameOptions.SCISSOR.value;
}

const play = (playerSelection, computerChoice) => {
    const player = playerSelection.toUpperCase();
    if (!Object.hasOwn(gameOptions, player)) {
        throw new Error('Invalid option');
    }

    if (playerSelection == computerChoice) return gameState.DRAW;
    if (gameOptions[player].beater == computerChoice) return gameState.DEFEAT;

    return gameState.WIN;
}

const upperCaseFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const playRound = (gameScore, playerSelection, computerChoice) => {
    const roundState = play(playerSelection, computerChoice);
    if (roundState == gameState.DRAW) {
        return `It's a tie! Both choosed ${upperCaseFirst(playerSelection)}!`;
    }
    if (roundState == gameState.DEFEAT) {
        gameScore.player2 += 1;
        return `${upperCaseFirst(computerChoice)} beats ${upperCaseFirst(playerSelection)}!`;
    }
    if (roundState == gameState.WIN) {
        gameScore.player1 += 1;
        return `${upperCaseFirst(playerSelection)} beats ${upperCaseFirst(computerChoice)}!`;
    }
}

const playerBtns = document.querySelectorAll('.player__options');
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const roundMessage = document.querySelector('#game-state');

function playGame() {
    const playerSelection = this.dataset.gameOption;
    const computerSelection = getComputerChoice();

    const gameScore = {
        player1: parseInt(score1.textContent),
        player2: parseInt(score2.textContent)
    };

    const computerSelectedBtn = document.querySelector(`#computer-${computerSelection}`);
    roundMessage.textContent = playRound(gameScore, playerSelection, computerSelection);
    
    updateScoreUI(gameScore);
    updateSelectedBtnsUI(this, computerSelectedBtn);

    if (isGameOver(gameScore)) {
        updateGameFinalStateUI(gameScore);
    }

}

const updateScoreUI = (gameScore) => {
    score1.textContent = gameScore.player1;
    score2.textContent = gameScore.player2;
}

const updateSelectedBtnsUI = (userBtn, computerSelectedBtn) => {
    userBtn.classList.add('selected');
    computerSelectedBtn.classList.add('selected');

    setTimeout(() => {
        gameState.textContent = '';
        userBtn.classList.remove('selected');
        computerSelectedBtn.classList.remove('selected');
    }, MAX_TIME_TOAST);
}

const updateGameFinalStateUI = (gameScore) => {
    let message = '';
    if (gameScore.player1 > gameScore.player2) {
        message = "CONGRATULATION! YOU WON!";
        roundMessage.classList.add('game-state--win');
    }
    else {
        message = "OUPS! YOU LOST!";
        roundMessage.classList.add('game-state--lose');
    }
    roundMessage.textContent = message;
    roundMessage.classList.add('game-state--finished');
    playerBtns.forEach((btn) => btn.setAttribute('disabled', 'true'));
}

const isGameOver = (gameScore) => {
    return gameScore.player1 == MAX_ROUND || gameScore.player2 == MAX_ROUND;
}

playerBtns.forEach((option) => option.addEventListener('click', playGame));