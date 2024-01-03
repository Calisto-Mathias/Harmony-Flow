import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";

export const verify = async (req, res, next) => {
  const accessToken = req.headers["authorization"].split(" ")[1];

  try {
    const { ID, Role } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    console.log("verified");
    if (Role === "Student") {
      const student = await Student.findOne({ Roll_Number: ID });
      if (!student) {
        res.status(400).json({
          message: "Invalid Credentials",
          description: "JSON Token Valid but User Not Found",
        });
      } else {
        req.body.student = student;
        req.body.authorisation = "Student";
        next();
      }
    } else {
      const employee = await Employee.findOne({ Staff_ID: ID });
      if (!employee) {
        res.status(400).json({
          message: "Invalid Credentials",
          description: "JSON Token Valid but User Not Found",
        });
      } else {
        req.body.employee = employee;
        req.body.authorisation = Role;
        next();
      }
    }
  } catch (error) {
    res.status(401).json({
      message: "Invalid Credentials!",
      description:
        "Token is invalid. Use the /refresh route in order to refresh your access Token",
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
