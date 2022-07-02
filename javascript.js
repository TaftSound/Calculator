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

zeroButton.addEventListener('click', () => { numberButton('0'); });
oneButton.addEventListener('click', () => { numberButton('1'); });
twoButton.addEventListener('click', () => { numberButton('2'); });
threeButton.addEventListener('click', () => { numberButton('3'); });
fourButton.addEventListener('click', () => { numberButton('4'); });
fiveButton.addEventListener('click', () => { numberButton('5'); });
sixButton.addEventListener('click', () => { numberButton('6'); });
sevenButton.addEventListener('click', () => { numberButton('7'); });
eightButton.addEventListener('click', () => { numberButton('8'); });
nineButton.addEventListener('click', () => { numberButton('9'); });

decimalButton.addEventListener('click', () => { addDecimal(); });
invertNegativeButton.addEventListener('click', () => { invertValue(); });
clearButton.addEventListener('click', () => { allClearButton(operationObject); });
plusButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '+', add); });
minusButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '-', subtract); });
divideButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '/', divide); });
multiplyButton.addEventListener('click', () => { operateAndUpdateDisplay(operationObject, '*', multiply); });
percentageButton.addEventListener('click', () => { percentage(); });
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

function percentage() {
    if (operationObject.operationRun) { return; }
    let valueKey = getValueKey();
        operationObject[valueKey] = `${+operationObject[valueKey] / 100}`;
        updateDisplay(operationObject[valueKey]);
}

function updateDisplay(value) {
    let readout = document.getElementById('readout');
    value = makeNumberFitDisplay(value);
    readout.innerText = value;
}

function makeNumberFitDisplay(number) {
    if (number.length > 11) {
        if (Math.abs(number) < 1e-99 && number < 0) {
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
    function toScientificNotation(x, f) {
        let newNumber = Number.parseFloat(x).toExponential(f);
        return newNumber;
    }
}

function getValueKey() {
    if (!operationObject.currentOperatorFunction) { return 'currentValue'; }
    else { return 'nextValue'; }
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

function addDecimal() {
    if (operationObject.operationRun) { allClearButton(operationObject) }
    let valueKey = getValueKey();
    if (operationObject.decimalAvailable) {
        operationObject.decimalAvailable = false;
        operationObject[valueKey] += '.';
        updateDisplay(operationObject[valueKey]);
    }
}

function invertValue() {
    if (operationObject.operationRun) { allClearButton(operationObject) }
    let valueKey = getValueKey();
    operationObject[valueKey];
    if (operationObject[valueKey] === '0'
        || operationObject[valueKey] === '0.' 
        || operationObject[valueKey] > 0) {
            makeNegative();
        }
    else { makePositive(); }
        
    function makeNegative() {
        operationObject[valueKey] = '-' + operationObject[valueKey];
        updateDisplay(operationObject[valueKey]);
    }
    function makePositive(object) {
        operationObject[valueKey] = operationObject[valueKey].substring(1);
        updateDisplay(operationObject[valueKey]);
    }
}

function numberButton(number) {
    if (operationObject.operationRun) { allClearButton(operationObject); }
    let valueKey = getValueKey();
    // if (!object.currentOperatorFunction) {
        if (number !== '0' || operationObject[valueKey] !== '0') {
            if (operationObject[valueKey] == 0) {
                if (operationObject[valueKey] === '-0' || operationObject[valueKey] === '0') {
                    operationObject[valueKey] = operationObject[valueKey].substring(0, operationObject[valueKey].length -1);
                }
            }
            operationObject[valueKey] += number;
            updateDisplay(operationObject[valueKey]);
        }
    // }
    // else {
    //     if (number !== '0' || object.nextValue !== '0') {
    //         if (object.nextValue == 0) {
    //             if (object.nextValue === '-0' || object.nextValue === '0') {
    //                 object.nextValue = object.nextValue.substring(0, object.nextValue.length -1);
    //             }
    //         }
    //         object.nextValue += number;
    //         updateDisplay(object.nextValue);
    //     }
    // }
}

