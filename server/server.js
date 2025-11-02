// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

// --- DB & Passport Config ---
// (We will create these files next)
require('./config/database').connectDB();
require('./config/passport')(passport);

const app = express();

// --- Middleware ---
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: 'secret', // Change this to a real secret
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
// (We will create these files next)
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));