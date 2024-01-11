import React from "react";

import "./studentDashboard.scss";

const StudentDashboard = () => {
  return (
    <div className="studentDashboard">
      <div className="studentDashboardContainer">
        <div className="card">
          <img
            src="https://static.thenounproject.com/png/202590-200.png"
            alt=""
          />
          <h2 className="heading">Raise a Flow</h2>
          <p>
            Raise a Service Request to get your task completed as soon as
            possible. Do it now on our digital platform IRIS!
          </p>
          <div className="button">Raise Now!</div>
        </div>
        <div className="card">
          <img
            src="https://thumbs.dreamstime.com/b/hourglass-icon-isolated-white-background-simple-vector-logo-hourglass-icon-isolated-white-background-181302758.jpg"
            alt=""
          />
          <h2 className="heading">Status Enquiry</h2>
          <p>
            Check the status of your Service Requests to get your task completed
            as soon as possible. Do it now on our digital platform IRIS!
          </p>
          <div className="button">Check Now!</div>
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

export default StudentDashboard;
