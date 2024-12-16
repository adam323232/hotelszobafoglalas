const express = require('express');
const router = express.Router();
const BookingModel = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const stripe =  require('stripe')('sk_test_51QVWdICIgmCaxGt9FxC6lGWJxplmO99f6sKnFX005cPaKMS1YflYwecioMOZt3zKdZaSmNXod3v3KqGspGEj37VW007EIDbxgh');

router.post('/bookroom', async (req, res) => {

    const {room, userid, fromdate, todate, totalamount, totaldays, token} = req.body;

    try {
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id
        })

        const payment = await stripe.charges.create(
            {
                amount : totalamount * 100, 
                customer : customer.id,
                currency : 'eur', 
                receipt_emiail : token.email

            }, {
                idempotencyKey : uuidv4()
            }
        )

        if(payment){
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
        }

        res.send('Sikeres fizetés!')
    } catch (error) {
        return res.status(400).json({ error });
    }



});


router.post("/getbookingbyuserid", (req, res) => {
    const userid = req.body.userid


    try {
        const bookings = Booking.find({userid : userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
