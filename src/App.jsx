import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Nwankwo from "./Components/Screens/Nwankwo";
import Register from "./Components/Screens/Register";

// import Family2 from "./pages/Family2";
// import Family3 from "./pages/Family3";
// import Family4 from "./pages/Family4";

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Register /> */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/nwankwo" element={<Nwankwo />} />
        {/* <Route path="/family3" element={<Family3 />} />
        <Route path="/family4" element={<Family4 />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
