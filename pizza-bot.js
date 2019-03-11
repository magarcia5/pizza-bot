

const INVALID_INPUT_MSG = 'Invalid input.\n\nUsage: node ./pizza-bot.js "5x5 (1,3) (2,2)"\nNote: Positive numbers only.';

/**
 * Handle command line input and display results
 */
const directions = pizzaBot(process.argv[2]);

if(!directions) {
    console.log(INVALID_INPUT_MSG);
} else {
    console.log(directions);
}

/**
 * Extracts houses and grid size from command line input and delivers
 * pizza to each house.
 *
 * @param {String} input i.e. "5x5 (1,2) (2,1)"
 * @returns string of directions or empty string if there was invalid
 * input
 */
function pizzaBot(input) {
    if (!input) {
        return '';
    }

    let directions = '';
    let houses = [];

    const gridSize = getGridSize(input);
    if (!gridSize) {
        return '';
    }
    let { x, y } = gridSize;

    houses = getHouses(input);
    if (!houses || !allHousesInRange(x, y,houses)) {
        return '';
    }
    // add starting point to front of houses list
    houses.unshift({ x:0, y:0 });

    for(let i = 1; i < houses.length; i ++) {
        let directionsForHouse = deliverPizza(houses[i-1], houses[i]);
        directions = directions.concat(directionsForHouse);
    }

    return directions;
}

/**
 * Moves along the grid until it reaches the next destination. It moves
 * east/west and then north/south
 *
 * @param {String} currLocation starting point i.e. (0,0)
 * @param {String} destination destination point i.e. (2,3)
 * @returns string of directions from currDestination to destination
 *  i.e. "EEEEND"
 */
function deliverPizza(currLocation, destination) {
    let directions = '';

    let cx = currLocation.x;
    let cy = currLocation.y;
    let dx = destination.x;
    let dy = destination.y;

    // move east/west
    while (cx !== dx) {
        let move = '';
        if (cx < dx) {
            cx++;
            move = 'E';
        } else {
            cx--;
           move = 'W';
        }
        directions = directions.concat(move);
    }

    // move north/south
    while (cy !== dy) {
        let move = '';
        if (cy < dy) {
            cy++;
            move = 'N';
        } else {
            cy--;
            move = 'S';
        }
        directions = directions.concat(move);
    }

    return directions.concat('D');
}

/**
 * Extracts grid size as an object with x and y
 *
 * @param {String} input command line input i.e. "5x5 (1,2) (2,1)"
 * @returns object with x and y sizes
 */
function getGridSize(input) {
    // matches inputs in the format "5x5"
    const match = input.match(/[0-9]+x[0-9]+/g);

    if (!match || match.length !== 1) {
        return '';
    }

    const split = match[0].split('x');

    return {
        x: parseInt(split[0]),
        y: parseInt(split[1])
    };
}

/**
 * Extracts destination points
 *
 * @param {String} input command line input i.e. "5x5 (1,2) (2,1)"
 * @returns list of point objects
 *  i.e. [ { x: 1, y: 2 }, ...]
 */
function getHouses(input) {
    let houses = [];
    // matches inputs in the format (1,2)
    const matches = input.match(/\([0-9]+,[0-9]+\)/g);

    if(!matches) {
        return;
    }

    matches.forEach(match => {
        const split = match.replace(/\(|\)/g, '').split(',');
        houses.push({
            x: parseInt(split[0]),
            y: parseInt(split[1])
        });
    });

    return houses;
}

/**
 * Checks if all points are in the confines of the grid. For example,
 * a point (10,10) would be out of range on a 5x5 grid
 *
 * @param {Number} x x length of grid
 * @param {Number} y y length of grid
 * @returns true | false
 */
function allHousesInRange(x, y, houses) {
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].x > x ||
            houses[i].y > y) {
            return false;
        }
    }

    return true;
}

module.exports = { pizzaBot };