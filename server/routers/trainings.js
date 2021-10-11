const express = require('express');
const router = express.Router();

const {Training} = require('../models/training');

router.get(`/`, async (req, res) => {
    const trainingList = await Training.find();

    if (!trainingList){
        res.status(500).json({success: false})
    }
    res.send(trainingList);
})

router.post(`/`, (req, res) => {
    const training = new Training ({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    })
    training.save().then((createTraining => {
        res.status(201).json(createTraining)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports=router;