// Dialogue.js
// This will be the component that runs the whole dialogue system!
// It will return a window with a character portrait and dialogue box.
// It will load up the main script file, and then the individual dialogue files as needed
import React, { useState } from "react";
import loadScript from "./loadScript";

export default function Dialogue (props){
    // This is the same as the hooks thing in the main 
    const [flags, changeflag] = useState(
        ["default"]
    )
    const setflag = flag => {
        let newValue = flags;
        newValue.push(flag);
        changeflag(newValue);
    }

    // This keeps track of the current line number, which is updated as the scene goes on
    const [lineNumber, updateLineNumber] = useState(1);
    // Load in the script by passing the scriptNumber on down to the loadScript component
    const scriptData = loadScript(props.scriptNumber);

    // State functions for the current message
    // Initializes at script line 0, which means it is not affected by logic in the advance function!
    // KEEP THAT IN MIND! ALWAYS START WITH A NORMAL MESSAGE!!
    const [currentLine, updateLine] = useState(scriptData[(0)].text);
    // This keeps track of what the buttons are
    const [buttons, updateButtons] = useState(new Array({text:"Next >", flag:"", hook:""}));
    const addButton = (newText, newFlag, newHook) => {
        let newButton = {text: newText, flag: newFlag, hook:newHook};
        let newButtons = buttons;
        newButtons.push(newButton);
        updateButtons(newButtons);
    }
    const clearButtons = () => {
        let newArray = buttons;
        newArray.shift();
        updateButtons(newArray);
    }
    const resetButtons = () => {
        updateButtons(new Array({text:"Next >", flag:""}));
    }
    const handleButtonPress = (script, flag, hook) =>{
        !flag
        ? null
        : setflag(flag);
        !hook
        ? null
        : props.flipHook(hook);
        advance (script, flag);
    }

    const advance = (script, flag) => {
        let thisLine = script[lineNumber];
        let nextLine = script[(lineNumber + 1)];

        // If this line isn't the closing line, then we need to look ahead and see if we need to skip some lines because of flag requirements!
        if (thisLine.type != "close"){
            let lineSkip = 1;
            if (nextLine.req_flag != "" && flags.includes(nextLine.req_flag) === false){
                do {
                    lineSkip++;
                } while (flags.includes(script[lineNumber + lineSkip].req_flag) != true && script[lineNumber + lineSkip].req_flag != "")
            }
            updateLineNumber((lineNumber + lineSkip));
        }

        // If this call is fed a flag, that means that the LAST update was a question! So, reset the flags back to just Next
        if (flag != ""){
            resetButtons();
        }
        // If this line is a question, clear the next button so it doesn't appear alongside the options
        if (thisLine.type === "question"){
            clearButtons();
        }
        // Big switch block for checking what to do with the current line!
        switch(thisLine.type){
            case "message":
                updateLine(thisLine.text);
            break;
            case "question":
                updateLine(thisLine.text);
                let checkType = true;
                let i = 1;
                do {
                    if(script[lineNumber + i].type === "answer"){
                        addButton(script[lineNumber + i].text, script[lineNumber + i].flag, script[lineNumber + i].hook);
                        i++;
                    } else {
                        checkType = false;
                        updateLineNumber((lineNumber + i));
                    }
                } while (checkType === true);
            break;
            case "close":
                props.closeDialog(0);
            break;
        }
    }

    return(
        <article id="dialog">
            <section id="portrait">
                < img src={"./images/portraits/character_" + scriptData[lineNumber - 1].portrait + ".png"} />
                <h2 id="name">{scriptData[lineNumber - 1].name}</h2>
            </section>
            <section id="message">
                <section id="line">
                <p id="current_line">{currentLine}</p>
                </section>
                <section id="buttons">
                    {buttons.map((buttonData, i) => (
                        <button key={i} onClick={() => (handleButtonPress(scriptData, buttonData.flag, buttonData.hook))}>{buttonData.text}</button>
                    ))}
                </section>
            </section>
            <button id="close" onClick={() => props.closeDialog(0)}>LEAVE</button>
        </article>
    )
}