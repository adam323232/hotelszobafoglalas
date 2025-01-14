import React, { useState, useEffect } from "react";
import Szobak from "./Szobak.jsx";
import Loader from "../components/Loader";

// import { TabPane, Tabs } from "react-bootstrap";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function Adminscreen() {
  return (
    <div className="admin mt-3 ml-3 mr-3 bs">
      <h1 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Foglalások" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Szobák" key="2">
          <Szobak />
        </TabPane>
        <TabPane tab="Szoba hozzáadása" key="3">
          <h1>Szoba hozzáadása</h1>
        </TabPane>
        <TabPane tab="Felhasználók" key="4">
          <h1>Felhasználók</h1>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const foglalasleker = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bookings");
        const foglalasok = await response.json();

        if (response.ok) {
          // Minden foglalás megjelenítése, nem szűrünk userid alapján
          setRooms(foglalasok.bookings);
        }
      } catch (error) {
        console.error("Hiba történt a foglalások lekérésekor:", error);
      }
    };
    foglalasleker();
  }, []);

  return (
    <div>
      {rooms.map((elem) => (
        <div className="row justify-content-center mt-5">
          <div className="col-md-9 mt-3">
            Hotel: <h1>{elem.room}</h1>
            Ettől: <h3>{elem.fromdate}</h3>
            Eddig: <h3>{elem.todate}</h3>
            Ár: <h3>{elem.totalamount}€</h3>
            Status: <h1>{elem.status === "booked" ? "LEFOGLALT" : "TÖRÖLT"}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
