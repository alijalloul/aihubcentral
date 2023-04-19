import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import App from './App';
import Store from './redux/Store';

import "./index.css"

if(typeof window !== 'undefined') { 
ReactDOM.hydrateRoot(document.getElementById('root'),
  <Provider store = { Store }>
    <App /> 
  </Provider>)};