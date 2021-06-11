// checkHook.js
// This is a component that checks the list of hooks
// Takes in a string and the list, checks for that string, returns true if it's true, and false if it's false.

export default function checkHook (string, hooks){
    let myReturn = true;
    hooks[string]
    ? myReturn = true
    : myReturn = false
    return myReturn;
}