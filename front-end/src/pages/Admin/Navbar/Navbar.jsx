import React from "react";

import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="adminNavbar">
      <ul>
        <Link to="/admin/dashboard" className="adminNavbarLinks">
          Dashboard
        </Link>
        <Link to="/admin/create" className="adminNavbarLinks">
          Create a Template
        </Link>
        <Link to="/admin/status" className="adminNavbarLinks">
          Status of Templates
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
