import React from "react";

import "./EmployeeDashboard.scss";

const EmployeeDashboard = () => {
  return (
    <div className="employeeDashboard">
      <div className="employeeDashboardContainer">
        <div className="card">
          <img
            src="https://static.thenounproject.com/png/202590-200.png"
            alt=""
          />
          <h2 className="heading">Approve/Reject Flows</h2>
          <p>
            Approve or Reject a Flow to get your task completed as soon as
            possible. Do it now on our digital platform IRIS!
          </p>
          <div className="button">Continue Now!</div>
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
          <div className="button">Logout Now!</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
