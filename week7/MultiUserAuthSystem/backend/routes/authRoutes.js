import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* TEST */
router.get("/test", (req, res) => {
  res.json({
    message: "Multi User Auth API Working"
  });
});

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      role: user.role,
      token
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

/* STUDENT DASHBOARD */
router.get(
  "/student/dashboard",
  authMiddleware,
  roleMiddleware("student"),
  (req, res) => {
    res.json({
      message: "Welcome Student",
      user: req.user
    });
  }
);

/* LECTURER DASHBOARD */
router.get(
  "/lecturer/dashboard",
  authMiddleware,
  roleMiddleware("lecturer"),
  (req, res) => {
    res.json({
      message: "Welcome Lecturer",
      user: req.user
    });
  }
);

/* ADMIN DASHBOARD */
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Administrator",
      user: req.user
    });
  }
);

export default router;
