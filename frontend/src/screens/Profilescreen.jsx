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
      <Tabs defaultActiveKey="2">
        <TabPane tab="Profil" key="1">
          <div className="profile-container">
            <div className="profile-header">
              <img src="" alt="Background" className="background-image" />
              <div className="profile-info">
                <img src="" alt="Profile" className="profile-pic" />
                <h2>{user.user.name}</h2>
                <p>{user.user.email}</p>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <strong>120</strong>
                <span>Courses enrolled</span>
              </div>
              <div className="stat">
                <strong>2.8k</strong>
                <span>Hours spent learning</span>
              </div>
              <div className="stat">
                <strong>26</strong>
                <span>Tasks completed</span>
              </div>
            </div>
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
