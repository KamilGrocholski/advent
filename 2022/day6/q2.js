import fs from 'fs'
import path, { parse } from 'path';
import { arrayBuffer } from 'stream/consumers';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

const cos = (data) => {
    data = [...data]
    const lastFourChars = data.slice(0, 14)

    for (let i = 3; i < data.length; i++) {
        if (areAllDifferent(lastFourChars)) return i
        lastFourChars.push(data[i])
        lastFourChars.shift()
    }


}

const areAllDifferent = (arr) => {
    return [...new Set(arr)].length === arr.length
}

console.log(cos(input))