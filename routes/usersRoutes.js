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
        console.log('regisztráció');
        console.log(newuser);
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
        console.log(user);
        if (user) {
            res.status(200).json({ msg: 'Sikeres belépés!', user });
        } else {
            return res.status(400).json({ msg: 'Login failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
