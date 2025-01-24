const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const newuser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        // console.log('regisztráció');
        // console.log(newuser);
        const user = await newuser.save();
        res.status(200).json({ msg: 'Sikeres regisztráció' });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email: email, password: password });
        // console.log(user);
        if (user) {
            res.status(200).json({ msg: 'Sikeres belépés!', user });
        } else {
            return res.status(400).json({ msg: 'Login failed' });
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
module.exports = router;
