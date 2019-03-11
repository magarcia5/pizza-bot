const assert = require('assert');
const { pizzaBot } = require('../pizza-bot.js')

describe('Pizza Bot', () => {
    describe('invalid input', () => {

        it('should display error if there is invalid input', () => {
            assert.equal(pizzaBot(), '');
            assert.equal(pizzaBot('5x5'), '');
            assert.equal(pizzaBot('5x5 5x5'), '');
            assert.equal(pizzaBot('(1,3)'), '');
            assert.equal(pizzaBot('5x'), '');
            assert.equal(pizzaBot('5'), '');
            assert.equal(pizzaBot('notagrid?!'), '');
            assert.equal(pizzaBot('5x5'), '');
            assert.equal(pizzaBot('5x5 (1)'), '');
            assert.equal(pizzaBot('5x5 1,2'), '');
            assert.equal(pizzaBot('5x5 12'), '');
            assert.equal(pizzaBot('5x5 (1,-2)'), '');
        });

        it('should display an error if one of the coordinates are out of range', () => {
            assert.equal(pizzaBot('5x5 (10,1)'), '');
            assert.equal(pizzaBot('5x5 (1,10)'), '');
            assert.equal(pizzaBot('5x5 (10,10)'), '');
        })
    });

    describe('deliver all the pizza', () => {

        it('should deliver pizza to one house', () => {
            assert.equal(pizzaBot('5x5 (3,4)'), 'EEENNNND');
        });

        it('should deliver pizza north of the start', () => {
            assert.equal(pizzaBot('10x5 (0,4)'), 'NNNND');
        });

        it('should deliver pizza east of the start', () => {
            assert.equal(pizzaBot('5x10 (4,0)'), 'EEEED');
        });

        it('should deliver pizza north east of the start', () => {
            assert.equal(pizzaBot('5x5 (2,2)'), 'EENND');
        });

        it('should deliver pizza to a house north from the first dropoff', () => {
            assert.equal(pizzaBot('5x5 (1,3) (1,5)'), 'ENNNDNND');
        });

        it('should deliver pizza to a house north east from the first dropoff', () => {
            assert.equal(pizzaBot('5x5 (1,3) (4,4)'), 'ENNNDEEEND');
        });

        it('should deliver pizza to a house east of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (1,1) (3,1)'), 'ENDEED');
        });

        it('should deliver pizza to a house south east of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (1,4) (2,3)'), 'ENNNNDESD');
        });

        it('should deliver pizza to a house south of the previous dropoff', () => {
            assert.equal(pizzaBot('5x5 (4,4) (4,2)'), 'EEEENNNNDSSD');
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
                'DENNNDEEENDSSDDWWWWSD'
            );
        });
    });
});