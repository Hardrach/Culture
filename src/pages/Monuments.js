// src/pages/monuments.js
import React, { useState } from "react";
import monumentsData from "../data/monumentsData";
import MonumentAuto from "../components/MonumentAuto";
import { FaMapMarkedAlt, FaLandmark } from 'react-icons/fa';
import { motion } from 'framer-motion';

import Footer from "../components/Footer";
import "../styles/Monuments.css";

const Monuments = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  return (
    <>
      
      <div className="monuments-container">
        <motion.div
          className="header-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>
          <div className="header-icon-container">
              <FaLandmark className="header-icon" />
            </div>
            <div className="header-text">
              Découverte du patrimoine marocain
            </div>
          </h1>
          <p className="subtitle">
            Explorez les monuments historiques et culturels à travers les villes du Maroc
          </p>
        </motion.div>

        <motion.div
          className={`city-select-container ${isSelectFocused ? 'focused' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FaMapMarkedAlt className="select-icon" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            onFocus={() => setIsSelectFocused(true)}
            onBlur={() => setIsSelectFocused(false)}
            className="city-select"
          >
            <option value="">-- Choisir une ville --</option>
            {Object.keys(monumentsData).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </motion.div>
         
        <motion.div
          className="cards-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {!selectedCity ? (
            <motion.div
              className="select-city-prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="centered-container">
                <div className="select-city-prompt-card">
                  <FaMapMarkedAlt size={48} />
                  <h3>Sélectionnez une ville pour découvrir ses monuments</h3>
                  <p>Chaque ville recèle des trésors architecturaux uniques</p>
                </div>
              </div>
            </motion.div>
          ) : (
            monumentsData[selectedCity].map((title, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MonumentAuto title={title} />
              </motion.div>
            ))
          )}
        </motion.div>
        
        
      </div>
      <Footer />
    </>
  );
};

export default Monuments;
