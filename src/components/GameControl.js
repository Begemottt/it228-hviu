// This will be the component that controls the current game state, and calls the appropriate components for that state
import React, { useState } from 'react';
import Log from "./Log";
import FullLog from "./FullLog";
import testMapData from "../data/test_map.json";
import loadMap from "./loadMap";
import movePlayer from "./MovePlayer";
import getSquareData from "./GetSquareData";
import DrawMap from "./DrawMap";
import DrawView from "./DrawView";

export default function GameControl(){
    // Functions for the log! Just toss a string into writeLog and it'll show up there.
    const [logList, writeLog] = useState(["Welcome to the Heartless Voids of the Universe!"]); // First, delcare useState
    const checkLogLength = () => { // A function to check the length, and pop the end off if it's too long
        if(logList.length > 1000){ // This sets the limit for the number of lines saved in the log array
            var newLog = logList;
            newLog.pop();
            writeLog(newLog);
        }
    }
    const addLog = message => { // Adding a new message to the log! Also checks the length every time.
        checkLogLength();
        writeLog(oldLog => [message, ...oldLog]);
    }
    // Function for blurring different sections
    const Blur = (name) =>{ // valid input: "header", "dungeon", "verb", or "move"
        let object = document.getElementById(name+"_blur");
        object.classList.toggle("active"); // Use again to remove blur!
    }
    // State for opening and closing windows! Also activates a blur on the whole rest of the UI.
    const [logOpen, changeLog] = useState(true);
    const toggleLogWindow=()=>{
        changeLog(!logOpen);
        Blur("full");
    }
    // Map functions for testing
    const checkPos = (data) => {
        console.log(
            "The player is at " + playerPosition.x + ", " + playerPosition.y + " facing " + 
                playerPosition.facing + " and the number in that square is: " + data[playerPosition.x][playerPosition.y].id
        )
    };
    const Look = (data, direction) => {
        let x = 0, y = 0;
        switch(direction){
            case "north":
                x = (playerPosition.x);
                y = (playerPosition.y - 1);
            break;
            case "east":
                x = (playerPosition.x + 1);
                y = (playerPosition.y);
            break;
            case "south":
                x = (playerPosition.x);
                y = (playerPosition.y + 1);
            break;
            case "west":
                x = (playerPosition.x - 1);
                y = (playerPosition.y);
            break;
        }
        let myReturn = "You look "+ direction +" and see the number " + data[y][x].id + " written on the ground!";
        return myReturn;
    }

    // Functions for handling the map
    const [playerPosition, changePosition] = useState({
        x:0,
        y:0,
        facing: "east"
    })
    var testMap = [[],[],[],[],[]];
    const mapSize = 5;
    testMap = loadMap(testMap, testMapData, mapSize);
    // Function for handling movement and turning. Very messy! Updates the playerPosition state
    const Movement = (direction) => {
        let data = {};
        switch(direction){
            case "up":
                data = movePlayer(testMap, playerPosition, "forwards", mapSize);
                changePosition({x:data.x, y:data.y, facing:playerPosition.facing});
                addLog(data.message);
            break;
            case "down":
                data = movePlayer(testMap, playerPosition, "backwards", mapSize);
                changePosition({x:data.x, y:data.y, facing:playerPosition.facing});
                addLog(data.message);
            break;
            case "left":
                switch(playerPosition.facing){
                    case "north":
                        changePosition({x:playerPosition.x, y:playerPosition.y, facing:"west"});
                        addLog("You turn to the left and face west.");
                    break;
                    case "east":
                        changePosition({x:playerPosition.x, y:playerPosition.y, facing:"north"});
                        addLog("You turn to the left and face north.");
                    break;
                    case "south":
                        changePosition({x:playerPosition.x, y:playerPosition.y, facing:"east"});
                        addLog("You turn to the left and face east.");
                    break;
                    case "west":
                        changePosition({x:playerPosition.x, y:playerPosition.y, facing:"south"});
                        addLog("You turn to the left and face south.");
                    break;
                };
            break;
            case "right":
                switch(playerPosition.facing){
                    case "north":
                        changePosition({x:playerPosition.x, y:playerPosition.y, facing:"east"});
                        addLog("You turn to the right and face east.");
                    break;
                    case "east":
                        changePosition({x:playerPosition.x, y:playerPosition.y, facing:"south"});
                        addLog("You turn to the right and face south.");
                    break;
                    case "south":
                        changePosition({x:playerPosition.x, y:playerPosition.y, facing:"west"});
                        addLog("You turn to the right and face west.");
                    break;
                    case "west":
                        changePosition({x:playerPosition.x, y:playerPosition.y, facing:"north"});
                        addLog("You turn to the right and face north.");
                    break;
                };
                
            break;
        }
    }


    return(
        <>
        <main>
        <article id="header_menus">
            <section id="title">
                <p id="logo">THE HEARTLESS VOIDS AND IMMENSITIES OF THE UNIVERSE</p>
            </section>
            <section id="inventory">
                <button id="inv_menu">Inventory</button>
            </section>
            <section id="equipment">
                <button id="equip_menu">Equipment</button>
            </section>
            <section id="status">
                <button id="status_menu">Status</button>
            </section>
            <div id="header_blur" className="blur"></div>
        </article>
        <article id="map">
            <section id="map_grid">
                < DrawMap
                    map={testMap}
                    position={playerPosition}
                    size={mapSize}
                />
            </section>
            <section id="map_caption">
                <p>Floor 1</p>
            </section>
        </article>
        <article id="view">
            < DrawView
                map={testMap}
                position={playerPosition}
                size={mapSize}
            />
            <div id="dungeon_blur" className="blur"></div>
        </article>
        <article id="verbs">
            <button onClick={()=> addLog("Hear....")}>Hear</button>
            <button onClick={()=> addLog("Feel....")}>Feel</button>
            <button onClick={()=> addLog("Think....")}>Think</button>
            <div id="verb_blur" className="blur"></div>
        </article>
        <article id="character_portrait"></article>
        <article id="log_view">
            < Log logs={logList} />
            <button id="log_button" onClick={()=>toggleLogWindow()}>Full Log</button>
        </article>
        <article id="move_buttons">
            <div className="empty"></div>
            <button id="up" onClick={()=> Movement("up")}><span id="up_arrow">&gt;</span></button>
            <div className="empty"></div>
            <button id="left" onClick={()=> Movement("left")}><span id="left_arrow">&gt;</span></button>
            <button id="down" onClick={()=> Movement("down")}><span id="down_arrow">&gt;</span></button>
            <button id="right" onClick={()=> Movement("right")}><span id="right_arrow">&gt;</span></button>
            <div id="move_blur" className="blur"></div>
        </article>
        <div id="full_blur" className="blur"></div>
        </main>
        <article id="debug">
            <button onClick={()=> console.table(testMap)}>Check Map Data</button>
            <button onClick={()=> checkPos(testMap)}>Check Position</button>
            <button onClick={()=> console.log(getSquareData(testMap, playerPosition.x, playerPosition.y, mapSize))}>Check Square</button>
        </article>
        {/* Windows */}
        {logOpen
        ? null
        : <>< FullLog logs={logList} /> <button id="close_log" onClick={()=>toggleLogWindow()}>X</button> </>
        }

        </>
    ) // end return
}