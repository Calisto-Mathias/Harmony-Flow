import React from "react";

import { useContext } from "react";
import { UserContext } from "../../../context/RoleContext";
import "./Footer.scss";

const Footer = () => {
  const { user, SetUser } = useContext(UserContext);
  return (
    <div className="footer">
      <div className="footerContainer">
        <ul>
          <li>ID: {user?.Roll_Number}</li>
          <li>Name: {user?.Name}</li>
          <li>Email: {user?.Email}</li>
          <li>Program: {user?.Program_Type}</li>
          <li>Branch: {user?.Department}</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
