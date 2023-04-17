import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

import Nav from "./components/Nav/Nav.js";
import CreateImage from "./components/CreateImage/CreateImage.js";
import ChatBot from "./components/ChatBot/ChatBot.js";
import DalleImages from "./components/DalleImages/DalleImages.js";
import Auth from "./components/Auth/Auth.js";

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Routes> 
        <Route path="/" element={ <DalleImages />} />
        <Route path="/createImage" element={ <CreateImage />} />
        <Route path="/chatBot" element={<ChatBot />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
