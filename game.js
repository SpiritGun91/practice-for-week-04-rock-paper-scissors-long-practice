const readline = require("node:readline");

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
	r: {
		name: "Rock",
		winsAgainst: "s",
	},
	p: {
		name: "Paper",
		winsAgainst: "r",
	},
	s: {
		name: "Scissors",
		winsAgainst: "p",
	},
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
	// Your code here
	console.log("  Type 'r' for Rock");
	console.log("  Type 'p' for Paper");
	console.log("  Type 's' for Scissors");
	console.log("  Type 'q' to quit");
	console.log("  Type 'h' for a list of valid commands\n");
}

function getWinner(move1, move2) {
	// Your code here
	if (move1 === move2) return 0;
	if (VALID_MOVES[move1].winsAgainst === move2) return 1;
	return -1;
}

function getCPUMove() {
	// Your code here
	const validMoveKeys = Object.keys(VALID_MOVES);
	const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
	return validMoveKeys[randomIndex];
}

function processMove(cmd, cpu) {
	// Your code here
	console.log(`You pick ${cmd}, computer picks ${cpu}.`);

	const result = getWinner(cmd, cpu);

	if (result === 0) {
		console.log("You tie.\n");
		ties++;
	} else if (result === 1) {
		console.log("You win!\n");
		wins++;
	} else {
		console.log("You lose...\n");
		losses++;
	}
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
	console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
	rl.question("> ", (cmd) => {
		const command = cmd.toLowerCase();

		if (command === "h") {
			console.log("\nHelp:\n");
			printHelp();
		} else if (command === "q") {
			rl.close();
			return;
		} else if (VALID_MOVES[command]) {
			const cpu = getCPUMove();
			processMove(command, cpu);
		} else {
			console.log("\nInvalid command.\n");
			printHelp();
		}

		promptInput(rl);
	});
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	console.log("Welcome to Rock/Paper/Scissors\n");
	printHelp();

	promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== "undefined" && require.main === module) {
	initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
	printHelp,
	getWinner,
	getCPUMove,
	processMove,
	promptInput,
};
