const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bit3208')
  .then(() => console.log(' Connected to MongoDB'))
  .catch(err => console.log(' MongoDB error:', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'bit3208-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

// Routes
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

app.listen(3001, () => console.log('Week 5 running at http://localhost:3001'));
