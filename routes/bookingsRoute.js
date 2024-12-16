const express = require('express');
const router = express.Router();
const BookingModel = require('../models/booking');
const moment = require('moment');

router.post('/bookroom', async (req, res) => {
    try {
        const rooms = req.body.bookingDetails.room;
        const others = req.body.bookingDetails;
        // console.log(rooms);
        // console.log(others);

        const newbooking = new BookingModel({
            room: rooms.name,
            roomid: rooms._id,
            userid: '1',
            fromdate: moment(others.fromdate).format('MM-DD-YYYY'),
            todate: moment(others.todate).format('MM-DD-YYYY'),
            totalamount: Number(others.totalamount),
            totaldays: Number(others.totaldays),
            transactionid: '1234',
        });

        const booking = await newbooking.save();
        console.log(booking);

        return res.status(201).json({ msg: 'Sikeres szobafoglalás!' });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
