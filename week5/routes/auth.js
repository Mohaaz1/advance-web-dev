const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ success: false, message: 'All fields are required' });

    const exists = await User.findOne({ username });
    if (exists)
      return res.json({ success: false, message: 'Username already taken' });

    const user = new User({ username, email, password });
    await user.save();
    res.json({ success: true, message: `Account created for ${username}` });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user)
      return res.json({ success: false, message: 'Invalid username or password' });

    req.session.user = username;
    res.json({ success: true, message: `Welcome back, ${username}!` });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Session check
router.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, username: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
