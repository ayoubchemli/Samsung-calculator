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

    // Handle numbers after percentage
    if (isNumber(text) && lastChar === '%') {
        displayScreen.innerHTML = currentDisplay + '×' + text + cursor.outerHTML;
        return;
    }

    // Condition 1: Cannot start with an operator
    if (currentDisplay === '' && isOperator(text)) {
        return; // Do nothing if trying to add an operator at the beginning
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
        // Get current display text without the cursor
        const currentDisplay = displayScreen.innerText.replace('|', '');
        
        // If display is empty, add "(-" and increment counter
        if (currentDisplay === '') {
            // Add "(-" if the display is empty
            displayScreen.innerHTML = '(-' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        const lastChar = currentDisplay[currentDisplay.length - 1];
        const segments = currentDisplay.split(/(?=[\+\-\×÷\(\)])/);
        const lastSegment = segments[segments.length - 1];

        // Case 1: If "(-" exists at the end, remove it
        if (currentDisplay.endsWith('(-')) {
            displayScreen.innerHTML = currentDisplay.slice(0, -2) + cursor.outerHTML;
            openParenthesesCount--;
            totalOpenParenthesesCount--;
            return;
        }

        // Case 2: If last segment starts with "(-", remove it
        if (lastSegment.startsWith('(-')) {
            segments[segments.length - 1] = lastSegment.slice(2);
            displayScreen.innerHTML = segments.join('') + cursor.outerHTML;
            openParenthesesCount--;
            totalOpenParenthesesCount--;
            return;
        }

        // Case 3: Simple number negation - add "(-"
        if (/^-?\d+\.?\d*$/.test(lastSegment)) {
            segments[segments.length - 1] = '(-' + lastSegment;
            displayScreen.innerHTML = segments.join('') + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        // Case 4: After an operator, add negative sign
        if (isOperator(lastChar)) {
            displayScreen.innerHTML = currentDisplay + '(-' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        // Case 5: After a closing parenthesis, add multiplication by negative
        if (lastChar === ')') {
            displayScreen.innerHTML = currentDisplay + '×(-' + cursor.outerHTML;
            openParenthesesCount++;
            totalOpenParenthesesCount++;
            return;
        }

        // Case 6: Default case - do nothing
        return;

        /*
            when a number start with a (- sign, it means that the number is negative, and if the user click on the +/- button again, it should remove the (- sign and make the number positive again. not add another "(-".
            when a number at the last segment is positiv without a sign, and the user click on the +/- button, it should add a (- sign after the last operator (before the number).
            when an arethmetic operation like ((88+6 is done and the user click on the +/- button, it should add a (- sign after the last "(" opened (before the operation) so it would be (((-88+6. and if pressed again, it should remove the (- sign and make it positive again "((88+6".
        */
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


// Select all calculator buttons with classes 'num' or 'op' only
const buttons = document.querySelectorAll('#buttons .num, #buttons .op, #buttons .action, #buttons #fassila');

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


