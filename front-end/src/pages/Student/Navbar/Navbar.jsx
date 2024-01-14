import React from "react";

import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="studentNavbar">
      <h1>Student</h1>
      <ul>
        <Link to="/student/dashboard" className="studentNavbarLinks">
          Dashboard
        </Link>
        <Link to="/student/flow" className="studentNavbarLinks">
          Create A Flow
        </Link>
        <Link to="/student/status" className="studentNavbarLinks">
          Status
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
