const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/bookroom", async (req, res) => {
  try {
    const rooms = req.body.bookingDetails.room;
    const others = req.body.bookingDetails;
    // console.log(rooms);
    // console.log(others);
    const user = await User.findById({ _id: others.userid });
    // console.log(user);
    // const users = await User.find({});
    // const felhasznalo = users.filter((elem) => elem._id === others.userid);
    // console.log("Rooms" + rooms);
    // console.log("Others" + others);

    const newbooking = new Booking({
      room: rooms.name,
      roomid: rooms._id,
      userid: others.userid,
      felhasznalo: user,
      fromdate: moment(others.fromDate).format("MM-DD-YYYY"),
      todate: moment(others.toDate).format("MM-DD-YYYY"),
      totalamount: Number(others.totalamount),
      totaldays: Number(others.totaldays),
      transactionid: "1234",
      extrak: others.extras.split(","),
    });
    // console.log(newbooking);

    const booking = await newbooking.save();
    // console.log(booking);
    let extrak = others.extras.split(",");
    const extrakTomb = [];

    const plainOptions = [
      {
        nev: "Szobaszerviz",
        ar: 21,
      },
      {
        nev: "Minibár",
        ar: 100,
      },
      {
        nev: "Fitneszterem belépő",
        ar: 50,
      },
      {
        nev: "Parkoló",
        ar: 7,
      },
      {
        nev: "Étkezés",
        ar: 16,
      },
      {
        nev: "Reggeli",
        ar: 9,
      },
      {
        nev: "Wifi",
        ar: 4,
      },
    ];

    for (let i = 0; i < plainOptions.length; i++) {
      for (let j = 0; j < extrak.length; j++) {
        if (plainOptions[i].nev === extrak[j]) {
          extrakTomb.push(plainOptions[i]);
        }
      }
    }

    let tetelek = [];

    const napiObi = {
      price_data: {
        currency: "eur",
        product_data: {
          name: rooms.name,
        },
        unit_amount: Number(others.totaldays) * rooms.rentperday * 100,
      },
      quantity: 1,
    };
    tetelek.push(napiObi);
    // console.log(napiObi);

    for (let i = 0; i < extrakTomb.length; i++) {
      let obj = {
        price_data: {
          currency: "eur",
          product_data: {
            name: extrakTomb[i].nev,
          },
          unit_amount: extrakTomb[i].ar * 100,
        },
        quantity: Number(others.totaldays),
      };
      tetelek.push(obj);
      // console.log(obj);
    }

    const session = await stripe.checkout.sessions.create({
      line_items: tetelek,
      mode: "payment",
      success_url: "http://localhost:5173/complete",
      cancel_url: "http://localhost:5173/cancel",
    });

    // console.log(session);

    return res
      .status(201)
      .json({ msg: "Sikeres szobafoglalás!", booking, url: session.url });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
// GET kérés az összes foglalás lekéréséhez
router.get("/", async (req, res) => {
  const plainOptions = [
    "Szobaszerviz",
    "Mini bár igény szerint",
    "Fitneszterem belépő",
    "Parkoló",
    "Étkezés",
    "Reggeli az árban",
    "Wifi",
  ];
  try {
    const bookings = await Booking.find({}).populate("felhasznalo");
    // console.log(bookings);
    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/cancelbooking", async (req, res) => {
  const { bookingid } = req.body;
  // console.log(req.body);

  try {
    const bookingitem = await Booking.findByIdAndUpdate(
      { _id: bookingid },
      { status: "cancelled" }
    );

    // console.log(bookingitem);

    return res
      .status(200)
      .json({ msg: "Visszamondtad a foglalást sikeresen", bookingitem });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
router.delete("/torol/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    // console.log(bookingId);
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).send({ message: "Foglalás törölve" });
  } catch (error) {
    res.status(500).send({ error: "Hiba történt a törlés során" });
  }
});

module.exports = router;
