import React from "react";
import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../api/axios";
import { roles } from "../../../context/roles";
import Navbar from "../Navbar/Navbar";

import "./AdminStatus.scss";

const AdminStatus = () => {
  const [templates, setTemplates] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [template, setTemplate] = useState({});

  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState(
    [...Array(Number(number))].map((ele) => {
      return "Student";
    })
  );

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        ID: template?._id,
        Name: name,
        Approval_Flow: participants,
      })
    );
    try {
      const response = await axiosInstance.put(
        "/admin/edit",
        JSON.stringify({
          ID: template?._id,
          Name: name,
          Approval_Flow: participants,
        }),
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            withCredentials: true,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.post(
        "/admin/delete",
        JSON.stringify({ ID: id }),
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      console.log(response);
      setTemplates(
        templates.filter((ele, index, array) => {
          return ele._id !== id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

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
    <>
      <Navbar></Navbar>
      {modal && (
        <div className="adminModal">
          <div className="adminModalContainer">
            <h1 className="adminModalContainerHeading">{template?.Name}</h1>
            <p className="description">Edit the template</p>
            <form action="" className="adminModalContainerForm">
              <label htmlFor="adminModalContainerName">Name of Template</label>
              <input
                type="text"
                name="adminModalContainerName"
                id="adminModalContainerName"
                placeholder="Enter Name!"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="adminModalContainerFormNumber">
                Number of Participants
              </label>
              <input
                type="number"
                name="adminModalContainerFormNumber"
                id="adminModalContainerFormNumber"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
              {[...new Array(Number(number))].map((ele, index) => {
                return (
                  <>
                    <label htmlFor={`adminModalContainerFormSeletor${index}`}>
                      Participant {index + 1}
                    </label>
                    <select
                      key={`adminModalContainerFormSelector${index}`}
                      name={`adminModalContainerFormSelector${index}`}
                      id={`adminModalContainerFormSelector${index}`}
                      onChange={(e) => {
                        const participantsNew = [...participants];
                        participantsNew[index] = e.target.value;
                        setParticipants(participantsNew);
                      }}
                    >
                      {roles.map((item) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </>
                );
              })}
              <button type="submit" onClick={handleEdit}>
                Update!
              </button>
            </form>
          </div>
        </div>
      )}
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
                        <div className="buttons">
                          <button
                            className="adminStatusContainerView edit"
                            onClick={() => {
                              setModal(true);
                              setTemplate(item);
                              setNumber(item?.Approval_Flow.length);
                              setName(item?.Name);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="adminStatusContainerView delete"
                            onClick={() => {
                              handleDelete(item?._id);
                            }}
                          >
                            Delete
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
    </>
  );
};

export default AdminStatus;
