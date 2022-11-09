import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()
const testInput = fs.readFileSync(path.resolve(__dirname, 'testInput.txt'), { encoding: 'utf8' }).trim()

const pointer = ' -> '

const splitLines = input.split(/[\n\r]+/g)

const splitByPointer = splitLines.map(coords => coords.split(pointer))

const splitCoords = splitByPointer.map(coords => coords.map(coord => coord.split(',')))

const parsedCoords = splitCoords.map(coords => coords.map(coords2 => coords2.map(coords3 => parseInt(coords3))))

// [x1, y1] start 
// [x2, y2] end
// start[0] x1
// start[1] y1
// end[0] x2
// end[1] y2

const checkLineType = (start, end) => {
    if (start[0] === end[0] && start[1] !== end[1]) return 'veritical'
    if (start[1] === end[1] && start[0] !== end[0]) return 'horizontal'
    else return 'diagonal'
}

const addPointsBetween = (start, end) => {
    const points = []

    const type = checkLineType(start, end)

    // y1 = y2 && x1 != x2
    if (type === 'horizontal') {
        if (start[0] <= end[0]) {
            for (let i = start[0]; i <= end[0]; i++) {
                points.push([i, start[1]])
            }
        }
        if (start[0] > end[0]) {
            for (let i = start[0]; i >= end[0]; i--) {
                points.push([i, start[1]])
            }
        }
    }

    // x1 = x2 && y1 != y2
    if (type === 'veritical') {
        if (start[1] <= end[1]) {
            for (let i = start[1]; i <= end[1]; i++) {
                points.push([start[0], i])
            }
        }
        if (start[1] > end[1]) {
            for (let i = start[1]; i >= end[1]; i--) {
                points.push([start[0], i])
            }
        }
    }

    if (type === 'diagonal') {
        // x1 = y1 && x2 = y2
        if (start[0] === start[1] && end[0] === end[1]) {
            // x1 <= x2
            if (start[0] <= end[0]) {
                for (let i = start[0]; i <= end[0]; i++) {
                    points.push([i, i])
                }
            }
            // x1 > x2
            if (start[0] > end[0] && start[1] < end[1]) {
                for (let i = start[0]; i >= end[0]; i--) {
                    points.push([i, i])
                }
            }
        }

        // x++< y--
        // x1 < x2 && y1 > y2 
        else if (start[0] < end[0] && start[1] > end[1]) {
            let n = 0
            for (let i = start[0]; i <= end[0]; i++) {
                points.push([i, start[1] - n])
                n++
            }
        }
        // x--, y++
        // x1 > x2 && y1 < y2
        else if (start[0] > end[0] && start[1] < end[1]) {
            let n = 0
            for (let i = start[0]; i >= end[0]; i--) {
                points.push([i, start[1] + n])
                n++
            }
        }
        // x++, y++
        // x1 < x2 && y1 < y2
        else if (start[0] < end[0] && start[1] < end[1]) {
            let n = 0
            for (let i = start[0]; i <= end[0]; i++) {
                points.push([i, start[1] + n])
                n++
            }
        }
        // x--, y--
        // x1 > x2 && y1 > y2
        else if (start[0] > end[0] && start[1] > end[1]) {
            let n = 0
            for (let i = start[0]; i >= end[0]; i--) {
                points.push([i, start[1] - n])
                n++
            }
        }
    }

    if (points.length > 0) return points
}


// console.log(parsedCoords)

const allCoords = []

parsedCoords.forEach(coords => {
    const w = addPointsBetween(coords[0], coords[1])
    if (w) allCoords.push(w)
})


const overlaping = new Map()

allCoords.forEach((line) => {
    line.forEach((point) => {
        const key = point[0] + ',' + point[1]
        if (overlaping.has(key)) {
            const pointEx = overlaping.get(key)
            overlaping.set(key, pointEx + 1)
        } else {
            overlaping.set(key, 1)
        }
    })
})

let atLeast2 = 0

overlaping.forEach((val) => {
    if (val >= 2) atLeast2++
})

// console.log(overlaping)

console.log(atLeast2)

