import React, { useState, useEffect } from "react";
import Szobak from "./Szobak.jsx";
import AddRoom from "./AddRoom.jsx";
import Users from "./Users.jsx";
import Loader from "../components/Loader";
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
          <AddRoom />
        </TabPane>
        <TabPane tab="Felhasználók" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foglalasleker = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bookings");
        const foglalasok = await response.json();
        console.log(foglalasok);

        if (response.ok) {
          setRooms(foglalasok.bookings);
        }
      } catch (error) {
        console.error("Hiba történt a foglalások lekérésekor:", error);
      } finally {
        setLoading(false);
      }
    };
    foglalasleker();
  }, []);
  if (loading) {
    return <Loader />;
  }
  async function torol(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Foglalás törölve: ${id}`);
        setRooms(rooms.filter((room) => room._id !== id));
      } else if (response.status === 404) {
        console.error("Foglalás nem található.");
      } else {
        console.error(`Hiba történt: ${response.status}`);
      }
    } catch (error) {
      console.log("Hiba történt a törlés során:", error);
    }
  }

  return (
    <>
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <h1>Foglalások</h1>
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Felhasználó</th>
                <th>Szoba Id</th>
                <th>Hotel</th>
                <th>Ettől</th>
                <th>Eddig</th>
                <th>Ár</th>
                <th>Státusz</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((elem) => (
                <tr key={elem._id}>
                  <td>{elem.felhasznalo.name}</td>
                  <td>{elem._id}</td>
                  <td>{elem.room}</td>
                  <td>{elem.todate}</td>
                  <td>{elem.fromdate}</td>
                  <td>{elem.totalamount}€</td>
                  <td>
                    {elem.status === "booked" ? "LEFOGLALT" : "VISSZA MONDOTT"}
                  </td>
                  <td>
                    <button className="btn" onClick={() => torol(elem._id)}>
                      Töröl
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
