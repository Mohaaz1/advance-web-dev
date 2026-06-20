import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
