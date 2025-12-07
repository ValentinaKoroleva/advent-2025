function day6() {
	const fs = require('fs');

	const isTest = process.argv[2] === '--test';

	const file = isTest ? 'test.txt' : 'input.txt';
	const input = fs.readFileSync(file, 'utf8').trim()

	return part12(input, input.split(/\n/)[0].length)
}

// Part 1
function part12(input: string, nCols: number): number[] {
	let sumV1 = 0
	let square = input.split('').length;
	let nRows = Math.floor(square / nCols) - 1
	let chars = input.replace(/\n/g, '').split('')
	let matrix = Array.from({ length: nRows }, () => new Array(nCols))
	for (let i = 0; i < nRows; i++) {
		for (let j = 0; j < nCols; j++) {
			matrix[i][j] = chars.shift()
		}
	}
	const nextBeams: Map<number, number> = new Map();
	for (let row = 0; row < nRows; row++) {
		for (let col = 0; col < nCols; col++) {
			if (matrix[row][col] === 'S') {
				matrix[row + 1][col] = '|'
			}
			if (matrix[row][col] === '^' && matrix[row - 1][col] === '|') {
				matrix[row][col - 1] = "|"
				matrix[row][col + 1] = "|"
				matrix[row - 1][col] = "|"
				sumV1++
			}
			if (matrix[row][col] === '.' && row - 1 >= 0 && matrix[row - 1][col] === '|') {
				matrix[row][col] = '|'
			}
		}
	}

	// console.log(matrix.map(row => row.join('')).join('\n'))


	return [sumV1, 0]
}


console.log(day6())
