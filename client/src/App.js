import React, {lazy, Suspense} from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";

const Main = lazy(() => import("./components/Main/Main.js"));
const CreateImage = lazy(() => import("./components/CreateImage/CreateImage.js"));
const ChatBot = lazy(() => import("./components/ChatBot/ChatBot.js"));
const TSST = lazy(() => import("./components/TSST/TSST.js"));
const SummarizeURL = lazy(() => import("./components/SummarizeURL/SummarizeURL.js"));
const Translator = lazy(() => import("./components/Translator/Translator.js"));
const Auth = lazy(() => import("./components/Auth/Auth.js"));

const App = () => {
  const location = useLocation();

  return (
    <>
        <Header />
        <AnimatePresence>
          <Suspense fallback={<div className="h-[calc(100vh-73px)] sm:h-[calc(100vh-120px)]"></div>}>
            <Routes location={location} key={location.pathname}> 
              <Route path="/" element={ <Main />} />
              <Route path="/createImage" element={ <CreateImage />} />
              <Route path="/chatBot" element={<ChatBot />} />
              <Route path="/TSST" element={<TSST />} />
              <Route path="/summarizeURL" element={<SummarizeURL />} />
              <Route path="/translator" element={<Translator />} /> 
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <Footer />
    </>  
  );
}

export default App;
