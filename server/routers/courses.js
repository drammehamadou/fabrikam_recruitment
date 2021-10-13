const express = require('express');
const router = express.Router();

const {Course} = require('../models/course');

//add a course
router.post(`/`, async (req, res) => {
    let course = new Course({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

course = await course.save();

if (!course)
return res.status(404).send('The course cannot be created.')

res.send(course);
})

//get a course
router.get(`/`, async (req, res) => {
    const courseList = await Course.find();

    if (!courseList){
        res.status(500).json({success: false})
    }
    res.status(200).send(courseList);
})

//get a couse by id
router.get(`/:id`, async(req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course) {
        res.status(500).json({
            message: 'The course with that id was not found'
        })
    }
    res.status(200).send(course);
})

//update course
router.put(`/:id`, async (req, res) => {
    const course = await Course.findByIdAndUpdate(
        req.params.id, 
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        //return new updated data
        {new: true}
    )
    if (!course)
return res.status(404).send('The course cannot be updated.')

res.send(course);
})

//delete a course
//api/v1/id
router.delete(`/:id`, (req, res) => {
    course.findByIdAndRemove(req.params.id).then(course => {
        if(course) {
            return res.status(200).json({
                success: true, message: 'The course is deleted.'
            })
        } else {
            return res.status(404).json({
                success: false, message: 'course not found'})
        }
    }).catch(err => {
        return res.status(404).json({success: false, error: err})
    })
})

module.exports=router;