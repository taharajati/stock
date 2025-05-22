const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

// Import passport config
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5003;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stock-analysis')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://taha.betaoption.ir', 'http://localhost:5001', 'http://37.32.5.160:5001'],
  credentials: true
}));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    sameSite: 'lax',
    secure: false // Set to true in production with HTTPS
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}); 