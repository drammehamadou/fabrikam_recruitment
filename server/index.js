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

app.get(`${api}/trainings`, (req, res) => {
    const training = {
        id: 1,
        name: 'CV writing',
        image: 'some_url'
    }
    res.send(training);
})

app.post(`${api}/trainings`, (req, res) => {
    const newTraining = req.body;
    console.log(newTraining)
    res.send(newTraining);
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