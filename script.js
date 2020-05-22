let buttons = document.getElementsByTagName('button');
let inputs = document.getElementById("inputs");
let prevInputs = document.getElementById('prevInputs');

function add(firstNum, secondNum) {
    return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
    return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
    return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
    return firstNum / secondNum;
}

function operate(firstNum, secondNum, operator) {
    let result;

    switch (operator) {
        case '+':
            result = add(firstNum, secondNum);
            break;
        case '-':
            result = subtract(firstNum, secondNum);
            break;
        case '*':
            result = multiply(firstNum, secondNum);
            break;
        case '/':
            result = divide(firstNum, secondNum);
            break;
    }

    return result;
}

// handle calculator buttons
for (let i = 0, len = buttons.length; i < len; i++) {
    buttons[i].addEventListener('click', function (e) {
        let toAppend = buttons[i].textContent;
        switch (toAppend) {
            case '=':
                break;
            case 'C':
                inputs.value = '';
                prevInputs.textContent = '';
                break;
            default:
                inputs.value += buttons[i].textContent;
        }
    });
}

// enable keyboard input
window.onkeydown = function (e) {
    let val = "1234567890";
    let operators = "-+÷x";
    let altMultiplication = "X*";
    let altDivision = '/';
    let decimal = '.';

    // prevent user from selecting input field
    if (e.code != "ArrowLeft" && e.code != "ArrowRight") {
        e.preventDefault();
    } else{
        inputs.focus();
    }

    // check if keyboard input is valid
    if (val.includes(e.key)) {
        // numbers
        inputs.value += e.key;
    } else if (operators.includes(e.key) && inputs.value.slice(-1) != " ") {
        // operators
        inputs.value += ` ${e.key} `;
    } else if (altMultiplication.includes(e.key) && inputs.value.slice(-1) != " ") {
        inputs.value += " x ";
    } else if (altDivision == e.key && inputs.value.slice(-1) != " ") {
        inputs.value += " ÷ ";
    } else if (e.key == '=') {
        // do equals operation
    } else if (e.key == "Backspace" || e.key == "Delete") {
        // deletion
        numToDelete = -1;
        if (inputs.value.slice(-1) == " ") {
            numToDelete = -3;
        }

        inputs.value = inputs.value.slice(0, numToDelete);
    }
};

function getInputs() {

}

