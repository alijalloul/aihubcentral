import React from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion";

import Nav from "./components/Nav/Nav.js";
import CreateImage from "./components/CreateImage/CreateImage.js";
import ChatBot from "./components/ChatBot/ChatBot.js";
import DalleImages from "./components/DalleImages/DalleImages.js";
import Auth from "./components/Auth/Auth.js";
import TSST from "./components/TSST/TSST.js";
import SummarizeURL from "./components/SummarizeURL/SummarizeURL.js";
import Translator from "./components/Translator/Translator.js";

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
            <Route path="/TSST" element={<TSST />} />
            <Route path="/summarizeURL" element={<SummarizeURL />} />
            <Route path="/translator" element={<Translator />} /> 
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </AnimatePresence>
    </>  
  );
}

export default App;
