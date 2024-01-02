import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Department: { type: String, required: true },
    Staff_ID: { type: String, required: true, unique: true },
    Role: { type: String, required: true },
    Password: { type: String, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
