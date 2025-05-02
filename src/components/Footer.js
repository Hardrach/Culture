import "../styles/Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      
      <p className="Realise">  Réalisé avec ❤️ par <span className="Myname">YASSINE RACHID</span></p>
      <p>© 2025 Patrimoine Marocain </p>

      <div className="social-links">
        <a href="https://www.linkedin.com/in/yassine-rachid-b27aa6225/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
        </a>
        <a href="https://github.com/Hardrach" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="social-icon" />
        </a>
        <a href="https://www.facebook.com/share/1ATDCpLxWB/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
