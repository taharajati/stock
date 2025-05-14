const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google OAuth login process
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/',
    successRedirect: process.env.CLIENT_URL || 'http://localhost:3000/dashboard',
    failureMessage: true
  })
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
  });
});

// Get current logged in user
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    // Return user info without access token
    const { accessToken, ...userInfo } = req.user;
    return res.status(200).json(userInfo);
  }
  return res.status(401).json({ error: 'Not authenticated' });
});

// Check authentication status
router.get('/status', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? req.user : null
  });
});

module.exports = router; 