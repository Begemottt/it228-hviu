// loadPlayerData.js
// This is a component to load up player data + skills!
import skillData from "../data/player_skills.json";

export default function loadPlayerData(player){
    let newPlayer = player;
    newPlayer.skillList = [];
    const checkSkill = number => {
        if (skillData[number] != undefined){
            newPlayer.skillList.push(skillData[number]);
        }
    }
    newPlayer.skills.forEach(checkSkill);
    return newPlayer;
}