import express from "express";
import path from "path";

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for serving the same HTML file for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});
