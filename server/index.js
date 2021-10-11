const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//environment variables
require('dotenv/config');

const api = process.env.API_URL;

//middlewares
app.use(express.json());
app.use(morgan('tiny'));

const trainingSchema = mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    description: String,
    image: String
})

const Training = mongoose.model('Training', trainingSchema);

app.get(`${api}/trainings`, async (req, res) => {
    const trainingList = await Training.find();
    res.send(trainingList);
})

app.post(`${api}/trainings`, (req, res) => {
    const training = new Training ({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    })
    training.save().then((createTraining => {
        res.status(201).json(createTraining)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

//database connection
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'fabrikam-db'
})
.then(() =>{
    console.log('Database connection is ready...')
})
.catch((err) => {
    console.log(err);
})

app.listen(2021, () => {
    console.log('Server is running http://localhost:2021');
})