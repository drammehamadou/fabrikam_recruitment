const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    bookingUnits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookingUnit',
        required:true
    }],
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    county: {
        type: String,
        required: true,
    },
    postCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    totalPrice: {
        type: Number,
    },
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee',
    },
    dateBooked: {
        type: Date,
        default: Date.now,
    },
})

bookingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bookingSchema.set('toJSON', {
    virtuals: true,
})

exports.Booking = mongoose.model('Booking', bookingSchema);