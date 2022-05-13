const assert = require('assert');
const scorer = require('../lib/gameScorer');

describe('gameScorer', () => {
    describe('addFunction', () => {
        it('should add two numbers together', () => {
            assert.strictEqual(scorer.add(2, 3), 5);
        });

        it("should return 8 when given dice (1, 1, 2, 3, 4)", () => {
            assert.strictEqual(scorer.twoPairs([1, 1, 2, 3, 3]), 8);
        })

        it("should return 8 when given dice (1, 1, 2, 2, 2)", () => {
            assert.strictEqual(scorer.fullHouse([1, 1, 2, 2, 2]), 8);
        })

        it("should score a game of yahtzee", () => {
            const game = scorer.initialiseGame()
            const firstRoll = { dice: [1, 3, 1, 4, 3], category: "Ones" }
            const secondRoll = { dice: [2, 1, 2, 4, 1], category: "Full house" }
            const thirdRoll = { dice: [3, 3, 3, 3, 3], category: "Threes" }

            const gameStateOne = scorer.roll(game, firstRoll)
            console.log({ gameStateOne })
            assert.strictEqual(gameStateOne.score, 2)
            assert.deepEqual(gameStateOne.usedCategories, ["Ones"])

            const gameStateTwo = scorer.roll(gameStateOne, secondRoll)
            console.log({ gameStateTwo })
            assert.strictEqual(gameStateTwo.score, 2)
            assert.deepEqual(gameStateTwo.usedCategories, ["Full house", "Ones"])

            const gameStateThree = scorer.roll(gameStateTwo, thirdRoll)
            console.log({ gameStateThree })
            assert.strictEqual(gameStateThree.score, 17)
            assert.deepEqual(gameStateThree.usedCategories, ["Threes", "Full house", "Ones"])
        })

        it("should parse the command and return the new game state", () => {
            const game = scorer.initialiseGame()
            const firstRoll = "(1, 3, 1, 4, 3) Ones"

            const gameStateOne = scorer.doRoll(game, firstRoll)

            console.log({ gameStateOne })
            assert.strictEqual(gameStateOne.score, 2)
            assert.deepEqual(gameStateOne.usedCategories, ["Ones"])
        })

        it("should parse an array of dice", () => {
            const diceString = "(1, 3, 1, 4, 3)"

            assert.deepEqual(scorer.parseDice(diceString), [1, 3, 1, 4, 3])
        })
    });
});