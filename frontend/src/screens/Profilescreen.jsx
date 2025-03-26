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
          <div className="profile-container bs">
            <div className="profile-header">
              <div className="profile-info">
                <img
                  src="/img/profile.png"
                  alt="Profile"
                  className="profile-pic"
                />
                <h3
                  style={{
                    width: "30%",
                    height: "50px",
                    padding: "5px",
                    margin: "0 auto",
                    borderRadius: "10px",
                    backgroundColor: "rgba(137, 218, 255, 0.42)",
                    color: "black",
                  }}
                >
                  {user.user.name}
                </h3>
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
