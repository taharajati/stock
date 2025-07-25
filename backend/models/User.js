const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  displayName: String,
  firstName: String,
  lastName: String,
  password: {
    type: String,
    select: false, // Don't include password in queries by default
    validate: {
      validator: function(v) {
        // Password must be at least 8 characters
        // Must contain at least one uppercase letter
        // Must contain at least one lowercase letter
        // Must contain at least one number
        // Must contain at least one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
      },
      message: props => 'رمز عبور باید حداقل 8 کاراکتر باشد و شامل حروف بزرگ، حروف کوچک، اعداد و کاراکترهای خاص باشد'
    }
  },
  hasSetPassword: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.hasSetPassword = true; // Set hasSetPassword to true when password is set
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    if (!this.password) {
      console.log('No password set for user');
      return false;
    }
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User; 