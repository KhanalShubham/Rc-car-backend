const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [2, 'Username must be at least 2 characters long'],
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [120, 'Age cannot exceed 120']
  },
  sex: {
    type: String,
    required: [true, 'Sex is required'],
    enum: {
      values: ['male', 'female'],
      message: 'Sex must be either male or female'
    },
    lowercase: true
  },
  feedback: {
    type: String,
    trim: true,
    maxlength: [500, 'Feedback cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 5
  },
  drivingDuration: {
    type: Number, // Duration in seconds
    min: [0, 'Driving duration cannot be negative'],
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ username: 1 });
userSchema.index({ age: 1 });
userSchema.index({ sex: 1 });

module.exports = mongoose.model('User', userSchema); 