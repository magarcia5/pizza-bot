# Pizza Bot

This project delivers pizza to houses on a grid of specified size and width. In other words, it moves along a grid to the specified list of x,y points and returns the list of moves it made i.e. EEENDNNWD. The initial represents the direction and D means the point was reached.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

1. [Node](https://nodejs.org/en/download/)

### Installing

Download dependencies.

```
npm install
```

Run bot. The output will be printed in the terminal.
```
node pizza-bot.js "5x5 (1,2) (2,1)"
```

Run tests.
```
npm test
```

Notes:
* The points must be positive integers.
* If there are valid points listed, any invalid point will be ignored. The other houses should still get their pizza even if someone else put in their address wrong!

## Built With

* [ES6](https://github.com/lukehoban/es6features)
* [Mocha](https://mochajs.org/) - for testing