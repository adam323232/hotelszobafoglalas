import { useEffect, useState } from "react";

const Foglalasok = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")).user;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const foglalasleker = async () => {
      const response = await fetch("http://localhost:5000/api/bookings");

      const foglalasok = await response.json();

      if (response.ok) {
        setRooms(
          foglalasok.bookings.filter((elem) => elem.userid === user._id)
        );
      }
    };
    foglalasleker();
  }, []);

  async function cancelBooking(bookingid) {
    try {
      //setLoading(true);
      const result = await fetch(
        "http://localhost:5000/api/bookings/cancelbooking",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingid }),
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      {rooms.length === 0 ? (
        <p>Nincsenek foglalások</p>
      ) : (
        rooms.map((elem) => (
          <div className="foglalasok row justify-content-center mt-5" key={elem._id}>
            <div className="col-md-11 mt-3">
              Hotel: <h1>{elem.room}</h1>
              Ettől: <h3>{elem.fromdate}</h3>
              Eddig: <h3>{elem.todate}</h3>
              Ár: <h3>{elem.totalamount}€</h3>
              Status:{" "}
              <h1>{elem.status == "booked" ? "LEFOGLALT" : "VISSZA MONDOTT"}</h1>
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
        ))
      )}
    </div>
  );
};

export default Foglalasok;
