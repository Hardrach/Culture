import "../styles/Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.footer-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', `50%`);
        card.style.setProperty('--mouse-y', `50%`);
      });
    });
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <footer className="footer">
      
      <p className="Realise">  Réalisé avec ❤️ par <span className="Myname">YASSINE RACHID</span></p>
      <p>© 2025 Patrimoine Marocain </p>

      <div className="footer-socials">
        <div className="footer-card linkedin">
          <a href="https://www.linkedin.com/in/yassine-rachid-b27aa6225/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>
        </div>
        <div className="footer-card github">
          <a href="https://github.com/Hardrach" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="social-icon" />
          </a>
        </div>
        <div className="footer-card facebook">
          <a href="https://www.facebook.com/share/1ATDCpLxWB/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
