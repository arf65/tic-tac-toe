const gameBoard = (() => {
	const text = [ '', '', '', '', '', '', '', '', '' ];
	return { text };
})();

const displayController = (() => {
	const markSpot = () => {
		const squares = document.querySelectorAll('.square');
		for (let i = 0; i < squares.length; i++) {
			if (gameBoard.text[i] === '') {
				squares[i].addEventListener('click', (e) => {
					const markPlayer = player();
					let newMark;
					markPlayer.playerTurn() === 'p1' ? (newMark = 'X') : (newMark = 'O');
					gameBoard.text.splice(i, 1, newMark);
					render();
				});
			}
		}
	};
	//prints X's and O's onto the screen
	function render() {
		const squares = document.querySelectorAll('.square');
		for (let i = 0; i < squares.length; i++) {
			squares[i].textContent = gameBoard.text[i];
		}
	}

	return { markSpot };
})();

const player = () => {
	const playerTurn = () => {
		const numX = countMarked().X;
		const numO = countMarked().O;
		if (numX > numO) {
			return 'p2';
		}
		if (numX === numO) {
			return 'p1';
		}
	};
	//checks for a winner of the game
	const winner = () => {
		//creates an object with all the possible winning combinations of tic tac toe
		const winCombos = {
			0: [ 0, 1, 2 ],
			1: [ 3, 4, 5 ],
			2: [ 6, 7, 8 ],
			3: [ 0, 3, 6 ],
			4: [ 1, 4, 7 ],
			5: [ 2, 5, 8 ],
			6: [ 0, 4, 8 ],
			7: [ 2, 4, 6 ]
		};
		//if there are less than three X's there can't possibly be a winner yet
		if (countMarked().X < 3) {
			return false;
		}
		//find the indices of all the X's and O's
		const indicesOfX = getAllIndices(gameBoard.text, 'X');
		const indicesOfO = getAllIndices(gameBoard.text, 'O');
		//compare indices of X's and O's to winning combinations
		for (let i = 0; i < indicesOfX.length; i++) {
			for (let x = 0; x < Object.keys(winCombos).length; x++) {
				for (let j = 0; j < winCombos[x].length; j++) {
					if (indicesOfX[i] === winCombos[x][j]) {
						let numMatchedX = 0;
						numMatchedX += 1;
						if (numMatchedX === 3) return true;
					}
					if (indicesOfO[i] === winCombos[x][j]) {
						let numMatchedO = 0;
						numMatchedO += 1;
						if (numMatchedO === 3) return true;
					}
				}
			}
		}
		console.log("didn't work");
		return false;
	};
	//gets all Indexes of a value in an array
	function getAllIndices(arr, val) {
		let indexes = [],
			i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i] === val) {
				indexes.push(i);
			}
		}
		return indexes;
	}
	//counts the number of X's and O's to determine who's turn is next
	function countMarked() {
		let numX = 0;
		let numO = 0;
		for (let i = 0; i < gameBoard.text.length; i++) {
			if (gameBoard.text[i] === 'X') {
				numX += 1;
			}
			if (gameBoard.text[i] === 'O') {
				numO += 1;
			}
		}
		return { X: numX, O: numO };
	}

	return { playerTurn, winner };
};

displayController.markSpot();
