const gameMessage = document.querySelector('.game-message-display');
const gameMessage2 = document.querySelector('.game-message-display2');

let gameArray = ['', '', '', '', '', '', '', '', ''];

// factoryFunction for the two players
const playerFactory = (symbol) => {
	const makeMove = (arrayIndex) => {
		gameArray[arrayIndex] = symbol;
		// + add an inactive class to the position!
	};
	return { symbol, makeMove };
};

// Here I create the two players (Right now, their inherited symbol is not being used
// in the code below, but maybe I will still change that.)
const player_1 = playerFactory('X');
const player_2 = playerFactory('O');

/// This text is displayed at the start of the game:
gameMessage.innerText = 'Welcome! X, make your move!';

//The "turn" value is set to true, which means that "x" starts (for now):
let turn = true;

// This function 1) switches between "player_1" and "player_2", using the "makeMove method
// on each player that each of them inherited (woohoo!) from their factoryFunction.
// This method ensures that their symbol (manually added here) is pushed to the gameArray.
function alternateTurns(itemIndex) {
	if (turn) {
		player_1.makeMove(itemIndex);
	} else {
		player_2.makeMove(itemIndex);
	}
	// Here a function is called to display the contents of the board:
	displayMove(itemIndex);
	// Here, the game is checking whether there are any wins:
	if (
		checkForWin(gameArray, 0, 1, 2) ||
		checkForWin(gameArray, 3, 4, 5) ||
		checkForWin(gameArray, 6, 7, 8) ||
		checkForWin(gameArray, 0, 3, 6) ||
		checkForWin(gameArray, 1, 4, 7) ||
		checkForWin(gameArray, 2, 5, 8) ||
		checkForWin(gameArray, 0, 4, 8) ||
		checkForWin(gameArray, 6, 4, 2) ||
		checkForDraw()
	) {
		// disabling all buttons at the end of the game.
		let allFields = document.querySelectorAll('.game-field');
		allFields.forEach((field) => {
			field.classList.add('disabled');
		});
		return;
	}
	// This switches turns for the players:
	turn = !turn;
	gameMessage.innerText = `${turn ? 'X' : 'O'}, make your move!`;
}

// This is the function to display the move on the board.
function displayMove(itemIndex) {
	//Now I the button that was clicked is disabled, so no other moves are allowed there.
	// const field0 = document.querySelector('#index-0');
	let fieldToDisplay = document.querySelector(`#index-${itemIndex}`);
	fieldToDisplay.innerText = gameArray[`${itemIndex}`];
	fieldToDisplay.classList.add('disabled');
}

function checkForWin(boardArray, fieldIndex1, fieldIndex2, fieldIndex3) {
	if (
		boardArray[fieldIndex1] !== '' &&
		boardArray[fieldIndex2] !== '' &&
		boardArray[fieldIndex3] !== ''
	) {
		if (
			boardArray[fieldIndex1] == boardArray[fieldIndex2] &&
			boardArray[fieldIndex2] == boardArray[fieldIndex3]
		) {
			gameMessage.innerText = `Player "${boardArray[fieldIndex1]}" wins!`;
			return true;
		}
	}
}

function checkForDraw() {
	const isNotEmpty = (currentValue) => currentValue !== '';
	if (gameArray.every(isNotEmpty)) {
		gameMessage.innerText = 'This game is a draw!';
		return true;
	}
	return false;
}

// gameArray[0] !== '' &&
// gameArray[1] !== '' &&
// gameArray[2] !== '' &&
// gameArray[3] !== '' &&
// gameArray[4] !== '' &&
// gameArray[5] !== '' &&
// gameArray[6] !== '' &&
// gameArray[7] !== '' &&
// gameArray[8] !== ''

// checkForWin(gameArray, 0, 1, 2);
// checkForWin(gameArray, 3, 4, 5);
// checkForWin(gameArray, 6, 7, 8);
// checkForWin(gameArray, 0, 3, 6);
// checkForWin(gameArray, 1, 4, 7);
// checkForWin(gameArray, 2, 5, 8);
// checkForWin(gameArray, 0, 4, 8);
// checkForWin(gameArray, 6, 4, 2);

// const field0 = document.querySelector('#index-0');
// field0.innerText = gameArray[0];
// const field1 = document.querySelector('#index-1');
// field1.innerText = gameArray[1];
// const field2 = document.querySelector('#index-2');
// field2.innerText = gameArray[2];
// const field3 = document.querySelector('#index-3');
// field3.innerText = gameArray[3];
// const field4 = document.querySelector('#index-4');
// field4.innerText = gameArray[4];
// const field5 = document.querySelector('#index-5');
// field5.innerText = gameArray[5];
// const field6 = document.querySelector('#index-6');
// field6.innerText = gameArray[6];
// const field7 = document.querySelector('#index-7');
// field7.innerText = gameArray[7];
// const field8 = document.querySelector('#index-8');
// field8.innerText = gameArray[8];

// function makeMove(arrayIndex, value) {
// 	gameArray[arrayIndex] = value;
// 	// + add an inactive class to the position!
// }

// alternateTurns(makeMove(4, 'o'));

// Potential series of events:
// makeMove(0, 'x');
// makeMove(4, 'o');
// makeMove(8, 'x');
// makeMove(2, 'o');
// makeMove(6, 'x');
// makeMove(3, 'o');
// makeMove(7, 'x');

// console.log(gameArray);
