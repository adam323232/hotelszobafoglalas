import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import moment from "moment";

const Bookingscreen = ({}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState({});
  const [userid, setUserid] = useState(0);

  const { roomid, fromdate, todate } = useParams();

  const fromDate = moment(fromdate, "DD-MM-YYYY");
  const toDate = moment(todate, "DD-MM-YYYY");

  const totaldays = moment.duration(toDate.diff(fromDate)).asDays();
  const totalamount = totaldays * room.rentperday;

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

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser")).user._id,
      fromDate,
      toDate,
      totalamount,
      totaldays,
    };
    console.log(bookingDetails);

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/bookings/bookroom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingDetails }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        console.log(result.msg);
        window.alert(result.msg);
      }
      setLoading(false);
    } catch (error) {
      console.log("Nem sikerült a rendelést felvenni!");
    }
    console.log(bookingDetails);
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="booking row justify-content-center mt-5 bs">
            <div className="col-md-7">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>

            <div className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <h1>Foglalási adatok</h1>
                <hr />

                <b>
                  <p>
                    Név:{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).user.name}
                  </p>
                  <p>Ettől: {fromdate}</p>
                  <p>Eddig: {todate}</p>
                  <p>Maximális férőhely: {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Összeg</h1>
                  <hr />
                  <p>Össznap: {totaldays}</p>
                  <p>{room.rentperday} €/éjszaka</p>
                  <p>Végösszeg: {totalamount} €</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>
                  Fizetés{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Bookingscreen;
