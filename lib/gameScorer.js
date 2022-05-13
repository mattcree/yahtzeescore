exports.add = (x, y) => {
    return x + y;
}

const initialiseGame = () => ({
    score: 0,
    usedCategories: [],
    message: undefined
});

exports.initialiseGame = initialiseGame;

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

exports.twoPairs = twoPairs;

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

exports.fullHouse = fullHouse;

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

const roll = (game, { dice, category }) => {
    const { score, usedCategories } = game;

    if (usedCategories.includes(category)) {
        return { message: `${category} has already been used`, ...game };
    }

    const scorer = categoryToScorer[category];

    const scoreForDice = scorer(dice);

    console.log({ scoreForDice })

    return {
        score: score + scoreForDice,
        usedCategories: [category, ...usedCategories],
        message: undefined
    }
}

exports.roll = roll;

const doRoll = (game, rollString) => {
    const command = parseCommand(rollString);

    return roll(game, command)
}

exports.doRoll = doRoll;

const parseCommand = (rollString) => {
    const command = {
        dice: parseDice(rollString),
        category: parseCategory(rollString)
    }

    console.log({ command })

    return command;
}

const parseCategory = (rollString) => {
    const allowedCategories = Object.keys(categoryToScorer);
    const category = allowedCategories.find(it => rollString.includes(it))

    if (!category) throw Error("Your input doesn't have a category")

    return category;
}

const parseDice = (rollString) => {
    const dice = []

    for (let character of rollString) {
        const number = parseInt(character);
        if (!isNaN(number)) {
            dice.push(number)
        } else if (character === ")") {
            break;
        }
    }

    return dice;
}

exports.parseDice = parseDice;