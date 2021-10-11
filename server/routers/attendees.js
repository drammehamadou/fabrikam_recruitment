const express = require('express');
const router = express.Router();

const {Attendee} = require('../models/attendee');

router.get(`/`, async (req, res) => {
    const attendeeList = await Attendee.find();

    if (!attendeeList){
        res.status(500).json({success: false})
    }
    res.send(attendeeList);
})

module.exports=router;