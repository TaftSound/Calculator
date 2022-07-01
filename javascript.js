// Need a placeholder for currentValue
// Need a placeholder for nextValue
// Need checks in place to know whether to store a number in currentValue or nextValue
// If no operator has been selected, store new number entry in currentValue,
    // else store in nextValue
// Need a placeholder for current operator
// What do you do if an operator has already been entered?
    // if last keypress was also an operator, switch current operator
// create a container to store/execute the currentOperation
    // when equal key is pressed, perform currentOperation, then store the resulting
    // value in the currentValue variable, then empty the currentOperation container,
    // the currentOperator container, and the nextValue container
// when AC button is pressed, the display and all variable should be emptied
// when the -/+ button is pressed

// When inputting numbers and displaying results, have an if statement that checks
// length and rounds numbers or uses scientific notation
const decimalButton = document.getElementById('decimal');
const zeroButton = document.getElementById('zero');
const oneButton = document.getElementById('one');
const twoButton = document.getElementById('two');
const threeButton = document.getElementById('three');
const fourButton = document.getElementById('four');
const fiveButton = document.getElementById('five');
const sixButton = document.getElementById('six');
const sevenButton = document.getElementById('seven');
const eightButton = document.getElementById('eight');
const nineButton = document.getElementById('nine');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const invertNegativeButton = document.getElementById('invert');
const percentageButton = document.getElementById('percent');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');

decimalButton.addEventListener('click', () => { numberButton(operationObject, '.'); });
zeroButton.addEventListener('click', () => { numberButton(operationObject, '0'); });
oneButton.addEventListener('click', () => { numberButton(operationObject, '1'); });
twoButton.addEventListener('click', () => { numberButton(operationObject, '2'); });
threeButton.addEventListener('click', () => { numberButton(operationObject, '3'); });
fourButton.addEventListener('click', () => { numberButton(operationObject, '4'); });
fiveButton.addEventListener('click', () => { numberButton(operationObject, '5'); });
sixButton.addEventListener('click', () => { numberButton(operationObject, '6'); });
sevenButton.addEventListener('click', () => { numberButton(operationObject, '7'); });
eightButton.addEventListener('click', () => { numberButton(operationObject, '8'); });
nineButton.addEventListener('click', () => { numberButton(operationObject, '9'); });
invertNegativeButton.addEventListener('click', () => { numberButton(operationObject, '+/-'); });

clearButton.addEventListener('click', () => { allClearButton(operationObject); });
plusButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '+', add); });
minusButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '-', subtract); });
divideButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '/', divide); });
multiplyButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '*', multiply); });
percentageButton.addEventListener('click', () => { percentage(operationObject); });
equalButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '='); });


const operationObject = {
    currentValue: '0',
    nextValue: '0',
    currentOperatorFunction: null,
    equalsPressed: false,
    operationRun: false,
    decimalAvailable: true,
    toggleNegative: false,
}

updateDisplay(operationObject.currentValue);

function operateAndUpdateDisplay(object, selectedOperator, operatorFunction = null) {
    if(object.nextValue) {
        if(selectedOperator === '=') {
            if (!object.currentOperatorFunction) {
                return;
            }
            if (object.nextValue == 0) {
                return;
            }
            object.currentOperatorFunction(object);
            updateDisplay(object.currentValue);
            object.operationRun = true;
            object.equalsPressed = true;
            object.decimalAvailable = true;
            object.toggleNegative = false;
            return;
        }
        else {
            if (object.currentOperatorFunction && !object.equalsPressed) {
                object.currentOperatorFunction(object);
                object.equalsPressed = true
            }
            updateDisplay(object.currentValue);
            updateOperatorFunction(object, operatorFunction);
            object.operationRun = false;
            object.equalsPressed = false;
            object.decimalAvailable = true;
            object.toggleNegative = false;
            object.nextValue = '0';
        }
    }
    else {
        if (selectedOperator === '=') { return }
        updateOperatorFunction(object, operatorFunction);
        object.operationRun = false;
        object.equalsPressed = false;
        object.decimalAvailable = true;
        object.toggleNegative = false;
    }
}

function updateOperatorFunction(object, operatorFunction) {
    object.currentOperatorFunction = operatorFunction;
}


function add(object) {
    object.currentValue = `${+object.currentValue + +object.nextValue}`;
}

function subtract(object) {
    object.currentValue = `${+object.currentValue - +object.nextValue}`;
}

function multiply(object) {
    object.currentValue = `${+object.currentValue * +object.nextValue}`;
}

function divide(object) {
    object.currentValue = `${+object.currentValue / +object.nextValue}`;
}

function percentage(object) {
    if (object.operationRun) {
        return;
    }
    if (object.nextValue == 0) {
        object.currentValue = `${+object.currentValue / 100}`;
        updateDisplay(object.currentValue);
    }
    else {
        object.nextValue = `${+object.nextValue / 100}`;
        updateDisplay(object.nextValue);
    }
}

function updateDisplay(value) {
    let readout = document.getElementById('readout');
    value = makeNumberFitDisplay(value);
    readout.innerText = value;
}

function toScientificNotation(x, f) {
    let newNumber = Number.parseFloat(x).toExponential(f);
    return newNumber;
}

function makeNumberFitDisplay(number) {
    console.log(Math.abs(number));
    if (number.length > 11) {
        if (Math.abs(number) < 1e-99 && number < 0) {
            console.log('works');
            number = toScientificNotation(number, 4);
            return number;
        }
        if (Math.abs(number) >= 1e100 || number < 0) {
            number = toScientificNotation(number, 5);
            return number;
        }
        number = toScientificNotation(number, 6);
    }
    return number;
}

function allClearButton(object) {
    updateDisplay('0');
    object.currentValue = '0';
    object.nextValue = '0';
    object.currentOperatorFunction = null;
    object.operationRun = false;
    object.equalsPressed = false;
    object.decimalAvailable = true;
    object.toggleNegative = false;
}

function numberButton(object, number) {
    if (object.operationRun) {
        allClearButton(operationObject);
    }
    if (!object.currentOperatorFunction) {
        if (number === '+/-') { 
            if (object.currentValue == 0) {
                if (!object.toggleNegative) {
                    object.toggleNegative = true;
                    object.currentValue = '-' + object.currentValue;
                    updateDisplay(object.currentValue);
                    return;
                }
                if (object.toggleNegative) {
                    object.toggleNegative = false;
                    object.currentValue = object.currentValue.substring(1);
                    updateDisplay(object.currentValue);
                    return;
                }
            } 
            else {
                object.currentValue = -object.currentValue;
                updateDisplay(object.currentValue);
            }
            return;
        }
        if (number !== '0' || object.currentValue !== '0') {
            if (number === '.') {
                if (object.decimalAvailable) {
                    object.decimalAvailable = false;
                    object.currentValue += number;
                    updateDisplay(object.currentValue);
                    return;
                }
                else return;
            }
            if (object.currentValue == 0) {
                if (object.currentValue === '-0' || object.currentValue === '0') {
                    object.currentValue = object.currentValue.substring(0, object.currentValue.length -1);
                }
            }
            object.currentValue += number;
            updateDisplay(object.currentValue);
        }
    }
    else {
        if (number === '+/-') { 
            if (object.nextValue == 0) {
                if (!object.toggleNegative) {
                    object.toggleNegative = true;
                    object.nextValue = '-' + object.nextValue;
                    updateDisplay(object.nextValue);
                    return;
                }
                if (object.toggleNegative) {
                    object.toggleNegative = false;
                    object.nextValue = object.nextValue.substring(1);
                    updateDisplay(object.nextValue);
                    return;
                }
            } 
            else {
                object.nextValue = -object.nextValue;
                updateDisplay(object.nextValue);
            }
            return;
        }
        if (number !== '0' || object.nextValue !== '0') {
            if (number === '.') {
                if (object.decimalAvailable) {
                    object.decimalAvailable = false;
                    object.nextValue += number;
                    updateDisplay(object.nextValue);
                    return;
                }
                else return;
            }
            if (object.nextValue == 0) {
                if (object.nextValue === '-0' || object.nextValue === '0') {
                    object.nextValue = object.nextValue.substring(0, object.nextValue.length -1);
                }
            }
            object.nextValue += number;
            updateDisplay(object.nextValue);
        }
    }
}

