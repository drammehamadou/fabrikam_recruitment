const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address1: {
        type: String,
        default: ''
    },
    address2: {
        type: String,
        default: ''
    },
    postCode :{
        type: String,
        default: ''
    },
    county: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
})

attendeeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

attendeeSchema.set('toJSON', {
    virtuals: true,
});

exports.Attendee = mongoose.model('Attendee', attendeeSchema);