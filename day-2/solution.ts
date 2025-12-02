

function day2() {
	const fs = require('fs');

	const isTest = process.argv[2] === '--test';

	const file = isTest ? 'test.txt' : 'input.txt';
	const data = fs.readFileSync(file, 'utf8')
		.trim()
		.split(/,/);
	let sum = 0
	data.forEach((idsRow: string) => {
		const ids = idsRow.split('-').map((id) => parseInt(id))
		for (let i = ids[0]; i <= ids[1]; i++) {
			if (!isValidID(i.toString())) {
				sum += i
			}
		}
	});
	return sum
}

function isValidID(id: string) {
	if (id[0] === '0') { return false }
	if (id.length % 2 === 1) { return true }
	else {
		if (id.slice(0, id.length / 2) === id.slice(id.length / 2)) { return false }
	}
	return true;
}

console.log(day2())