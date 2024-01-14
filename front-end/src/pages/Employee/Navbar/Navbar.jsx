import React from "react";

import "./Navbar.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/RoleContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <nav className="employeeNavbar">
      <h1>{user?.Role}</h1>
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
