// This is a component that renders a FULL list of the logs stored in the array that it is given.
import React from "react";

export default function FullLog(
    data
){
    return(
        <article id="full_log_window">
        {data.logs.map((log, i) => (
            <section className="log_line" key={i}>
                <p><span className="line_number">{i} </span>{log}</p>
            </section>
        ))}
        <button id="close_log" onClick={()=>data.closeLog()}>X</button>
        </article>
    )
}