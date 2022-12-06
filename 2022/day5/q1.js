import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

const cos = (data) => {
    const firstDataParse = data
        .replace(/\r/g, '') // replace all \r characters
        .split(/\n\s*\n/) // split by empty lines

    const stacks = transpose( // transpose
        firstDataParse[0]
            .split(/r?\n/) // split by lines
            .slice(0, -1) // remove indexes
            .map(line => [...line].filter((_, index) => index % 4 === 1)) // split every by 4th space
    ).map(stack => stack.reverse().filter(crate => crate !== ' ')) // remove ' '

    const moves = firstDataParse[1]
        .split(/r?\n/) // split by lines
        .map(move => {
            const match = /move (\d+) from (\d+) to (\d+)/g.exec(move)
            return {
                n: parseInt(match[1]),
                from: parseInt(match[2]),
                to: parseInt(match[3])
            }
        })

    const pop = (from) => {
        return stacks[from - 1].pop()
    }

    const push = (to, crate) => {
        stacks[to - 1].push(crate)
    }

    moves.forEach((move) => {
        const { n, from, to } = move
        for (let i = 0; i < n; i++) {
            const removedCrate = pop(from)
            if (removedCrate) {
                push(to, removedCrate)
            }
        }
    })

    const top = stacks.reduce((listOfTop, stack) => listOfTop + stack.pop(), '')

    return top
}

const transpose = (matrix) => {
    return matrix.reduce((prev, next) => next.map((_, i) =>
      (prev[i] || []).concat(next[i])
    ), [])
}

console.log(cos(input))