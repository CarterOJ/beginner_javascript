const readLine = require("readline");

function fizzbuzz(n) {
    let lines = [];
    for (let i = 1; i < n + 1; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            lines.push("FizzBuzz");
        } else if (i % 3 === 0) {
            lines.push("Fizz");
        } else if (i % 5 === 0) {
            lines.push("Buzz");
        } else {
            lines.push(`${i}`)
        }
    }
    return lines.join("\n");
}

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
        /** @type {string} **/
        const iters = await askQuestion(rl, "Please enter the iteration amount to fizzbuzz. Type 'Q' to quit: ");
        const trimmed = iters.trim();
        if (trimmed.toLowerCase() === "q") {
            console.log("Exiting fizzbuzz");
            rl.close();
            break;
        } else if (trimmed.includes(" ")) {
            console.log("Can only accept one argument!");
        } else if (!Number.isInteger(Number(iters)) || Number(iters) < 0) {
            console.log("Input must be a positive integer!");
        } else {
            console.log(fizzbuzz(Number(iters)));
        }
    }
}

main();