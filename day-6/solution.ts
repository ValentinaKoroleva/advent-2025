function day6() {
	const fs = require('fs');

	const isTest = process.argv[2] === '--test';

	const file = isTest ? 'test.txt' : 'input.txt';
	const input = fs.readFileSync(file, 'utf8').trim()
	const numbers = fs.readFileSync(file, 'utf8')
		.trim()
		.match(/[0-9]+/g)
		.map(Number)
	const operations = fs.readFileSync(file, 'utf8')
		.trim()
		.match(/[\*\+]/g)
	return [part1(numbers, operations), part2(input, input.split(/\n/)[0].length)]
}

// Part 1
function part1(numbers: number[], operations: string[]): number {
	const n = operations.length
	let sumV1 = 0
	for (let i = 0; i < n; i++) {
		let res = 0;
		for (let j = i; j < numbers.length; j = j + n) {
			if (operations[i] === '*') {
				if (res === 0) { res = 1 }
				res *= numbers[j]
			} else { res += numbers[j] }
		}
		sumV1 += res
	}

	return sumV1
}

// Part 2
function part2(input: string, nCols: number): number {
	let sum = 0
	let square = input.split('').length;
	let nRows = Math.floor(square / nCols)
	let matrix = Array.from({ length: nRows }, () => new Array(nCols))
	let chars = input.replace(/\n/g, '').split('')
	for (let i = 0; i < nRows; i++) {
		for (let j = 0; j < nCols; j++) {
			matrix[i][j] = chars.shift()
		}
	}
	let temp = []
	for (let j = nCols - 1; j >= 0; j--) {
		let numberStr = ''
		for (let i = 0; i < nRows; i++) {
			const cell = matrix[i][j] ?? ''
			if(cell.match(/[0-9]/)) { 
				numberStr += cell
			} else if(cell === '*') {
				temp.push(Number(numberStr))
				sum += temp.reduce((a, b) => a * b, 1)
				numberStr = ''
				temp = []
			} else if(cell === '+') {
				temp.push(Number(numberStr))
				sum += temp.reduce((a, b) => a + b, 0)
				numberStr = ''
				temp = []
			}
		}
		if(numberStr !== '') {temp.push(Number(numberStr))}
	}
	return sum
}


console.log(day6())
