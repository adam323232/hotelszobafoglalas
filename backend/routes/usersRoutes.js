const express = require("express");
const router = express.Router();
const User = require("../models/user");

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
  // console.log(email, password);
  try {
    const user = await User.findOne({ email: email, password: password });
    // console.log(user);
    if (user) {
      res.status(200).json({ msg: "Sikeres belépés!", user });
    } else {
      return res.status(400).json({ msg: "Login failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
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

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    await User.findByIdAndDelete({ _id: userId });
    return res.status(200).send({ message: "Profil törölve" });
  } catch (error) {
    res.status(500).send({ error: "Hiba történt a törlés során" });
  }
});
router.put("/updateuseradmin/:id", async (req, res) => {
  const { id } = req.params;
  const { updatedUser } = req.body;
  console.log(updatedUser);

  try {
    const useritem = await User.findByIdAndUpdate(
      { _id: id },
      {
        isAdmin: !updatedUser.isAdmin,
      },
      { new: true }
    );

    return res.status(200).json({ msg: "Admin jog frissitve", useritem });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
