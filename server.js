const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'docs' directory
app.use(express.static(path.join(__dirname, 'docs')));

// Serve specific files from the root directory
app.use('/threelipsync.js', express.static(path.join(__dirname, 'threelipsync.js')));
app.use('/shaders.xml', express.static(path.join(__dirname, 'shaders.xml')));
// Add any other root files that might be needed by index.html or other client-side scripts

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
