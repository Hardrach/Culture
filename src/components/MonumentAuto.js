// src/components/MonumentAuto.js
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

const MonumentAuto = ({ title }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await fetch(
          `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        if (json.type === "disambiguation") {
          setError("Plusieurs articles correspondent à ce monument.");
        } else {
          setData(json);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations:", error);
        setError("Informations non disponibles pour le moment.");
      }
    };

    fetchData();
  }, [title]);

  if (error) {
    return (
      <div className="card">
        <div className="card-image-container">
          <img src="https://via.placeholder.com/300" alt={title} />
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <div className="error-message">
            <FaInfoCircle />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card loading">
        <div className="card-image-container">
          <img src="https://via.placeholder.com/300" alt={title} />
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <p>⏳ Chargement des informations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-image-container">
        <img 
          src={data.thumbnail?.source || "https://via.placeholder.com/300"} 
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300";
          }}
        />
      </div>
      <div className="card-content">
        <h3>{data.title || title}</h3>
        <p>{data.extract || "Description non disponible."}</p>
        <div className="card-footer">
          <span className="location">
            <FaMapMarkerAlt />
            <span>Maroc</span>
          </span>
          {data.content_urls?.desktop?.page && (
            <a 
              href={data.content_urls.desktop.page} 
              target="_blank" 
              rel="noopener noreferrer"
              className="read-more"
            >
              <span>Lire plus</span>
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonumentAuto;
