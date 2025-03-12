require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = require("./db");

const PORT = process.env.PORT || 5000;
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/usersRoutes");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
