const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    title:  {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
            type: String
        }],
    price: {
        type: Number,
        default: 0
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

exports.Booking = mongoose.model('Booking', bookingSchema);