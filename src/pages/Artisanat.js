// src/pages/Artisanat.js
import React, { useState, useEffect } from "react";
import { FaPalette, FaShoePrints, FaCouch, FaMugHot, FaTshirt, FaRing, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from "../components/Footer";
import ReadMoreButton from "../components/ReadMoreButton";
import "../styles/Artisanat.css";

const artisanatItems = [
  {
    title: "Zellige",
    description: "Mosaïque traditionnelle en céramique émaillée",
    wikiTitle: "Zellige",
    icon: <FaPalette />,
    color: "#ff6b6b"
  },
  {
    title: "Balgha",
    description: "Balgha marocaines en cuir traditionnel",
    wikiTitle: "Balgha",
    icon: <FaShoePrints />,
    color: "#4ecdc4"
  },
  {
    title: "Tapis berbère",
    description: "Tapis tissés à la main par les femmes berbères",
    wikiTitle: "Tapis berbère",
    icon: <FaCouch />,
    color: "#45b7d1"
  },
  {
    title: "Poterie de Safi",
    description: "Céramique traditionnelle de la ville de Safi",
    wikiTitle: "Poterie de Safi",
    icon: <FaMugHot />,
    color: "#96ceb4"
  },
  {
    title: "Djellaba",
    description: "Robe traditionnelle marocaine pour hommes et femmes",
    wikiTitle: "Djellaba",
    icon: <FaTshirt />,
    color: "#ffcc00"
  },
  
  {
    title: "Bijoux berbères",
    description: "Bijoux traditionnels en argent des tribus berbères",
    wikiTitle: "Bijoux berbères",
    icon: <FaRing />,
    color: "#4ecdc4"
  }
];

const Artisanat = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [wikiInfo, setWikiInfo] = useState("");
  const [wikiImage, setWikiImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWikiInfo = async () => {
      if (selectedItem) {
        setLoading(true);
        try {
          const encodedTitle = encodeURIComponent(selectedItem.wikiTitle);
          const response = await fetch(
            `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.type === "disambiguation") {
            setWikiInfo("Plusieurs articles correspondent à ce sujet. Veuillez préciser la recherche.");
            setWikiImage("");
          } else {
            setWikiInfo(data.extract || "Description non disponible.");
            setWikiImage(data.thumbnail?.source || "");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des informations Wikipedia:", error);
          setWikiInfo("Informations non disponibles pour le moment. Veuillez réessayer plus tard.");
          setWikiImage("");
        }
        setLoading(false);
      }
    };

    fetchWikiInfo();
  }, [selectedItem]);

  return (
    <>
      <div className="artisanat-container">
        <motion.div
          className="header-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>
            <FaPalette className="header-icon" />
            Artisanat Traditionnel Marocain
          </h1>
          <p className="subtitle">
            Découvrez la richesse de l'artisanat marocain à travers ses différents métiers traditionnels
          </p>
        </motion.div>

        <div className="items-grid">
          {artisanatItems.map((item, index) => (
            <motion.div
              key={index}
              className="artisanat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="item-icon">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button 
                className="btn-voir-plus"
                onClick={() => setSelectedItem(item)}
              >
                Regarder
              </button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={e => e.stopPropagation()}
              >
                <button 
                  className="close-button"
                  onClick={() => setSelectedItem(null)}
                >
                  ×
                </button>
                <h2>{selectedItem.title}</h2>
                {wikiImage && (
                  <img 
                    src={wikiImage} 
                    alt={selectedItem.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/800x400?text=Image+non+disponible";
                    }}
                  />
                )}
                <div className="modal-description">
                  {loading ? (
                    <p>Chargement des informations...</p>
                  ) : (
                    <p>{wikiInfo || selectedItem.description}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default Artisanat;
