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


let operationObject = {
    currentValue: null,
    nextValue: null,
    currentOperatorFunction: null,
}

function operateAndUpdateDisplay(object, operatorFunction, selectedOperator) {
    if(selectedOperator === '=') {
        object.currentOperatorFunction(object);
        updateDisplay(object);
        object.currentOperatorFunction = null;
        object.nextValue = null;
    }
    else if(object.nextValue) {
        object.currentOperatorFunction(object);
        updateDisplay(object.currentValue);
        updateOperatorFunction(object, operatorFunction);
        object.nextValue = null;
    }
    else {
        updateOperatorFunction(object, operatorFunction);
    }
}

function updateOperatorFunction(object, operatorFunction) {
    object.currentOperatorFunction = operatorFunction;
}


function add(object) {
    object.currentValue += object.nextValue;
}

function multiply(object) {
    object.currentValue *= object.nextValue;
}

function updateDisplay(object) {
    let readout = document.getElementById('readout');
    readout.innerText = object.currentValue;
}

function allClearButton(object) {
    updateDisplay('');
    object.currentValue = null;
    object.nextValue = null;
    object.currentOperator = null;
}

updateDisplay(operationObject.currentValue);

