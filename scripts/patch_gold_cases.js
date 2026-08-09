const fs = require('fs');
console.log('Patch gold cases JS ready');
let indexHtml = fs.readFileSync('index.html', 'utf8');
console.log('index.html size:', indexHtml.length);
console.log('Appending gold cards logic...');
