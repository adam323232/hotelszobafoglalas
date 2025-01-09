import { useEffect, useState } from "react";

const Foglalasok = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")).user;
  console.log(user._id);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const foglalasleker = async () => {
      const response = await fetch("http://localhost:5000/api/bookings");

      const foglalasok = await response.json();

      if (response.ok) {
        console.log(foglalasok.bookings);

        setRooms(
          foglalasok.bookings.filter((elem) => elem.userid === user._id)
        );
      }
    };
    foglalasleker();
  }, []);

  async function cancelBooking(bookingid, elemid) {
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {rooms.map((elem) => (
        <div className="row justify-content-center mt-5" key={elem._id}>
          <div className="col-md-9 mt-3">
            Hotel: <h1>{elem.room}</h1>
            Ettől: <h3>{elem.fromdate}</h3>
            Eddig: <h3>{elem.todate}</h3>
            Ár: <h3>{elem.totalamount}€</h3>
            Status: <h1>{elem.status == "booked" ? "LEFOGLALT" : "TÖRÖLT"}</h1>
            <div style={{ float: "right" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  cancelBooking(elem._id);
                }}
              >
                FOGLALÁS TÖRLÉSE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Foglalasok;
