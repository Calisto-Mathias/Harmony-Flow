import { useAuth } from "./useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import React from "react";

const RequireStudent = () => {
  const { auth, setAuth } = useAuth();

  const location = useLocation();

  console.log(auth);
  return auth?.Role === "Student" ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  );
};

export default RequireStudent;
