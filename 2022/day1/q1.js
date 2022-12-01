import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

const findElfCarryingTheMostCalories = (data) => {
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

    let winnerElf = 0
    let winnerSum = sumElf(elves[0])

    for (let i = 1; i < elves.length; i++) {
        const currentElfSum = sumElf(elves[i])
        if (currentElfSum > winnerSum) {
            winnerElf = i
            winnerSum = currentElfSum 
        }
    }

    return winnerSum
}

console.log(findElfCarryingTheMostCalories(input))
