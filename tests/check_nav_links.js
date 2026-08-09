const fs = require('fs');
const path = require('path');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const matches = Array.from(html.matchAll(/href=["']([^"']+\.html)["']/g)).map(m => m[1]);
  const uniqueLinks = [...new Set(matches)];
  const invalid = uniqueLinks.filter(link => {
    const cleanPath = link.split('#')[0];
    return cleanPath && !fs.existsSync(path.join('.', cleanPath));
  });
  console.log(`${f}: total HTML links = ${uniqueLinks.length}, invalid = ${invalid.length} ${invalid.length ? `[${invalid.join(', ')}]` : ''}`);
});
