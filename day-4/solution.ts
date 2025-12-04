function day4() {
	const fs = require('fs');

	const isTest = process.argv[2] === '--test';

	const file = isTest ? 'test.txt' : 'input.txt';
	const data = fs.readFileSync(file, 'utf8')
		.trim()
		.split(/\s+/)

	return [part1(data), part2(data)]
}

// Part 1
function part1(data: string[]): number {
	let sumV1 = 0
	const nCols = data[0].length
	const nRows = data.length
	let matrix = Array.from({ length: nRows }, () => new Array(nCols))
	data.forEach((rowOfRolls: string, x: number) => {
		let rolls = rowOfRolls.split('')
		matrix[x] = rolls
	});

	for (let x = 0; x < nRows; x++) {
		for (let y = 0; y < nCols; y++) {
			if (matrix[x][y] === '@') {
				if (isRollAvailable(matrix, x, y)) {
					sumV1++
				}
			}
		}
	}

	return sumV1
}

function isRollAvailable(matrix: string[][], x: number, y: number): boolean {
	const nCols = matrix[0].length
	const nRows = matrix.length

	let count = 0;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (i === 0 && j === 0) { continue }
			else if (x + i < 0 || x + i >= nRows || y + j < 0 || y + j >= nCols) { continue }
			else {
				if (matrix[x + i][y + j] === '@') {
					count++
					if (count >= 4) { return false }
				}
			}
		}
	}

	return true
}

// Part 2
//
function part2(data: string[]) {
	const nCols = data[0].length
	const nRows = data.length
	let matrix = Array.from({ length: nRows }, () => new Array(nCols))
	data.forEach((rowOfRolls: string, x: number) => {
		let rolls = rowOfRolls.split('')
		matrix[x] = rolls
	});
	let sum = 0;
	let sumIteration = getRolls(matrix)[0]
	let newMatrix = getRolls(matrix)[1]
	while (sumIteration > 0) {
		sum += sumIteration
		sumIteration = getRolls(newMatrix)[0]
		newMatrix = getRolls(newMatrix)[1]
	}

	for (let x = 0; x < newMatrix.length; x++) {
		for (let y = 0; y < newMatrix[0].length; y++) {
			if (newMatrix[x][y] === 'x') {
				newMatrix[x][y] = '@'
			}
		}
	}
	return sum
}


function getRolls(matrix: string[][]): [number, string[][]] {
	let sumV1 = 0
	const nCols = matrix[0].length
	const nRows = matrix.length

	let newMatrix = structuredClone(matrix)
	for (let x = 0; x < nRows; x++) {
		for (let y = 0; y < nCols; y++) {
			if (matrix[x][y] === '@') {
				if (isRollAvailable(matrix, x, y)) {
					newMatrix[x][y] = 'x'
					sumV1++
				}
			}
		}
	}
	return [sumV1, newMatrix]
}

console.log(day4())
