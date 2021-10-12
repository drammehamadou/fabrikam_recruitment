const express = require('express');
const router = express.Router();

const {Course} = require('../models/course');

//get a course
router.get(`/`, async (req, res) => {
    const courseList = await Course.find();

    if (!courseList){
        res.status(500).json({success: false})
    }
    res.send(courseList);
})

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