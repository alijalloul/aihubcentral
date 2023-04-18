const express = require("express");
const path = require("path");

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for serving the same HTML file for all requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
  console.log("hello there")
});
