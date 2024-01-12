import React from "react";

import "./EmployeeStatus.scss";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../api/axios";
import { useAuth } from "../../../hooks/useAuth";

const EmployeeStatus = () => {
  const [flows, setFlows] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const [comments, setComments] = useState([]);

  const approve = async (index, id) => {
    try {
      const response = await axiosInstance.patch(
        "/employee/approve",
        JSON.stringify({ ID: id, Comment: comments[index] }),
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const flowsCopy = flows.filter((ele, i, array) => {
        return index !== i;
      });
      setFlows(flowsCopy);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const reject = async (index, id) => {
    try {
      const response = await axiosInstance.patch(
        "/employee/reject",
        JSON.stringify({ ID: id, Comment: comments[index] }),
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const flowsCopy = flows.filter((ele, i, array) => {
        return index !== i;
      });
      setFlows(flowsCopy);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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
              flows?.map((item, index) => {
                return (
                  <tr>
                    <td>{item?._id}</td>
                    <td>{item?.Request}</td>
                    <td>
                      <input
                        type="text"
                        id={`employeeStatusContainerTableComments${index}`}
                        placeholder="Enter Comment... (if any)"
                        value={comments[index]}
                        onChange={(e) => {
                          const copy = [...comments];
                          copy[index] = e.target.value;
                          setComments(copy);
                        }}
                      />
                    </td>
                    <td>
                      <div className="employeeStatusContainerButtons">
                        <button
                          className="approve"
                          onClick={() => {
                            approve(index, item?._id);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className="reject"
                          onClick={() => {
                            reject(index, item?._id);
                          }}
                        >
                          Reject
                        </button>
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
