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
import NwankwoGenTwoProfiles from "./Components/Screens/NwankwoSecond";
import NwankwoGenThreeProfiles from "./Components/Screens/NwankwoThird";
import NwankwoGenFourProfiles from "./Components/Screens/NwankwoFourth";
import NwankwoGenFiveProfiles from "./Components/Screens/NwankwoFifth";
import About from "./Components/Screens/About";
import Lineage from "./Components/Screens/Lineage";
import Gallery from "./Components/Screens/Gallery";
import Events from "./Components/Screens/Events";

function App() {
  return (
    <Router>
      <Navbar />
      
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
        <Route
          path="/generation-one"
          element={
            <ProtectedRoute>
              <NwankwoGenOneProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generation-two"
          element={
            <ProtectedRoute>
              <NwankwoGenTwoProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generation-three"
          element={
            <ProtectedRoute>
              <NwankwoGenThreeProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generation-four"
          element={
            <ProtectedRoute>
              <NwankwoGenFourProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generation-five"
          element={
            <ProtectedRoute>
              <NwankwoGenFiveProfiles />
            </ProtectedRoute>
          }
        />
<Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lineage"
          element={
            <ProtectedRoute>
              <Lineage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
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
