// VictoryBox.js
// This is the little window that pops up when you win a battle!
import React from 'react';

export default function(props) {
    return(
        <>
        <section id="victory">
            <h1>You have vanquished your foes!!</h1>
            <h2>{props.message}</h2>
            <button onClick={props.endBattle}>Hooray!</button>
        </section>
        <div id="window_blur"></div>
        </>
    )
}