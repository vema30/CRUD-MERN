const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // reference to the user
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['personal', 'professional'], // only these values allowed
    default: 'personal',
  },
}, {
  timestamps: true, // adds createdAt & updatedAt
});

module.exports = mongoose.model('Contact', ContactSchema);
