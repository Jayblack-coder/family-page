import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
//import Nwankwo from "./Components/Screens/Nwankwo";
import Register from "./Components/Screens/Register";
import Login from "./Components/Screens/Login";
// import Main from "./Components/Screens/Main";
import NwankwoHome from "./Components/Screens/NwankwoHome";
import AsouzuHome from "./Components/Screens/AsouzuHome";
import UdorjiHome from "./Components/Screens/UdorjiHome";
import OkoliHome from "./Components/Screens/OkoliHome";
// import Family4 from "./pages/Family4";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/nwankwo" element={<NwankwoHome />} />
       <Route path="/asouzu" element={<AsouzuHome />} />
        <Route path="/udorji" element={<UdorjiHome />} /> 
        <Route path="/okoli" element={<OkoliHome />} /> 
      </Routes>
    </Router>
  );
}

export default App;
