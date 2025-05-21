import React, { createContext, useState, useEffect } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // Restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem('user');
      }
    }
  }, []);


  // ✅ Real Flask-integrated login
  const login = async (credentials, role) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...credentials,role}),
      });


      if (!response.ok) {
        const error = await response.json();
        console.error("Login failed:", error.message);
        return false;
      }


      const data = await response.json();


      const userData = {
        ...data,
        role, // frontend context role (for redirection)
      };


      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };


  // ✅ Real Flask-integrated signup
  const register = async (formData, role) => {
    try {
      const payload = {
        ...formData,
        role,
      };


      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        const error = await response.json();
        console.error("Signup failed:", error.message);
        return false;
      }


      console.log("Signup successful");
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };


  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;



