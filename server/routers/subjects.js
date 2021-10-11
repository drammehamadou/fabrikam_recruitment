const express = require('express');
const router = express.Router();

const {Subject} = require('../models/subject');

router.get(`/`, async (req, res) => {
    const subjectList = await Subject.find();

    if (!subjectList){
        res.status(500).json({success: false})
    }
    res.send(subjectList);
})

module.exports=router;