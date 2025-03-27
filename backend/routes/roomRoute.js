const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json({ rooms });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById({ _id: id });
    // console.log(room);
    return res.status(200).json({ room });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;

  try {
    const room = await Room.find({ _id: roomid });
    return res.status(200).json({ room });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/admin/addroom", async (req, res) => {
  try {
    const { name, hotel, price, capacity } = req.body; // Szoba adatok
    const newRoom = new Room({ name, hotel, price, capacity });
    await newRoom.save(); // Szoba mentése az adatbázisba
    res.status(201).send({ message: "Szoba sikeresen hozzáadva" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Hiba történt a szoba hozzáadása során" });
  }
});

router.put("/updatebooking/:id", async (req, res) => {
  const { id } = req.params;
  const { updatedRoom } = req.body;

  try {
    const roomitem = await Room.findByIdAndUpdate(
      { _id: id },
      {
        name: updatedRoom.name,
        maxcount: updatedRoom.maxcount,
        rentperday: updatedRoom.rentperday,
        type: updatedRoom.type,
        phonenumber: updatedRoom.phonenumber,
        extrak: updatedRoom.extrak,
      },
      { new: true }
    );

    return res.status(200).json({ msg: "Sikeres szoba frissítés", roomitem });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const roomid = req.params.id;
    await Room.findByIdAndDelete(roomid);
    res.status(200).send({ message: "Szoba törölve" });
  } catch (error) {
    res.status(500).send({ error: "Hiba történt a törlés során" });
  }
});

module.exports = router;
