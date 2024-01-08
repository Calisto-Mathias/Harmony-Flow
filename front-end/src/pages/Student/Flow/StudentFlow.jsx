import React, { useContext, useEffect } from "react";

import axiosInstance from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";

const StudentFlow = () => {
  const [loaded, setLoaded] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);

  useEffect(async () => {
    try {
      const response = await axiosInstance.get(
        "/student/templates",
        JSON.stringify({ accessToken: auth }),
        { headers: { "Content-Type": "application/json" } }
      );

      setTemplates(response?.data?.templates);
    } catch (error) {
      // Do nothing and just wait
    }
  }, []);

  return (
    <div className="studentFlow">
      <div className="studentFlowContainer">
        <h1 className="studentFlowContainerHeading">Create A Flow</h1>
        <p>Create a request by selecting one of the Flow Approvals Below!</p>

        <form action="" className="studentFlowContainerForm"></form>
      </div>
    </div>
  );
};

export default StudentFlow;
