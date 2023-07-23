import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from 'react-bootstrap';
import '../../index.css';
import DreamLogo from '../../images/DreamLogo.png'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyNavbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }
    //! below is the nav bar that will always render containing the site title link and the logo , it calls the showNavigation function which conditinally renders nav buttons 
  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">
            <img src={Logo} width={100} height={100} />
          </span>
          -Dreamland
        </Link>
      </h1>
  
      <nav id="login">{showNavigation()}</nav>
    
    </header>
  );
}

export default MyNavbar;