const gameOptions = {
    ROCK: { value: 'ROCK', beater: 'PAPER' },
    PAPER: { value: 'PAPER', beater: 'SCISSOR' },
    SCISSOR: { value: 'SCISSOR', beater: 'ROCK' },
};

const gameState = {
    DRAW: 0,
    WIN: 1,
    DEFEAT: -1,
};

const MAX_ROUND = 5;

const getComputerChoice = () => {
    const key = Math.floor(Math.random() * 3);

    if (key == 0) return gameOptions.ROCK.value;
    if (key == 1) return gameOptions.PAPER.value;
    return gameOptions.SCISSOR.value;
}

const play = (playerSelection, computerChoice) => {
    const player = playerSelection.toUpperCase();
    if (!gameOptions.hasOwnProperty(player)) {
        throw new Error('Invalid option');
    }

    if (player == computerChoice) return gameState.DRAW;
    if (gameOptions[player].beater == computerChoice) return gameState.DEFEAT;

    return gameState.WIN;
}

const upperCaseFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const playRound = (gameScore, playerSelection, computerChoice) => {
    const roundState = play(playerSelection, computerChoice);
    if (roundState == gameState.DRAW) {
        return `It's a tie! Both choosed ${upperCaseFirst(playerSelection)}`;
    }
    if (roundState == gameState.DEFEAT) {
        gameScore.player2 += 1;
        return `${upperCaseFirst(computerChoice)} beats ${upperCaseFirst(playerSelection)}`;
    }
    if (roundState == gameState.WIN) {
        gameScore.player1 += 1;
        return `${upperCaseFirst(playerSelection)} beats ${upperCaseFirst(computerChoice)}`;
    }
}

const getPlayerChoice = () => {
    return prompt('Type Rock or Paper or Scissor');
}
const game = () => {
    const gameScore = { player1: 0, player2: 0 };

    for (let i = 0; i < MAX_ROUND; i++) {
        console.log(playRound(gameScore, getPlayerChoice(), getComputerChoice()));
    }
    if (gameScore.player1 > gameScore.player2) {
        console.log(`CONGRATS! You win ${gameScore.player1} - ${gameScore.player2}`);
    }
    else {
        console.log(`OUPS! You Lost ${gameScore.player1} - ${gameScore.player2}`)
    }
}

game();