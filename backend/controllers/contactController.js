const Contact = require('../models/Contact');

// @desc Get all contacts for logged-in user
// @route GET /api/contacts
// @access Private
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add new contact
// @route POST /api/contacts
// @access Private
exports.addContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      user: req.user.id,
      name,
      email,
      phone,
      type,
    });

    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access Private
exports.updateContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = { name, email, phone, type };

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    // Ensure user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access Private
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    // Ensure user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
