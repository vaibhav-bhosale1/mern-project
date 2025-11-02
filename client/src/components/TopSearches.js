// client/src/components/TopSearches.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopSearches = () => {
  const [terms, setTerms] = useState([]);
  useEffect(() => {
    axios.get('https://mern-project-wicy.onrender.com/api/top-searches')
      .then(res => setTerms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ background: '#eee', padding: '10px' }}>
      <strong>Top Searches:</strong> {terms.join(', ')}
    </div>
  );
};
export default TopSearches;