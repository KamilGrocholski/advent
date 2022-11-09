import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split(/\n/).map(String)

const result = () => {

    const position = {
        horizontal: 0,
        depth: 0,
        aim: 0
    } 

    input.forEach((val, index, arr) => {
        const split = val.split(' ')
        const move = split[0]
        const replaced = split[1].toString().replace(/\n|\r/g, "")
        const units = parseInt(replaced)

        switch (move) {
            case 'forward': 
                position.horizontal += units
                position.depth += (position.aim * units)
                return
            case 'down':
                position.aim += units
                return
            case 'up':
                position.aim -= units
                return 
        }
    })

    return position.depth * position.horizontal
}

console.log(result())