const express = require('express');
const router = express.Router();

const {Booking} = require('../models/booking');
const {BookingUnit} = require('../models/booking-unit');

//create booking
router.post('/', async (req,res)=>{
    const bookingUnitsIds = Promise.all(
        req.body.bookingUnits.map(async (bookingUnit) => {
        let newBookingUnit = new BookingUnit({
            quantity: bookingUnit.quantity,
            training: bookingUnit.training
        })

        newBookingUnit = await newBookingUnit.save();

        return newBookingUnit._id;
    }))
    const bookingUnitsIdsResolved =  await bookingUnitsIds;

    const totalPrices = await Promise.all(
        bookingUnitsIdsResolved.map(async (bookingUnitId) => {
        const bookingUnit = await bookingUnit.findById(bookingUnitId).populate('training', 'price');
        const totalPrice = bookingUnit.training.price * bookingUnit.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let booking = new Booking({
        bookingUnits: bookingUnitsIdsResolved,
        address1: req.body.address1,
        address2: req.body.address2,
        county: req.body.county,
        postCode: req.body.postCode,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        attendee: req.body.attendee,
    })
    booking = await booking.save();

    if(!booking)
    return res.status(400).send('the booking cannot be created!')

    res.send(booking);
});

//get list of bookings
router.get(`/`, async (req, res) =>{
    const bookingList = await Booking.find()
    .populate('attendee', 'name')
    .sort({'dateBooked': -1});

    if(!bookingList) {
        res.status(500).json({success: false})
    } 
    res.send(bookingList);
})

//get a booking by id
router.get(`/:id`, async (req, res) =>{
    const booking = await Booking.findById(req.params.id)
    .populate('attendee', 'name')
    .populate({ 
        path: 'bookingUnits', 
        populate: {
            path : 'training', 
            populate: 'course'} 
        });

    if(!booking) {
        res.status(500).json({success: false})
    } 
    res.send(booking);
})

//update a booking
router.put('/:id', async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!booking)
    return res.status(400).send('the booking cannot be update!')

    res.send(booking);
})

//delete a booking
router.delete('/:id', (req, res)=>{
    Booking.findByIdAndRemove(req.params.id)
    .then(async (booking) =>{
        if(booking) {
            await booking.bookingUnits.map(async (bookingUnit) => {
                await bookingUnit.findByIdAndRemove(bookingUnit)
            });
            return res.status(200).json({success: true, message: 'the booking is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "booking not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

//if booking is charged, get the total price
router.get('/get/totalsales', async (req, res)=> {
    const totalSales= await Booking.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ]);

    if(!totalSales) {
        return res.status(400).send('The booking sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

//get total number of bookings
router.get(`/get/count`, async (req, res) =>{
    const bookingCount = await Booking.countDocuments((count) => count)

    if(!bookingCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        bookingCount: bookingCount
    });
})

router.get(`/get/attendeetrainings/:attendeeid`, async (req, res) =>{
    const attendeeTrainingList = await Booking.find({attendee: req.params.attendeeid}).populate({ 
        path: 'bookingUnits', populate: {
            path : 'training', populate: 'course'} 
        }).sort({'dateBooked': -1});

    if(!attendeeBookingList) {
        res.status(500).json({success: false})
    } 
    res.send(attendeeBookingList);
})

module.exports=router;