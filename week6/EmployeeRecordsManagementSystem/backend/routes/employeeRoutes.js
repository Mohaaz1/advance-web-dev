import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

/* HEALTH CHECK */
router.get("/test", (req, res) => {
  return res.json({ status: "API working" });
});

/* GET ALL EMPLOYEES (SAFE) */
router.get("/", async (req, res) => {
  console.log("GET /employees hit");

  try {
    const employees = await Employee.find({}).lean();

    return res.json(employees);
  } catch (err) {
    console.error("GET ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

/* CREATE EMPLOYEE */
router.post("/", async (req, res) => {
  try {
    console.log("POST DATA:", req.body);

    const employee = await Employee.create({
      employeeId: req.body.employeeId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      department: req.body.department,
      position: req.body.position,
      salary: Number(req.body.salary)
    });

    return res.status(201).json(employee);
  } catch (err) {
    console.error("POST ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;

/* UPDATE EMPLOYEE */
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        department: req.body.department,
        position: req.body.position,
        salary: Number(req.body.salary)
      },
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE EMPLOYEE */
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message: "Employee deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
