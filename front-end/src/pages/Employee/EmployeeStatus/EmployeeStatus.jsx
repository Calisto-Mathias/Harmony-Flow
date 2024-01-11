import React from "react";

import "./EmployeeStatus.scss";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../api/axios";

const EmployeeStatus = () => {
  const [flows, setFlows] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axiosInstance.get("/employee/flows", {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            withCredentials: true,
            "Content-Type": "application/json",
          },
        });

        setFlows(response?.data?.flows);
        setLoaded(true);
      };
      getData();
    } catch (error) {
      console.error(error);
    }
  }, [auth]);

  return (
    <div className="employeeStatus">
      <div className="employeeStatusContainer">
        <table className="employeeStatusContainerTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Request</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loaded &&
              flows?.map((item) => {
                return (
                  <tr>
                    <td>{item?._id}</td>
                    <td>{item?.Request}</td>
                    <td>
                      <input
                        type="text"
                        id="employeeStatusContainerTableComments"
                        placeholder="Enter Comment... (if any)"
                      />
                    </td>
                    <td>
                      <div className="employeeStatusContainerButtons">
                        <button className="approve">Approve</button>
                        <button className="reject">Reject</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeStatus;
