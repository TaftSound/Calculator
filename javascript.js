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
// const zeroButton = document.getElementById('zero');
// const oneButton = document.getElementById('one');
// const twoButton = document.getElementById('two');
// const threeButton = document.getElementById('three');
// const fourButton = document.getElementById('four');
// const fiveButton = document.getElementById('five');
// const sixButton = document.getElementById('six');
// const sevenButton = document.getElementById('seven');
// const eightButton = document.getElementById('eight');
// const nineButton = document.getElementById('nine');
// const plusButton = document.getElementById('plus');
// const minusButton = document.getElementById('minus');
// const multiplyButton = document.getElementById('multiply');
// const divideButton = document.getElementById('divide');
// const invertNegativeButton = document.getElementById('invert');
// const percentageButton = document.getElementById('percent');
// const clearButton = document.getElementById('clear');
// const equalButton = document.getElementById('equal');

// zeroButton.addEventListener('click', () => { numberButton(operationObject, '0'); });
// oneButton.addEventListener('click', () => { numberButton(operationObject, '1'); });
// twoButton.addEventListener('click', () => { numberButton(operationObject, '2'); });
// threeButton.addEventListener('click', () => { numberButton(operationObject, '3'); });
// fourButton.addEventListener('click', () => { numberButton(operationObject, '4'); });
// fiveButton.addEventListener('click', () => { numberButton(operationObject, '5'); });
// sixButton.addEventListener('click', () => { numberButton(operationObject, '6'); });
// sevenButton.addEventListener('click', () => { numberButton(operationObject, '7'); });
// eightButton.addEventListener('click', () => { numberButton(operationObject, '8'); });
// nineButton.addEventListener('click', () => { numberButton(operationObject, '9'); });


// const operationObject = {
//     currentValue: null,
//     nextValue: null,
//     currentOperatorFunction: null,
// }

// function operateAndUpdateDisplay(object, operatorFunction, selectedOperator) {
//     if(selectedOperator === '=') {
//         object.currentOperatorFunction(object);
//         updateDisplay(object);
//         object.currentOperatorFunction = null;
//         object.nextValue = null;
//     }
//     else if(object.nextValue) {
//         object.currentOperatorFunction(object);
//         updateDisplay(object.currentValue);
//         updateOperatorFunction(object, operatorFunction);
//         object.nextValue = null;
//     }
//     else {
//         updateOperatorFunction(object, operatorFunction);
//     }
// }

// function updateOperatorFunction(object, operatorFunction) {
//     object.currentOperatorFunction = operatorFunction;
// }


// function add(object) {
//     object.currentValue += object.nextValue;
// }

// function multiply(object) {
//     object.currentValue *= object.nextValue;
// }

// function updateDisplay(value) {
//     let readout = document.getElementById('readout');
//     if (+value > 10000000000) {

//     }
//     readout.innerText = value;
// }

function makeNumberFitDisplay(number) {
    console.log(number.length);
    if (+number > 99999999999) {
        number = `${Math.round(+number)}`;
    }
    if (number.length > 11) {
        const scientificNotationObject = { power: 0 }
        if (+number > 99999999999) {
            while (+number >= 10) {
                number = `${+number / 10}`;
                ++scientificNotationObject.power;
            }
            number = `${Math.round(+number * 10) / 10}`
            return number + 'e' + scientificNotationObject.power;
        }
        else if (+number < .000000001) {
            while (+number < 1) {
                number = `${+number * 10}`;
                --scientificNotationObject.power;
            }
            number = `${Math.round(+number * 10) / 10}`
            return number + 'e' + scientificNotationObject.power;
        }
        else {
            while (number.length > 11) {
                number = number.substring(0, number.length -1);
            }
            return number;
        }
    }
}

// function allClearButton(object) {
//     updateDisplay('');
//     object.currentValue = null;
//     object.nextValue = null;
//     object.currentOperator = null;
// }

// function numberButton(object, number) {
//     if (!object.currentOperatorFunction) {
//         if (!object.currentValue) {
//             object.currentValue = '';
//         }
//         if (number !== '0' || object.currentValue) {
//             object.currentValue += number;
//             updateDisplay(object.currentValue);
//         }
//     }
//     else {
//         if (!object.nextValue) {
//             object.nextValue = '';
//         }
//         if (number !== '0' || object.nextValue) {
//             object.nextValue += number;
//             updateDisplay(object.nextValue);
//         }
//     }
// }

