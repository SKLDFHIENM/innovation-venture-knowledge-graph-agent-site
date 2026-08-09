const fs = require('fs');
console.log('Clean node cases ready');
let html = fs.readFileSync('index.html', 'utf8');
console.log('Loaded index.html size:', html.length);
console.log('Appending cases cards logic...');
