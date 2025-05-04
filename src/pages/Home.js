import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { FaLandmark, FaMusic, FaHandsHelping, FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';
import "../styles/Home.css";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { icon: <FaLandmark className="category-icon" />, title: "Monuments", link: "/monuments" },
    { icon: <FaMusic className="category-icon" />, title: "Musique", link: "/musique" },
    { icon: <FaHandsHelping className="category-icon" />, title: "Artisanat", link: "/artisanat" },
    { icon: <FaUtensils className="category-icon" />, title: "Cuisine", link: "/cuisine" }
  ];

  return (
    <>
      <main className="home">
        <div className="logo-container">
          <motion.div
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <img src="../image/logomonument.jpg" alt="Logo Maroc" />
          </motion.div>
        </div>

        <motion.div
          className="welcome-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Bienvenue dans le monde du patrimoine marocain</h2>
          <p>Explorez la richesse culturelle du Maroc à travers ses villes, musiques, artisanats, et plus encore.</p>
        </motion.div>

        {showContent && (
          <motion.div
            className="categories-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.a
                key={index}
                href={category.link}
                className="category-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
              </motion.a>
            ))}
          </motion.div>
        )}
      </main>
      <Footer />
    </>
  );
}
