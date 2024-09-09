# The Cashier Program

![cashier](/img/cash_register.png)

## Overview

The Cashier program simulates a cashier system with a cash counter function that manages the calculation of change after a transaction. The system ensures that the correct amount of change is given back using the available bills and coins while keeping track of the cash box.

Its main features are:

- **Change Calculation**: The program calculates the total change needed and determines the exact number of bills and coins needed for change.
- **Cash Box Management**: The cash box is updated after each transaction.
- **User-Friendly Messages**: Handles insufficient payment or situations where no change is available with helpful messages.
- **Stylized Output**: Displays a formatted breakdown of the change to the user using **Chalk** for colorful output in the console.

## Installation

1. Clone the repository:
```bash
git clone git@github.com:diecatiamonteiro/the-cashier-program.git
```

2. Install dependencies: 
```bash
npm install chalk
```

3. Run the program:
```bash
node index.js
```

## Cashier example usage

![cashier example](/img/cashier-example.png)

