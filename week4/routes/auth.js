const express = require('express');
const router = express.Router();
const users = require('../data/users');

// Register
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.json({ success: false, message: 'All fields are required' });

  const exists = users.find(u => u.username === username);
  if (exists)
    return res.json({ success: false, message: 'Username already taken' });

  users.push({ username, email, password });
  res.json({ success: true, message: `Account created for ${username}` });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user)
    return res.json({ success: false, message: 'Invalid username or password' });

  req.session.user = username;
  res.json({ success: true, message: `Welcome back, ${username}!` });
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
