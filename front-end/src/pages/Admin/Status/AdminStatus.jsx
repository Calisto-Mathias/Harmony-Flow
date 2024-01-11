import React from "react";
import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../api/axios";

import "./AdminStatus.scss";

const AdminStatus = () => {
  const [templates, setTemplates] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axiosInstance.get("/admin/templates", {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            withCredentials: true,
            "Content-Type": "application/json",
          },
        });

        setTemplates(response?.data?.templates);
        setLoaded(true);
      };
      getData();
    } catch (error) {
      console.error(error);
    }
  }, [auth?.accessToken]);

  return (
    <div className="adminStatus">
      <div className="adminStatusContainer">
        <table className="adminStatusContainerTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Approval Flow</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loaded &&
              templates?.map((item) => {
                return (
                  <tr>
                    <td>{item?._id}</td>
                    <td>{item?.Name}</td>
                    <td>{item?.Approval_Flow.join(" -> ")}</td>
                    <td>
                      <button className="adminStatusContainerView delete">
                        Delete
                      </button>
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

export default AdminStatus;
