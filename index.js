const fs = require('fs');

let c;
try {
    c = require('./config');
} catch(e) {
    console.log(e);
    console.log('Make sure you create a `config.js` file from the example template before running again.');
    process.exit();
}

if (!c.latMin || !c.latMax || !c.lonMax || !c.boxes || !c.lonMin) {
    console.log("All config numbers should be non-zero numbers");
    process.exit();
}

const rootBox = Math.round(Math.sqrt(c.boxes));
const latDiff = (c.latMax - c.latMin)/rootBox;
const lonDiff = (c.lonMax - c.lonMin)/rootBox;

console.log(`Making a ${rootBox}x${rootBox} grid (${rootBox*rootBox}) between ${c.latMin},${c.lonMin} and ${c.latMax},${c.lonMax}.`);

let str = "";

for(let i = 0; i < rootBox;i++) {
    for (let j = 0; j < rootBox; j++) {
        let lonMin = c.lonMin+i*lonDiff;
        let lonMax = c.lonMin+(i+1)*lonDiff;
        let latMin = c.latMin+j*latDiff;
        let latMax = c.latMin+(j+1)*latDiff;
        str += (`${lonMin},${latMin},${lonMax},${latMax};`);
    }
}

if(!c.silent) {
    console.log(str);
}

fs.writeFileSync('output.txt', str);

console.log("Output written to output.txt");