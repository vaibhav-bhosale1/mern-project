// client/src/components/History.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Ensure cookies are sent with this request
    axios.defaults.withCredentials = true; 
    
    axios.get('https://mern-project-wicy.onrender.com/api/history') // [cite: 30]
      .then(res => {
        setHistory(res.data);
      })
      .catch(err => console.error("Could not fetch history:", err));
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="history-container">
      <h3>Your Search History</h3>
      {history.length === 0 ? (
        <p>No search history found.</p>
      ) : (
        <ul>
          {history.map((item) => (
            // Display search term and timestamp [cite: 31]
            <li key={item._id}> 
              {item.term} 
              <span style={{ fontSize: '0.8em', color: '#777', marginLeft: '10px' }}>
                {new Date(item.timestamp).toLocaleString()} 
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;