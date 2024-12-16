import React, { useState, useEffect } from "react";
import { Tabs } from "antd";


const { TabPane } = Tabs;
const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 ml-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profil" key="1">
          <h1>Profilom</h1>

          <br />

          <h1>Név: {user.user.name}</h1>
          <h1>Email: {user.user.email}</h1>
        </TabPane>
        <TabPane tab="Foglalásaim" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser "));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return; // Ellenőrizzük, hogy a user létezik-e

      try {
        const response = await fetch('/api/bookings', {
          method: 'POST', // Változtasd meg a metódust, ha szükséges
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: user._id }), // A felhasználó ID-ját küldjük
        });

        if (!response.ok) {
          throw new Error('Hiba történt a foglalások lekérésekor');
        }

        const data = await response.json();
        setBookings(data); // A foglalásokat beállítjuk az állapotba
        console.log(data); // A foglalások kiírása a konzolra
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
console.log(fetchBookings)
  }, [user]); // A user változó figyelése

  return (
    <div>
      <h1>Foglalásaim</h1>
      <ul>
        {bookings.length > 0 ? (
          bookings.map((bookings) => (
            <li key={bookings.id}></li> // Itt a foglalás részleteit jelenítjük meg
          ))
        ) : (
          <li>Nincsenek foglalásaid.</li>
        )}
      </ul>
    </div>
  );
}
