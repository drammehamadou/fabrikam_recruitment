const express = require('express');
const router = express.Router();

const {Subject} = require('../models/subject');

//get a subject
router.get(`/`, async (req, res) => {
    const subjectList = await Subject.find();

    if (!subjectList){
        res.status(500).json({success: false})
    }
    res.send(subjectList);
})

//add a subject
router.post(`/`, async (req, res) => {
    let subject = new Subject({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

subject = await subject.save();

if (!subject)
return res.status(404).send('The subject cannot be created.')

res.send(subject);
})

//delete a subject
//api/v1/id
router.delete(`/:id`, (req, res) => {
    Subject.findByIdAndRemove(req.params.id).then(subject => {
        if(subject) {
            return res.status(200).json({
                success: true, message: 'The subject is deleted.'
            })
        } else {
            return res.status(404).json({
                success: false, message: 'subject not found'})
        }
    }).catch(err => {
        return res.status(404).json({success: false, error: err})
    })
})

module.exports=router;