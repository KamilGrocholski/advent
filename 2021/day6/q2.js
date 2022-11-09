import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' }).trim()

const splitComma = input.split(',')

const initialState = splitComma.map((str) => parseInt(str))

let fishTypes = [0, 0, 0, 0, 0, 0, 0, 0, 0]

for(let fish of initialState) fishTypes[fish]++


for(let day = 1; day <= 256; day++) {
    let newFish = fishTypes[0]
    
    for(let i = 0; i < 8; i++)  fishTypes[i] = fishTypes[i + 1]
    
    fishTypes[8] = newFish
    fishTypes[6] += newFish
    console.log('day', day, ': ', fishTypes.reduce((prev, curr) => prev + curr))
}

