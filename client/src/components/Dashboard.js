// client/src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

import ResultsGrid from './ResultsGrid'; // Import the new component
import History from './History'; // Import the new component
import './Dashboard.css'; // Import the CSS

const Dashboard = () => {
  const { user } = useAuth();
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  if (!user) return <p>Please <a href="/login">login</a> to continue.</p>;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!term) return; // Don't search for empty string

    try {
      // This is CRITICAL for authentication
      axios.defaults.withCredentials = true; 

      const res = await axios.post('https://mern-project-wicy.onrender.com/api/search', { term }); // [cite: 19]
      setResults(res.data.results || []); // Ensure results is always an array
      setSelectedImages([]); // Clear previous selections
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        alert("Your session has expired. Please log in again.");
        // Optionally redirect to login
      }
    }
  };

  return (
    <div className="dashboard-container">
      
      
    
        <div className="dashboard-header">
            <h2>Welcome, {user.displayName}</h2>
            <a href="https://mern-project-wicy.onrender.com/auth/logout">Logout</a>
        </div>
       

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search for images..."
          value={term} 
          onChange={(e) => setTerm(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 && (
        <div className="results-info">
          {/* [cite: 24] */}
          <p>You searched for '{term}' -- {results.length} results.</p> 
          {/* [cite: 28] */}
          <p>Selected: {selectedImages.length} images</p> 
        </div>
      )}

      {/* Render the ResultsGrid component */}
      <ResultsGrid 
        images={results} 
        selected={selectedImages}
        setSelected={setSelectedImages}
      /> 

      {/* Render the History component */}
      <History />
    </div>
  );
};

export default Dashboard;