const express  = require('express');
const path     = require('path');
const mongoose = require('mongoose');
const app      = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bit3208_week3')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB error:', err));

// GET /welcome
app.get('/welcome', (req, res) => {
    const name   = req.query.name || 'Student';
    const course = 'BIT3208';
    res.json({ success: true, message: 'Welcome to ' + course + ', ' + name + '!' });
});

// POST /submit
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.json({ success: false, message: 'All fields are required.' });
    }
    res.json({ success: true, message: 'Hello ' + name + '! Your email (' + email + ') has been received.' });
});

// GET /db-status -- Task 4: database connection check
app.get('/db-status', (req, res) => {
    const state = mongoose.connection.readyState;
    if (state === 1) {
        res.json({ success: true, message: 'Connected Successfully to MongoDB', db: 'bit3208_week3' });
    } else {
        res.json({ success: false, message: 'Database not connected', state: state });
    }
});

app.listen(3002, () => {
    console.log('Week 3 server running at http://localhost:3002');
});
