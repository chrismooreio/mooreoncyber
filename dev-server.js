#!/usr/bin/env node
// Local dev server: serves the site with Cache-Control: no-store so changes show up immediately.
// Usage: node dev-server.js [port]
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.jsx':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.map':  'application/json',
  '.txt':  'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname = decodeURIComponent(parsed.pathname || '/');
  if (pathname.endsWith('/')) pathname += 'index.html';

  // Resolve safely inside ROOT (block path traversal)
  const filePath = path.normalize(path.join(ROOT, pathname));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    const ts = new Date().toISOString().slice(11, 19);
    if (err) {
      console.log(`${ts}  404  ${req.method} ${pathname}`);
      res.writeHead(404, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    console.log(`${ts}  200  ${req.method} ${pathname}  (${data.length}B, ${type.split(';')[0]})`);
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Moore on Cyber — dev server`);
  console.log(`  → http://localhost:${PORT}/`);
  console.log(`  Cache-Control: no-store on every response\n`);
});
