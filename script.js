const screenDiv = document.querySelector("#screen")
const buttons = document.querySelector("#buttons")
const evalStack = []
let canReplace = true
const MAX_DIGITS = 12;

buttons.addEventListener('click', e => {
    switch(e.target.value) {
        case undefined:
            break;
        case "clear":
            while (evalStack.length > 0) {
                evalStack.pop()
            }
            screenDiv.textContent = "0"
            canReplace = true
            break;
        case "=":
            evaluateEquation()
            break;
        case "sign":
            if (screenDiv.textContent !== "0") {
                if (screenDiv.textContent.startsWith("-")) {
                    screenDiv.textContent = screenDiv.textContent.substring(1)
                }
                else {
                    screenDiv.textContent = "-" + screenDiv.textContent;
                }
            }
            break;
        case "percent":
            screenDiv.textContent = preciseNum(+screenDiv.textContent / 10)
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            pushOperator(e.target.value)
            break;
        case ".":
            if (screenDiv.textContent.includes(".")) {
                break;
            }
            screenDiv.textContent = Number(screenDiv.textContent).toString()
        default:
            if (canReplace) {
                if (e.target.value === "." && screenDiv.textContent === "0") {
                    screenDiv.textContent = "0."
                }
                else {
                    screenDiv.textContent = e.target.value
                }
                canReplace = false
            }
            else {
                if (screenDiv.textContent.length < MAX_DIGITS) {
                    screenDiv.textContent += e.target.value;
                }
            }   
    }
})


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => preciseNum(a * b);
const divide = (a, b) => {
    if (b === 0) {
        return "Zero Points"
    }
    return preciseNum(a / b)
};

function operate(operand2, operator, operand1) {
    switch(operator) {
        case '+':
            return add(operand1, operand2)
        case '-':
            return subtract(operand1, operand2)
        case '*':
            return multiply(operand1, operand2)
        case '/':
            return divide(operand1, operand2)
    }
}

function pushOperator(operator) {
    if (evalStack.length === 2) {
        evalStack.push(Number(screenDiv.textContent))
        screenDiv.textContent = String(operate(evalStack.pop(), evalStack.pop(), evalStack.pop()))
        evalStack.push(Number(screenDiv.textContent))
        evalStack[1] = operator
    }
    else {
        evalStack[0] = (Number(screenDiv.textContent))
        evalStack.push(operator)
    }
    canReplace = true
}

function evaluateEquation() {
    if (evalStack.length === 2) {
        evalStack.push(Number(screenDiv.textContent))
        screenDiv.textContent = String(operate(evalStack.pop(), evalStack.pop(), evalStack.pop()))
        evalStack.push(Number(screenDiv.textContent))
        canReplace = true
    }
}

function preciseNum(num) {
    const precisionDigits = MAX_DIGITS - String(Math.round(num)).length - 1
    return Number(num.toPrecision(precisionDigits))
}