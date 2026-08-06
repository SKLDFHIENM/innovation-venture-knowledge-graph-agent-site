const fs = require('fs');
console.log('Easy node ready');
let html = fs.readFileSync('index.html', 'utf8');
console.log('Index loaded size:', html.length);
console.log('Appending easy logic...');
