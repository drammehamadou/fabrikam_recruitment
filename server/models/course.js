const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
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

courseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

courseSchema.set('toJSON', {
    virtuals: true,
});

exports.Course = mongoose.model('Course', courseSchema);