import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import https from 'https';
import * as dotenv from "dotenv";
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

import heapdump from 'heapdump';
heapdump.writeSnapshot(function(err, filename) {
  console.log('dump written to', filename);
});

import Images from "../src/redux/Images.js";
import User from "../src/redux/User.js";

import App from '../src/App';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('build', { index: false }));


console.log("PORT EXISTS");
function pingWebsite() {
    https.get('https://aihubcentral.org', (res) => {
      console.log('Website pinged successfully');
    }).on('error', (err) => {
      console.error('Error while pinging website:', err);
    });
  }
  
  // Ping website every 14 minutes (840000 milliseconds)
  setInterval(pingWebsite, 840000);

app.get("/*", (req, res, next) => {
    const Store = configureStore({
      reducer: {
          images: Images,
          user: User
      }
  });

  const context = {};

  const html = ReactDOMServer.renderToString(
    <Provider store = { Store }>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  
  const preloadedState = Store.getState();

  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error("read file error: ", err);
      return res.status(500).send('An error occurred');
    }

    //return res.status(200);
    return res.send(data
                    .replace('<div id="root"></div>',`<div id="root">${html}</div>`)
                    .replace('__PRELOADED_STATE__', JSON.stringify(preloadedState)));
  });
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SSR running on port ${PORT}`);
});
