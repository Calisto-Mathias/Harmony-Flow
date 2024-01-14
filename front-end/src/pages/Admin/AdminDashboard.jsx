import React from "react";

import "./AdminDashboard.scss";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axiosInstance from "../../api/axios";
import Navbar from "./Navbar/Navbar";

const AdminDashboard = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.patch(
        "/auth/logout",
        JSON.stringify({}),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.accessToken}`,
            withCredentials: true,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setAuth({});
    navigate("/login");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="adminDashboard">
        <div className="adminDashboardContainer">
          <div className="card">
            <img
              src="https://static.thenounproject.com/png/202590-200.png"
              alt=""
            />
            <h2 className="heading">Create Template</h2>
            <p>
              Raise a Template to get students to complete tasks as soon as
              possible. Do it now on our digital platform IRIS!
            </p>
            <Link
              to={"/admin/create"}
              className="adminDashboardContainerLinker"
            >
              <div className="button">Raise Now!</div>
            </Link>
          </div>
          <div className="card">
            <img
              src="https://thumbs.dreamstime.com/b/hourglass-icon-isolated-white-background-simple-vector-logo-hourglass-icon-isolated-white-background-181302758.jpg"
              alt=""
            />
            <h2 className="heading">Template Status</h2>
            <p>
              Check the status of your Templates to get your task completed as
              soon as possible. Do it now on our digital platform IRIS!
            </p>
            <Link
              to={"/admin/status"}
              className="adminDashboardContainerLinker"
            >
              <div className="button">Check Now!</div>
            </Link>
          </div>
          <div className="card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDsOQ0FAfcv45S6EX0garvuEQIpNljSqdM4w&usqp=CAU"
              alt=""
            />
            <h2 className="heading">Logout</h2>
            <p>
              Done with all your tasks? Logout for increased security. Always
              remember to log out of public computers and devices as well.
            </p>
            <div className="button" onClick={handleLogout}>
              Logout Now!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
