import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' }).trim()

const lines = input.split(/[\n\r]+/g)
const prelr = lines.map(line => line.split(' | '))

const parsedInput = prelr.map(i => {
    return {
        left: i[0].split(' '),
        right: i[1].split(' ') 
    }
})

console.log(parsedInput)

// 1, 4, 7, 8 digits
// 2, 4, 3, 7 nSegments
let unsd = 0

parsedInput.forEach((lr) => {
    const nR = {
        1: {
            n: 0,
            is: false
        },
        4: {
            n: 0,
            is: false
        },
        7: {
            n: 0,
            is: false
        },
        8: {
            n: 0,
            is: false
        }
    }

    lr.right.forEach((d) => {
        if (d.length === 2) nR[1].n++
        if (d.length === 4) nR[4].n++
        if (d.length === 3) nR[7].n++
        if (d.length === 7) nR[8].n++
    })

    lr.left.forEach((d) => {
        if (d.length === 2) nR[1].is = true
        if (d.length === 4) nR[4].is = true
        if (d.length === 3) nR[7].is = true
        if (d.length === 7) nR[8].is = true
    })

    Object.values(nR).forEach(inst => {
        if (inst.is) {
            unsd += inst.n
        }
    })
})

console.log(unsd)