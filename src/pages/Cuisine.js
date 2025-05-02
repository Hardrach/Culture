// src/pages/Cuisine.js
import React, { useState, useEffect } from "react";
import { FaUtensils, FaBreadSlice, FaFish, FaPepperHot, FaLeaf, FaGlassWhiskey, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from "../components/Footer";
import ReadMoreButton from "../components/ReadMoreButton";
import "../styles/Cuisine.css";

const cuisineItems = [
  {
    title: "Rfissa",
    description: "La rfissa marocaine fait partie des traditions culinaires de ce pays",
    wikiTitle: "Rfissa",
    icon: <FaUtensils />,
    color: "#ff6b6b"
  },
  {
    title: "Couscous",
    description: "Semoule accompagnée de légumes et viande",
    wikiTitle: "Couscous",
    icon: <FaBreadSlice />,
    color: "#4ecdc4"
  },
  {
    title: "Seffa",
    description: "Ce plat se mange généralement en fin de repas avant le dessert",
    wikiTitle: "Seffa",
    icon: <FaBreadSlice />,
    color: "#4ecdc4"
  },
  {
    title: "Pastilla",
    description: "Feuilleté sucré-salé aux pigeons et amandes",
    wikiTitle: "Pastilla",
    icon: <FaLeaf />,
    color: "#45b7d1"
  },
  {
    title: "Harira",
    description: "Soupe traditionnelle aux lentilles et tomates",
    wikiTitle: "Harira",
    icon: <FaGlassWhiskey />,
    color: "#96ceb4"
  },
  {
    title: "Tangia",
    description: "Est un plat traditionnel de la cuisine marocaine",
    wikiTitle: "Tangia",
    icon: <FaUtensils />,
    color: "#ffcc00"
  },
  {
    title: "Briouates",         
    description: "Feuilletés aux amandes et miel",
    wikiTitle: "Briouates",
    icon: <FaLeaf />,
    color: "#ff6b6b"
  },
  {
    title: "Chebakia",
    description: "Est une pâtisserie de forme roulée originaire du Maghreb",
    wikiTitle: "Chebakia",
    icon: <FaGlassWhiskey />,
    color: "#4ecdc4"
  }
];

const Cuisine = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [wikiInfo, setWikiInfo] = useState("");
  const [wikiImage, setWikiImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardImages, setCardImages] = useState({});

  // Charger les images Wikipedia pour chaque plat au montage
  useEffect(() => {
    const fetchAllImages = async () => {
      const images = {};
      for (const item of cuisineItems) {
        try {
          const encodedTitle = encodeURIComponent(item.wikiTitle);
          const response = await fetch(
            `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`
          );
          const data = await response.json();
          images[item.title] = data.thumbnail?.source || "";
        } catch {
          images[item.title] = "";
        }
      }
      setCardImages(images);
    };
    fetchAllImages();
  }, []);

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
      <div className="cuisine-container">
        <motion.div
          className="header-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>
            <FaUtensils className="header-icon" />
            Cuisine Marocaine Traditionnelle
          </h1>
          <p className="subtitle">
            Découvrez la richesse culinaire du Maroc à travers ses plats traditionnels
          </p>
        </motion.div>

        <motion.div
          className="items-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {cuisineItems.map((item, index) => (
            <motion.div
              key={index}
              className="cuisine-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                backgroundImage: cardImages[item.title]
                  ? `url(${cardImages[item.title]})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
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
        </motion.div>

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

export default Cuisine;

