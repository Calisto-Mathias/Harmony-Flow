import React from "react";

import "./studentDashboard.scss";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import axiosInstance from "../../../api/axios";

const StudentDashboard = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.patch(
        "/auth/logout",
        JSON.stringify({}),
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setAuth({});
    navigate("/login");
  };

  return (
    <div className="studentDashboard">
      <div className="studentDashboardContainer">
        <div className="card">
          <img
            src="https://static.thenounproject.com/png/202590-200.png"
            alt=""
          />
          <h2 className="heading">Raise a Flow</h2>
          <p>
            Raise a Service Request to get your task completed as soon as
            possible. Do it now on our digital platform IRIS!
          </p>
          <Link
            to={"/student/flow"}
            className="studentDashboardContainerLinker"
          >
            <div className="button">Raise Now!</div>
          </Link>
        </div>
        <div className="card">
          <img
            src="https://thumbs.dreamstime.com/b/hourglass-icon-isolated-white-background-simple-vector-logo-hourglass-icon-isolated-white-background-181302758.jpg"
            alt=""
          />
          <h2 className="heading">Status Enquiry</h2>
          <p>
            Check the status of your Service Requests to get your task completed
            as soon as possible. Do it now on our digital platform IRIS!
          </p>
          <Link
            to={"/student/status"}
            className="studentDashboardContainerLinker"
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
  );
};

export default StudentDashboard;
