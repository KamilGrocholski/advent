import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

const findTop3ElvesCarryingTheMostCalories = (data) => {
    const parsedInput = data.trim().split(/\r?\n/)

    const elves = []

    let currentElf = 0

    for (const row of parsedInput) {
        if (row.length === 0) {
            currentElf++

            continue
        }

        if (!elves[currentElf]) {
            elves.push([parseInt(row, 10)])
        }
        
        else {
            elves[currentElf].push(parseInt(row, 10))
        }
    }

    const sumElf = (elf) => elf.reduce((sum, curr) => sum + curr, 0)

    const sums = []

    for(let i = 0; i < elves.length; i++) {
        sums.push(sumElf(elves[i]))
    }

    return sums
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((top3Sum, currentSum) => top3Sum + currentSum, 0) 
}

console.log(findTop3ElvesCarryingTheMostCalories(input))
