const express = require('express');
const router = express.Router();
const User = require('../models/User');
const requireLogin = require('../middleware/auth');

// GET all users
router.get('/', requireLogin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ success: true, users });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// GET single user
router.get('/:id', requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// UPDATE user
router.put('/:id', requireLogin, async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { returnDocument: 'after' }
    );
    res.json({ success: true, message: 'User updated', user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// DELETE user
router.delete('/:id', requireLogin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
