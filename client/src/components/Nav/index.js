import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../images/animals/lil-cutie.png"

function Nav() {
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

export default Nav;
