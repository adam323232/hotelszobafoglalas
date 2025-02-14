import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Foglalasok from "./Foglalasok.jsx";

const { TabPane } = Tabs;
const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="profil ml-3 ml-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profil" key="1">
          <div className="profile-container">
            <div className="profile-header">
              <img
                src="public/img/profile.png"
                alt="Background"
                className="background-image"
              />
              <div className="profile-info">
                <img
                  src="public/img/profile.png"
                  alt="Profile"
                  className="profile-pic"
                />
                <h2>{user.user.name}</h2>
                <p>{user.user.email}</p>
              </div>
            </div>
            <div className="profile-stats"></div>
          </div>
        </TabPane>
        <TabPane tab="Foglalásaim" key="2">
          <Foglalasok />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Profilescreen;
