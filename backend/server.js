require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();
app.use(cors());

const dbConfig = require("./db");

const PORT = process.env.PORT || 5000;
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/usersRoutes");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

const path = require("path");
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
