// MessageHandler.js
// Exactly what it says on the tin: handles message events.
// This one is very simple, it just looks up the event in the message data, and returns the proper string!
import messageData from "../data/messages.json";

export default function MessageHandler(key){
    let myReturn = messageData[key].text;
    return myReturn;
}