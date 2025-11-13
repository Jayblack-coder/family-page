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
import AsouzuGenOneProfiles from "./Components/Screens/Asouzu/AsouzuFirst";
import AsouzuGenFiveProfiles from "./Components/Screens/Asouzu/AsouzuFifth";
import AsouzuGenFourProfiles from "./Components/Screens/Asouzu/AsouzuFourth";
import AsouzuGenThreeProfiles from "./Components/Screens/Asouzu/AsouzuThird";
import AsouzuGenTwoProfiles from "./Components/Screens/Asouzu/AsouzuSecond";
import OkoliGenFiveProfiles from "./Components/Screens/Okoli/OkoliFifth";
import OkoliGenFourProfiles from "./Components/Screens/Okoli/OkoliFourth";
import OkoliGenThreeProfiles from "./Components/Screens/Okoli/OkoliThird";
import OkoliGenTwoProfiles from "./Components/Screens/Okoli/OkoliSecond";
import OkoliGenOneProfiles from "./Components/Screens/Okoli/OkoliFirst";
import UdorjiGenFiveProfiles from "./Components/Screens/Udorji/UdorjiFifth";
import UdorjiGenFourProfiles from "./Components/Screens/Udorji/UdorjiFourth";
import UdorjiGenThreeProfiles from "./Components/Screens/Udorji/UdorjiThird";
import UdorjiGenTwoProfiles from "./Components/Screens/Udorji/UdorjiSecond";
import UdorjiGenOneProfiles from "./Components/Screens/Udorji/UdorjiFirst";
import AdminDashboard from "./Components/Admin/AdminDashboard";
// import AdminLogin from "./Components/AdminLogin.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <h1>Login Bar</h1>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

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
          path="/asouzu-one"
          element={
            <ProtectedRoute>
              <AsouzuGenOneProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asouzu-two"
          element={
            <ProtectedRoute>
              <AsouzuGenTwoProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asouzu-three"
          element={
            <ProtectedRoute>
              <AsouzuGenThreeProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asouzu-four"
          element={
            <ProtectedRoute>
              <AsouzuGenFourProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asouzu-five"
          element={
            <ProtectedRoute>
              <AsouzuGenFiveProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/udorji-one"
          element={
            <ProtectedRoute>
              <UdorjiGenOneProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/udorji-two"
          element={
            <ProtectedRoute>
              <UdorjiGenTwoProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/udorji-three"
          element={
            <ProtectedRoute>
              <UdorjiGenThreeProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/udorji-four"
          element={
            <ProtectedRoute>
              <UdorjiGenFourProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/udorji-five"
          element={
            <ProtectedRoute>
              <UdorjiGenFiveProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okoli-one"
          element={
            <ProtectedRoute>
              <OkoliGenOneProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okoli-two"
          element={
            <ProtectedRoute>
              <OkoliGenTwoProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okoli-three"
          element={
            <ProtectedRoute>
              <OkoliGenThreeProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okoli-four"
          element={
            <ProtectedRoute>
              <OkoliGenFourProfiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okoli-five"
          element={
            <ProtectedRoute>
              <OkoliGenFiveProfiles />
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
