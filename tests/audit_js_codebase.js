const fs = require('fs');
const path = require('path');

const jsFiles = [
  ...fs.readdirSync('./js').filter(f => f.endsWith('.js')).map(f => path.join('./js', f)),
  ...fs.readdirSync('./js/modules').filter(f => f.endsWith('.js')).map(f => path.join('./js/modules', f))
];

jsFiles.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  const tryCatchCount = (code.match(/try\s*\{/g) || []).length;
  const consoleErrorCount = (code.match(/console\.(error|warn)/g) || []).length;
  const windowExportCount = (code.match(/window\.\w+/g) || []).length;
  
  console.log({
    file,
    lines: code.split('\n').length,
    tryCatchCount,
    consoleErrorCount,
    windowExportCount
  });
});
