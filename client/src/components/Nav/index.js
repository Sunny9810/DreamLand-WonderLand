import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from 'react-bootstrap';
import '../../index.css';
import Logo from "../../images/animals/lil-cutie.png";

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
  const expand = false;
  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3 nav-background">
      <Container fluid>
      <div className="d-flex justify-content-center align-items-center p-3">
              <img src={Logo} alt="Dreamland Wonderland Logo" height={50} />
            </div>
      <h1>
        <Navbar.Brand href="/"style={{ fontSize: '3rem', color: 'white' }}>Dreamland Wonderland</Navbar.Brand>
      </h1>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          className="nav-background"
        >
          <Offcanvas.Header className="border border-dark" closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Dreamland Wonderland
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Nav className="flex-column">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Sizes" id="navbarScrollingDropdown" menuVariant="dark" >
              <NavDropdown.Item href="#action3">Babies</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Kids</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Adults</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">All</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Account" menuVariant="dark" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/signup">Sign-up</NavDropdown.Item>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/orderHistory">Profile</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;