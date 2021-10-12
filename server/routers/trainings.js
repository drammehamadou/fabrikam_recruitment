const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {Training} = require('../models/training');
const {Course} = require('../models/course');

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

//get a training
router.get(`/`, async (req, res) => {
    const trainingList = await Training.find().populate('course');

    if (!trainingList){
        res.status(500).json({success: false})
    }
    res.send(trainingList);
})

//get a training by id
router.get(`/:id`, async (req, res) => {
    const training = await Training.findById(req.params.id).populate('course');

    if (!training){
        res.status(500).json({success: false})
    }
    res.send(training);
})

//update a training
router.put(`/:id`, async (req, res) => {
    //validate
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Training Id')
    }
    const course = await Course.findById(req.body.course);
    if(!course) return res.status(400).send('Invalid Course')
    const training = await Training.findByIdAndUpdate(
        req.params.id, 
        {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            course: req.body.course,
            rating: req.body.rating,
            reviews: req.body.reviews,
            isFeatured: req.body.isFeatured
        },
        //return new updated data
        {new: true}
    )
    if (!training)
return res.status(404).send('The training cannot be updated.')

res.send(training);
})

//delete a training
router.delete(`/:id`, (req, res) => {
    Training.findByIdAndRemove(req.params.id).then(training => {
        if(training) {
            return res.status(200).json({
                success: true, message: 'The training is deleted.'
            })
        } else {
            return res.status(404).json({
                success: false, message: 'training not found'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})

module.exports=router;