const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    title:  String, 
    description: String,
    image: String
})

exports.Booking = mongoose.model('Booking', bookingSchema);