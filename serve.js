#!/usr/bin/env node
/* Emergency Quick Reference — zero-dependency static file server.
 * Serves the PWA over HTTP, and optionally HTTPS when TLS certs are provided.
 * Usage:
 *   node serve.js
 *   PORT=8080 HTTPS_PORT=8443 TLS_KEY=key.pem TLS_CERT=cert.pem node serve.js
 */

import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.dirname(__filename);

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 8080;
const HTTPS_PORT = Number(process.env.HTTPS_PORT) || 8443;
const TLS_KEY = process.env.TLS_KEY || process.env.HTTPS_KEY;
const TLS_CERT = process.env.TLS_CERT || process.env.HTTPS_CERT;
const TLS_CHAIN = process.env.TLS_CHAIN || process.env.HTTPS_CHAIN;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.map': 'application/json; charset=utf-8'
};

// Resolve a request path to a file inside ROOT, blocking path traversal.
function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  // Reject any parent-directory segment (covers encoded %2e%2e%2f etc.).
  if (decoded.split('/').includes('..')) return null;
  const rel = decoded.replace(/^\/+/, '');
  const target = path.normalize(path.join(root, rel));
  const relToRoot = path.relative(root, target);
  if (relToRoot.startsWith('..') || path.isAbsolute(relToRoot)) return null;
  return target;
}

function sendFile(res, filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const headers = {
      'Content-Type': type,
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache'
    };
    // The service worker must always be fresh so updates deploy promptly.
    if (ext === '.js' && path.basename(filePath) === 'sw.js') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    } else if (ext === '.webmanifest' || ext === '.svg') {
      headers['Cache-Control'] = 'public, max-age=3600';
    }
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
}

function requestHandler(req, res) {
  const urlPath = req.url || '/';
  const filePath = safeJoin(ROOT, urlPath);
  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }
  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      sendFile(res, path.join(filePath, 'index.html'));
    } else {
      sendFile(res, filePath);
    }
  });
}

const httpServer = http.createServer(requestHandler);
httpServer.listen(PORT, HOST, () => {
  console.log(`Emergency Quick Reference server (HTTP)  -> http://${HOST}:${PORT}/`);
});

if (TLS_KEY && TLS_CERT) {
  const opts = {
    key: fs.readFileSync(TLS_KEY),
    cert: fs.readFileSync(TLS_CERT)
  };
  if (TLS_CHAIN) opts.ca = fs.readFileSync(TLS_CHAIN);
  https.createServer(opts, requestHandler).listen(HTTPS_PORT, HOST, () => {
    console.log(`Emergency Quick Reference server (HTTPS) -> https://${HOST}:${HTTPS_PORT}/`);
  });
} else {
  console.log('HTTPS disabled — set TLS_KEY and TLS_CERT env vars to enable.');
}
