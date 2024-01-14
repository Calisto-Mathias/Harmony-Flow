import React from "react";

import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="employeeNavbar">
      <ul>
        <Link to="/employee/dashboard" className="employeeNavbarLinks">
          Dashboard
        </Link>
        <Link to="/employee/status" className="employeeNavbarLinks">
          Approve or Reject Flows
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
