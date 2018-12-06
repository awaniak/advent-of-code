const fs = require('fs');

const inputs = fs.readFileSync('./Task2/input.txt', 'utf8').replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);

let counts = new Map();
for (let line of inputs) {
    let isCountApeered = new Map();
    for (let letter of line) {
        if (line === "") break;
        let reg = new RegExp(letter,'g');
        let countOfLetter = line.split("").join(" ").match(reg);
        if (countOfLetter != null){
            countOfLetter = countOfLetter.length;
            if (countOfLetter > 1 && !isCountApeered.get(countOfLetter)){
                if (!counts.has(countOfLetter)){
                    counts.set(countOfLetter, 1);
                } else {
                    const count = counts.get(countOfLetter) + 1;
                    counts.set(countOfLetter, count)
                }
                isCountApeered.set(countOfLetter, true)
            }
            line = line.replace(reg, "");
        }
    }
}

let values = [...counts.values()];
console.log(values.reduce( (a, b) => a * b));





