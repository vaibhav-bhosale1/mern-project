// server/routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// ==========================
// 🔹 Google Authentication
// ==========================

// @desc   Auth with Google
// @route  GET /auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// @desc   Google auth callback
// @route  GET /auth/google/callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  // --- FIX 2: CHECK THIS LINE ---
  // The failureRedirect MUST point to your frontend (3000), not backend (5000)
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }), 
  (req, res) => {
    // Successful auth redirects to the frontend dashboard
    res.redirect('http://localhost:3000/dashboard'); 
  }
);

// ==========================
// 🔹 Facebook Authentication
// ==========================

// @desc   Auth with Facebook
// @route  GET /auth/facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

// @desc   Facebook auth callback
// @route  GET /auth/facebook/callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'ttp://localhost:3000/login',
    successRedirect: '/',
  })
);

// ==========================
// 🔹 GitHub Authentication
// ==========================

// @desc   Auth with GitHub
// @route  GET /auth/github
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @desc   GitHub auth callback
// @route  GET /auth/github/callback
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: 'ttp://localhost:3000',
    successRedirect: 'http://localhost:3000/dashboard',
  })
);

// ==========================
// 🔹 Logout
// ==========================


// ==========================
// 🔹 Get Current User
// ==========================
router.get('/current_user', (req, res) => {
  if (req.user) {
    // If user is authenticated, send user data
    res.send(req.user); 
  } else {
    // If not authenticated, send null
    res.send(null);
  }
});
// @desc   Get current user info (optional route)
// @route  GET /auth/user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// @desc   Logout user
// @route  GET /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:3000'); // Redirect to login after logout
  });
});


module.exports = router;
