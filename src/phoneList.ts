/**
 * 1. Idea:
 * 
 * 1.1 for each test case we'll create a hash map (js native Object) where
 * each node represents a digit in a phone number;
 * 
 * 1.2 each node is to have `terminal` flag set to `true` if it represents
 * last digit of a phone number;
 * 
 * 2. Thus:
 * 
 * 2.1 while we add new phone number digit by digit we are to add new node,
 * otherwise the number is contained by other phone number
 * 
 * 2.2 if we reached the node which is `terminal`, we've just found a phone number
 * contained by number which is being added now
 * 
 */


type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type DigitNode = {
    0?: DigitNode;
    1?: DigitNode;
    2?: DigitNode;
    3?: DigitNode;
    4?: DigitNode;
    5?: DigitNode;
    6?: DigitNode;
    7?: DigitNode;
    8?: DigitNode;
    9?: DigitNode;
    terminal?: boolean;
};

export default function () {
    let numberOftestCases = +readline();
    while (numberOftestCases--) {
        // *************** TEST CASE LEVEL ***************
        const rootNode: DigitNode = {}; // 1.1
        let isTestCaseValid = true;
        let numberOfPhonesNumbers = +readline();
        while (numberOfPhonesNumbers--) {
            const phoneNumber = readline();
            if (!isTestCaseValid) continue;
            // ************ PHONE NUMBER LEVEL ************
            let currentNode = rootNode;
            let newNodeHasBeenAdded = false;
            const numberLength = phoneNumber.length;
            let i = 0;
            while (i < numberLength) {
                // ************ DIGIT LEVEL ************
                const digit = phoneNumber[i] as Digit;
                if (!currentNode[digit]) {
                    const nextNode: DigitNode = { terminal: i === numberLength - 1 }; // 1.2
                    currentNode[digit] = nextNode;
                    currentNode = currentNode[digit]; // Reassign nodes
                    newNodeHasBeenAdded = true;
                } else {
                    currentNode = currentNode[digit]; // Reassign nodes
                    if (currentNode.terminal) {
                        isTestCaseValid = false; // 2.2, terminal node found
                        break;
                    }
                }
                i++;
            }
            // ********* NUMBER HAS BEEN HANDLED *********
            if (!newNodeHasBeenAdded) { // 2.1
                isTestCaseValid = false;
                continue;
            }
        }
        // END OF TEST CASE 
        print(isTestCaseValid ? "YES" : "NO");
    }
}
