// EventHandler.js
// Handles events, just like it says on the tin.
// Takes in an ID, looks at the data and return an object that is a type and a key.
import eventData from "../data/events.json";

export default function handleEvent(id){
    let myReturn = {
        type: eventData[id].type,
        key: eventData[id].key,
        hook: eventData[id].hook,
        req_hook: eventData[id].req_hook,
        failure: eventData[id].failure
    }
    return myReturn;
}