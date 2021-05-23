'use strict';

import State, { updateState, resetState, checkWinner } from './state.js';

const main = document.querySelector('body > main');
const boardDiv = document.querySelector('div.board');
const firstRowDiv = document.querySelector('div.first-row');
const secondRowDiv = document.querySelector('div.second-row');
const thirdRowDiv = document.querySelector('div.third-row');

/**
 * #######################
 * ## handleSquareClick ##
 * #######################
 *
 * This handler function dictates what happens each time a player clicks
 * on a square.
 *
 *  - If the target is the div with class "square" we check which player
 *    is playing: even rounds "X" odd rounds "O".
 *
 *  - Then, we get the index of the square that user clicked.
 *
 *  - Updating the board.
 *
 *  - Rendering changes in HTML.
 *
 */
const handleSquareClick = (e) => {
    const { target } = e;

    if (target.matches('div.square')) {
        const currentPlayer = State.round % 2 === 0 ? 'X' : 'O';

        const squareIndex = Number(target.getAttribute('data-index'));

        updateState(squareIndex, currentPlayer);

        render();
    }
};

// We add the click event to the div with class "board".
boardDiv.addEventListener('click', handleSquareClick);

/**
 * ################
 * ## Reset game ##
 * ################
 *
 * We add an event handler to "main" that checks if the clicked element
 * is the div with class "reset". If it is:
 *
 *  - We remove the parent element.
 *
 *  - Reset the board.
 *
 *  - Activate the handle function "handleSquareClick" again.
 *
 */

main.addEventListener('click', (e) => {
    const { target } = e;

    if (target.matches('div.reset > *')) {
        target.parentElement.remove();

        resetState();

        boardDiv.addEventListener('click', handleSquareClick);

        render();
    }
});

/**
 * ############
 * ## Render ##
 * ############
 *
 * This function is responsible for rendering the HTML every time the
 * game is changed.
 *
 *  - Empty the three rows of squares.
 *
 *  - We create the rows again with the help of the array "board".
 *
 *      - Each square is a div. All squares have the class "square" and the attribute
 *        "data-index" whose value will be its position in the array. The content of
 *        each div will be whatever is in that position in the array ('X', 'O', null).
 *
 *  - We call the function "checkWinner" and store its value.
 *
 *  - If there is a winner Si hay un ganador eliminamos la función de click sobre
 *    "boardDiv". Creamos un div y le agregamos la clase "reset". Insertamos un mensaje
 *    que indique el ganador.
 */

function render() {
    firstRowDiv.innerHTML = '';
    secondRowDiv.innerHTML = '';
    thirdRowDiv.innerHTML = '';

    for (let i = 0; i < State.board.length; i++) {
        const square = document.createElement('div');

        square.textContent = State.board[i];
        square.classList.add('square');
        square.setAttribute('data-index', i);

        if (i < 3) {
            firstRowDiv.append(square);
        } else if (i < 6) {
            secondRowDiv.append(square);
        } else {
            thirdRowDiv.append(square);
        }
    }

    const winner = checkWinner();

    if (winner) {
        boardDiv.removeEventListener('click', handleSquareClick);

        // Creamos un div y le agregamos la clase "reset".
        const reset = document.createElement('div');
        reset.classList.add('reset');

        // Agregamos al div un párrafo con un mensaje que indique el resultado
        // de la partida y un h2 que diga "Try againg".
        reset.innerHTML = `
            ${winner}
            <h2>TRY AGAING!</h2>
        `;

        // Agregamos al main el div.
        main.append(reset);
    }
}

// We must call render first time we execute "index.html" to show the board.
render();
