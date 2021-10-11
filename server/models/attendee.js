const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    title:  String, 
    description: String,
    image: String
})

exports.Attendee = mongoose.model('Attendee', attendeeSchema);