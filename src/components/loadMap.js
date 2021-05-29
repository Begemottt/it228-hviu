export default function  loadMap (map, data, size){
    let newMap = map;
    for (let i = 0; i < size; i++ ){
        for (let j = 0; j < size; j++){
            newMap[i][j] = data[(j + (size * i))];
        }
    }
    return newMap;
}