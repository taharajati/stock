const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Start Google OAuth login process
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/',
    failureMessage: true
  }),
  (req, res) => {
    // If user hasn't set a password, redirect to password setup page
    if (!req.user.hasSetPassword) {
      res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/setup-password`);
    } else {
      res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/dashboard`);
    }
  }
);

// Setup password after Google login
router.post('/setup-password', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { password } = req.body;
  
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  try {
    const user = await User.findById(req.user.id);
    user.password = password;
    user.hasSetPassword = true;
    await user.save();
    
    res.json({ message: 'Password set successfully' });
  } catch (error) {
    console.error('Error setting password:', error);
    res.status(500).json({ error: 'Error setting password' });
  }
});

// Email/password login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.hasSetPassword) {
      return res.status(401).json({ error: 'Please login with Google first to set up your password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Logged in successfully' });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error during login' });
  }
});

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
    return res.status(200).json(req.user);
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