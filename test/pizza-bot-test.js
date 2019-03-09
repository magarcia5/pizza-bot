const assert = require('assert');
const { pizzaBot } = require('../pizza-bot.js')

const INVALID_INPUT_MSG = 'Invalid input!\n\nUsage: node ./pizza-bot.js "5x5 (1,3) (2,2)" \n Note: Positive numbers only.'

describe('Pizza Bot', () => {
    describe('invalid input', () => {

        it('should display error if there is invalid input', () => {
            assert.equal(pizzaBot(), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5x5'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('(1,3)'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5x'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('notagrid?!'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5x5'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5x5 (1)'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5x5 (1) (1,2)'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5x5 1,2'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5x5 12'), INVALID_INPUT_MSG);
            assert.equal(pizzaBot('5x5 (1,-2)'), INVALID_INPUT_MSG);
        });

        it('should display an error if one of the coordinates is out of range', () => {
            assert.equal(pizzaBot('5x5 (10,1)'), INVALID_INPUT_MSG);
        })
    });

    describe('deliver all the pizza', () => {

        it('should deliver pizza to one house', () => {
            assert.equal(pizzaBot('5x5 (3,4)'), 'EEENNNND');
        });

        it('should deliver pizza north of the start', () => {
            assert.equal(pizzaBot('5x5 (4,0)'), 'NNNND');
        });

        it('should deliver pizza east of the start', () => {
            assert.equal(pizzaBot('5x5 (0,4)'), 'EEEED');
        });

        it('should deliver pizza north east of the start', () => {
            assert.equal(pizzaBot('5x5 (2,2)'), 'EENND');
        });

        it('should deliver pizza to a house north from the first dropoff', () => {
            assert.equal(pizzaBot('5x5 (1,3) (1,5)'), ' ENNNDNND');
        });

        it('should deliver pizza to a house north east from the first dropoff', () => {
            assert.equal(pizzaBot('5x5 (1,3) (4,4)'), ' ENNNDEEEND');
        });

        it('should deliver pizza to a house east of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (1,1) (3,1)'), 'ENDEED');
        });

        it('should deliver pizza to a house south east of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (1,4) (2,3)'), 'ENNNNDESD');
        });

        it('should deliver pizza to a house south of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (4,4) (4,2)'), 'EEEENNNNNDSSD');
        });

        it('should deliver pizza to a house south west of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (4,4) (2,2)'), 'EEEENNNNDWWSSD');
        });

        it('should deliver pizza to a house west of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (4,1) (3,1)'), 'EEEENDWD');
        });

        it('should deliver pizza to a house north west of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (4,1) (3,2)'), 'EEEENDWND');
        });

        it('should deliver pizza to the same house twice', () => {
            assert.equal(pizzaBot('5x5 (1,3) (1,3)'), 'ENNNDD');
        });

        it('should deliver pizza to two or more houses', () => {
            assert.equal(
                pizzaBot('5x5 (0,0) (1,3) (4,4) (4,2) (4,2) (0,1)'),
                'DENNNENDSSDDSSSSWD'
            );
        });
    });
});