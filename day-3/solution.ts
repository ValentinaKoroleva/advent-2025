

function day3() {
	const fs = require('fs');

	const isTest = process.argv[2] === '--test';

	const file = isTest ? 'test.txt' : 'input.txt';
	const data = fs.readFileSync(file, 'utf8')
		.trim()
		.split(/\s+/)

	return [part1(data), part2(data)]
}

// Part 1
function part1(data: string[]) {
	let sumV1 = 0
	data.forEach((bank: string) => {
		let batteries = bank.split('').map((id) => parseInt(id))
		let joltage = 0
		for (let i = 9; i > 0; i--) {
			if (batteries.includes(i)) {
				let remainder = batteries.slice(batteries.indexOf(i) + 1)
				if (remainder.length > 0) {
					joltage = parseInt([i, Math.max(...remainder)].join(''))
					break
				}
			}
		}
		sumV1 += joltage

	});
	return sumV1
}

// Part 2
// 999 999 999 999 abs max
//
function part2(data: string[]) {
	let sumV2 = 0
	// findJoltageTwoInts([2,1])
	data.forEach((bank: string) => {
		let batteries = bank.split('').map((id) => parseInt(id))
		let [joltage, _] = findJoltage('', batteries)
		sumV2 += parseInt(joltage)

	});
	return sumV2
}

console.log(day3())

function findJoltage(joltage: string, arr: number[]): [string, number[]] {
	if (joltage.length === 12) { return [joltage, []] }
	else {
		for (let i = 9; i > 0; i--) {
			if (arr.includes(i)) {
				let remainder = arr.slice(arr.indexOf(i) + 1)
				if( joltage.length + 1 + remainder.length < 12) {
					continue;
				} else {
					return findJoltage(joltage + i.toString(), remainder)
				}
				
			}
		}
	}
	return [joltage, arr]
}