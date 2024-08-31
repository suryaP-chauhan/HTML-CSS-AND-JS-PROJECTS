const dis = document.querySelector(".calculator_display");
const key = document.querySelectorAll("button");

let currentNumber = "";
let firstNumber = null;
let operator = null;
let result = null;
let isResultDisplayed = false;

const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "error" : a / b);
const add = (a, b) => a + b;
const sub = (a, b) => a - b;

const operate = (fNumber, op, sNumber) => {
  switch (op) {
    case "+":
      return add(fNumber, sNumber);
    case "-":
      return sub(fNumber, sNumber);
    case "*":
      return multiply(fNumber, sNumber);
    case "/":
      return divide(fNumber, sNumber);
    default:
      return "invalid input";
  }
};

const calculator = () => {
  key.forEach((el) => {
    el.addEventListener("click", (e) => {
      const value = e.target.value;

      if (value === "AC") {
        // Reset the calculator
        currentNumber = "";
        firstNumber = null;
        operator = null;
        result = null;
        isResultDisplayed = false;
        dis.textContent = "";
        return;
      }

      if (value === "=") {
        if (firstNumber !== null && operator !== null && currentNumber !== "") {
          result = operate(parseFloat(firstNumber), operator, parseFloat(currentNumber));
          dis.textContent = result;
          firstNumber = result; // For chaining operations
          operator = null;
          currentNumber = "";
          isResultDisplayed = true;
        } else {
          dis.textContent = "invalid format";
        }
        return;
      }

      if (["+", "-", "*", "/"].includes(value)) {
        if (firstNumber === null) {
          // Initial operator setup
          firstNumber = currentNumber;
          operator = value;
          currentNumber = "";
          isResultDisplayed = false;
        } else if (operator !== null && currentNumber !== "") {
          // Perform pending operation
          result = operate(parseFloat(firstNumber), operator, parseFloat(currentNumber));
          dis.textContent = result;
          firstNumber = result;
          operator = value;
          currentNumber = "";
          isResultDisplayed = false;
        } else {
          operator = value;
          isResultDisplayed = false;
        }
        return;
      }

      if (isResultDisplayed) {
        // Reset for new calculation after result
        currentNumber = value;
        isResultDisplayed = false;
      } else {
        currentNumber += value;
      }

      dis.textContent = currentNumber;
    });
  });
};

calculator();
