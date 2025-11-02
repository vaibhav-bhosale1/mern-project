// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Custom hook to easily access auth state
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On app load, check if the user is already logged in
    // by checking the session on the server
    
    // Ensure cookies are sent with this request
    axios.defaults.withCredentials = true; 
    
    axios.get('http://localhost:5000/auth/current_user')
      .then(res => {
        setUser(res.data || null); // Set user if logged in, null if not
        setLoading(false);
      })
      .catch(() => {
        // If the request fails (e.g., server down), set user to null
        setUser(null);
        setLoading(false);
      });
  }, []); // Empty array means this runs only once when the component mounts

  const value = { user, loading };

  // Render children only after the initial user check is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};