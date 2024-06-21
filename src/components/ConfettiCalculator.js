import React, { useState } from "react";
import InputBar from "./InputBar";
import Button from "./Button";
import "./Calculator.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");  //initially the value is set to 0 in the input bar.
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [isWaitingForSecondOperand, setIsWaitingForSecondOperand] = useState(false);



  const handleButtonClick = (label) => {
    if (["+", "-", "*", "÷"].includes(label)) {
      handleOperatorClick(label);
      return;
    }

    //checking the value of label and accordingly calling the functions.
    switch (label) {
      case "C":
        clearDisplay();
        break;
      case "=":
        handleEqualClick();
        break;
      case "+/-":
        toggleSign();
        break;
      case "%":
        calculatePercentage();
        break;
      case ".":
        appendDecimal();
        break;
      case "x!":
        handleFactorial();
        break;
      case "EE":
        handleEEClick();
        break;

      case "sin":
      case "cos":
      case "tan":
      case "sinh":
      case "cosh":
      case "tanh":
      case "ln":
      case "log10":
      case "x^2":
      case "x^3":
      case "x^y":
      case "e^x":
      case "10^x":
      case "2√x":
      case "3√x":
      case "y√x":
      case "π":
        handleSpecialFunctionClick(label);
        break;
      default:
        appendDigitOrSymbol(label);
        break;
    }
  };

  // Function to calculate percentage.
  const calculatePercentage = () => {
    const currentInput = parseFloat(displayValue);
    const result = currentInput / 100;
    setDisplayValue(result.toString());
  };

  const handleEEClick = () => {
    // Add the "EE" notation to the display value
    setDisplayValue((prev) => prev + "EE");
  };

  const handleOperatorClick = (nextOperator) => {
    const currentInput = parseFloat(displayValue);

    // Handle different operators using a switch statement.
    switch (nextOperator) {
      case "+":
      case "-":
      case "*":

        // If an operator is already set and we're waiting for the second operand,
        // update the operator and exit the function.
        if (operator && isWaitingForSecondOperand) {
          setOperator(nextOperator);
          return;
        }

        // If the first operand is not set, set it to the current input.
        if (firstOperand === null) {
          setFirstOperand(currentInput);
        }

        // If there is an operator, perform the calculation using the first operand,
        // the operator, and the current input.
        else if (operator) {
          const result = performCalculation(operator, firstOperand, currentInput);
          setDisplayValue(result.toString());
          setFirstOperand(result);
        }

        setOperator(nextOperator);
        setIsWaitingForSecondOperand(true);
        break;

      case "÷":
        handleDivideClick();    // Handle division-specific logic in a separate function.
        break;

      default:
        break;
    }
  };

  // Handles the click event for the equal ("=") button.
  const handleEqualClick = () => {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(displayValue);
      const result = performCalculation(operator, firstOperand, secondOperand);
      setDisplayValue(result.toString());
      setFirstOperand(result);
      setOperator(null);
      setIsWaitingForSecondOperand(false);
    }
  };

  // Performs mathematical calculation based on the given operator and two numbers.
  const performCalculation = (op, num1, num2) => {
    // Use a switch statement to handle different operators.
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "÷":
        return num1 / num2;
      default:
        return num2;
    }
  };

  // Clears the calculator display and resets all stored values. Set the dispaly value to 0.
  const clearDisplay = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstOperand(null);
    setIsWaitingForSecondOperand(false);
  };


  //toggle function to change the sign.
  const toggleSign = () => {
    setDisplayValue((prev) => (prev.charAt(0) === "-" ? prev.slice(1) : `-${prev}`));
  };

  const appendDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  //function to calculate the factorial of the given value.
  const handleFactorial = () => {
    const number = parseFloat(displayValue);
    if (number < 0) {
      setDisplayValue("Error");
      return;
    }
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    setDisplayValue(result.toString());
    setIsWaitingForSecondOperand(true);
  };

  //handling trignometric functions and exponentiations. 
  const handleSpecialFunctionClick = (label) => {
    const currentInput = parseFloat(displayValue);

    //  using switch statements to handle different cases and scenarios.
    switch (label) {
      //different cases for trignometric functions
      case "sin":
        setDisplayValue(Math.sin((currentInput * Math.PI) / 180).toFixed(8));
        break;
      case "cos":
        setDisplayValue(Math.cos((currentInput * Math.PI) / 180).toFixed(8));
        break;
      case "tan":
        setDisplayValue(Math.tan((currentInput * Math.PI) / 180).toFixed(8));
        break;
      case "sinh":
        setDisplayValue(Math.sinh(currentInput).toString());
        break;
      case "cosh":
        setDisplayValue(Math.cosh(currentInput).toString());
        break;
      case "tanh":
        setDisplayValue(Math.tanh(currentInput).toString());
        break;

      // cases for logarithmic values  
      case "ln":
        setDisplayValue(Math.log(currentInput).toString());
        break;
      case "log10":
        setDisplayValue(Math.log10(currentInput).toString());
        break;

      //power {exp.} functions
      case "x^2":
        setDisplayValue(Math.pow(currentInput, 2).toString());
        break;
      case "x^3":
        setDisplayValue(Math.pow(currentInput, 3).toString());
        break;
      case "x^y":
        const y = parseFloat(prompt("Enter the value of y:"));
        setDisplayValue(Math.pow(currentInput, y).toString());
        break;
      case "e^x":
        setDisplayValue(Math.exp(currentInput).toString());
        break;
      case "10^x":
        setDisplayValue(Math.pow(10, currentInput).toString());
        break;
      case "2√x":
        setDisplayValue(Math.sqrt(currentInput).toString());
        break;
      case "3√x":
        setDisplayValue(Math.cbrt(currentInput).toString());
        break;
      case "y√x":
        const z = parseFloat(prompt("Enter the value of y:"));
        setDisplayValue(Math.pow(currentInput, 1 / z).toString());
        break;
      case "π":
        setDisplayValue(Math.PI.toString());
        break;
      default:
        break;
    }
    setIsWaitingForSecondOperand(true);
  };

  const appendDigitOrSymbol = (label) => {
    if (isWaitingForSecondOperand) {
      setDisplayValue(label);
      setIsWaitingForSecondOperand(false);
    } else {
      setDisplayValue((prev) => (prev === "0" ? label : prev + label));
    }
  };

  //  Manages the division operation and updates the calculator's state accordingly.
  const handleDivideClick = () => {
    const currentInput = parseFloat(displayValue);

    // If an operator is already set and the calculator is waiting for the second operand,
    // update the operator to division and return early.
    if (operator && isWaitingForSecondOperand) {
      setOperator("÷");
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(currentInput);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, currentInput);
      setDisplayValue(result.toString());
      setFirstOperand(result);
    }
    // Set the operator to division and indicate that the calculator is waiting for the second operand.
    setOperator("÷");
    setIsWaitingForSecondOperand(true);
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷',
    '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '7', '8', '9', '*',
    '1/x', '2√x', '3√x', 'y√x', 'ln', 'log10', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  const getButtonClassName = (label) => {
    switch (label) {
      case "C":
        return "clear";
      // Assigning a special class for the plus-minus button.
      case "+/-":
        return "plus-minus";
      // Assigning a special class for the zero button.
      case "0":
        return "zero number";
      // Assigning a special class for the Rad button.
      case "Rad":
        return "rad-btm-lgt";
      // Assigning a special class for the equal button.
      case "=":
        return "eql-btm-rgt yellow operator";
      // Assigning a common class for operator buttons.
      case "+":
      case "-":
      case "*":
      case "÷":
        return "yellow operator";
      default:
        return !isNaN(label) || label === "." ? "number" : "";
    }
  };

  // this will return the calculator in provided sequenece i.e. InputBar --> Buttons
  return (
    <div className="confetti-calculator">
      <div className="circular-buttons">
        <div className="circular-button red"></div>
        <div className="circular-button yellow"></div>
        <div className="circular-button green"></div>
      </div>
      <InputBar value={displayValue} />
      <div className="buttons">
        {buttons.map((label, index) => (
          <Button
            key={index}
            label={label}
            className={getButtonClassName(label)}
            onClick={() => handleButtonClick(label)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;