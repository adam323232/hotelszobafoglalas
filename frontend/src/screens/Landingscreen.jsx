import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const Landingscreen = () => {
  return (
    <div className="landing mt-5">
      <div className="col-md-12 text-center">
        <div class="text-container">
          <h1 className="">ReZsoBa Rooms</h1>
          <Link to="/register">
            <button className="btn landingbtn">Kezdés</button>
          </Link>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Landingscreen;
