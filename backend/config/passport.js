const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://[::1]:5003/auth/google/callback',
    proxy: true,
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google auth callback received:', {
        profileId: profile.id,
        email: profile.emails?.[0]?.value,
        displayName: profile.displayName
      });

      // Check if user already exists
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // Check if user exists with same email but different auth method
        user = await User.findOne({ email: profile.emails[0].value });
        
        if (user) {
          console.log('User found with email, updating with Google info');
          // Update existing user with Google ID
          user.googleId = profile.id;
          user.displayName = profile.displayName;
          user.firstName = profile.name?.givenName;
          user.lastName = profile.name?.familyName;
          user.photo = profile.photos?.[0]?.value;
          await user.save();
        } else {
          console.log('Creating new user with Google info');
          // Create new user
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            photo: profile.photos?.[0]?.value
          });
        }
      } else {
        console.log('Existing Google user found');
      }

      return done(null, user);
    } catch (error) {
      console.error('Error in Google strategy:', error);
      return done(error, null);
    }
  }
));

module.exports = passport; 