Command = DiceList Space Category

DiceList = "(" Dice ")"
Space = " "
Category = "Ones" / "Twos" / "Threes" / "Fours" / "Fives" / "Sixes" / "Full house" / "Two pairs"

Dice = CommaSeparatedDie CommaSeparatedDie CommaSeparatedDie CommaSeparatedDie CommaSeparatedDie
CommaSeparatedDie = Die Separator

Die = [0-9]
Separator = ", " / "," / ""
