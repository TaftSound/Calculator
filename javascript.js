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
clearButton.addEventListener('click', () => { allClearButton(); });
plusButton.addEventListener('click', () => { operateAndUpdateDisplay(add); });
minusButton.addEventListener('click', () => { operateAndUpdateDisplay(subtract); });
divideButton.addEventListener('click', () => { operateAndUpdateDisplay(divide); });
multiplyButton.addEventListener('click', () => { operateAndUpdateDisplay(multiply); });
percentageButton.addEventListener('click', () => { percentage(); });
equalButton.addEventListener('click', () => { equals(); });


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

function operateAndUpdateDisplay(operatorFunction) {
    if (operationObject.currentOperatorFunction && !operationObject.equalsPressed) {
        operationObject.currentOperatorFunction(operationObject);
        updateDisplay(operationObject.currentValue);
    }
    updateOperatorFunction(operatorFunction);
    operationObject.operationRun = false;
    operationObject.equalsPressed = false;
    operationObject.decimalAvailable = true;
    operationObject.toggleNegative = false;
    operationObject.nextValue = '0';

    function updateOperatorFunction(operatorFunction) {
        operationObject.currentOperatorFunction = operatorFunction;
    }
}

function numberButton(number) {
    if (operationObject.operationRun) { allClearButton(); }
    let valueKey = getValueKey();
        if (number !== '0' || operationObject[valueKey] !== '0') {
            if (operationObject[valueKey] == 0) {
                if (operationObject[valueKey] === '-0' || operationObject[valueKey] === '0') {
                    operationObject[valueKey] = operationObject[valueKey].substring(0, operationObject[valueKey].length -1);
                }
            }
            operationObject[valueKey] += number;
            updateDisplay(operationObject[valueKey]);
        }
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

function addDecimal() {
    if (operationObject.operationRun) { allClearButton(); }
    let valueKey = getValueKey();
    if (operationObject.decimalAvailable) {
        operationObject.decimalAvailable = false;
        operationObject[valueKey] += '.';
        updateDisplay(operationObject[valueKey]);
    }
}

function invertValue() {
    if (operationObject.operationRun) { allClearButton(); }
    let valueKey = getValueKey();
    operationObject[valueKey];
    if (operationObject[valueKey] === '0'
        || operationObject[valueKey] === '0.' 
        || operationObject[valueKey] > 0) { makeNegative(); }
    else { makePositive(); }
    updateDisplay(operationObject[valueKey]);
        
    function makeNegative() { operationObject[valueKey] = '-' + operationObject[valueKey]; }
    function makePositive() { operationObject[valueKey] = operationObject[valueKey].substring(1); }
}

function equals() {
    let valueKey = getValueKey();
    if (valueKey === 'currentValue') { return; }
    else {
        operationObject.currentOperatorFunction(operationObject);
        updateDisplay(operationObject.currentValue);
        operationObject.operationRun = true;
        operationObject.equalsPressed = true;
        operationObject.decimalAvailable = true;
    }
}

function allClearButton() {
    updateDisplay('0');
    operationObject.currentValue = '0';
    operationObject.nextValue = '0';
    operationObject.currentOperatorFunction = null;
    operationObject.operationRun = false;
    operationObject.equalsPressed = false;
    operationObject.decimalAvailable = true;
}

function updateDisplay(value) {
    let readout = document.getElementById('readout');
    value = makeNumberFitDisplay(value);
    readout.innerText = value;
}

function makeNumberFitDisplay(number) {
    if (!((number % 1) === 0) && Math.abs(number) > .0000000001) {
        number = Math.round(number * 10000000000) / 10000000000;
    }
    if (number.length > 11) {
        if (Math.abs(number) < 1e-99 && number < 0) {
            number = toScientificNotation(number, 4);
        }
        else if (Math.abs(number) >= 1e100 || number < 0) {
            number = toScientificNotation(number, 5);
        }
        else { number = toScientificNotation(number, 6); }
        console.log(number);
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

