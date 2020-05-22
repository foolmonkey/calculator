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
        let lastInput = inputs.value.slice(-1);

        switch (toAppend) {
            case '=':
                break;
            case 'C':
                inputs.value = '';
                prevInputs.textContent = '';
                break;
            default:
                if(lastInput != " " && (lastInput != "%" && "1234567890".includes(lastInput))){
                    inputs.value += toAppend;
                }            
        }
    });
}

// enable keyboard input
window.onkeydown = function (e) {
    let digits = "1234567890";
    let operators = "-+÷x";
    let altMultiplication = "X*";
    let altDivision = '/';
    let decimal = '.';

    let lastInput = inputs.value.slice(-1);

    // prevent user from selecting input field
    if (e.code != "ArrowLeft" && e.code != "ArrowRight") {
        e.preventDefault();
    } else {
        inputs.focus();
    }

    // numbers
    if (digits.includes(e.key)) {
        if(lastInput != '%'){
            inputs.value += e.key;
        }
        // deletion
    } else if (e.key == "Backspace" || e.key == "Delete") {
        numToDelete = -1;
        if (lastInput == " ") {
            numToDelete = -3;
        }

        inputs.value = inputs.value.slice(0, numToDelete);
    }

    if (lastInput != " ") {
        if (operators.includes(e.key)) {
            inputs.value += ` ${e.key} `;
        } else if (altMultiplication.includes(e.key)) {
            inputs.value += " x ";
        } else if (altDivision == e.key) {
            inputs.value += " ÷ ";
        } else if ('%' == e.key) {
            if (digits.includes(lastInput) && lastInput != '%') {
                inputs.value += "%";
            }
        } else if (e.key == '=') {
            // do equals operation
        }
    }
};


function getInputs() {

}

