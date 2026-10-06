let currentNumber = "0";
let previousNumber = "";
let operation = null;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function updateDisplay() {
    currentDisplay.textContent = currentNumber;
    previousDisplay.textContent =
        previousNumber && operation
            ? `${previousNumber} ${getOperationSymbol(operation)}`
            : "";
}

function appendNumber(number) {
    if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

function appendDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }

    updateDisplay();
}

function chooseOperation(selectedOperation) {

    if (selectedOperation === "%") {
        currentNumber = String(parseFloat(currentNumber) / 100);
        updateDisplay();
        return;
    }

    if (previousNumber !== "") {
        calculate();
    }

    operation = selectedOperation;
    previousNumber = currentNumber;
    currentNumber = "0";

    updateDisplay();
}

function calculate() {

    if (operation === null || previousNumber === "") {
        return;
    }

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    let result;

    // Conditional logic for arithmetic operations
    if (operation === "+") {
        result = firstNumber + secondNumber;
    }
    else if (operation === "-") {
        result = firstNumber - secondNumber;
    }
    else if (operation === "*") {
        result = firstNumber * secondNumber;
    }
    else if (operation === "/") {

        if (secondNumber === 0) {
            currentNumber = "Error";
            previousNumber = "";
            operation = null;
            updateDisplay();
            return;
        }

        result = firstNumber / secondNumber;
    }

    currentNumber = String(
        Number.isInteger(result)
            ? result
            : parseFloat(result.toFixed(10))
    );

    previousNumber = "";
    operation = null;

    updateDisplay();
}

function clearDisplay() {
    currentNumber = "0";
    previousNumber = "";
    operation = null;

    updateDisplay();
}

function deleteNumber() {

    if (currentNumber.length === 1) {
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }

    updateDisplay();
}

function getOperationSymbol(operation) {

    if (operation === "*") {
        return "×";
    }

    if (operation === "/") {
        return "÷";
    }

    if (operation === "-") {
        return "−";
    }

    return operation;
}