const fs = require('fs');

const inputs = fs.readFileSync('input.txt', 'utf8').replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);

let result = [];
for (let i =0; i< inputs.length - 1; i++){
    for (let j = i+1; j< inputs.length; j++){
        let sameCharNum = sameCharachtersNum(inputs[i], inputs[j]);
        if (inputs[i].length - sameCharNum === 1) {
            result.push(inputs[i]);
            result.push(inputs[j]);
        }
    }
}

result  = result[0].split("").reduce((acu, act, i) =>{
    return acu + (act === result[1].charAt(i) ? act : "")
});
console.log(result);

function sameCharachtersNum(string1, string2){
    let result = 0;
    for (let i =0; i< string1.length; i++) {
        if (string1.charAt(i)===string2.charAt(i)){
            result++;
        }
    }
    return result;
}