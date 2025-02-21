const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            required: true,
        },
        roomid: {
            type: String,
            required: true,
        },
        felhasznalo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        userid: {
            type: String,
            required: true,
        },
        fromdate: {
            type: String,
            required: true,
        },
        todate: {
            type: String,
            required: true,
        },
        totalamount: {
            type: Number,
            required: true,
        },
        totaldays: {
            type: Number,
            required: true,
        },
        transactionid: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'booked',
        },
        extrak: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const BookingModel = mongoose.model('booking', bookingSchema);

module.exports = BookingModel;
