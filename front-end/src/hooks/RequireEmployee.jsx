import { useAuth } from "./useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import React from "react";

const RequireEmployee = () => {
  const { auth, setAuth } = useAuth();

  const location = useLocation();

  return auth?.Role !== "Student" && auth?.Role !== "Admin" && auth?.Role ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  );
};

export default RequireEmployee;
