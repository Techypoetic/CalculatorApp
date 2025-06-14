// Wait for everything to load before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the screen element where values will show
  const display = document.getElementById("display");

  // Get all buttons that are numbers or operators
  const buttons = document.querySelectorAll(".btn, .operator");

  // Get the equal button and backspace button separately
  const equals = document.getElementById("equals");
  const backspace = document.getElementById("backspace");

  // We'll store whatever the user types here
  let expression = "";

  // A small function to replace ^ with ** so JS understands it as power
  function sanitizeExpression(expr) {
    return expr.replace(/\^/g, "**");
  }

  // This updates the calculator screen
  function updateDisplay() {
    display.textContent = expression || "0"; // Show 0 if it's empty
  }

  // Handle when number or operator buttons are clicked
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.getAttribute("data-value");
      expression += value;
      updateDisplay();
    });
  });

  // When the equals (=) button is clicked
  equals.addEventListener("click", function () {
    try {
      const result = eval(sanitizeExpression(expression));
      expression = result.toString();
      updateDisplay();
    } catch (error) {
      expression = "";
      display.textContent = "Error";
    }
  });

  // Handle when backspace button (on-screen) is clicked
  backspace.addEventListener("click", function () {
    expression = expression.slice(0, -1); // remove last character
    updateDisplay();
  });

  // Keyboard input handling
  document.addEventListener("keydown", function (event) {
    const key = event.key;

    // If user types a number or a basic operator
    if (!isNaN(key) || ["+", "-", "*", "/", ".", "%"].includes(key)) {
      expression += key;
    }
    // If user presses Enter or equal sign
    else if (key === "Enter" || key === "=") {
      try {
        const result = eval(sanitizeExpression(expression));
        expression = result.toString();
      } catch {
        expression = "";
        display.textContent = "Error";
        return;
      }
    }
    // If user hits backspace on keyboard
    else if (key === "Backspace") {
      expression = expression.slice(0, -1);
    }
    // If user types ^ for power
    else if (key === "^") {
      expression += "^";
    }
    // Ignore anything else (like letters)
    else {
      return;
    }

    updateDisplay();
  });
});