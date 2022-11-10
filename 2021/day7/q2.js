import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' }).trim()

const positions = input.split(',').map(str => parseInt(str))

console.log(positions)

// const serSum = (from, to) => {
//     let res = 0

//     for (let i = from; i <= to; i++) {
//         res += i
//     }

//     return res
// }

function serSum(n) {
    return (n * (n + 1)) / 2;
  }

const calcCost = (position) => {
    return positions.reduce((prev, curr) => prev + serSum(Math.abs(curr - position)), 0)
}

let newPosition = Math.min(...positions) + 1
let newCost = calcCost(newPosition)

while (true) {
    let nextCost = calcCost(newPosition + 1)

    if (nextCost > newCost) break

    newPosition++
    newCost = nextCost
}

console.log(newCost)