const dijkstra = require('dijkstrajs');
const find_path = dijkstra.find_path;


// distance between different nodes
const distances = {
	adjacentNode: 1,
	nextRowNode: 4
};


// Creating a graph of 80 train seats where each row has 7 seats
// BEGIN
const graph = {};
for (let i = 0; i < 80; i++) {
	graph[i] = {}
}
for (let i = 0; i < 11; i++) {
	for (let j = 0; j < 6; j++) {
		const currentNode = 7 * i + j;
		const adjacentNode = currentNode + 1;
		const nextRowNode = currentNode + 7;

		graph[currentNode][adjacentNode] = distances.adjacentNode;
		graph[adjacentNode][currentNode] = distances.adjacentNode;
		if (i < 10) {
			graph[currentNode][nextRowNode] = distances.nextRowNode;
			graph[nextRowNode][currentNode] = distances.nextRowNode;
			if (j === 6) {
				graph[adjacentNode][adjacentNode + 7] = distances.nextRowNode;
				graph[adjacentNode + 7][adjacentNode] = distances.nextRowNode;
			}
		}
	}
}
graph[77][78] = 1;
graph[78][77] = 1;
graph[78][79] = 1;
graph[79][78] = 1;
graph[78][79] = 1;
graph[79][78] = 1;
graph[78][71] = 4;
graph[71][78] = 4;
graph[79][72] = 4;
graph[72][79] = 4;
// END

// for internal use only
// takes a array containing seat numbers as input
// returns the total distance covered to traverse path
// assumption: adjacent seat numbers in path array are connected 
function getCostFromPath(path) {
	let cost = 0;
	for (let i = 0; i <= path.length - 2; i++) {
		const currentVertex = path[i];
		const nextVertex = path[i + 1];
		cost += parseInt(graph[currentVertex][nextVertex]);
	}
	return cost;
}


// I should have used Johnson’s algorithm but couldn't find any npm package
// so i have used dijkstra alogithm
// this function returns a object with seat number as keys
// array corresponding to each key is sorted with respect to distance
// {
// 		'0': [ { seat: 0, distance: 0 } , { seat: 1, distance: 1 }, .... so on]
// }
function getShortestDistanceBetweenAllPairs() {
	const superObj = {};
	for (let i = 0; i < 80; i++) {
		const distanceArr = [];
		for (let j = 0; j < 80; j++) {
			const path = find_path(graph, i + '', j + '');
			const cost = parseInt(getCostFromPath(path));
			distanceArr.push({ vertex: j, distance: cost })
		}
		distanceArr.sort((a, b) => a.distance - b.distance);
		superObj[i] = distanceArr;
	}
	return superObj;
}


// we can use this same object for any train
const superObj = getShortestDistanceBetweenAllPairs();


// for external use
// it returns a object containing seats allocated and cost of allotment
// this function O(n) will be extensively used
function getBestPossibleSeats(numberOfSeats, seatReserved) {
	console.log(numberOfSeats, seatReserved)
	const bestCase = {
		cost: Number.MAX_SAFE_INTEGER,
		seats: []
	}
	for (let i = 0; i < 80; i++) {
		if (seatReserved.indexOf(i + '') === -1) {
			sortedSeatsArr = superObj[i];
			let cost = 0;
			const seatsArr = [];
			sortedSeatsArr = sortedSeatsArr.filter(seatObj => seatReserved.indexOf(seatObj.vertex + '') === -1)
			if(sortedSeatsArr.length < numberOfSeats){
				return false;
			}
			for (let j = 0; j < numberOfSeats; j++) {
				seatsArr.push(sortedSeatsArr[j].vertex);
				cost += parseInt(sortedSeatsArr[j].distance);
			}
			if (bestCase.cost > cost) {
				bestCase.cost = cost;
				bestCase.seats = seatsArr;
			}
		}
	}
	return bestCase.seats;
}

module.exports = getBestPossibleSeats;

/* const filledSeats = ['1', '3', '7', '14', '21', '35', '42', '49', '56', '63', '70', '77'];
console.log(getBestPossibleSeats(7, filledSeats)); */