# A Yahtzee Scorer

A simple Yahtzee game scorer, which can score a limited number of Yahtzee categories.

Written as part of an interview live code challenge.

It has my first time using a parser generator (an addition included after the code test concluded).

## Pre-Requisites
You must have a recent version of node to run the tests.

## Run the tests

`$ npm test`

## API

Two functions are exposed

- `initialiseGame`
- `roll`

### `initialiseGame`

This returns an object representing the state of the game.

### `roll`

This function takes two arguments
- the game
- the yahtzee roll

### The Yahtzee Roll

The rules of yahtzee [can be found here](https://en.wikipedia.org/wiki/Yahtzee)

The roll is a string with the following structure

`(dice, dice, dice, dice, dice) category`

Where `dice` is a number from 1-6 and `category` is any of the following.

- Ones
- Twos
- Threes
- Fours
- Fives
- Sixes
- Full house
- Two pairs

e.g. `(1, 2, 3, 4, 5) Ones`

This function returns the new state of the game where the score has been updated, and the 
category which has been used is tracked and cannot be used again.