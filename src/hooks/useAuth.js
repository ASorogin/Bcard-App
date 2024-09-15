import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, isLoggedIn, login, logout } = context;

  const isAdmin = () => {
    return isLoggedIn && user && user.isAdmin === true;
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
    isAdmin
  };
}