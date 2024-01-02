import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Roll_Number: {
      type: String,
      required: true,
      unique: true,
    },
    Department: {
      type: String,
      required: true,
    },
    Program_Type: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Flows: {
      type: Array,
      default: [],
    },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
