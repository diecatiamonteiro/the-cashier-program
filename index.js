// 'THE CASHIER' PROGRAM

// Summary:
// This program simulates a cashier system with a cash counter function.
// The function `createCashCounter()` initializes a cash box with available bills and coins,
// and returns a function that handles transactions. This function:
// - Calculates the total change needed
// - Determines the number of each bill/coin to give
// - Updates the cash box and handles error cases (insufficient payment or no change available)
// - Formats and displays the transaction details and change breakdown to the user

// ------------------------------------------------------------ import dependencies

import chalk from "chalk";

// ------------------------------------------------------------ step 1 - create cash counter function with change calculation

// This function manages a cash box and allows a cashier to calculate and give change. Includes:

const createCashCounter = () => {
  // cashBox (closure) stores bills and coins available and their quantities
  let cashBox = [
    { 50: 10 },
    { 20: 10 },
    { 10: 10 },
    { 5: 25 },
    { 2: 25 },
    { 1: 25 },
    { 0.5: 25 },
    { 0.2: 25 },
    { 0.1: 25 },
    { 0.05: 25 },
    { 0.02: 25 },
    { 0.01: 25 },
  ];

  // Return an anonymous function that calculates the change to give back and updates the cash box
  return function (price, paid) {
    // If money paid is not enough
    if (paid < price) {
      return `${chalk.yellow(
        "\nThe money paid is not enough.\nCustomer should pay "
      )}${chalk.red(price - paid)}${chalk.red("€")} ${chalk.yellow.bold(
        "more."
      )}\n`;
    }

    // Calculate total change
    let change = paid - price;
    let changeBreakdown = []; // List to store the breakdown of change

    // Iterate over each bill/coin in cashBox, from largest to smallest
    for (let billOrCoin of cashBox) {
      // Extract the bill/coin and its quantity
      let value = parseFloat(Object.keys(billOrCoin)[0]);
      let quantity = billOrCoin[value];
      let returnCount = 0; // Initialize returnCount

      // Stop if all change has been given to customer
      if (change <= 0) break;

      // Calculate how many units of the current bill/coin are needed to cover change
      let neededCount = Math.floor(change / value);

      if (neededCount > 0) {
        // Determine how many of the current bill/coin can be given
        returnCount = Math.min(neededCount, quantity);
        change = (change - returnCount * value).toFixed(2);
      }

      // Add the current bill or coin to the change breakdown
      if (returnCount > 0) {
        changeBreakdown.push({ [`${value} Euro`]: returnCount });

        // Update the cash box by deducting the given bills/coins
        billOrCoin[value] -= returnCount;
      }
    }

    // Check if there is any change left that could not be given
    if (change > 0) {
      return `${chalk.red(
        "\nNo change available.\nPlease provide a smaller quantity to pay your bill.\n"
      )}`;
    }

    // Return the breakdown of the change to give
    return (
      `${chalk.blue.bold("\nPrice: ")}${chalk.whiteBright(
        price.toFixed(2) + "€"
      )}\n` +
      `${chalk.blue.bold("Paid: ")}${chalk.whiteBright(paid.toFixed(2) + "€")}\n` +
      `${chalk.blue.bold("Change: ")}${chalk.whiteBright(
        (paid - price).toFixed(2) + "€\n"
      )}\n` +
      `${chalk.bold("Change details: ")}\n\n` +
      changeBreakdown
        .map((item) => {
          let [denom, count] = Object.entries(item)[0];
          return `${chalk.bold("   • " + denom + ":")} ${chalk.gray(count)}`;
        })
        .join("\n") +
      "\n"
    );
  };
};

// ------------------------------------------------------------ step 2 - demonstrate cash counter function

// Show how the cashCounter function operates with a sample input.

const cashCounter = createCashCounter();

console.log(cashCounter(3.87, 12));

// ------------------------------------------------------------
// ------------------------------------------------------------ code explained
// ------------------------------------------------------------

// 1)

// Closure definition - A closure in JavaScript is a feature where an inner function remembers the variables from its outer function, even after the outer function has finished executing. This allows the inner function to access and modify variables that were in scope when the outer function was created, even though those variables are no longer directly accessible. In this example, the cashBox is part of the outer function createCashCounter(). When you call createCashCounter(), it returns an anonymous function (a function without a name). Normally, when a function finishes running, its variables (cashBox in this case) are no longer available. But because of closure, the returned anonymous function keeps access to the cashBox variable even after createCashCounter() finishes running. cashBox is stored inside the createCashCounter() function, making it a closure, meaning the cashBox variable will be available even after the function createCashCounter() finishes running.

// 2)

// let [value, quantity] = [parseFloat(Object.keys(billOrCoin)[0]), billOrCoin[parseFloat(Object.keys(billOrCoin)[0])]];

// This is destructuring cashBox into:
// - value = [parseFloat(Object.keys(billOrCoin)[0]) // 50
// - quantity = billOrCoin[parseFloat(Object.keys(billOrCoin)[0])]] // 10

// parseFloat converts a string "50" into a number 50

// In the first iteration:
// billOrCoin is { 50: 10 }.
// Object.keys(billOrCoin) gives ['50'].
// Object.keys(billOrCoin)[0] is '50'.
// parseFloat(Object.keys(billOrCoin)[0]) is 50.
// billOrCoin[50] is 10.
// So, value becomes 50 and quantity becomes 10. This is how the code retrieves and uses the denomination and quantity for each bill or coin in the cashBox.

// 3)

// let billsOrCoinsNeeded = Math.floor(change / value);

// Purpose: Calculates how many units of the current denomination (value) are needed to cover the remaining change.

// Dividing change by value gives a floating-point number representing how many units of this denomination are required to cover the remaining change.

// Math.floor returns the largest integer less than or equal to the given number.

// 4)

// price.toFixed(2): Formats the price to two decimal places

// 5)

// Iterations explained:

/*
Assume you need to give back 7.75 Euros in change:

Iteration 1:

billOrCoin is {50: 10}.
value = 50, quantity = 10.
Since 50 is larger than 7.75, this denomination is skipped.

Iteration 2:

billOrCoin is {20: 10}.
value = 20, quantity = 10.
Since 20 is larger than 7.75, this denomination is also skipped.

Iteration 3:

billOrCoin is {5: 25}.
value = 5, quantity = 25.
7.75 / 5 = 1.55, so neededCount = 1.
returnCount = 1 (because you have enough 5 Euro bills).
You give 1 bill of 5 Euros, update change to 2.75, and reduce the quantity of 5 Euro bills in the cash box.

Iteration 4:

billOrCoin is {2: 25}.
value = 2, quantity = 25.
2.75 / 2 = 1.375, so neededCount = 1.
returnCount = 1 (you can give 1 bill of 2 Euros).
You give 1 bill of 2 Euros, update change to 0.75, and reduce the quantity of 2 Euro bills.

Iteration 5:

billOrCoin is {0.5: 25}.
value = 0.5, quantity = 25.
0.75 / 0.5 = 1.5, so neededCount = 1.
returnCount = 1 (you can give 1 coin of 0.5 Euros).
You give 1 coin of 0.5 Euros, update change to 0.25, and reduce the quantity of 0.5 Euro coins.

Iteration 6:

billOrCoin is {0.2: 25}.
value = 0.2, quantity = 25.
0.25 / 0.2 = 1.25, so neededCount = 1.
returnCount = 1 (you can give 1 coin of 0.2 Euros).
You give 1 coin of 0.2 Euros, update change to 0.05, and reduce the quantity of 0.2 Euro coins.

Iteration 7:

billOrCoin is {0.05: 25}.
value = 0.05, quantity = 25.
0.05 / 0.05 = 1, so neededCount = 1.
returnCount = 1 (you can give 1 coin of 0.05 Euros).
You give 1 coin of 0.05 Euros, update change to 0, and reduce the quantity of 0.05 Euro coins.
*/
