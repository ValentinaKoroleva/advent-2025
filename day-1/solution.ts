

function day1() {
	const fs = require('fs');

	const isTest = process.argv[2] === '--test';

	const file = isTest ? 'test.txt' : 'input.txt';
	const data = fs.readFileSync(file, 'utf8')
		.trim()
		.split(/\s+/);
	let countV1 = 0;
	let countV2 = 0;
	let pos = 50;
	data.forEach((move: string) => {
		const direction = move[0];
		const distance = parseInt(move.slice(1));
		const isLeft = direction === 'L';
		const rotations = Math.floor(distance / 100);
		const remainder = distance - (rotations * 100);

		let interim = isLeft ? pos - remainder : pos + remainder;
		// part 1
		if (trueModulo(interim, 100) === 0) {
			countV1++
		}
		// part 2

		countV2 += rotations
		if (pos !== 0 && interim <= 0 || interim > 99) { countV2 += 1 }



		pos = trueModulo(interim, 100)
	});
	return [countV1, countV2]
}
// 6175

function trueModulo(dividend: number, divisor: number) {
	return ((dividend % divisor) + divisor) % divisor;
}

console.log(day1())