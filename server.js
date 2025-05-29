const express = require('express');
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');
const app = express();
const port = process.env.PORT || 8443;
const httpPort = process.env.HTTP_PORT || 8080;

// SSL Certificate options
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Serve static files from the 'docs' directory
app.use(express.static(path.join(__dirname, 'docs')));

// Serve specific files from the root directory
app.use('/threelipsync.js', express.static(path.join(__dirname, 'threelipsync.js')));
app.use('/shaders.xml', express.static(path.join(__dirname, 'shaders.xml')));
// Add any other root files that might be needed by index.html or other client-side scripts

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`🔒 HTTPS Server listening at https://localhost:${port}`);
  console.log(`📱 For microphone access, use: https://localhost:${port}`);
});

// Also start HTTP server for fallback
app.listen(httpPort, () => {
  console.log(`🌐 HTTP Server listening at http://localhost:${httpPort}`);
});
