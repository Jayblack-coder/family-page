import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚫 No login → redirect
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Admin-only page but user is NOT admin
  if (adminOnly && user.isAdmin !== true) {
    return <Navigate to="/home" replace />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
