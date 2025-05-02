import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/ReadMoreButton.css';

const ReadMoreButton = ({ onClick, isLink, href, text = "Lire plus" }) => {
  const ButtonComponent = isLink ? 'a' : motion.button;
  const buttonProps = isLink 
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "read-more-button link"
      }
    : {
        onClick,
        className: "read-more-button",
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 }
      };

  return (
    <ButtonComponent {...buttonProps}>
      {text}
      <FontAwesomeIcon icon={faExternalLinkAlt} />
    </ButtonComponent>
  );
};

export default ReadMoreButton; 