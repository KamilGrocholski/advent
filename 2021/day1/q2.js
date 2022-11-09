import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split(/\n/).map(Number)

const result = () => {
    let increases = 0

    const checkFour = (numbers4) => {
        if (numbers4.length < 4) return false
        const first = numbers4[0] + numbers4[1] + numbers4[2]
        const second = numbers4[1] + numbers4[2] + numbers4[3]
        if (second > first) return true
        return false
    }

    input.forEach((val, index, arr) => {
        const res = checkFour(arr.slice(index, index + 4))
        if (res) increases++
    })

    return increases
}

console.log(result())