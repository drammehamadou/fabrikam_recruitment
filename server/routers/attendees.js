const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {Attendee} = require('../models/attendee');

//create a new attendee
router.post('/', async (req,res)=>{
    let attendee = new Attendee({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        address1: req.body.addess1,
        address2: req.body.address2,
        postCode: req.body.postCode,
        county: req.body.county,
        country: req.body.country,
    })
    attendee = await attendee.save();

    if(!attendee)
    return res.status(400).send('The attendee cannot be created!')

    res.send(attendee);
})

//get the attendee
router.get(`/`, async (req, res) => {
    const attendeeList = await Attendee.find();

    if (!attendeeList){
        res.status(500).json({success: false})
    }
    res.send(attendeeList);
})

//get an attendee by id
router.get('/:id', async(req,res)=>{
    const attendee = await Attendee.findById(req.params.id).select('-passwordHash');

    if(!attendee) {
        res.status(500).json({message: 'The attendee with the given ID was not found.'})
    } 
    res.status(200).send(attendee);
})

//update attendee
router.put('/:id',async (req, res)=> {

    const attendeeExist = await Attendee.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = attendeeExist.passwordHash;
    }

    const attendee = await Attendee.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address1: req.body.address1,
            address2: req.body.address2,
            postCode: req.body.postCode,
            county: req.body.county,
            country: req.body.country,
        },
        { new: true}
    )

    if(!attendee)
    return res.status(400).send('the attendee cannot be created!')

    res.send(attendee);
})

//login a attendee REST API & create a token
router.post('/login', async (req, res) => {
    const attendee = await Attendee.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!attendee) {
        return res.status(400).send('The attendee not found');
    }

    if(attendee && bcrypt.compareSync(req.body.password, attendee.passwordHash)) {
        const token = jwt.sign(
            {
                attendeeId: attendee.id,
                isAdmin: attendee.isAdmin
            },
            secret,
            //token to expire after one day
            {expiresIn : '1d'}
        )
       
        res.status(200).send({attendee: attendee.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})

//attendee registration
router.post('/register', async (req,res)=>{
    let attendee = new Attendee({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        address1: req.body.addess1,
        address2: req.body.address2,
        postCode: req.body.postCode,
        county: req.body.county,
        country: req.body.country,
    })
    attendee = await attendee.save();

    if(!attendee)
    return res.status(400).send('The attendee cannot be created!')

    res.send(attendee);
})

//delete attendee
router.delete('/:id', (req, res)=>{
    Attendee.findByIdAndRemove(req.params.id).then(attendee =>{
        if(attendee) {
            return res.status(200).json({success: true, message: 'The attendee is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "attendee not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

//get number of attendees
router.get(`/get/count`, async (req, res) =>{
    const attendeeCount = await Attendee.countDocuments((count) => count)

    if(!attendeeCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        attendeeCount: attendeeCount
    });
})

module.exports=router;