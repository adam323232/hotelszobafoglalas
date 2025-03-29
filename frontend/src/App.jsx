import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import Landingscreen from "./screens/Landingscreen";
import ProtectedRoutes from "./ProtectedRoutes";
import FAQ from "./components/FAQ";
import Adatvedelem from "./components/Adatvedelem";
import "./App.css";
import AboutUs from "./components/AboutUs";
// import Extrakscreen from "./screens/Extrakscreen";
import Extrak from "./components/Extrak";
import ProtectedAdmin from "./ProtectedAdmin";
import Cancel from "./screens/Cancel";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Homescreen />}></Route>
            <Route path="/register" element={<Registerscreen />}></Route>
            <Route
              path="/book/:roomid/:fromdate/:todate/:extras"
              element={<Bookingscreen />}
            ></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="*" element={<Loginscreen />}></Route>
            </Route> 
            <Route element={<ProtectedAdmin />}>
              <Route path="http://localhost:5000/" element={<Loginscreen />}></Route>
            </Route>
            <Route path="/login" element={<Loginscreen />}></Route>
            <Route path="/profile" element={<Profilescreen />}></Route>
            <Route path="/" element={<Landingscreen />}></Route>
            <Route path="/faq" element={<FAQ />}></Route>
            <Route path="/privacy" element={<Adatvedelem />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/extrak" element={<Extrak />}></Route>
            <Route path="/cancel" element={<Cancel />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
