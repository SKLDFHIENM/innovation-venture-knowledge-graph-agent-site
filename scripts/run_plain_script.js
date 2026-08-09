const fs = require('fs');
console.log('Plain script ready');
let html = fs.readFileSync('index.html', 'utf8');
console.log('Index loaded size:', html.length);
console.log('Appending plain logic...');
