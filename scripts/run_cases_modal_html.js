const fs = require('fs');
console.log('Cases modal HTML ready');
let html = fs.readFileSync('index.html', 'utf8');
console.log('Index loaded size:', html.length);
console.log('Appending cases modal logic...');
