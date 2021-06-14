// Stats.js
// This is a component for render the stat menu
import React from 'react';

export default function Stats(props){
    const stats = props.stats;
    return(
        <section id="stats_window">
            <section>
                <h1>{stats.name}</h1>
                <p>HP:</p> <p className="number">{props.currentHP} / {stats.hp}</p>
                <p>MP:</p> <p className="number"> {props.currentMP} / {stats.mp}</p>
                <p>Heartiness:</p> <p className="number"> {stats.hrt}</p>
                <p>Agility:</p> <p className="number"> {stats.agi}</p>
            </section>
            <section>
                <h2>OFFENSE</h2>
                <p>Strength:</p> <p className="number"> {stats.str}</p>
                <p>Focus:</p> <p className="number"> {stats.fcs}</p>
                <p>Bombast:</p> <p className="number"> {stats.bst}</p>
            </section>
            <section>
                <h2>DEFENSE</h2>
                <p>Reflexes:</p> <p className="number">{stats.rfx}</p>
                <p>Attention:</p> <p className="number">{stats.atn}</p>
                <p>Stoicism:</p> <p className="number">{stats.scm}</p>
            </section>
        </section>
    )
}