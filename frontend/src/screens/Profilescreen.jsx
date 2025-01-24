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
          <h1>Profilom</h1>

          <br />

          <h1>Név: {user.user.name}</h1>
          <h1>Email: {user.user.email}</h1>
        </TabPane>
        <TabPane tab="Foglalásaim" key="2">
          <Foglalasok />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Profilescreen;
