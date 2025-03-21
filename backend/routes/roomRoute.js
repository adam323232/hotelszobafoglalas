const express = require('express');
const router = express.Router();

const Room = require('../models/room');

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find({});
        return res.status(200).json({ rooms });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById({ _id: id });
        // console.log(room);
        return res.status(200).json({ room });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/getroombyid', async (req, res) => {
    const roomid = req.body.roomid;

    try {
        const room = await Room.find({ _id: roomid });
        return res.status(200).json({ room });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/addroom', async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        // console.log(newRoom);
        await newRoom.save();
        res.send('A szoba felvétele sikeresen megtörtént');
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.put('/updatebooking/:id', async (req, res) => {
    const { id } = req.params;
    const { updatedRoom } = req.body;

    try {
        const roomitem = await Room.findByIdAndUpdate(
            { _id: id },
            {
                name: updatedRoom.name,
                maxcount: updatedRoom.maxcount,
                rentperday: updatedRoom.rentperday,
                type: updatedRoom.type,
                phonenumber: updatedRoom.phonenumber,
                extrak: updatedRoom.extrak,
            },
            { new: true }
        );

        return res
            .status(200)
            .json({ msg: 'Sikeres szoba frissítés', roomitem });
    } catch (error) {
        return res.status(400).json({ error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const roomid = req.params.id;
        await Room.findByIdAndDelete(roomid);
        res.status(200).send({ message: 'Szoba törölve' });
    } catch (error) {
        res.status(500).send({ error: 'Hiba történt a törlés során' });
    }
});

module.exports = router;
