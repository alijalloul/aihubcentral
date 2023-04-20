import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import App from './App';
import Store from './redux/Store';
import Test from './Test';

import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(<Provider store = { Store }><App /></Provider>);

  /*ReactDOM.hydrateRoot(document.getElementById('root'), <Test />);*/