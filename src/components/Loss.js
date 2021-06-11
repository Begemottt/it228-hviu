// Loss.js
// This is a component that displays the loss window
import React from "react";

export default function Loss(props){
    return(
        <>
        <article id="loss_window">
            <h1>YOU DIED</h1>
            <h2>How sad, {props.playerName} failed to achieve their goal....</h2>
            <button onClick={()=>history.go(0)}>TRY AGAIN!</button>
        </article>
        <div id="window_blur"></div>
        </>
    )
}