import React from 'react'
import { useState, useEffect } from "react";


const Users = () => {
  const [users, setUsers] = useState([]);

    useEffect(() => {
        const fgv = async () => {
          try {
            const data = await fetch("http://localhost:5000/api/users");
    
            if (data.ok) {
              const felhasznalok = await data.json();
              localStorage.setItem("users", JSON.stringify(felhasznalok.users));
              setUsers(felhasznalok.users);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fgv();
        console.log(users)
      }, []);

  return (
    <div className="row">
    <div className="col-md-10">
      <h1>Felhasználók</h1>

      <table className="table table-bordered table-dark">
        <thead className="bs">
          <tr>
            <th>Felhasználó Id</th>
            <th>Név</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
        </thead>

        <tbody>
          {users.length && (users.map(users => {
            return (
              <tr key={users._id}>
                <td>{users._id}</td>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.isAdmin ? "Igen" : "Nem"}</td>
              </tr>
            )
          }))}
        </tbody>

      </table>
    </div>
  </div>
  )
}

export default Users