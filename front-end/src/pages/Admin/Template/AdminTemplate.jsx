import React from "react";
import { useState } from "react";
import { useContext } from "react";

import "./AdminTemplate.scss";

import axiosInstance from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";

const AdminTemplate = () => {
  const roles = ["Student", "Academic Office", "MIS Officer", "Professor"]; // can be modified to add more roles

  const [number, setNumber] = useState(1);
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState(
    [...Array(Number(number))].map((ele) => {
      return "Student";
    })
  );
  const { auth, setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify({ Name: name, Approval_Flow: participants }));
      const response = await axiosInstance.post(
        "/admin/create",
        JSON.stringify({ Name: name, Approval_Flow: participants }),
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            withCredentials: true,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="adminTemplate">
      <div className="adminTemplateContainer">
        <h1 className="adminTemplateContainerHeading">Create a Template!</h1>
        <p className="description">Create a list of roles:</p>
        <form action="" className="adminTemplateContainerForm">
          <label htmlFor="adminTemplateContainerName">Name of Template</label>
          <input
            type="text"
            name="adminTemplateContainerName"
            id="adminTemplateContainerName"
            placeholder="Enter Name!"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="adminTemplateContainerFormNumber">
            Number of Participants
          </label>
          <input
            type="number"
            name="adminTemplateContainerFormNumber"
            id="adminTemplateContainerFormNumber"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          {[...new Array(Number(number))].map((ele, index) => {
            return (
              <>
                <label htmlFor={`adminTemplateContainerFormSeletor${index}`}>
                  Participant {index + 1}
                </label>
                <select
                  key={`adminTemplateContainerFormSelector${index}`}
                  name={`adminTemplateContainerFormSelector${index}`}
                  id={`adminTemplateContainerFormSelector${index}`}
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
          <button type="submit" onClick={handleSubmit}>
            Create!
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminTemplate;
