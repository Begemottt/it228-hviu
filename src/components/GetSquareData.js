// GetSquareData.js
// A function to return the data from a map square, or a default set if the square is off the map!
export default function getSquareData(map, x, y){
    let mapSize = map.length;
    let myReturn = {};
    if(x < 0 || y < 0 || x >= mapSize || y >= mapSize){
        myReturn = {id:"0", type:"wall", event:"0"};
    }else {
        myReturn = map[y][x];
    }
    return myReturn;
}