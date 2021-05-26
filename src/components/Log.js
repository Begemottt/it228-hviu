// This will be the component that takes in the log array and prints the log section
// The array is mapped and plugged into a JSX block, with a unique 
import React from "react";

export default function Log ({
    logs = []
}){
    logs = logs.slice(0,5);
    return (
        <section id="log">
            <section className="log_line initial" key="1"><p><span className="current_line">&gt; </span>{logs[0]}</p></section>
            <section className="log_line old" key="2"><p><span className="line_number">&gt; </span>{logs[1]}</p></section>
            <section className="log_line old" key="3"><p><span className="line_number">&gt; </span>{logs[2]}</p></section>
            <section className="log_line old" key="4"><p><span className="line_number">&gt; </span>{logs[3]}</p></section>
            <section className="log_line old" key="5"><p><span className="line_number">&gt; </span>{logs[4]}</p></section>
        </section>
    )
}