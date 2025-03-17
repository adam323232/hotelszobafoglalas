import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader.jsx";
import Room from "../components/Room.jsx";
import { DatePicker } from "antd";
import moment from "moment";
import Dropdown from "../components/dropdown.jsx";
import { DropDownContext } from "../context/DropDownContext.jsx";

const { RangePicker } = DatePicker;

const plainOptions = [
  "Szobaszerviz",
  "Minibár",
  "Fitneszterem belépő",
  "Parkoló",
  "Étkezés",
  "Reggeli",
  "Wifi",
];

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [duplicaterooms, setDuplicateRooms] = useState([]);
  const [fromdate, setFromDate] = useState();
  const [todate, setToDate] = useState();
  const [searchkey, setSearchKey] = useState("");
  const [type, setType] = useState("all");
  const [dropdown, setDropdown] = useState(false);

  const { extras } = useContext(DropDownContext);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/rooms");
        if (!response.ok) throw new Error("Hálózati hiba");

        const data = await response.json();
        setRooms(data.rooms);
        setDuplicateRooms(data.rooms);
      } catch (error) {
        console.error("Hiba:", error);
      }
      setLoading(false);
    };

    fetchRooms();
  }, []);

  // **Szűrés extrák alapján**
  useEffect(() => {
    console.log(extras);
    if (extras.length > 0) {
      let filteredRooms = duplicaterooms.filter((room) => {
        // Ha a "Mindent kérem" be van pipálva, akkor minden extra legyen `true`
        if (extras.includes("Mindet kérem")) {
          return room.extrak.every((value) => value === true);
        }

        // Egyébként csak a kiválasztott extrákra szűrjünk
        return extras.every((extra) => {
          const index = plainOptions.indexOf(extra); // Extra indexének keresése
          return room.extrak[index] === true; // Csak akkor engedjük át, ha `true`
        });
      });

      setRooms(filteredRooms);
    } else {
      setRooms(duplicaterooms);
    }
    console.log(rooms.length);
  }, [extras]);

  function filterByDate(dates) {
    setFromDate(moment(dates[0].$d).format("DD-MM-YYYY"));
    setToDate(moment(dates[1].$d).format("DD-MM-YYYY"));

    const filteredRooms = duplicaterooms.filter((room) => {
      return room.currentbookings.every((booking) => {
        return (
          !moment(dates[0]).isBetween(booking.fromdate, booking.todate) &&
          !moment(dates[1]).isBetween(booking.fromdate, booking.todate) &&
          dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
          dates[1].format("DD-MM-YYYY") !== booking.todate
        );
      });
    });

    setRooms(filteredRooms);
    setDropdown(true);
  }

  function filterBySearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchKey(value);

    const filteredRooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(value)
    );
    setRooms(filteredRooms);
  }

  function filterByType(e) {
    setType(e);
    if (e !== "all") {
      const filteredRooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(filteredRooms);
    } else {
      setRooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      {dropdown ? <Dropdown /> : null}
      <div className="search row col-md-10">
        <div className="rangepickerdiv col-md-4" style={{ width: "25%" }}>
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="input"
            placeholder="Keresés"
            value={searchkey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="all">Mindent mutat</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
            <option value="old style">Old style</option>
          </select>
        </div>
      </div>

      <div className="room m-10">
        {loading ? (
          <Loader />
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-11 mt-3" key={room._id}>
              <Room
                room={room}
                fromdate={fromdate}
                todate={todate}
                extras={extras}
              />
            </div>
          ))
        ) : (
          <h3 style={{ color: "red", textAlign: "center" }}>Nincs találat!</h3>
        )}
      </div>
    </div>
  );
};

export default Homescreen;
