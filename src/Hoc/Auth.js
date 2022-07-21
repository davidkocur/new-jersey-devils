import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router";
import { useStore } from "../Helpers/Store";

export const AuthGuard = ({ children }) => {
  const [state] = useStore();
  const location = useLocation();

  if (state.isAuthPending) {
    return (
      <div className="full_height_wrapper">
        <div className="progress_full">
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (!state.user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};
