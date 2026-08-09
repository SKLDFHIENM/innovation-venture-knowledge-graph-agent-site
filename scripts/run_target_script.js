const fs = require('fs');
console.log('Target script ready');
let html = fs.readFileSync('index.html', 'utf8');
console.log('Index loaded size:', html.length);
console.log('Appending target logic...');
