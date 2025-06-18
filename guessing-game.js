const readLine = require("readline");

function askQuestion(rl, question) {
    return new Promise(res => {
        rl.question(question, res);
    });
}

async function main() {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    while (true) {
        const magicNumber = Math.floor(Math.random() * 100) + 1;
        /** @type {string} **/
        let guess = await askQuestion(rl, "I am thinking of a number 1-100. Take a guess or type 'Q' to quit: ");
        while (true) {
            const trimmed = guess.trim();
            if (trimmed.toLowerCase() === "q") {
                console.log("Exiting guessing game");
                rl.close();
                return;
            } else if (trimmed.includes(" ")) {
                guess = await askQuestion(rl, "Can only accept one argument at a time! Guess again: ");
            } else if (!Number.isInteger(Number(guess))) {
                guess = await askQuestion(rl, "Input must be an integer! Guess again: ");
            } else {
                const numGuess = Number(guess);
                if (numGuess < 1 || numGuess > 100) {
                    guess = await askQuestion(rl, "The magic number is between 1 & 100! Guess again: ");
                } else if (magicNumber !== numGuess) {
                    guess = await askQuestion(rl, "Not quite! Guess again: ");
                } else {
                    console.log("You got it! Let's play again.");
                    break;
                }
            }
        }
    }
}

main();