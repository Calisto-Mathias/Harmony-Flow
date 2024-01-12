import React, { useContext, useState } from "react";

import "./Login.scss";

import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import { roles } from "../../context/roles";

import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(JSON.stringify({ ID: roll, Password: password, Role: role }));
      const response = await axiosInstance.post(
        "/auth/login",
        JSON.stringify({ ID: roll, Password: password, Role: role }),
        { headers: { "Content-Type": "application/json" } }
      );

      setErrMsg("");
      setPassword("");
      setRoll("");

      console.log(response?.data);
      setAuth({
        accessToken: response?.data?.accessToken,
        Role: response?.data?.Role,
      });

      navigate(
        response?.data?.Role === "Student"
          ? "/student/dashboard"
          : response?.data?.Role === "Admin"
          ? "/admin/dashboard"
          : response?.data?.Role
          ? "/employee/dashboard"
          : "/unauthorized",
        { replace: true }
      );

      // setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrMsg(
        "Invalid Crendentials. If you are sure your credentials, the server might be having issues at the moment!"
      );
      setSuccess(false);
    }
  };

  return (
    <div className="login">
      <div className="left">
        <h1 className="leftHeading">
          Welcome<br></br>Back!
        </h1>
      </div>
      <div className="right">
        <div className="rightContainer">
          <h1 className="rightContainerHeading">Login</h1>
          <p>Welcome Back! Please login to your account.</p>
          <form action="" className="rightContainerForm">
            <label htmlFor="usernameInputField">Roll Number</label>
            <input
              type="text"
              name="username"
              id="username"
              className="textField"
              autoComplete="off"
              value={roll}
              onChange={(e) => {
                setRoll(e.target.value);
              }}
            />
            <label htmlFor="passwordInputField">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="textField"
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="roleSelector">Select Role</label>
            <select
              name="selector"
              id="roleSelector"
              className="rightContainerFormSelect"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              {roles.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
              <option value="Admin">Admin</option>
            </select>
            <button className="rightContainerFormSubmit" onClick={handleSubmit}>
              Login
            </button>
          </form>
          <p>
            New User?&nbsp;
            <span className="rightContainerRegisterLink">Signup</span>
          </p>
          {errMsg ? (
            <p style={{ textAlign: "center", color: "red" }}>{errMsg}</p>
          ) : (
            <p></p>
          )}
          {success ? (
            <p style={{ textAlign: "center", color: "green" }}>
              Successfully Logged In!
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
