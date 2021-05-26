import '../scss/styles.scss';
import html from '../index.html';
import React from "react";
import ReactDOM from "react-dom";
import GameControl from './components/GameControl';
// import anime from 'animejs';

const rootElement = document.getElementById("main");
ReactDOM.render(
    <React.StrictMode>
        <GameControl />
    </React.StrictMode>,
    rootElement
)