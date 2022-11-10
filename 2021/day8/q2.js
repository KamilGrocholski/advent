import fs from 'fs'
import path, { parse } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput2.txt'), { encoding: 'utf8' }).trim()

const lines = testInput.split(/[\n\r]+/g)
const prelr = lines.map(line => line.split(' | '))

const parsedInput = prelr.map(i => {
    return {
        left: i[0].split(' '),
        right: i[1].split(' ') 
    }
})

//  dddd
// e    a
// e    a
//  ffff
// g    b
// g    b
//  cccc

const coded = {
    acedgfb: 8,
    cdfbe: 5,
    gcdfa: 2,
    fbcad: 3,
    dab: 7,
    cefabd: 9,
    cdfgeb: 6,
    eafb: 4,
    cagedb: 0,
    ab: 1
}

const numbers = []

const sortABC = (str) => str.split('').sort().join('')

const compare = (a, b) => {
    // console.log('a', sortABC(a), 'b', sortABC(b), 'is', sortABC(a) === sortABC(b))
    return sortABC(a) === sortABC(b) ? true : false
}

console.log(sortABC('cefabdfbcad'), sortABC('cefdbcefbgd'))

const assembleLine = (line) => {
    const al = []
    line.forEach(p => {
        if (p.length === 3) al.push(7)
        else if (p.length === 2) al.push(1)
        else if (p.length === 7) al.push(8)
        else if (p.length === 4) al.push(4)
        else if (compare('cefabd', p)) al.push(9)
        else if (compare('cdfgeb', p)) al.push(6)
        else if (compare('cagedb', p)) al.push(0)
        else if (compare('cdfbe', p)) al.push(5)
        else if (compare('gcdfa', p)) al.push(2)
        else if (compare('fbcad', p)) al.push(3)
    })

    if (al.length > 0) {
        numbers.push(parseInt(al.join('')))
    }
}
// console.log(parsedInput)
// parsedInput.forEach(({ right }) => assembleLine(right)) 
parsedInput.forEach(({ left }) => assembleLine(left)) 

console.log(numbers)

const sum = numbers.reduce((prev, curr) => prev + curr, 0)

console.log(sum)