import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Register from "./Components/Screens/Register";
import Login from "./Components/Screens/Login";
import NwankwoHome from "./Components/Screens/NwankwoHome";
import AsouzuHome from "./Components/Screens/AsouzuHome";
import UdorjiHome from "./Components/Screens/UdorjiHome";
import OkoliHome from "./Components/Screens/OkoliHome";
import ProtectedRoute from "./Components/ProtectedRoute";
import NwankwoGenOneProfiles from "./Components/Screens/NwankwoFirst";

function App() {
  return (
    <Router>
      <Navbar />
      <NwankwoGenOneProfiles />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Hero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nwankwo"
          element={
            <ProtectedRoute>
              <NwankwoHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asouzu"
          element={
            <ProtectedRoute>
              <AsouzuHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/udorji"
          element={
            <ProtectedRoute>
              <UdorjiHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okoli"
          element={
            <ProtectedRoute>
              <OkoliHome />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
