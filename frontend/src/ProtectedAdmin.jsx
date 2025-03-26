import React from "react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setIsAdmin(user?.user?.isAdmin || false);
      } catch (error) {
        console.error("Hiba a localStorage olvasásakor:", error);
      }
    }
  }, []);
  return isAdmin ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedAdmin;
