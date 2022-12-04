import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

const cos = (data) => {
    const pairs = data
        .replace(/\r/g, "") 
        .trim()
        .split(/\r?\n/)

    let counter = 0

    pairs.forEach(pair => {
        pair = pair.trim().split(',')
        const [r1First, r1Second] = pair[0].split('-').map(n => parseInt(n))
        const [r2First, r2Second] = pair[1].split('-').map(n => parseInt(n))
        
        // console.log({
        //     r1First,
        //     r1Second,
        //     r2First,
        //     r2Second
        // })

        // first in second
        if (
            r1First >= r2First &&
            r1Second <= r2Second
        ) {
            counter++
        }

        // second in first
        else if (
            r1First <= r2First &&
            r1Second >= r2Second
        ) {
            counter++
        }
    })

    return counter
}

console.log(cos(input))