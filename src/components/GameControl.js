// This will be the component that controls the current game state, and calls the appropriate components for that state
import React, { useState } from 'react';
import Log from "./Log";
import FullLog from "./FullLog";

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
    // Let's test out some map data!
    const mapData = [
        [{id:1},{id:2},{id:3},{id:4},{id:5}],
        [{id:6},{id:7},{id:8},{id:9},{id:10}],
        [{id:11},{id:12},{id:13},{id:14},{id:15}],
        [{id:16},{id:17},{id:18},{id:19},{id:20}],
        [{id:21},{id:22},{id:23},{id:24},{id:25}],
    ];
    const printMap = (data) => {console.table(data)};
    const checkPos = (data) => {
        console.log(
            "The player is at " + playerPos.x + ", " + playerPos.y + " and the number in that square is: " + data[playerPos.x][playerPos.y].id
        )
    };
    const Look = (data, direction) => {
        let x = 0, y = 0;
        switch(direction){
            case "north":
                x = (playerPos.x);
                y = (playerPos.y - 1);
            break;
            case "east":
                x = (playerPos.x + 1);
                y = (playerPos.y);
            break;
            case "south":
                x = (playerPos.x);
                y = (playerPos.y + 1);
            break;
            case "west":
                x = (playerPos.x - 1);
                y = (playerPos.y);
            break;
        }
        console.log("You look "+ direction +" and see the number " + data[y][x].id + " written on the ground!");
    }

    var playerPos = {
        x:2,
        y:2,
        facing: "north"
    };

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
            <section id="map_grid"></section>
            <section id="map_caption">
                <p>Floor 1</p>
            </section>
        </article>
        <article id="view">
            <section id="ceiling"></section>
            <section id="left_wall"></section>
            <section id="back_wall"></section>
            <section id="right_wall"></section>
            <section id="floor"></section>
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
            <button id="up" onClick={()=> Look(mapData, "north")}><span id="up_arrow">&gt;</span></button>
            <div className="empty"></div>
            <button id="left" onClick={()=> Look(mapData, "west")}><span id="left_arrow">&gt;</span></button>
            <button id="down" onClick={()=> Look(mapData, "south")}><span id="down_arrow">&gt;</span></button>
            <button id="right" onClick={()=> Look(mapData, "east")}><span id="right_arrow">&gt;</span></button>
            <div id="move_blur" className="blur"></div>
        </article>
        <div id="full_blur" className="blur"></div>
        </main>
        <article id="debug">
            <button onClick={()=> printMap(mapData)}>Print Map Data</button>
            <button onClick={()=> checkPos(mapData)}>Check Position</button>
        </article>
        {/* Windows */}
        {logOpen
        ? null
        : <>< FullLog logs={logList} /> <button id="close_log" onClick={()=>toggleLogWindow()}>X</button> </>
        }

        </>
    ) // end return
}