function day5() {
	const fs = require('fs');

	const isTest = process.argv[2] === '--test';

	const file = isTest ? 'test.txt' : 'input.txt';
	const data = fs.readFileSync(file, 'utf8')
		.trim()
		.split(/\n\n/)

	return [part12(data)]
}

// Part 1
function part12(data: string[]): number[] {
	const freshGoodsRanges = data[0].trim().split(/\s+/)
	const availableGoods = data[1].trim().split(/\s+/)
	let sumV1 = 0

	let ranges: { [key: string]: string } = {}
	freshGoodsRanges.forEach((id) => {
		const rightNew = Number(id.split('-')[1])
		const rightOld = Number(ranges[id.split('-')[0]] ?? '0')
		if (!!ranges[id.split('-')[0]]) {
			if (rightNew > rightOld) {
				ranges[id.split('-')[0]] = id.split('-')[1]
			}
		} else {
			ranges[id.split('-')[0]] = id.split('-')[1]
		}

	})

	availableGoods.forEach((id) => {
		const filteredObj = Object.entries(ranges)
			.filter(([key, value]) => Number(id) >= Number(key) && Number(value) >= Number(id))
		if (filteredObj.length > 0) {
			sumV1++
		}
	})
	// Part 2
	let sumV2 = 0
	let prevRight = 0
	let prevLeft = 0
	Object.keys(ranges).map(Number).sort((a, b) => a - b).forEach((key) => {
		const left = Number(key)
		const right = Number(ranges[key])
		if (right <= prevRight) { sumV2 += 0 }  // Бесполезная строка
		else {
			if (left === prevLeft) {
				if (right > prevRight) {
					sumV2 += (right - prevRight)
				}
			}
			else if (left <= prevRight) {
				if (right - prevRight > 0) { sumV2 += (right - prevRight) }
			}
			else { sumV2 += (right - left) + 1 }
		}
		prevRight = right
		prevLeft = left
	})

	// // 
	// // Part 2 - вычисление общей длины объединённых интервалов
	// let sumV2 = 0;
	// let mergedRanges: Array<[number, number]> = [];

	// // Сортируем интервалы по левой границе
	// const sortedKeys = Object.keys(ranges)
	// 	.map(Number)
	// 	.sort((a, b) => a - b);

	// // Сливаем перекрывающиеся интервалы
	// sortedKeys.forEach(key => {
	// 	const currentLeft = key;
	// 	const currentRight = ranges[key];

	// 	// Если это первый интервал или интервалы не перекрываются
	// 	if (mergedRanges.length === 0 || currentLeft > mergedRanges[mergedRanges.length - 1][1]) {
	// 		mergedRanges.push([currentLeft, currentRight]);
	// 	} else {
	// 		// Расширяем последний интервал, если нужно
	// 		const lastIndex = mergedRanges.length - 1;
	// 		mergedRanges[lastIndex][1] = Math.max(mergedRanges[lastIndex][1], currentRight);
	// 	}
	// });

	// // Считаем общую длину
	// sumV2 = mergedRanges.reduce((total, [left, right]) => {
	// 	return total + (right - left) + 1;  // +1 включая обе границы
	// }, 0);

	// 350684792662845
	return [sumV1, sumV2]
}




console.log(day5())
