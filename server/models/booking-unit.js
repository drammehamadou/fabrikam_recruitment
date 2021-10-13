const mongoose = require('mongoose');

const bookingUnitSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training'
    }
})

exports.BookingUnit = mongoose.model('BookingUnit', bookingUnitSchema);
