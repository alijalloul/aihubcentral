import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

import Nav from "./components/Nav/Nav.js";
import CreateImage from "./components/CreateImage/CreateImage.js";
import ChatBot from "./components/ChatBot/ChatBot.js";
import Posts from "./components/Posts/Posts.js";

const App = () => {
  console.log(process.env.REACT_APP_TEST);
  console.log(process.env.REACT_APP_SERVER_URL);

  return (
    <BrowserRouter>
      <Nav />
      <Routes> 
        <Route path="/" element={ <Posts />} />
        <Route path="/createImage" element={ <CreateImage />} />
        <Route path="/chatBot" element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
