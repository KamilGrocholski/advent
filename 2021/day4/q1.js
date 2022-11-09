import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()

const result = () => {
    const paragraphs = input
        .split(/[\n\r]+/g)
        .filter((p) => p.trim())

    const markers = paragraphs[0].split(',').map(str => parseInt(str))
    const boardsPre = paragraphs.slice(1, paragraphs.length)

    const sliceIntoChunks = (arr, chunkSize) => {
        const res = []
        
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize)
            res.push(chunk)
        }

        return res
    }

    const boardsSplit = sliceIntoChunks(boardsPre, 5)
    // console.log(boardsSplit)    


    const createField = (row, col, value) => {
        return {
            row,
            col,
            value,
            isMarked: false
        }
    }

    let boards = boardsSplit.map((bs, i, arr) => {
        return bs.map((row, r) => {
            const splitRow = row.trim().split(/\s+/)
            return splitRow.map((n, c) => createField(r + 1, c + 1, parseInt(n)))
        })
    })

    const markBoards = (drawn) => {
        boards.forEach((board) => {
            board.forEach((row) => {
                row.forEach((col) => {
                    if (col.value === drawn) {
                        col.isMarked = true
                    }
                })
            })
        })
    }

    let currentRound = 0

    const draw = (round) => {
        if (!markers[round]) {
            console.log('koniec merkerow')
            return 
        }
        markBoards(markers[round])
    }

    const checkWinners = () => {
        const winners = []
        let currentCols = [
            [],[],[],[],[]
        ]

        boards.forEach((board, i) => {
            board.forEach((row, i) => {
                if (row.every(e => e.isMarked)) {
                    winners.push(i)
                }
                row.forEach(col => {
                    // console.log(col)
                    if (col.isMarked === true) {
                        currentCols[col.col - 1].push(col.value)
                    }
                })
            })
            const is = () => currentCols.some(col => col.length === 5)
            currentCols = [[],[],[],[],[]]
        })

        return winners
    }

    let win = []
    let currentMarker

    
    for (let i = 0; i < markers.length; i++) {
        draw(markers[i])
        console.log('runda', i + 1, 'marker:', markers[i])
        const winners = checkWinners()
        if (winners.length > 0) {
            console.log('są wygrani')
            currentMarker = markers[i]
            console.log(markers[i])
            win = winners
            break
        }
    }
    
    if (win.length > 0) {
        console.log(win)
        let score = 0
        boards[win[0]].forEach(row => {
            row.forEach(col => {
                if (!col.isMarked) {
                    score += col.value
                }
            })
        })
        console.log(score)

        console.log(score * currentMarker)
    }

    console.log(boards[1])

    // [board][row][col]
    // boards[0][0][1].isMarked = true
    // console.log(boards[0])

    // console.log(markers)
}

console.log(result())