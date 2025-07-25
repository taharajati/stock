const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Root auth route handler
router.get('/', (req, res) => {
  const authInfo = {
    status: 'Auth service is running',
    isAuthenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? {
      id: req.user._id,
      email: req.user.email,
      displayName: req.user.displayName
    } : null,
    availableEndpoints: {
      email: {
        login: 'POST /auth/login',
        setupPassword: 'POST /auth/setup-password'
      },
      session: {
        status: 'GET /auth/status',
        currentUser: 'GET /auth/me',
        logout: 'POST /auth/logout'
      }
    }
  };
  
  res.json(authInfo);
});

// Email/password login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'ایمیل و رمز عبور الزامی هستند' });
    }

    // Find user by email and explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'ایمیل یا رمز عبور اشتباه است' });
    }

    // Check if user has set a password
    if (!user.hasSetPassword) {
      console.log('User has not set password:', email);
      return res.status(401).json({ error: 'لطفا ابتدا با گوگل وارد شوید و رمز عبور خود را تنظیم کنید' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: 'ایمیل یا رمز عبور اشتباه است' });
    }

    // Log in user
    req.login(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'خطا در ورود به سیستم' });
      }
      
      // Remove password from response
      const userResponse = {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        photo: user.photo
      };

      res.json({ 
        message: 'ورود موفقیت‌آمیز',
        user: userResponse
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'خطا در ورود به سیستم',
      details: error.message 
    });
  }
});

// Setup password after Google login
router.post('/setup-password', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'لطفا ابتدا وارد شوید' });
  }

  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ error: 'رمز عبور الزامی است' });
  }

  try {
    const user = await User.findById(req.user.id);
    
    // Validate password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'رمز عبور باید حداقل 8 کاراکتر باشد و شامل موارد زیر باشد:',
        requirements: [
          'حداقل یک حرف بزرگ',
          'حداقل یک حرف کوچک',
          'حداقل یک عدد',
          'حداقل یک کاراکتر خاص (@$!%*?&)'
        ]
      });
    }

    user.password = password;
    user.hasSetPassword = true;
    await user.save();
    
    res.json({ message: 'رمز عبور با موفقیت تنظیم شد' });
  } catch (error) {
    console.error('Error setting password:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'خطا در تنظیم رمز عبور' });
    }
});

// Logout route
router.post('/logout', async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token');
    
    // Send success response
    res.json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error logging out' });
    }
});

// Get current logged in user
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(401).json({ error: 'کاربر وارد نشده است' });
});

// Check authentication status
router.get('/status', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? req.user : null
  });
});

// Error handler middleware for auth routes
router.use((err, req, res, next) => {
  console.error('Auth route error:', err);
  
  // Handle specific error types
  if (err.name === 'AuthenticationError') {
    return res.status(401).json({
      error: 'Authentication failed',
      message: err.message
    });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      message: err.message
    });
  }
  
  // Default error response
  res.status(500).json({
    error: 'Internal server error',
    message: isProduction ? 'An error occurred' : err.message
  });
});

module.exports = router; 