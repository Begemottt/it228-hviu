// loadScript.js
// This is a component that takes in a simple integer and returns an array based on the script data from the proper JSON file.
export default function loadScript(name){
    let data = require('../data/dialogue/script_' + name +'.json');
    let returnArray = [];
    for (let i = 0; i < data.length; i++){
        returnArray[i] = data[i];
    }
    return returnArray; // Don't forget to return the array!!
}