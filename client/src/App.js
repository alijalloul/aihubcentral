import React from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header/Header.js";
import CreateImage from "./components/CreateImage/CreateImage.js";
import ChatBot from "./components/ChatBot/ChatBot.js";
import DalleImages from "./components/DalleImages/DalleImages.js";
import Auth from "./components/Auth/Auth.js";
import TSST from "./components/TSST/TSST.js";
import SummarizeURL from "./components/SummarizeURL/SummarizeURL.js";
import Translator from "./components/Translator/Translator.js";
import Main from "./components/Main/Main.js";
import Footer from "./components/Footer/Footer.js";

const App = () => {
  const location = useLocation();

  return (
    <>
        <Header />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}> 
            <Route path="/" element={ <Main />} />
            <Route path="/createImage" element={ <CreateImage />} />
            <Route path="/chatBot" element={<ChatBot />} />
            <Route path="/TSST" element={<TSST />} />
            <Route path="/summarizeURL" element={<SummarizeURL />} />
            <Route path="/translator" element={<Translator />} /> 
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </AnimatePresence>
        <Footer />
    </>  
  );
}

export default App;
