import React from "react";

import "./Unauthorized.scss";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <div className="unauthorizedContainer">
        <p>Unauthorized. Choose a Different End Point!</p>
        <Link to="/login" className="Linker">
          Login Now!
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
