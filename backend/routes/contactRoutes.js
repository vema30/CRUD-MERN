const express = require('express');
const router = express.Router();
const {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const { protect } = require('../authMiddleware');

// @route   GET /api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', protect, getContacts);

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', protect, addContact);

// @route   PUT /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', protect, updateContact);

// @route   DELETE /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', protect, deleteContact);

module.exports = router;
