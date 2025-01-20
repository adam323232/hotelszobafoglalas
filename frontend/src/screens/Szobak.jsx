import React from 'react'
import { useState, useEffect } from "react";

const Szobak = () => {
  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {
    const fgv = async () => {
      try {
        const data = await fetch("http://localhost:5000/api/rooms");

        if (data.ok) {
          const szobak = await data.json();
          localStorage.setItem("rooms", JSON.stringify(szobak.rooms));
          setRooms(szobak.rooms);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fgv();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Szobák</h1>

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Szoba Id</th>
              <th>Név</th>
              <th>Típus</th>
              <th>Ár/nap</th>
              <th>Maximális férőhely</th>
              <th>Telefonszám</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length && (rooms.map(room => {
              return (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                </tr>
              )
            }))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Szobak