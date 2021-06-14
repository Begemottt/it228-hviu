// Battle.js
// This is the component for the battle window!
import React, { useState } from "react";
import loadEnemyData from "./loadEnemyData";
import loadEncounterData from "./loadEncounterData";
import loadPlayerData from "./loadPlayerData";
import BattleLog from "./BattleLog";
import SubCommands from "./SubCommands";
import VictoryBox from "./VictoryBox";
import anime from "animejs";

export default function Battle(props){
    // The turn delay in microseconds!
    const turnDelay = 1000;
    // Loading in player and enemy data (including skills)
    let player = loadPlayerData(props.player);
    let encounter = loadEncounterData(props.encounterID);
    let enemy1, enemy2, enemy3 = {};
    enemy1 = loadEnemyData(encounter.enemy1);
    enemy2 = loadEnemyData(encounter.enemy2);
    enemy3 = loadEnemyData(encounter.enemy3);
    const [enemies, changeEnemies] = useState([enemy1]);
    const [enemyHP, changeEnemyHP] = useState([enemy1.hp]);
    const addEnemy = (newEnemy) => {
        let newArray = enemies;
        let otherNewArray = enemyHP;
        newArray.push(newEnemy);
        otherNewArray.push(newEnemy.hp);
        changeEnemies(oldvalue => newArray);
        changeEnemyHP(oldvalue => otherNewArray);
    }
    const damageEnemy = (target, damage) => {
        let newValue = enemyHP[target] - damage;
        let newArray = enemyHP;
        newArray[target] = newValue;
        changeEnemyHP(oldvalue=>newArray);
    }
    const killEnemy = key => {
        let newArray = enemies;
        let otherNewArray = enemyHP;
        newArray.splice(key, 1);
        otherNewArray.splice(key, 1);
        changeEnemies(oldvalue=>newArray);
        changeEnemyHP(oldvalue=>otherNewArray);
    }
    const checkVictory = () => {
        if (enemies.length === 0){
            return true
        } else {
            return false;
        }
    }
    const triggerVictory = () => {
        changeOpenVictory(true);
    }

    // Random number function! It's useful, I swear
    const randomNumber = (min, max) => { 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 

    
    // Battle Log
    // Setting the greeting based on the first enemy and if there are others
    // Setting up the log, based on the log in the main game.
    const [battleLogList, writeBattleLog] = useState(["Let battle be joined!"]); // First, declare useState
    const checkLogLength = () => { // A function to check the length, and pop the end off if it's too long
        if(battleLogList.length > 1000){ // This sets the limit for the number of lines saved in the log array
            var newLog = battleLogList;
            newLog.pop();
            writeBattleLog(newLog);
        }
    }
    const addBattleLog = message => { // Adding a new message to the log! Also checks the length every time.
        checkLogLength();
        writeBattleLog(oldLog => [message, ...oldLog]);
    }

    // Command buttons!
    const commandList = [
        {text:"Attack", type:"execute", skill:"0", open:""}, 
        {text:"Skill", type:"open", skill:"", open:"skills"}, 
        {text:"Defend", type:"execute", skill: 6, open:""}, 
        {text:"Flee", type:"execute", skill: 8, open: ""}
    ]
    const [skillOpen, changeSkillOpen] = useState(false);
    const toggleSkillList = () =>{
        changeSkillOpen(skillOpen => !skillOpen);
    }
    const [blurCommands, changeBlurCommands] = useState(false);
    const toggleCommands = () =>{
        changeBlurCommands(blurCommands => !blurCommands)
    }

    // Battle animations!
    const wiggle = (object) => {
        anime({
            targets: object,
            keyframes:[
                {rotate: 10},
                {rotate: -10}
            ],
            direction: 'alternate',
            easing: 'linear',
            duration: 300
        });
    }
    const bump  = (object) => {
        anime({
            targets: object,
            translateY: -20,
            duration: 100,
            easing: 'linear',
            direction: 'alternate'
        });
    }
    
    // Battle Logic!!
    // First, some boilerplate for combat. Hide the command list, close the skill panel, print the message for the player's attack.
    const startTurn = (playerSkill, target, targetID) => {
        toggleCommands();
        changeSkillOpen(false);
        addBattleLog(player.name + " " + playerSkill.message);
        setTimeout(() => {
            playerTurn(playerSkill, target, targetID);
        }, turnDelay);
    }
    // Calculates damage and deals it to the enemy, and checks MP and spends it, then moves on to checking if the enemy is dead.
    const playerTurn = (skill, target, targetID) => {
        let damageDealt = calculateDamage(skill, player, target);
        if (props.current_mp > skill.cost){
            props.spend(skill.cost);
            damageEnemy(targetID, damageDealt);
            addBattleLog(damageDealt + " " + skill.element + " damage to " + target.name + "!");
            let enemyObj = document.getElementById("enemy" + targetID);
            bump(enemyObj);
        } else {
            addBattleLog("Not enough MP!! Your technique fails.");
        }
        setTimeout(() => {
            checkEnemyHP(targetID);
        }, turnDelay);
    }
    // This is a function for calculating damage, works for the player or enemies, since they have the same stats!
    const calculateDamage =  (skill, instigator, target) => {
        let damage = skill.formula;
        let attackStat = 0;
        let defenseStat = 0;
        switch(skill.element){
            case "physical":
                attackStat = instigator.str;
                defenseStat = target.rfx;
            break;
            case "magical":
                attackStat = instigator.fcs;
                defenseStat = target.atn;
            break;
            case "emotional":
                attackStat = instigator.bst;
                defenseStat = target.scm;
            break;
        }
        let finalDamage = (damage * attackStat) - defenseStat;
        if (finalDamage > 0){
            return Math.ceil(finalDamage);
        } else {
            return 0;
        }
        
    }
    // First it checks to see if the enemy is dead, and removes them from the array. Then it checks if that was the LAST enemy.
    // If there are more enemies, or if no enemies are dead in the first place, move on to the first enemy turn.
    const checkEnemyHP = key => {
        if(enemyHP[key] <= 0){
            addBattleLog(enemies[key].name + " dies!");
            setTimeout(() => {
                console.log("Killing!")
                killEnemy(key);
                if(enemies.length === 0){
                    let victoryCheck = checkVictory();
                    if (victoryCheck === true){
                        triggerVictory();
                    } else {
                        enemyTurn(0);
                    }
                } else {
                    enemyTurn(0);
                }
            }, turnDelay);
        } else {
            enemyTurn(0);
        }
    }
    // The enemy picks a skill at random from their pool. I should replace this with an array, like the player has, at some point!
    // Then send the skill on to be executed.
    const enemyTurn = key => {
        let enemy = enemies[key];
        let skillNumber = randomNumber(1, 4);
        let skillUsed = {};
        switch (skillNumber){
            case 1:
                skillUsed = enemy.skill_1;
            break;
            case 2:
                skillUsed = enemy.skill_2;
            break;
            case 3:
                skillUsed = enemy.skill_3;
            break;
            case 4:
                skillUsed = enemy.skill_4;
            break;
        }
        addBattleLog(enemies[key].name + " " + skillUsed.message);
        let enemyObj  = document.getElementById("enemy" + key);
        wiggle(enemyObj);
        setTimeout(() => {
            enemyAttack(enemy, skillUsed, key);
        }, turnDelay);
    }
    // Calculate the damage based on the skill, and then see if there's another enemy. If there is, go back to enemyTurn and do them!
    const enemyAttack = (enemy, skillUsed, key) => {
        let finalDamage = 0;
        finalDamage = calculateDamage(skillUsed, enemy, player);
        props.damage(finalDamage);
        addBattleLog(finalDamage + " " + skillUsed.element + " damage!");
        setTimeout(() => {
            let nextEnemy = enemies[key + 1];
            if (nextEnemy != undefined){
                enemyTurn(key + 1);
            } else {
                turnEnd();
            }
        }, turnDelay);
    }
    const turnEnd = () => {
        let victoryCheck = checkVictory();
        if (victoryCheck === true){
            setTimeout(() => {
                triggerVictory();
            }, 1);
        } else {
            toggleCommands();
        }
    }
    const [openVictory, changeOpenVictory] = useState(false);

    // Functions for picking which enemy you want to attack
    const [targetMode, changeTargetMode] = useState(false); // Boolean state for being in targeting mode, after selecting your attack
    const [targetingSkill, changeTargetingSkill] = useState(player.skillList[0]); // State for the skill the player is using, holds it until they click
    const pickTarget = skill => { // The function that triggers targeting mode and sets the skill, added to the skill buttons
        changeTargetMode(()=>true);
        changeSkillOpen(()=>false);
        changeTargetingSkill(skill);
    }
    const enemyClick = (monster, id) => {// Function for clicking on an enemy! Only does something if  you're in targeting mode.
        if(targetMode === true){
            startTurn(targetingSkill, monster, id);
            changeTargetMode(()=>false);
        } else {
            null;
        }
    }

    const flee = () => { // Function for running away! Add something here later.
        addBattleLog("You cannot flee!!");
    }
    
    // Function that runs immediately when the battle is loaded, and only once!
    const [checkEnemies, changeCheckEnemies] = useState(false);
    const [farewell, changeFarewell] = useState("");
    if (!checkEnemies){
        enemy2 != undefined
        ? addEnemy(enemy2)
        : null;
        enemy3 != undefined
        ? addEnemy(enemy3)
        : null;
        changeCheckEnemies(true);

        let greeting = (enemies[0].name);
        enemy2 != undefined
        ? greeting = (greeting + " and cohort block your path!")
        : greeting = (greeting + " blocks your path!")
        enemy2 != undefined
        ? changeFarewell("You defeated " + enemies[0].name + " and cohort!")
        : changeFarewell("You defeated the " + enemies[0].name + "!")
        addBattleLog(greeting);
    }
    let myReturn = <></>;

    if(openVictory === true){ // Checks the victory state, and if it's true, renders the victory window INSTEAD of the battle window!
        myReturn = <VictoryBox endBattle={props.endBattle} message={farewell} />
    } else {
        myReturn = (<article id="battle_window">
        <section id="monsters">
            {targetMode
                ? <section id="target_message"><h1>Pick the target for {targetingSkill.name}!</h1></section>
                : null
            }
            {enemies.map((monster, i) => (
                <section id={"enemy" + i} key={i} onClick={()=>enemyClick(monster, i)} className={ targetMode ? "active" : ""}>
                    <img src={"./images/monsters/" + monster.name + ".png"} />
                    <h1><span className="selection">[ </span>{monster.name}<span className="selection"> ]</span></h1>
                </section>
            ))}
        </section>
        <section id="battle_log">
            < BattleLog logs={battleLogList} />
        </section>
        <section id="player_stats">
            <section className="battle_stats">
                <h1>{player.name}</h1>
                <p>HP: {props.current_hp} / {player.hp}</p>
                <p>MP: {props.current_mp} / {player.mp}</p>
            </section>
            <section>
                <h1>OFFENSE</h1>
                <p>STR: {player.str}</p>
                <p>FCS: {player.fcs}</p>
                <p>BST: {player.bst}</p>
            </section>
            <section>
                <h1>DEFENSE</h1>
                <p>RFX: {player.rfx}</p>
                <p>ATN: {player.atn}</p>
                <p>SCM: {player.scm}</p>
            </section>
        </section>
        <section id="commands">
            <button onClick={()=>pickTarget(player.skillList[0])}>{commandList[0].text}</button>
            <button onClick={()=>toggleSkillList()}>{commandList[1].text}</button>
            <button onClick={()=>addBattleLog("You have no shield!")}>{commandList[2].text}</button>
            <button onClick={()=>flee()}>{commandList[3].text}</button>
            {skillOpen
            ? < SubCommands list={player.skillList} pickTarget={pickTarget} />
            : null
            }
            {blurCommands
            ? <div className="blur active"></div>
            : null
            }
            
        </section>
        <button id="battle_debug" onClick ={()=>triggerVictory()}>TEST!!</button>
        {/* <button id="battle_debug" onClick ={()=>triggerVictory()}>TEST!!</button> */}
        
    </article>);
    }
    return myReturn;
}