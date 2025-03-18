import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate, extras }) {
    // Extrák sablonja
    const plainOptions = [
        { nev: 'Szobaszerviz', ar: 21 },
        { nev: 'Minibár', ar: 100 },
        { nev: 'Fitneszterem belépő', ar: 50 },
        { nev: 'Parkoló', ar: 7 },
        { nev: 'Étkezés', ar: 16 },
        { nev: 'Reggeli', ar: 9 },
        { nev: 'Wifi', ar: 4 },
    ];

    // State-ek a modalhoz és az extrákhoz
    const [show, setShow] = useState(false);
    const [extrak, setExtrak] = useState([]);

    // Modal bezárása
    const handleClose = () => setShow(false);

    // Adatok betöltése az adatbázisból
    const handleShow = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/rooms/${room._id}`
            );
            const roomData = await response.json();
            console.log(roomData.room.extrak);
            setExtrak(roomData.room.extrak); // Extrák frissítése

            // Helyes mezőnév: "extrak"
            // if (roomData && Array.isArray(roomData.extras)) {
            //   const mappedExtras = roomData.room.extrak
            //     .map((extra, index) => (extra ? plainOptions[index] : null))
            //     .filter(Boolean); // Kiszűrjük a false értékeket

            //   setExtras(mappedExtras); // Extrák frissítése
            // } else {
            //   setExtras([]); // Ha nincs "extrak", üres tömb
            // }

            setShow(true); // Modal megnyitása
        } catch (error) {
            console.error('Hiba a szoba adatainak betöltésekor:', error);
            setExtrak([]); // Biztonsági fallback
        }
    };

    return (
        <div className="row roombs">
            <div className="col-md-4">
                <img
                    src={room.imageurls[0]}
                    className="smallimg"
                    alt="Room"
                />
            </div>
            <div className="col-md-7">
                <h1>{room.name}</h1>
                <b>
                    <p>Max Count: {room.maxcount}</p>
                    <p>Phone Number: {room.phonenumber}</p>
                    <p>Type: {room.type}</p>
                </b>
                <div style={{ float: 'right' }}>
                    {fromdate && todate && (
                        <Link
                            to={`/book/${room._id}/${fromdate}/${todate}/${extras}`}
                        >
                            <button className="btn btn-primary m-2">
                                Foglalás
                            </button>
                        </Link>
                    )}

                    <button
                        className="btn btn-primary"
                        onClick={handleShow}
                    >
                        Részletek
                    </button>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Carousel>
                        {room.imageurls.map((url) => (
                            <Carousel.Item key={url}>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                    alt="Room"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <p>{room.description}</p> {/* Szoba leírása */}
                    <h5>Extrák:</h5>
                    <ul>
                        {extrak && extrak.length > 0 ? (
                            extrak.map((extra, index) =>
                                extra ? (
                                    <li key={index}>
                                        {plainOptions[index].nev} —{' '}
                                        {plainOptions[index].ar} €
                                    </li>
                                ) : null
                            )
                        ) : (
                            <p>Nincs elérhető extra.</p>
                        )}
                    </ul>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Bezárás
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Room;
