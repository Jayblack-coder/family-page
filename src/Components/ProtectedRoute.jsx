import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (!token) {
    // 🚫 not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ logged in → show page
  return children;
};

export default ProtectedRoute;
