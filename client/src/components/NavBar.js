import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import '../styling/NavBar.css';

function NavBar() {
  const location = useLocation();

  const DisplayHomeButton = location.pathname !== '/';

  return (
    <div className="navbar">
      {DisplayHomeButton && (
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
      )}

      {!DisplayHomeButton && (
        <Link to="/login" className="login-btn">
          <FontAwesomeIcon icon={faUser} /> Login
        </Link>
      )}
    </div>
  );
}

export default NavBar;

