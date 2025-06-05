const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://taharjtdeveloper:XQIC5sCzpzQW91UQ@betaoption.xwpxpkd.mongodb.net/?retryWrites=true&w=majority&appName=betaoption', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('Connected to MongoDB Atlas');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = isProduction 
  ? ['https://easyvest.ir', 'https://www.easyvest.ir']
  : ['http://localhost:5001', 'https://easyvest.ir', 'https://www.easyvest.ir'];

app.use(cors({
  origin: function(origin, callback) {
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

// Session configuration with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://taharjtdeveloper:XQIC5sCzpzQW91UQ@betaoption.xwpxpkd.mongodb.net/?retryWrites=true&w=majority&appName=betaoption',
    ttl: 24 * 60 * 60, // 1 day
    autoRemove: 'native',
    touchAfter: 24 * 3600 // 24 hours
  }),
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  proxy: isProduction
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: isProduction ? 'An error occurred' : err.message
  });
});

// Start server with retry logic
const startServer = async (retries = 3) => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      throw new Error('Failed to connect to MongoDB');
    }

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Retrying...`);
        if (retries > 0) {
          setTimeout(() => {
            server.close();
            startServer(retries - 1);
          }, 1000);
        } else {
          console.error('Failed to start server after multiple retries');
          process.exit(1);
        }
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      setTimeout(() => startServer(retries - 1), 1000);
    } else {
      console.error('Failed to start server after multiple retries');
      process.exit(1);
    }
  }
};

startServer(); 