import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, userName, setIsLoggedIn, setUserName } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // remove auth info
    setIsLoggedIn(false);
    setUserName('');
    navigate('/app'); // redirect to main page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">GiftLink</a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto"> {/* push items to right */}
          <li className="nav-item"><Link className="nav-link" to="/home.html">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/app">Gifts</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/app/search">Search</Link></li>

          {!isLoggedIn ? (
            <>
              <li className="nav-item"><Link className="nav-link login-btn" to="/app/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/app/register">Register</Link></li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/app/profile">Hello, {userName}</Link></li>
              <li className="nav-item"><button className="nav-link logout-btn btn" onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
