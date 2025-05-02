import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <img src="../image/morocco-flag.png" alt="Logo Maroc" />
        <h1>Patrimoine Marocain</h1>
      </Link>

      <button 
        className="menu-toggle" 
        onClick={toggleMenu}
        aria-label="Menu principal"
      >
        <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </span>
      </button>

      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
        <li><Link to="/monuments" onClick={closeMenu}>Monuments</Link></li>
        <li><Link to="/musique" onClick={closeMenu}>Musique</Link></li>
        <li><Link to="/artisanat" onClick={closeMenu}>Artisanat</Link></li>
        <li><Link to="/cuisine" onClick={closeMenu}>Cuisine</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
