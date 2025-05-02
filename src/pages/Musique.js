import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { FaMusic, FaYoutube, FaInfoCircle, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import "../styles/Musique.css";

const videos = [
  {
    title: "Gnaoua",
    description: "Musique spirituelle du sud marocain",
    wikiTitle: "Gnaoua",
    url: "https://www.youtube.com/embed/BSKmB_1-Kto",
    icon: <FaMusic />,
    color: "#ff6b6b"
  },
  {
    title: "Malhoun",
    description: "Poésie andalouse chantée dans les villes impériales",
    wikiTitle: "Malhoun",
    url: "https://www.youtube.com/embed/m1yaRweMfTU",
    icon: <FaMusic />,
    color: "#4ecdc4"
  },
  {
    title: "Ahidous",
    description: "Chants amazighs collectifs avec tambours",
    wikiTitle: "Ahidous",
    url: "https://www.youtube.com/embed/QvUXFfJ5JXE",
    icon: <FaMusic />,
    color: "#45b7d1"
  },
  {
    title: "Aïta",
    description: "Chants populaires par les cheikhates",
    wikiTitle: "Aïta",
    url: "https://www.youtube.com/embed/L5KzDs1CGLI",
    icon: <FaMusic />,
    color: "#96ceb4"
  }
];

const Musique = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [wikiInfo, setWikiInfo] = useState("");
  const [wikiImage, setWikiImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWikiInfo = async () => {
      if (selectedVideo) {
        setLoading(true);
        try {
          const encodedTitle = encodeURIComponent(selectedVideo.wikiTitle);
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
            if (data.thumbnail?.source) {
              const imageTitle = data.thumbnail.source.split("/").pop().split("px-")[1];
              const imageResponse = await fetch(
                `https://fr.wikipedia.org/api/rest_v1/page/media-list/${encodedTitle}`
              );
              const imageData = await imageResponse.json();
              const betterImage = imageData.items?.find(item => 
                item.title.includes(imageTitle) && item.srcset?.[0]?.src
              );
              setWikiImage(betterImage?.srcset?.[0]?.src || data.thumbnail.source);
            }
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
  }, [selectedVideo]);

  return (
    <>
      <div className="musique-container">
        <motion.div
          className="header-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>
            <FaMusic className="header-icon" />
            Musique Traditionnelle Marocaine
          </h1>
          <p className="subtitle">
            Découvrez la richesse musicale du Maroc à travers ses différents styles traditionnels
          </p>
        </motion.div>

        <motion.div
          className="videos-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="video-card"
              onClick={() => setSelectedVideo(video)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="video-icon">
                {video.icon}
              </div>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <button className="btn-regarder" onClick={() => setSelectedVideo(video)}>
                Regarder
              </button>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              className="video-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                className="video-content"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="video-header">
                  <h2>{selectedVideo.title}</h2>
                  <button onClick={() => setSelectedVideo(null)}>×</button>
                </div>
                <div className="video-iframe">
                  <iframe
                    width="100%"
                    height="360"
                    src={selectedVideo.url}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
               
                <div className="video-description">
                  <FaInfoCircle />
                  {loading ? (
                    <p>Chargement des informations...</p>
                  ) : (
                    <p>{wikiInfo || selectedVideo.description}</p>
                  )}
                </div>
                {!loading && wikiInfo && (
                  <a 
                    className="btn-regarder"
                    href={`https://fr.wikipedia.org/wiki/${selectedVideo.wikiTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir sur Wikipédia
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default Musique;
