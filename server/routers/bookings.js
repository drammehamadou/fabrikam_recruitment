const express = require('express');
const router = express.Router();

const {Booking} = require('../models/booking');

router.get(`/`, async (req, res) => {
    const bookingList = await Booking.find();

    if (!bookingList){
        res.status(500).json({success: false})
    }
    res.send(bookingList);
})

module.exports=router;