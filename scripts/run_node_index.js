console.log('Node index script ready');
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
console.log('Read index.html ok, length:', html.length);
console.log('Appending node cases logic...');
