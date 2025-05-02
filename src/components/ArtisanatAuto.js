// src/components/ArtisanatAuto.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import ReadMoreButton from "./ReadMoreButton";
import "../styles/ArtisanatAuto.css";

const ArtisanatAuto = ({ title }) => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [wikiImage, setWikiImage] = useState(null);

  useEffect(() => {
    const fetchWikiData = async () => {
      try {
        const response = await fetch(
          `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
        );
        const json = await response.json();
        setData(json);
        
        // Fetch higher quality image if available
        if (json.thumbnail?.source) {
          const imageTitle = json.thumbnail.source.split("/").pop().split("px-")[1];
          const imageResponse = await fetch(
            `https://fr.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(title)}`
          );
          const imageData = await imageResponse.json();
          const betterImage = imageData.items?.find(item => 
            item.title.includes(imageTitle) && item.srcset?.[0]?.src
          );
          setWikiImage(betterImage?.srcset?.[0]?.src || json.thumbnail.source);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données");
        console.error(err);
      }
    };

    fetchWikiData();
  }, [title]);

  if (error) return <p className="error-message">{error}</p>;
  if (!data) return (
    <div className="loading">
      <FontAwesomeIcon icon={faSpinner} spin />
      <span>Chargement de {title}...</span>
    </div>
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.div 
        className="artisanat-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="card-image">
          <img src={wikiImage || data.thumbnail?.source || "/placeholder-artisanat.jpg"} alt={title} />
        </div>
        <div className="card-content">
          <h3>{data.title}</h3>
          <p>{data.extract}</p>
          <ReadMoreButton text="En savoir plus" onClick={() => setIsModalOpen(true)} />
        </div>
      </motion.div>

      {isModalOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img src={wikiImage || data.thumbnail?.source} alt={title} className="modal-image" />
            <h2>{data.title}</h2>
            <p>{data.extract}</p>
            <ReadMoreButton 
              isLink 
              href={data.content_urls?.desktop?.page} 
              text="Voir sur Wikipédia" 
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ArtisanatAuto;
