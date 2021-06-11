// Message.js
// This is a component that renders a little message window!
import React, { useState } from 'react';

export default function Modal(props){

    const [blurClass, changeBlurClass] = useState("active");
    const closeWindow = () => {
        changeBlurClass("inactive");
        props.close();
    }

    return(
        <>
        <article id="modal_window" className={props.class} >
            <section id="message">
                <p>{props.message.text}</p>
            </section>
            <button id="close_modal" onClick = {()=>closeWindow()} >{props.message.close}</button>
        </article>
        <div id="window_blur" className={blurClass}></div>
        </>
    )
}