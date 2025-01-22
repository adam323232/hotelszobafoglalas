const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  try {
    const rooms = req.body.bookingDetails.room;
    const others = req.body.bookingDetails;
    // console.log(rooms);
    // console.log(others);

    const newbooking = new Booking({
      room: rooms.name,
      roomid: rooms._id,
      userid: others.userid,
      fromdate: moment(others.fromdate).format("MM-DD-YYYY"),
      todate: moment(others.todate).format("MM-DD-YYYY"),
      totalamount: Number(others.totalamount),
      totaldays: Number(others.totaldays),
      transactionid: "1234",
    });
    console.log(newbooking);

    const booking = await newbooking.save();
    console.log(booking);

    return res.status(201).json({ msg: "Sikeres szobafoglalás!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
// GET kérés az összes foglalás lekéréséhez
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/cancelbooking", async (req, res) => {
  const { bookingid } = req.body;
  console.log(req.body);

  try {
    const bookingitem = await Booking.findByIdAndUpdate(
      { _id: bookingid },
      { status: "cancelled" }
    );

    console.log(bookingitem);

    return res
      .status(200)
      .json({ msg: "Visszamondtad a foglalást sikeresen", bookingitem });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).send({ message: "Foglalás törölve" });
  } catch (error) {
    res.status(500).send({ error: "Hiba történt a törlés során" });
  }
});



module.exports = router;
