import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Register from "./Components/Screens/Register";
import Login from "./Components/Screens/Login";
import NwankwoHome from "./Components/Screens/NwankwoHome";
import AsouzuHome from "./Components/Screens/AsouzuHome";
import UdorjiHome from "./Components/Screens/UdorjiHome";
import OkoliHome from "./Components/Screens/OkoliHome";
import ProtectedRoutes from "./Utils/ProtectedRoutes";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes/>}>
                <Route path="/home" element={<Hero />} />
                <Route path="/nwankwo" element={<NwankwoHome />} />
                <Route path="/asouzu" element={<AsouzuHome />} />
                <Route path="/udorji" element={<UdorjiHome />} /> 
                <Route path="/okoli" element={<OkoliHome />} /> 
        </Route>
        
        
      </Routes>
    </Router>
  );
}

export default App;
