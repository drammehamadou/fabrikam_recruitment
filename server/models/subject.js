const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    }
})

exports.Subject = mongoose.model('Subject', subjectSchema);