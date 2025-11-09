import { createContext, useContext, useEffect, useState } from "react";
import API from "../Components/Screens/api.jsx"; // adjust path if needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  // Persist session
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Login
  const login = async (userName, password) => {
    setLoading(true);
    try {
      const res = await API.post("/api/user/login", { userName, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      console.error("Login failed:", err);
      return { success: false, message: "Invalid credentials" };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  // Inject token into axios requests
  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
