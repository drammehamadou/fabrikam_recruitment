const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const {Training} = require('../models/training');
const {Course} = require('../models/course');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });

//post a training
router.post(`/`, uploadOptions.single('image'), async (req, res) => {

    const course = await Course.findById(req.body.course);
    if(!course) return res.status(400).send('Invalid Course')

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let training = new Training ({
        name: req.body.name,
        description: req.body.description,
        image: `${basePath}${fileName}`,
        price: req.body.price,
        course: req.body.course,
        countInTraining: req.body.countInTraining,
        rating: req.body.rating,
        reviews: req.body.reviews,
        isFeatured: req.body.isFeatured
    })

    training = await training.save();
    if (!training)
    return res.status(500).send('Training cannot be created.'
    )
    res.send(training);
})

//get a list of trainings
router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.courses)
    {
        filter = {course: req.query.courses.split(',')}
    }
    const trainingList = await Training.find(filter).populate('course');

    if (!trainingList){
        res.status(500).json({success: false})
    }
    res.send(trainingList);
})

//get a training by id
router.get(`/:id`, async (req, res) => {
    const training = await Training.findById(req.params.id).populate('course');

    if (!training){
        res.status(500).json({success: false})
    }
    res.send(training);
})

//update a training
router.put(`/:id`, uploadOptions.single('image'), async (req, res) => {
    //validate
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Training Id')
    }
    const course = await Course.findById(req.body.course);
    if(!course) return res.status(400).send('Invalid Course')

    const training = await Training.findById(req.params.id);
    if (!training) return res.status(400).send('Invalid Training!');

    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = training.image;
    }

    const updatedTraining = await Training.findByIdAndUpdate(
        req.params.id, 
        {
            name: req.body.name,
            description: req.body.description,
            image: imagepath,
            price: req.body.price,
            course: req.body.course,
            countInTraining: req.body.countInTraining,
            rating: req.body.rating,
            reviews: req.body.reviews,
            isFeatured: req.body.isFeatured
        },
        //return new updated data
        {new: true}
    )
    if (!updatedTraining)
return res.status(500).send('The training cannot be updated.')

res.send(updatedTraining);
});

//delete a training
router.delete(`/:id`, (req, res) => {
    Training.findByIdAndRemove(req.params.id)
    .then((training) => {
        if(training) {
            return res.status(200).json({
                success: true, 
                message: 'The training is deleted.'
            });
        } else {
            return res.status(404).json({
                success: false, message: 'training not found'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})

//get number of trainings
router.get(`/get/count`, async (req, res) =>{
    const trainingCount = await Training.countDocuments((count) => count)

    if(!trainingCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        trainingCount: trainingCount
    });
})

//trainings to be featured on the landing page
router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const trainings = await Training.find({isFeatured: true}).limit(+count);

    if(!trainings) {
        res.status(500).json({success: false})
    } 
    res.send(trainings);
});

//update images/gallery
router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Training Id');
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (files) {
        files.map((file) => {
            imagesPaths.push(`${basePath}${file.filename}`);
        });
    }

    const training = await Training.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        { new: true }
    );

    if (!training) return res.status(500).send('the gallery cannot be updated!');

    res.send(training);
});

module.exports=router;