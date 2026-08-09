const fs = require('fs');
console.log('Node runner ok');
console.log('Appending node logic...');
let idx = fs.readFileSync('index.html', 'utf8');
console.log('Index read size:', idx.length);
