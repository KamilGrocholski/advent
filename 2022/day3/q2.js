import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
import { threadId } from 'worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' })

const sumProritiesOfItems = (data) => {
    const rucksacks = data
        .replace(/\r/g, "") 
        .trim()
        .split(/\r?\n/)

    const groupsOf3 = []

    for (let i = 0; i < rucksacks.length; i += 3) {
        groupsOf3.push([
            rucksacks[i],
            rucksacks[i + 1],
            rucksacks[i + 2]
        ])
    }

    let sum = 0
    
    groupsOf3.forEach(group => {
        const first = toSet([...group[0]])
        const second = toSet([...group[1]])
        const third = toSet([...group[2]])

        first.forEach(letter => {
            if (isLetterInGroups(letter, second, third)) {
                sum += getPriority(letter)
            }
        })
    })

    return sum
}

const toSet = (array) => [...new Set([...array])]

const isLetterInGroups = (letter, second, third) => second.includes(letter) && third.includes(letter) 

const getPriority = (letter) => {
    if (/[a-z]/.test(letter)) return letter.charCodeAt(0) - 96
    return letter.charCodeAt(0) - 65 + 27
}

console.log(sumProritiesOfItems(input))