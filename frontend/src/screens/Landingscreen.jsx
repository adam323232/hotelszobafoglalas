import React from "react";
import { Link } from "react-router-dom";

const Landingscreen = () => {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 style={{ color: "white", fontSize: "130px" }}>ReZsoBa Rooms</h2>
        <h1 style={{ color: "white" }}>Itt a vendég a főnök.</h1>

        <Link to="/home">
          <button className="btn landingbtn">Kezdés</button>
        </Link>
      </div>
    </div>
  );
};

export default Landingscreen;
