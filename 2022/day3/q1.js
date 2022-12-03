import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

const sumProritiesOfItems = (data) => {
    const rucksacks = data
        .replace(/\r/g, "") 
        .trim()
        .split(/\r?\n/)

    let sum = 0

    rucksacks.forEach(rucksack => {
        rucksack = [...rucksack]
        const first = toSet(rucksack.slice(0, rucksack.length / 2))
        const second = toSet(rucksack.slice(rucksack.length / 2))

        first.forEach(letter => {
            if (isLetterInCompartment(letter, second)) {
                sum += getPriority(letter)
            }
        })
    })

    return sum
}

const toSet = (array) => [...new Set([...array])]

const isLetterInCompartment = (letter, second) => second.includes(letter) 

const getPriority = (letter) => {
    if (/[a-z]/.test(letter)) return letter.charCodeAt(0) - 96
    return letter.charCodeAt(0) - 65 + 27
}

console.log(sumProritiesOfItems(input))