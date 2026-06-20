const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

/*

* CREATE STUDENT
* POST /api/students
  */
  router.post("/", async (req, res) => {
  try {
  const student = new Student({
  fullname: req.body.fullname,
  email: req.body.email,
  course: req.body.course,
  });

  const savedStudent = await student.save();

  res.status(201).json(savedStudent);
  } catch (error) {
  res.status(500).json({
  message: error.message,
  });
  }
  });

/*

* GET ALL STUDENTS
* GET /api/students
  */
  router.get("/", async (req, res) => {
  try {
  const students = await Student.find();

  res.status(200).json(students);
  } catch (error) {
  res.status(500).json({
  message: error.message,
  });
  }
  });

/*

* GET ONE STUDENT
* GET /api/students/:id
  */
  router.get("/:id", async (req, res) => {
  try {
  const student = await Student.findById(req.params.id);

  if (!student) {
  return res.status(404).json({
  message: "Student not found",
  });
  }

  res.status(200).json(student);
  } catch (error) {
  res.status(500).json({
  message: error.message,
  });
  }
  });

/*

* UPDATE STUDENT
* PUT /api/students/:id
  */
  router.put("/:id", async (req, res) => {
  try {
  const updatedStudent = await Student.findByIdAndUpdate(
  req.params.id,
  {
  fullname: req.body.fullname,
  email: req.body.email,
  course: req.body.course,
  },
  {
  new: true,
  runValidators: true,
  }
  );

  if (!updatedStudent) {
  return res.status(404).json({
  message: "Student not found",
  });
  }

  res.status(200).json(updatedStudent);
  } catch (error) {
  res.status(500).json({
  message: error.message,
  });
  }
  });

/*

* DELETE STUDENT
* DELETE /api/students/:id
  */
  router.delete("/:id", async (req, res) => {
  try {
  const deletedStudent = await Student.findByIdAndDelete(
  req.params.id
  );

  if (!deletedStudent) {
  return res.status(404).json({
  message: "Student not found",
  });
  }

  res.status(200).json({
  message: "Student deleted successfully",
  });
  } catch (error) {
  res.status(500).json({
  message: error.message,
  });
  }
  });

module.exports = router;
