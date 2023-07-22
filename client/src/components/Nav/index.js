import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Logo from "../../images/animals/lil-cutie.png"

function MyNavbar() {
    //! the function below will render the conditionaly buttons for navigation whether the user is logged in or not
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
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
  <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
    <Container fluid>
        <Navbar.Brand href="/">Dreamland Wonderland</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Sizes" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Baby</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Kids</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Adults</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                All
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/signup">Sign-up</NavDropdown.Item>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/orderHistory">Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
   
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 
    /*<header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">
            <img src={Logo} width={100} height={100} />
          </span>
          -Dreamland
        </Link>
      </h1>
  
      <nav id="login">{showNavigation()}</nav>
    
    </header>*/

export default MyNavbar;
