import React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from "react-redux";

import App from './App';
import Store from './redux/Store';

import "./index.css"

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store = { Store }>
    <App />
  </Provider>
);