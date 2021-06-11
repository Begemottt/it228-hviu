// This will be the component that takes in the log array and prints the log section
// The array is mapped and plugged into a JSX block, with a unique 
import React from "react";

export default function BattleLog ({
    logs = []
}){
    logs = logs.slice(0,11);
    return (
        <section className="log">
            <section className="log_line initial" key="1"><p><span className="current_line">&gt; </span>{logs[0]}</p></section>
            <section className="log_line old" key="2"><p><span className="line_number">&gt; </span>{logs[1]}</p></section>
            <section className="log_line old" key="3"><p><span className="line_number">&gt; </span>{logs[2]}</p></section>
            <section className="log_line old" key="4"><p><span className="line_number">&gt; </span>{logs[3]}</p></section>
            <section className="log_line old" key="5"><p><span className="line_number">&gt; </span>{logs[4]}</p></section>
            <section className="log_line old" key="6"><p><span className="line_number">&gt; </span>{logs[5]}</p></section>
            <section className="log_line old" key="7"><p><span className="line_number">&gt; </span>{logs[6]}</p></section>
            <section className="log_line old" key="8"><p><span className="line_number">&gt; </span>{logs[7]}</p></section>
            <section className="log_line old" key="9"><p><span className="line_number">&gt; </span>{logs[8]}</p></section>
            <section className="log_line old" key="10"><p><span className="line_number">&gt; </span>{logs[9]}</p></section>
            <section className="log_line old" key="11"><p><span className="line_number">&gt; </span>{logs[10]}</p></section>
        </section>
    )
}