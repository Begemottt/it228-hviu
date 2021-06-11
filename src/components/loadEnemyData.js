// loadEnemyData.js
// This is a compnent to load all the particular data for a single enemy!
import enemyData from "../data/enemies.json";
import skillData from "../data/enemy_skills.json";

export default function loadEnemyData (id){
    let data = enemyData[id];
    if (data != undefined){
        data.skill1 != ""
        ? data.skill_1 = skillData[data.skill1]
        : null
        data.skill2 != ""
        ? data.skill_2 = skillData[data.skill2]
        : null
        data.skill3 != ""
        ? data.skill_3 = skillData[data.skill3]
        : null
        data.skill4 != ""
        ? data.skill_4 = skillData[data.skill4]
        : null
    } 
    return data;
}