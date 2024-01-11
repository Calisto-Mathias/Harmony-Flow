import React, { useContext, useEffect, useState } from "react";

import axiosInstance from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";

import "./StudentFlow.scss";

const StudentFlow = () => {
  const [loaded, setLoaded] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);

  const [request, setRequest] = useState("");
  const [option, setOption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ TemplateID: option, Request: request }));
    const response = await axiosInstance.post(
      "/student/create",
      JSON.stringify({ TemplateID: option, Request: request }),
      {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          withCredentials: true,
          "Content-Type": "application/json",
        },
      }
    );
    useAuth({ ...auth, updates: auth.updates + 1 });
    console.log(response);
  };

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const controller = new AbortController();

      try {
        const response = await axiosInstance.get("/student/templates", {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            withCredentials: true,
            "Content-Type": "application/json",
          },
        });
        mounted && setTemplates(response?.data?.templates);
        setLoaded(true);
        console.log(response?.data?.templates[0]);
        setOption(response?.data?.templates[0]?._id);
      } catch (error) {
        console.error(error);
      }

      return () => {
        mounted = false;
        controller.abort();
      };
    };

    getData();
  }, [auth?.accessToken]);

  return (
    <div className="studentFlow">
      <div className="studentFlowContainer">
        <h1 className="studentFlowContainerHeading">Create A Flow</h1>
        <p>Create a request by selecting one of the Flow Approvals Below!</p>
        <form action="" className="studentFlowContainerForm">
          <label htmlFor="studentFlowContainerSelector">Select a Flow:</label>
          {loaded && (
            <select
              name="studentFlowContainerSelector"
              id="studentFlowContainerSelector"
              value={option}
              onChange={(e) => {
                const element = templates.filter((item) => {
                  return item.Approval_Flow.join(" => ") === e.target.value;
                });
                console.log(element);
                setOption(element._id);
              }}
            >
              {templates?.map((ele) => {
                const { Approval_Flow } = ele;
                const Approval_Flow_String = Approval_Flow.join(" => ");
                return (
                  <option
                    value={Approval_Flow_String}
                    key={Approval_Flow_String}
                  >
                    {Approval_Flow_String}
                  </option>
                );
              })}
            </select>
          )}
          <label htmlFor="studentFlowContainerRequest">Request:</label>
          <input
            type="text"
            name="studentFlowContainerRequest"
            id="studentFlowContainerRequest"
            value={request}
            placeholder="Enter a Request..."
            onChange={(e) => {
              setRequest(e.target.value);
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentFlow;
