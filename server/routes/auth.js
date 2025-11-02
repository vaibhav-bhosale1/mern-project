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
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc   Google auth callback
// @route  GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login', // redirect if login fails
    successRedirect: '/',      // redirect after successful login
  })
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
    failureRedirect: '/login',
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
    failureRedirect: '/login',
    successRedirect: '/',
  })
);

// ==========================
// 🔹 Logout
// ==========================

// @desc   Logout user
// @route  GET /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login'); // Redirect to login after logout
  });
});

// ==========================
// 🔹 Get Current User
// ==========================

// @desc   Get current user info (optional route)
// @route  GET /auth/user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
