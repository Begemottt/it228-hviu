// loadEncounterData.js
// Loads the data for this encounter!
import encounterData from "../data/encounters.json";

export default function loadEncounterData (id) {
    let data = encounterData[id];
    return data;
}