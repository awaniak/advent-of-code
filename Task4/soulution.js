const fs = require('fs');

let inputs = fs.readFileSync('./Task4/input.txt', 'utf8').replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);

function Element(date, desc) {
    this.date = date;
    this.desc = desc;
}

inputs = inputs.map(value => {
    return new Element(new Date(value.slice(1, 17)), value.slice(19))
});

inputs.sort((a, b) => {
    return a.date - b.date;
});

let currentGuardId;
let fallAsleep;
let wakeUp;
const guardsAsleepTime = new Map();
const guardsAsleepMinutes = new Map();

inputs.forEach(value => {
    if (value.desc.match('Guard')) {
        currentGuardId = parseInt(value.desc.match('#\\d+')[0].replace('#', ''));
    } else if (value.desc.match('asleep')) {
        fallAsleep = value.date;
    } else if (value.desc.match('wakes')) {
        wakeUp = value.date;
        let sleepTime = (wakeUp - fallAsleep) / 1000 / 60;
        if (!guardsAsleepMinutes.has(currentGuardId)) {
            guardsAsleepMinutes.set(currentGuardId, new Array(60).fill(0));
        }
        let asleepMinutes = guardsAsleepMinutes.get(currentGuardId);
        for (let i = fallAsleep.getMinutes(); i<wakeUp.getMinutes(); i++){
            asleepMinutes[i] = asleepMinutes[i] + 1;
        }
        if (guardsAsleepTime.has(currentGuardId)){
            sleepTime = guardsAsleepTime.get(currentGuardId) + sleepTime
        }
        guardsAsleepTime.set(currentGuardId, sleepTime)
    }
});
let mostSleepyGuard = Array.from(guardsAsleepTime.keys()).reduce((previousValue, currentValue) => {
    return guardsAsleepTime[currentValue] > guardsAsleepTime[previousValue] ? currentValue : previousValue;
});

let mostOftenSleepMinute = 0;

for (let i = 1;i< 60; i++){
    if (guardsAsleepMinutes.get(mostSleepyGuard)[i] > guardsAsleepMinutes.get(mostSleepyGuard)[mostOftenSleepMinute]){
        mostOftenSleepMinute = i;
    }
}

console.log('Part one result: ' + mostSleepyGuard * mostOftenSleepMinute);


mostOftenSleepMinute = 0;
let mostOftenSleepMinuteGuardId = mostSleepyGuard;
Array.from(guardsAsleepMinutes.keys()).forEach(guardId => {
    for (let i = 0;i< 60; i++){
        if (guardsAsleepMinutes.get(guardId)[i] > guardsAsleepMinutes.get(mostOftenSleepMinuteGuardId)[mostOftenSleepMinute]){
            mostOftenSleepMinute = i;
            mostOftenSleepMinuteGuardId = guardId;
        }
    }
});

console.log('Part two result: ' + mostOftenSleepMinuteGuardId * mostOftenSleepMinute);

