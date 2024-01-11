import React from "react";

import "./AdminDashboard.scss";

const AdminDashboard = () => {
  return (
    <div className="adminDashboard">
      <div className="adminDashboardContainer">
        <div className="card">
          <img
            src="https://static.thenounproject.com/png/202590-200.png"
            alt=""
          />
          <h2 className="heading">Create Template</h2>
          <p>
            Raise a Template to get students to complete tasks as soon as
            possible. Do it now on our digital platform IRIS!
          </p>
          <div className="button">Raise Now!</div>
        </div>
        <div className="card">
          <img
            src="https://thumbs.dreamstime.com/b/hourglass-icon-isolated-white-background-simple-vector-logo-hourglass-icon-isolated-white-background-181302758.jpg"
            alt=""
          />
          <h2 className="heading">Template Status</h2>
          <p>
            Check the status of your Templates to get your task completed as
            soon as possible. Do it now on our digital platform IRIS!
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

export default AdminDashboard;
