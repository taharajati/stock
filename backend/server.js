const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import passport config
require('./config/passport');

const app = express();

// Debug middleware
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    path: req.path,
    query: req.query,
    headers: {
      host: req.headers.host,
      origin: req.headers.origin,
      referer: req.headers.referer
    }
  });
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.NODE_ENV === 'production' ? '.easyvest.ir' : undefined
  }
}));

// Trust proxy
app.set('trust proxy', 1);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://easyvest.ir' : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With', 'Accept', 'Origin']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/build');
  console.log('Serving static files from:', frontendBuildPath);
  
  // Serve static files
  app.use(express.static(frontendBuildPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res, next) => {
    // Skip API and auth routes
    if (req.path.startsWith('/api/') || req.path.startsWith('/auth/')) {
      return next();
    }
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: 'Something broke!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    path: req.path
  });
});

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Google Callback URL: ${process.env.GOOGLE_CALLBACK_URL}`);
  if (process.env.NODE_ENV === 'production') {
    console.log('Serving frontend from build directory');
  }
}); 