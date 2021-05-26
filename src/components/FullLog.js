// This is a component that renders a FULL list of the logs stored in the array that it is given.
import React from "react";

export default function FullLog(
    {logs = []}
){
    return(
        <>
        <article id="full_log_window">
        {logs.map((log, i) => (
            <section className="log_line" key={i}>
                <p><span className="line_number">{i} </span>{log}</p>
            </section>
        ))}
        </article>
        </>
    )
}