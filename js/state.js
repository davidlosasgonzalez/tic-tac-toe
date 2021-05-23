'use strict';

// We get the elements of the localStorage (if any).
const storageBoard = localStorage.getItem('board');
const storageRound = localStorage.getItem('round');

// We initialise the state. If there is any value in the localStorage we take it
// from there, otherwise we initialise by default.
const State = {
    board: storageBoard ? JSON.parse(storageBoard) : Array(9).fill(null),
    round: storageRound ? JSON.parse(storageRound) : 0,
};

/**
 * ###############
 * ## saveState ##
 * ###############
 *
 * Function that stores in the localStorage the current state of the State.
 * Remember that the State has two properties, we must store both of them.
 *
 */
const saveState = () => {
    localStorage.setItem('board', JSON.stringify(State.board));
    localStorage.setItem('round', JSON.stringify(State.round));
};

/**
 * #################
 * ## updateState ##
 * #################
 *
 * Depending on the box selected by the current player, we change the value
 * of the board and move on to the next round.
 *
 * We must save the state at the end.
 *
 */

const updateState = (index, value) => {
    State.board[index] = value;
    State.round++;
    saveState();
};

/**
 * ################
 * ## resetState ##
 * ################
 *
 * If the game ends we must allow the player to reset the game to default values.
 *
 * We must save the state at the end.
 *
 */

const resetState = () => {
    State.board = Array(9).fill(null);
    State.round = 0;
    saveState();
};

/**
 * #################
 * ## checkWinner ##
 * #################
 *
 * We check if there is already a winner. To do this we must check all possible
 * winning combinations.
 *
 *  - If there is a winner we return a win message.
 *
 *  - If there are no more attempts and there was a tie, we return a tie message.
 *
 *  - Otherwise we return a false.
 *
 */
const checkWinner = () => {
    // Possible winning combinations.
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];

        if (
            State.board[a] &&
            State.board[a] === State.board[b] &&
            State.board[a] === State.board[c]
        ) {
            const winner = State.board[a] === 'X' ? 'Player 1' : 'Player 2';

            return `
                <p>${winner}</p>
                <p>is the winner!</p>
            `;
        }
    }

    if (State.board.every((square) => square !== null)) {
        return '<p>There was a tie!</p>';
    }

    return false;
};

export default State;
export { updateState, resetState, checkWinner };
