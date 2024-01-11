import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../api/axios";

import "./StudentStatus.scss";

const StudentStatus = () => {
  const [flows, setFlows] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    try {
      const getData = async () => {
        const response = await axiosInstance.get("/student/flows", {
          headers: {
            Authorization: `Bearer ${"<auth token here>"}`,
            withCredentials: true,
            "Content-Type": "application/json",
          },
        });

        mounted && setFlows(response?.data?.flows);
        setLoaded(true);
      };
      getData();
    } catch (error) {
      console.error(error);
    }

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="studentStatus">
      <div className="studentStatusContainer">
        <table className="studentStatusContainerTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Request</th>
              <th>Status</th>
              <th>Current Step</th>
              <th>Archived</th>
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
                    <td>{item?.Status}</td>
                    <td>{item?.Current}</td>
                    <td>{item?.Archived ? "Yes" : "No"}</td>
                    <td>
                      <button className="studentStatusContainerView">
                        View
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

export default StudentStatus;
