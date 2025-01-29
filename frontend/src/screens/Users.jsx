import React from "react";
import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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
  }, []);

  async function torol(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.ok);
      if (response.ok) {
        console.log(`Foglalás törölve: ${id}`);
        setUsers(users.filter((users) => users._id !== id));
      } else if (response.status === 404) {
        console.error("Nem található");
      } else {
        console.error(`Hiba történt: ${response.status}`);
      }
    } catch (error) {
      console.log("Hiba történt a törlés során:", error);
    }
  }

  const handleUpdate = async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser);
    const updatedUser = {
      isadmin: currentUser.user.isAdmin,
    };

    try {
      console.log(updatedUser);
      const response = await fetch(
        `http://localhost:5000/api/users/updateuseradmin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedUser }),
        }
      );

      if (response.ok) {
        const updatedUsers = users.map((u) =>
          u._id === id ? { ...u, ...updatedUser } : u
        );
        setUsers(updatedUsers);
        // setUsers(users.filter((users) => users._id !== id));

        handleClose();
        console.log(`Admin jogok frissítve: ${id}`);
        // window.location.href = "/admin";
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.length &&
              users.map((users) => {
                return (
                  <tr key={users._id}>
                    <td>{users._id}</td>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>{users.isAdmin ? "Igen" : "Nem"}</td>
                    <td className="adminbtn">
                      <button className="btn" onClick={() => torol(users._id)}>
                        Töröl
                      </button>
                      <br />
                      <button
                        className="btn"
                        onClick={() => handleUpdate(users._id)}
                      >
                        Adminjog
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
