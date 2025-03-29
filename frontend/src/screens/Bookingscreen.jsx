import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import moment from "moment";
import Navbar from "../components/Navbar";
// import { convertLegacyProps } from 'antd/es/button';

const Bookingscreen = ({}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState({});
  const [userid, setUserid] = useState(0);

  const { roomid, fromdate, todate, extras } = useParams();

  const fromDate = moment(fromdate, "DD-MM-YYYY");
  const toDate = moment(todate, "DD-MM-YYYY");

  const totaldays = Math.ceil(moment.duration(toDate.diff(fromDate)).asDays());
  let totalamount = totaldays * room.rentperday;
  const extrasTomb = extras.split(",");

  const plainOptions = [
    {
      nev: "Szobaszerviz",
      ar: 21,
    },
    {
      nev: "Minibár",
      ar: 100,
    },
    {
      nev: "Fitneszterem belépő",
      ar: 50,
    },
    {
      nev: "Parkoló",
      ar: 7,
    },
    {
      nev: "Étkezés",
      ar: 16,
    },
    {
      nev: "Reggeli",
      ar: 9,
    },
    {
      nev: "Wifi",
      ar: 4,
    },
  ];

  for (let i = 0; i < plainOptions.length; i++) {
    for (let j = 0; j < extrasTomb.length; j++) {
      if (plainOptions[i].nev === extrasTomb[j]) {
        totalamount += plainOptions[i].ar * totaldays;
      }
    }
  }

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
      felhasznalo: JSON.parse(localStorage.getItem("currentUser")).user.name,
      fromDate,
      toDate,
      totalamount,
      totaldays,
      extras,
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
        window.location.href = result.url;
      } else {
        console.log(result.msg);
      }
      setLoading(false);
    } catch (error) {
      console.log("Nem sikerült a rendelést felvenni!");
    }
    // console.log(bookingDetails);
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="bookingbody">
          <div className="booking row justify-content-center mt-5 bs">
            <div className="col-md-7">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>

            <div className="col-md-5 booking-adatok">
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
                  <p>Extra szolgáltatások: {extras}</p>
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
                <button className="cta" onClick={bookRoom}>
                  <span className="hover-underline-animation"> Pay now </span>
                  <svg
                    id="arrow-horizontal"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="10"
                    viewBox="0 0 46 16"
                  >
                    <path
                      id="Path_10"
                      data-name="Path 10"
                      d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                      transform="translate(30)"
                    ></path>
                  </svg>
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
