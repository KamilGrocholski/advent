import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

// Points
// rock - 1
// paper - 2
// scissors - 3

// I column - opponent
// A - rock
// B - paper
// C - Scissors

// II column - I
// X - rock
// Y - paper 
// Z - scissors

// Possible options 
// Lost - 0
// Draw - 3
// Win - 6

// I need to:
// X - lose
// Y - draw
// Z - win

const RPS_VALUES = {
    'Y': 2,
    'X': 1,
    'Z': 3,

    'A': 2,
    'B': 1,
    'C': 3
}

const OUTCOMES = {
    'Z': {// WIN
        'A': 'Y',
        'B': 'Z',
        'C': 'X'
    },
    'Y': {// DRAW
        'A': 'X',
        'B': 'Y',
        'C': 'Z'
    },
    'X': {// LOSE
        'A': 'Z',
        'B': 'X',
        'C': 'Y'
    }
}

const SCORE_O = {
    'Z': 6,
    'Y': 3,
    'X': 0
}

const RPS = (data) => {
    let myScoreWithElfsStrategy = 0

    data
        .trim()
        .split(/\n/)  
        .forEach(row => {
            row = row.trim()
            myScoreWithElfsStrategy += RPS_VALUES[OUTCOMES[row[2]][row[0]]] + SCORE_O[row[2]]

        })

    return myScoreWithElfsStrategy
}

console.log(RPS(input))
