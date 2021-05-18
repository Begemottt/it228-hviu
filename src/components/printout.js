// printout.js
// This is a function that renders a line of text one character at a time!

export function printOut(str, id) {

    var timePerLetter = 50,
        newLineCharacter = '|',
        text = document.createTextNode('');

    document.getElementById(id).appendChild(text);

    var i = 0;
    (function main() {
        var char = str[i++];
        text.nodeValue += char == newLineCharacter ? '\n' : char;
        if(i < str.length)
        setTimeout(main, timePerLetter);
    })();
}