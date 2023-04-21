import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import Store from './redux/Store';

import "./index.css"

//ReactDOM.createRoot(document.getElementById('root')).render(<Provider store = { Store }><App /></Provider>);

  ReactDOM.hydrateRoot(document.getElementById('root'),
    <Provider store = { Store }> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );