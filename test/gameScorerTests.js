const assert = require('assert');
const scorer = require('../lib/gameScorer');

describe('gameScorer', () => {
  it("should score a game of yahtzee", () => {
    const game = scorer.initialiseGame()
    const firstRoll = "(1, 3, 1, 4, 3) Ones"
    const secondRoll = "(2, 1, 2, 4, 1) Full house"
    const thirdRoll = "(3, 3, 3, 3, 3) Threes"

    const gameStateOne = scorer.roll(game, firstRoll)
    assert.strictEqual(gameStateOne.score, 2)
    assert.deepEqual(gameStateOne.usedCategories, ["Ones"])

    const gameStateTwo = scorer.roll(gameStateOne, secondRoll)
    assert.strictEqual(gameStateTwo.score, 2)
    assert.deepEqual(gameStateTwo.usedCategories, ["Full house", "Ones"])

    const gameStateThree = scorer.roll(gameStateTwo, thirdRoll)
    assert.strictEqual(gameStateThree.score, 17)
    assert.deepEqual(gameStateThree.usedCategories, ["Threes", "Full house", "Ones"])
  })

  it("should parse the command and return the new game state", () => {
    const game = scorer.initialiseGame()
    const firstRoll = "(1, 3, 1, 4, 3) Ones"

    const gameStateOne = scorer.roll(game, firstRoll)

    assert.strictEqual(gameStateOne.score, 2)
    assert.deepEqual(gameStateOne.usedCategories, ["Ones"])
  })
});