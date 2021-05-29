// DrawMap.js
// This is a component that handles both the mini-map and the map view
import React from "react";
import getSquareData from "./GetSquareData";

export default function DrawMap(data){
    let mapArray = new Array();
    for(let i = -2; i < 3; i++){
        for(let j = -2; j < 3; j++){
            let status = getSquareData(data.map, data.position.x + j, data.position.y + i, data.size).type;
            mapArray.push(status);
        }
    }
    mapArray[12] = data.position.facing;

    return(
        <>
        {mapArray.map((item, i) => (
            <div className={item} key={i}></div>
        ))}
        </>
    )
}