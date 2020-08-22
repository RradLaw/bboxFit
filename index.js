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

// Calculate how many boxes the grid needs to be
const rootBox = Math.round(Math.sqrt(c.boxes));

// Calculate the latitude and longitude length of the boxes
const latDiff = (c.latMax - c.latMin)/rootBox;
const lonDiff = (c.lonMax - c.lonMin)/rootBox;

console.log(`Making a ${rootBox}x${rootBox} grid (${rootBox*rootBox}) between ${c.latMin},${c.lonMin} and ${c.latMax},${c.lonMax}.`);

let str = "bbox=";

// Iterate through the grid and output the co-ordinates in the correct format
for(let i = 0; i < rootBox;i++) {
    for (let j = 0; j < rootBox; j++) {
        let lonMin = c.lonMin+i*lonDiff;
        let lonMax = c.lonMin+(i+1)*lonDiff;
        let latMin = c.latMin+j*latDiff;
        let latMax = c.latMin+(j+1)*latDiff;
        str += (`${lonMin},${latMin},${lonMax},${latMax};`);
    }
}

str=str.substr(0,str.length-1);

// If silent flag isn't up, output everything to log
if(!c.silent) {
    console.log(str);
}

fs.writeFileSync('output.txt', str);

console.log("Output written to output.txt");
