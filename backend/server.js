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

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://taharjtdeveloper:XQIC5sCzpzQW91UQ@betaoption.xwpxpkd.mongodb.net/?retryWrites=true&w=majority&appName=betaoption', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction 
  ? ['https://easyvest.ir', 'https://www.easyvest.ir']
  : ['http://localhost:5001', 'https://easyvest.ir', 'https://www.easyvest.ir'];

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With']
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction, // Only use secure cookies in production
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax', // Use 'none' in production, 'lax' in development
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    domain: isProduction ? '.easyvest.ir' : undefined // Only set domain in production
  },
  proxy: isProduction // Only trust proxy in production
}));

// Debug middleware
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    cookies: req.cookies,
    session: req.session,
    protocol: req.protocol,
    secure: req.secure,
    hostname: req.hostname,
    ip: req.ip
  });
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Trust proxy
app.set('trust proxy', 1);

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      throw new Error('Database not connected');
    }
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      status: 'success',
      message: 'Database connection is working',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start server only after database connection
const startServer = async () => {
  try {
    await connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 