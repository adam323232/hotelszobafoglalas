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
      const response = await fetch(
        "http://localhost:5000/api/bookings/cancelbooking",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingid }),
        }
      );

      if (response.ok) {
        window.location.href = "/profile";
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="containerf">
      {rooms.length === 0 ? (
        <p>Nincsenek foglalások</p>
      ) : (
        rooms.map((elem) => (
          <div
            className="foglalasok row justify-content-center mt-5"
            key={elem._id}
          >
            <div className="col-md-11 mt-3">
              Hotel: <p className="nevp">{elem.room}</p>
              Ettől: <p className="fromdate">{elem.fromdate}</p>
              Eddig: <p className="todate">{elem.todate}</p>
              Ár: <p className="ar">{elem.totalamount}€</p>
              Status:{" "}
              <p className="status">
                {elem.status == "booked" ? "LEFOGLALT" : "VISSZA MONDOTT"}
              </p>
              <div style={{ float: "right" }}>
                <button
                  className="btnf btn-primary"
                  onClick={() => {
                    cancelBooking(elem._id);
                  }}
                >
                  Foglalás lemondása
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
