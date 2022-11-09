import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split(/\n/).map(String)

const result = () => {
    const firstRow = input[1].replace('\r','').split('')
    const counter = firstRow.map(() => ({ 0: 0, 1: 0 }))
    
    input.forEach((val) => {
        const split = val.split('')
        split.forEach((val, index) => {
            if (val === '\r') return 
            counter[index][val] += 1
        })
    })

    const gammaRate = parseInt((counter.map(val => (val[0] > val[1]) ? 0 : 1)).join(''), 2)
    const epsilonRate = parseInt((counter.map(val => (val[0] > val[1]) ? 1 : 0)).join(''), 2)

    return gammaRate * epsilonRate
}

console.log(result())