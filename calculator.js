const readLine = require("readline");

function binaryOperation(opOne, opTwo, operator) {
    if (operator === "+") {
        return opOne + opTwo;
    } else if (operator === "-") {
        return opOne - opTwo;
    } else if (operator === "*") {
        return opOne * opTwo;
    } else {
        return opOne / opTwo;
    }
}

function askQuestion(rl, question) {
    return new Promise(res => {
        rl.question(question, res);
    });
}

async function main() {
    console.log("To use the calculator, please adhere to the following format: [int] '+'||'-'||'*'||'/' [int].");
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    while (true) {
        /** @type {string} **/
        const input = await askQuestion(rl, "Enter an expression or type 'Q' to quit:\n");  
        if (input.toLowerCase().trim() === "q") {
            console.log("Exiting calculator");
            rl.close();
            break;
        }
        let params = input.replace(/\s+/g, "").match(/(?:^|(?<=[+\-*/]))-?\w+(?:\.\w+)?|[+\-*/]/g) || [];
        if (params.length !== 3) {
            console.log("There must be exactly three arguments!");
        } else if (!Number.isInteger(Number(params[0]))) {
            console.log(`${params[0]} is not an integer!`);
        } else if (!Number.isInteger(Number(params[2]))) {
            console.log(`${params[2]} is not an integer!`);
        } else if (!"+-*/".includes(params[1])) {
            console.log(`${params[1]} is not a valid operator!`);
        } else if (Number(params[2]) === 0 && params[1] === "/") {
            console.log("Undefined");
        } else {
            console.log(`Result: ${binaryOperation(Number(params[0]), Number(params[2]), params[1])}`);
        }
    }
}

main();