// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
