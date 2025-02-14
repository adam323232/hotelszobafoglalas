import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";
import ProtectedRoutes from "./ProtectedRoutes";
import FAQ from "./components/FAQ";
import Adatvedelem from "./components/Adatvedelem";
import "./App.css";
import "./index.css";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Homescreen />}></Route>
            <Route
              path="/book/:roomid/:fromdate/:todate"
              element={<Bookingscreen />}
            ></Route>
            <Route path="/register" element={<Registerscreen />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/admin" element={<Adminscreen />}></Route>
              <Route path="*" element={<Loginscreen />}></Route>
            </Route>
            <Route path="/login" element={<Loginscreen />}></Route>
            <Route path="/profile" element={<Profilescreen />}></Route>
            <Route path="/" element={<Landingscreen />}></Route>
            <Route path="/faq" element={<FAQ />}></Route>
            <Route path="/privacy" element={<Adatvedelem />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
