const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth');

router.post('/', requireLogin, (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.json({ success: false, message: 'All fields are required' });

  res.json({ success: true, message: `Thanks ${name}, message received!` });
});

module.exports = router;
