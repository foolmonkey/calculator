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

function operate(firstNum, operator, secondNum) {
    let result;

    switch (operator) {
        case '+':
            result = add(firstNum, secondNum);
            break;
        case '-':
            result = subtract(firstNum, secondNum);
            break;
        case 'x':
            result = multiply(firstNum, secondNum);
            break;
        case '÷':
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
                if (lastInput != " ") {
                    orderOfOperations(getInputs());
                }
                break;
            case 'C':
                inputs.value = '';
                prevInputs.textContent = '';
                break;
            case '%':
                if ("1234567890".includes(lastInput)) {
                    inputs.value += toAppend;
                }
                break;
            default:
                if ("1234567890".includes(lastInput)) {
                    inputs.value += toAppend;
                } else if ("1234567890".includes(toAppend)) {
                    if ('%' != lastInput) {
                        inputs.value += toAppend;
                    }
                } else if (lastInput != " ") {
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
        if (lastInput != '%') {
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
            orderOfOperations(getInputs());
        }
    }
};


function getInputs() {
    let str = inputs.value;
    let allValues = str.split(" ");
}

// enable keyboard input
window.onkeypress = function (e) {
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
        if (lastInput != '%') {
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
            orderOfOperations(getInputs());
        }
    }
};


function getInputs() {
    let str = inputs.value;
    let allValues = str.split(" ");
    console.log(allValues);

    return allValues;
}

function orderOfOperations(values){
    let aCopy = values;
    let answer = 0;
    
    if(aCopy.length == 0){
        answer = 0;
    } else if(aCopy.length == 1){
        answer = Number(aCopy[0]);
    } else{
        // perform normal order of operations
        while(aCopy.length > 1){
            let multiplyDivide = false;
            let smallAnswer = 0;
            let indexToOperate = 0;

            // check for multiplication or division operators
            if(aCopy.includes("÷") || aCopy.includes("x")){
                multiplyDivide = true;   
            }
            
            // if array contains x or division operators, do those first, otherwise perform +/- operations
            for(let i = 1; i < aCopy.length; i += 2){
                if(multiplyDivide){
                    if(aCopy[i] == 'x' || aCopy[i] == '÷'){
                        smallAnswer = operate(Number(aCopy[i-1]), aCopy[i], Number(aCopy[i+1]));
                        indexToOperate = i;
                        break;
                    } 
                } else{
                    smallAnswer = operate(Number(aCopy[i-1]), aCopy[i], Number(aCopy[i+1]));
                    indexToOperate = i;
                    break;
                }
            }

            aCopy.splice(indexToOperate-1, 3, smallAnswer);
        }

        answer = Number(aCopy[0]);
    }

    return answer;
}


