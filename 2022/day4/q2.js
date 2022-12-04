import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

const overlapAtAll = (data) => {
    const pairs = data
        .replace(/\r/g, "") 
        .trim()
        .split(/\r?\n/)

    let counter = 0

    pairs.forEach(pair => {
        pair = pair.trim().split(',')
        const [r1Start, r1End] = pair[0].split('-').map(n => parseInt(n))
        const [r2Start, r2End] = pair[1].split('-').map(n => parseInt(n))
        
        if (r1Start <= r2End && r1End >= r2Start) counter++
    })

    return counter
}

console.log(overlapAtAll(input))