import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/employeesDB")
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
  });
