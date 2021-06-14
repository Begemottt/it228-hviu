// This will be the component that controls the current game state, and calls the appropriate components for that state
// [ Libraries ]
import React, { useState } from 'react';
// [ Components ]
import Log from "./Log";
import FullLog from "./FullLog";
import loadMap from "./loadMap";
import movePlayer from "./MovePlayer";
import DrawMap from "./DrawMap";
import DrawView from "./DrawView";
import eventHandler from "./EventHandler";
import messageHandler from "./MessageHandler";
import Dialogue from "./Dialogue";
import checkHook from "./checkHook";
import Verbs from "./Verbs";
import Modal from "./Modal";
import Battle from "./Battle";
import Loss from "./Loss";
import Stats from "./Stats";
// [ Data ]
import playerStatData from "../data/player_stats.json";

export default function GameControl(){
    // Functions for managing hooks! These aren't React hooks, but rather variables that will tell the game where the player is in terms of certain goals.
    const [hooks, changeHook] = useState(
        {
            paving_stone: true, // [ [ [ THIS IS THE LIST OF HOOKS! ] ] ]
            newbie: true,
            battle1: true,
            battle2: true,
            battle3: true,
            battle4: true,
            unease: true,
            taunt: true
        }
    )
    const setHook = hook => {
        let newValue = hooks;
        newValue[hook] = !newValue[hook];
        setTimeout(() => {
            changeHook(newValue);
        }, 1);
    }

    // Functions for the log! Just toss a string into writeLog and it'll show up there.
    const [logList, writeLog] = useState(["Welcome to the Heartless Voids and Immensities of the Universe!"]); // First, delcare useState
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

    // For opening and closing windows! Also activates a blur on the whole rest of the UI.
    // Full log window
    const [logOpen, changeLog] = useState(false);
    const toggleLogWindow=()=>{
        changeLog(!logOpen);
        Blur("full");
    }
    // Dialogue window
    const [scriptNumber, changeScriptnumber] = useState(0);
    const [dialogueOpen, changeDialogue] = useState(false);
    const toggleDialogueWindow = newNumber =>{
        changeDialogue(!dialogueOpen);
        Blur("full");
        changeScriptnumber(oldvalue=>newNumber);
    }
    // Message window
    const [messageOpen, changeMessageOpen] = useState(false);
    const [windowMessage, changeWindowMessage] = useState({text:"", close:""});
    const [messageClass, changeMessageClass] = useState("inactive");
    const openModal = (newText, newClose) => {
        changeMessageOpen(true);
        let newMessage = {text: newText, close: newClose};
        changeWindowMessage (newMessage);
        setTimeout(() => {
            toggleMessageClass();
        }, 1);
    }
    const closeModal = () => {
        toggleMessageClass();
        setTimeout(() => {
            destroyModal()
        }, 200);
    }
    const destroyModal = () => {
        changeMessageOpen(false);
        changeWindowMessage({text:"", close:""});
    }
    const toggleMessageClass = () =>{
        messageClass === "inactive"
        ? changeMessageClass("active")
        : changeMessageClass("inactive")
    }
    const [statusOpen, changeOpenStatus] = useState(false);
    const toggleStatusWindow = () => {
        let newValue = !statusOpen;
        changeOpenStatus(()=>newValue);
    }
    // Battle window
    const [battleOpen, changeBattleOpen] = useState(false);
    const [battleID, changeBattleID] = useState(0);
    const startBattle = (id) => {
        Blur("full");
        changeBattleOpen(!battleOpen);
        changeBattleID(id);
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
    };

    // Functions for handling the map
    const [playerPosition, changePosition] = useState({
        x:0,
        y:1,
        facing: "east"
    });
    var testMap = [[]];
    testMap = loadMap("demo");

    // Function for handling movement and turning. Very messy! Updates the playerPosition state
    const Movement = (direction) => {
        let data = {};
        switch(direction){
            case "up":
                data = movePlayer(testMap, playerPosition, "forwards");
                if (data.x === playerPosition.x && data.y === playerPosition.y){
                    addLog(data.message);
                } else {
                    changePosition({x:data.x, y:data.y, facing:playerPosition.facing});
                    addLog(data.message);
                    testMap[data.y][data.x].event != 0 ? event(eventHandler(testMap[data.y][data.x].event)) : null;
                }
                
            break;
            case "down":
                data = movePlayer(testMap, playerPosition, "backwards");
                if (data.x === playerPosition.x && data.y === playerPosition.y){
                    addLog(data.message);
                } else {
                    changePosition({x:data.x, y:data.y, facing:playerPosition.facing});
                    addLog(data.message);
                    testMap[data.y][data.x].event != 0 ? event(eventHandler(testMap[data.y][data.x].event)) : null;
                }
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
    };

    // Function for handling events!
    const event = (eventData) =>{
        if(checkHook(eventData.req_hook, hooks) || eventData.req_hook === ""){
            switch(eventData.type){
                case "none":
                    null;
                break;
                case "message" || "hear":
                    addLog(messageHandler(eventData.key));
                break;
                case "important_message":
                    addLog(messageHandler(eventData.key));
                    openModal(messageHandler(eventData.key), "OK");
                break;
                case "damage":
                    addLog(messageHandler(eventData.key));
                    openModal(messageHandler(eventData.key), "Ouch!");
                    damageHP(10);
                break;
                case "dialog":
                    toggleDialogueWindow(eventData.key);
                break;
                case "open":
                    addLog("You open the door and pass through it.");
                    switch(playerPosition.facing){
                        case "north":
                            changePosition({x:playerPosition.x, y:(playerPosition.y + 2), facing:"north"});
                        break;
                        case "south":
                            changePosition({x:playerPosition.x, y:(playerPosition.y - 2), facing:"south"});
                        break;
                        case "east":
                            changePosition({x:playerPosition.x + 2, y:playerPosition.y, facing:"east"});
                        break;
                        case "west":
                            changePosition({x:playerPosition.x -  2, y:playerPosition.y, facing:"west"});
                        break;
                    }
                break;
                case "battle":
                    startBattle(eventData.key);
                    addLog("You are waylaid by enemies!");
                break;
                case "listen":
                    addLog(messageHandler(eventData.key));
                break;
            }
            if(eventData.hook != ""){
                setHook(eventData.hook);
            }
        } else {
            if (eventData.failure != ""){
                addLog(eventData.failure);
            }
            
        }
    }

    // State functions for verb buttons!
    const [verbButtons, updateVerbButtons] = useState([
        {text:"Listen", event:"listen"},
        {text:"Push", event: "push"},
        {text:"Look", event:"look"},
        {text: "Open", event: "open"},
        {text: "Speak", event: "speak"}
    ]);
    const addButton  = (newText, newEvent) => {
        let newButton = {text:newText, event:newEvent};
        let newButtons = verbButtons;
        newButtons.push(newButton);
        updateVerbButtons(newButtons);
    }
    const removeButton = () => {
        let newButtons = verbButtons;
        newButtons.pop();
        updateVerbButtons(newButtons);
    }

    // Functions for player stats!
    // So, the plan is to eventually have like a whole save game system, so the initial player stats will be loaded diretly from that
    // BUT for now, I'm just going to use one set of starting stats for each role
    const [playerStats, changeStats] = useState(playerStatData[0]);
    const [currentHP, alterHP] = useState(playerStats.hp);
    const [currentMP, alterMP] = useState(playerStats.mp);
    // TODO: Functions for setting stats based on equipment
    // These are specifically the current HP, as opposed to max.
    const damageHP = value => {
        alterHP(currentHP => (currentHP - value));
        setTimeout(() => {
            checkDeath(currentHP - value);
        }, 10);
    }
    const checkDeath = HP => {
        if(HP <= 0){
            activateGameOver();
        }
    }
    const [openGameOver, changeOpenGameOver] = useState(false);
    const activateGameOver = () => {
        changeOpenGameOver(true);
    }
    const damageMP = (value) => {
        alterMP(currentMP - value);
    }

    return(
        <>
        <main>
        <article id="header_menus">
            <section id="logo">
                
            </section>
            <section id="inventory">
                <button id="inv_menu">Inventory</button>
            </section>
            <section id="equipment">
                <button id="equip_menu">Equipment</button>
            </section>
            <section id="status">
                <button id="status_menu" onClick={()=>toggleStatusWindow()}>Status</button>
                {statusOpen
                ? < Stats stats={playerStats} currentHP={currentHP} currentMP = {currentMP} />
                :   null
                }
            </section>
            <div id="header_blur" className="blur"></div>
        </article>
        <article id="map">
            <section id="map_grid">
                < DrawMap
                    map={testMap}
                    position={playerPosition}
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
            />
            <div id="dungeon_blur" className="blur"></div>
        </article>
        <article id="verbs">
            < Verbs buttons = {verbButtons} playerPosition={playerPosition} mapData={testMap} event={event} log={addLog} />
            <div id="verb_blur" className="blur"></div>
        </article>
        <article id="character_portrait">
            <p>HP: {currentHP} / {playerStats.hp}</p>
            <p>MP: {currentMP} / {playerStats.mp}</p>
            </article>
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
            <button onClick={()=> toggleDialogueWindow(1)}>Open Dialogue</button>
            <button onClick={()=> damageHP(100)}>Die</button>
            <button onClick={()=> startBattle(1)}>Battle!</button>
        </article>
        {/* Windows */}
        {logOpen
        ? < FullLog logs={logList} closeLog={toggleLogWindow}/>
        : null
        }
        {dialogueOpen
        ? < Dialogue scriptNumber={scriptNumber} closeDialog={toggleDialogueWindow} setHook = {setHook} hooks={hooks} />
        : null
        }
        {messageOpen
        ? <Modal message={windowMessage} close={closeModal} class={messageClass} />
        : null
        }
        {battleOpen
        ? <Battle player={playerStats}
        current_hp={currentHP}
        current_mp={currentMP}
        damage={damageHP}
        spend={damageMP}
        encounterID = {battleID}
        endBattle = {startBattle} />
        : null
        }
        {openGameOver
        ? < Loss playerName = {playerStats.name} />
        : null
        }

        </>
    ) // end return
}