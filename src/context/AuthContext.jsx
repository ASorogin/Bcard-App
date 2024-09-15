import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
     
        setUser({
          _id: decodedToken._id,
          isAdmin: decodedToken.isAdmin,
          isBusiness: decodedToken.isBusiness
        });
        setIsLoggedIn(true);
        
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
   
    setUser({
      _id: decodedToken._id,
      isAdmin: decodedToken.isAdmin,
      isBusiness: decodedToken.isBusiness
    });
    setIsLoggedIn(true);
   
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    
  };

  

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};