import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav as BootstrapNav } from 'react-bootstrap';
import Auth from "../../utils/auth";
import Cart from "../Cart";
import DreamLogo from '../../images/DreamLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css';

const NavLinks = () => {
  if (Auth.loggedIn()) {
    return (
      <>
        <BootstrapNav.Link as={Link} to="/orderHistory" className="custom-nav-link">
          Order History
        </BootstrapNav.Link>
        <BootstrapNav.Link onClick={() => Auth.logout()} className="custom-nav-link">
          Logout
        </BootstrapNav.Link>
      </>
    );
  } else {
    return (
      <>
        <BootstrapNav.Link as={Link} to="/signup" className="custom-nav-link">
          Signup
        </BootstrapNav.Link>
        <BootstrapNav.Link as={Link} to="/login" className="custom-nav-link">
          Login
        </BootstrapNav.Link>
      </>
    );
  }
}

function Nav() {
  const [showLogo, setShowLogo] = useState(false);
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setShowLogo(window.scrollY !== 0);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setNavbarExpanded(false);
  }, [location]);

  const navbarClass = showLogo ? 'custom-navbar navbar-expanded' : 'custom-navbar navbar-collapsed';
  const logoClass = showLogo ? 'nav-logo navbar-logo-shown' : 'nav-logo navbar-logo-hidden';

  return (
    <Navbar expand="lg" sticky="top" expanded={navbarExpanded} onToggle={() => setNavbarExpanded(!navbarExpanded)} className={navbarClass}>
      <div className="container">
        <Navbar.Brand>
          {!showLogo && (
            <h1 className="nav-heading">
              <Link to="/" className="nav-heading-link">
                DreamLand <span role="img" aria-label="zzz">💤</span> Wonderland
              </Link>
            </h1>
          )}
          {showLogo && (
            <Link to="/" className="nav-heading-link">
              <img className={logoClass} src={DreamLogo} alt="dreamland wonderland logo" />
            </Link>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="custom-navbar-collapse">
          <div className="nav-menu nav-right">
            <NavLinks />
            <Cart />
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Nav;
