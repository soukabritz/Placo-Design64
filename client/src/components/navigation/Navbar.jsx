import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/LogoPlacoDesign64.png';
import './navbar.scss';
import { FaBars, FaTimes, FaEnvelope, FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const services = [
  { id: 'platrerie', name: 'Plâtrerie', path: '/services/platrerie' },
  { id: 'peinture', name: 'Peinture', path: '/services/peinture' },
  { id: 'carrelage', name: 'Carrelage', path: '/services/carrelage' },
  { id: 'menuiserie', name: 'Menuiserie', path: '/services/menuiserie' },
  { id: 'cuisine', name: 'Cuisine', path: '/services/cuisine' },
  { id: 'revetement', name: 'Revêtements', path: '/services/revetement' },
  { id: 'terrasse', name: 'Terrasses', path: '/services/terrasse' }
];

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServicesLocked, setIsServicesLocked] = useState(false);
  const { isAuth, logout } = useAuth();
  const servicesDropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isServicesOpen) return;
    function handleClickOutside(event) {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServicesOpen(false);
        setIsServicesLocked(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isServicesOpen) setIsServicesOpen(false);
  };

  const toggleServices = (e) => {
    e.preventDefault();
    setIsServicesOpen(!isServicesOpen);
  };

  const handleServiceClick = () => {
    setIsServicesOpen(false);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

 
  const handleServicesMouseEnter = () => {
    if (!isMobile && !isServicesLocked) setIsServicesOpen(true);
  };
  const handleServicesMouseLeave = () => {
    if (!isMobile && !isServicesLocked) setIsServicesOpen(false);
    if (!isMobile && isServicesLocked) setIsServicesOpen(true);
  };
  const handleServicesClick = (e) => {
    if (!isMobile) {
      e.preventDefault();
      if (isServicesLocked) {
        setIsServicesLocked(false);
        setIsServicesOpen(false);
      } else {
        setIsServicesLocked(true);
        setIsServicesOpen(true);
      }
    } else {
      toggleServices(e);
    }
  };

  const renderServicesMenu = (isMobileMenu = false) => (
    <div
      ref={!isMobileMenu ? servicesDropdownRef : undefined}
      className={`services-dropdown ${isMobileMenu ? 'mobile' : 'desktop'}`}
      onMouseEnter={!isMobileMenu ? handleServicesMouseEnter : undefined}
      onMouseLeave={!isMobileMenu ? handleServicesMouseLeave : undefined}
    >
      <div className="services-toggle" onClick={handleServicesClick}>
        <span>Services</span>
        {isServicesOpen ? <FaChevronUp style={{ marginLeft: '0.5em' }} /> : <FaChevronDown style={{ marginLeft: '0.5em' }} />}
      </div>
      {isServicesOpen && (
        <div className="services-list">
          {services.map(service => (
            <Link
              key={service.id}
              to={service.path}
              onClick={handleServiceClick}
              className={isMobileMenu ? 'mobile-link' : 'nav-link'}
            >
              {service.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Top Navbar - Logo only */}
        <nav className="top-navbar">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo Placo Design 64" />
          </Link>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={toggleMenu}>
            <div className="mobile-menu" onClick={e => e.stopPropagation()}>
              <button className="close-menu-btn" onClick={toggleMenu}>
                <FaTimes />
              </button>
              <Link to="/" onClick={toggleMenu}>Accueil</Link>
              {renderServicesMenu(true)}
              <Link to="/realisations" onClick={toggleMenu}>Réalisations</Link>
              <Link to="/contact" onClick={toggleMenu}>Contact</Link>
              {isAuth ? (
                <>
                  <button onClick={() => { logout(); toggleMenu(); }}>Déconnexion</button>
                </>
              ) : (
                <Link to="/login" onClick={toggleMenu}>Connexion</Link>
              )}
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <nav className="bottom-navbar">
          <button className="nav-item" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
            <span>Menu</span>
          </button>
          <Link to="/contact" className="nav-item">
            <FaEnvelope />
            <span>Contact</span>
          </Link>
          {isAuth ? (
            <button onClick={logout} className="nav-item">
              <FaUser />
              <span>Déconnexion</span>
            </button>
          ) : (
            <Link to="/login" className="nav-item">
              <FaUser />
              <span>Connexion</span>
            </Link>
          )}
        </nav>
      </>
    );
  }

  return (
    <nav className="desktop-navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo Placo Design 64" />
        </Link>
      </div>
      
      <div className="nav-right">
        <Link to="/" className="nav-link">Accueil</Link>
        {renderServicesMenu()}
        <Link to="/realisations" className="nav-link">Réalisations</Link>
        <Link to="/contact" className="nav-link nav-contact">Contact</Link>
        {isAuth ? (
          <button onClick={logout} className="nav-link logout-btn">
            Déconnexion
          </button>
        ) : (
          <Link to="/login" className="nav-link">
            <i className="fas fa-user"></i> Connexion
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 