// DrawView.js
// This is the component that draws the view of the dungeon based on the current map and player position.
import React from "react";
import getSquareData from "./GetSquareData";

export default function DrawView(data){
    let facing = data.position.facing;
    let x = data.position.x;
    let y = data.position.y
    let viewCoordinates = {
        left:[],
        middle:[],
        right:[],
        back: ""
    }
    switch(facing){
        case "north":
            for(let i = -3; i <= 0; i++){
                viewCoordinates.left.push(getSquareData(data.map, x-1, y+i, data.size).type);
                viewCoordinates.middle.push(getSquareData(data.map, x, y+i, data.size).type);
                viewCoordinates.right.push(getSquareData(data.map, x+1, y+i, data.size).type);
            }
        break;
        case "south":
            for(let i = 3; i >= 0; i--){
                viewCoordinates.left.push(getSquareData(data.map, x+1, y+i, data.size).type);
                viewCoordinates.middle.push(getSquareData(data.map, x, y+i, data.size).type);
                viewCoordinates.right.push(getSquareData(data.map, x-1, y+i, data.size).type);
            }
        break;
        case "west":
            for(let i = -3; i <= 0; i++){
                viewCoordinates.left.push(getSquareData(data.map, x+i, y+1, data.size).type);
                viewCoordinates.middle.push(getSquareData(data.map, x+i, y, data.size).type);
                viewCoordinates.right.push(getSquareData(data.map, x+i, y-1, data.size).type);
            }
        break;
        case "east":
            for(let i = 3; i >= 0; i--){
                viewCoordinates.left.push(getSquareData(data.map, x+i, y-1, data.size).type);
                viewCoordinates.middle.push(getSquareData(data.map, x+i, y, data.size).type);
                viewCoordinates.right.push(getSquareData(data.map, x+i, y+1, data.size).type);
            }
        break;
    }
    if(viewCoordinates.middle[2] === "wall"){
        viewCoordinates.back = "zero_away";
    }  else if(viewCoordinates.middle[1] === "wall"){
        viewCoordinates.back = "one_away";
    }  else if(viewCoordinates.middle[0] ==="wall"){
        viewCoordinates.back = "two_away";
    } else {
        viewCoordinates.back = "none";
    }
    return(
        <>
        <section id="ceiling"></section>
        <section id="left_wall">
            <div id="left_wall1" className={viewCoordinates.left[3]}></div>
            <div id="left_wall2" className={viewCoordinates.left[2]}></div>
            <div id="left_wall3" className={viewCoordinates.left[1]}></div>
        </section>
        <section id="back_wall" className={viewCoordinates.back}></section>
        <section id="right_wall">
            <div id="right_wall1" className={viewCoordinates.right[1]}></div>
            <div id="right_wall2" className={viewCoordinates.right[2]}></div>
            <div id="right_wall3" className={viewCoordinates.right[3]}></div>
        </section>
        <section id="floor"></section>
        </>
    )
}