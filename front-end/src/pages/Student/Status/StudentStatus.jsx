import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../api/axios";
import Navbar from "../Navbar/Navbar";

import "./StudentStatus.scss";

const StudentStatus = () => {
  const [flows, setFlows] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [flow, setFlow] = useState({});

  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axiosInstance.get("/student/flows", {
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
  }, [auth?.accessToken]);

  return (
    <>
      <Navbar></Navbar>
      {modal && (
        <div className="studentModal">
          <div className="studentModalContainer">
            <h1>{flow?.Request}</h1>
            <p>Current Status: {flow?.Status}</p>
            <p>Current Approver: {flow?.Current}</p>
            <p>Flow Raised at: {flow?.createdAt}</p>
            <p>Last Updated At: {flow?.updatedAt}</p>
            <p>Archived: {flow?.Archived ? "Yes" : "No"}</p>
            <h2>Participants:</h2>
            <div className="studentModalContainerParticipants">
              {flow?.Participants.map((item) => {
                return (
                  <div className="participant">
                    <p>ID: {item[0]}</p>
                    <p>Approval Status: {item[1]}</p>
                    <p>Comments: {item[2]}</p>
                    <p>Role: {item[3]}</p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
                        <button
                          className="studentStatusContainerView"
                          onClick={() => {
                            setModal(true);
                            setFlow(item);
                          }}
                        >
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
    </>
  );
};

export default StudentStatus;
