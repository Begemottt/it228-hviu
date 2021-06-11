// Verbs.js
// This is a component for rendering and handling the verb buttons
// It will take in the event handler functions!
import React from "react";
import getSquareData from "./GetSquareData";
import handleEvent from "./EventHandler";

export default function Verbs(props){
    const position = props.playerPosition;
    let buttons = props.buttons;

    const doVerb = (type) =>{
        let squareData = {};
        switch(position.facing){
            case "north":
                squareData = getSquareData(props.mapData, position.x, (position.y - 1));
            break;
            case "south":
                squareData = getSquareData(props.mapData, position.x, (position.y + 1));
            break;
            case "west":
                squareData = getSquareData(props.mapData, (position.x - 1), position.y);
            break;
            case "east":
                squareData = getSquareData(props.mapData, (position.x + 1), position.y);
            break;
        }
        enactVerb(squareData, type);
    }
    const enactVerb = (data, type) => {
        if (handleEvent(data.event).type === type){
            props.event(handleEvent(data.event));
        } else {
            switch(type){
                case "look":
                    props.log("You look " + position.facing + " and see a " + data.type + ".");
                break;
                case "push":
                    props.log("You push in vain against the " + data.type + "!");
                break;
                case "listen":
                    props.log("You listen carefully, but don't hear anything....");
                break;
                case "open":
                    props.log("There's nothing to open!");
                break;
                case "speak":
                    props.log("You speak, but nobody responds....");
                break;
            }
        }
    }

    return(
        <>
        <button onClick={()=> doVerb(buttons[0].event)}>{buttons[0].text}</button>
        <button onClick={()=> doVerb(buttons[1].event)}>{buttons[1].text}</button>
        <button onClick={()=> doVerb(buttons[2].event)}>{buttons[2].text}</button>
        <button onClick={()=> doVerb(buttons[3].event)}>{buttons[3].text}</button>
        <button onClick={()=> doVerb(buttons[4].event)}>{buttons[4].text}</button>

        </>
    )
}