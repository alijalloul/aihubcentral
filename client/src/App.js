import React from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion";

import Nav from "./components/Nav/Nav.js";
import CreateImage from "./components/CreateImage/CreateImage.js";
import ChatBot from "./components/ChatBot/ChatBot.js";
import DalleImages from "./components/DalleImages/DalleImages.js";
import Auth from "./components/Auth/Auth.js";

const App = () => {
  const location = useLocation();

  return (
    <>
        <Nav />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}> 
            <Route path="/" element={ <DalleImages />} />
            <Route path="/createImage" element={ <CreateImage />} />
            <Route path="/chatBot" element={<ChatBot />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </AnimatePresence>
    </>  
  );
}

export default App;
