import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { loading, user } = useSelector((state: RootState) => state.user);

  return (
    <>
      {!loading && !user?.username && <Navigate to="/login" />}
      {children}
    </>
  );
};

export default PrivateRoute;
