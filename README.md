# Samsung-like Calculator App

A sleek and modern calculator application inspired by the Samsung Calculator. This project replicates the functionality and design of the Samsung Calculator, offering a user-friendly interface with advanced features like parentheses, percentage calculations, and error handling.

![Calculator Screenshot](calculator/calculator-screenshot.png)

## Features

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, and division.
- **Parentheses Support**: Easily manage complex calculations with nested parentheses.
- **Percentage Calculations**: Quickly calculate percentages with the dedicated `%` button.
- **Error Handling**: Displays error messages for invalid operations (e.g., division by zero).
- **Negative Numbers**: Toggle between positive and negative numbers using the `+/-` button.
- **Decimal Point**: Supports decimal calculations with the `.` button.
- **Clear and Delete**: Clear the entire display with `C` or delete the last character with `⌫`.
- **Responsive Design**: Fully responsive layout that works on both mobile and desktop screens.
- **Aesthetic Design**: Clean and modern UI with smooth animations and green accents.

## Functionality

- **Parentheses Logic**: Automatically handles opening and closing parentheses, ensuring balanced expressions.
- **Operator Precedence**: Follows standard mathematical rules for operator precedence (PEMDAS/BODMAS).
- **Real-time Display**: Shows the current calculation with a blinking green cursor.
- **Error Popup**: Displays a temporary error message for invalid operations (e.g., division by zero).
- **Color-coded Operators**: Operators (`+`, `-`, `×`, `÷`) are highlighted in green for better visibility.
- **Parentheses Highlighting**: The last pair of parentheses is highlighted in green for clarity.

## How to Use

1. **Basic Calculations**:
   - Enter numbers using the numeric buttons (`0-9`).
   - Use the operator buttons (`+`, `-`, `×`, `÷`) to perform calculations.
   - Press `=` to get the result.

2. **Parentheses**:
   - Use the `()` button to add parentheses for complex calculations.
   - The calculator automatically balances parentheses and highlights the last pair in green.

3. **Percentage Calculations**:
   - Enter a number and press `%` to calculate its percentage.
   - For example, `50 %` will display `0.5`.

4. **Negative Numbers**:
   - Use the `+/-` button to toggle between positive and negative numbers.

5. **Decimal Point**:
   - Use the `.` button to add decimal points for precise calculations.

6. **Clear and Delete**:
   - Press `C` to clear the entire display.
   - Press `⌫` to delete the last character.

7. **Error Handling**:
   - If an invalid operation is performed (e.g., division by zero), an error message will pop up temporarily.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ayoubchemli/samsung-calculator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd samsung-calculator
   ```

3. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

## Technologies Used

- **HTML5**: For structuring the calculator interface.
- **CSS3**: For styling and animations, including the green cursor and operator highlighting.
- **JavaScript**: For handling calculations, parentheses logic, and error handling.

## Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Enjoy calculating with this Samsung-inspired calculator! 🚀
