import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; 

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.familyStatus.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token"); // check if user is logged in

//   if (!token) {
//     // 🚫 not logged in → redirect to login
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ logged in → show page
//   return children;
// };

export default ProtectedRoute;
