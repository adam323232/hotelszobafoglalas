import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Bookingscreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState({});

  const { roomid } = useParams();


  useEffect(() => {
    const fgv = async () => {
      setLoading(true); // Lekérdezés kezdetén set loading to true
      try {
        const data = await fetch("http://localhost:5000/api/rooms");
        if (data.ok) {
          const szobak = await data.json();
          const szobaK = szobak.rooms.filter(
            (element) => element._id === roomid
          );
          if (szobaK.length > 0) {
            setRoom(szobaK[0]);
          } else {
            setError(true); // Ha nem található a szoba
          }
        } else {
          setError(true); // Ha a válasz nem ok
        }
      } catch (error) {
        console.log(error);
        setError(true); // Hiba esetén
      } finally {
        setLoading(false); // Lekérdezés befejezése után állítsd false-ra
      }
    };

    fgv();
  }, [roomid]);

  return (
    <div className="m-5">
      {loading ? (
        <Loader/>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-7">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>

            <div className="col-md-5">
              <div style={{textAlign: 'right'}}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>Név: </p>
                  <p>Ettől: </p>
                  <p>Eddig: </p>
                  <p>Max count: {room.maxcount}</p>
                </b>
                </div>

                <div style={{textAlign: 'right'}}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days: </p>
                  <p>Rent per days: {room.rentperday}</p>
                  <p>Total amount</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-primary">Fizetés</button>
              </div>

            </div>

          </div>

        </div>) : (<Error/>)}
      
    </div>
  );
};

export default Bookingscreen;