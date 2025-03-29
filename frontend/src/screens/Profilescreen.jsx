import React, { useEffect } from "react";
import Foglalasok from "./Foglalasok.jsx";

const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-left">
        <div className="profile-info">
          <img
            src="/img/profile.png"
            alt="Profile"
            className="profile-pic"
          />
          <h3 className="profile-name">{user.user.name}</h3>
          <p className="profile-email">{user.user.email}</p>
        </div>
      </div>
      <div className="profile-right">
        <h2>Foglalásaim</h2>
        <Foglalasok />
      </div>
    </div>
  );
};

export default Profilescreen;