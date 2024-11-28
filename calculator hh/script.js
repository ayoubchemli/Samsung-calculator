// Select the display element and the cursor
const displayScreen = document.getElementById('display-screen');
const cursor = document.getElementById('cursor');

// Variable to count unclosed opening parentheses
let openParenthesesCount = 0;
let totalOpenParenthesesCount = 0;
let totalCloseParenthesesCount = 0;


// Function to update the display with button's text
function updateDisplay(text) {
    // Check if the last character is an operator
    const isOperator = (char) => ['+', '-', '×', '÷'].includes(char);
    
    // Check if the input text is a decimal point
    const isFassila = (char) => char === '.';

    // Check if the char is a percentage
    const isPercentage = (char) => char === '%';
    
    // Check if the char is a number
    const isNumber = (char) => /[0-9]/.test(char);
    
    // Get current display text without the cursor
    const currentDisplay = displayScreen.innerText.replace('|', '');
    const lastChar = currentDisplay[currentDisplay.length - 1];


    // Handle percentage button logic
    if (text === '%') {
        // Cannot add percentage if display is empty
        if (currentDisplay === '') return;

        // Cannot add percentage after operators, opening parenthesis, or another percentage
        if (isOperator(lastChar) || lastChar === '(' || lastChar === '%') return;

        // Can only add after numbers or decimal point
        if (!isNumber(lastChar) && lastChar !== '.') return;

        // Check if there's already a percentage in the current segment
        const segments = currentDisplay.split(/[\+\-\×÷]/);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment.includes('%')) return;

        // If all conditions pass, add the percentage
        displayScreen.innerHTML = currentDisplay + text + cursor.outerHTML;
        return;
    }

    // Handle numbers or zero after percentage
    if ((isNumber(text) || text === '0') && lastChar === '%') {
        displayScreen.innerHTML = currentDisplay + '×' + text + cursor.outerHTML;
        return;
    }


    if (text === '0') {


        const segments = currentDisplay.split(/[\+\-\×÷]/); // Split by operators
        const lastSegment = segments[segments.length - 1];

        // Case 1: If there's at least one number (1-9) in the display, allow multiple zeros
        if (/[1-9]/.test(lastSegment)) {
            displayScreen.innerHTML = currentDisplay + text + cursor.outerHTML;
            return;
        }

        // Case 2: If pressed after an operator, allow one zero
        if (isOperator(lastChar)) {
            displayScreen.innerHTML = currentDisplay + text + cursor.outerHTML;
            return;
        }

        // Case 3: If there is a decimal point in the current segment, allow multiple zeros
        if (lastSegment.includes('.')) {
            displayScreen.innerHTML = currentDisplay + text + cursor.outerHTML;
            return;
        }

        // Case 4: If there's only a single zero (no numbers before it), ignore additional zeros
        if (lastSegment === '0' || (lastChar === '0' && !/[1-9]/.test(lastSegment))) {
            return;
        }
    }


    if (isNumber(text)) {
        const segments = currentDisplay.split(/[\+\-\×÷]/); // Split by operators
        const lastSegment = segments[segments.length - 1];
        // Case 5: Replace a single leading zero with the number
        if (lastSegment === '0') {
            displayScreen.innerHTML = currentDisplay.slice( 0 , -1 )+ text + cursor.outerHTML;
            return;
        }
    }
   

    // Condition 1: Cannot start with an operator
    if (currentDisplay === '' && isOperator(text)) {
        return; // Do nothing if trying to add an operator at the beginning
    }

    // condition : Cannot start with an operator after a parentheses
    if (currentDisplay[currentDisplay.length - 1] === '(' && isOperator(text)) {
        return; // Do nothing if trying to add an operator after a parentheses
    }

    // Condition 2: If the last character is an operator, replace it with the new operator
    if (isOperator(currentDisplay[currentDisplay.length - 1]) && isOperator(text)) {
        displayScreen.innerHTML = currentDisplay.slice(0, -1) + text + cursor.outerHTML;
        return;
    }

    // Conditions for Decimal point (Fassila)
    if (isFassila(text)) {
        const segments = currentDisplay.split(/[\+\-\×÷]/);
        const lastSegment = segments[segments.length - 1];

        if (lastSegment.includes('.')) return;

        if (currentDisplay === '' || isOperator(currentDisplay[currentDisplay.length - 1])) {
            displayScreen.innerHTML = currentDisplay + '0.' + cursor.outerHTML;
            return;
        }
    }

    // Conditions for Parentheses
    if (text === '()') {
        const lastChar = currentDisplay[currentDisplay.length - 1];

        // 1. If it's pressed at the start, after an operator, or after '(', print '(' and increment counter
        if (currentDisplay === '' || isOperator(lastChar) || lastChar === '(') {
            displayScreen.innerHTML = currentDisplay + '(' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }
        
        // 2. If pressed after a number and there are unclosed parentheses, print ')' and decrement counter
        if (/[0-9]/.test(lastChar) && openParenthesesCount > 0) {
            displayScreen.innerHTML = currentDisplay + ')' + cursor.outerHTML;
            openParenthesesCount--;
            totalCloseParenthesesCount++;
            changeParenthesisColor(displayScreen.innerHTML); // Change parentheses color
            return;
        }

        // 3. If pressed after a closing parenthesis and there are unclosed parentheses, print ')' and decrement counter
        if (lastChar === ')' && openParenthesesCount > 0) {
            displayScreen.innerHTML = currentDisplay + ')' + cursor.outerHTML;
            openParenthesesCount--;
            totalCloseParenthesesCount++;
            changeParenthesisColor(displayScreen.innerHTML); // Change parentheses color
            return;
        }

        // 4. If pressed after a number and there are no unclosed parentheses, print '×(' and increment counter
        if (/[0-9]/.test(lastChar) && openParenthesesCount === 0) {
            displayScreen.innerHTML = currentDisplay + '×(' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        // 5. If pressed after a closing parenthesis and no unclosed parentheses, print '×(' and increment counter
        if (lastChar === ')' && openParenthesesCount === 0) {
            displayScreen.innerHTML = currentDisplay + '×(' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        // 6. If pressed after a '%'), print '×(' and increment counter
        if (lastChar === '%') {
            displayScreen.innerHTML = currentDisplay + '×(' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }
    }

    // Handle multiplication when a number follows a closing parenthesis
    if (/[0-9]/.test(text) && currentDisplay[currentDisplay.length - 1] === ')') {
        displayScreen.innerHTML = currentDisplay + '×' + text + cursor.outerHTML;
        return;
    }

    
    
    // +/- button logic
    if (text === '+/-') {
        // Get the current display text without the cursor
        const currentDisplay = displayScreen.innerText.replace('|', '');

        // If display is empty, add "(-" and increment the counter
        if (currentDisplay === '') {
            displayScreen.innerHTML = '(-' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        const lastChar = currentDisplay[currentDisplay.length - 1];

        // Split the display into segments based on operators and parentheses
        const segments = [];
        let currentSegment = '';
        for (let i = 0; i < currentDisplay.length; i++) {
            const char = currentDisplay[i];
            if ('+-×÷()'.includes(char)) {
                if (currentSegment) {
                    segments.push(currentSegment);
                    currentSegment = '';
                }
                segments.push(char);
            } else {
                currentSegment += char;
            }
        }
        if (currentSegment) {
            segments.push(currentSegment);
        }

        const lastSegment = segments[segments.length - 1];
        const beforeLastSegment = segments[segments.length - 2];
        const beforeBeforeLastSegment = segments[segments.length - 3];

        // Case 6: After a closing parenthesis, add multiplication by a negative sign
        if (lastChar === ')') {
            displayScreen.innerHTML = currentDisplay + '×(-' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        // Case 1: If "(-" exists at the end, remove it
        if (currentDisplay.endsWith('(-')) {
            displayScreen.innerHTML = currentDisplay.slice(0, -2) + cursor.outerHTML;
            openParenthesesCount--;
            totalOpenParenthesesCount--;
            return;
        }

        // Case 2: If the last segment starts with "(-", remove it
        if (
            beforeLastSegment === '-' &&
            beforeBeforeLastSegment === '(' &&
            /^[0-9]+$/.test(lastSegment)
        ) {
            segments.splice(-3, 2);
            displayScreen.innerHTML = segments.join('') + cursor.outerHTML;
            openParenthesesCount--;
            totalOpenParenthesesCount--;
            return;
        }

        // Case 3: After an operator, add a negative sign
        if (isOperator(lastChar)) {
            displayScreen.innerHTML = currentDisplay + '(-' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        // Case 4: Handle numbers by adding "(-" after the last operator
        const isNumber = /^[+-]?\d+(\.\d+)?$/.test(lastSegment);
        if (isNumber) {
            const operatorIndex = segments.findLastIndex(seg =>
                ['+', '-', '×', '÷', '('].includes(seg)
            );

            if (operatorIndex !== -1) {
                // Insert "(-" after the last operator
                segments.splice(operatorIndex + 1, 0, '(-');
            } else {
                // If no operator is found, add at the beginning
                segments.unshift('(-');
            }

            displayScreen.innerHTML = segments.join('') + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        // Case 5: Handle complex parenthetical expressions
        const openParenCount = (currentDisplay.match(/\(/g) || []).length;
        const closeParenCount = (currentDisplay.match(/\)/g) || []).length;

        if (openParenCount > closeParenCount) {
            const lastOpenParenIndex = currentDisplay.lastIndexOf('(');

            if (lastOpenParenIndex !== -1) {
                if (currentDisplay.slice(lastOpenParenIndex + 1).includes('-')) {
                    // Remove the "(-" from the last unclosed parenthesis segment
                    segments.splice(lastOpenParenIndex, 2);
                    displayScreen.innerHTML = segments.join('') + cursor.outerHTML;
                    openParenthesesCount--;
                    totalOpenParenthesesCount--;
                } else {
                    // Add "(-" after the last unclosed parenthesis
                    const newDisplay =
                        currentDisplay.slice(0, lastOpenParenIndex + 1) +
                        '(-' +
                        currentDisplay.slice(lastOpenParenIndex + 1);
                    displayScreen.innerHTML = newDisplay + cursor.outerHTML;
                    openParenthesesCount++;
                    totalOpenParenthesesCount++;
                }
                return;
            }
        }

        
    }

    // Handle "=" for evaluation
    if (text === '=') {
        // Get the current display content without the cursor
        const currentDisplay = displayScreen.innerText.replace('|', '');
        
        // If the display is empty or ends with an operator, ignore the "=" press
        const isOperator = (char) => ['+', '-', '×', '÷'].includes(char);
        const lastChar = currentDisplay[currentDisplay.length - 1];
        if (currentDisplay === '' || isOperator(lastChar) || lastChar === '(' || lastChar === '.') {
            return;
        }

        // Replace display operators with JavaScript-compatible ones
        let expression = currentDisplay
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/%/g, '/100');

        // Handle parentheses mismatch (auto-close any unclosed opening parentheses)
        const openParenthesesCount = (expression.match(/\(/g) || []).length;
        const closeParenthesesCount = (expression.match(/\)/g) || []).length;
        if (openParenthesesCount > closeParenthesesCount) {
            expression += ')'.repeat(openParenthesesCount - closeParenthesesCount);
        }

        try {
            // Evaluate the expression
            const result = eval(expression);

            // Display the result with cursor
            displayScreen.innerHTML = result + cursor.outerHTML;
        } catch (error) {
            // If the expression is invalid, show an error
            displayScreen.innerHTML = 'Error' + cursor.outerHTML;
        }
        return;
    }


    
    
    

    // Append new text to the display
    displayScreen.innerHTML = currentDisplay + text + cursor.outerHTML;
}

let parenthesesStack = [];

function changeParenthesisColor(display) {
    // Get display content without cursor
    let displayContent = displayScreen.innerText.replace('|', '');
    
    // Reset all coloring first
    let stack = [];
    let lastMatchedPair = null;
    
    // Scan through the display content
    for (let i = 0; i < displayContent.length; i++) {
        if (displayContent[i] === '(') {
            stack.push(i);
        } else if (displayContent[i] === ')' && stack.length > 0) {
            let openIndex = stack.pop();
            // Keep track of only the last matched pair
            lastMatchedPair = {
                open: openIndex,
                close: i
            };
        }
    }
    
    // If we have a matched pair, color it
    if (lastMatchedPair) {
        let newDisplay = '';
        for (let i = 0; i < displayContent.length; i++) {
            if (i === lastMatchedPair.open || i === lastMatchedPair.close) {
                newDisplay += `<span class="green-parenthesis">${displayContent[i]}</span>`;
            } else {
                newDisplay += displayContent[i];
            }
        }
        displayScreen.innerHTML = newDisplay + cursor.outerHTML;
    } else {
        // If no complete pairs, restore without coloring
        displayScreen.innerHTML = displayContent + cursor.outerHTML;
    }
}


// Select all calculator buttons with classes 
const buttons = document.querySelectorAll('#buttons .num, #buttons .op, #buttons .action');

// Add event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Call updateDisplay with the button's text
        updateDisplay(button.innerText);
    });
});

// Clear display when "C" button is clicked
document.getElementById('delete').addEventListener('click', () => {
    displayScreen.innerHTML = cursor.outerHTML; // Reset display with only the cursor
    openParenthesesCount = 0; // Reset open parentheses count
    totalOpenParenthesesCount = 0; // Reset total open parentheses count
    totalCloseParenthesesCount = 0; // Reset total close parentheses count
});

// Function to reset the color of parentheses to black
function resetParenthesisColor() {
    displayScreen.innerHTML = displayScreen.innerText; // Resetting back to plain text
}


