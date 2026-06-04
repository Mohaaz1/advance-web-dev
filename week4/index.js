const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'bit3208-week4-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use('/api', authRoutes);
app.use('/api/contact', contactRoutes);

app.listen(3000, () => console.log('Week 4 running at http://localhost:3000'));
