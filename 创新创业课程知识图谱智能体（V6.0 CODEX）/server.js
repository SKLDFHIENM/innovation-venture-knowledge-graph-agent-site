import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
    // Basic router
    let urlPath = req.url.split('?')[0];
    const filePath = path.join(process.cwd(), urlPath === '/' ? 'index.html' : urlPath);
    const ext = path.extname(filePath);
    
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'application/javascript';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.json') contentType = 'application/json';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }
        res.writeHead(200, { 
            'Content-Type': contentType,
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        res.end(data);
    });
});

server.listen(8000, () => {
    console.log('HTTP Server running at http://127.0.0.1:8000/');
});