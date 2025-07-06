const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: false,
    },

    designation: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      enum: ['Manager', 'User'],
      default: 'User',
    },

    location: {
      type: String,
      required: false,
    },

    photo: {
      type: String, // Will store a URL or file path
      required: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
