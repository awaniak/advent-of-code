// Part I

const fs = require('fs');

let inputs = fs.readFileSync('./Task3/input.txt', 'utf8').replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
function Claim(id, leftShift, topShift, width, height) {
    this.id = id;
    this.leftShift = leftShift;
    this.topShift = topShift;
    this.width = width;
    this.height = height;
}
inputs = inputs.map(value => {
    let id = value.match('#\\d+')[0].replace('#', '');
    let leftShift = parseInt(value.match('@ \\d+')[0].replace('@ ', ''));
    let topShift = parseInt(value.match(',\\d+')[0].replace(',', ''));
    let width = parseInt(value.match(': \\d+')[0].replace(': ', ''));
    let height = parseInt(value.match('x\\d+')[0].replace('x', ''));
    return new Claim(id, leftShift, topShift, width, height);
});
let maxWidth = Math.max(...inputs.map(claim => claim.leftShift + claim.width));
let maxHeight = Math.max(...inputs.map(claim => claim.topShift + claim.height));
let fabric = Array(maxWidth).fill(0).map(()=>Array(maxHeight).fill(0));
inputs.forEach(claim => {
    for (let i = 0;i< claim.width;i++){
        for (let j = 0;j< claim.height;j++){
            fabric[claim.leftShift + i][claim.topShift + j] = fabric[claim.leftShift + i][claim.topShift + j] === 0 ? claim.id : 'X';
        }
    }
});
let conflictClaimsAreaNumber = fabric.reduce((acc, val) => acc.concat(val), []).filter(area => area === 'X').length;
console.log(conflictClaimsAreaNumber);


// Part II
inputs.forEach(claim => {
    let overlap = false;
    outerLoop:
    for (let i = 0;i< claim.width;i++){
        for (let j = 0;j< claim.height;j++){
            overlap = fabric[claim.leftShift + i][claim.topShift + j] !== claim.id;
            if (overlap) break outerLoop;
        }
    }
    if (!overlap) {
        console.log(`Id of claim that doesn't overlap: ${claim.id}`)
    }
});