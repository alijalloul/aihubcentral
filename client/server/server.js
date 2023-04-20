import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import Store from '../src/redux/Store.js';
import App from '../src/App.js';

const PORT = 3000;
const app = express();

app.get(express.static(path.resolve('./build/index.html')));

app.get("/*", (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    return res.send(data.replace('<div id="root"></div>',`<div id="root">${<Provider store={Store}><App /></Provider>}</div>`));
  });
})

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
