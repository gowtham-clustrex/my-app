import React from "react";
import { Outlet, Navigate } from "react-router";

const MainRouter: React.FC = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default MainRouter;
