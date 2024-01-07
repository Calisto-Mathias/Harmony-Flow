import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";

export const register = async (req, res) => {
  try {
    const { name, email, id, department, program, password, role } = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    if (role === "Student") {
      const student = new Student({
        Name: name,
        Email: email,
        Roll_Number: id,
        Department: department,
        Program_Type: program,
        Password: hash,
      });
      const savedUser = await student.save();
      res.status(201).json(savedUser._doc);
    } else {
      const employee = new Employee({
        Name: name,
        Email: email,
        Department: department,
        Staff_ID: id,
        Role: role,
        Password: hash,
      });
      const savedEmployee = await employee.save();
      res.status(201).json(savedEmployee._doc);
    }
  } catch (error) {
    console.log(`${error}: There has been an error in registering the user!`);
    res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  const { ID, Password, Role } = req.body;

  if (Role === "Student") {
    console.log("Entered");
    const student = await Student.findOne({ Roll_Number: ID });
    if (!student) {
      return res.status(400).json({
        message: "Invalid Credentials!",
        description:
          "The DB does not contain such a user. You can try registering first using the /auth/register end-point!",
      });
    }

    const state = await bcrypt.compare(Password, student.Password);

    if (state) {
      //Password Authentication Has been Completed
      const accessToken = jwt.sign(
        {
          ID: student.Roll_Number,
          Role: "Student",
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        {
          ID: student.Roll_Number,
          Role: "Student",
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      student.refreshToken = refreshToken;
      await student.save();

      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: "Invalid Credentials!" });
    }
  } else {
    const employee = await Employee.findOne({ Staff_ID: ID });

    if (!employee) {
      return res.status(400).json({
        message: "Invalid Credentials!",
        description:
          "The DB does not contain such a user. You can try registering first using the /auth/register end-point!",
      });
    }
    const verified = await bcrypt.compare(Password, employee.Password);

    if (verified) {
      // Employee has been verified!
      const accessToken = jwt.sign(
        {
          ID: employee.Staff_ID,
          Role: employee.Role,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "10m" }
      );

      const refreshToken = jwt.sign(
        {
          ID: employee.Staff_ID,
          Role: employee.Role,
        },
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: "1d",
        }
      );

      employee.refreshToken = refreshToken;
      await employee.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accessToken });
    } else {
      // Invalid User Credentials Have Been Entered
      res.status(401).json({ message: "Invalid User Credentials!" });
    }
  }
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.jwt;

  try {
    const { ID, Role } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    if (Role === "Student") {
      const student = await Student.findOne({ Roll_Number: ID });
      // We need to check whether the server still approves of this student's Refresh Token!

      if (refreshToken === student.refreshToken) {
        // Generate new access token and send it back to the client.
        const accessToken = jwt.sign(
          { ID, Role },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: "10m" }
        );
        res.status(200).json({ accessToken });
      } else {
        // Server has revoked the current user's session.
        res.status(400).json({
          message: "Invalid Credentials!",
          description:
            "Refresh Token has been invalidated. Login again to have a new refresh Token issued.",
        });
      }
    }
  } catch (error) {
    res.status(401).json({
      message: "Invalid Credentials!",
      description:
        "The token is invalid. Please login again to be issued a new refresh token! (/auth/login route may be used for this purpose)",
    });
  }
};

export const logout = async (req, res) => {
  let accessToken = null;
  try {
    accessToken = req.headers["authorization"].split(" ")[1];
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Auth Token!",
      description: "Invalid Bearer Token!",
    });
  }

  if (!accessToken) {
    return res.status(400).json({
      message: "Invalid Auth Token!",
      description: "Invalid Bearer Token!",
    });
  }

  try {
    const { ID, Role } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    if (Role === "Student") {
      const student = await Student.findOne({ Roll_Number: ID });
      if (!student) {
        return res.status(400).json({
          message: "Invalid User!",
          description: "This Student does not exist in the DB!",
        });
      }

      if (!student.refreshToken) {
        return res.status(400).json({
          message: "Invalid User!",
          description: "This Student does not exist in the DB!",
        });
      }

      delete student.refreshToken;
      await student.save();

      return res.status(200).json({
        message: "Successfully Logged Out!",
        description: "Return to the login page to login once again!",
      });
    } else {
      const employee = await Employee.findOne({ Staff_ID: ID });
      if (!employee) {
        return res.status(400).json({
          message: "Invalid User!",
          description: "This Student does not exist in the DB!",
        });
      }

      if (!employee.refreshToken) {
        return res.status(400).json({
          message: "Invalid User!",
          description: "This Student does not exist in the DB!",
        });
      }

      employee.refreshToken = "Logged_Out";
      await employee.save();

      return res.status(200).json({
        message: "Successfully Logged Out!",
        description: "Return to the login page to login once again!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Invalid User Token",
      description: "User may not be logged in!",
    });
  }
};
