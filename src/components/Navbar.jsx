import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/UseTheme';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = async () => {
    if (searchId) {
      try {
        const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${searchId}`);
        if (response.data) {
          navigate(`/cards/${searchId}`);
          setError(null);
        } else {
          setError(`No card found with ID ${searchId}`);
        }
      } catch (err) {
        setError(`Error finding card with ID ${searchId}: ${err.message}`);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchId('');
    setError(null);
    navigate('/cards');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">BCard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cards">All Cards</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/liked-cards">Liked Cards</Link>
                </li>
                {user && user.isBusiness && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/my-cards">My Cards</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/create-card">Create Card</Link>
                    </li>
                  </>
                )}
                {user && user.isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-sandbox">Admin Sandbox</Link>
                  </li>
                )}
              </>
            )}
          </ul>
          {isLoggedIn && (
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClearSearch}
              searchId={searchId}
              setSearchId={setSearchId}
            />
          )}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button 
                className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} me-2`} 
                onClick={toggleTheme}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </nav>
  );
};

export default Navbar;