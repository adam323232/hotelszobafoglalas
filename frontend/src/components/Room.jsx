import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Room({ room, fromdate, todate, extras }) {
  const plainOptions = [
    { nev: "Szobaszerviz", ar: 21 },
    { nev: "Minibár", ar: 100 },
    { nev: "Fitneszterem belépő", ar: 50 },
    { nev: "Parkoló", ar: 7 },
    { nev: "Étkezés", ar: 16 },
    { nev: "Reggeli", ar: 9 },
    { nev: "Wifi", ar: 4 },
  ];

  const [show, setShow] = useState(false);
  const [extrak, setExtrak] = useState([]);

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rooms/${room._id}`
      );
      const roomData = await response.json();
      setExtrak(roomData.room.extrak);
      setShow(true);
    } catch (error) {
      console.error("Hiba a szoba adatainak betöltésekor:", error);
      setExtrak([]);
    }
  };

  const handleBookingClick = () => {
    if (!fromdate && !todate && !extras) {
      toast.error("Kérlek, válaszd ki az időpontot és az extrákat!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (!fromdate) {
      toast.error("Kérlek, válaszd ki a kezdő dátumot!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (!todate) {
      toast.error("Kérlek, válaszd ki a befejező dátumot!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (!extras) {
      toast.error("Kérlek, válaszd ki az extrákat!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="row roombs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="Room" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {fromdate && todate && extras ? (
            <Link to={`/book/${room._id}/${fromdate}/${todate}/${extras}`}>
              <button className="btn btn-primary m-2">Foglalás</button>
            </Link>
          ) : (
            <button
              className="btn btn-primary m-2"
              onClick={handleBookingClick}
            >
              Foglalás
            </button>
          )}
          <button className="btn btn-primary" onClick={handleShow}>
            Részletek
          </button>
        </div>
        <ToastContainer />
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url) => (
              <Carousel.Item key={url}>
                <img className="d-block w-100 bigimg" src={url} alt="Room" />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
          <h5>Extrák:</h5>
          <ul>
            {extrak && extrak.length > 0 ? (
              extrak.map((extra, index) =>
                extra ? (
                  <li key={index}>
                    {plainOptions[index].nev} — {plainOptions[index].ar} €
                  </li>
                ) : null
              )
            ) : (
              <p>Nincs elérhető extra.</p>
            )}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;