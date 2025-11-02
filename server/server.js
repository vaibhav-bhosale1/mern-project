// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');

// --- DB & Passport Config ---
require('./config/database').connectDB();
require('./config/passport')(passport);

const app = express();

// --- Middleware ---
app.use(cors({
  origin: 'http://localhost:3000', // Allow React app
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"], 
      "connect-src": [
        "'self'", 
        "http://localhost:3000", 
        "https://api.unsplash.com" 
      ],
      "img-src": ["'self'", "data:", "images.unsplash.com"], 
      "script-src": ["'self'"], 
      "style-src": ["'self'", "'unsafe-inline'"], 
    },
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a_very_strong_secret_key', 
    resave: false,
    saveUninitialized: false, 
  })
);
app.use(passport.initialize());
app.use(passport.session()); 

// --- Routes ---
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

// --- FIX 1: ADD THIS ROOT ROUTE ---
// This will fix the "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Server is running. You should be on localhost:3000.');
});


// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));