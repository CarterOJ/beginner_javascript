const readLine = require("readline");

/** @param {string} pal **/
function checkPalindrome(pal) {
    if (pal.length <= 1) {
        return true;
    } else if (pal.at(0).toLowerCase() === pal.at(-1).toLowerCase()) {
        return checkPalindrome(pal.slice(1, -1));
    } 
    return false;
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
    })
    while (true) {
        const palindrome = await askQuestion(rl, "Enter any string to check if it's a palindrome. Type 'Q' to exit: ");
        if (palindrome.trim().toLowerCase() === "q") {
            console.log("Exiting palindrome checker");
            rl.close();
            break;
        }
        console.log(checkPalindrome(palindrome));
    }
}

main();