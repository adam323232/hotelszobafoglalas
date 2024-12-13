const express = require('express');
const router = express.Router();
const BookingModel = require('../models/booking');
const Room = require('../models/room');
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

        const roomtemp = await Room.findOne({_id : room._id});
        
        roomtemp.currentbookings.push({
            bookingid : booking._id ,
            fromdate : moment(fromdate).format('DD-MM-YYYY') , 
            todate : moment(todate).format('DD-MM-YYYY') , 
            userid : userid , 
            status : booking.status 
        });

        await roomtemp.save();

        return res.status(201).json({ msg: 'Sikeres szobafoglalás!' });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
