import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader.jsx";
import Room from "../components/Room.jsx";
import { DatePicker, Space } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  useEffect(() => {
    const fgv = async () => {
      try {
        const data = await fetch("http://localhost:5000/api/rooms");

        if (data.ok) {
          const szobak = await data.json();
          localStorage.setItem("rooms", JSON.stringify(szobak.rooms));
          setRoom(szobak.rooms);
          setduplicaterooms(szobak.rooms);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fgv();
  }, []);

  function filterByDate(dates) {
    setfromdate(moment(dates[0].$d).format("DD-MM-YYYY"));
    settodate(moment(dates[1].$d).format("DD-MM-YYYY"));

    var temprooms = [];
    var availability = false;

    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability == true || room.currentbookings.length == 0) {
        temprooms.push(room);
      }
      setRoom(temprooms);
    }
  }

  function filterBySearch(e) {
    const value = e.target.value;
    setsearchkey(value); // Frissíti a keresési kulcsot
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(value.toLowerCase())
    );
    setRoom(temprooms); // Azonnal szűri a szobákat
  }
  function filterByType(e) {
    settype(e);
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );
      setRoom(temprooms);
    } else {
      setRoom(duplicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="asd row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">Mindent mutat</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
            <option value="old style">Old style</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3" key={room._id}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Homescreen;