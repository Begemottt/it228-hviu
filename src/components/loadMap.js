// loadMap.js
// A component that takes in the map array and data, and returns an array filled with said data
// It is a two-dimensional array, always square, with the size being the square root of the full size of the data

export default function  loadMap (name){
    let data = require('../data/map_' + name +'.json');
    let newMap = [];
    for (let i = 0; i < Math.sqrt(data.length); i++){ // Remember: the map has to be square, otherwise this breaks!
        newMap[i] = [];
    }
    let size = newMap.length; // Critical that this is here, after the newMap array is filled up with arrays, giving it the proper length
    for (let i = 0; i < size; i++ ){
        for (let j = 0; j < size; j++){
            newMap[i][j] = data[(j + (size * i))]; // This means coordinates are [y][x]!
        }
    }
    return newMap; // Don't forget to return the array!!
}