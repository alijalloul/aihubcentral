import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import Store from '../src/redux/Store.js';
import App from '../src/App.js';
import { JSDOM } from 'jsdom';

const PORT = 3000;
const app = express();

const router = express.Router();

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    // Create a virtual DOM environment using jsdom
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Render the React application
    const appHtml = ReactDOMServer.renderToString(
      <Provider store={Store}>
        <App />
      </Provider>
    );

    // Update the inner HTML of the root div in the HTML template
    document.getElementById('root').innerHTML = appHtml;

    // Send the updated HTML page as the response
    return res.send(dom.serialize());
  });
};

// Catch-all route
router.use('/*', serverRenderer);

// Serve static files from the build directory
router.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }));

// Tell the app to use the above rules
app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
