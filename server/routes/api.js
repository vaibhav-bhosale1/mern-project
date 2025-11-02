// server/routes/api.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Search = require('../models/Search');

// --- Auth Middleware ---
// This ensures a user is logged in before they can access an API route [cite: 6, 13]
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send({ error: 'User not authenticated' });
  }
};

// --- 1. Top Searches API [cite: 15] ---
// @route   GET /api/top-searches
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      { $group: { _id: '$term', count: { $sum: 1 } } }, // Group by term and count occurrences
      { $sort: { count: -1 } }, // Sort descending
      { $limit: 5 }, // Get top 5 [cite: 16]
    ]);
    const terms = topSearches.map(search => search._id);
    res.json(terms);
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

// --- 2. User's Search History API [cite: 30] ---
// @route   GET /api/history
router.get('/history', ensureAuth, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(20); // Get user's past searches [cite: 31]
    res.json(history);
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

// --- 3. Search Functionality API [cite: 19] ---
// @route   POST /api/search
router.post('/search', ensureAuth, async (req, res) => {
  const { term } = req.body;
  if (!term) {
    return res.status(400).send({ error: 'Search term is required' });
  }

  try {
    // 1. Store the search in MongoDB 
    const newSearch = new Search({
      userId: req.user.id,
      term: term,
    });
    await newSearch.save();

    // 2. Call Unsplash Search API [cite: 22]
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${term}&per_page=20`;
    const unsplashRes = await axios.get(unsplashUrl, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    res.json(unsplashRes.data); // Return image results to frontend
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error fetching from Unsplash' });
  }
});

module.exports = router;