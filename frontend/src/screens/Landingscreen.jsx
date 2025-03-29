import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const Landingscreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="landing mt-5">
      <div className="col-md-12 text-center">
        <div className="text-container">
          <h1 className="">ReZsoBa Rooms</h1>
          <Link to={user ? "/home" : "/login"}>
            <button className="landingbtn"></button>
          </Link>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Landingscreen;