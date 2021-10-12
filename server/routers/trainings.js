const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {Training} = require('../models/training');
const {Course} = require('../models/course');

//get a training
router.get(`/`, async (req, res) => {
    const trainingList = await Training.find();

    if (!trainingList){
        res.status(500).json({success: false})
    }
    res.send(trainingList);
})

//post a training
router.post(`/`, async (req, res) => {

    const course = await Course.findById(req.body.course);
    if(!course) return res.status(400).send('Invalid Course')

    let training = new Training ({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        course: req.body.course,
        rating: req.body.rating,
        reviews: req.body.reviews,
        isFeatured: req.body.isFeatured
    })

    training = await training.save();
    if (!training)
    return res.status(500).send('Training cannot be created.'
    )
    res.send(training);
})

module.exports=router;