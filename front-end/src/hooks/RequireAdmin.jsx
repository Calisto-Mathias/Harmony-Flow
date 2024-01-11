import { useAuth } from "./useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import React from "react";

const RequireAdmin = () => {
  const { auth, setAuth } = useAuth();

  const location = useLocation();

  return auth?.Role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  );
};

export default RequireAdmin;
