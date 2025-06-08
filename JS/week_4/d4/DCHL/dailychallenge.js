// Daily Challenge 1

function makeAllCaps(array) {
    if (array.every(item => typeof item === "string")) {
        return Promise.resolve(array.map((arr => arr.toUpperCase())))
    } else return Promise.reject("Array must contain only string")
}

function sortWords(array) {
    if(array.length > 4) { return Promise.resolve(array.sort())}
    else return Promise.reject("Not enough words")
}

makeAllCaps([1, "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

makeAllCaps(["apple", "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result)) 
      .catch(error => console.log(error))



// Daily Challenge 2

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`


function toJs() {
    const jsobject = JSON.parse(morse)
    if(Object.keys(jsobject).length === 0) {
        return Promise.reject("Empty")
    } else return Promise.resolve(jsobject)
}

function toMorse(morseJS) {
    const userInput = prompt("Please write a word or a sentence")
    if (!userInput || userInput.trim() === "") {
    return Promise.reject("Empty line");
  }
    const chars = userInput.split("")
    let result = [];
    for (let char of chars)
        if (!(char in morseJS)) {
            return Promise.reject("Error")
        } 
        else {
            result.push(morseJS[char]) 
        }
    return Promise.resolve(result)
}

function joinWords(morseTranslation) {
    const morseText = morseTranslation.join("\n");
    const mydiv = document.createElement("div") 
    mydiv.innerText = morseText
    document.body.appendChild(mydiv)
}


toJs()
  .then((words) => toMorse(words))
  .then((result) => joinWords(result))
  .catch(error => console.log(error))

