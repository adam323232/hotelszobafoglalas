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

router.post("/addroom", async (req, res) => {
  try {
    const {
      name,
      imageurls,
      rentperday,
      type,
      maxcount,
      phonenumber,
      description,
      extrak,
    } = req.body;

    const newRoom = new Room({
      name,
      imageurls,
      rentperday,
      type,
      maxcount,
      phonenumber,
      description,
      extrak,
    });

    await newRoom.save();
    res.status(201).json({ message: "Szoba sikeresen hozzáadva", newRoom });
  } catch (error) {
    console.error("Hiba a szoba hozzáadása során:", error);
    res.status(500).json({ message: "Hiba történt a szoba hozzáadása során" });
  }
});

router.put("/updatebooking/:id", async (req, res) => {
  const { id } = req.params;
  const { updatedRoom } = req.body;
  console.log(updatedRoom);

  try {
    // Az extrák boolean értékeit tömbbé alakítjuk
    const extrakArray = [
      updatedRoom.extrak[0] || false,
      updatedRoom.extrak[1] || false,
      updatedRoom.extrak[2] || false,
      updatedRoom.extrak[3] || false,
      updatedRoom.extrak[4] || false,
      updatedRoom.extrak[5] || false,
      updatedRoom.extrak[6] || false,
    ];

    // Szoba frissítése az adatbázisban
    const roomitem = await Room.findByIdAndUpdate(
      id,
      {
        name: updatedRoom.name,
        type: updatedRoom.type,
        rentperday: updatedRoom.rentperday,
        maxcount: updatedRoom.maxcount,
        phonenumber: updatedRoom.phonenumber,
        extrak: extrakArray, // Extrák tömbként tárolva
      },
      { new: true } // Az új értékek visszaadása
    );

    if (!roomitem) {
      return res.status(404).json({ message: "Szoba nem található" });
    }

    res.status(200).json({ message: "Szoba sikeresen frissítve", roomitem });
  } catch (error) {
    console.error("Hiba a szoba frissítése során:", error);
    res.status(500).json({ message: "Hiba történt a szoba frissítése során" });
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
