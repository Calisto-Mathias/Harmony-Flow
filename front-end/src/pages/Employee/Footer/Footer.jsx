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
          <li>ID: {user?.Staff_ID}</li>
          <li>Name: {user?.Name}</li>
          <li>Email: {user?.Email}</li>
          <li>Role: {user?.Role}</li>
          <li>Department: {user?.Department}</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
