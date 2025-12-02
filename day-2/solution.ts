

function day2() {
	const fs = require('fs');

	const isTest = process.argv[2] === '--test';

	const file = isTest ? 'test.txt' : 'input.txt';
	const data = fs.readFileSync(file, 'utf8')
		.trim()
		.split(/,/)
	let sumV1 = 0
	let sumV2 = 0
	data.forEach((idsRow: string) => {
		const ids = idsRow.split('-').map((id) => parseInt(id))
		for (let i = ids[0]; i <= ids[1]; i++) {
			if (!isValidIDV1(i.toString())) {
				sumV1 += i
			}
			if (!isValidIDV1(i.toString()) || !isValidIDV2(i.toString())) {
				sumV2 += i
			}
		}
	});
	return [sumV1, sumV2]
}
// Part 1
function isValidIDV1(id: string) {
	if (id[0] === '0') { return false }
	if (id.length % 2 === 1) { return true }
	else {
		if (id.slice(0, id.length / 2) === id.slice(id.length / 2)) { return false }
	}
	return true;
}
// Part 2
function isValidIDV2(id: string) {
	let substring = id.slice(0, id.length / 2) // max substring
	let isValid = true
	while (substring.length > 0) {
		if (id.length % substring.length === 0) {
			const possibleFrequency = id.length / substring.length
			if (!isValidSubstring(id, substring, possibleFrequency)) {
				return false
			}
		}
		substring = substring.slice(0, substring.length - 1)
	}
	return isValid;
}

function isValidSubstring(id: string, substring: string, possibleFrequency: number): boolean {
	for (let i = 1; i < possibleFrequency; i++) {
		if (id.slice(substring.length * i, substring.length * (i + 1)) !== substring) {
			return true
		}
	}
	return false
}

console.log(day2())