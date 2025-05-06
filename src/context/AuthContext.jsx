import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  const login = (userData, role) => {
    if (!userData || !role) {
      console.error('Missing user data or role for login');
      return false;
    }
    
    // Create a user object with provided data and role
    const user = {
      ...userData,
      role: role
    };
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Update state
    setUser(user);
    setIsAuthenticated(true);
    
    return true;
  };
  
  const register = (userData, role) => {
    // Here you would typically send this data to an API
    // For demo purposes, we'll just return true
    console.log('Registered user:', { ...userData, role });
    return true;
  };
  
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
  };
  
  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;