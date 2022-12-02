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

const RPS_VALUES = {
    'Y': 2,
    'X': 1,
    'Z': 3
}

const OUTCOMES = {
    // 'A': 8,
    // 'B': 1,
    // 'C': 6,
    'A Y': 6,
    'A X': 3,
    'A Z': 0,

    'B Y': 3,
    'B X': 0,
    'B Z': 6,

    'C Y': 0,
    'C X': 6,
    'C Z': 3
}

const RPS = (data) => {
    let myScoreWithElfsStrategy = 0

    data
        .trim()
        .split(/\n/)  
        .forEach(row => {
            row = row.trim()

            myScoreWithElfsStrategy += RPS_VALUES[row[2]]
            myScoreWithElfsStrategy += OUTCOMES[row]
        })

    return myScoreWithElfsStrategy
}

console.log(RPS(input))
