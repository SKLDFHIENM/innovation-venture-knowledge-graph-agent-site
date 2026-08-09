const fs = require('fs');
console.log('Basic JS ready');
let html = fs.readFileSync('index.html', 'utf8');
console.log('Index loaded size:', html.length);
console.log('Appending basic logic...');
