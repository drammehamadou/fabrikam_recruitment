const mongoose = require('mongoose');

const trainingSchema = mongoose.Schema({
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
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    countTraining: {
        type: Number,
        required: true,
        min: 0,
        max: 500
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
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

//change _id to id
trainingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

trainingSchema.set('toJSON', {
    virtuals: true,
});

exports.Training = mongoose.model('Training', trainingSchema);