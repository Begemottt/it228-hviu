// SubCommands.js
// This is a component for rendering the list of skill commands
import React from "react";

export default function SubCommand(props){
    return(
        <section>
            {props.list.map((command, i)=>(
                <button key={i} onClick={()=>props.pickTarget(props.list[i])}>{command.name} - {command.cost}MP</button>
            ))}
        </section>
    )
}