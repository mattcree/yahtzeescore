const commandParser = require("../commandParser")

const initialiseGame = () => ({
  score: 0,
  usedCategories: [],
  message: undefined
});

const singleNumber = (number, diceValues) => diceValues.filter(it => it === number).length * number;
const ones = (diceValues) => singleNumber(1, diceValues);
const twos = (diceValues) => singleNumber(2, diceValues);
const threes = (diceValues) => singleNumber(3, diceValues);
const fours = (diceValues) => singleNumber(4, diceValues);
const fives = (diceValues) => singleNumber(5, diceValues);
const sixes = (diceValues) => singleNumber(6, diceValues);

const twoPairs = (diceValues) => {
  const counts = countDiceValues(diceValues);
  const countsWithPair = Object.keys(counts).filter(count => counts[count] === 2)

  if (countsWithPair.length === 2) {
    const [one, two] = countsWithPair;

    return (one * 2) + (two * 2)
  }

  return 0;
}

const fullHouse = (diceValues) => {
  const counts = countDiceValues(diceValues);
  const countsWithPair = Object.keys(counts).filter(count => counts[count] === 2)
  const countsWithThree = Object.keys(counts).filter(count => counts[count] === 3)

  if (countsWithPair.length === 1 && countsWithThree.length == 1) {
    const [one] = countsWithPair;
    const [two] = countsWithThree;
    return (one * 2) + (two * 3)
  }

  return 0;
}

const countDiceValues = (diceValues) => {
  return diceValues.reduce((acc, diceValue) => {
    const currentDiceValue = acc[diceValue];

    if (currentDiceValue) {
      acc[diceValue] = currentDiceValue + 1;
    } else {
      acc[diceValue] = 1
    }

    return acc;
  }, {})
}

const categoryToScorer = {
  "Ones": ones,
  "Twos": twos,
  "Threes": threes,
  "Fours": fours,
  "Fives": fives,
  "Sixes": sixes,
  "Two pairs": twoPairs,
  "Full house": fullHouse,
}

const doRoll = ({ score, usedCategories }, { dice, category }) => {
  if (usedCategories.includes(category)) {
    return { message: `${category} has already been used`, ...game };
  }

  const scorer = categoryToScorer[category];

  return {
    score: score + scorer(dice),
    usedCategories: [category, ...usedCategories],
    message: undefined
  }
}


const roll = (game, rollString) => {
  const command = parseCommand(rollString);

  return doRoll(game, command)
}

const parseCommand = (rollString) => {
  const [[_openBracket, dice, _closeBracket], _space, category] = commandParser.parse(rollString);
  return {
    dice: dice.map(([dice, _separator]) => parseInt(dice)),
    category
  }
}

exports.roll = roll;
exports.initialiseGame = initialiseGame;