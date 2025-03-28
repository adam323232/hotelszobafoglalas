require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const dbConfig = require("./db");
const BookingModel = require("./models/booking");
const RoomModel = require("./models/room");
const userModel = require("./models/user");

const app = express();
const PORT = process.env.PORT || 5000;

const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/usersRoutes");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

// EJS beállítása
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Statikus fájlok kezelése
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate("felhasznalo");
    return res.status(200).render("AdminPanel.ejs", { bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Az új útvonal, ami csak a Szobák adatokat adja vissza
app.get("/admin/rooms", async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    // console.log(rooms);

    return res.status(200).render("Szobak.ejs", { rooms });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/admin/addroom", (req, res) => {
  try {
    res.status(200).render("SzobaHozzadasa.ejs");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/admin/users", async (req, res) => {
  try {
    const users = await userModel.find(); // Feltételezve, hogy van egy `UserModel` a felhasználókhoz
    res.status(200).render("Felhasznalok.ejs", { users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
