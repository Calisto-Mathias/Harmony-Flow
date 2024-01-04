import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";

export const verify = async (req, res, next) => {
  let accessToken = null;
  try {
    accessToken = req.headers["authorization"].split(" ")[1];
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Auth Token",
      description: "You have passed an Invalid Auth Token!",
    });
  }

  try {
    const { ID, Role } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    if (Role === "Student") {
      const student = await Student.findOne({ Roll_Number: ID });
      if (!student) {
        return res.status(400).json({
          message: "Invalid Credentials",
          description: "JSON Token Valid but User Not Found",
        });
      }
      req.body.student = student;
      req.body.authorisation = "Student";
      next();
    } else {
      const employee = await Employee.findOne({ Staff_ID: ID });
      if (!employee) {
        return res.status(400).json({
          message: "Invalid Credentials",
          description: "JSON Token Valid but User Not Found",
        });
      }
      req.body.employee = employee;
      req.body.authorisation = Role;
      next();
    }
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Credentials",
      description: "User Token is Invalid",
    });
  }
};

export const verifyStudent = (req, res, next) => {
  if (req.body.authorisation === "Student") {
    next();
  } else {
    res.status(403).json({
      message: "Authorisation Mismatch!",
      description: "You do not have authorisation for this end-point!",
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.body.authorisation === "Admin") {
    next();
  } else {
    res.status(403).json({
      message: "Authorisation Mismatch!",
      description: "You do not have authorisation for this end-point!",
    });
  }
};

export const verifyEmployeeNA = (req, res, next) => {
  // NA stands for Not Admin
  if (
    req.body.authorisation !== "Student" &&
    req.body.authorisation !== "Admin"
  ) {
    next();
  } else {
    res.status(403).json({
      message: "Authorisation Mismatch!",
      description: "You do not have authorisation for this end-point!",
    });
  }
};
