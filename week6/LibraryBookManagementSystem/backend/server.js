const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Library Management API Running");
});

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/library_management")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
