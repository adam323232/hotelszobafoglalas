import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button} from "react-bootstrap";

const Szobak = () => {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentRoom, setCurrentRoom] = useState(null);

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
      const response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRoom),
      });

      if (response.ok) {
        const updatedRooms = rooms.map((r) => (r._id === id ? { ...r, ...updatedRoom } : r));
        setRooms(updatedRooms);
        handleClose();
      } else {
        console.error('Failed to update room');
      }
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

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
                  <>
                    <tr key={room._id}>
                      <td>{room._id}</td>
                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>{room.rentperday}</td>
                      <td>{room.maxcount}</td>
                      <td>{room.phonenumber}</td>
                      <td>
                        <button className="btn" onClick={handleShow}>
                          Szerkeszt
                        </button>
                      </td>
                    </tr>
                    <Modal show={show} onHide={handleClose} size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title>{room.name}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label">Név</label>
                            <input type="text" className="form-control" id="name" value={room.name} onChange={(e) => setName(e.target.value)} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="type" className="form-label">Típus</label>
                            <input type="text" className="form-control" id="type" value={room.type} onChange={(e) => setType(e.target.value)} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="rentperday" className="form-label">Ár/nap</label>
                            <input type="number" className="form-control" id="rentperday" value={room.rentperday} onChange={(e) => setRentPerDay(e.target.value)} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="maxcount" className="form-label">Maximális férőhely</label>
                            <input type="number" className="form-control" id="maxcount" value={room.maxcount} onChange={(e) => setMaxCount(e.target.value)} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="phonenumber" className="form-label">Telefonszám</label>
                            <input type="text" className="form-control" id="phonenumber" value={room.phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={() => handleUpdate(room._id)}>
                          Frissít
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Szobak;
