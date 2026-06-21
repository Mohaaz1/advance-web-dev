import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

const router = express.Router();

/* TEST */
router.get("/test", (req, res) => {
  res.json({
    message: "Employee Auth API Working"
  });
});

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const {
      employeeId,
      fullName,
      email,
      department,
      position,
      password
    } = req.body;

    const existingEmployee =
      await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const employee = new Employee({
      employeeId,
      fullName,
      email,
      department,
      position,
      password: hashedPassword
    });

    await employee.save();

    res.status(201).json({
      message: "Employee registered successfully"
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

    const employee =
      await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        employee.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: employee._id,
        email: employee.email,
        employeeId: employee.employeeId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;
/* EMPLOYEE DASHBOARD */
router.get(
  "/dashboard",
  authMiddleware,
  async (req, res) => {
    res.json({
      message: "Welcome Employee",
      employee: req.employee
    });
  }
);
/* EMPLOYEE PROFILE */
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const employee =
        await Employee.findById(
          req.employee.id
        ).select("-password");

      res.json(employee);
    } catch (err) {
      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

