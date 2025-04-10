const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // console.log('regisztráció');
    // console.log(newuser);
    const user = await newuser.save();
    res.status(200).json({ msg: "Sikeres regisztráció" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Felhasználó keresése email alapján
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "Ilyen felhasználó nem létezik" });
    }

    // Jelszó ellenőrzése bcrypt.compare segítségével
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Helytelen jelszó" });
    }

    // Ha minden rendben, visszaküldjük a felhasználói adatokat
    res.status(200).json({
      msg: "Sikeres belépés!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Szerverhiba történt" });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/torol/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId);
    await User.findByIdAndDelete({ _id: userId });
    return res.status(200).send({ message: "Profil törölve" });
  } catch (error) {
    res.status(500).send({ error: "Hiba történt a törlés során" });
  }
});
router.put("/toggleAdmin/:id", async (req, res) => {
  const { id } = req.params; // Az ID az URL-ből érkezik
  const { isAdmin } = req.body; // Az isAdmin a kérés törzséből érkezik

  try {
    const user = await User.findById(id); // Az ID alapján keresünk
    if (!user) {
      return res.status(404).json({ message: "Felhasználó nem található." });
    }

    user.isAdmin = isAdmin; // Admin jog beállítása
    await user.save(); // Mentjük a változtatást

    return res.status(200).json({ msg: "Admin jog sikeresen frissítve", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Hiba történt az admin jog módosítása során." });
  }
});


module.exports = router;
