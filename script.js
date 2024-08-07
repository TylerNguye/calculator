const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return "Zero Points"
    }
    return a / b
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