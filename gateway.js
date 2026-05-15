const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

// Ports where Vite servers are running internally
const FRONTEND_PORT = 5175;
const ADMIN_PORT = 5176;
const GATEWAY_PORT = 5173;

const server = http.createServer((req, res) => {
  const host = req.headers.host;

  if (host && host.startsWith('admin.')) {
    // Route to Admin Panel
    proxy.web(req, res, { target: `http://localhost:${ADMIN_PORT}` }, (err) => {
      console.error('Admin Proxy Error:', err.message);
      res.statusCode = 502;
      res.end('Admin Panel is starting up or unavailable.');
    });
  } else {
    // Route to Main Frontend
    proxy.web(req, res, { target: `http://localhost:${FRONTEND_PORT}` }, (err) => {
      console.error('Frontend Proxy Error:', err.message);
      res.statusCode = 502;
      res.end('Frontend is starting up or unavailable.');
    });
  }
});

// Handle WebSocket proxying (crucial for Vite HMR)
server.on('upgrade', (req, socket, head) => {
  const host = req.headers.host;
  if (host && host.startsWith('admin.')) {
    proxy.ws(req, socket, head, { target: `http://localhost:${ADMIN_PORT}` });
  } else {
    proxy.ws(req, socket, head, { target: `http://localhost:${FRONTEND_PORT}` });
  }
});

server.listen(GATEWAY_PORT, () => {
  console.log(`\n🚀 ChronoLux Gateway running on port ${GATEWAY_PORT}`);
  console.log(`   - Main Store:  http://localhost:${GATEWAY_PORT}`);
  console.log(`   - Admin Panel: http://admin.localhost:${GATEWAY_PORT}\n`);
});
