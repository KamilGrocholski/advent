import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' }).trim()

const splitComma = input.split(',')

const initialState = splitComma.map((str) => parseInt(str))

const evNumber = (number, eights) => {
    if (number === 0) {
        eights.push(8)
        return 6
    }
    else return number - 1
}

const days = [initialState]

const createNewState = () => {
    const eights = []
    const newState = days[days.length - 1].map(number => evNumber(number, eights)).concat(eights)
    days.push(newState)
}

for (let i = 0; i < 80; i++) createNewState()


const countEights = () => {
    let eights = 0
    days.forEach(day => day.forEach(number => {
        if (number === 8) eights++
    }))

    return eights
}

const totalNumberOfFish = () => {
    return countEights() + initialState.length
}

console.log(totalNumberOfFish())