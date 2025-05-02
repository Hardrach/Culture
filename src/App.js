import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Monuments from "./pages/Monuments";
import Musique from "./pages/Musique";
import Artisanat from "./pages/Artisanat";
import Cuisine from "./pages/Cuisine";
import Navbar from "./components/Navbar";
import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/global.css";
import "./styles/grid.css";
import "./styles/theme.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/monuments" element={<Monuments />} />
              <Route path="/musique" element={<Musique />} />
              <Route path="/artisanat" element={<Artisanat />} />
              <Route path="/cuisine" element={<Cuisine />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;