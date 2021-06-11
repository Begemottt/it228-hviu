// MovePlayer.js
// This is a function that takes in the current map, the player's positional data, and the direction they're moving
// And returns a new position for them to be in, plus a message to write to the log.
// It uses the GetSquareData function to check the square.
import getSquareData from "./GetSquareData";

export default function movePlayer(map, position, direction) {
    let x = 0, y = 0, facing = position.facing, modifier = 0;
    switch(direction){
        case "forwards":
            modifier = 1;
        break;
        case "backwards":
            modifier = -1;
        break;
    }
    switch(facing){
        case "north":
            x = (position.x);
            y = (position.y - modifier);
        break;
        case "south":
            x = (position.x);
            y = (position.y + modifier);
        break;
        case "east":
            x = (position.x + modifier);
            y = (position.y);
        break;
        case "west":
            x = (position.x - modifier);
            y = (position.y);
        break;
    }
    let square = getSquareData(map, x, y);
    switch(square.type){
        case "wall":
            return {x:position.x, y:position.y, message:"Ouch! You bump into a wall."};
        break;
        case "floor":
            if(direction==="forwards"){
                return {x:x, y:y, message:"You move " + facing + "."};
            } else {
                return {x:x, y:y, message:"You carefully move backwards while still facing " + facing + "."}
            }
        break;
        case "door":
            return {x:position.x, y:position.y, message:"Bonk! You run into the door."};
        break;
    }
}