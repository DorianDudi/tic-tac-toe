let currentValue = "X", counter = 0, displayingMessage = "";
let gameMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function addValue(id) {
	let currentBox = document.getElementById(id);
	if(currentBox.textContent.trim() === '' && counter <= 9){	// condition for box being empty
		currentBox.innerHTML = "<p>" + currentValue + "</p>";
		let line = parseInt(id[0] - 1), col = parseInt(id[1] - 1); // parseInt() converts string to int
		if (currentValue == "X") {		// the function ads X and O alternatively in the game grid
			currentValue = "O";
			storeGameState(id, 1);
		} else {
			currentValue = "X";
			storeGameState(id, -1);
		}
		++counter;
		evaluateGame();
		if (counter == 9) {
			displayGameMatrix();
		}
	}
}

function storeGameState(cellID, cellValue) { // stores either 1 or -1 in the gameMatrix variable
	let line = parseInt(cellID[0]), col = parseInt(cellID[1]);
	gameMatrix[line][col] = cellValue;
}

function displayGameMatrix() {	// debug function displaying the contents of gameMatrix to console
	let currentRow = "";
	for(let i = 0; i < 3; ++i) {
		for(let j = 0; j < 3; ++j) {
			currentRow += gameMatrix[i][j];
		}
		console.log(currentRow + "\n");
		currentRow = "";
	}
}

function evaluateGame() {
		let rowsSum = 0, colsSum = 0;
		firstDiagSum = gameMatrix[0][0] + gameMatrix[1][1] + gameMatrix[2][2];
		secondDiagSum = gameMatrix[0][2] + gameMatrix[1][1] + gameMatrix[2][0];
		for(let i = 0; i < 3; ++i) {
			let currentRowSum = 0, currentColSum = 0;
			for (let j = 0; j < 3; ++j) {
				currentRowSum += gameMatrix[i][j];
				currentColSum += gameMatrix[j][i];
			}
			if (currentRowSum == 3 || currentRowSum == -3) {
				rowsSum = currentRowSum;
				break;
			} else if (currentColSum == 3 || currentColSum == -3) {
				colsSum = currentRowSum;
				break;
			}
		}
		if (rowsSum == 3 || colsSum == 3 || firstDiagSum == 3 || secondDiagSum == 3) {
			freezeGrid();
			showMessage("xWins");
			displayingMessage += "xWins";
			resetGame(); // with unfreeze grid function included  
        } else if (rowsSum == -3 || colsSum == -3 || firstDiagSum == -3 || secondDiagSum == -3) {
			showMessage("oWins");
			displayingMessage += "oWins";
			resetGame();
		} else if (counter >= 9) {
			showMessage("draw");
			displayingMessage += "draw";
			resetGame();
		}
}

function resetGame() {
	for(let i = 0; i < 3; ++i) {
		for(let j = 0; j < 3; ++j) {
			gameMatrix[i][j] = 0;
		}
	}
	currentValue = "X";
	counter = 0;
}

function freezeGrid() {
	for(let i = 0; i < 3; ++i) {
		for(let j = 0; j < 3; ++j) {
			let currentID = i.toString() + j.toString(); // used toString() to convert integer to string
			document.getElementById(currentID).removeAttribute("onclick"); // used removeAtrributes() to remove onclick
    	}
    }
}

function unfreezeGrid() {
	document.getElementById("playAgain").hidden = true;
	hideElement(displayingMessage);
	for(let i = 0; i < 3; ++i) {
		for(let j = 0; j < 3; ++j) {
			let currentID = i.toString() + j.toString(); // used toString() to convert integer to string
			document.getElementById(currentID).setAttribute("onclick", "addValue(this.id)"); // used setAtrributes() to make grid fields active at new game
			document.getElementById(currentID).innerHTML = "";
		}
	}
}

function hideElement(elementID) {
	document.getElementById(elementID).hidden = true;
	displayingMessage = "";
}

function showMessage(msgID) {
	document.getElementById(msgID).hidden = false;
	document.getElementById("playAgain").hidden = false;
}
