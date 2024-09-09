import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Error404 from "./Error"; // Make sure to import your Error404 component

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");

  return token ? children : <Error404 />;
};

export default PrivateRoute;
