import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { loading, isAuthenticated, accessToken } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      {!loading && !isAuthenticated && !accessToken && <Navigate to="/login" />}
      {children}
    </>
  );
};

export default PrivateRoute;
