import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const Szobak = () => {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (room) => {
    setCurrentRoom(room);
    setShow(true);
  };

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

  const handleUpdate = async (id) => {
    const updatedRoom = {
      name: currentRoom.name,
      type: currentRoom.type,
      rentperday: currentRoom.rentperday,
      maxcount: currentRoom.maxcount,
      phonenumber: currentRoom.phonenumber,
    };

    try {
      console.log(updatedRoom);
      const response = await fetch(
        `http://localhost:5000/api/rooms/updatebooking/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedRoom }),
        }
      );

      if (response.ok) {
        const updatedRooms = rooms.map((r) =>
          r._id === id ? { ...r, ...updatedRoom } : r
        );
        setRooms(updatedRooms);
        handleClose();
      } else {
        console.error("Failed to update room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentRoom({ ...currentRoom, [name]: value });
  };
  async function torol(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Foglalás törölve: ${id}`);
        setRooms(rooms.filter((room) => room._id !== id));
      } else if (response.status === 404) {
        console.error("Szoba nem található.");
      } else {
        console.error(`Hiba történt: ${response.status}`);
      }
    } catch (error) {
      console.log("Hiba történt a törlés során:", error);
    }
  }

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
              <th>Szerkesztés</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                    <td className="adminbtn">
                      <button className="btn" onClick={() => handleShow(room)}>
                        Szerkeszt
                      </button>
                      <br />
                      <button className="btn" onClick={() => torol(room._id)}>
                        Töröl
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentRoom && currentRoom.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Név
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentRoom && currentRoom.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Típus
              </label>
              <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                value={currentRoom && currentRoom.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rentperday" className="form-label">
                Ár/nap
              </label>
              <input
                type="number"
                className="form-control"
                id="rentperday"
                name="rentperday"
                value={currentRoom && currentRoom.rentperday}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="maxcount" className="form-label">
                Maximális férőhely
              </label>
              <input
                type="number"
                className="form-control"
                id="maxcount"
                name="maxcount"
                value={currentRoom && currentRoom.maxcount}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Telefonszám
              </label>
              <input
                type="text"
                className="form-control"
                id="phonenumber"
                name="phonenumber"
                value={currentRoom && currentRoom.phonenumber}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleUpdate(currentRoom && currentRoom._id)}
          >
            Frissít
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Szobak;
