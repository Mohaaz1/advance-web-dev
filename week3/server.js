const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* =========================
   TASK 1 – Basic route
========================= */
app.get('/task1', (req, res) => {
    res.send("<h1>Task 1: Server is working</h1>");
});

/* =========================
   TASK 2 – Another route example
========================= */
app.get('/task2', (req, res) => {
    res.send("<h1>Task 2: Express routing works</h1>");
});

/* =========================
   TASK 3 – Form processor (MEVN style)
========================= */
app.post('/submit', (req, res) => {
    const name = req.body.name;
    res.send(`Welcome, ${name}`);
});

/* =========================
   HOME PAGE
========================= */
app.get('/', (req, res) => {
    res.send("<h1>BIT3208 Week 3 Project Running</h1>");
});

/* =========================
   START SERVER (ONE PORT ONLY)
========================= */
app.listen(3002, () => {
    console.log("All tasks running on http://localhost:3002");
});
